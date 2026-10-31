// 学习报告导出：把 PracticeReport 渲染成一份可直接打印/截图的独立 HTML。
// 纯字符串函数，不依赖 electron，便于 jest 单测；
// 主进程用离屏窗口加载它：printToPDF 出 PDF，capturePage 出 PNG 长图。
import { SKILL_FALLBACK, SKILL_LABELS, formatDuration } from '../src/types/skillMeta';

export interface ReportExportData {
  overview: {
    sessions: number;
    score: number;
    totalScore: number;
    correct: number;
    totalCount: number;
    timeSpent: number;
  };
  skills: {
    type: string;
    sessions: number;
    correct: number;
    totalCount: number;
    accuracy: number;
  }[];
  days: { date: string; sessions: number; score: number; totalScore: number }[];
  review: { total: number; due: number };
}

export interface ReportHtmlMeta {
  appVersion?: string;
  generatedAt?: string;
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });
}

const STYLE = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Microsoft YaHei", "PingFang SC", sans-serif; color: #333; background: #fff; padding: 32px 36px; width: 820px; }
  .rp-header { text-align: center; border-bottom: 3px solid #ff8c42; padding-bottom: 14px; margin-bottom: 20px; }
  .rp-title { font-size: 26px; font-weight: 800; color: #ff8c42; }
  .rp-sub { margin-top: 6px; font-size: 13px; color: #888; }
  .rp-cards { display: flex; gap: 12px; margin-bottom: 22px; }
  .rp-card { flex: 1; border: 1px solid #f0e2d0; border-radius: 12px; padding: 14px 8px; text-align: center; background: #fff9f2; }
  .rp-card-value { font-size: 22px; font-weight: 800; color: #ff8c42; }
  .rp-card-label { margin-top: 4px; font-size: 12px; color: #888; }
  .rp-section { margin-bottom: 22px; }
  .rp-section-title { font-size: 16px; font-weight: 700; margin-bottom: 10px; padding-left: 8px; border-left: 4px solid #ff8c42; }
  .rp-skill { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-size: 13px; }
  .rp-skill-name { width: 120px; flex-shrink: 0; font-weight: 600; }
  .rp-bar-bg { flex: 1; height: 12px; border-radius: 999px; background: #f2f2f2; overflow: hidden; }
  .rp-bar { height: 100%; border-radius: 999px; }
  .rp-bar.good { background: #43a047; }
  .rp-bar.mid { background: #fb8c00; }
  .rp-bar.low { background: #e53935; }
  .rp-skill-value { width: 44px; text-align: right; font-weight: 700; color: #666; }
  .rp-weak { border-left: 4px solid #ffb74d; background: #fff7e6; border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; }
  .rp-weak-head { display: flex; font-weight: 700; }
  .rp-weak-acc { margin-left: auto; color: #e65100; }
  .rp-weak-advice { margin-top: 4px; font-size: 12px; color: #777; }
  .rp-days { display: flex; align-items: flex-end; gap: 10px; height: 130px; }
  .rp-day { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; }
  .rp-day-bar { width: 60%; border-radius: 6px 6px 0 0; background: #f0f0f0; }
  .rp-day-bar.active { background: linear-gradient(180deg, #ff8c42, #e6732a); }
  .rp-day-num { font-size: 12px; font-weight: 700; margin-top: 4px; }
  .rp-day-label { font-size: 11px; color: #999; }
  .rp-review { display: flex; gap: 40px; }
  .rp-review-num { font-size: 24px; font-weight: 800; }
  .rp-review-num.highlight { color: #e65100; }
  .rp-review-label { margin-left: 6px; font-size: 13px; color: #777; }
  .rp-footer { margin-top: 26px; padding-top: 12px; border-top: 1px dashed #ddd; font-size: 12px; color: #999; text-align: center; line-height: 1.7; }
  @media print { body { padding: 0; width: auto; } }
`;

export function buildReportHtml(
  report: ReportExportData,
  meta: ReportHtmlMeta = {}
): string {
  const e = escapeHtml;
  const { overview } = report;
  const accuracy =
    overview.totalCount > 0 ? Math.round((overview.correct / overview.totalCount) * 100) : 0;
  const scoreRate =
    overview.totalScore > 0 ? Math.round((overview.score / overview.totalScore) * 100) : 0;

  const skills = [...report.skills].sort((a, b) => b.accuracy - a.accuracy);
  const skillRows = skills
    .map((s) => {
      const m = SKILL_LABELS[s.type] ?? SKILL_FALLBACK;
      const cls = s.accuracy >= 80 ? 'good' : s.accuracy >= 60 ? 'mid' : 'low';
      return `<div class="rp-skill">
        <span class="rp-skill-name">${e(m.icon)} ${e(m.name)}</span>
        <div class="rp-bar-bg"><div class="rp-bar ${cls}" style="width:${s.accuracy}%"></div></div>
        <span class="rp-skill-value">${s.accuracy}%</span>
      </div>`;
    })
    .join('\n');

  const weak = report.skills
    .filter((s) => s.totalCount >= 3)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);
  const weakHtml =
    weak.length > 0
      ? `<div class="rp-section"><div class="rp-section-title">需要加强</div>${weak
          .map((s, i) => {
            const m = SKILL_LABELS[s.type] ?? SKILL_FALLBACK;
            return `<div class="rp-weak">
            <div class="rp-weak-head"><span>${i + 1}. ${e(m.icon)} ${e(m.name)}</span><span class="rp-weak-acc">${s.accuracy}%</span></div>
            <div class="rp-weak-advice">💡 ${e(m.advice)}</div>
          </div>`;
          })
          .join('\n')}</div>`
      : '';

  const maxSessions = Math.max(1, ...report.days.map((d) => d.sessions));
  const dayColumns = report.days
    .map((d) => {
      const h = Math.round((d.sessions / maxSessions) * 100);
      return `<div class="rp-day">
        <div class="rp-day-bar ${d.sessions > 0 ? 'active' : ''}" style="height:${Math.max(4, h)}%" title="${e(d.date)}：${d.sessions} 次"></div>
        <div class="rp-day-num">${d.sessions}</div>
        <div class="rp-day-label">${e(d.date.slice(5).replace('-', '/'))}</div>
      </div>`;
    })
    .join('\n');

  const metaLine = [
    meta.generatedAt ? `生成于 ${e(meta.generatedAt)}` : '',
    meta.appVersion ? `版本 v${e(meta.appVersion)}` : '',
  ]
    .filter(Boolean)
    .join(' · ');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<title>学习报告</title>
<style>${STYLE}</style>
</head>
<body>
  <div class="rp-header">
    <div class="rp-title">学习报告</div>
    <div class="rp-sub">蟹老板新概念英语 · 新概念英语第一册${metaLine ? ` · ${metaLine}` : ''}</div>
  </div>

  <div class="rp-cards">
    <div class="rp-card"><div class="rp-card-value">${overview.sessions}</div><div class="rp-card-label">练习次数</div></div>
    <div class="rp-card"><div class="rp-card-value">${accuracy}%</div><div class="rp-card-label">正确率</div></div>
    <div class="rp-card"><div class="rp-card-value">${scoreRate}%</div><div class="rp-card-label">得分率</div></div>
    <div class="rp-card"><div class="rp-card-value">${e(formatDuration(overview.timeSpent))}</div><div class="rp-card-label">练习时长</div></div>
  </div>

  <div class="rp-section">
    <div class="rp-section-title">各项能力正确率</div>
    ${skillRows}
  </div>

  ${weakHtml}

  <div class="rp-section">
    <div class="rp-section-title">近 7 天</div>
    <div class="rp-days">${dayColumns}</div>
  </div>

  <div class="rp-section">
    <div class="rp-section-title">错题本</div>
    <div class="rp-review">
      <div><span class="rp-review-num">${report.review.total}</span><span class="rp-review-label">道在错题本中</span></div>
      <div><span class="rp-review-num highlight">${report.review.due}</span><span class="rp-review-label">道今天待复习</span></div>
    </div>
  </div>

  <div class="rp-footer">
    本报告由「蟹老板新概念英语」在本机生成，练习数据不出设备。<br />
    导出文件请妥善保管，避免包含儿童个人信息的服务上传。
  </div>
</body>
</html>`;
}
