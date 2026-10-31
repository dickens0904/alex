import {
  analyzeAcoustics,
  fluencyScore,
  withWordRate,
  computeSpectralFrame,
  type LevelFrame,
  type SpectralFrame,
  type FluencyResult,
} from '../../src/services/acoustics';

/** 构造 frames：按给定时长序列产生音量 */
function frames(pattern: Array<number | 'silence'>): LevelFrame[] {
  return pattern.map((v, i) => ({
    i,
    level: v === 'silence' ? 0 : v,
  }));
}

/** 构造带频谱特征的 frames */
function framesWithSpectral(
  pattern: Array<number | 'silence'>,
  spectral?: Partial<SpectralFrame>
): LevelFrame[] {
  return pattern.map((v, i) => ({
    i,
    level: v === 'silence' ? 0 : v,
    spectral: v === 'silence' ? undefined : { lowRatio: 0.5, highRatio: 0.2, flatness: 0.1, ...spectral },
  }));
}

/** 60fps 下，pattern 中每一项等于 1/60 秒 */
describe('analyzeAcoustics - 流利度分析', () => {
  it('空输入返回中性值', () => {
    const r = analyzeAcoustics([]);
    expect(r.speechSec).toBe(0);
    expect(r.pauses).toBe(0);
    expect(r.volumeStability).toBe(1);
    expect(r.totalSec).toBe(0);
  });

  it('连续有声无停顿', () => {
    const r = analyzeAcoustics(frames([0.3, 0.4, 0.5, 0.4, 0.3]));
    expect(r.pauses).toBe(0);
    expect(r.speechSec).toBeCloseTo(5 / 60, 5);
    expect(r.voicedRatio).toBe(1);
  });

  it('识别出停顿', () => {
    // 25 帧静音 ≈ 417ms，触发停顿判定
    const pattern: Array<number | 'silence'> = [0.3, ...Array(30).fill('silence'), 0.3];
    const r = analyzeAcoustics(frames(pattern));
    expect(r.pauses).toBe(1);
    expect(r.longestPauseSec).toBeGreaterThan(0.4);
  });

  it('多个停顿分别计数', () => {
    const pattern: Array<number | 'silence'> = [
      0.3, ...Array(30).fill('silence'), 0.3, ...Array(30).fill('silence'), 0.3,
    ];
    expect(analyzeAcoustics(frames(pattern)).pauses).toBe(2);
  });

  it('短于阈值的静默不算停顿', () => {
    const pattern: Array<number | 'silence'> = [0.3, ...Array(10).fill('silence'), 0.3];
    expect(analyzeAcoustics(frames(pattern)).pauses).toBe(0);
  });

  it('音量忽大忽小时稳定性下降', () => {
    const steady = analyzeAcoustics(frames([0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]));
    const wobbly = analyzeAcoustics(frames([0.1, 0.6, 0.1, 0.6, 0.1, 0.6, 0.1, 0.6]));
    expect(wobbly.volumeStability).toBeLessThan(steady.volumeStability);
  });

  it('统计平均与峰值音量', () => {
    const r = analyzeAcoustics(frames([0.2, 0.4, 0.6]));
    expect(r.peakLevel).toBe(0.6);
    expect(r.avgLevel).toBeCloseTo(0.4, 5);
  });

  it('总时长等于帧数乘帧间隔', () => {
    const r = analyzeAcoustics(frames([0.3, 0.3]), { frameSec: 0.05 });
    expect(r.totalSec).toBe(0.1);
  });
});

describe('withWordRate - 语速', () => {
  it('按有声时长换算词/分钟', () => {
    // 360 帧 = 6 秒有声，读 6 个词 → 60 词/分钟
    const f = analyzeAcoustics(frames(Array(360).fill(0.3)));
    const r = withWordRate(f, 6);
    expect(r.wordsPerMinute).toBeCloseTo(60, 0);
  });

  it('词数为 0 时不计算', () => {
    expect(withWordRate(analyzeAcoustics(frames([0.3])), 0).wordsPerMinute).toBe(0);
  });
});

