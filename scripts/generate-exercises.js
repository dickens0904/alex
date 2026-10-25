/**
 * 练习题自动生成脚本（大扩充版 v2）
 *
 * 相比旧版（每课 9-15 题），本版扩充到每课 ~25-40 题：
 *
 * 听力（listening）三种模式：
 *   1. 听词选义（旧版）- 尽量覆盖全部单词
 *   2. 听音选词（新增）- 播放单词，从 4 个英文单词中选出听到的
 *   3. 听句选义（新增）- 播放整句，从 4 个中文翻译中选出正确的
 *
 * 口语（speaking）三种模式：
 *   1. 句子跟读 - 朗读课文句子
 *   2. 单词跟读（新增）- 朗读本课单词
 *   3. 看中文学英文（新增）- 先只看中文，说出英文后核对
 * 拼写（spelling）：覆盖全部单词
 * 填空（writing）：同一句子可出多个不同挖空点
 * 阅读（reading）三种模式：
 *   1. 句子选翻译（旧版）- 覆盖更多段落
 *   2. 原文判断（新增）- 干扰项来自相邻课的句子，避免答案在课文中可见
 *   3. 对话人物题（改进）- 干扰项来自其他课，不再是课文中可见的送分题
 *
 * 同时生成语法补充练习 grammarAutoExercises.ts（全部为选择题，儿童点选友好）：
 *   - 选出正确语序（choice，连词成句的点选版）
 *   - 课文挖空选词（choice）
 *
 * 输出: src/data/lessons/generatedExercises.ts
 *       src/data/lessons/grammarAutoExercises.ts
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// ==================== 1. 读取并解析课程数据 ====================

const dataDir = path.resolve(__dirname, '../src/data/lessons');
const inputPath = path.join(dataDir, 'completeLessons.ts');
const outputPath = path.join(dataDir, 'generatedExercises.ts');
const grammarOutputPath = path.join(dataDir, 'grammarAutoExercises.ts');

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

function cleanWord(w) {
  return w.toLowerCase().replace(/[^a-z]/g, '');
}

function getDifficultyLevel(lessonId) {
  if (lessonId <= 36) return 1;
  if (lessonId <= 72) return 2;
  if (lessonId <= 120) return 3;
  return 4;
}

// ==================== 3. 数据池 ====================

/** 跨课词汇池（当前课之前 10 课内的单词，排除本课已含单词） */
function getCrossLessonVocab(lessonId, allLessons) {
  const vocabPool = [];
  const currentLesson = allLessons.find((l) => l.id === lessonId);

  const startId = Math.max(1, lessonId - 10);
  for (let i = startId; i < lessonId; i++) {
    const prevLesson = allLessons.find((l) => l.id === i);
    if (prevLesson && prevLesson.content.vocabulary) {
      vocabPool.push(...prevLesson.content.vocabulary);
    }
  }

  const seen = new Set();
  if (currentLesson && currentLesson.content.vocabulary) {
    currentLesson.content.vocabulary.forEach((v) => seen.add(v.word.toLowerCase()));
  }

  return vocabPool.filter((v) => {
    if (seen.has(v.word.toLowerCase())) return false;
    seen.add(v.word.toLowerCase());
    return true;
  });
}

/** 相邻课段落池（用于"原文判断"题的干扰项），排除本课文段落 */
function getCrossLessonParagraphs(lesson, allLessons, radius = 6) {
  const ownContents = new Set(
    (lesson.content.text?.paragraphs || []).map((p) => p.content)
  );
  const pool = [];
  for (const other of allLessons) {
    if (other.id === lesson.id) continue;
    if (Math.abs(other.id - lesson.id) > radius) continue;
    const paras = other.content?.text?.paragraphs || [];
    for (const p of paras) {
      if (p.content && !ownContents.has(p.content)) pool.push(p.content);
    }
  }
  return [...new Set(pool)];
}

// ==================== 4. 练习题生成器（常规练习） ====================

