const fs = require('fs');
const file = 'I:\\新概念英语练习王\\src\\data\\lessons\\completeLessons.ts';
const content = fs.readFileSync(file, 'utf-8').replace(/\r\n/g, '\n');

function verifyLesson(id) {
  const idIdx = content.indexOf(`    id: ${id},`);
  if (idIdx < 0) return;

  const textIdx = content.indexOf('text: {', idIdx);
  if (textIdx < 0) return;

  const nextLesson = content.indexOf(`// Lesson ${id + 1}:`, textIdx);
  const section = content.substring(textIdx, nextLesson > 0 ? nextLesson : content.length);

  const paraStart = section.indexOf('paragraphs: [');
  if (paraStart < 0) return;
  const paraEnd = section.indexOf('\n        ],', paraStart);
  const paraText = section.substring(paraStart, paraEnd);
  const paraCount = (paraText.match(/\{ speaker:/g) || []).length;

  const transStart = section.indexOf('translation: [');
  if (transStart < 0) { console.log(`Lesson ${id}: ${paraCount}P, NO translation`); return; }
  const transLine = section.substring(transStart);
  const transEnd = transLine.indexOf('],');
  const transContent = transLine.substring(0, transEnd);
  const arrStart = transContent.indexOf('[');
  const arrContent = transContent.substring(arrStart + 1);

  let transCount = 0;
  let inQuote = false;
  let escaped = false;
  for (let i = 0; i < arrContent.length; i++) {
    const ch = arrContent[i];
    if (escaped) { escaped = false; continue; }
    if (ch === '\\') { escaped = true; continue; }
    if (ch === "'") {
      if (!inQuote) { transCount++; inQuote = true; }
      else { inQuote = false; }
    }
  }

  const match = paraCount === transCount ? '✓' : `✗ P:${paraCount} T:${transCount}`;
  if (paraCount !== transCount) {
    console.log(`Lesson ${id}: ${paraCount} paragraphs, ${transCount} translations ${match}`);
  }
}

for (let id = 73; id <= 108; id++) verifyLesson(id);
console.log('Done - only mismatches shown above');
