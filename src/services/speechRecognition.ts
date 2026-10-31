/**
 * 语音识别与口语评测服务
 *
 * 评分链路（优先级从高到低）：
 * 1. vosk 离线识别（Electron 主进程，MediaRecorder webm → ffmpeg 解码 16k PCM）——真实词级比对打分
 * 2. Web Speech API（浏览器环境且有 Google 服务时）——文本比对
 * 3. 开口练习分（energy）——按开口占比/音量/时长评估
 * 4. silent —— 完全没检测到声音 / 麦克风不可用
 */
import { logger } from '../utils/logger';
import {
  diagnosePronunciation,
  buildPhonemeDict,
  type PhonemeDict,
  type PronunciationReport,
} from './phoneme';
import {
  analyzeAcoustics,
  withWordRate,
  computeSpectralFrame,
  type LevelFrame,
} from './acoustics';

const MODULE = 'speechRecognition';

// ---------------------------------------------------------------------------
// Type declarations for Web Speech API (not included in lib.dom.d.ts by default)
// ---------------------------------------------------------------------------

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * 获取 SpeechRecognition 构造函数（兼容 webkit 前缀）
 */
function getSpeechRecognitionConstructor(): (new () => SpeechRecognitionInstance) | null {
  const win = window as unknown as Record<string, unknown>;
  return (
    (win.SpeechRecognition as new () => SpeechRecognitionInstance) ||
    (win.webkitSpeechRecognition as new () => SpeechRecognitionInstance) ||
    null
  );
}

/**
 * 检查当前浏览器是否支持语音识别（Web Speech API）
 */
export function isSpeechRecognitionAvailable(): boolean {
  return getSpeechRecognitionConstructor() !== null;
}

/**
 * 文本归一化：转小写、移除标点与多余空格
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, '') // 移除标点，保留字母、数字、空格和撇号
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 计算两个字符串之间的 Levenshtein 编辑距离
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  // 使用滚动数组优化空间复杂度 O(n)
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  let curr = new Array<number>(n + 1);

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1, // 删除
        curr[j - 1] + 1, // 插入
        prev[j - 1] + cost // 替换
      );
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}

/**
 * 比对两段文本的相似度，返回 0-100 的评分
 *
 * 算法：
 * 1. 归一化两段文本（小写、去标点）
 * 2. 词级 LCS 动态规划，完全匹配得 1 分
 * 3. 未完全匹配的词用字符级 Levenshtein 距离折算部分相似度
 */
export function compareTexts(spoken: string, target: string): number {
  const normSpoken = normalizeText(spoken);
  const normTarget = normalizeText(target);

  // 完全匹配
  if (normSpoken === normTarget) return 100;

  // 空文本处理
  if (!normSpoken || !normTarget) return 0;

  const spokenWords = normSpoken.split(' ');
  const targetWords = normTarget.split(' ');

  if (targetWords.length === 0) return 0;

  // dp[i][j] = 前 i 个 spoken 词和前 j 个 target 词的最大匹配分数
  const m = spokenWords.length;
  const n = targetWords.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (spokenWords[i - 1] === targetWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        const dist = levenshteinDistance(spokenWords[i - 1], targetWords[j - 1]);
        const maxLen = Math.max(spokenWords[i - 1].length, targetWords[j - 1].length);
        const partialScore = maxLen > 0 ? 1 - dist / maxLen : 0;

        dp[i][j] = Math.max(
          dp[i - 1][j], // 跳过 spoken 词
          dp[i][j - 1], // 跳过 target 词
          dp[i - 1][j - 1] + Math.max(0, partialScore) // 部分匹配
        );
      }
    }
  }

  const rawScore = (dp[m][n] / n) * 100;
  const raw = Math.round(Math.min(100, Math.max(0, rawScore)));
  // 鼓励校准曲线：离线小模型对童声的识别有限，线性原始分普遍压在 60-70，
  // 70 分过关线几乎不可达。按温和曲线校准（65→78、80→87、95→98、100→100），
  // 让分数更贴近孩子的真实朗读质量；识别完全离谱时分数仍会显著偏低。
  const calibrated = Math.min(100, Math.round(raw + (100 - raw) * 0.35));
  return calibrated;
}

// ---------------------------------------------------------------------------
// 词级差异（发音反馈：告诉孩子哪几个词没读对）
// ---------------------------------------------------------------------------

