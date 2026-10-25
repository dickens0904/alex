/**
 * 情景剧场风格主题系统
 *
 * 借鉴 huashu-art-motion 儿童向风格调研结论，落地 6 种可切换画风：
 *   paper      纸片描边卡通（默认，37/52 号卡画法）
 *   flat       当代扁平插画（16_2026：无描边高饱和 + 颗粒）——句型操练课推荐
 *   watercolor 吉卜力水彩（25 号：柔和低饱和 + 水彩纸纹）——自然/抒情场景推荐
 *   pop        波普漫画（13 号：高饱和 + 粗黑描边 + 本戴点）——热闹喜剧推荐
 *   pixel      8-bit 像素（14 号：限色 + 方格纹理 + 12fps 步进）——复古游戏感
 *   papercut   马蒂斯剪纸（30 号：无描边平涂 + 纸纤维）——静物展示推荐
 *   rubberhose 1930 橡皮管（33 号：泛黄胶片 + 12fps 步进）——滑稽打闹推荐
 *
 * 实现层级（不改几何结构，只变换观感）：
 *   - 角色配色：colorTransform(hex) 对每个 FigureSpec 颜色做 HSL 变换
 *   - 描边：颜色/宽度/可无（flat/papercut 无描边）
 *   - 纹理 overlay：水彩纸纹(feTurbulence) / 本戴点(pattern) / 方格(pattern) / 纸纤维 / 颗粒
 *   - 步进帧率：12fps（rubberhose/pixel，rAF 时间取整）——老动画"一顿一顿"是风格的一半
 *   - 舞台滤镜：整体 saturate/sepia 微调
 */

export type StyleId = 'paper' | 'flat' | 'watercolor' | 'pop' | 'pixel' | 'papercut' | 'rubberhose';

export interface StyleTheme {
  id: StyleId;
  name: string;
  icon: string;
  desc: string;
  /** 描边：颜色与宽度；width=0 表示无描边 */
  stroke: { color: string; width: number };
  /** 角色颜色变换（HSL 参数；quantize 为限色档数，像素风用） */
  color: { sat: number; satAdd: number; light: number; lightAdd: number; quantize?: number };
  /** 纹理 overlay：铺在舞台最上层（半透明） */
  overlay: 'none' | 'halftone' | 'grain' | 'watercolor' | 'grid' | 'fiber';
  /** 动画步进帧率（0=连续） */
  stepFps: number;
  /** 舞台整体 CSS 滤镜 */
  stageFilter: string;
  /** 贴纸白边强度（0=关闭） */
  sticker: number;
}

