/**
 * 连续学习天数追踪服务
 * 使用 localStorage 记录每日学习状态
 */

import { logger } from '../utils/logger';

const STORAGE_KEY = 'daily-streak';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  totalStudyDays: number;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

/** 获取当前连续学习数据 */
export function getStreakData(): StreakData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastStudyDate: '', totalStudyDays: 0 };
}

function saveStreakData(data: StreakData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** 记录今日学习 - 每次完成练习时调用 */
export function recordStudy(): { isNewDay: boolean; streak: number; isNewRecord: boolean } {
  const data = getStreakData();
  const today = getToday();

  if (data.lastStudyDate === today) {
    return { isNewDay: false, streak: data.currentStreak, isNewRecord: false };
  }

  let isNewRecord = false;

  if (data.lastStudyDate === getYesterday()) {
    data.currentStreak += 1;
  } else {
    data.currentStreak = 1;
  }

  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
    isNewRecord = true;
  }

  data.lastStudyDate = today;
  data.totalStudyDays += 1;

  saveStreakData(data);

  logger.success(
    'DailyStreak',
    '记录学习',
    `连续${data.currentStreak}天 | 总${data.totalStudyDays}天${isNewRecord ? ' | 新纪录!' : ''}`
  );
  return { isNewDay: true, streak: data.currentStreak, isNewRecord };
}

/** 获取连续学习等级描述 */
export function getStreakLevel(streak: number): { emoji: string; title: string; color: string } {
  if (streak >= 30) return { emoji: '👑', title: '学习王者', color: '#ffd700' };
  if (streak >= 14) return { emoji: '🏆', title: '学习大师', color: '#ff6b6b' };
  if (streak >= 7) return { emoji: '⭐', title: '学习之星', color: '#4ecdc4' };
  if (streak >= 3) return { emoji: '🔥', title: '学习达人', color: '#ff9f43' };
  if (streak >= 1) return { emoji: '💪', title: '加油', color: '#6c5ce7' };
  return { emoji: '📚', title: '开始学习', color: '#a0a0a0' };
}

/** 检查是否今天已经学习 */
export function hasStudiedToday(): boolean {
  const data = getStreakData();
  return data.lastStudyDate === getToday();
}
