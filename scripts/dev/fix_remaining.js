const fs = require('fs');
const file = 'I:\\新概念英语练习王\\src\\data\\lessons\\completeLessons.ts';
let content = fs.readFileSync(file, 'utf-8');

function fix(label, oldStr, newStr) {
  if (content.includes(oldStr)) {
    content = content.split(oldStr).join(newStr);
    console.log('OK ' + label);
    return true;
  } else {
    console.log('MISS ' + label);
    return false;
  }
}

// Fix L97 D.N.HALL OCR artifacts (with \r\n line endings)
fix('L97-OCR-DNHALL',
  "{ speaker: 'MR. HALL', content: 'D.N.HALL 83BRIDGE' },\r\n          { speaker: 'ATTENDANT', content: 'That\\'s right.' },\r\n          { speaker: 'ATTENDANT', content: 'STREET.' },\r\n          { speaker: 'ATTENDANT', content: 'D.' },\r\n          { speaker: 'ATTENDANT', content: 'N.' },\r\n          { speaker: 'ATTENDANT', content: 'Hall.' },\r\n          { speaker: 'ATTENDANT', content: '83, Bridge Street.' }",
  "{ speaker: 'ATTENDANT', content: 'D. N. Hall, 83, Bridge Street.' }"
);

// Fix L103 EXAMINATION ROOM OCR (with \r\n)
fix('L103-EXAM',
  "{ speaker: '', content: 'EXAMINATION ROOM' },\r\n          { speaker: 'GARY', content: 'How was the exam, Richard?' }",
  "{ speaker: 'GARY', content: 'How was the exam, Richard?' }"
);

fs.writeFileSync(file, content, 'utf-8');
console.log('File saved.');
