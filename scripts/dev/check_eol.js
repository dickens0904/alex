const c = require('fs').readFileSync('I:\\新概念英语练习王\\src\\data\\lessons\\completeLessons.ts', 'utf-8');

// Check line ending style around D.N.HALL
const dnIdx = c.indexOf('D.N.HALL');
if (dnIdx > 0) {
  const ctx = c.substring(dnIdx - 100, dnIdx + 200);
  // Check for \r\n
  console.log('Has \\r\\n:', ctx.includes('\r\n'));
  console.log('Context around D.N.HALL:');
  console.log(JSON.stringify(ctx));
}

// Check around EXAMINATION ROOM
const examIdx = c.indexOf('EXAMINATION ROOM');
if (examIdx > 0) {
  const ctx = c.substring(examIdx - 100, examIdx + 150);
  console.log('\nHas \\r\\n:', ctx.includes('\r\n'));
  console.log('Context around EXAMINATION ROOM:');
  console.log(JSON.stringify(ctx));
}