export const STYLE_THEMES: Record<StyleId, StyleTheme> = {
  paper: {
    id: 'paper',
    name: '纸片卡通',
    icon: '🎭',
    desc: '描边平涂纸片人（默认）',
    stroke: { color: '#3a3230', width: 3.4 },
    color: { sat: 1, satAdd: 0, light: 1, lightAdd: 0 },
    overlay: 'none',
    stepFps: 0,
    stageFilter: 'none',
    sticker: 5,
  },
  flat: {
    id: 'flat',
    name: '当代扁平',
    icon: '🟦',
    desc: '无描边高饱和色块 + 颗粒（16 号）',
    stroke: { color: 'transparent', width: 0 },
    color: { sat: 1.12, satAdd: 0.06, light: 1.02, lightAdd: 0.02 },
    overlay: 'grain',
    stepFps: 0,
    stageFilter: 'saturate(1.08)',
    sticker: 3,
  },
  watercolor: {
    id: 'watercolor',
    name: '吉卜力水彩',
    icon: '🎨',
    desc: '柔和低饱和 + 水彩纸纹（25 号）',
    stroke: { color: '#8a6f55', width: 2.4 },
    color: { sat: 0.62, satAdd: 0, light: 0.9, lightAdd: 0.1 },
    overlay: 'watercolor',
    stepFps: 0,
    stageFilter: 'saturate(0.82) brightness(1.04)',
    sticker: 4,
  },
  pop: {
    id: 'pop',
    name: '波普漫画',
    icon: '💥',
    desc: '高饱和粗黑描边 + 本戴点（13 号）',
    stroke: { color: '#111111', width: 4.6 },
    color: { sat: 1.25, satAdd: 0.1, light: 1, lightAdd: 0 },
    overlay: 'halftone',
    stepFps: 0,
    stageFilter: 'saturate(1.25) contrast(1.06)',
    sticker: 6,
  },
  pixel: {
    id: 'pixel',
    name: '8-bit 像素',
    icon: '🕹️',
    desc: '限色方格 + 12fps 步进（14 号）',
    stroke: { color: '#000000', width: 4 },
    color: { sat: 1.05, satAdd: 0, light: 0.95, lightAdd: 0, quantize: 5 },
    overlay: 'grid',
    stepFps: 12,
    stageFilter: 'saturate(1.1)',
    sticker: 0,
  },
  papercut: {
    id: 'papercut',
    name: '马蒂斯剪纸',
    icon: '✂️',
    desc: '无描边平涂 + 纸纤维（30 号）',
    stroke: { color: 'transparent', width: 0 },
    color: { sat: 1.18, satAdd: 0.05, light: 0.96, lightAdd: 0 },
    overlay: 'fiber',
    stepFps: 0,
    stageFilter: 'saturate(1.12)',
    sticker: 2,
  },
  rubberhose: {
    id: 'rubberhose',
    name: '复古橡皮管',
    icon: '🎩',
    desc: '泛黄胶片 + 12fps 步进（33 号）',
    stroke: { color: '#1a1512', width: 4.2 },
    color: { sat: 0.5, satAdd: 0, light: 0.88, lightAdd: 0.1 },
    overlay: 'grain',
    stepFps: 12,
    stageFilter: 'sepia(0.35) saturate(0.85) contrast(1.05)',
    sticker: 0,
  },
};

/** 主题选择顺序（剧场顶栏展示顺序） */
export const STYLE_ORDER: StyleId[] = [
  'paper',
  'flat',
  'watercolor',
  'pop',
  'pixel',
  'papercut',
  'rubberhose',
];

// ==================== 色彩变换 ====================

