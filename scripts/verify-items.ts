/**
 * 舞台留存物品布局校验：
 *   1. 触发句 line < 课文句数
 *   2. 地面物品不与人物身体（站位±115）重叠
 *   3. 同一 y 层带（地面/墙面）内物品互不重叠
 * 墙面物品（y<700）不参与人物碰撞判定（挂在背景墙上）。
 */
import { LESSON_SCRIPTS, SCRIPT_STAGE_ITEMS, parseScriptLines } from '../src/data/theater/theaterScripts';
import { NORMALIZE } from '../src/components/theater/props';

/** 各物品局部坐标下的宽度（与 props.tsx renderFloorItem 一致，已乘 NORMALIZE 归一系数） */
const RAW_W: Record<string, number> = {
  box: 104, shoes: 64, window: 192, door: 128, teapot: 84, bookcase: 110, book: 80,
  clock: 96, table: 160, desk: 140, chair: 70, armchair: 100, bed: 190, wardrobe: 110,
  cupboard: 100, television: 110, radio: 90, lamp: 64, stereo: 100, fridge: 70,
  milk: 44, beer: 36, wine: 38, bottle: 42, tea: 68, coffee: 38, kettle: 78, glass: 30,
  plate: 84, dish: 84, bread: 84, cake: 88, chocolate: 64, biscuit: 42, cheese: 72,
  jam: 42, butter: 60, sugar: 52, apple: 48, letter: 60, ticket: 68, passport: 42,
  money: 84, coat: 48, blouse: 34, dog: 92, cat: 62, bird: 50, car: 220, train: 220,
  ship: 236, flower: 42, soap: 64, tie: 28, cup: 38, pencil: 14, hammer: 60,
  suitcase: 72, hat: 80, shirt: 56, bag: 48, photo: 64, newspaper: 68,
  swimmer: 102, aeroplane: 100, sleeping: 190, basin: 68,
};
const W: Record<string, number> = Object.fromEntries(
  Object.entries(RAW_W).map(([k, w]) => [k, w * (NORMALIZE[k] ?? 1)]),
);

function seats(count: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [800];
  if (count === 2) return [560, 1060];
  if (count === 3) return [400, 800, 1200];
  return [330, 620, 980, 1270];
}

let bad = 0;
for (const [idStr, entries] of Object.entries(SCRIPT_STAGE_ITEMS)) {
  const id = Number(idStr);
  const script = LESSON_SCRIPTS[id];
  if (!script) { console.log(`✗ L${id} 无剧本`); bad++; continue; }
  const lineCount = parseScriptLines(script.lines).length;
  const actorXs = seats(script.cast.length);

  for (const e of entries) {
    if (e.line >= lineCount) { console.log(`✗ L${id} 句${e.line} 超出句数 ${lineCount} (${e.item})`); bad++; }
    if (!W[e.item]) { console.log(`✗ L${id} 未知物品宽度 ${e.item}`); bad++; continue; }
    const halfW = (W[e.item] * e.size) / 200;
    // 人物碰撞（仅地面物品）
    if (e.y >= 700) {
      for (const ax of actorXs) {
        if (Math.abs(e.x - ax) < 115 + halfW - 20) {
          console.log(`⚠ L${id} ${e.item}@${e.x} 与人物@${ax} 距离 ${Math.abs(e.x - ax)} < 半宽 ${Math.round(halfW)}+115`);
        }
      }
    }
    // 物品-物品同层重叠（同 x 且上下堆叠的有意组合豁免：杯在桌上、书在收音机上）
    for (const o of entries) {
      if (o === e) continue;
      if (!W[o.item]) continue;
      if (Math.abs(e.x - o.x) < 12 && e.y !== o.y) continue; // 堆叠组合
      if (Math.abs(e.y - o.y) >= 25) continue;               // 前后两排（深度错位）
      const sameBand = e.y >= 700 === o.y >= 700;
      if (!sameBand) continue;
      const halfO = (W[o.item] * o.size) / 200;
      const dist = Math.abs(e.x - o.x);
      if (dist < halfW + halfO - 8 && e.line !== o.line) {
        console.log(`⚠ L${id} ${e.item}@${e.x} 与 ${o.item}@${o.x} 重叠（间距 ${dist} < ${Math.round(halfW + halfO)}）`);
      } else if (dist < halfW + halfO - 8 && e.line === o.line) {
        console.log(`⚠ L${id} ${e.item}@${e.x} 与 ${o.item}@${o.line}句 ${o.item}@${o.x} 同句重叠（间距 ${dist} < ${Math.round(halfW + halfO)}）`);
      }
    }
  }
  console.log(`L${id}: ${entries.length} 件 ✓`);
}
console.log(bad === 0 ? '✅ 舞台物品布局校验完成（⚠ 为建议项）' : `❌ ${bad} 处硬错误`);
