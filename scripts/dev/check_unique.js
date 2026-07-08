const c = require('fs').readFileSync('I:\\新概念英语练习王\\src\\data\\lessons\\completeLessons.ts', 'utf-8');
const needle = "content: 'last year.'";
let p = 0;
let count = 0;
while ((p = c.indexOf(needle, p)) !== -1) {
  count++;
  console.log(`Match ${count} at ${p}: ...${c.substring(p - 40, p + 50)}...`);
  p += needle.length;
}
console.log(`Total matches: ${count}`);

// Also check "content: 'cut himself badly.'"
const needle2 = "content: 'cut himself badly.'";
p = 0; count = 0;
while ((p = c.indexOf(needle2, p)) !== -1) {
  count++;
  console.log(`cut himself Match ${count} at ${p}: ...${c.substring(p - 40, p + 50)}...`);
  p += needle2.length;
}
console.log(`Total cut himself matches: ${count}`);

// Check "content: 'student in our class.'"
const needle3 = "content: 'student in our class.'";
p = 0; count = 0;
while ((p = c.indexOf(needle3, p)) !== -1) {
  count++;
  console.log(`student Match ${count} at ${p}: ...${c.substring(p - 40, p + 50)}...`);
  p += needle3.length;
}
console.log(`Total student matches: ${count}`);

// Check "content: 'was the hottest day in the year.'"
const needle4 = "content: 'was the hottest day in the year.'";
p = 0; count = 0;
while ((p = c.indexOf(needle4, p)) !== -1) {
  count++;
  console.log(`hottest Match ${count} at ${p}: ...${c.substring(p - 40, p + 50)}...`);
  p += needle4.length;
}
console.log(`Total hottest matches: ${count}`);
