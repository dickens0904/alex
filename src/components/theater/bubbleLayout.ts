/**
 * 台词气泡布局（纯函数，零依赖）
 *
 * 被两处共用，保证"运行时渲染"与"全量验证脚本"用同一套折行/字号规则：
 *  - src/components/theater/TheaterStage.tsx（SVG 气泡渲染）
 *  - scripts/verify-bubble.ts（1622 句全量布局断言）
 *
 * 规则：按单词折行（超宽单词硬切），字号从大到小逐级降档，
 * 直到 行数≤MAX_LINES 且 高度≤MAX_HEIGHT；短句窄气泡、长句用满宽。
 */

export interface BubbleLayout {
  /** 折行后的文本行 */
  lines: string[];
  fontSize: number;
  /** 气泡宽/高 */
  bw: number;
  bh: number;
  /** 行距（tspan dy 用） */
  lineH: number;
  /** 首行基线相对气泡顶的偏移 */
  firstBaseline: number;
}

/** 舞台内气泡可用宽度上限（舞台 1600，左右各留 40） */
export const BUBBLE_MAX_W = 720;
/** 左右内边距（文本可用宽 = bw - 2*PAD_X） */
const PAD_X = 34;
/** 纵向内边距 */
const PAD_Y = 26;
/** 行数/高度硬上限 */
const MAX_LINES = 5;
const MAX_HEIGHT = 330;

/** 普通台词字号降档序列；旁白整体低一档 */
const SIZE_STEPS = [38, 33, 29, 25, 22, 19];
const NARR_SIZE_STEPS = [32, 28, 25, 22, 19, 17];

/** 粗体无衬线英文的平均字符宽系数（保守取值，实测 Arial Bold ≈0.55em） */
const CHAR_W_FACTOR = 0.56;

/** 按可用宽度把文本折成多行：按单词折，超宽单词按字符硬切 */
function wrapText(text: string, maxTextW: number, charW: number): string[] {
  const maxChars = Math.max(6, Math.floor(maxTextW / charW));
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = '';
  for (const word of words) {
    // 单词本身超行宽：硬切
    if (word.length > maxChars) {
      if (cur) {
        lines.push(cur);
        cur = '';
      }
      for (let i = 0; i < word.length; i += maxChars) {
        lines.push(word.slice(i, i + maxChars));
      }
      continue;
    }
    const candidate = cur ? `${cur} ${word}` : word;
    if (candidate.length <= maxChars) {
      cur = candidate;
    } else {
      lines.push(cur);
      cur = word;
    }
  }
  if (cur) lines.push(cur);
  return lines.length > 0 ? lines : [''];
}

/** 计算气泡布局：字号降档直到满足行数/高度约束 */
export function layoutBubble(text: string, opts?: { narr?: boolean }): BubbleLayout {
  const narr = opts?.narr ?? false;
  const steps = narr ? NARR_SIZE_STEPS : SIZE_STEPS;
  const plain = text.trim() || ' ';
  let chosen: BubbleLayout | null = null;

  for (const fontSize of steps) {
    const charW = fontSize * CHAR_W_FACTOR;
    const textLen = plain.length;
    // 宽度：短句收窄，长句用满
    const bw = Math.min(BUBBLE_MAX_W, Math.max(150, Math.round(120 + textLen * charW)));
    const maxTextW = bw - PAD_X * 2;
    const lines = wrapText(plain, maxTextW, charW);
    const lineH = Math.round(fontSize * 1.3);
    const bh = lines.length * lineH + PAD_Y * 2;
    chosen = {
      lines,
      fontSize,
      bw,
      bh,
      lineH,
      firstBaseline: PAD_Y + Math.round(fontSize * 0.92),
    };
    if (lines.length <= MAX_LINES && bh <= MAX_HEIGHT) break; // 该档位放得下
  }
  // 最后一档仍超约束也直接用（已是最小字号，实际 248 字符 @19px 也 ≤5 行）
  return chosen!;
}
