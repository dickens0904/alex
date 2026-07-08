import React, { useState } from 'react';
import { GrammarDetail } from '../../types/lesson';
import { speakEnglish, speakChinese, stopSpeaking } from '../../services/tts';
import {
  playCorrectSound,
  playWrongSound,
  playStreakSound,
  playPerfectSound,
} from '../../services/soundEffects';
import { logger } from '../../utils/logger';
import ChineseVoiceSelector from './ChineseVoiceSelector';
import './GrammarCard.css';

const MODULE = 'GrammarCard';

// 分层鼓励语系统
const ENCOURAGEMENTS = {
  normal: [
    '太棒了！继续加油！',
    '答对了！你真聪明！',
    '非常好！你真厉害！',
    '正确！学习小能手！',
    '完美！你做到了！',
    '答对了！真了不起！',
    '太厉害了！继续保持！',
    '正确！你是英语小达人！',
    '好样的！你是最棒的！',
    '答对啦！真厉害！',
    '厉害了我的宝贝！',
    '聪明！一点就通！',
  ],
  streak3: [
    '🔥 连对3题！太棒了！',
    '🔥 3连对！你是小天才！',
    '🔥 连续答对3题！厉害！',
    '🔥 3连击！保持住！',
  ],
  streak5: [
    '⚡ 5连对！你是学霸！',
    '⚡ 连对5题！太厉害了！',
    '⚡ 5连击！无人能挡！',
    '⚡ 超级连胜！继续冲！',
  ],
  streak10: [
    '🌟 10连对！超级天才！',
    '🌟 完美连胜！你是王者！',
    '🌟 10连击！太疯狂了！',
    '🌟 无敌了！你是最强的！',
  ],
  wrong: [
    '没关系，再试试看！',
    '差一点点，加油！',
    '别灰心，下次一定行！',
    '勇敢尝试就是好样的！',
    '再想一想，你可以的！',
    '错了也没关系，学习就是这样！',
  ],
};

function getRandomEncouragement(streak: number, isCorrect: boolean): string {
  if (!isCorrect)
    return ENCOURAGEMENTS.wrong[Math.floor(Math.random() * ENCOURAGEMENTS.wrong.length)];
  if (streak >= 10)
    return ENCOURAGEMENTS.streak10[Math.floor(Math.random() * ENCOURAGEMENTS.streak10.length)];
  if (streak >= 5)
    return ENCOURAGEMENTS.streak5[Math.floor(Math.random() * ENCOURAGEMENTS.streak5.length)];
  if (streak >= 3)
    return ENCOURAGEMENTS.streak3[Math.floor(Math.random() * ENCOURAGEMENTS.streak3.length)];
  return ENCOURAGEMENTS.normal[Math.floor(Math.random() * ENCOURAGEMENTS.normal.length)];
}

interface MatchState {
  selectedLeft: number | null;
  matchedPairs: Map<number, number>; // leftIndex -> rightIndex
  wrongPair: [number, number] | null;
}

interface GrammarCardProps {
  grammar: GrammarDetail;
  onComplete?: (score: number, total: number) => void;
}

