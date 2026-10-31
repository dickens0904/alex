import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './LessonDetail.css';
import { getLessonById } from '../../services/lesson';
import {
  stopSpeaking,
  getCurrentPreset,
  setVoicePreset,
  VOICE_PRESETS,
  isEdgeTTSAvailable,
  getCurrentChineseRate,
  setChineseRate,
  isChinesePlaying,
  replayLastChinese,
  getSpeechRate,
  setSpeechRate,
  type ChineseSpeechRate,
  type SpeechRate,
} from '../../services/tts';
import { checkAchievements } from '../../services/achievement';
import { logger } from '../../utils/logger';
import type { Lesson, GrammarDetail, Exercise } from '../../types/lesson';
import type { Achievement } from '../../services/achievement';
import VocabularyCard from '../../components/lesson/VocabularyCard';
import TextDisplay from '../../components/lesson/TextDisplay';
import GrammarCardEnhanced from '../../components/lesson/GrammarCardEnhanced';
import PracticeMenu from '../../components/practice/PracticeMenu';
import PracticeEngine from '../../components/practice/PracticeEngine';
import type { PracticeFinishData } from '../../components/practice/PracticeEngine';
import PracticeResult from '../../components/practice/PracticeResult';
import Confetti from '../../components/Confetti';
import { playAchievementSound } from '../../services/soundEffects';
import ShootingGame from '../../components/ShootingGame';
import MemoryCardGame from '../../components/MemoryCardGame';
import AirplaneGame from '../../components/AirplaneGame';
import { recordStudy } from '../../services/dailyStreak';
import { getDueReviewItems, getReviewStats, recordReviewResult } from '../../services/review';
import { selectSmartExercises } from '../../services/smartSelection';
import {
  recordSkillAnswer,
  getAllSkillMastery,
  type SkillId,
} from '../../services/skillMastery';
import type { PracticeType } from '../../components/practice/PracticeMenu';
import { convertFillExercises } from '../../utils/fillToChoice';
import grammarExtraExercises from '../../data/lessons/grammarExtraExercises';
import grammarEnhancedContent from '../../data/lessons/grammarEnhancedContent';
import { grammarAutoExercises } from '../../data/lessons/grammarAutoExercises';
// 语法数据 - 使用静态导入以确保在 Electron file:// 协议下可用
import { grammarDataEnhanced } from '../../data/lessons/grammarDataEnhanced';
import { grammarData } from '../../data/lessons/grammarData';

const MODULE = 'LessonDetail';

