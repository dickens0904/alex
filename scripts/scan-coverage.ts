/**
 * 144 课「台词物品 ↔ 画面呈现」全覆盖扫描
 * 三级呈现判定：
 *   1. 手持道具（SCRIPT_PROPS，跟人走）
 *   2. 舞台留存物品（SCRIPT_STAGE_ITEMS，出现后留存）
 *   3. 背景家具（Backdrop 固定画好的）
 * 都没覆盖的 = 缺口（含缺失物品类型清单）
 */
import {
  LESSON_SCRIPTS,
  SCRIPT_STAGE_ITEMS,
  SCRIPT_SCENES,
  SCRIPT_WEATHER,
  parseScriptLines,
} from '../src/data/theater/theaterScripts';
import { completeLessons } from '../src/data/lessons/completeLessons';
import { SCRIPT_PROPS } from '../src/components/theater/scenes';

interface ItemDef {
  kind: string;      // 归一化物品类型
  re: RegExp;        // 词边界匹配
}

/** 课文实体物品词表（词边界，含复数） */
const ITEMS: ItemDef[] = [
  { kind: 'box', re: /\bboxes?\b/g },
  { kind: 'shoes', re: /\bshoes?\b/g },
  { kind: 'door', re: /\bdoors?\b/g },
  { kind: 'window', re: /\bwindows?\b/g },
  { kind: 'book', re: /\bbooks?\b/g },
  { kind: 'bookcase', re: /\bbookcases?\b|\bbook ?shelves?\b|\bshelves\b/g },
  { kind: 'teapot', re: /\bteapots?\b/g },
  { kind: 'kettle', re: /\bkettles?\b/g },
  { kind: 'cup', re: /\bcups?\b/g },
  { kind: 'glass', re: /\bglasses?\b/g },
  { kind: 'bottle', re: /\bbottles?\b/g },
  { kind: 'milk', re: /\bmilk\b/g },
  { kind: 'beer', re: /\bbeer\b/g },
  { kind: 'wine', re: /\bwine\b/g },
  { kind: 'coffee', re: /\bcoffee\b/g },
  { kind: 'tea', re: /\btea\b/g },
  { kind: 'bed', re: /\bbeds?\b/g },
  { kind: 'table', re: /\btables?\b/g },
  { kind: 'chair', re: /\bchairs?\b/g },
  { kind: 'armchair', re: /\barmchairs?\b/g },
  { kind: 'desk', re: /\bdesks?\b/g },
  { kind: 'pen', re: /\bpens?\b/g },
  { kind: 'pencil', re: /\bpencils?\b/g },
  { kind: 'watch', re: /\bwatches\b/g },
  { kind: 'newspaper', re: /\bnewspapers?\b/g },
  { kind: 'magazine', re: /\bmagazines?\b/g },
  { kind: 'letter', re: /\bletters?\b/g },
  { kind: 'envelope', re: /\benvelopes?\b/g },
  { kind: 'key', re: /\bkeys?\b/g },
  { kind: 'knife', re: /\bknives\b/g },
  { kind: 'fork', re: /\bforks?\b/g },
  { kind: 'spoon', re: /\bspoons?\b/g },
  { kind: 'fridge', re: /\brefrigerators?\b|\bfridges?\b/g },
  { kind: 'cooker', re: /\bcookers?\b/g },
  { kind: 'cupboard', re: /\bcupboards?\b/g },
  { kind: 'wardrobe', re: /\bwardrobes?\b/g },
  { kind: 'tap', re: /\btaps?\b/g },
  { kind: 'soap', re: /\bsoap\b/g },
  { kind: 'towel', re: /\btowels?\b/g },
  { kind: 'shirt', re: /\bshirts?\b/g },
  { kind: 'dress', re: /\bdresses\b/g },
  { kind: 'hat', re: /\bhats?\b/g },
  { kind: 'coat', re: /\bcoats?\b/g },
  { kind: 'tie', re: /\bties?\b/g },
  { kind: 'blouse', re: /\bblouses?\b/g },
  { kind: 'suit', re: /\bsuits\b/g },
  { kind: 'car', re: /\bcars?\b/g },
  { kind: 'bus', re: /\bbuses\b/g },
  { kind: 'train', re: /\btrains?\b/g },
  { kind: 'aeroplane', re: /\baeroplanes?\b|\bairplanes?\b/g },
  { kind: 'boat', re: /\bboats?\b/g },
  { kind: 'ship', re: /\bships?\b/g },
  { kind: 'dog', re: /\bdogs?\b/g },
  { kind: 'cat', re: /\bcats?\b/g },
  { kind: 'bird', re: /\bbirds?\b/g },
  { kind: 'flower', re: /\bflowers?\b/g },
  { kind: 'tree', re: /\btrees?\b/g },
  { kind: 'picture', re: /\bpictures?\b/g },
  { kind: 'photo', re: /\bphotographs?\b|\bphotos?\b/g },
  { kind: 'passport', re: /\bpassports?\b/g },
  { kind: 'ticket', re: /\btickets?\b/g },
  { kind: 'suitcase', re: /\bsuitcases?\b/g },
  { kind: 'bag', re: /\b(hand)?bags?\b/g },
  { kind: 'umbrella', re: /\bumbrellas?\b/g },
  { kind: 'hammer', re: /\bhammers?\b/g },
  { kind: 'vase', re: /\bvases?\b/g },
  { kind: 'bread', re: /\bbread\b/g },
  { kind: 'cake', re: /\bcakes?\b/g },
  { kind: 'chocolate', re: /\bchocolates?\b/g },
  { kind: 'icecream', re: /\bice ?creams?\b/g },
  { kind: 'apple', re: /\bapples?\b/g },
  { kind: 'banana', re: /\bbananas?\b/g },
  { kind: 'orange', re: /\boranges?\b/g },
  { kind: 'egg', re: /\beggs?\b/g },
  { kind: 'butter', re: /\bbutter\b/g },
  { kind: 'cheese', re: /\bcheese\b/g },
  { kind: 'jam', re: /\bjam\b/g },
  { kind: 'sugar', re: /\bsugar\b/g },
  { kind: 'biscuit', re: /\bbiscuits?\b/g },
  { kind: 'money', re: /\bmoney\b/g },
  { kind: 'radio', re: /\bradios?\b/g },
  { kind: 'television', re: /\btelevisions?\b|\btvs\b/g },
  { kind: 'stereo', re: /\bstereos?\b/g },
  { kind: 'clock', re: /\bclocks?\b/g },
  { kind: 'lamp', re: /\blamps?\b/g },
  { kind: 'sofa', re: /\bsofas?\b/g },
  { kind: 'plate', re: /\bplates?\b/g },
  { kind: 'dish', re: /\bdishes\b/g },
];

