/** 道具编排校验：perLine 长度=句数、item/owner key 合法、owner ∈ cast */
import { LESSON_SCRIPTS, parseScriptLines } from '../src/data/theater/theaterScripts';
import { completeLessons } from '../src/data/lessons/completeLessons';
import { getStageConfig, SCRIPT_PROPS } from '../src/components/theater/scenes';

const KINDS = new Set([
  'bag', 'vase', 'umbrella', 'book', 'envelope', 'card', 'suitcase', 'pen', 'pencil',
  'watch', 'glasses', 'icecream', 'hammer', 'cup', 'key', 'newspaper', 'photo', 'shirt', 'hat',
]);
let bad = 0;
for (const [idStr] of Object.entries(SCRIPT_PROPS)) {
  const id = Number(idStr);
  const script = LESSON_SCRIPTS[id];
  const lineCount = parseScriptLines(script.lines).length;
  const paraCount = completeLessons.find((l) => l.id === id)?.content.text.paragraphs.length ?? 0;
  const castKeys = new Set(script.cast.map((c) => c[0]));
  const cfg = getStageConfig(id);
  if (!cfg?.prop) { console.log(`✗ L${id} 无 prop`); bad++; continue; }
  if (cfg.prop.perLine.length !== paraCount) { console.log(`✗ L${id} perLine=${cfg.prop.perLine.length} ≠ 课文句数 ${paraCount}`); bad++; }
  cfg.prop.perLine.forEach((e, i) => {
    if (!e) return;
    if (!KINDS.has(e.item)) { console.log(`✗ L${id} 句${i} item "${e.item}" 非法`); bad++; }
    if (!castKeys.has(e.owner ?? '')) { console.log(`✗ L${id} 句${i} owner "${e.owner}" ∉ cast`); bad++; }
  });
  console.log(`L${id}: ✓`);
}
console.log(bad === 0 ? '✅ 道具编排全部合法' : `❌ ${bad} 处问题`);
