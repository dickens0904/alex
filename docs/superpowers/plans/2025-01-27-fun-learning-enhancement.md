# 寓教于乐趣味性增强实施计划

> **For agentic workers:** 按任务逐步实施，每完成一个任务即可独立验证。

**Goal:** 通过音效、动画、鼓励语、成瘾机制等多媒体手段，将应用从"干巴巴的练习工具"升级为"让孩子上瘾的学习游戏"。

**Architecture:** 
- 新增 `src/services/soundEffects.ts` 音效服务（Web Audio API 合成音效，无需外部文件）
- 新增 `src/services/dailyStreak.ts` 连续学习追踪服务
- 新增 `src/components/Confetti.tsx` 庆祝动画组件
- 修改 `GrammarCardEnhanced.tsx` 增强鼓励语 + streak + 音效
- 修改 `PracticeEngine.tsx` 添加趣味反馈系统
- 修改 `PracticeResult.tsx` 增加星级评价 + 庆祝动画
- 修改 `achievement.ts` 增加短周期成就

**Tech Stack:** Web Audio API, CSS Animations, localStorage, React

---

## Task 1: 音效系统

**Files:**
- Create: `src/services/soundEffects.ts`

### Step 1: 创建音效服务

```typescript
/**
 * 音效服务 - 使用 Web Audio API 合成趣味音效
 * 无需外部音频文件，纯代码生成
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

// 播放音符
function playNote(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  
  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

/** 答对音效 - 欢快上升音 */
export function playCorrectSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // C5 -> E5 -> G5 上升琶音
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.08);
    gain.gain.setValueAtTime(0.25, now + i * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.2);
  });
}

/** 答错音效 - 温和下降音 */
export function playWrongSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // 两个低音，温和提示
  [330, 262].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + i * 0.12);
    gain.gain.setValueAtTime(0.15, now + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.12);
    osc.stop(now + i * 0.12 + 0.25);
  });
}

/** 连答音效 - 越来越兴奋 */
export function playStreakSound(streak: number) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // 根据连答数增加音高和速度
  const baseFreq = 440 + streak * 40;
  const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.06);
    gain.gain.setValueAtTime(0.2, now + i * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.15);
  });
}

/** 满分音效 - 胜利号角 */
export function playPerfectSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // C5 E5 G5 C6 胜利和弦
  const notes = [523.25, 659.25, 783.99, 1046.50];
  const times = [0, 0.15, 0.3, 0.5];
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + times[i]);
    gain.gain.setValueAtTime(0.25, now + times[i]);
    gain.gain.exponentialRampToValueAtTime(0.01, now + times[i] + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + times[i]);
    osc.stop(now + times[i] + 0.4);
  });
}

/** 成就解锁音效 - 闪亮登场 */
export function playAchievementSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // 快速上升琶音 + 长音
  [523, 659, 784, 1047, 1047].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = i < 3 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now + i * 0.07);
    gain.gain.setValueAtTime(0.2, now + i * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.07 + (i === 4 ? 0.5 : 0.12));
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.07);
    osc.stop(now + i * 0.07 + (i === 4 ? 0.5 : 0.12));
  });
}

/** 按钮点击音效 - 轻柔点击 */
export function playClickSound() {
  playNote(800, 0.05, 'sine', 0.1);
}

/** 星星弹出音效 */
export function playStarSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  [880, 1108, 1318].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.1);
    gain.gain.setValueAtTime(0.15, now + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 0.2);
  });
}
```

### Step 2: 验证文件创建

确认 `src/services/soundEffects.ts` 文件存在且语法正确。

---

## Task 2: 增强鼓励语系统

**Files:**
- Modify: `src/components/lesson/GrammarCardEnhanced.tsx`

### Step 1: 替换鼓励语常量

找到文件顶部的 `ENCOURAGEMENTS` 数组（约第10-19行），替换为：

