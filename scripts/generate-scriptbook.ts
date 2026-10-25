/** 重新生成剧本集 HTML：每课标注推荐画风 + 导演编排（分场/镜头/走位/道具） */
import * as fs from 'fs';
import * as path from 'path';
import lessonsMod from '../src/data/lessons/completeLessons';
import {
  LESSON_SCRIPTS,
  ROLE_PRESETS,
  BG_NAMES,
  SCRIPT_SCENES,
  parseScriptLines,
  estimateSeconds,
} from '../src/data/theater/theaterScripts';
import { SCRIPT_PROPS } from '../src/components/theater/scenes';
import {
  STYLE_RECOMMEND,
  STYLE_THEMES,
  recommendStyle,
  type StyleId,
} from '../src/data/theater/theaterStyles';

const lessons = lessonsMod as unknown as Array<{
  id: number;
  title: string;
  content: {
    text?: {
      paragraphs?: Array<{ speaker?: string; content: string }>;
      translation?: string[];
    };
  };
}>;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ACTION_LABEL: Record<string, string> = {
  talk: '说话', point: '指向', raise: '举起', wave: '挥手', nod: '点头', shake: '摇头',
  none: '—', walkin: '▶走入', walkout: '◀走出',
};
const SHOT_LABEL: Record<string, string> = { wide: '全景', medium: '中景', close: '特写' };
const PROP_LABEL: Record<string, string> = {
  bag: '手提包', vase: '花瓶', umbrella: '雨伞', book: '书',
  envelope: '信封', card: '明信片', suitcase: '行李箱',
  pen: '钢笔', pencil: '铅笔', watch: '手表', glasses: '玻璃杯',
  icecream: '冰淇淋', hammer: '锤子', cup: '咖啡杯', key: '钥匙',
  newspaper: '报纸', photo: '照片',
};

/** 导演编排块：分场表（含镜头基调）或默认节奏说明 + 道具 */
function directionBlock(lessonId: number, lineCount: number): string {
  const scenes = SCRIPT_SCENES[lessonId];
  const prop = SCRIPT_PROPS[lessonId];
  const rows: string[] = [];
  if (scenes) {
    for (let i = 0; i < scenes.length; i++) {
      const s = scenes[i];
      const end = i + 1 < scenes.length ? scenes[i + 1].from : lineCount;
      const range = end - s.from > 1 ? `句 ${s.from + 1}-${end}` : `句 ${s.from + 1}`;
      const parts = [`<b>${esc(s.place ?? BG_NAMES[s.bg ?? 'street'])}</b>`, `🖼 ${esc(BG_NAMES[s.bg ?? 'street'])}`, `🎥 ${SHOT_LABEL[s.shot ?? 'medium']}`];
      if (s.present) parts.push(`在场：${esc(s.present.join('/'))}`);
      rows.push(`<li>${range}：${parts.join(' · ')}</li>`);
    }
  } else {
    rows.push('<li>默认镜头节奏：开场全景定场 → 对白中景跟说话者（旁白剧保持全景）</li>');
  }
  const propLine = prop ? `<div class="dir-prop">🎒 手持道具：<b>${PROP_LABEL[prop.item] ?? prop.item}</b></div>` : '';
  return `<div class="direction"><h4>🎬 导演编排</h4><ul>${rows.join('')}</ul>${propLine}</div>`;
}

function roleSwatch(role: string): string {
  const f = ROLE_PRESETS[role];
  if (!f) return '';
  return `<span class="swatch"><i style="background:${f.shirt}"></i><i style="background:${f.hair}"></i><i style="background:${f.skin}"></i></span>`;
}

const cards = lessons
  .map((l) => {
    const s = LESSON_SCRIPTS[l.id];
    if (!s) return '';
    const paras = l.content?.text?.paragraphs || [];
    const zh = l.content?.text?.translation || [];
    const parsed = parseScriptLines(s.lines);
    const wordsPerLine = paras.map((p) => p.content.split(/\s+/).filter(Boolean).length);
    const secs = estimateSeconds(s, wordsPerLine);
    const dur = `${Math.floor(secs / 60)}分${String(secs % 60).padStart(2, '0')}秒`;
    const styleId: StyleId = (s.style as StyleId) || recommendStyle(l.id);
    const th = STYLE_THEMES[styleId];

    const castRows = s.cast
      .map(
        ([k, n, r]) =>
          `<span class="cast-item"><b>${esc(n)}</b>${roleSwatch(r)}<code>${k}</code></span>`
      )
      .join('');

    const lineRows = paras
      .map((p, i) => {
        const ln = parsed[i];
        const speakerKey = ln?.key ?? 'N';
        const name = speakerKey === 'N' ? '旁白' : s.cast.find((c) => c[0] === speakerKey)?.[1] ?? speakerKey;
        const action = ln ? ACTION_LABEL[ln.action] || ln.action : '—';
        return `<tr class="${speakerKey === 'N' ? 'narr' : ''}"><td class="ln">${i + 1}</td><td class="spk">${esc(name)}</td><td class="en">${esc(p.content)}</td><td class="zh">${esc(zh[i] || '')}</td><td class="act">${action}</td></tr>`;
      })
      .join('');

    return `<section class="card" id="l${l.id}">
  <header><span class="lid">第 ${l.id} 课</span><h3>${esc(s.scene)}</h3><span class="dur">⏱ ${dur}</span></header>
  <div class="meta">
    <span>📍 ${esc(s.place)}</span>
    <span>🏷 ${esc(s.type === 'dialogue' ? '情景对话剧' : s.type === 'narrative' ? '旁白短文剧' : '句型操练')}</span>
    <span>🖼 ${esc(BG_NAMES[s.bg] || s.bg)}</span>
    <span>🎨 推荐画风：<b>${th.icon} ${th.name}</b></span>
  </div>
  <p class="story">🎭 ${esc(s.story)}</p>
  <div class="cast">${castRows}</div>
  ${directionBlock(l.id, paras.length)}
  <table><thead><tr><th>#</th><th>角色</th><th>英文台词</th><th>中文</th><th>动作</th></tr></thead><tbody>${lineRows}</tbody></table>
</section>`;
  })
  .join('\n');