/** 背景已画好的家具（Backdrop 静态元素） */
const BG_COVERED: Record<string, Set<string>> = {
  kitchen: new Set(['fridge', 'cooker', 'table', 'bottle', 'cup']),
  living: new Set(['window', 'television', 'table', 'newspaper', 'armchair', 'door', 'stereo', 'book', 'magazine', 'picture']),
  home: new Set(['window', 'sofa', 'television', 'picture']),
  classroom: new Set(['desk']),
  river: new Set(['boat', 'ship', 'aeroplane']),
  park: new Set(['tree']),
  station: new Set(['train', 'clock']),
  office: new Set(['desk', 'window']),
  train: new Set(['box', 'suitcase', 'window', 'train']),
};

/** 习语/语义豁免：这些"物品提及"不需要画面（习语、姓氏、时刻表述、他处指涉、在场的其他道具已覆盖） */
const WHITELIST: Record<number, Set<string>> = {
  45: new Set(['door']),      // next door 隔壁
  93: new Set(['door']),      // next-door neighbour
  95: new Set(['door']),      // next door to the station
  26: new Set(['pen']),       // pen in the bag（书包已出现）
  42: new Set(['milk', 'butter']), // 本课教学点=没有牛奶；黄油在厨房（画外）
  49: new Set(['bird']),      // Mrs. Bird 是姓氏
  71: new Set(['clock']),     // six o'clock 时刻表述
  82: new Set(['clock']),     // at 7 o'clock 时刻表述
  101: new Set(['letter']),   // 明信片=手持 card
  109: new Set(['coffee']),   // 咖啡=手中杯子
  47: new Set(['coffee']),    // 咖啡=手中杯子
  57: new Set(['car']),       // by car 出行描述
  81: new Set(['clock']),     // dinner at seven o'clock 时刻表述
  118: new Set(['clock']),    // at 8 o'clock 时刻表述
  120: new Set(['book']),     // exercise books 作业本，非绘本
  126: new Set(['clock']),    // at 10 o'clock 时刻表述
  136: new Set(['clock']),    // at six o'clock 时刻表述
  139: new Set(['clock']),    // six o'clock 时刻表述
};

