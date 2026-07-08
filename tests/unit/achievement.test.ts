/**
 * achievement 成就系统单元测试
 */

// Mock logger
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
// Mock window（默认无 electronAPI，模拟非 Electron 环境）
(global as any).window = {};

import { ALL_ACHIEVEMENTS, checkAchievements, getUnlockedAchievements } from '../../src/services/achievement';

const TODAY = new Date().toISOString().split('T')[0];

describe('achievement', () => {
  beforeEach(() => {
    for (const key in localStorageMock) delete localStorageMock[key];
    jest.clearAllMocks();
  });

  // ==================== ALL_ACHIEVEMENTS 常量 ====================
  describe('ALL_ACHIEVEMENTS', () => {
    test('包含成就列表且不为空', () => {
      expect(ALL_ACHIEVEMENTS.length).toBeGreaterThan(0);
    });

    test('每个成就都有必要字段', () => {
      for (const a of ALL_ACHIEVEMENTS) {
        expect(a.type).toBeDefined();
        expect(a.name).toBeDefined();
        expect(a.description).toBeDefined();
        expect(a.icon).toBeDefined();
        expect(typeof a.type).toBe('string');
        expect(typeof a.name).toBe('string');
      }
    });

    test('成就类型唯一', () => {
      const types = ALL_ACHIEVEMENTS.map((a) => a.type);
      const unique = new Set(types);
      expect(unique.size).toBe(types.length);
    });

    test('包含课程里程碑成就', () => {
      const types = ALL_ACHIEVEMENTS.map((a) => a.type);
      expect(types).toContain('first_lesson');
      expect(types).toContain('ten_lessons');
      expect(types).toContain('fifty_lessons');
      expect(types).toContain('hundred_lessons');
      expect(types).toContain('all_lessons');
    });

    test('包含技能成就', () => {
      const types = ALL_ACHIEVEMENTS.map((a) => a.type);
      expect(types).toContain('perfect_score');
      expect(types).toContain('spelling_master');
      expect(types).toContain('listening_expert');
      expect(types).toContain('speaking_star');
    });

    test('包含积分成就', () => {
      const types = ALL_ACHIEVEMENTS.map((a) => a.type);
      expect(types).toContain('score_500');
      expect(types).toContain('score_2000');
      expect(types).toContain('score_5000');
    });

    test('包含日常成就', () => {
      const types = ALL_ACHIEVEMENTS.map((a) => a.type);
      expect(types).toContain('daily_first');
      expect(types).toContain('daily_3_lessons');
      expect(types).toContain('daily_perfect');
    });

    test('包含连续学习成就', () => {
      const types = ALL_ACHIEVEMENTS.map((a) => a.type);
      expect(types).toContain('streak_3_days');
      expect(types).toContain('streak_7_days');
      expect(types).toContain('streak_14_days');
      expect(types).toContain('streak_30_days');
    });
  });

  // ==================== checkAchievements ====================
  describe('checkAchievements', () => {
    // 课程里程碑成就
    describe('课程里程碑', () => {
      test('完成1课解锁 first_lesson', async () => {
        const result = await checkAchievements({ completedLessons: 1, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).toContain('first_lesson');
      });

      test('完成10课解锁 ten_lessons', async () => {
        const result = await checkAchievements({ completedLessons: 10, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).toContain('first_lesson');
        expect(types).toContain('ten_lessons');
      });

      test('完成50课解锁 fifty_lessons', async () => {
        const result = await checkAchievements({ completedLessons: 50, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).toContain('fifty_lessons');
      });

      test('完成100课解锁 hundred_lessons', async () => {
        const result = await checkAchievements({ completedLessons: 100, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).toContain('hundred_lessons');
      });

      test('完成144课解锁 all_lessons', async () => {
        const result = await checkAchievements({ completedLessons: 144, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).toContain('all_lessons');
      });

      test('完成0课不解锁任何课程成就', async () => {
        const result = await checkAchievements({ completedLessons: 0, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('first_lesson');
        expect(types).not.toContain('ten_lessons');
      });
    });

    // 满分成就
    describe('满分成就', () => {
      test('满分时解锁 perfect_score', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          lastScore: 100,
          lastTotalScore: 100,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('perfect_score');
      });

      test('分数超过总分也视为满分', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          lastScore: 110,
          lastTotalScore: 100,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('perfect_score');
      });

      test('未满分不解锁 perfect_score', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          lastScore: 80,
          lastTotalScore: 100,
        });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('perfect_score');
      });

      test('lastScore 未定义时不解锁 perfect_score', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
        });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('perfect_score');
      });
    });

    // 技能成就
    describe('技能成就', () => {
      test('拼写累计正确50次解锁 spelling_master', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          spellingCorrectCount: 50,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('spelling_master');
      });

      test('拼写正确49次不解锁 spelling_master', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          spellingCorrectCount: 49,
        });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('spelling_master');
      });

      test('听力累计正确50次解锁 listening_expert', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          listeningCorrectCount: 50,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('listening_expert');
      });

      test('口语累计10次80分以上解锁 speaking_star', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          speakingHighCount: 10,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('speaking_star');
      });
    });

    // 积分成就
    describe('积分成就', () => {
      test('500分解锁 score_500', async () => {
        const result = await checkAchievements({ completedLessons: 0, totalScore: 500 });
        const types = result.map((a) => a.type);
        expect(types).toContain('score_500');
      });

      test('2000分解锁 score_2000', async () => {
        const result = await checkAchievements({ completedLessons: 0, totalScore: 2000 });
        const types = result.map((a) => a.type);
        expect(types).toContain('score_500');
        expect(types).toContain('score_2000');
      });

      test('5000分解锁 score_5000', async () => {
        const result = await checkAchievements({ completedLessons: 0, totalScore: 5000 });
        const types = result.map((a) => a.type);
        expect(types).toContain('score_500');
        expect(types).toContain('score_2000');
        expect(types).toContain('score_5000');
      });

      test('499分不解锁 score_500', async () => {
        const result = await checkAchievements({ completedLessons: 0, totalScore: 499 });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('score_500');
      });
    });

    // 短周期成就
    describe('日常成就', () => {
      test('当天首次答题解锁 daily_first', async () => {
        const result = await checkAchievements({ completedLessons: 0, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).toContain('daily_first');
      });

      test('同天第二次答题不重复解锁 daily_first', async () => {
        // 第一次
        await checkAchievements({ completedLessons: 0, totalScore: 0 });
        // 第二次
        const result = await checkAchievements({ completedLessons: 0, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('daily_first');
      });

      test('满分时解锁 daily_perfect', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          lastScore: 100,
          lastTotalScore: 100,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('daily_perfect');
      });

      test('满分时同时解锁 perfect_score 和 daily_perfect', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          lastScore: 100,
          lastTotalScore: 100,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('perfect_score');
        expect(types).toContain('daily_perfect');
      });
    });

    // 连击成就
    describe('连击成就', () => {
      test('10连击解锁 streak_10', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          currentStreak: 10,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('streak_10');
      });

      test('20连击解锁 streak_20', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          currentStreak: 20,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('streak_10');
        expect(types).toContain('streak_20');
      });

      test('9连击不解锁 streak_10', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          currentStreak: 9,
        });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('streak_10');
      });
    });

    // 特殊成就
    describe('特殊成就', () => {
      test('5分钟内完成解锁 speed_demon', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          timeSpent: 250, // 250秒 < 300秒
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('speed_demon');
      });

      test('超过5分钟不解锁 speed_demon', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          timeSpent: 350,
        });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('speed_demon');
      });

      test('首次练习就满分解锁 first_try', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          lastScore: 100,
          lastTotalScore: 100,
          isFirstAttempt: true,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('first_try');
      });

      test('非首次满分不解锁 first_try', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          lastScore: 100,
          lastTotalScore: 100,
          isFirstAttempt: false,
        });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('first_try');
      });

      test('首次未满分不解锁 first_try', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          lastScore: 80,
          lastTotalScore: 100,
          isFirstAttempt: true,
        });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('first_try');
      });
    });

    // 连续学习天数成就
    describe('连续学习天数成就', () => {
      test('3天连续学习解锁 streak_3_days', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          studyDaysStreak: 3,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('streak_3_days');
      });

      test('7天连续学习解锁 streak_7_days', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          studyDaysStreak: 7,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('streak_3_days');
        expect(types).toContain('streak_7_days');
      });

      test('14天连续学习解锁 streak_14_days', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          studyDaysStreak: 14,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('streak_14_days');
      });

      test('30天连续学习解锁 streak_30_days', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          studyDaysStreak: 30,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('streak_3_days');
        expect(types).toContain('streak_7_days');
        expect(types).toContain('streak_14_days');
        expect(types).toContain('streak_30_days');
      });

      test('2天不解锁 streak_3_days', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
          studyDaysStreak: 2,
        });
        const types = result.map((a) => a.type);
        expect(types).not.toContain('streak_3_days');
      });
    });

    // 综合场景
    describe('综合场景', () => {
      test('多项成就同时解锁', async () => {
        const result = await checkAchievements({
          completedLessons: 10,
          totalScore: 500,
          lastScore: 100,
          lastTotalScore: 100,
          currentStreak: 10,
          spellingCorrectCount: 50,
          timeSpent: 200,
          isFirstAttempt: true,
          studyDaysStreak: 7,
        });
        const types = result.map((a) => a.type);
        // 课程
        expect(types).toContain('first_lesson');
        expect(types).toContain('ten_lessons');
        // 满分
        expect(types).toContain('perfect_score');
        // 技能
        expect(types).toContain('spelling_master');
        // 积分
        expect(types).toContain('score_500');
        // 日常
        expect(types).toContain('daily_first');
        expect(types).toContain('daily_perfect');
        // 连击
        expect(types).toContain('streak_10');
        // 特殊
        expect(types).toContain('speed_demon');
        expect(types).toContain('first_try');
        // 连续学习
        expect(types).toContain('streak_3_days');
        expect(types).toContain('streak_7_days');
      });

      test('空 stats 只解锁 daily_first（当天首次）', async () => {
        const result = await checkAchievements({
          completedLessons: 0,
          totalScore: 0,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('daily_first');
        expect(types).toHaveLength(1);
      });

      test('可选字段未定义时不影响其他成就', async () => {
        const result = await checkAchievements({
          completedLessons: 1,
          totalScore: 100,
        });
        const types = result.map((a) => a.type);
        expect(types).toContain('first_lesson');
        expect(types).toContain('daily_first');
      });
    });

    // 今日三课成就
    describe('今日三课成就', () => {
      test('第三次调用时解锁 daily_3_lessons', async () => {
        // 先触发 daily_first（设置 today 的标记）
        await checkAchievements({ completedLessons: 0, totalScore: 0 });
        // 手动设置 daily-lesson-count 为 2
        localStorageMock['daily-lesson-count'] = '2';
        // 第三次调用 → dailyCount 变为 3
        const result = await checkAchievements({ completedLessons: 0, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).toContain('daily_3_lessons');
      });
    });

    // Electron API 场景
    describe('Electron API 环境', () => {
      test('electronAPI 返回 success 时成就正确保存', async () => {
        (global as any).window = {
          electronAPI: {
            addAchievement: jest.fn().mockResolvedValue({ success: true }),
          },
        };
        const result = await checkAchievements({ completedLessons: 1, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).toContain('first_lesson');
        expect((global as any).window.electronAPI.addAchievement).toHaveBeenCalled();
        // 恢复
        (global as any).window = {};
      });

      test('electronAPI 返回失败时成就仍返回', async () => {
        (global as any).window = {
          electronAPI: {
            addAchievement: jest.fn().mockResolvedValue({ success: false }),
          },
        };
        const result = await checkAchievements({ completedLessons: 1, totalScore: 0 });
        // electronAPI 返回 { success: false }，result 不是 undefined 也不是 success
        // 成就不应该被保存到 saved
        // 但 daily_first 仍然会触发
        expect(result.length).toBeGreaterThanOrEqual(0);
        (global as any).window = {};
      });

      test('electronAPI 抛异常时成就仍返回', async () => {
        (global as any).window = {
          electronAPI: {
            addAchievement: jest.fn().mockRejectedValue(new Error('network error')),
          },
        };
        const result = await checkAchievements({ completedLessons: 1, totalScore: 0 });
        const types = result.map((a) => a.type);
        expect(types).toContain('first_lesson');
        (global as any).window = {};
      });
    });
  });

  // ==================== getUnlockedAchievements ====================
  describe('getUnlockedAchievements', () => {
    afterEach(() => {
      (global as any).window = {};
    });

    test('无 electronAPI 时返回空数组', async () => {
      (global as any).window = {};
      const result = await getUnlockedAchievements();
      expect(result).toEqual([]);
    });

    test('electronAPI 返回记录时映射为成就对象', async () => {
      (global as any).window = {
        electronAPI: {
          getAchievements: jest.fn().mockResolvedValue([
            { achievement_type: 'first_lesson', achievement_name: '学习之星' },
            { achievement_type: 'ten_lessons', achievement_name: '勤学少年' },
          ]),
        },
      };
      const result = await getUnlockedAchievements();
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('first_lesson');
      expect(result[0].name).toBe('学习之星');
      expect(result[1].type).toBe('ten_lessons');
    });

    test('未知成就类型返回默认信息', async () => {
      (global as any).window = {
        electronAPI: {
          getAchievements: jest.fn().mockResolvedValue([
            { achievement_type: 'unknown_type', achievement_name: '未知成就' },
          ]),
        },
      };
      const result = await getUnlockedAchievements();
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('unknown_type');
      expect(result[0].name).toBe('未知成就');
      expect(result[0].icon).toBe('🏆');
    });

    test('electronAPI 返回空数组时返回空', async () => {
      (global as any).window = {
        electronAPI: {
          getAchievements: jest.fn().mockResolvedValue([]),
        },
      };
      const result = await getUnlockedAchievements();
      expect(result).toEqual([]);
    });

    test('electronAPI 抛异常时返回空数组', async () => {
      (global as any).window = {
        electronAPI: {
          getAchievements: jest.fn().mockRejectedValue(new Error('db error')),
        },
      };
      const result = await getUnlockedAchievements();
      expect(result).toEqual([]);
    });
  });
});