```typescript
// 分层鼓励语系统 - 根据连答数和表现差异化
const ENCOURAGEMENTS = {
  // 普通答对
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
  // 连答3-4题
  streak3: [
    '🔥 连对3题！太棒了！',
    '🔥 3连对！你是小天才！',
    '🔥 连续答对3题！厉害！',
    '🔥 3连击！保持住！',
  ],
  // 连答5-9题
  streak5: [
    '⚡ 5连对！你是学霸！',
    '⚡ 连对5题！太厉害了！',
    '⚡ 5连击！无人能挡！',
    '⚡ 超级连胜！继续冲！',
  ],
  // 连答10题以上
  streak10: [
    '🌟 10连对！超级天才！',
    '🌟 完美连胜！你是王者！',
    '🌟 10连击！太疯狂了！',
    '🌟 无敌了！你是最强的！',
  ],
  // 答错时的温和鼓励
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
  if (!isCorrect) {
    return ENCOURAGEMENTS.wrong[Math.floor(Math.random() * ENCOURAGEMENTS.wrong.length)];
  }
  if (streak >= 10) {
    return ENCOURAGEMENTS.streak10[Math.floor(Math.random() * ENCOURAGEMENTS.streak10.length)];
  }
  if (streak >= 5) {
    return ENCOURAGEMENTS.streak5[Math.floor(Math.random() * ENCOURAGEMENTS.streak5.length)];
  }
  if (streak >= 3) {
    return ENCOURAGEMENTS.streak3[Math.floor(Math.random() * ENCOURAGEMENTS.streak3.length)];
  }
  return ENCOURAGEMENTS.normal[Math.floor(Math.random() * ENCOURAGEMENTS.normal.length)];
}
```

### Step 2: 更新答题逻辑中的鼓励语调用

找到 `handleChoiceAnswer` 函数（约第195行），修改鼓励语逻辑：

```typescript
const handleChoiceAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === (currentExc.answer ?? -1);
    const finalScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) {
      setScore(prev => prev + 1);
      setCompletedExercises(prev => new Set([...prev, currentExercise]));
      setStreak(prev => prev + 1);
      playCorrectSound(); // 添加音效
      const newStreak = streak + 1;
      setEncouragement(getRandomEncouragement(newStreak, true));
      if (newStreak >= 3 && newStreak % 3 === 0) {
        playStreakSound(newStreak); // 连答音效
      }
    } else {
      setStreak(0);
      playWrongSound(); // 添加音效
      setEncouragement(getRandomEncouragement(0, false));
    }
    if (currentExercise === grammar.exercises.length - 1 && onComplete) {
      setTimeout(() => onComplete(finalScore, grammar.exercises.length), 1000);
    }
  };
```

同样更新 `handleFillAnswer`、`handleOrderSubmit`、匹配题完成逻辑。

### Step 3: 更新错误反馈文案

找到显示错误结果的代码（约第728行），将"再接再厉！"改为更温和的表达：

```typescript
<h4>{isCorrectAnswer ? '回答正确！' : '加油！再想想！'}</h4>
```

### Step 4: 验证修改

确认文件语法正确，鼓励语系统工作正常。

---

## Task 3: Confetti 庆祝动画组件

**Files:**
- Create: `src/components/Confetti.tsx`
- Create: `src/components/Confetti.css`

### Step 1: 创建 Confetti 组件

```tsx
// src/components/Confetti.tsx
import React, { useEffect, useRef } from 'react';
import './Confetti.css';

interface ConfettiProps {
  active: boolean;
  duration?: number;
  onComplete?: () => void;
}

const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'];

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    // 创建50个纸屑粒子
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      particle.style.animationDelay = `${Math.random() * 0.5}s`;
      particle.style.animationDuration = `${1 + Math.random() * 2}s`;
      
      // 随机形状
      if (Math.random() > 0.5) {
        particle.style.borderRadius = '50%';
      } else {
        particle.style.width = '8px';
        particle.style.height = '12px';
      }
      
      container.appendChild(particle);
    }

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [active, duration, onComplete]);

  if (!active) return null;

  return <div ref={containerRef} className="confetti-container" />;
};

export default Confetti;
```

### Step 2: 创建 Confetti CSS

```css
/* src/components/Confetti.css */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10000;
  overflow: hidden;
}

.confetti-particle {
  position: absolute;
  top: -10px;
  width: 10px;
  height: 10px;
  opacity: 0;
  animation: confetti-fall linear forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg) scale(0.5);
    opacity: 0;
  }
}
```

### Step 3: 验证组件

确认组件可以正常渲染和触发动画。

---

## Task 4: Daily Streak 连续学习机制

**Files:**
- Create: `src/services/dailyStreak.ts`

### Step 1: 创建连续学习服务