/** 已实现可渲染的物品类型（手持 19 + 舞台 53） */
const RENDERABLE = new Set([
  'bag', 'vase', 'umbrella', 'book', 'envelope', 'card', 'suitcase', 'pen', 'pencil',
  'watch', 'glasses', 'icecream', 'hammer', 'cup', 'key', 'newspaper', 'photo', 'shirt', 'hat',
  'box', 'shoes', 'window', 'door', 'teapot', 'bookcase',
  'clock', 'table', 'desk', 'chair', 'armchair', 'bed', 'wardrobe', 'cupboard',
  'television', 'radio', 'lamp', 'stereo', 'fridge',
  'milk', 'beer', 'wine', 'bottle', 'tea', 'coffee', 'kettle', 'glass', 'plate', 'dish',
  'bread', 'cake', 'chocolate', 'biscuit', 'cheese', 'jam', 'butter', 'sugar', 'apple',
  'letter', 'ticket', 'passport', 'money',
  'coat', 'blouse',
  'dog', 'cat', 'bird',
  'car', 'train', 'ship', 'flower', 'soap',
]);

let totalMention = 0;
let totalCovered = 0;
const gapRows: string[] = [];
const missingKinds = new Map<string, number>();

for (let id = 1; id <= 144; id++) {
  const lesson = completeLessons.find((l) => l.id === id);
  const script = LESSON_SCRIPTS[id];
  if (!lesson || !script) continue;
  const text = lesson.content.text.paragraphs
    .map((p: unknown) => (typeof p === 'string' ? p : (p as { content: string }).content))
    .join(' ')
    .toLowerCase();

  // 1) 提及了哪些物品
  const mentioned: string[] = [];
  for (const { kind, re } of ITEMS) {
    re.lastIndex = 0;
    if (re.test(text)) mentioned.push(kind);
  }
  if (mentioned.length === 0) continue;
  totalMention++;

  // 2) 已有编排覆盖
  const stageItems = SCRIPT_STAGE_ITEMS[id] ?? [];
  const stageKinds = new Set(stageItems.map((e) => e.item));
  const propPlan = SCRIPT_PROPS[id];
  const propKinds = new Set<string>();
  if (propPlan) {
    if (propPlan.item) propKinds.add(propPlan.item);
    propPlan.perLine?.forEach((e) => e && propKinds.add(e[0]));
  }
  const bgSet = BG_COVERED[script.bg] ?? new Set<string>();

  // 3) 逐物品判定
  const gaps: string[] = [];
  const wl = WHITELIST[id];
  for (const kind of mentioned) {
    if (bgSet.has(kind)) continue;                       // 背景已画
    if (stageKinds.has(kind)) continue;                  // 舞台留存已编排
    if (propKinds.has(kind)) continue;                   // 手持道具已编排
    if (kind === 'glass' && propKinds.has('glasses')) continue; // 玻璃杯↔手持 glasses 别名
    if (kind === 'table' && stageKinds.has('desk')) continue;   // dressing table=书桌
    if (kind === 'envelope' && stageKinds.has('letter')) continue; // 信封=信件
    if (kind === 'cup' && (stageKinds.has('coffee') || stageKinds.has('tea'))) continue; // 杯=咖啡/茶
    if (wl?.has(kind)) continue;                         // 习语/语义豁免
    if (kind === 'letter' && (propKinds.has('envelope') || stageKinds.has('book'))) continue;
    if (RENDERABLE.has(kind)) {
      gaps.push(kind);                                   // 类型能画但本课没编排
    } else {
      gaps.push(`${kind}*`);                             // 连类型都没有（* 标记需新增绘制）
      missingKinds.set(kind, (missingKinds.get(kind) ?? 0) + 1);
    }
  }

  const flags: string[] = [];
  if (SCRIPT_SCENES[id]) flags.push('分场');
  if (SCRIPT_WEATHER[id]) flags.push('天气');
  if (propPlan) flags.push('手持');
  if (stageItems.length) flags.push('留存');

  if (gaps.length > 0) {
    gapRows.push(`L${id} [${script.type}${flags.length ? '|' + flags.join(',') : ''}] bg=${script.bg} 缺口: ${gaps.join(' ')}  ← 提及: ${mentioned.join(' ')}`);
  } else {
    totalCovered++;
  }
}

console.log(`\n========== 扫描结果 ==========`);
console.log(`提及实体物品的课: ${totalMention}`);
console.log(`物品全部有画面呈现: ${totalCovered}`);
console.log(`存在缺口: ${gapRows.length}`);
console.log(`\n---- 缺失物品类型（需新增绘制，* 标记）----`);
[...missingKinds.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(`  ${k}: ${n} 门课涉及`));
console.log(`\n---- 逐课缺口清单 ----`);
gapRows.forEach((r) => console.log(r));
