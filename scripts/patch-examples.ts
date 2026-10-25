/**
 * 补全 completeLessons.ts 中无例句的单词
 * 策略：
 *   1. 优先从本课/邻近课文自动匹配包含该词的原句（最真实）
 *   2. 匹配不到的用 scripts/example-sentences.ts 手工字典兜底
 *   3. 按课区间精确定位词条块，替换 examples: [] → examples: ['...']
 *   4. 写回前备份 .bak；输出未覆盖词清单
 *
 * 用法：npx tsx scripts/patch-examples.ts
 */
import fs from 'fs';
import path from 'path';
import { completeLessons } from '../src/data/lessons/completeLessons';
import { MANUAL_EXAMPLES } from './example-sentences';

const FILE = path.resolve(__dirname, '../src/data/lessons/completeLessons.ts');

interface VocabItem {
  word: string;
  phonetic: string;
  meaning: string;
  examples: string[];
}

const lessons = completeLessons as unknown as Array<Record<string, any>>;

// ==================== 1. 构建课文句子池 ====================
const lessonSentences = new Map<number, string[]>();
for (const l of lessons) {
  const id = Number(l.id);
  const sents: string[] = [];
  for (const s of l?.content?.sentences ?? []) {
    if (s?.english) sents.push(s.english);
  }
  for (const p of l?.content?.text?.paragraphs ?? []) {
    if (p?.content) sents.push(p.content);
  }
  lessonSentences.set(id, sents);
}

function containsWord(sentence: string, word: string): boolean {
  const re = new RegExp(`(^|[^A-Za-z])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`, 'i');
  return re.test(sentence);
}

/** 宽松验证：例句（去标点小写）包含词干（去标点小写） */
function normalizedIncludes(example: string, word: string): boolean {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return norm(example).includes(norm(word));
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeTs(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// ==================== 2. 找到每课在文件中的区间 ====================
const text = fs.readFileSync(FILE, 'utf-8');

const idPos: Array<{ id: number; pos: number }> = [];
const idRe = /^ {4}id: (\d+),$/gm;
let m: RegExpExecArray | null;
while ((m = idRe.exec(text)) !== null) {
  idPos.push({ id: parseInt(m[1], 10), pos: m.index });
}
if (idPos.length !== lessons.length) {
  console.error(`❌ 课区间定位失败：正则找到 ${idPos.length} 个 id 标记，课程数 ${lessons.length}`);
  process.exit(1);
}
const lessonRange = new Map<number, { start: number; end: number }>();
for (let i = 0; i < idPos.length; i++) {
  const start = idPos[i].pos;
  const end = i + 1 < idPos.length ? idPos[i + 1].pos : text.length;
  lessonRange.set(idPos[i].id, { start, end });
}

// ==================== 3. 逐课替换空例句 ====================
let patched = 0;
let autoCount = 0;
let manualCount = 0;
const missing: Array<{ lesson: number; word: string; meaning: string }> = [];
const badExamples: string[] = [];

// 从后往前替换，避免偏移失效
const sortedIds = [...lessonRange.keys()].sort((a, b) => b - a);
const newTextParts: Array<{ start: number; end: number; text: string }> = [];

for (const lessonId of sortedIds) {
  const lesson = lessons.find((l) => Number(l.id) === lessonId);
  const vocab: VocabItem[] = lesson?.content?.vocabulary ?? [];
  const emptyItems = vocab.filter((v) => !v.examples || v.examples.length === 0);
  if (emptyItems.length === 0) continue;

  const range = lessonRange.get(lessonId)!;
  let segment = text.slice(range.start, range.end);

  for (const v of emptyItems) {
    const word = (v.word || '').trim();
    if (!word) continue;

    // a) 课文自动匹配（本课 → 前5课 → 后2课）
    const searchOrder: Array<[number, string]> = [];
    for (const s of lessonSentences.get(lessonId) ?? []) searchOrder.push([lessonId, s]);
    for (let d = 1; d <= 5; d++) {
      for (const s of lessonSentences.get(lessonId - d) ?? []) searchOrder.push([lessonId - d, s]);
    }
    for (let d = 1; d <= 2; d++) {
      for (const s of lessonSentences.get(lessonId + d) ?? []) searchOrder.push([lessonId + d, s]);
    }

    let example: string | null = null;
    for (const [srcId, s] of searchOrder) {
      if (s.length < 8 || s.length > 120) continue;
      if (containsWord(s, word)) {
        example = s.trim();
        if (srcId !== lessonId) break; // 本课原句最优先，跨课也接受
        break;
      }
    }
    let source = 'auto';
    if (!example) {
      // b) 手工字典
      const manual = MANUAL_EXAMPLES[`${lessonId}:${word.toLowerCase()}`];
      if (manual) {
        example = manual;
        source = 'manual';
      }
    }

    if (!example) {
      missing.push({ lesson: lessonId, word, meaning: v.meaning });
      continue;
    }

    // c) 验证例句确实包含词干
    if (!normalizedIncludes(example, word)) {
      badExamples.push(`L${lessonId} "${word}" ← 例句未包含词干: ${example}`);
      continue;
    }

    // d) 区间内正则替换该词条的 examples: []
    const entryRe = new RegExp(
      `(word: '${escapeRe(word)}',\\s*\\n\\s*phonetic: '[^']*',\\s*\\n\\s*meaning: '[^']*',\\s*\\n\\s*)examples: \\[\\],`
    );
    if (!entryRe.test(segment)) {
      missing.push({ lesson: lessonId, word, meaning: v.meaning + ' [正则未命中]' });
      continue;
    }
    segment = segment.replace(entryRe, `$1examples: ['${escapeTs(example)}'],`);
    patched++;
    if (source === 'auto') autoCount++;
    else manualCount++;
  }

  newTextParts.push({ start: range.start, end: range.end, text: segment });
}

// ==================== 4. 写回 ====================
if (missing.length === 0 && badExamples.length === 0 && patched > 0) {
  // 从后往前拼接
  const parts = [...newTextParts].sort((a, b) => b.start - a.start);
  let output = text;
  for (const part of parts) {
    output = output.slice(0, part.start) + part.text + output.slice(part.end);
  }

  const backup = FILE + '.bak';
  fs.copyFileSync(FILE, backup);
  fs.writeFileSync(FILE, output, 'utf-8');
  console.log(`✅ 补全 ${patched} 个词条例句（课文自动匹配 ${autoCount}，手工字典 ${manualCount}）`);
  console.log(`💾 备份: ${backup}`);
} else {
  console.log(`⚠️  未写回（存在未解决问题）：`);
}
console.log(`\n统计: 补全 ${patched}（自动 ${autoCount} + 字典 ${manualCount}），未覆盖 ${missing.length}，验证失败 ${badExamples.length}`);

if (badExamples.length > 0) {
  console.log('\n=== 例句验证失败 ===');
  for (const line of badExamples) console.log(line);
}
if (missing.length > 0) {
  console.log('\n=== 未覆盖词条 ===');
  for (const item of missing) console.log(`L${item.lesson}\t${item.word}\t${item.meaning}`);
}

// ==================== 5. 复核：重新统计剩余空例句 ====================
let remainEmpty = 0;
const mod = require('../src/data/lessons/completeLessons');
// require 缓存了旧数据，改用文本粗略统计
const emptyCount = (output: string) => (output.match(/examples: \[\],/g) || []).length;
console.log(`\n文本中剩余 "examples: []" 块数量: ${missing.length === 0 && patched > 0 ? emptyCount(fs.readFileSync(FILE, 'utf-8')) : emptyCount(text)}`);
void mod; void remainEmpty;
