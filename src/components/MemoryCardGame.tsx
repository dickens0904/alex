import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playCorrectSound, playWrongSound, playStreakSound } from '../services/soundEffects';
import { logger } from '../utils/logger';
import './MemoryCardGame.css';

interface Vocabulary {
  word: string;
  meaning: string;
  phonetic?: string;
}

interface Card {
  id: number;
  type: 'english' | 'chinese';
  pairId: number;
  text: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryCardGameProps {
  vocabulary: Vocabulary[];
  onFinish: (score: number, totalScore: number) => void;
  onBack: () => void;
}

const MAX_PAIRS = 6;

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const MemoryCardGame: React.FC<MemoryCardGameProps> = ({ vocabulary, onFinish, onBack }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [shakeCards, setShakeCards] = useState<number[]>([]);
  const [bounceCards, setBounceCards] = useState<number[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 生成卡牌
  const generateCards = useCallback(() => {
    const pairs = shuffleArray(vocabulary).slice(0, MAX_PAIRS);
    const pairCount = pairs.length;
    setTotalPairs(pairCount);

    const newCards: Card[] = [];
    pairs.forEach((vocab, index) => {
      newCards.push({
        id: index * 2,
        type: 'english',
        pairId: index,
        text: vocab.word,
        isFlipped: false,
        isMatched: false,
      });
      newCards.push({
        id: index * 2 + 1,
        type: 'chinese',
        pairId: index,
        text: vocab.meaning,
        isFlipped: false,
        isMatched: false,
      });
    });

    return shuffleArray(newCards);
  }, [vocabulary]);

  // 开始游戏
  const handleStart = () => {
    const shuffled = generateCards();
    logger.info(
      'MemoryCardGame',
      '开始游戏',
      `词汇数: ${vocabulary.length}, 牌组: ${Math.min(vocabulary.length, MAX_PAIRS)}对`
    );
    setCards(shuffled);
    setSelectedCards([]);
    setScore(0);
    setMatchedPairs(0);
    setStreak(0);
    setTimer(0);
    setIsChecking(false);
    setShakeCards([]);
    setBounceCards([]);
    setGameState('playing');
  };

  // 计时器
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // 翻牌
  const handleCardClick = (cardId: number) => {
    if (isChecking) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (selectedCards.length >= 2) return;

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    // 翻开这张牌
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)));

    // 如果翻了2张，检查是否匹配
    if (newSelected.length === 2) {
      setIsChecking(true);
      const firstCard = cards.find((c) => c.id === newSelected[0])!;
      const secondCard = cards.find((c) => c.id === newSelected[1])!;

      if (firstCard.pairId === secondCard.pairId) {
        // 配对成功
        const newStreak = streak + 1;
        setStreak(newStreak);
        const bonus = newStreak >= 3 ? 15 : 10;
        setScore((prev) => prev + bonus);
        setMatchedPairs((prev) => prev + 1);
        logger.success(
          'MemoryCardGame',
          '配对成功',
          `${firstCard.text} ↔ ${secondCard.text} | 连击: ${newStreak}`
        );

        playCorrectSound();
        if (newStreak >= 3 && newStreak % 3 === 0) {
          playStreakSound(newStreak);
        }

        // 弹跳动画
        setBounceCards(newSelected);
        setTimeout(() => setBounceCards([]), 600);

        // 标记为已匹配
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c))
          );
          setSelectedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        // 配对失败
        setStreak(0);
        logger.warn('MemoryCardGame', '配对失败', `${firstCard.text} ≠ ${secondCard.text}`);
        playWrongSound();

        // 摇晃动画
        setShakeCards(newSelected);
        if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);

        // 1秒后翻回
        shakeTimeoutRef.current = setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (newSelected.includes(c.id) ? { ...c, isFlipped: false } : c))
          );
          setShakeCards([]);
          setSelectedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  // 检查游戏是否结束
  useEffect(() => {
    if (
      gameState === 'playing' &&
      matchedPairs > 0 &&
      matchedPairs === totalPairs &&
      totalPairs > 0
    ) {
      if (timerRef.current) clearInterval(timerRef.current);
      const totalScore = totalPairs * 10;
      logger.success(
        'MemoryCardGame',
        '游戏结束',
        `得分: ${score}/${totalScore} | 用时: ${timer}秒`
      );
      setTimeout(() => {
        setGameState('finished');
        onFinish(score, totalScore);
      }, 800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedPairs, totalPairs, gameState, score, onFinish]);

  // 格式化时间
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // 星级评价
  const getStarRating = () => {
    if (totalPairs === 0) return 1;
    const timePerPair = timer / totalPairs;
    if (timePerPair <= 5) return 3;
    if (timePerPair <= 10) return 2;
    return 1;
  };

  // ---- 渲染 ----

  if (gameState === 'ready') {
    return (
      <div className="memory-game-container">
        <div className="memory-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <div className="memory-title">🃏 记忆翻牌</div>
          <div className="memory-subtitle">{vocabulary.length} 个单词</div>
        </div>
        <div className="memory-ready">
          <div className="ready-icon">🃏</div>
          <h2>记忆翻牌游戏</h2>
          <p>翻开卡牌，找到英文单词和中文翻译的配对！</p>
          <p className="ready-hint">连续配对成功可获得额外加分</p>
          <button className="memory-start-btn" onClick={handleStart}>
            开始游戏！
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const totalScore = totalPairs * 10;
    const stars = getStarRating();
    return (
      <div className="memory-game-container">
        <div className="memory-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <div className="memory-title">🃏 记忆翻牌</div>
          <div />
        </div>
        <div className="memory-finished">
          <div className="result-stars">
            {'⭐'.repeat(stars)}
            {'☆'.repeat(3 - stars)}
          </div>
          <h2>恭喜完成！</h2>
          <div className="result-info">
            <div className="result-item">
              <span className="result-label">用时</span>
              <span className="result-value">{formatTime(timer)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">配对</span>
              <span className="result-value">
                {matchedPairs}/{totalPairs}
              </span>
            </div>
            <div className="result-item">
              <span className="result-label">得分</span>
              <span className="result-value">
                {score}/{totalScore}
              </span>
            </div>
          </div>
          <div className="result-actions">
            <button className="memory-start-btn" onClick={handleStart}>
              再来一次
            </button>
            <button className="memory-back-btn" onClick={onBack}>
              返回
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-game-container">
      <div className="memory-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <div className="memory-round">
          配对 {matchedPairs}/{totalPairs}
        </div>
        <div className="memory-score-display">⭐ {score}</div>
        <div className="memory-timer">⏱ {formatTime(timer)}</div>
      </div>

      {/* 连击提示 */}
      {streak >= 3 && <div className="streak-banner">🔥 {streak}连击！</div>}

      {/* 卡牌网格 */}
      <div
        className="memory-grid"
        style={{
          gridTemplateColumns: `repeat(${Math.min(4, Math.ceil(Math.sqrt(cards.length)))}, 1fr)`,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''} ${shakeCards.includes(card.id) ? 'shake' : ''} ${bounceCards.includes(card.id) ? 'bounce' : ''} ${card.type}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <span className="card-question">?</span>
              </div>
              <div className={`card-back ${card.type}`}>
                <span className="card-text">{card.text}</span>
                {card.isMatched && <span className="card-check">✓</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryCardGame;
