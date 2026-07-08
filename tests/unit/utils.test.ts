/**
 * eyeProtection 服务单元测试
 */

// Mock localStorage
const localStorageMock: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (key: string) => localStorageMock[key] || null,
  setItem: (key: string, value: string) => { localStorageMock[key] = value; },
  removeItem: (key: string) => { delete localStorageMock[key]; },
};
// Mock window/document（蓝光滤镜测试需要完整 DOM mock）
const mockOverlayStyle: Record<string, string> = {};
const mockOverlay = {
  style: new Proxy(mockOverlayStyle, {
    set(target, prop, value) { target[prop as string] = value; return true; },
    get(target, prop) { return target[prop as string] || ''; },
  }),
};
const mockGetElementById = jest.fn().mockReturnValue(null);
const mockCreateElement = jest.fn().mockReturnValue(mockOverlay);
const mockAppendChild = jest.fn();
(global as any).window = {};
(global as any).document = {
  documentElement: { style: { setProperty: jest.fn() } },
  getElementById: mockGetElementById,
  createElement: mockCreateElement,
  body: { appendChild: mockAppendChild },
};

import {
  getSettings,
  saveSettings,
  checkNeedBreak,
  getCurrentSessionDuration,
  getTodayTotalDuration,
  recordBreak,
  startSession,
  formatDuration,
  applyBlueLightFilter,
  removeBlueLightFilter,
  updateBlueLightFilter,
} from '../../src/services/eyeProtection';

const TODAY = new Date().toISOString().split('T')[0];

