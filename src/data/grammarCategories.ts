/**
 * 语法专项练习：范畴定义 + 题池构建
 *
 * 思路（仿"一课一练"，防超纲）：
 *   - 每道语法题归属于它所在课的语法范畴（按课语法 title 归类，不用逐题标注）
 *   - 练习范围 = 已完成课程的题目集合 → 没学过的语法点永远不会出现
 *   - 题目按所属课号升序排列（新概念课号天然由易到难），每次推进一组
 *   - 推进游标存 localStorage，学新课解锁新题后从上次进度继续
 */
import { grammarDataEnhanced } from './lessons/grammarDataEnhanced';
import { grammarData } from './lessons/grammarData';
import grammarExtraExercises from './lessons/grammarExtraExercises';
import { grammarAutoExercises } from './lessons/grammarAutoExercises';
import { convertFillExercises } from '../utils/fillToChoice';
import type { GrammarExercise } from '../types/lesson';

/** 语法范畴定义（正则按优先级排列，先命中先归类；匹配对象为去空格小写的课语法标题） */
export interface CategoryDef {
  id: string;
  name: string;
  icon: string;
  /** null 表示特殊范畴（题源不是课语法题，如单词/词组），不参与课归类 */
  match: RegExp | null;
}

export const CATEGORY_DEFS: CategoryDef[] = [
  { id: 'be-present', name: 'be 动词与一般现在时', icon: '🌱', match: /一般现在|三单|主谓一致|be动词|am\/is\/are|表示"存在"/ },
  { id: 'present-continuous', name: '现在进行时', icon: '🏃', match: /现在进行/ },
  { id: 'past-simple', name: '一般过去时', icon: '⏮️', match: /一般过去|过去式/ },
  { id: 'past-continuous', name: '过去进行时', icon: '📜', match: /过去进行/ },
  { id: 'future', name: '一般将来时', icon: '🚀', match: /将来|goingto/ },
  { id: 'present-perfect', name: '现在完成时', icon: '✅', match: /现在完成/ },
  { id: 'past-perfect', name: '过去完成时', icon: '🕰️', match: /过去完成/ },
  { id: 'modal', name: '情态动词', icon: '🔑', match: /情态|mustbe|usedto|need/ },
  { id: 'question', name: '疑问句', icon: '❓', match: /疑问|what|where|when|who|whose|which|how|选择疑问|反义/ },
  { id: 'preposition', name: '介词', icon: '📍', match: /介词|方位/ },
  { id: 'pronoun', name: '代词', icon: '🧩', match: /代词/ },
  { id: 'noun', name: '名词（复数/所有格）', icon: '📦', match: /名词|可数|复数|所有格/ },
  { id: 'article', name: '冠词', icon: '🅰️', match: /冠词|不定冠词|定冠词/ },
  { id: 'comparison', name: '比较级与最高级', icon: '📊', match: /比较级|最高级/ },
  { id: 'there-be', name: 'There be 句型', icon: '🏠', match: /thereis|thereare|therebe|存在句/ },
  { id: 'imperative', name: '祈使句与感叹句', icon: '📢', match: /祈使|感叹/ },
  { id: 'passive', name: '被动语态', icon: '🔄', match: /被动/ },
  { id: 'clause', name: '从句与间接引语', icon: '🌳', match: /从句|间接引语/ },
  { id: 'conjunction', name: '连词与并列句', icon: '🔗', match: /连词|并列|neither|so和|because|when,while|after和before/ },
  // 特殊范畴：题源不是课语法题（match 为 null，不参与课归类）
  { id: 'vocab-words', name: '单词专项', icon: '📖', match: null },
  { id: 'vocab-phrases', name: '词组用法', icon: '🧷', match: null },
  { id: 'mixed', name: '综合练习', icon: '🎯', match: /.*/ },
];

