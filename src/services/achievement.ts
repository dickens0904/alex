/**
 * 成就系统服务
 * 定义成就徽章规则和检测逻辑
 */

import { logger } from '../utils/logger';

export interface Achievement {
  type: string;
  name: string;
  description: string;
  icon: string;
}

// 所有成就定义
export const ALL_ACHIEVEMENTS: Achievement[] = [
  // 长期成就 - 课程里程碑
  { type: 'first_lesson', name: '学习之星', description: '完成第1课', icon: '⭐' },
  { type: 'ten_lessons', name: '勤学少年', description: '完成10课', icon: '📚' },
  { type: 'fifty_lessons', name: '学霸初成', description: '完成50课', icon: '🎓' },
  { type: 'hundred_lessons', name: '百课通', description: '完成100课', icon: '💯' },
  { type: 'all_lessons', name: '英语大师', description: '完成全部课程', icon: '👑' },
  // 长期成就 - 技能
  { type: 'perfect_score', name: '满分达人', description: '任意一课练习获得满分', icon: '🏅' },
  { type: 'spelling_master', name: '拼写高手', description: '拼写练习累计正确50次', icon: '✏️' },
  { type: 'listening_expert', name: '听力专家', description: '听力练习累计正确50次', icon: '🎧' },
  { type: 'speaking_star', name: '口语之星', description: '口语练习累计10次80分以上', icon: '🎤' },
  // 长期成就 - 积分
  { type: 'score_500', name: '积分新星', description: '总积分达到500', icon: '🌟' },
  { type: 'score_2000', name: '积分达人', description: '总积分达到2000', icon: '💫' },
  { type: 'score_5000', name: '积分王者', description: '总积分达到5000', icon: '🔥' },
  // 短周期成就 - 日常
  { type: 'daily_first', name: '今日首题', description: '今天第一次答题', icon: '🌅' },
  { type: 'daily_3_lessons', name: '今日三课', description: '今天完成3课练习', icon: '📖' },
  { type: 'daily_perfect', name: '今日满分', description: '今天获得一次满分', icon: '💯' },
  // 短周期成就 - 连击
  { type: 'streak_10', name: '十连击', description: '连续答对10题', icon: '🔥' },
  { type: 'streak_20', name: '二十连击', description: '连续答对20题', icon: '⚡' },
  // 短周期成就 - 特殊
  { type: 'speed_demon', name: '闪电侠', description: '5分钟内完成一课', icon: '⚡' },
  { type: 'first_try', name: '一次通关', description: '第一次练习就满分通关', icon: '🎯' },
  // 连续学习
  { type: 'streak_3_days', name: '三天坚持', description: '连续学习3天', icon: '🔥' },
  { type: 'streak_7_days', name: '一周达人', description: '连续学习7天', icon: '⭐' },
  { type: 'streak_14_days', name: '两周大师', description: '连续学习14天', icon: '🏆' },
  { type: 'streak_30_days', name: '月度王者', description: '连续学习30天', icon: '👑' },
];

/**
 * 检查并触发新成就
 * 在每次练习完成后调用
 * @param stats 当前用户统计数据
 * @returns 新解锁的成就列表
 */