/** 听力-听词选义：播放单词选中文意思（尽量覆盖全部单词） */
function genListeningWordMeaning(lesson, allLessons, cap) {
  const vocab = lesson.content.vocabulary;
  if (!vocab || vocab.length < 2) return [];

  const exercises = [];
  const selected = pickRandom(vocab, Math.min(cap, vocab.length));

  const crossVocab = getCrossLessonVocab(lesson.id, allLessons);
  const allMeanings = [
    ...vocab.map((v) => v.meaning),
    ...crossVocab.map((v) => v.meaning),
  ];
  const uniqueMeanings = [...new Set(allMeanings)];

  for (const vocabItem of selected) {
    const wrongMeanings = uniqueMeanings.filter((m) => m !== vocabItem.meaning);
    if (wrongMeanings.length < 3) continue;

    const wrongAnswers = pickRandom(wrongMeanings, 3);
    exercises.push({
      type: 'listening',
      content: {
        question: `听录音，"${vocabItem.word}" 的意思是？`,
        audioText: vocabItem.word,
        options: shuffle([vocabItem.meaning, ...wrongAnswers]),
      },
      answer: vocabItem.meaning,
      score: 10,
    });
  }
  return exercises;
}

/** 听力-听音选词：播放单词，从英文单词中选出听到的（训练音-形对应） */
function genListeningPickWord(lesson, allLessons, cap) {
  const vocab = lesson.content.vocabulary;
  if (!vocab || vocab.length < 4) return [];

  const singleWords = vocab.filter((v) => !v.word.includes(' '));
  if (singleWords.length < 4) return [];

  const crossVocab = getCrossLessonVocab(lesson.id, allLessons);
  const crossWords = crossVocab.filter((v) => !v.word.includes(' ')).map((v) => v.word);

  const exercises = [];
  const selected = pickRandom(singleWords, Math.min(cap, singleWords.length));

  for (const target of selected) {
    const pool = [
      ...singleWords.map((v) => v.word).filter((w) => w !== target.word),
      ...crossWords,
    ];
    const uniquePool = [...new Set(pool)];
    if (uniquePool.length < 3) continue;

    const wrongWords = pickRandom(uniquePool, 3);
    exercises.push({
      type: 'listening',
      content: {
        question: '听录音，选出你听到的单词',
        audioText: target.word,
        options: shuffle([target.word, ...wrongWords]),
      },
      answer: target.word,
      score: 10,
    });
  }
  return exercises;
}

/** 听力-听句选义：播放整句，选中文翻译（训练整句听力） */
function genListeningSentenceMeaning(lesson, cap) {
  const sentences = lesson.content.sentences;
  if (!sentences || sentences.length < 4) return [];

  const translations = [...new Set(sentences.map((s) => s.chinese).filter(Boolean))];
  if (translations.length < 4) return [];

  const exercises = [];
  const candidates = sentences.filter((s) => s.chinese && s.english);
  const selected = pickRandom(candidates, Math.min(cap, candidates.length));

  for (const sent of selected) {
    const wrong = translations.filter((t) => t !== sent.chinese);
    if (wrong.length < 3) continue;

    exercises.push({
      type: 'listening',
      content: {
        question: '听录音，这句英语的中文意思是？',
        audioText: sent.english,
        options: shuffle([sent.chinese, ...pickRandom(wrong, 3)]),
      },
      answer: sent.chinese,
      score: 10,
    });
  }
  return exercises;
}

