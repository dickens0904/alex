/**
 * 练习题自动生成脚本（优化版）
 *
 * 优化点：
 * 1. 难度递进 - 根据课程阶段调整题目难度和数量
 * 2. 跨课复习 - 复习课可包含前面课程的单词
 * 3. 增加阅读题 - 长课文提供2-3道阅读理解
 * 4. 改进干扰项 - 本课单词不够时从前几课补充
 * 5. 口语题难度递进 - 早期短句，后期长句
 *
 * 输出: src/data/lessons/generatedExercises.ts
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// ==================== 1. 读取并解析课程数据 ====================

const dataDir = path.resolve(__dirname, '../src/data/lessons');
const inputPath = path.join(dataDir, 'completeLessons.ts');
const outputPath = path.join(dataDir, 'generatedExercises.ts');

console.log('📖 读取课程数据:', inputPath);
const fileContent = fs.readFileSync(inputPath, 'utf-8');

const startMarker = fileContent.indexOf('completeLessons');
const arrayStart = fileContent.indexOf('[', fileContent.indexOf('=', startMarker));
const arrayEnd = fileContent.lastIndexOf('];');

if (arrayStart === -1 || arrayEnd === -1) {
  console.error('❌ 无法解析 completeLessons.ts，请检查文件格式');
  process.exit(1);
}

const arrayBody = fileContent.substring(arrayStart + 1, arrayEnd);
const lessonsCode = '[' + arrayBody + ']';

function getIllustrationPath(lessonId) {
  return `/assets/images/lessons/lesson-${lessonId}.jpg`;
}

const sandbox = { getIllustrationPath, console };
vm.createContext(sandbox);

let lessons;
try {
  lessons = vm.runInContext(lessonsCode, sandbox);
} catch (e) {
  console.error('❌ 解析课程数据失败:', e.message);
  let fixedCode = lessonsCode
    .replace(/,\s*]/g, ']')
    .replace(/,\s*}/g, '}');
  try {
    lessons = vm.runInContext(fixedCode, sandbox);
  } catch (e2) {
    console.error('❌ 二次解析也失败:', e2.message);
    process.exit(1);
  }
}

console.log(`✅ 成功加载 ${lessons.length} 课数据\n`);

// ==================== 2. 工具函数 ====================

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function escapeStr(s) {
  if (typeof s !== 'string') return s;
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ==================== 3. 难度配置 ====================

/**
 * 根据课程ID获取难度等级
 * Level 1: 1-36（初级）- 简单词汇、短句
 * Level 2: 37-72（中级）- 中等词汇、中等句子
 * Level 3: 73-120（中高级）- 较长句子、复杂语法
 * Level 4: 121-144（高级）- 长句、复杂课文
 */
function getDifficultyLevel(lessonId) {
  if (lessonId <= 36) return 1;
  if (lessonId <= 72) return 2;
  if (lessonId <= 120) return 3;
  return 4;
}

/**
 * 根据难度等级获取每种题型的题目数量
 */
function getExerciseCounts(lessonId, lessonType) {
  const level = getDifficultyLevel(lessonId);

  if (lessonType === 'new') {
    // 新课题目数量随难度递增
    switch (level) {
      case 1: return { listening: 2, speaking: 2, spelling: 2, writing: 2, reading: 1 };
      case 2: return { listening: 3, speaking: 2, spelling: 2, writing: 2, reading: 2 };
      case 3: return { listening: 3, speaking: 3, spelling: 2, writing: 3, reading: 2 };
      case 4: return { listening: 3, speaking: 3, spelling: 3, writing: 3, reading: 3 };
    }
  } else {
    // 复习课：更多跨课复习题
    switch (level) {
      case 1: return { listening: 2, speaking: 2, spelling: 2, writing: 2, reading: 1 };
      case 2: return { listening: 3, speaking: 2, spelling: 2, writing: 3, reading: 1 };
      case 3: return { listening: 3, speaking: 2, spelling: 2, writing: 3, reading: 2 };
      case 4: return { listening: 4, speaking: 2, spelling: 2, writing: 3, reading: 2 };
    }
  }

  return { listening: 2, speaking: 2, spelling: 2, writing: 2, reading: 1 };
}