function hexToHsl(hex: string): [number, number, number] {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360 / 360;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) {
    const v = Math.round(clamp01(l) * 255)
      .toString(16)
      .padStart(2, '0');
    return `#${v}${v}${v}`;
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(clamp01(hue2rgb(p, q, h + 1 / 3)) * 255)
    .toString(16)
    .padStart(2, '0');
  const g = Math.round(clamp01(hue2rgb(p, q, h)) * 255)
    .toString(16)
    .padStart(2, '0');
  const b = Math.round(clamp01(hue2rgb(p, q, h - 1 / 3)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${r}${g}${b}`;
}

const quant = (v: number, steps: number) =>
  Math.round(v * (steps - 1)) / (steps - 1);

/** 按主题变换角色颜色 */
export function transformColor(hex: string, theme: StyleTheme): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;
  if (theme.id === 'paper') return hex;
  const [h, s, l] = hexToHsl(hex);
  const c = theme.color;
  if (c.quantize) {
    // 限色（像素风）：亮度量化 + 饱和量化
    return hslToHex(
      h,
      quant(clamp01(s * c.sat + c.satAdd), 4),
      quant(clamp01(l * c.light + c.lightAdd), c.quantize)
    );
  }
  return hslToHex(
    h,
    clamp01(s * c.sat + c.satAdd),
    clamp01(l * c.light + c.lightAdd)
  );
}

// ==================== 推荐风格表 ====================

/**
 * 每课推荐风格（只列非默认 paper 的课）：
 *   flat      —— 句型操练课（视觉上与叙事剧区分开）
 *   watercolor —— 自然/抒情/旅行场景
 *   pop       —— 热闹喜剧/比赛/新闻
 *   rubberhose —— 滑稽打闹情节
 *   pixel     —— 游戏感场景
 *   papercut  —— 静物展示
 */
export const STYLE_RECOMMEND: Record<number, StyleId> = {
  // 操练课 → 当代扁平（简洁现代，与叙事剧视觉区分）
  6: 'flat', 8: 'flat', 12: 'flat', 14: 'flat', 16: 'flat', 18: 'flat', 20: 'flat',
  22: 'flat', 24: 'flat', 26: 'flat', 28: 'flat', 30: 'flat', 32: 'flat', 34: 'flat',
  36: 'flat', 38: 'flat', 40: 'flat', 42: 'flat', 44: 'flat', 46: 'flat', 48: 'flat',
  50: 'flat', 52: 'flat', 54: 'flat', 56: 'flat', 58: 'flat', 60: 'flat', 62: 'flat',
  64: 'flat', 66: 'flat', 68: 'flat', 70: 'flat', 72: 'flat', 74: 'flat', 76: 'flat',
  78: 'flat', 80: 'flat', 82: 'flat', 84: 'flat', 86: 'flat', 88: 'flat', 90: 'flat',
  92: 'flat', 94: 'flat', 96: 'flat', 98: 'flat', 100: 'flat', 102: 'flat', 104: 'flat',
  106: 'flat', 108: 'flat', 110: 'flat', 112: 'flat', 114: 'flat', 116: 'flat',
  118: 'flat', 120: 'flat', 122: 'flat', 124: 'flat', 126: 'flat', 128: 'flat',
  130: 'flat', 132: 'flat', 134: 'flat', 136: 'flat', 138: 'flat', 140: 'flat',
  142: 'flat', 144: 'flat',
  // 自然/抒情 → 吉卜力水彩
  19: 'watercolor', 31: 'watercolor', 33: 'watercolor', 35: 'watercolor',
  51: 'watercolor', 53: 'watercolor', 55: 'watercolor', 57: 'watercolor',
  67: 'watercolor', 93: 'watercolor', 123: 'watercolor', 143: 'watercolor',
  // 热闹喜剧/比赛/新闻 → 波普漫画
  69: 'pop', 71: 'pop', 95: 'pop', 103: 'pop', 129: 'pop', 133: 'pop', 135: 'pop',
  // 滑稽打闹 → 复古橡皮管
  39: 'rubberhose', 61: 'rubberhose', 77: 'rubberhose', 99: 'rubberhose',
  117: 'rubberhose', 137: 'rubberhose',
  // 游戏感/物件展示 → 像素
  2: 'pixel', 11: 'pixel', 111: 'pixel', 121: 'pixel',
  // 静物展示 → 马蒂斯剪纸
  13: 'papercut', 25: 'papercut', 27: 'papercut', 107: 'papercut',
};

/** 取某课的推荐风格（无推荐则 paper） */
export function recommendStyle(lessonId: number): StyleId {
  return STYLE_RECOMMEND[lessonId] ?? 'paper';
}

// ==================== 用户选择持久化 ====================

const STYLE_KEY = 'theater-style-choice';

/** 用户手动选择（全局记忆；返回 null 表示未手动选过 → 用每课推荐） */
export function getUserStyle(): StyleId | null {
  try {
    const v = localStorage.getItem(STYLE_KEY);
    return v && v in STYLE_THEMES ? (v as StyleId) : null;
  } catch {
    return null;
  }
}

export function saveUserStyle(style: StyleId): void {
  try {
    localStorage.setItem(STYLE_KEY, style);
  } catch {
    /* ignore */
  }
}

export function clearUserStyle(): void {
  try {
    localStorage.removeItem(STYLE_KEY);
  } catch {
    /* ignore */
  }
}
