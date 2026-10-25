/**
 * 课文数据完整性审计（只读，不修改数据）
 * 检查项：
 *  1) text.paragraphs 与 text.translation 数量对齐（英文丢句/译文丢句）
 *  2) content.sentences 与 text.paragraphs 句子集合互差（丢句检测第二视角）
 *  3) 基础字段完整性（空内容、vocabulary/音标缺失）
 * 运行：npx tsx scripts/audit-lessons.ts
 */
import { completeLessons } from '../src/data/lessons/completeLessons';

/** 归一化：小写、统一撇号、去标点、压空格（仅用于比对） */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[^a-z0-9' ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 多重集合差：a 中有而 b 中没有的元素 */
function multisetDiff(a: string[], b: string[]): string[] {
  const count = new Map<string, number>();
  for (const x of b) count.set(x, (count.get(x) ?? 0) + 1);
  const diff: string[] = [];
  for (const x of a) {
    const c = count.get(x) ?? 0;
    if (c > 0) count.set(x, c - 1);
    else diff.push(x);
  }
  return diff;
}

let problemLessons = 0;
for (const lesson of completeLessons) {
  const problems: string[] = [];
  const text = lesson.content?.text;
  const paragraphs = text?.paragraphs ?? [];
  const translation = text?.translation ?? [];
  const sentences = lesson.content?.sentences ?? [];
  const vocab = lesson.content?.vocabulary ?? [];

  if (!text || paragraphs.length === 0) {
    problems.push('text/paragraphs 缺失');
  } else if (paragraphs.length !== translation.length) {
    const diff = Math.abs(paragraphs.length - translation.length);
    problems.push(
      `课文 ${paragraphs.length} 句 ≠ 译文 ${translation.length} 句（英文${paragraphs.length < translation.length ? '缺' : '多'}${diff}句）`
    );
  }

  paragraphs.forEach((p, i) => {
    if (!p.content?.trim()) problems.push(`paragraphs[${i}] 内容为空`);
  });
  translation.forEach((t, i) => {
    if (!t?.trim()) problems.push(`translation[${i}] 内容为空`);
  });

  const paraNorm = paragraphs.map((p) => norm(p.content)).filter(Boolean);
  const sentNorm = sentences.map((s) => norm(s.english)).filter(Boolean);
  const onlyInPara = multisetDiff(paraNorm, sentNorm);
  const onlyInSent = multisetDiff(sentNorm, paraNorm);
  if (onlyInPara.length) {
    problems.push(`课文有而逐句分析缺 ${onlyInPara.length} 句: ${onlyInPara.slice(0, 3).join(' | ')}`);
  }
  if (onlyInSent.length) {
    problems.push(`逐句分析有而课文缺 ${onlyInSent.length} 句: ${onlyInSent.slice(0, 3).join(' | ')}`);
  }

  if (vocab.length === 0) problems.push('vocabulary 为空');
  const noPhonetic = vocab.filter((v) => !v.phonetic?.trim()).length;
  if (noPhonetic) problems.push(`${noPhonetic} 个单词缺音标`);
  const noMeaning = vocab.filter((v) => !v.meaning?.trim()).length;
  if (noMeaning) problems.push(`${noMeaning} 个单词缺释义`);

  if (problems.length) {
    problemLessons++;
    console.log(`\n=== Lesson ${lesson.id}: ${lesson.title} ===`);
    for (const p of problems) console.log('  - ' + p);
  }
}

console.log(`\n审计完成：${problemLessons} 课存在问题 / 共 ${completeLessons.length} 课`);
