/**
 * 课程数据质量检查脚本
 * 检查 completeLessons.ts 中的数据完整性
 */

const fs = require('fs');
const path = require('path');

// 读取 completeLessons.ts 文件
const filePath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'completeLessons.ts');
const content = fs.readFileSync(filePath, 'utf-8');

// 使用正则表达式提取课程数据
const lessonPattern = /id:\s*(\d+),\s*\n\s*title:\s*'([^']*)',\s*\n\s*type:\s*'(new|review)',/g;
const lessons = [];
let match;

while ((match = lessonPattern.exec(content)) !== null) {
  lessons.push({
    id: parseInt(match[1]),
    title: match[2],
    type: match[3]
  });
}

console.log('=== 课程数据质量检查报告 ===\n');
console.log(`总课程数: ${lessons.length}\n`);

// 检查每个课程的数据完整性
const issues = [];

lessons.forEach(lesson => {
  const lessonId = lesson.id;
  
  // 检查是否有 vocabulary
  const vocabPattern = new RegExp(`id:\\s*${lessonId},[\\s\\S]*?vocabulary:\\s*\\[`, 'g');
  const hasVocabulary = vocabPattern.test(content);
  
  // 检查是否有 text
  const textPattern = new RegExp(`id:\\s*${lessonId},[\\s\\S]*?text:\\s*\\{`, 'g');
  const hasText = textPattern.test(content);
  
  // 检查是否有 exercises
  const exercisePattern = new RegExp(`id:\\s*${lessonId},[\\s\\S]*?exercises:\\s*\\[`, 'g');
  const hasExercises = exercisePattern.test(content);
  
  // 检查 exercises 是否为空
  const emptyExercisePattern = new RegExp(`id:\\s*${lessonId},[\\s\\S]*?exercises:\\s*\\[\\s*\\]`, 'g');
  const hasEmptyExercises = emptyExercisePattern.test(content);
  
  const lessonIssues = [];
  
  if (!hasVocabulary) {
    lessonIssues.push('缺少单词数据');
  }
  
  if (!hasText) {
    lessonIssues.push('缺少课文数据');
  }
  
  if (!hasExercises || hasEmptyExercises) {
    lessonIssues.push('缺少练习题');
  }
  
  if (lessonIssues.length > 0) {
    issues.push({
      id: lessonId,
      title: lesson.title,
      type: lesson.type,
      issues: lessonIssues
    });
  }
});

// 输出有问题的课程
if (issues.length > 0) {
  console.log(`发现问题课程: ${issues.length} 课\n`);
  console.log('问题详情:');
  console.log('-'.repeat(80));
  
  issues.forEach(issue => {
    console.log(`\n课程 ${issue.id}: ${issue.title} (${issue.type})`);
    issue.issues.forEach(i => {
      console.log(`  - ${i}`);
    });
  });
} else {
  console.log('所有课程数据完整！\n');
}

// 统计新课和复习课数量
const newLessons = lessons.filter(l => l.type === 'new');
const reviewLessons = lessons.filter(l => l.type === 'review');

console.log('\n=== 课程统计 ===');
console.log(`新课: ${newLessons.length} 课`);
console.log(`复习课: ${reviewLessons.length} 课`);
console.log(`总计: ${lessons.length} 课`);

// 检查是否有练习题
console.log('\n=== 练习题统计 ===');
const lessonsWithExercises = [];
const lessonsWithoutExercises = [];

lessons.forEach(lesson => {
  const exercisePattern = new RegExp(`id:\\s*${lesson.id},[\\s\\S]*?exercises:\\s*\\[([^\\]]*)\\]`, 'g');
  const match = exercisePattern.exec(content);
  
  if (match && match[1].trim().length > 0) {
    lessonsWithExercises.push(lesson.id);
  } else {
    lessonsWithoutExercises.push(lesson.id);
  }
});

console.log(`有练习题的课程: ${lessonsWithExercises.length} 课`);
console.log(`缺少练习题的课程: ${lessonsWithoutExercises.length} 课`);

if (lessonsWithoutExercises.length > 0) {
  console.log('\n缺少练习题的课程ID:');
  console.log(lessonsWithoutExercises.join(', '));
}

console.log('\n=== 检查完成 ===');
