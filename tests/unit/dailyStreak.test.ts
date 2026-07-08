/**
 * dailyStreak 连续学习天数服务单元测试
 */

// Mock logger（必须在 import 之前）
jest.mock('../../src/utils/logger', () => ({
  logger: {
    success: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock localStorage
const localStorageMock: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (key: string) => localStorageMock[key] || null,
  setItem: (key: string, value: string) => { localStorageMock[key] = value; },
  removeItem: (key: string) => { delete localStorageMock[key]; },
};
(global as any).window = {};

import {
  getStreakData,
  recordStudy,
  getStreakLevel,
  hasStudiedToday,
} from '../../src/services/dailyStreak';

/** 获取今天日期字符串 YYYY-MM-DD */
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

/** 获取昨天日期字符串 */
function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

/** 获取前天日期字符串 */
function getDayBeforeYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return d.toISOString().split('T')[0];
}

describe('dailyStreak', () => {
  beforeEach(() => {
    // 清空 localStorage
    for (const key in localStorageMock) delete localStorageMock[key];
    jest.clearAllMocks();
  });

  // ==================== getStreakData ====================
  describe('getStreakData', () => {
    test('无数据时返回默认值', () => {
      const data = getStreakData();
      expect(data).toEqual({
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: '',
        totalStudyDays: 0,
      });
    });

    test('返回已保存的数据', () => {
      const saved = {
        currentStreak: 5,
        longestStreak: 10,
        lastStudyDate: '2025-01-01',
        totalStudyDays: 30,
      };
      localStorageMock['daily-streak'] = JSON.stringify(saved);
      const data = getStreakData();
      expect(data).toEqual(saved);
    });

    test('处理损坏的 localStorage 数据', () => {
      localStorageMock['daily-streak'] = 'invalid{json';
      const data = getStreakData();
      expect(data).toEqual({
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: '',
        totalStudyDays: 0,
      });
    });
  });

  // ==================== recordStudy ====================
  describe('recordStudy', () => {
    test('今天已学习过则返回 isNewDay=false', () => {
      const today = getToday();
      localStorageMock['daily-streak'] = JSON.stringify({
        currentStreak: 3,
        longestStreak: 5,
        lastStudyDate: today,
        totalStudyDays: 10,
      });
      const result = recordStudy();
      expect(result.isNewDay).toBe(false);
      expect(result.streak).toBe(3);
      expect(result.isNewRecord).toBe(false);
    });

    test('连续学习（昨天学过）时连续天数+1', () => {
      const yesterday = getYesterday();
      localStorageMock['daily-streak'] = JSON.stringify({
        currentStreak: 3,
        longestStreak: 10,
        lastStudyDate: yesterday,
        totalStudyDays: 10,
      });
      const result = recordStudy();
      expect(result.isNewDay).toBe(true);
      expect(result.streak).toBe(4);
      expect(result.isNewRecord).toBe(false);

      // 验证保存的数据
      const data = JSON.parse(localStorageMock['daily-streak']);
      expect(data.currentStreak).toBe(4);
      expect(data.lastStudyDate).toBe(getToday());
      expect(data.totalStudyDays).toBe(11);
    });

    test('中断学习（前天学过）时连续天数重置为1', () => {
      const dayBefore = getDayBeforeYesterday();
      localStorageMock['daily-streak'] = JSON.stringify({
        currentStreak: 5,
        longestStreak: 10,
        lastStudyDate: dayBefore,
        totalStudyDays: 20,
      });
      const result = recordStudy();
      expect(result.isNewDay).toBe(true);
      expect(result.streak).toBe(1);
      expect(result.isNewRecord).toBe(false);

      const data = JSON.parse(localStorageMock['daily-streak']);
      expect(data.currentStreak).toBe(1);
      expect(data.totalStudyDays).toBe(21);
    });

    test('首次学习时连续天数为1', () => {
      // 无历史数据
      const result = recordStudy();
      expect(result.isNewDay).toBe(true);
      expect(result.streak).toBe(1);

      const data = JSON.parse(localStorageMock['daily-streak']);
      expect(data.currentStreak).toBe(1);
      expect(data.longestStreak).toBe(1);
      expect(data.totalStudyDays).toBe(1);
      expect(data.lastStudyDate).toBe(getToday());
    });

    test('创造新纪录时返回 isNewRecord=true', () => {
      const yesterday = getYesterday();
      localStorageMock['daily-streak'] = JSON.stringify({
        currentStreak: 5,
        longestStreak: 5, // 连续天数等于最长纪录
        lastStudyDate: yesterday,
        totalStudyDays: 10,
      });
      const result = recordStudy();
      expect(result.isNewDay).toBe(true);
      expect(result.streak).toBe(6);
      expect(result.isNewRecord).toBe(true);

      const data = JSON.parse(localStorageMock['daily-streak']);
      expect(data.longestStreak).toBe(6);
    });

    test('未创造新纪录时返回 isNewRecord=false', () => {
      const yesterday = getYesterday();
      localStorageMock['daily-streak'] = JSON.stringify({
        currentStreak: 3,
        longestStreak: 10, // 最长纪录远大于当前
        lastStudyDate: yesterday,
        totalStudyDays: 10,
      });
      const result = recordStudy();
      expect(result.isNewDay).toBe(true);
      expect(result.streak).toBe(4);
      expect(result.isNewRecord).toBe(false);

      const data = JSON.parse(localStorageMock['daily-streak']);
      expect(data.longestStreak).toBe(10); // 保持不变
    });

    test('长时间中断后学习重置连续天数', () => {
      localStorageMock['daily-streak'] = JSON.stringify({
        currentStreak: 20,
        longestStreak: 30,
        lastStudyDate: '2020-01-01',
        totalStudyDays: 100,
      });
      const result = recordStudy();
      expect(result.isNewDay).toBe(true);
      expect(result.streak).toBe(1);
      expect(result.isNewRecord).toBe(false);

      const data = JSON.parse(localStorageMock['daily-streak']);
      expect(data.currentStreak).toBe(1);
      expect(data.longestStreak).toBe(30); // 不变
      expect(data.totalStudyDays).toBe(101);
    });
  });

  // ==================== getStreakLevel ====================
  describe('getStreakLevel', () => {
    test('0天 → 开始学习', () => {
      const level = getStreakLevel(0);
      expect(level.emoji).toBe('📚');
      expect(level.title).toBe('开始学习');
    });

    test('1天 → 加油', () => {
      const level = getStreakLevel(1);
      expect(level.emoji).toBe('💪');
      expect(level.title).toBe('加油');
    });

    test('3天 → 学习达人', () => {
      const level = getStreakLevel(3);
      expect(level.emoji).toBe('🔥');
      expect(level.title).toBe('学习达人');
    });

    test('7天 → 学习之星', () => {
      const level = getStreakLevel(7);
      expect(level.emoji).toBe('⭐');
      expect(level.title).toBe('学习之星');
    });

    test('14天 → 学习大师', () => {
      const level = getStreakLevel(14);
      expect(level.emoji).toBe('🏆');
      expect(level.title).toBe('学习大师');
    });

    test('30天 → 学习王者', () => {
      const level = getStreakLevel(30);
      expect(level.emoji).toBe('👑');
      expect(level.title).toBe('学习王者');
    });

    test('每个等级都有颜色属性', () => {
      const levels = [0, 1, 3, 7, 14, 30, 100];
      for (const streak of levels) {
        const level = getStreakLevel(streak);
        expect(level.color).toBeDefined();
        expect(typeof level.color).toBe('string');
        expect(level.color).toMatch(/^#/);
      }
    });

    test('100天也返回学习王者等级', () => {
      const level = getStreakLevel(100);
      expect(level.title).toBe('学习王者');
    });
  });

  // ==================== hasStudiedToday ====================
  describe('hasStudiedToday', () => {
    test('今天未学习时返回 false', () => {
      localStorageMock['daily-streak'] = JSON.stringify({
        currentStreak: 3,
        longestStreak: 5,
        lastStudyDate: getYesterday(),
        totalStudyDays: 10,
      });
      expect(hasStudiedToday()).toBe(false);
    });

    test('今天已学习时返回 true', () => {
      localStorageMock['daily-streak'] = JSON.stringify({
        currentStreak: 3,
        longestStreak: 5,
        lastStudyDate: getToday(),
        totalStudyDays: 10,
      });
      expect(hasStudiedToday()).toBe(true);
    });

    test('无数据时返回 false', () => {
      expect(hasStudiedToday()).toBe(false);
    });
  });
});
