import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonList.css';
import { getLessonSummaries } from '../../services/lesson';
import { logger } from '../../utils/logger';

interface Lesson {
  id: number;
  title: string;
  type: 'new' | 'review';
  grammar: string;
}

const LessonList: React.FC = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      // 优先从 Electron 主进程获取
      const electronLessons = await window.electronAPI?.getAllLessons?.();
      if (electronLessons && electronLessons.length > 0) {
        logger.success('LessonList', '课程加载', `从Electron API加载 ${electronLessons.length} 课`);
        setLessons(electronLessons as Lesson[]);
      } else {
        // 使用本地服务层数据
        const summaries = getLessonSummaries();
        logger.success('LessonList', '课程加载', `从本地数据加载 ${summaries.length} 课`);
        setLessons(summaries);
      }
    } catch (error) {
      logger.error('LessonList', '课程加载失败', String(error));
      console.error('加载课程失败:', error);
      setLessons(getLessonSummaries());
    } finally {
      setLoading(false);
    }
  };

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
        <button className="back-btn" onClick={() => navigate('/')}>
          ← 返回
        </button>
        <h1 className="page-title">选择课程</h1>
        <div className="placeholder"></div>
      </div>

      {/* 课程网格 */}
      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`lesson-card ${lesson.type}`}
            onClick={() => navigate(`/lesson/${lesson.id}`)}
          >
            <div className="lesson-number">{lesson.id}</div>
            <div className="lesson-info">
              <h3 className="lesson-title">{lesson.title}</h3>
              <p className="lesson-grammar">{lesson.grammar}</p>
              <span className={`lesson-type ${lesson.type}`}>
                {lesson.type === 'new' ? '新课' : '复习'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonList;
