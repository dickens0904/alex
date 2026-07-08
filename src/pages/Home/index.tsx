import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { getUnlockedAchievements } from '../../services/achievement';
import type { Achievement } from '../../services/achievement';
import { getTotalLessonCount } from '../../services/lesson';
import { getStreakData, getStreakLevel } from '../../services/dailyStreak';
import { logger } from '../../utils/logger';

interface UserStats {
  totalScore: number;
  completedLessons: number;
  totalPracticeTime: number;
  achievementCount: number;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const totalLessons = getTotalLessonCount();
  const [stats, setStats] = useState<UserStats>({
    totalScore: 0,
    completedLessons: 0,
    totalPracticeTime: 0,
    achievementCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const streakData = getStreakData();
  const streakLevel = getStreakLevel(streakData.currentStreak);

  useEffect(() => {
    logger.info('Home', '页面加载', `总课程: ${totalLessons}`);
    Promise.all([loadStats(), loadAchievements()]).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAchievements = async () => {
    const badges = await getUnlockedAchievements();
    setAchievements(badges);
  };

  const loadStats = async () => {
    try {
      const userStats = await window.electronAPI?.getUserStats?.();
      if (userStats) {
        setStats(userStats);
      }
    } catch (e) {
      console.log('统计加载失败（非 Electron 环境）:', e);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {/* 欢迎标题 */}
        <div className="welcome-section">
          <h1 className="title">新概念英语练习王</h1>
          <p className="subtitle">让英语学习变得有趣又简单！</p>
        </div>

        {/* 卡通角色 */}
        <div className="character-section">
          <div className="character">🎓</div>
        </div>

        {/* 主要功能按钮 */}
        <div className="action-buttons">
          <button className="btn btn-primary btn-large" onClick={() => navigate('/lessons')}>
            <span className="btn-icon">📚</span>
            <span className="btn-text">开始学习</span>
          </button>

          <button className="btn btn-secondary btn-large" onClick={() => navigate('/progress')}>
            <span className="btn-icon">📊</span>
            <span className="btn-text">学习进度</span>
          </button>

          <button className="btn btn-accent btn-large" onClick={() => navigate('/lessons')}>
            <span className="btn-icon">🎮</span>
            <span className="btn-text">趣味练习</span>
          </button>
        </div>

        {/* 学习统计 */}
        <div
          className="stats-section"
          style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.3s' }}
        >
          <div className="stat-item">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{loading ? '...' : stats.totalScore}</div>
            <div className="stat-label">总积分</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">📖</div>
            <div className="stat-value">
              {loading ? '...' : `${stats.completedLessons}/${totalLessons}`}
            </div>
            <div className="stat-label">已学课程</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{loading ? '...' : stats.achievementCount}</div>
            <div className="stat-label">获得徽章</div>
          </div>
        </div>

        {/* 连续学习 */}
        <div className="streak-card" style={{ borderLeftColor: streakLevel.color }}>
          <span className="streak-emoji">{streakLevel.emoji}</span>
          <div className="streak-info">
            <span className="streak-count">{streakData.currentStreak}</span>
            <span className="streak-label">连续学习天数</span>
          </div>
          <span className="streak-title" style={{ color: streakLevel.color }}>
            {streakLevel.title}
          </span>
        </div>

        {/* 学习进度条 */}
        <div className="progress-bar-section">
          <div className="progress-label">
            <span>总体进度</span>
            <span>
              {totalLessons > 0 ? Math.round((stats.completedLessons / totalLessons) * 100) : 0}%
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${totalLessons > 0 ? (stats.completedLessons / totalLessons) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* 成就徽章 */}
        {achievements.length > 0 && (
          <div className="achievements-section">
            <h3 className="achievements-title">我的成就</h3>
            <div className="achievements-grid">
              {achievements.map((badge) => (
                <div key={badge.type} className="achievement-item">
                  <span className="achievement-icon">{badge.icon}</span>
                  <span className="achievement-name">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
