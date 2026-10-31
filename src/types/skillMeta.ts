// 技能展示元数据：Report 页与导出报告（electron/reportHtml）共用，
// 集中在一处避免两份文案漂移。tsconfig.electron 显式包含 src/types/*.ts。

export interface SkillMeta {
  icon: string;
  name: string;
  advice: string;
}

export const SKILL_LABELS: Record<string, SkillMeta> = {
  listening: { icon: '🎧', name: '听力', advice: '每天先听一遍课文录音，再做听力题' },
  speaking: { icon: '🎤', name: '口语', advice: '跟读示范发音，先慢后快，注意漏读的词' },
  spelling: { icon: '✏️', name: '拼写', advice: '把错词抄在小本子上，睡前默写一遍' },
  writing: { icon: '📝', name: '填空', advice: '先读完整句再选词，注意时态和单复数' },
  reading: { icon: '📖', name: '阅读', advice: '读课文时先找关键词，再回答理解题' },
  vocabStructure: { icon: '🔤', name: '词汇与结构', advice: '复习本课语法重点，再做专项练习' },
  review: { icon: '🔁', name: '错题重练', advice: '按到期提醒复习错题，答对会越拖越久' },
};

export const SKILL_FALLBACK: SkillMeta = { icon: '📘', name: '其他', advice: '保持每天练习一点点' };

export function formatDuration(sec: number): string {
  if (sec <= 0) return '0 分钟';
  const m = Math.floor(sec / 60);
  if (m < 60) return `${m} 分钟`;
  return `${Math.floor(m / 60)} 小时 ${m % 60} 分`;
}
