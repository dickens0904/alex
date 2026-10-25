/**
 * 全 144 课「讲到的内容 ↔ 画面展示」综合扫描（用户逻辑：给孩子看，讲到啥图上有啥）
 * 维度：
 *   1. 地点一致性：课文地点词 ↔ script.bg（说在花园就别在客厅）
 *   2. 数量对应：two/three... + 复数物品 ↔ 同类物品条目数
 *   3. 时间：at night / in the evening ↔ night 背景
 *   4. 颜色：颜色词+物品 → 列清单人工核对（绘制色硬编码，自动比对不可靠）
 */
import { LESSON_SCRIPTS, SCRIPT_STAGE_ITEMS, SCRIPT_SCENES } from '../src/data/theater/theaterScripts';
import { completeLessons } from '../src/data/lessons/completeLessons';

const textOf = (id: number) =>
  (completeLessons.find((l) => l.id === id)?.content.text.paragraphs as Array<{ content: string }> | undefined)
    ?.map((p) => p.content).join(' ').toLowerCase() ?? '';

/** 地点词 → 应该的 bg */
const PLACE_MAP: Array<{ re: RegExp; bg: string; label: string }> = [
  { re: /\bin the garden\b|\bgarden\b/g, bg: 'park', label: '花园→park' },
  { re: /\bkitchen\b/g, bg: 'kitchen', label: '厨房→kitchen' },
  { re: /\bliving room\b/g, bg: 'living', label: '客厅→living' },
  { re: /\bbedroom\b/g, bg: 'home', label: '卧室→home' },
  { re: /\boffice\b/g, bg: 'office', label: '办公室→office' },
  { re: /\bat school\b|\bschool\b/g, bg: 'classroom', label: '学校→classroom' },
  { re: /\bstationer'?s\b|\bat the shop\b|\bshop\b/g, bg: 'shop', label: '商店→shop' },
  { re: /\brailway station\b|\bstation\b/g, bg: 'station', label: '车站→station' },
];

const NUM_WORDS: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, twenty: 20, hundreds: 100 };
const PLURAL_ITEM: Record<string, string> = {
  boxes: 'box', shoes: 'shoes', doors: 'door', windows: 'window', books: 'book',
  cars: 'car', dogs: 'dog', cats: 'cat', cups: 'cup', bottles: 'bottle',
  suitcases: 'suitcase', chairs: 'chair', tables: 'table', tickets: 'ticket',
  envelopes: 'letter', plates: 'plate', flowers: 'flower', birds: 'bird',
};

console.log('---- 1) 地点一致性 ----');
for (let id = 1; id <= 144; id++) {
  const script = LESSON_SCRIPTS[id];
  if (!script) continue;
  const text = textOf(id);
  // 分场课bg会切换，只对单场课判定
  const scenes = SCRIPT_SCENES[id];
  if (scenes) continue;
  const bgs = new Set([script.bg, ...(Object.values(scenes ?? {}).map((s: { bg?: string }) => s.bg).filter(Boolean) as string[])]);
  for (const { re, bg, label } of PLACE_MAP) {
    re.lastIndex = 0;
    if (re.test(text) && script.bg !== bg && !bgs.has(bg)) {
      console.log(`L${id} bg=${script.bg} 但课文提到 ${label}`);
      break;
    }
  }
}

console.log('---- 2) 数量对应 ----');
for (let id = 1; id <= 144; id++) {
  const script = LESSON_SCRIPTS[id];
  if (!script) continue;
  const text = textOf(id);
  const items = SCRIPT_STAGE_ITEMS[id] ?? [];
  for (const [plural, kind] of Object.entries(PLURAL_ITEM)) {
    for (const [w, n] of Object.entries(NUM_WORDS)) {
      if (n === 1 || n === 20 || n === 100) continue;
      const re = new RegExp(`\\b${w} (such )?${plural}\\b`, 'g');
      if (re.test(text)) {
        const count = items.filter((e) => e.item === kind).length;
        if (count < n) console.log(`L${id} 课文 "${w} ${plural}" 但 ${kind} 只有 ${count} 件`);
      }
    }
  }
}

console.log('---- 3) 夜晚场景 ----');
for (let id = 1; id <= 144; id++) {
  const script = LESSON_SCRIPTS[id];
  if (!script) continue;
  const text = textOf(id);
  if (/\bat night\b/.test(text)) {
    const bgs = new Set([script.bg, ...((SCRIPT_SCENES[id] ?? []).map((s) => s.bg).filter(Boolean) as string[])]);
    if (!bgs.has('night')) console.log(`L${id} bg=${[...bgs].join('/')} 课文有 at night`);
  }
}

console.log('---- 4) 颜色+物品（人工核对清单） ----');
const COLOR_RE = /\b(red|blue|green|yellow|white|black|brown|orange|pink|grey|gray|purple)\b/g;
const KINDS = Object.keys(SCRIPT_STAGE_ITEMS).flatMap((id) => (SCRIPT_STAGE_ITEMS[Number(id)] ?? []).map((e) => `${id}:${e.item}`));
let colorRows = 0;
for (let id = 1; id <= 144; id++) {
  const text = textOf(id);
  COLOR_RE.lastIndex = 0;
  const colors = text.match(COLOR_RE) ?? [];
  if (colors.length === 0) continue;
  const items = (SCRIPT_STAGE_ITEMS[id] ?? []).map((e) => e.item).join(',') || '无物品';
  console.log(`L${id} 颜色词: ${[...new Set(colors)].join('/')} | 物品: ${items}`);
  colorRows++;
}
console.log(`\n颜色核对 ${colorRows} 门`);
