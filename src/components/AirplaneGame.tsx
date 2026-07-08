import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playCorrectSound, playWrongSound, playStreakSound } from '../services/soundEffects';
import { logger } from '../utils/logger';
import './AirplaneGame.css';

interface Vocabulary {
  word: string;
  meaning: string;
  phonetic?: string;
}

interface AirplaneGameProps {
  vocabulary: Vocabulary[];
  onFinish: (score: number, totalScore: number) => void;
  onBack: () => void;
}

// --- 游戏实体类型 ---

interface Enemy {
  id: number;
  text: string;
  x: number;
  y: number;
  speedY: number;
  isCorrect: boolean;
  alive: boolean;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
}

// --- 常量 ---

const GAME_WIDTH = 700;
const GAME_HEIGHT = 500;
const PLAYER_WIDTH = 32;
const PLAYER_SPEED = 6;
const ENEMY_WIDTH = 56;
const ENEMY_HEIGHT = 50;
const BULLET_SPEED = 8;
const ENEMY_BASE_SPEED = 0.8;
const SHOOT_INTERVAL = 500;
const MAX_ROUNDS = 10;
const INITIAL_LIVES = 3;
const HIT_RADIUS = 30;

// --- 预生成星星位置 ---

const STARS: { x: number; y: number; large: boolean; duration: number; delay: number }[] = [];
for (let i = 0; i < 60; i++) {
  STARS.push({
    x: Math.random() * GAME_WIDTH,
    y: Math.random() * GAME_HEIGHT,
    large: Math.random() > 0.75,
    duration: 1.5 + Math.random() * 3,
    delay: Math.random() * 3,
  });
}

// --- 组件 ---

