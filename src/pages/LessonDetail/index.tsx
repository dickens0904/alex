import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import type { Lesson, GrammarDetail } from '../../types/lesson';
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
import type { PracticeType } from '../../components/practice/PracticeMenu';
import grammarExtraExercises from '../../data/lessons/grammarExtraExercises';
import grammarEnhancedContent from '../../data/lessons/grammarEnhancedContent';
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

  return result;
}

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'text' | 'grammar' | 'practice'>(
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

  const loadLesson = useCallback(() => {
    if (!id) return;
    const lessonData = getLessonById(parseInt(id));
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
    const { score, totalScore, timeSpent, practiceType: lastType, maxStreak, correctCount } = data;
    setResultData({ score, totalScore, practiceType: lastType });
    setPracticeType(null);
    setNewBadges([]);

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

      // 获取累计统计
      const userStats = await window.electronAPI?.getUserStats?.();
      if (userStats) {
        const badges = await checkAchievements({
          completedLessons: userStats.completedLessons,
          totalScore: userStats.totalScore,
          lastScore: score,
          lastTotalScore: totalScore,
          lastPracticeType: lastType,
          spellingCorrectCount: lastType === 'spelling' ? correctCount : undefined,
          listeningCorrectCount: lastType === 'listening' ? correctCount : undefined,
          speakingHighCount: lastType === 'speaking' && score >= totalScore * 0.8 ? 1 : undefined,
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
          <button className="back-btn" onClick={() => navigate('/lessons')}>
            ← 返回
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
        <button className="back-btn" onClick={() => navigate('/lessons')}>
          ← 返回
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
      ) : practiceType ? (
        <PracticeEngine
          exercises={allExercises.filter((e) => e.type === practiceType)}
          practiceType={practiceType}
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
              handleStartPractice(resultData.practiceType);
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
                text={lesson.content.text}
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
                <PracticeMenu exercises={allExercises} onStart={handleStartPractice} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LessonDetail;
