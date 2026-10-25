/**
 * 语法填空/句式转换题 → 选择题转换器（带错因生成）
 *
 * 语法数据中存在大量 type:'fill'（单词/多词短语/多空逗号分隔/省略号分隔）与
 * type:'transform'（句子改写，渲染层无对应分支会显示"未知练习类型"）的题目：
 * 填空判断按"输入框整串 === fillAnswer"比对——多空题要靠逗号/省略号猜格式，
 * 缩写（isn't）与展开（is not）互不认账，首尾空格外的差异一律判错，儿童打字负担也重。
 *
 * 这里在数据合并阶段把它们统一转成选择题（延续"语法题全改成选择和判断"的决定）：
 *   - 正确项 = fillAnswer / answer 原文（多空显示为 "She / Her"，省略号显示为 ___）
 *   - 干扰项优先级：功能词同族词 > 同课其他题答案 > 词形变体/句子机械变体
 *   - 每个干扰项生成"错因"说明（optionNotes），答错时讲清"为什么这个选项不对"：
 *       · 时态/主谓一致类（be 动词、助动词、否定形式、have 形式）→ 按族给规则说明
 *       · 疑问词/介词/代词/连词/指示词 → 按词义表逐词说明
 *       · 词形变体 → 按形态差异说明（三单 -s、-ing、过去式、双写、变 y）
 *       · 其余 → 通用说明（不给可能瞎编的"具体错因"）
 *   - fill 题解析里追加"完整句子"，多空题正确答案一目了然
 * 判断只看点选，从根上消除输入格式误判。
 */
import type { GrammarExercise } from '../types/lesson';

/** 功能词族：正确答案落在某族时，优先用同族词做干扰（考辨析） */
const WORD_FAMILIES: string[][] = [
  ['am', 'is', 'are', 'was', 'were', 'be', 'been'],
  ["isn't", "aren't", "wasn't", "weren't"],
  ['do', 'does', 'did'],
  ["don't", "doesn't", "didn't"],
  ['have', 'has', 'had'],
  ["haven't", "hasn't", "hadn't"],
  ['will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must'],
  ["can't", "couldn't", "mustn't", "won't", "shouldn't"],
  ['what', 'where', 'when', 'who', 'whose', 'which', 'how', 'why'],
  ['in', 'on', 'at', 'to', 'for', 'with', 'of', 'from', 'by', 'about'],
  ['he', 'his', 'him', 'she', 'her', 'it', 'its'],
  ['they', 'their', 'them', 'we', 'our', 'us', 'you', 'your', 'i', 'me', 'my'],
  ['this', 'that', 'these', 'those'],
  ['some', 'any', 'many', 'much'],
  ['and', 'but', 'or', 'so', 'because'],
];