/**
 * 获取跨课词汇池（用于干扰项和复习题）
 * 选取当前课之前的所有课程的单词
 */
function getCrossLessonVocab(lessonId, allLessons) {
  const vocabPool = [];
  const currentLesson = allLessons.find(l => l.id === lessonId);

  // 从前10课中收集词汇
  const startId = Math.max(1, lessonId - 10);
  for (let i = startId; i < lessonId; i++) {
    const prevLesson = allLessons.find(l => l.id === i);
    if (prevLesson && prevLesson.content.vocabulary) {
      vocabPool.push(...prevLesson.content.vocabulary);
    }
  }

  // 去重（按单词）
  const seen = new Set();
  if (currentLesson && currentLesson.content.vocabulary) {
    currentLesson.content.vocabulary.forEach(v => seen.add(v.word.toLowerCase()));
  }

  return vocabPool.filter(v => {
    if (seen.has(v.word.toLowerCase())) return false;
    seen.add(v.word.toLowerCase());
    return true;
  });
}

// ==================== 4. 练习题生成器 ====================

/**
 * 生成听力选择题
 * 优化：干扰项优先来自本课，不够时从前几课补充
 */
function generateListeningExercises(lesson, allLessons, count) {
  const vocab = lesson.content.vocabulary;
  if (!vocab || vocab.length < 2) return [];

  const exercises = [];
  const singleWords = vocab.filter((v) => !v.word.includes(' '));
  const pool = singleWords.length >= count ? singleWords : vocab;
  const selected = pickRandom(pool, Math.min(count, pool.length));

  // 收集干扰项来源：本课 + 前几课
  const crossVocab = getCrossLessonVocab(lesson.id, allLessons);
  const allMeanings = [
    ...vocab.map(v => v.meaning),
    ...crossVocab.map(v => v.meaning),
  ];
  const uniqueMeanings = [...new Set(allMeanings)];

  for (const vocabItem of selected) {
    const wrongMeanings = uniqueMeanings.filter(m => m !== vocabItem.meaning);

    if (wrongMeanings.length < 3) continue;

    const wrongAnswers = pickRandom(wrongMeanings, 3);
    const allOptions = shuffle([vocabItem.meaning, ...wrongAnswers]);

    exercises.push({
      type: 'listening',
      content: {
        question: `听录音，"${vocabItem.word}" 的意思是？`,
        audioText: vocabItem.word,
        options: allOptions,
      },
      answer: vocabItem.meaning,
      score: 10,
    });
  }

  return exercises;
}

/**
 * 生成口语跟读题
 * 优化：难度递进 - 早期选短句，后期可选长句
 */
function generateSpeakingExercises(lesson, count) {
  const sentences = lesson.content.sentences;
  if (!sentences || sentences.length === 0) return [];

  const level = getDifficultyLevel(lesson.id);

  // 根据难度筛选句子长度
  let filteredSentences;
  if (level <= 2) {
    // 早期：优先选短句（单词数 ≤ 8）
    filteredSentences = sentences.filter(s => s.english.split(/\s+/).length <= 8);
    if (filteredSentences.length < count) filteredSentences = sentences;
  } else {
    // 后期：可以选较长的句子
    filteredSentences = sentences;
  }

  const selected = pickRandom(filteredSentences, Math.min(count, filteredSentences.length));

  return selected.map((sent) => ({
    type: 'speaking',
    content: {
      instruction: `请大声朗读以下句子`,
      sentence: sent.english,
      translation: sent.chinese,
    },
    answer: sent.english,
    score: 10,
  }));
}

/**
 * 生成单词拼写题
 * 优化：早期选短单词，后期可选拼写较复杂的词
 */
function generateSpellingExercises(lesson, count) {
  const vocab = lesson.content.vocabulary;
  if (!vocab || vocab.length === 0) return [];

  const level = getDifficultyLevel(lesson.id);

  // 根据难度调整单词长度限制
  const maxWordLength = level <= 2 ? 8 : level <= 3 ? 10 : 12;

  const singleWords = vocab.filter((v) => !v.word.includes(' ') && v.word.length <= maxWordLength);
  const pool = singleWords.length >= count ? singleWords : vocab;
  const selected = pickRandom(pool, Math.min(count, pool.length));

  return selected.map((vocabItem) => ({
    type: 'spelling',
    content: {
      instruction: `根据提示拼写单词`,
      hint: vocabItem.phonetic,
      meaning: vocabItem.meaning,
      example: vocabItem.examples && vocabItem.examples.length > 0 ? vocabItem.examples[0] : '',
    },
    answer: vocabItem.word.toLowerCase(),
    score: 10,
  }));
}