const GrammarCardEnhanced: React.FC<GrammarCardProps> = ({ grammar, onComplete }) => {
  const [activeSection, setActiveSection] = useState<'rules' | 'examples' | 'exercises'>('rules');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [fillInput, setFillInput] = useState('');
  const [orderItems, setOrderItems] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [encouragement, setEncouragement] = useState('');
  const [matchState, setMatchState] = useState<MatchState>({
    selectedLeft: null,
    matchedPairs: new Map(),
    wrongPair: null,
  });
  const [isReading, setIsReading] = useState(false); // 是否正在朗读
  const [readingPart, setReadingPart] = useState<string>(''); // 正在朗读的部分
  const isReadingRef = React.useRef(false); // ref 用于循环中检测停止状态

  // Fisher-Yates 洗牌算法（无偏）
  const shuffleArray = (arr: string[]): string[] => {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  // 初始化排序题
  React.useEffect(() => {
    if (grammar.exercises[currentExercise]?.type === 'order') {
      const correctOrder = grammar.exercises[currentExercise].correctOrder || [];
      setOrderItems(shuffleArray(correctOrder));
    }
  }, [currentExercise, grammar.exercises]);

  // 清理：组件卸载或切换标签时停止朗读
  React.useEffect(() => {
    logger.info(
      MODULE,
      '组件挂载',
      `语法标题: ${grammar.title}, 练习数量: ${grammar.exercises.length}`
    );
    return () => {
      logger.info(MODULE, '组件卸载', '停止所有朗读');
      stopSpeaking();
    };
  }, [grammar.exercises.length, grammar.title]);

  // 判断文本是否包含中文
  const isChinese = (text: string): boolean => {
    return /[\u4e00-\u9fa5]/.test(text);
  };

  // 同步朗读状态到 ref（用于循环中检测停止）
  const startReading = (partName: string) => {
    setIsReading(true);
    isReadingRef.current = true;
    setReadingPart(partName);
  };

  const stopReadingState = () => {
    setIsReading(false);
    isReadingRef.current = false;
    setReadingPart('');
  };

  // 智能朗读方法（自动识别中英文）
  const _readContent = async (text: string, partName: string) => {
    logger.info(MODULE, '智能朗读', `开始朗读: ${partName}, 文本长度: ${text.length}`);
    startReading(partName);
    try {
      if (isChinese(text)) {
        logger.info(MODULE, '智能朗读', '检测为中文，使用中文声音');
        await speakChinese(text);
      } else {
        logger.info(MODULE, '智能朗读', '检测为英文，使用英文声音');
        await speakEnglish(text);
      }
      logger.success(MODULE, '智能朗读', `${partName} 朗读完成`);
    } catch (error) {
      logger.error(MODULE, '智能朗读', `朗读失败: ${error}`);
    } finally {
      stopReadingState();
    }
  };

  // 朗读中文讲解（使用中文声音）
  const readChineseContent = async (text: string, partName: string) => {
    startReading(partName);
    try {
      await speakChinese(text);
    } catch (error) {
      console.error('朗读失败:', error);
    } finally {
      stopReadingState();
    }
  };

  // 朗读英文内容（使用英文声音）
  const _readEnglishContent = async (text: string, partName: string) => {
    startReading(partName);
    try {
      await speakEnglish(text);
    } catch (error) {
      console.error('朗读失败:', error);
    } finally {
      stopReadingState();
    }
  };

  // 朗读语法讲解（中文内容，使用中文声音）
  const handleReadExplanation = () => {
    logger.info(MODULE, '朗读讲解', '用户点击朗读语法讲解');
    readChineseContent(grammar.explanation, '语法讲解');
  };

  // 朗读语法规则（中文内容，使用中文声音）
  const handleReadRules = () => {
    logger.info(MODULE, '朗读规则', `用户点击朗读语法规则，共 ${grammar.rules.length} 条`);
    const rulesText = grammar.rules.join('。' + (grammar.rules.length > 3 ? ' ' : ''));
    readChineseContent(rulesText, '语法规则');
  };

  // 朗读所有例句（英文例句用英文声音，中文翻译用中文声音）
  const handleReadAllExamples = async () => {
    logger.info(MODULE, '朗读例句', `用户点击朗读全部例句，共 ${grammar.examples.length} 个`);
    startReading('例句');
    try {
      for (let i = 0; i < grammar.examples.length; i++) {
        if (!isReadingRef.current) break; // 用户点击了停止
        const example = grammar.examples[i];
        logger.info(
          MODULE,
          '朗读例句',
          `朗读例句 ${i + 1}/${grammar.examples.length}: "${example.english}"`
        );
        // 先朗读英文例句
        try {
          await speakEnglish(`${i + 1}. ${example.english}`);
        } catch {
          /* ignore */
        }
        if (!isReadingRef.current) break;
        // 每句之间稍微停顿
        await new Promise((resolve) => setTimeout(resolve, 300));
        // 再朗读中文翻译
        if (isReadingRef.current) {
          try {
            await speakChinese(example.chinese);
          } catch {
            /* ignore */
          }
          if (!isReadingRef.current) break;
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }
      logger.success(MODULE, '朗读例句', '全部例句朗读完成');
    } catch (error) {
      logger.error(MODULE, '朗读例句', `朗读失败: ${error}`);
    } finally {
      stopReadingState();
    }
  };

  // 停止朗读
  const handleStopReading = () => {
    logger.info(MODULE, '停止朗读', '用户点击停止朗读');
    stopSpeaking();
    isReadingRef.current = false;
    setIsReading(false);
    setReadingPart('');
  };

  const currentExc = grammar.exercises[currentExercise];

  const handleChoiceAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === (currentExc.answer ?? -1);
    const finalScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCompletedExercises((prev) => new Set([...prev, currentExercise]));
      const newStreak = streak + 1;
      setStreak(newStreak);
      playCorrectSound();
      if (newStreak >= 3 && newStreak % 3 === 0) playStreakSound(newStreak);
      setEncouragement(getRandomEncouragement(newStreak, true));
    } else {
      setStreak(0);
      playWrongSound();
      setEncouragement(getRandomEncouragement(0, false));
    }
    if (currentExercise === grammar.exercises.length - 1 && onComplete) {
      setTimeout(() => onComplete(finalScore, grammar.exercises.length), 1000);
    }
  };

  const handleFillAnswer = () => {
    if (showResult) return;
    const isCorrect = fillInput.trim().toLowerCase() === currentExc.fillAnswer?.toLowerCase();
    setShowResult(true);
    const finalScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCompletedExercises((prev) => new Set([...prev, currentExercise]));
      const newStreak = streak + 1;
      setStreak(newStreak);
      playCorrectSound();
      if (newStreak >= 3 && newStreak % 3 === 0) playStreakSound(newStreak);
      setEncouragement(getRandomEncouragement(newStreak, true));
    } else {
      setStreak(0);
      playWrongSound();
      setEncouragement(getRandomEncouragement(0, false));
    }
    if (currentExercise === grammar.exercises.length - 1 && onComplete) {
      setTimeout(() => onComplete(finalScore, grammar.exercises.length), 1000);
    }
  };

  const handleOrderMove = (fromIndex: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (newIndex < 0 || newIndex >= orderItems.length) return;
    const newItems = [...orderItems];
    [newItems[fromIndex], newItems[newIndex]] = [newItems[newIndex], newItems[fromIndex]];
    setOrderItems(newItems);
  };

  const handleOrderSubmit = () => {
    if (showResult) return;
    const isCorrect = JSON.stringify(orderItems) === JSON.stringify(currentExc.correctOrder);
    setShowResult(true);
    const finalScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCompletedExercises((prev) => new Set([...prev, currentExercise]));
      const newStreak = streak + 1;
      setStreak(newStreak);
      playCorrectSound();
      if (newStreak >= 3 && newStreak % 3 === 0) playStreakSound(newStreak);
      setEncouragement(getRandomEncouragement(newStreak, true));
    } else {
      setStreak(0);
      playWrongSound();
      setEncouragement(getRandomEncouragement(0, false));
    }
    if (currentExercise === grammar.exercises.length - 1 && onComplete) {
      setTimeout(() => onComplete(finalScore, grammar.exercises.length), 1000);
    }
  };

  const nextExercise = () => {
    if (currentExercise < grammar.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setFillInput('');
      setEncouragement('');
      setMatchState({ selectedLeft: null, matchedPairs: new Map(), wrongPair: null });
      const nextExc = grammar.exercises[currentExercise + 1];
      if (nextExc?.type === 'order') {
        setOrderItems(shuffleArray(nextExc.correctOrder || []));
      }
    }
  };

  const resetExercises = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompletedExercises(new Set());
    setFillInput('');
    setStreak(0);
    setEncouragement('');
    setMatchState({ selectedLeft: null, matchedPairs: new Map(), wrongPair: null });
    if (grammar.exercises[0]?.type === 'order') {
      setOrderItems(shuffleArray(grammar.exercises[0].correctOrder || []));
    }
  };

  // 匹配题：随机排列右侧选项（基于当前题目初始化）
  const [shuffledRight, setShuffledRight] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (currentExc?.type === 'match' && currentExc.matchPairs) {
      const rights = currentExc.matchPairs.map((p) => p.right);
      setShuffledRight(shuffleArray(rights));
      setMatchState({ selectedLeft: null, matchedPairs: new Map(), wrongPair: null });
    }
  }, [currentExercise, currentExc]);

  const handleMatchLeftClick = (leftIndex: number) => {
    if (showResult) return;
    if (matchState.matchedPairs.has(leftIndex)) return; // 已配对的不能选
    setMatchState((prev) => ({ ...prev, selectedLeft: leftIndex, wrongPair: null }));
  };

  const handleMatchRightClick = (rightIndex: number) => {
    if (showResult) return;
    if (matchState.selectedLeft === null) return;
    // 检查该右侧项是否已被配对
    const alreadyMatched = Array.from(matchState.matchedPairs.values()).includes(rightIndex);
    if (alreadyMatched) return;

    const leftIndex = matchState.selectedLeft;
    const correctRight = currentExc.matchPairs?.[leftIndex]?.right;
    const selectedRight = shuffledRight[rightIndex];

    if (selectedRight === correctRight) {
      // 配对正确
      playCorrectSound();
      const newMatched = new Map(matchState.matchedPairs);
      newMatched.set(leftIndex, rightIndex);
      setMatchState({ selectedLeft: null, matchedPairs: newMatched, wrongPair: null });

      // 检查是否全部配对完成
      if (newMatched.size === currentExc.matchPairs?.length) {
        setShowResult(true);
        setScore((prev) => prev + 1);
        setCompletedExercises((prev) => new Set([...prev, currentExercise]));
        const newStreak = streak + 1;
        setStreak(newStreak);
        setEncouragement(getRandomEncouragement(newStreak, true));
        const finalScore = score + 1;
        if (currentExercise === grammar.exercises.length - 1 && onComplete) {
          setTimeout(() => onComplete(finalScore, grammar.exercises.length), 1000);
        }
      }
    } else {
      // 配对错误 - 显示抖动
      playWrongSound();
      setMatchState((prev) => ({
        ...prev,
        selectedLeft: null,
        wrongPair: [leftIndex, rightIndex],
      }));
      setTimeout(() => {
        setMatchState((prev) => ({ ...prev, wrongPair: null }));
      }, 600);
    }
  };

  const renderExercise = () => {
    if (!currentExc) return null;

    // 默认为选择题
    const exerciseType = currentExc.type || 'choice';

    switch (exerciseType) {
      case 'choice':
        return (
          <div className="exercise-choice">
            <div className="exercise-question">
              <span className="question-number">第 {currentExercise + 1} 题</span>
              <p>{currentExc.question}</p>
              {currentExc.hint && <p className="hint">💡 提示: {currentExc.hint}</p>}
            </div>
            <div className="exercise-options">
              {currentExc.options?.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    selectedAnswer === index
                      ? index === (currentExc.answer ?? -1)
                        ? 'correct'
                        : 'wrong'
                      : showResult && index === (currentExc.answer ?? -1)
                        ? 'correct'
                        : ''
                  }`}
                  onClick={() => handleChoiceAnswer(index)}
                  disabled={showResult}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'fill':
        return (
          <div className="exercise-fill">
            <div className="exercise-question">
              <span className="question-number">第 {currentExercise + 1} 题</span>
              <p>{currentExc.question}</p>
              {currentExc.hint && <p className="hint">💡 提示: {currentExc.hint}</p>}
            </div>
            <div className="fill-input-area">
              <input
                type="text"
                value={fillInput}
                onChange={(e) => setFillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !showResult && handleFillAnswer()}
                disabled={showResult}
                placeholder="请输入答案..."
                className={`fill-input ${
                  showResult
                    ? fillInput.trim().toLowerCase() === currentExc.fillAnswer?.toLowerCase()
                      ? 'correct'
                      : 'wrong'
                    : ''
                }`}
              />
              {!showResult && (
                <button className="submit-btn" onClick={handleFillAnswer}>
                  提交答案
                </button>
              )}
            </div>
          </div>
        );

      case 'order':
        return (
          <div className="exercise-order">
            <div className="exercise-question">
              <span className="question-number">第 {currentExercise + 1} 题</span>
              <p>{currentExc.question}</p>
              {currentExc.hint && <p className="hint">💡 提示: {currentExc.hint}</p>}
            </div>
            <div className="order-items">
              {orderItems.map((item, index) => (
                <div
                  key={index}
                  className={`order-item ${showResult && item === currentExc.correctOrder?.[index] ? 'correct' : ''}`}
                >
                  <span className="order-number">{index + 1}</span>
                  <span className="order-text">{item}</span>
                  <div className="order-controls">
                    <button
                      onClick={() => handleOrderMove(index, 'up')}
                      disabled={index === 0 || showResult}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleOrderMove(index, 'down')}
                      disabled={index === orderItems.length - 1 || showResult}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {!showResult && (
              <button className="submit-btn" onClick={handleOrderSubmit}>
                提交排序
              </button>
            )}
          </div>
        );

      case 'match':
        return (
          <div className="exercise-match">
            <div className="exercise-question">
              <span className="question-number">第 {currentExercise + 1} 题</span>
              <p>{currentExc.question}</p>
              {currentExc.hint && <p className="hint">💡 提示: {currentExc.hint}</p>}
            </div>
            <p className="match-instruction">👆 先点左边，再点右边进行配对</p>
            <div className="match-container">
              <div className="match-column">
                <h4 className="match-column-title">左列</h4>
                {currentExc.matchPairs?.map((pair, index) => {
                  const isMatched = matchState.matchedPairs.has(index);
                  const isSelected = matchState.selectedLeft === index;
                  const isWrongLeft = matchState.wrongPair && matchState.wrongPair[0] === index;
                  return (
                    <button
                      key={index}
                      className={`match-item match-left ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''} ${isWrongLeft ? 'shake' : ''}`}
                      onClick={() => handleMatchLeftClick(index)}
                      disabled={isMatched || showResult}
                    >
                      {pair.left}
                    </button>
                  );
                })}
              </div>
              <div className="match-column">
                <h4 className="match-column-title">右列</h4>
                {shuffledRight.map((rightItem, index) => {
                  const isMatched = Array.from(matchState.matchedPairs.values()).includes(index);
                  const isWrongRight = matchState.wrongPair && matchState.wrongPair[1] === index;
                  return (
                    <button
                      key={index}
                      className={`match-item match-right ${isMatched ? 'matched' : ''} ${isWrongRight ? 'shake' : ''}`}
                      onClick={() => handleMatchRightClick(index)}
                      disabled={isMatched || showResult}
                    >
                      {rightItem}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return <div>未知练习类型</div>;
    }
  };

  return (
    <div className="grammar-card enhanced">
      {/* 头部 */}
      <div className="grammar-header">
        <div className="header-content">
          <h2>{grammar.title}</h2>
          {grammar.subtitle && <p className="subtitle">{grammar.subtitle}</p>}
        </div>
        {grammar.difficulty && (
          <span className={`difficulty-badge ${grammar.difficulty}`}>
            {grammar.difficulty === 'easy'
              ? '⭐'
              : grammar.difficulty === 'medium'
                ? '⭐⭐'
                : '⭐⭐⭐'}
          </span>
        )}
      </div>

      {/* 标签页 */}
      <div className="grammar-tabs">
        <button
          className={`tab ${activeSection === 'rules' ? 'active' : ''}`}
          onClick={() => {
            logger.info(MODULE, '切换标签', '切换到语法规则');
            setActiveSection('rules');
          }}
        >
          📖 语法规则
        </button>
        <button
          className={`tab ${activeSection === 'examples' ? 'active' : ''}`}
          onClick={() => {
            logger.info(MODULE, '切换标签', '切换到例句学习');
            setActiveSection('examples');
          }}
        >
          📝 例句学习
        </button>
        <button
          className={`tab ${activeSection === 'exercises' ? 'active' : ''}`}
          onClick={() => {
            logger.info(MODULE, '切换标签', '切换到语法练习');
            setActiveSection('exercises');
          }}
        >
          ✏️ 语法练习
          {completedExercises.size > 0 && (
            <span className="progress-badge">
              {completedExercises.size}/{grammar.exercises.length}
            </span>
          )}
        </button>
      </div>

      {/* 内容区 */}
      <div className="grammar-content">
        {activeSection === 'rules' && (
          <div className="rules-section">
            {/* 朗读控制栏 */}
            <div className="reading-controls">
              {isReading ? (
                <div className="reading-status">
                  <span className="reading-indicator">🔊 正在朗读{readingPart}...</span>
                  <button className="stop-reading-btn" onClick={handleStopReading}>
                    ⏹ 停止
                  </button>
                </div>
              ) : (
                <div className="reading-controls-row">
                  <div className="reading-buttons">
                    <button className="read-btn" onClick={handleReadExplanation}>
                      📚 朗读讲解
                    </button>
                    <button className="read-btn" onClick={handleReadRules}>
                      📋 朗读规则
                    </button>
                    <button className="read-btn primary" onClick={handleReadAllExamples}>
                      📖 朗读全部
                    </button>
                  </div>
                  <div className="voice-selector-wrapper">
                    <ChineseVoiceSelector />
                  </div>
                </div>
              )}
            </div>

            <div className="explanation-card">
              <div className="card-header-with-btn">
                <h3>📚 语法讲解</h3>
                <button
                  className="speak-text-btn"
                  onClick={handleReadExplanation}
                  disabled={isReading}
                  title="朗读语法讲解"
                >
                  🔊
                </button>
              </div>
              <p>{grammar.explanation}</p>
            </div>

            <div className="rules-card">
              <div className="card-header-with-btn">
                <h3>📋 语法规则</h3>
                <button
                  className="speak-text-btn"
                  onClick={handleReadRules}
                  disabled={isReading}
                  title="朗读语法规则"
                >
                  🔊
                </button>
              </div>
              <ul className="rules-list">
                {grammar.rules.map((rule, index) => (
                  <li key={index} className="rule-item">
                    <span className="rule-number">{index + 1}</span>
                    <span className="rule-text">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {grammar.tips && grammar.tips.length > 0 && (
              <div className="tips-card">
                <h3>💡 学习技巧</h3>
                <ul className="tips-list">
                  {grammar.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {grammar.keywords && grammar.keywords.length > 0 && (
              <div className="keywords-card">
                <h3>🔑 关键词汇</h3>
                <div className="keywords-list">
                  {grammar.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'examples' && (
          <div className="examples-section">
            {/* 朗读控制栏 */}
            <div className="reading-controls">
              {isReading ? (
                <div className="reading-status">
                  <span className="reading-indicator">🔊 正在朗读{readingPart}...</span>
                  <button className="stop-reading-btn" onClick={handleStopReading}>
                    ⏹ 停止
                  </button>
                </div>
              ) : (
                <div className="reading-controls-row">
                  <div className="reading-buttons">
                    <button className="read-btn primary" onClick={handleReadAllExamples}>
                      📖 朗读全部例句
                    </button>
                  </div>
                  <div className="voice-selector-wrapper">
                    <ChineseVoiceSelector />
                  </div>
                </div>
              )}
            </div>

            <div className="examples-list">
              {grammar.examples.map((example, index) => (
                <div key={index} className="example-card">
                  <div className="example-header">
                    <span className="example-number">{index + 1}</span>
                    {example.grammarPoint && (
                      <span className="grammar-tag">{example.grammarPoint}</span>
                    )}
                  </div>
                  <div
                    className="example-english"
                    onClick={() => !isReading && speakEnglish(example.english)}
                  >
                    <span>{example.english}</span>
                    <button
                      className="speak-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isReading) speakEnglish(example.english);
                      }}
                      disabled={isReading}
                      title="朗读"
                    >
                      🔊
                    </button>
                  </div>
                  <div className="example-chinese">{example.chinese}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'exercises' && (
          <div className="exercises-section">
            <div className="exercise-header">
              <div className="exercise-progress">
                <span>
                  进度: {currentExercise + 1} / {grammar.exercises.length}
                </span>
                <span className="score">得分: {score}</span>
                {streak >= 3 && (
                  <span className="streak-badge">
                    🔥 {streak >= 5 ? `连胜${streak}题！你是小天才！` : `连对${streak}题！太棒了！`}
                  </span>
                )}
              </div>
              <div className="progress-bar progress-bar-colorful">
                <div
                  className="progress-fill progress-fill-rainbow"
                  style={{ width: `${((currentExercise + 1) / grammar.exercises.length) * 100}%` }}
                />
              </div>
            </div>

            {renderExercise()}

            {showResult &&
              (() => {
                const isCorrectAnswer =
                  selectedAnswer === currentExc.answer ||
                  (currentExc.type === 'fill' &&
                    fillInput.trim().toLowerCase() === currentExc.fillAnswer?.toLowerCase()) ||
                  (currentExc.type === 'match' &&
                    matchState.matchedPairs.size === currentExc.matchPairs?.length) ||
                  (currentExc.type === 'order' &&
                    JSON.stringify(orderItems) === JSON.stringify(currentExc.correctOrder));
                return (
                  <div className={`result-card ${isCorrectAnswer ? 'correct' : 'wrong'}`}>
                    <div className="result-icon">{isCorrectAnswer ? '🎉' : '😊'}</div>
                    <div className="result-content">
                      <h4>{isCorrectAnswer ? '回答正确！' : '加油！再想想！'}</h4>
                      <p className="explanation">{currentExc.explanation}</p>
                    </div>
                    {currentExercise < grammar.exercises.length - 1 && (
                      <button className="next-btn" onClick={nextExercise}>
                        下一题 →
                      </button>
                    )}
                  </div>
                );
              })()}

            {showResult && encouragement && (
              <div className="encouragement-banner">
                <span className="encouragement-emoji bounce">🌟</span>
                <span className="encouragement-text">{encouragement}</span>
              </div>
            )}

            {currentExercise === grammar.exercises.length - 1 &&
              showResult &&
              (() => {
                const percentage =
                  grammar.exercises.length > 0 ? score / grammar.exercises.length : 0;
                const isPerfect = percentage === 1;
                const isExcellent = percentage >= 0.8;
                const isGood = percentage >= 0.6;
                if (isPerfect) playPerfectSound();
                return (
                  <div
                    className={`final-result ${isPerfect ? 'perfect' : isExcellent ? 'excellent' : isGood ? 'good' : 'needs-practice'}`}
                  >
                    <h3>🎊 练习完成！</h3>
                    <div className="final-stars">
                      <span className={`star ${isGood ? 'star-active' : 'star-inactive'}`}>⭐</span>
                      <span
                        className={`star ${isExcellent ? 'star-active' : 'star-inactive'}`}
                        style={{ animationDelay: '0.2s' }}
                      >
                        ⭐
                      </span>
                      <span
                        className={`star ${isPerfect ? 'star-active' : 'star-inactive'}`}
                        style={{ animationDelay: '0.4s' }}
                      >
                        ⭐
                      </span>
                    </div>
                    <div className="final-score">
                      <span className="score-number">{score}</span>
                      <span className="score-divider">/</span>
                      <span className="score-total">{grammar.exercises.length}</span>
                    </div>
                    <p className="final-title">
                      {isPerfect
                        ? '满星通关！'
                        : isExcellent
                          ? '表现优秀！'
                          : isGood
                            ? '继续努力！'
                            : '再练一次吧！'}
                    </p>
                    <p className="score-message">
                      {isPerfect
                        ? '太棒了！全部正确！你真是英语小天才！'
                        : isExcellent
                          ? '做得非常好！再加把劲就能满分啦！'
                          : isGood
                            ? '不错不错！多练习就能更厉害！'
                            : '没关系，多练习几次一定能学会的！加油！'}
                    </p>
                    <button className="retry-btn" onClick={resetExercises}>
                      🔄 再来一次
                    </button>
                  </div>
                );
              })()}

            {grammar.exercises.length === 0 && (
              <div className="no-exercises">
                <p>暂无练习题</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarCardEnhanced;
