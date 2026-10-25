import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LessonList.css';
import { getLessonSummaries } from '../../services/lesson';
import { logger } from '../../utils/logger';

interface Lesson {
  id: number;
  title: string;
  type: 'new' | 'review';
  grammar: string;
}

/** 进度表记录（get-all-progress 返回明细行，每次学习一条） */
interface ProgressRecord {
  lesson_id: number;
  completed: number | boolean;
  score: number;
}

type LessonStatus = 'completed' | 'attempted' | 'not-started';

interface LessonProgress {
  status: LessonStatus;
  bestScore: number;
}

const LessonList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 首页「趣味练习」入口：选课后直接落到该课的练习页签（游戏）
  const gamesIntent =
    (location.state as { intent?: string } | null)?.intent === 'games';
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [progressMap, setProgressMap] = useState<Map<number, LessonProgress>>(new Map());

  useEffect(() => {
    loadLessons();
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const records = (await window.electronAPI?.getAllProgress?.()) as
        | ProgressRecord[]
        | undefined;
      if (!records || records.length === 0) return;
      const map = new Map<number, LessonProgress>();
      for (const r of records) {
        if (!r || typeof r.lesson_id !== 'number') continue;
        const prev = map.get(r.lesson_id);
        const isCompleted = r.completed === 1 || r.completed === true;
        // completed 优先于 attempted；bestScore 取历次最高分
        const status: LessonStatus =
          isCompleted || prev?.status === 'completed' ? 'completed' : 'attempted';
        map.set(r.lesson_id, {
          status,
          bestScore: Math.max(r.score ?? 0, prev?.bestScore ?? 0),
        });
      }
      logger.info('LessonList', '进度加载', `聚合 ${map.size} 课学习记录`);
      setProgressMap(map);
    } catch (error) {
      logger.error('LessonList', '进度加载失败', String(error));
    }
  };

  const loadLessons = async () => {
    try {
      // 优先从 Electron 主进程获取
      const electronLessons = await window.electronAPI?.getAllLessons?.();
      if (electronLessons && electronLessons.length > 0) {
        logger.success('LessonList', '课程加载', `从Electron API加载 ${electronLessons.length} 课`);
        setLessons(electronLessons as Lesson[]);
      } else {
        // 使用本地服务层数据
        const summaries = await getLessonSummaries();
        logger.success('LessonList', '课程加载', `从本地数据加载 ${summaries.length} 课`);
        setLessons(summaries);
      }
    } catch (error) {
      logger.error('LessonList', '课程加载失败', String(error));
      console.error('加载课程失败:', error);
      setLessons(await getLessonSummaries());
    } finally {
      setLoading(false);
    }
  };

  const completedCount = useMemo(
    () => [...progressMap.values()].filter((p) => p.status === 'completed').length,
    [progressMap]
  );

  if (loading) {
    return (
      <div className="lesson-list-container">
        <div className="loading">加载中...</div>
      </div>
    );
  }

  return (
    <div className="lesson-list-container">
      {/* 头部 */}
      <div className="header">
        <button
          className="back-icon-btn"
          onClick={() => navigate('/')}
          title="回到主界面"
          aria-label="回到主界面"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="page-title">{gamesIntent ? '趣味练习 · 选一课' : '选择课程'}</h1>
        <button
          className="practice-center-entry"
          onClick={() => navigate('/practice')}
          title="按语法范畴做专项练习（已学范围，不超纲）"
        >
          📝 专项练习
        </button>
      </div>

      {/* 总进度统计 */}
      <div className="progress-summary">
        <span className="progress-summary-text">
          {gamesIntent
            ? '🎮 选一课，进去直接玩射击、翻牌、飞机大战！'
            : `📚 已完成 ${completedCount} / ${lessons.length} 课`}
        </span>
        <div className="progress-summary-bar">
          <div
            className="progress-summary-fill"
            style={{
              width: `${lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* 课程网格 */}
      <div className="lessons-grid">
        {lessons.map((lesson) => {
          const status = progressMap.get(lesson.id)?.status ?? 'not-started';
          return (
            <div
              key={lesson.id}
              className={`lesson-card ${lesson.type} ${status}`}
              onClick={() =>
                navigate(
                  `/lesson/${lesson.id}`,
                  gamesIntent ? { state: { tab: 'practice' } } : undefined
                )
              }
            >
              {status === 'completed' && (
                <div className="lesson-status-badge completed" title="已完成本课练习">
                  ✓
                </div>
              )}
              {status === 'attempted' && (
                <div className="lesson-status-badge attempted" title="学过本课，还没完全掌握">
                  学过
                </div>
              )}
              <div className="lesson-number">{lesson.id}</div>
              <div className="lesson-info">
                <h3 className="lesson-title">{lesson.title}</h3>
                <p className="lesson-grammar">{lesson.grammar}</p>
                <span className={`lesson-type ${lesson.type}`}>
                  {lesson.type === 'new' ? '新课' : '复习'}
                </span>
              </div>
              {status !== 'not-started' && (
                <div className={`lesson-status-track ${status}`}>
                  <div
                    className="lesson-status-fill"
                    style={{ width: status === 'completed' ? '100%' : '45%' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonList;
