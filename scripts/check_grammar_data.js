/**
 * 检查语法数据的完整性
 */

const fs = require('fs');
const path = require('path');

const grammarPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'grammarData.ts');
const content = fs.readFileSync(grammarPath, 'utf-8');

// 提取所有课程ID（匹配 "  N: {" 格式）
const lessonPattern = /^\s+(\d+):\s*\{/gm;
const lessons = [];
let match;

while ((match = lessonPattern.exec(content)) !== null) {
  lessons.push(parseInt(match[1]));
}

const allLessons = Array.from({ length: 144 }, (_, i) => i + 1);
const missingLessons = allLessons.filter(id => !lessons.includes(id));

console.log('=== grammarData.ts 语法数据统计 ===\n');
console.log(`有语法数据的课程: ${lessons.length} 课`);
console.log(`缺少语法数据的课程: ${missingLessons.length} 课\n`);

if (missingLessons.length > 0) {
  console.log('缺少语法数据的课程ID:');
  console.log(missingLessons.join(', '));
  console.log('\n按区间分组:');
  const intervals = [];
  let start = null;
  let end = null;

  for (const id of missingLessons) {
    if (start === null) {
      start = id;
      end = id;
    } else if (id === end + 1) {
      end = id;
    } else {
      intervals.push(start === end ? `${start}` : `${start}-${end}`);
      start = id;
      end = id;
    }
  }
  if (start !== null) {
    intervals.push(start === end ? `${start}` : `${start}-${end}`);
  }
  console.log(intervals.join(', '));
}

console.log('\n=== 检查完成 ===');
