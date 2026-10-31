/**
 * 题目难度自动推导（纯逻辑，无副作用，便于单测）
 *
 * 课程数据里没有难度标注，选题引擎需要的难度只能从题目自身信号推导：
 *   1. 句长 —— 目标句/题干/短文的词数；
 *   2. 词复杂度 —— 长词（≥3 个音节近似）占比；
 *   3. 选项数 —— 选项越多干扰越强（非选择题用默认值）；
 *   4. 题型权重 —— 有录音支持的听力比"看中文学英文"容易。
 * 四项加权得 0-1 连续分，再映射到 1-5 档（选题与展示共用）。
 */
import type { Exercise } from '../types/lesson';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  1: '简单',
  2: '较易',
  3: '中等',
  4: '较难',
  5: '挑战',
};

export interface DifficultyBreakdown {
  /** 1-5 档 */
  level: DifficultyLevel;
  /** 中文标签（简单/较易/中等/较难/挑战） */
  label: string;
  /** 0-1 连续分（选题排序用，比档位更细） */
  score: number;
  factors: {
    /** 句长得分 0-1 */
    sentenceLength: number;
    /** 词复杂度得分 0-1 */
    wordComplexity: number;
    /** 选项数得分 0-1（非选择题为默认 0.4） */
    optionCount: number;
    /** 题型权重 0-1 */
    typeWeight: number;
  };
}

/** 近似音节数：连续元音字母组记 1 个音节（够用，离线） */
function syllableCount(word: string): number {
  const groups = word.toLowerCase().replace(/[^a-z]/g, '').match(/[aeiouy]+/g);
  return groups ? groups.length : 1;
}

/** 从题目内容里取最长的可用英文文本（短文优先取，代表阅读负担） */
function pickText(exercise: Exercise): string {
  const c = exercise.content;
  const candidates = [c.passage, c.sentence, c.question];
  let best = '';
  for (const t of candidates) {
    if (typeof t === 'string' && t.length > best.length) best = t;
  }
  return best;
}

/** 题型基础权重：越依赖产出/理解深度越高 */
function typeWeightOf(exercise: Exercise): number {
  switch (exercise.type) {
    case 'listening':
      return 0.25;
    case 'speaking': {
      const mode = exercise.content.mode;
      if (mode === 'word') return 0.3; // 单词跟读最简单
      if (mode === 'zh2en') return 0.75; // 看中文学英文最难
      if (mode === 'qa') return 0.7; // 对话问答：听 A 句产出 B 句
      if (mode === 'makeSentence') return 0.65; // 自由造句
      return 0.5;
    }
    case 'spelling':
      return 0.6;
    case 'writing':
      return 0.65;
    case 'reading':
      return 0.55;
    case 'vocabStructure':
      return 0.6;
    default:
      return 0.5;
  }
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * 推导一道题的难度。
 * 权重：句长 35% + 词复杂度 25% + 选项数 15% + 题型 25%。
 */
export function estimateExerciseDifficulty(exercise: Exercise): DifficultyBreakdown {
  const text = pickText(exercise);
  const words = text.split(/\s+/).filter((w) => /[a-zA-Z]/.test(w));

  // 句长：≤4 词得 0 分，≥20 词满分（阅读短文自然拉高）
  const wordCount = words.length;
  const sentenceLength = clamp01((wordCount - 4) / 16);

  // 词复杂度：≥3 音节的"难词"占比（词太少时按难词绝对数给一点分）
  const hardWords = words.filter((w) => syllableCount(w) >= 3).length;
  const wordComplexity = wordCount > 0 ? clamp01(hardWords / Math.max(3, wordCount * 0.4)) : 0;

  // 选项数：2 选 1 最容易，6 选 1 满分；拼写/口语等无选项题给中间默认值
  const options = exercise.content.options;
  const optionCount =
    options && options.length >= 2 ? clamp01((options.length - 2) / 4) : 0.4;

  const typeWeight = typeWeightOf(exercise);

  const score = clamp01(
    sentenceLength * 0.35 + wordComplexity * 0.25 + optionCount * 0.15 + typeWeight * 0.25
  );
  // 先取两位小数再分档，保证对外暴露的 score 与 level 严格一致
  const rounded = Math.round(score * 100) / 100;
  // 0-1 → 1-5 档：0 落在第 1 档，1 落在第 5 档
  const level = Math.max(1, Math.min(5, 1 + Math.floor(rounded * 5))) as DifficultyLevel;

  return {
    level,
    label: DIFFICULTY_LABELS[level],
    score: rounded,
    factors: {
      sentenceLength: Math.round(sentenceLength * 100) / 100,
      wordComplexity: Math.round(wordComplexity * 100) / 100,
      optionCount: Math.round(optionCount * 100) / 100,
      typeWeight,
    },
  };
}