export async function checkAchievements(stats: {
  completedLessons: number;
  totalScore: number;
  lastScore?: number;
  lastTotalScore?: number;
  lastPracticeType?: string;
  spellingCorrectCount?: number;
  listeningCorrectCount?: number;
  speakingHighCount?: number;
  currentStreak?: number;
  timeSpent?: number;
  isFirstAttempt?: boolean;
  studyDaysStreak?: number;
}): Promise<Achievement[]> {
  const newAchievements: Achievement[] = [];

  // 课程完成数成就
  if (stats.completedLessons >= 1) newAchievements.push(findAchievement('first_lesson')!);
  if (stats.completedLessons >= 10) newAchievements.push(findAchievement('ten_lessons')!);
  if (stats.completedLessons >= 50) newAchievements.push(findAchievement('fifty_lessons')!);
  if (stats.completedLessons >= 100) newAchievements.push(findAchievement('hundred_lessons')!);
  if (stats.completedLessons >= 144) newAchievements.push(findAchievement('all_lessons')!);

  // 满分成就
  if (
    stats.lastScore !== undefined &&
    stats.lastTotalScore !== undefined &&
    stats.lastScore >= stats.lastTotalScore &&
    stats.lastTotalScore > 0
  ) {
    newAchievements.push(findAchievement('perfect_score')!);
  }

  // 拼写高手：累计正确 50 次
  if ((stats.spellingCorrectCount ?? 0) >= 50) {
    newAchievements.push(findAchievement('spelling_master')!);
  }

  // 听力专家：累计正确 50 次
  if ((stats.listeningCorrectCount ?? 0) >= 50) {
    newAchievements.push(findAchievement('listening_expert')!);
  }

  // 口语之星：累计 10 次 80 分以上
  if ((stats.speakingHighCount ?? 0) >= 10) {
    newAchievements.push(findAchievement('speaking_star')!);
  }

  // 积分成就
  if (stats.totalScore >= 500) newAchievements.push(findAchievement('score_500')!);
  if (stats.totalScore >= 2000) newAchievements.push(findAchievement('score_2000')!);
  if (stats.totalScore >= 5000) newAchievements.push(findAchievement('score_5000')!);

  // === 短周期成就 ===

  // 今日首题
  const today = new Date().toISOString().split('T')[0];
  const lastDailyKey = localStorage.getItem('last-daily-achievement-date');
  if (lastDailyKey !== today) {
    newAchievements.push(findAchievement('daily_first')!);
    localStorage.setItem('last-daily-achievement-date', today);
    localStorage.setItem('daily-lesson-count', '1');
  } else {
    const dailyCount = parseInt(localStorage.getItem('daily-lesson-count') || '0') + 1;
    localStorage.setItem('daily-lesson-count', String(dailyCount));
    // 今日三课
    if (dailyCount >= 3) {
      newAchievements.push(findAchievement('daily_3_lessons')!);
    }
  }

  // 今日满分
  if (
    stats.lastScore !== undefined &&
    stats.lastTotalScore !== undefined &&
    stats.lastScore >= stats.lastTotalScore &&
    stats.lastTotalScore > 0
  ) {
    newAchievements.push(findAchievement('daily_perfect')!);
  }

  // 连击成就
  if ((stats.currentStreak ?? 0) >= 10) {
    newAchievements.push(findAchievement('streak_10')!);
  }
  if ((stats.currentStreak ?? 0) >= 20) {
    newAchievements.push(findAchievement('streak_20')!);
  }

  // 闪电侠 - 5分钟内完成一课
  if ((stats.timeSpent ?? 999) <= 300) {
    newAchievements.push(findAchievement('speed_demon')!);
  }

  // 一次通关 - 第一次练习就满分
  if (
    stats.isFirstAttempt &&
    stats.lastScore !== undefined &&
    stats.lastTotalScore !== undefined &&
    stats.lastScore >= stats.lastTotalScore &&
    stats.lastTotalScore > 0
  ) {
    newAchievements.push(findAchievement('first_try')!);
  }

  // 连续学习天数成就
  if ((stats.studyDaysStreak ?? 0) >= 3) {
    newAchievements.push(findAchievement('streak_3_days')!);
  }
  if ((stats.studyDaysStreak ?? 0) >= 7) {
    newAchievements.push(findAchievement('streak_7_days')!);
  }
  if ((stats.studyDaysStreak ?? 0) >= 14) {
    newAchievements.push(findAchievement('streak_14_days')!);
  }
  if ((stats.studyDaysStreak ?? 0) >= 30) {
    newAchievements.push(findAchievement('streak_30_days')!);
  }

  // 保存到数据库（去重）
  const saved: Achievement[] = [];
  for (const achievement of newAchievements) {
    try {
      const result = await window.electronAPI?.addAchievement?.({
        type: achievement.type,
        name: achievement.name,
      });
      if (result?.success) {
        saved.push(achievement);
      } else if (result === undefined) {
        // 非 Electron 环境：直接返回检测到的成就（去重交给调用方）
        saved.push(achievement);
      }
    } catch {
      // 非 Electron 环境或网络错误：仍然返回成就
      saved.push(achievement);
    }
  }

  return saved;
}

/**
 * 获取已解锁的成就列表
 */
export async function getUnlockedAchievements(): Promise<Achievement[]> {
  try {
    const records = await window.electronAPI?.getAchievements?.();
    if (!records || records.length === 0) return [];
    logger.info('Achievement', '获取已解锁成就', `共 ${records.length} 个`);

    return records.map((r) => {
      return (
        findAchievement(r.achievement_type) || {
          type: r.achievement_type,
          name: r.achievement_name,
          description: '',
          icon: '🏆',
        }
      );
    });
  } catch (e) {
    return [];
  }
}

function findAchievement(type: string): Achievement | undefined {
  return ALL_ACHIEVEMENTS.find((a) => a.type === type);
}
