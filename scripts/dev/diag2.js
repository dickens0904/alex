const c = require('fs').readFileSync('I:\\新概念英语练习王\\src\\data\\lessons\\completeLessons.ts', 'utf-8');

// Find all "LadY :" occurrences
let pos = 0;
while ((pos = c.indexOf('LadY :', pos)) !== -1) {
  console.log(`LadY at ${pos}: "${c.substring(pos - 50, pos + 80)}"`);
  pos += 6;
}

// Find all "LAdY :" occurrences
pos = 0;
while ((pos = c.indexOf('LAdY :', pos)) !== -1) {
  console.log(`LAdY at ${pos}: "${c.substring(pos - 50, pos + 80)}"`);
  pos += 6;
}

// Find all "LadY : I" occurrences (for L107)
pos = 0;
while ((pos = c.indexOf("LadY : I", pos)) !== -1) {
  console.log(`"LadY : I" at ${pos}: "${c.substring(pos - 50, pos + 100)}"`);
  pos += 9;
}

// Check L97 D.N.HALL area
const dnIdx = c.indexOf('D.N.HALL');
if (dnIdx > 0) {
  console.log(`\nD.N.HALL at ${dnIdx}: "${c.substring(dnIdx - 50, dnIdx + 300)}"`);
}

// Find the L75 "LadY" pattern specifically
const l75Area = c.indexOf("Uncomfortable shoes");
if (l75Area > 0) {
  const section = c.substring(l75Area, l75Area + 4000);
  const ladIn75 = section.indexOf('LadY');
  const ladYIn75 = section.indexOf('LAdY');
  console.log(`\nL75 section starts at ${l75Area}`);
  if (ladIn75 >= 0) console.log(`LadY found in L75 at relative pos ${ladIn75}: "${section.substring(ladIn75 - 20, ladIn75 + 80)}"`);
  if (ladYIn75 >= 0) console.log(`LAdY found in L75 at relative pos ${ladYIn75}: "${section.substring(ladYIn75 - 20, ladYIn75 + 80)}"`);
}
