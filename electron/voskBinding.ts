/**
 * vosk 离线语音识别绑定（koffi FFI → libvosk.dll）
 *
 * 背景：vosk npm 包依赖 ffi-napi（Node 24 编译失败），改用 koffi 直接绑定
 * vosk 的 C API。dll 及其 mingw 运行时位于 electron/lib/vosk/。
 *
 * 线程模型：AcceptWaveform 为同步调用，单块 PCM（~100ms）处理耗时很小，
 * 在主进程直接执行可接受；识别结果仅在 stop 时取 FinalResult。
 */
import koffi from 'koffi';
import path from 'path';
import fs from 'fs';

const DLL_DIR_CANDIDATES = [
  path.join(__dirname, 'lib', 'vosk'), // 打包场景（files 含 electron/lib/**）
  path.join(__dirname, '..', '..', '..', 'electron', 'lib', 'vosk'), // npm start 直跑（tsc 产物在 dist/electron/electron）
];
export const MODEL_DIR_NAME = 'vosk-model-small-en-us-0.15';

function resolveDllPath(): string {
  for (const dir of DLL_DIR_CANDIDATES) {
    if (fs.existsSync(path.join(dir, 'libvosk.dll'))) return path.join(dir, 'libvosk.dll');
  }
  return path.join(DLL_DIR_CANDIDATES[0], 'libvosk.dll');
}

/** 模型/识别器句柄（opaque 指针，注册类型供下方 func 签名字符串引用） */
koffi.opaque('VoskModel');
koffi.opaque('VoskRecognizer');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lib: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let api: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let model: any = null; // VoskModel 惰性加载后常驻
let modelLoadError: string | null = null;

function ensureLib(): void {
  if (lib) return;
  const dllPath = resolveDllPath();
  if (!fs.existsSync(dllPath)) {
    throw new Error(`libvosk.dll 不存在: ${dllPath}`);
  }
  lib = koffi.load(dllPath);
  // koffi 3.x 语法：lib.func('符号名', '返回类型', [参数类型数组])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api = {
    setLogLevel: lib.func('vosk_set_log_level', 'void', ['int']),
    modelNew: lib.func('vosk_model_new', 'VoskModel *', ['string']),
    modelFree: lib.func('vosk_model_free', 'void', ['VoskModel *']),
    recNew: lib.func('vosk_recognizer_new', 'VoskRecognizer *', ['VoskModel *', 'float']),
    recFree: lib.func('vosk_recognizer_free', 'void', ['VoskRecognizer *']),
    acceptWaveform: lib.func('vosk_recognizer_accept_waveform', 'int', [
      'VoskRecognizer *',
      'void *',
      'int',
    ]),
    finalResult: lib.func('vosk_recognizer_final_result', 'const char *', ['VoskRecognizer *']),
    partialResult: lib.func('vosk_recognizer_partial_result', 'const char *', [
      'VoskRecognizer *',
    ]),
    recReset: lib.func('vosk_recognizer_reset', 'void', ['VoskRecognizer *']),
  };
  api.setLogLevel(-1); // 关闭 vosk 内部日志
}

/** 模型目录是否就绪（含 am/final.mdl 等关键文件） */
export function isModelReady(modelsRoot: string): boolean {
  const dir = path.join(modelsRoot, MODEL_DIR_NAME);
  return (
    fs.existsSync(path.join(dir, 'am', 'final.mdl')) &&
    fs.existsSync(path.join(dir, 'conf', 'model.conf'))
  );
}

/**
 * vosk 内部用 ANSI fopen 打开模型文件，koffi 传的是 UTF-8 字符串——
 * 含中文的模型路径会被按 GBK 误读成乱码导致"模型不存在"（I: 卷 8.3 短名又被禁用）。
 * 解法：在 modelsRoot 所在盘根创建 ASCII 名 junction 指向 modelsRoot，
 * vosk 只看到纯 ASCII 路径，junction 由内核解析，后续文件访问走宽字符 API 不受影响。
 */
function asciiModelsRoot(modelsRoot: string): string {
  // 检测高位字符（非 ASCII）：有则走 junction
  if (!/[\u0080-\uFFFF]/.test(modelsRoot)) return modelsRoot;
  const drive = modelsRoot.slice(0, 3); // 如 'I:\\'
  const junction = path.join(drive, 'ncep-models');
  try {
    if (fs.existsSync(junction)) {
      try {
        const real = fs.realpathSync(junction);
        if (path.resolve(real).toLowerCase() === path.resolve(modelsRoot).toLowerCase()) {
          return junction;
        }
      } catch {
        /* 断链 */
      }
      try {
        fs.rmSync(junction);
      } catch {
        /* 重建时覆盖 */
      }
    }
    fs.symlinkSync(modelsRoot, junction, 'junction');
  } catch (e) {
    throw new Error(`创建 ASCII junction 失败 (${junction}): ${String(e)}`);
  }
  return junction;
}

