import React, { useState, useEffect, useRef, useCallback } from 'react';
import { speakWord } from '../services/tts';
import { playCorrectSound, playWrongSound, playStreakSound } from '../services/soundEffects';
import { logger } from '../utils/logger';
import './ShootingGame.css';

interface Vocabulary {
  word: string;
  meaning: string;
  phonetic?: string;
  examples?: string[];
}

interface Target {
  id: number;
  text: string;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  isCorrect: boolean;
  hit: boolean;
  missed: boolean;
}

interface Bullet {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
}

interface ShootingGameProps {
  vocabulary: Vocabulary[];
  onFinish: (score: number, totalScore: number) => void;
  onBack: () => void;
}

const GAME_WIDTH = 700;
const GAME_HEIGHT = 480;
const TARGET_SIZE = 72;
const ROUND_TIME = 12000; // 每轮12秒
const CANNON_Y = GAME_HEIGHT - 50;

const ShootingGame: React.FC<ShootingGameProps> = ({ vocabulary, onFinish, onBack }) => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [currentWord, setCurrentWord] = useState<Vocabulary | null>(null);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; type: 'correct' | 'wrong' | '' }>({
    text: '',
    type: '',
  });
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'roundEnd' | 'finished'>(
    'ready'
  );
  const [timer, setTimer] = useState(ROUND_TIME / 1000);
  const [cannonAngle, setCannonAngle] = useState(0);

  const animFrameRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bulletIdRef = useRef(0);
  const explosionIdRef = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<Target[]>([]);

  // 生成本轮的单词和目标
  const generateRound = useCallback(
    (roundIndex: number) => {
      const wordPool = [...vocabulary];
      if (wordPool.length < 4) return;

      // 选当前题
      const correctIdx = roundIndex % wordPool.length;
      const correctWord = wordPool[correctIdx];
      setCurrentWord(correctWord);

      // 选3个干扰项
      const distractors = wordPool
        .filter((_, i) => i !== correctIdx)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [correctWord, ...distractors].sort(() => Math.random() - 0.5);

      // 生成目标位置 - 分散在上方区域
      const newTargets: Target[] = options.map((opt, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const baseX = col === 0 ? 80 + Math.random() * 120 : GAME_WIDTH - 200 + Math.random() * 120;
        const baseY = 60 + row * 130 + Math.random() * 40;
        const speedX = (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1);
        const speedY = (0.1 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1);

        return {
          id: i,
          text: opt.meaning,
          x: baseX,
          y: baseY,
          speedX,
          speedY,
          isCorrect: opt.word === correctWord.word,
          hit: false,
          missed: false,
        };
      });

      setTargets(newTargets);
      targetsRef.current = newTargets;
      setBullets([]);
      setExplosions([]);
      setFeedback({ text: '', type: '' });
      setTimer(ROUND_TIME / 1000);

      // 播放单词读音
      setTimeout(() => speakWord(correctWord.word), 300);
    },
    [vocabulary]
  );

  // 目标移动动画
  useEffect(() => {
    if (gameState !== 'playing') return;

    const animate = () => {
      targetsRef.current = targetsRef.current.map((t) => {
        if (t.hit || t.missed) return t;
        let nx = t.x + t.speedX;
        let ny = t.y + t.speedY;
        let sx = t.speedX;
        let sy = t.speedY;
        // 边界反弹
        if (nx < 10 || nx > GAME_WIDTH - TARGET_SIZE - 10) {
          sx = -sx;
          nx = Math.max(10, Math.min(GAME_WIDTH - TARGET_SIZE - 10, nx));
        }
        if (ny < 20 || ny > GAME_HEIGHT - TARGET_SIZE - 100) {
          sy = -sy;
          ny = Math.max(20, Math.min(GAME_HEIGHT - TARGET_SIZE - 100, ny));
        }
        return { ...t, x: nx, y: ny, speedX: sx, speedY: sy };
      });
      setTargets([...targetsRef.current]);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameState]);

  // 倒计时
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // 时间到，本轮结束
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, round]);

  // 时间到自动进入下一轮
  useEffect(() => {
    if (timer === 0 && gameState === 'playing') {
      handleRoundEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  // 子弹动画更新
  useEffect(() => {
    if (bullets.length === 0) return;
    const interval = setInterval(() => {
      setBullets((prev) =>
        prev.map((b) => ({ ...b, progress: b.progress + 0.08 })).filter((b) => b.progress < 1)
      );
    }, 16);
    return () => clearInterval(interval);
  }, [bullets.length]);

  // 爆炸自动消失
  useEffect(() => {
    if (explosions.length === 0) return;
    const timeout = setTimeout(() => setExplosions([]), 600);
    return () => clearTimeout(timeout);
  }, [explosions]);

  // 开始游戏
  const handleStart = () => {
    logger.info('ShootingGame', '开始游戏', `词汇数: ${vocabulary.length}`);
    setGameState('playing');
    setRound(0);
    setScore(0);
    setStreak(0);
    generateRound(0);
  };

  // 点击目标
  const handleTargetClick = (target: Target) => {
    if (target.hit || target.missed || gameState !== 'playing') return;

    // 计算炮台角度
    const cannonX = GAME_WIDTH / 2;
    const targetCenterX = target.x + TARGET_SIZE / 2;
    const targetCenterY = target.y + TARGET_SIZE / 2;
    const angle =
      Math.atan2(CANNON_Y - targetCenterY, cannonX - targetCenterX) * (180 / Math.PI) + 90;
    setCannonAngle(angle);

    // 发射子弹
    const bulletId = ++bulletIdRef.current;
    setBullets((prev) => [
      ...prev,
      {
        id: bulletId,
        startX: cannonX,
        startY: CANNON_Y,
        targetX: targetCenterX,
        targetY: targetCenterY,
        progress: 0,
      },
    ]);

    // 延迟判定结果（子弹到达后）
    setTimeout(() => {
      if (target.isCorrect) {
        // 命中正确答案
        const newStreak = streak + 1;
        setStreak(newStreak);
        const bonus = newStreak >= 3 ? 15 : 10;
        setScore((prev) => prev + bonus);
        logger.success(
          'ShootingGame',
          '命中正确',
          `${currentWord?.word} → ${target.text} | 连击: ${newStreak}`
        );
        setFeedback({
          text: newStreak >= 3 ? `🔥 ${newStreak}连击！+${bonus}分` : '✅ 正确！+10分',
          type: 'correct',
        });
        playCorrectSound();
        if (newStreak >= 3 && newStreak % 3 === 0) playStreakSound(newStreak);

        // 爆炸特效
        const eid = ++explosionIdRef.current;
        setExplosions((prev) => [...prev, { id: eid, x: targetCenterX, y: targetCenterY }]);

        // 标记命中
        targetsRef.current = targetsRef.current.map((t) =>
          t.id === target.id ? { ...t, hit: true } : t
        );
        setTargets([...targetsRef.current]);

        // 1.5秒后进入下一轮
        setTimeout(() => handleRoundEnd(), 1500);
      } else {
        // 打错了
        setStreak(0);
        logger.warn('ShootingGame', '命中错误', `${currentWord?.word} → ${target.text}`);
        setFeedback({ text: '❌ 打错了！', type: 'wrong' });
        playWrongSound();

        // 标记missed
        targetsRef.current = targetsRef.current.map((t) =>
          t.id === target.id ? { ...t, missed: true } : t
        );
        setTargets([...targetsRef.current]);
      }
    }, 350);
  };

  // 轮次结束
  const handleRoundEnd = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    cancelAnimationFrame(animFrameRef.current);

    const totalRounds = Math.min(vocabulary.length, 10);
    if (round + 1 >= totalRounds) {
      // 游戏结束
      const totalScore = totalRounds * 10;
      logger.success('ShootingGame', '游戏结束', `得分: ${score}/${totalScore}`);
      setGameState('finished');
      onFinish(score, totalScore);
    } else {
      logger.info('ShootingGame', '轮次结束', `第${round + 1}轮完成`);
      setGameState('roundEnd');
    }
  };

  // 进入下一轮
  const handleNextRound = () => {
    const nextRound = round + 1;
    setRound(nextRound);
    setGameState('playing');
    generateRound(nextRound);
  };

  // 重听单词
  const handleReplay = () => {
    if (currentWord) speakWord(currentWord.word);
  };

  const totalRounds = Math.min(vocabulary.length, 10);

  // ---- 画面渲染 ----

  if (gameState === 'ready') {
    return (
      <div className="shooting-game-container">
        <div className="game-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <div className="game-title">🎯 单词射击</div>
          <div className="game-subtitle">{vocabulary.length} 个单词</div>
        </div>
        <div className="game-ready">
          <div className="ready-icon">🎯</div>
          <h2>单词射击游戏</h2>
          <p>听英文单词，用炮弹击中正确的中文解释！</p>
          <p className="ready-hint">答对 +10 分，连续命中额外加分</p>
          <button className="start-btn" onClick={handleStart}>
            开始游戏！
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const totalScore = totalRounds * 10;
    const percent = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
    return (
      <div className="shooting-game-container">
        <div className="game-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <div className="game-title">🎯 单词射击</div>
          <div />
        </div>
        <div className="game-finished">
          <div className="result-stars">
            {percent >= 80 ? '⭐⭐⭐' : percent >= 50 ? '⭐⭐' : '⭐'}
          </div>
          <h2>游戏结束！</h2>
          <div className="result-score">
            {score} / {totalScore}
          </div>
          <div className="result-percent">命中率 {percent}%</div>
          <div className="result-actions">
            <button className="start-btn" onClick={handleStart}>
              再来一次
            </button>
            <button className="back-game-btn" onClick={onBack}>
              返回
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shooting-game-container">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <div className="game-round">
          第 {round + 1}/{totalRounds} 题
        </div>
        <div className="game-score-display">⭐ {score}</div>
      </div>

      {/* 当前单词 */}
      <div className="word-prompt">
        <span className="prompt-label">请射击：</span>
        <span className="prompt-word">{currentWord?.word}</span>
        {currentWord?.phonetic && <span className="prompt-phonetic">/{currentWord.phonetic}/</span>}
        <button className="replay-btn" onClick={handleReplay}>
          🔊 重听
        </button>
        <div className="timer-bar">
          <div
            className="timer-fill"
            style={{ width: `${(timer / (ROUND_TIME / 1000)) * 100}%` }}
          />
        </div>
      </div>

      {/* 游戏区域 */}
      <div className="game-area" ref={gameAreaRef}>
        {/* 目标 */}
        {targets.map((t) => (
          <div
            key={t.id}
            className={`target ${t.hit ? 'hit' : ''} ${t.missed ? 'missed' : ''}`}
            style={{ left: t.x, top: t.y, width: TARGET_SIZE, height: TARGET_SIZE }}
            onClick={() => handleTargetClick(t)}
          >
            <div className="target-inner">
              <span className="target-text">{t.text}</span>
            </div>
          </div>
        ))}

        {/* 子弹 */}
        {bullets.map((b) => {
          const cx = b.startX + (b.targetX - b.startX) * b.progress;
          const cy = b.startY + (b.targetY - b.startY) * b.progress;
          return <div key={b.id} className="bullet" style={{ left: cx - 6, top: cy - 6 }} />;
        })}

        {/* 爆炸特效 */}
        {explosions.map((e) => (
          <div key={e.id} className="explosion" style={{ left: e.x - 40, top: e.y - 40 }}>
            <div className="explosion-ring" />
            <div className="explosion-particles">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`particle p-${i}`} />
              ))}
            </div>
          </div>
        ))}

        {/* 炮台 */}
        <div className="cannon">
          <div className="cannon-base" />
          <div className="cannon-barrel" style={{ transform: `rotate(${cannonAngle}deg)` }} />
          <div className="cannon-wheel" />
        </div>
      </div>

      {/* 反馈 */}
      {feedback.text && (
        <div className={`game-feedback ${feedback.type}`}>
          {feedback.text}
          {streak >= 3 && <span className="streak-fire"> 🔥x{streak}</span>}
        </div>
      )}

      {/* 轮间结算 */}
      {gameState === 'roundEnd' && (
        <div className="round-end-overlay">
          <div className="round-end-card">
            <div className="round-result-icon">⏰</div>
            <p>时间到！正确答案是：</p>
            <p className="round-answer">{currentWord?.meaning}</p>
            <button className="next-round-btn" onClick={handleNextRound}>
              下一题 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShootingGame;
