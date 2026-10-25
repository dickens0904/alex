/**
 * 全 144 课「动作动词 ↔ 画面表现」扫描（用户逻辑：说到的动作必须有画面）
 * 动作动词 → 应有画面表现：
 *   running/chasing → 跑动物品（dog/cat 等 run:1）
 *   swimming → swimmer 游泳者
 *   climbing → 角色上场举手（raise）
 *   sleeping → bed 物品
 *   shaving → 剃刀（待画）→ 暂以"角色/物品"豁免清单人工判定
 *   washing/sweeping/cooking/typing → 家务类：已有物品抵扣（letter/bread 等）或豁免
 * 输出：每课提及的动作动词、现有画面资产、缺口
 */
import { LESSON_SCRIPTS, SCRIPT_STAGE_ITEMS, SCRIPT_SCENES, parseScriptLines } from '../src/data/theater/theaterScripts';
import { completeLessons } from '../src/data/lessons/completeLessons';

/** 动作动词 → 归一动作类型 */
const ACTION_PATTERNS: Array<{ type: string; re: RegExp }> = [
  { type: '跑', re: /\brunning\b|\bruns\b|\brun\b/g },
  { type: '游', re: /\bswimming\b|\bswims\b|\bswam\b|\bswim\b/g },
  { type: '爬', re: /\bclimbing\b|\bclimbs\b|\bclimbed\b/g },
  { type: '睡', re: /\bsleeping\b|\bsleeps\b|\bslept\b|\basleep\b|\bin bed\b/g },
  { type: '追', re: /\brun(ning)? after\b|\bchasing\b|\bchase\b/g },
  { type: '飞', re: /\bflying\b|\bflew\b|\bfly\b/g },
  { type: '跳', re: /\bjumping\b|\bjumped\b|\bjump\b/g },
  { type: '走', re: /\bwalking\b|\bwalked\b|\bwalk\b/g },
];

const itemsOf = (id: number) => SCRIPT_STAGE_ITEMS[id] ?? [];

/** 豁免：叙述性提及/抽象句型/背景已画（飞=L33 river 背景有飞机），不需专门画面 */
const WHITELIST: Record<number, Set<string>> = {
  33: new Set(['飞', '走']),   // 背景已画飞机；walking along 是叙述
  35: new Set(['走']),         // walking along the banks 叙述（游泳已排）
  36: new Set(['跳']),         // jumping off the wall 抽象介词句型
  74: new Set(['游']),         // He swam very well 过去式叙述
  90: new Set(['游']),         // 同上
  143: new Set(['走']),        // went for a walk 叙述
};

let rows = 0;
for (let id = 1; id <= 144; id++) {
  const lesson = completeLessons.find((l) => l.id === id);
  const script = LESSON_SCRIPTS[id];
  if (!lesson || !script) continue;
  const text = (lesson.content.text.paragraphs as Array<{ content: string }>)
    .map((p) => p.content).join(' ').toLowerCase();

  const actions: string[] = [];
  for (const { type, re } of ACTION_PATTERNS) {
    re.lastIndex = 0;
    if (re.test(text)) actions.push(type);
  }
  if (actions.length === 0) continue;

  const items = itemsOf(id);
  const itemKinds = new Set(items.map((e) => e.item));
  const hasRunItem = items.some((e) => e.run);
  const hasSwimmer = itemKinds.has('swimmer');
  const hasBed = itemKinds.has('bed');
  const cast = script.cast.map((c) => c[0]);
  const lineActions = parseScriptLines(script.lines);
  const hasRaise = lineActions.some((a) => a.action === 'raise' || a.action === 'point');

  // 逐动作判定画面覆盖
  const gaps: string[] = [];
  const wl = WHITELIST[id];
  for (const a of actions) {
    if (wl?.has(a)) continue;
    if (a === '跑' && hasRunItem) continue;
    if (a === '游' && hasSwimmer) continue;
    if (a === '追' && hasRunItem) continue;
    if (a === '睡' && hasBed) continue;
    if (a === '爬' && hasRaise) continue; // 角色举手示意爬
    if (a === '飞' && itemKinds.has('aeroplane')) continue;
    // 跳暂无专属画面机制
    gaps.push(a);
  }
  if (gaps.length === 0) continue;

  const sceneNote = SCRIPT_SCENES[id] ? '分场' : '';
  rows++;
  console.log(`L${id} [${script.type}${sceneNote}] bg=${script.bg} 动作: ${actions.join('/')} → 缺: ${gaps.join('/')} | 现有物品: ${items.map((e) => e.item).join(',') || '无'}`);
}
console.log(`\n共 ${rows} 门课存在动作表现缺口`);