/** 口语跟读：句子跟读 + 单词跟读 + 看中文学英文 */
function genSpeaking(lesson, sentenceCap, wordCap, zh2enCap) {
  const sentences = lesson.content.sentences;
  const vocab = lesson.content.vocabulary;
  const exercises = [];

  // 1) 句子跟读
  if (sentences && sentences.length > 0) {
    const level = getDifficultyLevel(lesson.id);
    let pool = sentences;
    if (level <= 2) {
      const short = sentences.filter((s) => s.english.split(/\s+/).length <= 8);
      if (short.length >= Math.min(sentenceCap, 3)) pool = short;
    }

    const selected = pickRandom(pool, Math.min(sentenceCap, pool.length));
    for (const sent of selected) {
      exercises.push({
        type: 'speaking',
        content: {
          instruction: '请大声朗读以下句子',
          sentence: sent.english,
          translation: sent.chinese,
        },
        answer: sent.english,
        score: 10,
      });
    }
  }

  // 2) 单词跟读（优先选不含空格的词，更易朗读和识别）
  if (vocab && vocab.length > 0) {
    const singleWords = vocab.filter((v) => !v.word.includes(' ') && v.word.length <= 12);
    const pool = singleWords.length >= 2 ? singleWords : vocab;
    const selected = pickRandom(pool, Math.min(wordCap, pool.length));
    for (const vocabItem of selected) {
      exercises.push({
        type: 'speaking',
        content: {
          instruction: '请大声朗读以下单词',
          mode: 'word',
          sentence: vocabItem.word,
          translation: vocabItem.meaning,
        },
        answer: vocabItem.word,
        score: 10,
      });
    }
  }

  // 3) 看中文学英文（出分前 UI 只显示中文，不显示英文）
  if (sentences && sentences.length > 0) {
    const selected = pickRandom(sentences, Math.min(zh2enCap, sentences.length));
    for (const sent of selected) {
      exercises.push({
        type: 'speaking',
        content: {
          instruction: '看中文提示，用英语说出这句话',
          mode: 'zh2en',
          sentence: sent.english,
          translation: sent.chinese,
        },
        answer: sent.english,
        score: 10,
      });
    }
  }

  return exercises;
}

/** 拼写：覆盖全部单词 */
function genSpelling(lesson, cap) {
  const vocab = lesson.content.vocabulary;
  if (!vocab || vocab.length === 0) return [];

  const level = getDifficultyLevel(lesson.id);
  const maxWordLength = level <= 2 ? 8 : level <= 3 ? 10 : 12;

  const singleWords = vocab.filter((v) => !v.word.includes(' ') && v.word.length <= maxWordLength);
  const pool = singleWords.length >= 2 ? singleWords : vocab;
  const selected = pickRandom(pool, Math.min(cap, pool.length));

  return selected.map((vocabItem) => ({
    type: 'spelling',
    content: {
      instruction: '根据提示拼写单词',
      hint: vocabItem.phonetic,
      meaning: vocabItem.meaning,
      example: vocabItem.examples && vocabItem.examples.length > 0 ? vocabItem.examples[0] : '',
    },
    answer: vocabItem.word.toLowerCase(),
    score: 10,
  }));
}