export interface WordDiff {
  /** 读对了的词（按目标顺序） */
  matched: string[];
  /** 目标句里没被识别到的词 */
  missed: string[];
  /** 多读出来的词 */
  extra: string[];
  /** 命中率 0-1 */
  matchedRatio: number;
}

/**
 * 词级 LCS 对比，输出漏读/多读词。
 * 与 compareTexts 共用同一套归一化规则，避免"分数高但提示词不对"的不一致。
 */
export function diffWords(spoken: string, target: string): WordDiff {
  const spokenWords = normalizeText(spoken).split(' ').filter(Boolean);
  const targetWords = normalizeText(target).split(' ').filter(Boolean);
  const m = spokenWords.length;
  const n = targetWords.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        spokenWords[i - 1] === targetWords[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // 回溯得到匹配词集合
  const matchedSet = new Set<string>();
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (spokenWords[i - 1] === targetWords[j - 1]) {
      matchedSet.add(targetWords[j - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  const matched = targetWords.filter((w) => matchedSet.has(w));
  const missed = targetWords.filter((w) => !matchedSet.has(w));
  const extra = spokenWords.filter((w) => !matchedSet.has(w));

  return {
    matched,
    missed,
    extra,
    matchedRatio: n > 0 ? matched.length / n : 0,
  };
}

// ---------------------------------------------------------------------------
// 口语评测（一次录音完成采集 + 波形 + 评分）
// ---------------------------------------------------------------------------

/** 口语评测结果 */
export interface SpeechEvalResult {
  /** 0-100 分 */
  score: number;
  /** 评分来源：vosk=离线识别比对 / recognized=Web Speech比对 / energy=开口练习分 / silent=未检测到声音 */
  mode: 'vosk' | 'recognized' | 'energy' | 'silent';
  /** 识别出的文本（vosk/recognized 模式） */
  transcript?: string;
  /** 录音期间的最大音量（0-1，已做视觉增益） */
  maxLevel: number;
  /** 麦克风不可用（权限被拒/设备占用/无设备）——UI 应提示检查麦克风而非"没声音" */
  micError?: boolean;
  /** 本次录音（webm/opus，可直接播放）——供"听自己的发音"回放；无声/无录音时缺省 */
  recording?: Blob;
  /**
   * 音素级发音诊断。
   * 仅在识别出文本时生成（vosk/recognized 模式）；energy/silent 模式缺省。
   * UI 据此展示"哪个词、哪个音素没读对"，而不是只给一个分数。
   */
  pronunciation?: PronunciationReport;
}

/** 进行中的口语评测会话 */
export interface SpeechEvaluationSession {
  /** 自然结束（识别完成/超时）或手动 stop() 后 resolve（二者只会 resolve 一次） */
  promise: Promise<SpeechEvalResult>;
  /** 提前结束录音并出分（如用户点"完成录音"） */
  stop: () => void;
}

/** 判定"无声"的音量阈值（视觉增益后） */
const SILENT_LEVEL_THRESHOLD = 0.08;
/** 判定"开口"的单帧音量阈值 */
const VOICED_LEVEL_THRESHOLD = 0.1;

/**
 * 启动一次口语评测：
 * - 打开麦克风（AudioContext 16kHz 自动重采样）实时计算音量供波形绘制
 * - vosk 可用时把 16kHz Int16 PCM 经 IPC 流式喂给主进程识别（离线，出真实词级比分）
 * - vosk 不可用时尝试 Web Speech（Electron 里云端服务通常不可达，8 秒无结果自动放弃）
 * - 全部失败则按音量评估出"开口练习分"
 *
 * @param targetText 目标文本（孩子要读的句子）
 * @param maxRecordMs 最长录音时长
 * @param onLevel 实时音量回调（供波形绘制）
 * @param dictSource 本课词汇表，用于构建音素字典——目标句里的生词用数据中真人注音
 *                    的 IPA 做音素基准，未收录的词走规则 G2P。不传则全部走规则。
 */
export function startSpeechEvaluation(
  targetText: string,
  maxRecordMs: number = 10000,
  onLevel?: (level: number) => void,
  dictSource?: Array<{ word: string; phonetic?: string }>
): SpeechEvaluationSession {
  const dict: PhonemeDict | undefined = dictSource?.length
    ? buildPhonemeDict(dictSource)
    : undefined;
  let settled = false;
  let resolvePromise!: (r: SpeechEvalResult) => void;
  const promise = new Promise<SpeechEvalResult>((res) => {
    resolvePromise = res;
  });

  let recognition: SpeechRecognitionInstance | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let audioContext: any = null;
  let stream: MediaStream | null = null;
  let rafId = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  let transcript = '';
  let recognitionDone = false; // Web Speech 流程正常产出过结果
  let micFailed = false; // 麦克风不可用（权限/占用/无设备）
  let recognitionWatchdog: ReturnType<typeof setTimeout> | null = null;
  let maxLevel = 0;
  let voicedFrames = 0;
  let totalFrames = 0;
  // 逐帧音量留存：供流利度分析（停顿/语速/音量稳定性）。
  // 60fps × 12s ≈ 720 帧，内存无压力；超过 12000 帧截断（200 秒录音，远超使用上限）。
  const levelFrames: LevelFrame[] = [];
  let voskSessionOk = false; // 主进程 vosk 识别会话是否建立
  // MediaRecorder 采集（ScriptProcessorNode 在本机 Electron 里 onaudioprocess 首帧
  // 分发死锁主线程导致白屏，故弃用；MediaRecorder 是旧版已验证稳定路径）
  let mediaRecorder: MediaRecorder | null = null;
  let mediaChunks: Blob[] = [];
  let recordedBlob: Blob | null = null; // 本次录音（回放用）
  const startedAt = Date.now();

  /** 生成音素级诊断（仅在有识别文本时） */
  const buildDiagnosis = (text: string): PronunciationReport => {
    const wordCount = normalizeText(text).split(' ').filter(Boolean).length;
    // 流利度只依赖录音帧，识别文本只用来算语速（词/分钟）
    const fluency = withWordRate(analyzeAcoustics(levelFrames), wordCount);
    return diagnosePronunciation(text, targetText, dict, fluency);
  };

  /** 出最终结果（vosk 文本优先） */
  const settle = (voskText: string) => {
    const withRecording = <T extends Omit<SpeechEvalResult, 'recording'>>(r: T): SpeechEvalResult => {
      const out: SpeechEvalResult = { ...r };
      if (recordedBlob && recordedBlob.size > 0) out.recording = recordedBlob;
      return out;
    };
    let result: SpeechEvalResult;
    if (voskText.trim()) {
      result = withRecording({
        score: compareTexts(voskText, targetText),
        mode: 'vosk',
        transcript: voskText,
        maxLevel,
        pronunciation: buildDiagnosis(voskText),
      });
    } else if (recognitionDone && transcript.trim()) {
      result = withRecording({
        score: compareTexts(transcript, targetText),
        mode: 'recognized',
        transcript,
        maxLevel,
        pronunciation: buildDiagnosis(transcript),
      });
    } else {
      const voicedRatio = totalFrames > 0 ? voicedFrames / totalFrames : 0;
      if (micFailed) {
        result = { score: 0, mode: 'silent', maxLevel, micError: true };
      } else if (maxLevel < SILENT_LEVEL_THRESHOLD || voicedRatio < 0.05) {
        result = withRecording({ score: 0, mode: 'silent', maxLevel });
      } else {
        // 开口练习分：开口占比 + 音量饱满度 + 朗读时长接近度
        const wordCount = normalizeText(targetText).split(' ').filter(Boolean).length;
        const idealMs = wordCount * 450 + 800;
        const elapsedMs = Date.now() - startedAt;
        const durationCloseness = Math.max(0, 1 - Math.abs(elapsedMs - idealMs) / idealMs);
        const raw =
          45 + voicedRatio * 25 + Math.min(1, maxLevel / 0.5) * 15 + durationCloseness * 15;
        result = withRecording({
          score: Math.round(Math.min(88, raw)),
          mode: 'energy',
          maxLevel,
        });
      }
    }
    resolvePromise(result);
  };

  const finish = () => {
    if (settled) return;
    settled = true;
    if (timeoutId) clearTimeout(timeoutId);
    if (recognitionWatchdog) clearTimeout(recognitionWatchdog);
    cancelAnimationFrame(rafId);
    try {
      recognition?.abort();
    } catch {
      /* 已停止 */
    }

    const cleanup = () => {
      stream?.getTracks().forEach((t) => t.stop());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (audioContext && typeof (audioContext as any).close === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (audioContext as any).close().catch(() => {});
      }
    };

    // 停 MediaRecorder（依赖活跃流，须在停 tracks 之前调用）
    const stopMedia = (): Promise<void> =>
      new Promise((res) => {
        if (!mediaRecorder || mediaRecorder.state === 'inactive') {
          res();
          return;
        }
        mediaRecorder.onstop = () => res();
        try {
          mediaRecorder.stop();
        } catch {
          res();
        }
      });

    if (voskSessionOk && window.electronAPI?.voskFinish) {
      // 顺序关键：先 stop MediaRecorder（依赖活跃流，先停 tracks 会死锁 stop()），
      // webm/opus blob 交主进程 ffmpeg 子进程解码为 16k PCM 喂 vosk
      // （渲染端 ScriptProcessor/decodeAudioData/AudioWorklet 在本机全部死锁，只剩 ffmpeg 子进程可用），
      // 最后取识别文本出分并清理流资源
      const feedRecording = async (): Promise<void> => {
        logger.info(MODULE, 'finish', `stopMedia 完成 chunks=${mediaChunks.length}`);
        if (mediaChunks.length === 0) return;
        const blob = new Blob(mediaChunks, {
          type: mediaRecorder?.mimeType || 'audio/webm',
        });
        mediaChunks = [];
        if (blob.size === 0) return;
        recordedBlob = blob; // 保留录音供回放
        logger.info(MODULE, 'finish', `webm blob size=${blob.size}`);
        const ab = await blob.arrayBuffer();
        const dr = await window.electronAPI!.voskDecode!(ab);
        logger.info(MODULE, 'finish', `voskDecode=${JSON.stringify(dr)}`);
      };
      stopMedia()
        .then(feedRecording)
        .then(() => window.electronAPI!.voskFinish!())
        .then((r) => {
          logger.info(MODULE, 'finish', `voskFinish=${JSON.stringify(r)}`);
          settle(r?.text ?? '');
        })
        .catch((e) => {
          console.warn('[speechEval] finish 链路异常:', e);
          settle('');
        })
        .finally(cleanup);
    } else {
      // 非 vosk 路径：同样停表收集录音（回放用）后再出分
      stopMedia()
        .then(() => {
          if (mediaChunks.length > 0) {
            const blob = new Blob(mediaChunks, {
              type: mediaRecorder?.mimeType || 'audio/webm',
            });
            mediaChunks = [];
            if (blob.size > 0) recordedBlob = blob;
          }
        })
        .catch(() => {})
        .then(() => {
          cleanup();
          settle('');
        });
    }
  };

  // --- 麦克风 + 音量分析 + vosk 录音采集 ---
  const startAudio = async (useVosk: boolean): Promise<boolean> => {
    if (!navigator.mediaDevices?.getUserMedia) {
      micFailed = true;
      finish();
      return false;
    }
    try {
      // 3 秒拿不到流视为失败：上次 stop 后设备未释放完/被占用时 getUserMedia 可能挂起，
      // 不设超时会卡满 maxRecordMs 才出结果，用户感知是"点了没反应"
      stream = await Promise.race([
        navigator.mediaDevices.getUserMedia({ audio: true }),
        new Promise<never>((_, rej) =>
          setTimeout(() => rej(new Error('microphone-open-timeout')), 3000)
        ),
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return true; // 拿到流但没有 AudioContext：跳过音量分析，仍可走识别
      // 默认采样率（48k）。本机 ScriptProcessorNode + getUserMedia 组合会死锁主线程
      // （onaudioprocess 首帧分发冻结），故实时音量走 AnalyserNode，PCM 采集走 MediaRecorder
      audioContext = new Ctx();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);

      // vosk 录音：MediaRecorder（旧版已验证稳定），结束后统一解码喂给识别器
      if (useVosk && window.electronAPI?.voskChunk) {
        try {
          mediaChunks = [];
          mediaRecorder = new MediaRecorder(stream);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mediaRecorder.ondataavailable = (e: any) => {
            if (e.data && e.data.size > 0) mediaChunks.push(e.data);
          };
          mediaRecorder.start(); // 无 timeslice：stop() 时单次吐块（start(timeslice) 与 stop() 在本机有死锁）
        } catch (err) {
          console.warn('[speechRecognition] MediaRecorder 启动失败:', err);
        }
      }

      const buf = new Uint8Array(analyser.fftSize);
      const freqBuf = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (settled) return;
        analyser.getByteTimeDomainData(buf);
        analyser.getByteFrequencyData(freqBuf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) {
          const v = (buf[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / buf.length);
        const level = Math.min(1, rms * 4); // 视觉增益：正常人声 rms≈0.05-0.3 → 0.2-1.0
        totalFrames++;
        if (level > VOICED_LEVEL_THRESHOLD) voicedFrames++;
        if (level > maxLevel) maxLevel = level;
        const spectral = computeSpectralFrame(freqBuf);
        if (levelFrames.length < 12000) levelFrames.push({ i: totalFrames, level, spectral });
        onLevel?.(level);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      return true;
    } catch {
      // 权限被拒 / 设备占用 / 打开超时
      micFailed = true;
      finish();
      return false;
    }
  };

  // --- Web Speech 识别（vosk 不可用时的备选） ---
  // Chromium 的语音识别依赖 Google 云端服务（Electron 无内置 API key，国内网络也不可达），
  // 典型表现是 start 成功但永远不返回结果（不报错也不触发 onend）。
  // watchdog：启动后 8 秒仍无识别结果就放弃识别，走音量评估降级，不让用户干等。
  const startRecognition = () => {
    const Constructor = getSpeechRecognitionConstructor();
    if (!Constructor) return;
    recognition = new Constructor();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results: string[] = [];
      let bestConfidence = 0;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          results.push(event.results[i][0].transcript);
          // 取最高置信度作为本次识别的整体置信度
          const c = event.results[i][0].confidence;
          if (c > bestConfidence) bestConfidence = c;
        }
      }
      if (results.length > 0) {
        transcript = results.join(' ');
        recognitionDone = true;
        // 置信度低于 0.4 时，识别结果不可靠——仍出分但标记低置信
        if (bestConfidence < 0.4) {
          console.warn(`[speechRecognition] 识别置信度偏低: ${bestConfidence.toFixed(2)}，文本: "${transcript}"`);
        }
        if (recognitionWatchdog) clearTimeout(recognitionWatchdog);
      }
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.warn('[speechRecognition] 识别出错:', event.error);
      // 不立即 finish：让音量分析继续跑到超时/手动停止（Electron 里识别常因网络失败）
    };
    recognition.onend = () => {
      // 识别自然结束（用户读完一句话）：立即出分
      finish();
    };
    try {
      recognition.start();
      recognitionWatchdog = setTimeout(() => {
        if (!recognitionDone && !settled) {
          console.warn('[speechRecognition] 识别 8 秒无结果（云端服务不可达），放弃识别走音量评估');
          finish();
        }
      }, 8000);
    } catch (err) {
      console.warn('[speechRecognition] 启动失败:', err);
      recognition = null;
    }
  };

  timeoutId = setTimeout(finish, maxRecordMs);

  // 主流程：先建 vosk 会话（含惰性加载模型）→ 建音频采集 → vosk 失败才走 Web Speech
  (async () => {
    let voskOk = false;
    try {
      logger.info(MODULE, 'start', 'voskStart 调用前');
      if (window.electronAPI?.voskStart) {
        const r = await window.electronAPI.voskStart();
        logger.info(MODULE, 'start', `voskStart=${JSON.stringify(r)}`);
        voskOk = !!r?.ok;
        if (!voskOk && r?.error) {
          logger.warn(MODULE, 'start', `vosk 会话建立失败: ${r.error}`);
        }
      } else {
        logger.warn(MODULE, 'start', 'electronAPI.voskStart 不存在');
      }
    } catch (e) {
      logger.warn(MODULE, 'start', `voskStart 异常: ${String(e)}`);
      voskOk = false;
    }
    voskSessionOk = voskOk;
    logger.info(MODULE, 'start', `voskSessionOk=${voskSessionOk}`);
    const audioOk = await startAudio(voskOk);
    logger.info(MODULE, 'start', `startAudio=${audioOk}`);
    if (settled) return;
    // vosk 已主导识别；vosk 不可用时才尝试 Web Speech（浏览器环境可能有服务）
    if (!audioOk) return;
    if (!voskOk) startRecognition();
  })();

  return {
    promise,
    stop: () => finish(),
  };
}
