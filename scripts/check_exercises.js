/**
 * 检查 generatedExercises.ts 中的练习题数据
 */

const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'generatedExercises.ts');
const content = fs.readFileSync(exercisesPath, 'utf-8');

// 提取所有课程ID
const lessonPattern = /^\s+(\d+):\s*\[/gm;
const lessons = [];
let match;

while ((match = lessonPattern.exec(content)) !== null) {
  lessons.push(parseInt(match[1]));
}

console.log('=== generatedExercises.ts 练习题统计 ===\n');
console.log(`包含练习题的课程数: ${lessons.length}\n`);

// 检查缺失的课程
const allLessons = Array.from({ length: 144 }, (_, i) => i + 1);
const missingLessons = allLessons.filter(id => !lessons.includes(id));

if (missingLessons.length > 0) {
  console.log(`缺少练习题的课程: ${missingLessons.length} 课`);
  console.log('缺失课程ID:', missingLessons.join(', '));
} else {
  console.log('所有144课都有练习题数据！');
}

// 检查每个课程的练习题数量
console.log('\n=== 各课程练习题数量 ===\n');

lessons.forEach(id => {
  const pattern = new RegExp(`^\\s+${id}:\\s*\\[([\\s\\S]*?)\\]\\s*,?\\s*$`, 'gm');
  const match = pattern.exec(content);
  
  if (match) {
    const exercisesContent = match[1];
    const exerciseCount = (exercisesContent.match(/type:/g) || []).length;
    console.log(`课程 ${id}: ${exerciseCount} 道练习题`);
  }
});

console.log('\n=== 检查完成 ===');