/** 填空选择：同一句子可出多个不同挖空点 */
function genWriting(lesson, allLessons, cap) {
  const sentences = lesson.content.sentences;
  const vocab = lesson.content.vocabulary;
  if (!sentences || sentences.length === 0 || !vocab || vocab.length < 2) return [];

  const exercises = [];
  const singleWords = vocab.filter((v) => !v.word.includes(' ')).map((v) => cleanWord(v.word));

  const crossVocab = getCrossLessonVocab(lesson.id, allLessons);
  const crossWords = crossVocab.filter((v) => !v.word.includes(' ')).map((v) => cleanWord(v.word));
  const allWords = [...new Set([...singleWords, ...crossWords])];

  // 每个句子收集可挖空的词，允许每句最多出 2 题
  const perSentenceCap = 2;
  const shuffledSentences = shuffle(sentences.filter((s) => s.english && s.chinese));

  for (const sent of shuffledSentences) {
    if (exercises.length >= cap) break;

    const wordsInSentence = sent.english.split(/\s+/);
    // 单词句（如 "Yes?"）挖空后整句只剩空格，没有上下文，不出题
    if (wordsInSentence.length < 2) continue;
    let blankCandidates = wordsInSentence.filter((w) => {
      const clean = cleanWord(w);
      return singleWords.includes(clean) && clean.length > 2 && clean.length <= 14;
    });
    if (blankCandidates.length === 0) {
      const contentWords = wordsInSentence.filter(
        (w) =>
          w.length > 3 &&
          !['this', 'that', 'these', 'those', 'with', 'from', 'have', 'has', 'been', 'were', 'will'].includes(
            w.toLowerCase()
          )
      );
      if (contentWords.length === 0) continue;
      blankCandidates = [pickOne(contentWords)];
    }

    const usedBlanks = new Set();
    let madeForThisSentence = 0;
    for (const blankWord of shuffle(blankCandidates)) {
      if (exercises.length >= cap || madeForThisSentence >= perSentenceCap) break;
      const cleanBlank = cleanWord(blankWord);
      if (!cleanBlank || usedBlanks.has(cleanBlank)) continue;
      usedBlanks.add(cleanBlank);

      let wrongWords = singleWords.filter((w) => w !== cleanBlank).map((w) => capitalize(w));
      if (wrongWords.length < 3) {
        const extraWrong = allWords
          .filter((w) => w !== cleanBlank && !singleWords.includes(w))
          .map((w) => capitalize(w));
        wrongWords = [...wrongWords, ...extraWrong];
      }
      const uniqueWrongWords = [...new Set(wrongWords)];
      if (uniqueWrongWords.length < 3) continue;

      const wrongOptions = pickRandom(uniqueWrongWords, 3);
      const correctDisplay =
        blankWord.length > 0 && blankWord[0] === blankWord[0].toUpperCase()
          ? capitalize(cleanBlank)
          : cleanBlank;
      const blankedSentence = sent.english.replace(blankWord, '______');
      if (!blankedSentence.includes('______')) continue;
      if (blankedSentence.trim() === '______') continue; // 整句被替换，跳过

      exercises.push({
        type: 'writing',
        content: {
          question: '选择正确的单词填入空白处：',
          sentence: blankedSentence,
          translation: sent.chinese,
          options: shuffle([correctDisplay, ...wrongOptions]),
        },
        answer: correctDisplay,
        score: 10,
      });
      madeForThisSentence++;
    }
  }
  return exercises;
}

/** 阅读-句子选翻译：覆盖更多段落 */
function genReadingTranslation(lesson, cap) {
  const text = lesson.content.text;
  if (!text || !text.paragraphs || !text.translation) return [];

  const paragraphs = text.paragraphs;
  const translations = text.translation;
  if (translations.length < 4 || paragraphs.length < 4) return [];

  const exercises = [];
  const maxIdx = Math.min(paragraphs.length, translations.length);
  const selectedIndices = pickRandom(
    Array.from({ length: maxIdx }, (_, i) => i),
    Math.min(cap, maxIdx)
  );

  for (const idx of selectedIndices) {
    const correctTranslation = translations[idx];
    const englishLine = paragraphs[idx].content;
    const otherTranslations = translations.filter((_, i) => i !== idx);
    if (otherTranslations.length < 3) continue;

    exercises.push({
      type: 'reading',
      content: {
        question: `"${englishLine}" 的正确翻译是？`,
        passage: text.title,
        options: shuffle([correctTranslation, ...pickRandom(otherTranslations, 3)]),
      },
      answer: correctTranslation,
      score: 10,
    });
  }
  return exercises;
}

