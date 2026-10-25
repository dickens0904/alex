/** 临时工具：导出需人工核查的课文段落+译文，供修复参考 */
import { writeFileSync } from 'fs';
import { completeLessons } from '../src/data/lessons/completeLessons';

const ids = [3, 6, 8, 35, 38, 43, 45, 51, 61, 67, 71, 80, 82, 89, 91, 95, 99, 102, 106, 143];
const out = completeLessons
  .filter((l) => ids.includes(l.id))
  .map((l) => ({
    id: l.id,
    title: l.title,
    paragraphs: l.content?.text?.paragraphs ?? [],
    translation: l.content?.text?.translation ?? [],
  }));
writeFileSync('I:/Temp/lesson-dump.json', JSON.stringify(out, null, 1), 'utf8');
console.log('dumped', out.length, 'lessons');