/**
 * 生成阅读填空选择题
 * 优化：干扰项可来自跨课词汇
 */
function generateWritingExercises(lesson, allLessons, count) {
  const sentences = lesson.content.sentences;
  const vocab = lesson.content.vocabulary;
  if (!sentences || sentences.length === 0 || !vocab || vocab.length < 2) return [];

  const exercises = [];
  const singleWords = vocab.filter((v) => !v.word.includes(' ')).map((v) => v.word.toLowerCase());

  // 跨课词汇池（用于干扰项）
  const crossVocab = getCrossLessonVocab(lesson.id, allLessons);
  const crossWords = crossVocab.filter((v) => !v.word.includes(' ')).map((v) => v.word.toLowerCase());
  const allWords = [...new Set([...singleWords, ...crossWords])];

  const candidates = sentences.filter((s) => {
    const words = s.english.toLowerCase().split(/\s+/);
    return words.some((w) => singleWords.includes(w.replace(/[^a-z]/g, '')));
  });

  const selected = pickRandom(
    candidates.length >= count ? candidates : sentences,
    Math.min(count, sentences.length)
  );

  for (const sent of selected) {
    const wordsInSentence = sent.english.split(/\s+/);
    const blankCandidates = wordsInSentence.filter((w) => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      return singleWords.includes(clean) && clean.length > 2;
    });

    if (blankCandidates.length === 0) {
      const contentWords = wordsInSentence.filter((w) =>
        w.length > 3 &&
        !['this', 'that', 'these', 'those', 'with', 'from', 'have', 'has', 'been', 'were', 'will'].includes(w.toLowerCase())
      );
      if (contentWords.length === 0) continue;
      blankCandidates.push(pickOne(contentWords));
    }

    const blankWord = pickOne(blankCandidates);
    const cleanBlank = blankWord.toLowerCase().replace(/[^a-z]/g, '');
    const blankedSentence = sent.english.replace(blankWord, '______');

    // 干扰项：优先本课词汇，不够则补充跨课词汇
    let wrongWords = singleWords
      .filter((w) => w !== cleanBlank)
      .map((w) => capitalize(w));

    if (wrongWords.length < 3) {
      const extraWrong = crossWords
        .filter((w) => w !== cleanBlank && !singleWords.includes(w))
        .map((w) => capitalize(w));
      wrongWords = [...wrongWords, ...extraWrong];
    }

    const uniqueWrongWords = [...new Set(wrongWords)];
    if (uniqueWrongWords.length < 3) continue;

    const wrongOptions = pickRandom(uniqueWrongWords, 3);
    const correctDisplay = blankWord.length > 0 && blankWord[0] === blankWord[0].toUpperCase()
      ? capitalize(cleanBlank)
      : cleanBlank;
    const allOptions = shuffle([correctDisplay, ...wrongOptions]);

    exercises.push({
      type: 'writing',
      content: {
        question: `选择正确的单词填入空白处：`,
        sentence: blankedSentence,
        translation: sent.chinese,
        options: allOptions,
      },
      answer: correctDisplay,
      score: 10,
    });
  }

  return exercises;
}

/**
 * 生成阅读理解题
 * 优化：长课文可生成2-3道题，增加题型多样性
 */