/** 阅读-原文判断：哪句话出现在课文里（干扰项来自相邻课） */
function genReadingOriginalText(lesson, allLessons, cap) {
  const text = lesson.content.text;
  if (!text || !text.paragraphs || text.paragraphs.length < 2) return [];

  const candidates = text.paragraphs.filter((p) => p.content && p.content.length >= 12);
  if (candidates.length === 0) return [];

  const crossParas = getCrossLessonParagraphs(lesson, allLessons, 6);
  if (crossParas.length < 3) return [];

  const exercises = [];
  const usedCorrect = new Set();

  for (const correct of pickRandom(candidates, Math.min(cap + 1, candidates.length))) {
    if (exercises.length >= cap) break;
    if (usedCorrect.has(correct.content)) continue;

    // 干扰项长度与正确答案接近，避免一眼看出
    const lenMin = correct.content.length * 0.5;
    const lenMax = correct.content.length * 2;
    const distractorPool = crossParas.filter(
      (c) => c.length >= lenMin && c.length <= lenMax && c !== correct.content
    );
    if (distractorPool.length < 3) continue;

    usedCorrect.add(correct.content);
    exercises.push({
      type: 'reading',
      content: {
        question: '下面哪一句出现在课文里？',
        passage: text.title,
        options: shuffle([correct.content, ...pickRandom(distractorPool, 3)]),
      },
      answer: correct.content,
      score: 10,
    });
  }
  return exercises;
}

/** 阅读-对话人物题：干扰项来自其他课，答案不再直接可见 */
function genReadingSpeaker(lesson, allLessons, cap) {
  const text = lesson.content.text;
  if (!text || !text.paragraphs) return [];

  const speakerParas = text.paragraphs.filter((p) => p.speaker && p.content && p.content.length > 5);
  if (speakerParas.length === 0) return [];

  const crossParas = getCrossLessonParagraphs(lesson, allLessons, 6);
  const ownContents = new Set(text.paragraphs.map((p) => p.content));

  const exercises = [];
  for (const p of pickRandom(speakerParas, Math.min(cap, speakerParas.length))) {
    const lenMin = p.content.length * 0.5;
    const lenMax = p.content.length * 2;
    const distractorPool = crossParas.filter(
      (c) => c.length >= lenMin && c.length <= lenMax && !ownContents.has(c)
    );
    if (distractorPool.length < 3) continue;

    exercises.push({
      type: 'reading',
      content: {
        question: `根据课文，${p.speaker} 说了什么？`,
        passage: text.paragraphs.map((pp) => (pp.speaker ? `${pp.speaker}: ${pp.content}` : pp.content)).join('\n'),
        options: shuffle([p.content, ...pickRandom(distractorPool, 3)]),
      },
      answer: p.content,
      score: 10,
    });
  }
  return exercises;
}

/** 复习课跨课听力题 */
function genReview(lesson, allLessons, cap) {
  const crossVocab = getCrossLessonVocab(lesson.id, allLessons);
  if (crossVocab.length < 4) return [];

  const exercises = [];
  for (const vocabItem of pickRandom(crossVocab, Math.min(cap, crossVocab.length))) {
    const otherMeanings = [...new Set(crossVocab.filter((v) => v.word !== vocabItem.word).map((v) => v.meaning))];
    if (otherMeanings.length < 3) continue;

    exercises.push({
      type: 'listening',
      content: {
        question: `【复习】听录音，"${vocabItem.word}" 的意思是？`,
        audioText: vocabItem.word,
        options: shuffle([vocabItem.meaning, ...pickRandom(otherMeanings, 3)]),
      },
      answer: vocabItem.meaning,
      score: 10,
    });
  }
  return exercises;
}

// ==================== 5. 语法补充练习生成器 ====================
// 全部为选择/判断题（儿童点选友好）：不再生成需要键盘输入的填空题和拖拽排序题

