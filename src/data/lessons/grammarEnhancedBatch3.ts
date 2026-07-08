// 语法增强内容 - 批次3（主题61-80）
const batch3: Record<
  number,
  {
    explanation: string;
    extraRules: string[];
    extraExamples: { english: string; chinese: string; grammarPoint: string }[];
    extraTips: string[];
  }
> = {
  // ==================== 第61课：have 的用法 ====================
  61: {
    explanation:
      'have就像一个"百变小精灵"，它有两个主要身份。第一个身份是"拥有"——表示"有"什么东西，就像你口袋里装着的宝贝。比如"I have a dog"（我有一只狗）、"She has a new book"（她有一本新书）。注意哦，当主语是第三人称单数（he/she/it）时，have要变身成has，就像穿了一件新衣服。第二个身份是"做"——和很多名词搭配时，have表示"做某个动作"，比如have breakfast（吃早餐）、have lunch（吃午餐）、have dinner（吃晚餐）、have a rest（休息一下）、have a look（看一看）、have a good time（玩得开心）。这就像中文里"吃饭""喝水""睡觉"一样，have是万能搭配王！',
    extraRules: [
      'have表示"有"：I have a cat.（我有一只猫。）They have two bikes.（他们有两辆自行车。）',
      '第三人称单数用has：He has a new phone.（他有一部新手机。）She has long hair.（她有长头发。）',
      'have + 名词 = 做某事：have breakfast/lunch/dinner（吃早/午/晚餐），have a rest（休息），have a look（看一看）',
      "have的否定和疑问需要助动词do/does：I don't have a car. / Does she have a sister?",
      'have还可以表示"进行/举行"：We have a class meeting on Monday.（我们周一开班会。）',
    ],
    extraExamples: [
      {
        english: 'I have a cute little dog.',
        chinese: '我有一只可爱的小狗。',
        grammarPoint: 'I have + 名词（拥有）',
      },
      {
        english: 'She has a beautiful dress.',
        chinese: '她有一条漂亮的裙子。',
        grammarPoint: 'She has + 名词（第三人称单数）',
      },
      {
        english: 'We have breakfast at seven every morning.',
        chinese: '我们每天早上七点吃早餐。',
        grammarPoint: 'have breakfast（固定搭配）',
      },
      {
        english: 'Let me have a look at your homework.',
        chinese: '让我看看你的作业。',
        grammarPoint: 'have a look（看一看）',
      },
      {
        english: "They don't have any pets.",
        chinese: '他们没有任何宠物。',
        grammarPoint: "don't have（否定句）",
      },
      {
        english: 'Does he have a brother?',
        chinese: '他有兄弟吗？',
        grammarPoint: 'Does + 主语 + have...?（疑问句）',
      },
    ],
    extraTips: [
      '记忆口诀："have表示拥有，has是三单变体；have breakfast吃早餐，have a rest休息一下"',
      '易错提醒：第三人称单数用has，不能说"She have a cat"，要说"She has a cat"',
      '趣味知识：have a good time = 玩得开心，have fun = 玩得开心，两个意思一样，都是祝福别人玩得愉快的表达！',
    ],
  },

  // ==================== 第62课：复习：have 的用法练习 ====================
  62: {
    explanation:
      '今天我们来全面复习have的各种用法！have是一个超级实用的单词，它最重要的意思是"有/拥有"。想象你的房间就是一个小宝库，里面have什么呢？也许你have a desk（有一张书桌）、have a computer（有一台电脑）、have many books（有很多书）。have还有一个很有趣的用法——和名词搭配表示"做某个动作"：早上起床have breakfast（吃早餐），中午have lunch（吃午餐），放学后have a rest（休息一下），遇到问题可以have a try（试一试），考试前要have a good preparation（好好准备）。注意have在不同人称后面的变化：I have, you have, he/she/it has, we have, they have。在否定句和疑问句中，现在时要用do/does帮忙：Do you have...? Does she have...? I don\'t have...',
    extraRules: [
      '第一/二人称和复数用have：I have, you have, we have, they have',
      '第三人称单数用has：he has, she has, it has, Tom has',
      'have + 动作名词 = 做某事：have a walk（散步）, have a swim（游泳）, have a talk（谈话）',
      "否定句：主语 + don't/doesn't + have：I don't have time. / He doesn't have a pen.",
      '疑问句：Do/Does + 主语 + have...? Do you have a ruler? / Does she have any questions?',
    ],
    extraExamples: [
      {
        english: 'We have four classes in the morning.',
        chinese: '我们上午有四节课。',
        grammarPoint: 'We have + 名词（拥有）',
      },
      {
        english: 'He has lunch at school every day.',
        chinese: '他每天在学校吃午餐。',
        grammarPoint: 'He has + 固定搭配',
      },
      {
        english: 'Do you have any brothers or sisters?',
        chinese: '你有兄弟姐妹吗？',
        grammarPoint: 'Do you have...?（疑问句）',
      },
      {
        english: "The children don't have homework today.",
        chinese: '孩子们今天没有作业。',
        grammarPoint: "don't have（否定句）",
      },
      {
        english: "Let's have a try!",
        chinese: '让我们试一试吧！',
        grammarPoint: 'have a try（固定搭配）',
      },
      {
        english: 'My mother has a beautiful smile.',
        chinese: '我妈妈有美丽的笑容。',
        grammarPoint: 'My mother has（第三人称单数）',
      },
    ],
    extraTips: [
      '口诀复习："I/you/we/they用have，he/she/it用has；have breakfast吃早餐，have fun玩得欢"',
      '易错提醒：have表示"有"的否定疑问要用do/does帮忙，不能说"She doesn\'t has"，要说"She doesn\'t have"',
      '生活练习：今天你做了什么？试着用have来描述——I had breakfast at... I had a good time at... 你会发现have无处不在！',
    ],
  },

  // ==================== 第63课：must 和 mustn't ====================
  63: {
    explanation:
      'must就像一个"严格的老师"，表示"必须"做某事，语气很强硬。比如"You must finish your homework"（你必须完成作业）、"I must go now"（我现在必须走了）。must后面永远跟动词原形，不管主语是谁，都不变形——不说"musts"。must的否定形式mustn\'t意思更加强烈，表示"绝对禁止"，就像红灯一样——停！不许做！比如"You mustn\'t cross the red light"（你不准闯红灯）、"You mustn\'t eat in class"（上课不准吃东西）。注意mustn\'t不是"不必"的意思哦，"不必"是don\'t have to或needn\'t。mustn\'t = 绝对不行、禁止，语气非常严厉，就像妈妈说"你绝对不能玩火"一样！',
    extraRules: [
      'must表示"必须"：You must listen to the teacher.（你必须听老师讲课。）',
      'must后面跟动词原形：must go, must do, must be（不能加-s、-ing或to）',
      'must没有人称变化：I must, you must, he must, she must, they must（都是must）',
      'mustn\'t表示"禁止/不准"：You mustn\'t smoke here.（这里不准吸烟。）',
      "must的一般疑问句：Must I...? 回答用Yes, you must. / No, you needn't（或No, you don't have to）.",
    ],
    extraExamples: [
      {
        english: 'You must do your homework first.',
        chinese: '你必须先做作业。',
        grammarPoint: 'You must + 动词原形（必须）',
      },
      {
        english: 'We must be quiet in the library.',
        chinese: '我们在图书馆必须保持安静。',
        grammarPoint: 'We must + 动词原形',
      },
      {
        english: "You mustn't play with fire.",
        chinese: '你绝对不能玩火。',
        grammarPoint: "You mustn't + 动词原形（禁止）",
      },
      {
        english: "Students mustn't use phones in class.",
        chinese: '学生上课不准使用手机。',
        grammarPoint: "mustn't + 动词原形（禁止）",
      },
      {
        english: 'Must I finish it today?',
        chinese: '我必须今天完成吗？',
        grammarPoint: 'Must I...?（疑问句）',
      },
      {
        english: "No, you needn't. You can do it tomorrow.",
        chinese: '不，不必了。你可以明天做。',
        grammarPoint: "No, you needn't.（否定回答）",
      },
    ],
    extraTips: [
      '记忆口诀："must必须要牢记，mustn\'t禁止不能忘；must后跟动原形，人称变化全一样"',
      '易错提醒：mustn\'t ≠ 不必！mustn\'t是"禁止"（非常严厉），don\'t have to / needn\'t才是"不必"',
      '生活场景：在公共场所看到的"No smoking"标志，就等于"You mustn\'t smoke here"（这里禁止吸烟）！',
    ],
  },

  // ==================== 第64课：复习：must 和 mustn't 练习 ====================
  64: {
    explanation:
      '今天我们来全面复习must和mustn\'t的用法！must是英语中表示"必须"的情态动词，就像学校里的规章制度一样，告诉你什么一定要做。mustn\'t则是"禁止"，就像马路上的红灯——绝对不能闯！must和mustn\'t这对"兄弟"意思完全相反：must = 必须做（鼓励你去做），mustn\'t = 禁止做（绝对不能做）。它们有一个共同点：都永远不变形，后面都跟动词原形。想象一下班级规则：You must wear the school uniform（你必须穿校服），You must arrive on time（你必须准时到），You mustn\'t run in the hallway（不准在走廊跑），You mustn\'t copy others\' homework（不准抄别人作业）。在回答"Must I...?"时，肯定回答"Yes, you must."，否定回答"No, you needn\'t."或"No, you don\'t have to."',
    extraRules: [
      'must + 动词原形 = 必须做某事：must study, must clean, must help',
      "mustn't + 动词原形 = 禁止做某事：mustn't shout, mustn't litter, mustn't cheat",
      "Must I/we...? 我们必须……吗？ Yes, you must. / No, you needn't.",
      'must还可以表示推测"一定是"：He must be at home.（他一定在家。）',
      'must与have to的区别：must强调主观意愿，have to强调客观需要',
    ],
    extraExamples: [
      {
        english: 'You must hand in your homework on time.',
        chinese: '你必须按时交作业。',
        grammarPoint: 'must + 动词原形（义务）',
      },
      {
        english: "We mustn't be late for school.",
        chinese: '我们上学一定不能迟到。',
        grammarPoint: "mustn't + 动词原形（禁止）",
      },
      {
        english: 'Must I wear a coat today?',
        chinese: '我今天必须穿外套吗？',
        grammarPoint: 'Must I...?（疑问句）',
      },
      {
        english: "No, you needn't. It's warm today.",
        chinese: '不，不必了。今天很暖和。',
        grammarPoint: "No, you needn't.（否定回答）",
      },
      {
        english: 'You must respect your teachers.',
        chinese: '你必须尊敬老师。',
        grammarPoint: 'must + 动词原形',
      },
      {
        english: "You mustn't tell lies.",
        chinese: '你绝对不能说谎。',
        grammarPoint: "mustn't + 动词原形（禁止）",
      },
    ],
    extraTips: [
      '口诀复习："must必须去做事，mustn\'t千万不能碰；must后加动原形，记住规则万事通"',
      '易错提醒：回答Must I...?的否定形式不是"No, you mustn\'t"，而是"No, you needn\'t"或"No, you don\'t have to"',
      "情景联想：想一想你学校的校规有哪些？用must和mustn't各造三个句子吧！",
    ],
  },

  // ==================== 第65课：时间表达（一） ====================
  65: {
    explanation:
      '时间表达就像一个"钟面大冒险"！我们要学会用英语说出时钟上的时间。首先，最基本的问题是"What time is it?"（几点了？）。整点时间最简单：It\'s seven o\'clock（七点整），o\'clock只用在整点后面。半点用"half past"：It\'s half past seven（七点半），past表示"过了"，就是过了整点半个小时。一刻钟用"quarter"：It\'s a quarter past seven（七点一刻），quarter就是"四分之一"，一小时的四分之一就是15分钟。如果过了半点，就用"to"表示"差几分到几点"：It\'s a quarter to eight（差一刻八点/七点四十五）。想象钟面上12点是"山顶"，过了半点就要开始"倒数"往下一个整点爬了！',
    extraRules: [
      "整点表达：It's + 数字 + o'clock：It's three o'clock.（三点整。）",
      "半点表达：It's half past + 小时：It's half past nine.（九点半。）",
      "一刻钟表达：It's a quarter past/to + 小时：a quarter past nine（九点一刻），a quarter to nine（差一刻九点）",
      "分钟数≤30用past：It's ten past six.（六点十分。）It's twenty past six.（六点二十分。）",
      "分钟数>30用to：It's ten to seven.（差十分七点/六点五十。）It's twenty to seven.（差二十分七点/六点四十。）",
    ],
    extraExamples: [
      { english: 'What time is it?', chinese: '几点了？', grammarPoint: '询问时间的句型' },
      {
        english: "It's seven o'clock.",
        chinese: '七点整。',
        grammarPoint: "It's + 数字 + o'clock",
      },
      {
        english: "It's half past eight.",
        chinese: '八点半。',
        grammarPoint: "It's half past + 小时",
      },
      {
        english: "It's a quarter past three.",
        chinese: '三点一刻。',
        grammarPoint: 'a quarter past + 小时',
      },
      {
        english: "It's twenty past ten.",
        chinese: '十点二十分。',
        grammarPoint: '分钟 + past + 小时',
      },
      {
        english: "It's a quarter to twelve.",
        chinese: '差一刻十二点。',
        grammarPoint: 'a quarter to + 小时',
      },
    ],
    extraTips: [
      '记忆口诀："整点o\'clock要记牢，半点half past不能少；过了半点用to，分钟跟着变叫号"',
      "易错提醒：past和to的区别——分钟数≤30用past（过），分钟数>30用to（差）；o'clock只用在整点！",
      '趣味知识：quarter的本意是"四分之一"，一小时有4个quarter，所以一个quarter就是15分钟！',
    ],
  },

  // ==================== 第66课：复习：时间表达（一）练习 ====================
  66: {
    explanation:
      '今天我们来全面复习时间表达！时间表达是日常生活中用得最多的英语知识之一。我们来回顾三种主要的表达方式。第一种是整点：It\'s + 数字 + o\'clock，比如It\'s eight o\'clock（八点整）。第二种是用past：当分钟数不超过30时，用"分钟 + past + 小时"，比如It\'s five past eight（八点五分）、It\'s twenty past eight（八点二十分）、It\'s half past eight（八点半）。第三种是用to：当分钟数超过30时，用"(60-分钟数) + to + (小时+1)"，比如It\'s five to nine（差五分九点/八点五十五）。记住past是"过"，to是"差"。特别注意a quarter past = 一刻（15分），a quarter to = 差一刻。学会看钟表，你就能用英语告诉别人时间了！',
    extraRules: [
      "询问时间：What time is it? / What's the time?",
      "整点：数字 + o'clock：six o'clock（六点整）",
      '≤30分钟：分钟数 + past + 小时：ten past five（五点十分），half past five（五点半）',
      '>30分钟：(60-分钟数) + to + (小时+1)：ten to six（差十分六点/五点五十）',
      'a quarter = 15分钟：a quarter past nine（九点一刻），a quarter to nine（差一刻九点/八点四十五）',
    ],
    extraExamples: [
      {
        english: 'What time do you get up?',
        chinese: '你几点起床？',
        grammarPoint: 'What time...?（询问时间）',
      },
      {
        english: "I get up at six o'clock.",
        chinese: '我六点起床。',
        grammarPoint: 'at + 整点时间',
      },
      {
        english: 'School starts at a quarter past eight.',
        chinese: '学校八点一刻开始上课。',
        grammarPoint: 'at a quarter past + 小时',
      },
      {
        english: 'Lunch is at half past twelve.',
        chinese: '午餐十二点半。',
        grammarPoint: 'at half past + 小时',
      },
      {
        english: 'The movie starts at twenty to seven.',
        chinese: '电影差二十分七点开始/六点四十开始。',
        grammarPoint: '分钟 + to + 小时',
      },
      {
        english: "It's five past nine. We're not late!",
        chinese: '九点零五分。我们没有迟到！',
        grammarPoint: '分钟 + past + 小时',
      },
    ],
    extraTips: [
      '口诀复习："小于半点用past，大于半点用to转；past跟着走，to倒着算"',
      '易错提醒：It\'s ten to seven. 是"差十分七点"即6:50，不是7:10！to的时候要"反着看"',
      '生活练习：看看你家的钟，试着用英语说出现在的准确时间吧！',
    ],
  },

  // ==================== 第67课：一般过去时（was/were） ====================
  67: {
    explanation:
      '一般过去时就像一台"时光机"，带我们回到过去发生的事情。今天我们先学习be动词的过去式——was和were。它们是am/is/are的"过去版"：am和is变成了was，are变成了were。就像变形金刚变身一样！用法也很简单：I was（我是/我曾经是）、you were、he was、she was、it was、we were、they were。比如"I was happy yesterday"（我昨天很开心）、"They were at school"（他们在学校）。否定形式在后面加not：wasn\'t = was not，weren\'t = were not。比如"I wasn\'t tired"（我不累）、"They weren\'t at home"（他们不在家）。疑问句把was/were提到主语前面：Was she a teacher?（她以前是老师吗？）Were you at the park?（你刚才在公园吗？）',
    extraRules: [
      'was用于I, he, she, it及单数名词：I was happy. / She was a student. / The cat was small.',
      'were用于you, we, they及复数名词：You were right. / They were at home. / The dogs were hungry.',
      "否定形式：wasn't (= was not), weren't (= were not)：I wasn't late. / They weren't here.",
      '疑问形式：Was + 主语...? / Were + 主语...?：Was he a doctor? / Were they friends?',
      '过去时间标志词：yesterday（昨天）, last year/month/week（去年/上个月/上周）, ago（以前）, then（那时）',
    ],
    extraExamples: [
      {
        english: 'I was at home yesterday.',
        chinese: '我昨天在家。',
        grammarPoint: 'I was + 地点（过去时）',
      },
      {
        english: 'She was very happy last Sunday.',
        chinese: '她上个星期天很开心。',
        grammarPoint: 'She was + 形容词（过去时）',
      },
      {
        english: 'We were in the park an hour ago.',
        chinese: '一小时前我们在公园。',
        grammarPoint: 'We were + 地点',
      },
      {
        english: "He wasn't at school yesterday.",
        chinese: '他昨天不在学校。',
        grammarPoint: "He wasn't（否定形式）",
      },
      {
        english: 'Were you at the party last night?',
        chinese: '你昨晚在派对上吗？',
        grammarPoint: 'Were you...?（疑问形式）',
      },
      {
        english: "Yes, I was. / No, I wasn't.",
        chinese: '是的，我在。/不，我不在。',
        grammarPoint: '过去时的肯定和否定回答',
      },
    ],
    extraTips: [
      '记忆口诀："am/is变was，are变were要记住；I/he/she/it用was，you/we/they用were"',
      '易错提醒：不管主语是什么，was和were都不加-s！不能说"was he a student?"的否定是"wasn\'t he"',
      '趣味知识：was和were是英语中最古老的单词之一，已经使用了上千年！',
    ],
  },

  // ==================== 第68课：复习：一般过去时（was/were）练习 ====================
  68: {
    explanation:
      '今天我们来全面练习was和were的用法！回忆一下：was和were是be动词的过去式，用来描述过去的状态或位置。was是am和is的"以前版"，用于I, he, she, it和单数名词；were是are的"以前版"，用于you, we, they和复数名词。比如描述你小时候的样子：I was short when I was five.（我五岁时个子很矮。）描述昨天的天气：It was sunny yesterday.（昨天是晴天。）描述上周末的活动：We were at the zoo last weekend.（上周末我们在动物园。）否定和疑问也是同样的规则：wasn\'t = was not，weren\'t = were not。疑问句把was/were提到句首：Was the test difficult?（考试难吗？）Remember过去时的标志词：yesterday, last week, ... ago, in 2020, then。',
    extraRules: [
      'was + 形容词/名词/介词短语：He was tired. / She was a nurse. / It was on the desk.',
      'were + 形容词/名词/介词短语：They were happy. / We were students. / The books were in the bag.',
      'there was / there were 表示"过去有"：There was a tree in the garden. / There were many people.',
      '时间标志词：yesterday, last night/week/month/year, two days ago, in 2020, when I was young',
      "否定疑问：Wasn't she a teacher?（她以前不是老师吗？）Weren't they at school?（他们不在学校吗？）",
    ],
    extraExamples: [
      {
        english: 'There was a big tree in front of our school.',
        chinese: '我们学校前面以前有一棵大树。',
        grammarPoint: 'There was + 单数名词（过去有）',
      },
      {
        english: 'There were many birds in the tree.',
        chinese: '树上以前有很多鸟。',
        grammarPoint: 'There were + 复数名词（过去有）',
      },
      {
        english: 'I was only five years old then.',
        chinese: '那时我才五岁。',
        grammarPoint: 'I was + 数字 + years old',
      },
      {
        english: 'My parents were very young in this photo.',
        chinese: '这张照片里我父母很年轻。',
        grammarPoint: 'My parents were + 形容词',
      },
      {
        english: 'Was the movie interesting?',
        chinese: '电影有趣吗？',
        grammarPoint: 'Was + 主语 + 形容词?（疑问句）',
      },
      {
        english: "No, it wasn't. It was boring.",
        chinese: '不，它很无聊。',
        grammarPoint: "No, it wasn't. It was + 形容词.",
      },
    ],
    extraTips: [
      '口诀复习："I/he/she/it用was，you/we/they用were；过去时间别忘记，yesterday和ago来提醒"',
      '易错提醒：There was后面跟单数，There were后面跟复数！There was some books ❌ → There were some books ✓',
      '生活练习：和朋友聊聊你们小时候的样子吧——"When I was young, I was..." "We were in the same class."',
    ],
  },

  // ==================== 第69课：一般过去时（规则动词） ====================
  69: {
    explanation:
      '规则动词的过去式就像穿衣服一样，有固定的"穿衣规则"！大多数动词只需要在后面加上-ed就可以了，就像给动词穿上一件"过去式外衣"。比如walk（走路）→ walked、play（玩）→ played、watch（看）→ watched、clean（打扫）→ cleaned。具体规则有四条：第一，大部分动词直接加-ed：cook → cooked，help → helped。第二，以e结尾的只加-d：like → liked，live → lived。第三，以"辅音字母+y"结尾的，把y变成i再加-ed：study → studied，carry → carried。第四，以重读闭音节结尾（辅+元+辅），双写最后一个字母再加-ed：stop → stopped，plan → planned。规则动词的过去式发音也有规律：在清辅音后读/t/，在浊辅音和元音后读/d/，在t/d后读/id/。',
    extraRules: [
      '一般动词直接加-ed：walk → walked, play → played, clean → cleaned',
      '以e结尾的动词加-d：like → liked, live → lived, dance → danced',
      '辅音字母+y结尾，变y为i加-ed：study → studied, carry → carried, try → tried',
      '重读闭音节（辅+元+辅）双写末字母加-ed：stop → stopped, plan → planned',
      "规则动词过去式的否定和疑问用didn't + 动词原形：I didn't play. Did you watch TV?",
    ],
    extraExamples: [
      {
        english: 'I walked to school yesterday.',
        chinese: '我昨天走路去上学。',
        grammarPoint: 'walk → walked（直接加-ed）',
      },
      {
        english: 'She played the piano last night.',
        chinese: '她昨晚弹了钢琴。',
        grammarPoint: 'play → played（直接加-ed）',
      },
      {
        english: 'We liked the movie very much.',
        chinese: '我们非常喜欢那部电影。',
        grammarPoint: 'like → liked（以e结尾加-d）',
      },
      {
        english: 'He studied English for two hours.',
        chinese: '他学了两个小时英语。',
        grammarPoint: 'study → studied（变y为i加-ed）',
      },
      {
        english: 'They watched a football match.',
        chinese: '他们看了一场足球比赛。',
        grammarPoint: 'watch → watched（直接加-ed）',
      },
      {
        english: 'She stopped and looked at me.',
        chinese: '她停下来，看着我。',
        grammarPoint: 'stop → stopped（双写加-ed）',
      },
    ],
    extraTips: [
      '记忆口诀："规则动词加ed，e结尾只加d；辅音加y变i加，重闭双写再加ed"',
      '易错提醒：以y结尾但前面是元音字母的，直接加-ed：play → played（不是plaied）！只有辅音+y才变i',
      '发音小窍门：清辅音（/p/, /k/, /f/, /s/等）后-ed读/t/：walked /wɔːkt/；浊辅音和元音后读/d/：played /pleɪd/；t/d后读/id/：wanted /ˈwɔːntɪd/',
    ],
  },

  // ==================== 第70课：复习：一般过去时（规则动词）练习 ====================
  70: {
    explanation:
      "今天我们来全面复习规则动词的过去式！规则动词就像遵守交通规则的车辆，它们的过去式变化都有规律可循。最重要的规则是在动词后面加-ed。但是根据动词结尾的不同，加-ed的方式也不同：大部分动词直接加-ed（helped, watched, cleaned）；以e结尾的动词只加-d（liked, lived, hoped）；以辅音字母+y结尾的，把y变成i再加-ed（studied, carried）；以重读闭音节结尾的，双写最后一个字母再加-ed（stopped, planned, shopped）。在过去时的句子中，动词变成过去式后就可以直接描述过去的动作了：I watched TV last night.（我昨晚看了电视。）She cleaned her room yesterday.（她昨天打扫了房间。）记住，规则动词过去式的否定和疑问要用didn't和did！",
    extraRules: [
      '规则动词过去式变化规则四种：加-ed、加-d、变y为i加-ed、双写加-ed',
      '过去时肯定句：主语 + 动词过去式：He played football yesterday.',
      "过去时否定句：主语 + didn't + 动词原形：He didn't play football yesterday.",
      '过去时疑问句：Did + 主语 + 动词原形？ Did he play football yesterday?',
      '时间标志词：yesterday, last week/month/year, two hours ago, in the morning',
    ],
    extraExamples: [
      {
        english: 'I cleaned my room this morning.',
        chinese: '我今天早上打扫了我的房间。',
        grammarPoint: 'clean → cleaned（直接加-ed）',
      },
      {
        english: "She didn't like the food.",
        chinese: '她不喜欢那些食物。',
        grammarPoint: "didn't + 动词原形（否定句）",
      },
      {
        english: 'Did you finish your homework?',
        chinese: '你完成作业了吗？',
        grammarPoint: 'Did + 主语 + 动词原形?（疑问句）',
      },
      {
        english: 'Yes, I did. I finished it an hour ago.',
        chinese: '是的，我一小时前完成了。',
        grammarPoint: 'Yes, I did. + 过去式陈述',
      },
      {
        english: 'We carried the heavy boxes upstairs.',
        chinese: '我们把沉重的箱子搬上了楼。',
        grammarPoint: 'carry → carried（变y为i加-ed）',
      },
      {
        english: 'He planned a birthday party for his sister.',
        chinese: '他为妹妹策划了一个生日派对。',
        grammarPoint: 'plan → planned（双写加-ed）',
      },
    ],
    extraTips: [
      '口诀复习："规则动词四种变，直接加ed最常见；e结尾只加d，y结尾变i再加ed"',
      "易错提醒：否定句和疑问句中动词要回到原形！I didn't watched ❌ → I didn't watch ✓",
      '生活练习：用英语记录你昨天做了什么，尽量用5个不同的规则动词过去式！',
    ],
  },

  // ==================== 第71课：一般过去时（不规则动词） ====================
  71: {
    explanation:
      '不规则动词就像一群"不守规矩的调皮鬼"，它们的过去式没有固定的加-ed规则，需要一个个去记忆。不过别担心，最常用的不规则动词其实不多，多读多用自然就记住了！比如：go（去）→ went, see（看见）→ saw, come（来）→ came, have（有）→ had, do（做）→ did, eat（吃）→ ate, drink（喝）→ drank, take（拿）→ took, give（给）→ gave, get（得到）→ got。这些不规则动词的过去式变化方式五花八门：有的元音变了（sing → sang），有的整个词都变了（go → went），有的完全不变（cut → cut）。最好的记忆方法是多读课文、多造句子，在语境中自然记住它们。就像交朋友一样，见得多了自然就认识了！',
    extraRules: [
      '常见不规则动词变化：go→went, see→saw, come→came, have→had, do→did, eat→ate',
      '更多不规则动词：drink→drank, take→took, give→gave, get→got, make→made, run→ran',
      "不规则动词过去式的否定和疑问也用didn't/did + 动词原形：I didn't go. Did you see it?",
      '有些动词过去式和原形一样：cut→cut, put→put, let→let, hit→hit',
      'be动词的不规则变化：am/is→was, are→were',
    ],
    extraExamples: [
      {
        english: 'I went to the park yesterday.',
        chinese: '我昨天去了公园。',
        grammarPoint: 'go → went（不规则变化）',
      },
      {
        english: 'She saw a beautiful bird in the tree.',
        chinese: '她看见树上有一只漂亮的鸟。',
        grammarPoint: 'see → saw（不规则变化）',
      },
      {
        english: 'We ate pizza for dinner last night.',
        chinese: '我们昨晚晚餐吃了披萨。',
        grammarPoint: 'eat → ate（不规则变化）',
      },
      {
        english: 'He drank a glass of milk this morning.',
        chinese: '他今天早上喝了一杯牛奶。',
        grammarPoint: 'drink → drank（不规则变化）',
      },
      {
        english: 'They came to school early today.',
        chinese: '他们今天很早就来学校了。',
        grammarPoint: 'come → came（不规则变化）',
      },
      {
        english: "I didn't take my umbrella yesterday.",
        chinese: '我昨天没带雨伞。',
        grammarPoint: "didn't + 动词原形（否定句）",
      },
    ],
    extraTips: [
      '记忆口诀："不规则动词靠记忆，go-went, see-saw, come-came; eat-ate, drink-drank, take-took, give-gave"',
      "易错提醒：不规则动词变否定和疑问时，要用didn't/did + 原形！I didn't went ❌ → I didn't go ✓",
      '记忆技巧：把不规则动词编成故事——"我went（去了）公园，saw（看见）了一只鸟，came（跑来）了一只猫，ate（吃了）面包"',
    ],
  },

  // ==================== 第72课：复习：一般过去时（不规则动词）练习 ====================
  72: {
    explanation:
      '今天我们来全面练习不规则动词的过去式！不规则动词是英语中的"个性派"，它们不像规则动词那样整齐划一地加-ed，而是各有各的变化方式。记住这些常见的不规则动词是学好过去时的关键。我们再来复习一些重要的不规则动词：go→went, see→saw, come→came, have→had, do→did, eat→ate, drink→drank, take→took, give→gave, get→got, make→made, run→ran, write→wrote, read→read（拼写不变但读音变了）。使用不规则动词的过去式时，句子结构和规则动词完全一样：肯定句直接用过去式（I went to school.），否定句用didn\'t + 原形（I didn\'t go to school.），疑问句用Did + 主语 + 原形（Did you go to school?）。',
    extraRules: [
      'go-went（去）, see-saw（看见）, come-came（来）, have-had（有/吃）, do-did（做）',
      'eat-ate（吃）, drink-drank（喝）, take-took（拿）, give-gave（给）, get-got（得到）',
      'make-made（制作）, run-ran（跑）, write-wrote（写）, read-read（读）, buy-bought（买）',
      '过去时肯定句用过去式形式：She made a cake. / He wrote a letter.',
      "过去时否定和疑问用didn't/did + 原形：She didn't make a cake. / Did she make a cake?",
    ],
    extraExamples: [
      {
        english: 'I made a birthday card for my mom.',
        chinese: '我给妈妈做了一张生日卡片。',
        grammarPoint: 'make → made（不规则变化）',
      },
      {
        english: 'He wrote a letter to his friend.',
        chinese: '他给朋友写了一封信。',
        grammarPoint: 'write → wrote（不规则变化）',
      },
      {
        english: 'Did you read this book last week?',
        chinese: '你上周读了这本书吗？',
        grammarPoint: 'Did + 主语 + 动词原形?（疑问句）',
      },
      {
        english: 'We ran in the park yesterday afternoon.',
        chinese: '我们昨天下午在公园跑了步。',
        grammarPoint: 'run → ran（不规则变化）',
      },
      {
        english: "She didn't give me any candy.",
        chinese: '她没有给我任何糖果。',
        grammarPoint: "didn't give（否定句）",
      },
      {
        english: 'They got many presents on Christmas.',
        chinese: '圣诞节他们收到了很多礼物。',
        grammarPoint: 'get → got（不规则变化）',
      },
    ],
    extraTips: [
      '口诀复习："不规则动词花样多，go-went, see-saw记心窝; make-made, write-wrote, 读课文里找规律"',
      '易错提醒：read的过去式拼写不变，但发音从/riːd/变成了/rɛd/，就像一个"变装高手"',
      '记忆技巧：每天背3个不规则动词，写成小卡片随身带，一周就能掌握大部分常用不规则动词！',
    ],
  },

  // ==================== 第73课：一般过去时(否定和疑问) ====================
  73: {
    explanation:
      '过去时的否定句和疑问句需要用到一个"小助手"——did。did是do的过去式，它就像一个"时间标记"，一出现就表示句子是过去时。否定句的结构是：主语 + didn\'t + 动词原形。注意：有了didn\'t这个"时间标记"，动词就要回到原形，不能再用过去式了！比如"I didn\'t go to school yesterday"（我昨天没去学校），不能说"I didn\'t went"。疑问句的结构是：Did + 主语 + 动词原形？比如"Did you see the movie?"（你看那部电影了吗？）回答用"Yes, I did."或"No, I didn\'t."。did就像一个"过去时标签"，贴在句子开头或not前面，动词就自动回到原形——它们不能同时出现两个"过去"的标志！',
    extraRules: [
      "否定句：主语 + didn't + 动词原形：I didn't go. / She didn't like it. / They didn't play.",
      '疑问句：Did + 主语 + 动词原形？ Did you go? / Did she like it? / Did they play?',
      '肯定回答：Yes, 主语 + did. Yes, I did. / Yes, she did.',
      "否定回答：No, 主语 + didn't. No, I didn't. / No, she didn't.",
      '重要规则：有了didn\'t或did，动词必须回到原形！不能说"didn\'t went"或"Did you went?"',
    ],
    extraExamples: [
      {
        english: "I didn't watch TV last night.",
        chinese: '我昨晚没看电视。',
        grammarPoint: "didn't + 动词原形（否定句）",
      },
      {
        english: 'Did you finish your homework?',
        chinese: '你完成作业了吗？',
        grammarPoint: 'Did + 主语 + 动词原形?（疑问句）',
      },
      {
        english: "Yes, I did. I finished it at nine o'clock.",
        chinese: '是的，我在九点完成了。',
        grammarPoint: 'Yes, I did.（肯定回答）',
      },
      {
        english: "She didn't come to school yesterday.",
        chinese: '她昨天没来学校。',
        grammarPoint: "didn't come（否定句）",
      },
      {
        english: 'Did they have a good time?',
        chinese: '他们玩得开心吗？',
        grammarPoint: 'Did + they + 动词原形?（疑问句）',
      },
      {
        english: "No, they didn't. It rained all day.",
        chinese: '不，没有。下了一整天的雨。',
        grammarPoint: "No, they didn't.（否定回答）",
      },
    ],
    extraTips: [
      '记忆口诀："否定didn\'t加原形，疑问Did放句首；有了did这个标记，动词回到原形走"',
      "易错提醒：didn't后面绝对不能用过去式！I didn't went ❌ → I didn't go ✓，Did you saw ❌ → Did you see ✓",
      '类比记忆：didn\'t和did就像"时间压缩机"，它们已经包含了过去的意思，所以动词被"压缩"回原形了！',
    ],
  },

  // ==================== 第74课：复习：一般过去时(否定和疑问)练习 ====================
  74: {
    explanation:
      '今天我们来全面复习过去时的否定句和疑问句！过去时有三种句式需要掌握。肯定句：主语 + 动词过去式（I went to school.）。否定句：主语 + didn\'t + 动词原形（I didn\'t go to school.）。疑问句：Did + 主语 + 动词原形？（Did you go to school?）。最容易犯的错误就是在否定句和疑问句中还使用动词过去式。记住：did/didn\'t已经是过去时的标志了，动词必须回到原形！对比一下：肯定句"I saw a cat."（我看见了一只猫。）→ 否定句"I didn\'t see a cat."（我没看见猫。）→ 疑问句"Did you see a cat?"（你看见猫了吗？）另外，过去时也可以用was/were的否定疑问：Was he happy?（他开心吗？）Wasn\'t she a student?（她以前不是学生吗？）Weren\'t they at home?（他们不在家吗？）',
    extraRules: [
      "肯定句 → 否定句：加didn't，动词回原形：He ate lunch. → He didn't eat lunch.",
      '肯定句 → 疑问句：Did提前，动词回原形：She bought a book. → Did she buy a book?',
      "was/were的否定：wasn't / weren't：He wasn't at home. / They weren't happy.",
      'was/were的疑问：提前即可：Was she a teacher? / Were you at school?',
      '特疑问句：What did you do? / Where did you go? / When did he arrive?',
    ],
    extraExamples: [
      {
        english: "He didn't eat breakfast this morning.",
        chinese: '他今天早上没吃早餐。',
        grammarPoint: "didn't + eat（否定句）",
      },
      {
        english: 'Did she buy any books yesterday?',
        chinese: '她昨天买书了吗？',
        grammarPoint: 'Did + she + 动词原形?（疑问句）',
      },
      {
        english: 'Where did you go last summer?',
        chinese: '你去年夏天去了哪里？',
        grammarPoint: 'Where did + 主语 + 动词原形?（特殊疑问句）',
      },
      {
        english: 'What did they do at the party?',
        chinese: '他们在派对上做了什么？',
        grammarPoint: 'What did + 主语 + 动词原形?',
      },
      {
        english: "She wasn't at school yesterday.",
        chinese: '她昨天不在学校。',
        grammarPoint: "wasn't（be动词否定）",
      },
      {
        english: 'Were you at home last night?',
        chinese: '你昨晚在家吗？',
        grammarPoint: 'Were + 主语...?（be动词疑问）',
      },
    ],
    extraTips: [
      '口诀复习："过去否定didn\'t，过去疑问Did开头；后面动词回原形，这是铁律不能丢"',
      '易错提醒：特殊疑问句（What/Where/When/How）也要用"疑问词 + did + 主语 + 原形"的结构',
      '实战练习：用英语问你的同学昨天做了什么——What did you do yesterday? Did you...?，练习越多越熟练！',
    ],
  },

  // ==================== 第75课：一般过去时(不规则动词更多) ====================
  75: {
    explanation:
      '今天我们来认识更多不规则动词的"家族成员"！这些不规则动词在日常英语中出现频率非常高，掌握它们会让你的英语表达更流畅。新成员包括：buy（买）→ bought, think（想/认为）→ thought, write（写）→ wrote, speak（说）→ spoke, tell（告诉）→ told, find（找到）→ found, know（知道）→ knew, say（说）→ said, feel（感觉）→ felt, begin（开始）→ began, bring（带来）→brought, teach（教）→ taught, sleep（睡觉）→ slept, sit（坐）→ sat。这些不规则动词的变化模式很有意思：有些是元音变化（sing→sang, sit→sat），有些是词尾变化（teach→taught, buy→bought），有些是整体变化（go→went, think→thought）。建议分组记忆，找到每组之间的规律！',
    extraRules: [
      'buy-bought（买）, think-thought（想）, bring-brought（带来）, teach-taught（教）：-ought/-aught 结尾',
      'write-wrote（写）, speak-spoke（说）, know-knew（知道）, sleep-slept（睡觉）',
      'tell-told（告诉）, find-found（找到）, say-said（说）, feel-felt（感觉）',
      'begin-began（开始）, sit-sat（坐）, sing-sang（唱）, give-gave（给）',
      "所有不规则动词的否定和疑问都用didn't/did + 原形：I didn't buy anything. / Did you find it?",
    ],
    extraExamples: [
      {
        english: 'I bought a new pen at the shop.',
        chinese: '我在商店买了一支新笔。',
        grammarPoint: 'buy → bought',
      },
      {
        english: 'She thought the test was easy.',
        chinese: '她觉得考试很简单。',
        grammarPoint: 'think → thought',
      },
      {
        english: 'He wrote a story for the school magazine.',
        chinese: '他为校刊写了一个故事。',
        grammarPoint: 'write → wrote',
      },
      {
        english: 'My teacher taught us a new song yesterday.',
        chinese: '昨天老师教了我们一首新歌。',
        grammarPoint: 'teach → taught',
      },
      {
        english: "I knew the answer, but I didn't say it.",
        chinese: '我知道答案，但没有说出来。',
        grammarPoint: "knew（过去式）/ didn't say（否定）",
      },
      {
        english: 'She told me a funny joke.',
        chinese: '她给我讲了一个有趣的笑话。',
        grammarPoint: 'tell → told',
      },
    ],
    extraTips: [
      '记忆口诀："buy-bought买买买，think-thought想想想；teach-taught教得好，tell-told告诉你"',
      '分组记忆法：-ought组（buy/think/bring/teach）可以放在一起记，它们的结尾都一样',
      '趣味知识：英语中有大约200个常用不规则动词，但最常用的50个就覆盖了日常会话的大部分！',
    ],
  },

  // ==================== 第76课：复习：一般过去时(不规则动词)练习 ====================
  76: {
    explanation:
      '今天我们来全面练习更多不规则动词的过去式！经过前面的学习，我们已经认识了不少不规则动词，今天要通过练习把它们牢牢记在脑子里。复习一下新学的不规则动词：buy→bought（买）, think→thought（想）, write→wrote（写）, speak→spoke（说）, tell→told（告诉）, find→found（找到）, know→knew（知道）, say→said（说）, feel→felt（感觉）, begin→began（开始）, bring→brought（带来）, teach→taught（教）, sleep→slept（睡觉）, sit→sat（坐）。不规则动词的记忆没有什么捷径，最好的方法就是在句子中反复使用。试着用这些动词描述你昨天一天的经历：I woke up at 7. I sat on my bed. I thought about my plans... 把每个动词都用一遍，印象就深刻了！',
    extraRules: [
      'bought（买了）, thought（想了）, brought（带来了）, taught（教了）：-ought/-aught结尾组',
      'wrote（写了）, spoke（说了）, knew（知道了）, began（开始了）：元音变化组',
      'told（告诉了）, found（找到了）, said（说了）, felt（感觉了）：-old/-ound/-aid/-elt 结尾组',
      'slept（睡了）, sat（坐了）, got（得到了）, left（离开了）：短元音变化组',
      "过去时各种句式：I bought... / I didn't buy... / Did you buy...? / What did you buy?",
    ],
    extraExamples: [
      {
        english: 'I slept for eight hours last night.',
        chinese: '我昨晚睡了八个小时。',
        grammarPoint: 'sleep → slept',
      },
      {
        english: 'He sat next to me in class.',
        chinese: '他上课时坐在我旁边。',
        grammarPoint: 'sit → sat',
      },
      {
        english: 'We found a lost dog in the street.',
        chinese: '我们在街上找到了一只走丢的狗。',
        grammarPoint: 'find → found',
      },
      {
        english: 'Did she speak English at the meeting?',
        chinese: '她在会议上说英语了吗？',
        grammarPoint: 'Did + she + speak?（疑问句）',
      },
      {
        english: "He didn't know the answer.",
        chinese: '他不知道答案。',
        grammarPoint: "didn't know（否定句）",
      },
      {
        english: "The concert began at seven o'clock.",
        chinese: '音乐会在七点开始了。',
        grammarPoint: 'begin → began',
      },
    ],
    extraTips: [
      '口诀复习："think-thought, buy-bought, bring-brought, teach-taught; 四个-ought记得牢"',
      '分组记忆法：把"说"相关的词放在一起——speak-spoke, tell-told, say-said，三个词三种变化',
      '造句练习：用今天学的不规则动词写一篇"我的昨天"小作文，每个动词至少用一次！',
    ],
  },

  // ==================== 第77课：一般过去时综合练习 ====================
  77: {
    explanation:
      '今天我们来做一般过去时的"大综合"练习！一般过去时是用来描述过去发生的动作或状态的时态，就像翻开一本"回忆相册"。过去时有两种动词变化：规则动词加-ed（played, watched, cleaned）和不规则动词需要单独记忆（went, saw, ate, bought）。过去时有三种句式：肯定句（I went to the park.）、否定句（I didn\'t go to the park.）、疑问句（Did you go to the park?）。be动词的过去式是was/ware：I was happy. They were at home. 否定：I wasn\'t happy. They weren\'t at home. 疑问：Was he happy? Were they at home? 记住过去时的标志词：yesterday, last week/month/year, ... ago, in 2020, just now（刚才）, then（那时）。有了这些"时间信号"，你就知道该用过去时了！',
    extraRules: [
      '规则动词过去式加-ed：help→helped, play→played, study→studied, stop→stopped',
      '不规则动词过去式需要记忆：go→went, see→saw, eat→ate, buy→bought, write→wrote',
      "否定句：主语 + didn't + 动词原形：I didn't go. / She didn't eat.",
      '疑问句：Did + 主语 + 动词原形？ Did you see? / Did he buy?',
      'be动词过去时：was/were + 形容词/名词/介词短语：I was tired. / They were at school.',
    ],
    extraExamples: [
      {
        english: 'Last weekend, I went to the zoo with my family.',
        chinese: '上个周末，我和家人去了动物园。',
        grammarPoint: 'went（不规则动词过去式）',
      },
      {
        english: 'We saw many animals there.',
        chinese: '我们在那里看到了很多动物。',
        grammarPoint: 'see → saw',
      },
      {
        english: "I didn't take any photos.",
        chinese: '我没拍任何照片。',
        grammarPoint: "didn't take（否定句）",
      },
      {
        english: 'Did you have a good time?',
        chinese: '你们玩得开心吗？',
        grammarPoint: 'Did + 主语 + 动词原形?',
      },
      {
        english: 'Yes, we did. It was a wonderful day!',
        chinese: '是的，那真是美好的一天！',
        grammarPoint: 'Yes, we did. / It was...',
      },
      {
        english: 'The weather was sunny and warm.',
        chinese: '天气晴朗而温暖。',
        grammarPoint: 'was + 形容词（描述过去状态）',
      },
    ],
    extraTips: [
      '记忆口诀："过去时态表从前，规则动词加ed；不规则动词要背记，didn\'t和did用原形"',
      "易错提醒：最常犯的错误就是在didn't后面用过去式！记住：didn't + 原形，Did + 主语 + 原形",
      '生活练习：用英语写一篇"我的上个周末"小日记，尽量用上规则动词和不规则动词的过去式！',
    ],
  },

  // ==================== 第78课：复习：一般过去时综合练习 ====================
  78: {
    explanation:
      '今天我们对一般过去时进行全面大复习！一般过去时是英语中最常用的时态之一，用来描述过去发生的事情。我们已经学习了四大块内容：第一，be动词的过去式was/were（I was, you were, he was...）；第二，规则动词的过去式（加-ed的四种规则）；第三，不规则动词的过去式（go→went, see→saw, buy→bought等）；第四，过去时的否定和疑问（didn\'t + 原形, Did + 主语 + 原形?）。现在把它们全部串起来：肯定句"He went to the library."，否定句"He didn\'t go to the library."，疑问句"Did he go to the library?"；或者be动词句子"She was tired."，否定"She wasn\'t tired."，疑问"Was she tired?"。过去时的标志词很重要：yesterday, last week, ... ago, in 2023, just now, then, this morning等。',
    extraRules: [
      '过去时肯定句：主语 + 动词过去式（规则/不规则）/ was/were',
      "过去时否定句：主语 + didn't + 动词原形 / wasn't / weren't",
      '过去时疑问句：Did + 主语 + 动词原形? / Was/Were + 主语...?',
      '过去时特殊疑问句：What/Where/When/How + did + 主语 + 动词原形?',
      '常用过去时间标志词：yesterday, last night/week/month/year, two days ago, in 2023, just now, then, this morning',
    ],
    extraExamples: [
      {
        english: 'I woke up early and brushed my teeth.',
        chinese: '我早早起床，刷了牙。',
        grammarPoint: 'wake → woke（不规则动词）+ brush → brushed（规则动词）',
      },
      {
        english: "We didn't have any homework yesterday.",
        chinese: '我们昨天没有任何作业。',
        grammarPoint: "didn't have（否定句）",
      },
      {
        english: 'What did you do last weekend?',
        chinese: '你上个周末做了什么？',
        grammarPoint: 'What did + 主语 + do?（特殊疑问句）',
      },
      {
        english: 'The children were very excited about the trip.',
        chinese: '孩子们对这次旅行非常兴奋。',
        grammarPoint: 'were + 形容词',
      },
      {
        english: 'I found my lost key under the bed.',
        chinese: '我在床底下找到了丢失的钥匙。',
        grammarPoint: 'find → found',
      },
      {
        english: 'Was the exam difficult?',
        chinese: '考试难吗？',
        grammarPoint: 'Was + 主语 + 形容词?（疑问句）',
      },
    ],
    extraTips: [
      '口诀复习："过去时态不难学，was/were管状态；规则动词加ed，不规则动词背下来；否定疑问用did，动词回到原形态"',
      '易错提醒：最容易混淆的是didn\'t后面用原形还是过去式——记住"一个句子只保留一个过去标志"',
      '终极练习：用英语给你的好朋友讲述一个"过去的故事"，至少用8个不同的过去时动词！',
    ],
  },

  // ==================== 第79课：need和want的用法 ====================
  79: {
    explanation:
      'need和want就像你的"愿望清单"上的两个小精灵！want表示"想要"，是你心里的愿望和渴望，比如"I want a new toy"（我想要一个新玩具）、"She wants to go to the park"（她想去公园）。need表示"需要"，是你生活中必须有的东西，比want更紧急更重要，比如"I need water"（我需要水）、"You need to study"（你需要学习）。当need和want后面跟动词时，都要加to do（动词不定式），形成"want to do"和"need to do"的结构。比如"I want to play football"（我想踢足球）、"I need to finish my homework"（我需要完成作业）。want可以用于所有人称不变形，但如果主语是第三人称单数（he/she/it），want要加-s变成wants，need也是一样变成needs。它们是否定和疑问都可以直接加助动词：I don\'t want... / Do you need...?',
    extraRules: [
      'want表示"想要"：I want a book. / She wants to go home.（三单用wants）',
      'need表示"需要"：I need some water. / He needs to sleep.（三单用needs）',
      'want/need + to do：I want to play. / She needs to study.（后面跟动词用to do）',
      "否定句：主语 + don't/doesn't + want/need：I don't want to go. / She doesn't need help.",
      '疑问句：Do/Does + 主语 + want/need...? Do you want some tea? / Does he need a pen?',
    ],
    extraExamples: [
      {
        english: 'I want to eat an ice cream.',
        chinese: '我想吃一个冰淇淋。',
        grammarPoint: 'I want to + 动词原形',
      },
      {
        english: 'She needs to do her homework now.',
        chinese: '她现在需要做作业。',
        grammarPoint: 'She needs to + 动词原形',
      },
      {
        english: 'Do you want to come with me?',
        chinese: '你想和我一起去吗？',
        grammarPoint: 'Do you want to...?（疑问句）',
      },
      {
        english: "I don't need any help, thank you.",
        chinese: '我不需要帮助，谢谢。',
        grammarPoint: "I don't need（否定句）",
      },
      {
        english: 'He wants a new schoolbag.',
        chinese: '他想要一个新书包。',
        grammarPoint: 'He wants + 名词（三单）',
      },
      {
        english: 'We need to be quiet in the library.',
        chinese: '我们在图书馆需要保持安静。',
        grammarPoint: 'We need to + 动词原形',
      },
    ],
    extraTips: [
      '记忆口诀："want想要need需要，后面to do不能少；三单记得加s，否定疑问用do帮"',
      '易错提醒：want和need后面跟动词时一定要加to！不能说"I want play"，要说"I want to play"',
      '区别小贴士：want是"想不想"（可有可无），need是"需不需要"（必须有）——I want candy but I need food!',
    ],
  },

  // ==================== 第80课：复习：need和want练习 ====================
  80: {
    explanation:
      "今天我们来全面复习need和want的用法！need和want是我们日常生活中用得最多的动词之一。want表达的是愿望和渴望——你想要什么、想要做什么；need表达的是需求和必要——你需要什么、需要做什么。两者后面跟动词时都要接to do，形成want to do和need to do的句型。比如描述你的日常：I want to watch TV but I need to do my homework first.（我想看电视，但我需要先做作业。）注意第三人称单数的变化：He wants to play. / She needs to go. 否定句和疑问句都用do/does帮忙：Do you want to go? / Does she need to leave? / I don't want to eat. / He doesn't need to come. want还可以直接加名词：I want a new phone.（我想要一部新手机。）need也可以直接加名词：I need a pencil.（我需要一支铅笔。）",
    extraRules: [
      'want + 名词：I want a book. / She wants some water.',
      'want + to do：I want to go. / They want to play football.',
      'need + 名词：I need a pen. / He needs some help.',
      'need + to do：I need to go. / She needs to clean her room.',
      "否定和疑问：I don't want/need... / Do you want/need...? / He doesn't want/need... / Does he want/need...?",
    ],
    extraExamples: [
      {
        english: 'I want to be a doctor when I grow up.',
        chinese: '我长大后想当医生。',
        grammarPoint: 'I want to be（想成为）',
      },
      {
        english: 'Do you need any help with your bag?',
        chinese: '你需要帮忙拿包吗？',
        grammarPoint: 'Do you need...?（疑问句）',
      },
      {
        english: "She doesn't want to go to bed yet.",
        chinese: '她还不想睡觉。',
        grammarPoint: "doesn't want to（否定句）",
      },
      {
        english: 'We need to practice English every day.',
        chinese: '我们每天需要练习英语。',
        grammarPoint: 'We need to + 动词原形',
      },
      {
        english: 'My brother wants a bicycle for his birthday.',
        chinese: '我哥哥生日想要一辆自行车。',
        grammarPoint: '主语 + wants + 名词',
      },
      {
        english: 'Does the plant need more water?',
        chinese: '这棵植物需要更多的水吗？',
        grammarPoint: 'Does + 主语 + need...?（疑问句）',
      },
    ],
    extraTips: [
      '口诀复习："want想要need需要，名词动词都能接；动词前面加to do，三单变化要注意"',
      '易错提醒：He want to go ❌ → He wants to go ✓ 三单别忘了加-s！Does he wants? ❌ → Does he want? ✓ 有助动词时用原形',
      '生活练习：列出你的"want清单"和"need清单"——I want a toy car, a new game... I need new shoes, more pencils... 用英语写下来吧！',
    ],
  },
};

export default batch3;
