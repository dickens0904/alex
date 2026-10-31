import { buildReportHtml, escapeHtml, ReportExportData } from '../../electron/reportHtml';

const makeReport = (): ReportExportData => ({
  overview: {
    sessions: 12,
    score: 840,
    totalScore: 1200,
    correct: 96,
    totalCount: 130,
    timeSpent: 3725, // 62 分钟 → 1 小时 2 分
  },
  skills: [
    { type: 'listening', sessions: 4, correct: 40, totalCount: 44, accuracy: 91 },
    { type: 'spelling', sessions: 3, correct: 18, totalCount: 36, accuracy: 50 },
  ],
  days: [
    { date: '2026-10-25', sessions: 0, score: 0, totalScore: 0 },
    { date: '2026-10-26', sessions: 2, score: 160, totalScore: 200 },
    { date: '2026-10-27', sessions: 3, score: 240, totalScore: 300 },
    { date: '2026-10-28', sessions: 1, score: 80, totalScore: 100 },
    { date: '2026-10-29', sessions: 2, score: 150, totalScore: 200 },
    { date: '2026-10-30', sessions: 3, score: 160, totalScore: 250 },
    { date: '2026-10-31', sessions: 1, score: 50, totalScore: 150 },
  ],
  review: { total: 9, due: 3 },
});

describe('escapeHtml', () => {
  it('转义全部危险字符', () => {
    expect(escapeHtml(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&#39;');
  });

  it('普通字符串原样返回', () => {
    expect(escapeHtml('听力 91%')).toBe('听力 91%');
  });
});

describe('buildReportHtml', () => {
  it('生成完整 HTML 文档并包含总览数据', () => {
    const html = buildReportHtml(makeReport());
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('学习报告');
    expect(html).toContain('>12</div>');
    expect(html).toContain('74%'); // 正确率 96/130
    expect(html).toContain('70%'); // 得分率 840/1200
    expect(html).toContain('1 小时 2 分');
  });

  it('技能条按正确率降序排列，颜色分档正确', () => {
    const html = buildReportHtml(makeReport());
    const listeningIdx = html.indexOf('听力');
    const spellingIdx = html.indexOf('拼写');
    expect(listeningIdx).toBeGreaterThan(-1);
    expect(spellingIdx).toBeGreaterThan(-1);
    expect(listeningIdx).toBeLessThan(spellingIdx);
    // 91 → good，50 → low
    expect(html).toContain('rp-bar good');
    expect(html).toContain('rp-bar low');
  });

  it('薄弱项（total>=3 且正确率升序 Top3）附带针对性建议', () => {
    const html = buildReportHtml(makeReport());
    expect(html).toContain('需要加强');
    expect(html).toContain('把错词抄在小本子上，睡前默写一遍');
    expect(html).toContain('>50%<');
  });

  it('近 7 天柱状图带日期标签，最高日决定相对高度', () => {
    const html = buildReportHtml(makeReport());
    expect(html).toContain('10/26');
    expect(html).toContain('10/31');
    expect(html).toContain('title="2026-10-27：3 次"');
  });

  it('错题本数字与复习待办呈现', () => {
    const html = buildReportHtml(makeReport());
    expect(html).toContain('道在错题本中');
    expect(html).toContain('道今天待复习');
    expect(html).toContain('>9</span>');
    expect(html).toContain('>3</span>');
  });

  it('meta 信息（生成时间/版本）注入副标题', () => {
    const html = buildReportHtml(makeReport(), {
      generatedAt: '2026/10/31 15:00:00',
      appVersion: '1.4.0',
    });
    expect(html).toContain('生成于 2026/10/31 15:00:00');
    expect(html).toContain('版本 v1.4.0');
  });

  it('meta 中的 HTML 字符被转义，防止注入', () => {
    const html = buildReportHtml(makeReport(), {
      generatedAt: '<script>alert(1)</script>',
    });
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('无 meta 时副标题不出现空分隔符', () => {
    const html = buildReportHtml(makeReport());
    expect(html).not.toContain('·  ·');
  });
});
