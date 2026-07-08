import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Progress.css';
import { getAllLessons, getTotalLessonCount } from '../../services/lesson';
import { logger } from '../../utils/logger';
import type { Lesson } from '../../types/lesson';

interface ProgressRecord {
  lesson_id: number;
  lesson_title?: string;
  completed: boolean;
  score: number;
  time_spent: number;
  created_at: string;
}

interface UserStats {
  totalScore: number;
  completedLessons: number;
  totalPracticeTime: number;
  achievementCount: number;
}

const Progress: React.FC = () => {
  const navigate = useNavigate();
  const totalLessons = getTotalLessonCount();
  const [stats, setStats] = useState<UserStats>({
    totalScore: 0,
    completedLessons: 0,
    totalPracticeTime: 0,
    achievementCount: 0,
  });
  const [progressMap, setProgressMap] = useState<Record<number, ProgressRecord[]>>({});
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 加载课程列表
      const lessons = getAllLessons();
      setAllLessons(lessons);
      logger.info('Progress', '页面加载', `课程数: ${lessons.length}`);

      // 加载统计
      const userStats = await window.electronAPI?.getUserStats?.();
      if (userStats) {
        setStats(userStats);
        logger.info(
          'Progress',
          '统计数据',
          `总积分: ${userStats.totalScore}, 完成: ${userStats.completedLessons}`
        );
      }

      // 加载所有进度
      const allProgress = await window.electronAPI?.getAllProgress?.();
      if (allProgress && allProgress.length > 0) {
        const map: Record<number, ProgressRecord[]> = {};
        for (const p of allProgress) {
          if (!map[p.lesson_id]) map[p.lesson_id] = [];
          map[p.lesson_id].push(p);
        }
        setProgressMap(map);
        logger.success('Progress', '进度加载', `共 ${allProgress.length} 条记录`);
      }
    } catch (e) {
      logger.error('Progress', '数据加载失败', String(e));
      console.error('进度数据加载失败:', e);
      setError('数据加载失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const getLessonStatus = (lessonId: number): 'completed' | 'attempted' | 'not-started' => {
    const records = progressMap[lessonId];
    if (!records || records.length === 0) return 'not-started';
    if (records.some((r) => r.completed)) return 'completed';
    return 'attempted';
  };

  const getLessonBestScore = (lessonId: number): number => {
    const records = progressMap[lessonId];
    if (!records || records.length === 0) return 0;
    return Math.max(...records.map((r) => r.score));
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}秒`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) return `${mins}分${secs}秒`;
    const hours = Math.floor(mins / 60);
    return `${hours}小时${mins % 60}分`;
  };

  const { completedCount, attemptedCount } = useMemo(() => {
    let completed = 0;
    let attempted = 0;
    for (const l of allLessons) {
      const status = getLessonStatus(l.id);
      if (status === 'completed') completed++;
      else if (status === 'attempted') attempted++;
    }
    return { completedCount: completed, attemptedCount: attempted };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLessons, progressMap]);

  if (loading) {
    return (
      <div className="progress-container">
        <div className="loading">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="progress-container">
        <div className="header">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← 返回首页
          </button>
          <h1 className="page-title">学习进度</h1>
          <div className="placeholder"></div>
        </div>
        <div className="error-state">
          <p>{error}</p>
          <button className="retry-btn" onClick={loadData}>
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-container">
      {/* 头部 */}
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← 返回首页
        </button>
        <h1 className="page-title">学习进度</h1>
        <div className="placeholder"></div>
      </div>

      {/* 统计概览 */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-card-icon">⭐</div>
          <div className="stat-card-value">{stats.totalScore}</div>
          <div className="stat-card-label">总积分</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">✅</div>
          <div className="stat-card-value">{completedCount}</div>
          <div className="stat-card-label">已完成课程</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📝</div>
          <div className="stat-card-value">{attemptedCount}</div>
          <div className="stat-card-label">已尝试课程</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">⏱️</div>
          <div className="stat-card-value">{formatTime(stats.totalPracticeTime)}</div>
          <div className="stat-card-label">总学习时长</div>
        </div>
      </div>

      {/* 总体进度条 */}
      <div className="overall-progress">
        <div className="overall-label">
          <span>课程完成进度</span>
          <span className="overall-percent">
            {completedCount}/{totalLessons} (
            {totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0}%)
          </span>
        </div>
        <div className="overall-bar-bg">
          <div
            className="overall-bar-fill"
            style={{ width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* 课程网格 */}
      <div className="lessons-progress-grid">
        {allLessons.map((lesson) => {
          const status = getLessonStatus(lesson.id);
          const bestScore = getLessonBestScore(lesson.id);
          return (
            <div
              key={lesson.id}
              className={`progress-card ${status}`}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
            >
              <div className="progress-card-number">{lesson.id}</div>
              <div className="progress-card-title">{lesson.title}</div>
              <div className="progress-card-status">
                {status === 'completed' && (
                  <span className="status-badge completed">✅ 已完成</span>
                )}
                {status === 'attempted' && (
                  <span className="status-badge attempted">🔄 进行中</span>
                )}
                {status === 'not-started' && (
                  <span className="status-badge not-started">未开始</span>
                )}
              </div>
              {bestScore > 0 && <div className="progress-card-score">最高 {bestScore} 分</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
