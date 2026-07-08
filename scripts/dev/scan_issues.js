const fs = require('fs');
const file = 'I:\\新概念英语练习王\\src\\data\\lessons\\completeLessons.ts';
const content = fs.readFileSync(file, 'utf-8');

// Scan for common issues in lessons 73-108
const issues = [];

// Check for OCR-like patterns
const ocrPatterns = ['STOP', 'Srop', 'WRITIN', 'GREENGROCER', 'BUTCHERo', 'EXAMINATION ROOM', '1Q7', 'D.N.HALL', 'guestions'];
ocrPatterns.forEach(pattern => {
  let pos = 0;
  while ((pos = content.indexOf(pattern, pos)) !== -1) {
    // Check if it's in the 73-108 range
    const before = content.substring(Math.max(0, pos - 200), pos);
    const idMatch = before.match(/id: (\d+)/g);
    if (idMatch) {
      const lastId = parseInt(idMatch[idMatch.length - 1].replace('id: ', ''));
      if (lastId >= 73 && lastId <= 108) {
        issues.push(`OCR "${pattern}" found in lesson ${lastId} at pos ${pos}`);
      }
    }
    pos += pattern.length;
  }
});

// Check for speaker embedded in content
const speakerPatterns = ['LadY :', 'LAdY :', 'LADY :'];
speakerPatterns.forEach(pattern => {
  let pos = 0;
  while ((pos = content.indexOf(pattern, pos)) !== -1) {
    const before = content.substring(Math.max(0, pos - 200), pos);
    const idMatch = before.match(/id: (\d+)/g);
    if (idMatch) {
      const lastId = parseInt(idMatch[idMatch.length - 1].replace('id: ', ''));
      if (lastId >= 73 && lastId <= 108) {
        issues.push(`Speaker "${pattern}" in content, lesson ${lastId} at pos ${pos}`);
      }
    }
    pos += pattern.length;
  }
});

// Check for word concatenation (Hewill, flyto, etc.)
const concatPatterns = ['Hewill', 'flyto', 'larger.dress'];
concatPatterns.forEach(pattern => {
  const pos = content.indexOf(pattern);
  if (pos > 0) {
    const before = content.substring(Math.max(0, pos - 200), pos);
    const idMatch = before.match(/id: (\d+)/g);
    if (idMatch) {
      const lastId = parseInt(idMatch[idMatch.length - 1].replace('id: ', ''));
      if (lastId >= 73 && lastId <= 108) {
        issues.push(`Concatenation "${pattern}" found in lesson ${lastId} at pos ${pos}`);
      }
    }
  }
});

if (issues.length === 0) {
  console.log('No remaining quality issues found in lessons 73-108!');
} else {
  issues.forEach(i => console.log('ISSUE: ' + i));
}
