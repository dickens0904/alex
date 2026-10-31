/**
 * 智能选题引擎（纯逻辑，无副作用，便于单测）
 *
 * 输入一个题型题池和该技能的掌握档位，输出"贴合当前水平、由易到难爬坡"的题目序列：
 *   - 目标难度 = 掌握档位对应的连续分（1 档 → 0.1，5 档 → 0.9）；
 *   - 低于目标的题（热身）→ 贴着目标的题（主练）→ 高于目标的题（挑战），
 *     三段内部各自按难度升序，整体形成爬坡曲线；
 *   - 指定 count 时优先保留离目标最近的题，再按爬坡排序。
 */
import type { Exercise } from '../types/lesson';
import { estimateExerciseDifficulty, type DifficultyBreakdown } from './exerciseDifficulty';
import { getMasteryLevel, type SkillId } from './skillMastery';

/** 掌握档位 → 连续目标难度（与 estimateExerciseDifficulty 的 0-1 分同刻度） */
export function levelToTargetScore(level: number): number {
  const l = Math.max(1, Math.min(5, Math.round(level)));
  return (l - 0.5) / 5;
}

export interface SmartSelectionOptions {
  /** 目标档位 1-5（不传用该技能当前掌握档位） */
  targetLevel?: number;
  /** 最多选几题（不传全选，只重排） */
  count?: number;
}

export interface RankedExercise {
  exercise: Exercise;
  difficulty: DifficultyBreakdown;
}

/** 给题池逐题标注难度（稳定排序：同分保持原顺序） */
export function rankExercises(pool: Exercise[]): RankedExercise[] {
  return pool.map((exercise) => ({ exercise, difficulty: estimateExerciseDifficulty(exercise) }));
}

/**
 * 智能选题：按当前掌握度重排题池为爬坡序列。
 * 题池为空/只有一题时原样返回。
 */
export function selectSmartExercises(
  pool: Exercise[],
  skill: SkillId,
  opts: SmartSelectionOptions = {}
): Exercise[] {
  if (pool.length <= 1) return [...pool];

  const targetLevel = opts.targetLevel ?? getMasteryLevel(skill);
  const target = levelToTargetScore(targetLevel);
  const ranked = rankExercises(pool);

  // 按"离目标的距离"筛选（指定 count 时截到最近的 count 题）
  const withFit = ranked.map((r, i) => ({
    ...r,
    fit: Math.abs(r.difficulty.score - target),
    index: i,
  }));
  withFit.sort((a, b) => a.fit - b.fit || a.index - b.index);
  const kept = opts.count && opts.count > 0 ? withFit.slice(0, opts.count) : withFit;

  // 三段爬坡：热身（低于目标）→ 主练（贴目标）→ 挑战（高于目标）
  const warmup: typeof kept = [];
  const core: typeof kept = [];
  const challenge: typeof kept = [];
  for (const item of kept) {
    if (item.difficulty.score < target - 0.1) warmup.push(item);
    else if (item.difficulty.score > target + 0.1) challenge.push(item);
    else core.push(item);
  }
  const byScore = (a: (typeof kept)[number], b: (typeof kept)[number]) =>
    a.difficulty.score - b.difficulty.score || a.index - b.index;
  warmup.sort(byScore);
  core.sort(byScore);
  challenge.sort(byScore);

  return [...warmup, ...core, ...challenge].map((r) => r.exercise);
}
