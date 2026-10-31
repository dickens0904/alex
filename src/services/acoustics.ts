/**
 * 声学特征分析（纯逻辑，便于单测）
 *
 * 与音素对齐互补：音素对齐回答"哪个音没读到"，这里回答"读得顺不顺"。
 * 输入是录音期间逐帧采集的音量（RMS）+ 可选频谱特征，不需要额外模型：
 *   - 停顿：连续若干帧音量低于阈值
 *   - 语速：识别词数 / 有效发音时长
 *   - 音量稳定性：帧音量的离散程度
 *   - 浊音度：低频能量占比（区分清浊辅音 θ/ð、s/z、f/v）
 *   - 摩擦音：高频能量占比（s/ʃ/f/θ 等摩擦音指示）
 *   - 噪声度：谱平坦度（接近 1 = 类噪声，接近 0 = 类谐波）
 */

/** 频谱帧特征（由 getByteFrequencyData 预计算，避免重复分析） */
export interface SpectralFrame {
  /** 低频能量占比 0-1（浊音/元音指示：低频能量集中） */
  lowRatio: number;
  /** 高频能量占比 0-1（摩擦音指示：s/ʃ/f/θ 等高频能量集中） */
  highRatio: number;
  /** 谱平坦度 0-1（噪声指示：接近 1 = 类噪声，接近 0 = 类谐波） */
  flatness: number;
}

export interface LevelFrame {
  /** 帧序号 */
  i: number;
  /** 归一化音量 0-1 */
  level: number;
  /** 频谱特征（可选：由 getByteFrequencyData 预计算，用于浊音度/摩擦音/噪声检测） */
  spectral?: SpectralFrame;
}

export interface AcousticOptions {
  /** 判定为"有声"的帧音量阈值，默认 0.1 */
  voicedThreshold?: number;
  /** 判定为停顿的连续低音量帧数（按 60fps 计），默认 25 帧 ≈ 420ms */
  pauseFrames?: number;
  /** 帧间隔（秒），默认 1/60 */
  frameSec?: number;
}

export interface FluencyResult {
  /** 录音总时长（秒） */
  totalSec: number;
  /** 有效发音时长（秒）：有声帧累计 */
  speechSec: number;
  /** 停顿次数 */
  pauses: number;
  /** 最长停顿（秒） */
  longestPauseSec: number;
  /** 平均停顿（秒） */
  avgPauseSec: number;
  /** 语速：词/分钟（仅在提供词数时计算） */
  wordsPerMinute: number;
  /** 音量稳定性 0-1：1 = 非常平稳，0 = 忽大忽小 */
  volumeStability: number;
  /** 平均音量 */
  avgLevel: number;
  /** 峰值音量 */
  peakLevel: number;
  /** 有声帧占比 0-1 */
  voicedRatio: number;
  /** 浊音度 0-1：有声帧低频能量占比均值（高 = 浊音/元音为主） */
  voicing: number;
  /** 摩擦音占比 0-1：有声帧高频能量占比均值（高 = s/ʃ/f/θ 等摩擦音多） */
  fricativeRatio: number;
  /** 噪声度 0-1：有声帧谱平坦度均值（高 = 类噪声成分多） */
  noiseRatio: number;
}

/**
 * 由逐帧音量计算流利度指标。
 * frames 为空时返回中性值（不报错，避免破坏既有流程）。
 */
export function analyzeAcoustics(frames: LevelFrame[], options: AcousticOptions = {}): FluencyResult {
  const voicedThreshold = options.voicedThreshold ?? 0.1;
  const pauseFrames = options.pauseFrames ?? 25;
  const frameSec = options.frameSec ?? 1 / 60;

  const empty: FluencyResult = {
    totalSec: 0,
    speechSec: 0,
    pauses: 0,
    longestPauseSec: 0,
    avgPauseSec: 0,
    wordsPerMinute: 0,
    volumeStability: 1,
    avgLevel: 0,
    peakLevel: 0,
    voicedRatio: 0,
    voicing: 0,
    fricativeRatio: 0,
    noiseRatio: 0,
  };
  if (frames.length === 0) return empty;

  const voiced = frames.map((f) => f.level >= voicedThreshold);
  const totalSec = frames.length * frameSec;
  const voicedCount = voiced.filter(Boolean).length;
  const speechSec = voicedCount * frameSec;

  // 停顿：连续 voiced 为 false 的片段
  let pauses = 0;
  let longestPause = 0;
  const pauseLengths: number[] = [];
  let run = 0;
  for (const v of voiced) {
    if (!v) {
      run++;
    } else {
      if (run >= pauseFrames) {
        pauses++;
        pauseLengths.push(run);
        if (run * frameSec > longestPause) longestPause = run * frameSec;
      }
      run = 0;
    }
  }
  if (run >= pauseFrames) {
    pauses++;
    pauseLengths.push(run);
    if (run * frameSec > longestPause) longestPause = run * frameSec;
  }

  const avgLevel = frames.reduce((s, f) => s + f.level, 0) / frames.length;
  const peakLevel = frames.reduce((s, f) => (f.level > s ? f.level : s), 0);

  // 音量稳定性：有声帧的均值/标准差，转成 0-1（系数越小越稳）
  const voicedLevels = frames.filter((_, i) => voiced[i]).map((f) => f.level);
  let stability = 1;
  if (voicedLevels.length >= 5) {
    const mean = voicedLevels.reduce((s, v) => s + v, 0) / voicedLevels.length;
    const variance =
      voicedLevels.reduce((s, v) => s + (v - mean) ** 2, 0) / voicedLevels.length;
    const std = Math.sqrt(variance);
    stability = Math.max(0, Math.min(1, 1 - std / (mean || 1)));
  }

  // 频谱特征：仅在有声帧且有 spectral 数据时计算
  const voicedSpectral = frames.filter((_, i) => voiced[i] && frames[i].spectral);
  let voicing = 0;
  let fricativeRatio = 0;
  let noiseRatio = 0;
  if (voicedSpectral.length > 0) {
    voicing = voicedSpectral.reduce((s, f) => s + (f.spectral?.lowRatio ?? 0), 0) / voicedSpectral.length;
    fricativeRatio = voicedSpectral.reduce((s, f) => s + (f.spectral?.highRatio ?? 0), 0) / voicedSpectral.length;
    noiseRatio = voicedSpectral.reduce((s, f) => s + (f.spectral?.flatness ?? 0), 0) / voicedSpectral.length;
  }

  return {
    totalSec,
    speechSec,
    pauses,
    longestPauseSec: longestPause,
    avgPauseSec: pauses > 0 ? pauseLengths.reduce((s, v) => s + v, 0) * frameSec / pauses : 0,
    wordsPerMinute: 0,
    volumeStability: Math.round(stability * 100) / 100,
    avgLevel: Math.round(avgLevel * 1000) / 1000,
    peakLevel: Math.round(peakLevel * 1000) / 1000,
    voicedRatio: Math.round((voicedCount / frames.length) * 100) / 100,
    voicing: Math.round(voicing * 100) / 100,
    fricativeRatio: Math.round(fricativeRatio * 100) / 100,
    noiseRatio: Math.round(noiseRatio * 100) / 100,
  };
}