const AirplaneGame: React.FC<AirplaneGameProps> = ({ vocabulary, onFinish, onBack }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'lifeLost' | 'finished'>(
    'ready'
  );
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [streak, setStreak] = useState(0);
  const [currentWord, setCurrentWord] = useState<Vocabulary | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; type: 'correct' | 'wrong' | '' }>({
    text: '',
    type: '',
  });
  const [showExplosions, setShowExplosions] = useState<Explosion[]>([]);
  const [roundResults, setRoundResults] = useState<('correct' | 'wrong' | 'missed')[]>([]);

  // 用 ref 追踪位置，避免 state 导致的性能问题
  const playerXRef = useRef(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const enemiesRef = useRef<Enemy[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const animFrameRef = useRef<number>(0);
  const shootTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bulletIdRef = useRef(0);
  const enemyIdRef = useRef(0);
  const explosionIdRef = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameStateRef = useRef<'ready' | 'playing' | 'lifeLost' | 'finished'>('ready');
  const roundRef = useRef(0);
  const livesRef = useRef(INITIAL_LIVES);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const roundResultsRef = useRef<('correct' | 'wrong' | 'missed')[]>([]);
  const currentWordRef = useRef<Vocabulary | null>(null);
  const roundActiveRef = useRef(false);
  const enemiesReachedRef = useRef(false);

  // 用于强制重新渲染的 state（游戏循环中标记 dirty）
  const [, setTick] = useState(0);
  const tickRef = useRef(0);
  const dirtyRef = useRef(false);

  const _markDirty = useCallback(() => {
    if (!dirtyRef.current) {
      dirtyRef.current = true;
      tickRef.current += 1;
      setTick(tickRef.current);
    }
  }, []);

  const totalRounds = Math.min(vocabulary.length, MAX_ROUNDS);

  // 生成本轮敌机
  const spawnEnemies = useCallback(
    (roundIndex: number) => {
      const wordPool = [...vocabulary];
      if (wordPool.length < 3) return;

      const correctIdx = roundIndex % wordPool.length;
      const correctWord = wordPool[correctIdx];
      currentWordRef.current = correctWord;
      setCurrentWord(correctWord);

      // 随机3-4个选项
      const numEnemies = wordPool.length >= 4 ? (Math.random() > 0.5 ? 4 : 3) : 3;
      const distractors = wordPool
        .filter((_, i) => i !== correctIdx)
        .sort(() => Math.random() - 0.5)
        .slice(0, numEnemies - 1);

      const options = [correctWord, ...distractors].sort(() => Math.random() - 0.5);

      const newEnemies: Enemy[] = options.map((opt, i) => ({
        id: ++enemyIdRef.current,
        text: opt.meaning,
        x:
          40 +
          (i * (GAME_WIDTH - 80)) / (options.length - 1 || 1) -
          ENEMY_WIDTH / 2 +
          (Math.random() - 0.5) * 40,
        y: -60 - i * 40 - Math.random() * 30,
        speedY: ENEMY_BASE_SPEED + Math.random() * 0.4,
        isCorrect: opt.word === correctWord.word,
        alive: true,
      }));

      enemiesRef.current = newEnemies;
      bulletsRef.current = [];
      enemiesReachedRef.current = false;
      roundActiveRef.current = true;
    },
    [vocabulary]
  );

  // 开始游戏
  const handleStart = useCallback(() => {
    logger.info('AirplaneGame', '开始游戏', `词汇数: ${vocabulary.length}, 轮数: ${totalRounds}`);
    setScore(0);
    scoreRef.current = 0;
    setLives(INITIAL_LIVES);
    livesRef.current = INITIAL_LIVES;
    setStreak(0);
    streakRef.current = 0;
    setRound(0);
    roundRef.current = 0;
    setRoundResults([]);
    roundResultsRef.current = [];
    setFeedback({ text: '', type: '' });
    setShowExplosions([]);
    setGameState('playing');
    gameStateRef.current = 'playing';
    spawnEnemies(0);
  }, [spawnEnemies, totalRounds, vocabulary.length]);

  // 进入下一轮
  const nextRound = useCallback(() => {
    const nextR = roundRef.current + 1;
    if (nextR >= totalRounds || livesRef.current <= 0) {
      // 游戏结束
      setGameState('finished');
      gameStateRef.current = 'finished';
      const totalScore = totalRounds * 10;
      onFinish(scoreRef.current, totalScore);
      return;
    }
    roundRef.current = nextR;
    setRound(nextR);
    setFeedback({ text: '', type: '' });
    setGameState('playing');
    gameStateRef.current = 'playing';
    spawnEnemies(nextR);
  }, [totalRounds, onFinish, spawnEnemies]);

  // 失去生命后处理
  const handleLifeLost = useCallback(() => {
    const newLives = livesRef.current - 1;
    livesRef.current = newLives;
    setLives(newLives);
    setStreak(0);
    streakRef.current = 0;
    logger.warn(
      'AirplaneGame',
      '失去生命',
      `剩余生命: ${newLives} | 正确答案: ${currentWordRef.current?.meaning}`
    );

    // 记录本轮结果
    const newResults = [...roundResultsRef.current, 'missed' as const];
    roundResultsRef.current = newResults;
    setRoundResults(newResults);

    playWrongSound();

    if (newLives <= 0 || roundRef.current + 1 >= totalRounds) {
      const totalScore = totalRounds * 10;
      logger.success(
        'AirplaneGame',
        '游戏结束',
        `得分: ${scoreRef.current}/${totalScore} | 剩余生命: ${newLives}`
      );
      setGameState('finished');
      gameStateRef.current = 'finished';
      onFinish(scoreRef.current, totalScore);
    } else {
      setGameState('lifeLost');
      gameStateRef.current = 'lifeLost';
    }
  }, [totalRounds, onFinish]);

  // 子弹与敌机碰撞检测
  const checkCollisions = useCallback(() => {
    if (!roundActiveRef.current) return;

    const bullets = bulletsRef.current;
    const enemies = enemiesRef.current;

    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      const bullet = bullets[bi];
      for (let ei = enemies.length - 1; ei >= 0; ei--) {
        const enemy = enemies[ei];
        if (!enemy.alive) continue;

        const ecx = enemy.x + ENEMY_WIDTH / 2;
        const ecy = enemy.y + ENEMY_HEIGHT / 2;
        const dist = Math.sqrt((bullet.x - ecx) ** 2 + (bullet.y - ecy) ** 2);

        if (dist < HIT_RADIUS) {
          // 命中！
          bullets.splice(bi, 1);
          enemy.alive = false;

          // 爆炸特效
          const eid = ++explosionIdRef.current;
          setShowExplosions((prev) => [...prev, { id: eid, x: ecx, y: ecy }]);
          setTimeout(() => {
            setShowExplosions((prev) => prev.filter((e) => e.id !== eid));
          }, 600);

          if (enemy.isCorrect) {
            // 命中正确答案
            const newStreak = streakRef.current + 1;
            streakRef.current = newStreak;
            setStreak(newStreak);

            const bonus = newStreak >= 3 ? 15 : 10;
            scoreRef.current += bonus;
            setScore(scoreRef.current);
            logger.success(
              'AirplaneGame',
              '击落正确敌机',
              `${currentWordRef.current?.word} → ${enemy.text} | 连击: ${newStreak}`
            );

            setFeedback({
              text: newStreak >= 3 ? `🔥 ${newStreak}连击！+${bonus}分` : '✅ 正确！+10分',
              type: 'correct',
            });
            playCorrectSound();
            if (newStreak >= 3 && newStreak % 3 === 0) playStreakSound(newStreak);

            // 记录结果
            const newResults = [...roundResultsRef.current, 'correct' as const];
            roundResultsRef.current = newResults;
            setRoundResults(newResults);

            roundActiveRef.current = false;

            // 1.5秒后进入下一轮
            setTimeout(() => {
              nextRound();
            }, 1500);
          } else {
            // 打错
            streakRef.current = 0;
            setStreak(0);
            logger.warn(
              'AirplaneGame',
              '击中错误敌机',
              `${currentWordRef.current?.word} → ${enemy.text}`
            );
            setFeedback({ text: '❌ 打错了！继续瞄准~', type: 'wrong' });
            playWrongSound();
          }

          dirtyRef.current = true;
          break;
        }
      }
    }
  }, [nextRound]);

  // 游戏主循环
  useEffect(() => {
    if (gameStateRef.current !== 'playing') return;

    const loop = () => {
      if (gameStateRef.current !== 'playing' || !roundActiveRef.current) {
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      let needsUpdate = false;

      // 移动玩家飞机
      if (keysRef.current.left) {
        playerXRef.current = Math.max(0, playerXRef.current - PLAYER_SPEED);
        needsUpdate = true;
      }
      if (keysRef.current.right) {
        playerXRef.current = Math.min(GAME_WIDTH - PLAYER_WIDTH, playerXRef.current + PLAYER_SPEED);
        needsUpdate = true;
      }

      // 移动子弹
      for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
        bulletsRef.current[i].y -= BULLET_SPEED;
        if (bulletsRef.current[i].y < -20) {
          bulletsRef.current.splice(i, 1);
        }
      }
      if (bulletsRef.current.length > 0) needsUpdate = true;

      // 移动敌机
      let anyEnemyReached = false;
      for (const enemy of enemiesRef.current) {
        if (!enemy.alive) continue;
        enemy.y += enemy.speedY;
        if (enemy.y > GAME_HEIGHT - 40) {
          anyEnemyReached = true;
        }
      }
      needsUpdate = true;

      // 碰撞检测
      checkCollisions();

      // 敌机到达底部
      if (anyEnemyReached && !enemiesReachedRef.current) {
        enemiesReachedRef.current = true;
        handleLifeLost();
      }

      if (needsUpdate) {
        dirtyRef.current = true;
        tickRef.current += 1;
        setTick(tickRef.current);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, checkCollisions, handleLifeLost]);

  // 鼠标移动飞机
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (gameStateRef.current !== 'playing') return;
    const area = gameAreaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    playerXRef.current = Math.max(0, Math.min(GAME_WIDTH - PLAYER_WIDTH, mx - PLAYER_WIDTH / 2));
    dirtyRef.current = true;
    tickRef.current += 1;
    setTick(tickRef.current);
  }, []);

  // 键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') keysRef.current.right = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') keysRef.current.right = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 自动射击
  useEffect(() => {
    if (gameState !== 'playing') {
      if (shootTimerRef.current) {
        clearInterval(shootTimerRef.current);
        shootTimerRef.current = null;
      }
      return;
    }

    shootTimerRef.current = setInterval(() => {
      if (gameStateRef.current !== 'playing' || !roundActiveRef.current) return;
      const bulletId = ++bulletIdRef.current;
      const bx = playerXRef.current + PLAYER_WIDTH / 2;
      const by = GAME_HEIGHT - 60;
      bulletsRef.current.push({ id: bulletId, x: bx, y: by });
    }, SHOOT_INTERVAL);

    return () => {
      if (shootTimerRef.current) {
        clearInterval(shootTimerRef.current);
        shootTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // 爆炸自动消失
  useEffect(() => {
    if (showExplosions.length === 0) return;
    const timeout = setTimeout(() => setShowExplosions([]), 600);
    return () => clearTimeout(timeout);
  }, [showExplosions]);

  // ---- 渲染 ----

  // 准备界面
  if (gameState === 'ready') {
    return (
      <div className="airplane-game-container">
        <div className="game-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <div className="game-title">🛩️ 飞机大战</div>
          <div className="game-subtitle">{vocabulary.length} 个单词</div>
        </div>
        <div className="game-ready">
          <div className="ready-icon">🛩️</div>
          <h2>飞机大战</h2>
          <p>用战斗机击落标有正确中文翻译的敌机！</p>
          <p>键盘 ← → 或鼠标移动飞机，自动发射子弹</p>
          <p className="ready-hint">击中正确答案 +10 分，连续命中额外加分！</p>
          <button className="start-btn" onClick={handleStart}>
            开始战斗！
          </button>
        </div>
      </div>
    );
  }

  // 结算界面
  if (gameState === 'finished') {
    const totalScore = totalRounds * 10;
    const percent = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
    return (
      <div className="airplane-game-container">
        <div className="game-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <div className="game-title">🛩️ 飞机大战</div>
          <div />
        </div>
        <div className="game-finished">
          <div className="result-stars">
            {percent >= 80 ? '⭐⭐⭐' : percent >= 50 ? '⭐⭐' : '⭐'}
          </div>
          <h2>战斗结束！</h2>
          <div className="result-score">
            {score} / {totalScore}
          </div>
          <div className="result-detail">
            剩余生命：{'❤️'.repeat(lives)}
            {'🤍'.repeat(INITIAL_LIVES - lives)}
          </div>
          <div className="result-percent">命中率 {percent}%</div>
          <div className="result-actions">
            <button className="start-btn" onClick={handleStart}>
              再战一次
            </button>
            <button className="back-game-btn" onClick={onBack}>
              返回
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 游戏界面（playing / lifeLost）
  const playerX = playerXRef.current;
  const enemies = enemiesRef.current;
  const bullets = bulletsRef.current;

  return (
    <div className="airplane-game-container">
      {/* 顶部信息栏 */}
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <div className="game-round">
          第 {round + 1}/{totalRounds} 轮
        </div>
        <div className="game-score-display">⭐ {score}</div>
      </div>

      {/* 当前单词 & 生命 */}
      <div className="word-prompt">
        <span className="prompt-label">击落翻译：</span>
        <span className="prompt-word">{currentWord?.word}</span>
        {currentWord?.phonetic && <span className="prompt-phonetic">/{currentWord.phonetic}/</span>}
        <div className="lives-display">
          {'❤️'.repeat(lives)}
          {'🤍'.repeat(INITIAL_LIVES - lives)}
        </div>
      </div>

      {/* 游戏区域 */}
      <div className="game-area" ref={gameAreaRef} onMouseMove={handleMouseMove}>
        {/* 星星背景 */}
        {STARS.map((star, i) => (
          <div
            key={i}
            className={`star ${star.large ? 'large' : ''}`}
            style={
              {
                left: star.x,
                top: star.y,
                '--duration': `${star.duration}s`,
                '--delay': `${star.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* 敌机 */}
        {enemies.map((enemy) => (
          <div
            key={enemy.id}
            className={`enemy ${!enemy.alive ? 'exploding' : ''}`}
            style={{
              left: enemy.x,
              top: enemy.y,
              opacity: enemy.alive ? 1 : 0,
            }}
          >
            <div className="enemy-plane">
              <div className="enemy-cockpit" />
            </div>
            <div className="enemy-label">{enemy.text}</div>
          </div>
        ))}

        {/* 子弹 */}
        {bullets.map((b) => (
          <div key={b.id} className="bullet" style={{ left: b.x - 2, top: b.y }} />
        ))}

        {/* 爆炸特效 */}
        {showExplosions.map((e) => (
          <div key={e.id} className="explosion" style={{ left: e.x - 30, top: e.y - 30 }}>
            <div className="explosion-ring" />
            <div className="explosion-particles">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`ap-particle ap-${i}`} />
              ))}
            </div>
          </div>
        ))}

        {/* 正确答案闪光 */}
        {feedback.type === 'correct' && <div className="correct-flash" />}

        {/* 玩家飞机 */}
        <div className="player-plane" style={{ left: playerX }}>
          <div className="plane-body">
            <div className="plane-cockpit" />
          </div>
          <div className="plane-engine" />
        </div>

        {/* 失去生命覆盖层 */}
        {gameState === 'lifeLost' && (
          <div className="life-lost-overlay">
            <div className="life-lost-card">
              <div className="round-result-icon">💥</div>
              <p>敌机突破防线！失去一条生命</p>
              <p>正确答案是：</p>
              <p className="round-answer">{currentWord?.meaning}</p>
              <button className="next-round-btn" onClick={nextRound}>
                {lives > 0 && round + 1 < totalRounds ? '继续战斗 →' : '查看结果'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 反馈信息 */}
      {feedback.text && gameState === 'playing' && (
        <div className={`game-feedback ${feedback.type}`}>
          {feedback.text}
          {streak >= 3 && <span className="streak-fire"> 🔥x{streak}</span>}
        </div>
      )}

      {/* 底部进度点 */}
      <div className="game-bottom-bar">
        <div className="round-progress">
          {[...Array(totalRounds)].map((_, i) => (
            <div
              key={i}
              className={`round-dot ${
                i < roundResults.length
                  ? roundResults[i] === 'correct'
                    ? 'done'
                    : 'wrong-dot'
                  : i === round
                    ? 'current'
                    : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirplaneGame;
