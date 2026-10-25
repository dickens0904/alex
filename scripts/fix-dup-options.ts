/**
 * 修复 generatedExercises.ts 中 41 道选项重复的阅读题。
 * 根因：课文含重复句时，genReadingTranslation 的干扰项池（otherTranslations）未去重，
 * 抽到同文本的两条译文 → 选项重复（其中 21 题连正确答案都重复出现）。
 * 修法：把每题 options 里的重复项（第二份起）替换为未使用过的候选——
 *   - 「正确翻译是」题：候选 = 本课 translation 去重集合中未使用的其他译文
 *   - 「出现在课文里 / 根据课文」题：候选 = 其他课段落句子（且不出现在本课 passage 中）
 * 运行：npx tsx scripts/fix-dup-options.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { exercisesMap } from '../src/data/lessons/generatedExercises';
import { completeLessons } from '../src/data/lessons/completeLessons';

const FILE = path.resolve(__dirname, '../src/data/lessons/generatedExercises.ts');

interface Fix {
  lid: number;
  question: string;
  oldOptions: string[];
  newOptions: string[];
}

const lessons = completeLessons as unknown as Array<{
  id: number;
  content: { text?: { paragraphs?: Array<{ content: string }>; translation?: string[] } };
}>;

// ---- 1. 找出全部重复选项题并计算修复 ----
const fixes: Fix[] = [];
const scan: string[] = [];
for (const [lidStr, exs] of Object.entries(exercisesMap as any)) {
  const lid = Number(lidStr);
  for (const e of exs as any[]) {
    const opts: string[] | undefined = e?.content?.options;
    if (!Array.isArray(opts) || !opts.length) continue;
    const norm = opts.map((o) => String(o).trim());
    if (new Set(norm).size === norm.length) continue;

    const question = String(e.content.question ?? '');
    const answer = String(e.answer).trim();
    const passage = String(e.content.passage ?? '');
    const newOptions = [...opts];
    const isTranslation = question.includes('正确翻译');

    // 逐槽替换：每个值的第 2 份起都要换掉；候选动态排除 newOptions 里已有的所有值
    let guard = 0;
    while (guard++ < 20) {
      const seen = new Map<string, number>();
      let dupSlot = -1;
      let dupVal = '';
      for (let i = 0; i < newOptions.length; i++) {
        const k = newOptions[i].trim();
        const n = seen.get(k) ?? 0;
        if (n >= 1) { dupSlot = i; dupVal = k; break; }
        seen.set(k, n + 1);
      }
      if (dupSlot === -1) break; // 无重复，完成

      const pool: string[] = [];
      const used = new Set(newOptions.map((o) => o.trim()));
      const addPool = (arr: string[]) => {
        for (const t of arr) {
          const k = String(t).trim();
          if (k && !used.has(k) && !pool.includes(k)) pool.push(k);
        }
      };
      const lesson = lessons.find((l) => l.id === lid);
      if (isTranslation) {
        addPool(lesson?.content?.text?.translation ?? []);
        // 兜底：本课译文池不够时从相邻课补
        for (const l of lessons) {
          if (Math.abs(l.id - lid) > 2 || l.id === lid) continue;
          addPool(l.content?.text?.translation ?? []);
        }
      } else {
        const passageLower = passage.toLowerCase();
        for (const l of lessons) {
          if (l.id === lid) continue;
          for (const p of l.content?.text?.paragraphs ?? []) {
            const s = String(p.content).trim();
            // 干扰项不能出现在本课课文里（否则成送分双答案）
            if (passageLower && passageLower.includes(s.toLowerCase())) continue;
            addPool([s]);
          }
        }
      }
      if (pool.length === 0) {
        scan.push(`!! L${lid} 无可用候选：${question}（重复值：${dupVal}）`);
        break;
      }
      newOptions[dupSlot] = pool[Math.floor(Math.random() * pool.length)];
    }
    // 校验新数组：无重复、含答案、长度不变
    const check = newOptions.map((o) => o.trim());
    if (new Set(check).size !== check.length || !check.includes(answer)) {
      scan.push(`!! L${lid} 修复后仍异常：${question} ${JSON.stringify(newOptions)}`);
      continue;
    }
    fixes.push({ lid, question, oldOptions: opts, newOptions });
  }
}
console.log(`待修复题数: ${fixes.length}`);
if (scan.length) { console.log(scan.join('\n')); process.exit(1); }

// ---- 2. 逐题替换源文件行（按 question + 旧 options 双重匹配，一题一行） ----
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const fmt = (arr: string[]) => `[${arr.map((o) => `'${esc(o)}'`).join(', ')}]`;

let text = fs.readFileSync(FILE, 'utf8');
const lines = text.split('\n');
let applied = 0;
for (const fix of fixes) {
  const qMark = `question: '${fix.question.replace(/'/g, "\\'")}'`;
  const oldArr = fmt(fix.oldOptions);
  const newArr = fmt(fix.newOptions);
  const idx = lines.findIndex((ln) => ln.includes(qMark) && ln.includes(oldArr));
  if (idx === -1) {
    console.error(`!! 找不到目标行：L${fix.lid} ${fix.question}`);
    process.exit(1);
  }
  lines[idx] = lines[idx].replace(oldArr, newArr);
  applied++;
}
text = lines.join('\n');
fs.writeFileSync(FILE, text, 'utf8');
console.log(`已替换 ${applied} 行 → ${FILE}`);
