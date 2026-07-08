const fs = require('fs');
const path = require('path');

const enhancedPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'grammarDataEnhanced.ts');
const content = fs.readFileSync(enhancedPath, 'utf-8');

// 提取每个课程的练习题数量
const lessonPattern = /(\d+):\s*\{[^}]*title:\s*'([^']*)'[\s\S]*?exercises:\s*\[([\s\S]*?)\]\s*\}/g;
let match;
const results = [];
let missing = [];

while ((match = lessonPattern.exec(content)) !== null) {
  const id = parseInt(match[1]);
  const title = match[2];
  const exercisesBlock = match[3];
  const questionCount = (exercisesBlock.match(/question:/g) || []).length;
  results.push({ id, title, questionCount });
  if (questionCount === 0) {
    missing.push(id);
  }
}

console.log('=== grammarDataEnhanced.ts 练习题详情 ===\n');
console.log(`总课程数: ${results.length}`);

const withExercises = results.filter(r => r.questionCount > 0);
const withoutExercises = results.filter(r => r.questionCount === 0);

console.log(`有练习题的课程: ${withExercises.length}`);
console.log(`无练习题的课程: ${withoutExercises.length}`);

if (withoutExercises.length > 0) {
  console.log(`\n无练习题的课程ID: ${withoutExercises.map(r => r.id).join(', ')}`);
}

// 统计练习题数量分布
const totalQuestions = results.reduce((sum, r) => sum + r.questionCount, 0);
console.log(`\n练习题总数: ${totalQuestions}`);
console.log(`平均每课: ${(totalQuestions / results.length).toFixed(1)} 道`);

// 检查 grammarData.ts
const grammarPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'grammarData.ts');
const grammarContent = fs.readFileSync(grammarPath, 'utf-8');

const grammarLessonPattern = /(\d+):\s*\{[\s\S]*?exercises:\s*\[([\s\S]*?)\]\s*\}/g;
const grammarResults = [];
let grammarMatch;

while ((grammarMatch = grammarLessonPattern.exec(grammarContent)) !== null) {
  const id = parseInt(grammarMatch[1]);
  const exercisesBlock = grammarMatch[2];
  const questionCount = (exercisesBlock.match(/question:/g) || []).length;
  grammarResults.push({ id, questionCount });
}

const grammarWithExercises = grammarResults.filter(r => r.questionCount > 0);
const grammarTotal = grammarResults.reduce((sum, r) => sum + r.questionCount, 0);

console.log('\n=== grammarData.ts 练习题详情 ===\n');
console.log(`总课程数: ${grammarResults.length}`);
console.log(`有练习题的课程: ${grammarWithExercises.length}`);
console.log(`练习题总数: ${grammarTotal}`);

// 对比两个文件
console.log('\n=== 对比 ===\n');

// 找出 grammarDataEnhanced 中无练习但 grammarData 中有练习的课程
const enhancedNoExercises = withoutExercises.map(r => r.id);
const grammarHasExercises = grammarWithExercises.map(r => r.id);
const needFallback = enhancedNoExercises.filter(id => grammarHasExercises.includes(id));

if (needFallback.length > 0) {
  console.log(`grammarDataEnhanced 无练习但 grammarData 有练习的课程: ${needFallback.join(', ')}`);
} else {
  console.log('所有课程在 grammarDataEnhanced 中都有练习题，无需 fallback');
}