```typescript
/**
 * 连续学习天数追踪服务
 * 使用 localStorage 记录每日学习状态
 */

const STORAGE_KEY = 'daily-streak';
const LAST_STUDY_KEY = 'last-study-date';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  totalStudyDays: number;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

/** 获取当前连续学习数据 */
export function getStreakData(): StreakData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastStudyDate: '', totalStudyDays: 0 };
}

function saveStreakData(data: StreakData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** 记录今日学习 - 每次完成练习时调用 */
export function recordStudy(): { isNewDay: boolean; streak: number; isNewRecord: boolean } {
  const data = getStreakData();
  const today = getToday();
  
  // 今天已经记录过
  if (data.lastStudyDate === today) {
    return { isNewDay: false, streak: data.currentStreak, isNewRecord: false };
  }
  
  let isNewRecord = false;
  
  // 昨天有学习 -> 连续天数+1
  if (data.lastStudyDate === getYesterday()) {
    data.currentStreak += 1;
  } else {
    // 断签了，重新开始
    data.currentStreak = 1;
  }
  
  // 更新最长记录
  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
    isNewRecord = true;
  }
  
  data.lastStudyDate = today;
  data.totalStudyDays += 1;
  
  saveStreakData(data);
  
  return { isNewDay: true, streak: data.currentStreak, isNewRecord };
}

/** 获取连续学习等级描述 */
export function getStreakLevel(streak: number): { emoji: string; title: string; color: string } {
  if (streak >= 30) return { emoji: '👑', title: '学习王者', color: '#ffd700' };
  if (streak >= 14) return { emoji: '🏆', title: '学习大师', color: '#ff6b6b' };
  if (streak >= 7) return { emoji: '⭐', title: '学习之星', color: '#4ecdc4' };
  if (streak >= 3) return { emoji: '🔥', title: '学习达人', color: '#ff9f43' };
  return { emoji: '💪', title: '加油', color: '#6c5ce7' };
}

/** 检查是否今天已经学习 */
export function hasStudiedToday(): boolean {
  const data = getStreakData();
  return data.lastStudyDate === getToday();
}
```

### Step 2: 验证服务

确认服务可以正常读写 localStorage。

---

## Task 5: 增强 PracticeEngine 趣味反馈

**Files:**
- Modify: `src/components/practice/PracticeEngine.tsx`

### Step 1: 添加导入和状态

在文件顶部添加导入：

```typescript
import { playCorrectSound, playWrongSound, playStreakSound, playPerfectSound } from '../../services/soundEffects';
```

在组件内部添加状态：

```typescript
const [streak, setStreak] = useState(0);
const [encouragement, setEncouragement] = useState('');
const [showEncouragement, setShowEncouragement] = useState(false);
```

### Step 2: 修改答题提交逻辑

修改 `handleSubmitAnswer` 函数：

```typescript
const handleSubmitAnswer = useCallback(() => {
    const exercise = exercises[currentIndex];
    let correct = false;

    if (practiceType === 'spelling') {
      correct = userAnswer.toLowerCase().trim() === exercise.answer.toLowerCase();
    } else {
      correct = userAnswer === exercise.answer;
    }

    setIsCorrect(correct);
    if (correct) {
      updateScore(exercise.score);
      setStreak(prev => prev + 1);
      playCorrectSound();
      
      const newStreak = streak + 1;
      if (newStreak >= 3) {
        playStreakSound(newStreak);
      }
      setEncouragement(getEncouragement(newStreak, true));
    } else {
      setStreak(0);
      playWrongSound();
      setEncouragement(getEncouragement(0, false));
    }
    
    setShowEncouragement(true);
    updateTotalScore(exercise.score);
    setShowResult(true);
  }, [currentIndex, exercises, practiceType, userAnswer, streak]);
```

### Step 3: 添加鼓励语函数

```typescript
function getEncouragement(streak: number, isCorrect: boolean): string {
  if (!isCorrect) {
    const wrong = ['没关系，再试试！', '差一点点！', '加油，你可以的！', '别灰心！'];
    return wrong[Math.floor(Math.random() * wrong.length)];
  }
  if (streak >= 10) return '🌟 10连对！超级天才！';
  if (streak >= 5) return '⚡ 5连对！太厉害了！';
  if (streak >= 3) return '🔥 3连对！保持住！';
  const correct = ['太棒了！', '答对了！', '真聪明！', '非常好！', '厉害！'];
  return correct[Math.floor(Math.random() * correct.length)];
}
```

### Step 4: 在结果区域显示鼓励语

找到结果显示区域，添加鼓励语展示：