const styleLegend = (Object.keys(STYLE_THEMES) as StyleId[])
  .map((id) => {
    const t = STYLE_THEMES[id];
    const count = Object.values(STYLE_RECOMMEND).filter((x) => x === id).length + (id === 'paper' ? 144 - Object.keys(STYLE_RECOMMEND).length : 0);
    return `<span class="style-item">${t.icon} <b>${t.name}</b>（${t.desc}）· ${count} 课</span>`;
  })
  .join('');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>新概念英语第一册 · 情景剧场剧本集（144 课 · 7 种画风）</title>
<style>
  body { font-family: 'Microsoft YaHei', sans-serif; background: #fdf8f2; color: #2c3e50; margin: 0; padding: 24px; }
  .cover { text-align: center; padding: 40px 20px 24px; }
  .cover h1 { color: #d35400; margin: 0 0 8px; }
  .cover p { color: #7f8c8d; margin: 4px 0; }
  .legend { max-width: 1100px; margin: 0 auto 20px; background: white; border-radius: 12px; padding: 14px 20px; box-shadow: 0 2px 8px rgba(0,0,0,.06); font-size: 14px; color: #555; }
  .legend b { color: #d35400; }
  .stylebar { max-width: 1100px; margin: 0 auto 20px; background: white; border-radius: 12px; padding: 14px 20px; box-shadow: 0 2px 8px rgba(0,0,0,.06); display: flex; flex-direction: column; gap: 8px; }
  .stylebar h2 { margin: 0; font-size: 16px; color: #d35400; }
  .style-item { font-size: 13.5px; }
  .card { max-width: 1100px; margin: 0 auto 18px; background: white; border-radius: 14px; padding: 18px 22px; box-shadow: 0 2px 10px rgba(0,0,0,.06); page-break-inside: avoid; }
  .card header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .lid { background: #f5b041; color: white; font-weight: 700; padding: 4px 12px; border-radius: 14px; font-size: 14px; white-space: nowrap; }
  .card h3 { margin: 0; flex: 1; font-size: 19px; }
  .dur { color: #e67e22; font-weight: 700; white-space: nowrap; }
  .meta { display: flex; gap: 14px; flex-wrap: wrap; font-size: 13px; color: #7f8c8d; margin-bottom: 8px; }
  .meta b { color: #5e9ea0; }
  .story { margin: 6px 0 10px; font-size: 14.5px; }
  .cast { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; }
  .cast-item { background: #f7f1e6; border-radius: 16px; padding: 4px 12px; font-size: 13px; }
  .cast-item code { color: #e67e22; font-weight: 700; }
  .swatch { display: inline-flex; gap: 2px; margin: 0 6px; vertical-align: middle; }
  .swatch i { width: 12px; height: 12px; border-radius: 50%; display: inline-block; border: 1px solid rgba(0,0,0,.15); }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th { background: #faf3e6; text-align: left; padding: 6px 8px; color: #8a6d3b; }
  td { padding: 5px 8px; border-top: 1px solid #f3ead9; vertical-align: top; }
  td.ln { color: #b2bec3; width: 30px; }
  td.spk { white-space: nowrap; font-weight: 700; color: #d35400; width: 90px; }
  td.en { font-weight: 600; width: 40%; }
  td.zh { color: #7f8c8d; }
  td.act { color: #5e9ea0; white-space: nowrap; }
  tr.narr td { background: #fbf7ef; }
  .direction { background: #f4f8fb; border-left: 4px solid #5e9ea0; border-radius: 8px; padding: 8px 14px; margin: 0 0 12px; font-size: 13px; color: #4a5a68; }
  .direction h4 { margin: 0 0 6px; color: #3d5a80; font-size: 13.5px; }
  .direction ul { margin: 0; padding-left: 18px; }
  .direction li { margin: 2px 0; }
  .direction b { color: #3d5a80; }
  .dir-prop { margin-top: 4px; }
  @media print { body { background: white; padding: 0; } .card { box-shadow: none; border: 1px solid #eee; } }
</style>
</head>
<body>
<div class="cover">
  <h1>🎬 新概念英语第一册 · 情景剧场剧本集</h1>
  <p>144 课全覆盖 · 7 种画风（每课标注推荐画风，可在剧场顶栏随时切换）</p>
  <p>62 部情景对话剧 · 13 部旁白短文剧 · 69 期句型操练</p>
</div>
<div class="legend">
  <b>阅读说明：</b>角色配色圆点 = 舞台上纸片人的上衣/头发/肤色；台词序号与课文段落一一对应；
  旁白行（灰底）由"说书人"朗读。<b>画风切换</b>：剧场顶栏有 7 种画风按钮，带绿点的是本课推荐；
  手动选择后全局记忆，点"↺ 本课推荐"恢复。
</div>
<div class="stylebar">
  <h2>🎨 画风总览</h2>
  <div>${styleLegend}</div>
</div>
${cards}
</body>
</html>`;

const out = path.resolve(__dirname, '../剧本集.html');
fs.writeFileSync(out, html, 'utf-8');
console.log('剧本集已更新:', out, Math.round(fs.statSync(out).size / 1024) + 'KB');
