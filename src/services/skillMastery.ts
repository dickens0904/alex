/**
 * 分技能掌握度（纯逻辑 + 可注入存储，便于单测）
 *
 * 每种练习技能（听/说/拼/写/读/词汇结构）独立维护一个 EMA 掌握分：
 *   - 作答正确拉高、错误拉低，最近作答权重更大（α=0.25）；
 *   - 难题答对比易题答对更能说明水平（按难度/3 放大增益，上限 1）；
 *   - EMA 映射到 1-5 档，供智能选题引擎定目标难度。
 *
 * 存储走 localStorage（node 测试环境注入 fake）；键按技能分列，坏了按空数据兜底。
 */
import type { Exercise } from '../types/lesson';
import { estimateExerciseDifficulty } from './exerciseDifficulty';

/** 与 PracticeType 对齐的技能标识 */
export type SkillId = 'listening' | 'speaking' | 'spelling' | 'writing' | 'reading' | 'vocabStructure';

export interface SkillMastery {
  /** 累计作答次数 */
  attempts: number;
  /** 累计答对次数 */
  correct: number;
  /** EMA 掌握分 0-1 */
  ema: number;
  /** 最后更新时间戳 */
  updatedAt: number;
}

/** EMA 平滑系数：最近一次作答占 25% */
export const EMA_ALPHA = 0.25;

const LS_KEY = 'ncs-skill-mastery';

type StorageLike = {
  getItem: (k: string) => string | null;
  setItem: (k: string, v: string) => void;
  removeItem: (k: string) => void;
};

let storageOverride: StorageLike | null = null;

/** 测试/特殊环境注入存储实现；传 null 恢复默认 */
export function setMasteryStorage(s: StorageLike | null): void {
  storageOverride = s;
}

function getStorage(): StorageLike | null {
  if (storageOverride) return storageOverride;
  // node 环境没有 localStorage
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage;
  } catch {
    return null;
  }
}

function readAll(): Partial<Record<SkillId, SkillMastery>> {
  const store = getStorage();
  if (!store) return {};
  try {
    const raw = store.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Partial<Record<SkillId, SkillMastery>>) : {};
  } catch {
    return {};
  }
}

function writeAll(data: Partial<Record<SkillId, SkillMastery>>): void {
  const store = getStorage();
  if (!store) return;
  try {
    store.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // 存储不可用时静默降级（掌握度只影响选题，不影响功能）
  }
}

/** EMA 增量：以 0.5 为中性基线，答对在基线上方（难题更高），答错在下方（易题更低） */
export function emaUpdate(prev: number, correct: boolean, difficultyScore: number): number {
  const d = Math.max(0, Math.min(1, difficultyScore));
  const sample = correct ? 0.5 + d * 0.5 : d * 0.5;
  return Math.round((prev * (1 - EMA_ALPHA) + sample * EMA_ALPHA) * 1000) / 1000;
}

/** EMA → 1-5 档掌握度 */
export function masteryLevel(ema: number): 1 | 2 | 3 | 4 | 5 {
  if (ema < 0.35) return 1;
  if (ema < 0.55) return 2;
  if (ema < 0.75) return 3;
  if (ema < 0.9) return 4;
  return 5;
}

/** 读取某技能掌握度（没有作答记录返回 null） */
export function getSkillMastery(skill: SkillId): SkillMastery | null {
  return readAll()[skill] ?? null;
}

/** 某技能的 1-5 档掌握度（无记录按 1 档） */
export function getMasteryLevel(skill: SkillId): 1 | 2 | 3 | 4 | 5 {
  const m = readAll()[skill];
  return m ? masteryLevel(m.ema) : 1;
}

/** 全部技能掌握度（PracticeMenu 徽章用） */
export function getAllSkillMastery(): Partial<Record<SkillId, SkillMastery>> {
  return readAll();
}

/**
 * 记录一次作答并更新该技能掌握度。
 * @param exercise 原题（用于推导难度）
 */
export function recordSkillAnswer(skill: SkillId, exercise: Exercise, correct: boolean): SkillMastery {
  const all = readAll();
  const prev = all[skill];
  const difficulty = estimateExerciseDifficulty(exercise).score;
  const next: SkillMastery = {
    attempts: (prev?.attempts ?? 0) + 1,
    correct: (prev?.correct ?? 0) + (correct ? 1 : 0),
    ema: emaUpdate(prev?.ema ?? 0.5, correct, difficulty),
    updatedAt: Date.now(),
  };
  all[skill] = next;
  writeAll(all);
  return next;
}

/** 清空全部掌握度（设置页/测试用） */
export function resetSkillMastery(): void {
  const store = getStorage();
  if (!store) return;
  try {
    store.removeItem(LS_KEY);
  } catch {
    // 忽略
  }
}
