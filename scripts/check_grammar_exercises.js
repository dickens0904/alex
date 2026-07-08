/**
 * 检查语法练习的完整性
 */

const fs = require('fs');
const path = require('path');

// 检查 grammarData.ts
const grammarPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'grammarData.ts');
const grammarContent = fs.readFileSync(grammarPath, 'utf-8');

// 检查 grammarDataEnhanced.ts
const enhancedPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'grammarDataEnhanced.ts');
const enhancedContent = fs.readFileSync(enhancedPath, 'utf-8');

console.log('=== 语法练习完整性检查 ===\n');

// 统计 grammarData.ts 中的练习数量
const grammarExerciseMatches = grammarContent.match(/exercises:\s*\[/g);
const grammarExercises = grammarExerciseMatches ? grammarExerciseMatches.length : 0;

// 统计 grammarDataEnhanced.ts 中的练习数量
const enhancedExerciseMatches = enhancedContent.match(/exercises:\s*\[/g);
const enhancedExercises = enhancedExerciseMatches ? enhancedExerciseMatches.length : 0;

console.log('grammarData.ts:');
console.log(`  - 语法数据块: ${grammarExercises} 个`);

console.log('\ngrammarDataEnhanced.ts:');
console.log(`  - 语法数据块: ${enhancedExercises} 个`);

// 检查是否有空的练习数组
const emptyGrammarExercises = (grammarContent.match(/exercises:\s*\[\s*\]/g) || []).length;
const emptyEnhancedExercises = (enhancedContent.match(/exercises:\s*\[\s*\]/g) || []).length;

console.log('\n--- 空练习检查 ---');
console.log('grammarData.ts:');
console.log(`  - 空练习数组: ${emptyGrammarExercises} 个`);

console.log('\ngrammarDataEnhanced.ts:');
console.log(`  - 空练习数组: ${emptyEnhancedExercises} 个`);

// 统计练习题类型
const choiceMatches = (grammarContent.match(/type:\s*'choice'/g) || []).length;
const fillMatches = (grammarContent.match(/type:\s*'fill'/g) || []).length;
const orderMatches = (grammarContent.match(/type:\s*'order'/g) || []).length;

console.log('\n--- 练习题类型统计 (grammarData.ts) ---');
console.log(`  - 选择题: ${choiceMatches} 道`);
console.log(`  - 填空题: ${fillMatches} 道`);
console.log(`  - 排序题: ${orderMatches} 道`);

const enhancedChoiceMatches = (enhancedContent.match(/type:\s*'choice'/g) || []).length;
const enhancedFillMatches = (enhancedContent.match(/type:\s*'fill'/g) || []).length;
const enhancedOrderMatches = (enhancedContent.match(/type:\s*'order'/g) || []).length;

console.log('\n--- 练习题类型统计 (grammarDataEnhanced.ts) ---');
console.log(`  - 选择题: ${enhancedChoiceMatches} 道`);
console.log(`  - 填空题: ${enhancedFillMatches} 道`);
console.log(`  - 排序题: ${enhancedOrderMatches} 道`);

console.log('\n=== 检查完成 ===');
