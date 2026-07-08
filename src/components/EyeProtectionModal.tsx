import React, { useState, useEffect, useRef } from 'react';
import {
  checkNeedBreak,
  recordBreak,
  getCurrentSessionDuration,
  getTodayTotalDuration,
  formatDuration,
  getSettings,
  saveSettings,
  startSession,
  updateBlueLightFilter,
  type EyeProtectionSettings,
} from '../services/eyeProtection';
import { playLevelUpSound } from '../services/soundEffects';
import { logger } from '../utils/logger';
import './EyeProtectionModal.css';

const EYE_EXERCISES = [
  { emoji: '👀', text: '上下看', desc: '慢慢向上看，再慢慢向下看，重复5次' },
  { emoji: '👀', text: '左右看', desc: '慢慢向左看，再慢慢向右看，重复5次' },
  { emoji: '⭕', text: '转眼球', desc: '顺时针转3圈，再逆时针转3圈' },
  { emoji: '🤚', text: '搓手掌', desc: '快速搓热双手，轻轻捂住眼睛30秒' },
  { emoji: '🌳', text: '看远处', desc: '看看窗外远处的绿色植物或天空' },
  { emoji: '💧', text: '多眨眼', desc: '快速眨眼睛20次，让眼睛湿润一下' },
];

const BREAK_TIPS = [
  '站起来伸个懒腰吧！',
  '喝口水休息一下～',
  '去阳台看看远处的风景！',
  '和家人聊聊天吧！',
  '做几个深呼吸，放松一下～',
  '拍拍手，活动活动身体！',
];

interface EyeProtectionModalProps {
  onDismiss?: () => void;
}