/**
 * 流利度得分 0-100，用于把「读得顺不顺」并入总分。
 * 停顿过多、语速偏离目标、音量忽大忽小都会扣分。
 *
 * @param f 流利度指标（含 wordsPerMinute）
 * @param targetWordsPerMinute 目标语速，默认 100 词/分钟（儿童朗读新概念第一册的合理值）
 */
export function fluencyScore(f: FluencyResult, targetWordsPerMinute = 100): number {
  if (f.speechSec <= 0) return 100; // 没有有效音频时不惩罚（诊断交给上层）

  let s = 100;

  // 停顿：每多一次停顿扣分，最多扣 25
  const pausePenalty = Math.min(25, f.pauses * 5);
  s -= pausePenalty;

  // 语速：偏离目标语速按比例扣分，最多扣 20
  if (f.wordsPerMinute > 0) {
    const deviation = Math.abs(f.wordsPerMinute - targetWordsPerMinute) / targetWordsPerMinute;
    s -= Math.min(20, deviation * 40);
  }

  // 音量稳定性：最多扣 15
  s -= (1 - f.volumeStability) * 15;

  return Math.max(0, Math.min(100, Math.round(s)));
}

/** 计算语速（词/分钟）——需要词数，由调用方补上 */
export function withWordRate(f: FluencyResult, wordCount: number): FluencyResult {
  if (wordCount <= 0 || f.speechSec <= 0) return f;
  const minutes = f.speechSec / 60;
  return { ...f, wordsPerMinute: Math.round((wordCount / minutes) * 10) / 10 };
}

// ---------------------------------------------------------------------------
// 频谱特征：从 AnalyserNode.getByteFrequencyData 的 0-255 频谱数据计算
// ---------------------------------------------------------------------------

/** 频谱分箱边界（以 fftSize=1024 → 512 bins 为基准，按频率比例划分） */
const SPECTRAL_BINS = 512;
/** 低频区：0-1000Hz（浊音/元音基频区）——约前 1/24 的 bins */
const LOW_FREQ_END = Math.floor(SPECTRAL_BINS / 24);
/** 高频区：4000Hz+（摩擦音能量集中区）——约后 1/6 的 bins */
const HIGH_FREQ_START = Math.floor(SPECTRAL_BINS * 5 / 6);

/**
 * 从频谱字节数组（0-255）计算一帧的频谱特征。
 * getByteFrequencyData 返回的是幅度谱，每 bin 0-255。
 */
export function computeSpectralFrame(freqData: Uint8Array): SpectralFrame {
  const n = freqData.length;
  if (n === 0) return { lowRatio: 0, highRatio: 0, flatness: 0 };

  // 总能量
  let totalEnergy = 0;
  for (let i = 0; i < n; i++) totalEnergy += freqData[i] * freqData[i];

  // 低频能量占比（浊音指示）
  let lowEnergy = 0;
  const lowEnd = Math.min(LOW_FREQ_END, n);
  for (let i = 0; i < lowEnd; i++) lowEnergy += freqData[i] * freqData[i];

  // 高频能量占比（摩擦音指示）
  let highEnergy = 0;
  const highStart = Math.min(HIGH_FREQ_START, n);
  for (let i = highStart; i < n; i++) highEnergy += freqData[i] * freqData[i];

  // 谱平坦度：几何平均 / 算术平均（0 = 纯谐波，1 = 白噪声）
  let logSum = 0;
  let nonZeroCount = 0;
  for (let i = 0; i < n; i++) {
    const v = freqData[i];
    if (v > 0) {
      logSum += Math.log(v);
      nonZeroCount++;
    }
  }
  const flatness = nonZeroCount > 0
    ? Math.exp(logSum / nonZeroCount) / (totalEnergy / n + 1)
    : 0;

  return {
    lowRatio: totalEnergy > 0 ? lowEnergy / totalEnergy : 0,
    highRatio: totalEnergy > 0 ? highEnergy / totalEnergy : 0,
    flatness: Math.max(0, Math.min(1, flatness)),
  };
}
