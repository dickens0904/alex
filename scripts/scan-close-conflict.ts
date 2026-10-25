/** 扫描 close 场覆盖物品出现句的冲突 */
import { SCRIPT_SCENES, SCRIPT_STAGE_ITEMS } from '../src/data/theater/theaterScripts';

let found = 0;
for (const [id, scenes] of Object.entries(SCRIPT_SCENES)) {
  const items = SCRIPT_STAGE_ITEMS[Number(id)];
  if (!items) continue;
  for (const s of scenes) {
    if (s.shot !== 'close') continue;
    // close 场从 from 持续到下一场/课尾：凡物品触发句 >= from 且不在更晚的 wide/medium 场内 → 冲突
    const nextSceneFrom = scenes.filter((x) => x.from > s.from).reduce((m, x) => Math.min(m, x.from), Infinity);
    const hidden = items.filter((e) => e.line >= s.from && e.line < nextSceneFrom);
    if (hidden.length > 0) {
      console.log(`L${id} close 从句 ${s.from} 起裁掉物品: ${hidden.map((e) => `${e.item}@句${e.line}`).join(' ')}`);
      found++;
    }
  }
}
console.log(found === 0 ? '无冲突' : `共 ${found} 门冲突`);
