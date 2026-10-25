/** 导出缺口课逐句台词（编排参考） */
import { completeLessons } from '../src/data/lessons/completeLessons';
import * as fs from 'fs';

const ids = [3,12,13,14,15,23,24,26,28,29,30,31,32,34,35,38,39,40,41,42,43,44,45,46,47,48,49,55,56,57,58,59,61,63,64,65,66,69,71,73,74,75,76,79,80,81,82,83,87,89,93,95,101,108,109,110,111,112,114,115,118,119,120,121,122,123,124,125,126,127,128,130,131,133,136,137,138,139,141,142,143];
const out: string[] = [];
for (const id of ids) {
  const l = completeLessons.find((x) => x.id === id);
  if (!l) continue;
  out.push(`=== L${id} ===`);
  (l.content.text.paragraphs as Array<{ speaker: string; content: string }>).forEach((p, i) => {
    out.push(`${i} [${p.speaker}] ${p.content}`);
  });
}
fs.writeFileSync('I:/Temp/lesson-lines.txt', out.join('\n'), 'utf-8');
console.log('已写出', ids.length, '门课台词,', out.length, '行');
