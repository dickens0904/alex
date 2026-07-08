/**
 * 新概念英语第一册 - 补充语法讲解数据（全部100个语法主题）
 * 增强版讲解、额外规则、额外例句、额外学习技巧
 * 面向小学/初中生，通俗易懂，生活化比喻
 */

import { GrammarExample } from '../../types/lesson';
import batch1 from './grammarEnhancedBatch1';
import batch2 from './grammarEnhancedBatch2';
import batch3 from './grammarEnhancedBatch3';
import batch4 from './grammarEnhancedBatch4';

interface EnhancedContent {
  /** 增强版讲解（替换原来的 explanation） */
  explanation: string;
  /** 额外的语法规则（追加到原有 rules 后面） */
  extraRules: string[];
  /** 额外的例句（追加到原有 examples 后面） */
  extraExamples: GrammarExample[];
  /** 额外的学习技巧（追加到原有 tips 后面） */
  extraTips: string[];
}

const baseContent: Record<number, EnhancedContent> = {
  // ==================== 第1课：be动词肯定式 ====================
  1: {
    explanation:
      'be动词就像是英语句子中的"胶水"，它把主语和后面的信息连接起来。比如中文说"我是一个学生"，英语就是"I am a student"。这里的am就是be动词的一种形式。be动词有三种"变身"：am专门给"I"用，is给"他/她/它"用，are给"你"和复数主语用。就像超级英雄有不同的变身形态，be动词也会根据主语改变自己的样子！记住这个口诀："我用am，你用are，is连着他她它，复数全部都用are。"be动词后面可以跟名词（说明身份）、形容词（描述特征）或介词短语（说明位置），就像一个多才多艺的连接器，什么都能连！',
    extraRules: [
      'be动词后面可以跟名词（I am a student）、形容词（She is beautiful）或介词短语（It is on the table）',
      "在非正式口语和写作中，am常缩写为'm，is缩写为's，are缩写为're",
      'It is... 可以用来描述天气、时间、距离等：It is sunny today.（今天天气晴朗。）',
      'This is... 和 That is... 用来介绍事物：This is my book.（这是我的书。）',
      '人名后面也用is：Tom is my brother.（汤姆是我的哥哥。）',
    ],
    extraExamples: [
      {
        english: 'I am ten years old.',
        chinese: '我十岁了。',
        grammarPoint: 'I + am + 形容词短语',
      },
      {
        english: 'My mom is a doctor.',
        chinese: '我妈妈是一名医生。',
        grammarPoint: '第三人称单数 + is + 名词',
      },
      {
        english: 'We are in the classroom.',
        chinese: '我们在教室里。',
        grammarPoint: 'We + are + 介词短语',
      },
      {
        english: 'The cat is very cute.',
        chinese: '这只猫非常可爱。',
        grammarPoint: 'It + is + 形容词',
      },
      {
        english: 'They are my classmates.',
        chinese: '他们是我的同学。',
        grammarPoint: 'They + are + 名词',
      },
    ],
    extraTips: [
      '小窍门：把be动词想象成"变色龙"，它会跟着主语变颜色！I→am, he/she/it→is, 其他→are',
      '常见错误：不要说 "I is" 或 "He am"，这是初学者最常犯的错误之一',
      '趣味知识：be动词是英语中使用频率最高的词之一，几乎每个英语句子都会用到它！',
    ],
  },

  // ==================== 第2课：be动词一般疑问句 ====================
  2: {
    explanation:
      '一般疑问句就像是一个"是或否"的开关。把be动词从主语后面挪到主语前面，就变成了一个需要对方回答"是"或"不是"的问句。比如肯定句"This is your book"（这是你的书），把is提到this前面就变成了"Is this your book?"（这是你的书吗？）。回答的时候，肯定就用"Yes"开头，否定就用"No"开头，而且要"翻回去"——把be动词再放回主语后面。就像玩"翻花绳"一样，把be动词翻到前面提问，再翻回去回答！',
    extraRules: [
      '疑问句语序：Be动词 + 主语 + 其他部分？（肯定句中be动词在主语后，疑问句中be动词在主语前）',
      '肯定回答：Yes, 主语 + be动词. （回答中主语要和问句一致）',
      "否定回答：No, 主语 + be动词 + not.（可以用缩写形式如 isn't, aren't）",
      '回答中用this/that提问时，回答要用it代替：Is this your pen? → Yes, it is.',
      '注意：问句用"你"提问，回答用"I"（我）来回答：Are you a student? → Yes, I am.',
    ],
    extraExamples: [
      {
        english: 'Is this your pencil?',
        chinese: '这是你的铅笔吗？',
        grammarPoint: 'Is + this + 名词',
      },
      { english: 'Yes, it is.', chinese: '是的，它是。', grammarPoint: '肯定回答用it' },
      { english: 'Are you a student?', chinese: '你是学生吗？', grammarPoint: 'Are + you + 名词' },
      {
        english: "No, I'm not. I'm a teacher.",
        chinese: '不，我不是。我是老师。',
        grammarPoint: '否定回答用I',
      },
      {
        english: 'Is she your sister?',
        chinese: '她是你的姐姐吗？',
        grammarPoint: 'Is + she + 名词',
      },
      { english: 'Yes, she is.', chinese: '是的，她是。', grammarPoint: '肯定回答保持人称' },
    ],
    extraTips: [
      '记忆窍门：疑问句就像把be动词"请到最前面当门卫"，它要第一个出来迎接问题',
      '易错点：回答时不要说"Yes, it\'s."，要用完整形式"Yes, it is."（\'t的缩写在句末不太自然）',
      '小练习：试着把家里的东西用"Is this your...?"来问一问，比如问爸妈"Is this your phone?"',
    ],
  },

  // ==================== 第3课：be动词否定式 ====================
  3: {
    explanation:
      '否定句就像给句子戴了一个"反面具"，在be动词后面加上not，意思就变成了"不是"。比如"I am a student"（我是学生）加上not就变成"I am not a student"（我不是学生）。为了让说话更快更方便，英语还发明了缩写形式：is not可以缩写成isn\'t，are not可以缩写成aren\'t。不过am not比较特殊，它没有标准的缩写形式。这就像三兄弟出门，两个都带了缩写"背包"，只有am没得背！记住，在否定句中，not永远紧跟在be动词后面，它们是"好搭档"。',
    extraRules: [
      '否定句结构：主语 + be动词 + not + 其他部分',
      "am not 没有标准缩写形式，不能写成 amn't 或 an't",
      "is not = isn't，are not = aren't（缩写形式在口语中更常用）",
      'not的位置：永远紧跟在be动词后面，不能放在主语前面',
      "在句末可以用简略否定回答：No, it isn't. / No, I'm not.",
    ],
    extraExamples: [
      { english: 'I am not hungry.', chinese: '我不饿。', grammarPoint: 'am not + 形容词' },
      { english: "He isn't at home.", chinese: '他不在家。', grammarPoint: "isn't + 介词短语" },
      { english: "We aren't late.", chinese: '我们没有迟到。', grammarPoint: "aren't + 形容词" },
      {
        english: "It isn't a dog. It's a cat.",
        chinese: '那不是狗，是猫。',
        grammarPoint: "isn't + 名词",
      },
      {
        english: "They aren't my books.",
        chinese: '那些不是我的书。',
        grammarPoint: "aren't + 名词短语",
      },
    ],
    extraTips: [
      '小口诀："be后加not变否定，am特殊没缩写，is变isn\'t好记忆，are变aren\'t也不难"',
      '常见错误：不要说"He not is a teacher"，正确的是"He isn\'t a teacher"，not要放在be后面',
      '趣味知识：isn\'t和aren\'t中的撇号（\'）表示省略了字母o，就像中文里把"不要"说成"别"',
    ],
  },

  // ==================== 第4课：名词单复数 ====================
  4: {
    explanation:
      '英语里的名词就像人一样，有"一个人"和"一群人"的区别。一个人或一件东西叫单数，两个或两个以上叫复数。单数变复数就像是给名词"穿鞋子"：大部分名词穿上"-s"这双普通鞋子就行了（book→books），但有些名词比较挑剔，要穿"-es"这双特别的鞋子（box→boxes）。还有些名词是"变形金刚"，会完全改变自己的样子（man→men）。最有趣的是不可数名词，比如water（水）和milk（牛奶），它们就像散沙一样，没法数，所以永远没有复数形式！',
    extraRules: [
      '一般名词加-s：cat→cats, dog→dogs, book→books',
      '以s, x, sh, ch结尾的名词加-es：bus→buses, box→boxes, dish→dishes, watch→watches',
      '以辅音字母+y结尾，变y为i再加-es：baby→babies, family→families, city→cities',
      '以元音字母+y结尾，直接加-s：boy→boys, day→days, key→keys',
      '以f或fe结尾的名词，变f/fe为v再加-es：knife→knives, wife→wives（但roof→roofs是例外）',
    ],
    extraExamples: [
      { english: 'I have two dogs.', chinese: '我有两只狗。', grammarPoint: '复数加-s' },
      {
        english: 'There are three boxes on the table.',
        chinese: '桌子上有三个盒子。',
        grammarPoint: '以x结尾加-es',
      },
      {
        english: 'She has many friends.',
        chinese: '她有很多朋友。',
        grammarPoint: '以辅音+y变ies',
      },
      {
        english: 'These are my baby brothers.',
        chinese: '这些是我的小弟弟们。',
        grammarPoint: 'baby→babies',
      },
      {
        english: 'We have five classes today.',
        chinese: '今天有五节课。',
        grammarPoint: '以s结尾加-es',
      },
      {
        english: 'I like apples and bananas.',
        chinese: '我喜欢苹果和香蕉。',
        grammarPoint: '水果复数形式',
      },
    ],
    extraTips: [
      '记住三个"特殊变形金刚"：man→men, woman→women, child→children（这三个最常考！）',
      '判断不可数名词的诀诀：如果一样东西被打碎或分开后还是叫同一个名字，它就是不可数的（如water, bread, rice）',
      '发音小秘密：清辅音（p, t, k等）后发/s/，浊辅音和元音后发/z/，s/x/sh/ch后发/ɪz/',
    ],
  },

  // ==================== 第5课：特殊疑问句What ====================
  5: {
    explanation:
      '特殊疑问句就像一个"探照灯"，专门用来寻找具体的信息。用疑问词What（什么）来问，就不能用简单的Yes或No回答了，必须给出真正的答案。比如"What\'s your name?"（你叫什么名字？），你得说出自己的名字才算回答了。特殊疑问句的语序是"疑问词 + be动词 + 主语"，和中文"你叫什么名字"的语序不太一样，英语要把"什么"放在最前面。What\'s 其实是 What is 的缩写形式，就像中文里把"不要"说成"别"一样，是一种简便说法。',
    extraRules: [
      '特殊疑问句结构：What + be动词 + 主语 + 其他？',
      '回答时直接给出具体信息，不用Yes/No开头',
      "What's = What is，是最常见的缩写形式之一",
      "What还可以问事物：What is this?（这是什么？）→ It's a book.",
      'What + 名词可以询问更具体的信息：What colour（什么颜色）、What time（什么时间）',
    ],
    extraExamples: [
      { english: "What's your name?", chinese: '你叫什么名字？', grammarPoint: "What's + 名词" },
      { english: 'My name is Lily.', chinese: '我叫莉莉。', grammarPoint: '具体回答名字' },
      { english: 'What is this?', chinese: '这是什么？', grammarPoint: 'What is + 代词' },
      { english: "It's an apple.", chinese: '这是一个苹果。', grammarPoint: '具体回答物品' },
      {
        english: "What's your phone number?",
        chinese: '你的电话号码是多少？',
        grammarPoint: "What's + 名词短语",
      },
      { english: "It's 13800138000.", chinese: '是13800138000。', grammarPoint: '具体回答数字' },
    ],
    extraTips: [
      '区分一般疑问句和特殊疑问句：一般疑问句用Yes/No回答（Is this...?），特殊疑问句要给出信息（What is...?）',
      '记住：特殊疑问句的语序是"疑问词在最前面"，不能说"Your name is what?"',
      '生活练习：每天早上和朋友互相问"What\'s your name?"来练习这个句型',
    ],
  },

  // ==================== 第6课：What colour疑问句 ====================
  6: {
    explanation:
      'What colour 就像一个"调色盘提问器"，专门用来问颜色。当我们想知道某个东西是什么颜色的时候，就用"What colour + be动词 + 主语？"这个句型。比如你想知道妈妈的新裙子是什么颜色，就可以问"What colour is your dress?"（你的裙子是什么颜色的？）。回答的时候直接说颜色名称就行："It\'s red."（是红色的。）注意，颜色名称前面不加a或the，直接说颜色就好。What colour中的colour在美式英语中写成color，但发音和意思完全一样。生活中颜色无处不在，学会这个句型，你就能用英语描述世界上所有的颜色啦！',
    extraRules: [
      'What colour 用来询问颜色，结构：What colour + be动词 + 主语？',
      "回答时颜色名称前不加冠词（a/an/the）：It's blue.（不是 It's a blue.）",
      '单数用What colour is it?，复数用What colour are they?',
      '颜色作定语时放在名词前：a red car（一辆红色的车），the green book（那本绿色的书）',
      '常见颜色：red(红), blue(蓝), green(绿), yellow(黄), white(白), black(黑), brown(棕), grey(灰), pink(粉), orange(橙), purple(紫)',
    ],
    extraExamples: [
      {
        english: 'What colour is your bag?',
        chinese: '你的书包是什么颜色的？',
        grammarPoint: 'What colour + is + 单数',
      },
      { english: "It's blue.", chinese: '是蓝色的。', grammarPoint: "It's + 颜色" },
      {
        english: 'What colour are her shoes?',
        chinese: '她的鞋子是什么颜色的？',
        grammarPoint: 'What colour + are + 复数',
      },
      { english: "They're white.", chinese: '是白色的。', grammarPoint: "They're + 颜色" },
      {
        english: 'I have a yellow pencil.',
        chinese: '我有一支黄色的铅笔。',
        grammarPoint: '颜色作定语',
      },
      { english: 'The sky is blue.', chinese: '天空是蓝色的。', grammarPoint: '自然事物的颜色' },
    ],
    extraTips: [
      '记忆口诀："What colour问颜色，is单数are复数，回答直接说颜色，前面不加a和the"',
      '易错点：不要说 "What colour is your dress?" → "It\'s a red."（错！应该是 It\'s red.）',
      '趣味知识：彩虹有七种颜色，英语叫 ROY G. BIV：Red, Orange, Yellow, Green, Blue, Indigo, Violet',
    ],
  },

  // ==================== 第7课：国籍与语言 ====================
  7: {
    explanation:
      '学习国籍就像是给每个人贴上一张"身份标签"。当我们想知道别人来自哪个国家，可以问"Are you French?"（你是法国人吗？）。国籍词（如French, Chinese, German）是形容词，它们跟国家名（如France, China, Germany）长得不一样，就像一个人的"小名"和"大名"，需要分别记住。最特别的是，有些国家的国籍词和语言名是同一个词，比如Chinese既是"中国人"也是"中文"，French既是"法国人"也是"法语"。国籍词的首字母必须大写，这是英语的"礼貌规则"——表示对每个国家的尊重。回答国籍问题时，国籍词前面不加a或an，直接说"I\'m Chinese."就好了。',
    extraRules: [
      "询问国籍：Are you + 国籍词？回答：Yes, I am. / No, I'm not. I'm + 国籍词.",
      '国籍词是形容词，首字母必须大写，前面不加冠词a/an/the',
      '国家名（名词）和国籍词（形容词）不同：China→Chinese, France→French, Germany→German',
      '表示"来自某国"用from：I\'m from China. / He\'s from Japan.',
      '有些国籍词和语言名相同：Chinese(中国人/中文), English(英国人/英语), French(法国人/法语), Japanese(日本人/日语)',
    ],
    extraExamples: [
      { english: 'Are you French?', chinese: '你是法国人吗？', grammarPoint: 'Are you + 国籍' },
      {
        english: "No, I'm not. I'm Chinese.",
        chinese: '不，我不是。我是中国人。',
        grammarPoint: '否定+补充国籍',
      },
      { english: 'Is he German?', chinese: '他是德国人吗？', grammarPoint: 'Is + he + 国籍' },
      {
        english: "Yes, he is. He's from Germany.",
        chinese: '是的，他是。他来自德国。',
        grammarPoint: '肯定+来自哪里',
      },
      { english: 'She speaks French.', chinese: '她说法语。', grammarPoint: '语言名与国籍同形' },
      {
        english: 'We are Chinese students.',
        chinese: '我们是中国学生。',
        grammarPoint: '国籍词作定语',
      },
    ],
    extraTips: [
      '记忆窍门：把国家和国籍配对记——France（法国）→ French（法国的），Germany（德国）→ German（德国的），Japan（日本）→ Japanese（日本的）',
      '常见错误：不要说"He\'s a Chinese."（错！），应该说"He\'s Chinese."国籍词前面不加a',
      '小知识：Chinese, Japanese, Swiss（瑞士人）等国籍词单复数同形，不需要加s',
    ],
  },

  // ==================== 第8课：人称代词与物主代词 ====================
  8: {
    explanation:
      '人称代词和物主代词就像是英语中的"双胞胎搭档"。人称代词（I, you, he, she, it, we, they）用来代替人或物的名字，放在句子开头当"主语"。物主代词（my, your, his, her, its, our, their）用来表示"谁的"，放在名词前面。想象一下：I（我）就像一个"自我介绍者"，而my（我的）就像一个"标签"，贴在属于"我"的东西上。比如"I am a student. This is my book."——第一句的I说明"谁"，第二句的my说明"谁的"。注意：物主代词后面一定要跟名词，不能单独说"This is my."，必须说"This is my book."',
    extraRules: [
      '人称代词（主格）作主语：I, you, he, she, it, we, they',
      '物主代词修饰名词：my, your, his, her, its, our, their',
      '物主代词后面必须跟名词，不能单独使用',
      '物主代词不随名词单复数变化：my book, my books（都是my）',
      "its（它的）≠ it's（它是）：Its tail is long. vs It's a cat.",
    ],
    extraExamples: [
      {
        english: 'I am a boy. My name is Tom.',
        chinese: '我是一个男孩。我的名字是汤姆。',
        grammarPoint: 'I → my 的转换',
      },
      {
        english: 'She is a girl. Her school is big.',
        chinese: '她是一个女孩。她的学校很大。',
        grammarPoint: 'She → her 的转换',
      },
      {
        english: 'He is a teacher. His class is fun.',
        chinese: '他是一位老师。他的课很有趣。',
        grammarPoint: 'He → his 的转换',
      },
      {
        english: 'We are students. Our classroom is clean.',
        chinese: '我们是学生。我们的教室很干净。',
        grammarPoint: 'We → our 的转换',
      },
      {
        english: 'They are friends. Their dog is cute.',
        chinese: '他们是朋友。他们的狗很可爱。',
        grammarPoint: 'They → their 的转换',
      },
      {
        english: 'It is a bird. Its wings are blue.',
        chinese: '它是一只鸟。它的翅膀是蓝色的。',
        grammarPoint: 'It → its 的转换',
      },
    ],
    extraTips: [
      '配对记忆法：I→my, you→your, he→his, she→her, it→its, we→our, they→their',
      '易混淆：his 既是"他的"（物主代词）也是"他的"（名词性物主代词），两个长得一样！',
      '小测试：试着造句"I have a cat. ___ name is Mimi."——这里应该填Its（它的），不是It\'s（它是）',
    ],
  },

  // ==================== 第9课：How与形容词 ====================
  9: {
    explanation:
      'How 就像一个"万能探针"，可以探测各种各样的信息。最常用的"How are you?"是见面时的问候语，询问对方身体状况或心情怎么样。回答的时候可以说"I\'m fine"（我很好）、"I\'m very well"（我非常好）或者"Not bad"（还不错）。除了问身体状况，How还能和别的词搭档：How old问年龄（How old are you? 你多大了？），How many问数量（How many books? 多少本书？）。在这一课中，我们重点学习How后面跟形容词的用法，比如"How are you?"中的fine/well就是形容词，用来描述状态。',
    extraRules: [
      'How are you? 是问候语，用来问对方身体/心情状况',
      "回答方式：Fine. / I'm fine. / I'm very well. / Not bad. / So-so.",
      "How old 询问年龄：How old are you? → I'm ten.",
      'How many 询问可数名词数量：How many students? → Thirty.',
      'How much 询问不可数名词数量或价格：How much is it? → Five yuan.',
    ],
    extraExamples: [
      { english: 'How are you today?', chinese: '你今天好吗？', grammarPoint: 'How + are + 主语' },
      {
        english: "I'm fine, thank you. And you?",
        chinese: '我很好，谢谢。你呢？',
        grammarPoint: '礼貌回答+反问',
      },
      {
        english: 'How is your mother?',
        chinese: '你妈妈好吗？',
        grammarPoint: 'How + is + 第三人称',
      },
      {
        english: "She's very well, thank you.",
        chinese: '她非常好，谢谢。',
        grammarPoint: '第三人称回答',
      },
      {
        english: 'How old is your brother?',
        chinese: '你弟弟多大了？',
        grammarPoint: 'How old 问年龄',
      },
      { english: 'He is eight years old.', chinese: '他八岁了。', grammarPoint: '回答年龄' },
    ],
    extraTips: [
      '文化小知识：在英语国家，"How are you?"更多是一种打招呼的方式，不一定要详细回答身体状况',
      '区分good和well：good是形容词（好的），well可以是形容词（身体好的）也可以是副词（好地）',
      '回答小贴士：回答完自己的状况后别忘了加"And you?"（你呢？），这是英语礼貌的习惯',
    ],
  },

  // ==================== 第10课：Look at与形容词 ====================
  10: {
    explanation:
      '"Look at"就像是一根"指向棒"，引起别人注意某个东西。当我们想让别人看某个东西时，就可以说"Look at..."（看……）。而形容词就像是给事物"打标签"的工具，告诉我们事物是什么样的。比如"Look at that man. He is tall."（看那个人。他很高。）这里的tall就是一个形容词，描述了那个人的特征。形容词通常放在be动词后面（He is tall）或者名词前面（a tall man）。在生活中，我们经常用"Look at + 东西/人"来引起别人的注意，然后用形容词来描述它。',
    extraRules: [
      'Look at + 名词/代词，表示"看……"，用来引起注意',
      'at是介词，后面跟名词或代词（look at me, look at that）',
      '形容词放在be动词后面作表语：He is tall. / She is beautiful.',
      '形容词放在名词前面作定语：a tall man / a beautiful girl',
      '多个形容词描述同一事物时，用and连接：He is tall and thin.（他又高又瘦。）',
    ],
    extraExamples: [
      {
        english: 'Look at that man! He is tall.',
        chinese: '看那个人！他很高。',
        grammarPoint: 'Look at + 形容词描述',
      },
      {
        english: 'Look at the dog. It is fat.',
        chinese: '看那只狗。它很胖。',
        grammarPoint: 'Look at + 动物 + 形容词',
      },
      {
        english: 'She is short and thin.',
        chinese: '她又矮又瘦。',
        grammarPoint: '多个形容词用and连接',
      },
      {
        english: 'Look at my new dress. It is beautiful.',
        chinese: '看我的新裙子。它很漂亮。',
        grammarPoint: 'Look at + 物品描述',
      },
      {
        english: 'The children are happy.',
        chinese: '孩子们很开心。',
        grammarPoint: '复数主语 + are + 形容词',
      },
      {
        english: 'Look at those flowers. They are red and yellow.',
        chinese: '看那些花。它们是红黄相间的。',
        grammarPoint: 'Look at + 复数描述',
      },
    ],
    extraTips: [
      '区分look和look at：look单独使用表示"看"（不及物），look at后面必须跟"看什么"',
      '常见形容词：tall(高), short(矮), fat(胖), thin(瘦), old(老/旧), young(年轻), big(大), small(小)',
      '趣味练习：看到身边的东西就用"Look at... It/He/She is..."造句，练习形容词的使用',
    ],
  },

  // ==================== 第11课：Whose疑问句 ====================
  11: {
    explanation:
      'Whose 就像一个"寻物侦探"，专门用来寻找东西的主人。当我们看到一件东西不知道是谁的，就用"Whose + 名词 + be动词 + ...?"来问。比如看到地上有一件衬衫，就可以问"Whose shirt is that?"（那是谁的衬衫？）。Whose的意思是"谁的"，和Who（谁）是"一家人"，但Whose专门问归属。回答时可以用人名或物主代词："It\'s Tom\'s."（是汤姆的。）或者"It\'s mine."（是我的。）。名词所有格（如Tom\'s）中的\'s表示"……的"，就像中文里的"的"字。',
    extraRules: [
      'Whose 用来问"谁的"，结构：Whose + 名词 + be动词 + ...?',
      "回答：It's + 人名's. 或 It's + 名词性物主代词(mine, yours, his, hers).",
      "名词所有格加's：Tom's book（汤姆的书），Lucy's dress（露西的裙子）",
      "以s结尾的复数名词只加'：the students' books（学生们的书）",
      'Whose可以单独使用不加名词：Whose is this?（这是谁的？）= Whose book is this?',
    ],
    extraExamples: [
      {
        english: 'Whose shirt is that?',
        chinese: '那是谁的衬衫？',
        grammarPoint: 'Whose + 名词 + is...',
      },
      { english: "It's my brother's.", chinese: '是我哥哥的。', grammarPoint: '名词所有格回答' },
      {
        english: 'Whose book is this?',
        chinese: '这是谁的书？',
        grammarPoint: 'Whose + 物品 + is...',
      },
      { english: "It's Tom's.", chinese: '是汤姆的。', grammarPoint: "人名's 回答" },
      {
        english: 'Whose shoes are these?',
        chinese: '这些是谁的鞋子？',
        grammarPoint: 'Whose + 复数名词 + are...',
      },
      {
        english: "They're Lucy's.",
        chinese: '是露西的。',
        grammarPoint: "复数用They're + 名词所有格",
      },
    ],
    extraTips: [
      "记住Whose的发音和Who's（Who is的缩写）完全一样！但意思不同：Whose=谁的，Who's=谁是",
      "所有格's的发音：清辅音后读/s/（Tom's），浊辅音和元音后读/z/（Lucy's），以s结尾加/ɪz/",
      '趣味知识：英语中\'s还可以表示"is"的缩写（It\'s a cat.），要根据语境判断是"的"还是"是"',
    ],
  },

  // ==================== 第12课：名词性物主代词 ====================
  12: {
    explanation:
      '名词性物主代词就像是"万能替代者"，它可以单独使用，不需要再跟名词。我们已经学过形容词性物主代词（my, your, his, her），它们后面必须跟名词。而名词性物主代词（mine, yours, his, hers）就像是"自带名词"的版本，可以独立出现。比如"This is my book"和"This book is mine"意思一样，但mine代替了"my book"。想象一下：形容词性物主代词是"黏黏贴"，必须贴在名词上；名词性物主代词是"独立勋章"，自己就能代表一切！特别注意：his既是形容词性也是名词性物主代词，形式完全一样。',
    extraRules: [
      '名词性物主代词：mine(我的), yours(你的), his(他的), hers(她的), its(它的), ours(我们的), theirs(他们的)',
      '名词性物主代词 = 形容词性物主代词 + 名词，可以独立使用',
      'his 既是形容词性物主代词也是名词性物主代词（形式相同）',
      'whose也有对应的名词性形式，但不常用',
      '名词性物主代词常用于避免重复：This is my pen. That is yours. (= your pen)',
    ],
    extraExamples: [
      {
        english: 'This is my book. That is yours.',
        chinese: '这是我的书。那是你的。',
        grammarPoint: 'yours = your book',
      },
      {
        english: 'Her dress is red. Mine is blue.',
        chinese: '她的裙子是红色的。我的是蓝色的。',
        grammarPoint: 'mine = my dress',
      },
      {
        english: "Is this his pencil? No, it's hers.",
        chinese: '这是他的铅笔吗？不，是她的。',
        grammarPoint: 'hers = her pencil',
      },
      {
        english: 'Our classroom is big. Theirs is small.',
        chinese: '我们的教室大。他们的小。',
        grammarPoint: 'theirs = their classroom',
      },
      {
        english: "Tom's dog is white. Mine is brown.",
        chinese: '汤姆的狗是白色的。我的是棕色的。',
        grammarPoint: 'mine = my dog',
      },
      {
        english: "Whose bag is this? It's mine.",
        chinese: '这是谁的包？是我的。',
        grammarPoint: 'mine单独回答',
      },
    ],
    extraTips: [
      '配对记忆：my→mine, your→yours, his→his, her→hers, its→its, our→ours, their→theirs',
      "易错点：不要把its（它的）和it's（它是）混淆！it's永远不能当物主代词用",
      "判断技巧：如果句子中已经有了名词，用形容词性物主代词（my book）；如果没有名词，用名词性物主代词（It's mine.）",
    ],
  },

  // ==================== 第13课：What colour疑问句复习 ====================
  13: {
    explanation:
      '这一课我们再次回到颜色话题，把What colour疑问句学得更扎实。上次我们学会了问"What colour is it?"，这次我们来学习更复杂的用法。当我们询问某人的衣物颜色时，要注意主语是单数还是复数：单数用is（What colour is your dress?），复数用are（What colour are your shoes?）。回答也要配合：单数用It\'s，复数用They\'re。颜色除了可以回答问题，还可以直接放在名词前面当"修饰语"，比如a green dress（一条绿色的裙子）。这样，描述事物的颜色就变得灵活多了！',
    extraRules: [
      "What colour's = What colour is（口语中常用缩写）",
      "单数提问：What colour is your new dress? → It's green.",
      "复数提问：What colour are your shoes? → They're black.",
      '颜色作定语：a + 颜色 + 名词（a white shirt 一件白衬衫）',
      'light/dark + 颜色表示深浅：light blue(浅蓝色), dark green(深绿色)',
    ],
    extraExamples: [
      {
        english: "What colour's your new dress?",
        chinese: '你的新裙子是什么颜色的？',
        grammarPoint: "What colour's = What colour is",
      },
      { english: "It's green.", chinese: '是绿色的。', grammarPoint: '单数回答' },
      {
        english: "What colour's his new car?",
        chinese: '他的新车是什么颜色的？',
        grammarPoint: '询问第三人称物品颜色',
      },
      { english: "It's blue.", chinese: '是蓝色的。', grammarPoint: '单数回答颜色' },
      {
        english: 'Come upstairs and see it.',
        chinese: '上楼来看看吧。',
        grammarPoint: 'come and see 句型',
      },
      {
        english: 'My hat is the same colour as yours.',
        chinese: '我的帽子和你的帽子颜色一样。',
        grammarPoint: '颜色比较',
      },
    ],
    extraTips: [
      '复习口诀："What colour问颜色，is单数are复数，It\'s单数They\'re复数，对应整齐不出错"',
      '扩展词汇：orange(橙色), pink(粉色), purple(紫色), gold(金色), silver(银色)',
      '趣味知识：英语中的colour是英式拼写，color是美式拼写，两种都对，就像"颜色"和"顔色"',
    ],
  },

  // ==================== 第14课：祈使句 ====================
  14: {
    explanation:
      '祈使句就像是一个"遥控器"，可以直接发出指令、请求或邀请。它的特点是没有主语（省略了"你"），直接以动词开头。比如"Come and see it."（过来看看。）就是一个祈使句，省略了主语you。祈使句在生活中无处不在：妈妈说"Open the door."（开门。），老师说"Sit down, please."（请坐下。），朋友说"Come and play with me."（来和我玩。）。祈使句可以是命令（语气强），也可以是请求（加please语气柔和）。否定祈使句用"Don\'t + 动词原形"，比如"Don\'t open the window."（别开窗户。）',
    extraRules: [
      '祈使句结构：动词原形 + 其他（省略主语you）',
      '肯定祈使句：Open the door. / Come here. / Sit down, please.',
      "否定祈使句：Don't + 动词原形 + 其他。Don't open the window.",
      '加please表示礼貌：Please come in. / Come in, please.（please可以在句首或句末）',
      'come and + 动词表示"来……做某事"：Come and see.（过来看。）Come and meet Sophie.（来见见索菲。）',
    ],
    extraExamples: [
      { english: 'Come and see it.', chinese: '过来看看它。', grammarPoint: 'come and + 动词' },
      { english: 'Open the door, please.', chinese: '请开门。', grammarPoint: '祈使句 + please' },
      { english: "Don't be late.", chinese: '别迟到。', grammarPoint: "Don't + 动词原形" },
      {
        english: 'Sit down and listen.',
        chinese: '坐下听讲。',
        grammarPoint: '祈使句 + and + 动词',
      },
      {
        english: "Please don't touch that.",
        chinese: '请不要碰那个。',
        grammarPoint: "Please don't + 动词",
      },
      {
        english: 'Come and play with us!',
        chinese: '来和我们一起玩！',
        grammarPoint: 'come and + 动词 + with',
      },
    ],
    extraTips: [
      '小窍门：祈使句 = 动词原形开头 + 省略"你"，就像直接下命令一样',
      '语气变化：加上please就从"命令"变成"请求"——"Close the door."（命令）→ "Please close the door."（请求）',
      "否定祈使句记忆：Don't + 动词原形（不要加s/es！）——Don't run! Don't be sad!",
    ],
  },

  // ==================== 第15课：国籍与复数 ====================
  15: {
    explanation:
      '这一课把国籍和复数结合起来学习。当我们问一群人的国籍时，要用复数形式"Are they + 国籍词?"。比如看到一群游客，想问他们是不是丹麦人，就可以说"Are they Danish?"。回答时复数用"Yes, they are."或"No, they aren\'t."。国籍词有一个重要特点：大多数国籍词单复数同形，也就是说一个丹麦人和一群丹麦人都用Danish，不需要加s。这和普通名词不同（one book→two books），要特别注意。国籍词的首字母必须大写，这是英语的"铁规则"。',
    extraRules: [
      "询问复数国籍：Are they + 国籍词？ → Yes, they are. / No, they aren't.",
      '大多数国籍词单复数同形：a Chinese → two Chinese，不需要加s',
      '国籍词首字母必须大写：Chinese, Danish, Swedish, Korean',
      '区分国籍和国家：Danish(国籍词) ≠ Denmark(国家名)',
      '补充国籍：Korean(韩国的), Thai(泰国的), Brazilian(巴西的), Russian(俄罗斯的)',
    ],
    extraExamples: [
      { english: 'Are they Danish?', chinese: '他们是丹麦人吗？', grammarPoint: 'Are they + 国籍' },
      { english: 'Yes, they are.', chinese: '是的，他们是。', grammarPoint: '复数肯定回答' },
      {
        english: "No, they aren't. They're Swedish.",
        chinese: '不，他们不是。他们是瑞典人。',
        grammarPoint: '复数否定+纠正',
      },
      { english: 'Are you Korean?', chinese: '你是韩国人吗？', grammarPoint: 'Are you + 国籍' },
      {
        english: "I'm not Korean. I'm Chinese.",
        chinese: '我不是韩国人。我是中国人。',
        grammarPoint: '否定+纠正国籍',
      },
      {
        english: 'They are from Denmark. They are Danish.',
        chinese: '他们来自丹麦。他们是丹麦人。',
        grammarPoint: '国家→国籍转换',
      },
    ],
    extraTips: [
      '记住常见国家→国籍：Denmark→Danish, Sweden→Swedish, Korea→Korean, Thailand→Thai, Russia→Russian',
      '易错点：不要说"He is a Danish."（错！），应该说"He is Danish."（国籍词不加a）',
      '趣味知识：有些国籍词形式特别，如Spanish(西班牙的)、Polish(波兰的)、Finnish(芬兰的)都以-ish结尾',
    ],
  },

  // ==================== 第16课：职业与国籍 ====================
  16: {
    explanation:
      '这一课把职业和国籍结合在一起，学习如何询问和描述多个职业。当我们问一个人的职业时说"What\'s your job?"，问多个人的职业时说"What are their jobs?"——注意jobs变成了复数形式，因为是在问多份工作。回答也要用复数："They\'re mechanics."（他们是机械师。）注意复数职业名称前面不加a/an，直接说职业名称的复数形式就好。职业和国籍可以一起说："They\'re Chinese mechanics."（他们是中国机械师。）国籍放在职业前面，就像给职业加了一个"国家标签"。',
    extraRules: [
      "询问单人职业：What's your/his/her job? → I'm/He's/She's a + 职业.",
      "询问多人职业：What are their/your jobs? → They're/We're + 职业复数.",
      "复数职业名称前不加a/an：They're mechanics.（不是They're a mechanics.）",
      '国籍+职业的顺序：国籍在前，职业在后：Chinese mechanics, Swedish nurses',
      '职业复数变化规则和普通名词一样：mechanic→mechanics, nurse→nurses',
    ],
    extraExamples: [
      {
        english: 'What are their jobs?',
        chinese: '他们是做什么工作的？',
        grammarPoint: 'What are + their + 复数名词',
      },
      {
        english: "They're mechanics.",
        chinese: '他们是机械师。',
        grammarPoint: "They're + 职业复数",
      },
      {
        english: 'What are your jobs?',
        chinese: '你们是做什么工作的？',
        grammarPoint: '询问对方（复数）职业',
      },
      { english: "We're nurses.", chinese: '我们是护士。', grammarPoint: "We're + 职业复数" },
      {
        english: 'Are they Chinese mechanics?',
        chinese: '他们是中国机械师吗？',
        grammarPoint: '国籍 + 职业复数',
      },
      {
        english: "No, they're Korean mechanics.",
        chinese: '不，他们是韩国机械师。',
        grammarPoint: '否定+纠正国籍',
      },
    ],
    extraTips: [
      "配对记忆：job(单数)→jobs(复数)，与What搭配：What's your job? vs What are their jobs?",
      "their 和 they're 发音完全一样！但写法不同：their=他们的（物主代词），they're=他们是（缩写）",
      "复数职业不加a，但单数必须加：He's a mechanic. / They're mechanics.",
    ],
  },

  // ==================== 第17课：Come and meet... ====================
  17: {
    explanation:
      '"Come and meet..."是英语中介绍别人认识的经典句型，就像一个"介绍人"在主持见面会。当你想把一个人介绍给另一个人认识时，就可以说"Come and meet..."（来认识一下……）。这里的come是"来"的意思，meet是"见面/认识"的意思，两个动词用and连接。比如妈妈说"Come and meet my friend."（来认识一下我的朋友。）之后，通常会用"This is..."来做正式介绍。这个句型在生活中非常实用——开学第一天、参加聚会、带朋友来家里玩，都可以用到！',
    extraRules: [
      'Come and meet + 人名/人称，表示"来见见某人"',
      'meet 在这里是"认识、见面"的意思，不是"遇见"（偶然遇到）',
      '介绍之后常用"This is..."做正式介绍：Come and meet Sophie. This is Sophie.',
      'come and + 动词是常用搭配：come and see(来看看), come and meet(来见见), come and play(来玩)',
      '注意人称代词：介绍自己说"I\'m + 名字"，介绍别人说"This is + 名字"',
    ],
    extraExamples: [
      {
        english: 'Come and meet our employees.',
        chinese: '来见见我们的员工。',
        grammarPoint: 'Come and meet + 人',
      },
      { english: 'This is Nicola.', chinese: '这是妮古拉。', grammarPoint: '正式介绍' },
      {
        english: "She's our new student.",
        chinese: '她是我们的新同学。',
        grammarPoint: '补充介绍身份',
      },
      {
        english: 'Come and see my new room!',
        chinese: '来看看我的新房间！',
        grammarPoint: 'come and see + 物品',
      },
      {
        english: 'How do you do?',
        chinese: '你好！（初次见面正式问候）',
        grammarPoint: '正式问候语',
      },
      { english: "That's a lovely name.", chinese: '那是个好听的名字。', grammarPoint: '赞美回应' },
    ],
    extraTips: [
      '介绍顺序：先说"Come and meet..."引起注意，再说"This is..."正式介绍',
      '初次见面用"How do you do?"回答也是"How do you do?"（虽然现在越来越多人用"Nice to meet you."）',
      '生活练习：下次家里来客人时，试着用英语说"Come and meet my mom/dad/friend!"',
    ],
  },

  // ==================== 第18课：形容词复习 ====================
  18: {
    explanation:
      '这一课是对形容词的大复习，让我们把形容词的用法用得更加得心应手。形容词就像"标签"，用来描述人或事物是什么样的。它可以放在be动词后面（They are hard-working. 他们很勤奋。），也可以放在名词前面（a hard-working student 一个勤奋的学生）。形容词告诉我们人的性格（kind善良的、lazy懒惰的）、外貌（tall高的、beautiful漂亮的）、感受（happy开心的、tired累的）等等。复习时要注意：形容词在be动词后面不变化，不管主语是单数还是复数——He is tall. They are tall. 形容词tall都不变！',
    extraRules: [
      '形容词放在be动词后面作表语：主语 + be + 形容词',
      '形容词放在名词前面作定语：a/an + 形容词 + 名词',
      '形容词没有单复数变化：He is tall. / They are tall.（tall不变）',
      '多个形容词用and连接：He is tall and thin.（他又高又瘦。）',
      '常见性格/外貌形容词：hard-working(勤奋的), lazy(懒的), clever(聪明的), pretty(漂亮的), handsome(帅的)',
    ],
    extraExamples: [
      {
        english: "They're hard-working.",
        chinese: '他们很勤奋。',
        grammarPoint: '复数主语 + are + 形容词',
      },
      {
        english: "He's very clever.",
        chinese: '他非常聪明。',
        grammarPoint: 'very + 形容词（加强程度）',
      },
      {
        english: "She's a pretty girl.",
        chinese: '她是一个漂亮的女孩。',
        grammarPoint: '形容词作定语',
      },
      {
        english: 'The students are busy today.',
        chinese: '学生们今天很忙。',
        grammarPoint: '复数名词 + are + 形容词',
      },
      {
        english: 'My dog is cute and friendly.',
        chinese: '我的狗又可爱又友好。',
        grammarPoint: '多个形容词用and',
      },
      { english: 'Is he tall or short?', chinese: '他高还是矮？', grammarPoint: '形容词选择疑问' },
    ],
    extraTips: [
      '形容词的位置口诀："be后名词前，两个位置都常见"',
      'very（非常）可以加强形容词的程度：very good, very tall, very happy',
      '趣味知识：英语中有些形容词只能作表语不能作定语，比如alive（活着的）——只能说He is alive，不能说an alive man',
    ],
  },

  // ==================== 第19课：There is句型 ====================
  19: {
    explanation:
      '"There is"就像是一个"舞台聚光灯"，用来告诉我们某个地方"有"什么东西。中文说"房间里有一台冰箱"，英语就是"There is a refrigerator in the room."。这里的There is不代表"那里是"，而是一个固定搭配，表示"存在、有"。它的结构是"There is + 单数名词 + 地点"。There is可以缩写成There\'s。这个句型和"I have"（我有）不一样：There is强调"某个地方存在什么东西"，I have强调"某个人拥有什么东西"。比如"There is a cat on the table."（桌子上有一只猫。）vs "I have a cat."（我有一只猫。）——一个说位置，一个说拥有。',
    extraRules: [
      'There is + 单数可数名词/不可数名词 + 地点，表示"某地有某物"',
      "There is 可以缩写为 There's",
      'There is 和 I have 的区别：There is 强调存在（某地有），I have 强调拥有（某人有）',
      'There is 后面跟不可数名词时也用单数：There is some water in the cup.',
      "否定句：There isn't + 名词 + 地点。There isn't a book on the desk.",
      '疑问句：Is there + 名词 + 地点？Is there a book on the desk?',
    ],
    extraExamples: [
      {
        english: 'There is a refrigerator in the kitchen.',
        chinese: '厨房里有一台冰箱。',
        grammarPoint: 'There is + 单数名词 + 地点',
      },
      {
        english: "There's a big tree in the garden.",
        chinese: '花园里有一棵大树。',
        grammarPoint: "There's = There is",
      },
      {
        english: 'There is some milk in the glass.',
        chinese: '杯子里有一些牛奶。',
        grammarPoint: 'There is + 不可数名词',
      },
      {
        english: "There isn't a clock on the wall.",
        chinese: '墙上没有钟。',
        grammarPoint: "There isn't 否定句",
      },
      {
        english: 'Is there a park near here?',
        chinese: '这附近有公园吗？',
        grammarPoint: 'Is there 疑问句',
      },
      {
        english: "Yes, there is. It's next to the school.",
        chinese: '有的。在学校旁边。',
        grammarPoint: '肯定回答',
      },
    ],
    extraTips: [
      '区分There is和It is：There is表示"有"（存在），It is表示"是"（描述）。There is a book.（有一本书。）It is a book.（它是一本书。）',
      'There is后面只能跟单数或不可数名词，如果要表达多个东西，用There are（下一课学习）',
      '记忆口诀："There is表示某地有，单数名词后面走，缩写There\'s真方便，地点放在最后头"',
    ],
  },

  // ==================== 第20课：There are句型与复数 ====================
  20: {
    explanation:
      '如果上一课的There is是"单数聚光灯"，那There are就是"复数聚光灯"。当我们想说某个地方有多个东西时，就用"There are + 复数名词 + 地点"。比如"There are some books on the table."（桌子上有一些书。）。some表示"一些"，通常用在肯定句中；在否定句和疑问句中，some要变成any。比如"There aren\'t any books."（没有任何书。）"Are there any books?"（有书吗？）。There are和There is的区别只看后面的名词：单数/不可数用is，复数用are。就像选择鞋子一样——一只脚选单鞋，两只脚选双鞋！',
    extraRules: [
      'There are + 复数名词 + 地点，表示"某地有多个某物"',
      'some 用在肯定句中：There are some apples on the table.',
      "any 用在否定句和疑问句中：There aren't any apples. / Are there any apples?",
      "否定句：There aren't + any + 复数名词 + 地点.",
      '疑问句：Are there + any + 复数名词 + 地点？',
      'There is 和 There are 的选择取决于后面的名词：单数/不可数→is，复数→are',
    ],
    extraExamples: [
      {
        english: 'There are some books on the desk.',
        chinese: '桌子上有一些书。',
        grammarPoint: 'There are + some + 复数名词',
      },
      {
        english: 'There are five students in the classroom.',
        chinese: '教室里有五个学生。',
        grammarPoint: 'There are + 数量 + 复数名词',
      },
      {
        english: "There aren't any pencils in the box.",
        chinese: '盒子里没有铅笔。',
        grammarPoint: "There aren't + any",
      },
      {
        english: 'Are there any apples in the fridge?',
        chinese: '冰箱里有苹果吗？',
        grammarPoint: 'Are there + any 疑问句',
      },
      {
        english: 'Yes, there are. There are some red ones.',
        chinese: '有的。有一些红的。',
        grammarPoint: '复数肯定回答',
      },
      {
        english: "No, there aren't any.",
        chinese: '没有，一个也没有。',
        grammarPoint: '复数否定回答',
      },
    ],
    extraTips: [
      '口诀："单数is复数are，some肯定any否，There is/are放在首，地点名词后面走"',
      'some和any的区别：肯定句用some（I have some books.），否定句和疑问句用any（Do you have any books?）',
      '注意回答：Are there any...? 的简略回答是"Yes, there are."或"No, there aren\'t."（不能缩写成there\'re）',
    ],
  },
};

// 合并所有批次数据（主题1-20在上方定义，21-100在批次文件中）
const grammarEnhancedContent: Record<number, EnhancedContent> = {
  ...baseContent,
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
};

export default grammarEnhancedContent;
