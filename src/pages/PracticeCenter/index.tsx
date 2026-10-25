import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './PracticeCenter.css';
import { logger } from '../../utils/logger';
import {
  getCategoryPools,
  getVocabPools,
  getDrillCursor,
  advanceDrillCursor,
  type CategoryPool,
  type DrillQuestion,
} from '../../data/grammarCategories';

interface ProgressRecord {
  lesson_id: number;
  completed: number | boolean;
  score: number;
}

const MODULE = 'PracticeCenter';
const SET_SIZE = 10;

/** 逐组练习器：从解锁题池的游标处取一组题（按课号升序 = 从易到难） */
const DrillRunner: React.FC<{
  pool: CategoryPool;
  completedSet: Set<number>;
  onExit: () => void;
  onNextRound: () => void;
}> = ({ pool, completedSet, onExit, onNextRound }) => {
  // 惰性初始化：进入本组时锁定题目（按解锁列表 + 游标推进）
  const [questions] = useState<DrillQuestion[]>(() => {
    const unlocked = pool.all.filter((q) => completedSet.has(q.lessonId));
    const cursor = Math.min(getDrillCursor(pool.def.id), unlocked.length);
    return unlocked.slice(cursor, cursor + SET_SIZE);
  });
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[idx];

  const handleChoose = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (index === (current.exercise.answer ?? -1)) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (idx + 1 >= questions.length) {
      // 本组完成：推进游标（下次从新位置继续，学新课解锁的新题会追加在尾部）
      advanceDrillCursor(pool.def.id, questions.length);
      setFinished(true);
      return;
    }
    setIdx((prev) => prev + 1);
    setSelected(null);
    setShowResult(false);
  };

  if (questions.length === 0) {
    return (
      <div className="practice-center-container">
        <div className="drill-empty">
          <p>这个范畴暂时没有可做的题目，先去学习对应课程吧。</p>
          <button className="drill-btn" onClick={onExit}>
            返回范畴列表
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const rate = Math.round((score / questions.length) * 100);
    return (
      <div className="practice-center-container">
        <div className="drill-summary">
          <h2>本轮完成！</h2>
          <p className="drill-summary-cat">
            {pool.def.icon} {pool.def.name}
          </p>
          <div className="drill-summary-score">
            <b>{score}</b> / {questions.length}（正确率 {rate}%）
          </div>
          {rate >= 80 && <p className="drill-praise">太棒了，可以学习新课解锁更多题目了！</p>}
          {rate < 80 && <p className="drill-tip">错题的错因再看看，再来一组巩固一下吧。</p>}
          <div className="drill-summary-actions">
            <button className="drill-btn primary" onClick={onNextRound}>
              再来一组
            </button>
            <button className="drill-btn" onClick={onExit}>
              返回范畴列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  const exercise = current.exercise;
  const answerIdx = exercise.answer as number;
  const isCorrect = selected === answerIdx;

  return (
    <div className="practice-center-container">
      <div className="drill-topbar">
        <button className="drill-back-btn" onClick={onExit} title="返回范畴列表">
          ←
        </button>
        <div className="drill-topbar-info">
          <h2>
            {pool.def.icon} {pool.def.name}
          </h2>
          <span className="drill-meta">
            第 {idx + 1} / {questions.length} 题 · 得分 {score}
          </span>
        </div>
        <span className="drill-lesson-tag">第 {current.lessonId} 课</span>
      </div>

      {/* 复用语法卡的样式体系（exercise-choice / option-btn / result-card） */}
      <div className="grammar-card drill-question-card">
        <div className="exercise-choice">
          <div className="exercise-question">
            <p className="drill-question-text">{exercise.question}</p>
            {exercise.hint && <p className="hint">💡 提示: {exercise.hint}</p>}
          </div>
          <div className="exercise-options">
            {exercise.options?.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selected === index
                    ? index === answerIdx
                      ? 'correct'
                      : 'wrong'
                    : showResult && index === answerIdx
                      ? 'correct'
                      : ''
                }`}
                onClick={() => handleChoose(index)}
                disabled={showResult}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className={`result-card ${isCorrect ? 'correct' : 'wrong'}`}>
            <div className="result-icon">{isCorrect ? '🎉' : '😊'}</div>
            <div className="result-content">
              <h4>{isCorrect ? '回答正确！' : '加油！再想想！'}</h4>
              {!isCorrect && selected != null && (
                <p className="wrong-reason">
                  ❌ 你选的「{exercise.options?.[selected] ?? ''}」
                  {exercise.optionNotes?.[selected] && (
                    <>
                      <br />
                      {exercise.optionNotes[selected]}
                    </>
                  )}
                </p>
              )}
              {!isCorrect && exercise.options?.[answerIdx] != null && (
                <p className="correct-answer-hint">✅ 正确答案：{exercise.options[answerIdx]}</p>
              )}
              <p className="explanation">{exercise.explanation}</p>
            </div>
            <button className="next-btn" onClick={handleNext}>
              {idx + 1 >= questions.length ? '完成本组 →' : '下一题 →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const PracticeCenter: React.FC = () => {
  const navigate = useNavigate();
  const [completedSet, setCompletedSet] = useState<Set<number>>(new Set());
  const [activePool, setActivePool] = useState<CategoryPool | null>(null);
  const [round, setRound] = useState(0);
  // 单词/词组专项：词表在 completeLessons 大模块里，异步加载
  const [vocabPools, setVocabPools] = useState<CategoryPool[]>([]);

  useEffect(() => {
    getVocabPools()
      .then((p) => setVocabPools(p))
      .catch((e) => logger.warn(MODULE, '词表加载失败', String(e)));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const records = (await window.electronAPI?.getAllProgress?.()) as
          | ProgressRecord[]
          | undefined;
        const set = new Set<number>();
        (records || []).forEach((r) => {
          if (r && typeof r.lesson_id === 'number' && (r.completed === 1 || r.completed === true)) {
            set.add(r.lesson_id);
          }
        });
        logger.info(MODULE, '进度加载', `已完成课程 ${set.size} 门，解锁对应题目`);
        setCompletedSet(set);
      } catch (e) {
        logger.warn(MODULE, '进度加载失败', String(e));
      }
    })();
  }, []);

  // 语法范畴在前、单词/词组随后、"综合练习"始终垫底
  const pools = useMemo(() => {
    const grammar = getCategoryPools();
    const mixed = grammar.filter((p) => p.def.id === 'mixed');
    const rest = grammar.filter((p) => p.def.id !== 'mixed');
    return [...rest, ...vocabPools, ...mixed];
  }, [vocabPools]);

  const cards = useMemo(
    () =>
      pools.map((p) => {
        const unlocked = p.all.filter((q) => completedSet.has(q.lessonId));
        const cursor = Math.min(getDrillCursor(p.def.id), unlocked.length);
        return {
          pool: p,
          unlockedCount: unlocked.length,
          done: cursor,
          locked: unlocked.length === 0,
        };
      }),
    [pools, completedSet]
  );

  if (activePool) {
    return (
      <DrillRunner
        key={`${activePool.def.id}-${round}`}
        pool={activePool}
        completedSet={completedSet}
        onExit={() => setActivePool(null)}
        onNextRound={() => setRound((r) => r + 1)}
      />
    );
  }

  const hasProgress = completedSet.size > 0;

  return (
    <div className="practice-center-container">
      <div className="header">
        <button className="back-icon-btn" onClick={() => navigate('/lessons')} title="返回课程列表">
          ←
        </button>
        <h1 className="page-title">语法专项练习</h1>
        <div className="placeholder" />
      </div>

      <div className="progress-summary">
        <span className="progress-summary-text">
          {hasProgress
            ? `📚 已完成 ${completedSet.size} 课 · 范围内的题目已解锁`
            : '📚 完成课程练习后，这里会按语法范畴逐步解锁题目（不超纲）'}
        </span>
      </div>

      <div className="category-grid">
        {cards.map(({ pool, unlockedCount, done, locked }) => (
          <div
            key={pool.def.id}
            className={`category-card ${locked ? 'locked' : ''}`}
            onClick={() => !locked && setActivePool(pool)}
          >
            <div className="category-icon">{pool.def.icon}</div>
            <h3 className="category-name">{pool.def.name}</h3>
            {locked ? (
              <p className="category-lock">🔒 完成对应课程后解锁</p>
            ) : (
              <>
                <p className="category-count">
                  可练 {unlockedCount} 题 · 已做 {done} 题
                </p>
                <div className="category-bar">
                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${unlockedCount > 0 ? Math.min((done / unlockedCount) * 100, 100) : 0}%`,
                    }}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeCenter;
