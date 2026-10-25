/**
 * 离线语音识别绑定（sherpa-onnx 流式 Zipformer 模型）
 *
 * 替代原 koffi FFI 绑定 libvosk 的方案：
 *  - sherpa-onnx 2.x node 版走 WASM/onnxruntime，纯 npm 安装、无需平台 dll；
 *  - Zipformer 模型对童声英文的识别率显著高于 vosk-model-small-en-us-0.15；
 *  - 导出函数签名与旧 voskBinding 完全一致（voskStart/voskChunk/voskFinish/
 *    voskStopDiscard/voskDecodeAndFeed/voskAvailability），IPC 通道与渲染层零改动。
 *
 * 流程与旧版相同：渲染端 MediaRecorder 攒整段 webm → voskDecodeAndFeed 用
 * ffmpeg 子进程解码为 16kHz 16bit mono PCM → finish 时拼接转 float32 喂给
 * Zipformer 流式解码取最终文本。
 */
import path from 'path';
import fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
const sherpa = require('sherpa-onnx') as any;

export const MODEL_DIR_NAME = 'sherpa-zipformer-zh-en-small';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recognizer: any = null; // OnlineRecognizer（进程内常驻，模型只加载一次）
let modelLoadError: string | null = null;

/** 模型目录是否就绪（tokens + 三个 onnx） */
export function isModelReady(modelsRoot: string): boolean {
  const dir = path.join(modelsRoot, MODEL_DIR_NAME);
  if (!fs.existsSync(path.join(dir, 'tokens.txt'))) return false;
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  return files.filter((f) => f.endsWith('.onnx')).length >= 3;
}

/**
 * onnxruntime 在 Windows 上用 ANSI 路径打开模型，含中文的路径会被误读。
 * 解法：在模型盘根创建 ASCII 名 junction 指向模型目录（与旧 vosk 方案一致）。
 */
function asciiModelDir(modelsRoot: string): string {
  const dir = path.join(modelsRoot, MODEL_DIR_NAME);
  if (!/[\u0080-\uFFFF]/.test(dir)) return dir;
  const drive = modelsRoot.slice(0, 3);
  const junction = path.join(drive, 'ncep-asr-models', MODEL_DIR_NAME);
  const junctionRoot = path.dirname(junction);
  try {
    fs.mkdirSync(junctionRoot, { recursive: true });
    try {
      const real = fs.realpathSync(junction);
      if (path.resolve(real).toLowerCase() === path.resolve(dir).toLowerCase()) return junction;
    } catch {
      /* 断链 */
    }
    if (fs.existsSync(junction)) fs.rmSync(junction);
    fs.symlinkSync(dir, junction, 'junction');
  } catch (e) {
    throw new Error(`创建 ASCII junction 失败 (${junction}): ${String(e)}`);
  }
  return junction;
}

/** 检查识别可用性（包 + 模型），返回失败原因供 UI 诊断 */
export function asrAvailability(modelsRoot: string): { available: boolean; reason: string } {
  try {
    if (!sherpa || typeof sherpa.createOnlineRecognizer !== 'function') {
      return { available: false, reason: 'sherpa-onnx 模块加载失败' };
    }
  } catch (e) {
    return { available: false, reason: `sherpa-onnx 加载失败: ${String(e)}` };
  }
  if (!isModelReady(modelsRoot)) {
    return { available: false, reason: `模型未就绪: ${path.join(modelsRoot, MODEL_DIR_NAME)}` };
  }
  try {
    asciiModelDir(modelsRoot);
  } catch (e) {
    return { available: false, reason: String(e) };
  }
  return { available: true, reason: '' };
}

/** 兼容旧名（main.ts / 渲染层 IPC 沿用 vosk* 命名，识别实现已是 sherpa） */
export const voskAvailability = asrAvailability;

/** 惰性创建 OnlineRecognizer（模型常驻内存），返回是否成功 */
export function ensureModel(modelsRoot: string): boolean {
  if (recognizer) return true;
  try {
    const dir = asciiModelDir(modelsRoot);
    const files = fs.readdirSync(dir);
    const pick = (prefix: string) =>
      files.find((f) => f.startsWith(prefix) && f.endsWith('.onnx'));
    const encoder = pick('encoder');
    const decoder = pick('decoder');
    const joiner = pick('joiner');
    if (!encoder || !decoder || !joiner) {
      modelLoadError = `onnx 模型文件缺失（encoder/decoder/joiner）: ${dir}`;
      return false;
    }
    recognizer = sherpa.createOnlineRecognizer({
      modelConfig: {
        transducer: {
          encoder: path.join(dir, encoder),
          decoder: path.join(dir, decoder),
          joiner: path.join(dir, joiner),
        },
        tokens: path.join(dir, 'tokens.txt'),
        numThreads: 2,
        sampleRate: 16000,
        featureDim: 80,
      },
    });
    return true;
  } catch (e) {
    modelLoadError = String(e);
    return false;
  }
}