```typescript
{showResult && (
  <div className={`result-card ${isCorrect ? 'correct' : 'wrong'}`}>
    <div className="result-icon">{isCorrect ? '🎉' : '😊'}</div>
    <div className="result-text">
      <p>{isCorrect ? '回答正确！' : '再想想看！'}</p>
      {showEncouragement && (
        <p className="encouragement-text">{encouragement}</p>
      )}
    </div>
    {streak >= 3 && (
      <div className="streak-badge">
        🔥 连对{streak}题！
      </div>
    )}
  </div>
)}
```

### Step 5: 添加 CSS 样式

在 `PracticeEngine.css` 中添加：

```css
.encouragement-text {
  font-size: 18px;
  font-weight: 600;
  color: #ff6b6b;
  margin-top: 8px;
  animation: encourage-bounce 0.5s ease;
}

.streak-badge {
  background: linear-gradient(135deg, #ff6b6b, #ff9f43);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  margin-top: 12px;
  animation: streak-pulse 0.5s ease infinite alternate;
}

@keyframes encourage-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes streak-pulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
```

---

## Task 6: 增强 PracticeResult 结果页

**Files:**
- Modify: `src/components/practice/PracticeResult.tsx`

### Step 1: 完全重写结果页

```tsx
import React, { useState, useEffect } from 'react';
import { playPerfectSound, playStarSound } from '../../services/soundEffects';
import Confetti from '../Confetti';

interface PracticeResultProps {
  score: number;
  totalScore: number;
  onRetry: () => void;
  onBack: () => void;
}

const PracticeResult: React.FC<PracticeResultProps> = ({
  score,
  totalScore,
  onRetry,
  onBack,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [starsVisible, setStarsVisible] = useState(0);
  const percentage = totalScore > 0 ? score / totalScore : 0;
  
  const stars = percentage >= 1 ? 3 : percentage >= 0.8 ? 2 : percentage >= 0.6 ? 1 : 0;
  
  let emoji: string;
  let title: string;
  let message: string;
  let bgColor: string;

  if (percentage >= 0.9) {
    emoji = '🎉';
    title = '太棒了！';
    message = '你真是英语小天才！';
    bgColor = 'linear-gradient(135deg, #ffd700, #ff9f43)';
    setShowConfetti(true);
    playPerfectSound();
  } else if (percentage >= 0.7) {
    emoji = '🌟';
    title = '表现优秀！';
    message = '再加把劲就能满分啦！';
    bgColor = 'linear-gradient(135deg, #667eea, #764ba2)';
  } else if (percentage >= 0.5) {
    emoji = '👍';
    title = '不错不错！';
    message = '多练习就能更厉害！';
    bgColor = 'linear-gradient(135deg, #4ecdc4, #45b7d1)';
  } else {
    emoji = '💪';
    title = '继续加油！';
    message = '多练几次一定能学会的！';
    bgColor = 'linear-gradient(135deg, #a8e6cf, #dcedc1)';
  }

  // 星星逐个弹出动画
  useEffect(() => {
    if (stars > 0) {
      const timers = [];
      for (let i = 1; i <= stars; i++) {
        timers.push(setTimeout(() => {
          setStarsVisible(i);
          playStarSound();
        }, 500 + i * 400));
      }
      return () => timers.forEach(clearTimeout);
    }
  }, [stars]);

  return (
    <div className="practice-result" style={{ background: bgColor }}>
      <Confetti active={showConfetti} duration={3000} onComplete={() => setShowConfetti(false)} />
      
      <div className="result-emoji bounce">{emoji}</div>
      <h2 className="result-title">{title}</h2>
      
      {/* 星星评价 */}
      <div className="result-stars">
        {[1, 2, 3].map(i => (
          <span 
            key={i} 
            className={`star ${i <= starsVisible ? 'star-visible' : 'star-hidden'}`}
          >
            ⭐
          </span>
        ))}
      </div>
      
      <div className="result-score">
        <span className="score-value">{score}</span>
        <span className="score-divider">/</span>
        <span className="score-total">{totalScore}</span>
      </div>
      
      <p className="result-message">{message}</p>
      
      <div className="result-actions">
        <button className="retry-btn" onClick={onRetry}>
          🔄 再来一次
        </button>
        <button className="back-btn" onClick={onBack}>
          📚 返回菜单
        </button>
      </div>
    </div>
  );
};

export default PracticeResult;
```

### Step 2: 添加结果页 CSS

