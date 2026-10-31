/**
 * 剧场环境音：纯 WebAudio 合成，零音频素材依赖（离线可用）
 * - 夜景：蟋蟀高频三连啁啾（随机间隔，不机械）
 * - 户外（河/公园/街）：低通白噪风声 + 缓慢起伏
 * - 室内/舞台：极轻空气底噪（近乎不可闻，只填"死寂"）
 * 音量整体极低，作氛围垫不抢 TTS；创建失败静默降级
 */

let ctx: AudioContext | null = null;
let stopFns: Array<() => void> = [];

const OUTDOOR_BGS = new Set(['river', 'park', 'street']);

function ensureCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function makeNoiseBuffer(c: AudioContext, sec = 2): AudioBuffer {
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * sec), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

/** 切换环境音（bg 未变时不重启，避免风声从头再来） */
export function startAmbient(bg: string): void {
  stopAmbient();
  try {
    const c = ensureCtx();
    const master = c.createGain();
    master.gain.value = 0;
    master.connect(c.destination);
    // 2 秒淡入，避免"啪"一声起垫
    master.gain.linearRampToValueAtTime(bg === 'night' ? 0.16 : 0.1, c.currentTime + 2);
    const stops: Array<() => void> = [];

    if (bg === 'night') {
      // 蟋蟀：随机间隔的高频三连短音
      const chirp = () => {
        const t0 = c.currentTime;
        for (let k = 0; k < 3; k++) {
          const o = c.createOscillator();
          const g = c.createGain();
          o.type = 'sine';
          o.frequency.value = 4100 + Math.random() * 900;
          const ts = t0 + k * 0.09;
          g.gain.setValueAtTime(0, ts);
          g.gain.linearRampToValueAtTime(0.5, ts + 0.015);
          g.gain.exponentialRampToValueAtTime(0.001, ts + 0.07);
          o.connect(g);
          g.connect(master);
          o.start(ts);
          o.stop(ts + 0.1);
        }
      };
      const iv = setInterval(() => {
        if (Math.random() < 0.75) chirp();
      }, 900);
      stops.push(() => clearInterval(iv));
    } else if (OUTDOOR_BGS.has(bg)) {
      // 风声：循环噪声 → 低通 → LFO 起伏
      const src = c.createBufferSource();
      src.buffer = makeNoiseBuffer(c);
      src.loop = true;
      const lp = c.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 380;
      lp.Q.value = 0.6;
      const g = c.createGain();
      g.gain.value = 0.35;
      const lfo = c.createOscillator();
      lfo.frequency.value = 0.08;
      const lfoG = c.createGain();
      lfoG.gain.value = 0.18;
      lfo.connect(lfoG);
      lfoG.connect(g.gain);
      src.connect(lp);
      lp.connect(g);
      g.connect(master);
      src.start();
      lfo.start();
      stops.push(() => {
        try {
          src.stop();
          lfo.stop();
        } catch {
          /* 已停止 */
        }
      });
    } else {
      // 室内：极轻空气底噪
      const src = c.createBufferSource();
      src.buffer = makeNoiseBuffer(c);
      src.loop = true;
      const lp = c.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 220;
      const g = c.createGain();
      g.gain.value = 0.12;
      src.connect(lp);
      lp.connect(g);
      g.connect(master);
      src.start();
      stops.push(() => {
        try {
          src.stop();
        } catch {
          /* 已停止 */
        }
      });
    }
    stopFns = [
      ...stops,
      () => {
        try {
          master.disconnect();
        } catch {
          /* noop */
        }
      },
    ];
  } catch {
    /* 音频不可用：静默降级 */
  }
}

export function stopAmbient(): void {
  for (const s of stopFns) {
    try {
      s();
    } catch {
      /* noop */
    }
  }
  stopFns = [];
}
