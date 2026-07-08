/**
 * 检查 completeLessons.ts 中各课程的练习题情况
 */

const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'completeLessons.ts');
const content = fs.readFileSync(lessonsPath, 'utf-8');

// 提取课程数据块
const lessonBlocks = content.split(/(?=\s+id:\s+\d+,)/);
const exercisesStatus = [];

lessonBlocks.forEach(block => {
  const idMatch = block.match(/id:\s*(\d+),/);
  if (!idMatch) return;

  const id = parseInt(idMatch[1]);

  // 检查是否有 exercises 数组
  const exercisesMatch = block.match(/exercises:\s*\[/);
  const emptyExercises = block.match(/exercises:\s*\[\s*\]/);

  let hasExercises = false;
  let exerciseCount = 0;

  if (exercisesMatch && !emptyExercises) {
    hasExercises = true;
    // 统计练习题数量
    const typeMatches = block.match(/type:\s*'[^']+'/g);
    exerciseCount = typeMatches ? typeMatches.length : 0;
  }

  exercisesStatus.push({
    id,
    hasExercises,
    exerciseCount
  });
});

console.log('=== completeLessons.ts 练习题情况 ===\n');

const withExercises = exercisesStatus.filter(l => l.hasExercises);
const withoutExercises = exercisesStatus.filter(l => !l.hasExercises);

console.log(`有练习题的课程: ${withExercises.length} 课`);
console.log(`缺少练习题的课程: ${withoutExercises.length} 课\n`);

if (withoutExercises.length > 0) {
  console.log('缺少练习题的课程ID:');
  console.log(withoutExercises.map(l => l.id).join(', '));
  console.log('\n按区间分组:');
  const intervals = [];
  let start = null;
  let end = null;

  for (const lesson of withoutExercises) {
    if (start === null) {
      start = lesson.id;
      end = lesson.id;
    } else if (lesson.id === end + 1) {
      end = lesson.id;
    } else {
      intervals.push(start === end ? `${start}` : `${start}-${end}`);
      start = lesson.id;
      end = lesson.id;
    }
  }
  if (start !== null) {
    intervals.push(start === end ? `${start}` : `${start}-${end}`);
  }
  console.log(intervals.join(', '));
}

console.log('\n=== 检查完成 ===');
