const fs = require('fs');
const file = 'I:\\新概念英语练习王\\src\\data\\lessons\\completeLessons.ts';
let content = fs.readFileSync(file, 'utf-8');

function replaceLessonTranslation(id, newTransArray) {
  // Find the lesson by id
  const idSearch = `    id: ${id},`;
  const idIdx = content.indexOf(idSearch);
  if (idIdx < 0) { console.log(`MISS L${id}: id not found`); return false; }

  // Find the next lesson boundary
  const nextLessonPatterns = [];
  for (let i = id + 1; i <= id + 10; i++) {
    const p = content.indexOf(`    id: ${i},`, idIdx + 10);
    if (p > 0) nextLessonPatterns.push(p);
  }
  const lessonEnd = nextLessonPatterns.length > 0 ? Math.min(...nextLessonPatterns) : content.length;

  // Find translation within this lesson
  const transSearch = "translation: ['";
  const transIdx = content.indexOf(transSearch, idIdx);
  if (transIdx < 0 || transIdx > lessonEnd) { console.log(`MISS L${id}: translation not found in lesson section`); return false; }

  // Find the end of the translation array: look for '],
  // But be careful: the translation might contain ']' characters
  // We need to find the closing '] that's NOT inside a quoted string
  let depth = 0;
  let inQuote = false;
  let escaped = false;
  let endIdx = -1;
  const arrStart = content.indexOf('[', transIdx);
  for (let i = arrStart; i < content.length && i < lessonEnd + 200; i++) {
    const ch = content[i];
    if (escaped) { escaped = false; continue; }
    if (ch === '\\') { escaped = true; continue; }
    if (ch === "'") { inQuote = !inQuote; continue; }
    if (inQuote) continue;
    if (ch === '[') depth++;
    if (ch === ']') {
      depth--;
      if (depth === 0) { endIdx = i; break; }
    }
  }

  if (endIdx < 0) { console.log(`MISS L${id}: translation end not found`); return false; }

  const oldTrans = content.substring(transIdx, endIdx + 1);
  const newTrans = 'translation: ' + JSON.stringify(newTransArray).replace(/"/g, "'");

  content = content.substring(0, transIdx) + newTrans + content.substring(endIdx + 1);
  console.log(`OK L${id} translation replaced (${oldTrans.length} -> ${newTrans.length} chars)`);
  return true;
}

// Fix L73: needs 14 translations
replaceLessonTranslation(73, [
  '上周米尔斯夫人去了伦敦。',
  '她不太熟悉伦敦，所以迷路了。',
  '突然，她在公共汽车站附近看到一个男人。',
  '\u201c我可以问问路，\u201d她自言自语。',
  '\u201c打扰一下，\u201d她说。',
  '\u201c请问你能告诉我去国王街的路吗？\u201d那个男人愉快地微笑着。',
  '他不懂英语！',
  '他说德语。',
  '他是个游客。',
  '然后他把手伸进口袋，拿出一本常用语手册。',
  '他打开书找到了那个短语。',
  '他慢慢地读出那个短语。',
  '\u201c很抱歉，\u201d他说。',
  '\u201c我不会说英语。\u201d',
]);

// Fix L74: needs 8 translations
replaceLessonTranslation(74, [
  '他今天早上匆匆忙忙地刮胡子，把自己刮伤了。',
  '他拿了一块蛋糕，很快就吃完了。',
  '我给了他一杯水，他渴得喝光了。',
  '前天我在街上遇到了她，她热情地跟我打了招呼。',
  '昨天下午公共汽车开得很慢，我们很晚才到家。',
  '他们今天早上工作非常努力。',
  '我们昨晚玩得很开心。',
  '他今天下午游泳游得很好。',
]);

// Fix L75: needs 19 translations
replaceLessonTranslation(75, [
  '女士：你有像这样的鞋子吗？',
  '售货员：什么尺码？',
  '女士：五码。',
  '售货员：什么颜色？',
  '女士：黑色。',
  '售货员：抱歉。',
  '售货员：我们没有。',
  '女士：但我姐姐上个月买了这双。',
  '售货员：她是在这里买的吗？',
  '女士：不，她是在美国买的。',
  '售货员：一个月前我们有一些那样的鞋子，但现在没有了。',
  '女士：你能帮我找一双吗？',
  '售货员：恐怕不行。',
  '售货员：它们在去年和前年很流行。',
  '售货员：但今年不流行了。',
  '售货员：现在流行的是这种鞋子。',
  '女士：它们看起来很不舒服。',
  '售货员：它们确实很不舒服。',
  '售货员：但女人总是穿不舒服的鞋子！',
]);

// Fix L81: needs 24 translations
replaceLessonTranslation(81, [
  '萨姆：嗨，卡罗尔！',
  '萨姆：汤姆在哪？',
  '卡罗尔：他在楼上。',
  '卡罗尔：他在洗澡。',
  '卡罗尔：汤姆！',
  '汤姆：什么事？',
  '卡罗尔：萨姆来了。',
  '汤姆：我快准备好了。',
  '汤姆：你好，萨姆。',
  '汤姆：来支烟。',
  '萨姆：不，谢谢，汤姆。',
  '汤姆：那来杯威士忌吧。',
  '萨姆：好的。',
  '萨姆：谢谢。',
  '汤姆：晚餐准备好了吗，卡罗尔？',
  '卡罗尔：快准备好了。',
  '卡罗尔：我们七点可以吃晚饭。',
  '汤姆：今天我和萨姆一起吃了午饭。',
  '汤姆：我们去了一家餐馆。',
  '卡罗尔：你们吃了什么？',
  '汤姆：我们吃了烤牛肉和土豆。',
  '卡罗尔：哦！',
  '汤姆：怎么了，卡罗尔？',
  '卡罗尔：嗯，今晚你们又要吃烤牛肉和土豆了！',
]);

// Fix L83: needs 24 translations
replaceLessonTranslation(83, [
  '卡罗尔：你好，萨姆。',
  '卡罗尔：请进。',
  '汤姆：嗨，萨姆。',
  '汤姆：我们正在吃午饭。',
  '汤姆：你想和我们一起吃午饭吗？',
  '萨姆：不，谢谢你，汤姆。',
  '萨姆：我已经吃过午饭了。',
  '萨姆：我十二点半吃的午饭。',
  '卡罗尔：那喝杯咖啡吧。',
  '萨姆：我刚喝了一杯，谢谢你。',
  '萨姆：我午饭后喝了一杯。',
  '汤姆：我们去客厅吧，卡罗尔。',
  '汤姆：我们可以在那里喝咖啡。',
  '卡罗尔：屋里太乱了，萨姆。',
  '卡罗尔：这个房间很不整洁。',
  '卡罗尔：我们正在收拾行李箱。',
  '卡罗尔：我们明天就要走了。',
  '卡罗尔：汤姆和我要去度假。',
  '萨姆：你们真幸运！',
  '汤姆：你什么时候去度假，萨姆？',
  '萨姆：我不知道。',
  '萨姆：我今年已经休过假了。',
  '卡罗尔：你去哪了？',
  '萨姆：我待在家里了！',
]);

// Fix L90: needs 16 translations
replaceLessonTranslation(90, [
  '是的。',
  '我有。',
  '是的，我有。',
  '你什么时候读的它？',
  '你什么时候做的？',
  '我去年读的。',
  '我半小时前做的。',
  '他已经走了吗？',
  '她已经跟他说了吗？',
  '是的，他已经走了。',
  '是的，她已经说了。',
  '他什么时候走的？',
  '她什么时候跟他说的？',
  '他一小时前走的。',
  '她昨天跟他说的。',
  '学习这些动词：do-did-done, cut-cut-cut, eat-ate-eaten, put-put-put, come-came-come, go-went-gone, read-read-read, give-gave-given, rise-rose-risen, set-set-set, swim-swam-swum, see-saw-seen, shut-shut-shut, take-took-taken, speak-spoke-spoken。',
]);

// Fix L93: needs 12 translations
replaceLessonTranslation(93, [
  '奈杰尔是我们的新邻居。',
  '他是个飞行员。',
  '他曾在英国皇家空军服役。',
  '他下个月将飞往纽约。',
  '再下个月他将飞往东京。',
  '现在他在马德里。',
  '他一周前飞去了西班牙。',
  '他下下周将回到伦敦。',
  '他只有四十一岁，却已经去过世界上几乎每个国家。',
  '奈杰尔是个非常幸运的人。',
  '但他的妻子就没那么幸运了。',
  '她通常待在家里！',
]);

// Fix L97: needs 20 translations
replaceLessonTranslation(97, [
  '霍尔先生：前几天我把一个手提箱落在去伦敦的火车上了。',
  '服务员：先生，你能描述一下吗？',
  '霍尔先生：它是一个蓝色的小箱子，带有拉链。',
  '霍尔先生：把手上有个标签，上面有我的名字和地址。',
  '服务员：这个箱子是你的吗？',
  '霍尔先生：不，那不是我的。',
  '服务员：这个呢？',
  '服务员：这个有标签。',
  '霍尔先生：让我看看。',
  '服务员：你的名字和地址是什么？',
  '霍尔先生：大卫·霍尔。',
  '霍尔先生：大桥街83号。',
  '服务员：D. N. 霍尔，大桥街83号。',
  '服务员：三英镑五十便士，谢谢。',
  '霍尔先生：给你。',
  '服务员：谢谢。',
  '霍尔先生：嘿！',
  '服务员：怎么了？',
  '霍尔先生：这个箱子不是我的！',
  '霍尔先生：你给我拿错箱子了！',
]);

// Fix L101: needs 21 translations
replaceLessonTranslation(101, [
  '奶奶：请把吉米的明信片读给我听，彭妮。',
  '\u201c我刚到苏格兰，住在一家青年旅舍。\u201d',
  '奶奶：嗯？',
  '彭妮：他说他刚到苏格兰。',
  '彭妮：他说他住在一家青年旅舍。',
  '彭妮：你知道他是Y.H.A.的会员。',
  '奶奶：什么？',
  '彭妮：Y.H.A.，妈妈。',
  '彭妮：青年旅舍协会。',
  '奶奶：他还说了什么？',
  '\u201c我很快就会写信。\u201d',
  '\u201c希望你们都好。\u201d',
  '奶奶：什么？',
  '奶奶：大声点，彭妮。',
  '奶奶：恐怕我听不到你。',
  '彭妮：他说他很快就会写信。',
  '彭妮：他希望我们都好。',
  '\u201c爱你们的，吉米。\u201d',
  '奶奶：就这些吗？',
  '奶奶：他没说多少，是吧？',
  '彭妮：他在明信片上写不了太多，妈妈。',
]);

// Fix L103: needs 21 translations
replaceLessonTranslation(103, [
  '考试考得怎样，理查德？',
  '不算太坏。',
  '我想我的英语和数学及格了。',
  '题目很容易。',
  '你呢，加里？',
  '英语和数学试卷对我来说不够容易。',
  '我希望我没有不及格。',
  '我想我的法语试卷不及格。',
  '我能回答其中的十六道题。',
  '它们很容易。',
  '但我回答不了其余的题。',
  '它们对我来说太难了。',
  '法语考试太可怕了，是吗？',
  '我讨厌它们。',
  '我肯定我的分数很低。',
  '哦，振作点！',
  '也许我们考得不太坏。',
  '我旁边的那个人在试卷顶端写上了他的名字。',
  '然后？',
  '然后他坐在那儿看了三个小时！',
  '他一个字也没写！',
]);

// Fix L104: needs 7 translations
replaceLessonTranslation(104, [
  '我能回答这些问题。',
  '它们很容易。',
  '我回答不了这些问题。',
  '它们太难了。',
  '这些问题对我来说够容易，我能回答。',
  '这些问题对我来说太难了，我回答不了。',
  '你能回答所有的问题吗？',
]);

// Fix L107: needs 17 translations
replaceLessonTranslation(107, [
  '我非常喜欢这颜色。',
  '这件裙子很漂亮，但对我来说太小了。',
  '这件怎么样？',
  '这件裙子很漂亮。',
  '它很时髦。',
  '短裙现在很流行。',
  '你想试试吗？',
  '好吧。',
  '恐怕这件绿色的裙子对我来说也太小了。',
  '它比那件蓝色的还小。',
  '我也不喜欢这颜色。',
  '它一点也不适合我。',
  '我觉得那件蓝色的裙子更漂亮。',
  '你能再给我看看另一件蓝色的裙子吗？',
  '我想要一件那样的裙子，但必须是我的尺码。',
  '恐怕我没有更大的裙子了。',
  '这是店里最大的裙子了。',
]);

// Fix L108: needs 12 translations
replaceLessonTranslation(108, [
  '索菲很高。',
  '保罗比索菲高。',
  '汉斯是我们班最高的学生。',
  '今天很热。',
  '昨天更热。',
  '前天是今年最热的一天。',
  '去年看比赛的人很多。',
  '今年人更多。',
  '这是我见过的最多的人。',
  '蓝色的手提箱很重。',
  '棕色的手提箱比蓝色的重。',
  '绿色的手提箱是所有里面最重的。',
]);

console.log('\nSaving file...');
fs.writeFileSync(file, content, 'utf-8');
console.log('Done!');
