/**
 * 检查 completeLessons.ts 中有练习题的课程
 */

const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'completeLessons.ts');
const content = fs.readFileSync(lessonsPath, 'utf-8');

// 提取课程数据块
const lessonBlocks = content.split(/(?=\s+id:\s+\d+,)/);
const exercisesInfo = [];

lessonBlocks.forEach(block => {
  const idMatch = block.match(/id:\s*(\d+),/);
  if (!idMatch) return;

  const id = parseInt(idMatch[1]);

  // 检查是否有 exercises 数组
  const exercisesMatch = block.match(/exercises:\s*\[/);
  const emptyExercises = block.match(/exercises:\s*\[\s*\]/);

  if (exercisesMatch && !emptyExercises) {
    // 统计练习题数量
    const typeMatches = block.match(/type:\s*'[^']+'/g);
    const exerciseCount = typeMatches ? typeMatches.length : 0;

    // 提取练习题类型
    const types = typeMatches ? typeMatches.map(m => m.match(/type:\s*'([^']+)'/)[1]) : [];

    exercisesInfo.push({
      id,
      exerciseCount,
      types: [...new Set(types)]
    });
  }
});

console.log('=== completeLessons.ts 中有练习题的课程 ===\n');
console.log(`共有 ${exercisesInfo.length} 课有练习题\n`);

exercisesInfo.forEach(info => {
  console.log(`课程 ${info.id}: ${info.exerciseCount} 道练习题`);
  console.log(`  类型: ${info.types.join(', ')}`);
});

console.log('\n=== 检查完成 ===');
