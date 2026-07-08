/**
 * 新概念英语第一册 - 语法详解数据
 * 每课的语法讲解、例句和练习题
 */

import { GrammarDetail } from '../../types/lesson';

// 语法数据映射：lessonId -> GrammarDetail
export const grammarData: Record<number, GrammarDetail> = {
  // ==================== 第1-12课：基础问候和be动词 ====================

  1: {
    title: 'be动词的用法（is/am/are）',
    explanation:
      'be动词是英语中最基本的动词，表示"是"。根据主语的不同，使用不同的形式：I用am，you/复数用are，第三人称单数用is。',
    rules: [
      "I am = I'm（我是）",
      "You/We/They are = You're/We're/They're（你是/我们是/他们是）",
      "He/She/It is = He's/She's/It's（他/她/它是）",
      '否定形式：在be动词后加not',
      '疑问形式：将be动词提前到句首',
    ],
    examples: [
      { english: 'I am a student.', chinese: '我是一个学生。' },
      { english: 'You are my friend.', chinese: '你是我的朋友。' },
      { english: 'He is a teacher.', chinese: '他是一位老师。' },
      { english: 'She is beautiful.', chinese: '她很漂亮。' },
      { english: 'It is a cat.', chinese: '它是一只猫。' },
    ],
    exercises: [
      {
        question: 'I _____ a student.',
        options: ['am', 'is', 'are', 'be'],
        answer: 0,
        explanation: '主语是I，所以用am。',
      },
      {
        question: 'She _____ my sister.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: '主语是She（第三人称单数），所以用is。',
      },
      {
        question: 'They _____ friends.',
        options: ['am', 'is', 'are', 'be'],
        answer: 2,
        explanation: '主语是They（复数），所以用are。',
      },
    ],
    tips: [
      '记住口诀：我用am，你用are，is连着他她它',
      '缩写形式在口语中更常用',
      "否定形式：I am not, You aren't, He isn't",
    ],
  },

  2: {
    title: 'be动词的疑问句和否定句',
    explanation: '将be动词提前可以构成一般疑问句，在be动词后加not构成否定句。回答用Yes/No。',
    rules: [
      '一般疑问句：Be动词 + 主语 + 其他？',
      '否定句：主语 + be动词 + not + 其他',
      '肯定回答：Yes, 主语 + be动词.',
      '否定回答：No, 主语 + be动词 + not.',
    ],
    examples: [
      { english: 'Is this your handbag?', chinese: '这是你的手提包吗？' },
      { english: 'Yes, it is.', chinese: '是的，它是。' },
      { english: "No, it isn't.", chinese: '不，它不是。' },
      { english: 'Are you a student?', chinese: '你是学生吗？' },
      { english: 'I am not a teacher.', chinese: '我不是老师。' },
    ],
    exercises: [
      {
        question: '_____ this your book?',
        options: ['Am', 'Is', 'Are', 'Be'],
        answer: 1,
        explanation: '主语this是第三人称单数，用Is。',
      },
      {
        question: 'No, it _____.',
        options: ['am not', "isn't", "aren't", 'not'],
        answer: 1,
        explanation: "it的否定形式是isn't。",
      },
    ],
  },

  3: {
    title: '形容词性物主代词',
    explanation: '形容词性物主代词用来修饰名词，表示"谁的"。放在名词前面。',
    rules: [
      'my（我的）、your（你的/你们的）、his（他的）、her（她的）、its（它的）',
      'our（我们的）、their（他们的）',
      '形容词性物主代词 + 名词 = 名词短语',
      '不能与冠词(a/an/the)同时使用',
    ],
    examples: [
      { english: 'This is my coat.', chinese: '这是我的外套。' },
      { english: 'Is this your umbrella?', chinese: '这是你的雨伞吗？' },
      { english: 'Here is my ticket.', chinese: '这是我的票。' },
      { english: 'It is not my dress.', chinese: '这不是我的裙子。' },
    ],
    exercises: [
      {
        question: 'This is _____ book.',
        options: ['I', 'my', 'me', 'mine'],
        answer: 1,
        explanation: '修饰名词book用形容词性物主代词my。',
      },
      {
        question: 'Is this _____ umbrella?',
        options: ['you', 'your', 'yours', "you're"],
        answer: 1,
        explanation: '修饰名词umbrella用形容词性物主代词your。',
      },
    ],
  },

  4: {
    title: '名词的单复数',
    explanation: '英语名词有单数和复数形式。复数一般在词尾加-s或-es。',
    rules: [
      '一般加-s：book → books',
      '以s/x/ch/sh结尾加-es：bus → buses',
      '以辅音+y结尾，变y为i加-es：city → cities',
      '不规则变化：man → men, woman → women',
      '不可数名词没有复数形式：water, bread',
    ],
    examples: [
      { english: 'This is a suit.', chinese: '这是一套西装。' },
      { english: 'These are suits.', chinese: '这些是西装。' },
      { english: 'It is a dress.', chinese: '这是一件连衣裙。' },
      { english: 'They are dresses.', chinese: '这些是连衣裙。' },
    ],
    exercises: [
      {
        question: 'There are many _____ in the box.',
        options: ['book', 'books', 'a book', 'the book'],
        answer: 1,
        explanation: 'many后面跟可数名词复数，所以用books。',
      },
      {
        question: 'I have two _____.',
        options: ['child', 'childs', 'children', 'childes'],
        answer: 2,
        explanation: 'child的复数是不规则变化：children。',
      },
    ],
  },

  5: {
    title: '介绍他人：This is...',
    explanation: '用"This is..."来介绍某人。这是英语中最常用的介绍方式。',
    rules: [
      '介绍某人：This is + 名字/身份',
      '介绍自己：I am + 名字',
      'Nice to meet you.（很高兴认识你）是常用回应',
      'How do you do?（你好）用于正式场合',
    ],
    examples: [
      { english: 'Mr. Blake, this is Sophie.', chinese: '布莱克先生，这是索菲。' },
      { english: 'Nice to meet you.', chinese: '很高兴认识你。' },
      { english: 'This is Hans. He is German.', chinese: '这是汉斯。他是德国人。' },
      { english: 'This is Naoko. She is Japanese.', chinese: '这是直子。她是日本人。' },
    ],
    exercises: [
      {
        question: 'Tom, _____ is my friend Jack.',
        options: ['this', 'that', 'he', 'it'],
        answer: 0,
        explanation: '介绍他人时用"This is..."。',
      },
      {
        question: 'Nice _____ you.',
        options: ['meet', 'to meet', 'meeting', 'meets'],
        answer: 1,
        explanation: '固定搭配：Nice to meet you.',
      },
    ],
  },

  6: {
    title: 'What国籍/职业？',
    explanation: '用"What nationality are you?"问国籍，用"What\'s your job?"问职业。',
    rules: [
      'What nationality + be动词 + 主语？（问国籍）',
      "What's + your job/occupation?（问职业）",
      "I'm + 国籍/职业.（回答）",
      '常见国籍：Chinese, American, English, French, German, Japanese, Korean',
    ],
    examples: [
      { english: 'What nationality are you?', chinese: '你是哪国人？' },
      { english: "I'm Chinese.", chinese: '我是中国人。' },
      { english: "What's your job?", chinese: '你是做什么工作的？' },
      { english: "I'm a student.", chinese: '我是一名学生。' },
    ],
    exercises: [
      {
        question: 'What nationality _____ you?',
        options: ['am', 'is', 'are', 'be'],
        answer: 2,
        explanation: '主语是you，用are。',
      },
      {
        question: "I'm _____.（中国人）",
        options: ['China', 'Chinese', 'Chines', 'a Chinese'],
        answer: 1,
        explanation: '中国人是Chinese，首字母大写。',
      },
    ],
  },

  7: {
    title: '不定冠词a/an的用法',
    explanation:
      'a和an都表示"一个"，但用法不同。a用在辅音音素开头的词前，an用在元音音素开头的词前。',
    rules: [
      'a + 辅音音素开头的词：a book, a teacher',
      'an + 元音音素开头的词：an apple, an egg',
      '注意：看发音，不是看字母',
      'a university（u发辅音）, an hour（h不发音）',
    ],
    examples: [
      { english: 'I am a student.', chinese: '我是一名学生。' },
      { english: 'He is an engineer.', chinese: '他是一名工程师。' },
      { english: 'It is an umbrella.', chinese: '这是一把雨伞。' },
      { english: 'She is a nurse.', chinese: '她是一名护士。' },
    ],
    exercises: [
      {
        question: 'He is _____ teacher.',
        options: ['a', 'an', 'the', '/'],
        answer: 0,
        explanation: 'teacher以辅音音素开头，用a。',
      },
      {
        question: 'I have _____ apple.',
        options: ['a', 'an', 'the', '/'],
        answer: 1,
        explanation: 'apple以元音音素开头，用an。',
      },
    ],
  },

  8: {
    title: "What's your job? 职业表达",
    explanation: '询问和表达职业的常用句型。',
    rules: [
      "What's your job?（你的工作是什么？）",
      "I'm a/an + 职业.",
      '常见职业：teacher, student, nurse, policeman, policewoman, doctor, engineer, taxi driver',
    ],
    examples: [
      { english: 'I am a taxi driver.', chinese: '我是一名出租车司机。' },
      { english: 'She is a nurse.', chinese: '她是一名护士。' },
      { english: 'He is a policeman.', chinese: '他是一名警察。' },
      { english: 'We are students.', chinese: '我们是学生。' },
    ],
    exercises: [
      {
        question: "What's your job? - I'm _____.",
        options: ['a teacher', 'teacher', 'the teacher', 'an teacher'],
        answer: 0,
        explanation: "表达职业时用 I'm a/an + 职业。",
      },
    ],
  },

  9: {
    title: 'How are you? 问候语',
    explanation: '用于询问对方身体状况或近况的问候语。',
    rules: [
      'How are you?（你好吗？）',
      "I'm fine, thank you.（我很好，谢谢。）",
      "I'm fine, too.（我也很好。）",
      "其他回答：I'm OK. / I'm well. / Not bad.",
    ],
    examples: [
      { english: 'How are you today?', chinese: '你今天好吗？' },
      { english: "I'm fine, thank you.", chinese: '我很好，谢谢。' },
      { english: 'How is Steven?', chinese: '史蒂文怎么样？' },
      { english: "He's fine, thanks.", chinese: '他很好，谢谢。' },
    ],
    exercises: [
      {
        question: 'How _____ you?',
        options: ['am', 'is', 'are', 'be'],
        answer: 2,
        explanation: '主语是you，用are。',
      },
      {
        question: "I'm fine, _____.",
        options: ['thank', 'thanks', 'thank you', 'B和C都对'],
        answer: 3,
        explanation: 'thank you和thanks都可以表示感谢。',
      },
    ],
  },

  10: {
    title: '形容词的用法',
    explanation: '形容词用来修饰名词，描述人或事物的特征。',
    rules: [
      '形容词放在名词前：a tall man',
      '形容词放在be动词后：He is tall.',
      '常见形容词：fat, thin, tall, short, old, young, busy, lazy, hot, cold',
    ],
    examples: [
      { english: 'He is fat.', chinese: '他很胖。' },
      { english: 'She is thin.', chinese: '她很瘦。' },
      { english: 'He is a tall man.', chinese: '他是一个高个子男人。' },
      { english: "It's a hot day.", chinese: '今天很热。' },
    ],
    exercises: [
      {
        question: 'He is _____ tall man.',
        options: ['a', 'an', 'the', '/'],
        answer: 0,
        explanation: 'tall以辅音音素开头，用a。',
      },
      {
        question: 'The girl is _____.（漂亮的）',
        options: ['beauty', 'beautiful', 'beautifully', 'beautify'],
        answer: 1,
        explanation: '用形容词beautiful来描述女孩。',
      },
    ],
  },

  11: {
    title: 'Whose...? 谁的？',
    explanation: '用whose询问物品的所有者。',
    rules: [
      'Whose + 名词 + is this/that?（这是谁的...？）',
      "It's + my/your/his/her + 名词.（是...的）",
      "It's + 名字's.（是某人的）",
    ],
    examples: [
      { english: 'Whose shirt is that?', chinese: '那是谁的衬衫？' },
      { english: "It's Tim's.", chinese: '是蒂姆的。' },
      { english: 'Whose is this book?', chinese: '这本书是谁的？' },
      { english: "It's my book.", chinese: '是我的书。' },
    ],
    exercises: [
      {
        question: '_____ pen is this?',
        options: ['Who', "Who's", 'Whose', 'Whos'],
        answer: 2,
        explanation: '问"谁的"用Whose。',
      },
      {
        question: "It's _____（Tom的）.",
        options: ['Tom', 'Toms', "Tom's", "Toms'"],
        answer: 2,
        explanation: "所有格用's形式：Tom's。",
      },
    ],
  },

  12: {
    title: '名词所有格',
    explanation: '名词所有格表示"...的"，一般在名词后加\'s。',
    rules: [
      "单数名词加's：Tom's book（汤姆的书）",
      "以s结尾的复数名词加'：the students' books（学生们的书）",
      "不规则复数加's：children's toys（孩子们的玩具）",
      "表示共同所有：Tom and Jerry's room（共同的房间）",
      "表示各自所有：Tom's and Jerry's rooms（各自的房间）",
    ],
    examples: [
      { english: "This is my sister's dress.", chinese: '这是我姐姐的裙子。' },
      { english: "It's Sophie's handbag.", chinese: '是索菲的手提包。' },
      { english: "The children's room is big.", chinese: '孩子们的房间很大。' },
      { english: "These are the teachers' office.", chinese: '这些是老师们的办公室。' },
    ],
    exercises: [
      {
        question: 'This is _____（Tom的）car.',
        options: ['Tom', 'Toms', "Tom's", "Toms'"],
        answer: 2,
        explanation: "单数名词所有格加's。",
      },
      {
        question: 'The _____（学生们的）books are new.',
        options: ['student', 'students', "student's", "students'"],
        answer: 3,
        explanation: "以s结尾的复数名词所有格加'。",
      },
    ],
  },

  // ==================== 第13-24课：疑问句和there be句型 ====================

  13: {
    title: 'What colour...? 什么颜色？',
    explanation: '用What colour询问颜色。',
    rules: [
      'What colour + be动词 + 名词？',
      "It's/They're + 颜色.",
      '常见颜色：red, blue, green, yellow, black, white, brown, grey, orange, pink',
    ],
    examples: [
      { english: 'What colour is your dress?', chinese: '你的裙子是什么颜色？' },
      { english: "It's blue.", chinese: '是蓝色的。' },
      { english: 'What colour are your shoes?', chinese: '你的鞋子是什么颜色？' },
      { english: "They're black.", chinese: '是黑色的。' },
    ],
    exercises: [
      {
        question: 'What colour _____ your car?',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: 'your car是单数，用is。',
      },
      {
        question: "It's _____.（绿色的）",
        options: ['green', 'grean', 'grien', 'grin'],
        answer: 0,
        explanation: '绿色是green。',
      },
    ],
  },

  14: {
    title: '祈使句',
    explanation: '祈使句用来表示请求、命令、建议等。省略主语you，直接用动词原形开头。',
    rules: [
      '肯定祈使句：动词原形 + 其他',
      "否定祈使句：Don't + 动词原形 + 其他",
      '礼貌祈使句：Please + 动词原形 / 动词原形 + please',
    ],
    examples: [
      { english: 'Come in!', chinese: '进来！' },
      { english: 'Sit down!', chinese: '坐下！' },
      { english: "Don't drop it!", chinese: '别把它掉了！' },
      { english: 'Please open the door.', chinese: '请打开门。' },
    ],
    exercises: [
      {
        question: '_____ the door, please.',
        options: ['Open', 'Opens', 'Opening', 'Opened'],
        answer: 0,
        explanation: '祈使句用动词原形。',
      },
      {
        question: '_____ late!',
        options: ['Not be', "Don't be", "Isn't", "Aren't"],
        answer: 1,
        explanation: "否定祈使句用Don't + 动词原形。",
      },
    ],
  },

  15: {
    title: '名词的复数形式（特殊变化）',
    explanation: '有些名词的复数形式是不规则的，需要特殊记忆。',
    rules: [
      'f/fe结尾，变f/fe为v加-es：knife → knives, wife → wives',
      '不规则变化：man → men, woman → women, child → children, foot → feet, tooth → teeth',
      '单复同形：sheep, deer, fish, Chinese, Japanese',
    ],
    examples: [
      { english: 'Give me your passports, please.', chinese: '请把你们的护照给我。' },
      { english: 'These are our cases.', chinese: '这些是我们的箱子。' },
      { english: 'The men are tourists.', chinese: '这些男人是游客。' },
      { english: 'The women are housewives.', chinese: '这些女人是家庭主妇。' },
    ],
    exercises: [
      {
        question: 'There are five _____ in the box.',
        options: ['knife', 'knifes', 'knives', 'knive'],
        answer: 2,
        explanation: 'knife的复数是knives。',
      },
      {
        question: 'The _____ are playing.',
        options: ['child', 'childs', 'childes', 'children'],
        answer: 3,
        explanation: 'child的复数是children。',
      },
    ],
  },

  16: {
    title: '名词的复数练习',
    explanation: '继续练习名词复数形式的规则和不规则变化。',
    rules: [
      '以o结尾：potato → potatoes, tomato → tomatoes, photo → photos',
      '以辅音+y结尾：family → families, city → cities',
      '以元音+y结尾：boy → boys, key → keys',
    ],
    examples: [
      { english: 'These are our passports.', chinese: '这些是我们的护照。' },
      { english: 'Those are their suitcases.', chinese: '那些是他们的手提箱。' },
      { english: 'The tourists are Danish.', chinese: '这些游客是丹麦人。' },
    ],
    exercises: [
      {
        question: 'I have two _____.',
        options: ['baby', 'babys', 'babies', 'babyes'],
        answer: 2,
        explanation: '以辅音+y结尾，变y为i加-es。',
      },
    ],
  },

  17: {
    title: 'How do you do? 正式问候',
    explanation: 'How do you do?是正式的问候语，用于初次见面。回答也是How do you do?',
    rules: [
      'How do you do?用于正式场合初次见面',
      '回答也是How do you do?',
      '介绍他人时用This is...',
      '非正式问候用How are you?',
    ],
    examples: [
      { english: 'How do you do?', chinese: '你好！' },
      { english: 'How do you do?', chinese: '你好！' },
      { english: 'This is Mr. Richards.', chinese: '这位是理查兹先生。' },
      { english: "He's our new employee.", chinese: '他是我们的新员工。' },
    ],
    exercises: [
      {
        question: 'How do you do? - _____.',
        options: ["I'm fine.", 'How do you do?', 'Thank you.', 'Nice to meet you.'],
        answer: 1,
        explanation: 'How do you do?的回答也是How do you do?',
      },
    ],
  },

  18: {
    title: "What's your/his/her job? 职业问答",
    explanation: '询问第三人称的职业。',
    rules: [
      "What's your job?（你的工作是什么？）",
      "What's his job?（他的工作是什么？）",
      "What's her job?（她的工作是什么？）",
      "He's/She's a/an + 职业.",
    ],
    examples: [
      { english: "What's his job?", chinese: '他是做什么工作的？' },
      { english: "He's a policeman.", chinese: '他是一名警察。' },
      { english: "What's her job?", chinese: '她是做什么工作的？' },
      { english: "She's a nurse.", chinese: '她是一名护士。' },
    ],
    exercises: [
      {
        question: "What's _____ job? - He's a teacher.",
        options: ['he', 'him', 'his', "he's"],
        answer: 2,
        explanation: '用形容词性物主代词his修饰job。',
      },
    ],
  },

  19: {
    title: '形容词和名词的搭配',
    explanation: '形容词放在名词前面修饰名词，描述名词的特征。',
    rules: [
      '形容词 + 名词：a big house, a small car',
      'be动词 + 形容词：The house is big.',
      '常见形容词：big, small, long, short, heavy, light, empty, full',
    ],
    examples: [
      { english: "I'm thirsty.", chinese: '我渴了。' },
      { english: "I'm tired.", chinese: '我累了。' },
      { english: 'These ice creams are nice.', chinese: '这些冰淇淋很好吃。' },
      { english: 'The children are thirsty.', chinese: '孩子们渴了。' },
    ],
    exercises: [
      {
        question: 'The box is very _____.（重的）',
        options: ['heavy', 'heavily', 'heavier', 'heaviest'],
        answer: 0,
        explanation: '用形容词heavy作表语。',
      },
    ],
  },

  20: {
    title: 'Look at... 看...',
    explanation: 'Look at是固定搭配，表示"看..."。at是介词，后面跟名词或代词。',
    rules: [
      'Look at + 名词/代词',
      'Look at me!（看我！）',
      'Look at the picture.（看这张图片。）',
      '单独用Look!表示"看！"',
    ],
    examples: [
      { english: 'Look at that man!', chinese: '看那个男人！' },
      { english: "He's thin.", chinese: '他很瘦。' },
      { english: 'Look at this ice cream.', chinese: '看这个冰淇淋。' },
      { english: "It's lovely!", chinese: '它真可爱！' },
    ],
    exercises: [
      {
        question: 'Look _____ the blackboard, please.',
        options: ['in', 'on', 'at', 'to'],
        answer: 2,
        explanation: 'Look at是固定搭配。',
      },
    ],
  },

  21: {
    title: 'Give me/him/her... 给我/他/她...',
    explanation: '双宾语结构：give + 间接宾语（人）+ 直接宾语（物）',
    rules: [
      'Give + 人 + 物 = Give + 物 + to + 人',
      'Give me the book. = Give the book to me.',
      '类似动词：pass, show, tell, send',
    ],
    examples: [
      { english: 'Give me a book, please.', chinese: '请给我一本书。' },
      { english: 'Which book?', chinese: '哪一本？' },
      { english: 'This one?', chinese: '这本吗？' },
      { english: 'No, not that one. The red one.', chinese: '不，不是那本。是红色的那本。' },
    ],
    exercises: [
      {
        question: 'Give _____ the pen, please.',
        options: ['I', 'me', 'my', 'mine'],
        answer: 1,
        explanation: 'give后面跟宾格代词me。',
      },
    ],
  },

  22: {
    title: 'Which...? 哪一个？',
    explanation: '用which在有限的选择中询问特定的一个。',
    rules: [
      'Which + 名词 + is/are...?',
      '用于在特定范围内选择',
      '与what的区别：what用于开放性问题，which用于有限选择',
    ],
    examples: [
      { english: 'Which glass?', chinese: '哪只杯子？' },
      { english: 'This one?', chinese: '这只吗？' },
      { english: 'Which book do you want?', chinese: '你想要哪本书？' },
      { english: 'The blue one.', chinese: '蓝色的那本。' },
    ],
    exercises: [
      {
        question: '_____ one do you like, the red or the blue?',
        options: ['What', 'Which', 'Who', 'How'],
        answer: 1,
        explanation: '在有限的选择中问"哪一个"用Which。',
      },
    ],
  },

  23: {
    title: 'on, in, under 介词',
    explanation: '表示位置关系的介词：on（在...上面）、in（在...里面）、under（在...下面）。',
    rules: [
      'on：在...表面上（接触）',
      'in：在...里面/内部',
      'under：在...正下方',
      '其他位置介词：behind（在...后面）、next to（在...旁边）、between（在...之间）',
    ],
    examples: [
      { english: 'The book is on the table.', chinese: '书在桌子上。' },
      { english: 'The pen is in the box.', chinese: '钢笔在盒子里。' },
      { english: 'The cat is under the table.', chinese: '猫在桌子下面。' },
      { english: 'The cup is on the desk.', chinese: '杯子在书桌上。' },
    ],
    exercises: [
      {
        question: 'The clock is _____ the wall.',
        options: ['in', 'on', 'under', 'at'],
        answer: 1,
        explanation: '钟挂在墙上，用on表示在表面上。',
      },
      {
        question: 'The shoes are _____ the bed.',
        options: ['in', 'on', 'under', 'at'],
        answer: 2,
        explanation: '鞋子在床下面，用under。',
      },
    ],
  },

  24: {
    title: 'there be句型',
    explanation: 'there be句型表示"某处有某物"。be动词的形式取决于最近的名词。',
    rules: [
      'There is + 单数名词/不可数名词',
      'There are + 复数名词',
      '就近原则：be动词与最近的名词保持一致',
      '否定句：There is/are + not...',
      '疑问句：Is/Are there...?',
    ],
    examples: [
      { english: 'There is a book on the table.', chinese: '桌子上有一本书。' },
      { english: 'There are some cups on the table.', chinese: '桌子上有一些杯子。' },
      { english: "There isn't a glass on the table.", chinese: '桌子上没有玻璃杯。' },
      { english: 'Are there any books?', chinese: '有一些书吗？' },
    ],
    exercises: [
      {
        question: 'There _____ a pen on the desk.',
        options: ['is', 'are', 'am', 'be'],
        answer: 0,
        explanation: 'a pen是单数，用is。',
      },
      {
        question: 'There _____ some books on the shelf.',
        options: ['is', 'are', 'am', 'be'],
        answer: 1,
        explanation: 'some books是复数，用are。',
      },
    ],
  },

  // ==================== 第25-36课：there be和方位介词 ====================

  25: {
    title: 'there be句型（肯定句）',
    explanation: 'There is/are...表示"有..."。is后跟单数或不可数名词，are后跟复数名词。',
    rules: [
      'There is a/an + 单数名词',
      'There is some + 不可数名词',
      'There are some/many/a few + 复数名词',
      "There is可以缩写为There's，There are可以缩写为There're",
    ],
    examples: [
      { english: 'There is a refrigerator in the kitchen.', chinese: '厨房里有一台冰箱。' },
      { english: 'There is a table in the middle of the room.', chinese: '房间中央有一张桌子。' },
      { english: 'There are some bottles on the table.', chinese: '桌子上有一些瓶子。' },
      { english: 'There is an electric cooker.', chinese: '有一个电炉。' },
    ],
    exercises: [
      {
        question: 'There _____ a chair in the room.',
        options: ['is', 'are', 'am', 'be'],
        answer: 0,
        explanation: 'a chair是单数，用is。',
      },
      {
        question: 'There _____ two windows in the wall.',
        options: ['is', 'are', 'am', 'be'],
        answer: 1,
        explanation: 'two windows是复数，用are。',
      },
    ],
  },

  26: {
    title: 'where在哪里？',
    explanation: '用where询问地点或位置。',
    rules: [
      'Where is + 单数名词？',
      'Where are + 复数名词？',
      "It's/They're + 方位词.",
      '方位词：in, on, under, behind, near, next to, between',
    ],
    examples: [
      { english: 'Where is the cup?', chinese: '杯子在哪里？' },
      { english: "It's on the table.", chinese: '在桌子上。' },
      { english: 'Where are the books?', chinese: '书在哪里？' },
      { english: "They're on the shelf.", chinese: '在书架上。' },
    ],
    exercises: [
      {
        question: '_____ is my pen?',
        options: ['What', 'Where', 'Which', 'How'],
        answer: 1,
        explanation: '问地点用Where。',
      },
      {
        question: "It's _____ the box.（在...里面）",
        options: ['on', 'in', 'under', 'behind'],
        answer: 1,
        explanation: '在盒子里面用in。',
      },
    ],
  },

  27: {
    title: 'there be句型（否定句和疑问句）',
    explanation: 'there be句型的否定句在be后加not，疑问句将be提前。',
    rules: [
      '否定句：There is/are + not + 名词',
      '一般疑问句：Is/Are there + 名词？',
      '肯定回答：Yes, there is/are.',
      "否定回答：No, there isn't/aren't.",
    ],
    examples: [
      { english: "There isn't a book on the table.", chinese: '桌子上没有书。' },
      { english: "There aren't any cups.", chinese: '没有任何杯子。' },
      { english: 'Is there a bottle on the table?', chinese: '桌子上有瓶子吗？' },
      { english: "Yes, there is. / No, there isn't.", chinese: '是的，有。/不，没有。' },
    ],
    exercises: [
      {
        question: 'Is there a glass on the table? - No, there _____.',
        options: ["isn't", "aren't", 'is', 'are'],
        answer: 0,
        explanation: "a glass是单数，否定回答用isn't。",
      },
    ],
  },

  28: {
    title: '介词短语',
    explanation: '介词短语用来表示位置关系，由介词+名词组成。',
    rules: [
      'on the desk（在书桌上）',
      'in the box（在盒子里）',
      'under the bed（在床下）',
      'behind the door（在门后）',
      'near the window（在窗户附近）',
      'next to the table（在桌子旁边）',
      'between A and B（在A和B之间）',
    ],
    examples: [
      { english: 'The glasses are near those bottles.', chinese: '玻璃杯在那些瓶子附近。' },
      { english: 'There is a table in the middle of the room.', chinese: '房间中央有一张桌子。' },
      { english: 'The armchairs are near the table.', chinese: '扶手椅在桌子旁边。' },
    ],
    exercises: [
      {
        question: 'The cat is _____ the table.（在...下面）',
        options: ['on', 'in', 'under', 'behind'],
        answer: 2,
        explanation: '在桌子下面用under。',
      },
      {
        question: 'The picture is _____ the wall.（在...上面）',
        options: ['on', 'in', 'under', 'behind'],
        answer: 0,
        explanation: '画挂在墙上，用on。',
      },
    ],
  },

  29: {
    title: 'Come in! 祈使句复习',
    explanation: '复习祈使句的用法，用于表示请求、命令、建议。',
    rules: [
      '祈使句省略主语you',
      '肯定祈使句：动词原形开头',
      "否定祈使句：Don't + 动词原形",
      '常用祈使句：Come in! Sit down! Open the door! Shut the door!',
    ],
    examples: [
      { english: 'Come in, Amy.', chinese: '进来，艾米。' },
      { english: 'Shut the door, please.', chinese: '请关门。' },
      { english: 'Open the window and air the room.', chinese: '打开窗户，给房间通通风。' },
      { english: 'Then put these clothes in the wardrobe.', chinese: '然后把这些衣服放进衣柜。' },
    ],
    exercises: [
      {
        question: '_____ the door, please.',
        options: ['Shut', 'Shuts', 'Shutting', 'To shut'],
        answer: 0,
        explanation: '祈使句用动词原形。',
      },
    ],
  },

  30: {
    title: 'put...in/on/under 把...放在...',
    explanation: 'put表示"放"，后面跟位置介词表示放在哪里。',
    rules: [
      'put + 名词 + in + 地点（放进...）',
      'put + 名词 + on + 地点（放在...上面）',
      'put + 名词 + under + 地点（放在...下面）',
    ],
    examples: [
      { english: 'Put the books on the shelf.', chinese: '把书放在书架上。' },
      { english: 'Put the clothes in the wardrobe.', chinese: '把衣服放进衣柜。' },
      { english: 'Put the shoes under the bed.', chinese: '把鞋子放在床下面。' },
    ],
    exercises: [
      {
        question: 'Put the cup _____ the table.',
        options: ['in', 'on', 'under', 'at'],
        answer: 1,
        explanation: '把杯子放在桌子上用on。',
      },
    ],
  },

  31: {
    title: '现在进行时（肯定句）',
    explanation: '现在进行时表示正在进行的动作。结构：be动词 + 动词ing形式。',
    rules: [
      '肯定句：主语 + am/is/are + 动词ing',
      '动词ing的变化规则：',
      '一般加-ing：play → playing',
      '以不发音e结尾，去e加-ing：make → making',
      '重读闭音节，双写末字母加-ing：run → running',
    ],
    examples: [
      { english: 'Sally is sitting under the tree.', chinese: '萨莉正坐在树下。' },
      { english: 'Tim is climbing the tree.', chinese: '蒂姆正在爬树。' },
      { english: 'The dog is running across the grass.', chinese: '狗正在草地上跑。' },
      { english: 'The children are playing in the garden.', chinese: '孩子们正在花园里玩。' },
    ],
    exercises: [
      {
        question: 'She _____ reading a book now.',
        options: ['is', 'are', 'am', 'be'],
        answer: 0,
        explanation: '主语She用is。',
      },
      {
        question: 'They _____ playing football.',
        options: ['is', 'are', 'am', 'be'],
        answer: 1,
        explanation: '主语They用are。',
      },
    ],
  },

  32: {
    title: '现在进行时（否定句和疑问句）',
    explanation: '现在进行时的否定句在be后加not，疑问句将be提前。',
    rules: [
      '否定句：主语 + am/is/are + not + 动词ing',
      '一般疑问句：Am/Is/Are + 主语 + 动词ing？',
      '特殊疑问句：What + am/is/are + 主语 + doing？',
    ],
    examples: [
      { english: "He isn't reading.", chinese: '他没在看书。' },
      { english: 'Are you sleeping?', chinese: '你在睡觉吗？' },
      { english: 'What are you doing?', chinese: '你在做什么？' },
      { english: "I'm cooking.", chinese: '我在做饭。' },
    ],
    exercises: [
      {
        question: 'What _____ you doing?',
        options: ['is', 'are', 'am', 'do'],
        answer: 1,
        explanation: '主语you用are。',
      },
      {
        question: 'He _____ sleeping now.',
        options: ["isn't", "aren't", "doesn't", "don't"],
        answer: 0,
        explanation: "现在进行时否定在be后加not，He isn't = He is not。",
      },
    ],
  },

  33: {
    title: '动词ing形式的变化规则',
    explanation: '现在进行时中动词需要变成ing形式，有不同的变化规则。',
    rules: [
      '一般加-ing：go → going, read → reading',
      '以不发音e结尾，去e加-ing：come → coming, make → making',
      '重读闭音节，双写末字母加-ing：sit → sitting, run → running',
      '以ie结尾，变ie为y加-ing：die → dying, lie → lying',
    ],
    examples: [
      { english: 'It is a fine day today.', chinese: '今天天气真好。' },
      { english: 'There are some clouds in the sky.', chinese: '天空中有一些云。' },
      { english: 'The sun is shining.', chinese: '阳光明媚。' },
      { english: 'Mr. Jones is walking over the bridge.', chinese: '琼斯先生正在过桥。' },
    ],
    exercises: [
      {
        question: 'She is _____ (dance) now.',
        options: ['dance', 'danceing', 'dancing', 'dances'],
        answer: 2,
        explanation: 'dance以不发音e结尾，去e加-ing：dancing。',
      },
      {
        question: 'He is _____ (swim) in the pool.',
        options: ['swim', 'swiming', 'swimming', 'swims'],
        answer: 2,
        explanation: 'swim是重读闭音节，双写m加-ing：swimming。',
      },
    ],
  },

  34: {
    title: '现在进行时综合练习',
    explanation: '综合练习现在进行时的各种用法。',
    rules: [
      '肯定句：I am + doing, He/She is + doing, We/They are + doing',
      "否定句：I am not + doing, He/She isn't + doing",
      '疑问句：Are you + doing? Is he/she + doing?',
      "回答：Yes, I am. / No, I'm not. Yes, he is. / No, he isn't.",
    ],
    examples: [
      { english: 'He is sleeping.', chinese: '他在睡觉。' },
      { english: 'She is typing a letter.', chinese: '她在打一封信。' },
      { english: 'My mother is cooking.', chinese: '我妈妈在做饭。' },
      { english: 'The children are doing their homework.', chinese: '孩子们在做作业。' },
    ],
    exercises: [
      {
        question: '_____ she watching TV? - Yes, she is.',
        options: ['Is', 'Are', 'Am', 'Do'],
        answer: 0,
        explanation: '主语she用Is。',
      },
    ],
  },

  35: {
    title: '描述照片/图片',
    explanation: '用现在进行时描述照片或图片中正在进行的动作。',
    rules: [
      'This is a photograph of...',
      'Look at this picture. In this picture, ... is/are + doing...',
      '描述图片用现在进行时',
    ],
    examples: [
      { english: 'This is a photograph of our village.', chinese: '这是我们村庄的一张照片。' },
      { english: 'The village is on a river.', chinese: '村庄在一条河上。' },
      { english: 'The children are walking over the bridge.', chinese: '孩子们正在过桥。' },
      { english: 'Some children are swimming in the river.', chinese: '一些孩子正在河里游泳。' },
    ],
    exercises: [
      {
        question: 'This is a photograph _____ our school.',
        options: ['in', 'on', 'of', 'at'],
        answer: 2,
        explanation: 'a photograph of...表示"...的照片"。',
      },
    ],
  },

  36: {
    title: '方位介词和现在进行时',
    explanation: '综合运用方位介词和现在进行时来描述场景。',
    rules: [
      '方位介词：in, on, under, behind, near, between',
      '现在进行时：be + doing',
      '描述场景：地点 + is/are + doing + 方位词',
    ],
    examples: [
      { english: 'Our village is in a valley.', chinese: '我们的村庄在一个山谷里。' },
      { english: 'It is between two hills.', chinese: '它在两座小山之间。' },
      {
        english: 'My wife and I are walking along the banks of the river.',
        chinese: '我和妻子正沿着河岸走。',
      },
      { english: 'There is a boy in the water.', chinese: '水里有一个男孩。' },
    ],
    exercises: [
      {
        question: 'The school is _____ the park and the hospital.',
        options: ['in', 'on', 'under', 'between'],
        answer: 3,
        explanation: '在...之间用between。',
      },
    ],
  },

  // ==================== 第37-48课：一般将来时和情态动词 ====================

  37: {
    title: 'be going to 将来时',
    explanation: 'be going to + 动词原形表示"打算做某事"或"将要发生的事"。',
    rules: [
      '肯定句：主语 + am/is/are + going to + 动词原形',
      '否定句：主语 + am/is/are + not + going to + 动词原形',
      '疑问句：Am/Is/Are + 主语 + going to + 动词原形？',
      "缩写：I'm going to, He's going to, They're going to",
    ],
    examples: [
      { english: "I'm going to make a bookcase.", chinese: '我打算做一个书架。' },
      { english: 'What are you going to do?', chinese: '你打算做什么？' },
      { english: "He's going to paint it pink.", chinese: '他打算把它漆成粉红色。' },
      { english: "We're not going to have a holiday.", chinese: '我们不打算度假。' },
    ],
    exercises: [
      {
        question: 'I _____ going to visit my friend tomorrow.',
        options: ['am', 'is', 'are', 'be'],
        answer: 0,
        explanation: '主语I用am。',
      },
      {
        question: 'What _____ she going to do?',
        options: ['am', 'is', 'are', 'do'],
        answer: 1,
        explanation: '主语she用is。',
      },
    ],
  },

  38: {
    title: 'What are you going to do? 将来计划',
    explanation: '用What are you going to do?询问将来的计划或打算。',
    rules: [
      'What are you going to do?（你打算做什么？）',
      "I'm going to + 动词原形.（我打算...）",
      '表示计划、打算、意图',
      '常与tomorrow, next week等时间词连用',
    ],
    examples: [
      { english: 'What are you going to do now, Sam?', chinese: '你现在打算做什么，萨姆？' },
      { english: "I'm going to paint it.", chinese: '我打算把它漆一下。' },
      { english: 'What colour are you going to paint it?', chinese: '你打算把它漆成什么颜色？' },
      { english: "I'm going to paint it blue.", chinese: '我打算把它漆成蓝色。' },
    ],
    exercises: [
      {
        question: 'What are you going to _____ tomorrow?',
        options: ['do', 'doing', 'does', 'did'],
        answer: 0,
        explanation: 'be going to后面跟动词原形。',
      },
    ],
  },

  39: {
    title: "Don't...! 否定祈使句",
    explanation: '否定祈使句用Don\'t + 动词原形，表示"不要做某事"。',
    rules: [
      "Don't + 动词原形 + 其他",
      '用于禁止、警告、建议',
      '语气比否定句更强',
      '可以加please使语气更礼貌',
    ],
    examples: [
      { english: "Don't drop it!", chinese: '别把它摔了！' },
      { english: "Don't be late!", chinese: '别迟到！' },
      { english: "Don't touch it!", chinese: '别碰它！' },
      { english: "Please don't make a noise.", chinese: '请别出声。' },
    ],
    exercises: [
      {
        question: '_____ run in the classroom.',
        options: ['Not', "Don't", "Doesn't", "Isn't"],
        answer: 1,
        explanation: "否定祈使句用Don't + 动词原形。",
      },
    ],
  },

  40: {
    title: 'show/tell/give 双宾语动词',
    explanation: 'show, tell, give等动词可以跟双宾语：间接宾语（人）和直接宾语（物）。',
    rules: [
      'show + 人 + 物 = show + 物 + to + 人',
      'tell + 人 + 物 = tell + 物 + to + 人',
      'give + 人 + 物 = give + 物 + to + 人',
      '也可以用for：make/buy + 人 + 物 = make/buy + 物 + for + 人',
    ],
    examples: [
      { english: 'Show me your new dress.', chinese: '给我看看你的新裙子。' },
      { english: 'Tell me the truth.', chinese: '告诉我真相。' },
      { english: 'Give him a cup of coffee.', chinese: '给他一杯咖啡。' },
      { english: 'Buy her a present.', chinese: '给她买份礼物。' },
    ],
    exercises: [
      {
        question: 'Show _____ your passport, please.',
        options: ['I', 'me', 'my', 'mine'],
        answer: 1,
        explanation: 'show后面跟宾格代词me。',
      },
    ],
  },

  41: {
    title: '可数名词和不可数名词',
    explanation: '英语名词分为可数名词和不可数名词。可数名词有单复数形式，不可数名词没有。',
    rules: [
      '可数名词：可以用数字计数，有单复数形式（book/books）',
      '不可数名词：不能用数字计数，没有复数形式（water, bread, milk）',
      '不可数名词用量词表示数量：a piece of, a cup of, a glass of',
      'some/any可以修饰可数名词复数和不可数名词',
    ],
    examples: [
      { english: 'Is there any bread?', chinese: '有面包吗？' },
      { english: 'There is a piece of bread.', chinese: '有一片面包。' },
      { english: 'Is there any water in the bottle?', chinese: '瓶子里有水吗？' },
      { english: 'There are some cups on the table.', chinese: '桌子上有一些杯子。' },
    ],
    exercises: [
      {
        question: "I'd like _____ water, please.",
        options: ['a', 'an', 'some', 'many'],
        answer: 2,
        explanation: 'water是不可数名词，用some修饰。',
      },
      {
        question: 'There are _____ apples in the basket.',
        options: ['a', 'an', 'some', 'much'],
        answer: 2,
        explanation: 'apples是可数名词复数，用some修饰。',
      },
    ],
  },

  42: {
    title: 'some和any的用法',
    explanation: 'some用于肯定句，any用于否定句和疑问句。',
    rules: [
      'some：用于肯定句，表示"一些"',
      'any：用于否定句和疑问句，表示"任何"',
      'some也可以用于表示请求或建议的疑问句',
      'some/any可以修饰可数名词复数和不可数名词',
    ],
    examples: [
      { english: 'There are some eggs in the box.', chinese: '盒子里有一些鸡蛋。' },
      { english: "There aren't any eggs in the box.", chinese: '盒子里没有鸡蛋。' },
      { english: 'Are there any eggs in the box?', chinese: '盒子里有鸡蛋吗？' },
      { english: 'Would you like some coffee?', chinese: '你想来点咖啡吗？' },
    ],
    exercises: [
      {
        question: "There isn't _____ milk in the glass.",
        options: ['some', 'any', 'a', 'an'],
        answer: 1,
        explanation: '否定句中用any。',
      },
      {
        question: 'Would you like _____ tea?',
        options: ['some', 'any', 'a', 'an'],
        answer: 0,
        explanation: '表示建议的疑问句中用some。',
      },
    ],
  },

  43: {
    title: 'can 能够/可以',
    explanation: 'can是情态动词，表示能力或许可。后面跟动词原形。',
    rules: [
      '肯定句：主语 + can + 动词原形',
      "否定句：主语 + cannot (can't) + 动词原形",
      '疑问句：Can + 主语 + 动词原形？',
      "回答：Yes, ... can. / No, ... can't.",
      'can没有人称和数的变化',
    ],
    examples: [
      { english: 'Can you make the tea, Sam?', chinese: '你会沏茶吗，萨姆？' },
      { english: 'Yes, of course I can, Penny.', chinese: '是的，我当然会，彭妮。' },
      { english: "I can't find the cups.", chinese: '我找不到杯子。' },
      { english: "They're in front of you!", chinese: '就在你面前！' },
    ],
    exercises: [
      {
        question: 'I _____ swim very well.',
        options: ['can', 'cans', "can't", 'A和C都对'],
        answer: 3,
        explanation: '根据句意，"我能/不能游得很好"都可以。',
      },
      {
        question: '_____ you speak English?',
        options: ['Do', 'Are', 'Can', 'Is'],
        answer: 2,
        explanation: '问能力用Can。',
      },
    ],
  },

  44: {
    title: 'there be与have/has的区别',
    explanation: 'there be表示"某处有某物"，have/has表示"某人拥有某物"。',
    rules: [
      'there be：表示存在，"某处有某物"',
      'have/has：表示拥有，"某人有某物"',
      'I/You/We/They have...',
      'He/She/It has...',
    ],
    examples: [
      { english: 'There is a book on the table.', chinese: '桌子上有一本书。' },
      { english: 'I have a book.', chinese: '我有一本书。' },
      { english: 'There are some cups.', chinese: '有一些杯子。' },
      { english: 'She has a new car.', chinese: '她有一辆新车。' },
    ],
    exercises: [
      {
        question: 'I _____ two brothers.',
        options: ['have', 'has', 'there is', 'there are'],
        answer: 0,
        explanation: '表示"我拥有"用I have。',
      },
      {
        question: '_____ a cat under the table.',
        options: ['Have', 'Has', 'There is', 'There are'],
        answer: 2,
        explanation: '表示"某处有"用There is。',
      },
    ],
  },

  45: {
    title: '情态动词can的用法',
    explanation: 'can可以表示能力（会做某事）或许可（可以做某事）。',
    rules: [
      '表示能力：I can speak English.（我会说英语。）',
      '表示许可：You can go now.（你现在可以走了。）',
      '过去式：could（表示过去的能力或更礼貌的请求）',
      "否定：cannot = can't",
    ],
    examples: [
      { english: 'Can you come here a minute please, Bob?', chinese: '你能来一下吗，鲍勃？' },
      {
        english: "She's next door. She's in her office, sir.",
        chinese: '她在隔壁。她在她的办公室里，先生。',
      },
      { english: 'Can she type this letter for me?', chinese: '她能为我打这封信吗？' },
      { english: 'Ask her please.', chinese: '请问她。' },
    ],
    exercises: [
      {
        question: 'She _____ play the piano very well.',
        options: ['can', 'cans', 'is', 'does'],
        answer: 0,
        explanation: '表示能力用can。',
      },
    ],
  },

  46: {
    title: '动名词（doing作主语或宾语）',
    explanation: '动词ing形式可以作主语或宾语，称为动名词。',
    rules: [
      '作主语：Reading is fun.（读书很有趣。）',
      '作宾语：I like swimming.（我喜欢游泳。）',
      '介词后面用动名词：interested in learning, good at cooking',
    ],
    examples: [
      { english: 'Can you type?', chinese: '你会打字吗？' },
      { english: "I can type, but I can't type well.", chinese: '我会打字，但我打得不好。' },
      { english: 'I like reading.', chinese: '我喜欢读书。' },
      { english: 'She is good at cooking.', chinese: '她擅长做饭。' },
    ],
    exercises: [
      {
        question: 'I enjoy _____ books.',
        options: ['read', 'reads', 'reading', 'to read'],
        answer: 2,
        explanation: 'enjoy后面跟动名词形式。',
      },
    ],
  },

  47: {
    title: 'How much...? 多少钱？/多少？',
    explanation: 'How much用来询问价格或不可数名词的数量。',
    rules: [
      'How much is + 单数名词？（...多少钱？）',
      'How much are + 复数名词？（...多少钱？）',
      'How much + 不可数名词...?（多少...？）',
      '回答用具体价格或数量',
    ],
    examples: [
      { english: 'How much is this book?', chinese: '这本书多少钱？' },
      { english: "It's five dollars.", chinese: '五美元。' },
      { english: 'How much are these apples?', chinese: '这些苹果多少钱？' },
      { english: "They're two dollars a kilo.", chinese: '两美元一公斤。' },
    ],
    exercises: [
      {
        question: 'How much _____ the coffee?',
        options: ['is', 'are', 'am', 'be'],
        answer: 0,
        explanation: 'coffee是不可数名词，用is。',
      },
      {
        question: 'How much _____ the shoes?',
        options: ['is', 'are', 'am', 'be'],
        answer: 1,
        explanation: 'shoes是复数名词，用are。',
      },
    ],
  },

  48: {
    title: '购物用语',
    explanation: '学习购物时常用的英语表达。',
    rules: [
      '店员：Can I help you? / What can I do for you?',
      "顾客：I want/I'd like... / How much is/are...?",
      "询问价格：How much is it? / What's the price?",
      "回应：It's... dollars/pounds. / They're... each.",
    ],
    examples: [
      { english: 'Do you have any beans?', chinese: '你们有豆子吗？' },
      { english: 'I want a pound of mince, please.', chinese: '我要一磅肉馅。' },
      { english: 'Do you want a lamb chop?', chinese: '你要羊排吗？' },
      { english: 'A pound and a half of mince, please.', chinese: '请给我一磅半肉馅。' },
    ],
    exercises: [
      {
        question: '_____ I help you?',
        options: ['Do', 'Am', 'Can', 'Are'],
        answer: 2,
        explanation: 'Can I help you?是常用的服务用语。',
      },
    ],
  },

  // ==================== 第49-72课：一般过去时 ====================

  49: {
    title: '一般过去时（be动词）',
    explanation: 'be动词的过去式：am/is → was，are → were。表示过去的状态。',
    rules: [
      'I/He/She/It was...（was是am/is的过去式）',
      'You/We/They were...（were是are的过去式）',
      "否定句：was not (wasn't) / were not (weren't)",
      '疑问句：Was + 主语...? / Were + 主语...?',
    ],
    examples: [
      { english: "Were you at the butcher's?", chinese: '你在肉店吗？' },
      { english: 'Yes, I was.', chinese: '是的，我在。' },
      { english: 'Was he at school yesterday?', chinese: '他昨天在学校吗？' },
      { english: "No, he wasn't.", chinese: '不，他不在。' },
    ],
    exercises: [
      {
        question: 'I _____ at home yesterday.',
        options: ['am', 'is', 'was', 'were'],
        answer: 2,
        explanation: '主语I的过去式用was。',
      },
      {
        question: 'They _____ at school last week.',
        options: ['am', 'is', 'was', 'were'],
        answer: 3,
        explanation: '主语They的过去式用were。',
      },
    ],
  },

  50: {
    title: '一般过去时（规则动词）',
    explanation: '规则动词的过去式一般在词尾加-ed。',
    rules: [
      '一般加-ed：walk → walked',
      '以e结尾加-d：live → lived',
      '以辅音+y结尾，变y为i加-ed：study → studied',
      '重读闭音节，双写末字母加-ed：stop → stopped',
    ],
    examples: [
      { english: 'He walked to school yesterday.', chinese: '他昨天走路去学校。' },
      { english: 'She lived in London last year.', chinese: '她去年住在伦敦。' },
      { english: 'We studied English last night.', chinese: '我们昨晚学了英语。' },
      { english: 'The bus stopped at the station.', chinese: '公交车在车站停了下来。' },
    ],
    exercises: [
      {
        question: 'She _____ (watch) TV last night.',
        options: ['watch', 'watchs', 'watched', 'watching'],
        answer: 2,
        explanation: 'watch加-ed：watched。',
      },
      {
        question: 'He _____ (study) hard last term.',
        options: ['study', 'studys', 'studied', 'studying'],
        answer: 2,
        explanation: 'study变y为i加-ed：studied。',
      },
    ],
  },

  51: {
    title: '一般过去时（不规则动词）',
    explanation: '很多常用动词的过去式是不规则的，需要记忆。',
    rules: [
      'go → went, come → came',
      'see → saw, know → knew',
      'take → took, give → gave',
      'have → had, do → did',
      'is/am → was, are → were',
    ],
    examples: [
      { english: 'He went to Greece last summer.', chinese: '他去年夏天去了希腊。' },
      { english: 'We came back to England last week.', chinese: '我们上周回到了英国。' },
      { english: 'She saw a beautiful bird.', chinese: '她看到了一只漂亮的鸟。' },
      { english: 'I had a good time.', chinese: '我玩得很开心。' },
    ],
    exercises: [
      {
        question: 'She _____ (go) to Paris last month.',
        options: ['go', 'goes', 'went', 'going'],
        answer: 2,
        explanation: 'go的过去式是went。',
      },
      {
        question: 'We _____ (see) a movie yesterday.',
        options: ['see', 'sees', 'saw', 'seeing'],
        answer: 2,
        explanation: 'see的过去式是saw。',
      },
    ],
  },

  52: {
    title: 'When...? 什么时候？',
    explanation: '用when询问时间。',
    rules: [
      'When + did + 主语 + 动词原形？',
      'When + was/were + 主语...?',
      "回答用具体时间：yesterday, last week, in 2020, at 3 o'clock",
    ],
    examples: [
      { english: 'When did you go to Greece?', chinese: '你什么时候去的希腊？' },
      { english: 'We went there last summer.', chinese: '我们去年夏天去的。' },
      { english: 'When was he born?', chinese: '他什么时候出生的？' },
      { english: 'He was born in 1990.', chinese: '他1990年出生。' },
    ],
    exercises: [
      {
        question: '_____ did she arrive?',
        options: ['What', 'Where', 'When', 'How'],
        answer: 2,
        explanation: '问时间用When。',
      },
    ],
  },

  53: {
    title: '频率副词',
    explanation: '频率副词表示动作发生的频率，放在be动词后、实义动词前。',
    rules: [
      'always（总是）100%',
      'usually（通常）80%',
      'often（经常）60%',
      'sometimes（有时）40%',
      'seldom（很少）20%',
      'never（从不）0%',
      '位置：be动词后，实义动词前',
    ],
    examples: [
      { english: 'He always gets up early.', chinese: '他总是早起。' },
      { english: 'She usually walks to school.', chinese: '她通常走路去学校。' },
      { english: 'I sometimes have lunch at school.', chinese: '我有时在学校吃午饭。' },
      { english: 'He never eats meat.', chinese: '他从不吃肉。' },
    ],
    exercises: [
      {
        question: 'She is _____ late for school.',
        options: ['always', 'never', 'often', 'usually'],
        answer: 1,
        explanation: '根据句意，"她上学从不迟到"，用never。',
      },
      {
        question: 'He _____ goes to bed early.',
        options: ['always', 'is always', 'always is', 'be always'],
        answer: 0,
        explanation: '频率副词放在实义动词前：He always goes...',
      },
    ],
  },

  54: {
    title: "What's the climate like? 天气怎么样？",
    explanation: '询问天气的常用句型。',
    rules: [
      "What's the weather like?（天气怎么样？）",
      "It's + 天气形容词.（天气...）",
      '天气形容词：hot, cold, warm, cool, sunny, cloudy, rainy, windy, snowy',
    ],
    examples: [
      { english: "What's the climate like in your country?", chinese: '你们国家气候怎么样？' },
      { english: "It's very pleasant.", chinese: '非常宜人。' },
      { english: "What's the weather like today?", chinese: '今天天气怎么样？' },
      { english: "It's sunny and warm.", chinese: '阳光明媚，很温暖。' },
    ],
    exercises: [
      {
        question: "What's the weather _____ today?",
        options: ['like', 'look', 'as', 'for'],
        answer: 0,
        explanation: "What's the weather like?是固定句型。",
      },
    ],
  },

  // 55-144课的语法数据（简化版本，覆盖主要语法点）
  55: {
    title: '一般现在时（第三人称单数）',
    explanation: '第三人称单数（he/she/it）作主语时，动词要加-s或-es。',
    rules: [
      '一般加-s：works, lives, reads',
      '以s/x/ch/sh/o结尾加-es：watches, goes, teaches',
      '以辅音+y结尾，变y为i加-es：studies, carries',
      '特殊变化：have → has',
    ],
    examples: [
      { english: 'The Sawyers live at 87 King Street.', chinese: '索耶一家住在国王街87号。' },
      { english: 'Mr. Sawyer goes to work every day.', chinese: '索耶先生每天去上班。' },
      { english: 'Mrs. Sawyer stays at home.', chinese: '索耶太太待在家里。' },
      { english: 'The children go to school.', chinese: '孩子们去上学。' },
    ],
    exercises: [
      {
        question: 'She _____ to school every morning.',
        options: ['go', 'goes', 'going', 'went'],
        answer: 1,
        explanation: '主语She是第三人称单数，go加-es。',
      },
    ],
  },

  // ==================== 第56-69课 ====================

  56: {
    title: '复习一般现在时',
    explanation:
      '一般现在时用于描述经常发生的动作、习惯、客观事实和普遍真理。本课时复习一般现在时的基本结构和用法。',
    rules: [
      '一般现在时的基本结构：主语 + 动词原形（第三人称单数加 -s/-es）。',
      "否定句结构：主语 + do/does + not + 动词原形。第三人称单数用 does not (doesn't)。",
      '疑问句结构：Do/Does + 主语 + 动词原形？第三人称单数用 Does 提问。',
      '常见的时间标志词：always, usually, often, sometimes, never, every day, every week 等。',
    ],
    examples: [
      { english: 'I go to school every day.', chinese: '我每天去上学。' },
      { english: "She doesn't like coffee.", chinese: '她不喜欢咖啡。' },
      { english: 'Do you live near here?', chinese: '你住在附近吗？' },
      { english: "He always gets up at six o'clock.", chinese: '他总是六点钟起床。' },
    ],
    exercises: [
      {
        question: 'She ___ to school by bus every day.',
        options: ['go', 'goes', 'going', 'went'],
        answer: 1,
        explanation: '主语 She 是第三人称单数，一般现在时中动词要加 -es，go 变为 goes。',
      },
      {
        question: '___ your father work in a hospital?',
        options: ['Do', 'Does', 'Is', 'Are'],
        answer: 1,
        explanation: '主语 your father 是第三人称单数，一般现在时的疑问句用 Does 提问。',
      },
    ],
  },

  57: {
    title: '一般现在时与现在进行时对比',
    explanation:
      '一般现在时表示经常性、习惯性的动作或客观事实；现在进行时表示说话时正在进行的动作。本课时学习两者的区别和使用场景。',
    rules: [
      '一般现在时表示经常发生的动作或习惯：I usually walk to work.（我通常步行上班。）',
      '现在进行时表示此刻正在发生的动作，结构为：主语 + am/is/are + 动词-ing：I am walking to work now.（我现在正步行去上班。）',
      '一般现在时常与 always, usually, often, every day 等连用；现在进行时常与 now, at the moment, right now 等连用。',
      '某些动词一般不用于进行时，如表示感觉、情感的动词：know, like, want, need, believe 等。',
      '现在进行时的动词-ing 形式规则：一般直接加 -ing；以不发音 e 结尾去 e 加 -ing；重读闭音节双写末尾字母加 -ing。',
    ],
    examples: [
      {
        english: "I usually drive to work, but today I'm taking the bus.",
        chinese: '我通常开车上班，但今天我坐公共汽车。',
      },
      {
        english: 'She always reads the newspaper in the morning.',
        chinese: '她总是在早上看报纸。',
      },
      { english: "Look! It's raining outside.", chinese: '看！外面正在下雨。' },
      {
        english: "He doesn't usually smoke, but he's smoking now.",
        chinese: '他通常不抽烟，但他现在正在抽。',
      },
      { english: "What are you doing? I'm making the bed.", chinese: '你在做什么？我在整理床铺。' },
    ],
    exercises: [
      {
        question: 'She usually ___ breakfast at home, but today she ___ in a restaurant.',
        options: ['has; is eating', 'is having; eats', 'has; eats', 'is having; is eating'],
        answer: 0,
        explanation:
          'usually 表示习惯，用一般现在时 has；today 表示今天的特殊情况，用现在进行时 is eating。',
      },
      {
        question: 'Listen! Someone ___ at the door.',
        options: ['knocks', 'is knocking', 'knock', 'knocked'],
        answer: 1,
        explanation: 'Listen! 提示此刻正在发生的动作，用现在进行时 is knocking。',
      },
      {
        question: 'Which sentence is correct?',
        options: [
          'I am knowing the answer.',
          'I know the answer.',
          'I am know the answer.',
          'I knowing the answer.',
        ],
        answer: 1,
        explanation:
          'know 是表示认知状态的动词，一般不用于进行时，应使用一般现在时 I know the answer。',
      },
    ],
    tips: [
      '注意区分信号词：看到 always, usually, often, every day 用一般现在时；看到 now, at the moment, Look!, Listen! 用现在进行时。',
      '动词-ing 的拼写要注意：make → making（去 e），run → running（双写 n），sit → sitting（双写 t）。',
      "有些句子同时包含两种时态来对比习惯和当前动作，如 I usually walk but today I'm driving.",
    ],
  },

  58: {
    title: '复习时间表达',
    explanation: '本课时复习英语中时间的表达方式，包括整点、半点、刻钟以及分钟的说法。',
    rules: [
      "整点表达：数字 + o'clock，如 six o'clock（六点）。也可以直接说数字，如 It's six.",
      '半点表达：half past + 小时，如 half past eight（八点半）。',
      '刻钟表达：a quarter past + 小时（几点一刻）；a quarter to + 下一个小时（差一刻几点）。',
      '分钟表达：分钟 + past + 小时（几点过几分，不超过30分）；分钟 + to + 下一个小时（差几分几点，超过30分）。',
    ],
    examples: [
      { english: "It's three o'clock in the afternoon.", chinese: '现在下午三点。' },
      { english: "It's half past ten.", chinese: '现在十点半。' },
      { english: "It's a quarter to five.", chinese: '现在差一刻五点（四点四十五）。' },
      { english: "It's twenty past nine.", chinese: '现在九点二十分。' },
    ],
    exercises: [
      {
        question: '"It\'s a quarter past seven." 表示几点？',
        options: ['7:15', '7:45', '6:45', '7:30'],
        answer: 0,
        explanation: 'a quarter past seven 表示七点过一刻，即 7:15。',
      },
      {
        question: '如何用英语表达"差十分六点"（5:50）？',
        options: [
          "It's ten to six.",
          "It's ten past six.",
          "It's ten to five.",
          "It's fifty past five.",
        ],
        answer: 0,
        explanation: '超过30分用 to 表达，差十分六点 = ten to six。',
      },
    ],
  },

  59: {
    title: 'have 的用法：have + 名词表示动作',
    explanation:
      'have 除了表示"拥有"之外，还可以与名词搭配表示进行某种活动或动作，如 have a look（看一看）、have breakfast（吃早餐）等。这是英语中非常常见的表达方式。',
    rules: [
      'have + 名词 可以表示进行某种活动：have a look（看一看）、have a walk（散步）、have a rest（休息一下）。',
      'have + 一日三餐：have breakfast（吃早餐）、have lunch（吃午餐）、have dinner/supper（吃晚餐）。',
      'have + 名词 结构中的 have 是实义动词，否定句和疑问句需要借助 do/does/did：Do you have breakfast every day?',
      '在第三人称单数时，have 变为 has：She has a bath every morning.（她每天早上洗澡。）',
      'have 表示动作时，可以和 many, a good, a nice 等修饰词连用：have a good time（玩得开心）、have a nice day（过得愉快）。',
    ],
    examples: [
      { english: "Let's have a look at the new car.", chinese: '让我们看看这辆新车。' },
      { english: "She always has breakfast at seven o'clock.", chinese: '她总是七点钟吃早餐。' },
      { english: 'Did you have a good time at the party?', chinese: '你在聚会上玩得开心吗？' },
      { english: "He's having a shower at the moment.", chinese: '他此刻正在洗澡。' },
      { english: 'We usually have a walk after dinner.', chinese: '我们通常晚饭后散步。' },
    ],
    exercises: [
      {
        question: 'I want to ___ a look at your new phone.',
        options: ['do', 'make', 'have', 'take'],
        answer: 2,
        explanation:
          'have a look 是固定搭配，表示"看一看"。注意：take a look 也可以，但本课重点学习 have 的用法。',
      },
      {
        question: 'She ___ lunch at school every day.',
        options: ['have', 'has', 'is having', 'having'],
        answer: 1,
        explanation:
          '主语 She 是第三人称单数，一般现在时中 have 变为 has。have lunch 表示"吃午餐"。',
      },
      {
        question: 'Which sentence is INCORRECT?',
        options: [
          'She has a rest after lunch.',
          'Do you have a walk every morning?',
          'She has a good time yesterday.',
          'We had dinner together.',
        ],
        answer: 2,
        explanation:
          'yesterday 表示过去，应该用 had 而不是 has。正确说法是 She had a good time yesterday.',
      },
    ],
    tips: [
      'have 表示动作时可以与进行时连用：I\'m having lunch.（我正在吃午饭。）但 have 表示"拥有"时不能用于进行时。',
      '注意区分 have 的两种含义：I have a car.（拥有）vs. I have breakfast.（进行动作）。',
      'have 的过去式是 had，所有 have + 名词的搭配在变过去式时都使用 had。',
    ],
  },

  60: {
    title: '复习 have 的用法',
    explanation: '本课时复习 have 作为实义动词表示"拥有"和"进行动作"两种用法，巩固相关表达。',
    rules: [
      'have 表示"拥有"：I have a new car.（我有一辆新车。）第三人称单数用 has。',
      'have 表示"进行动作"：have breakfast / have a bath / have a walk 等。',
      "have 的否定形式：I don't have... / He doesn't have...（注意 doesn't 后用 have 原形）。",
      'have 的过去式为 had，适用于所有人称：I had a cold last week.（我上周感冒了。）',
    ],
    examples: [
      { english: "I don't have any brothers or sisters.", chinese: '我没有兄弟姐妹。' },
      { english: 'Does she have a pen?', chinese: '她有钢笔吗？' },
      {
        english: 'We had a wonderful time at the seaside.',
        chinese: '我们在海边度过了美好的时光。',
      },
      { english: 'He has a headache today.', chinese: '他今天头疼。' },
    ],
    exercises: [
      {
        question: "She doesn't ___ any money.",
        options: ['has', 'have', 'had', 'having'],
        answer: 1,
        explanation: "doesn't 后面要跟动词原形 have，不能用 has。",
      },
      {
        question: 'They ___ a big garden. (过去时)',
        options: ['have', 'has', 'had', 'having'],
        answer: 2,
        explanation: '过去时中 have 变为 had，适用于所有人称。',
      },
    ],
  },

  61: {
    title: 'have 的用法：表示疾病',
    explanation:
      'have 可以与疾病名称搭配，表示"患某种病"或"身体不适"。这是 have 作为实义动词的一个重要用法，在日常交流中非常实用。',
    rules: [
      'have + a + 常见疾病名词：have a cold（感冒）、have a headache（头疼）、have a toothache（牙疼）、have a fever（发烧）。',
      '有些疾病名词前不加 a：have flu（患流感）、have measles（患麻疹）、have mumps（患腮腺炎）。',
      "询问病情的句型：What's the matter with you? / What's wrong with you?（你怎么了？）",
      "描述病情可以用 have got 替代 have（英式口语）：I've got a terrible cold.（我得了重感冒。）",
      "表示生病时 can 和 must 的用法：You must stay in bed.（你必须卧床休息。）You can't go to school.（你不能去上学。）",
    ],
    examples: [
      { english: 'I have a bad cold and a cough.', chinese: '我得了重感冒并且咳嗽。' },
      {
        english: "What's the matter with Jimmy? He has a temperature.",
        chinese: 'Jimmy 怎么了？他发烧了。',
      },
      { english: 'The doctor says he has the measles.', chinese: '医生说他得了麻疹。' },
      { english: "She's got a terrible toothache.", chinese: '她牙疼得厉害。' },
      {
        english: 'You must stay in bed and take this medicine.',
        chinese: '你必须卧床休息并吃这些药。',
      },
    ],
    exercises: [
      {
        question: "What's the matter ___ you?",
        options: ['for', 'to', 'with', 'about'],
        answer: 2,
        explanation: 'What\'s the matter with you? 是固定搭配，表示"你怎么了？"。',
      },
      {
        question: 'He ___ a bad cold yesterday.',
        options: ['have', 'has', 'had', 'having'],
        answer: 2,
        explanation: 'yesterday 表示过去时，have 的过去式是 had。He had a bad cold yesterday.',
      },
      {
        question: 'Which expression is correct for "患麻疹"？',
        options: ['have a measles', 'have the measles', 'have measles', "have measles's"],
        answer: 1,
        explanation:
          'measles（麻疹）前通常加 the，说 have the measles。类似的还有 have the mumps。',
      },
    ],
    tips: [
      '常见疾病搭配要记住：a cold（感冒）、a headache（头疼）、a stomach ache（胃疼）、a toothache（牙疼）、a sore throat（嗓子疼）。',
      "英式英语中常用 have got 代替 have 表示生病：I've got a headache. 比 I have a headache. 更口语化。",
      "看医生时的常用表达：The doctor says I have...（医生说我得了……）; I don't feel well.（我感觉不舒服。）",
    ],
  },

  62: {
    title: '复习疾病表达',
    explanation: '本课时复习用 have 表达疾病和身体不适的各种说法，巩固看病就医相关对话。',
    rules: [
      'have + a + 疾病名词：have a cold, have a headache, have a sore throat 等。',
      'have + the + 某些传染病：have the measles, have the mumps, have the flu。',
      '描述病情程度可用形容词：a bad cold（重感冒）、a terrible headache（剧烈头疼）。',
      '建议句型：You should see a doctor. / You must stay in bed. / You should take some medicine.',
    ],
    examples: [
      { english: "I don't feel well. I have a sore throat.", chinese: '我不舒服，我嗓子疼。' },
      { english: 'She had a high temperature last night.', chinese: '她昨晚发高烧。' },
      {
        english: 'You should go to bed early and drink more water.',
        chinese: '你应该早点睡觉，多喝水。',
      },
      { english: 'The children have the mumps.', chinese: '孩子们得了腮腺炎。' },
    ],
    exercises: [
      {
        question: 'I have ___ bad cold. I must stay in ___ bed.',
        options: ['a; the', 'the; a', 'a; /', '/; the'],
        answer: 2,
        explanation: 'have a bad cold 中 cold 前加 a；stay in bed 是固定搭配，bed 前不加冠词。',
      },
      {
        question: '___ the matter with Tom? — He ___ a stomach ache.',
        options: ["What's; have", "What's; has", 'What; has', "What's; had"],
        answer: 1,
        explanation: "询问病情用 What's the matter with...? 回答中 Tom 是第三人称单数，用 has。",
      },
    ],
  },

  63: {
    title: '祈使句：表示建议或命令',
    explanation:
      '祈使句用于发出命令、提出建议或请求。祈使句以动词原形开头，省略主语 you。本课时学习祈使句的肯定形式和常见用法。',
    rules: [
      '祈使句肯定形式：动词原形 + 其他成分。如：Open the door.（打开门。）Come in.（进来。）',
      "Let's + 动词原形 表示建议：Let's go to the park.（我们去公园吧。）Let's have a rest.（我们休息一下吧。）",
      '祈使句可以用 please 使语气更礼貌：Please sit down. / Sit down, please.',
      "祈使句前加 Don't 构成否定：Don't be late.（不要迟到。）Don't smoke here.（不要在这里吸烟。）",
      '祈使句常用于指示方向：Go straight on. Turn left. Turn right.（直走。左转。右转。）',
    ],
    examples: [
      { english: 'Give me a glass of water, please.', chinese: '请给我一杯水。' },
      { english: "Let's go for a walk in the park.", chinese: '我们去公园散散步吧。' },
      { english: "Don't make so much noise!", chinese: '不要这么吵！' },
      { english: 'Turn left at the traffic lights.', chinese: '在红绿灯处左转。' },
      { english: 'Be quiet! The baby is sleeping.', chinese: '安静！宝宝在睡觉。' },
    ],
    exercises: [
      {
        question: "___ the window. It's very hot in here.",
        options: ['Opening', 'Open', 'Opens', 'To open'],
        answer: 1,
        explanation: '祈使句以动词原形开头，所以用 Open。',
      },
      {
        question: "Let's ___ to the cinema tonight.",
        options: ['go', 'to go', 'going', 'goes'],
        answer: 0,
        explanation: "Let's 后面跟动词原形，所以用 go。Let's go to the cinema.",
      },
      {
        question: 'Which is the correct negative imperative?',
        options: [
          "Don't to run on the grass.",
          'Not run on the grass.',
          "Don't run on the grass.",
          "Doesn't run on the grass.",
        ],
        answer: 2,
        explanation: "祈使句的否定形式是在动词原形前加 Don't，即 Don't + 动词原形。",
      },
    ],
    tips: [
      '祈使句的主语 you 通常省略，但在需要强调或区分对象时可以加上：You sit here, and you go there.',
      "Let's 是 Let us 的缩写，用于提出建议，包括说话人和听话人。否定形式为 Let's not...：Let's not argue.",
      '祈使句的语调：命令通常用降调，建议或请求通常用升调或平调。',
    ],
  },

  64: {
    title: '复习祈使句否定形式',
    explanation: "本课时复习祈使句的否定形式，即用 Don't + 动词原形来表达禁止或劝阻的用法。",
    rules: [
      "祈使句否定形式：Don't + 动词原形 + 其他。如：Don't worry.（别担心。）",
      "Don't be + 形容词 表示\"不要……\"：Don't be silly.（别犯傻了。）Don't be late.（不要迟到。）",
      'No + 动词-ing / 名词 用于标志语：No smoking.（禁止吸烟。）No parking.（禁止停车。）',
      "Let's not + 动词原形 表示否定建议：Let's not go out tonight.（我们今晚不要出去了。）",
    ],
    examples: [
      { english: "Don't open the window. It's cold outside.", chinese: '不要开窗户，外面很冷。' },
      { english: "Don't be afraid. I'll help you.", chinese: '不要害怕，我会帮你的。' },
      { english: 'No smoking in this area.', chinese: '此区域禁止吸烟。' },
      {
        english: "Let's not waste time. We have a lot to do.",
        chinese: '我们不要浪费时间了，有很多事要做。',
      },
    ],
    exercises: [
      {
        question: "___ touch that wire. It's dangerous!",
        options: ['Not', "Don't", "Doesn't", 'No'],
        answer: 1,
        explanation: "祈使句否定用 Don't + 动词原形。Don't touch that wire.",
      },
      {
        question: '"No ___" is a common sign in museums.',
        options: ['photograph', 'photographs', 'photographing', 'photographed'],
        answer: 2,
        explanation: 'No + 动词-ing 用于标志语，表示禁止某行为。No photographing 意为"禁止拍照"。',
      },
    ],
  },

  65: {
    title: '时间表达与反身代词',
    explanation:
      '本课时学习更精确的时间表达方式（包括 a.m. 和 p.m. 的用法），以及反身代词（myself, yourself, himself 等）的用法。',
    rules: [
      '时间表达使用 a.m.（上午）和 p.m.（下午）：at 9:00 a.m.（上午九点）、at 3:30 p.m.（下午三点半）。',
      "介词用法：at + 具体时刻（at 7 o'clock）；on + 星期/日期（on Monday）；in + 月/年/时段（in the morning, in July）。",
      '反身代词形式：myself（我自己）、yourself（你自己）、himself（他自己）、herself（她自己）、itself（它本身）、ourselves（我们自己）、yourselves（你们自己）、themselves（他们自己）。',
      '反身代词用于主语和宾语相同时：I hurt myself.（我伤到自己了。）She taught herself English.（她自学了英语。）',
      'by oneself 表示"独自地、单独地"：She lives by herself.（她独自生活。）He did it all by himself.（他全靠自己完成了这件事。）',
    ],
    examples: [
      { english: 'The train leaves at 8:15 a.m. tomorrow.', chinese: '火车明天上午八点一刻发车。' },
      { english: 'I usually do my homework by myself.', chinese: '我通常自己做作业。' },
      { english: 'She made the dress herself.', chinese: '她自己做了这条裙子。' },
      { english: "Be careful, or you'll hurt yourself!", chinese: '小心点，不然你会伤到自己的！' },
      { english: 'They enjoyed themselves at the party.', chinese: '他们在聚会上玩得很开心。' },
    ],
    exercises: [
      {
        question: 'The children made the model plane all by ___.',
        options: ['them', 'their', 'themselves', 'they'],
        answer: 2,
        explanation:
          'by oneself 表示"独自地"，children 对应反身代词 themselves。all by themselves 表示"全靠他们自己"。',
      },
      {
        question: 'We have a meeting ___ Monday morning ___ 9 a.m.',
        options: ['in; at', 'on; at', 'at; on', 'on; in'],
        answer: 1,
        explanation: 'Monday morning 是星期 + 时段，用 on；9 a.m. 是具体时刻，用 at。',
      },
      {
        question: 'She looked at ___ in the mirror.',
        options: ['her', 'herself', 'she', 'hers'],
        answer: 1,
        explanation: '主语 She 和宾语是同一个人，需要用反身代词 herself。',
      },
    ],
    tips: [
      '注意 yourself 和 yourselves 的区别：yourself 是单数（你自己），yourselves 是复数（你们自己）。',
      'enjoy oneself 是固定搭配，表示"玩得开心"：We enjoyed ourselves. = We had a good time.',
      'help oneself to... 表示"随便吃……"：Help yourself to some cake.（请随便吃点蛋糕。）',
    ],
  },

  66: {
    title: '复习时间表达',
    explanation: '本课时复习各种时间表达方式，包括时刻、星期、日期以及时间介词的使用。',
    rules: [
      "at 用于具体时刻：at 6 o'clock, at noon, at night。",
      'on 用于星期和具体日期：on Monday, on July 4th, on my birthday。',
      'in 用于月、年、季节和一天中的时段：in January, in 2024, in summer, in the afternoon。',
      'from...to... 表示时间范围：from Monday to Friday（从周一到周五）、from 9 a.m. to 5 p.m.（从上午九点到下午五点）。',
    ],
    examples: [
      { english: 'The shop opens at half past nine.', chinese: '这家商店九点半开门。' },
      {
        english: "We don't go to school on Saturday or Sunday.",
        chinese: '我们星期六和星期日不上学。',
      },
      { english: 'My birthday is in March.', chinese: '我的生日在三月。' },
      { english: 'She works from nine to five every day.', chinese: '她每天从九点工作到五点。' },
    ],
    exercises: [
      {
        question: 'The concert is ___ the evening ___ March 15th.',
        options: ['in; on', 'on; in', 'at; on', 'in; at'],
        answer: 0,
        explanation:
          'in the evening 表示"在晚上"（一天中的时段用 in）；on March 15th 表示具体日期用 on。',
      },
      {
        question: 'What time does the film start? — It starts ___ a quarter ___ eight.',
        options: ['at; past', 'in; to', 'at; to', 'on; past'],
        answer: 0,
        explanation: '具体时刻前用 at；a quarter past eight 表示八点一刻。',
      },
    ],
  },

  67: {
    title: '过去时：was/were',
    explanation:
      '本课时学习一般过去时中 be 动词的用法。was 用于第一人称和第三人称单数，were 用于其他所有人称。was/were 用于描述过去的状态和情况。',
    rules: [
      'was 用于 I, he, she, it（第一人称单数和第三人称单数）；were 用于 you, we, they（第二人称和复数）。',
      "was/were 的否定形式：was not (wasn't) / were not (weren't)。",
      'was/were 的疑问形式：Was he at home? / Were they happy? 将 was/were 提到主语前。',
      'was/were 常用于描述过去的位置、状态、天气、感受等：It was cold yesterday.（昨天很冷。）',
      '常用时间标志词：yesterday, last night, last week, two days ago, in 1990 等。',
    ],
    examples: [
      { english: 'I was at home last night. Where were you?', chinese: '我昨晚在家。你在哪儿？' },
      {
        english: "She wasn't at school yesterday. She was ill.",
        chinese: '她昨天没来上学，她病了。',
      },
      { english: 'Were they at the cinema last Saturday?', chinese: '他们上周六在电影院吗？' },
      { english: 'It was very windy yesterday morning.', chinese: '昨天早上风很大。' },
      {
        english: 'We were late for the meeting this morning.',
        chinese: '我们今天早上开会迟到了。',
      },
    ],
    exercises: [
      {
        question: 'There ___ a lot of people at the concert last night.',
        options: ['was', 'were', 'is', 'are'],
        answer: 1,
        explanation: 'a lot of people 是复数，过去时中复数用 were。',
      },
      {
        question: 'Where ___ you born? — I ___ born in Beijing.',
        options: ['was; was', 'were; were', 'were; was', 'was; were'],
        answer: 2,
        explanation: 'you 搭配 were；I 搭配 was。Where were you born? I was born in Beijing.',
      },
      {
        question: 'The weather ___ nice yesterday, so we ___ in the garden all afternoon.',
        options: ['was; were', 'were; was', 'was; was', 'were; were'],
        answer: 0,
        explanation: 'The weather 是第三人称单数用 was；we 是复数用 were。',
      },
    ],
    tips: [
      '注意 I 和 he/she/it 用 was，但 you 无论是单数还是复数都用 were。',
      'there was / there were 表示"过去有"：There was a book on the table.（桌上有一本书。）There were some children in the park.（公园里有一些孩子。）',
      'was/were going to 表示"过去打算做某事"：I was going to call you.（我本来打算给你打电话的。）',
    ],
  },

  68: {
    title: '复习过去时 was/were',
    explanation: '本课时复习 be 动词过去式 was/were 的用法，巩固描述过去状态和情况的表达。',
    rules: [
      "was 用于 I, he, she, it；were 用于 you, we, they。否定形式为 wasn't / weren't。",
      'there was + 单数名词 / there were + 复数名词，表示"过去有"。',
      "was/were 的疑问句：将 was/were 置于主语之前，简短回答：Yes, I was. / No, I wasn't.",
      'was/were + 形容词/介词短语 描述过去的状态：He was tired.（他当时很累。）They were in London.（他们当时在伦敦。）',
    ],
    examples: [
      {
        english: "I wasn't at work yesterday because I was sick.",
        chinese: '我昨天没上班，因为我生病了。',
      },
      {
        english: 'There were five apples on the table, but now there are only two.',
        chinese: '桌上原来有五个苹果，但现在只剩两个了。',
      },
      { english: 'Were you happy at your last school?', chinese: '你在上一个学校开心吗？' },
      {
        english: 'It was a beautiful day, so we went to the beach.',
        chinese: '那天天气很好，所以我们去了海滩。',
      },
    ],
    exercises: [
      {
        question: '— Was the exam difficult? — No, it ___.',
        options: ["wasn't", "weren't", "isn't", "aren't"],
        answer: 0,
        explanation: "it 对应 was，否定回答用 was not 的缩写 wasn't。",
      },
      {
        question: 'There ___ any milk in the fridge yesterday.',
        options: ['was', "wasn't", 'were', "weren't"],
        answer: 1,
        explanation:
          "milk 是不可数名词，用 was 的形式；any 用于否定句，所以选 wasn't。There wasn't any milk.",
      },
    ],
  },

  69: {
    title: '过去时：规则动词',
    explanation:
      '本课时学习一般过去时中规则动词的变化形式。规则动词的过去式是在动词原形后加 -ed，但有一些拼写变化需要注意。',
    rules: [
      '规则动词过去式一般在词尾加 -ed：work → worked, play → played, watch → watched。',
      '以 e 结尾的动词只加 -d：live → lived, like → liked, close → closed。',
      '以辅音字母 + y 结尾的动词，变 y 为 i 再加 -ed：study → studied, carry → carried, try → tried。',
      '以重读闭音节结尾且末尾只有一个辅音字母的动词，双写该辅音字母再加 -ed：stop → stopped, plan → planned, drop → dropped。',
      '规则动词过去式的发音：清辅音后读 /t/（worked, watched）；浊辅音和元音后读 /d/（played, lived）；t/d 后读 /ɪd/（wanted, needed）。',
    ],
    examples: [
      { english: 'I worked very hard yesterday.', chinese: '我昨天工作很努力。' },
      {
        english: 'She studied English for three hours last night.',
        chinese: '她昨晚学了三个小时英语。',
      },
      {
        english: 'They played football in the park after school.',
        chinese: '他们放学后在公园踢了足球。',
      },
      { english: 'The bus stopped and the door opened.', chinese: '公共汽车停了下来，门打开了。' },
      {
        english: 'We watched a good film on TV last weekend.',
        chinese: '上周末我们在电视上看了一部好电影。',
      },
    ],
    exercises: [
      {
        question: 'She ___ her homework before dinner yesterday.',
        options: ['finish', 'finished', 'finishing', 'finishes'],
        answer: 1,
        explanation: 'yesterday 表示过去时，finish 是规则动词，过去式为 finished。',
      },
      {
        question: 'Which past tense form is correct?',
        options: ['stoped', 'studyed', 'carried', 'plaied'],
        answer: 2,
        explanation:
          'carry 以辅音 + y 结尾，变 y 为 i 加 -ed，正确形式是 carried。stop → stopped（双写 p），study → studied，play → played。',
      },
      {
        question: 'I ___ to the radio and then ___ off to sleep.',
        options: ['listened; dropped', 'listened; droped', 'listen; dropped', 'listened; dropt'],
        answer: 0,
        explanation:
          'listen 和 drop 都是规则动词。listen → listened；drop 是重读闭音节结尾，双写 p 加 -ed → dropped。',
      },
    ],
    tips: [
      '记忆规则动词过去式时，要特别注意拼写变化：双写辅音字母（stopped, planned）和变 y 为 i（studied, carried）是最容易出错的地方。',
      '规则动词的过去式所有人称都一样，不需要像一般现在时那样区分第三人称单数：I worked, he worked, they worked 形式完全相同。',
      '注意区分动词原形和过去式的发音：played /pleɪd/ 中的 -ed 读 /d/，而 wanted /ˈwɒntɪd/ 中的 -ed 读 /ɪd/。',
    ],
  },

  // ==================== 第70-89课 ====================

  70: {
    title: '复习过去时',
    explanation:
      '一般过去时表示在过去某个时间发生的动作或存在的状态。本课复习一般过去时的基本用法，包括规则动词和不规则动词的过去式、否定句形式以及常见时间状语的使用。',
    rules: [
      '一般过去时由动词的过去式构成，规则动词在词尾加 -ed（如 play → played, watch → watched）。',
      "否定句使用 did not (didn't) + 动词原形，如：I didn't go to school yesterday.",
      '常见的过去时间状语有：yesterday（昨天）, last night（昨晚）, last week（上周）, ago（以前）, in 1990（在1990年）等。',
      "be 动词的过去式为 was（用于第一、三人称单数）和 were（用于其他人称），否定形式为 wasn't / weren't。",
    ],
    examples: [
      { english: 'I played football yesterday.', chinese: '我昨天踢了足球。' },
      { english: 'She watched a film last night.', chinese: '她昨晚看了一部电影。' },
      { english: 'They were not at home last Monday.', chinese: '他们上周一不在家。' },
      { english: "He didn't go to school yesterday morning.", chinese: '他昨天上午没有去上学。' },
    ],
    exercises: [
      {
        question: '选择正确的句子：',
        options: [
          'I played football yesterday.',
          'I play football yesterday.',
          'I playing football yesterday.',
          'I plays football yesterday.',
        ],
        answer: 0,
        explanation: '一般过去时中，动词应使用过去式。play 的过去式为 played，因此选 A。',
      },
      {
        question: '选择正确的否定句：',
        options: [
          "She didn't watched TV last night.",
          "She didn't watch TV last night.",
          "She doesn't watch TV last night.",
          'She not watched TV last night.',
        ],
        answer: 1,
        explanation: "一般过去时的否定句结构为 didn't + 动词原形，watch 用原形，因此选 B。",
      },
    ],
  },

  71: {
    title: '过去时，不规则动词',
    explanation:
      '英语中有一部分动词的过去式不是通过加 -ed 构成的，这些动词叫做不规则动词。不规则动词的过去式需要逐个记忆，本课学习常见的不规则动词及其过去式形式。',
    rules: [
      '不规则动词的过去式没有统一的规则，必须逐个记忆，不能简单地加 -ed。',
      '常见不规则动词：go → went（去）, see → saw（看见）, come → came（来）, take → took（拿）, give → gave（给）。',
      '部分不规则动词的过去式与原形相同：cut → cut（切）, put → put（放）, let → let（让）, read → read（读）。',
      '常见不规则动词：have → had（有）, do → did（做）, get → got（得到）, make → made（制作）。',
      '不规则动词在过去时和现在完成时中的形式不同，过去式用于一般过去时，过去分词用于完成时。',
    ],
    examples: [
      { english: 'I went to the shop yesterday.', chinese: '我昨天去了商店。' },
      {
        english: 'She saw a beautiful bird in the park.',
        chinese: '她在公园里看到了一只漂亮的鸟。',
      },
      { english: 'He came here last Monday.', chinese: '他上周一来到了这里。' },
      { english: 'They had a wonderful time at the party.', chinese: '他们在聚会上玩得很开心。' },
      { english: 'We took many photos during the trip.', chinese: '我们在旅途中拍了很多照片。' },
    ],
    exercises: [
      {
        question: '"go" 的过去式是什么？',
        options: ['goed', 'went', 'gone', 'going'],
        answer: 1,
        explanation: 'go 是不规则动词，过去式为 went，不能用 goed。gone 是过去分词，不是过去式。',
      },
      {
        question: '选择正确的句子：',
        options: [
          'He goed to school yesterday.',
          'He went to school yesterday.',
          'He gone to school yesterday.',
          'He go to school yesterday.',
        ],
        answer: 1,
        explanation: 'go 的过去式为 went，在一般过去时的陈述句中使用过去式，因此选 B。',
      },
      {
        question: '"have" 的过去式是什么？',
        options: ['haved', 'having', 'had', 'has'],
        answer: 2,
        explanation:
          'have 是不规则动词，过去式为 had。haved 不是正确的形式，has 是第三人称单数现在时形式。',
      },
    ],
    tips: [
      '不规则动词需要反复记忆，建议将常见不规则动词按变化规律分组来记忆。',
      '可以通过阅读英语短文、做造句练习来加深对不规则动词过去式的印象。',
      '注意区分过去式和过去分词：过去式用于一般过去时（如 I went），过去分词用于完成时（如 I have gone）。',
    ],
  },

  72: {
    title: '复习过去时疑问句',
    explanation:
      '一般过去时的疑问句需要借助助动词 did 来构成。本课复习一般过去时疑问句和简短回答的用法。',
    rules: [
      '一般过去时的一般疑问句结构为：Did + 主语 + 动词原形 + 其他？',
      '疑问句中，助动词 did 后面的动词必须使用原形，不能用过去式。',
      "肯定回答为：Yes, 主语 + did. 否定回答为：No, 主语 + didn't.",
      '特殊疑问句结构为：疑问词 + did + 主语 + 动词原形 + 其他？如：What did you do yesterday?',
    ],
    examples: [
      { english: 'Did you see the film?', chinese: '你看了那部电影吗？' },
      { english: 'Did he go to school yesterday?', chinese: '他昨天去上学了吗？' },
      { english: 'What did you do last weekend?', chinese: '你上周末做了什么？' },
      { english: "Yes, I did. / No, I didn't.", chinese: '是的，我做了。/ 不，我没做。' },
    ],
    exercises: [
      {
        question: '选择正确的一般疑问句：',
        options: [
          'Did you went to the park?',
          'Did you go to the park?',
          'Do you went to the park?',
          'Does you go to the park?',
        ],
        answer: 1,
        explanation: '一般过去时疑问句结构为 Did + 主语 + 动词原形，go 是原形，因此选 B。',
      },
      {
        question: '选择正确的回答：Did she finish her homework?',
        options: ['Yes, she finished.', 'Yes, she did.', 'Yes, she does.', 'Yes, she finishes.'],
        answer: 1,
        explanation: '对 Did 引导的一般疑问句，肯定回答为 Yes, 主语 + did.，因此选 B。',
      },
    ],
  },

  73: {
    title: '一般过去时，不规则动词',
    explanation:
      '本课继续学习更多不规则动词的过去式，并学习如何按变化规律对不规则动词进行分类记忆，以提高记忆效率。',
    rules: [
      '不规则动词可按变化规律分组记忆，同一组动词的过去式变化方式相似。',
      'i → a 变化：begin → began（开始）, drink → drank（喝）, ring → rang（响）, sing → sang（唱）, swim → swam（游泳）。',
      'ought/aught 变化：bring → brought（带来）, buy → bought（买）, think → thought（想）, catch → caught（抓住）, teach → taught（教）。',
      'ell → old 变化：tell → told（告诉）, sell → sold（卖）; eed → ed 变化：feel → felt（感觉）, keep → kept（保持）。',
      '无变化：cut → cut（切）, put → put（放）, shut → shut（关）, let → let（让）, cost → cost（花费）。',
    ],
    examples: [
      { english: 'I bought a new book yesterday.', chinese: '我昨天买了一本新书。' },
      { english: 'She drank a glass of milk this morning.', chinese: '她今天早上喝了一杯牛奶。' },
      { english: 'He told me a funny story.', chinese: '他给我讲了一个有趣的故事。' },
      { english: 'They brought some flowers to the teacher.', chinese: '他们给老师带了一些花。' },
      { english: 'We felt very tired after the long walk.', chinese: '长时间步行后我们感觉很累。' },
    ],
    exercises: [
      {
        question: '"buy" 的过去式是什么？',
        options: ['buyed', 'bought', 'brought', 'buying'],
        answer: 1,
        explanation: 'buy 的过去式为 bought。注意 brought 是 bring 的过去式，不要混淆。',
      },
      {
        question: '选择正确的句子：',
        options: [
          'She drinked some water.',
          'She drank some water.',
          'She drunk some water.',
          'She drinks some water.',
        ],
        answer: 1,
        explanation: 'drink 是不规则动词，过去式为 drank。drunk 是过去分词，不能用作过去式。',
      },
      {
        question: '"bring" 的过去式是什么？',
        options: ['bringed', 'brought', 'bought', 'brang'],
        answer: 1,
        explanation: 'bring 的过去式为 brought。bought 是 buy 的过去式，要注意区分。',
      },
    ],
    tips: [
      '将不规则动词按变化规律分组记忆比逐个死记更加高效。',
      '多做造句练习，在实际语境中运用不规则动词的过去式，有助于加深记忆。',
      '可以通过制作不规则动词卡片来反复练习和自测。',
    ],
  },

  74: {
    title: '复习一般过去时',
    explanation:
      '本课综合复习一般过去时的各种用法，包括肯定句、否定句、疑问句以及常见过去时间状语的使用。',
    rules: [
      '一般过去时表示在过去某个时间发生的动作或存在的状态，常与过去时间状语连用。',
      '常见的过去时间状语：yesterday（昨天）, last night/week/month/year（昨晚/上周/上个月/去年）, ... ago（……以前）, in + 过去年份, just now（刚才）。',
      "肯定句：主语 + 动词过去式 + 其他；否定句：主语 + didn't + 动词原形 + 其他。",
      '一般疑问句：Did + 主语 + 动词原形 + 其他？特殊疑问句：疑问词 + did + 主语 + 动词原形 + 其他？',
    ],
    examples: [
      { english: 'I bought a new book yesterday.', chinese: '我昨天买了一本新书。' },
      { english: 'He was ten years old last year.', chinese: '他去年十岁。' },
      { english: 'Did you see the film last night?', chinese: '你昨晚看那部电影了吗？' },
      { english: "She didn't go to work last Monday.", chinese: '她上周一没去上班。' },
    ],
    exercises: [
      {
        question: '选择正确的过去时间状语：I saw him ___.',
        options: ['tomorrow', 'now', 'yesterday', 'every day'],
        answer: 2,
        explanation:
          'yesterday（昨天）是过去时间状语，与一般过去时搭配使用。tomorrow 用于将来时，now 用于现在时。',
      },
      {
        question: '选择正确的句子：',
        options: [
          "They didn't went to the cinema last night.",
          "They didn't go to the cinema last night.",
          "They don't go to the cinema last night.",
          'They not go to the cinema last night.',
        ],
        answer: 1,
        explanation: "一般过去时的否定句结构为 didn't + 动词原形，go 用原形，因此选 B。",
      },
    ],
  },

  75: {
    title: '一般过去时，不规则动词的过去式',
    explanation:
      '本课进一步学习更多不规则动词的过去式，重点掌握不同类型的不规则变化，并通过练习巩固所学内容。',
    rules: [
      '元音变化 i → a：sit → sat（坐）, win → won（赢）; 元音变化 i → u：dig → dug（挖）, hang → hung（悬挂）, stick → stuck（粘）。',
      '辅音变化 d → t：build → built（建造）, send → sent（发送）, spend → spent（花费）, lend → lent（借出）。',
      '特殊变化：speak → spoke（说）, break → broke（打破）, choose → chose（选择）, forget → forgot（忘记）, wake → woke（醒来）。',
      '复合变化：know → knew（知道）, grow → grew（生长）, fly → flew（飞）, draw → drew（画）, throw → threw（扔）。',
      '特殊变化：lie → lay（躺/说谎）, lay → laid（放置）, pay → paid（支付）, say → said（说）。',
    ],
    examples: [
      { english: 'He sat on the bench and read a book.', chinese: '他坐在长椅上看书。' },
      { english: 'She spoke English very well.', chinese: '她英语说得很好。' },
      { english: 'They built a new bridge last year.', chinese: '他们去年建了一座新桥。' },
      { english: 'He knew the answer to the question.', chinese: '他知道这个问题的答案。' },
      { english: 'She paid for the dress yesterday.', chinese: '她昨天付了裙子的钱。' },
    ],
    exercises: [
      {
        question: '"buy" 的过去式是什么？',
        options: ['buyed', 'bought', 'brought', 'buying'],
        answer: 1,
        explanation: 'buy 的过去式为 bought，属于 ought/aught 类变化。brought 是 bring 的过去式。',
      },
      {
        question: '选择正确的句子：',
        options: [
          'She gived me a present on my birthday.',
          'She gave me a present on my birthday.',
          'She gaven me a present on my birthday.',
          'She gives me a present on my birthday.',
        ],
        answer: 1,
        explanation: 'give 是不规则动词，过去式为 gave。gived 和 gaven 都不是正确的形式。',
      },
      {
        question: '"know" 的过去式是什么？',
        options: ['knowed', 'known', 'knew', 'knowing'],
        answer: 2,
        explanation: 'know 的过去式为 knew。known 是过去分词，knowed 不是正确的形式。',
      },
    ],
    tips: [
      '将不规则动词按元音变化、辅音变化等规律进行分类，可以更系统地记忆。',
      '在日常对话和写作中多使用不规则动词的过去式，通过实际运用来加深记忆。',
      '注意区分容易混淆的不规则动词，如 lie（躺）→ lay 与 lay（放置）→ laid。',
    ],
  },

  76: {
    title: '复习一般过去时疑问句',
    explanation: '本课复习一般过去时的疑问句形式，包括一般疑问句和特殊疑问句，以及正确的回答方式。',
    rules: [
      '一般疑问句：Did + 主语 + 动词原形 + 其他？注意 did 后面的动词必须用原形。',
      "肯定回答：Yes, 主语 + did. 否定回答：No, 主语 + didn't.",
      '特殊疑问句：疑问词（What/Where/When/Why/How）+ did + 主语 + 动词原形 + 其他？',
      '注意：be 动词的过去式（was/were）构成疑问句时不需要助动词 did，直接将 was/were 提到主语前面。',
    ],
    examples: [
      { english: 'What did you do yesterday?', chinese: '你昨天做了什么？' },
      { english: 'Where did she go last week?', chinese: '她上周去了哪里？' },
      { english: 'When did they arrive?', chinese: '他们什么时候到的？' },
      { english: 'Why did he leave so early?', chinese: '他为什么这么早就离开了？' },
    ],
    exercises: [
      {
        question: '选择正确的疑问句：',
        options: [
          'What did you bought yesterday?',
          'What did you buy yesterday?',
          'What you bought yesterday?',
          'What do you buy yesterday?',
        ],
        answer: 1,
        explanation: '特殊疑问句结构为：疑问词 + did + 主语 + 动词原形，buy 是原形，因此选 B。',
      },
      {
        question: '选择正确的回答：Where did you go last summer?',
        options: [
          'I go to Beijing.',
          'I went to Beijing.',
          'I going to Beijing.',
          'I did go to Beijing.',
        ],
        answer: 1,
        explanation: '回答关于过去动作的问题时，应使用一般过去时，go 的过去式为 went。',
      },
    ],
  },

  77: {
    title: '一般过去时，时间表达',
    explanation:
      '本课学习如何用英语表达时间（时刻），包括整点、几点几分以及上/下午的表达方式，并结合一般过去时进行练习。',
    rules: [
      "整点时间用 o'clock 表示：at seven o'clock（在七点）, at twelve o'clock（在十二点）。",
      '上午用 a.m.（ante meridiem），下午用 p.m.（post meridiem）：at 9 a.m.（上午九点）, at 3 p.m.（下午三点）。',
      '半点用 half past：at half past two（两点半）; 一刻用 a quarter past：at a quarter past three（三点一刻）。',
      '差几分到某点用 to：at ten to five（差十分五点/四点五十）; 几点过几分用 past：at twenty past six（六点二十）。',
      '一般过去时常与具体时刻连用：at + 具体时刻，表示在过去某个具体时刻发生的动作。',
    ],
    examples: [
      { english: 'What time did you arrive?', chinese: '你几点到的？' },
      { english: 'I arrived at half past two.', chinese: '我两点半到了。' },
      { english: 'The train left at a quarter to four.', chinese: '火车三点四十五分发车了。' },
      {
        english: "She got up at seven o'clock yesterday morning.",
        chinese: '她昨天早上七点起床的。',
      },
      { english: 'He had lunch at a quarter past twelve.', chinese: '他十二点一刻吃了午饭。' },
    ],
    exercises: [
      {
        question: '"两点半" 用英语怎么说？',
        options: ['half to two', 'half past two', 'two past half', 'half to three'],
        answer: 1,
        explanation: '两点半的正确表达是 half past two，half past 表示"……点半"。',
      },
      {
        question: '选择正确的时间表达：The film started at ___.',
        options: ['half to eight', 'half eight past', 'half past eight', 'eight past half'],
        answer: 2,
        explanation: '八点半的正确表达为 half past eight。half past + 小时数 表示"……点半"。',
      },
      {
        question: '"a quarter to five" 是什么意思？',
        options: ['五点一刻', '四点四十五分', '五点四十五分', '四点一刻'],
        answer: 1,
        explanation:
          'a quarter to five 表示差一刻到五点，即四点四十五分。a quarter to + 小时数 表示"差一刻到……点"。',
      },
    ],
    tips: [
      '英语中表达时间有两种常见方式：直接读法（如 seven thirty = 7:30）和间接读法（如 half past seven = 7:30）。',
      '在书面表达中，注意 past 用于"几点过几分"，to 用于"差几分到几点"。',
      '日常口语中常用 a quarter（一刻钟/15分钟）和 half（半小时/30分钟）来表达时间。',
    ],
  },

  78: {
    title: '复习一般过去时',
    explanation:
      '本课综合复习一般过去时的所有用法，包括肯定句、否定句、疑问句、时间状语和时间表达的综合运用。',
    rules: [
      '一般过去时用于描述过去发生的动作或存在的状态，动词使用过去式。',
      "否定句使用 didn't + 动词原形，疑问句使用 Did + 主语 + 动词原形。",
      '常见过去时间状语：yesterday, last night/week/year, ... ago, in + 过去年份, just now, at + 具体时刻。',
      '不规则动词的过去式需要逐个记忆，不能通过加 -ed 来构成。',
    ],
    examples: [
      { english: 'I went to the cinema last night.', chinese: '我昨晚去了电影院。' },
      { english: 'Did you see the film yesterday?', chinese: '你昨天看了那部电影吗？' },
      { english: 'She arrived at half past three.', chinese: '她三点半到了。' },
      {
        english: "They didn't come to the party last Saturday.",
        chinese: '他们上周六没来参加聚会。',
      },
    ],
    exercises: [
      {
        question: '选择正确的句子：',
        options: [
          "He didn't went to school yesterday.",
          "He didn't go to school yesterday.",
          "He doesn't go to school yesterday.",
          'He not go to school yesterday.',
        ],
        answer: 1,
        explanation: "一般过去时的否定句结构为 didn't + 动词原形，go 为原形，因此选 B。",
      },
      {
        question: '选择正确的时间表达：She left at ___ yesterday afternoon.',
        options: ['half past three', 'half to three', 'three past half', 'three half past'],
        answer: 0,
        explanation: '三点半的正确表达为 half past three，half past + 小时数 表示"……点半"。',
      },
    ],
  },

  79: {
    title: 'many, much 的用法',
    explanation:
      'many 和 much 都表示"许多"，但用法不同。many 用于修饰可数名词的复数形式，much 用于修饰不可数名词。本课学习如何正确区分和使用这两个词。',
    rules: [
      'many 用于修饰可数名词复数，如：many books（很多书）, many students（很多学生）, many cars（很多车）。',
      'much 用于修饰不可数名词，如：much water（很多水）, much time（很多时间）, much money（很多钱）。',
      'How many + 可数名词复数 + ...? 用于询问可数名词的数量；How much + 不可数名词 + ...? 用于询问不可数名词的数量或价格。',
      'many 和 much 常用于疑问句和否定句中，在肯定句中通常用 a lot of / lots of 来代替。',
    ],
    examples: [
      { english: 'How many books do you have?', chinese: '你有多少本书？' },
      { english: 'How much water do you need?', chinese: '你需要多少水？' },
      { english: "There aren't many students in the classroom.", chinese: '教室里没有很多学生。' },
      { english: "She doesn't have much money.", chinese: '她没有很多钱。' },
      { english: 'How much does this book cost?', chinese: '这本书多少钱？' },
    ],
    exercises: [
      {
        question: '选择正确的选项：How ___ water is there in the bottle?',
        options: ['many', 'much', 'lot', 'few'],
        answer: 1,
        explanation: 'water（水）是不可数名词，应该用 how much 来提问其数量，不能用 how many。',
      },
      {
        question: '选择正确的选项：There are ___ students in our class.',
        options: ['much', 'a lot', 'many', 'lot of'],
        answer: 2,
        explanation:
          'students（学生）是可数名词复数，应该用 many 来修饰。a lot 需要加 of 才能修饰名词，lot of 缺少 a。',
      },
      {
        question: '选择正确的句子：',
        options: [
          'How many time do you need?',
          'How much time do you need?',
          'How many times do you need?',
          'How much times do you need?',
        ],
        answer: 1,
        explanation:
          'time 表示"时间"时是不可数名词，应该用 how much 来提问。times 是复数形式，表示"次数"，是可数名词。',
      },
    ],
    tips: [
      '判断用 many 还是 much 的关键是看后面的名词是否可数：可数名词复数用 many，不可数名词用 much。',
      '常见的不可数名词有：water（水）, milk（牛奶）, bread（面包）, money（钱）, time（时间）, music（音乐）, news（新闻）, information（信息）等。',
      'How much 除了询问数量外，还可以用来询问价格，如：How much is this?（这个多少钱？）',
    ],
  },

  80: {
    title: '复习 many, much, a lot of',
    explanation: '本课复习 many、much 和 a lot of 的用法区别，掌握它们在不同句型中的使用规则。',
    rules: [
      'many + 可数名词复数（常用于疑问句和否定句）；much + 不可数名词（常用于疑问句和否定句）。',
      'a lot of / lots of 既可修饰可数名词复数，也可修饰不可数名词，常用于肯定句中。',
      '在肯定句中，通常用 a lot of 而不用 many 或 much；在疑问句和否定句中，many 和 much 更为常见。',
      'plenty of 也可以修饰可数名词复数和不可数名词，表示"大量的、充足的"。',
    ],
    examples: [
      { english: 'There are a lot of books on the shelf.', chinese: '书架上有很多书。' },
      { english: "She doesn't have much money.", chinese: '她没有很多钱。' },
      { english: 'How many apples are there on the table?', chinese: '桌上有多少个苹果？' },
      { english: 'He has a lot of friends at school.', chinese: '他在学校有很多朋友。' },
    ],
    exercises: [
      {
        question: '选择正确的选项：There is ___ milk in the fridge.',
        options: ['many', 'a lot of', 'a lots of', 'lot of'],
        answer: 1,
        explanation:
          'milk（牛奶）是不可数名词，肯定句中用 a lot of 修饰。a lots of 和 lot of 都是错误的表达。',
      },
      {
        question: '选择正确的选项：How ___ books did you buy?',
        options: ['much', 'many', 'lot of', 'a lot of'],
        answer: 1,
        explanation:
          'books（书）是可数名词复数，应该用 how many 来提问数量。how much 用于不可数名词。',
      },
    ],
  },

  81: {
    title: 'have 的用法（吃、喝）',
    explanation:
      'have 除了表示"拥有"以外，还可以表示"吃、喝、进行"等含义。本课重点学习 have 表示"吃、喝"的常见用法和搭配。',
    rules: [
      'have 表示"吃、喝"的常见搭配：have breakfast（吃早餐）, have lunch（吃午餐）, have dinner（吃晚餐）, have a meal（吃饭）。',
      'have 还可以表示"喝"：have a cup of tea（喝杯茶）, have a glass of water（喝杯水）, have some coffee（喝点咖啡）。',
      'have 的其他常见搭配：have a bath（洗澡）, have a shower（淋浴）, have a walk（散步）, have a rest（休息）, have a look（看一看）。',
      'have 表示"吃、喝"时不能用 have got 替代。have got 只能表示"拥有"，不能表示"吃、喝"。',
      'have 表示"吃、喝"的过去式为 had，适用于所有人称。',
    ],
    examples: [
      {
        english: "I have breakfast at seven o'clock every morning.",
        chinese: '我每天早上七点吃早餐。',
      },
      { english: 'She had a cup of coffee after lunch.', chinese: '她午饭后喝了一杯咖啡。' },
      { english: "Let's have a rest.", chinese: '我们休息一下吧。' },
      {
        english: 'They had dinner at a restaurant last night.',
        chinese: '他们昨晚在一家餐厅吃了晚饭。',
      },
      { english: "He usually has lunch at twelve o'clock.", chinese: '他通常十二点吃午饭。' },
    ],
    exercises: [
      {
        question: '选择正确的搭配：They ___ dinner at a restaurant last night.',
        options: ['have got', 'had', 'have', 'has got'],
        answer: 1,
        explanation:
          'have dinner 表示"吃晚饭"，last night 表示过去的时间，应使用过去式 had。have got 不能表示"吃"。',
      },
      {
        question: '下列哪个表达是正确的？',
        options: [
          'I have got breakfast at seven.',
          'I have breakfast at seven.',
          'I has breakfast at seven.',
          'I having breakfast at seven.',
        ],
        answer: 1,
        explanation:
          'have breakfast 表示"吃早餐"，have got 只能表示"拥有"，不能表示"吃"。主语 I 后面用 have。',
      },
      {
        question: '"have a walk" 是什么意思？',
        options: ['走一次', '散步', '步行去', '走路'],
        answer: 1,
        explanation:
          'have a walk 是一个固定搭配，意思是"散步"。类似的搭配还有 have a rest（休息）、have a look（看一看）。',
      },
    ],
    tips: [
      'have 表示"吃、喝"时，不能与 have got 互换使用。I have breakfast 正确，I have got breakfast 错误。',
      'have 表示"吃、喝"时可以有进行时和祈使句形式：I\'m having lunch.（我正在吃午饭。）Let\'s have a drink.（我们喝一杯吧。）',
      '注意第三人称单数用 has：He has lunch at noon.（他中午吃午饭。）',
    ],
  },

  82: {
    title: '复习 have 的过去式 had',
    explanation:
      '本课复习 have/had 的各种用法，重点练习 had 作为 have 的过去式在一般过去时中的运用。',
    rules: [
      'had 是 have 的过去式，适用于所有人称（I/you/he/she/it/we/they），在一般过去时中表示过去"拥有、吃、喝"等含义。',
      "一般过去时的否定句：didn't have（没有）; 疑问句：Did + 主语 + have + 其他？",
      'had 可以与名词搭配表示"吃、喝"：had breakfast/lunch/dinner（吃了早/午/晚餐）, had a cup of tea（喝了杯茶）。',
      'had 也可以表示过去的经历或状态：We had a good time.（我们玩得很开心。）She had a cold.（她感冒了。）',
    ],
    examples: [
      {
        english: 'I had bread and milk for breakfast yesterday.',
        chinese: '我昨天早餐吃了面包和牛奶。',
      },
      { english: "She didn't have a car last year.", chinese: '她去年没有车。' },
      { english: 'Did you have a good time at the party?', chinese: '你在聚会上玩得开心吗？' },
      {
        english: 'They had lunch at a restaurant last Sunday.',
        chinese: '他们上周日在一家餐厅吃了午饭。',
      },
    ],
    exercises: [
      {
        question: '选择正确的选项：We ___ a wonderful time at the party yesterday.',
        options: ['have', 'had', 'has', 'having'],
        answer: 1,
        explanation:
          'yesterday 表明是过去的时间，应使用过去式 had。have a wonderful time 表示"玩得很开心"。',
      },
      {
        question: '选择正确的否定句：',
        options: [
          "She didn't had any money last month.",
          "She didn't have any money last month.",
          "She hadn't any money last month.",
          "She doesn't have any money last month.",
        ],
        answer: 1,
        explanation: "一般过去时的否定句结构为 didn't + 动词原形，have 为原形，因此选 B。",
      },
    ],
  },

  83: {
    title: '现在完成时',
    explanation:
      '现在完成时是英语中非常重要的时态，表示过去发生的动作对现在产生的影响或结果，或者表示从过去开始一直延续到现在的动作或状态。',
    rules: [
      '现在完成时的构成为：have/has + 过去分词。I/You/We/They 用 have，He/She/It 用 has。',
      '现在完成时用于表示过去发生的动作对现在造成的影响或结果，强调"现在"的状况。',
      '现在完成时常与以下副词连用：already（已经）, yet（还，尚未）, just（刚刚）, ever（曾经）, never（从不）, before（以前）, recently（最近）。',
      "否定句：haven't/hasn't + 过去分词；疑问句：Have/Has + 主语 + 过去分词 + 其他？",
      '注意区分：already 常用于肯定句，yet 常用于否定句和疑问句，just 表示"刚刚"。',
    ],
    examples: [
      { english: 'I have already finished my homework.', chinese: '我已经完成了作业。' },
      { english: 'She has been to Paris twice.', chinese: '她去过巴黎两次。' },
      { english: 'Have you ever eaten Chinese food?', chinese: '你曾经吃过中国菜吗？' },
      { english: "They haven't arrived yet.", chinese: '他们还没有到。' },
      { english: 'He has just left the office.', chinese: '他刚刚离开了办公室。' },
    ],
    exercises: [
      {
        question: '选择正确的选项：I have ___ seen this film.',
        options: ['already', 'yet', 'ago', 'last'],
        answer: 0,
        explanation:
          'already（已经）用于现在完成时的肯定句中，表示动作已经完成。yet 常用于否定句和疑问句。',
      },
      {
        question: '选择正确的句子：',
        options: [
          'She has went to the shop.',
          'She has gone to the shop.',
          'She has go to the shop.',
          'She have gone to the shop.',
        ],
        answer: 1,
        explanation:
          '现在完成时的构成为 has + 过去分词。go 的过去分词为 gone，主语 she 用 has，因此选 B。',
      },
      {
        question: '选择正确的选项：Have you ___ been to London?',
        options: ['already', 'yet', 'ever', 'just'],
        answer: 2,
        explanation: 'ever（曾经）常用于现在完成时的疑问句中，表示"曾经做过某事吗"，因此选 C。',
      },
    ],
    tips: [
      '现在完成时不能与具体的过去时间状语（如 yesterday, last week, in 2020）连用，因为现在完成时强调的是与"现在"的关系。',
      'have/has been to 表示"去过某地（已经回来了）"，have/has gone to 表示"去了某地（还没回来）"。',
      'just 通常放在 have/has 和过去分词之间：I have just finished.（我刚完成。）',
    ],
  },

  84: {
    title: '复习现在完成时',
    explanation:
      '本课复习现在完成时的基本构成和用法，巩固 already、yet、just、ever、never 等副词在现在完成时中的运用。',
    rules: [
      '现在完成时的构成为：have/has + 过去分词，表示过去发生的动作对现在的影响，或从过去延续到现在的状态。',
      "already 常用于肯定句（I have already done it.）；yet 常用于否定句和疑问句（I haven't done it yet. / Have you done it yet?）。",
      'just 表示"刚刚"，放在 have/has 和过去分词之间：She has just arrived.（她刚到。）',
      'ever 和 never 用于询问或描述经历：Have you ever been to Japan?（你去过日本吗？）I have never been there.（我从没去过那里。）',
    ],
    examples: [
      { english: 'I have already read this book.', chinese: '我已经读过这本书了。' },
      { english: 'Has she finished her work yet?', chinese: '她完成工作了吗？' },
      { english: 'They have just arrived at the airport.', chinese: '他们刚到机场。' },
      {
        english: 'I have never seen such a beautiful place.',
        chinese: '我从来没见过这么美丽的地方。',
      },
    ],
    exercises: [
      {
        question: '选择正确的句子：',
        options: [
          'I have already finish my homework.',
          'I have already finished my homework.',
          'I has already finished my homework.',
          'I already have finish my homework.',
        ],
        answer: 1,
        explanation:
          '现在完成时的构成为 have + 过去分词。主语 I 用 have，finish 的过去分词为 finished，因此选 B。',
      },
      {
        question: "选择正确的选项：She hasn't written the letter ___.",
        options: ['already', 'yet', 'ever', 'just'],
        answer: 1,
        explanation: 'yet 常用于现在完成时的否定句和疑问句末尾，表示"还没有"，因此选 B。',
      },
    ],
  },

  85: {
    title: '现在完成时与一般过去时的对比',
    explanation:
      '现在完成时和一般过去时都可以表示过去发生的动作，但侧重点不同。本课重点学习这两种时态的区别和各自的适用场景。',
    rules: [
      '现在完成时强调过去发生的动作对现在造成的影响或结果，侧重于"现在"；一般过去时强调动作在过去发生的事实，侧重于"过去"。',
      '现在完成时不能与具体的过去时间状语（如 yesterday, last week, in 2020, ago）连用；一般过去时常与过去时间状语连用。',
      '现在完成时常与 already, yet, just, ever, never, before, recently, so far, up to now 等词连用。',
      '表示过去的经历或经验时用现在完成时（I have been to London.）；描述过去某个具体时间发生的事件时用一般过去时（I went to London in 2019.）。',
      '当句中有 for + 时间段或 since + 时间点时，通常用现在完成时表示动作延续到现在。',
    ],
    examples: [
      {
        english: 'I have lost my key. (我现在找不到钥匙了)',
        chinese: '我把钥匙弄丢了。（强调现在没有钥匙）',
      },
      {
        english: 'I lost my key yesterday. (昨天丢了)',
        chinese: '我昨天把钥匙弄丢了。（强调过去的事件）',
      },
      { english: 'Have you ever eaten Chinese food?', chinese: '你曾经吃过中国菜吗？（问经历）' },
      {
        english: 'He went home late last night.',
        chinese: '他昨晚很晚才回家。（描述过去的具体事件）',
      },
      {
        english: 'She has lived here since 2010.',
        chinese: '她从2010年起就住在这里。（从过去延续到现在）',
      },
    ],
    exercises: [
      {
        question: "选择正确的选项：I ___ this book. It's very interesting.",
        options: ['read', 'have read', 'reading', 'reads'],
        answer: 1,
        explanation:
          '此处强调读过的经历和对现在的影响（觉得有趣），没有具体的过去时间，应用现在完成时 have read。',
      },
      {
        question: '选择正确的选项：He ___ to Beijing in 2019.',
        options: ['has gone', 'has been', 'went', 'goes'],
        answer: 2,
        explanation:
          'in 2019 是具体的过去时间状语，应使用一般过去时。went 是 go 的过去式，因此选 C。',
      },
      {
        question: '选择正确的句子：',
        options: [
          'I have seen that film last night.',
          'I saw that film last night.',
          'I have saw that film last night.',
          'I seen that film last night.',
        ],
        answer: 1,
        explanation:
          'last night 是具体的过去时间状语，应使用一般过去时。saw 是 see 的过去式，因此选 B。',
      },
    ],
    tips: [
      '判断用现在完成时还是一般过去时的关键：看句中是否有具体的过去时间状语。有则用一般过去时，没有且强调对现在的影响则用现在完成时。',
      '现在完成时回答"是否做过"（Have you done it?），一般过去时回答"什么时候做的"（When did you do it?）。',
      '在对话中，通常先用现在完成时引出话题，再用一般过去时询问具体细节。',
    ],
  },

  86: {
    title: '复习现在完成时',
    explanation: '本课综合复习现在完成时的构成、用法以及与一般过去时的区别，通过练习巩固所学知识。',
    rules: [
      '现在完成时的构成为 have/has + 过去分词，表示过去发生的动作对现在的影响或从过去延续到现在的状态。',
      '现在完成时不能与具体的过去时间状语（yesterday, last week, in 2020, ago 等）连用。',
      '常与 now, already, yet, just, ever, never, before, recently, for, since 等词搭配使用。',
      'have/has been to 表示"去过某地（已回来）"；have/has gone to 表示"去了某地（未回来）"。',
    ],
    examples: [
      { english: 'They have been married for twenty years.', chinese: '他们结婚已经二十年了。' },
      { english: 'He has been ill since Monday.', chinese: '他从周一开始就生病了。' },
      { english: 'Have you ever been to London?', chinese: '你曾经去过伦敦吗？' },
      { english: "She hasn't called me yet.", chinese: '她还没有给我打电话。' },
    ],
    exercises: [
      {
        question: '选择正确的选项：I ___ my homework already.',
        options: ['finish', 'finished', 'have finished', 'finishing'],
        answer: 2,
        explanation:
          'already 是现在完成时的标志词，应使用 have + 过去分词 的结构，因此选 C（have finished）。',
      },
      {
        question: '选择正确的选项：She has lived in this city ___ she was born.',
        options: ['for', 'since', 'in', 'at'],
        answer: 1,
        explanation:
          'since 后面接时间点（she was born 表示出生那个时间点），表示"自从……以来"，因此选 B。',
      },
    ],
  },

  87: {
    title: '现在完成时，for 和 since',
    explanation:
      'for 和 since 都可以与现在完成时连用，表示从过去某个时间开始一直延续到现在的动作或状态，但两者的用法有所不同。',
    rules: [
      'for + 时间段，表示动作持续了多长时间：for three years（三年了）, for two hours（两个小时了）, for a long time（很长时间了）。',
      'since + 时间点（或过去时的从句），表示动作从某个时间开始一直持续到现在：since 2010（自从2010年）, since Monday（自从周一）, since I was a child（自从我小时候）。',
      'for 和 since 在现在完成时中通常与延续性动词搭配使用，如：live（住）, work（工作）, study（学习）, know（认识）, wait（等待）。',
      'for 和 since 不能与短暂性动词（如 die, arrive, leave, join, buy）直接连用表示延续，需要将短暂性动词转换为延续性表达。',
    ],
    examples: [
      { english: 'I have lived here for ten years.', chinese: '我住在这里已经十年了。' },
      {
        english: 'She has worked in this company since 2015.',
        chinese: '她从2015年起就在这家公司工作了。',
      },
      {
        english: 'We have known each other since we were children.',
        chinese: '我们从小就认识了。',
      },
      { english: 'They have waited for two hours.', chinese: '他们已经等了两个小时了。' },
      { english: 'He has studied English for five years.', chinese: '他学英语已经五年了。' },
    ],
    exercises: [
      {
        question: '选择正确的选项：We have been friends ___ we were children.',
        options: ['for', 'since', 'in', 'from'],
        answer: 1,
        explanation:
          'we were children 是一个时间点（从句），since 后面接时间点或过去时从句，表示"自从……以来"。',
      },
      {
        question: '选择正确的选项：She has studied English ___ five years.',
        options: ['since', 'for', 'in', 'from'],
        answer: 1,
        explanation: 'five years 是一个时间段，for 后面接时间段，表示"持续了……时间"。',
      },
      {
        question: '选择正确的句子：',
        options: [
          'He has bought this car for two years.',
          'He has had this car for two years.',
          'He has bought this car since two years.',
          'He bought this car for two years.',
        ],
        answer: 1,
        explanation:
          'buy 是短暂性动词，不能与 for 连用表示延续。应改为延续性动词 have（拥有），过去分词为 had。',
      },
    ],
    tips: [
      '记忆口诀：for 接时间段（多久），since 接时间点（从何时起）。',
      '常见的延续性动词有：live, work, study, know, wait, stay, teach, learn, keep 等。',
      'since 后面可以接具体的时间点（如 since Monday），也可以接 since + 从句（如 since I came here）。',
    ],
  },

  88: {
    title: '复习现在完成时',
    explanation:
      '本课复习现在完成时的各种用法，包括与 for 和 since 的搭配使用，以及与一般过去时的综合对比。',
    rules: [
      '现在完成时的构成为 have/has + 过去分词，表示过去动作对现在的影响或从过去延续到现在的动作。',
      'for + 时间段（如 for three years），since + 时间点或从句（如 since 2010 / since I was young），两者都与现在完成时连用。',
      '现在完成时不能与具体的过去时间状语（yesterday, last week, ago 等）连用；一般过去时常与这些时间状语连用。',
      '延续性动词可以与 for/since 连用表示持续；短暂性动词不能直接与 for/since 连用，需转换为延续性表达。',
    ],
    examples: [
      { english: 'They have been married for twenty years.', chinese: '他们结婚已经二十年了。' },
      { english: 'He has been ill since Monday.', chinese: '他从周一开始就生病了。' },
      { english: 'I went to the park yesterday.', chinese: '我昨天去了公园。（一般过去时）' },
      {
        english: 'She has taught English since 2010.',
        chinese: '她从2010年起就教英语了。（现在完成时）',
      },
    ],
    exercises: [
      {
        question: '选择正确的选项：I have known him ___ ten years.',
        options: ['for', 'since', 'in', 'ago'],
        answer: 0,
        explanation: 'ten years 是时间段，应与 for 连用，表示"持续了十年"。since 后面应接时间点。',
      },
      {
        question: '选择正确的句子：',
        options: [
          'She has left here for three years.',
          'She left here three years ago.',
          'She has leaved here for three years.',
          'She has left here since three years.',
        ],
        answer: 1,
        explanation:
          'leave 是短暂性动词，不能与 for + 时间段连用表示延续。应使用一般过去时 + ago 来表达"三年前离开了"。',
      },
    ],
  },

  89: {
    title: '现在完成时，for 和 since 的用法',
    explanation:
      '本课深入学习 for 和 since 在现在完成时中的用法，重点学习短暂性动词如何转换为延续性表达，以便与 for 和 since 正确搭配。',
    rules: [
      '短暂性动词不能直接与 for/since 连用，需要转换为延续性状态：die → be dead（去世）, arrive → be here/there（到达）, leave → be away（离开）。',
      '常见的短暂性动词转换：join → be a member / be in（加入）, come → be here（来到）, go → be there / be away（去了）, buy → have（买了）, borrow → keep（借了）。',
      'begin/start → be on（开始）, finish/end → be over（结束）, close → be closed（关了）, open → be open（开着）。',
      '延续性动词可以直接与 for/since 连用：live（住）, work（工作）, study（学习）, wait（等待）, teach（教）, learn（学）, sleep（睡觉）。',
      "在否定句中，某些短暂性动词可以与 for 连用，表示某事在一段时间内没有发生：I haven't heard from him for a week.（我已经一周没收到他的消息了。）",
    ],
    examples: [
      { english: 'His grandpa has been dead for ten years.', chinese: '他的爷爷去世已经十年了。' },
      {
        english: 'She has been away from Beijing for three years.',
        chinese: '她离开北京已经三年了。',
      },
      {
        english: 'I have been in this club for two years.',
        chinese: '我加入这个俱乐部已经两年了。',
      },
      { english: 'The film has been on for twenty minutes.', chinese: '电影已经放映二十分钟了。' },
      { english: 'He has kept this book for a week.', chinese: '这本书他已经借了一个星期了。' },
    ],
    exercises: [
      {
        question: '选择正确的句子：',
        options: [
          'Her grandma has died for five years.',
          'Her grandma has been dead for five years.',
          'Her grandma died for five years.',
          'Her grandma has been died for five years.',
        ],
        answer: 1,
        explanation:
          'die 是短暂性动词，不能与 for 连用。应转换为延续性表达 be dead。has been dead 表示"去世的状态持续了……"。',
      },
      {
        question: '选择正确的选项：He ___ his hometown for ten years.',
        options: ['has left', 'left', 'has been away from', 'has been left'],
        answer: 2,
        explanation:
          'leave 是短暂性动词，不能与 for + 时间段连用。应转换为延续性表达 be away from，因此选 C。',
      },
      {
        question: '选择正确的句子：',
        options: [
          'The meeting has begun for half an hour.',
          'The meeting began half an hour ago.',
          'The meeting has been on for half an hour.',
          'The meeting has begin for half an hour.',
        ],
        answer: 2,
        explanation:
          'begin 是短暂性动词，不能与 for 连用。应转换为延续性表达 be on。A 错在 begin 不能与 for 连用；B 虽然语法正确但用的是过去时，不是本题要求的现在完成时。',
      },
    ],
    tips: [
      '短暂性动词转延续性的核心思路：用表示"状态"的词代替表示"动作"的词。如 die（死）→ be dead（处于死亡状态）。',
      '记忆常见转换对：die → be dead, arrive → be here/there, leave → be away, join → be a member, buy → have, borrow → keep, begin → be on, finish → be over。',
      "注意：短暂性动词在否定句中有时可以与 for 连用，表示某事在一段时间内没有发生。如：I haven't seen him for a month.（我已经一个月没见到他了。）",
    ],
  },

  // ==================== 第90-109课 ====================

  90: {
    title: '复习 for 和 since',
    explanation:
      'for 和 since 都用于现在完成时中，表示动作或状态从过去某时开始一直持续到现在。for 后接一段时间，since 后接一个时间点。',
    rules: [
      'for + 一段时间：表示动作持续了多长时间，如 for two years, for three days, for a long time。',
      'since + 时间点：表示动作从某个具体时间点开始，如 since 2019, since Monday, since last month。',
      'since 还可以接一个过去时的从句，如 since he left school, since I came to Beijing。',
      'for 和 since 都与现在完成时连用，谓语动词必须是延续性动词，不能是短暂性动词（如 buy, die, join 等需转换）。',
    ],
    examples: [
      { english: 'I have lived here for ten years.', chinese: '我住在这里已经十年了。' },
      { english: 'She has been a teacher since 2015.', chinese: '她从2015年起就当老师了。' },
      { english: 'They have been married for three years.', chinese: '他们结婚已经三年了。' },
      { english: 'He has been away since last Monday.', chinese: '他从上周一起就离开了。' },
    ],
    exercises: [
      {
        question: 'She has worked in this company ______ five years.',
        options: ['since', 'for', 'in', 'at'],
        answer: 1,
        explanation: 'five years 是一段时间，所以用 for。for + 一段时间表示动作持续了多久。',
      },
      {
        question: 'I have known him ______ we were children.',
        options: ['for', 'since', 'from', 'after'],
        answer: 1,
        explanation: 'we were children 是一个过去时的从句，表示一个时间点，所以用 since。',
      },
    ],
  },

  91: {
    title: '一般将来时 will',
    explanation:
      '一般将来时表示将来某一时刻会发生的事情或将要采取的行动。will 是表示一般将来时最常用的助动词，适用于所有人称。',
    rules: [
      '一般将来时的基本结构：主语 + will + 动词原形。will 适用于所有人称（I, you, he, she, it, we, they）。',
      "否定形式：主语 + will not (won't) + 动词原形。will not 缩写为 won't。",
      "一般疑问句：Will + 主语 + 动词原形？肯定回答：Yes, 主语 + will. 否定回答：No, 主语 + won't.",
      "will 常用于表示临时决定、意愿、预测、承诺等。例如：I'll help you.（我来帮你。）表示临时决定。",
      'will 常与表示将来的时间状语连用，如 tomorrow, next week, in the future, soon 等。',
    ],
    examples: [
      { english: 'I will go to the park tomorrow.', chinese: '我明天要去公园。' },
      { english: "She won't come to the party tonight.", chinese: '她今晚不会来参加聚会。' },
      { english: 'Will you help me with my homework?', chinese: '你能帮我做作业吗？' },
      { english: 'It will rain this afternoon.', chinese: '今天下午会下雨。' },
      { english: "They will arrive at eight o'clock.", chinese: '他们将在八点钟到达。' },
    ],
    exercises: [
      {
        question: 'I ______ you with your English tomorrow.',
        options: ['help', 'helped', 'will help', 'helps'],
        answer: 2,
        explanation: 'tomorrow 表示将来时间，应使用一般将来时 will help。',
      },
      {
        question: '— Will she come to the meeting? — No, she ______.',
        options: ['will', "won't", "doesn't", "isn't"],
        answer: 1,
        explanation: "对 Will 引导的一般疑问句的否定回答是 No, 主语 + won't。",
      },
      {
        question: 'He ______ 20 years old next month.',
        options: ['is', 'was', 'will be', 'has been'],
        answer: 2,
        explanation: 'next month 是将来时间，用 will be 表示将来的状态。',
      },
    ],
    tips: [
      "will 可以缩写为 'll，如 I'll = I will, he'll = he will, they'll = they will。",
      "will 表示临时决定，而 be going to 表示事先计划好的打算。比较：I'll answer the phone.（临时决定）vs. I'm going to visit my grandma.（事先计划）",
      '在条件状语从句（if 引导）和时间状语从句（when, before, after 引导）中，从句用一般现在时表示将来，主句用 will。如：If it rains, I will stay at home.',
    ],
  },

  92: {
    title: '复习一般将来时 will',
    explanation:
      '复习一般将来时 will 的各种句型，包括肯定句、否定句、一般疑问句和特殊疑问句的用法。',
    rules: [
      '肯定句：主语 + will + 动词原形。如 He will come tomorrow.',
      "否定句：主语 + will not (won't) + 动词原形。如 She won't go there.",
      '一般疑问句：Will + 主语 + 动词原形？特殊疑问句：疑问词 + will + 主语 + 动词原形？',
      'will 表示意愿时可用于各种人称，表示"愿意"；Shall I/we...? 用于征求对方意见。',
    ],
    examples: [
      { english: 'What will you do next Sunday?', chinese: '下个星期天你要做什么？' },
      { english: "I will not (won't) be late again.", chinese: '我不会再迟到了。' },
      { english: 'When will the train arrive?', chinese: '火车什么时候到？' },
      { english: 'Shall we go for a walk?', chinese: '我们去散步好吗？' },
    ],
    exercises: [
      {
        question: 'What ______ you ______ this evening?',
        options: ['will; do', 'do; do', 'are; doing', 'did; do'],
        answer: 0,
        explanation:
          'this evening 表示将来时间，特殊疑问句结构为：疑问词 + will + 主语 + 动词原形。',
      },
      {
        question: 'There ______ a football match tomorrow.',
        options: ['is', 'was', 'will be', 'has been'],
        answer: 2,
        explanation: 'tomorrow 是将来时间，there be 句型的一般将来时为 there will be。',
      },
    ],
  },

  93: {
    title: '一般将来时，时间表达',
    explanation: '学习一般将来时与各种将来时间状语的搭配使用，掌握英语中多种表达将来时间的方式。',
    rules: [
      '常用的将来时间状语：tomorrow（明天）, the day after tomorrow（后天）, next week/month/year（下周/月/年）, in + 时间段（在……之后）。',
      'this + 时间词也可表示将来：this afternoon（今天下午）, this evening（今天晚上）, this Sunday（这个星期天）。',
      'in + 时间段表示"在……之后"：in two days（两天后）, in a week（一周后）, in three hours（三小时后）。',
      '时间表达中，past 表示"过"，to 表示"差"：a quarter past seven（七点一刻）, half past eight（八点半）, a quarter to nine（差一刻九点）。',
      '一般将来时常与 by（到……为止）连用：by tomorrow（到明天为止）, by next year（到明年为止）, by the end of this month（到本月底为止）。',
    ],
    examples: [
      { english: 'I will see you the day after tomorrow.', chinese: '我后天见你。' },
      { english: 'She will leave in two days.', chinese: '她两天后出发。' },
      { english: 'The meeting will begin at half past nine.', chinese: '会议将在九点半开始。' },
      {
        english: 'We will finish the work by next Friday.',
        chinese: '我们将在下周五之前完成这项工作。',
      },
      {
        english: 'It will be a quarter to five when we arrive.',
        chinese: '我们到的时候将是差一刻五点。',
      },
    ],
    exercises: [
      {
        question: 'My father will come back ______ two days.',
        options: ['after', 'in', 'for', 'at'],
        answer: 1,
        explanation:
          'in + 时间段表示"在……之后"，in two days 意为"两天后"。after 后面通常接具体时间点或事件。',
      },
      {
        question: 'The film will start at ______. (8:45)',
        options: [
          'a quarter past eight',
          'a quarter to nine',
          'half past eight',
          'a quarter past nine',
        ],
        answer: 1,
        explanation:
          '8:45 即差一刻九点，表达为 a quarter to nine。to 表示"差"，a quarter 表示"一刻钟（15分钟）"。',
      },
      {
        question: 'We must finish the project ______ next Monday.',
        options: ['in', 'on', 'by', 'at'],
        answer: 2,
        explanation: 'by + 时间点表示"到……为止/在……之前"，by next Monday 意为在下周一之前。',
      },
    ],
    tips: [
      '注意区分 in 和 after：in two days 表示从现在起两天后；after two days 通常用于叙述过去的事情。',
      "英语中的时间表达有两种方式：整点用 o'clock（如 seven o'clock），分钟用 past（过）和 to（差）。30分钟用 half，15分钟用 a quarter。",
      'next 前面不加介词，如直接说 next Monday, next week, 不说 on next Monday 或 in next week。',
    ],
  },

  94: {
    title: '复习一般过去时和一般将来时',
    explanation: '对比复习一般过去时和一般将来时的结构、用法和时间状语，帮助区分这两种时态。',
    rules: [
      '一般过去时表示过去发生的动作或状态，结构为：主语 + 动词过去式。常用时间状语：yesterday, last week, ago, in 2020。',
      '一般将来时表示将要发生的动作或状态，结构为：主语 + will + 动词原形。常用时间状语：tomorrow, next week, in two days。',
      "一般过去时的否定和疑问需要助动词 did，而一般将来时的否定和疑问直接用 will/won't。",
      '判断用过去时还是将来时，关键看句中的时间状语：过去的时间用过去时，将来的时间用将来时。',
    ],
    examples: [
      { english: 'I went to London last year.', chinese: '我去年去了伦敦。' },
      { english: 'I will go to London next year.', chinese: '我明年要去伦敦。' },
      { english: "She didn't see the film yesterday.", chinese: '她昨天没看那部电影。' },
      { english: "She won't see the film tomorrow.", chinese: '她明天不会看那部电影。' },
    ],
    exercises: [
      {
        question: 'He ______ to school by bus yesterday, but he ______ by bike tomorrow.',
        options: ['went; will go', 'goes; will go', 'went; goes', 'will go; went'],
        answer: 0,
        explanation: 'yesterday 用一般过去时 went，tomorrow 用一般将来时 will go。',
      },
      {
        question: '______ you ______ the Great Wall last summer?',
        options: ['Will; visit', 'Did; visit', 'Do; visit', 'Are; visiting'],
        answer: 1,
        explanation: 'last summer 是过去的时间，一般疑问句用 Did + 主语 + 动词原形。',
      },
    ],
  },

  95: {
    title: '时间表达，过去时',
    explanation:
      '学习如何用英语准确表达具体的时间点（钟表时间），并结合一般过去时描述过去发生的事情及其发生时间。',
    rules: [
      "整点表达：数字 + o'clock，如 seven o'clock（七点）。也可以直接说数字，如 at seven（在七点）。",
      '分钟表达：分钟数 + past + 小时（不超过30分钟），如 ten past six（六点十分）；分钟数 + to + 下一小时（超过30分钟），如 forty to seven（差四十分钟七点 = 六点二十）。',
      '特殊分钟表达：15分钟用 a quarter，30分钟用 half。a quarter past nine（九点一刻），half past ten（十点半），a quarter to eleven（差一刻十一点）。',
      '一般过去时的时间状语可精确到时间：at half past seven yesterday morning（昨天早晨七点半）。',
      "询问时间的句型：What time is it? / What's the time? 回答：It's + 时间。过去时中：What time was it? It was + 时间。",
    ],
    examples: [
      { english: "What time is it? — It's a quarter past three.", chinese: '几点了？——三点一刻。' },
      {
        english: 'The train left at half past eight yesterday morning.',
        chinese: '火车昨天早晨八点半开走了。',
      },
      {
        english: 'What time was it when he arrived? — It was twenty to six.',
        chinese: '他到的时候是几点？——差二十分钟六点。',
      },
      { english: 'I got up at a quarter to seven yesterday.', chinese: '我昨天差一刻七点起床的。' },
      {
        english: 'She called me at ten past nine last night.',
        chinese: '她昨晚九点十分给我打了电话。',
      },
    ],
    exercises: [
      {
        question: 'The meeting began at ______. (10:30)',
        options: ['half past ten', 'half to ten', 'thirty past ten', 'a half past ten'],
        answer: 0,
        explanation: '10:30 的正确表达是 half past ten。half 前不加 a，不用 to。',
      },
      {
        question: 'What time ______ it when you got home yesterday?',
        options: ['is', 'was', 'were', 'did'],
        answer: 1,
        explanation:
          'yesterday 是过去时间，主语是 it，所以用 was。What time was it...? 询问过去某个时刻的时间。',
      },
      {
        question: 'He left the office at ______. (5:45)',
        options: [
          'a quarter past five',
          'forty-five past five',
          'a quarter to six',
          'three quarters past five',
        ],
        answer: 2,
        explanation: '5:45 即差一刻六点，表达为 a quarter to six。超过30分钟用 to 加下一个小时。',
      },
    ],
    tips: [
      '英语中不说 thirty past 或 forty-five past，30分钟用 half past，45分钟用 a quarter to + 下一小时。',
      "介词 at 用于具体时间点前：at seven o'clock, at half past three, at noon。",
      'past 和 to 的使用规则：1-30分钟用 past（过），31-59分钟用 to（差），正好30分钟用 half past。',
    ],
  },

  96: {
    title: '复习时间表达',
    explanation: '复习英语中各种时间表达方式，包括钟表时间、日期和时间段的表达方法。',
    rules: [
      '钟表时间：用 past（过）和 to（差）表示分钟，a quarter（一刻钟）和 half（半小时）为特殊表达。',
      '日期表达：月份 + 日期 + 年份，如 on March 15th, 2023。介词用 on，具体钟点用 at。',
      '时间段表达：for + 时间段（for two hours），in + 时间段表示将来（in three days），ago 表示过去（two days ago）。',
      "询问时间：What time is it? / What's the time? 回答用 It's + 时间。",
    ],
    examples: [
      { english: "It's twenty past eleven.", chinese: '现在是十一点二十分。' },
      { english: 'My birthday is on June 1st.', chinese: '我的生日是六月一日。' },
      { english: 'She left three hours ago.', chinese: '她三个小时前离开了。' },
      { english: 'We will start the meeting in ten minutes.', chinese: '我们十分钟后开始开会。' },
    ],
    exercises: [
      {
        question: 'The class begins at ______. (9:15)',
        options: ['a quarter to nine', 'a quarter past nine', 'fifteen to ten', 'a half past nine'],
        answer: 1,
        explanation: '9:15 是九点一刻，表达为 a quarter past nine。15分钟不超过半小时，用 past。',
      },
      {
        question: 'They have been here ______ two hours.',
        options: ['in', 'for', 'since', 'ago'],
        answer: 1,
        explanation: 'two hours 是时间段，与现在完成时连用表示持续的时间，用 for。',
      },
    ],
  },

  97: {
    title: '形容词的顺序',
    explanation:
      '当多个形容词同时修饰一个名词时，它们需要按照一定的顺序排列。英语中形容词的排列有约定俗成的顺序规则。',
    rules: [
      '多个形容词修饰同一名词时，一般按照以下顺序排列：限定词 → 观点/评价 → 大小 → 形状 → 年龄/新旧 → 颜色 → 产地/来源 → 材料 → 用途。',
      '记忆口诀：限观形龄色国材（限定词、观点、形状/大小、年龄、颜色、国籍/产地、材料）。',
      '观点/评价类形容词如 beautiful, lovely, nice, ugly, expensive 排在最前面（限定词之后）。',
      '事实类形容词如大小（big, small）、颜色（red, blue）、材料（wooden, silk）等按上述顺序排列在观点形容词之后。',
      '通常不会超过三个形容词同时修饰一个名词，过多会显得冗长不自然。',
    ],
    examples: [
      {
        english: 'She bought a beautiful long red silk dress.',
        chinese: '她买了一件漂亮的红色丝绸长裙。',
      },
      { english: 'He lives in a small old wooden house.', chinese: '他住在一间又小又旧的木屋里。' },
      {
        english: 'I found a nice little Italian restaurant.',
        chinese: '我找到了一家很好的意大利小餐馆。',
      },
      { english: 'She has a lovely big brown dog.', chinese: '她有一只可爱的棕色大狗。' },
    ],
    exercises: [
      {
        question: 'She is wearing a ______ dress.',
        options: [
          'red beautiful silk',
          'beautiful red silk',
          'silk beautiful red',
          'red silk beautiful',
        ],
        answer: 1,
        explanation:
          '形容词排列顺序：观点（beautiful）→ 颜色（red）→ 材料（silk），所以是 beautiful red silk dress。',
      },
      {
        question: 'They bought a ______ table.',
        options: [
          'wooden round small',
          'small round wooden',
          'round wooden small',
          'wooden small round',
        ],
        answer: 1,
        explanation:
          '形容词排列顺序：大小（small）→ 形状（round）→ 材料（wooden），所以是 small round wooden table。',
      },
      {
        question: 'Which sentence has the correct adjective order?',
        options: [
          'He drives a new expensive German car.',
          'He drives an expensive new German car.',
          'He drives a German new expensive car.',
          'He drives an expensive German new car.',
        ],
        answer: 1,
        explanation:
          '正确顺序：观点/评价（expensive）→ 年龄/新旧（new）→ 产地（German），所以是 expensive new German car。',
      },
    ],
    tips: [
      '实际使用中，英语母语者凭语感排列形容词，但遵循上述顺序几乎不会出错。考试中常考2-3个形容词的顺序。',
      '同类形容词（如两个颜色或两个大小）之间用逗号或 and 连接：a black and white cat（一只黑白相间的猫）。',
      '形容词放在名词前做定语，但如果形容词有补语则放在名词后：a basket full of flowers（一个装满花的篮子）。',
    ],
  },

  98: {
    title: '复习物主代词',
    explanation: '复习形容词性物主代词和名词性物主代词的用法和区别。',
    rules: [
      '形容词性物主代词（my, your, his, her, its, our, their）放在名词前作定语：my book, her pen。',
      '名词性物主代词（mine, yours, his, hers, its, ours, theirs）独立使用，后面不跟名词：This book is mine.',
      '名词性物主代词 = 形容词性物主代词 + 名词，可以避免重复：My car is red. His is blue.（His = His car）',
      "注意 its（它的，形容词性）和 it's（它是）的区别，以及 whose 用于询问物主关系。",
    ],
    examples: [
      { english: 'This is my book. That one is yours.', chinese: '这是我的书。那本是你的。' },
      { english: 'Her dress is more beautiful than mine.', chinese: '她的裙子比我的更漂亮。' },
      { english: "Whose pen is this? — It's his.", chinese: '这是谁的钢笔？——是他的。' },
      { english: 'Our school is bigger than theirs.', chinese: '我们的学校比他们的大。' },
    ],
    exercises: [
      {
        question: "This isn't my coat. It must be ______.",
        options: ['your', 'yours', 'you', 'yourself'],
        answer: 1,
        explanation: '空格后没有名词，需要用名词性物主代词 yours（= your coat）。',
      },
      {
        question: '______ car is parked outside. Is it ______?',
        options: ['Their; our', 'Theirs; ours', 'Their; ours', 'They; our'],
        answer: 2,
        explanation:
          '第一个空后有名词 car，用形容词性物主代词 Their；第二个空后没有名词，用名词性物主代词 ours。',
      },
    ],
  },

  99: {
    title: '间接宾语和直接宾语',
    explanation:
      '有些动词可以接两个宾语：直接宾语（通常指物）和间接宾语（通常指人）。学习双宾语结构和两种不同的表达方式。',
    rules: [
      '双宾语结构一：主语 + 动词 + 间接宾语（人） + 直接宾语（物）。如 He gave me a book.（他给了我一本书。）',
      '双宾语结构二：主语 + 动词 + 直接宾语（物） + to/for + 间接宾语（人）。如 He gave a book to me.',
      '用 to 连接的动词（表示方向/传递）：give, send, tell, show, pass, lend, hand, teach, write, offer, return, bring, take。',
      '用 for 连接的动词（表示利益/代替）：buy, make, cook, get, choose, find, keep, save, sing, order, book, reserve。',
      '当直接宾语是代词时，通常用结构二（直接宾语 + to/for + 间接宾语）：Give it to me.（不能说 Give me it.）',
    ],
    examples: [
      { english: 'My father bought me a new bicycle.', chinese: '我爸爸给我买了一辆新自行车。' },
      { english: 'She sent a letter to her friend.', chinese: '她给朋友寄了一封信。' },
      { english: 'Please pass the salt to me.', chinese: '请把盐递给我。' },
      { english: 'He made a cake for his mother.', chinese: '他为他妈妈做了一个蛋糕。' },
      { english: 'Can you show me your new phone?', chinese: '你能给我看看你的新手机吗？' },
    ],
    exercises: [
      {
        question: 'She bought a gift ______ her daughter.',
        options: ['to', 'for', 'at', 'with'],
        answer: 1,
        explanation: 'buy 表示为某人的利益而做，间接宾语用 for 连接：buy sth. for sb.。',
      },
      {
        question: 'Which sentence is correct?',
        options: [
          'He gave to me a present.',
          'He gave a present for me.',
          'He gave me a present.',
          'He gave me to a present.',
        ],
        answer: 2,
        explanation:
          'give 可以用双宾语结构：give + 间接宾语（人） + 直接宾语（物），即 He gave me a present。也可以说 He gave a present to me。',
      },
      {
        question: 'Give ______ to your sister. (the book)',
        options: ['your sister it', 'it', 'to it', 'its'],
        answer: 1,
        explanation:
          '当直接宾语是代词时，只能用"动词 + 直接宾语 + to + 间接宾语"结构：Give it to your sister。不能说 Give your sister it。',
      },
    ],
    tips: [
      '记住 to 和 for 的区别：to 强调方向（把东西给谁），for 强调目的/利益（为某人做事）。',
      'tell 比较特殊，只能说 tell sb. sth. 或 tell sth. to sb.，不能说 tell sb. to sth.。',
      '在日常口语中，双宾语结构一（动词 + 人 + 物）更常用也更自然。',
    ],
  },

  100: {
    title: '复习间接引语',
    explanation: '复习间接引语（reported speech）的基本概念，学习如何将直接引语转换为间接引语。',
    rules: [
      '直接引语是用引号引用的原话，间接引语是转述别人的话，不用引号。',
      '陈述句的间接引语：主语 + said (that) + 从句。如 He said (that) he was tired.',
      '间接引语中时态通常需要后退一步：一般现在时 → 一般过去时，现在进行时 → 过去进行时，一般将来时 will → would。',
      '间接引语中人称和时间状语也需要相应变化：I → he/she, today → that day, yesterday → the day before, tomorrow → the next day。',
    ],
    examples: [
      {
        english: '"I am tired," she said. → She said that she was tired.',
        chinese: '"我累了，"她说。→ 她说她累了。',
      },
      {
        english: '"I will come tomorrow," he said. → He said that he would come the next day.',
        chinese: '"我明天来，"他说。→ 他说他第二天来。',
      },
      {
        english:
          '"She likes English," the teacher said. → The teacher said that she liked English.',
        chinese: '"她喜欢英语，"老师说。→ 老师说她喜欢英语。',
      },
    ],
    exercises: [
      {
        question: '"I am reading a book," Tom said. → Tom said that he ______ a book.',
        options: ['is reading', 'was reading', 'reads', 'read'],
        answer: 1,
        explanation:
          '直接引语中的现在进行时 am reading 变为间接引语时要后退为过去进行时 was reading。',
      },
      {
        question:
          '"I will go to Paris tomorrow," she said. → She said that she would go to Paris ______.',
        options: ['tomorrow', 'the next day', 'yesterday', 'today'],
        answer: 1,
        explanation: '直接引语中的 tomorrow 在间接引语中变为 the next day。',
      },
    ],
  },

  101: {
    title: '间接引语',
    explanation: '系统学习间接引语的各种形式，包括陈述句、疑问句和祈使句的间接引语转换。',
    rules: [
      '陈述句间接引语：主语 + said (that) + 从句（时态后退）。He said, "I am busy." → He said that he was busy.',
      '一般疑问句间接引语：主语 + asked + 宾语 + if/whether + 从句（陈述语序）。She asked, "Are you OK?" → She asked me if I was OK.',
      '特殊疑问句间接引语：主语 + asked + 宾语 + 疑问词 + 从句（陈述语序）。He asked, "Where do you live?" → He asked me where I lived.',
      '祈使句间接引语：主语 + told/asked + 宾语 + (not) to + 动词原形。She said, "Open the door." → She told me to open the door.',
      '间接引语中的时态变化规则：一般现在时 → 一般过去时；现在进行时 → 过去进行时；一般过去时 → 过去完成时；一般将来时 will → would；can → could；must → had to。',
    ],
    examples: [
      {
        english: '"Do you like coffee?" she asked me. → She asked me if I liked coffee.',
        chinese: '"你喜欢咖啡吗？"她问我。→ 她问我是否喜欢咖啡。',
      },
      {
        english: '"Where are you going?" he asked. → He asked me where I was going.',
        chinese: '"你要去哪里？"他问。→ 他问我要去哪里。',
      },
      {
        english: '"Don\'t be late," the teacher said. → The teacher told us not to be late.',
        chinese: '"不要迟到，"老师说。→ 老师告诉我们不要迟到。',
      },
      {
        english: '"I have finished my work," she said. → She said that she had finished her work.',
        chinese: '"我已经完成了工作，"她说。→ 她说她已经完成了工作。',
      },
      {
        english: '"Can you help me?" he asked. → He asked if I could help him.',
        chinese: '"你能帮我吗？"他问。→ 他问我是否能帮他。',
      },
    ],
    exercises: [
      {
        question: '"What time is it?" she asked me. → She asked me what time ______.',
        options: ['is it', 'it is', 'it was', 'was it'],
        answer: 2,
        explanation:
          '特殊疑问句变为间接引语时，从句要用陈述语序（主语 + 谓语），且时态后退：is → was。',
      },
      {
        question: '"Please sit down," the doctor said to me. → The doctor ______ me ______ down.',
        options: ['told; sit', 'asked; to sit', 'said; sitting', 'told; sat'],
        answer: 1,
        explanation:
          '祈使句的间接引语用 asked/told + 宾语 + to + 动词原形。Please 开头的请求常用 asked。',
      },
      {
        question:
          '"I can swim very well," the boy said. → The boy said that he ______ swim very well.',
        options: ['can', 'could', 'may', 'might'],
        answer: 1,
        explanation: '间接引语中 can 变为 could，时态后退。',
      },
    ],
    tips: [
      '间接引语中从句一律用陈述语序（主语 + 谓语），不能用疑问语序。如：He asked where I lived.（不能说 where did I live）',
      '如果直接引语表达的是客观真理或事实，间接引语中时态不变：The teacher said that the earth goes around the sun.',
      'said to sb. 在间接引语中常改为 told sb. 或 asked sb.，更加自然。',
    ],
  },

  102: {
    title: '复习间接引语',
    explanation: '复习间接引语中各类句型转换的要点，巩固时态、人称和时间状语的变化规则。',
    rules: [
      '间接引语转换三要素：①时态后退 ②人称变化 ③时间/地点状语变化（this → that, here → there, now → then）。',
      '疑问句间接引语必须用陈述语序：一般疑问句用 if/whether 引导，特殊疑问句保留疑问词。',
      '祈使句间接引语：told/asked + 宾语 + to do sth.（肯定）或 told/asked + 宾语 + not to do sth.（否定）。',
      'say 和 tell 的区别：say 后不直接跟人（said that...），tell 后必须跟人（told sb. that...）。',
    ],
    examples: [
      {
        english:
          '"I saw him yesterday," she said. → She said that she had seen him the day before.',
        chinese: '"我昨天看见他了，"她说。→ 她说她前一天看见他了。',
      },
      {
        english: '"Are you a student?" he asked. → He asked if I was a student.',
        chinese: '"你是学生吗？"他问。→ 他问我是不是学生。',
      },
      {
        english: '"Don\'t make noise!" she said. → She told us not to make noise.',
        chinese: '"不要吵！"她说。→ 她叫我们不要吵。',
      },
      {
        english: '"I must go now," he said. → He said that he had to go then.',
        chinese: '"我现在必须走了，"他说。→ 他说他那时必须走了。',
      },
    ],
    exercises: [
      {
        question: '"Do you speak English?" the man asked. → The man asked ______ I ______ English.',
        options: ['that; spoke', 'if; spoke', 'if; speak', 'that; speak'],
        answer: 1,
        explanation: '一般疑问句的间接引语用 if 引导，时态后退：speak → spoke。从句用陈述语序。',
      },
      {
        question: '"Be quiet, please," the teacher said to us. → The teacher told us ______ quiet.',
        options: ['be', 'to be', 'being', 'were'],
        answer: 1,
        explanation: '祈使句的间接引语用 told + 宾语 + to + 动词原形：told us to be quiet。',
      },
    ],
  },

  103: {
    title: '比较级和最高级，形容词的比较变化',
    explanation: '学习形容词比较级和最高级的构成规则和不规则变化，以及它们在句子中的用法。',
    rules: [
      '单音节和部分双音节形容词：比较级加 -er，最高级加 -est。如 tall → taller → tallest, old → older → oldest。',
      '以 e 结尾：去 e 加 -er/-est（large → larger → largest）；以辅音字母 + y 结尾：变 y 为 i 加 -er/-est（happy → happier → happiest）。',
      '重读闭音节且末尾只有一个辅音字母：双写辅音字母加 -er/-est。如 big → bigger → biggest, hot → hotter → hottest。',
      '多音节和部分双音节形容词：比较级前加 more，最高级前加 most。如 beautiful → more beautiful → most beautiful, important → more important → most important。',
      '不规则变化：good/well → better → best, bad/ill → worse → worst, many/much → more → most, little → less → least, far → farther/further → farthest/furthest。',
    ],
    examples: [
      { english: 'Tom is taller than his brother.', chinese: '汤姆比他弟弟高。' },
      {
        english: 'This is the most interesting book I have ever read.',
        chinese: '这是我读过的最有趣的书。',
      },
      { english: 'Her English is better than mine.', chinese: '她的英语比我的好。' },
      { english: 'Today is hotter than yesterday.', chinese: '今天比昨天热。' },
      {
        english: 'This question is more difficult than that one.',
        chinese: '这道题比那道题更难。',
      },
    ],
    exercises: [
      {
        question: 'The Yangtze River is ______ river in China.',
        options: ['long', 'longer', 'the longest', 'longest'],
        answer: 2,
        explanation: '表示"最……的"用最高级，且最高级前要加定冠词 the：the longest river。',
      },
      {
        question: 'This box is ______ than that one.',
        options: ['heavy', 'more heavy', 'heavier', 'heaviest'],
        answer: 2,
        explanation:
          'heavy 以辅音字母 + y 结尾，变 y 为 i 加 -er：heavier。比较级用于 than 的比较句中。',
      },
      {
        question: 'Of the three girls, she sings ______.',
        options: ['good', 'better', 'best', 'the best'],
        answer: 3,
        explanation:
          '三者或三者以上比较用最高级。good 的最高级是 (the) best。副词的最高级前 the 可加可不加。',
      },
    ],
    tips: [
      '比较级用于两者之间的比较，常与 than 连用；最高级用于三者或三者以上的比较，常与 in/of 连用。',
      '比较级前可以用 much, a lot, far, a little, a bit 等修饰表示程度：much better（好多了）, a little taller（高一点）。',
      '注意区分 -er 和 more 的使用范围：单音节词和少数双音节词用 -er，多音节词用 more。不要同时使用：不能说 more taller。',
    ],
  },

  104: {
    title: '复习 too, very, enough 的用法',
    explanation: '复习 too（太）、very（非常）和 enough（足够）这三个程度副词的用法和位置区别。',
    rules: [
      'very + 形容词/副词：表示"非常"，放在形容词或副词前面。如 very tall, very quickly, very good。',
      'too + 形容词/副词：表示"太……（含否定意味，超出限度）"，放在形容词或副词前面。如 too hot, too expensive, too late。',
      'enough 放在形容词或副词后面：形容词/副词 + enough。如 tall enough, old enough, fast enough。',
      'too...to... 结构表示"太……而不能……"：He is too young to go to school.（他太小了，不能上学。）',
    ],
    examples: [
      { english: 'The soup is very delicious.', chinese: '这汤非常好喝。' },
      { english: 'The shoes are too small for me.', chinese: '这双鞋对我来说太小了。' },
      { english: 'She is old enough to go to school.', chinese: '她够大了，可以上学了。' },
      { english: 'He ran fast enough to catch the bus.', chinese: '他跑得够快，赶上了公交车。' },
    ],
    exercises: [
      {
        question: 'The box is ______ heavy for me to carry.',
        options: ['very', 'too', 'enough', 'much'],
        answer: 1,
        explanation: 'too...to... 结构表示"太……而不能……"，too heavy to carry 意为"太重了搬不动"。',
      },
      {
        question: 'She is not tall ______ to reach the shelf.',
        options: ['too', 'very', 'enough', 'so'],
        answer: 2,
        explanation:
          'enough 放在形容词后面：tall enough 意为"够高"。enough 修饰形容词时必须放在形容词之后。',
      },
    ],
  },

  105: {
    title: '电话用语，This is... 的用法',
    explanation: '学习英语中打电话的常用表达方式，特别是 This is... 在电话用语中的特殊用法。',
    rules: [
      '打电话时自我介绍用 This is... (speaking)，而不用 I am...。如 Hello, this is Tom (speaking).',
      '询问对方身份用 Is that... (speaking)? 而不用 Are you...? 如 Is that Mary speaking?',
      '请某人接电话用 Could/May I speak to...? 如 May I speak to Mr Smith?',
      "常用电话用语：Hold on, please.（请稍等。）/ Speaking.（我就是。）/ I'm afraid he's not in.（恐怕他不在。）/ Can I take a message?（我能留言吗？）",
      '打电话时指代对方用 that，指代自己用 this，这是电话用语的特殊之处。',
    ],
    examples: [
      {
        english: 'Hello, this is Lucy speaking. May I speak to John?',
        chinese: '你好，我是露西。我能跟约翰说话吗？',
      },
      { english: 'Is that Mrs Brown speaking?', chinese: '请问是布朗夫人吗？' },
      { english: "Hold on, please. I'll get him for you.", chinese: '请稍等，我去叫他。' },
      {
        english: "I'm sorry, he's not in at the moment. Can I take a message?",
        chinese: '对不起，他现在不在。我能帮你留言吗？',
      },
      { english: 'Could you ask him to call me back?', chinese: '你能让他给我回个电话吗？' },
    ],
    exercises: [
      {
        question: '— Hello! May I speak to Alice? — ______',
        options: ['I am Alice.', 'This is Alice speaking.', 'That is Alice.', 'She is Alice.'],
        answer: 1,
        explanation: '接电话时表明自己的身份用 This is... (speaking)，不用 I am...。',
      },
      {
        question: '— Hello! ______? — Yes, speaking.',
        options: ['Are you Tom', 'Is this Tom speaking', 'Who are you', 'Are you there'],
        answer: 1,
        explanation: '打电话时询问对方身份用 Is this/that + 姓名 + speaking? 不用 Are you...?',
      },
      {
        question: "I'm afraid Mr Green is out. Can I ______?",
        options: ['take a message', 'speak to him', 'call him', 'wait for him'],
        answer: 0,
        explanation:
          '对方不在时，常用 Can I take a message?（我能帮你留言吗？）来表示可以帮助转达信息。',
      },
    ],
    tips: [
      '电话用语中 this 指代自己、that 指代对方，这和面对面交流时用 this/that 指代近处/远处的事物不同。',
      '英语电话用语和中文习惯不同，不要直译中文的"你是……吗？""我是……"。要记住用 This is... 和 Is that...? 的固定句型。',
      '正式场合打电话用 May I speak to...? 更礼貌，日常场合用 Can I speak to...? 即可。',
    ],
  },

  106: {
    title: '复习电话用语',
    explanation: '复习电话英语中的各种常用表达，包括打电话、接电话、留言和回电的表达方式。',
    rules: [
      "打电话自我介绍：This is... (speaking). / It's... here. 询问对方：Is that... (speaking)?",
      '请求通话：May/Could I speak to...? 接电话确认身份后：Speaking. / This is he/she.',
      '对方不在：He/She is not in / not available right now. 留言：Can I take a message? / Could you tell him/her that...?',
      "回电：Could you ask him/her to call me back? / I'll call back later.",
    ],
    examples: [
      {
        english: 'Hello, this is David. Could I speak to Mr Wang?',
        chinese: '你好，我是大卫。我能跟王先生说话吗？',
      },
      {
        english: "Sorry, she's not available at the moment. Can I take a message?",
        chinese: '对不起，她现在没空。我能帮你留言吗？',
      },
      {
        english: 'Could you ask her to call me back this evening?',
        chinese: '你能让她今晚给我回个电话吗？',
      },
      {
        english: "Hold on a moment, please. I'll put you through.",
        chinese: '请稍等一下，我帮你转接。',
      },
    ],
    exercises: [
      {
        question: '— Hello! Is that Mr Li speaking? — ______',
        options: ['I am Mr Li.', 'Yes, speaking.', 'That is Mr Li.', 'He is Mr Li.'],
        answer: 1,
        explanation: '确认自己就是对方要找的人时，回答 Speaking.（我就是），简洁自然。',
      },
      {
        question: 'Mrs Green is not in. Would you like to ______?',
        options: ['leave a message', 'call back', 'speak to her', 'wait her'],
        answer: 0,
        explanation: '对方不在时请来电者留言：Would you like to leave a message?（你想留言吗？）',
      },
    ],
  },

  107: {
    title: '形容词比较级，too 的用法',
    explanation: '深入学习形容词比较级的用法以及 too 在句中表示"也"和"太"的不同用法。',
    rules: [
      '形容词比较级用于两者比较：A + be + 比较级 + than + B。如 She is taller than her sister.',
      '比较级前可用 much, a lot, far（……得多）, a little, a bit（一点儿）, even（甚至）等修饰，表示比较的程度。',
      'too 表示"也"（肯定句末尾）：She likes music, too.（她也喜欢音乐。）too 也可放在句中用逗号隔开：She, too, likes music.',
      'too 表示"太"（修饰形容词/副词，含否定意味）：The coffee is too hot to drink.（咖啡太热了，没法喝。）',
      'too + 形容词 + for + 名词/代词：This question is too difficult for me.（这道题对我来说太难了。）',
    ],
    examples: [
      {
        english: 'This book is much more interesting than that one.',
        chinese: '这本书比那本书有趣得多。',
      },
      { english: 'She is a little older than me.', chinese: '她比我大一点。' },
      { english: 'He is too tired to walk any further.', chinese: '他太累了，走不动了。' },
      {
        english: 'I like swimming, and my brother likes it, too.',
        chinese: '我喜欢游泳，我弟弟也喜欢。',
      },
      { english: 'The room is too small for three people.', chinese: '这个房间住三个人太小了。' },
    ],
    exercises: [
      {
        question: "This coat is ______ expensive for me. I can't afford it.",
        options: ['very', 'so', 'too', 'much'],
        answer: 2,
        explanation:
          'too expensive for me 表示"对我来说太贵了"，too + 形容词 + for sb. 表示超出某人的承受范围。',
      },
      {
        question: 'His English is ______ better than mine.',
        options: ['very', 'more', 'much', 'too'],
        answer: 2,
        explanation: '修饰比较级用 much（……得多），very 不能修饰比较级。much better 意为"好得多"。',
      },
      {
        question: 'My sister likes dancing, and I like it ______.',
        options: ['also', 'too', 'either', 'neither'],
        answer: 1,
        explanation: '肯定句末尾表示"也"用 too。also 用于句中，either 用于否定句末尾。',
      },
    ],
    tips: [
      'too（也）和 also 都表示"也"，但位置不同：also 放在 be 动词/助动词之后、实义动词之前；too 通常放在句末。',
      "too...to... 结构本身含有否定意义，不需要再加 not：He is too young to go to school.（= He is so young that he can't go to school.）",
      '注意区分 too 的两种含义：当 too 修饰形容词时表示"太"（含否定），放在句末时表示"也"（肯定含义）。',
    ],
  },

  108: {
    title: '复习形容词比较级',
    explanation: '复习形容词比较级的构成方法和在句子中的各种用法。',
    rules: [
      '比较级构成：单音节词加 -er（taller, older），多音节词前加 more（more beautiful, more important）。',
      '比较级用于比较句型：A + be + 比较级 + than + B。两者一样用 as...as：She is as tall as her mother.',
      '修饰比较级的词：much, a lot, far（……得多）, a little, a bit（一点儿）, even（甚至）。very, quite 不能修饰比较级。',
      'the + 比较级, the + 比较级 表示"越……越……"：The more you practice, the better you\'ll get.',
    ],
    examples: [
      { english: 'She sings better than her sister.', chinese: '她唱歌比她姐姐好。' },
      {
        english: 'This problem is much more difficult than that one.',
        chinese: '这个问题比那个难得多。',
      },
      { english: 'He is as tall as his father now.', chinese: '他现在和他爸爸一样高了。' },
      { english: "The harder you work, the luckier you'll be.", chinese: '你越努力，就越幸运。' },
    ],
    exercises: [
      {
        question: 'This question is ______ than that one.',
        options: ['more difficult', 'difficulter', 'much difficult', 'most difficult'],
        answer: 0,
        explanation:
          'difficult 是多音节形容词，比较级用 more difficult。注意不能用 difficulter 或 most difficult（最高级）。',
      },
      {
        question: "She doesn't run as ______ as her brother.",
        options: ['faster', 'fastest', 'fast', 'more fast'],
        answer: 2,
        explanation: 'as...as 结构中间用形容词/副词原级：as fast as（和……一样快）。',
      },
    ],
  },

  109: {
    title: '情态动词 could, should 的用法',
    explanation: '学习情态动词 could 和 should 的各种用法，包括请求、建议、能力和义务等。',
    rules: [
      'could 表示过去的能力（can 的过去式）：When I was young, I could run very fast.（我年轻时跑得很快。）',
      "could 表示礼貌的请求（比 can 更委婉）：Could you open the window, please?（你能打开窗户吗？）回答：Yes, I can. / Sorry, I can't.",
      'should 表示建议或劝告（"应该"）：You should see a doctor.（你应该去看医生。）You shouldn\'t stay up late.（你不应该熬夜。）',
      'should 表示义务或责任：Students should obey the rules.（学生应该遵守规则。）',
      'could 还可以表示可能性（较委婉的推测）：It could rain later.（待会儿可能会下雨。）should 表示预期：He should be here soon.（他应该很快到了。）',
    ],
    examples: [
      { english: 'Could you help me with this problem?', chinese: '你能帮我解决这个问题吗？' },
      { english: 'I could swim when I was five years old.', chinese: '我五岁的时候就会游泳了。' },
      { english: 'You should eat more vegetables and fruit.', chinese: '你应该多吃蔬菜和水果。' },
      { english: "We shouldn't waste water.", chinese: '我们不应该浪费水。' },
      { english: 'She should arrive at the station by now.', chinese: '她现在应该已经到车站了。' },
    ],
    exercises: [
      {
        question: 'You look tired. You ______ go to bed early tonight.',
        options: ['could', 'should', 'would', 'might'],
        answer: 1,
        explanation: '表示建议"应该"用 should：You should go to bed early.（你应该早点睡觉。）',
      },
      {
        question: '______ you pass me the salt, please?',
        options: ['Should', 'Must', 'Could', 'Need'],
        answer: 2,
        explanation: '礼貌地请求别人做事用 Could you...? 比 Can you...? 更委婉客气。',
      },
      {
        question: 'When he was young, he ______ ride a horse very well.',
        options: ['can', 'could', 'should', 'would'],
        answer: 1,
        explanation: 'when he was young 是过去的时间，表示过去的能力用 could（can 的过去式）。',
      },
    ],
    tips: [
      "could 用于请求时比 can 更礼貌委婉，但回答时通常用 can/can't，不用 could：Could you help me? — Yes, I can.（不说 Yes, I could.）",
      'should 表示建议时语气比较温和，不像 must 那样表示强制。should 的否定 shouldn\'t 表示"不应该"。',
      "could 表示过去能力时，否定形式为 couldn't（不能）：I couldn't understand what he said.（我听不懂他说的话。）",
    ],
  },

  // ==================== 第110-129课 ====================

  110: {
    title: '复习情态动词 could, should, would, may',
    explanation:
      '情态动词用来表示能力、义务、意愿、可能性等含义。could, should, would, may 是常见的情态动词，后面接动词原形。',
    rules: [
      'could 表示过去的能力或礼貌的请求，如 "I could swim when I was five." 或 "Could you help me?"',
      'should 表示建议或义务，意为"应该"，如 "You should see a doctor."',
      'would 表示过去的习惯、意愿或礼貌的请求，如 "Would you like some tea?"',
      'may 表示许可或可能性，如 "May I come in?" 或 "It may rain tomorrow."',
    ],
    examples: [
      { english: 'Could you pass me the salt, please?', chinese: '你能把盐递给我吗？' },
      { english: 'You should study harder for the exam.', chinese: '你应该为考试更努力学习。' },
      { english: 'Would you like to go to the cinema tonight?', chinese: '你今晚想去看电影吗？' },
      { english: 'It may snow this afternoon.', chinese: '今天下午可能会下雪。' },
    ],
    exercises: [
      {
        question: 'You look tired. You _____ go to bed early tonight.',
        options: ['could', 'should', 'would', 'may'],
        answer: 1,
        explanation: 'should 表示建议，意为"应该"。你看起来很累，建议早点睡觉。',
      },
      {
        question: "_____ you open the window, please? It's hot in here.",
        options: ['Should', 'May', 'Could', 'Must'],
        answer: 2,
        explanation: 'Could you...? 是礼貌的请求方式，意为"你能……吗？"',
      },
    ],
  },

  111: {
    title: '形容词最高级',
    explanation:
      '形容词最高级用于三者或三者以上的比较，表示"最……"。最高级前通常加定冠词 the，后可接 of/in 短语表示范围。',
    rules: [
      '单音节形容词加 -est 构成最高级，如 tall → the tallest, old → the oldest, big → the biggest（双写末尾辅音字母）。',
      '以 -e 结尾的形容词加 -st，如 large → the largest, nice → the nicest。',
      '多音节形容词前加 most 构成最高级，如 beautiful → the most beautiful, expensive → the most expensive。',
      '不规则形容词有特殊最高级形式：good/well → the best, bad → the worst, many/much → the most, little → the least。',
      '最高级前必须加定冠词 the，后常接 of 或 in 短语表示比较范围，如 "the tallest in the class"。',
    ],
    examples: [
      { english: 'She is the tallest girl in her class.', chinese: '她是班里最高的女孩。' },
      { english: 'This is the most expensive car in the shop.', chinese: '这是店里最贵的车。' },
      { english: 'He is the best student in our school.', chinese: '他是我们学校最好的学生。' },
      { english: 'Winter is the coldest season of the year.', chinese: '冬天是一年中最冷的季节。' },
      { english: 'That was the worst film I have ever seen.', chinese: '那是我看过的最差的电影。' },
    ],
    exercises: [
      {
        question: 'Mount Everest is _____ mountain in the world.',
        options: ['high', 'higher', 'the highest', 'most high'],
        answer: 2,
        explanation: '三者以上比较用最高级 the highest，且最高级前必须加 the。',
      },
      {
        question: 'This is _____ book I have ever read.',
        options: [
          'the more interesting',
          'the most interesting',
          'most interesting',
          'the interestingest',
        ],
        answer: 1,
        explanation: '多音节形容词 interesting 的最高级为 the most interesting。',
      },
      {
        question: 'Of all the students, she studies _____.',
        options: ['the hard', 'hardest', 'the hardest', 'most hard'],
        answer: 2,
        explanation: 'hard 是单音节词，最高级为 the hardest，最高级前必须加 the。',
      },
    ],
    tips: [
      '最高级前一定要加定冠词 the，这是与比较级的重要区别。',
      '注意双写规则：以"辅元辅"结尾的单词需双写末尾辅音字母再加 -est，如 big → biggest, hot → hottest。',
      '可以用 "one of the + 最高级 + 复数名词" 表示"最……之一"，如 "one of the largest cities"（最大的城市之一）。',
    ],
  },

  112: {
    title: '复习形容词最高级',
    explanation: '复习形容词最高级的构成和用法，巩固单音节、多音节以及不规则形容词的最高级形式。',
    rules: [
      '单音节词加 -est，多音节词前加 most：old → the oldest, beautiful → the most beautiful。',
      '不规则最高级需记忆：good → the best, bad → the worst, far → the farthest/furthest。',
      '最高级前加 the，后可接 of/in 短语或定语从句来限定范围。',
      '可以用 "one of the + 最高级 + 复数名词" 表示"最……之一"。',
    ],
    examples: [
      { english: 'This is the longest river in China.', chinese: '这是中国最长的河流。' },
      {
        english: 'She is one of the most famous singers in the world.',
        chinese: '她是世界上最著名的歌手之一。',
      },
      {
        english: 'That was the worst meal I have ever had.',
        chinese: '那是我吃过的最糟糕的一顿饭。',
      },
      { english: 'He runs the fastest of all the boys.', chinese: '他是所有男孩中跑得最快的。' },
    ],
    exercises: [
      {
        question: 'The Sahara is _____ desert in the world.',
        options: ['big', 'the biggest', 'most big', 'the bigger'],
        answer: 1,
        explanation: 'big 的最高级是 the biggest（双写 g 加 -est），且最高级前要加 the。',
      },
      {
        question: 'Which is _____, the sun, the moon or the earth?',
        options: ['large', 'larger', 'the largest', 'most large'],
        answer: 2,
        explanation: '三者之间比较用最高级 the largest。',
      },
    ],
  },

  113: {
    title: '货币表达，so 和 neither 的用法',
    explanation: '学习如何用英语表达货币金额，以及用 so 和 neither 来表示"也"的肯定和否定回应。',
    rules: [
      '英币单位：pound（镑，£）、penny/pence（便士，p）。美币单位：dollar（美元，$）、cent（美分，¢）。表达时先说大单位再说小单位，如 "three pounds fifty"（3镑50便士）。',
      'so 用于肯定句的回应，表示"……也是如此"，结构为 "So + 助动词/情态动词 + 主语"，如 "He likes music. So do I."',
      'neither 用于否定句的回应，表示"……也不"，结构为 "Neither + 助动词/情态动词 + 主语"，如 "She can\'t swim. Neither can I."',
      'so 和 neither 后面的助动词要与原句的时态和主语保持一致。如原句用一般现在时第三人称，则用 does；原句用过去时，则用 did。',
    ],
    examples: [
      { english: 'This book costs two pounds fifty.', chinese: '这本书两镑五十便士。' },
      { english: 'I like coffee. So does my wife.', chinese: '我喜欢咖啡。我妻子也喜欢。' },
      { english: "He doesn't eat meat. Neither do I.", chinese: '他不吃肉。我也不吃。' },
      {
        english: 'She went to the party last night. So did we.',
        chinese: '她昨晚去了聚会。我们也去了。',
      },
    ],
    exercises: [
      {
        question: "— I don't like fish. — _____ do I.",
        options: ['So', 'Neither', 'Either', 'Too'],
        answer: 1,
        explanation: '否定句的回应用 Neither + 助动词 + 主语，表示"我也不……"。',
      },
      {
        question: '— She can speak French. — So _____ I.',
        options: ['do', 'am', 'can', 'will'],
        answer: 2,
        explanation: '原句使用情态动词 can，so 后面也要用 can 保持一致。',
      },
      {
        question: 'The ticket costs five _____.',
        options: ['pound', 'pounds', 'pence', 'penny'],
        answer: 1,
        explanation: '五镑用复数形式 pounds。pence 是便士的复数，penny 是便士的单数。',
      },
    ],
    tips: [
      '区分 so 的倒装用法（So + 助动词 + 主语，表示"也"）和 so 的正常语序（So + 主语 + 助动词，表示"确实如此"），如 "He is tall. So he is."（他确实高。）',
      '在口语中，否定回应也可以用 "Me neither." 或 "I don\'t either." 来替代 "Neither do I."',
      '货币表达中，口语里常省略货币单位名称，如 "That\'s three fifty."（那是三块五。）',
    ],
  },

  114: {
    title: '复习 so 和 neither 的用法',
    explanation: '复习用 so 和 neither 表示"也"的用法，巩固倒装结构和助动词的一致性。',
    rules: [
      '肯定回应：So + 助动词/情态动词 + 主语，如 "I am happy. So is she."',
      '否定回应：Neither + 助动词/情态动词 + 主语，如 "I can\'t drive. Neither can he."',
      '助动词须与原句时态一致：一般现在时用 do/does，一般过去时用 did，现在完成时用 have/has。',
      '肯定回应也可用 "主语 + 助动词 + too"，否定回应也可用 "主语 + 否定助动词 + either"。',
    ],
    examples: [
      { english: 'He is a teacher. So is his brother.', chinese: '他是老师。他弟弟也是。' },
      {
        english: "They haven't been to Paris. Neither have we.",
        chinese: '他们没去过巴黎。我们也没去过。',
      },
      {
        english: 'She likes dancing. So do her friends.',
        chinese: '她喜欢跳舞。她的朋友们也喜欢。',
      },
      {
        english: "I didn't watch TV last night. Neither did Tom.",
        chinese: '我昨晚没看电视。汤姆也没看。',
      },
    ],
    exercises: [
      {
        question: '— Tom has finished his homework. — So _____ Mary.',
        options: ['do', 'does', 'has', 'have'],
        answer: 2,
        explanation: '原句用 has finished（现在完成时），主语 Mary 为第三人称单数，所以用 has。',
      },
      {
        question: "— I didn't enjoy the film. — _____.",
        options: ['So did I', 'Neither did I', "So didn't I", 'Neither I did'],
        answer: 1,
        explanation: '否定回应使用 Neither + 助动词 + 主语 的倒装结构。',
      },
    ],
  },

  115: {
    title: '现在完成时（进阶用法）',
    explanation:
      '现在完成时除了表示经历外，还可以表示过去发生的动作对现在造成的影响，以及从过去持续到现在的状态。常与 already, yet, just, ever, never, since, for 等词连用。',
    rules: [
      '现在完成时基本结构：have/has + 过去分词。表示过去的动作对现在有影响或结果，如 "I have lost my key."（我钥匙丢了——现在进不了门。）',
      'already 用于肯定句，表示"已经"，放在 have/has 和过去分词之间；yet 用于否定句和疑问句，放在句末，如 "Have you finished yet?" "I haven\'t finished yet."',
      'just 表示"刚刚"，放在 have/has 和过去分词之间，如 "I have just had lunch."',
      'since + 时间点（如 since 2010, since Monday），for + 时间段（如 for two years, for a long time），表示动作从过去持续到现在。',
      'ever 用于疑问句表示"曾经"，never 表示"从不/从未"，两者都放在 have/has 和过去分词之间。',
    ],
    examples: [
      { english: 'I have already told him the news.', chinese: '我已经把这个消息告诉他了。' },
      {
        english: 'Have you ever been to Japan? No, I have never been there.',
        chinese: '你去过日本吗？不，我从未去过那里。',
      },
      { english: 'She has lived here since 2015.', chinese: '她从2015年起就住在这里。' },
      { english: 'They have just arrived at the airport.', chinese: '他们刚刚到达机场。' },
      { english: "He hasn't done his homework yet.", chinese: '他还没有做完作业。' },
    ],
    exercises: [
      {
        question: 'I have _____ seen such a beautiful place before.',
        options: ['ever', 'never', 'yet', 'already'],
        answer: 1,
        explanation:
          'never 表示"从未"，放在 have 和过去分词之间。句意为"我以前从未见过这么美丽的地方。"',
      },
      {
        question: 'She has worked in this company _____ ten years.',
        options: ['since', 'for', 'from', 'during'],
        answer: 1,
        explanation: 'for + 时间段（ten years），表示持续了十年。since 后面接时间点。',
      },
      {
        question: '— Have you finished your work _____? — Not _____.',
        options: ['already, yet', 'yet, yet', 'yet, already', 'already, already'],
        answer: 1,
        explanation: 'yet 用于疑问句末尾表示"已经"，用于否定句末尾表示"还没有"。',
      },
    ],
    tips: [
      '现在完成时强调过去动作对现在的影响或结果，而一般过去时只陈述过去的事实。比较："I have lost my key."（丢了，现在还没找到）vs "I lost my key yesterday."（昨天丢了，可能已经找到了。）',
      'since 和 for 常与现在完成时连用，表示持续状态，此时不能与非延续性动词（如 die, arrive, leave）连用，除非转为延续性表达（如 die → be dead, arrive → be here, leave → be away）。',
      'already 和 just 通常用于肯定句，yet 通常用于否定句和疑问句。',
    ],
  },

  116: {
    title: '复习现在完成时',
    explanation:
      '复习现在完成时的结构和用法，巩固 already, yet, just, ever, never, since, for 的使用。',
    rules: [
      '结构：have/has + 过去分词。第三人称单数用 has，其余用 have。',
      'already（已经）和 just（刚刚）用于肯定句；yet（还）用于否定句和疑问句。',
      'since + 时间点表示"自从……"；for + 时间段表示"持续了……"。',
      'ever（曾经）用于疑问句；never（从未）用于否定含义的陈述句。',
    ],
    examples: [
      {
        english: 'We have known each other since childhood.',
        chinese: '我们从童年起就互相认识了。',
      },
      { english: 'Has she ever visited the Great Wall?', chinese: '她去过长城吗？' },
      {
        english: 'I have just received a letter from my friend.',
        chinese: '我刚刚收到朋友的一封信。',
      },
      { english: "They haven't decided where to go yet.", chinese: '他们还没有决定去哪里。' },
    ],
    exercises: [
      {
        question: 'My father has worked in that factory _____ 1998.',
        options: ['for', 'since', 'from', 'in'],
        answer: 1,
        explanation: '1998 是时间点，用 since + 时间点表示"自从1998年起"。',
      },
      {
        question: '— Have you _____ eaten Chinese food? — Yes, I have.',
        options: ['never', 'yet', 'ever', 'just'],
        answer: 2,
        explanation: 'ever 用在疑问句中表示"曾经"。句意为"你曾经吃过中国菜吗？"',
      },
    ],
  },

  117: {
    title: '过去进行时',
    explanation:
      '过去进行时表示过去某一时刻或某一段时间内正在进行的动作。它常与过去某一时间点或 when, while 引导的时间状语连用。',
    rules: [
      '过去进行时结构：was/were + 动词-ing。I/he/she/it 用 was，you/we/they 用 were。',
      '过去进行时常与 at that time, at 8 o\'clock last night, this time yesterday 等过去时间点连用，如 "I was reading at 9 o\'clock last night."',
      'when 引导的从句用一般过去时表示短暂动作，while 引导的从句用过去进行时表示持续动作，如 "When I arrived, she was cooking dinner." 或 "While I was walking, it started to rain."',
      '过去进行时强调过去某时刻动作正在进行，而一般过去时强调动作已完成。比较："I was reading a book last night."（昨晚在看书，强调进行中）vs "I read a book last night."（昨晚看了一本书，强调看完了。）',
      '过去进行时常用于描述背景场景，如故事开头："The sun was shining and the birds were singing."',
    ],
    examples: [
      {
        english: 'I was having dinner when the phone rang.',
        chinese: '电话响的时候我正在吃晚饭。',
      },
      {
        english: 'While she was cleaning the room, her husband was watching TV.',
        chinese: '她在打扫房间的时候，她丈夫在看电视。',
      },
      {
        english: 'What were you doing at this time yesterday?',
        chinese: '昨天这个时候你在做什么？',
      },
      {
        english: "They were playing football at 4 o'clock yesterday afternoon.",
        chinese: '昨天下午四点他们在踢足球。',
      },
      {
        english: 'It was raining heavily when we left the house.',
        chinese: '我们出门的时候正下着大雨。',
      },
    ],
    exercises: [
      {
        question: 'I _____ a book when the lights went out.',
        options: ['read', 'was reading', 'am reading', 'have read'],
        answer: 1,
        explanation:
          '灯灭（went out）是一个过去的短暂动作，当时"正在看书"要用过去进行时 was reading。',
      },
      {
        question: 'While Tom _____, his sister was cooking in the kitchen.',
        options: ['slept', 'sleeps', 'was sleeping', 'is sleeping'],
        answer: 2,
        explanation: 'while 后面接过去进行时，表示过去某段时间内持续进行的动作。',
      },
      {
        question: "At 7 o'clock this morning, I _____ to the radio.",
        options: ['listened', 'was listening', 'listen', 'have listened'],
        answer: 1,
        explanation:
          "at 7 o'clock this morning 是过去的具体时间点，此时正在进行的动作用过去进行时。",
      },
    ],
    tips: [
      'when 和 while 的区别：when 后接短暂动作（一般过去时），while 后接持续动作（过去进行时）。简单记为"when 短 while 长"。',
      '过去进行时常用于回答 "What were you doing when/while...?" 这类问题。',
      '过去进行时的否定形式：在 was/were 后加 not，如 "I wasn\'t sleeping. I was thinking."',
    ],
  },

  118: {
    title: '复习过去进行时',
    explanation: '复习过去进行时的结构和用法，巩固 was/were + -ing 形式以及与 when/while 的搭配。',
    rules: [
      '结构：was/were + 动词-ing。I/he/she/it 用 was，you/we/they 用 were。',
      'when + 一般过去时（短暂动作打断正在进行的活动）；while + 过去进行时（两个动作同时进行）。',
      '过去进行时常与具体过去时间连用：at that moment, at 10 last night, this time last week 等。',
    ],
    examples: [
      {
        english: 'She was washing her hair when the doorbell rang.',
        chinese: '门铃响的时候她正在洗头发。',
      },
      {
        english: 'While we were having a picnic, it began to rain.',
        chinese: '我们正在野餐的时候，天开始下雨了。',
      },
      {
        english: "What were the children doing at 5 o'clock yesterday?",
        chinese: '昨天五点钟孩子们在做什么？',
      },
      {
        english: "He wasn't working yesterday. He was visiting a friend.",
        chinese: '他昨天没在上班，他在拜访一个朋友。',
      },
    ],
    exercises: [
      {
        question: 'When the teacher came in, the students _____ loudly.',
        options: ['talked', 'were talking', 'talk', 'are talking'],
        answer: 1,
        explanation:
          '老师进来（came in）是短暂动作，学生们当时正在大声说话，用过去进行时 were talking。',
      },
      {
        question: 'I saw an accident while I _____ to work this morning.',
        options: ['walk', 'walked', 'was walking', 'am walking'],
        answer: 2,
        explanation: 'while 后面接过去进行时，表示正在走路的过程中看到了事故。',
      },
    ],
  },

  119: {
    title: '过去进行时，used to 的用法',
    explanation:
      '在过去进行时的基础上，学习 used to 的用法。used to 表示过去常常做某事或过去存在的状态，但现在不再如此。',
    rules: [
      'used to + 动词原形，表示过去常常做的事或过去的状态（现在不再如此），如 "I used to smoke."（我过去抽烟——现在不抽了。）',
      '否定形式：didn\'t use to 或 used not to，如 "He didn\'t use to get up early." 或 "He used not to get up early."',
      '疑问形式：Did ... use to ...? 如 "Did you use to play football?"',
      'used to 强调与现在的对比，暗示现在不再这样做；而 would 只表示过去的习惯动作，不强调与现在的对比，且 would 不能表示过去的状态。',
      '注意区分 used to（过去常常）和 be used to（习惯于），后者 to 是介词，后接名词或动名词：如 "I am used to getting up early."（我习惯早起。）',
    ],
    examples: [
      {
        english: 'I used to live in Beijing, but now I live in Shanghai.',
        chinese: '我以前住在北京，但现在住在上海。',
      },
      {
        english: "She didn't use to like coffee, but now she drinks it every day.",
        chinese: '她过去不喜欢咖啡，但现在每天都喝。',
      },
      {
        english: 'Did you use to walk to school when you were a child?',
        chinese: '你小时候走着去上学吗？',
      },
      {
        english: 'There used to be a cinema here, but it was pulled down last year.',
        chinese: '这里以前有一家电影院，但去年被拆了。',
      },
      {
        english: 'While I was walking along the river, I saw some boats on the water.',
        chinese: '我沿着河边散步的时候，看到水面上有一些船。',
      },
    ],
    exercises: [
      {
        question: 'He _____ play basketball every day when he was young.',
        options: ['used to', 'use to', 'is used to', 'was used to'],
        answer: 0,
        explanation: 'used to + 动词原形，表示过去常常做某事。他年轻的时候每天打篮球。',
      },
      {
        question: '_____ you use to go swimming in the river?',
        options: ['Do', 'Are', 'Did', 'Were'],
        answer: 2,
        explanation: 'used to 的疑问句用 Did + 主语 + use to + 动词原形。',
      },
      {
        question: 'She _____ like vegetables, but now she eats them a lot.',
        options: ["didn't used to", "didn't use to", "doesn't use to", "isn't used to"],
        answer: 1,
        explanation:
          "否定形式为 didn't use to（注意用 use 而非 used），表示过去不喜欢但现在喜欢了。",
      },
    ],
    tips: [
      "used to 的疑问和否定形式中，use 不加 -d：Did you use to...? / didn't use to。这是因为 did 已经承载了过去时态。",
      'used to 既可以表示过去的习惯性动作（I used to jog every morning），也可以表示过去的状态（There used to be a park here），而 would 只能表示习惯性动作。',
      'be/get used to 中的 to 是介词，后接名词或动名词，意为"习惯于……"，与 used to + 动词原形的含义和用法完全不同。',
    ],
  },

  120: {
    title: '复习过去进行时和 used to',
    explanation: '综合复习过去进行时和 used to 的用法，巩固两种表达过去情景的方式。',
    rules: [
      '过去进行时：was/were + 动词-ing，表示过去某一时刻或时段正在进行的动作。',
      "used to + 动词原形，表示过去的习惯或状态，暗示现在不再如此。否定：didn't use to；疑问：Did ... use to...?",
      '过去进行时侧重描述过去某个时刻正在发生的事情；used to 侧重描述过去的常态或反复发生的事。',
      '两者都描述过去，但角度不同：was doing 是"当时正在做"，used to do 是"过去常常做"。',
    ],
    examples: [
      {
        english: 'At 10 last night, I was still working on my report.',
        chinese: '昨晚十点，我还在写报告。',
      },
      {
        english: 'My grandfather used to tell us stories before bedtime.',
        chinese: '我爷爷以前在睡前给我们讲故事。',
      },
      {
        english: 'She was waiting for the bus when it started to snow.',
        chinese: '她正在等公交车的时候，开始下雪了。',
      },
      {
        english: 'There used to be a large tree in our garden.',
        chinese: '我们花园里以前有一棵大树。',
      },
    ],
    exercises: [
      {
        question: 'I _____ in the countryside, but now I live in the city.',
        options: ['was living', 'used to live', 'use to live', 'live'],
        answer: 1,
        explanation: 'used to live 表示过去住在乡下，但现在不住在那里了，强调与现在的对比。',
      },
      {
        question: 'While she _____ dinner, the children were playing in the garden.',
        options: ['cooked', 'was cooking', 'used to cook', 'cooks'],
        answer: 1,
        explanation: 'while 引导的从句用过去进行时，表示两个动作同时进行：她做饭的同时孩子们在玩。',
      },
    ],
  },

  121: {
    title: '定语从句（关系代词 who, whom, which, that）',
    explanation:
      '定语从句用来修饰名词或代词，起形容词的作用。关系代词 who, whom, which, that 引导定语从句，并在从句中充当主语或宾语。',
    rules: [
      'who 和 whom 指人：who 在从句中作主语，whom 作宾语（口语中常用 who 代替 whom），如 "The man who called you is my uncle." 或 "The girl (whom) you met is my sister."',
      'which 指物，在从句中可作主语或宾语，如 "The book which is on the table is mine." 或 "The film (which) we saw was great."',
      'that 既可以指人也可以指物，在从句中作主语或宾语，如 "The car that hit the dog was going very fast." 或 "The letter (that) I received was from my friend."',
      '关系代词在从句中作宾语时可以省略，如 "The man (who/whom/that) I saw yesterday was Mr. Smith." 但作主语时不能省略。',
      '定语从句紧跟在先行词（被修饰的名词）之后。限制性定语从句不用逗号隔开，是句子不可缺少的部分。',
    ],
    examples: [
      {
        english: 'The boy who is standing there is my brother.',
        chinese: '站在那里的男孩是我弟弟。',
      },
      {
        english: 'The book which I bought yesterday is very interesting.',
        chinese: '我昨天买的那本书很有趣。',
      },
      {
        english: 'The woman whom you spoke to is our English teacher.',
        chinese: '你跟她说话的那位女士是我们的英语老师。',
      },
      { english: 'Is this the hotel that you recommended?', chinese: '这就是你推荐的那家旅馆吗？' },
      {
        english: 'The letter that arrived this morning is from my parents.',
        chinese: '今天早上到的那封信是我父母寄来的。',
      },
    ],
    exercises: [
      {
        question: 'The man _____ lives next door is a doctor.',
        options: ['which', 'who', 'whom', 'whose'],
        answer: 1,
        explanation: '先行词 the man 是人，关系代词在从句中作主语，用 who。',
      },
      {
        question: "The dress _____ she bought yesterday doesn't fit her.",
        options: ['who', 'whom', 'which', 'whose'],
        answer: 2,
        explanation: '先行词 the dress 是物，用 which 或 that 引导定语从句。',
      },
      {
        question: 'The girl _____ you met at the party is my cousin.',
        options: ['who', 'which', 'whom/who/that', 'whose'],
        answer: 2,
        explanation:
          '先行词 the girl 是人，关系代词在从句中作宾语，可以用 whom、who 或 that，也可以省略。',
      },
    ],
    tips: [
      '关系代词作宾语时可以省略，这在口语中非常常见。如 "The man I saw" 等于 "The man who/whom/that I saw"。',
      'that 比 who/which 更常用在口语中，且 that 可以指人也可以指物，所以在不确定用哪个时，用 that 往往是最安全的选择。',
      '关系代词的选择取决于先行词（人还是物）和关系代词在从句中的角色（主语还是宾语）。',
    ],
  },

  122: {
    title: '复习定语从句',
    explanation: '复习定语从句中关系代词 who, whom, which, that 的用法，巩固定语从句的结构。',
    rules: [
      'who/whom 指人，which 指物，that 指人或物均可。',
      '关系代词在从句中作主语时不可省略，作宾语时可以省略。',
      '定语从句紧跟先行词，限制性定语从句不用逗号隔开。',
      '在口语中 that 的使用频率最高，可以替代 who 和 which。',
    ],
    examples: [
      {
        english: 'The student who won the prize is very hard-working.',
        chinese: '获奖的那个学生非常勤奋。',
      },
      { english: 'This is the house that Jack built.', chinese: '这就是杰克建造的房子。' },
      {
        english: 'The film we watched last night was boring.',
        chinese: '我们昨晚看的那部电影很无聊。（省略了关系代词）',
      },
      {
        english: 'Do you know the woman who is talking to our teacher?',
        chinese: '你认识正在跟我们老师说话的那位女士吗？',
      },
    ],
    exercises: [
      {
        question: 'The bag _____ I lost had all my money in it.',
        options: ['who', 'whom', 'which', 'whose'],
        answer: 2,
        explanation: '先行词 the bag 是物，用 which（或 that）引导定语从句。',
      },
      {
        question: 'The children _____ played in the park were very happy.',
        options: ['which', 'whom', 'who', 'whose'],
        answer: 2,
        explanation: '先行词 the children 是人，关系代词在从句中作主语，用 who。',
      },
    ],
  },

  123: {
    title: '现在完成时，have been to 和 have gone to',
    explanation:
      '学习现在完成时中 have been to 和 have gone to 的区别：have been to 表示"曾经去过某地（已经回来了）"，have gone to 表示"已经去了某地（还没回来）"。',
    rules: [
      'have/has been to + 地点：表示曾经去过某地，现在已回来。常与 ever, never, how many times 连用，如 "I have been to Paris twice."（我去过巴黎两次。）',
      'have/has gone to + 地点：表示已经去了某地，目前还在那里（或正在去的路上），如 "He has gone to London."（他去伦敦了——现在不在这里。）',
      'have/has been to 可以用于所有人称，因为说话人回来了；have/has gone to 一般不用于第一人称（I/we），因为说话人不可能去了某地又同时在这里说话。',
      'have been in + 地点 + for/since：表示在某地待了多长时间，强调停留，如 "She has been in Beijing for three months."',
    ],
    examples: [
      { english: 'I have been to the Great Wall three times.', chinese: '我去过长城三次。' },
      {
        english: 'Where is Tom? He has gone to the library.',
        chinese: '汤姆在哪里？他去图书馆了。',
      },
      { english: 'Have you ever been to Australia?', chinese: '你曾经去过澳大利亚吗？' },
      {
        english: 'She has been in New York since last Monday.',
        chinese: '她从上周一开始就待在纽约了。',
      },
      { english: 'They have never been abroad before.', chinese: '他们以前从未出过国。' },
    ],
    exercises: [
      {
        question: '— Where is your mother? — She _____ to the supermarket.',
        options: ['has been', 'has gone', 'went', 'goes'],
        answer: 1,
        explanation: '妈妈现在不在这里，说明她去了超市还没回来，用 has gone to。',
      },
      {
        question: 'I _____ to Shanghai many times. I love that city.',
        options: ['have gone', 'have been', 'went', 'go'],
        answer: 1,
        explanation: '说话人现在在这里，说自己去过上海多次（已经回来），用 have been to。',
      },
      {
        question: "Mr. Wang isn't here. He _____ to Beijing on business.",
        options: ['has been', 'has gone', 'went', 'goes'],
        answer: 1,
        explanation: '王先生不在这里，说明他去了北京出差还没回来，用 has gone to。',
      },
    ],
    tips: [
      '判断用 been 还是 gone 的关键：如果这个人现在在你面前（或已回来），用 have been to；如果不在这里，用 have gone to。',
      'have been to 可与 ever, never, how many times 等连用，强调经历；have gone to 不能与这些词连用。',
      '注意 have been in 表示"一直待在某地"，强调停留的时间长度，常与 for/since 连用。',
    ],
  },

  124: {
    title: '复习现在完成时，have been to 和 have gone to',
    explanation: '复习 have been to 和 have gone to 的区别与用法，巩固现在完成时的语境理解。',
    rules: [
      'have/has been to：曾经去过（已回来），强调经历。可与 ever, never, how many times 连用。',
      'have/has gone to：已经去了（未回来），强调目前不在。一般不用于第一人称。',
      'have/has been in + 地点 + for/since：在某地停留了多长时间。',
      '现在完成时的核心意义是"过去与现在的联系"，不是单纯的过去事件。',
    ],
    examples: [
      {
        english: 'My parents have gone to visit my grandparents. They will be back tomorrow.',
        chinese: '我父母去看望祖父母了。他们明天回来。',
      },
      { english: 'How many times have you been to London?', chinese: '你去过伦敦多少次？' },
      { english: 'She has never been to a concert before.', chinese: '她以前从未去过音乐会。' },
      { english: 'He has been in Hong Kong for two weeks.', chinese: '他在香港已经待了两周了。' },
    ],
    exercises: [
      {
        question: "Lucy isn't at home. She _____ to the park with her friends.",
        options: ['has been', 'has gone', 'goes', 'went'],
        answer: 1,
        explanation: 'Lucy 不在家，说明她去了公园还没回来，用 has gone to。',
      },
      {
        question: 'I _____ to that restaurant several times. The food is great.',
        options: ['have gone', 'have been', 'go', 'went'],
        answer: 1,
        explanation: '说话人在这里谈论自己的经历，表示去过那家餐厅多次，用 have been to。',
      },
    ],
  },

  125: {
    title: '将来进行时',
    explanation:
      '将来进行时表示将来某一时刻或某一段时间内正在进行的动作。结构为 will be + 动词-ing。',
    rules: [
      '将来进行时结构：will be + 动词-ing（现在分词），表示将来某一时刻正在进行的动作，如 "This time tomorrow, I will be flying to Paris."',
      "将来进行时常与将来时间状语连用：at this time tomorrow, at 10 o'clock tomorrow morning, this time next week 等。",
      '将来进行时可以表示已安排好的、确定会发生的将来事件，语气比 will + 动词原形更委婉、自然，如 "Will you be using the car tonight?"（比 "Will you use..." 更礼貌。）',
      '将来进行时的否定形式：will not (won\'t) be + 动词-ing，如 "I won\'t be working tomorrow."',
      '将来进行时的疑问形式：Will + 主语 + be + 动词-ing? 如 "Will you be having dinner at home tonight?"',
    ],
    examples: [
      {
        english: 'This time tomorrow, I will be sitting on the beach.',
        chinese: '明天这个时候，我将坐在海滩上。',
      },
      {
        english: "She will be waiting for you at the station at 5 o'clock.",
        chinese: '五点的时候她将在车站等你。',
      },
      { english: 'Will you be coming to the party tonight?', chinese: '你今晚会来参加聚会吗？' },
      { english: "They won't be working on Sunday.", chinese: '他们星期天不会在工作。' },
      {
        english: 'At this time next month, we will be travelling in Europe.',
        chinese: '下个月的这个时候，我们将在欧洲旅行。',
      },
    ],
    exercises: [
      {
        question: 'This time next week, I _____ on a beach in Thailand.',
        options: ['will lie', 'will be lying', 'am lying', 'lie'],
        answer: 1,
        explanation:
          '"this time next week" 表示将来某一时刻正在进行的活动，用将来进行时 will be lying。',
      },
      {
        question: '_____ you _____ the train to work tomorrow morning?',
        options: ['Will, take', 'Will, be taking', 'Are, taking', 'Do, take'],
        answer: 1,
        explanation: '将来进行时的疑问句：Will + 主语 + be + 动词-ing? 语气更加委婉自然。',
      },
      {
        question: "Don't call me at 8 tonight. I _____ dinner then.",
        options: ['will have', 'will be having', 'am having', 'have'],
        answer: 1,
        explanation: '今晚八点那个时刻我正在吃晚饭，用将来进行时 will be having。',
      },
    ],
    tips: [
      '将来进行时与一般将来时的区别："I will have dinner at 7."（我七点吃晚饭——陈述计划）vs "I will be having dinner at 7."（七点的时候我将在吃晚饭——强调那时正在进行。）',
      '将来进行时在口语中常用来询问别人的计划，语气比 will you do 更礼貌、更不带有强迫感。',
      '将来进行时不涉及主观意愿，只客观描述将来某时刻正在进行的活动，因此听起来更加中立和自然。',
    ],
  },

  126: {
    title: '复习将来进行时',
    explanation:
      '复习将来进行时的结构和用法，巩固 will be + -ing 形式在将来特定时刻描述进行中动作的用法。',
    rules: [
      "结构：will be + 动词-ing。否定：won't be + -ing。疑问：Will + 主语 + be + -ing?",
      "常与将来特定时间连用：at this time tomorrow, at 3 o'clock this afternoon, this time next year 等。",
      '将来进行时强调将来某一时刻动作正在进行；一般将来时只陈述将来会发生的动作。',
    ],
    examples: [
      {
        english: "At 10 o'clock tomorrow morning, I will be having a meeting.",
        chinese: '明天上午十点，我将正在开会。',
      },
      {
        english: 'This time next year, she will be studying at university.',
        chinese: '明年这个时候，她将在大学读书。',
      },
      {
        english: "They won't be playing football tomorrow because of the rain.",
        chinese: '因为下雨，他们明天不会在踢足球。',
      },
      { english: 'Will you be staying for dinner tonight?', chinese: '你今晚会留下来吃饭吗？' },
    ],
    exercises: [
      {
        question: "Don't phone between 7 and 8. We _____ dinner then.",
        options: ['will have', 'are having', 'will be having', 'have'],
        answer: 2,
        explanation: '晚上七点到八点之间那个时段我们正在吃晚饭，用将来进行时 will be having。',
      },
      {
        question: 'At this time tomorrow, the plane _____ to Tokyo.',
        options: ['flies', 'will fly', 'will be flying', 'is flying'],
        answer: 2,
        explanation:
          '"at this time tomorrow" 表示明天这个时刻正在进行的动作，用将来进行时 will be flying。',
      },
    ],
  },

  127: {
    title: '过去完成时，must be 表示推测',
    explanation:
      '学习过去完成时（had + 过去分词）表示"过去的过去"发生的动作，以及用 must be 表示对现在情况的肯定推测。',
    rules: [
      '过去完成时结构：had + 过去分词，表示在过去某一时间或动作之前已经完成的动作，即"过去的过去"。如 "When I arrived, the train had already left."（我到达时，火车已经开走了。）',
      '过去完成时常与 before, by the time, already, just, never 等词连用，以及与 when, after, until 等引导的过去时间状语从句搭配。',
      'must be 表示对现在情况的肯定推测，意为"一定是……"，语气非常确定，如 "He must be a teacher."（他一定是个老师。）',
      "must be 只用于肯定推测；否定推测用 can't be（不可能是）；疑问推测用 could it be...?",
      'must + 动词原形表示对现在的推测，must have + 过去分词表示对过去的推测，如 "She must have missed the train."（她一定是错过了火车。）',
    ],
    examples: [
      {
        english: 'By the time we got to the cinema, the film had already started.',
        chinese: '我们到电影院时，电影已经开始了。',
      },
      { english: 'She told me that she had lost her wallet.', chinese: '她告诉我她把钱包弄丢了。' },
      { english: 'He must be at home. The lights are on.', chinese: '他一定在家。灯亮着。' },
      {
        english: "You've been working all day. You must be tired.",
        chinese: '你工作了一整天。你一定累了。',
      },
      {
        english: 'After he had finished his homework, he went out to play.',
        chinese: '他做完作业后，出去玩了。',
      },
    ],
    exercises: [
      {
        question: 'When I got to the station, the train _____ already _____.',
        options: ['has, left', 'had, left', 'was, leaving', 'did, leave'],
        answer: 1,
        explanation: '火车在我到达之前就开走了，"过去的过去"用过去完成时 had left。',
      },
      {
        question: 'Look at the wet ground. It _____ last night.',
        options: ['must rain', 'must have rained', 'must rained', 'must be raining'],
        answer: 1,
        explanation: '根据湿地面推测昨晚下过雨，对过去的推测用 must have + 过去分词。',
      },
      {
        question: 'She speaks French perfectly. She _____ French.',
        options: ['must be', 'must have', 'must is', "can't be"],
        answer: 0,
        explanation: '根据她法语说得很好这一事实，对现在进行推测"她一定是法国人"，用 must be。',
      },
    ],
    tips: [
      '过去完成时的关键是理清时间先后：先发生的动作用过去完成时（had done），后发生的用一般过去时（did）。',
      'must be 表推测时语气很肯定（约90%以上的把握），如果只是"可能"则用 may/might be。',
      "must have done 是对过去的肯定推测，否定推测过去的事情用 can't have done（不可能做过）。",
    ],
  },

  128: {
    title: '复习过去完成时',
    explanation: '复习过去完成时的结构和用法，巩固 had + 过去分词表示"过去的过去"的用法。',
    rules: [
      '过去完成时结构：had + 过去分词，用于所有人称。',
      '表示在过去某一时间或动作之前已经发生或完成的动作，即"过去的过去"。',
      '常与 by the time, before, after, when, until, already, just 等词连用。',
      '过去完成时与一般过去时搭配使用：先发生的用过去完成时，后发生的用一般过去时。',
    ],
    examples: [
      {
        english: 'I had never seen such a beautiful place before I visited Guilin.',
        chinese: '在去桂林之前，我从未见过这么美丽的地方。',
      },
      {
        english: 'By the end of last year, he had learned 3,000 English words.',
        chinese: '到去年年底，他已经学了3000个英语单词。',
      },
      {
        english: 'She realized that she had made a mistake.',
        chinese: '她意识到自己犯了一个错误。',
      },
      {
        english: 'They had already eaten when I invited them to dinner.',
        chinese: '我请他们吃饭时，他们已经吃过了。',
      },
    ],
    exercises: [
      {
        question: 'After the guests _____, she cleaned the living room.',
        options: ['left', 'had left', 'have left', 'leave'],
        answer: 1,
        explanation: '客人先离开（过去的过去），然后她打扫客厅。先发生的用过去完成时 had left。',
      },
      {
        question: 'He said that he _____ the film before.',
        options: ['saw', 'has seen', 'had seen', 'sees'],
        answer: 2,
        explanation:
          '他说（过去）之前看过这部电影。看过的动作发生在"说"之前，用过去完成时 had seen。',
      },
    ],
  },

  129: {
    title: '现在进行时表将来，must be 表示推测',
    explanation:
      '学习用现在进行时表示按计划或安排即将发生的将来动作，以及进一步巩固 must be 表示推测的用法。',
    rules: [
      '现在进行时（am/is/are + -ing）可以表示按计划或安排即将发生的动作，通常与表示将来的时间状语连用，如 tonight, tomorrow, next week 等。如 "I am leaving for Beijing tomorrow."',
      '常用于现在进行时表将来的动词有：go, come, leave, arrive, start, fly, meet, stay, return 等表示位置移动或行程安排的动词。',
      '现在进行时表将来与 be going to 的区别：现在进行时强调已有具体安排和计划；be going to 强调意图或打算，可能还未做具体安排。',
      'must be 表示对现在情况的肯定推测，意为"一定是"，如 "He must be hungry after such a long journey." must be + 形容词/名词/介词短语均可。',
      'must 推测的否定形式用 can\'t be 而非 mustn\'t be。mustn\'t 表示"禁止"，不用于推测。如 "That can\'t be true."（那不可能是真的。）',
    ],
    examples: [
      {
        english: 'We are flying to Paris next Monday.',
        chinese: '我们下周一飞往巴黎。（已有安排）',
      },
      { english: 'What are you doing this evening?', chinese: '你今晚打算做什么？（问计划安排）' },
      {
        english: "The train is leaving at 6 o'clock tomorrow morning.",
        chinese: '火车明天早上六点发车。',
      },
      {
        english: "You must be joking! That can't be true.",
        chinese: '你一定在开玩笑！那不可能是真的。',
      },
      {
        english: "He isn't answering the phone. He must be sleeping.",
        chinese: '他不接电话。他一定在睡觉。',
      },
    ],
    exercises: [
      {
        question: '— What are you doing tomorrow? — I _____ my dentist at 10.',
        options: ['see', 'will see', 'am seeing', 'saw'],
        answer: 2,
        explanation: '已经有预约安排（明天10点看牙医），用现在进行时 am seeing 表示将来的计划。',
      },
      {
        question: "She's been studying all night. She _____ exhausted.",
        options: ["can't be", 'must be', 'must have', 'can be'],
        answer: 1,
        explanation: '根据她学了一整夜这一事实，肯定推测她现在一定很累，用 must be。',
      },
      {
        question: 'That _____ Mr. Brown. He has gone to America.',
        options: ['must be', "can't be", "mustn't be", 'may not be'],
        answer: 1,
        explanation: "他已经去了美国，所以那个人不可能是布朗先生。否定推测用 can't be。",
      },
    ],
    tips: [
      '不是所有动词都能用现在进行时表将来，主要用于表示位移和行程的动词（go, come, leave, arrive, fly 等）。不能说 "I am knowing him tomorrow."',
      "must be 和 can't be 是一对：must be 表示肯定的推测（一定是），can't be 表示否定的推测（不可能是）。mustn't 表示禁止，不能用于推测。",
      '现在进行时表将来和一般现在时表将来的区别：一般现在时用于时刻表等固定安排（The train leaves at 6），现在进行时用于个人计划（I am leaving at 6）。',
    ],
  },

  // ==================== 第130-144课 ====================

  130: {
    title: '复习现在进行时表将来',
    explanation:
      '现在进行时除了表示正在进行的动作外，还可以用来表示已经安排好或计划好的将来动作。这种用法通常涉及近期确定会发生的事情，常与表示将来的时间状语连用。',
    rules: [
      '现在进行时表将来时，通常表示已经安排好、计划好的近期动作，强调事情的确定性',
      '常与表示将来的时间状语连用，如 tomorrow, next week, this evening, tonight 等',
      '常用于此用法的动词有：go, come, leave, arrive, start, fly, drive, meet, stay, return 等表示位移或行程的动词',
      '与一般将来时（will/shall）的区别：现在进行时强调事先已有安排，will 强调临时决定或意愿',
    ],
    examples: [
      {
        english: 'I am meeting my friends tonight.',
        chinese: '我今晚要和朋友们见面。（已安排好）',
      },
      {
        english: 'She is flying to Paris tomorrow morning.',
        chinese: '她明天上午要飞往巴黎。（已安排好行程）',
      },
      {
        english: 'We are having dinner with the Smiths next week.',
        chinese: '我们下周要和史密斯一家吃饭。（已计划好）',
      },
      { english: "The train is leaving at six o'clock.", chinese: '火车六点钟开。（固定时刻表）' },
    ],
    exercises: [
      {
        question: 'I ______ my aunt tomorrow.（已约好）',
        options: ['will visit', 'am visiting', 'visit', 'visited'],
        answer: 1,
        explanation:
          '明天看望姑妈是已经安排好的事情，用现在进行时 am visiting 表将来，表示事先已有约定。will visit 表示临时决定，不符合语境。',
      },
      {
        question: '— What are you doing this evening? — I ______ to the cinema.',
        options: ['go', 'will go', 'am going', 'went'],
        answer: 2,
        explanation:
          '问句用现在进行时询问今晚的计划，回答也应该用现在进行时 am going，表示已经安排好的活动。',
      },
    ],
  },

  131: {
    title: '将来时，may be 和 might be',
    explanation:
      'may be 和 might be 都可以用来表示对现在或将来情况的不确定推测。may 表示的可能性较大，might 表示的可能性较小、更加不确定。两者都是情态动词 may/might 加上动词 be 的结构。',
    rules: [
      'may be 表示"可能是"，用于对现在或将来的情况进行较有把握的推测，可能性约为50%',
      'might be 表示"也许是、可能是"，语气比 may be 更加不确定和委婉，可能性约为30%',
      'may be 和 might be 后面可以接名词、形容词或介词短语作表语',
      'might be 还可以用于对现在情况的推测，语气比 may be 更加缓和客气',
      '注意区分 may be（情态动词 + be，在句中作谓语）和 maybe（副词，意为"也许"，通常放在句首）',
    ],
    examples: [
      { english: 'He may be at home now.', chinese: '他现在可能在家。（有一定可能性）' },
      { english: 'She might be a teacher.', chinese: '她也许是个老师。（不太确定）' },
      {
        english: 'They may be waiting for us at the station.',
        chinese: '他们可能正在车站等我们。',
      },
      { english: 'It might be true, but I doubt it.', chinese: '也许是真的，但我表示怀疑。' },
      {
        english: 'Maybe he is right. / He may be right.',
        chinese: '也许他是对的。（注意 maybe 是副词，may be 是谓语）',
      },
    ],
    exercises: [
      {
        question: 'She is not answering the phone. She ______ asleep.',
        options: ['maybe', 'may be', 'may is', 'can be'],
        answer: 1,
        explanation:
          '这里需要一个谓语动词结构。may be 是情态动词 may 加动词 be，在句中作谓语，表示"可能是"。maybe 是副词，通常放在句首，不能作谓语。',
      },
      {
        question: "I'm not sure where Tom is. He ______ in the garden.",
        options: ['maybe is', 'might be', 'might is', 'can is'],
        answer: 1,
        explanation:
          'might be 表示"也许是"，语气不确定，适合用于"我不确定"的语境。might 后面直接加动词原形 be，不需要 is。',
      },
      {
        question: "______ she is angry with us. She didn't say hello.",
        options: ['May be', 'Might be', 'Maybe', 'May is'],
        answer: 2,
        explanation:
          '此处需要一个副词放在句首，表示"也许"。Maybe 是副词，可以放在句首修饰整个句子。May be 和 Might be 是谓语结构，不能放在句首作副词使用。',
      },
    ],
    tips: [
      '区分 may be 和 maybe：may be 是情态动词 + 动词 be，在句中作谓语（He may be ill）；maybe 是副词，意为"也许"，通常放在句首（Maybe he is ill）',
      '在口语中，might be 比 may be 更加常用，因为语气更委婉、更客气',
      'may/might be 表示推测时，不能与 I think 或 I believe 等表达个人观点的短语连用',
    ],
  },

  132: {
    title: '复习将来时，may 和 might',
    explanation:
      'may 和 might 作为情态动词，除了表示许可外，还常用于表示对将来情况的推测和可能性。may 的可能性较大，might 的可能性较小。本单元复习这两个词在表示将来可能性时的用法。',
    rules: [
      'may + 动词原形，表示某事将来可能发生，可能性较大',
      'might + 动词原形，表示某事将来可能发生，可能性较小，语气更加不确定',
      'may not / might not 表示"可能不"，是对将来情况的否定推测',
      '在条件句中，might 常用来表示更小的可能性：If we hurry, we might catch the train.',
    ],
    examples: [
      {
        english: 'It may rain tomorrow, so take an umbrella.',
        chinese: '明天可能下雨，所以带把伞吧。',
      },
      {
        english: 'We might go to Spain for our holiday this year.',
        chinese: '我们今年也许去西班牙度假。（不太确定）',
      },
      { english: 'He may not come to the party tonight.', chinese: '他今晚可能不来参加聚会。' },
      {
        english: 'If you ask him nicely, he might agree.',
        chinese: '如果你好好跟他说，他也许会同意。',
      },
    ],
    exercises: [
      {
        question: 'Take a coat with you. It ______ cold this evening.',
        options: ['will', 'may be', 'might be', 'B and C'],
        answer: 3,
        explanation:
          'may be 和 might be 都可以表示"可能"，只是可能性大小不同。may be 可能性大些，might be 可能性小些，两者在此语境中都正确。will 表示确定会，语气过强。',
      },
      {
        question: "I haven't decided yet, but I ______ join the club.",
        options: ['might', 'will definitely', 'am going to', 'shall certainly'],
        answer: 0,
        explanation:
          '前面说"还没决定"，说明不确定，用 might（也许）最合适。will definitely、am going to 和 shall certainly 都表示较为确定的意愿或计划，与语境不符。',
      },
    ],
  },

  133: {
    title: '间接引语，时态变化',
    explanation:
      '当我们将别人的话转述给第三方时，需要使用间接引语（reported speech）。当转述动词（如 said, told）是过去时时，间接引语中的时态通常需要相应后移，这叫做"时态后移"（backshift）。',
    rules: [
      '一般现在时 → 一般过去时：He said, "I like music." → He said that he liked music.',
      '现在进行时 → 过去进行时：She said, "I am reading." → She said that she was reading.',
      '一般过去时 → 过去完成时：He said, "I saw her." → He said that he had seen her.',
      '现在完成时 → 过去完成时：She said, "I have finished." → She said that she had finished.',
      '一般将来时（will）→ 过去将来时（would）：He said, "I will go." → He said that he would go.',
    ],
    examples: [
      {
        english: '"I work in a bank," she said. → She said that she worked in a bank.',
        chinese: '"我在银行工作，"她说。→ 她说她在银行工作。',
      },
      {
        english: '"We are watching TV," they said. → They said that they were watching TV.',
        chinese: '"我们在看电视，"他们说。→ 他们说他们正在看电视。',
      },
      {
        english: '"I have lost my key," he told me. → He told me that he had lost his key.',
        chinese: '"我把钥匙弄丢了，"他告诉我。→ 他告诉我他把钥匙弄丢了。',
      },
      {
        english:
          '"I will call you tomorrow," she said. → She said that she would call me the next day.',
        chinese: '"我明天给你打电话，"她说。→ 她说她第二天会给我打电话。',
      },
      {
        english:
          '"The earth goes around the sun," the teacher said. → The teacher said that the earth goes around the sun.',
        chinese: '"地球围绕太阳转，"老师说。→ 老师说地球围绕太阳转。（客观真理不变）',
      },
    ],
    exercises: [
      {
        question: 'She said, "I like English." → She said that she ______ English.',
        options: ['likes', 'liked', 'has liked', 'is liking'],
        answer: 1,
        explanation:
          '直接引语中的一般现在时 like 在间接引语中变为一般过去时 liked，因为转述动词 said 是过去时，需要时态后移。',
      },
      {
        question: 'He said, "I am cooking dinner." → He said that he ______ dinner.',
        options: ['is cooking', 'was cooking', 'has cooked', 'cooked'],
        answer: 1,
        explanation: '直接引语中的现在进行时 am cooking 在间接引语中变为过去进行时 was cooking。',
      },
      {
        question: '"I have read this book," she told me. → She told me that she ______ that book.',
        options: ['has read', 'read', 'had read', 'reads'],
        answer: 2,
        explanation: '直接引语中的现在完成时 have read 在间接引语中变为过去完成时 had read。',
      },
    ],
    tips: [
      '如果转述动词是现在时（says, tells），间接引语中的时态不需要改变',
      '如果直接引语表达的是客观真理、科学事实或格言，时态保持不变',
      '注意时间和地点状语的变化：today → that day, yesterday → the day before, tomorrow → the next day, here → there, this → that, ago → before',
    ],
  },

  134: {
    title: '复习间接引语',
    explanation:
      '间接引语用于转述他人的话语。转述时需注意人称代词、时态以及时间地点状语的变化。本单元复习间接引语的基本用法和常见变化规则。',
    rules: [
      '转述动词用过去时（said, told）时，从句中的时态需要相应后移',
      '人称代词需根据语境进行变化：第一人称变为与说话者一致，第二人称变为与听话者一致',
      'said 后面不直接跟人称宾语（said to me），应改用 told + 人（told me, told him）',
      '间接引语通常由 that 引导，that 在口语中可以省略',
    ],
    examples: [
      {
        english: '"I am tired," Tom said. → Tom said (that) he was tired.',
        chinese: '"我累了，"汤姆说。→ 汤姆说他累了。',
      },
      {
        english:
          '"You should study harder," the teacher told me. → The teacher told me (that) I should study harder.',
        chinese: '"你应该更努力学习，"老师告诉我。→ 老师告诉我应该更努力学习。',
      },
      {
        english:
          '"We will come back tomorrow," they said. → They said (that) they would come back the next day.',
        chinese: '"我们明天回来，"他们说。→ 他们说他们第二天回来。',
      },
    ],
    exercises: [
      {
        question:
          '"I bought a new car last week," John said. → John said that he ______ a new car the week before.',
        options: ['bought', 'had bought', 'has bought', 'buys'],
        answer: 1,
        explanation:
          '直接引语中的一般过去时 bought 在间接引语中变为过去完成时 had bought。同时 last week 变为 the week before。',
      },
      {
        question: '"Can you help me?" she asked him. → She asked him if he ______ help her.',
        options: ['can', 'could', 'will', 'would'],
        answer: 1,
        explanation:
          '直接引语中的 can 在间接引语中变为 could。同时人称也要变化：you → he, me → her。',
      },
    ],
  },

  135: {
    title: '间接引语，时态一致性',
    explanation:
      '在间接引语中，从句的时态应与主句的时态保持一致。当主句使用过去时时，从句的时态需要相应后移。但有一些特殊情况需要注意，比如客观真理不受时态后移的影响。',
    rules: [
      '主句用过去时，从句也要用相应的过去时态，保持时态一致（sequence of tenses）',
      '一般过去时通常变为过去完成时：He said, "I was ill." → He said he had been ill.',
      '过去完成时不变：He said, "I had left." → He said he had left.',
      '情态动词变化：can → could, may → might, must → must/had to, will → would, shall → should',
      '客观真理、科学事实和格言在间接引语中时态不变',
    ],
    examples: [
      {
        english:
          '"I was in London last year," he said. → He said he had been in London the year before.',
        chinese: '"我去年在伦敦，"他说。→ 他说他前一年在伦敦。',
      },
      {
        english: '"I had already eaten," she told me. → She told me she had already eaten.',
        chinese: '"我已经吃过了，"她告诉我。→ 她告诉我她已经吃过了。（过去完成时不变）',
      },
      {
        english: '"I can swim very well," the boy said. → The boy said he could swim very well.',
        chinese: '"我游泳游得很好，"男孩说。→ 男孩说他游泳游得很好。',
      },
      {
        english:
          '"Water boils at 100 degrees," the teacher said. → The teacher said water boils at 100 degrees.',
        chinese: '"水在100度沸腾，"老师说。→ 老师说水在100度沸腾。（科学事实不变）',
      },
    ],
    exercises: [
      {
        question:
          'He said, "I can speak three languages." → He said he ______ speak three languages.',
        options: ['can', 'could', 'will', 'may'],
        answer: 1,
        explanation: '直接引语中的情态动词 can 在间接引语中变为 could，以保持时态一致性。',
      },
      {
        question: 'She said, "I must go now." → She said she ______ go then.',
        options: ['must', 'had to', 'has to', 'A or B'],
        answer: 3,
        explanation:
          'must 在间接引语中可以变为 had to，也可以保持不变仍用 must。所以 A 和 B 都可以接受。同时 now 变为 then。',
      },
      {
        question: 'He said, "I was writing a letter." → He said he ______ a letter.',
        options: ['was writing', 'had been writing', 'wrote', 'has written'],
        answer: 1,
        explanation:
          '直接引语中的过去进行时 was writing 在间接引语中变为过去完成进行时 had been writing，以保持时态一致性。',
      },
    ],
    tips: [
      'must 在间接引语中既可以变为 had to，也可以保持不变，两种用法都正确',
      '如果直接引语中有具体的过去年份或日期（如 in 1990），时态有时可以不变',
      '在口语中，时态后移的规则有时不被严格遵守，但在正式写作和考试中应严格遵守',
    ],
  },

  136: {
    title: '复习间接引语和时态变化',
    explanation:
      '本单元综合复习间接引语中的时态变化规则，包括各种时态的后移、情态动词的变化以及时间状语的转换。熟练掌握这些规则是正确使用间接引语的关键。',
    rules: [
      '时态后移总结：一般现在时→一般过去时，现在进行时→过去进行时，一般过去时→过去完成时，现在完成时→过去完成时，一般将来时→过去将来时',
      '情态动词变化总结：can→could, may→might, will→would, shall→should, must→had to/must',
      '时间状语变化：now→then, today→that day, yesterday→the day before, tomorrow→the next day, last week→the week before, next month→the following month, ago→before',
    ],
    examples: [
      {
        english: '"I saw him yesterday," she said. → She said she had seen him the day before.',
        chinese: '"我昨天见到他了，"她说。→ 她说她前一天见到他了。',
      },
      {
        english:
          '"We are going to move next month," they said. → They said they were going to move the following month.',
        chinese: '"我们下个月要搬家，"他们说。→ 他们说他们下一个月要搬家。',
      },
      {
        english:
          '"I will be back in two days," he told us. → He told us he would be back in two days.',
        chinese: '"我两天后回来，"他告诉我们。→ 他告诉我们他两天后回来。',
      },
    ],
    exercises: [
      {
        question:
          '"I have been studying English for three years," she said. → She said she ______ English for three years.',
        options: ['has been studying', 'had been studying', 'was studying', 'studied'],
        answer: 1,
        explanation:
          '直接引语中的现在完成进行时 have been studying 在间接引语中变为过去完成进行时 had been studying。',
      },
      {
        question:
          '"I arrived here two days ago," the man said. → The man said he had arrived ______ two days ______.',
        options: ['here; ago', 'there; before', 'here; before', 'there; ago'],
        answer: 1,
        explanation: 'here 变为 there，ago 变为 before。间接引语中时间和地点词都需要相应改变。',
      },
    ],
  },

  137: {
    title: '条件句（第二条件句）',
    explanation:
      '第二条件句（the second conditional）用于表示与现在事实相反的假设，或者将来不太可能发生的情况。它由 if 引导的条件从句（过去式）和主句（would + 动词原形）组成。',
    rules: [
      '第二条件句的基本结构：If + 主语 + 过去式 ..., 主语 + would/could/might + 动词原形 ...',
      '第二条件句表示与现在事实相反或将来不太可能实现的假设情况',
      'if 从句中的 be 动词在正式英语中一律用 were，不论主语是什么人称（If I were you ...）',
      '第二条件句也可以表示将来可能发生但不太可能的事情，此时与第一条件句有区别',
      '主句中的 would 可以根据语境替换为 might（也许）或 could（能够），表示不同程度的确定性和能力',
    ],
    examples: [
      {
        english: 'If I were you, I would accept the offer.',
        chinese: '如果我是你，我会接受这个提议。（与现在事实相反）',
      },
      {
        english: 'If I had a million dollars, I would buy a big house.',
        chinese: '如果我有一百万美元，我会买一栋大房子。（不太可能实现）',
      },
      {
        english: 'If it rained tomorrow, we would stay at home.',
        chinese: '如果明天下雨的话，我们就待在家里。（可能性较小）',
      },
      {
        english: 'If she could fly, she would travel around the world.',
        chinese: '如果她能飞，她会环游世界。（完全不可能）',
      },
      {
        english: 'If I knew his number, I could call him.',
        chinese: '如果我知道他的号码，我就能给他打电话。（与现在事实相反）',
      },
    ],
    exercises: [
      {
        question: 'If I ______ rich, I would travel around the world.',
        options: ['am', 'was', 'were', 'will be'],
        answer: 2,
        explanation:
          '在第二条件句的 if 从句中，be 动词在正式英语中一律用 were，不论主语是什么人称。If I were rich 表示与现在事实相反的假设。',
      },
      {
        question: 'If she had more time, she ______ learn to paint.',
        options: ['will', 'would', 'can', 'is going to'],
        answer: 1,
        explanation:
          '第二条件句的主句使用 would + 动词原形。if 从句用了过去式 had，主句应用 would learn。',
      },
      {
        question: '第二条件句表达的是：',
        options: [
          '一定会发生的事情',
          '与现在事实相反或不太可能的假设',
          '过去已经发生的事情',
          '正在进行的动作',
        ],
        answer: 1,
        explanation:
          '第二条件句用于表示与现在事实相反的假设（如 If I were you）或将来不太可能发生的情况（如 If it snowed in July）。',
      },
    ],
    tips: [
      '第一条件句（if + 现在时, will + 动词原形）表示可能发生的真实条件；第二条件句（if + 过去式, would + 动词原形）表示不真实或不太可能的假设条件',
      '"If I were you, I would ..." 是非常常用的表达，用来给别人提建议',
      '在口语中，if 从句中的 was 也经常被使用（If I was you），但在正式写作和考试中建议用 were',
    ],
  },

  138: {
    title: '复习条件句',
    explanation:
      '本单元复习第一条件句和第二条件句的用法与区别。第一条件句用于表示可能发生的真实条件，第二条件句用于表示与事实相反或不太可能的假设条件。',
    rules: [
      '第一条件句（真实条件句）：If + 现在时, will + 动词原形。表示可能发生的情况及其结果',
      '第二条件句（虚拟条件句）：If + 过去式, would + 动词原形。表示与现在事实相反或不太可能的假设',
      '两种条件句的选择取决于说话人认为事情发生的可能性大小',
      '在 if 从句中不用 will/would，将来意义通过主句中的 will/would 来体现',
    ],
    examples: [
      {
        english: 'If it rains, we will stay at home.',
        chinese: '如果下雨，我们就待在家里。（第一条件句，可能发生）',
      },
      {
        english: 'If it rained, we would stay at home.',
        chinese: '如果下雨的话，我们就待在家里。（第二条件句，可能性小）',
      },
      {
        english: 'If you study hard, you will pass the exam.',
        chinese: '如果你努力学习，你会通过考试。（真实条件）',
      },
      {
        english: 'If you studied harder, you would pass the exam.',
        chinese: '如果你更努力学习的话，你就会通过考试。（暗示现在不够努力）',
      },
    ],
    exercises: [
      {
        question: 'If I ______ a bird, I would fly to you.',
        options: ['am', 'was', 'were', 'will be'],
        answer: 2,
        explanation:
          '这是第二条件句，表示与事实相反的假设（人不可能是鸟）。if 从句中 be 动词一律用 were。',
      },
      {
        question: 'If he comes tomorrow, I ______ him the news.',
        options: ['would tell', 'will tell', 'told', 'had told'],
        answer: 1,
        explanation:
          '这是第一条件句（if 从句用了一般现在时 comes），主句应用 will + 动词原形，表示可能发生的真实情况。',
      },
    ],
  },

  139: {
    title: '间接引语，疑问句的转述',
    explanation:
      '当转述疑问句时，需要将其变为间接疑问句。间接疑问句使用陈述语序（主语 + 谓语），而不是疑问语序。一般疑问句用 if 或 whether 引导，特殊疑问句保留原来的疑问词引导。',
    rules: [
      '一般疑问句变为间接引语时，用 if 或 whether 引导，并将语序改为陈述语序（主语 + 谓语）',
      '特殊疑问句变为间接引语时，保留原来的疑问词（what, where, when, why, how 等），语序改为陈述语序',
      '间接疑问句中不再使用助动词 do/does/did 来构成疑问，时态直接体现在动词形式上',
      '转述动词常用 asked, wondered, wanted to know 等，时态同样需要后移',
      '如果疑问句中有 please，转述时应去掉，因为间接引语不是直接对话',
    ],
    examples: [
      {
        english: 'He asked, "Are you a student?" → He asked if/whether I was a student.',
        chinese: '他问："你是学生吗？" → 他问我是否是学生。',
      },
      {
        english: 'She asked, "Where do you live?" → She asked where I lived.',
        chinese: '她问："你住在哪儿？" → 她问我住在哪里。',
      },
      {
        english: '"What time does the train leave?" he asked. → He asked what time the train left.',
        chinese: '"火车几点开？"他问。→ 他问火车几点开。',
      },
      {
        english: 'Tom asked, "Can you swim?" → Tom asked if/whether I could swim.',
        chinese: '汤姆问："你会游泳吗？" → 汤姆问我是否会游泳。',
      },
      {
        english:
          '"Why are you crying?" she asked the girl. → She asked the girl why she was crying.',
        chinese: '"你为什么哭？"她问那个女孩。→ 她问那个女孩为什么哭。',
      },
    ],
    exercises: [
      {
        question: '"Where are you from?" he asked me. → He asked me where I ______ from.',
        options: ['am', 'was', 'were', 'come'],
        answer: 1,
        explanation:
          '特殊疑问句变为间接引语时保留疑问词 where，语序改为陈述语序，时态由 are 后移为 was（主语是 I）。',
      },
      {
        question: '"Do you like coffee?" she asked. → She asked if I ______ coffee.',
        options: ['like', 'liked', 'likes', 'do like'],
        answer: 1,
        explanation:
          '一般疑问句变为间接引语时用 if 引导，去掉助动词 do，时态由一般现在时 like 后移为一般过去时 liked。',
      },
      {
        question:
          '"What time does the film start?" he asked. → He asked what time the film ______.',
        options: ['starts', 'started', 'does start', 'did start'],
        answer: 1,
        explanation:
          '特殊疑问句变为间接引语时保留疑问词 what time，去掉助动词 does，时态后移为过去时 started。',
      },
    ],
    tips: [
      '间接疑问句最容易犯的错误是保留了疑问语序，如 He asked where did I live 是错误的，应为 He asked where I lived',
      'whether 比 if 更正式，在以下情况只能用 whether 不能用 if：介词后面（about whether）、跟 or not 连用时（whether or not）、不定式前（whether to go）',
      '间接疑问句在句中可以做宾语，也可以做主语：What he said is true.（他所说的是真的）',
    ],
  },

  140: {
    title: '复习间接疑问句',
    explanation:
      '本单元复习间接疑问句的用法，包括一般疑问句和特殊疑问句的转述方式。重点掌握陈述语序的使用和时态后移规则。',
    rules: [
      '间接疑问句一律使用陈述语序：主语 + 谓语（+ 宾语），不再使用疑问语序',
      '一般疑问句用 if 或 whether 引导，特殊疑问句保留原来的疑问词（what, who, where, when, why, how 等）',
      '间接疑问句中的时态随主句时态变化：主句过去时，从句时态后移',
      '间接疑问句常作动词 ask, wonder, want to know, tell me, know 等的宾语',
    ],
    examples: [
      { english: 'I wonder where she lives.', chinese: '我想知道她住在哪里。（陈述语序）' },
      {
        english: 'Can you tell me how old you are?',
        chinese: '你能告诉我你多大了吗？（陈述语序，不是 how old are you）',
      },
      {
        english: 'She asked whether I had been to Paris.',
        chinese: '她问我是否去过巴黎。（一般疑问句的间接形式）',
      },
      {
        english: 'Do you know what time it is?',
        chinese: '你知道现在几点了吗？（陈述语序，不是 what time is it）',
      },
    ],
    exercises: [
      {
        question: '"Is he a doctor?" she asked. → She asked ______ he was a doctor.',
        options: ['that', 'if', 'what', 'does'],
        answer: 1,
        explanation:
          '一般疑问句变为间接引语时用 if（或 whether）引导，表示"是否"。that 用于陈述句的转述。',
      },
      {
        question:
          '"How long have you lived here?" he asked me. → He asked me how long I ______ there.',
        options: ['have lived', 'had lived', 'lived', 'live'],
        answer: 1,
        explanation:
          '直接引语中的现在完成时 have lived 在间接引语中变为过去完成时 had lived。同时 here 变为 there。',
      },
    ],
  },

  141: {
    title: '被动语态',
    explanation:
      '被动语态（passive voice）用于强调动作的承受者而非执行者。当动作的执行者不重要、不知道是谁、或者想要突出承受者时，使用被动语态。被动语态的基本结构是"be + 过去分词"。',
    rules: [
      '被动语态的基本结构：主语 + be + 过去分词（+ by + 执行者）',
      '一般现在时的被动语态：am/is/are + 过去分词（English is spoken here.）',
      '一般过去时的被动语态：was/were + 过去分词（The window was broken yesterday.）',
      '现在进行时的被动语态：am/is/are being + 过去分词（The house is being painted.）',
      '一般将来时的被动语态：will be + 过去分词（The work will be finished tomorrow.）',
    ],
    examples: [
      {
        english: 'English is spoken in many countries.',
        chinese: '英语在许多国家被使用。（一般现在时被动）',
      },
      {
        english: 'The window was broken by the boy.',
        chinese: '窗户被那个男孩打破了。（一般过去时被动）',
      },
      {
        english: 'This bridge was built in 1990.',
        chinese: '这座桥建于1990年。（执行者不重要，省略 by 短语）',
      },
      {
        english: 'These cars are made in Germany.',
        chinese: '这些汽车是在德国制造的。（一般现在时被动）',
      },
      {
        english: 'A new hospital will be built next year.',
        chinese: '明年将建一座新医院。（一般将来时被动）',
      },
    ],
    exercises: [
      {
        question: 'This song ______ by a famous singer last night.',
        options: ['sang', 'was sung', 'is sung', 'sings'],
        answer: 1,
        explanation:
          '主语 This song 是动作的承受者，last night 表示过去时间，所以用一般过去时的被动语态 was sung。',
      },
      {
        question: 'English ______ in many countries around the world.',
        options: ['speaks', 'is spoken', 'spoke', 'is speaking'],
        answer: 1,
        explanation:
          'English 是"被使用"的，是动作的承受者。句子表达的是一般性的事实，用一般现在时的被动语态 is spoken。',
      },
      {
        question: '主动句 "They clean the room every day." 变为被动语态：',
        options: [
          'The room is cleaned every day.',
          'The room was cleaned every day.',
          'The room cleans every day.',
          'The room is cleaning every day.',
        ],
        answer: 0,
        explanation:
          '原句是一般现在时，被动语态也用一般现在时。The room 作主语，be 用 is，clean 的过去分词是 cleaned。by them 可省略。',
      },
    ],
    tips: [
      '不及格动词（如 happen, occur, die, arrive 等）没有被动语态',
      '当动作执行者不重要或不清楚时，by 短语通常省略',
      '有些动词有两种过去分词形式，注意使用正确：如 light → lit/lighted, hang → hung（悬挂）/ hanged（绞死）',
    ],
  },

  142: {
    title: '复习被动语态',
    explanation:
      '本单元复习被动语态在不同时态中的用法，以及主动语态和被动语态之间的转换。掌握各种时态下被动语态的正确形式是流利使用英语的重要基础。',
    rules: [
      '一般现在时被动：am/is/are + 过去分词；一般过去时被动：was/were + 过去分词',
      '含情态动词的被动语态：情态动词 + be + 过去分词（can be done, must be finished）',
      '主动句变被动句的方法：宾语变主语，主语变 by + 宾语，动词变为 be + 过去分词',
      '双宾语动词（如 give, tell, show, teach）变被动时，两个宾语都可以作主语',
    ],
    examples: [
      {
        english: 'They clean the classroom every day. → The classroom is cleaned every day.',
        chinese: '他们每天打扫教室。→ 教室每天被打扫。',
      },
      {
        english: 'Someone stole my bicycle. → My bicycle was stolen.',
        chinese: '有人偷了我的自行车。→ 我的自行车被偷了。',
      },
      {
        english: 'You must finish this work today. → This work must be finished today.',
        chinese: '你今天必须完成这项工作。→ 这项工作今天必须完成。',
      },
      {
        english: 'He gave me a book. → I was given a book. / A book was given to me.',
        chinese: '他给了我一本书。→ 我被给了一本书。/ 一本书被给了我。',
      },
    ],
    exercises: [
      {
        question: 'This kind of rice ______ in the south of China.',
        options: ['grows', 'is grown', 'grew', 'is growing'],
        answer: 1,
        explanation:
          'rice（水稻）是被种植的，是动作的承受者。句子描述的是普遍事实，用一般现在时的被动语态 is grown。',
      },
      {
        question: 'The bridge ______ in 1990.',
        options: ['built', 'was built', 'is built', 'builds'],
        answer: 1,
        explanation:
          'bridge（桥）是被建造的，in 1990 表示过去时间，用一般过去时的被动语态 was built。',
      },
    ],
  },

  143: {
    title: '被动语态，used to',
    explanation:
      'used to 是一个重要的语法结构，用来表示过去经常发生的动作或存在的状态，但现在已不再如此。它只用于过去时态，后面跟动词原形。本单元同时学习 used to 与被动语态的结合使用。',
    rules: [
      'used to + 动词原形，表示过去经常发生的动作或存在的状态，暗示现在已经不再如此',
      "used to 的否定形式：didn't use to + 动词原形（口语常用）或 used not to + 动词原形（较正式）",
      'used to 的疑问形式：Did + 主语 + use to + 动词原形 ...?（口语常用）',
      '区分 used to do sth.（过去常常做某事）和 be used to doing sth.（习惯于做某事）：前者 to 是不定式符号，后者 to 是介词',
      '被动语态与 used to 结合：used to be + 过去分词，表示"过去常常被......"',
    ],
    examples: [
      {
        english: 'He used to smoke every day, but now he has given it up.',
        chinese: '他过去每天抽烟，但现在戒了。',
      },
      {
        english: "This building used to be a school, but now it's a hospital.",
        chinese: '这座建筑以前是一所学校，现在是医院。',
      },
      {
        english: "I didn't use to get up early, but now I'm used to getting up at six.",
        chinese: '我过去不早起，但现在习惯了六点起床。',
      },
      {
        english: 'This river used to be very clean, but now it is polluted.',
        chinese: '这条河过去很干净，但现在被污染了。（used to 与被动语态结合）',
      },
      {
        english: 'Did you use to play football when you were at school?',
        chinese: '你上学的时候经常踢足球吗？',
      },
    ],
    exercises: [
      {
        question: "This place ______ a factory, but now it's a park.",
        options: ['used to', 'used to be', 'was used to', 'use to be'],
        answer: 1,
        explanation:
          '表示"过去是"，用 used to be。used to 后面必须跟动词原形 be，不能只有 used to。was used to 表示"习惯于"，意义不符。',
      },
      {
        question: 'She ______ tennis, but now she prefers swimming.',
        options: ['used to play', 'is used to playing', 'used to playing', 'uses to play'],
        answer: 0,
        explanation:
          '表示过去常常打网球（但现在不了），用 used to play。is used to playing 表示"习惯于打"，与语境不符。',
      },
      {
        question: 'He ______ like coffee, but now he drinks it every day.',
        options: ["didn't used to", "didn't use to", "usedn't", "doesn't use to"],
        answer: 1,
        explanation:
          "used to 的否定形式用 didn't use to（注意 use 不加 d），这是现代英语中最常用也最标准的否定形式。",
      },
    ],
    tips: [
      'used to 只用于过去时态，没有现在时形式。如果要表达现在的习惯，用 usually 或一般现在时',
      '注意区分：used to do（过去常常做）, be used to doing（习惯于做）, be used to do（被用来做——被动语态）',
      "在否定句和疑问句中，used 变为 use（去掉 d）：didn't use to, Did ... use to ...?",
    ],
  },
  144: {
    title: '被动语态（各种时态）',
    explanation: '被动语态可以用于各种时态，通过改变be动词的形式来体现。',
    rules: [
      '一般现在时：am/is/are + done',
      '一般过去时：was/were + done',
      '现在完成时：have/has been + done',
      '一般将来时：will be + done',
      '情态动词：can/should be + done',
    ],
    examples: [
      { english: 'This letter was written yesterday.', chinese: '这封信是昨天写的。' },
      { english: 'The work has been finished.', chinese: '工作已经完成了。' },
      { english: 'The meeting will be held tomorrow.', chinese: '会议明天举行。' },
      { english: 'English is spoken all over the world.', chinese: '全世界都说英语。' },
    ],
    exercises: [
      {
        question: 'The homework _____ by the students.',
        options: ['has been finished', 'has finished', 'have been finished', 'finished'],
        answer: 0,
        explanation: 'homework是不可数名词，用has；是"被完成"，用被动语态has been finished。',
      },
    ],
  },
};
