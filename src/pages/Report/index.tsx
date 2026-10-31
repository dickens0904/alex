import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Report.css';
import { logger } from '../../utils/logger';
import { SKILL_FALLBACK, SKILL_LABELS, formatDuration } from '../../types/skillMeta';

const MODULE = 'Report';

const Report: React.FC = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState<PracticeReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState<'pdf' | 'png' | null>(null);
  const [exportMsg, setExportMsg] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await window.electronAPI?.getPracticeReport?.();
        setReport(data ?? null);
      } catch (e) {
        logger.warn(MODULE, '报告加载失败', String(e));
        setReport(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleExport = async (format: 'pdf' | 'png') => {
    if (exporting) return;
    setExporting(format);
    setExportMsg(null);
    try {
      const res = await window.electronAPI?.exportReport?.(format);
      if (!res) {
        setExportMsg('当前环境不支持导出');
      } else if (res.success && res.path) {
        setExportMsg(`已保存：${res.path}`);
      } else if (res.canceled) {
        // 用户取消，不打扰
      } else {
        setExportMsg(res.error ?? '导出失败，请重试');
      }
    } catch (e) {
      logger.warn(MODULE, '导出报告失败', String(e));
      setExportMsg('导出失败，请重试');
    } finally {
      setExporting(null);
    }
  };

  const overview = report?.overview;
  const accuracy =
    overview && overview.totalCount > 0
      ? Math.round((overview.correct / overview.totalCount) * 100)
      : 0;
  const arrowRate =
    overview && overview.totalScore > 0
      ? Math.round((overview.score / overview.totalScore) * 100)
      : 0;

  const skills = [...(report?.skills ?? [])].sort((a, b) => a.accuracy - b.accuracy);
  const weak = skills.filter((s) => s.totalCount >= 3).slice(0, 3);
  const maxSessions = Math.max(1, ...(report?.days ?? []).map((d) => d.sessions));

  if (loading) {
    return (
      <div className="report-container">
        <div className="report-loading">📊 报告生成中…</div>
      </div>
    );
  }

  return (
    <div className="report-container">
      <div className="report-header">
        <button className="report-back" onClick={() => navigate(-1)} title="返回">
          ←
        </button>
        <h1 className="report-title">学习报告</h1>
        <div className="report-header-right">
          <button
            className="report-export-btn"
            disabled={exporting !== null}
            onClick={() => handleExport('pdf')}
          >
            {exporting === 'pdf' ? '导出中…' : '📄 导出 PDF'}
          </button>
          <button
            className="report-export-btn"
            disabled={exporting !== null}
            onClick={() => handleExport('png')}
          >
            {exporting === 'png' ? '导出中…' : '🖼 导出图片'}
          </button>
        </div>
      </div>

      {exportMsg && <div className="report-export-msg">{exportMsg}</div>}

      {!overview || overview.sessions === 0 ? (
        <div className="report-empty">
          <div className="report-empty-icon">📭</div>
          <p>还没有练习记录</p>
          <p className="report-empty-tip">完成一次练习后，这里会显示学习报告</p>
          <button className="report-empty-btn" onClick={() => navigate('/lessons')}>
            去练习
          </button>
        </div>
      ) : (
        <>
          <div className="report-cards">
            <div className="report-card">
              <div className="report-card-value">{overview.sessions}</div>
              <div className="report-card-label">练习次数</div>
            </div>
            <div className="report-card">
              <div className="report-card-value">{accuracy}%</div>
              <div className="report-card-label">正确率</div>
            </div>
            <div className="report-card">
              <div className="report-card-value">{arrowRate}%</div>
              <div className="report-card-label">得分率</div>
            </div>
            <div className="report-card">
              <div className="report-card-value">{formatDuration(overview.timeSpent)}</div>
              <div className="report-card-label">练习时长</div>
            </div>
          </div>

          <section className="report-section">
            <h2 className="report-section-title">各项能力正确率</h2>
            <div className="report-skills">
              {[...(report?.skills ?? [])]
                .sort((a, b) => b.accuracy - a.accuracy)
                .map((s) => {
                  const meta = SKILL_LABELS[s.type] ?? SKILL_FALLBACK;
                  return (
                    <div key={s.type} className="skill-row">
                      <span className="skill-name">
                        {meta.icon} {meta.name}
                      </span>
                      <div className="skill-bar-bg">
                        <div
                          className={`skill-bar-fill ${
                            s.accuracy >= 80 ? 'good' : s.accuracy >= 60 ? 'mid' : 'low'
                          }`}
                          style={{ width: `${s.accuracy}%` }}
                        />
                      </div>
                      <span className="skill-value">{s.accuracy}%</span>
                    </div>
                  );
                })}
            </div>
          </section>

          {weak.length > 0 && (
            <section className="report-section">
              <h2 className="report-section-title">需要加强</h2>
              <div className="report-weak-list">
                {weak.map((s, idx) => {
                  const meta = SKILL_LABELS[s.type] ?? SKILL_FALLBACK;
                  return (
                    <div key={s.type} className="weak-item">
                      <div className="weak-head">
                        <span className="weak-rank">{idx + 1}</span>
                        <span className="weak-name">
                          {meta.icon} {meta.name}
                        </span>
                        <span className="weak-accuracy">{s.accuracy}%</span>
                      </div>
                      <div className="weak-advice">💡 {meta.advice}</div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="report-section">
            <h2 className="report-section-title">近 7 天</h2>
            <div className="report-days">
              {(report?.days ?? []).map((d) => {
                const dayLabel = d.date.slice(5).replace('-', '/');
                const h = Math.round((d.sessions / maxSessions) * 100);
                return (
                  <div key={d.date} className="day-column">
                    <div className="day-bar-box">
                      <div
                        className={`day-bar ${d.sessions > 0 ? 'active' : ''}`}
                        style={{ height: `${Math.max(4, h)}%` }}
                        title={`${d.date}：${d.sessions} 次`}
                      />
                    </div>
                    <div className="day-count">{d.sessions}</div>
                    <div className="day-label">{dayLabel}</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="report-section">
            <h2 className="report-section-title">错题本</h2>
            <div className="report-review">
              <div>
                <span className="report-review-num">{report?.review.total ?? 0}</span>
                <span className="report-review-label">道在错题本中</span>
              </div>
              <div>
                <span className="report-review-num highlight">{report?.review.due ?? 0}</span>
                <span className="report-review-label">道今天待复习</span>
              </div>
            </div>
            {(report?.review.due ?? 0) > 0 && (
              <button className="report-review-btn" onClick={() => navigate('/lessons')}>
                去课程里重练错题 →
              </button>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Report;
