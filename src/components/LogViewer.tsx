import React, { useState, useEffect, useRef } from 'react';
import { logger, LogLevel } from '../utils/logger';

interface LogViewerProps {
  maxLogs?: number;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const LogViewer: React.FC<LogViewerProps> = ({ maxLogs = 50, position = 'bottom-right' }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [_isVisible, _setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 定期更新日志
    updateIntervalRef.current = setInterval(() => {
      const allLogs = logger.getLogs();
      const recentLogs = allLogs.slice(-maxLogs);
      setLogs(
        recentLogs.map(
          (log) =>
            `[${log.timestamp}][${log.level}][${log.module}] ${log.action}${log.details ? ' - ' + log.details : ''}`
        )
      );
    }, 500);

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [maxLogs]);

  useEffect(() => {
    // 自动滚动到底部
    if (logContainerRef.current && isExpanded) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isExpanded]);

  const getLogLevelColor = (level: LogLevel) => {
    switch (level) {
      case LogLevel.ERROR:
        return '#ff4444';
      case LogLevel.WARN:
        return '#ffaa00';
      case LogLevel.SUCCESS:
        return '#44ff44';
      default:
        return '#ffffff';
    }
  };

  const positionStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    ...(position.includes('bottom') ? { bottom: '10px' } : { top: '10px' }),
    ...(position.includes('right') ? { right: '10px' } : { left: '10px' }),
  };

  const buttonStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#333',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  };

  const containerStyle: React.CSSProperties = {
    width: isExpanded ? '400px' : '0px',
    height: isExpanded ? '300px' : '0px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    marginTop: isExpanded ? '10px' : '0px',
  };

  const logStyle: React.CSSProperties = {
    padding: '10px',
    height: '100%',
    overflowY: 'auto',
    fontFamily: 'monospace',
    fontSize: '11px',
    lineHeight: '1.4',
  };

  return (
    <div style={positionStyle}>
      <button style={buttonStyle} onClick={() => setIsExpanded(!isExpanded)} title="查看日志">
        📋
      </button>

      {isExpanded && (
        <div style={containerStyle}>
          <div style={logStyle} ref={logContainerRef}>
            {logs.length === 0 ? (
              <div style={{ color: '#888', textAlign: 'center', padding: '20px' }}>暂无日志</div>
            ) : (
              logs.map((log, index) => {
                const levelMatch = log.match(/\[(INFO|WARN|ERROR|SUCCESS)\]/);
                const level = levelMatch ? (levelMatch[1] as LogLevel) : LogLevel.INFO;

                return (
                  <div
                    key={index}
                    style={{
                      color: getLogLevelColor(level),
                      marginBottom: '2px',
                      wordBreak: 'break-all',
                    }}
                  >
                    {log}
                  </div>
                );
              })
            )}
          </div>

          <div
            style={{
              padding: '5px 10px',
              backgroundColor: '#222',
              borderTop: '1px solid #444',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                fontSize: '11px',
              }}
              onClick={() => logger.clear()}
            >
              清除日志
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                fontSize: '11px',
              }}
              onClick={() => {
                const logText = logger.dump();
                navigator.clipboard.writeText(logText);
                alert('日志已复制到剪贴板');
              }}
            >
              复制日志
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogViewer;