/** 检查识别可用性（dll + 模型），返回失败原因供 UI 诊断 */
export function voskAvailability(modelsRoot: string): { available: boolean; reason: string } {
  try {
    ensureLib();
  } catch (e) {
    return { available: false, reason: `dll 加载失败: ${String(e)}` };
  }
  if (!isModelReady(modelsRoot)) {
    return { available: false, reason: `模型未就绪: ${path.join(modelsRoot, MODEL_DIR_NAME)}` };
  }
  try {
    asciiModelsRoot(modelsRoot);
  } catch (e) {
    return { available: false, reason: String(e) };
  }
  return { available: true, reason: '' };
}

/** 惰性加载模型（进程内常驻），返回是否成功 */
export function ensureModel(modelsRoot: string): boolean {
  if (model) return true;
  try {
    ensureLib();
    const dir = path.join(asciiModelsRoot(modelsRoot), MODEL_DIR_NAME);
    if (!isModelReady(modelsRoot)) {
      modelLoadError = '模型文件缺失';
      return false;
    }
    model = api.modelNew(dir);
    if (!model) {
      modelLoadError = 'vosk_model_new 返回空';
      return false;
    }
    return true;
  } catch (e) {
    modelLoadError = String(e);
    return false;
  }
}

/** 活跃的识别器（同一时刻只有一个口语题在录音） */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recognizer: any = null;

/** ffmpeg 路径（@ffmpeg-installer 平台二进制；渲染端音频解码在本机死锁，解码统一走主进程 ffmpeg 子进程） */
function resolveFfmpegPath(): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
  const installer = require('@ffmpeg-installer/ffmpeg') as { path: string };
  return installer.path;
}

/**
 * 用 ffmpeg 子进程把录音（webm/opus）解码为 16kHz 16bit mono PCM 并流式喂给 vosk 识别器。
 * 独立进程，完全绕开本机 Chromium 音频栈的死锁（ScriptProcessor/decodeAudioData/AudioWorklet 全灭）。
 */
export function voskDecodeAndFeed(recording: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!recognizer) {
      reject(new Error('vosk 会话未建立'));
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
    const chunks: Buffer[] = [];
    if (!ff || !ff.stdin || !ff.stdout) {
      reject(new Error('ffmpeg 进程创建失败'));
      return;
    }
    ff.stdout.on('data', (c: Buffer) => chunks.push(c));
    ff.on('error', (e: Error) => reject(e));
    ff.on('close', (code: number) => {
      try {
        const pcm = Buffer.concat(chunks);
        if (pcm.length === 0) {
          reject(new Error(`ffmpeg 未产出 PCM（退出码 ${code}）`));
          return;
        }
        for (let i = 0; i < pcm.length; i += 65536) {
          voskChunk(pcm.subarray(i, Math.min(i + 65536, pcm.length)));
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });
    ff.stdin.write(recording);
    ff.stdin.end();
  });
}

/** 开始新会话（创建 16kHz 识别器） */
export function voskStart(modelsRoot: string): { ok: boolean; error?: string } {
  try {
    if (!ensureModel(modelsRoot)) {
      return { ok: false, error: modelLoadError ?? '模型加载失败' };
    }
    // 复用前先释放旧识别器
    voskStopDiscard();
    recognizer = api.recNew(model, 16000);
    if (!recognizer) return { ok: false, error: 'recognizer 创建失败' };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/** 喂入 16kHz 16bit mono PCM 数据（Int16 LE） */
export function voskChunk(pcm: Buffer): boolean {
  if (!recognizer) return false;
  try {
    return api.acceptWaveform(recognizer, pcm, pcm.length) === 1;
  } catch {
    return false;
  }
}

/** 结束会话并取识别文本（小写无标点单词序列），返回后识别器复位供下次复用 */
export function voskFinish(): string {
  if (!recognizer) return '';
  try {
    const raw = api.finalResult(recognizer);
    const parsed = JSON.parse(raw);
    const text = typeof parsed.text === 'string' ? parsed.text : '';
    api.recReset(recognizer);
    return text;
  } catch {
    return '';
  }
}

/** 丢弃当前会话（未出结果直接放弃） */
export function voskStopDiscard(): void {
  if (!recognizer) return;
  try {
    api.recFree(recognizer);
  } catch {
    /* 忽略 */
  }
  recognizer = null;
}
