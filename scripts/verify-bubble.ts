/** 全量验证：1622 句全部跑 layoutBubble，断言气泡永不超界（与 TheaterStage 渲染同一函数） */
import { completeLessons } from '../src/data/lessons/completeLessons';
import { layoutBubble, BUBBLE_MAX_W } from '../src/components/theater/bubbleLayout';

let total = 0;
let violations: string[] = [];
let maxBh = 0;
let maxLines = 0;
const worst: Array<string> = [];

for (const lesson of completeLessons) {
  for (const p of lesson.content.text.paragraphs) {
    const text = (p.content || '').trim();
    if (!text) continue;
    total++;
    const narr = !p.speaker?.trim(); // 剧场里旁白/展示台句的 narr 判定（castKey=N 才 narr，此处近似按 speaker 空）
    // drill 课空段落实际 castKey 不是 N → 非 narr；narrative 课空段落 castKey=N → narr
    // 两种都验，取更严格（尺寸更大的非 narr 序列）
    for (const mode of [false, true] as const) {
      const lay = layoutBubble(text, { narr: mode });
      const bw = lay.bw;
      const bx = Math.min(Math.max(800 - bw / 2, 40), 1560 - bw); // 最坏站位 x=800 居中
      const by = mode ? 60 : Math.max(36, 248 - lay.bh);
      const bottom = by + lay.bh;
      if (bw > BUBBLE_MAX_W) violations.push(`L${lesson.id} bw=${bw} 超宽上限`);
      if (bx < 39.9) violations.push(`L${lesson.id} bx=${bx} 越左界`);
      if (bx + bw > 1560.1) violations.push(`L${lesson.id} 右越界 ${bx + bw}`);
      if (by < 35.9) violations.push(`L${lesson.id} by=${by} 越顶`);
      if (bottom > 390.1) violations.push(`L${lesson.id} 底部 ${bottom} 越界`);
      if (lay.lines.length > 5) violations.push(`L${lesson.id} ${lay.lines.length} 行超限`);
      if (!mode) {
        maxBh = Math.max(maxBh, lay.bh);
        maxLines = Math.max(maxLines, lay.lines.length);
        if (text.length > 95) {
          worst.push(
            `L${lesson.id} [${text.length}字符] ${lay.lines.length}行 fs=${lay.fontSize} bw=${bw} bh=${lay.bh} by=${by} 底=${bottom}`
          );
        }
      }
    }
  }
}

console.log(`验证句数: ${total}（每句验 对白+旁白 两种形态）`);
console.log(`对白形态最坏: bh=${maxBh}px, ${maxLines} 行`);
console.log(`违规: ${violations.length}`);
for (const v of violations.slice(0, 20)) console.log('  ✗ ' + v);
console.log(`\n>95 字符长句的布局（对白形态）:`);
for (const w of worst) console.log('  ' + w);
if (violations.length === 0) console.log('\n✅ 全部句子气泡在舞台界内');