/** 活跃会话（同一时刻只有一个口语题在录音） */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let stream: any = null;
/** 会话期间暂存的 16kHz 16bit mono PCM */
const pendingChunks: Buffer[] = [];

/** ffmpeg 路径（@ffmpeg-installer 平台二进制；渲染端音频解码在本机死锁，解码统一走主进程 ffmpeg 子进程） */
function resolveFfmpegPath(): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
  const installer = require('@ffmpeg-installer/ffmpeg') as { path: string };
  return installer.path;
}

/**
 * 用 ffmpeg 子进程把录音（webm/opus）解码为 16kHz 16bit mono PCM 并喂给当前会话。
 * 独立进程，完全绕开本机 Chromium 音频栈的死锁（ScriptProcessor/decodeAudioData/AudioWorklet 全灭）。
 */
export function voskDecodeAndFeed(recording: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!stream) {
      reject(new Error('识别会话未建立'));
      return;
    }
    let ff: import('child_process').ChildProcess | null = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { spawn } = require('child_process');
      ff = spawn(
        resolveFfmpegPath(),
        ['-i', 'pipe:0', '-f', 's16le', '-ar', '16000', '-ac', '1', 'pipe:1'],
        { stdio: ['pipe', 'pipe', 'ignore'] }
      );
    } catch (e) {
      reject(e);
      return;
    }
    if (!ff || !ff.stdin || !ff.stdout) {
      reject(new Error('ffmpeg 进程创建失败'));
      return;
    }
    ff.stdout.on('data', (c: Buffer) => pendingChunks.push(c));
    ff.on('error', (e: Error) => reject(e));
    ff.on('close', (code: number) => {
      if (pendingChunks.length === 0) {
        reject(new Error(`ffmpeg 未产出 PCM（退出码 ${code}）`));
        return;
      }
      resolve();
    });
    ff.stdin.write(recording);
    ff.stdin.end();
  });
}

/** 开始新会话（创建识别流） */
export function voskStart(modelsRoot: string): { ok: boolean; error?: string } {
  try {
    if (!ensureModel(modelsRoot)) {
      return { ok: false, error: modelLoadError ?? '模型加载失败' };
    }
    // 复用前先释放旧会话
    voskStopDiscard();
    stream = recognizer.createStream();
    pendingChunks.length = 0;
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/** 喂入 16kHz 16bit mono PCM 数据（Int16 LE），暂存到会话缓冲 */
export function voskChunk(pcm: Buffer): boolean {
  if (!stream) return false;
  pendingChunks.push(pcm);
  return true;
}

/**
 * 结束会话并取识别文本（小写无标点单词序列）。
 * 拼接全部 PCM → Int16 → Float32 → 流式解码 → 最终结果，随后释放流供下次复用。
 */
export function voskFinish(): string {
  if (!stream || !recognizer) return '';
  try {
    let total = 0;
    for (const c of pendingChunks) total += Math.floor(c.length / 2);
    const samples = new Float32Array(total);
    let off = 0;
    for (const c of pendingChunks) {
      const n = Math.floor(c.length / 2);
      for (let i = 0; i < n; i++) {
        samples[off + i] = c.readInt16LE(i * 2) / 32768;
      }
      off += n;
    }
    // 流式分块喂入（1 秒块，逐块解码）——一次性喂整段大数组不出结果，
    // 这是流式 Zipformer 的标准用法（与 sherpa 官方示例一致）
    const CHUNK = 16000; // 1 秒
    for (let pos = 0; pos < total; pos += CHUNK) {
      stream.acceptWaveform(16000, samples.subarray(pos, Math.min(pos + CHUNK, total)));
      while (recognizer.isReady(stream)) {
        recognizer.decode(stream);
      }
    }
    stream.inputFinished();
    while (recognizer.isReady(stream)) {
      recognizer.decode(stream);
    }
    const result = recognizer.getResult(stream);
    const text = typeof result?.text === 'string' ? result.text.trim() : '';
    return text;
  } catch {
    return '';
  } finally {
    try {
      stream.release?.();
    } catch {
      /* 忽略 */
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stream = null;
    pendingChunks.length = 0;
  }
}

/** 丢弃当前会话（未出结果直接放弃） */
export function voskStopDiscard(): void {
  if (!stream) {
    pendingChunks.length = 0;
    return;
  }
  try {
    stream.release?.();
  } catch {
    /* 忽略 */
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stream = null;
  pendingChunks.length = 0;
}
