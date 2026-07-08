/**
 * 检查 completeLessons.ts 中缺失的课程
 */

const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'completeLessons.ts');
const content = fs.readFileSync(lessonsPath, 'utf-8');

// 提取所有课程ID
const lessonPattern = /id:\s*(\d+),/g;
const lessons = [];
let match;

while ((match = lessonPattern.exec(content)) !== null) {
  lessons.push(parseInt(match[1]));
}

const allLessons = Array.from({ length: 144 }, (_, i) => i + 1);
const missingLessons = allLessons.filter(id => !lessons.includes(id));

console.log('=== completeLessons.ts 缺失课程分析 ===\n');
console.log(`现有课程数: ${lessons.length}`);
console.log(`缺失课程数: ${missingLessons.length}\n`);

console.log('缺失的课程ID:');
console.log(missingLessons.join(', '));

// 按区间分组显示
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
