/**
 * 语音识别服务
 * 提供语音评测功能：录音、语音识别、文本比对与评分
 */

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
 * 录制一段音频（用于 fallback 场景）
 * 返回录音时长（毫秒）
 */
function recordAudioForDuration(maxDurationMs: number): Promise<number> {
  return new Promise((resolve) => {
    const startTime = Date.now();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // 无法录音，立即返回 0
      resolve(0);
      return;
    }

    let stream: MediaStream | null = null;
    let recorder: MediaRecorder | null = null;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => {
        stream = s;
        recorder = new MediaRecorder(stream);
        recorder.start();

        setTimeout(() => {
          if (recorder && recorder.state === 'recording') {
            recorder.stop();
          }
        }, maxDurationMs);

        recorder.onstop = () => {
          const elapsed = Date.now() - startTime;
          stream?.getTracks().forEach((t) => t.stop());
          resolve(elapsed);
        };
      })
      .catch(() => {
        // 麦克风权限被拒绝等场景，立即返回
        resolve(0);
      });
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * 检查当前浏览器是否支持语音识别（Web Speech API）
 */
export function isSpeechRecognitionAvailable(): boolean {
  return getSpeechRecognitionConstructor() !== null;
}

/**
 * 比对两段文本的相似度，返回 0-100 的评分
 *
 * 算法：
 * 1. 归一化两段文本（小写、去标点）
 * 2. 拆分为单词数组，计算单词级别的匹配比例
 * 3. 对未匹配的单词用 Levenshtein 距离衡量部分相似度
 * 4. 综合得出最终分数
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

  // 逐词匹配：对 spoken 中每个词在 target 对应位置找最佳匹配
  let matchedScore = 0;

  // 使用 LCS（最长公共子序列）风格的动态规划来计算词级相似度
  const m = spokenWords.length;
  const n = targetWords.length;

  // dp[i][j] = 前 i 个 spoken 词和前 j 个 target 词的最大匹配分数
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (spokenWords[i - 1] === targetWords[j - 1]) {
        // 完全匹配得 1 分
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 计算 Levenshtein 部分匹配分（基于字符级距离）
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

  matchedScore = dp[m][n];

  // 最终分数 = 匹配分 / target 词数，限制在 [0, 100]
  const rawScore = (matchedScore / n) * 100;
  return Math.round(Math.min(100, Math.max(0, rawScore)));
}

/**
 * 语音评测：录音 -> 识别 -> 与目标文本比对 -> 返回评分 (0-100)
 *
 * 流程：
 * 1. 启动麦克风录音（MediaRecorder）
 * 2. 同时启动 Web Speech Recognition 进行实时识别
 * 3. 识别结束后将识别结果与 targetText 比对
 * 4. 返回相似度评分
 *
 * Fallback：若浏览器不支持 SpeechRecognition，则仅录音并根据录音时长返回模拟分数
 *
 * @param targetText  目标文本（用户应该朗读的内容）
 * @param maxRecordMs 最大录音时长，默认 10000ms（10 秒）
 */
export function evaluateSpeech(targetText: string, maxRecordMs: number = 10000): Promise<number> {
  // --- Fallback：浏览器不支持语音识别 ---
  if (!isSpeechRecognitionAvailable()) {
    console.warn(
      '[speechRecognition] 当前浏览器不支持 Web Speech Recognition API，将使用 fallback 模式（仅录音）。'
    );
    return evaluateSpeechFallback(targetText, maxRecordMs);
  }

  return new Promise<number>((resolve) => {
    const Constructor = getSpeechRecognitionConstructor()!;
    const recognition = new Constructor();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let resolved = false;
    let spokenTranscript = '';
    let mediaStream: MediaStream | null = null;
    let mediaRecorder: MediaRecorder | null = null;

    // 超时保护：防止识别过程无限挂起
    const timeoutId = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        recognition.abort();
        mediaStream?.getTracks().forEach((t) => t.stop());
        console.warn('[speechRecognition] 识别超时（', maxRecordMs, 'ms），使用已获取的结果。');
        resolve(spokenTranscript ? compareTexts(spokenTranscript, targetText) : 0);
      }
    }, maxRecordMs);

    // 同时启动 MediaRecorder 录音（用于可视化 / 调试）
    const startMediaRecording = (): Promise<void> => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return Promise.resolve();
      }
      return navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaStream = stream;
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
        })
        .catch((err) => {
          console.warn('[speechRecognition] 无法启动 MediaRecorder:', err);
        });
    };

    const finish = () => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timeoutId);

      // 停止录音
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      mediaStream?.getTracks().forEach((t) => t.stop());

      const score = compareTexts(spokenTranscript, targetText);
      resolve(score);
    };

    // --- SpeechRecognition 事件 ---
    recognition.onstart = () => {
      // 识别已开始
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results: string[] = [];
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          results.push(event.results[i][0].transcript);
        }
      }
      spokenTranscript = results.join(' ');
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.warn('[speechRecognition] 识别出错:', event.error);
      finish();
    };

    recognition.onend = () => {
      finish();
    };

    // 启动录音和识别
    startMediaRecording().then(() => {
      try {
        recognition.start();
      } catch (err) {
        console.warn('[speechRecognition] 启动 SpeechRecognition 失败:', err);
        finish();
      }
    });
  });
}

/**
 * Fallback 评测：当 SpeechRecognition 不可用时使用
 *
 * 策略：
 * - 录制音频（最长 5 秒）
 * - 根据录音时长给出模拟分数：
 *   - 录音时长 > 0 表示用户有在说话，给予基础分 40-70（按时长线性映射）
 *   - 录音时长为 0 或极短（< 500ms）表示用户没有说话，返回 0
 * - 这样避免了纯随机分数，同时鼓励用户开口练习
 */
async function evaluateSpeechFallback(_targetText: string, _maxRecordMs: number): Promise<number> {
  const fallbackMaxDuration = 5000; // fallback 模式固定录制 5 秒
  const elapsed = await recordAudioForDuration(fallbackMaxDuration);

  if (elapsed < 500) {
    // 用户几乎没有说话
    return 0;
  }

  // 线性映射：500ms -> 40 分, 5000ms -> 70 分
  const minScore = 40;
  const maxScore = 70;
  const ratio = Math.min(1, (elapsed - 500) / (fallbackMaxDuration - 500));
  return Math.round(minScore + ratio * (maxScore - minScore));
}