const EyeProtectionModal: React.FC<EyeProtectionModalProps> = ({ onDismiss }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<EyeProtectionSettings>(getSettings());
  const [sessionDuration, setSessionDuration] = useState(0);
  const [todayDuration, setTodayDuration] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentTip, setCurrentTip] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isResting, setIsResting] = useState(false);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // 拖动状态
  const [trackerPos, setTrackerPos] = useState({ x: -1, y: 12 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });

  // 拖动事件处理
  const handleDragStart = (e: React.MouseEvent) => {
    // 点击设置按钮时不拖动
    if ((e.target as HTMLElement).closest('.eye-tracker-settings-btn')) return;
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: trackerPos.x < 0 ? window.innerWidth / 2 : trackerPos.x,
      posY: trackerPos.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;
      const newPosX = Math.max(0, Math.min(window.innerWidth - 200, dragStartRef.current.posX + dx));
      const newPosY = Math.max(0, Math.min(window.innerHeight - 60, dragStartRef.current.posY + dy));
      setTrackerPos({ x: newPosX, y: newPosY });
    };
    const handleUp = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging]);

  // 初始化
  useEffect(() => {
    startSession();
    updateBlueLightFilter();
    setCurrentTip(BREAK_TIPS[Math.floor(Math.random() * BREAK_TIPS.length)]);

    // 每30秒检查一次是否需要休息
    checkIntervalRef.current = setInterval(() => {
      setSessionDuration(getCurrentSessionDuration());
      setTodayDuration(getTodayTotalDuration());

      const { needBreak } = checkNeedBreak();
      if (needBreak && settings.enabled) {
        setShowModal(true);
        setIsResting(true);
        setCurrentExercise(0);
        setCountdown(30);
        setCurrentTip(BREAK_TIPS[Math.floor(Math.random() * BREAK_TIPS.length)]);
        playLevelUpSound();
      }
    }, 30000);

    // 初始更新时长
    setSessionDuration(getCurrentSessionDuration());
    setTodayDuration(getTodayTotalDuration());

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [settings.enabled]);

  // 倒计时
  useEffect(() => {
    if (isResting && showModal) {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isResting, showModal]);

  const handleDismiss = () => {
    recordBreak();
    logger.info(
      'EyeProtection',
      '休息完成',
      `今日总时长: ${formatDuration(getTodayTotalDuration())}`
    );
    setShowModal(false);
    setIsResting(false);
    setSessionDuration(0);
    setTodayDuration(getTodayTotalDuration());
    onDismiss?.();
  };

  const handleSkip = () => {
    setShowModal(false);
    setIsResting(false);
    onDismiss?.();
  };

  const handleNextExercise = () => {
    setCurrentExercise((prev) => (prev + 1) % EYE_EXERCISES.length);
  };

  const handleSaveSettings = (newSettings: EyeProtectionSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    updateBlueLightFilter();
  };

  const exercise = EYE_EXERCISES[currentExercise];

  return (
    <>
      {/* 学习时长指示器 - 始终显示，可拖动 */}
      {settings.enabled && (
        <div
          className={`eye-tracker ${isDragging ? 'dragging' : ''}`}
          style={
            trackerPos.x < 0
              ? undefined
              : { left: `${trackerPos.x}px`, top: `${trackerPos.y}px`, transform: 'none' }
          }
          onMouseDown={handleDragStart}
          title="可拖动到任意位置"
        >
          <div className="eye-tracker-icon">👁️</div>
          <div className="eye-tracker-info">
            <span className="eye-tracker-time">{formatDuration(sessionDuration)}</span>
            <div className="eye-tracker-bar">
              <div
                className="eye-tracker-fill"
                style={{
                  width: `${Math.min(100, (sessionDuration / (settings.reminderInterval * 60)) * 100)}%`,
                  backgroundColor:
                    sessionDuration > settings.reminderInterval * 60 * 0.8 ? '#ff6b6b' : '#4ecdc4',
                }}
              />
            </div>
          </div>
          <button
            className="eye-tracker-settings-btn"
            onClick={() => setShowSettings(true)}
            title="护眼设置"
          >
            ⚙️
          </button>
        </div>
      )}

      {/* 护眼休息弹窗 */}
      {showModal && (
        <div className="eye-modal-overlay">
          <div className="eye-modal">
            <div className="eye-modal-header">
              <span className="eye-modal-emoji">🌟</span>
              <h2>休息一下吧！</h2>
            </div>

            <div className="eye-modal-body">
              <div className="eye-tip">{currentTip}</div>

              <div className="eye-exercise-card">
                <div className="exercise-emoji">{exercise.emoji}</div>
                <div className="exercise-name">{exercise.text}</div>
                <div className="exercise-desc">{exercise.desc}</div>
                <button className="exercise-next-btn" onClick={handleNextExercise}>
                  换一个 →
                </button>
              </div>

              <div className="eye-countdown">
                <div className="countdown-ring">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={countdown > 10 ? '#4ecdc4' : '#ff6b6b'}
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - countdown / 30)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                  </svg>
                  <span className="countdown-text">{countdown}s</span>
                </div>
                <p className="countdown-hint">闭眼休息或看看远处</p>
              </div>

              <div className="eye-stats">
                <div className="eye-stat">
                  <span className="eye-stat-value">{formatDuration(todayDuration)}</span>
                  <span className="eye-stat-label">今日学习</span>
                </div>
                <div className="eye-stat">
                  <span className="eye-stat-value">{getSessionBreakCount()}</span>
                  <span className="eye-stat-label">今日休息</span>
                </div>
              </div>
            </div>

            <div className="eye-modal-footer">
              <button className="eye-btn eye-btn-skip" onClick={handleSkip}>
                再学一会儿
              </button>
              <button className="eye-btn eye-btn-rest" onClick={handleDismiss}>
                {countdown === 0 ? '继续学习！' : '休息好了！'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 护眼设置面板 */}
      {showSettings && (
        <div className="eye-settings-overlay" onClick={() => setShowSettings(false)}>
          <div className="eye-settings-panel" onClick={(e) => e.stopPropagation()}>
            <div className="eye-settings-header">
              <h3>👁️ 护眼设置</h3>
              <button className="eye-settings-close" onClick={() => setShowSettings(false)}>
                ✕
              </button>
            </div>

            <div className="eye-settings-body">
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-name">护眼提醒</span>
                  <span className="setting-desc">定期提醒休息，保护眼睛</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.enabled}
                    onChange={(e) => handleSaveSettings({ ...settings, enabled: e.target.checked })}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-name">提醒间隔</span>
                  <span className="setting-desc">每 {settings.reminderInterval} 分钟提醒一次</span>
                </div>
                <select
                  className="setting-select"
                  value={settings.reminderInterval}
                  onChange={(e) =>
                    handleSaveSettings({ ...settings, reminderInterval: Number(e.target.value) })
                  }
                  disabled={!settings.enabled}
                >
                  <option value={10}>10分钟</option>
                  <option value={15}>15分钟</option>
                  <option value={20}>20分钟（推荐）</option>
                  <option value={30}>30分钟</option>
                  <option value={45}>45分钟</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-name">蓝光滤镜</span>
                  <span className="setting-desc">减少屏幕蓝光，缓解眼疲劳</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.blueLightFilter}
                    onChange={(e) =>
                      handleSaveSettings({ ...settings, blueLightFilter: e.target.checked })
                    }
                  />
                  <span className="toggle-slider" />
                </label>
              </div>

              {settings.blueLightFilter && (
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">滤镜强度</span>
                    <span className="setting-desc">{settings.filterIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={80}
                    value={settings.filterIntensity}
                    onChange={(e) =>
                      handleSaveSettings({ ...settings, filterIntensity: Number(e.target.value) })
                    }
                    className="setting-range"
                  />
                </div>
              )}

              <div className="eye-settings-tip">
                <p>
                  💡 <strong>20-20-20 护眼法则</strong>
                </p>
                <p>每学习20分钟，看20英尺（6米）远的地方，持续20秒。</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function getSessionBreakCount(): number {
  try {
    const saved = localStorage.getItem('eye-protection-session');
    if (saved) return JSON.parse(saved).breakCount || 0;
  } catch {}
  return 0;
}

export default EyeProtectionModal;