/** 合并补充练习题和增强讲解内容到语法详情 */
function mergeGrammarData(grammar: GrammarDetail, lessonId: number): GrammarDetail {
  const result = { ...grammar };

  // 合并增强讲解内容
  const enhanced = grammarEnhancedContent[lessonId];
  if (enhanced) {
    result.explanation = enhanced.explanation;
    result.rules = [...result.rules, ...enhanced.extraRules];
    result.examples = [...result.examples, ...enhanced.extraExamples];
    if (enhanced.extraTips.length > 0) {
      result.tips = [...(result.tips || []), ...enhanced.extraTips];
    }
  }

  // 合并补充练习题
  const extras = grammarExtraExercises[lessonId];
  if (extras && extras.length > 0) {
    result.exercises = [...result.exercises, ...extras];
  }

  // 合并自动生成的语法补充练习（连词成句 + 课文填空）
  const autoExtras = grammarAutoExercises[lessonId];
  if (autoExtras && autoExtras.length > 0) {
    result.exercises = [...result.exercises, ...autoExtras];
  }

  // 填空/句式转换题统一转成选择题：多空逗号/省略号格式靠猜、isn't 与 is not 互不认账，
  // 点选判断从根上消除输入格式误判（判断逻辑见 src/utils/fillToChoice.ts）
  result.exercises = convertFillExercises(result.exercises);

  return result;
}

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  // 初始页签可由路由 state 指定（首页「趣味练习」入口直接落到练习页签）
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'text' | 'grammar' | 'practice'>(
    (location.state as { tab?: 'vocabulary' | 'text' | 'grammar' | 'practice' } | null)?.tab ??
      'vocabulary'
  );

  // 音色选择
  const [voicePreset, setVoicePresetState] = useState(getCurrentPreset());
  const [edgeTtsReady, setEdgeTtsReady] = useState(false);
  // 中文语速选择
  const [chineseRate, setChineseRateState] = useState<ChineseSpeechRate>(getCurrentChineseRate());
  // 英文语速选择
  const [englishRate, setEnglishRateState] = useState<SpeechRate>(getSpeechRate());

  // 语法数据（懒加载）- 优先使用增强版
  const [grammarInfo, setGrammarInfo] = useState<GrammarDetail | null>(null);
  const [grammarLoading, setGrammarLoading] = useState(false);
  const [_isEnhanced, setIsEnhanced] = useState(false);

  // 练习状态
  const [practiceType, setPracticeType] = useState<PracticeType | null>(null);
  const [resultData, setResultData] = useState<{
    score: number;
    totalScore: number;
    practiceType: PracticeType;
  } | null>(null);
  const [newBadges, setNewBadges] = useState<Achievement[]>([]);
  const [activeGame, setActiveGame] = useState<'shooting' | 'memory' | 'airplane' | null>(null);
  // 错题重练会话（跨题型混排），非空时优先于常规练习渲染
  const [reviewExercises, setReviewExercises] = useState<Exercise[] | null>(null);
  // 刚结束的错题重练题组（供结果页"再练一次"复用同一批题）
  const [reviewRetryExercises, setReviewRetryExercises] = useState<Exercise[] | null>(null);
  const [reviewStats, setReviewStats] = useState({ total: 0, due: 0 });
  // 分技能掌握度（PracticeMenu 徽章 + 智能选题目标难度）
  const [mastery, setMastery] = useState(() => getAllSkillMastery());

  const refreshReviewStats = useCallback(() => {
    getReviewStats()
      .then(setReviewStats)
      .catch(() => setReviewStats({ total: 0, due: 0 }));
    setMastery(getAllSkillMastery());
  }, []);

  // 智能选题：常规练习按当前掌握度重排成"热身→主练→挑战"爬坡序列
  const smartExercises = useMemo(() => {
    if (!lesson || !practiceType) return [];
    return selectSmartExercises(
      (lesson.content.exercises || []).filter((e) => e.type === practiceType),
      practiceType as SkillId
    );
  }, [lesson, practiceType]);

  useEffect(() => {
    refreshReviewStats();
  }, [refreshReviewStats]);

  const handleStartReview = async () => {
    const items = await getDueReviewItems();
    if (items.length === 0) return;
    setResultData(null);
    setPracticeType(null);
    setReviewExercises(items.map((i) => i.exercise));
    logger.info(MODULE, '错题重练', `到期 ${items.length} 道`);
  };

  // 每题作答结果 → 错题本登记/间隔升级（答错入本、答对升一级）
  const handleRecordAnswer = useCallback(
    (exercise: Exercise, correct: boolean) => {
      recordReviewResult(parseInt(id || '0'), exercise.type, exercise, correct)
        .catch(() => undefined)
        .finally(refreshReviewStats);
      // 分技能掌握度：智能选题引擎的目标难度输入
      recordSkillAnswer(exercise.type as SkillId, exercise, correct);
    },
    [id, refreshReviewStats]
  );

  const handleVoiceChange = async (presetId: string) => {
    setVoicePreset(presetId);
    setVoicePresetState(getCurrentPreset());
    // 如果正在播放中文，用新声音重播
    if (isChinesePlaying()) {
      await replayLastChinese();
    }
  };

  const handleChineseRateChange = async (rate: ChineseSpeechRate) => {
    setChineseRate(rate);
    setChineseRateState(getCurrentChineseRate());
    // 如果正在播放中文，用新语速重播
    if (isChinesePlaying()) {
      await replayLastChinese();
    }
  };

  const handleEnglishRateChange = (rate: SpeechRate) => {
    setSpeechRate(rate);
    setEnglishRateState(getSpeechRate());
  };

  const loadLesson = useCallback(async () => {
    if (!id) return;
    const lessonData = await getLessonById(parseInt(id));
    if (lessonData) setLesson(lessonData);
  }, [id]);

  useEffect(() => {
    logger.info(MODULE, '页面加载', `课程ID: ${id}`);
    loadLesson();
    // 轮询检查 Edge TTS 状态（初始化可能需要时间）
    let pollCount = 0;
    const poll = setInterval(() => {
      const ready = isEdgeTTSAvailable();
      setEdgeTtsReady(ready);
      pollCount++;
      if (ready || pollCount >= 10) clearInterval(poll);
    }, 500);
    return () => {
      clearInterval(poll);
      stopSpeaking();
    };
  }, [id, loadLesson]);

  // 语法数据加载（使用静态导入以确保在 Electron file:// 协议下可用）
  useEffect(() => {
    if (activeTab !== 'grammar' || grammarInfo || grammarLoading || !lesson) return;

    logger.info(MODULE, '语法数据加载', `开始加载课程 ${lesson.id} 的语法数据`);
    setGrammarLoading(true);

    // 先尝试增强版（静态导入，确保在 file:// 协议下可用）
    const enhancedData = grammarDataEnhanced[lesson.id];
    if (enhancedData) {
      logger.success(MODULE, '语法数据加载', `使用增强版语法数据`);
      setGrammarInfo(mergeGrammarData(enhancedData, lesson.id));
      setIsEnhanced(true);
      setGrammarLoading(false);
      return;
    }

    // 增强版没有，加载原版
    logger.info(MODULE, '语法数据加载', `增强版无课程${lesson.id}数据，尝试原版`);
    const baseData = grammarData[lesson.id] || null;
    if (baseData) {
      logger.success(MODULE, '语法数据加载', `使用原版语法数据`);
      setGrammarInfo(mergeGrammarData(baseData, lesson.id));
    } else {
      logger.warn(MODULE, '语法数据加载', `原版也无课程${lesson.id}数据`);
      setGrammarInfo(null);
    }
    setIsEnhanced(false);
    setGrammarLoading(false);
  }, [activeTab, lesson, grammarInfo, grammarLoading]);

  const handleStartPractice = (type: PracticeType) => {
    setPracticeType(type);
    setResultData(null);
  };

  const handleFinishPractice = async (data: PracticeFinishData) => {
    const {
      score,
      totalScore,
      timeSpent,
      practiceType: lastType,
      maxStreak,
      correctCount,
      totalCount,
      isReview,
    } = data;
    setResultData({ score, totalScore, practiceType: lastType });
    setPracticeType(null);
    setReviewRetryExercises(isReview ? reviewExercises : null);
    setReviewExercises(null);
    setNewBadges([]);
    refreshReviewStats();

    // 记录今天学习了
    const streakInfo = recordStudy();

    // 保存进度到数据库
    try {
      await window.electronAPI?.saveProgress?.({
        lesson_id: parseInt(id || '0'),
        user_id: 1,
        completed: score >= totalScore * 0.6,
        score,
        time_spent: timeSpent,
      });

      // 练习流水（供家长学习报告统计）
      await window.electronAPI?.logPractice?.({
        lesson_id: parseInt(id || '0'),
        practice_type: isReview ? 'review' : lastType,
        score,
        total_score: totalScore,
        correct_count: correctCount,
        total_count: totalCount,
        duration_sec: timeSpent,
      });

      // 获取累计统计
      const userStats = await window.electronAPI?.getUserStats?.();
      if (userStats) {
        const badges = await checkAchievements({
          completedLessons: userStats.completedLessons,
          totalScore: userStats.totalScore,
          lastScore: score,
          lastTotalScore: totalScore,
          lastPracticeType: lastType,
          // 错题重练是混排会话，不按单一题型计入专项成就
          spellingCorrectCount: !isReview && lastType === 'spelling' ? correctCount : undefined,
          listeningCorrectCount: !isReview && lastType === 'listening' ? correctCount : undefined,
          speakingHighCount:
            !isReview && lastType === 'speaking' && score >= totalScore * 0.8 ? 1 : undefined,
          currentStreak: maxStreak,
          timeSpent,
          isFirstAttempt: false,
          studyDaysStreak: streakInfo.streak,
        });
        if (badges.length > 0) {
          setNewBadges(badges);
          playAchievementSound();
        }
      }
    } catch (e) {
      console.log('进度保存失败（非 Electron 环境）:', e);
    }
  };

  const handleBackToPracticeMenu = () => {
    setPracticeType(null);
    setResultData(null);
    setActiveGame(null);
    setReviewExercises(null);
    refreshReviewStats();
  };

  const handleGameFinish = async (score: number, totalScore: number) => {
    recordStudy();
    try {
      const userStats = await window.electronAPI?.getUserStats?.();
      if (userStats) {
        const badges = await checkAchievements({
          completedLessons: userStats.completedLessons,
          totalScore: userStats.totalScore,
          lastScore: score,
          lastTotalScore: totalScore,
        });
        if (badges.length > 0) {
          setNewBadges(badges);
          playAchievementSound();
        }
      }
    } catch (e) {
      console.log('成就检查失败:', e);
    }
  };

  if (!lesson) {
    return (
      <div className="lesson-detail-container">
        <div className="header">
          <button className="back-icon-btn" onClick={() => navigate(-1)} title="返回上一界面" aria-label="返回上一界面">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="page-title">课程未找到</h1>
          <div className="placeholder"></div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: '16px',
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ fontSize: '64px' }}>📭</div>
          <p style={{ fontSize: '18px' }}>找不到该课程，请返回课程列表重新选择</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/lessons')}
            style={{
              padding: '12px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
              background: 'var(--primary-color)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            返回课程列表
          </button>
        </div>
      </div>
    );
  }

  const allExercises = lesson.content.exercises || [];

  return (
    <div className="lesson-detail-container">
      <div className="header">
        <button className="back-icon-btn" onClick={() => navigate(-1)} title="返回上一界面" aria-label="返回上一界面">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="page-title">{lesson.title}</h1>
        <div className="header-right">
          <div className="voice-selector">
            <span className="voice-label">口音：</span>
            <select
              className="voice-select"
              value={voicePreset.id}
              onChange={(e) => handleVoiceChange(e.target.value)}
            >
              {VOICE_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.accent} {preset.name}
                </option>
              ))}
            </select>
            <span className={`tts-badge ${edgeTtsReady ? 'edge' : 'web'}`}>
              {edgeTtsReady ? 'Edge TTS' : 'Web Speech'}
            </span>
          </div>
          <div className="rate-selector">
            <span className="rate-label">英文：</span>
            <select
              className="rate-select"
              value={englishRate}
              onChange={(e) => handleEnglishRateChange(e.target.value as SpeechRate)}
            >
              <option value="slow">慢速 (-20%)</option>
              <option value="normal">常速 (+0%)</option>
              <option value="fast">快速 (+20%)</option>
            </select>
          </div>
          <div className="rate-selector">
            <span className="rate-label">中文：</span>
            <select
              className="rate-select"
              value={chineseRate}
              onChange={(e) => handleChineseRateChange(e.target.value as ChineseSpeechRate)}
            >
              <option value="slow">慢速 (-20%)</option>
              <option value="normal">常速 (+0%)</option>
              <option value="fast">快速 (+20%)</option>
            </select>
          </div>
          <div className="lesson-badge">{lesson.type === 'new' ? '新课' : '复习'}</div>
        </div>
      </div>

      <div className="grammar-focus-section">
        <div className="grammar-icon">📝</div>
        <div className="grammar-text">
          <span className="grammar-label">语法重点：</span>
          <span className="grammar-content">{lesson.grammar}</span>
        </div>
      </div>

      {activeGame === 'shooting' ? (
        <ShootingGame
          vocabulary={lesson.content.vocabulary}
          onFinish={handleGameFinish}
          onBack={handleBackToPracticeMenu}
        />
      ) : activeGame === 'memory' ? (
        <MemoryCardGame
          vocabulary={lesson.content.vocabulary}
          onFinish={handleGameFinish}
          onBack={handleBackToPracticeMenu}
        />
      ) : activeGame === 'airplane' ? (
        <AirplaneGame
          vocabulary={lesson.content.vocabulary}
          onFinish={handleGameFinish}
          onBack={handleBackToPracticeMenu}
        />
      ) : reviewExercises ? (
        <PracticeEngine
          exercises={reviewExercises}
          practiceType="listening"
          mixedTypes
          isReviewMode
          vocabulary={lesson.content.vocabulary}
          onRecord={handleRecordAnswer}
          onFinish={handleFinishPractice}
          onBack={handleBackToPracticeMenu}
        />
      ) : practiceType ? (
        <PracticeEngine
          exercises={smartExercises}
          practiceType={practiceType}
          vocabulary={lesson.content.vocabulary}
          onRecord={handleRecordAnswer}
          onFinish={handleFinishPractice}
          onBack={handleBackToPracticeMenu}
        />
      ) : resultData ? (
        <>
          <PracticeResult
            score={resultData.score}
            totalScore={resultData.totalScore}
            onRetry={() => {
              setResultData(null);
              if (reviewRetryExercises) {
                // 错题重练：沿用同一批题再练一次
                setReviewExercises(reviewRetryExercises);
                setReviewRetryExercises(null);
              } else {
                handleStartPractice(resultData.practiceType);
              }
            }}
            onBack={handleBackToPracticeMenu}
          />
          {newBadges.length > 0 && (
            <>
              <Confetti active={true} />
              <div className="achievement-popup">
                <div className="achievement-popup-content">
                  <h2 className="achievement-popup-title">🎉 新成就解锁！</h2>
                  {newBadges.map((badge) => (
                    <div key={badge.type} className="achievement-badge">
                      <span className="badge-icon">{badge.icon}</span>
                      <span className="badge-name">{badge.name}</span>
                      <span className="badge-desc">{badge.description}</span>
                    </div>
                  ))}
                  <button className="achievement-popup-close" onClick={() => setNewBadges([])}>
                    太棒了！
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'vocabulary' ? 'active' : ''}`}
              onClick={() => setActiveTab('vocabulary')}
            >
              单词学习
            </button>
            <button
              className={`tab ${activeTab === 'text' ? 'active' : ''}`}
              onClick={() => setActiveTab('text')}
            >
              课文学习
            </button>
            <button
              className={`tab ${activeTab === 'grammar' ? 'active' : ''}`}
              onClick={() => setActiveTab('grammar')}
            >
              语法学习
            </button>
            <button
              className={`tab ${activeTab === 'practice' ? 'active' : ''}`}
              onClick={() => setActiveTab('practice')}
            >
              练习
            </button>
          </div>

          <div className="content-area">
            {activeTab === 'vocabulary' && (
              <div className="vocabulary-section">
                {lesson.content.vocabulary.map((vocab, index) => (
                  <VocabularyCard key={index} item={vocab} />
                ))}
              </div>
            )}

            {activeTab === 'text' && (
              <TextDisplay
                key={lesson.id}
                lessonId={lesson.id}
                text={lesson.content.text}
                vocabulary={lesson.content.vocabulary}
                illustration={lesson.illustration}
                autoPlay={true}
              />
            )}

            {activeTab === 'grammar' && (
              <div className="grammar-learning-section">
                {grammarLoading ? (
                  <div className="loading">语法内容加载中...</div>
                ) : grammarInfo ? (
                  <GrammarCardEnhanced grammar={grammarInfo} />
                ) : (
                  <div className="no-grammar">
                    <p>本课语法内容正在准备中...</p>
                    <p className="grammar-summary">{lesson.grammar}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'practice' && (
              <>
                {reviewStats.total > 0 && (
                  <div
                    className={`review-entry ${reviewStats.due > 0 ? '' : 'empty'}`}
                    onClick={() => reviewStats.due > 0 && handleStartReview()}
                  >
                    <span className="review-entry-icon">🔁</span>
                    <div className="review-entry-text">
                      <div className="review-entry-title">
                        {reviewStats.due > 0 ? '错题重练' : '错题本'}
                        <span className="review-entry-count">
                          {reviewStats.due > 0
                            ? `${reviewStats.due} 道到期`
                            : `${reviewStats.total} 道待复习`}
                        </span>
                      </div>
                      <div className="review-entry-desc">
                        {reviewStats.due > 0
                          ? '按遗忘曲线安排的复习题，答对会延后复习时间'
                          : '今天没有到期的错题，明天再来吧'}
                      </div>
                    </div>
                    {reviewStats.due > 0 && <span className="review-entry-go">开始 →</span>}
                  </div>
                )}
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}
                >
                  {[
                    {
                      key: 'shooting' as const,
                      icon: '🎯',
                      name: '单词射击',
                      desc: '听英文单词，击中正确的中文解释！',
                      color: '#6c5ce7',
                    },
                    {
                      key: 'memory' as const,
                      icon: '🃏',
                      name: '记忆翻牌',
                      desc: '翻开英文和中文牌，配对消除！',
                      color: '#00b894',
                    },
                    {
                      key: 'airplane' as const,
                      icon: '🛩️',
                      name: '飞机大战',
                      desc: '驾驶战斗机，击落正确的翻译敌机！',
                      color: '#e17055',
                    },
                  ].map((game) => (
                    <div
                      key={game.key}
                      onClick={() => setActiveGame(game.key)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '14px 20px',
                        background: `linear-gradient(135deg, ${game.color}, ${game.color}cc)`,
                        borderRadius: 14,
                        cursor: 'pointer',
                        color: '#fff',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        boxShadow: `0 4px 15px ${game.color}44`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                      }}
                    >
                      <span style={{ fontSize: 36 }}>{game.icon}</span>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{game.name}</div>
                        <div style={{ fontSize: 13, opacity: 0.85 }}>{game.desc}</div>
                      </div>
                      <span style={{ marginLeft: 'auto', fontSize: 14, opacity: 0.8 }}>开始 →</span>
                    </div>
                  ))}
                </div>
                <PracticeMenu
                  exercises={allExercises}
                  mastery={mastery}
                  onStart={handleStartPractice}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LessonDetail;
