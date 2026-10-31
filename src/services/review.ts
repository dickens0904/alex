/**
 * 错题本存取服务
 *
 * Electron 下走 SQLite（窗口重装不清，多份数据一致）；
 * 非 Electron（浏览器预览 / 数据库不可用）退化为 localStorage，功能不中断。
 */
import type { Exercise } from '../types/lesson';
import { makeExerciseKey, nextSchedule, isDue } from './reviewScheduler';
import { logger } from '../utils/logger';

const MODULE = 'review';
const LS_KEY = 'ncs-review-items';

export interface ReviewItem {
  key: string;
  lesson_id: number;
  practice_type: string;
  exercise: Exercise;
  level: number;
  hits: number;
  misses: number;
  due_at: number;
}

type StoredItem = Omit<ReviewItem, 'exercise'> & { exercise: string };

/** 内存缓存：避免每次作答都全表读取 */
let cache: Map<string, ReviewItem> | null = null;

function parseRows(rows: StoredItem[]): ReviewItem[] {
  return rows.map((r) => {
    let exercise: Exercise;
    try {
      exercise = JSON.parse(r.exercise) as Exercise;
    } catch {
      exercise = { type: r.practice_type, content: {}, answer: '', score: 1 } as Exercise;
    }
    return { ...r, exercise };
  });
}

function readLocal(): ReviewItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? parseRows(JSON.parse(raw) as StoredItem[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(items: ReviewItem[]): void {
  try {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify(items.map((i) => ({ ...i, exercise: JSON.stringify(i.exercise) })))
    );
  } catch {
    // 本地存储不可用时静默降级
  }
}

async function loadAll(): Promise<ReviewItem[]> {
  if (cache) return Array.from(cache.values());
  const api = window.electronAPI;
  let items: ReviewItem[] = [];
  if (api?.reviewAll) {
    try {
      const rows = (await api.reviewAll()) as StoredItem[];
      items = parseRows(rows);
    } catch {
      items = readLocal();
    }
  } else {
    items = readLocal();
  }
  cache = new Map(items.map((i) => [i.key, i]));
  return items;
}

async function persist(item: ReviewItem): Promise<void> {
  cache = cache ?? new Map();
  cache.set(item.key, item);
  const api = window.electronAPI;
  if (api?.reviewSave) {
    try {
      await api.reviewSave({
        key: item.key,
        lesson_id: item.lesson_id,
        practice_type: item.practice_type,
        exercise: JSON.stringify(item.exercise),
        level: item.level,
        hits: item.hits,
        misses: item.misses,
        due_at: item.due_at,
      });
      return;
    } catch {
      // 落盘失败时退回本地存储
    }
  }
  writeLocal(Array.from(cache.values()));
}

async function remove(key: string): Promise<void> {
  cache?.delete(key);
  const api = window.electronAPI;
  if (api?.reviewDelete) {
    try {
      await api.reviewDelete(key);
      return;
    } catch {
      // 落盘失败时退回本地存储
    }
  }
  writeLocal(Array.from(cache?.values() ?? []));
}

/** 读取全部错题 */
export async function getReviewItems(): Promise<ReviewItem[]> {
  return loadAll();
}

/** 读取到期需复习的错题 */
export async function getDueReviewItems(now: number = Date.now()): Promise<ReviewItem[]> {
  const items = await loadAll();
  return items.filter((i) => isDue(i.due_at, now));
}

/** 错题概况 */
export async function getReviewStats(): Promise<{ total: number; due: number }> {
  const api = window.electronAPI;
  if (api?.reviewStats) {
    try {
      return await api.reviewStats();
    } catch {
      // 退回本地计算
    }
  }
  const items = await loadAll();
  return { total: items.length, due: items.filter((i) => isDue(i.due_at)).length };
}

/**
 * 记录一次作答结果：答错入错题本并次日复习；答对升级间隔，掌握后移除。
 * 同一道题在同一课程内只保留一条记录，重试不产生重复项。
 */
export async function recordReviewResult(
  lessonId: number,
  practiceType: string,
  exercise: Exercise,
  correct: boolean
): Promise<void> {
  const key = makeExerciseKey(lessonId, practiceType, exercise);
  const items = await loadAll();
  const existing = items.find((i) => i.key === key);

  if (!existing && correct) return; // 本来就没进错题本，答对无需记录

  const prevLevel = existing?.level ?? 0;
  const schedule = nextSchedule(prevLevel, correct);

  if (schedule.mastered) {
    await remove(key);
    logger.info(MODULE, '错题已掌握', key);
    return;
  }

  const item: ReviewItem = {
    key,
    lesson_id: lessonId,
    practice_type: practiceType,
    exercise,
    level: schedule.level,
    hits: (existing?.hits ?? 0) + (correct ? 1 : 0),
    misses: (existing?.misses ?? 0) + (correct ? 0 : 1),
    due_at: schedule.dueAt,
  };
  await persist(item);
  logger.info(
    MODULE,
    correct ? '错题答对升级' : '错题登记',
    `${key} | 等级 ${prevLevel} → ${schedule.level}`
  );
}

/** 清空内存缓存（切库 / 测试用） */
export function resetReviewCache(): void {
  cache = null;
}
