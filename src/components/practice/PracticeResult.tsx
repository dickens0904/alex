import React, { useState, useEffect } from 'react';
import { playPerfectSound, playStarSound } from '../../services/soundEffects';
import { recordStudy } from '../../services/dailyStreak';
import { logger } from '../../utils/logger';
import Confetti from '../Confetti';

interface PracticeResultProps {
  score: number;
  totalScore: number;
  onRetry: () => void;
  onBack: () => void;
}

const PracticeResult: React.FC<PracticeResultProps> = ({ score, totalScore, onRetry, onBack }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [starsVisible, setStarsVisible] = useState(0);
  const percentage = totalScore > 0 ? score / totalScore : 0;

  const stars = percentage >= 1 ? 3 : percentage >= 0.8 ? 2 : percentage >= 0.5 ? 1 : 0;

  let emoji: string;
  let title: string;
  let message: string;
  let bgColor: string;

  if (percentage >= 0.9) {
    emoji = '🎉';
    title = '太棒了！';
    message = '你真是英语小天才！';
    bgColor = 'linear-gradient(135deg, #ffd700, #ff9f43)';
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

  // 记录学习 + 庆祝效果
  useEffect(() => {
    recordStudy();
    logger.info(
      'PracticeResult',
      '练习结果',
      `得分: ${score}/${totalScore} | 百分比: ${Math.round(percentage * 100)}% | 星星: ${stars}`
    );
    if (percentage >= 0.9) {
      setShowConfetti(true);
      playPerfectSound();
    }
  }, [percentage, score, stars, totalScore]);

  // 星星逐个弹出动画
  useEffect(() => {
    if (stars > 0) {
      const timers: NodeJS.Timeout[] = [];
      for (let i = 1; i <= stars; i++) {
        timers.push(
          setTimeout(
            () => {
              setStarsVisible(i);
              playStarSound();
            },
            600 + i * 400
          )
        );
      }
      return () => timers.forEach(clearTimeout);
    }
  }, [stars]);

  return (
    <div className="practice-result" style={{ background: bgColor }}>
      <Confetti active={showConfetti} duration={3500} onComplete={() => setShowConfetti(false)} />

      <div className="result-emoji bounce">{emoji}</div>
      <h2 className="result-title">{title}</h2>

      <div className="result-stars">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`star ${i <= starsVisible ? 'star-visible' : 'star-hidden'}`}>
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
