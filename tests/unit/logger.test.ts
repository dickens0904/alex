/**
 * logger 单元测试
 * 测试日志工具的纯逻辑功能
 */

// Mock window.electronAPI
(global as any).window = { electronAPI: { writeLogFile: jest.fn().mockResolvedValue({ success: true }) } };
// Mock console methods
jest.spyOn(console, 'log').mockImplementation();
jest.spyOn(console, 'error').mockImplementation();
jest.spyOn(console, 'warn').mockImplementation();

import { Logger, LogLevel } from '../../src/utils/logger';

describe('Logger', () => {
  let logger: InstanceType<typeof Logger>;

  beforeEach(() => {
    logger = new Logger();
    jest.clearAllMocks();
  });

  test('初始状态没有日志', () => {
    expect(logger.getLogs()).toHaveLength(0);
  });

  test('info 方法记录日志', () => {
    logger.info('Test', '测试动作', '测试详情');
    const logs = logger.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogLevel.INFO);
    expect(logs[0].module).toBe('Test');
    expect(logs[0].action).toBe('测试动作');
    expect(logs[0].details).toBe('测试详情');
  });

  test('warn 方法记录警告日志', () => {
    logger.warn('Test', '警告');
    const logs = logger.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogLevel.WARN);
  });

  test('error 方法记录错误日志', () => {
    logger.error('Test', '出错了', '错误详情');
    const logs = logger.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogLevel.ERROR);
  });

  test('success 方法记录成功日志', () => {
    logger.success('Test', '成功');
    const logs = logger.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogLevel.SUCCESS);
  });

  test('getLogsByModule 按模块过滤', () => {
    logger.info('ModuleA', '动作1');
    logger.info('ModuleB', '动作2');
    logger.warn('ModuleA', '动作3');

    const moduleALogs = logger.getLogsByModule('ModuleA');
    expect(moduleALogs).toHaveLength(2);
    expect(moduleALogs.every(l => l.module === 'ModuleA')).toBe(true);
  });

  test('clear 清空日志', () => {
    logger.info('Test', '动作');
    logger.warn('Test', '动作');
    expect(logger.getLogs()).toHaveLength(2);

    logger.clear();
    expect(logger.getLogs()).toHaveLength(0);
  });

  test('dump 导出日志字符串', () => {
    logger.info('Test', '动作', '详情');
    const dump = logger.dump();
    expect(dump).toContain('[INFO]');
    expect(dump).toContain('[Test]');
    expect(dump).toContain('动作');
    expect(dump).toContain('详情');
  });

  test('日志超过 maxLogs 自动裁剪', () => {
    // 创建一个 maxLogs=3 的 logger
    const smallLogger = new Logger();
    (smallLogger as any).maxLogs = 3;

    smallLogger.info('A', '1');
    smallLogger.info('B', '2');
    smallLogger.info('C', '3');
    smallLogger.info('D', '4'); // 应该淘汰 A

    const logs = smallLogger.getLogs();
    expect(logs).toHaveLength(3);
    expect(logs[0].module).toBe('B');
    expect(logs[2].module).toBe('D');
  });

  test('时间戳格式正确', () => {
    logger.info('Test', '动作');
    const log = logger.getLogs()[0];
    // 格式: HH:MM:SS.mmm
    expect(log.timestamp).toMatch(/^\d{2}:\d{2}:\d{2}\.\d{3}$/);
  });
});