/** 语法-选出正确语序（choice）：连词成句的点选版 */
function genGrammarOrder(lesson, cap) {
  const sentences = lesson.content.sentences;
  if (!sentences || sentences.length === 0) return [];

  const exercises = [];
  const pool = sentences.filter((s) => {
    const n = s.english.trim().split(/\s+/).length;
    return n >= 4 && n <= 8 && s.chinese;
  });
  if (pool.length === 0) return [];

  const used = new Set();
  for (const sent of pickRandom(pool, Math.min(cap * 2, pool.length))) {
    if (exercises.length >= cap) break;
    if (used.has(sent.english)) continue;
    used.add(sent.english);

    const words = sent.english.trim().split(/\s+/);
    if (words.length < 4) continue;

    // 生成 3 个与正确句不同的乱序排列作为干扰项
    const correct = sent.english.trim();
    const variants = new Set();
    let guard = 0;
    while (variants.size < 3 && guard < 60) {
      guard++;
      const v = shuffle(words).join(' ');
      if (v !== correct) variants.add(v);
    }
    if (variants.size < 3) continue;

    const options = shuffle([correct, ...variants]);
    exercises.push({
      type: 'choice',
      question: '选出排列正确的一项（注意句首大写和单词顺序）：',
      hint: sent.chinese,
      options,
      answer: options.indexOf(correct),
      explanation: `正确语序：${correct}（${sent.chinese}）`,
    });
  }
  return exercises;
}

/** 词形变化干扰项：动词/名词的常见形态（-s/-es/-ed/-ing/ied 等） */
function wordVariants(word) {
  const w = word.toLowerCase();
  const out = [];
  const push = (x) => {
    if (x && x !== w && x.length <= 16 && !out.includes(x)) out.push(x);
  };
  if (/(s|x|z|ch|sh)$/.test(w)) {
    push(w + 'es');
  } else {
    push(w + 's');
  }
  if (/e$/.test(w)) {
    push(w + 'd');
    push(w.replace(/e$/, 'ing'));
  } else if (/y$/.test(w) && w.length > 2) {
    push(w.replace(/y$/, 'ied'));
    push(w.slice(0, -1) + 'ying');
  } else {
    push(w + 'ed');
    push(w + 'ing');
  }
  return out;
}

/** 挖空选择题公共：找可挖空目标 + 生成选项（正确词 + 形态变体 + 同课词表词）
 *  outKind: 'grammar' = 语法补充题结构（顶层 options + answer 索引，GrammarCardEnhanced 渲染）
 *           'practice' = 常规练习结构（content 包裹 + answer 字符串，PracticeEngine 渲染）
 */
function buildBlankChoice(lesson, cap, opts) {
  const { variantFirst, type, outKind } = opts || {};
  const sentences = lesson.content.sentences;
  const vocab = lesson.content.vocabulary;
  if (!sentences || !vocab) return [];

  const vocabWords = vocab.map((v) => cleanWord(v.word)).filter((w) => w.length > 2);
  const vocabSet = new Set(vocabWords);
  const exercises = [];
  const used = new Set();

  for (const sent of shuffle(sentences.filter((s) => s.english && s.chinese))) {
    if (exercises.length >= cap) break;
    if (used.has(sent.english)) continue;

    const words = sent.english.split(/\s+/);
    // 单词句（如 "Yes?" / "Pardon?"）挖空后整句只剩空格，没有上下文，不出题
    if (words.length < 2) continue;
    const blankable = words.filter((w) => {
      const clean = cleanWord(w);
      return vocabSet.has(clean) && clean.length <= 14;
    });
    if (blankable.length === 0) continue;

    const blankWord = pickOne(blankable);
    const cleanBlank = cleanWord(blankWord);
    const blanked = sent.english.replace(blankWord, '______');
    if (!blanked.includes('______') || used.has(blanked)) continue;
    if (blanked.trim() === '______') continue; // 整句被替换（单词语句漏网），跳过
    used.add(blanked);

    // 干扰项：形态变体优先（更有"结构"考察感），再补同课其他词表词
    const distractors = [];
    const pushDistractor = (x) => {
      const s = String(x || '').trim();
      if (!s) return;
      const ls = s.toLowerCase();
      if (ls === cleanBlank.toLowerCase()) return;
      if (distractors.some((d) => d.toLowerCase() === ls)) return;
      distractors.push(s);
    };
    if (variantFirst) {
      wordVariants(cleanBlank).forEach(pushDistractor);
    }
    for (const w of shuffle(vocabWords)) {
      if (distractors.length >= 3) break;
      pushDistractor(w);
    }
    if (distractors.length < 3) continue;

    const options = shuffle([cleanBlank, ...distractors]);
    if (outKind === 'practice') {
      // 常规练习结构：answer 必须与 options 中的正确项字符串完全一致（PracticeEngine 按 === 判定）
      exercises.push({
        type,
        content: {
          question: '选出填入空格的正确单词：',
          sentence: blanked,
          translation: sent.chinese,
          options,
        },
        answer: cleanBlank,
        score: 10,
      });
    } else {
      const answerIdx = options.findIndex((o) => o.toLowerCase() === cleanBlank.toLowerCase());
      if (answerIdx < 0) continue;
      exercises.push({
        type,
        question: `选出填入空格的正确单词：${blanked}`,
        hint: `中文意思：${sent.chinese}`,
        options,
        answer: answerIdx,
        explanation: `${sent.english}（${sent.chinese}）`,
      });
    }
  }
  return exercises;
}

