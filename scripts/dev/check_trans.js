const fs = require('fs');
const file = 'I:\\新概念英语练习王\\src\\data\\lessons\\completeLessons.ts';
const content = fs.readFileSync(file, 'utf-8');

// Show actual translation for each problematic lesson
function showLessonTrans(id) {
  const idIdx = content.indexOf(`    id: ${id},`);
  if (idIdx < 0) { console.log(`L${id}: NOT FOUND`); return; }
  const textIdx = content.indexOf('text: {', idIdx);
  const transIdx = content.indexOf("translation: ['", textIdx);
  if (transIdx < 0) { console.log(`L${id}: no translation`); return; }
  const transEnd = content.indexOf("'],", transIdx);
  const trans = content.substring(transIdx, transEnd + 2);
  console.log(`\nL${id} (pos ${transIdx}):`);
  console.log(trans.substring(0, 300));
}

[73, 74, 97, 103, 107].forEach(id => showLessonTrans(id));