/** 词义/用法速查表：错因说明的教学价值核心（只收确定无疑的封闭类词） */
const SEMANTICS: Record<string, string> = {
  // 疑问词
  what: '问事物/内容',
  where: '问地点',
  when: '问时间',
  who: '问人（作主语）',
  whom: '问人（作宾语）',
  whose: '问归属',
  which: '在一定范围内选择',
  how: '问方式/程度',
  why: '问原因',
  // 介词（基础用法）
  in: '用于年/月/季节，或表示"在…里面"',
  on: '用于具体某天，或表示"在…表面上"',
  at: '用于具体时刻，或表示"在…小地点"',
  to: '表示方向，"到/向"',
  for: '表示目的或持续时间',
  with: '表示"和…一起"或"用…工具"',
  of: '表示所属关系',
  from: '表示"来自/从…"',
  by: '表示"通过…方式"或"被…"',
  about: '表示"关于"',
  under: '表示"在…下面"',
  over: '表示"在…上方"',
  behind: '表示"在…后面"',
  beside: '表示"在…旁边"',
  near: '表示"在…附近"',
  between: '表示"在（两者）之间"',
  after: '表示"在…之后"',
  before: '表示"在…之前"',
  // 代词（格与指代）
  he: '男性主格，作主语',
  him: '男性宾格，作宾语',
  his: '"他的"（物主代词）',
  she: '女性主格，作主语',
  her: '"她的"（宾格/物主）',
  it: '指物',
  they: '"他们"（主格）',
  them: '"他们"（宾格）',
  their: '"他们的"（物主）',
  we: '"我们"（主格）',
  us: '"我们"（宾格）',
  our: '"我们的"（物主）',
  i: '"我"（主格）',
  me: '"我"（宾格）',
  my: '"我的"（物主）',
  mine: '"我的东西"（名词性物主，独立使用）',
  you: '你/你们',
  your: '"你的/你们的"（物主）',
  yours: '"你的东西"（名词性物主，独立使用）',
  // 指示词
  this: '单数近指',
  that: '单数远指',
  these: '复数近指',
  those: '复数远指',
  // 不定代词
  some: '多用于肯定句',
  any: '多用于否定句和疑问句',
  // 连词
  and: '表并列',
  but: '表转折',
  or: '表选择',
  so: '表结果',
  because: '表原因',
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 判等用的归一化：去大小写与空白标点差异 */
function norm(s: string): string {
  return s.toLowerCase().replace(/[\s.,!?'"()]+/g, '');
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 选项显示格式：省略号 → ___（空位），逗号 → " / "（多空各填一词的观感） */
function displayOf(ans: string): string {
  return ans.replace(/\s*(?:\.\.\.|…)\s*/g, ' ___ ').replace(/\s*,\s*/g, ' / ');
}

/** 把 question 里的空按"连续空段"替换成答案词，还原完整句子 */
function buildFullSentence(question: string, fillAnswer: string): string | null {
  const words = fillAnswer
    .split(/\s*(?:,+|，+|\.\.\.|…)\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (words.length === 0) return null;
  // 空段：下划线起头、内部可用空白连接的连续空（段前空格保留，避免句号后粘连）
  const segRe = /(?:_{2,})(?:\s*_{2,})*/g;
  const segs: Array<{ start: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = segRe.exec(question)) !== null) {
    segs.push({ start: m.index, end: m.index + m[0].length });
  }
  if (segs.length === 0) return null;
  let out = '';
  let cursor = 0;
  segs.forEach((seg, i) => {
    out += question.slice(cursor, seg.start);
    out += words[Math.min(i, words.length - 1)];
    cursor = seg.end;
    // 跳过紧跟空位的动词提示括号，如 "(play)"，完整句里不需要
    const hint = question.slice(cursor).match(/^\s*\([^)]*\)/);
    if (hint) cursor += hint[0].length;
  });
  out += question.slice(cursor);
  return out.replace(/\s+/g, ' ').replace(/\s+([,.!?;:'])/g, '$1').trim();
}

// ==================== 错因生成 ====================

/** 词是否作为完整单词出现在文本中（含撇号词的边界） */
function wordInText(text: string, word: string): boolean {
  return new RegExp(`(?:^|[\\s,./'’])${escapeRe(word)}(?:$|[\\s,./'’])`).test(text);
}

/** 时态/助动词族的错因规则（right/wrong 均为小写） */
function auxiliaryNote(right: string, wrong: string): string | null {
  const BE = ['am', 'is', 'are', 'was', 'were', 'be', 'been'];
  const BE_NEG = ["isn't", "aren't", "wasn't", "weren't"];
  const DO = ['do', 'does', 'did'];
  const DO_NEG = ["don't", "doesn't", "didn't"];
  const HAVE = ['have', 'has', 'had'];
  const HAVE_NEG = ["haven't", "hasn't", "hadn't"];
  const MODAL = ['will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must'];
  const MODAL_NEG = ["can't", "couldn't", "mustn't", "won't", "shouldn't"];
  const has = (set: string[], x: string) => set.includes(x);

  if (has(BE, right) && has(BE, wrong)) {
    return 'be 动词用错：主语 I 用 am，单数（he/she/it）用 is，复数（you/we/they）用 are；过去时用 was/were。本题应该用「' + right + '」。';
  }
  if (has(BE_NEG, right) && has(BE_NEG, wrong)) {
    return "be 动词否定形式用错：一般现在时否定用 isn't/aren't，过去时否定用 wasn't/weren't。本题应该用「" + right + "」。";
  }
  if (has(DO, right) && has(DO, wrong)) {
    return '助动词用错：一般现在时用 do/does（主语三单用 does），一般过去时用 did。本题应该用「' + right + '」。';
  }
  if (has(DO_NEG, right) && has(DO_NEG, wrong)) {
    return "否定形式用错：一般现在时否定用 don't/doesn't（主语三单用 doesn't），过去时否定用 didn't。本题应该用「" + right + "」。";
  }
  if (has(HAVE, right) && has(HAVE, wrong)) {
    return 'have 形式用错：主语三单用 has，复数用 have，过去完成用 had。本题应该用「' + right + '」。';
  }
  if (has(HAVE_NEG, right) && has(HAVE_NEG, wrong)) {
    return "否定形式用错：现在完成时否定用 haven't/hasn't，过去完成时否定用 hadn't。本题应该用「" + right + "」。";
  }
  if (has(MODAL, right) && has(MODAL, wrong)) {
    return '情态动词用错：can 能、may 可能、must 必须、should 应该、will 将要，意思各不相同。本题应该用「' + right + '」。';
  }
  if (has(MODAL_NEG, right) && has(MODAL_NEG, wrong)) {
    return '情态动词否定形式用错。本题应该用「' + right + '」。';
  }
  return null;
}

/** 词形变体的错因（对比正确项与干扰项的形态差异，right/wrong 均为小写纯字母） */
function variantNote(right: string, wrong: string): string | null {
  if (!/^[a-z]+$/.test(right) || !/^[a-z]+$/.test(wrong) || right.length < 3) return null;
  const isIng = (x: string) => x.endsWith('ing') && x.length >= 5;
  const isEd = (x: string) => x.endsWith('ed') && x.length >= 4;
  // 三单/复数 -s/-es
  if (wrong === right + 's' || wrong === right + 'es') {
    return `词形用错：「${wrong}」多了 -s/-es，本题应该用「${right}」。`;
  }
  if (right === wrong + 's' || right === wrong + 'es') {
    return `主语是第三人称单数（或需要复数形式），要用「${right}」。`;
  }
  if (right.endsWith('ies') && wrong === right.slice(0, -3) + 'y') {
    return `辅音字母 + y 结尾，要变 y 为 i 再加 -es：「${right}」。`;
  }
  // -ing
  if (isIng(wrong) && !isIng(right) && (wrong === right + 'ing' || wrong === right.slice(0, -1) + 'ing')) {
    return `这里不需要 -ing 形式，应该用「${right}」。`;
  }
  if (isIng(right) && !isIng(wrong)) {
    const stem = right.slice(0, -3); // 去掉 ing
    // 双写还原：running → runn → run
    const doubled = stem.length >= 2 && stem.slice(-1) === stem.slice(-2, -1) && wrong === stem.slice(0, -1);
    if (wrong === stem || doubled) {
      return `这里需要 -ing 形式（进行时/动名词），要用「${right}」${doubled ? '（重读闭音节，双写末尾字母再加 -ing）' : ''}。`;
    }
  }
  // 过去式/过去分词
  if (isEd(wrong) && !isEd(right) && (wrong === right + 'ed' || wrong === right + 'd' || wrong === right.slice(0, -1) + 'ed')) {
    return `这里不需要过去式/过去分词，应该用「${right}」。`;
  }
  if (isEd(right) && !isEd(wrong)) {
    const candidates = [right.slice(0, -1), right.slice(0, -2)]; // 去 d / 去 ed
    if (right.endsWith('ied')) candidates.push(right.slice(0, -3) + 'y');
    if (candidates.includes(wrong)) {
      if (right.endsWith('ied')) return `辅音字母 + y 结尾，变 y 为 i 再加 -ed，过去式是「${right}」。`;
      return `这里需要过去式/过去分词，要用「${right}」。`;
    }
  }
  return null;
}

/** 同族词干扰的错因（右/wrong 均为原文大小写） */
function familyNote(right: string, wrong: string): string | null {
  const r = right.toLowerCase();
  const w = wrong.toLowerCase();
  const aux = auxiliaryNote(r, w);
  if (aux) return aux;
  // 词义表双查（疑问词/介词/代词/连词/指示词/some-any）
  const rs = SEMANTICS[r];
  const ws = SEMANTICS[w];
  if (rs && ws) return `「${wrong}」${ws}，本题应该用「${right}」（${rs}）。`;
  if (rs) return `「${wrong}」不符合本句用法，本题应该用「${right}」（${rs}）。`;
  if (ws) return `「${wrong}」${ws}，用在这里不对，本题应该用「${right}」。`;
  return null;
}

/** 兜底通用错因 */
function genericNote(right: string, wrong: string): string {
  const vn = variantNote(right.toLowerCase(), wrong.toLowerCase());
  if (vn) return vn;
  return `「${wrong}」不符合本句的语法要求，正确用法是「${right}」。`;
}

/** 干扰项（带错因） */
interface Distractor {
  text: string;
  note?: string;
}

/** 干扰项收集管道：同族词 → 题池 → 变体 → 兜底全族 */
class DistractorPicker {
  private picked: Distractor[] = [];
  private seen = new Set<string>();

  constructor(correct: string) {
    this.seen.add(norm(correct));
  }

  tryAdd(candidates: Distractor[]): void {
    for (const c of shuffle(candidates)) {
      if (this.picked.length >= 3) return;
      const n = norm(c.text);
      if (!n || this.seen.has(n)) continue;
      this.seen.add(n);
      this.picked.push(c);
    }
  }

  take(): Distractor[] {
    return this.picked;
  }
}

/** 正确答案所在功能词族的其他词（带错因） */
function familyDistractors(correct: string): Distractor[] {
  const low = correct.toLowerCase();
  for (const group of WORD_FAMILIES) {
    if (!group.some((w) => wordInText(low, w))) continue;
    const out: Distractor[] = [];
    for (const w of group) {
      if (w.toLowerCase() === low) continue;
      const note = familyNote(correct, w);
      if (note) out.push({ text: w, note });
    }
    if (out.length > 0) return out; // 命中第一个族即可，错因按族保持一致
  }
  return [];
}

/** 词形变体（简易版）：实词干扰用 */
function wordVariants(word: string): string[] {
  const w = word.toLowerCase();
  const out: string[] = [];
  const push = (s: string) => {
    if (s && s !== w && !out.includes(s)) out.push(s);
  };
  if (/[^a-z]/.test(w) || w.length < 3) return out;
  push(w + 's');
  if (/(s|sh|ch|x|z)$/.test(w)) push(w + 'es');
  if (/[^aeiou]y$/.test(w)) push(w.slice(0, -1) + 'ies');
  if (/e$/.test(w)) push(w.slice(0, -1) + 'ing');
  else push(w + 'ing');
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) {
    push(w + w[w.length - 1] + 'ing');
    push(w + w[w.length - 1] + 'ed');
  }
  push(w + 'd');
  push(w + 'ed');
  return out;
}

/** 句子级机械变体（transform 题干扰用） */
function sentenceVariants(sentence: string): string[] {
  const out: string[] = [];
  const push = (s: string) => {
    const t = s.trim();
    if (t && t !== sentence && !out.includes(t)) out.push(t);
  };
  push(sentence.replace(/\bis\b/i, 'are'));
  push(sentence.replace(/\bare\b/i, 'is'));
  push(sentence.replace(/\bWhat colour\b/i, 'Where'));
  push(sentence.replace(/\bWhose\b/i, 'Who'));
  push(sentence.replace(/\bWho\b/i, 'Whose'));
  push(sentence.replace(/\bnot\s+/i, ''));
  push(sentence.replace(/\bis\b/i, 'is not'));
  push(sentence.replace(/\bare\b/i, 'are not'));
  push(sentence.replace(/\bmy\b/i, 'your'));
  push(sentence.replace(/\bmine\b/i, 'yours'));
  return out;
}

/** fill 题 → choice 题 */
function fillToChoice(ex: GrammarExercise, pool: string[]): GrammarExercise {
  const correct = String(ex.fillAnswer ?? '').trim();
  if (!correct) return ex; // 无答案的坏题原样保留（当前数据中不存在）

  const picker = new DistractorPicker(correct);
  picker.tryAdd(familyDistractors(correct));
  picker.tryAdd(pool.map((p) => ({ text: p, note: genericNote(correct, p) })));
  picker.tryAdd(
    correct
      .split(/\s+/)
      .flatMap(wordVariants)
      .map((v) => ({ text: v, note: genericNote(correct, v) }))
  );
  if (picker.take().length < 3) {
    picker.tryAdd(
      WORD_FAMILIES.flat()
        .filter((w) => w.toLowerCase() !== correct.toLowerCase())
        .map((w) => ({ text: w, note: familyNote(correct, w) ?? genericNote(correct, w) }))
    );
  }

  const distractors = picker.take();
  const entries = shuffle<Distractor>([
    { text: displayOf(correct) },
    ...distractors.map((d) => ({ text: displayOf(d.text), note: d.note })),
  ]);
  const options = entries.map((e) => e.text);
  const optionNotes = entries.map((e) => e.note);
  const full = buildFullSentence(ex.question, correct);
  const explanation = full ? `${ex.explanation}（完整句子：${full}）` : ex.explanation;

  return {
    ...ex,
    type: 'choice',
    options,
    optionNotes,
    answer: options.indexOf(displayOf(correct)),
    explanation,
  };
}

/** transform 题 → choice 题（句子改写：正确句 + 变体句做干扰） */
function transformToChoice(ex: GrammarExercise, pool: string[]): GrammarExercise {
  const correct = String(ex.answer ?? '').trim();
  if (!correct) return ex; // 无答案原样保留

  const picker = new DistractorPicker(correct);
  picker.tryAdd(pool.map((p) => ({ text: p, note: genericNote(correct, p) })));
  picker.tryAdd(
    sentenceVariants(correct).map((v) => ({ text: v, note: genericNote(correct, v) }))
  );
  if (picker.take().length < 3) {
    picker.tryAdd(
      WORD_FAMILIES.flat()
        .filter((w) => w.toLowerCase() !== correct.toLowerCase())
        .map((w) => ({ text: w, note: familyNote(correct, w) ?? genericNote(correct, w) }))
    );
  }

  const entries = shuffle<Distractor>([{ text: correct }, ...picker.take()]);
  const options = entries.map((e) => e.text);
  const optionNotes = entries.map((e) => e.note);
  return {
    ...ex,
    type: 'choice',
    options,
    optionNotes,
    answer: options.indexOf(correct),
  };
}

/** 给原生 choice 题补错因（optionNotes），answer 必须是数字索引 */
function annotateChoice(ex: GrammarExercise): GrammarExercise {
  if (typeof ex.answer !== 'number' || !ex.options || ex.optionNotes) return ex;
  const correct = ex.options[ex.answer] ?? '';
  if (!correct) return ex;
  const optionNotes = ex.options.map((opt, idx) => {
    if (idx === ex.answer) return undefined;
    return (
      familyNote(correct, opt) ??
      variantNote(correct.toLowerCase(), opt.toLowerCase()) ??
      genericNote(correct, opt)
    );
  });
  return { ...ex, optionNotes };
}

/** 统一入口：语法练习选择题错因补全 + fill/transform 转换 */
export function convertFillExercises(exercises: GrammarExercise[]): GrammarExercise[] {
  const fillPool = exercises
    .filter((e) => e.type === 'fill')
    .map((e) => String(e.fillAnswer ?? '').trim())
    .filter(Boolean);
  const transformPool = exercises
    .filter((e) => e.type === 'transform')
    .map((e) => String(e.answer ?? '').trim())
    .filter(Boolean);

  return exercises.map((ex) => {
    if (ex.type === 'fill') return fillToChoice(ex, fillPool);
    if (ex.type === 'transform') return transformToChoice(ex, transformPool);
    if (!ex.type || ex.type === 'choice') return annotateChoice(ex); // 原生 choice 补错因
    return ex;
  });
}