```css
/* PracticeResult.css */
.practice-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
  color: white;
}

.result-emoji {
  font-size: 80px;
  margin-bottom: 20px;
}

.result-emoji.bounce {
  animation: result-bounce 1s ease infinite;
}

@keyframes result-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.result-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
}

.result-stars {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.star {
  font-size: 48px;
  transition: all 0.3s ease;
}

.star-hidden {
  opacity: 0;
  transform: scale(0);
}

.star-visible {
  opacity: 1;
  transform: scale(1);
  animation: star-pop 0.5s ease;
}

@keyframes star-pop {
  0% { transform: scale(0) rotate(-180deg); }
  50% { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.result-score {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.score-value {
  font-size: 72px;
}

.score-divider {
  margin: 0 8px;
  opacity: 0.7;
}

.score-total {
  font-size: 36px;
  opacity: 0.8;
}

.result-message {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.result-actions {
  display: flex;
  gap: 16px;
}

.retry-btn, .back-btn {
  padding: 16px 32px;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn {
  background: white;
  color: #667eea;
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.retry-btn:hover, .back-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
```

---

## Task 7: 增加短周期成就

**Files:**
- Modify: `src/services/achievement.ts`

### Step 1: 添加日常成就定义

在 `ALL_ACHIEVEMENTS` 数组中添加：

```typescript
// 日常成就
{ type: 'daily_first', name: '今日首题', description: '今天第一次答题', icon: '🌅' },
{ type: 'daily_3_lessons', name: '今日三课', description: '今天完成3课练习', icon: '📖' },
{ type: 'daily_perfect', name: '今日满分', description: '今天获得一次满分', icon: '💯' },
{ type: 'streak_10', name: '十连击', description: '连续答对10题', icon: '🔥' },
{ type: 'streak_20', name: '二十连击', description: '连续答对20题', icon: '⚡' },
{ type: 'speed_demon', name: '闪电侠', description: '5分钟内完成一课', icon: '⚡' },
{ type: 'first_try', name: '一次通关', description: '第一次就满分通关', icon: '🎯' },
```

### Step 2: 添加短周期成就检测逻辑

在 `checkAchievements` 函数中添加：

```typescript
// 检查连答成就
if ((stats.currentStreak ?? 0) >= 10) {
  newAchievements.push(findAchievement('streak_10')!);
}
if ((stats.currentStreak ?? 0) >= 20) {
  newAchievements.push(findAchievement('streak_20')!);
}

// 检查今日首次
const today = new Date().toISOString().split('T')[0];
if (stats.todayFirst) {
  newAchievements.push(findAchievement('daily_first')!);
}

// 检查今日满分
if (stats.todayPerfect) {
  newAchievements.push(findAchievement('daily_perfect')!);
}
```

---

## Task 8: 集成到首页显示

**Files:**
- Modify: `src/pages/Home/index.tsx`

### Step 1: 添加连续学习显示

在首页添加连续学习天数展示：

```tsx
import { getStreakData, getStreakLevel } from '../../services/dailyStreak';

// 在组件内部
const streakData = getStreakData();
const streakLevel = getStreakLevel(streakData.currentStreak);

// 在统计区域添加
<div className="streak-card" style={{ borderColor: streakLevel.color }}>
  <span className="streak-emoji">{streakLevel.emoji}</span>
  <div className="streak-info">
    <span className="streak-count">{streakData.currentStreak}</span>
    <span className="streak-label">连续学习天数</span>
  </div>
  <span className="streak-title">{streakLevel.title}</span>
</div>
```

### Step 2: 添加样式

```css
.streak-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: white;
  border-radius: 16px;
  border-left: 4px solid;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.streak-emoji {
  font-size: 36px;
}

.streak-info {
  display: flex;
  flex-direction: column;
}

.streak-count {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.streak-label {
  font-size: 14px;
  color: #666;
}

.streak-title {
  font-size: 14px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 12px;
  background: #f0f0f0;
}
```

---

## 实施顺序建议

1. **Task 1: 音效系统** - 基础设施，其他任务依赖
2. **Task 2: 增强鼓励语** - 快速提升趣味性
3. **Task 3: Confetti 组件** - 视觉庆祝效果
4. **Task 4: Daily Streak** - 成瘾机制核心
5. **Task 5: PracticeEngine 增强** - 统一练习体验
6. **Task 6: PracticeResult 增强** - 结果页升级
7. **Task 7: 短周期成就** - 更多成就感
8. **Task 8: 首页集成** - 展示所有新功能

每个 Task 完成后都可以独立验证，不影响现有功能。
