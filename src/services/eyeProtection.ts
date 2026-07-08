/**
 * 护眼服务
 * - 连续学习时长追踪
 * - 定时休息提醒（20-20-20法则：每20分钟提醒一次）
 * - 蓝光滤镜
 * - 学习时长统计
 */

const STORAGE_KEY = 'eye-protection-settings';
const SESSION_KEY = 'eye-protection-session';

export interface EyeProtectionSettings {
  enabled: boolean; // 是否启用护眼提醒
  reminderInterval: number; // 提醒间隔（分钟），默认20
  blueLightFilter: boolean; // 是否启用蓝光滤镜
  filterIntensity: number; // 滤镜强度 0-100
}

export interface SessionData {
  startTime: number; // 本次学习开始时间
  totalToday: number; // 今日累计学习时长（秒）
  lastDate: string; // 上次记录日期
  breakCount: number; // 今日休息次数
}

// ==================== 设置管理 ====================

const DEFAULT_SETTINGS: EyeProtectionSettings = {
  enabled: true,
  reminderInterval: 20,
  blueLightFilter: false,
  filterIntensity: 30,
};

export function getSettings(): EyeProtectionSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {}
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings: EyeProtectionSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// ==================== 学习时长追踪 ====================

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getSessionData(): SessionData {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const data: SessionData = JSON.parse(saved);
      // 跨天重置
      if (data.lastDate !== getToday()) {
        return { startTime: Date.now(), totalToday: 0, lastDate: getToday(), breakCount: 0 };
      }
      return data;
    }
  } catch {}
  return { startTime: Date.now(), totalToday: 0, lastDate: getToday(), breakCount: 0 };
}

function saveSessionData(data: SessionData): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

/** 开始学习会话 */
export function startSession(): void {
  const data = getSessionData();
  data.startTime = Date.now();
  saveSessionData(data);
}

/** 获取本次连续学习时长（秒） */
export function getCurrentSessionDuration(): number {
  const data = getSessionData();
  return Math.floor((Date.now() - data.startTime) / 1000);
}

/** 获取今日累计学习时长（秒） */
export function getTodayTotalDuration(): number {
  const data = getSessionData();
  const currentSession = Math.floor((Date.now() - data.startTime) / 1000);
  return data.totalToday + currentSession;
}

/** 记录休息 */
export function recordBreak(): void {
  const data = getSessionData();
  // 把当前会话时长累计到今日总时长
  const sessionDuration = Math.floor((Date.now() - data.startTime) / 1000);
  data.totalToday += sessionDuration;
  data.breakCount += 1;
  data.startTime = Date.now(); // 重置会话开始时间
  saveSessionData(data);
}

/** 格式化时长 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) return `${mins}分${secs}秒`;
  const hours = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hours}小时${remainMins}分`;
}

/** 检查是否需要休息提醒 */
export function checkNeedBreak(): { needBreak: boolean; elapsed: number; interval: number } {
  const settings = getSettings();
  if (!settings.enabled)
    return { needBreak: false, elapsed: 0, interval: settings.reminderInterval };

  const elapsed = getCurrentSessionDuration();
  const intervalSeconds = settings.reminderInterval * 60;

  return {
    needBreak: elapsed >= intervalSeconds,
    elapsed,
    interval: settings.reminderInterval,
  };
}

// ==================== 蓝光滤镜 ====================

/** 应用蓝光滤镜 */
export function applyBlueLightFilter(intensity: number): void {
  let overlay = document.getElementById('blue-light-filter');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'blue-light-filter';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 99998;
      transition: opacity 0.5s ease;
    `;
    document.body.appendChild(overlay);
  }
  const opacity = (intensity / 100) * 0.3;
  overlay.style.backgroundColor = `rgba(255, 165, 0, ${opacity})`;
  overlay.style.display = 'block';
}

/** 移除蓝光滤镜 */
export function removeBlueLightFilter(): void {
  const overlay = document.getElementById('blue-light-filter');
  if (overlay) overlay.style.display = 'none';
}

/** 根据设置更新蓝光滤镜 */
export function updateBlueLightFilter(): void {
  const settings = getSettings();
  if (settings.blueLightFilter) {
    applyBlueLightFilter(settings.filterIntensity);
  } else {
    removeBlueLightFilter();
  }
}