function generateReadingExercises(lesson, count) {
  const text = lesson.content.text;
  if (!text || !text.paragraphs || text.paragraphs.length < 2) return [];

  const exercises = [];
  const paragraphs = text.paragraphs;
  const translations = text.translation || [];
  const level = getDifficultyLevel(lesson.id);

  // 类型1: 选择正确的翻译
  if (translations.length >= 4 && paragraphs.length >= 4) {
    const maxIdx = Math.min(paragraphs.length, translations.length);
    const selectedIndices = pickRandom(
      Array.from({ length: maxIdx }, (_, i) => i),
      Math.min(count, maxIdx)
    );

    for (const idx of selectedIndices) {
      const correctTranslation = translations[idx];
      const englishLine = paragraphs[idx].content;

      const otherTranslations = translations.filter((_, i) => i !== idx);
      if (otherTranslations.length < 3) continue;

      const wrongTranslations = pickRandom(otherTranslations, 3);
      const allOptions = shuffle([correctTranslation, ...wrongTranslations]);

      exercises.push({
        type: 'reading',
        content: {
          question: `"${englishLine}" 的正确翻译是？`,
          passage: text.title,
          options: allOptions,
        },
        answer: correctTranslation,
        score: 10,
      });

      if (exercises.length >= count) break;
    }
  }

  // 类型2: 根据课文内容回答问题（中高级）
  if (level >= 2 && exercises.length < count && paragraphs.length >= 3) {
    const p = pickOne(paragraphs.filter((pp) => pp.content && pp.content.length > 5));
    if (p) {
      const correctOption = p.content;
      const otherParagraphs = paragraphs.filter((pp) => pp.content !== correctOption && pp.content.length > 3);
      if (otherParagraphs.length >= 3) {
        const wrongOptions = pickRandom(otherParagraphs, 3).map((pp) => pp.content);
        const allOptions = shuffle([correctOption, ...wrongOptions]);

        const speakerLabel = p.speaker ? `${p.speaker}` : '文中';
        exercises.push({
          type: 'reading',
          content: {
            question: `根据课文，${speakerLabel} 说了什么？`,
            passage: text.paragraphs.map((pp) => (pp.speaker ? `${pp.speaker}: ${pp.content}` : pp.content)).join('\n'),
            options: allOptions,
          },
          answer: correctOption,
          score: 10,
        });
      }
    }
  }

  // 兜底：至少1道阅读题
  if (exercises.length === 0 && paragraphs.length >= 2 && translations.length >= 2) {
    const idx = 0;
    exercises.push({
      type: 'reading',
      content: {
        question: `课文中 "${paragraphs[idx].content}" 是什么意思？`,
        passage: text.title,
        options: shuffle([
          translations[idx],
          translations[Math.min(1, translations.length - 1)] !== translations[idx]
            ? translations[Math.min(1, translations.length - 1)]
            : '不正确的翻译A',
          translations.length > 2 ? translations[2] : '不正确的翻译B',
          '不正确的翻译C',
        ]),
      },
      answer: translations[idx],
      score: 10,
    });
  }

  return exercises.slice(0, count);
}

/**
 * 生成跨课复习题（仅复习课）
 * 从前面课程的单词中出听力和填空题
 */
function generateReviewExercises(lesson, allLessons, count) {
  const crossVocab = getCrossLessonVocab(lesson.id, allLessons);
  if (crossVocab.length < 4) return [];

  const exercises = [];
  const selected = pickRandom(crossVocab, Math.min(count, crossVocab.length));

  // 生成跨课听力题
  for (const vocabItem of selected) {
    const otherMeanings = crossVocab
      .filter((v) => v.word !== vocabItem.word)
      .map((v) => v.meaning);
    const uniqueOthers = [...new Set(otherMeanings)];

    if (uniqueOthers.length < 3) continue;

    const wrongAnswers = pickRandom(uniqueOthers, 3);
    const allOptions = shuffle([vocabItem.meaning, ...wrongAnswers]);

    exercises.push({
      type: 'listening',
      content: {
        question: `【复习】听录音，"${vocabItem.word}" 的意思是？`,
        audioText: vocabItem.word,
        options: allOptions,
      },
      answer: vocabItem.meaning,
      score: 10,
    });

    if (exercises.length >= count) break;
  }

  return exercises;
}

// ==================== 5. 主生成逻辑 ====================

console.log('🔧 开始生成练习题（优化版）...\n');

let totalExercises = 0;
const results = {};