describe('eyeProtection', () => {
  beforeEach(() => {
    // 清空 localStorage
    for (const key in localStorageMock) delete localStorageMock[key];
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ==================== getSettings ====================
  describe('getSettings', () => {
    test('无保存数据时返回默认设置', () => {
      const settings = getSettings();
      expect(settings).toEqual({
        enabled: true,
        reminderInterval: 20,
        blueLightFilter: false,
        filterIntensity: 30,
      });
    });

    test('返回保存的设置并与默认值合并', () => {
      localStorageMock['eye-protection-settings'] = JSON.stringify({
        enabled: false,
        reminderInterval: 30,
      });
      const settings = getSettings();
      expect(settings.enabled).toBe(false);
      expect(settings.reminderInterval).toBe(30);
      expect(settings.blueLightFilter).toBe(false); // 默认值
      expect(settings.filterIntensity).toBe(30); // 默认值
    });

    test('处理损坏的 localStorage 数据', () => {
      localStorageMock['eye-protection-settings'] = 'invalid json{';
      const settings = getSettings();
      expect(settings).toEqual({
        enabled: true,
        reminderInterval: 20,
        blueLightFilter: false,
        filterIntensity: 30,
      });
    });

    test('完整设置能正确读取', () => {
      localStorageMock['eye-protection-settings'] = JSON.stringify({
        enabled: false,
        reminderInterval: 15,
        blueLightFilter: true,
        filterIntensity: 80,
      });
      const settings = getSettings();
      expect(settings.enabled).toBe(false);
      expect(settings.reminderInterval).toBe(15);
      expect(settings.blueLightFilter).toBe(true);
      expect(settings.filterIntensity).toBe(80);
    });
  });

  // ==================== saveSettings ====================
  describe('saveSettings', () => {
    test('将设置保存到 localStorage', () => {
      const settings = {
        enabled: false,
        reminderInterval: 15,
        blueLightFilter: true,
        filterIntensity: 50,
      };
      saveSettings(settings);
      expect(JSON.parse(localStorageMock['eye-protection-settings'])).toEqual(settings);
    });

    test('保存后可通过 getSettings 读取', () => {
      const settings = {
        enabled: false,
        reminderInterval: 10,
        blueLightFilter: true,
        filterIntensity: 70,
      };
      saveSettings(settings);
      const loaded = getSettings();
      expect(loaded.enabled).toBe(false);
      expect(loaded.reminderInterval).toBe(10);
      expect(loaded.blueLightFilter).toBe(true);
      expect(loaded.filterIntensity).toBe(70);
    });
  });

  // ==================== formatDuration ====================
  describe('formatDuration', () => {
    test('0秒', () => {
      expect(formatDuration(0)).toBe('0分0秒');
    });

    test('30秒', () => {
      expect(formatDuration(30)).toBe('0分30秒');
    });

    test('1分30秒', () => {
      expect(formatDuration(90)).toBe('1分30秒');
    });

    test('59分59秒', () => {
      expect(formatDuration(3599)).toBe('59分59秒');
    });

    test('1小时0分', () => {
      expect(formatDuration(3600)).toBe('1小时0分');
    });

    test('2小时30分', () => {
      expect(formatDuration(9000)).toBe('2小时30分');
    });

    test('1小时5分', () => {
      expect(formatDuration(3900)).toBe('1小时5分');
    });
  });

  // ==================== startSession ====================
  describe('startSession', () => {
    test('创建会话数据并设置 startTime', () => {
      jest.spyOn(Date, 'now').mockReturnValue(1000000);
      startSession();
      const data = JSON.parse(localStorageMock['eye-protection-session']);
      expect(data.startTime).toBe(1000000);
      expect(data.lastDate).toBe(TODAY);
    });

    test('多次调用会更新 startTime', () => {
      jest.spyOn(Date, 'now').mockReturnValue(1000000);
      startSession();
      jest.spyOn(Date, 'now').mockReturnValue(2000000);
      startSession();
      const data = JSON.parse(localStorageMock['eye-protection-session']);
      expect(data.startTime).toBe(2000000);
    });
  });

  // ==================== getCurrentSessionDuration ====================
  describe('getCurrentSessionDuration', () => {
    test('刚开始的会话返回 0 秒', () => {
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 0,
        lastDate: TODAY,
        breakCount: 0,
      });
      jest.spyOn(Date, 'now').mockReturnValue(1000000);
      expect(getCurrentSessionDuration()).toBe(0);
    });

    test('返回已过去的秒数', () => {
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 0,
        lastDate: TODAY,
        breakCount: 0,
      });
      jest.spyOn(Date, 'now').mockReturnValue(1060000); // 60秒后
      expect(getCurrentSessionDuration()).toBe(60);
    });

    test('无保存数据时基于 Date.now 计算', () => {
      // getSessionData 会创建默认数据 startTime=Date.now
      jest.spyOn(Date, 'now').mockReturnValue(5000000);
      const duration = getCurrentSessionDuration();
      expect(duration).toBe(0); // Date.now() - Date.now() = 0
    });
  });

  // ==================== getTodayTotalDuration ====================
  describe('getTodayTotalDuration', () => {
    test('包含累计时长加当前会话时长', () => {
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 300,
        lastDate: TODAY,
        breakCount: 1,
      });
      jest.spyOn(Date, 'now').mockReturnValue(1060000); // 60秒后
      expect(getTodayTotalDuration()).toBe(360); // 300 + 60
    });

    test('无累计时长时只返回当前会话', () => {
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 0,
        lastDate: TODAY,
        breakCount: 0,
      });
      jest.spyOn(Date, 'now').mockReturnValue(1120000); // 120秒后
      expect(getTodayTotalDuration()).toBe(120);
    });
  });

  // ==================== recordBreak ====================
  describe('recordBreak', () => {
    test('累计当前会话时长并重置会话', () => {
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 0,
        lastDate: TODAY,
        breakCount: 0,
      });
      jest.spyOn(Date, 'now').mockReturnValue(1060000); // 60秒后
      recordBreak();
      const data = JSON.parse(localStorageMock['eye-protection-session']);
      expect(data.totalToday).toBe(60);
      expect(data.breakCount).toBe(1);
      expect(data.startTime).toBe(1060000); // 重置为当前时间
    });

    test('多次休息累加时长和次数', () => {
      // 第一次休息
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 0,
        lastDate: TODAY,
        breakCount: 0,
      });
      jest.spyOn(Date, 'now').mockReturnValue(1060000);
      recordBreak();

      // 模拟第二次会话 60秒后再次休息
      jest.spyOn(Date, 'now').mockReturnValue(1120000);
      recordBreak();

      const data = JSON.parse(localStorageMock['eye-protection-session']);
      expect(data.totalToday).toBe(120); // 60 + 60
      expect(data.breakCount).toBe(2);
      expect(data.startTime).toBe(1120000);
    });
  });

  // ==================== checkNeedBreak ====================
  describe('checkNeedBreak', () => {
    test('护眼提醒关闭时返回 needBreak=false', () => {
      localStorageMock['eye-protection-settings'] = JSON.stringify({
        enabled: false,
        reminderInterval: 20,
        blueLightFilter: false,
        filterIntensity: 30,
      });
      const result = checkNeedBreak();
      expect(result.needBreak).toBe(false);
      expect(result.interval).toBe(20);
    });

    test('时间未到时返回 needBreak=false', () => {
      localStorageMock['eye-protection-settings'] = JSON.stringify({
        enabled: true,
        reminderInterval: 20,
        blueLightFilter: false,
        filterIntensity: 30,
      });
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 0,
        lastDate: TODAY,
        breakCount: 0,
      });
      // 10分钟后
      jest.spyOn(Date, 'now').mockReturnValue(1000000 + 10 * 60 * 1000);
      const result = checkNeedBreak();
      expect(result.needBreak).toBe(false);
      expect(result.elapsed).toBe(600);
      expect(result.interval).toBe(20);
    });

    test('时间到达时返回 needBreak=true', () => {
      localStorageMock['eye-protection-settings'] = JSON.stringify({
        enabled: true,
        reminderInterval: 20,
        blueLightFilter: false,
        filterIntensity: 30,
      });
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 0,
        lastDate: TODAY,
        breakCount: 0,
      });
      // 20分钟后
      jest.spyOn(Date, 'now').mockReturnValue(1000000 + 20 * 60 * 1000);
      const result = checkNeedBreak();
      expect(result.needBreak).toBe(true);
      expect(result.elapsed).toBe(1200);
    });

    test('超过间隔时间仍然返回 needBreak=true', () => {
      localStorageMock['eye-protection-settings'] = JSON.stringify({
        enabled: true,
        reminderInterval: 15,
        blueLightFilter: false,
        filterIntensity: 30,
      });
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 0,
        lastDate: TODAY,
        breakCount: 0,
      });
      // 30分钟后（超过15分钟间隔）
      jest.spyOn(Date, 'now').mockReturnValue(1000000 + 30 * 60 * 1000);
      const result = checkNeedBreak();
      expect(result.needBreak).toBe(true);
      expect(result.elapsed).toBe(1800);
      expect(result.interval).toBe(15);
    });
  });

  // ==================== 跨天重置 ====================
  describe('跨天重置', () => {
    test('昨天的会话数据会被重置，返回时长接近0', () => {
      // 设置昨天的会话数据
      localStorageMock['eye-protection-session'] = JSON.stringify({
        startTime: 1000000,
        totalToday: 9999,
        lastDate: '2020-01-01', // 非今天的日期
        breakCount: 5,
      });
      jest.spyOn(Date, 'now').mockReturnValue(5000000);
      // getSessionData 检测到跨天后返回新数据（startTime = Date.now()）
      // 但不会写回 localStorage
      const duration = getCurrentSessionDuration();
      expect(duration).toBe(0); // 新 startTime = Date.now() = 5000000
      // localStorage 中的数据保持不变（getSessionData 不写回）
      const data = JSON.parse(localStorageMock['eye-protection-session']);
      expect(data.totalToday).toBe(9999); // 原始数据未变
    });
  });

  // ==================== 蓝光滤镜 ====================
  describe('蓝光滤镜', () => {
    beforeEach(() => {
      mockGetElementById.mockReturnValue(null);
      mockCreateElement.mockClear();
      mockCreateElement.mockReturnValue(mockOverlay);
      mockAppendChild.mockClear();
      // 清空 overlay style
      for (const key in mockOverlayStyle) delete mockOverlayStyle[key];
    });

    test('applyBlueLightFilter 创建滤镜元素并设置样式', () => {
      applyBlueLightFilter(50);
      expect(mockCreateElement).toHaveBeenCalledWith('div');
      expect(mockAppendChild).toHaveBeenCalled();
      expect(mockOverlayStyle.backgroundColor).toContain('rgba(255, 165, 0,');
      expect(mockOverlayStyle.display).toBe('block');
    });

    test('applyBlueLightFilter 强度0 → 透明度最低', () => {
      applyBlueLightFilter(0);
      expect(mockOverlayStyle.backgroundColor).toBe('rgba(255, 165, 0, 0)');
    });

    test('applyBlueLightFilter 强度100 → 透明度最高', () => {
      applyBlueLightFilter(100);
      expect(mockOverlayStyle.backgroundColor).toBe('rgba(255, 165, 0, 0.3)');
    });

    test('applyBlueLightFilter 已存在元素时复用', () => {
      const existingElement = {
        style: {} as Record<string, string>,
      };
      mockGetElementById.mockReturnValue(existingElement);
      applyBlueLightFilter(50);
      // 不应该创建新元素
      expect(mockCreateElement).not.toHaveBeenCalled();
      expect(existingElement.style.backgroundColor).toContain('rgba(255, 165, 0,');
      expect(existingElement.style.display).toBe('block');
    });

    test('removeBlueLightFilter 隐藏滤镜元素', () => {
      const existingElement = {
        style: {} as Record<string, string>,
      };
      mockGetElementById.mockReturnValue(existingElement);
      removeBlueLightFilter();
      expect(existingElement.style.display).toBe('none');
    });

    test('removeBlueLightFilter 无元素时不抛错', () => {
      mockGetElementById.mockReturnValue(null);
      expect(() => removeBlueLightFilter()).not.toThrow();
    });

    test('updateBlueLightFilter 启用时应用滤镜', () => {
      localStorageMock['eye-protection-settings'] = JSON.stringify({
        enabled: true,
        reminderInterval: 20,
        blueLightFilter: true,
        filterIntensity: 60,
      });
      updateBlueLightFilter();
      expect(mockCreateElement).toHaveBeenCalled();
    });

    test('updateBlueLightFilter 关闭时移除滤镜', () => {
      localStorageMock['eye-protection-settings'] = JSON.stringify({
        enabled: true,
        reminderInterval: 20,
        blueLightFilter: false,
        filterIntensity: 30,
      });
      const existingElement = {
        style: {} as Record<string, string>,
      };
      mockGetElementById.mockReturnValue(existingElement);
      updateBlueLightFilter();
      expect(existingElement.style.display).toBe('none');
    });
  });
});
