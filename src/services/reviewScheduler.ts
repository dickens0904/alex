/**
 * 错题本间隔重复调度（纯逻辑，无副作用，便于单测）
 *
 * 设计依据：Leitner 盒子。等级越高间隔越长，答错回退并次日再练；
 * 连续答对达到最高等级即视为掌握，从错题本移除。
 */

/** 各等级对应的复习间隔（天）；索引即等级 */
export const REVIEW_INTERVAL_DAYS = [0, 1, 3, 7, 15, 30];

/** 达到该等级即视为掌握 */
export const MASTERED_LEVEL = REVIEW_INTERVAL_DAYS.length;

const DAY_MS = 24 * 60 * 60 * 1000;

export interface ReviewSchedule {
  level: number;
  dueAt: number;
  mastered: boolean;
}

/**
 * 根据本次作答结果计算下一次调度
 * @param level 当前等级（0 起）
 * @param correct 本次是否答对
 * @param now 当前时间戳（毫秒），默认 Date.now()
 */
export function nextSchedule(
  level: number,
  correct: boolean,
  now: number = Date.now()
): ReviewSchedule {
  const safeLevel = Math.max(0, Math.min(MASTERED_LEVEL - 1, Math.floor(level || 0)));

  if (!correct) {
    // 答错：回退一级，次日再练
    return {
      level: Math.max(0, safeLevel - 1),
      dueAt: now + DAY_MS,
      mastered: false,
    };
  }

  const nextLevel = safeLevel + 1;
  if (nextLevel >= MASTERED_LEVEL) {
    return { level: MASTERED_LEVEL, dueAt: Number.MAX_SAFE_INTEGER, mastered: true };
  }
  return {
    level: nextLevel,
    dueAt: now + REVIEW_INTERVAL_DAYS[nextLevel] * DAY_MS,
    mastered: false,
  };
}

/** 是否已到复习时间 */
export function isDue(dueAt: number, now: number = Date.now()): boolean {
  return dueAt <= now;
}

/**
 * 题目指纹：同一课程、同一练习类型下，按题干内容判定是否为同一道错题。
 * 内容取自 question / sentence / passage / answer，取不到时退化为索引无关标志。
 */
export function makeExerciseKey(
  lessonId: number,
  practiceType: string,
  exercise: { content?: object; answer?: string }
): string {
  const c = (exercise.content ?? {}) as Record<string, unknown>;
  const parts = [c.question, c.sentence, c.passage, exercise.answer]
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
    .join('|');
  return `${lessonId}:${practiceType}:${parts}`;
}
