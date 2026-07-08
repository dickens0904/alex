// Step 1: Extract and print the exact translation strings for each lesson
const fs = require('fs');
const file = 'I:\\新概念英语练习王\\src\\data\\lessons\\completeLessons.ts';
const content = fs.readFileSync(file, 'utf-8');

// Helper to find and print translation for a lesson
function showTrans(label, searchStr) {
  const idx = content.indexOf(searchStr);
  if (idx < 0) { console.log(`${label}: NOT FOUND`); return; }
  // Find "translation: [" after this position
  const transIdx = content.indexOf('translation: [', idx);
  if (transIdx < 0) { console.log(`${label}: translation not found`); return; }
  const transEnd = content.indexOf('],', transIdx);
  const transStr = content.substring(transIdx, transEnd + 2);
  console.log(`\n${label} (pos ${transIdx}):`);
  console.log(transStr);
}

// Also show paragraphs count
function showParas(label, searchStr) {
  const idx = content.indexOf(searchStr);
  if (idx < 0) return;
  const paraIdx = content.indexOf('paragraphs: [', idx);
  const paraEnd = content.indexOf('],\n', paraIdx);
  const paraStr = content.substring(paraIdx, paraEnd + 2);
  const count = (paraStr.match(/\{ speaker:/g) || []).length;
  console.log(`${label}: ${count} paragraphs`);
}

showTrans('L73', 'Mrs. Mills went to London');
showParas('L73', 'Mrs. Mills went to London');

showTrans('L74', 'He shaved hurriedly this morning');
showParas('L74', 'He shaved hurriedly this morning');

showTrans('L75', 'Uncomfortable shoes');
showParas('L75', 'Uncomfortable shoes');

showTrans('L81', 'Roast beef and potatoes');
showParas('L81', 'Roast beef and potatoes');

showTrans('L83', 'Going on holiday');
showParas('L83', 'Going on holiday');

showTrans('L90', "How long have you...?");
showParas('L90', "How long have you...?");

showTrans('L93', 'Our new neighbour');
showParas('L93', 'Our new neighbour');

showTrans('L97', 'A small blue case');
showParas('L97', 'A small blue case');

showTrans('L101', 'A card from Jimmy');
showParas('L101', 'A card from Jimmy');

showTrans('L103', 'The French test');
showParas('L103', 'The French test');

showTrans('L104', 'Too, very, enough');
showParas('L104', 'Too, very, enough');

showTrans('L107', "It's too high");
showParas('L107', "It's too high");

showTrans('L108', 'Comparative adjectives');
showParas('L108', 'Comparative adjectives');