for (const lesson of lessons) {
  const exercises = [];
  const counts = getExerciseCounts(lesson.id, lesson.type);

  // 生成各类型练习题
  exercises.push(...generateListeningExercises(lesson, lessons, counts.listening));
  exercises.push(...generateSpeakingExercises(lesson, counts.speaking));
  exercises.push(...generateSpellingExercises(lesson, counts.spelling));
  exercises.push(...generateWritingExercises(lesson, lessons, counts.writing));
  exercises.push(...generateReadingExercises(lesson, counts.reading));

  // 复习课额外添加跨课复习题
  if (lesson.type === 'review') {
    const reviewCount = Math.min(2, Math.floor(counts.listening / 2));
    exercises.push(...generateReviewExercises(lesson, lessons, reviewCount));
  }

  results[lesson.id] = exercises;
  totalExercises += exercises.length;

  // 日志输出
  if (lesson.id <= 5 || lesson.id % 20 === 0 || lesson.id === lessons.length) {
    const typeCount = {};
    exercises.forEach((e) => { typeCount[e.type] = (typeCount[e.type] || 0) + 1; });
    console.log(`  Lesson ${lesson.id} (${lesson.type}, Level ${getDifficultyLevel(lesson.id)}): ${exercises.length} 题 - ${JSON.stringify(typeCount)}`);
  }
}

console.log(`\n✅ 共生成 ${totalExercises} 道练习题\n`);

// 统计各类型分布
const typeDistribution = {};
for (const id of Object.keys(results)) {
  for (const ex of results[id]) {
    typeDistribution[ex.type] = (typeDistribution[ex.type] || 0) + 1;
  }
}
console.log('📊 题型分布:');
for (const [type, count] of Object.entries(typeDistribution)) {
  console.log(`  ${type}: ${count} 题`);
}

// 统计各难度等级题目数
console.log('\n📊 难度分布:');
for (let level = 1; level <= 4; level++) {
  const levelLessons = lessons.filter(l => getDifficultyLevel(l.id) === level);
  const levelExercises = levelLessons.reduce((sum, l) => sum + (results[l.id]?.length || 0), 0);
  console.log(`  Level ${level} (Lesson ${levelLessons[0]?.id}-${levelLessons[levelLessons.length-1]?.id}): ${levelExercises} 题, 平均 ${Math.round(levelExercises / levelLessons.length)} 题/课`);
}

// ==================== 6. 输出文件 ====================

function formatObject(obj) {
  if (Array.isArray(obj)) {
    const items = obj.map((item) => {
      if (typeof item === 'string') return `'${escapeStr(item)}'`;
      return formatObject(item);
    });
    return `[${items.join(', ')}]`;
  }
  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj).map(([key, value]) => {
      const keyStr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
      if (typeof value === 'string') return `${keyStr}: '${escapeStr(value)}'`;
      if (typeof value === 'number' || typeof value === 'boolean') return `${keyStr}: ${value}`;
      if (Array.isArray(value)) return `${keyStr}: ${formatObject(value)}`;
      if (typeof value === 'object' && value !== null) return `${keyStr}: ${formatObject(value)}`;
      return `${keyStr}: ${JSON.stringify(value)}`;
    });
    return `{ ${entries.join(', ')} }`;
  }
  return JSON.stringify(obj);
}

function formatExerciseTS(ex) {
  return `{ type: '${ex.type}', content: ${formatObject(ex.content)}, answer: '${escapeStr(ex.answer)}', score: ${ex.score} }`;
}

let output = `/**
 * 自动生成的练习题数据（优化版）
 * 由 scripts/generate-exercises.js 生成
 *
 * 优化特性：
 * - 难度递进：Level 1-4 随课程递增
 * - 跨课复习：复习课包含前几课词汇
 * - 干扰项扩展：本课单词不够时从前几课补充
 * - 阅读题增加：长课文可生成多道阅读理解
 *
 * 共 ${lessons.length} 课, ${totalExercises} 道练习题
 * 生成时间: ${new Date().toISOString()}
 */

export const exercisesMap: Record<number, any[]> = {
`;

for (const lesson of lessons) {
  const exercises = results[lesson.id] || [];
  if (exercises.length === 0) continue;

  output += `  // Lesson ${lesson.id}: ${lesson.title} (Level ${getDifficultyLevel(lesson.id)})\n`;
  output += `  ${lesson.id}: [\n`;
  for (const ex of exercises) {
    output += `    ${formatExerciseTS(ex)},\n`;
  }
  output += `  ],\n\n`;
}

output += '};\n';

fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`\n💾 已输出到: ${outputPath}`);
console.log(`📏 文件大小: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
