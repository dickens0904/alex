/**
 * 应用日志工具
 * 用于记录关键功能执行状态，便于测试验证
 */

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  action: string;
  details?: string;
}

export class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  private formatTime(): string {
    const now = new Date();
    return (
      now.toLocaleTimeString('zh-CN', { hour12: false }) +
      '.' +
      String(now.getMilliseconds()).padStart(3, '0')
    );
  }

  log(level: LogLevel, module: string, action: string, details?: string): void {
    const entry: LogEntry = {
      timestamp: this.formatTime(),
      level,
      module,
      action,
      details,
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // 控制台输出
    const prefix = `[${entry.timestamp}][${level}][${module}]`;
    const message = details ? `${action} - ${details}` : action;

    switch (level) {
      case LogLevel.ERROR:
        console.error(`${prefix} ${message}`);
        break;
      case LogLevel.WARN:
        console.warn(`${prefix} ${message}`);
        break;
      case LogLevel.SUCCESS:
        console.log(`%c${prefix} ${message}`, 'color: #4CAF50; font-weight: bold');
        break;
      default:
        console.log(`${prefix} ${message}`);
    }

    // 实时写入日志文件
    const logLine = `${prefix} ${message}`;
    window.electronAPI?.writeLogFile?.(logLine).catch?.(() => {});
  }

  info(module: string, action: string, details?: string): void {
    this.log(LogLevel.INFO, module, action, details);
  }

  warn(module: string, action: string, details?: string): void {
    this.log(LogLevel.WARN, module, action, details);
  }

  error(module: string, action: string, details?: string): void {
    this.log(LogLevel.ERROR, module, action, details);
  }

  success(module: string, action: string, details?: string): void {
    this.log(LogLevel.SUCCESS, module, action, details);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getLogsByModule(module: string): LogEntry[] {
    return this.logs.filter((log) => log.module === module);
  }

  clear(): void {
    this.logs = [];
  }

  dump(): string {
    return this.logs
      .map(
        (log) =>
          `[${log.timestamp}][${log.level}][${log.module}] ${log.action}${log.details ? ' - ' + log.details : ''}`
      )
      .join('\n');
  }
}

// 单例导出
export const logger = new Logger();

// 便捷方法
export const logInfo = (module: string, action: string, details?: string) =>
  logger.info(module, action, details);
export const logWarn = (module: string, action: string, details?: string) =>
  logger.warn(module, action, details);
export const logError = (module: string, action: string, details?: string) =>
  logger.error(module, action, details);
export const logSuccess = (module: string, action: string, details?: string) =>
  logger.success(module, action, details);