/** 语法-课文挖空选词（choice） */
function genGrammarFill(lesson, cap) {
  return buildBlankChoice(lesson, cap, { variantFirst: false, type: 'choice', outKind: 'grammar' });
}

/** 词汇与结构专项（Vocabulary & Structure）：挖空选词，词形变化干扰优先 */
function genVocabStructure(lesson, cap) {
  return buildBlankChoice(lesson, cap, {
    variantFirst: true,
    type: 'vocabStructure',
    outKind: 'practice',
  });
}

// ==================== 6. 主生成逻辑 ====================

console.log('🔧 开始生成练习题（大扩充版 v2）...\n');

const CAPS = {
  listeningWordMeaning: 6,
  listeningPickWord: 4,
  listeningSentence: 3,
  speakingSentence: 8,
  speakingWord: 4,
  speakingZh2En: 4,
  spelling: 8,
  writing: 6,
  readingTranslation: 4,
  readingOriginal: 2,
  readingSpeaker: 1,
  review: 3,
  grammarOrder: 3,
  grammarFill: 3,
  vocabStructure: 6,
};

let totalExercises = 0;
let totalGrammar = 0;
const results = {};
const grammarResults = {};

for (const lesson of lessons) {
  const exercises = [];
  exercises.push(...genListeningWordMeaning(lesson, lessons, CAPS.listeningWordMeaning));
  exercises.push(...genListeningPickWord(lesson, lessons, CAPS.listeningPickWord));
  exercises.push(...genListeningSentenceMeaning(lesson, CAPS.listeningSentence));
  exercises.push(...genSpeaking(lesson, CAPS.speakingSentence, CAPS.speakingWord, CAPS.speakingZh2En));
  exercises.push(...genSpelling(lesson, CAPS.spelling));
  exercises.push(...genWriting(lesson, lessons, CAPS.writing));
  exercises.push(...genReadingTranslation(lesson, CAPS.readingTranslation));
  exercises.push(...genReadingOriginalText(lesson, lessons, CAPS.readingOriginal));
  exercises.push(...genReadingSpeaker(lesson, lessons, CAPS.readingSpeaker));
  // 词汇与结构专项（Vocabulary & Structure）：挖空选词，词形变化干扰优先
  exercises.push(...genVocabStructure(lesson, CAPS.vocabStructure));

  if (lesson.type === 'review') {
    exercises.push(...genReview(lesson, lessons, CAPS.review));
  }

  // 语法补充练习（连词成句 + 课文填空）
  const grammarExercises = [
    ...genGrammarOrder(lesson, CAPS.grammarOrder),
    ...genGrammarFill(lesson, CAPS.grammarFill),
  ];
  if (grammarExercises.length > 0) {
    grammarResults[lesson.id] = grammarExercises;
    totalGrammar += grammarExercises.length;
  }

  results[lesson.id] = exercises;
  totalExercises += exercises.length;

  if (lesson.id <= 3 || lesson.id % 20 === 0 || lesson.id === lessons.length) {
    const typeCount = {};
    exercises.forEach((e) => {
      typeCount[e.type] = (typeCount[e.type] || 0) + 1;
    });
    console.log(
      `  Lesson ${lesson.id} (${lesson.type}, L${getDifficultyLevel(lesson.id)}): ${exercises.length} 题 + 语法 ${grammarExercises.length} 题 - ${JSON.stringify(typeCount)}`
    );
  }
}

