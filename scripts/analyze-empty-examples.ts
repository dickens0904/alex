/**
 * 统计全库无例句单词，并测试从课文自动匹配例句的覆盖率
 * 只读分析，不修改数据。输出：
 *  - 各类统计
 *  - 本课可自动匹配的词条
 *  - 无法从课文匹配的词清单（需人工造句）
 */
import { completeLessons } from '../src/data/lessons/completeLessons';

interface VocabItem {
  word: string;
  phonetic: string;
  meaning: string;
  examples: string[];
}

const lessons = completeLessons as unknown as Array<Record<string, any>>;

// 全库句子池（按课程分组，供跨课检索）
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
  // 词边界匹配（允许句末标点/复数/常见词尾变化不算——严格匹配原形，保证例句里真的有这个词）
  const re = new RegExp(`(^|[^A-Za-z])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`, 'i');
  return re.test(sentence);
}

let totalVocab = 0;
let totalEmpty = 0;
const autoMatchable: Array<{ lesson: number; word: string; meaning: string; example: string; source: string }> = [];
const noMatch: Array<{ lesson: number; word: string; meaning: string }> = [];

for (const l of lessons) {
  const id = Number(l.id);
  const vocab: VocabItem[] = l?.content?.vocabulary ?? [];
  for (const v of vocab) {
    totalVocab++;
    if (v.examples && v.examples.length > 0) continue;
    totalEmpty++;

    const word = (v.word || '').toLowerCase().trim();
    // 优先本课句子 → 本课段落 → 前5课 → 后2课（复习课常回看）
    const searchOrder: Array<[number, string]> = [];
    for (const s of lessonSentences.get(id) ?? []) searchOrder.push([id, s]);
    for (let d = 1; d <= 5; d++) {
      for (const s of lessonSentences.get(id - d) ?? []) searchOrder.push([id - d, s]);
    }
    for (let d = 1; d <= 2; d++) {
      for (const s of lessonSentences.get(id + d) ?? []) searchOrder.push([id + d, s]);
    }

    let matched: { example: string; source: string } | null = null;
    for (const [srcId, s] of searchOrder) {
      if (s.length < 8 || s.length > 120) continue;
      if (containsWord(s, word)) {
        matched = { example: s.trim(), source: `lesson-${srcId}` };
        break;
      }
    }

    if (matched) {
      autoMatchable.push({ lesson: id, word: v.word, meaning: v.meaning, example: matched.example, source: matched.source });
    } else {
      noMatch.push({ lesson: id, word: v.word, meaning: v.meaning });
    }
  }
}

console.log(`总词条: ${totalVocab}`);
console.log(`无例句词条: ${totalEmpty}`);
console.log(`本课/邻近课可自动匹配例句: ${autoMatchable.length}`);
console.log(`无法自动匹配（需造句）: ${noMatch.length}`);
console.log('');

console.log('=== 无法自动匹配的词清单 ===');
for (const item of noMatch) {
  console.log(`L${item.lesson}\t${item.word}\t${item.meaning}`);
}
console.log('');
console.log('=== 可自动匹配样例（前30） ===');
for (const item of autoMatchable.slice(0, 30)) {
  console.log(`L${item.lesson} ${item.word} ← [${item.source}] ${item.example}`);
}