/** 专项练习题：语法题 + 所属课（课号即难度坐标） */
export interface DrillQuestion {
  lessonId: number;
  exercise: GrammarExercise;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface CategoryPool {
  def: CategoryDef;
  /** 全部题目（按课号升序，同课内保持数据顺序） */
  all: DrillQuestion[];
}

/** 课语法标题缓存（enhanced 优先，base 兜底） */
const lessonTitles = new Map<number, string>();
for (const [id, g] of Object.entries<{ title?: string }>(grammarData as Record<number, { title?: string }>)) {
  if (g?.title) lessonTitles.set(Number(id), String(g.title));
}
for (const [id, g] of Object.entries<{ title?: string }>(grammarDataEnhanced as Record<number, { title?: string }>)) {
  if (g?.title) lessonTitles.set(Number(id), String(g.title));
}

/** 按课语法标题归类到范畴（match 为 null 的特殊范畴不参与） */
function categorize(lessonId: number): CategoryDef {
  const title = (lessonTitles.get(lessonId) || '').toLowerCase().replace(/\s+/g, '');
  for (const def of CATEGORY_DEFS) {
    if (!def.match) continue;
    if (def.match.test(title)) return def;
  }
  return CATEGORY_DEFS[CATEGORY_DEFS.length - 1];
}

let cachedPools: CategoryPool[] | null = null;

/**
 * 构建全部范畴的题池（每课题目与 mergeGrammarData 同源：enhanced||base + extra + auto，
 * 统一经 convertFillExercises 转换并补错因，只保留选择题——专项练习全为点选作答）
 */
export function getCategoryPools(): CategoryPool[] {
  if (cachedPools) return cachedPools;

  const pools = new Map<string, DrillQuestion[]>();
  const lessonIds = new Set<number>([
    ...Object.keys(grammarDataEnhanced).map(Number),
    ...Object.keys(grammarData).map(Number),
    ...Object.keys(grammarExtraExercises).map(Number),
    ...Object.keys(grammarAutoExercises).map(Number),
  ]);

  for (const lessonId of lessonIds) {
    const exercises = collectLessonExercises(lessonId);
    if (exercises.length === 0) continue;
    const def = categorize(lessonId);
    if (!pools.has(def.id)) pools.set(def.id, []);
    const list = pools.get(def.id)!;
    for (const exercise of exercises) {
      list.push({ lessonId, exercise });
    }
  }

  cachedPools = CATEGORY_DEFS.filter((d) => d.match && pools.has(d.id)).map((def) => ({
    def,
    all: (pools.get(def.id) || []).sort((a, b) => a.lessonId - b.lessonId),
  }));
  return cachedPools;
}

/** 单课题目集合（enhanced 优先 base 兜底 + 补充练习 + 自动练习，统一转换） */
function collectLessonExercises(lessonId: number): GrammarExercise[] {
  const base: GrammarExercise[] =
    grammarDataEnhanced[lessonId]?.exercises ?? grammarData[lessonId]?.exercises ?? [];
  const extra: GrammarExercise[] = grammarExtraExercises[lessonId] ?? [];
  const auto: GrammarExercise[] = grammarAutoExercises[lessonId] ?? [];
  const merged = [...base, ...extra, ...auto];
  if (merged.length === 0) return [];
  // 统一转选择题 + 补错因，只留可点选作答的题
  return convertFillExercises(merged).filter(
    (ex) => (ex.type || 'choice') === 'choice' && ex.options && ex.options.length >= 2
  );
}

// ==================== 做题进度游标 ====================

const PROGRESS_KEY = 'grammar-drill-progress';

interface DrillProgress {
  [categoryId: string]: number;
}

function loadProgress(): DrillProgress {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveProgress(p: DrillProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

/** 取某范畴的做题游标（已推进的题数） */
export function getDrillCursor(categoryId: string): number {
  return loadProgress()[categoryId] ?? 0;
}

/** 完成一组练习后推进游标 */
export function advanceDrillCursor(categoryId: string, count: number): void {
  const p = loadProgress();
  p[categoryId] = (p[categoryId] ?? 0) + count;
  saveProgress(p);
}

/** 从游标处取一组题（默认 10 题，从易到难） */
export function takeDrillSet(pool: CategoryPool, size = 10): DrillQuestion[] {
  const cursor = getDrillCursor(pool.def.id);
  const start = Math.min(cursor, pool.all.length);
  return pool.all.slice(start, start + size);
}

// ==================== 单词 / 词组专项（题源：教材词表） ====================

/** 教材词表条目（completeLessons 的 content.vocabulary 元素） */
interface VocabRaw {
  word?: string;
  phonetic?: string;
  meaning?: string;
  examples?: string[];
}

interface VocabItem {
  word: string;
  phonetic: string;
  meaning: string;
  examples: string[];
  lessonId: number;
}

let cachedVocabPools: CategoryPool[] | null = null;

/**
 * 构建单词/词组专项题池（异步：词表在 completeLessons 大模块里，动态加载不撑大主包）
 * - 全部词表按 word 去重，归首次出现的课（课号即难度坐标，与语法题池同规则防超纲）
 * - 含空格的词条归「词组用法」，其余归「单词专项」
 * - 题型：看词选义（4 选 1），干扰释义取同池其他词条
 * - 错因：选错时说明"你选的释义其实是哪个词的意思"
 */
export async function getVocabPools(): Promise<CategoryPool[]> {
  if (cachedVocabPools) return cachedVocabPools;
  const mod = await import('./lessons/completeLessons');
  const lessons = mod.default as unknown as Array<{
    id: number;
    content?: { vocabulary?: VocabRaw[] };
  }>;

  const seen = new Set<string>();
  const words: VocabItem[] = [];
  const phrases: VocabItem[] = [];
  for (const lesson of lessons) {
    const vocab = lesson?.content?.vocabulary || [];
    for (const v of vocab) {
      const word = String(v?.word || '').trim();
      const meaning = String(v?.meaning || '').trim();
      if (!word || !meaning) continue;
      const key = word.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const item: VocabItem = {
        word,
        phonetic: String(v?.phonetic || '').trim(),
        meaning,
        examples: (v?.examples || []).map(String),
        lessonId: lesson.id,
      };
      if (/\s/.test(word)) phrases.push(item);
      else words.push(item);
    }
  }

  const defWords = CATEGORY_DEFS.find((d) => d.id === 'vocab-words')!;
  const defPhrases = CATEGORY_DEFS.find((d) => d.id === 'vocab-phrases')!;
  const toQuestions = (items: VocabItem[], pool: VocabItem[]): DrillQuestion[] =>
    items
      .map((it) => ({ lessonId: it.lessonId, exercise: buildVocabExercise(it, pool) }))
      .filter((q) => (q.exercise.options?.length ?? 0) >= 2);

  cachedVocabPools = [
    { def: defWords, all: toQuestions(words, words).sort((a, b) => a.lessonId - b.lessonId) },
    { def: defPhrases, all: toQuestions(phrases, phrases).sort((a, b) => a.lessonId - b.lessonId) },
  ];
  return cachedVocabPools;
}

/** 词义选择题：看词选义，干扰释义取同池其他词条，错因说明干扰项的真实归属 */
function buildVocabExercise(item: VocabItem, pool: VocabItem[]): GrammarExercise {
  const candidates = shuffle(pool.filter((p) => p.meaning !== item.meaning && p.word !== item.word));
  const picked: VocabItem[] = [];
  const seenMeanings = new Set([item.meaning]);
  for (const c of candidates) {
    if (picked.length >= 3) break;
    if (seenMeanings.has(c.meaning)) continue;
    seenMeanings.add(c.meaning);
    picked.push(c);
  }
  const entries = shuffle<{ text: string; note?: string }>([
    { text: item.meaning },
    ...picked.map((p) => ({ text: p.meaning, note: `「${p.meaning}」是「${p.word}」的意思` })),
  ]);
  const options = entries.map((e) => e.text);
  const optionNotes = entries.map((e) => e.note);
  const phonetic = item.phonetic ? `（${item.phonetic}）` : '';
  const example = item.examples.length > 0 ? ` 例句：${item.examples[0]}。` : '';
  return {
    type: 'choice',
    question: `「${item.word}」${phonetic} 的意思是？`,
    options,
    optionNotes,
    answer: options.indexOf(item.meaning),
    explanation: `${item.word}${phonetic} 意为「${item.meaning}」。${example}`,
  };
}