console.log(`\n✅ 共生成 ${totalExercises} 道常规练习题 + ${totalGrammar} 道语法补充题\n`);

// 统计题型分布
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

// 题量过少的课告警
const thinLessons = Object.keys(results)
  .map(Number)
  .filter((id) => results[id].length < 15);
if (thinLessons.length > 0) {
  console.log(
    `\n⚠️  以下 ${thinLessons.length} 课题量少于 15：Lesson ${thinLessons.join(', ')}`
  );
}

// ==================== 7. 输出文件 ====================

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

function formatGrammarExerciseTS(ex) {
  const parts = [`type: '${ex.type}'`, `question: '${escapeStr(ex.question)}'`];
  if (ex.hint) parts.push(`hint: '${escapeStr(ex.hint)}'`);
  if (ex.options) parts.push(`options: ${formatObject(ex.options)}`);
  if (typeof ex.answer === 'number') parts.push(`answer: ${ex.answer}`);
  if (ex.fillAnswer) parts.push(`fillAnswer: '${escapeStr(ex.fillAnswer)}'`);
  if (ex.correctOrder) parts.push(`correctOrder: ${formatObject(ex.correctOrder)}`);
  parts.push(`explanation: '${escapeStr(ex.explanation)}'`);
  return `{ ${parts.join(', ')} }`;
}

// --- 常规练习题 ---
let output = `/**
 * 自动生成的练习题数据（大扩充版 v2）
 * 由 scripts/generate-exercises.js 生成
 *
 * 题型模式：
 * - listening: 听词选义 / 听音选词 / 听句选义
 * - speaking: 句子跟读 / 单词跟读 / 看中文学英文
 * - spelling: 音标+词义拼写
 * - writing: 单词填空选择
 * - reading: 句子选翻译 / 原文判断 / 对话人物题
 * - vocabStructure: 词汇与结构专项（挖空选词，词形变化干扰优先）
 *
 * 共 ${lessons.length} 课, ${totalExercises} 道练习题
 * 生成时间: ${new Date().toISOString()}
 */

import type { Exercise } from '../../types/lesson';

export const exercisesMap: Record<number, Exercise[]> = {
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

// --- 语法补充练习 ---
let grammarOutput = `/**
 * 自动生成的语法补充练习（全部为选择题：选出正确语序 + 挖空选词）
 * 由 scripts/generate-exercises.js 生成，在 LessonDetail.mergeGrammarData 中合并
 *
 * 共 ${Object.keys(grammarResults).length} 课, ${totalGrammar} 道题
 * 生成时间: ${new Date().toISOString()}
 */

import type { GrammarExercise } from '../../types/lesson';

export const grammarAutoExercises: Record<number, GrammarExercise[]> = {
`;

for (const lesson of lessons) {
  const exercises = grammarResults[lesson.id] || [];
  if (exercises.length === 0) continue;

  grammarOutput += `  // Lesson ${lesson.id}: ${lesson.title}\n`;
  grammarOutput += `  ${lesson.id}: [\n`;
  for (const ex of exercises) {
    grammarOutput += `    ${formatGrammarExerciseTS(ex)},\n`;
  }
  grammarOutput += `  ],\n\n`;
}

grammarOutput += '};\n';

fs.writeFileSync(grammarOutputPath, grammarOutput, 'utf-8');
console.log(`💾 已输出到: ${grammarOutputPath}`);
console.log(`📏 文件大小: ${(fs.statSync(grammarOutputPath).size / 1024).toFixed(1)} KB`);