describe('fluencyScore - 流利度打分', () => {
  const base: FluencyResult = {
    totalSec: 10,
    speechSec: 8,
    pauses: 0,
    longestPauseSec: 0,
    avgPauseSec: 0,
    wordsPerMinute: 100,
    volumeStability: 1,
    avgLevel: 0.3,
    peakLevel: 0.5,
    voicedRatio: 0.8,
    voicing: 0.5,
    fricativeRatio: 0.2,
    noiseRatio: 0.1,
  };

  it('无停顿、语速合适、音量稳定时接近满分', () => {
    expect(fluencyScore(base)).toBeGreaterThan(95);
  });

  it('停顿多则扣分', () => {
    expect(fluencyScore({ ...base, pauses: 6 })).toBeLessThan(fluencyScore(base));
  });

  it('语速偏离目标则扣分', () => {
    expect(fluencyScore({ ...base, wordsPerMinute: 30 })).toBeLessThan(fluencyScore(base));
  });

  it('没有有效音频时不惩罚', () => {
    expect(fluencyScore({ ...base, speechSec: 0 })).toBe(100);
  });

  it('分值落在 0-100', () => {
    const harsh = fluencyScore({ ...base, pauses: 10, wordsPerMinute: 1, volumeStability: 0 });
    expect(harsh).toBeGreaterThanOrEqual(0);
    expect(harsh).toBeLessThanOrEqual(100);
  });
});

describe('computeSpectralFrame - 频谱特征计算', () => {
  it('空数组返回全零', () => {
    const r = computeSpectralFrame(new Uint8Array(0));
    expect(r.lowRatio).toBe(0);
    expect(r.highRatio).toBe(0);
    expect(r.flatness).toBe(0);
  });

  it('低频集中时 lowRatio 高', () => {
    // 前 1/24 的 bins 有能量，其余为零 → lowRatio 接近 1
    const data = new Uint8Array(512);
    for (let i = 0; i < 21; i++) data[i] = 100;
    const r = computeSpectralFrame(data);
    expect(r.lowRatio).toBeGreaterThan(0.9);
    expect(r.highRatio).toBe(0);
  });

  it('高频集中时 highRatio 高', () => {
    // 后 1/6 的 bins 有能量 → highRatio 接近 1
    const data = new Uint8Array(512);
    for (let i = 426; i < 512; i++) data[i] = 100;
    const r = computeSpectralFrame(data);
    expect(r.highRatio).toBeGreaterThan(0.9);
    expect(r.lowRatio).toBe(0);
  });

  it('全零频谱 flatness 为 0', () => {
    const r = computeSpectralFrame(new Uint8Array(512));
    expect(r.flatness).toBe(0);
  });
});

describe('analyzeAcoustics - 频谱特征', () => {
  it('无声谱数据时频谱指标为 0', () => {
    const r = analyzeAcoustics(frames([0.3, 0.4, 0.5]));
    expect(r.voicing).toBe(0);
    expect(r.fricativeRatio).toBe(0);
    expect(r.noiseRatio).toBe(0);
  });

  it('有声帧有频谱数据时计算 voicing', () => {
    const r = analyzeAcoustics(framesWithSpectral([0.3, 0.4, 0.5], { lowRatio: 0.8 }));
    expect(r.voicing).toBeGreaterThan(0.7);
  });

  it('高摩擦音帧使 fricativeRatio 升高', () => {
    const r = analyzeAcoustics(framesWithSpectral([0.3, 0.4, 0.5], { highRatio: 0.7 }));
    expect(r.fricativeRatio).toBeGreaterThan(0.6);
  });

  it('噪声帧使 noiseRatio 升高', () => {
    const r = analyzeAcoustics(framesWithSpectral([0.3, 0.4, 0.5], { flatness: 0.8 }));
    expect(r.noiseRatio).toBeGreaterThan(0.7);
  });

  it('静音帧不参与频谱统计', () => {
    const r = analyzeAcoustics(framesWithSpectral([0.3, 'silence', 0.5], { lowRatio: 0.9 }));
    // 只有 2 个有声帧参与统计
    expect(r.voicing).toBeGreaterThan(0.8);
  });
});
