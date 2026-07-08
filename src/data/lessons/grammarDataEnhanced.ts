/**
 * 新概念英语第一册 - 增强版语法详解数据（完整144课）
 * 严格对应新概念英语第一册（New Concept English 1）144课实际教学内容
 *
 * 课程结构：
 * - 单数课（1, 3, 5...143）：新课（引入新语法点）
 * - 双数课（2, 4, 6...144）：复习课（练习和巩固前一课语法）
 *
 * 语法体系分为三个阶段：
 * 第一阶段（第1-48课）：基础入门 - be动词、一般现在时、现在进行时、一般过去时、情态动词
 * 第二阶段（第49-96课）：中级语法 - 第三人称单数、频率副词、现在完成时、一般将来时、物主代词
 * 第三阶段（第97-144课）：高级语法 - 间接引语、比较级、定语从句、虚拟语气、被动语态
 */

import { GrammarDetail } from '../../types/lesson';

export const grammarDataEnhanced: Record<number, GrammarDetail> = {
  // ==================== 第1课：be动词的肯定式 ====================
  1: {
    title: 'be动词的肯定式',
    subtitle: 'I am, You are, He is',
    explanation:
      'be动词是英语中最基本的动词，表示"是"或"在"。根据主语的人称和数不同，be动词有三种形式：am、is、are。第一人称单数I用am，第二人称you用are，第三人称单数he/she/it用is，复数主语用are。掌握be动词是学习英语的第一步！',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'be动词搭配表',
          headers: ['主语', 'be动词', '缩写形式', '例句'],
          rows: [
            ['I', 'am', "I'm", "I'm a student."],
            ['You', 'are', "You're", "You're my friend."],
            ['He / She / It', 'is', "He's / She's / It's", "He's a teacher."],
            ['We / You / They', 'are', "We're / You're / They're", "We're friends."],
          ],
        },
      },
    ],
    rules: [
      '第一人称单数 I 后用 am',
      '第二人称 you 后用 are',
      '第三人称单数 he/she/it 后用 is',
      '复数主语（we/you/they）后用 are',
      '口诀：我用am，你用are，is连着他她它',
    ],
    examples: [
      { english: 'I am a student.', chinese: '我是一名学生。', grammarPoint: 'I + am' },
      { english: 'You are my friend.', chinese: '你是我的朋友。', grammarPoint: 'You + are' },
      { english: 'He is a teacher.', chinese: '他是一位老师。', grammarPoint: 'He + is' },
      { english: 'She is a nurse.', chinese: '她是一名护士。', grammarPoint: 'She + is' },
      { english: 'It is a cat.', chinese: '它是一只猫。', grammarPoint: 'It + is' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ a student.',
        options: ['am', 'is', 'are', 'be'],
        answer: 0,
        explanation: '主语是I，第一人称单数用am。',
        hint: '记住口诀：我用am',
      },
      {
        type: 'choice',
        question: 'She _____ my sister.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: '主语是She（第三人称单数），用is。',
        hint: '第三人称单数',
      },
      {
        type: 'choice',
        question: 'They _____ friends.',
        options: ['am', 'is', 'are', 'be'],
        answer: 2,
        explanation: '主语是They（复数），用are。',
        hint: '复数主语',
      },
      {
        type: 'fill',
        question: 'He _____ a doctor.',
        fillAnswer: 'is',
        explanation: 'He是第三人称单数，用is。',
        hint: '他是一位医生',
      },
    ],
    tips: [
      '记住口诀：我用am，你用are，is连着他她它',
      "缩写形式在口语中更常用：I'm, You're, He's",
      'be动词根据主语变化，不是根据后面的名词变化',
    ],
    relatedLessons: [2, 3],
    difficulty: 'easy',
    keywords: ['be动词', 'am', 'is', 'are', '肯定句'],
  },

  // ==================== 第2课：复习：be动词一般疑问句练习 ====================
  2: {
    title: '复习：be动词一般疑问句练习',
    subtitle: 'Is this...? Are you...?',
    explanation:
      '将be动词（am/is/are）提到主语前面，就能把肯定句变成一般疑问句。回答时用Yes或No开头。这是英语中最基本的疑问句形式，必须熟练掌握！',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '一般疑问句构成',
          formula: 'Be动词 + 主语 + 其他？ → Yes, 主语 + be. / No, 主语 + be + not.',
          examples: [
            "Is this your handbag? → Yes, it is. / No, it isn't.",
            "Are you a student? → Yes, I am. / No, I'm not.",
          ],
        },
      },
    ],
    rules: [
      '一般疑问句：将be动词提前到句首',
      '肯定回答：Yes, 主语 + be动词.',
      '否定回答：No, 主语 + be动词 + not.',
      '问句中this/it的回答用it',
    ],
    examples: [
      { english: 'Is this your book?', chinese: '这是你的书吗？', grammarPoint: 'Is + this...' },
      { english: 'Yes, it is.', chinese: '是的，它是。', grammarPoint: '肯定回答' },
      { english: "No, it isn't.", chinese: '不，它不是。', grammarPoint: '否定回答' },
      { english: 'Are you a teacher?', chinese: '你是老师吗？', grammarPoint: 'Are + you...' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ this your coat?',
        options: ['Am', 'Is', 'Are', 'Be'],
        answer: 1,
        explanation: '主语this是第三人称单数，用Is。',
        hint: 'this是第三人称单数',
      },
      {
        type: 'choice',
        question: 'Yes, it _____.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: '回答中主语it是第三人称单数，用is。',
        hint: 'it对应is',
      },
      {
        type: 'choice',
        question: '_____ you a student?',
        options: ['Am', 'Is', 'Are', 'Be'],
        answer: 2,
        explanation: '主语you用are。',
        hint: 'you用are',
      },
      {
        type: 'fill',
        question: 'No, I _____ not a teacher.',
        fillAnswer: 'am',
        explanation: '主语I的否定回答用am not。',
        hint: 'I用am',
      },
    ],
    tips: [
      '一般疑问句的语序：be动词 + 主语 + 其他',
      "Is this...? 的回答用 Yes, it is. / No, it isn't.",
      "Are you...? 的回答用 Yes, I am. / No, I'm not.",
    ],
    relatedLessons: [1, 3],
    difficulty: 'easy',
    keywords: ['一般疑问句', 'Is this', 'Are you', 'Yes/No回答'],
  },

  // ==================== 第3课：be动词的否定式 ====================
  3: {
    title: 'be动词的否定式',
    subtitle: 'I am not, He is not',
    explanation:
      '在be动词后面加上not就构成了否定句。am not没有缩写形式，is not缩写为isn\'t，are not缩写为aren\'t。否定句用来表达"不是"的意思。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'be动词否定式',
          headers: ['肯定式', '否定式（完全形式）', '否定式（缩写形式）'],
          rows: [
            ['I am...', 'I am not...', '（无缩写）'],
            ['You are...', 'You are not...', "You aren't..."],
            ['He/She/It is...', 'He/She/It is not...', "He/She/It isn't..."],
            ['We/They are...', 'We/They are not...', "We/They aren't..."],
          ],
        },
      },
    ],
    rules: [
      '否定式：主语 + be动词 + not + 其他',
      'am not 没有标准缩写形式',
      "is not = isn't",
      "are not = aren't",
    ],
    examples: [
      { english: 'I am not a teacher.', chinese: '我不是老师。', grammarPoint: 'am not' },
      { english: "He isn't a doctor.", chinese: '他不是医生。', grammarPoint: "isn't" },
      { english: "They aren't students.", chinese: '他们不是学生。', grammarPoint: "aren't" },
      { english: "It isn't my car.", chinese: '这不是我的车。', grammarPoint: "isn't" },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ a teacher.',
        options: ['am not', "isn't", "aren't", 'not am'],
        answer: 0,
        explanation: 'I的否定形式是am not。',
        hint: 'I用am',
      },
      {
        type: 'choice',
        question: 'He _____ happy.',
        options: ["isn't", "aren't", 'am not', 'not'],
        answer: 0,
        explanation: "He是第三人称单数，否定形式是isn't。",
        hint: '第三人称单数',
      },
      {
        type: 'fill',
        question: 'They _____ French.',
        fillAnswer: "aren't",
        explanation: "They的否定形式是aren't。",
        hint: '复数主语',
      },
      {
        type: 'fill',
        question: 'She _____ a nurse.',
        fillAnswer: "isn't",
        explanation: "She是第三人称单数，否定形式是isn't。",
        hint: '第三人称单数',
      },
    ],
    tips: [
      "am not没有标准缩写，不要写成amn't",
      "isn't = is not，aren't = are not",
      '否定句语序：主语 + be + not + 其他',
    ],
    relatedLessons: [1, 2, 4],
    difficulty: 'easy',
    keywords: ['否定句', "isn't", "aren't", 'am not'],
  },

  // ==================== 第4课：复习：名词单复数练习 ====================
  4: {
    title: '复习：名词单复数练习',
    subtitle: 'a pen → pens, a dress → dresses',
    explanation:
      '英语中名词有单数和复数之分。单数名词前可以加a/an，复数名词通常在词尾加-s或-es。掌握名词单复数变化规则是英语学习的重要基础。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '名词复数变化规则',
          headers: ['规则', '方法', '例子'],
          rows: [
            ['一般情况', '加 -s', 'book → books, pen → pens'],
            ['以s, x, sh, ch结尾', '加 -es', 'dress → dresses, box → boxes'],
            ['以辅音字母+y结尾', '变y为i加 -es', 'family → families'],
            ['以f/fe结尾', '变f/fe为v加 -es', 'knife → knives'],
            ['不规则变化', '特殊记忆', 'man → men, foot → feet'],
          ],
        },
      },
    ],
    rules: [
      '一般名词在词尾加 -s',
      '以s, x, sh, ch结尾的名词加 -es',
      '以辅音字母+y结尾，变y为i再加 -es',
      '不规则名词需要单独记忆',
    ],
    examples: [
      { english: 'a pen → two pens', chinese: '一支钢笔 → 两支钢笔', grammarPoint: '加-s' },
      { english: 'a dress → three dresses', chinese: '一条裙子 → 三条裙子', grammarPoint: '加-es' },
      { english: 'a box → four boxes', chinese: '一个盒子 → 四个盒子', grammarPoint: '加-es' },
      { english: 'a man → two men', chinese: '一个男人 → 两个男人', grammarPoint: '不规则' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'There are three _____ on the desk.',
        options: ['book', 'books', 'bookes', 'a book'],
        answer: 1,
        explanation: 'book是普通名词，复数加-s变成books。',
        hint: '一般加-s',
      },
      {
        type: 'choice',
        question: 'I have two _____.',
        options: ['dress', 'dresss', 'dresses', 'dreesses'],
        answer: 2,
        explanation: 'dress以s结尾，复数加-es变成dresses。',
        hint: '以s结尾加-es',
      },
      {
        type: 'fill',
        question: 'Five _____ are in the room.',
        fillAnswer: 'boxes',
        explanation: 'box以x结尾，复数加-es变成boxes。',
        hint: '以x结尾',
      },
      {
        type: 'fill',
        question: 'There are many _____ in the park.',
        fillAnswer: 'men',
        explanation: 'man的复数是不规则变化men。',
        hint: '不规则变化',
      },
    ],
    tips: [
      '名词复数加-s后，发音有/s/、/z/、/ɪz/三种',
      '不规则名词要单独记忆：man→men, woman→women, child→children',
      '不可数名词没有复数形式：water, milk, bread',
    ],
    relatedLessons: [3, 5],
    difficulty: 'easy',
    keywords: ['名词复数', '单数', '复数', '-s', '-es'],
  },

  // ==================== 第5课：特殊疑问句（what） ====================
  5: {
    title: '特殊疑问句（what）',
    subtitle: "What's your name?",
    explanation:
      '特殊疑问句以疑问词（what, who, how等）开头，用来询问具体信息。what用来问"什么"。特殊疑问句不能用Yes/No回答，需要给出具体信息。语序为：疑问词 + be动词 + 主语 + 其他？',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'What疑问句结构',
          formula: 'What + be动词 + 主语 + 其他？ → 主语 + be动词 + 具体信息.',
          examples: ["What's your name? → My name is Tom.", "What is this? → It's a book."],
        },
      },
    ],
    rules: [
      '特殊疑问句以疑问词what开头',
      '语序：What + be动词 + 主语 + 其他？',
      "What's = What is",
      '回答时直接给出具体信息，不用Yes/No',
    ],
    examples: [
      { english: "What's your name?", chinese: '你叫什么名字？', grammarPoint: "What's + 名词" },
      { english: 'My name is Tom.', chinese: '我叫汤姆。', grammarPoint: '具体回答' },
      { english: 'What is this?', chinese: '这是什么？', grammarPoint: 'What is + 代词' },
      { english: "It's a handbag.", chinese: '这是一个手提包。', grammarPoint: '具体回答' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ your name?',
        options: ['What', "What's", 'What are', 'What am'],
        answer: 1,
        explanation: "询问名字用What's your name? What's = What is。",
        hint: '缩写形式',
      },
      {
        type: 'choice',
        question: 'My name _____ Alice.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: 'My name是第三人称单数，用is。',
        hint: 'name是第三人称单数',
      },
      {
        type: 'fill',
        question: '_____ is this? It is a book.',
        fillAnswer: 'What',
        explanation: '询问"什么"用What。',
        hint: '问"什么"',
      },
      {
        type: 'fill',
        question: '_____ your phone number? It is 123456.',
        fillAnswer: "What's",
        explanation: "询问电话号码用What's your phone number?",
        hint: '电话号码',
      },
    ],
    tips: [
      '特殊疑问句不能用Yes/No回答',
      "What's 是 What is 的缩写",
      '回答特殊疑问句要给出具体信息',
    ],
    relatedLessons: [4, 6],
    difficulty: 'easy',
    keywords: ['特殊疑问句', 'what', "What's", '名字'],
  },

  // ==================== 第6课：复习：特殊疑问句（what make）练习 ====================
  6: {
    title: '复习：特殊疑问句（what make）练习',
    subtitle: 'What make is your car?',
    explanation:
      'What make用来询问品牌或制造商。结构为：What make + be动词 + 主语？这是what疑问句的扩展用法，用来询问具体的牌子、型号等信息。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'What make疑问句',
          formula: 'What make + be动词 + 主语？ → 主语 + be动词 + 品牌/型号.',
          examples: [
            "What make is your car? → It's a Ford.",
            "What make is your watch? → It's a Rolex.",
          ],
        },
      },
    ],
    rules: [
      'What make 用来询问品牌、制造商',
      '结构：What make + be + 主语？',
      '回答直接给出品牌名称',
      'make在此处是名词，意为"品牌、型号"',
    ],
    examples: [
      {
        english: 'What make is your car?',
        chinese: '你的车是什么牌子的？',
        grammarPoint: 'What make',
      },
      { english: "It's a Volvo.", chinese: '是沃尔沃的。', grammarPoint: '回答品牌' },
      {
        english: 'What make is his computer?',
        chinese: '他的电脑是什么牌子的？',
        grammarPoint: 'What make',
      },
      { english: "It's a Dell.", chinese: '是戴尔的。', grammarPoint: '回答品牌' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ make is your car?',
        options: ['What', 'Which', 'How', 'Where'],
        answer: 0,
        explanation: '询问品牌用What make。',
        hint: '问品牌',
      },
      {
        type: 'choice',
        question: 'It _____ a Toyota.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: 'It是第三人称单数，用is。',
        hint: 'It用is',
      },
      {
        type: 'fill',
        question: "_____ make is her dress? It's Chanel.",
        fillAnswer: 'What',
        explanation: '询问品牌用What make。',
        hint: '问品牌',
      },
      {
        type: 'fill',
        question: 'It _____ a Mercedes.',
        fillAnswer: 'is',
        explanation: 'It是第三人称单数，用is。',
        hint: 'It + be',
      },
    ],
    tips: [
      'What make = 什么牌子',
      'What colour = 什么颜色（后面会学到）',
      'What time = 什么时间（后面会学到）',
    ],
    relatedLessons: [5, 7],
    difficulty: 'easy',
    keywords: ['What make', '品牌', '型号', '特殊疑问句'],
  },

  // ==================== 第7课：形容词性物主代词 ====================
  7: {
    title: '形容词性物主代词',
    subtitle: 'my, your, his, her',
    explanation:
      '形容词性物主代词用来表示所属关系，意思是"谁的"。它们必须放在名词前面修饰名词，不能单独使用。my=我的，your=你的，his=他的，her=她的，its=它的，our=我们的，their=他们的。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '形容词性物主代词',
          headers: ['人称', '物主代词', '例句'],
          rows: [
            ['I →', 'my', 'This is my book.'],
            ['You →', 'your', 'Is this your coat?'],
            ['He →', 'his', 'That is his car.'],
            ['She →', 'her', 'This is her handbag.'],
            ['It →', 'its', 'The cat eats its food.'],
            ['We →', 'our', 'This is our classroom.'],
            ['They →', 'their', 'Those are their tickets.'],
          ],
        },
      },
    ],
    rules: [
      '形容词性物主代词必须放在名词前面',
      '不能与冠词(a/an/the)同时使用',
      'my(I), your(you), his(he), her(she), its(it), our(we), their(they)',
      '物主代词不随名词的单复数变化',
    ],
    examples: [
      { english: 'This is my ticket.', chinese: '这是我的票。', grammarPoint: 'my + 名词' },
      {
        english: 'Is this your umbrella?',
        chinese: '这是你的雨伞吗？',
        grammarPoint: 'your + 名词',
      },
      { english: 'Here is his coat.', chinese: '这是他的外套。', grammarPoint: 'his + 名词' },
      { english: 'That is her dress.', chinese: '那是她的裙子。', grammarPoint: 'her + 名词' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'This is _____ book. (I)',
        options: ['my', 'me', 'I', 'mine'],
        answer: 0,
        explanation: '修饰名词book要用形容词性物主代词my。',
        hint: '修饰名词',
      },
      {
        type: 'choice',
        question: 'Is this _____ coat? (you)',
        options: ['you', 'your', 'yours', 'youre'],
        answer: 1,
        explanation: '修饰名词coat要用形容词性物主代词your。',
        hint: '修饰名词',
      },
      {
        type: 'fill',
        question: 'That is _____ car. (he)',
        fillAnswer: 'his',
        explanation: 'he的形容词性物主代词是his。',
        hint: '他的',
      },
      {
        type: 'fill',
        question: 'This is _____ handbag. (she)',
        fillAnswer: 'her',
        explanation: 'she的形容词性物主代词是her。',
        hint: '她的',
      },
    ],
    tips: [
      "his既是'他的'（物主代词），也是'他的'（名词性物主代词）",
      "it's ≠ its: it's是it is的缩写，its是它的",
      '物主代词后必须跟名词',
    ],
    relatedLessons: [6, 8],
    difficulty: 'easy',
    keywords: ['物主代词', 'my', 'your', 'his', 'her', '所属关系'],
  },

  // ==================== 第8课：复习：形容词性物主代词练习 ====================
  8: {
    title: '复习：形容词性物主代词练习',
    subtitle: 'my, your, his, her 综合练习',
    explanation:
      '通过更多的练习来巩固形容词性物主代词的用法。注意区分人称代词（I, you, he...）和物主代词（my, your, his...）的不同用法：人称代词作主语，物主代词修饰名词。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '人称代词 vs 物主代词',
          items: [
            {
              label: '人称代词（作主语）',
              example: 'I am a student. / He is a teacher.',
              explanation: '放在句首作主语',
            },
            {
              label: '物主代词（修饰名词）',
              example: 'my book / his car',
              explanation: '放在名词前面表示所属',
            },
          ],
        },
      },
    ],
    rules: [
      '人称代词作主语：I, you, he, she, it, we, they',
      '物主代词修饰名词：my, your, his, her, its, our, their',
      '物主代词永远不单独使用，后面必须跟名词',
    ],
    examples: [
      {
        english: 'I am a student. This is my book.',
        chinese: '我是学生。这是我的书。',
        grammarPoint: 'I → my',
      },
      {
        english: 'He is Italian. That is his car.',
        chinese: '他是意大利人。那是他的车。',
        grammarPoint: 'He → his',
      },
      {
        english: 'She is a nurse. Here is her coat.',
        chinese: '她是护士。这是她的外套。',
        grammarPoint: 'She → her',
      },
      {
        english: 'It is a dog. That is its toy.',
        chinese: '那是一只狗。那是它的玩具。',
        grammarPoint: 'It → its',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ am Chinese. _____ name is Li Ming.',
        options: ['I, My', 'My, I', 'I, I', 'My, My'],
        answer: 0,
        explanation: '第一个空作主语用I，第二个空修饰name用my。',
        hint: '主语用I，修饰名词用my',
      },
      {
        type: 'choice',
        question: '_____ is a student. _____ school is big.',
        options: ['He, His', 'His, He', 'He, He', 'His, His'],
        answer: 0,
        explanation: '第一个空作主语用He，第二个空修饰school用His。',
        hint: '主语用He，修饰名词用His',
      },
      {
        type: 'fill',
        question: '_____ is a nurse. _____ uniform is white.',
        fillAnswer: 'She, Her',
        explanation: '第一个空作主语用She，第二个空修饰uniform用Her。',
        hint: '她 → 她的',
      },
      {
        type: 'fill',
        question: 'This is not my ticket. It is _____ ticket. (you)',
        fillAnswer: 'your',
        explanation: '修饰名词ticket用your。',
        hint: '你的',
      },
    ],
    tips: [
      '区分：I(我) vs my(我的)，he(他) vs his(他的)',
      '物主代词后面一定要跟名词',
      "不要混淆：it's(它是) ≠ its(它的)",
    ],
    relatedLessons: [7, 9],
    difficulty: 'easy',
    keywords: ['物主代词', '人称代词', 'my', 'your', 'his', 'her'],
  },

  // ==================== 第9课：特殊疑问句（what job） ====================
  9: {
    title: '特殊疑问句（what job）',
    subtitle: "What's your job?",
    explanation:
      "What用来询问职业。常用句型有：What's your job? / What do you do? 回答时用I'm a/an + 职业名称。注意职业名称前要加冠词a或an，以元音开头的职业用an。",
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '询问职业的句型',
          formula: "What's your job? / What do you do? / What are you? → I'm a/an + 职业.",
          examples: ["What's your job? → I'm a teacher.", "What do you do? → I'm an engineer."],
        },
      },
    ],
    rules: [
      "询问职业：What's your job? / What do you do?",
      "回答：I'm a/an + 职业名称",
      '辅音开头的职业前用a：a teacher, a doctor',
      '元音开头的职业前用an：an engineer, an actress',
    ],
    examples: [
      { english: "What's your job?", chinese: '你是做什么工作的？', grammarPoint: '询问职业' },
      { english: "I'm a policeman.", chinese: '我是一名警察。', grammarPoint: "I'm a + 职业" },
      { english: "What's her job?", chinese: '她是做什么工作的？', grammarPoint: '询问他人职业' },
      {
        english: "She's an air hostess.",
        chinese: '她是一名空姐。',
        grammarPoint: "She's an + 职业",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: "_____ your job? I'm a teacher.",
        options: ['What', "What's", 'How', 'Who'],
        answer: 1,
        explanation: "询问职业用What's your job?",
        hint: '询问职业',
      },
      {
        type: 'choice',
        question: "I'm _____ engineer.",
        options: ['a', 'an', 'the', '/'],
        answer: 1,
        explanation: 'engineer以元音音素开头，用an。',
        hint: '元音开头用an',
      },
      {
        type: 'fill',
        question: "She's _____ nurse.",
        fillAnswer: 'a',
        explanation: 'nurse以辅音音素开头，用a。',
        hint: '辅音开头用a',
      },
      {
        type: 'fill',
        question: "_____ his job? He's a taxi driver.",
        fillAnswer: "What's",
        explanation: "询问职业用What's。",
        hint: '他的工作是什么',
      },
    ],
    tips: [
      'a用在辅音音素开头的单词前，不是辅音字母',
      'an用在元音音素开头的单词前，如an hour(h不发音)',
      '职业名称是可数名词，单数前要加a/an',
    ],
    relatedLessons: [8, 10],
    difficulty: 'easy',
    keywords: ['职业', "What's your job", 'a', 'an', 'teacher', 'doctor'],
  },

  // ==================== 第10课：复习：特殊疑问句（what job）练习 ====================
  10: {
    title: '复习：特殊疑问句（what job）练习',
    subtitle: "What's your job? 综合练习",
    explanation:
      "继续练习用What询问职业的句型，巩固a/an的使用，并学习更多职业名称。注意第三人称单数的变化：He's a... / She's a...",
    visualRules: [
      {
        type: 'table',
        content: {
          title: '常见职业名称',
          headers: ['职业', '例句', '冠词'],
          rows: [
            ['teacher（老师）', "I'm a teacher.", 'a'],
            ['doctor（医生）', "He's a doctor.", 'a'],
            ['nurse（护士）', "She's a nurse.", 'a'],
            ['engineer（工程师）', "He's an engineer.", 'an'],
            ['actress（女演员）', "She's an actress.", 'an'],
            ['taxi driver（出租车司机）', "I'm a taxi driver.", 'a'],
          ],
        },
      },
    ],
    rules: [
      '辅音音素开头用a：a teacher, a nurse, a policeman',
      '元音音素开头用an：an engineer, an actress, an air hostess',
      "第三人称：He's/She's a/an + 职业",
    ],
    examples: [
      { english: "He's a postman.", chinese: '他是一名邮递员。', grammarPoint: "He's a + 职业" },
      {
        english: "She's a hairdresser.",
        chinese: '她是一名理发师。',
        grammarPoint: "She's a + 职业",
      },
      {
        english: "What's your father's job?",
        chinese: '你父亲是做什么的？',
        grammarPoint: '询问他人职业',
      },
      { english: "He's an operator.", chinese: '他是一名操作员。', grammarPoint: "He's an + 职业" },
    ],
    exercises: [
      {
        type: 'choice',
        question: "What's her job? _____ a nurse.",
        options: ['She', "She's", 'Her', 'His'],
        answer: 1,
        explanation: "回答用She's = She is。",
        hint: 'She + is',
      },
      {
        type: 'choice',
        question: "He's _____ operator.",
        options: ['a', 'an', 'the', '/'],
        answer: 1,
        explanation: 'operator以元音音素/ɒ/开头，用an。',
        hint: '元音音素',
      },
      {
        type: 'fill',
        question: "What's your mother's job? _____ a hairdresser.",
        fillAnswer: "She's",
        explanation: "母亲是女性，用She's。",
        hint: '女性用She',
      },
      {
        type: 'fill',
        question: "He's _____ taxi driver.",
        fillAnswer: 'a',
        explanation: 'taxi以辅音音素开头，用a。',
        hint: '辅音开头',
      },
    ],
    tips: [
      '注意区分辅音字母和辅音音素',
      'hour发音为/ˈaʊə(r)/，以元音音素开头，所以是an hour',
      'university发音为/ˌjuːnɪˈvɜːsəti/，以辅音音素/j/开头，所以是a university',
    ],
    relatedLessons: [9, 11],
    difficulty: 'easy',
    keywords: ['职业', 'a', 'an', '第三人称单数', "He's", "She's"],
  },

  // ==================== 第11课：How疑问句 ====================
  11: {
    title: 'How疑问句',
    subtitle: 'How are you today?',
    explanation:
      "How用来询问状态、方式或程度。How are you? 是最常用的问候语，用来询问对方的身体状况。回答可以用Fine / I'm fine / I'm very well等。How还可以和其他词搭配：How old（多大）、How many（多少）等。",
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'How疑问句结构',
          formula: 'How + be动词 + 主语？ → 主语 + be动词 + 状态描述.',
          examples: [
            "How are you today? → I'm fine, thank you.",
            "How is your mother? → She's very well.",
          ],
        },
      },
    ],
    rules: [
      'How are you? 用来问候对方身体状况',
      "回答：Fine / I'm fine / I'm very well / Not bad",
      'How还可以搭配其他词使用：How old, How many',
      '回答后通常加上Thank you表示礼貌',
    ],
    examples: [
      { english: 'How are you today?', chinese: '你今天好吗？', grammarPoint: 'How + be + 主语' },
      { english: "I'm fine, thank you.", chinese: '我很好，谢谢。', grammarPoint: '回答状态' },
      { english: 'How is your mother?', chinese: '你妈妈好吗？', grammarPoint: '询问他人' },
      {
        english: "She's very well, thank you.",
        chinese: '她非常好，谢谢。',
        grammarPoint: '回答他人状态',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ are you today?',
        options: ['What', 'How', 'Who', 'Where'],
        answer: 1,
        explanation: '询问身体状况用How are you?',
        hint: '询问状况',
      },
      {
        type: 'choice',
        question: "I'm _____, thank you.",
        options: ['good', 'fine', 'well', 'nice'],
        answer: 1,
        explanation: "回答身体状况用fine，I'm fine是固定搭配。",
        hint: '固定搭配',
      },
      {
        type: 'fill',
        question: "_____ is your father? He's very well.",
        fillAnswer: 'How',
        explanation: '询问身体状况用How。',
        hint: '问身体状况',
      },
      {
        type: 'fill',
        question: '_____ am fine, thank you.',
        fillAnswer: 'I',
        explanation: "回答用I'm fine，此处填主语I。",
        hint: '主语',
      },
    ],
    tips: [
      'How are you? 是问候语，不只是问身体',
      '回答：Fine / Very well / Not bad / So-so',
      '注意：good是形容词，well也可以是形容词表示"身体好"',
      'How do you do? 是初次见面的正式问候（已较少使用）',
    ],
    relatedLessons: [10, 12],
    difficulty: 'easy',
    keywords: ['How', 'How are you', 'fine', 'well', '问候'],
  },

  // ==================== 第12课：复习：How疑问句练习 ====================
  12: {
    title: '复习：How疑问句练习',
    subtitle: 'How疑问句综合练习',
    explanation:
      '继续练习How疑问句的各种用法。How不仅可以询问身体状况，还可以和形容词/名词搭配，询问年龄(How old)、数量(How many)等信息。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'How的常见搭配',
          headers: ['疑问词', '意思', '例句'],
          rows: [
            ['How', '怎样、如何', 'How are you?'],
            ['How old', '多大年纪', 'How old are you?'],
            ['How many', '多少（可数）', 'How many books?'],
            ['How much', '多少（不可数）/多少钱', 'How much is it?'],
          ],
        },
      },
    ],
    rules: [
      'How 单独使用时询问身体状况或方式',
      'How old 询问年龄',
      'How many 询问可数名词的数量',
      'How much 询问不可数名词的数量或价格',
    ],
    examples: [
      { english: 'How are you?', chinese: '你好吗？', grammarPoint: 'How单独使用' },
      { english: 'How old are you?', chinese: '你多大了？', grammarPoint: 'How old' },
      { english: 'How is Steven?', chinese: '史蒂文怎么样？', grammarPoint: 'How + 人名' },
      { english: "He's fine.", chinese: '他很好。', grammarPoint: '回答状态' },
    ],
    exercises: [
      {
        type: 'choice',
        question: "_____ is your mother? She's fine.",
        options: ['What', 'How', 'Who', 'Where'],
        answer: 1,
        explanation: '询问身体状况用How。',
        hint: '问身体状况',
      },
      {
        type: 'choice',
        question: "_____ old is your son? He's five.",
        options: ['What', 'How', 'Who', 'Where'],
        answer: 1,
        explanation: '询问年龄用How old。',
        hint: '问年龄',
      },
      {
        type: 'fill',
        question: "_____ is Sophie? She's very well.",
        fillAnswer: 'How',
        explanation: '询问身体状况用How。',
        hint: '问状况',
      },
      {
        type: 'fill',
        question: "I'm _____, thank you. And you?",
        fillAnswer: 'fine',
        explanation: '回答身体状况用fine。',
        hint: '我很好',
      },
    ],
    tips: [
      'How are you? 的回答可以是：Fine / Very well / Not bad / So-so',
      'How do you do? 是正式的初次见面问候',
      'How还可以询问方式：How do you spell it?',
    ],
    relatedLessons: [11, 13],
    difficulty: 'easy',
    keywords: ['How', 'How old', 'How many', 'How much', '问候'],
  },

  // ==================== 第13课：What colour疑问句 ====================
  13: {
    title: 'What colour疑问句',
    subtitle: 'What colour is your dress?',
    explanation:
      'What colour用来询问颜色。句型为：What colour + be动词 + 主语？回答时直接说出颜色名称。注意colour在美式英语中拼写为color。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'What colour疑问句',
          formula: "What colour + be动词 + 主语？ → It's/They're + 颜色.",
          examples: [
            "What colour is your dress? → It's green.",
            "What colour are his shoes? → They're brown.",
          ],
        },
      },
    ],
    rules: [
      'What colour 用来询问颜色',
      '结构：What colour + be + 主语？',
      "回答：It's + 颜色 / They're + 颜色",
      '颜色是形容词，放在be动词后面作表语',
    ],
    examples: [
      {
        english: 'What colour is your dress?',
        chinese: '你的裙子是什么颜色的？',
        grammarPoint: 'What colour + is',
      },
      { english: "It's green.", chinese: '是绿色的。', grammarPoint: "It's + 颜色" },
      {
        english: 'What colour is his car?',
        chinese: '他的车是什么颜色的？',
        grammarPoint: 'What colour + is',
      },
      { english: "It's blue.", chinese: '是蓝色的。', grammarPoint: "It's + 颜色" },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ colour is your new dress?',
        options: ['What', 'How', 'Which', 'Where'],
        answer: 0,
        explanation: '询问颜色用What colour。',
        hint: '问颜色',
      },
      {
        type: 'choice',
        question: "It's _____.",
        options: ['a green', 'green', 'the green', 'greens'],
        answer: 1,
        explanation: '颜色作表语时前面不加冠词。',
        hint: '颜色作表语',
      },
      {
        type: 'fill',
        question: "_____ colour are her shoes? They're white.",
        fillAnswer: 'What',
        explanation: '询问颜色用What colour。',
        hint: '问颜色',
      },
      {
        type: 'fill',
        question: '_____ is black.',
        fillAnswer: 'It',
        explanation: '回答颜色时主语用It。',
        hint: '指代物品',
      },
    ],
    tips: [
      "颜色前不加冠词：It's red. 不是 It's a red.",
      '颜色可以作定语：a red dress（一条红裙子）',
      '常见颜色：red, blue, green, yellow, white, black, brown, grey',
    ],
    relatedLessons: [12, 14],
    difficulty: 'easy',
    keywords: ['What colour', '颜色', 'red', 'blue', 'green', 'white'],
  },

  // ==================== 第14课：复习：What colour疑问句练习 ====================
  14: {
    title: '复习：What colour疑问句练习',
    subtitle: 'What colour 综合练习',
    explanation:
      "继续练习What colour疑问句，巩固颜色词汇和be动词的搭配使用。注意：当主语是复数时，be动词要用are，回答用They're。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: '常见颜色词汇',
          headers: ['颜色', '英语', '例句'],
          rows: [
            ['红色', 'red', "It's a red car."],
            ['蓝色', 'blue', "It's a blue dress."],
            ['绿色', 'green', "It's a green book."],
            ['白色', 'white', "It's a white shirt."],
            ['黑色', 'black', "It's a black coat."],
            ['黄色', 'yellow', "It's a yellow pen."],
            ['灰色', 'grey', "It's a grey hat."],
            ['棕色', 'brown', "It's a brown bag."],
          ],
        },
      },
    ],
    rules: [
      "单数物品：What colour is it? → It's + 颜色.",
      "复数物品：What colour are they? → They're + 颜色.",
      '颜色作定语：a + 颜色 + 名词',
      '颜色作表语：主语 + be + 颜色',
    ],
    examples: [
      {
        english: 'What colour is your umbrella?',
        chinese: '你的雨伞是什么颜色的？',
        grammarPoint: '单数提问',
      },
      { english: "It's black.", chinese: '是黑色的。', grammarPoint: '单数回答' },
      {
        english: 'What colour are your pens?',
        chinese: '你的钢笔是什么颜色的？',
        grammarPoint: '复数提问',
      },
      { english: "They're blue.", chinese: '是蓝色的。', grammarPoint: '复数回答' },
    ],
    exercises: [
      {
        type: 'choice',
        question: "What colour _____ your hat? It's grey.",
        options: ['is', 'are', 'am', 'be'],
        answer: 0,
        explanation: 'hat是单数名词，用is。',
        hint: '单数名词',
      },
      {
        type: 'choice',
        question: 'What colour _____ their shoes? _____ brown.',
        options: ["is, It's", "are, They're", "is, They're", "are, It's"],
        answer: 1,
        explanation: "shoes是复数名词，用are，回答用They're。",
        hint: '复数名词',
      },
      {
        type: 'fill',
        question: 'My coat is _____. (白色)',
        fillAnswer: 'white',
        explanation: '白色的英语是white。',
        hint: 'white',
      },
      {
        type: 'fill',
        question: "What _____ is Sophie's new dress? It's yellow.",
        fillAnswer: 'colour',
        explanation: '询问颜色用What colour。',
        hint: '什么颜色',
      },
    ],
    tips: [
      '颜色作定语时放在名词前：a red apple',
      '颜色作表语时放在be动词后：The apple is red.',
      "注意单复数：is it → it's / are they → they're",
    ],
    relatedLessons: [13, 15],
    difficulty: 'easy',
    keywords: ['What colour', '颜色', 'is', 'are', '单复数'],
  },

  // ==================== 第15课：国籍和语言 ====================
  15: {
    title: '国籍和语言',
    subtitle: 'Are you Swedish?',
    explanation:
      '本课学习如何询问国籍和语言。用Are you + 国籍？来询问某人来自哪个国家。国籍词（形容词）和国家名（名词）是不同的形式，要注意区分。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '国家、国籍和语言',
          headers: ['国家', '国籍（形容词）', '语言', '例句'],
          rows: [
            ['China（中国）', 'Chinese（中国的）', 'Chinese（中文）', "I'm Chinese."],
            ['England（英国）', 'English（英国的）', 'English（英语）', "He's English."],
            ['France（法国）', 'French（法国的）', 'French（法语）', "She's French."],
            ['Germany（德国）', 'German（德国的）', 'German（德语）', "He's German."],
            ['Japan（日本）', 'Japanese（日本的）', 'Japanese（日语）', "She's Japanese."],
            ['Sweden（瑞典）', 'Swedish（瑞典的）', 'Swedish（瑞典语）', "They're Swedish."],
          ],
        },
      },
    ],
    rules: [
      '询问国籍：Are you + 国籍词？',
      "回答：Yes, I am. / No, I'm not. I'm + 国籍词.",
      '国籍词是形容词，前面不加冠词',
      "国家名是名词，用from表示来自：I'm from China.",
    ],
    examples: [
      { english: 'Are you Swedish?', chinese: '你是瑞典人吗？', grammarPoint: 'Are you + 国籍' },
      {
        english: "No, I'm not. I'm Chinese.",
        chinese: '不，我不是。我是中国人。',
        grammarPoint: '否定+肯定回答',
      },
      { english: 'Are they German?', chinese: '他们是德国人吗？', grammarPoint: 'Are they + 国籍' },
      { english: 'Yes, they are.', chinese: '是的，他们是。', grammarPoint: '肯定回答' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ you Swedish?',
        options: ['Is', 'Are', 'Am', 'Do'],
        answer: 1,
        explanation: '主语you用are。',
        hint: 'you用are',
      },
      {
        type: 'choice',
        question: "No, I'm _____. I'm English.",
        options: ["isn't", "aren't", 'am not', 'not'],
        answer: 2,
        explanation: 'I的否定是am not。',
        hint: 'I用am not',
      },
      {
        type: 'fill',
        question: 'He is _____. (法国人)',
        fillAnswer: 'French',
        explanation: '法国人的英语是French。',
        hint: 'French',
      },
      {
        type: 'fill',
        question: '_____ they Japanese? Yes, they are.',
        fillAnswer: 'Are',
        explanation: '复数主语they用Are。',
        hint: '复数主语',
      },
    ],
    tips: [
      "国籍词是形容词，不要加a：He's French. 不是 He's a French.",
      '表示"来自某国"用from：I\'m from China.',
      '有些国籍词和语言名称相同：Chinese, English, French, Japanese',
    ],
    relatedLessons: [14, 16],
    difficulty: 'easy',
    keywords: ['国籍', 'Swedish', 'Chinese', 'English', 'French', 'German'],
  },

  // ==================== 第16课：复习：国籍和语言练习 ====================
  16: {
    title: '复习：国籍和语言练习',
    subtitle: 'Are they...? 国籍综合练习',
    explanation:
      '继续练习国籍相关表达，特别是复数形式的问答。Are they + 国籍？用来询问多个人的国籍。注意国籍词的首字母要大写。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '单数与复数的国籍问答',
          items: [
            {
              label: '单数',
              example: "Are you Swedish? → Yes, I am. / No, I'm not.",
              explanation: '用Are you询问一个人',
            },
            {
              label: '复数',
              example: "Are they Swedish? → Yes, they are. / No, they aren't.",
              explanation: '用Are they询问多个人',
            },
          ],
        },
      },
    ],
    rules: [
      "询问一个人：Are you + 国籍？ → Yes, I am. / No, I'm not.",
      "询问多个人：Are they + 国籍？ → Yes, they are. / No, they aren't.",
      '国籍词首字母要大写',
      '国籍词前不加冠词a/an/the',
    ],
    examples: [
      {
        english: 'Are these your books?',
        chinese: '这些是你的书吗？',
        grammarPoint: 'Are these...',
      },
      { english: 'Yes, they are.', chinese: '是的，它们是。', grammarPoint: '复数肯定回答' },
      {
        english: "No, they aren't. They are her books.",
        chinese: '不，它们不是。它们是她的书。',
        grammarPoint: '复数否定回答',
      },
      { english: 'Are they tourists?', chinese: '他们是游客吗？', grammarPoint: 'Are they + 名词' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Are _____ tourists?',
        options: ['he', 'she', 'they', 'it'],
        answer: 2,
        explanation: 'Are后面跟复数主语they。',
        hint: '复数主语',
      },
      {
        type: 'choice',
        question: "No, they _____. They're students.",
        options: ["isn't", "aren't", 'am not', 'not'],
        answer: 1,
        explanation: "they的否定形式是aren't。",
        hint: "they用aren't",
      },
      {
        type: 'fill',
        question: "_____ they Chinese? No, they're Japanese.",
        fillAnswer: 'Are',
        explanation: '复数主语they用Are提问。',
        hint: '复数用Are',
      },
      {
        type: 'fill',
        question: "Yes, _____ are. They're from Germany.",
        fillAnswer: 'they',
        explanation: '回答复数问题用they。',
        hint: '复数回答',
      },
    ],
    tips: [
      '国籍词首字母必须大写：Chinese, English, French',
      "不要说 He's a Chinese. 应该说 He's Chinese.",
      "表示来自：They're from Japan.",
    ],
    relatedLessons: [15, 17],
    difficulty: 'easy',
    keywords: ['国籍', 'Are they', '复数', '国家', 'tourist'],
  },

  // ==================== 第17课：人称代词和be动词复数 ====================
  17: {
    title: '人称代词和be动词复数',
    subtitle: 'We/You/They are...',
    explanation:
      '本课系统学习复数人称代词与be动词are的搭配。we（我们）、you（你们/你）、they（他们/她们/它们）都用are。同时学习名词复数的更多用法。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '人称代词与be动词',
          headers: ['人称代词', 'be动词', '缩写', '例句'],
          rows: [
            ['I', 'am', "I'm", "I'm a student."],
            ['You (单/复)', 'are', "You're", "You're students."],
            ['He / She / It', 'is', "He's / She's / It's", "He's a teacher."],
            ['We', 'are', "We're", "We're friends."],
            ['They', 'are', "They're", "They're tourists."],
          ],
        },
      },
    ],
    rules: ['we/you/they 用 are', 'he/she/it 用 is', 'I 用 am', 'be动词随主语的人称和数变化'],
    examples: [
      { english: 'We are Chinese.', chinese: '我们是中国人。', grammarPoint: 'We + are' },
      { english: 'You are students.', chinese: '你们是学生。', grammarPoint: 'You + are' },
      { english: 'They are tourists.', chinese: '他们是游客。', grammarPoint: 'They + are' },
      { english: "They're Korean.", chinese: '他们是韩国人。', grammarPoint: "They're + 国籍" },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ are good friends.',
        options: ['We', 'Us', 'Our', 'Ours'],
        answer: 0,
        explanation: '作主语用主格We。',
        hint: '作主语',
      },
      {
        type: 'choice',
        question: 'They _____ from France.',
        options: ['am', 'is', 'are', 'be'],
        answer: 2,
        explanation: 'They是复数主语，用are。',
        hint: '复数主语',
      },
      {
        type: 'fill',
        question: '_____ are policemen. (他们)',
        fillAnswer: 'They',
        explanation: '他们的主格是They。',
        hint: '他们',
      },
      {
        type: 'fill',
        question: 'We _____ students. (是)',
        fillAnswer: 'are',
        explanation: 'We是复数主语，用are。',
        hint: '复数主语',
      },
    ],
    tips: [
      '记住三组搭配：I am, he/she/it is, we/you/they are',
      'you可以表示"你"也可以表示"你们"',
      'they可以表示"他们/她们/它们"',
    ],
    relatedLessons: [16, 18],
    difficulty: 'easy',
    keywords: ['人称代词', 'we', 'they', 'are', '复数'],
  },

  // ==================== 第18课：复习：人称代词和be动词复数练习 ====================
  18: {
    title: '复习：人称代词和be动词复数练习',
    subtitle: 'What are their jobs?',
    explanation:
      '综合练习人称代词和be动词的搭配，特别是复数形式。用What are their jobs?来询问多个人的职业。注意jobs是复数形式。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '复数人称的职业问答',
          formula: "What are their jobs? → They're + 职业(s).",
          examples: [
            "What are their jobs? → They're mechanics.",
            "What are your jobs? → We're hairdressers.",
          ],
        },
      },
    ],
    rules: [
      '询问复数职业：What are their/your jobs?',
      "回答：They're/We're + 职业(s).",
      '复数职业名称不加a/an',
      'jobs用复数是因为问的是多个人的职业',
    ],
    examples: [
      {
        english: 'What are their jobs?',
        chinese: '他们是做什么工作的？',
        grammarPoint: 'What are + 复数名词',
      },
      {
        english: "They're mechanics.",
        chinese: '他们是机械师。',
        grammarPoint: "They're + 职业复数",
      },
      {
        english: 'What are your jobs?',
        chinese: '你们是做什么工作的？',
        grammarPoint: '询问对方职业',
      },
      { english: "We're nurses.", chinese: '我们是护士。', grammarPoint: "We're + 职业复数" },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'What are _____ jobs?',
        options: ['they', 'them', 'their', 'theirs'],
        answer: 2,
        explanation: '修饰名词jobs用形容词性物主代词their。',
        hint: '修饰名词',
      },
      {
        type: 'choice',
        question: "They're _____.",
        options: ['a mechanics', 'mechanics', 'mechanic', 'the mechanic'],
        answer: 1,
        explanation: '复数职业名称不加冠词。',
        hint: '复数不加a',
      },
      {
        type: 'fill',
        question: "What _____ their jobs? They're nurses.",
        fillAnswer: 'are',
        explanation: 'jobs是复数，用are。',
        hint: '复数名词',
      },
      {
        type: 'fill',
        question: '_____ are hairdressers. (我们)',
        fillAnswer: 'We',
        explanation: '我们的主格是We。',
        hint: '我们',
      },
    ],
    tips: [
      "What's your job? (问一个人) vs What are your jobs? (问多个人)",
      "复数职业名称前不加a/an：They're mechanics.",
      "their(他们的) vs they're(他们是)：拼写不同！",
    ],
    relatedLessons: [17, 19],
    difficulty: 'easy',
    keywords: ['What are their jobs', '复数', 'their', "they're", 'mechanic'],
  },

  // ==================== 第19课：形容词作表语 ====================
  19: {
    title: '形容词作表语',
    subtitle: "I'm tired. He's thirsty.",
    explanation:
      "形容词可以放在be动词后面作表语，用来描述主语的状态、感受或特征。例如：I'm tired（我累了）、He's thirsty（他渴了）。这是英语中形容词最常见的用法之一。",
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '形容词作表语',
          formula: '主语 + be动词 + 形容词（表语）',
          examples: ["I'm tired. (我累了。)", "He's thirsty. (他渴了。)"],
        },
      },
    ],
    rules: [
      '形容词放在be动词后面作表语',
      '结构：主语 + be + 形容词',
      '形容词描述主语的状态或感受',
      '形容词前不加冠词',
    ],
    examples: [
      { english: "I'm tired.", chinese: '我累了。', grammarPoint: "I'm + 形容词" },
      { english: "He's thirsty.", chinese: '他渴了。', grammarPoint: "He's + 形容词" },
      { english: "She's hot.", chinese: '她很热。', grammarPoint: "She's + 形容词" },
      { english: "We're cold.", chinese: '我们很冷。', grammarPoint: "We're + 形容词" },
    ],
    exercises: [
      {
        type: 'choice',
        question: "I'm _____. I want some water.",
        options: ['tired', 'thirsty', 'hungry', 'cold'],
        answer: 1,
        explanation: '想喝水说明渴了，用thirsty。',
        hint: '想喝水',
      },
      {
        type: 'choice',
        question: 'He _____ tired.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: 'He是第三人称单数，用is。',
        hint: 'He用is',
      },
      {
        type: 'fill',
        question: '_____ are hot. (他们)',
        fillAnswer: 'They',
        explanation: '他们用They作主语。',
        hint: '他们',
      },
      {
        type: 'fill',
        question: "She's _____. (累的)",
        fillAnswer: 'tired',
        explanation: '累的英语是tired。',
        hint: 'tired',
      },
    ],
    tips: [
      '常见的状态形容词：tired(累), thirsty(渴), hungry(饿), hot(热), cold(冷)',
      "形容词作表语时不加a/an：He's tired. 不是 He's a tired.",
      "区分形容词作定语和表语：a tired man(定语) vs He's tired.(表语)",
    ],
    relatedLessons: [18, 20],
    difficulty: 'easy',
    keywords: ['形容词', '表语', 'tired', 'thirsty', 'hungry', '状态'],
  },

  // ==================== 第20课：复习：形容词作表语练习 ====================
  20: {
    title: '复习：形容词作表语练习',
    subtitle: "What's the matter?",
    explanation:
      "继续练习形容词作表语的用法，学习用What's the matter?来询问对方怎么了。回答时用主语 + be + 形容词来描述状况。",
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '询问状况的句型',
          formula: "What's the matter? → I'm/He's/She's + 形容词.",
          examples: ["What's the matter? → I'm tired.", "What's the matter with him? → He's ill."],
        },
      },
    ],
    rules: [
      "What's the matter? = 怎么了？",
      '回答时用主语 + be + 形容词',
      "What's the matter with + 人? = 某人怎么了？",
      '形容词描述身体或情绪状态',
    ],
    examples: [
      { english: "What's the matter?", chinese: '怎么了？', grammarPoint: '询问状况' },
      { english: "I'm tired.", chinese: '我累了。', grammarPoint: '回答状况' },
      {
        english: "What's the matter with him?",
        chinese: '他怎么了？',
        grammarPoint: '询问他人状况',
      },
      { english: "He's ill.", chinese: '他生病了。', grammarPoint: '回答他人状况' },
    ],
    exercises: [
      {
        type: 'choice',
        question: "What's the _____? I'm thirsty.",
        options: ['matter', 'wrong', 'problem', 'thing'],
        answer: 0,
        explanation: "What's the matter? 是固定搭配。",
        hint: '固定搭配',
      },
      {
        type: 'choice',
        question: "I'm _____. I want to sleep.",
        options: ['thirsty', 'hungry', 'tired', 'hot'],
        answer: 2,
        explanation: '想睡觉说明累了，用tired。',
        hint: '想睡觉',
      },
      {
        type: 'fill',
        question: "_____ the matter with her? She's cold.",
        fillAnswer: "What's",
        explanation: "询问状况用What's the matter。",
        hint: '怎么了',
      },
      {
        type: 'fill',
        question: "He's _____. He wants some food.",
        fillAnswer: 'hungry',
        explanation: '想吃东西说明饿了，用hungry。',
        hint: '想吃东西',
      },
    ],
    tips: [
      "What's the matter? 是固定表达，不能说 What's wrong? (虽然口语中也用)",
      '常见的身体状态词：tired, ill, hot, cold, thirsty, hungry, fine',
      "with后跟人称代词宾格：What's the matter with him? (不是he)",
    ],
    relatedLessons: [19, 21],
    difficulty: 'easy',
    keywords: ["What's the matter", 'tired', 'hungry', 'thirsty', 'ill', '状态'],
  },

  // ==================== 第21课：Which疑问句和Give me句型 ====================
  21: {
    title: 'Which疑问句和Give me句型',
    subtitle: 'Which book? Give me...',
    explanation:
      'Which用来在有限的选择中进行询问，意思是"哪一个"。Give me...是祈使句，表示"给我..."。这两个句型在日常生活中非常常用。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'Which疑问句',
          formula: 'Which + 名词 + be动词 + 主语？',
          examples: ['Which book is yours? → The red one.', 'Which glass is yours? → This one.'],
        },
      },
      {
        type: 'formula',
        content: {
          title: 'Give me句型',
          formula: 'Give me/him/her/them + 名词.',
          examples: [
            'Give me a cup, please. → Which one? This one?',
            'Give him a glass. → Which one? The big one?',
          ],
        },
      },
    ],
    rules: [
      'Which用于在有限范围内选择，意为"哪一个"',
      'Which + 名词 + ...? 结构',
      'Give me + 名词 = 给我...',
      'one可以代替前面提过的名词，避免重复',
    ],
    examples: [
      { english: 'Which book is yours?', chinese: '哪本书是你的？', grammarPoint: 'Which + 名词' },
      { english: 'The blue one.', chinese: '蓝色的那本。', grammarPoint: 'one代替名词' },
      {
        english: 'Give me a cup, please.',
        chinese: '请给我一个杯子。',
        grammarPoint: 'Give me + 名词',
      },
      { english: 'Which one? This one?', chinese: '哪一个？这个吗？', grammarPoint: 'Which one' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ glass is yours?',
        options: ['What', 'Which', 'How', 'Where'],
        answer: 1,
        explanation: '在有限范围内选择用Which。',
        hint: '哪一个',
      },
      {
        type: 'choice',
        question: '_____ me a pen, please.',
        options: ['Give', 'Giving', 'Gives', 'Gave'],
        answer: 0,
        explanation: '祈使句用动词原形Give。',
        hint: '祈使句',
      },
      {
        type: 'fill',
        question: '_____ one? The red one.',
        fillAnswer: 'Which',
        explanation: '询问哪一个用Which。',
        hint: '哪一个',
      },
      {
        type: 'fill',
        question: '_____ him a book, please.',
        fillAnswer: 'Give',
        explanation: '给他用Give him。',
        hint: '给他',
      },
    ],
    tips: [
      'Which在有限范围中选择，What在无限范围中提问',
      'one代替前面出现过的可数名词单数',
      'ones代替可数名词复数：the red ones',
      'Give后跟人称代词宾格：me, him, her, them',
    ],
    relatedLessons: [20, 22],
    difficulty: 'medium',
    keywords: ['Which', 'Give me', 'one', '选择', '祈使句'],
  },

  // ==================== 第22课：复习：Which疑问句和Give me句型练习 ====================
  22: {
    title: '复习：Which疑问句和Give me句型练习',
    subtitle: 'Which和Give me综合练习',
    explanation:
      '继续练习Which疑问句和Give me句型。注意one/ones的用法：one代替单数可数名词，ones代替复数可数名词。Give后可以跟不同的人称代词宾格。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'one 与 ones',
          items: [
            {
              label: 'one（单数）',
              example: 'Which one? This one. The red one.',
              explanation: '代替单数可数名词',
            },
            {
              label: 'ones（复数）',
              example: 'Which ones? These ones. The blue ones.',
              explanation: '代替复数可数名词',
            },
          ],
        },
      },
    ],
    rules: [
      'one代替单数可数名词',
      'ones代替复数可数名词',
      'Give + 间接宾语 + 直接宾语',
      '间接宾语用宾格：me, him, her, us, them',
    ],
    examples: [
      { english: 'Give me a cup, please.', chinese: '请给我一个杯子。', grammarPoint: 'Give me' },
      {
        english: 'Give them some glasses.',
        chinese: '给他们一些玻璃杯。',
        grammarPoint: 'Give them',
      },
      {
        english: 'Which ones? The clean ones?',
        chinese: '哪些？干净的那些？',
        grammarPoint: 'ones代替复数名词',
      },
      {
        english: 'No, not those. The ones on the shelf.',
        chinese: '不是那些。架子上的那些。',
        grammarPoint: 'ones + 介词短语',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Which _____ do you like? The red one.',
        options: ['one', 'ones', 'a one', 'the one'],
        answer: 0,
        explanation: '单数名词用one代替。',
        hint: '单数',
      },
      {
        type: 'choice',
        question: 'Give _____ some spoons, please.',
        options: ['he', 'him', 'his', 'she'],
        answer: 1,
        explanation: 'Give后跟宾格代词him。',
        hint: '宾格',
      },
      {
        type: 'fill',
        question: '_____ ones? These ones or those ones?',
        fillAnswer: 'Which',
        explanation: '在复数中选择用Which。',
        hint: '哪一个',
      },
      {
        type: 'fill',
        question: '_____ her a knife, please.',
        fillAnswer: 'Give',
        explanation: '给她用Give her。',
        hint: 'Give',
      },
    ],
    tips: [
      'Which one? (单数) / Which ones? (复数)',
      'Give + 人 + 物 = Give me a cup.',
      'Give + 物 + to + 人 = Give a cup to me.',
      'ones前面常加修饰语：the big ones, the red ones',
    ],
    relatedLessons: [21, 23],
    difficulty: 'medium',
    keywords: ['Which', 'one', 'ones', 'Give', '选择'],
  },

  // ==================== 第23课：介词on/under ====================
  23: {
    title: '介词on/under',
    subtitle: 'The book is on the table.',
    explanation:
      '介词用来表示名词或代词与其他词之间的关系。on表示"在...上面"，under表示"在...下面"。这些介词后面跟名词或代词构成介词短语，表示位置关系。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '常用方位介词',
          headers: ['介词', '意思', '例句'],
          rows: [
            ['on', '在...上面', 'The book is on the table.'],
            ['under', '在...下面', 'The dog is under the table.'],
            ['in', '在...里面', 'The pen is in the box.'],
            ['over', '在...上方', 'The lamp is over the table.'],
            ['in front of', '在...前面', 'The car is in front of the house.'],
            ['behind', '在...后面', 'The garden is behind the house.'],
          ],
        },
      },
    ],
    rules: [
      'on 表示"在...上面"，有接触面',
      'under 表示"在...下面"',
      '结构：主语 + be + 介词短语',
      '介词后跟名词或代词',
    ],
    examples: [
      {
        english: 'The book is on the table.',
        chinese: '书在桌子上。',
        grammarPoint: 'on the table',
      },
      {
        english: 'The dog is under the table.',
        chinese: '狗在桌子下面。',
        grammarPoint: 'under the table',
      },
      {
        english: 'The cup is on the desk.',
        chinese: '杯子在书桌上。',
        grammarPoint: 'on the desk',
      },
      {
        english: 'The shoes are under the bed.',
        chinese: '鞋子在床下面。',
        grammarPoint: 'under the bed',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The book is _____ the table.',
        options: ['on', 'in', 'at', 'to'],
        answer: 0,
        explanation: '书在桌子上用on。',
        hint: '在...上面',
      },
      {
        type: 'choice',
        question: 'The cat is _____ the bed.',
        options: ['on', 'in', 'under', 'at'],
        answer: 2,
        explanation: '猫在床下面用under。',
        hint: '在...下面',
      },
      {
        type: 'fill',
        question: 'The glass is _____ the shelf. (在...上面)',
        fillAnswer: 'on',
        explanation: '在架子上面用on。',
        hint: '在上面',
      },
      {
        type: 'fill',
        question: 'The shoes are _____ the chair. (在...下面)',
        fillAnswer: 'under',
        explanation: '在椅子下面用under。',
        hint: '在下面',
      },
    ],
    tips: [
      'on表示接触的"在上面"，over表示不接触的"在上方"',
      'under的反义词是over（上方）',
      'in表示"在...里面"，on表示"在...上面"',
      '介词短语放在be动词后面作表语',
    ],
    relatedLessons: [22, 24],
    difficulty: 'easy',
    keywords: ['介词', 'on', 'under', '方位', '位置'],
  },

  // ==================== 第24课：复习：介词on/under练习 ====================
  24: {
    title: '复习：介词on/under练习',
    subtitle: 'on/under综合练习',
    explanation:
      '继续练习方位介词on和under，结合be动词和名词单复数进行综合练习。注意：复数主语用are，单数主语用is。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'on 与 under 对比',
          items: [
            {
              label: 'on（在上面）',
              example: 'The book is on the table.',
              explanation: '物品放在某物的上面，有接触',
            },
            {
              label: 'under（在下面）',
              example: 'The cat is under the table.',
              explanation: '物品在某物的下方',
            },
          ],
        },
      },
    ],
    rules: [
      'on + 名词 = 在...上面',
      'under + 名词 = 在...下面',
      '单数主语 + is + 介词短语',
      '复数主语 + are + 介词短语',
    ],
    examples: [
      {
        english: 'The pencils are on the desk.',
        chinese: '铅笔在书桌上。',
        grammarPoint: '复数 + are + on',
      },
      {
        english: 'The bag is under the chair.',
        chinese: '包在椅子下面。',
        grammarPoint: '单数 + is + under',
      },
      { english: 'Where is the knife?', chinese: '刀在哪里？', grammarPoint: 'Where疑问句' },
      { english: "It's on the plate.", chinese: '在盘子上。', grammarPoint: "It's + on" },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The plates are _____ the table.',
        options: ['in', 'on', 'under', 'at'],
        answer: 1,
        explanation: '盘子在桌子上用on。',
        hint: '在桌子上',
      },
      {
        type: 'choice',
        question: 'Where _____ the shoes? Under the bed.',
        options: ['is', 'are', 'am', 'be'],
        answer: 1,
        explanation: 'shoes是复数名词，用are。',
        hint: '复数名词',
      },
      {
        type: 'fill',
        question: 'The fork is _____ the plate. (在...上面)',
        fillAnswer: 'on',
        explanation: '叉子在盘子上面用on。',
        hint: '在上面',
      },
      {
        type: 'fill',
        question: 'The bottles are _____ the shelf. (在...下面)',
        fillAnswer: 'under',
        explanation: '瓶子在架子下面用under。',
        hint: '在下面',
      },
    ],
    tips: [
      '记住位置关系：on（上）、under（下）、in（里）、behind（后）',
      'Where is + 单数名词？Where are + 复数名词？',
      "回答用 It's...（单数）或 They're...（复数）",
    ],
    relatedLessons: [23, 25],
    difficulty: 'easy',
    keywords: ['介词', 'on', 'under', 'where', '位置'],
  },

  // ==================== 第25课：There is句型 ====================
  25: {
    title: 'There is句型',
    subtitle: 'There is a book on the desk.',
    explanation:
      'There is... 表示"某处有某物"，用来描述某处存在某物。There is后跟单数可数名词或不可数名词。注意There is不等于"那里有"，而是表示存在的"有"。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'There is句型',
          formula: 'There is + a/an + 单数名词 + 介词短语.',
          examples: ['There is a book on the desk.', 'There is some water in the glass.'],
        },
      },
    ],
    rules: [
      'There is = 有（表示存在）',
      'There is + 单数可数名词（加a/an）',
      'There is + 不可数名词',
      "否定：There is not (isn't) + 名词",
      '疑问：Is there + 名词...?',
    ],
    examples: [
      {
        english: 'There is a book on the desk.',
        chinese: '书桌上有一本书。',
        grammarPoint: 'There is + 单数名词',
      },
      {
        english: 'There is a cup on the table.',
        chinese: '桌子上有一个杯子。',
        grammarPoint: 'There is + a + 名词',
      },
      {
        english: "There isn't a cup on the table.",
        chinese: '桌子上没有杯子。',
        grammarPoint: '否定句',
      },
      {
        english: 'Is there a book on the desk?',
        chinese: '书桌上有一本书吗？',
        grammarPoint: '疑问句',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'There _____ a book on the desk.',
        options: ['is', 'are', 'am', 'be'],
        answer: 0,
        explanation: 'a book是单数，用There is。',
        hint: '单数名词',
      },
      {
        type: 'choice',
        question: '_____ there a cup on the table?',
        options: ['Is', 'Are', 'Am', 'Be'],
        answer: 0,
        explanation: 'a cup是单数，用Is there。',
        hint: '单数疑问',
      },
      {
        type: 'fill',
        question: 'There _____ a glass on the shelf.',
        fillAnswer: 'is',
        explanation: 'a glass是单数，用There is。',
        hint: '单数',
      },
      {
        type: 'fill',
        question: 'There _____ a pencil on the desk. (否定)',
        fillAnswer: "isn't",
        explanation: "否定形式用There isn't。",
        hint: '否定',
      },
    ],
    tips: [
      'There is = 有（存在），不同于 I have = 我有（拥有）',
      'There is后跟单数名词，There are后跟复数名词',
      "There is可以缩写为There's",
      "否定形式：There isn't / There's not",
    ],
    relatedLessons: [24, 26],
    difficulty: 'easy',
    keywords: ['There is', "There's", '存在', '有', '某处有某物'],
  },

  // ==================== 第26课：复习：There is句型练习 ====================
  26: {
    title: '复习：There is句型练习',
    subtitle: 'There is句型综合练习',
    explanation:
      '继续练习There is句型，巩固肯定句、否定句和疑问句的转换。注意There is和have/has的区别：There is表示存在，have/has表示拥有。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'There is的三种句式',
          formula: "肯定：There is + 名词. / 否定：There isn't + 名词. / 疑问：Is there + 名词?",
          examples: [
            'There is a glass on the table. (肯定)',
            "There isn't a glass on the table. (否定)",
            'Is there a glass on the table? (疑问)',
          ],
        },
      },
    ],
    rules: [
      '肯定句：There is + a/an + 单数名词 + 介词短语',
      "否定句：There isn't + a/an + 单数名词 + 介词短语",
      '一般疑问句：Is there + a/an + 单数名词 + 介词短语？',
      "简略回答：Yes, there is. / No, there isn't.",
    ],
    examples: [
      {
        english: 'There is a refrigerator in the kitchen.',
        chinese: '厨房里有一个冰箱。',
        grammarPoint: 'There is + 地点',
      },
      {
        english: "There isn't a television in the room.",
        chinese: '房间里没有电视。',
        grammarPoint: '否定',
      },
      {
        english: 'Is there a spoon on the plate?',
        chinese: '盘子上有一把勺子吗？',
        grammarPoint: '疑问',
      },
      {
        english: "Yes, there is. / No, there isn't.",
        chinese: '是的，有。/不，没有。',
        grammarPoint: '简略回答',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'There _____ a bottle on the dressing table.',
        options: ['is', 'are', 'am', 'be'],
        answer: 0,
        explanation: 'a bottle是单数，用There is。',
        hint: '单数',
      },
      {
        type: 'choice',
        question: '_____ there a cooker in the kitchen?',
        options: ['Is', 'Are', 'Am', 'Be'],
        answer: 0,
        explanation: 'a cooker是单数，用Is there。',
        hint: '单数疑问',
      },
      {
        type: 'fill',
        question: 'There _____ a magazine on the stereo. (没有)',
        fillAnswer: "isn't",
        explanation: "否定形式用There isn't。",
        hint: '否定',
      },
      {
        type: 'fill',
        question: 'Is there a newspaper on the floor? Yes, there _____.',
        fillAnswer: 'is',
        explanation: '肯定回答用Yes, there is。',
        hint: '肯定回答',
      },
    ],
    tips: [
      'There is表示存在，have/has表示拥有',
      "注意缩写：There's = There is, There isn't = There is not",
      '在There is...句型中，真正的主语是be动词后面的名词',
      "Is there...? 的回答用 Yes, there is. / No, there isn't.",
    ],
    relatedLessons: [25, 27],
    difficulty: 'easy',
    keywords: ['There is', "isn't", 'Is there', '存在', '否定'],
  },

  // ==================== 第27课：There are句型 ====================
  27: {
    title: 'There are句型',
    subtitle: 'There are some books on the desk.',
    explanation:
      'There are... 表示"某处有一些（复数）东西"。There are后跟复数可数名词。some用于肯定句，any用于否定句和疑问句。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'There are句型',
          formula: 'There are + some/数字 + 复数名词 + 介词短语.',
          examples: ['There are some books on the desk.', 'There are five cups on the table.'],
        },
      },
    ],
    rules: [
      'There are + 复数可数名词',
      '肯定句用some：There are some books.',
      "否定句和疑问句用any：There aren't any books. / Are there any books?",
      '可以加具体数字：There are five books.',
    ],
    examples: [
      {
        english: 'There are some books on the desk.',
        chinese: '书桌上有一些书。',
        grammarPoint: 'There are + some + 复数名词',
      },
      {
        english: 'There are five cups on the table.',
        chinese: '桌子上有五个杯子。',
        grammarPoint: 'There are + 数字 + 复数名词',
      },
      {
        english: "There aren't any bottles on the shelf.",
        chinese: '架子上没有任何瓶子。',
        grammarPoint: '否定句 + any',
      },
      {
        english: 'Are there any newspapers on the desk?',
        chinese: '书桌上有报纸吗？',
        grammarPoint: '疑问句 + any',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'There _____ some books on the shelf.',
        options: ['is', 'are', 'am', 'be'],
        answer: 1,
        explanation: 'some books是复数，用There are。',
        hint: '复数名词',
      },
      {
        type: 'choice',
        question: '_____ there any cups on the table?',
        options: ['Is', 'Are', 'Am', 'Be'],
        answer: 1,
        explanation: 'any cups是复数，用Are there。',
        hint: '复数疑问',
      },
      {
        type: 'fill',
        question: 'There _____ any pencils in the box.',
        fillAnswer: "aren't",
        explanation: "否定形式用There aren't。",
        hint: '否定',
      },
      {
        type: 'fill',
        question: 'There _____ some bottles in the refrigerator.',
        fillAnswer: 'are',
        explanation: 'some bottles是复数，用There are。',
        hint: '复数',
      },
    ],
    tips: [
      'There is + 单数名词 / There are + 复数名词',
      'some用于肯定句，any用于否定句和疑问句',
      "There are可以缩写为There're（但较少使用）",
      "否定：There aren't any... = 没有任何...",
    ],
    relatedLessons: [26, 28],
    difficulty: 'easy',
    keywords: ['There are', 'some', 'any', '复数名词', '存在'],
  },

  // ==================== 第28课：复习：There are句型练习 ====================
  28: {
    title: '复习：There are句型练习',
    subtitle: 'There are句型综合练习',
    explanation:
      '综合练习There are句型的肯定、否定和疑问形式。注意some和any的区别：some用于肯定句，any用于否定句和疑问句。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'some 与 any',
          items: [
            {
              label: 'some（肯定句）',
              example: 'There are some books on the desk.',
              explanation: '在肯定句中表示"一些"',
            },
            {
              label: 'any（否定句/疑问句）',
              example: "There aren't any books. / Are there any books?",
              explanation: '在否定句和疑问句中表示"任何"',
            },
          ],
        },
      },
    ],
    rules: [
      'There are + some + 复数名词（肯定句）',
      "There aren't + any + 复数名词（否定句）",
      'Are there + any + 复数名词?（疑问句）',
      "简略回答：Yes, there are. / No, there aren't.",
    ],
    examples: [
      {
        english: 'There are some children in the park.',
        chinese: '公园里有一些孩子。',
        grammarPoint: 'There are + some',
      },
      {
        english: "There aren't any children in the park.",
        chinese: '公园里没有孩子。',
        grammarPoint: "There aren't + any",
      },
      {
        english: 'Are there any children in the park?',
        chinese: '公园里有孩子吗？',
        grammarPoint: 'Are there + any',
      },
      { english: "No, there aren't.", chinese: '不，没有。', grammarPoint: '否定回答' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'There _____ some flowers in the garden.',
        options: ['is', 'are', 'am', 'be'],
        answer: 1,
        explanation: 'some flowers是复数，用There are。',
        hint: '复数',
      },
      {
        type: 'choice',
        question: '_____ there any newspapers on the shelf?',
        options: ['Is', 'Are', 'Am', 'Be'],
        answer: 1,
        explanation: 'any newspapers是复数，用Are there。',
        hint: '复数疑问',
      },
      {
        type: 'fill',
        question: 'There _____ any cups on the table. (没有)',
        fillAnswer: "aren't",
        explanation: "否定形式用There aren't any。",
        hint: '否定',
      },
      {
        type: 'fill',
        question: 'Are there _____ chairs in the room? Yes, there are.',
        fillAnswer: 'any',
        explanation: '疑问句中用any。',
        hint: '疑问句',
      },
    ],
    tips: [
      'There is + 单数/不可数名词，There are + 复数名词',
      'some用于肯定句，any用于否定句和疑问句',
      "There is... 简略回答 Yes, there is. / No, there isn't.",
      "There are... 简略回答 Yes, there are. / No, there aren't.",
    ],
    relatedLessons: [27, 29],
    difficulty: 'easy',
    keywords: ['There are', 'some', 'any', '复数', 'Are there'],
  },

  // ==================== 第29课：祈使句 ====================
  29: {
    title: '祈使句',
    subtitle: 'Come in! Open the door!',
    explanation:
      "祈使句用来表示命令、请求、建议等。祈使句用动词原形开头，省略主语you。否定祈使句在动词原形前加Don't。祈使句是英语中最基本的句型之一。",
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '祈使句结构',
          formula: "肯定：动词原形 + 其他. / 否定：Don't + 动词原形 + 其他.",
          examples: ['Open the door! (开门！)', "Don't open the door! (不要开门！)"],
        },
      },
    ],
    rules: [
      '祈使句用动词原形开头',
      '主语you通常省略',
      "否定祈使句：Don't + 动词原形",
      '语气由语调决定：命令/请求/建议',
    ],
    examples: [
      { english: 'Come in!', chinese: '进来！', grammarPoint: '动词原形' },
      { english: 'Open the door!', chinese: '把门打开！', grammarPoint: '动词原形 + 宾语' },
      { english: "Don't drop it!", chinese: '别摔了！', grammarPoint: "Don't + 动词原形" },
      { english: 'Shut the door, please.', chinese: '请关门。', grammarPoint: '请求' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ the window, please.',
        options: ['Opens', 'Open', 'Opening', 'Opened'],
        answer: 1,
        explanation: '祈使句用动词原形Open。',
        hint: '动词原形',
      },
      {
        type: 'choice',
        question: '_____ drop the vase!',
        options: ["Don't", "Doesn't", "Isn't", 'Not'],
        answer: 0,
        explanation: "否定祈使句用Don't + 动词原形。",
        hint: '否定祈使句',
      },
      {
        type: 'fill',
        question: '_____ the door, please. (关上)',
        fillAnswer: 'Shut',
        explanation: '关上门用Shut the door。',
        hint: 'Shut',
      },
      {
        type: 'fill',
        question: '_____ sit down. (请)',
        fillAnswer: 'Please',
        explanation: 'Please sit down. 表示礼貌请求。',
        hint: '礼貌',
      },
    ],
    tips: [
      '祈使句省略了主语you',
      'Please可以放在句首或句末，使语气更礼貌',
      "Don't + 动词原形 = 不要...",
      '感叹号表示命令语气，句号表示请求语气',
    ],
    relatedLessons: [28, 30],
    difficulty: 'easy',
    keywords: ['祈使句', "Don't", '动词原形', '命令', '请求'],
  },

  // ==================== 第30课：复习：祈使句练习 ====================
  30: {
    title: '复习：祈使句练习',
    subtitle: 'What must I do?',
    explanation:
      '继续练习祈使句，学习用must表示"必须"。must + 动词原形表示义务或必要性。What must I do? 用来询问应该做什么。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'must句型',
          formula: '主语 + must + 动词原形. / Must I + 动词原形?',
          examples: [
            'You must open the window. (你必须打开窗户。)',
            'Must I open the window? (我必须打开窗户吗？)',
          ],
        },
      },
    ],
    rules: [
      'must + 动词原形 = 必须做某事',
      'must没有第三人称单数变化',
      'Must I...? = 我必须...吗？',
      "否定：must not / mustn't = 不可以",
    ],
    examples: [
      {
        english: 'You must sweep the floor.',
        chinese: '你必须扫地。',
        grammarPoint: 'must + 动词原形',
      },
      { english: 'What must I do?', chinese: '我必须做什么？', grammarPoint: 'What must I do' },
      {
        english: 'You must clean the room.',
        chinese: '你必须打扫房间。',
        grammarPoint: 'must + 动词原形',
      },
      { english: "You mustn't play here.", chinese: '你不可以在这里玩。', grammarPoint: "mustn't" },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'You _____ clean the classroom.',
        options: ['must', 'musts', 'musting', 'musted'],
        answer: 0,
        explanation: 'must后跟动词原形，且must没有形态变化。',
        hint: 'must不变形',
      },
      {
        type: 'choice',
        question: '_____ I open the window?',
        options: ['Must', 'Musts', 'Musted', 'Musting'],
        answer: 0,
        explanation: 'Must I...? 是疑问句形式。',
        hint: '疑问句',
      },
      {
        type: 'fill',
        question: '_____ must I do? You must sweep the floor.',
        fillAnswer: 'What',
        explanation: '询问做什么用What must I do?。',
        hint: '做什么',
      },
      {
        type: 'fill',
        question: 'You _____ play with matches. (不可以)',
        fillAnswer: "mustn't",
        explanation: "不可以做某事用mustn't。",
        hint: '不可以',
      },
    ],
    tips: [
      'must后面必须跟动词原形',
      'must没有人称变化：I must, you must, he must',
      "mustn't = 不可以（禁止），don't have to = 不必（不强制）",
      'What must I do? = What do I have to do?',
    ],
    relatedLessons: [29, 31],
    difficulty: 'medium',
    keywords: ['must', "mustn't", '必须', '祈使句', 'What must I do'],
  },

  // ==================== 第31课：现在进行时 ====================
  31: {
    title: '现在进行时',
    subtitle: 'I am reading. He is sleeping.',
    explanation:
      '现在进行时表示此刻正在进行的动作。结构为：主语 + be动词 + 动词-ing。be动词根据主语变化（am/is/are），动词加-ing构成现在分词。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '现在进行时结构',
          formula: '主语 + am/is/are + 动词-ing.',
          examples: [
            'I am reading. (我正在读书。)',
            'He is sleeping. (他正在睡觉。)',
            'They are playing. (他们正在玩。)',
          ],
        },
      },
    ],
    rules: [
      '现在进行时 = be动词 + 动词-ing',
      'I am + V-ing, He/She/It is + V-ing',
      'We/You/They are + V-ing',
      '表示此刻正在进行的动作',
    ],
    examples: [
      { english: 'I am reading.', chinese: '我正在读书。', grammarPoint: 'I am + V-ing' },
      { english: 'He is sleeping.', chinese: '他正在睡觉。', grammarPoint: 'He is + V-ing' },
      { english: "She's cooking.", chinese: '她正在做饭。', grammarPoint: "She's + V-ing" },
      { english: 'The dog is eating.', chinese: '狗正在吃东西。', grammarPoint: 'It is + V-ing' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ reading a book.',
        options: ['am', 'is', 'are', 'be'],
        answer: 0,
        explanation: 'I用am，构成现在进行时。',
        hint: 'I用am',
      },
      {
        type: 'choice',
        question: 'He _____ sleeping.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: 'He用is，构成现在进行时。',
        hint: 'He用is',
      },
      {
        type: 'fill',
        question: 'She _____ cooking dinner.',
        fillAnswer: 'is',
        explanation: 'She用is + V-ing。',
        hint: 'She + is',
      },
      {
        type: 'fill',
        question: 'The children _____ playing in the garden.',
        fillAnswer: 'are',
        explanation: 'The children是复数，用are。',
        hint: '复数主语',
      },
    ],
    tips: [
      '现在进行时表示"正在做"，一般现在时表示"经常做"',
      '动词-ing的拼写规则：一般加-ing，以e结尾去e加-ing',
      "缩写：I'm reading, He's sleeping, They're playing",
      '时间标志词：now, at the moment, look, listen',
    ],
    relatedLessons: [30, 32],
    difficulty: 'medium',
    keywords: ['现在进行时', 'V-ing', 'am/is/are + doing', '正在'],
  },

  // ==================== 第32课：复习：现在进行时练习 ====================
  32: {
    title: '复习：现在进行时练习',
    subtitle: 'What is he doing?',
    explanation:
      '继续练习现在进行时，学习用What + be + 主语 + doing? 来询问某人正在做什么。掌握动词加-ing的变化规则。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '动词加-ing的规则',
          headers: ['规则', '方法', '例子'],
          rows: [
            ['一般动词', '直接加-ing', 'read → reading, cook → cooking'],
            ['以不发音e结尾', '去e加-ing', 'make → making, write → writing'],
            ['以重读闭音节结尾', '双写末字母加-ing', 'run → running, sit → sitting'],
            ['以ie结尾', '变ie为y加-ing', 'die → dying, lie → lying'],
          ],
        },
      },
    ],
    rules: [
      '一般动词直接加-ing：work → working',
      '以不发音e结尾，去e加-ing：make → making',
      '以重读闭音节结尾，双写末字母加-ing：run → running',
      '询问正在做什么：What + be + 主语 + doing?',
    ],
    examples: [
      {
        english: 'What is he doing?',
        chinese: '他正在做什么？',
        grammarPoint: 'What + is + he + doing',
      },
      {
        english: "He's reading a magazine.",
        chinese: '他正在看杂志。',
        grammarPoint: "He's + V-ing",
      },
      {
        english: 'What is she doing?',
        chinese: '她正在做什么？',
        grammarPoint: 'What + is + she + doing',
      },
      {
        english: "She's washing the dishes.",
        chinese: '她正在洗碗。',
        grammarPoint: "She's + V-ing",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'What _____ he doing?',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: 'he是第三人称单数，用is。',
        hint: 'he用is',
      },
      {
        type: 'choice',
        question: 'She is _____ (make) a cake.',
        options: ['make', 'making', 'makeing', 'makes'],
        answer: 1,
        explanation: 'make以不发音e结尾，去e加-ing变成making。',
        hint: '去e加-ing',
      },
      {
        type: 'fill',
        question: 'He is _____ (run) in the park.',
        fillAnswer: 'running',
        explanation: 'run是重读闭音节，双写n加-ing变成running。',
        hint: '双写末字母',
      },
      {
        type: 'fill',
        question: 'What is she _____? She is reading.',
        fillAnswer: 'doing',
        explanation: 'What is she doing? 询问正在做什么。',
        hint: 'doing',
      },
    ],
    tips: [
      '现在进行时的疑问句：be + 主语 + V-ing?',
      '动词-ing的拼写要注意：make → making (去e)',
      'run → running (双写), swim → swimming (双写)',
      'listen, open等以非重读音节结尾的不双写：listen → listening',
    ],
    relatedLessons: [31, 33],
    difficulty: 'medium',
    keywords: ['现在进行时', 'What is doing', 'V-ing', '动词变化'],
  },

  // ==================== 第33课：现在进行时（复数） ====================
  33: {
    title: '现在进行时（复数）',
    subtitle: 'They are playing.',
    explanation:
      '学习复数主语的现在进行时。当主语是we、you、they或复数名词时，用are + V-ing。注意复数名词作主语时的用法。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '现在进行时 - 复数主语',
          headers: ['主语', '结构', '例句'],
          rows: [
            ['We', 'are + V-ing', 'We are studying.'],
            ['You', 'are + V-ing', 'You are listening.'],
            ['They', 'are + V-ing', 'They are playing.'],
            ['The children', 'are + V-ing', 'The children are running.'],
          ],
        },
      },
    ],
    rules: [
      '复数主语 + are + V-ing',
      'we/you/they 都用 are',
      '复数名词（如 the children, the cats）用 are',
      '现在进行时表示说话时正在进行的动作',
    ],
    examples: [
      {
        english: 'They are playing in the garden.',
        chinese: '他们正在花园里玩。',
        grammarPoint: 'They are + V-ing',
      },
      {
        english: 'We are studying English.',
        chinese: '我们正在学英语。',
        grammarPoint: 'We are + V-ing',
      },
      {
        english: 'The children are swimming.',
        chinese: '孩子们正在游泳。',
        grammarPoint: '复数名词 + are + V-ing',
      },
      {
        english: 'The cats are sleeping on the sofa.',
        chinese: '猫们正在沙发上睡觉。',
        grammarPoint: '复数名词 + are + V-ing',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The children _____ playing in the park.',
        options: ['am', 'is', 'are', 'be'],
        answer: 2,
        explanation: 'The children是复数主语，用are。',
        hint: '复数主语',
      },
      {
        type: 'choice',
        question: 'We _____ studying English now.',
        options: ['am', 'is', 'are', 'be'],
        answer: 2,
        explanation: 'We是复数主语，用are。',
        hint: 'We用are',
      },
      {
        type: 'fill',
        question: 'They _____ (swim) in the river.',
        fillAnswer: 'are swimming',
        explanation: 'They + are + swimming。',
        hint: 'They + are',
      },
      {
        type: 'fill',
        question: 'The dogs _____ (run) in the park.',
        fillAnswer: 'are running',
        explanation: 'The dogs是复数，用are + running。',
        hint: '复数主语',
      },
    ],
    tips: [
      '单数主语：He/She/It is + V-ing',
      '复数主语：We/You/They are + V-ing',
      '现在进行时的标志词：now, at the moment, look, listen',
      '注意：I am + V-ing, 不能说 I is/are + V-ing',
    ],
    relatedLessons: [32, 34],
    difficulty: 'medium',
    keywords: ['现在进行时', '复数', 'are + V-ing', 'They are', 'We are'],
  },

  // ==================== 第34课：复习：现在进行时（复数）练习 ====================
  34: {
    title: '复习：现在进行时（复数）练习',
    subtitle: 'What are they doing?',
    explanation:
      '继续练习复数主语的现在进行时，学习用What are they doing?来询问多个人正在做什么。巩固are + V-ing的用法。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '复数现在进行时疑问句',
          formula: 'What are + 复数主语 + doing? → They are + V-ing.',
          examples: [
            "What are they doing? → They're playing.",
            "What are the children doing? → They're swimming.",
          ],
        },
      },
    ],
    rules: [
      'What are they/we/复数名词 + doing?',
      "回答：They're/We're + V-ing.",
      '动词-ing的变化规则适用于所有人称',
      '现在进行时可以和now, at the moment连用',
    ],
    examples: [
      {
        english: 'What are they doing?',
        chinese: '他们正在做什么？',
        grammarPoint: 'What are + they + doing',
      },
      {
        english: "They're washing the dishes.",
        chinese: '他们正在洗碗。',
        grammarPoint: "They're + V-ing",
      },
      {
        english: 'What are the women doing?',
        chinese: '那些女士在做什么？',
        grammarPoint: 'What are + 复数名词 + doing',
      },
      {
        english: "They're typing letters.",
        chinese: '她们正在打字。',
        grammarPoint: "They're + V-ing",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'What _____ the boys doing?',
        options: ['am', 'is', 'are', 'be'],
        answer: 2,
        explanation: 'the boys是复数主语，用are。',
        hint: '复数',
      },
      {
        type: 'choice',
        question: "They're _____ (cook) dinner.",
        options: ['cook', 'cooks', 'cooking', 'cooked'],
        answer: 2,
        explanation: '现在进行时用cooking。',
        hint: 'V-ing',
      },
      {
        type: 'fill',
        question: 'What are the women _____? They are typing.',
        fillAnswer: 'doing',
        explanation: 'What are the women doing? 询问正在做什么。',
        hint: 'doing',
      },
      {
        type: 'fill',
        question: 'The men _____ (work) in the office.',
        fillAnswer: 'are working',
        explanation: 'The men是复数，用are + working。',
        hint: '复数 + are',
      },
    ],
    tips: [
      'What is he/she/it doing? (单数)',
      'What are they/we/you/复数名词 doing? (复数)',
      'V-ing的拼写规则适用于所有主语',
      '现在进行时 = be动词 + V-ing，三者缺一不可',
    ],
    relatedLessons: [33, 35],
    difficulty: 'medium',
    keywords: ['What are they doing', '现在进行时', '复数', 'are + V-ing'],
  },

  // ==================== 第35课：方位介词和短语 ====================
  35: {
    title: '方位介词和短语',
    subtitle: 'across, along, over, under, between',
    explanation:
      '学习更多的方位介词和介词短语，用于描述人或物的位置和移动方向。across表示"横过"，along表示"沿着"，over表示"越过"，under表示"在...下面"，between表示"在...之间"。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '方位介词汇总',
          headers: ['介词', '意思', '例句'],
          rows: [
            ['across', '横过、穿过', 'He is walking across the park.'],
            ['along', '沿着', 'She is walking along the river.'],
            ['over', '越过、在...上方', 'The plane is flying over the bridge.'],
            ['under', '在...下面', 'The dog is sitting under the tree.'],
            ['between', '在...之间（两者）', 'The ball is between the two boxes.'],
            ['beside', '在...旁边', 'She is sitting beside the window.'],
            ['into', '进入', 'He is going into the room.'],
            ['out of', '从...出来', 'She is coming out of the house.'],
          ],
        },
      },
    ],
    rules: [
      'across = 横过（从一边到另一边）',
      'along = 沿着（顺着一条线走）',
      'over = 越过（从上方跨过）',
      'between = 在...之间（两者之间）',
      'beside = 在...旁边',
    ],
    examples: [
      {
        english: 'He is walking across the park.',
        chinese: '他正在走过公园。',
        grammarPoint: 'across',
      },
      {
        english: 'She is walking along the river.',
        chinese: '她正沿着河走。',
        grammarPoint: 'along',
      },
      {
        english: 'The airplane is flying over the bridge.',
        chinese: '飞机正从桥上飞过。',
        grammarPoint: 'over',
      },
      {
        english: 'The dog is between the two trees.',
        chinese: '狗在两棵树之间。',
        grammarPoint: 'between',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He is walking _____ the street.',
        options: ['across', 'along', 'between', 'under'],
        answer: 0,
        explanation: '走过街道（从一边到另一边）用across。',
        hint: '横过',
      },
      {
        type: 'choice',
        question: 'The cat is sitting _____ the two chairs.',
        options: ['across', 'along', 'between', 'over'],
        answer: 2,
        explanation: '在两把椅子之间用between。',
        hint: '两者之间',
      },
      {
        type: 'fill',
        question: 'She is walking _____ the river. (沿着)',
        fillAnswer: 'along',
        explanation: '沿着河走用along。',
        hint: '沿着',
      },
      {
        type: 'fill',
        question: 'The plane is flying _____ the city. (在...上方)',
        fillAnswer: 'over',
        explanation: '飞过城市上空用over。',
        hint: '在上方',
      },
    ],
    tips: [
      'across强调横穿，along强调沿着',
      'over表示从上方越过，under表示在下面',
      'between用于两者之间，among用于三者及以上之间',
      'into（进入）是in和to的结合',
    ],
    relatedLessons: [34, 36],
    difficulty: 'medium',
    keywords: ['across', 'along', 'over', 'under', 'between', '方位介词'],
  },

  // ==================== 第36课：复习：方位介词和短语练习 ====================
  36: {
    title: '复习：方位介词和短语练习',
    subtitle: '方位介词综合练习',
    explanation:
      '综合练习方位介词across, along, over, under, between, beside等。结合现在进行时描述正在发生的方位动作。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '方位介词对比',
          items: [
            {
              label: 'across（横过）',
              example: 'walking across the road',
              explanation: '从路的一边走到另一边',
            },
            {
              label: 'along（沿着）',
              example: 'walking along the road',
              explanation: '顺着路的方向走',
            },
            {
              label: 'over（越过）',
              example: 'flying over the mountain',
              explanation: '从上方跨过',
            },
            {
              label: 'under（下面）',
              example: 'sitting under the tree',
              explanation: '在树的下方',
            },
            {
              label: 'between（之间）',
              example: 'between the house and the tree',
              explanation: '在两者之间',
            },
          ],
        },
      },
    ],
    rules: [
      'across 和 along 的区别：across = 横过，along = 沿着',
      'over 和 under 是反义词',
      'between 用于两者之间',
      '方位介词常和现在进行时一起使用',
    ],
    examples: [
      {
        english: 'The children are running across the park.',
        chinese: '孩子们正跑过公园。',
        grammarPoint: 'across + 现在进行时',
      },
      {
        english: 'She is walking along the street.',
        chinese: '她正沿着街道走。',
        grammarPoint: 'along + 现在进行时',
      },
      {
        english: 'The bird is flying over the river.',
        chinese: '鸟正在河上飞过。',
        grammarPoint: 'over + 现在进行时',
      },
      {
        english: 'The boy is sitting between his parents.',
        chinese: '男孩坐在他父母之间。',
        grammarPoint: 'between + 现在进行时',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The cat is running _____ the garden.',
        options: ['across', 'along', 'between', 'under'],
        answer: 0,
        explanation: '跑过花园用across。',
        hint: '横过',
      },
      {
        type: 'choice',
        question: 'She is sitting _____ her mother and father.',
        options: ['across', 'along', 'between', 'over'],
        answer: 2,
        explanation: '在父母之间用between。',
        hint: '两者之间',
      },
      {
        type: 'fill',
        question: 'The children are walking _____ the river. (沿着)',
        fillAnswer: 'along',
        explanation: '沿着河走用along。',
        hint: '沿着',
      },
      {
        type: 'fill',
        question: 'A plane is flying _____ the bridge. (在上方)',
        fillAnswer: 'over',
        explanation: '飞机飞过桥上方用over。',
        hint: '在上方',
      },
    ],
    tips: [
      'across = 从一边到另一边（cross the road）',
      'along = 顺着一条线的方向（walk along the river）',
      'over = 从上方越过（fly over the mountain）',
      'between + and = 在...和...之间',
    ],
    relatedLessons: [35],
    difficulty: 'medium',
    keywords: ['方位介词', 'across', 'along', 'over', 'under', 'between'],
  },

  // ==================== 第37课：be going to 结构 ====================
  37: {
    title: 'be going to 结构',
    subtitle: "I'm going to clean it.",
    explanation:
      'be going to 结构表示"打算做某事"或"将要做某事"。结构为：主语 + am/is/are + going to + 动词原形。它常用于表达计划、意图或即将发生的事情。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'be going to 句型公式',
          formula: '主语 + am/is/are + going to + 动词原形',
          examples: [
            "I'm going to clean the room.",
            'She is going to make the bed.',
            'We are going to paint this bookcase.',
          ],
        },
      },
      {
        type: 'table',
        content: {
          title: 'be going to 人称搭配',
          headers: ['主语', 'be动词', '例句'],
          rows: [
            ['I', 'am', "I'm going to read."],
            ['He/She/It', 'is', "He's going to swim."],
            ['You/We/They', 'are', "They're going to come."],
          ],
        },
      },
    ],
    rules: [
      'be going to = 打算/将要',
      '结构：主语 + am/is/are + going to + 动词原形',
      'am/is/are 随主语人称变化',
      'going to 后面跟动词原形',
      '否定形式：am/is/are + not + going to + 动词原形',
      '疑问形式：Am/Is/Are + 主语 + going to + 动词原形?',
    ],
    examples: [
      {
        english: "I'm going to clean it.",
        chinese: '我打算把它打扫干净。',
        grammarPoint: 'be going to 表示打算',
      },
      {
        english: 'She is going to make the bed.',
        chinese: '她打算整理床铺。',
        grammarPoint: '第三人称单数',
      },
      {
        english: 'We are going to paint this bookcase.',
        chinese: '我们打算粉刷这个书柜。',
        grammarPoint: '复数主语',
      },
      { english: 'What are you going to do?', chinese: '你打算做什么？', grammarPoint: '疑问句' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ going to visit my friend.',
        options: ['am', 'is', 'are', 'be'],
        answer: 0,
        explanation: "主语是I，搭配am。I'm going to...",
        hint: 'I 搭配哪个be动词？',
      },
      {
        type: 'choice',
        question: 'She _____ going to wash the dishes.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: '主语是She（第三人称单数），搭配is。',
        hint: '第三人称单数',
      },
      {
        type: 'fill',
        question: 'They _____ going to paint the fence.',
        fillAnswer: 'are',
        explanation: '主语是They（复数），搭配are。',
        hint: '复数主语用什么？',
      },
      {
        type: 'choice',
        question: '_____ he going to come tomorrow?',
        options: ['Am', 'Is', 'Are', 'Be'],
        answer: 1,
        explanation: '主语是he，疑问句将is提前。',
        hint: '疑问句把be动词提前',
      },
    ],
    tips: [
      'be going to 常用于口语中表示近期计划',
      'be going to 中的 going 没有"去"的意思，不要翻译成"去"',
      '否定句：I am not going to... / He is not going to...',
      '注意 going to 在口语中常读作 gonna',
    ],
    relatedLessons: [35, 38],
    difficulty: 'easy',
    keywords: ['be going to', '将要', '打算', '将来时'],
  },

  // ==================== 第38课：be going to 练习 ====================
  38: {
    title: '复习：be going to 练习',
    subtitle: 'What are you going to do?',
    explanation:
      '本课复习 be going to 结构，通过各种练习巩固"打算做某事"和"将要做某事"的表达。重点练习肯定句、否定句和疑问句的转换。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'be going to 句型转换',
          headers: ['句型', '结构', '例句'],
          rows: [
            ['肯定句', '主语 + am/is/are + going to + 动词原形', "I'm going to swim."],
            ['否定句', '主语 + am/is/are + not + going to + 动词原形', "I'm not going to swim."],
            ['一般疑问句', 'Am/Is/Are + 主语 + going to + 动词原形?', 'Are you going to swim?'],
            [
              '特殊疑问句',
              '疑问词 + am/is/are + 主语 + going to + 动词原形?',
              'What are you going to do?',
            ],
          ],
        },
      },
    ],
    rules: [
      'be going to 肯定句变否定句：在am/is/are后加not',
      'be going to 肯定句变疑问句：将am/is/are提前到句首',
      '特殊疑问句：疑问词 + be + 主语 + going to + 动词原形?',
    ],
    examples: [
      { english: 'He is going to have a bath.', chinese: '他打算洗个澡。', grammarPoint: '肯定句' },
      {
        english: 'He is not going to have a bath.',
        chinese: '他不打算洗澡。',
        grammarPoint: '否定句',
      },
      { english: 'Is he going to have a bath?', chinese: '他打算洗澡吗？', grammarPoint: '疑问句' },
      { english: 'What is he going to do?', chinese: '他打算做什么？', grammarPoint: '特殊疑问句' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'What _____ you going to do tonight?',
        options: ['am', 'is', 'are', 'be'],
        answer: 2,
        explanation: '主语是you，用are。What are you going to do?',
        hint: 'you 搭配哪个be动词？',
      },
      {
        type: 'choice',
        question: 'They _____ _____ to travel next month.',
        options: ['is not going', 'are not going', 'am not going', 'not going'],
        answer: 1,
        explanation: '主语They搭配are，否定形式为are not going to。',
        hint: '复数主语的否定形式',
      },
      {
        type: 'fill',
        question: '_____ she going to study English?',
        fillAnswer: 'Is',
        explanation: '主语she搭配is，疑问句将Is提到句首。',
        hint: '第三人称单数疑问句',
      },
      {
        type: 'fill',
        question: 'We _____ going to play football.',
        fillAnswer: 'are',
        explanation: '主语We搭配are。',
        hint: '复数主语',
      },
    ],
    tips: [
      '做题时先判断主语是第几人称、单数还是复数',
      '疑问句只需把be动词提前，其他部分不变',
      '口语中 What are you going to do? 常缩为 Whatcha gonna do?',
    ],
    relatedLessons: [37],
    difficulty: 'easy',
    keywords: ['be going to', '句型转换', '否定句', '疑问句'],
  },

  // ==================== 第39课：否定祈使句 ====================
  39: {
    title: '否定祈使句',
    subtitle: "Don't drop it!",
    explanation:
      "否定祈使句用于表示禁止或劝阻，结构为 Don't + 动词原形。祈使句的主语通常是 you（省略不写）。否定祈使句在日常生活中非常常用，如 Don't be late!（别迟到！）",
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '否定祈使句公式',
          formula: "Don't + 动词原形 + 其他",
          examples: ["Don't drop it!", "Don't be late!", "Don't touch that!"],
        },
      },
      {
        type: 'comparison',
        content: {
          title: '肯定祈使句 vs 否定祈使句',
          items: [
            {
              label: '肯定祈使句',
              example: 'Open the door.',
              explanation: '动词原形开头，表示命令或请求',
            },
            {
              label: '否定祈使句',
              example: "Don't open the door.",
              explanation: "Don't + 动词原形，表示禁止或劝阻",
            },
          ],
        },
      },
    ],
    rules: [
      "否定祈使句结构：Don't + 动词原形",
      '祈使句的主语 you 通常省略',
      '否定祈使句用于禁止、劝阻某人做某事',
      "Don't 后面永远跟动词原形",
      "be动词也要用原形：Don't be late!（不是 Don't is late!）",
    ],
    examples: [
      { english: "Don't drop it!", chinese: '别把它摔了！', grammarPoint: "Don't + 动词原形" },
      { english: "Don't be late!", chinese: '别迟到！', grammarPoint: "Don't + be" },
      { english: "Don't touch that!", chinese: '别碰那个！', grammarPoint: '否定祈使句' },
      { english: "Don't talk in class.", chinese: '上课不要讲话。', grammarPoint: '否定祈使句' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ drop the vase!',
        options: ["Don't", 'Not', 'No', "Isn't"],
        answer: 0,
        explanation: "否定祈使句用 Don't + 动词原形。",
        hint: '否定祈使句的结构是什么？',
      },
      {
        type: 'choice',
        question: '_____ _____ late for school.',
        options: ['Not be', "Don't be", "Don't is", 'No be'],
        answer: 1,
        explanation: "否定祈使句 + be动词原形：Don't be late.",
        hint: '否定祈使句中be动词用什么形式？',
      },
      {
        type: 'fill',
        question: '_____ touch the wet paint!',
        fillAnswer: "Don't",
        explanation: "否定祈使句：Don't + 动词原形。",
        hint: '表示"不要"',
      },
      {
        type: 'choice',
        question: '_____ talk in the library.',
        options: ["Don't", 'Not', "Doesn't", 'No'],
        answer: 0,
        explanation: "否定祈使句用 Don't 开头。",
        hint: '祈使句的否定形式',
      },
    ],
    tips: [
      '祈使句省略了主语 you',
      "Don't 后面的动词一定是原形",
      '肯定祈使句：动词原形开头（如 Come here!）',
      "否定祈使句：Don't + 动词原形（如 Don't go!）",
    ],
    relatedLessons: [37, 40],
    difficulty: 'easy',
    keywords: ['祈使句', "Don't", '否定', '禁止'],
  },

  // ==================== 第40课：否定祈使句练习 ====================
  40: {
    title: '复习：否定祈使句练习',
    subtitle: "Don't...",
    explanation:
      "本课复习否定祈使句的用法，通过练习巩固 Don't + 动词原形 的结构，并学习在实际场景中正确使用否定祈使句。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: '常见否定祈使句',
          headers: ['场景', '否定祈使句', '中文'],
          rows: [
            ['教室', "Don't talk in class.", '上课不要讲话。'],
            ['马路', "Don't cross the road.", '不要横穿马路。'],
            ['家里', "Don't play with fire.", '不要玩火。'],
            ['公园', "Don't pick the flowers.", '不要摘花。'],
            ['图书馆', "Don't make noise.", '不要制造噪音。'],
          ],
        },
      },
    ],
    rules: [
      "Don't + 动词原形 构成否定祈使句",
      '祈使句省略主语 you',
      "可以加 please 使语气更委婉：Please don't...",
    ],
    examples: [
      {
        english: "Don't drop it! Give it to me.",
        chinese: '别摔了！把它给我。',
        grammarPoint: "Don't + 动词原形",
      },
      {
        english: "Please don't make so much noise.",
        chinese: '请不要制造这么多噪音。',
        grammarPoint: '委婉否定祈使句',
      },
      {
        english: "Don't play football in the street.",
        chinese: '不要在街上踢球。',
        grammarPoint: '否定祈使句',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ play with the knife!',
        options: ["Don't", 'Not', "Doesn't", 'No'],
        answer: 0,
        explanation: "否定祈使句用 Don't + 动词原形。",
        hint: '表示禁止',
      },
      {
        type: 'fill',
        question: '_____ _____ so much noise.',
        fillAnswer: "Don't make",
        explanation: "否定祈使句：Don't + 动词原形。make noise 制造噪音。",
        hint: '不要制造噪音',
      },
      {
        type: 'choice',
        question: 'Please _____ be late again.',
        options: ["don't", 'not', "doesn't", 'no'],
        answer: 0,
        explanation: "Please don't + 动词原形，表示委婉请求。",
        hint: '加上please表示礼貌',
      },
      {
        type: 'fill',
        question: '_____ pick the flowers in the park.',
        fillAnswer: "Don't",
        explanation: "否定祈使句：Don't + 动词原形。",
        hint: '否定祈使句',
      },
    ],
    tips: [
      "祈使句的否定形式只有 Don't 开头这一种",
      '加上 please 可以使祈使句语气更礼貌',
      "否定祈使句的反意疑问句用 will you: Don't be late, will you?",
    ],
    relatedLessons: [39],
    difficulty: 'easy',
    keywords: ['祈使句', "Don't", '否定祈使句', '练习'],
  },

  // ==================== 第41课：可数和不可数名词 ====================
  41: {
    title: '可数和不可数名词',
    subtitle: 'a piece of, a bar of, a bottle of',
    explanation:
      '英语名词分为可数名词和不可数名词。可数名词有单复数形式，不可数名词没有复数形式。不可数名词需要用量词来表示数量，如 a piece of（一片）、a bar of（一条）、a bottle of（一瓶）等。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '常用量词搭配',
          headers: ['量词', '搭配名词', '例句'],
          rows: [
            ['a piece of', 'bread/cake/paper/advice', 'a piece of bread（一片面包）'],
            ['a bar of', 'soap/chocolate', 'a bar of chocolate（一条巧克力）'],
            ['a bottle of', 'milk/wine/water', 'a bottle of milk（一瓶牛奶）'],
            ['a loaf of', 'bread', 'a loaf of bread（一条面包）'],
            ['a pound of', 'sugar/tea/coffee', 'a pound of sugar（一磅糖）'],
            ['a tin of', 'tobacco/beans', 'a tin of tobacco（一听烟草）'],
            ['a cup of', 'tea/coffee', 'a cup of tea（一杯茶）'],
            ['a glass of', 'water/juice/milk', 'a glass of water（一杯水）'],
          ],
        },
      },
    ],
    rules: [
      '可数名词：可以用数字直接计数，有单复数形式（如 book/books）',
      '不可数名词：不能直接计数，没有复数形式（如 water, bread, sugar）',
      '不可数名词用量词表示数量：a piece of, a bar of, a bottle of 等',
      '不可数名词做主语时，谓语动词用单数形式',
    ],
    examples: [
      {
        english: 'Give me a piece of bread.',
        chinese: '给我一片面包。',
        grammarPoint: 'a piece of + 不可数名词',
      },
      {
        english: 'I want a bar of chocolate.',
        chinese: '我想要一条巧克力。',
        grammarPoint: 'a bar of + 不可数名词',
      },
      {
        english: 'She bought a bottle of milk.',
        chinese: '她买了一瓶牛奶。',
        grammarPoint: 'a bottle of + 不可数名词',
      },
      { english: 'Is there any bread?', chinese: '有面包吗？', grammarPoint: '不可数名词用any' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Give me a _____ of soap.',
        options: ['piece', 'bar', 'bottle', 'loaf'],
        answer: 1,
        explanation: '一条肥皂用 a bar of soap。',
        hint: '肥皂是条状的',
      },
      {
        type: 'choice',
        question: 'I need a _____ of milk.',
        options: ['piece', 'bar', 'bottle', 'tin'],
        answer: 2,
        explanation: '一瓶牛奶用 a bottle of milk。',
        hint: '牛奶用瓶装',
      },
      {
        type: 'fill',
        question: 'She wants a _____ _____ bread.',
        fillAnswer: 'piece of',
        explanation: '一片面包用 a piece of bread。',
        hint: '面包用片来量',
      },
      {
        type: 'choice',
        question: '_____ there any water in the bottle?',
        options: ['Is', 'Are', 'Has', 'Have'],
        answer: 0,
        explanation: 'water是不可数名词，谓语动词用单数is。',
        hint: '不可数名词用单数动词',
      },
    ],
    tips: [
      '常见不可数名词：water, bread, sugar, milk, tea, coffee, rice, money',
      '不可数名词不能加 -s，不能用 a/an 直接修饰',
      '量词是可数的，所以可以用复数：two pieces of bread',
      '区分 a piece of bread（一片面包）和 a loaf of bread（一条面包）',
    ],
    relatedLessons: [39, 42],
    difficulty: 'medium',
    keywords: ['可数名词', '不可数名词', '量词', 'a piece of', 'a bar of', 'a bottle of'],
  },

  // ==================== 第42课：可数和不可数名词练习 ====================
  42: {
    title: '复习：可数和不可数名词练习',
    subtitle: '量词搭配练习',
    explanation:
      '本课复习可数名词和不可数名词的区别，重点练习各种量词与不可数名词的搭配。通过练习掌握正确使用 a piece of、a bar of、a bottle of 等量词。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '可数 vs 不可数名词对比',
          headers: ['可数名词', '不可数名词'],
          rows: [
            ['a book / books', 'bread（面包）'],
            ['a cup / cups', 'water（水）'],
            ['an apple / apples', 'sugar（糖）'],
            ['a box / boxes', 'rice（米饭）'],
            ['a glass / glasses', 'milk（牛奶）'],
          ],
        },
      },
    ],
    rules: [
      '可数名词有复数形式，不可数名词没有',
      '不可数名词用量词表示数量',
      'many + 可数名词复数 / much + 不可数名词',
      'a few + 可数名词复数 / a little + 不可数名词',
    ],
    examples: [
      {
        english: 'I have a few eggs.',
        chinese: '我有几个鸡蛋。（可数）',
        grammarPoint: 'a few + 可数名词',
      },
      {
        english: 'I have a little milk.',
        chinese: '我有一点牛奶。（不可数）',
        grammarPoint: 'a little + 不可数名词',
      },
      {
        english: 'How many books do you have?',
        chinese: '你有多少本书？',
        grammarPoint: 'many + 可数名词',
      },
      {
        english: 'How much water do you want?',
        chinese: '你要多少水？',
        grammarPoint: 'much + 不可数名词',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I have _____ bread.',
        options: ['a', 'some', 'many', 'few'],
        answer: 1,
        explanation: 'bread是不可数名词，用some修饰。',
        hint: '不可数名词不能用many',
      },
      {
        type: 'choice',
        question: 'There are _____ apples on the table.',
        options: ['a little', 'a few', 'much', 'little'],
        answer: 1,
        explanation: 'apples是可数名词复数，用a few修饰。',
        hint: '可数名词用a few',
      },
      {
        type: 'fill',
        question: 'Give me two _____ _____ chocolate.',
        fillAnswer: 'bars of',
        explanation: '两条巧克力用 two bars of chocolate。',
        hint: '量词可以有复数',
      },
      {
        type: 'choice',
        question: 'How _____ rice do we need?',
        options: ['many', 'much', 'few', 'a'],
        answer: 1,
        explanation: 'rice是不可数名词，用how much提问。',
        hint: '不可数名词用much',
      },
    ],
    tips: [
      '记住常见不可数名词：water, milk, bread, sugar, rice, money, news, homework',
      'a few 和 few 修饰可数名词，a little 和 little 修饰不可数名词',
      'some 既可修饰可数名词也可修饰不可数名词',
    ],
    relatedLessons: [41],
    difficulty: 'medium',
    keywords: ['可数名词', '不可数名词', 'a few', 'a little', 'many', 'much'],
  },

  // ==================== 第43课：情态动词 can ====================
  43: {
    title: '情态动词 can',
    subtitle: 'I can see some coffee.',
    explanation:
      "can 是英语中最常用的情态动词之一，表示能力（会/能）或许可（可以）。can 后面跟动词原形，没有人称和数的变化。否定形式为 cannot (can't)。",
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'can 的句型公式',
          formula: '主语 + can + 动词原形 + 其他',
          examples: ['I can see some coffee.', 'She can speak English.', 'He can swim very well.'],
        },
      },
      {
        type: 'table',
        content: {
          title: '情态动词 can 的特点',
          headers: ['特点', '说明', '示例'],
          rows: [
            ['后接动词原形', 'can 后不加 to，不加 -ing', 'I can swim.（不是 I can to swim.）'],
            ['无人称变化', '所有人称都用 can', 'I can / He can / They can'],
            ['否定形式', "can + not = can't / cannot", "I can't swim."],
            ['疑问形式', '将 can 提前', 'Can you swim?'],
          ],
        },
      },
    ],
    rules: [
      'can 是情态动词，后接动词原形',
      'can 没有人称和数的变化（第三人称不加 -s）',
      "否定形式：cannot = can't",
      '疑问形式：Can + 主语 + 动词原形?',
      '肯定回答：Yes, 主语 + can.',
      "否定回答：No, 主语 + can't (cannot).",
    ],
    examples: [
      {
        english: 'I can see some coffee.',
        chinese: '我能看见一些咖啡。',
        grammarPoint: 'can 表示能力',
      },
      { english: 'She can speak French.', chinese: '她会说法语。', grammarPoint: 'can 表示能力' },
      { english: 'Can you help me?', chinese: '你能帮我吗？', grammarPoint: 'can 表示请求' },
      {
        english: "Yes, I can. / No, I can't.",
        chinese: '是的，我能。/ 不，我不能。',
        grammarPoint: 'can 的回答',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ speak English.',
        options: ['can', 'cans', 'can to', 'canning'],
        answer: 0,
        explanation: 'can后接动词原形，没有人称变化。',
        hint: '情态动词后接什么？',
      },
      {
        type: 'choice',
        question: 'She _____ ride a bicycle.',
        options: ['can', 'cans', 'can to', 'is can'],
        answer: 0,
        explanation: 'can没有人称变化，第三人称单数也用can。',
        hint: 'can有第三人称变化吗？',
      },
      {
        type: 'fill',
        question: '_____ you see the bird?',
        fillAnswer: 'Can',
        explanation: '疑问句将can提到句首。',
        hint: '情态动词疑问句',
      },
      {
        type: 'choice',
        question: 'He _____ _____ type very fast.',
        options: ['can not', 'cans not', 'is not can', 'not can'],
        answer: 0,
        explanation: '否定形式为 cannot 或 can not。',
        hint: 'can的否定形式',
      },
    ],
    tips: [
      'can 是情态动词，永远不加 -s，不加 to',
      'can 的过去式是 could',
      '表示能力时 can = be able to',
      '注意区分 can（能）和 may（可以/可能）',
    ],
    relatedLessons: [41, 44],
    difficulty: 'easy',
    keywords: ['can', '情态动词', '能力', '会', '能'],
  },

  // ==================== 第44课：情态动词 can 练习 ====================
  44: {
    title: '复习：情态动词 can 练习',
    subtitle: 'Can you...?',
    explanation:
      '本课复习情态动词 can 的用法，重点练习 Can you...? 句型以及 can 的肯定和否定回答。通过各种场景练习 can 表示能力和请求的用法。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'Can 的问答模式',
          headers: ['问句', '肯定回答', '否定回答'],
          rows: [
            ['Can you swim?', 'Yes, I can.', "No, I can't."],
            ['Can she cook?', 'Yes, she can.', "No, she can't."],
            ['Can they come?', 'Yes, they can.', "No, they can't."],
            ['Can he drive?', 'Yes, he can.', "No, he can't."],
          ],
        },
      },
    ],
    rules: [
      'Can you...? 表示询问对方能力或许可',
      '肯定回答：Yes, I/you/he/she/we/they can.',
      "否定回答：No, I/you/he/she/we/they can't.",
      "回答中不能用 do/don't，要用 can/can't",
    ],
    examples: [
      {
        english: 'Can you see that tree?',
        chinese: '你能看到那棵树吗？',
        grammarPoint: 'Can you...?',
      },
      { english: 'Yes, I can.', chinese: '是的，我能看到。', grammarPoint: '肯定回答' },
      { english: "No, I can't.", chinese: '不，我看不到。', grammarPoint: '否定回答' },
      { english: 'What can you see?', chinese: '你能看到什么？', grammarPoint: '特殊疑问句' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Can you _____ a bird in the tree?',
        options: ['see', 'seeing', 'sees', 'to see'],
        answer: 0,
        explanation: 'can后面接动词原形。',
        hint: 'can + ?',
      },
      {
        type: 'choice',
        question: 'Yes, I _____.',
        options: ['am', 'do', 'can', 'is'],
        answer: 2,
        explanation: '用Can提问，用can回答。',
        hint: '问什么答什么',
      },
      {
        type: 'fill',
        question: 'No, she _____.',
        fillAnswer: "can't",
        explanation: "Can she...? 的否定回答用 can't。",
        hint: '否定回答',
      },
      {
        type: 'choice',
        question: '_____ can you see on the table?',
        options: ['What', 'Where', 'When', 'How'],
        answer: 0,
        explanation: 'What can you see? 问能看到什么。',
        hint: '问"什么"',
      },
    ],
    tips: [
      "Can you...? 的回答必须用 can/can't，不能用 do/don't",
      'Can 表示请求时，也可以用 Could 更加礼貌',
      'What can you see? / Where can you find it? 是常见疑问句',
    ],
    relatedLessons: [43],
    difficulty: 'easy',
    keywords: ['Can', '疑问句', '回答', '能力'],
  },

  // ==================== 第45课：can 的否定和疑问 ====================
  45: {
    title: 'can 的否定和疑问',
    subtitle: "I can't type. Can you type?",
    explanation:
      "本课深入学习 can 的否定形式（can't / cannot）和疑问形式（Can + 主语 + 动词原形?）。can't 是 cannot 的缩写形式，在口语和书面语中都很常见。",
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'can 的三种句式',
          items: [
            { label: '肯定句', example: 'I can type.', explanation: '主语 + can + 动词原形' },
            {
              label: '否定句',
              example: "I can't type.",
              explanation: "主语 + can't (cannot) + 动词原形",
            },
            { label: '疑问句', example: 'Can you type?', explanation: 'Can + 主语 + 动词原形?' },
          ],
        },
      },
      {
        type: 'formula',
        content: {
          title: 'can 的否定疑问句',
          formula: "Can't + 主语 + 动词原形? （难道不能...？）",
          examples: [
            "Can't you type? （你难道不会打字吗？）",
            "Can't he swim? （他难道不会游泳吗？）",
          ],
        },
      },
    ],
    rules: [
      "否定形式：主语 + can't (cannot) + 动词原形",
      '一般疑问句：Can + 主语 + 动词原形?',
      "否定疑问句：Can't + 主语 + 动词原形?",
      'cannot 是一个词，也可写作 can not（较少见）',
      "can't 和 cannot 意思完全相同",
    ],
    examples: [
      { english: "I can't type.", chinese: '我不会打字。', grammarPoint: "can't 否定" },
      { english: 'Can you type?', chinese: '你会打字吗？', grammarPoint: 'can 疑问' },
      { english: "She can't drive a car.", chinese: '她不会开车。', grammarPoint: "can't 否定" },
      { english: "Can't you help me?", chinese: '你难道不能帮我吗？', grammarPoint: '否定疑问句' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ _____ type very well.',
        options: ['can not', 'cans not', 'am not can', 'not can'],
        answer: 0,
        explanation: 'can的否定形式为cannot或can not。',
        hint: 'can + not',
      },
      {
        type: 'choice',
        question: '_____ she speak Chinese?',
        options: ['Does', 'Is', 'Can', 'Do'],
        answer: 2,
        explanation: '询问能力用Can + 主语 + 动词原形。',
        hint: '问能力',
      },
      {
        type: 'fill',
        question: 'No, I _____. I cannot type.',
        fillAnswer: "can't",
        explanation: "Can的否定回答用can't。",
        hint: '否定回答',
      },
      {
        type: 'choice',
        question: 'He _____ drive a car. He is too young.',
        options: ['can', "can't", 'cans', "can't to"],
        answer: 1,
        explanation: "他太小了，所以不能开车。否定用can't。",
        hint: '太小了不能做什么？',
      },
    ],
    tips: [
      "can't 是 cannot 的缩写，cannot 是一个词",
      "缩写形式 can't 在口语中更常见",
      '注意：can 后面的动词永远是原形，即使否定也是如此',
      "否定疑问句 Can't you...? 表示惊讶或不理解",
    ],
    relatedLessons: [43, 46],
    difficulty: 'easy',
    keywords: ["can't", 'cannot', '否定', '疑问', '能力'],
  },

  // ==================== 第46课：can 的否定和疑问练习 ====================
  46: {
    title: '复习：can 的否定和疑问练习',
    subtitle: "Can't you...?",
    explanation:
      '本课通过大量练习巩固 can 的否定句和疑问句用法，包括一般疑问句和特殊疑问句的回答方式。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'can 句型转换汇总',
          headers: ['句型', '结构', '例句'],
          rows: [
            ['肯定句', '主语 + can + 动词原形', 'I can read.'],
            ['否定句', "主语 + can't + 动词原形", "I can't read."],
            ['一般疑问句', 'Can + 主语 + 动词原形?', 'Can you read?'],
            ['特殊疑问句', '疑问词 + can + 主语 + 动词原形?', 'What can you read?'],
          ],
        },
      },
    ],
    rules: [
      'can 的句型转换不需要助动词 do/does',
      '一般疑问句直接把 can 提前',
      '特殊疑问句：疑问词 + can + 主语 + 动词原形',
    ],
    examples: [
      { english: 'He can lift the desk.', chinese: '他能搬动桌子。', grammarPoint: '肯定句' },
      { english: "He can't lift the desk.", chinese: '他搬不动桌子。', grammarPoint: '否定句' },
      { english: 'Can he lift the desk?', chinese: '他能搬动桌子吗？', grammarPoint: '疑问句' },
      { english: 'What can he lift?', chinese: '他能搬动什么？', grammarPoint: '特殊疑问句' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ she _____ this heavy box?',
        options: ['Can...lift', 'Does...lift', 'Is...lift', 'Can...lifts'],
        answer: 0,
        explanation: '疑问句：Can + 主语 + 动词原形? 第一个空Can，第二个空lift原形。',
        hint: 'Can + 主语 + 原形',
      },
      {
        type: 'fill',
        question: 'They _____ _____ read French.',
        fillAnswer: "can't",
        explanation: "否定句：主语 + can't + 动词原形。",
        hint: '不会',
      },
      {
        type: 'choice',
        question: '_____ can the baby do?',
        options: ['What', 'Where', 'When', 'How'],
        answer: 0,
        explanation: 'What can...? 问能做什么。',
        hint: '问"什么"',
      },
      {
        type: 'fill',
        question: 'No, she _____.',
        fillAnswer: "can't",
        explanation: "Can she...? 的否定回答为 can't。",
        hint: '否定回答',
      },
    ],
    tips: [
      'can 的疑问句和否定句都不需要借助 do/does',
      'What can you see? / Where can we go? / How can I help?',
      "回答 Can...? 只用 Yes/No + 主语 + can/can't",
    ],
    relatedLessons: [45],
    difficulty: 'easy',
    keywords: ['can', '否定句', '疑问句', '句型转换'],
  },

  // ==================== 第47课：一般现在时（like） ====================
  47: {
    title: '一般现在时（like）',
    subtitle: 'Do you like coffee? I like...',
    explanation:
      '一般现在时表示经常性、习惯性的动作或客观事实。本课学习用 like 表达喜好的一般现在时句型。Do you like...? 用于询问喜好，I like... 用于表达喜好。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'like 的一般现在时',
          formula: '主语 + like/likes + 名词/动名词',
          examples: ['I like coffee.', 'You like tea.', 'She likes milk.'],
        },
      },
      {
        type: 'table',
        content: {
          title: 'Do you like...? 问答模式',
          headers: ['问句', '肯定回答', '否定回答'],
          rows: [
            ['Do you like coffee?', 'Yes, I do.', "No, I don't."],
            ['Do you like tea?', 'Yes, I do.', "No, I don't."],
            ['Do they like apples?', 'Yes, they do.', "No, they don't."],
          ],
        },
      },
    ],
    rules: [
      '一般现在时表示经常性或习惯性的动作',
      '第一/二人称及复数：主语 + like + 名词/动名词',
      'Do you like...? 用于询问对方的喜好',
      "肯定回答：Yes, I do. / 否定回答：No, I don't.",
      "否定句：I don't like...",
    ],
    examples: [
      { english: 'I like coffee.', chinese: '我喜欢咖啡。', grammarPoint: '主语 + like' },
      { english: 'Do you like tea?', chinese: '你喜欢茶吗？', grammarPoint: 'Do you like...?' },
      { english: "No, I don't like tea.", chinese: '不，我不喜欢茶。', grammarPoint: "don't like" },
      { english: 'I like reading books.', chinese: '我喜欢读书。', grammarPoint: 'like + 动名词' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ coffee very much.',
        options: ['like', 'likes', 'liking', 'to like'],
        answer: 0,
        explanation: '主语是I（第一人称），动词用原形like。',
        hint: '第一人称用原形',
      },
      {
        type: 'choice',
        question: '_____ you like ice cream?',
        options: ['Do', 'Does', 'Are', 'Is'],
        answer: 0,
        explanation: '主语是you，用Do构成疑问句。',
        hint: '第二人称用Do',
      },
      {
        type: 'fill',
        question: 'Yes, I _____.',
        fillAnswer: 'do',
        explanation: 'Do you like...? 的肯定回答用 Yes, I do.',
        hint: '问什么答什么',
      },
      {
        type: 'choice',
        question: 'I _____ _____ like butter.',
        options: ['do not', 'does not', 'am not', 'is not'],
        answer: 0,
        explanation: "主语是I，否定用 do not (don't)。",
        hint: '第一人称否定用什么？',
      },
    ],
    tips: [
      'like 后面可以跟名词（I like coffee）或动名词（I like swimming）',
      '一般现在时表示习惯和喜好，不是正在发生的动作',
      'Do you like...? 问的是长期的喜好',
      'Are you liking...? 这种说法是错误的，like不用进行时',
    ],
    relatedLessons: [45, 48],
    difficulty: 'easy',
    keywords: ['一般现在时', 'like', 'Do you like', '喜好'],
  },

  // ==================== 第48课：一般现在时（like）练习 ====================
  48: {
    title: '复习：一般现在时（like）练习',
    subtitle: 'Do you like...?',
    explanation:
      "本课复习一般现在时中 like 的用法，通过各种练习巩固 Do you like...? 句型以及 I like / I don't like 的表达方式。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'like 句型汇总',
          headers: ['句型', '结构', '例句'],
          rows: [
            ['肯定句', '主语 + like(s) + ...', 'I like coffee.'],
            ['否定句', "主语 + don't/doesn't + like + ...", "I don't like tea."],
            ['一般疑问句', 'Do/Does + 主语 + like + ...?', 'Do you like milk?'],
            ['特殊疑问句', 'What + do/does + 主语 + like?', 'What do you like?'],
          ],
        },
      },
    ],
    rules: [
      'I/You/We/They + like（第一、二人称及复数用原形）',
      "Do you like...? 的回答用 do/don't",
      "don't like 表示不喜欢",
    ],
    examples: [
      {
        english: 'Do you like butter?',
        chinese: '你喜欢黄油吗？',
        grammarPoint: 'Do you like...?',
      },
      {
        english: 'Yes, I do. I like butter.',
        chinese: '是的，我喜欢黄油。',
        grammarPoint: '肯定回答',
      },
      {
        english: "No, I don't. I don't like butter.",
        chinese: '不，我不喜欢黄油。',
        grammarPoint: '否定回答',
      },
      { english: 'What do you like?', chinese: '你喜欢什么？', grammarPoint: '特殊疑问句' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ they like oranges?',
        options: ['Do', 'Does', 'Are', 'Is'],
        answer: 0,
        explanation: '主语是they（复数），用Do。',
        hint: '复数主语用什么？',
      },
      {
        type: 'choice',
        question: "No, I _____. I don't like oranges.",
        options: ['am not', "don't", "can't", "doesn't"],
        answer: 1,
        explanation: "Do you like...? 的否定回答用 don't。",
        hint: 'Do的否定回答',
      },
      {
        type: 'fill',
        question: 'What _____ you like to eat?',
        fillAnswer: 'do',
        explanation: 'What do you like...? 主语是you，用do。',
        hint: '第二人称',
      },
      {
        type: 'choice',
        question: 'I _____ _____ like sugar in my coffee.',
        options: ['am not', 'do not', 'does not', 'is not'],
        answer: 1,
        explanation: "主语I，否定用 do not (don't)。",
        hint: 'I 的否定形式',
      },
    ],
    tips: [
      'Do you like...? 问长期习惯性喜好',
      'What do you like? 可以用来了解别人的兴趣',
      'like 后跟动名词时：I like swimming（我喜欢游泳）',
    ],
    relatedLessons: [47],
    difficulty: 'easy',
    keywords: ['一般现在时', 'like', 'Do', '练习'],
  },

  // ==================== 第49课：一般现在时（第三人称单数） ====================
  49: {
    title: '一般现在时（第三人称单数）',
    subtitle: "He likes... He doesn't like...",
    explanation:
      "当主语是第三人称单数（he/she/it）时，一般现在时的动词要加 -s 或 -es。这是英语语法中的一个重要规则。否定句和疑问句要用 does/doesn't。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: '第三人称单数动词变化规则',
          headers: ['规则', '方法', '例子'],
          rows: [
            ['一般情况', '加 -s', 'like → likes, read → reads'],
            ['以s, x, sh, ch, o结尾', '加 -es', 'go → goes, watch → watches'],
            ['以辅音字母+y结尾', '变y为i加 -es', 'study → studies, carry → carries'],
            ['以元音字母+y结尾', '直接加 -s', 'play → plays, enjoy → enjoys'],
            ['特殊变化', '不规则', 'have → has'],
          ],
        },
      },
    ],
    rules: [
      '第三人称单数（he/she/it）动词加 -s 或 -es',
      '一般加 -s：likes, reads, plays',
      '以 s/x/sh/ch/o 结尾加 -es：watches, goes',
      '辅音+y 结尾变 y 为 i 加 -es：studies, carries',
      "否定句用 doesn't + 动词原形（注意不是动词加s）",
      '疑问句用 Does + 主语 + 动词原形?',
    ],
    examples: [
      {
        english: 'He likes ice cream.',
        chinese: '他喜欢冰淇淋。',
        grammarPoint: '第三人称单数加 -s',
      },
      {
        english: 'She watches TV every day.',
        chinese: '她每天看电视。',
        grammarPoint: '以ch结尾加 -es',
      },
      {
        english: "He doesn't like butter.",
        chinese: '他不喜欢黄油。',
        grammarPoint: "doesn't + 动词原形",
      },
      {
        english: 'Does she like coffee?',
        chinese: '她喜欢咖啡吗？',
        grammarPoint: 'Does + 主语 + 动词原形',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'She _____ English every day.',
        options: ['study', 'studys', 'studies', 'studying'],
        answer: 2,
        explanation: '辅音+y结尾，变y为i加-es：studies。',
        hint: '辅音+y 变什么？',
      },
      {
        type: 'choice',
        question: 'He _____ _____ like milk.',
        options: ["don't", "doesn't", "isn't", "aren't"],
        answer: 1,
        explanation: "第三人称单数否定用 doesn't + 动词原形。",
        hint: '第三人称否定',
      },
      {
        type: 'fill',
        question: '_____ she _____ TV every evening?',
        fillAnswer: 'Does...watch',
        explanation: '第三人称疑问用 Does + 主语 + 动词原形。',
        hint: 'Does + 主语 + 原形',
      },
      {
        type: 'choice',
        question: 'Tom _____ to school by bus.',
        options: ['go', 'goes', 'gos', 'going'],
        answer: 1,
        explanation: 'go以o结尾，加-es变成goes。',
        hint: '以o结尾加什么？',
      },
    ],
    tips: [
      '第三人称单数包括：he, she, it, Tom, the cat, my mother 等',
      "doesn't 后面的动词必须用原形：He doesn't likes. ✗ → He doesn't like. ✓",
      '以o结尾的动词加 -es：go→goes, do→does',
      'have 的第三人称单数是 has（特殊变化）',
    ],
    relatedLessons: [47, 50],
    difficulty: 'medium',
    keywords: ['第三人称单数', '-s', '-es', "doesn't", 'Does'],
  },

  // ==================== 第50课：一般现在时（第三人称单数）练习 ====================
  50: {
    title: '复习：一般现在时（第三人称单数）练习',
    subtitle: 'He likes... She goes...',
    explanation:
      "本课通过大量练习巩固第三人称单数动词变化规则，包括 -s/-es/-ies 的变化、does/doesn't 的用法等。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: '第三人称单数句型对比',
          headers: ['句型', '结构', '例句'],
          rows: [
            ['肯定句', '主语(三单) + 动词-s/es', 'He likes music.'],
            ['否定句', "主语(三单) + doesn't + 动词原形", "He doesn't like music."],
            ['疑问句', 'Does + 主语 + 动词原形?', 'Does he like music?'],
          ],
        },
      },
    ],
    rules: [
      '肯定句动词加-s/es，否定句和疑问句用does，动词恢复原形',
      "特别注意 doesn't 后面动词是原形，不是加s的形式",
      'Does he like...? 不是 Does he likes...',
    ],
    examples: [
      {
        english: 'He plays football on Sundays.',
        chinese: '他周日踢足球。',
        grammarPoint: '第三人称单数肯定',
      },
      {
        english: "He doesn't play football on Sundays.",
        chinese: '他周日不踢足球。',
        grammarPoint: '第三人称单数否定',
      },
      {
        english: 'Does he play football on Sundays?',
        chinese: '他周日踢足球吗？',
        grammarPoint: '第三人称单数疑问',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'My sister _____ her homework after school.',
        options: ['do', 'does', 'dos', 'doing'],
        answer: 1,
        explanation: 'do以o结尾，第三人称单数加-es变成does。',
        hint: 'do的第三人称形式',
      },
      {
        type: 'choice',
        question: '_____ he _____ newspapers every morning?',
        options: ['Does...read', 'Does...reads', 'Do...read', 'Is...read'],
        answer: 0,
        explanation: 'Does + 主语 + 动词原形。',
        hint: 'Does + 原形',
      },
      {
        type: 'fill',
        question: 'She _____ _____ like spicy food.',
        fillAnswer: "doesn't",
        explanation: "第三人称单数否定用 doesn't。",
        hint: '第三人称否定',
      },
      {
        type: 'choice',
        question: 'The cat _____ milk every morning.',
        options: ['drink', 'drinks', 'drinking', 'to drink'],
        answer: 1,
        explanation: 'The cat 是第三人称单数，drink加-s。',
        hint: '动物是第三人称单数',
      },
    ],
    tips: [
      '做题时先判断主语是否是第三人称单数',
      "如果用 does/doesn't，后面的动词一定是原形",
      "如果主语后动词加了 -s/-es，就不再需要 does/doesn't",
      '否定句和疑问句中已经体现了第三人称（does），动词不用再加s',
    ],
    relatedLessons: [49],
    difficulty: 'medium',
    keywords: ['第三人称单数', '练习', 'does', "doesn't"],
  },

  // ==================== 第51课：一般现在时（疑问和否定） ====================
  51: {
    title: '一般现在时（疑问和否定）',
    subtitle: "Does he like...? He doesn't like...",
    explanation:
      "本课系统学习一般现在时的疑问句和否定句。第一/二人称及复数用 do/don't，第三人称单数用 does/doesn't。注意 don't/doesn't 后面的动词必须用原形。",
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'do vs does 的使用场景',
          items: [
            {
              label: 'I / You / We / They',
              example: 'Do you like coffee?',
              explanation: "非第三人称单数用 do/don't",
            },
            {
              label: 'He / She / It',
              example: 'Does he like coffee?',
              explanation: "第三人称单数用 does/doesn't",
            },
          ],
        },
      },
      {
        type: 'table',
        content: {
          title: '一般现在时疑问和否定汇总',
          headers: ['主语类型', '疑问句', '否定句'],
          rows: [
            ['I/You/We/They', 'Do + 主语 + 动词原形?', "主语 + don't + 动词原形"],
            ['He/She/It', 'Does + 主语 + 动词原形?', "主语 + doesn't + 动词原形"],
          ],
        },
      },
    ],
    rules: [
      '非三单主语：Do you/we/they + 动词原形?',
      '三单主语：Does he/she/it + 动词原形?',
      "非三单否定：I/You/We/They + don't + 动词原形",
      "三单否定：He/She/It + doesn't + 动词原形",
      "don't/doesn't 后面动词必须用原形",
      "回答：Yes, 主语 + do/does. / No, 主语 + don't/doesn't.",
    ],
    examples: [
      {
        english: 'Does he like butter?',
        chinese: '他喜欢黄油吗？',
        grammarPoint: 'Does + 三单主语 + 动词原形',
      },
      {
        english: "No, he doesn't like butter.",
        chinese: '不，他不喜欢黄油。',
        grammarPoint: "doesn't + 动词原形",
      },
      {
        english: 'Do they come from China?',
        chinese: '他们来自中国吗？',
        grammarPoint: 'Do + 复数主语 + 动词原形',
      },
      { english: "I don't know.", chinese: '我不知道。', grammarPoint: "don't + 动词原形" },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ your father _____ coffee?',
        options: ['Does...like', 'Does...likes', 'Do...like', 'Do...likes'],
        answer: 0,
        explanation: 'your father 是第三人称单数，用Does + 动词原形like。',
        hint: 'your father = he',
      },
      {
        type: 'choice',
        question: 'They _____ _____ live in London.',
        options: ["doesn't", "don't", "isn't", "aren't"],
        answer: 1,
        explanation: "主语They（复数），否定用 don't。",
        hint: '复数用什么？',
      },
      {
        type: 'fill',
        question: '_____ she _____ to school by bus?',
        fillAnswer: 'Does...go',
        explanation: 'she是第三人称单数，用Does + 动词原形go。',
        hint: '三单疑问句',
      },
      {
        type: 'choice',
        question: 'He _____ _____ milk for breakfast.',
        options: ["don't drink", "doesn't drinks", "doesn't drink", "isn't drink"],
        answer: 2,
        explanation: "第三人称单数否定用 doesn't + 动词原形drink。",
        hint: "doesn't 后面用什么形式？",
      },
    ],
    tips: [
      "记住：does/doesn't 出现的地方，动词就用原形",
      '一个句子里不会同时出现 does 和动词加 -s',
      'What does he like? / Where does she live? / When does he get up?',
    ],
    relatedLessons: [49, 52],
    difficulty: 'medium',
    keywords: ['一般现在时', 'Does', "doesn't", 'Do', "don't", '疑问', '否定'],
  },

  // ==================== 第52课：一般现在时（疑问和否定）练习 ====================
  52: {
    title: '复习：一般现在时（疑问和否定）练习',
    subtitle: "Does...? Don't...?",
    explanation:
      "本课通过大量练习巩固一般现在时的疑问句和否定句，特别注意 do/does/don't/doesn't 的正确使用。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'do/does 使用速查表',
          headers: ['主语', '疑问', '否定', '肯定回答'],
          rows: [
            ['I', 'Do I...?', "I don't...", 'Yes, I do.'],
            ['You', 'Do you...?', "You don't...", 'Yes, you do.'],
            ['We/They', 'Do we/they...?', "We/They don't...", 'Yes, we/they do.'],
            ['He/She/It', 'Does he/she/it...?', "He/She/It doesn't...", 'Yes, he/she/it does.'],
          ],
        },
      },
    ],
    rules: [
      'do/does 的选择取决于主语，不是动词',
      "出现 does/doesn't 时动词用原形",
      "出现 do/don't 时动词也用原形",
    ],
    examples: [
      {
        english: 'Does Mrs. Jones like tea?',
        chinese: '琼斯太太喜欢茶吗？',
        grammarPoint: 'Does + 三单',
      },
      {
        english: 'Yes, she does. She likes tea.',
        chinese: '是的，她喜欢。',
        grammarPoint: '肯定回答',
      },
      {
        english: "No, she doesn't. She doesn't like tea.",
        chinese: '不，她不喜欢。',
        grammarPoint: '否定回答',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ your mother work in a hospital?',
        options: ['Do', 'Does', 'Is', 'Are'],
        answer: 1,
        explanation: 'your mother = she，第三人称单数用Does。',
        hint: 'your mother = ?',
      },
      {
        type: 'fill',
        question: 'No, she _____. She works in a school.',
        fillAnswer: "doesn't",
        explanation: "Does she...? 的否定回答用 doesn't。",
        hint: '否定回答',
      },
      {
        type: 'choice',
        question: 'The children _____ _____ watch TV on weekdays.',
        options: ["doesn't", "don't", "isn't", "aren't"],
        answer: 1,
        explanation: "The children是复数，否定用don't。",
        hint: 'children是单数还是复数？',
      },
      {
        type: 'fill',
        question: "_____ the shops _____ at 9 o'clock?",
        fillAnswer: 'Do...open',
        explanation: 'the shops是复数，用Do + 动词原形open。',
        hint: '复数主语',
      },
    ],
    tips: [
      '做题口诀：三单用does，其他都用do',
      "否定回答和肯定回答要一致：Does he...? → Yes, he does. / No, he doesn't.",
      '不要混淆 be 动词（is/am/are）和助动词（do/does）',
    ],
    relatedLessons: [51],
    difficulty: 'medium',
    keywords: ['do', 'does', "don't", "doesn't", '练习'],
  },

  // ==================== 第53课：一般现在时（频率副词） ====================
  53: {
    title: '一般现在时（频率副词）',
    subtitle: 'always, usually, often, sometimes, never',
    explanation:
      '频率副词表示动作发生的频率。它们通常放在be动词之后、实义动词之前。频率从高到低排列：always（总是）> usually（通常）> often（经常）> sometimes（有时）> never（从不）。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '频率副词一览',
          headers: ['频率副词', '频率', '中文', '位置'],
          rows: [
            ['always', '100%', '总是', '实义动词前 / be动词后'],
            ['usually', '约80%', '通常', '实义动词前 / be动词后'],
            ['often', '约60%', '经常', '实义动词前 / be动词后'],
            ['sometimes', '约40%', '有时', '句首/句中/句末'],
            ['never', '0%', '从不', '实义动词前 / be动词后'],
          ],
        },
      },
    ],
    rules: [
      '频率副词放在实义动词之前：I always get up early.',
      '频率副词放在be动词之后：He is always late.',
      'sometimes 位置灵活，可放句首、句中或句末',
      "never 表示否定含义，句子不再用 don't",
      '频率副词用于一般现在时',
    ],
    examples: [
      {
        english: 'He always gets up early.',
        chinese: '他总是早起。',
        grammarPoint: 'always + 实义动词前',
      },
      {
        english: 'She is usually at home.',
        chinese: '她通常在家。',
        grammarPoint: 'usually + be动词后',
      },
      {
        english: 'Sometimes I go to school by bus.',
        chinese: '有时我坐公共汽车去学校。',
        grammarPoint: 'sometimes 在句首',
      },
      { english: 'He never smokes.', chinese: '他从不抽烟。', grammarPoint: 'never 表否定' },
    ],
    exercises: [
      {
        type: 'choice',
        question: "She _____ has breakfast at 7 o'clock.",
        options: ['always', 'is always', 'always is', 'are always'],
        answer: 0,
        explanation: 'has是实义动词，频率副词放在实义动词前。',
        hint: '实义动词前',
      },
      {
        type: 'choice',
        question: 'He is _____ late for school.',
        options: ['never', 'is never', 'never is', "doesn't never"],
        answer: 0,
        explanation: 'is是be动词，频率副词放在be动词后。',
        hint: 'be动词后',
      },
      {
        type: 'fill',
        question: 'I _____ go to bed at 10 p.m.',
        fillAnswer: 'usually',
        explanation: 'usually放在实义动词go之前。',
        hint: '通常做什么',
      },
      {
        type: 'choice',
        question: "She _____ goes to the cinema. She doesn't like films.",
        options: ['always', 'usually', 'often', 'never'],
        answer: 3,
        explanation: '她不喜欢电影，所以从不去电影院。never = 从不。',
        hint: '不喜欢所以...',
      },
    ],
    tips: [
      '频率副词的位置口诀：be后行（动词）前',
      "never 本身有否定含义，不用再加 don't",
      'sometimes 位置最灵活，可以放句首、句中、句末',
      '频率副词的提问用 How often...?（多久一次？）',
    ],
    relatedLessons: [51, 54],
    difficulty: 'medium',
    keywords: ['频率副词', 'always', 'usually', 'often', 'sometimes', 'never'],
  },

  // ==================== 第54课：一般现在时（频率副词）练习 ====================
  54: {
    title: '复习：一般现在时（频率副词）练习',
    subtitle: 'How often...?',
    explanation:
      '本课复习频率副词的用法和位置，通过练习巩固 always, usually, often, sometimes, never 的正确使用。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '频率副词位置公式',
          formula: '主语 + be动词 + 频率副词 + ... / 主语 + 频率副词 + 实义动词 + ...',
          examples: ['He is always happy. （be动词后）', 'He always smiles. （实义动词前）'],
        },
      },
    ],
    rules: [
      '频率副词放在be动词之后、实义动词之前',
      'How often...? 用于询问频率',
      "never 已含否定意义，句中不再用 don't/doesn't",
    ],
    examples: [
      {
        english: 'How often do you go swimming?',
        chinese: '你多久去游一次泳？',
        grammarPoint: 'How often 提问频率',
      },
      {
        english: 'I usually go swimming on Saturdays.',
        chinese: '我通常周六去游泳。',
        grammarPoint: 'usually + 实义动词前',
      },
      { english: 'He is never angry.', chinese: '他从不生气。', grammarPoint: 'never + be动词后' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ drink coffee in the morning.',
        options: ['sometimes', 'am sometimes', 'sometimes am', 'do sometimes'],
        answer: 0,
        explanation: 'drink是实义动词，频率副词放在实义动词前。',
        hint: '实义动词前',
      },
      {
        type: 'fill',
        question: 'She is _____ happy.',
        fillAnswer: 'always',
        explanation: 'is是be动词，频率副词放在be动词后。',
        hint: 'be动词后放频率副词',
      },
      {
        type: 'choice',
        question: 'He _____ _____ complains. He is very patient.',
        options: ['always', 'usually', 'sometimes', 'never'],
        answer: 3,
        explanation: '他很有耐心，所以从不抱怨。never = 从不。',
        hint: '很有耐心所以...',
      },
      {
        type: 'fill',
        question: '_____ _____ do you visit your grandparents?',
        fillAnswer: 'How often',
        explanation: '询问频率用 How often。',
        hint: '多久一次',
      },
    ],
    tips: [
      'How often do you...? 用于询问做某事的频率',
      '回答频率时可用频率副词：always / usually / often / sometimes / never',
      '也可用具体时间回答：every day / once a week / twice a month',
    ],
    relatedLessons: [53],
    difficulty: 'medium',
    keywords: ['频率副词', 'How often', '位置', '练习'],
  },

  // ==================== 第55课：一般现在时（习惯性动作） ====================
  55: {
    title: '一般现在时（习惯性动作）',
    subtitle: 'The Sawyers live at 87 King Street.',
    explanation:
      '一般现在时最重要的用法之一是描述习惯性动作和日常生活。本课通过一家人（the Sawyers）的日常生活，学习如何用一般现在时描述日常作息和习惯。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '描述日常作息的常用表达',
          headers: ['时间', '英文表达', '中文'],
          rows: [
            ['早上', 'get up / have breakfast', '起床 / 吃早餐'],
            ['上午', 'go to work / go to school', '去上班 / 去上学'],
            ['中午', 'have lunch', '吃午餐'],
            ['下午', 'come home / do homework', '回家 / 做作业'],
            ['晚上', 'have dinner / watch TV', '吃晚餐 / 看电视'],
            ['睡觉', 'go to bed', '上床睡觉'],
          ],
        },
      },
    ],
    rules: [
      '一般现在时描述经常性、习惯性的动作',
      '注意主语是第三人称单数时动词要加 -s/-es',
      '描述日常生活常与时间状语连用：every day, in the morning, at night',
      '描述客观事实也用一般现在时：The earth goes around the sun.',
    ],
    examples: [
      {
        english: 'The Sawyers live at 87 King Street.',
        chinese: '索耶一家住在国王街87号。',
        grammarPoint: '描述居住地点',
      },
      {
        english: 'Mr. Sawyer goes to work every day.',
        chinese: '索耶先生每天去上班。',
        grammarPoint: '第三人称单数 + every day',
      },
      {
        english: 'Mrs. Sawyer stays at home.',
        chinese: '索耶太太待在家里。',
        grammarPoint: '描述习惯性动作',
      },
      {
        english: 'The children go to school every morning.',
        chinese: '孩子们每天早上去上学。',
        grammarPoint: '复数主语 + every morning',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: "Mr. Smith _____ to work at 8 o'clock every morning.",
        options: ['go', 'goes', 'going', 'to go'],
        answer: 1,
        explanation: 'Mr. Smith是第三人称单数，go加-es变成goes。',
        hint: '第三人称单数',
      },
      {
        type: 'choice',
        question: 'The children _____ their homework in the evening.',
        options: ['does', 'do', 'doing', 'to do'],
        answer: 1,
        explanation: 'the children是复数主语，动词用原形do。',
        hint: '复数主语用原形',
      },
      {
        type: 'fill',
        question: 'She _____ dinner at 6 p.m. every day.',
        fillAnswer: 'has',
        explanation: 'she是第三人称单数，have变成has。',
        hint: 'have的第三人称形式',
      },
      {
        type: 'choice',
        question: 'We _____ at 87 King Street.',
        options: ['lives', 'live', 'living', 'to live'],
        answer: 1,
        explanation: 'We是复数主语，动词用原形live。',
        hint: '复数主语用原形',
      },
    ],
    tips: [
      '一般现在时描述习惯性动作，常搭配 every day, every morning, always 等',
      '描述日常生活场景时，注意主语的单复数',
      'family / the Sawyers 等集体名词作主语时通常用复数动词',
      '描述客观事实也用一般现在时',
    ],
    relatedLessons: [53, 56],
    difficulty: 'medium',
    keywords: ['一般现在时', '习惯性动作', '日常生活', 'every day'],
  },

  // ==================== 第56课：一般现在时（习惯性动作）练习 ====================
  56: {
    title: '复习：一般现在时（习惯性动作）练习',
    subtitle: '日常作息练习',
    explanation:
      '本课复习一般现在时描述习惯性动作和日常生活的用法，通过练习巩固日常作息的英语表达。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '日常作息时间表',
          headers: ['时间', '活动', '第三人称单数形式'],
          rows: [
            ['7:00', 'get up', 'He gets up at 7.'],
            ['7:30', 'have breakfast', 'She has breakfast at 7:30.'],
            ['8:00', 'go to work', 'He goes to work at 8.'],
            ['12:00', 'have lunch', 'She has lunch at 12.'],
            ['18:00', 'come home', 'He comes home at 6.'],
            ['22:00', 'go to bed', 'She goes to bed at 10.'],
          ],
        },
      },
    ],
    rules: [
      '描述习惯性动作用一般现在时',
      '注意第三人称单数动词变化',
      '时间状语：every day / every morning / in the evening / at night',
    ],
    examples: [
      {
        english: "He gets up at 7 o'clock every morning.",
        chinese: '他每天早上7点起床。',
        grammarPoint: '三单 + every morning',
      },
      {
        english: 'They have dinner together every evening.',
        chinese: '他们每天晚上一起吃晚饭。',
        grammarPoint: '复数 + every evening',
      },
      {
        english: 'She takes the bus to work.',
        chinese: '她坐公共汽车上班。',
        grammarPoint: '三单描述习惯',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'My father _____ to work by car every day.',
        options: ['go', 'goes', 'going', 'to go'],
        answer: 1,
        explanation: 'My father = he，第三人称单数，go加-es。',
        hint: '第三人称单数',
      },
      {
        type: 'fill',
        question: "They _____ lunch at 12 o'clock.",
        fillAnswer: 'have',
        explanation: 'They是复数主语，动词用原形have。',
        hint: '复数主语',
      },
      {
        type: 'choice',
        question: 'She _____ her teeth before bed.',
        options: ['brush', 'brushs', 'brushes', 'brushing'],
        answer: 2,
        explanation: 'brush以sh结尾，加-es变成brushes。',
        hint: '以sh结尾',
      },
      {
        type: 'fill',
        question: 'The baby _____ at 10 p.m. every night.',
        fillAnswer: 'sleeps',
        explanation: 'The baby = it，第三人称单数，sleep加-s。',
        hint: '宝宝是第三人称单数',
      },
    ],
    tips: [
      '写一段关于自己日常作息的短文来练习',
      '注意 do→does, go→goes, have→has 这些特殊变化',
      '第三人称单数不只有 he/she/it，还包括具体的人名、the cat 等',
    ],
    relatedLessons: [55],
    difficulty: 'medium',
    keywords: ['习惯性动作', '日常生活', '练习'],
  },

  // ==================== 第57课：一般现在时 vs 现在进行时 ====================
  57: {
    title: '一般现在时 vs 现在进行时',
    subtitle: 'He usually shaves, but today he is not shaving.',
    explanation:
      '一般现在时表示经常性、习惯性的动作；现在进行时表示此刻正在进行的动作。当对比如"平时"和"此刻"时，常用这两种时态对比：He usually shaves, but today he is not shaving.',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '一般现在时 vs 现在进行时',
          items: [
            {
              label: '一般现在时',
              example: 'He usually shaves.',
              explanation: '描述习惯性、经常性的动作',
            },
            {
              label: '现在进行时',
              example: 'He is shaving now.',
              explanation: '描述此刻正在进行的动作',
            },
            {
              label: '对比使用',
              example: 'He usually shaves, but today he is not shaving.',
              explanation: '平时习惯 vs 今天特殊情况',
            },
          ],
        },
      },
      {
        type: 'table',
        content: {
          title: '两种时态对比',
          headers: ['特征', '一般现在时', '现在进行时'],
          rows: [
            ['意义', '习惯性/经常性', '此刻正在进行'],
            ['标志词', 'every day, usually, always', 'now, at the moment, today'],
            ['结构', '主语 + 动词(s)', '主语 + am/is/are + doing'],
            ['例句', 'He drinks coffee.', 'He is drinking coffee.'],
          ],
        },
      },
    ],
    rules: [
      '一般现在时：描述习惯性、经常性动作（every day, usually）',
      '现在进行时：描述此刻正在进行的动作（now, at the moment）',
      '两种时态对比时，强调"平时"和"此刻"的区别',
      '现在进行时结构：am/is/are + 动词-ing',
    ],
    examples: [
      {
        english: 'He usually shaves, but today he is not shaving.',
        chinese: '他通常刮胡子，但今天他没有刮。',
        grammarPoint: '一般现在时 vs 现在进行时',
      },
      {
        english: 'She usually drinks tea, but today she is drinking coffee.',
        chinese: '她通常喝茶，但今天她在喝咖啡。',
        grammarPoint: '习惯 vs 此刻',
      },
      {
        english: 'I usually walk to school, but today I am riding my bike.',
        chinese: '我通常步行上学，但今天我骑自行车。',
        grammarPoint: '平时 vs 今天',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He usually _____ to work, but today he _____ the bus.',
        options: ['walks...is taking', 'is walking...takes', 'walk...is taking', 'walks...takes'],
        answer: 0,
        explanation: 'usually用一般现在时walks（三单），today此刻用现在进行时is taking。',
        hint: 'usually → 一般现在时，today → 现在进行时',
      },
      {
        type: 'choice',
        question: 'Look! The baby _____.',
        options: ['cries', 'is crying', 'cry', 'are crying'],
        answer: 1,
        explanation: 'Look! 表示此刻正在发生，用现在进行时is crying。',
        hint: 'Look! 此刻正在',
      },
      {
        type: 'fill',
        question: 'She usually _____ (drink) tea, but today she _____ (drink) coffee.',
        fillAnswer: 'drinks...is drinking',
        explanation: 'usually用一般现在时drinks，today用现在进行时is drinking。',
        hint: '习惯 vs 此刻',
      },
      {
        type: 'choice',
        question:
          'The children usually _____ TV in the evening, but now they _____ their homework.',
        options: ['watch...are doing', 'are watching...do', 'watch...do', 'watches...are doing'],
        answer: 0,
        explanation: 'usually用一般现在时watch（复数），now用现在进行时are doing。',
        hint: 'usually vs now',
      },
    ],
    tips: [
      '一般现在时的关键词：every day, usually, always, often, sometimes',
      '现在进行时的关键词：now, at the moment, Look!, Listen!',
      '对比两种时态是理解英语时态系统的关键',
      '不是所有动词都能用进行时，如 like, know, want 等状态动词一般不用',
    ],
    relatedLessons: [55, 58],
    difficulty: 'medium',
    keywords: ['一般现在时', '现在进行时', '对比', '习惯', '此刻'],
  },

  // ==================== 第58课：一般现在时 vs 现在进行时练习 ====================
  58: {
    title: '复习：一般现在时 vs 现在进行时练习',
    subtitle: '时态对比练习',
    explanation:
      '本课通过大量练习对比一般现在时和现在进行时的用法，重点训练在不同语境中正确选择时态的能力。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '时态判断速查',
          headers: ['关键词', '时态', '示例'],
          rows: [
            ['every day / usually / always', '一般现在时', 'He usually gets up early.'],
            ['now / at the moment / Look! / Listen!', '现在进行时', 'He is sleeping now.'],
            ['today / this week（强调变化）', '现在进行时', 'Today he is staying at home.'],
            ['on Sundays / at weekends', '一般现在时', 'She goes shopping on Saturdays.'],
          ],
        },
      },
    ],
    rules: [
      '看到 usually/every day/always → 一般现在时',
      '看到 now/Look!/Listen!/at the moment → 现在进行时',
      'today 可以用两种时态，取决于语境',
    ],
    examples: [
      {
        english: 'Tom usually plays football, but today he is playing basketball.',
        chinese: '汤姆通常踢足球，但今天他在打篮球。',
        grammarPoint: '时态对比',
      },
      {
        english: 'Listen! Someone is singing.',
        chinese: '听！有人在唱歌。',
        grammarPoint: 'Listen! → 现在进行时',
      },
      {
        english: 'She writes letters every week.',
        chinese: '她每周写信。',
        grammarPoint: 'every week → 一般现在时',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: "Don't make noise. The baby _____.",
        options: ['sleeps', 'is sleeping', 'sleep', 'are sleeping'],
        answer: 1,
        explanation: '此刻正在睡觉，用现在进行时is sleeping。',
        hint: '此刻正在',
      },
      {
        type: 'fill',
        question: 'My mother _____ (cook) dinner every evening.',
        fillAnswer: 'cooks',
        explanation: 'every evening 表示习惯性动作，用一般现在时。My mother是三单，加-s。',
        hint: 'every evening',
      },
      {
        type: 'choice',
        question: '_____! It _____ outside.',
        options: ['Look...is raining', 'Look...rains', 'See...is raining', 'Look...rain'],
        answer: 0,
        explanation: 'Look! 提示此刻正在发生，用现在进行时is raining。',
        hint: 'Look! + 正在发生',
      },
      {
        type: 'fill',
        question: 'He _____ (read) newspapers every morning, but this morning he _____ (watch) TV.',
        fillAnswer: 'reads...is watching',
        explanation:
          'every morning用一般现在时reads，this morning（此刻变化）用现在进行时is watching。',
        hint: '习惯 vs 今天',
      },
    ],
    tips: [
      '做时态题时，先找时间状语关键词',
      'Look! 和 Listen! 是现在进行时的重要提示词',
      'today 在对比语境中常暗示"跟平时不一样"，用现在进行时',
    ],
    relatedLessons: [57],
    difficulty: 'medium',
    keywords: ['时态对比', '一般现在时', '现在进行时', '练习'],
  },

  // ==================== 第59课：some 和 any ====================
  59: {
    title: 'some 和 any',
    subtitle: "I have some... I don't have any...",
    explanation:
      'some 和 any 都表示"一些"。some 通常用于肯定句，any 通常用于否定句和疑问句。some 和 any 既可以修饰可数名词复数，也可以修饰不可数名词。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'some vs any',
          items: [
            {
              label: '肯定句用 some',
              example: 'I have some eggs.',
              explanation: 'some 用于肯定句中',
            },
            {
              label: '否定句用 any',
              example: "I don't have any eggs.",
              explanation: "any 用于否定句中（与 don't/doesn't 连用）",
            },
            {
              label: '疑问句用 any',
              example: 'Do you have any eggs?',
              explanation: 'any 用于疑问句中',
            },
            {
              label: '特殊情况',
              example: 'Would you like some tea?',
              explanation: '表示请求或建议时，疑问句也可以用 some',
            },
          ],
        },
      },
      {
        type: 'table',
        content: {
          title: 'some/any 用法总结',
          headers: ['句型', '用词', '例句'],
          rows: [
            ['肯定句', 'some', 'There are some apples.'],
            ['否定句', 'any (not...any)', "There aren't any apples."],
            ['疑问句', 'any', 'Are there any apples?'],
            ['请求/建议', 'some', 'Would you like some coffee?'],
          ],
        },
      },
    ],
    rules: [
      '肯定句用 some：I have some money.',
      "否定句用 any（与 not 连用）：I don't have any money.",
      '疑问句用 any：Do you have any money?',
      '表示请求或建议的疑问句用 some：Would you like some tea?',
      'some 和 any 既可修饰可数名词复数，也可修饰不可数名词',
    ],
    examples: [
      {
        english: 'I have some bread.',
        chinese: '我有一些面包。',
        grammarPoint: 'some + 不可数名词',
      },
      { english: "I don't have any bread.", chinese: '我没有面包。', grammarPoint: 'not...any' },
      { english: 'Do you have any bread?', chinese: '你有面包吗？', grammarPoint: 'any 疑问句' },
      {
        english: 'Would you like some coffee?',
        chinese: '你想要些咖啡吗？',
        grammarPoint: '建议用some',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I have _____ apples in my bag.',
        options: ['some', 'any', 'a', 'an'],
        answer: 0,
        explanation: '肯定句用some。',
        hint: '肯定句用什么？',
      },
      {
        type: 'choice',
        question: "There isn't _____ water in the glass.",
        options: ['some', 'any', 'a', 'many'],
        answer: 1,
        explanation: '否定句用any。',
        hint: '否定句用什么？',
      },
      {
        type: 'fill',
        question: 'Do you have _____ milk?',
        fillAnswer: 'any',
        explanation: '疑问句用any。',
        hint: '疑问句用什么？',
      },
      {
        type: 'choice',
        question: 'Would you like _____ tea?',
        options: ['some', 'any', 'a', 'many'],
        answer: 0,
        explanation: '表示建议的疑问句用some。',
        hint: '表示建议',
      },
    ],
    tips: [
      'some 不是只能用于肯定句，建议性疑问句也用 some',
      'any 不是只能用于否定和疑问，any 在肯定句中表示"任何一个"',
      'a few + 可数名词复数 / a little + 不可数名词 表示"一点点"',
    ],
    relatedLessons: [57, 60],
    difficulty: 'medium',
    keywords: ['some', 'any', '可数名词', '不可数名词'],
  },

  // ==================== 第60课：some 和 any 练习 ====================
  60: {
    title: '复习：some 和 any 练习',
    subtitle: 'some/any 辨析',
    explanation:
      '本课复习 some 和 any 的用法区别，通过练习巩固在肯定句、否定句和疑问句中的正确使用。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'some/any 选择速查',
          headers: ['情况', '选择', '例句'],
          rows: [
            ['肯定句', 'some', 'I have some friends.'],
            ['否定句', 'any', "I don't have any friends."],
            ['一般疑问句', 'any', 'Do you have any friends?'],
            ['建议/请求疑问句', 'some', 'Shall I get some water?'],
            ['条件句', 'any', 'If you have any questions...'],
          ],
        },
      },
    ],
    rules: [
      'some 用于肯定句和表示建议的疑问句',
      'any 用于否定句和一般疑问句',
      'some 和 any 都可以修饰可数和不可数名词',
    ],
    examples: [
      {
        english: 'There are some books on the desk.',
        chinese: '桌子上有一些书。',
        grammarPoint: 'some + 可数名词',
      },
      {
        english: "There aren't any books on the desk.",
        chinese: '桌子上没有书。',
        grammarPoint: 'any 否定',
      },
      {
        english: 'Are there any books on the desk?',
        chinese: '桌子上有书吗？',
        grammarPoint: 'any 疑问',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I can see _____ birds in the tree.',
        options: ['some', 'any', 'a', 'an'],
        answer: 0,
        explanation: '肯定句用some。',
        hint: '肯定句',
      },
      {
        type: 'fill',
        question: "She doesn't have _____ sisters.",
        fillAnswer: 'any',
        explanation: '否定句用any。',
        hint: '否定句',
      },
      {
        type: 'choice',
        question: 'Can I have _____ sugar, please?',
        options: ['some', 'any', 'a', 'many'],
        answer: 0,
        explanation: '表示请求时用some更礼貌。',
        hint: '请求',
      },
      {
        type: 'fill',
        question: 'Are there _____ eggs in the fridge?',
        fillAnswer: 'any',
        explanation: '一般疑问句用any。',
        hint: '一般疑问句',
      },
    ],
    tips: [
      '做题口诀：肯定some，否疑any',
      '但如果疑问句是提出请求或建议，用 some',
      'Would you like some...? / Shall I get some...? 都用 some',
    ],
    relatedLessons: [59],
    difficulty: 'medium',
    keywords: ['some', 'any', '辨析', '练习'],
  },

  // ==================== 第61课：have 的用法 ====================
  61: {
    title: 'have 的用法',
    subtitle: 'I have a headache. Have you got...?',
    explanation:
      'have 是英语中最常用的动词之一。have 可以表示"拥有"，也可以与某些名词搭配表示"生病/感觉"。英式英语中常用 have got 替代 have 表示"拥有"。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'have 常见搭配（生病/感觉）',
          headers: ['搭配', '中文', '例句'],
          rows: [
            ['have a headache', '头痛', 'I have a headache.'],
            ['have a cold', '感冒', 'She has a cold.'],
            ['have a fever', '发烧', 'He has a fever.'],
            ['have a stomachache', '肚子痛', 'I have a stomachache.'],
            ['have a toothache', '牙痛', 'She has a toothache.'],
            ['have an earache', '耳朵痛', 'He has an earache.'],
            ['have flu', '得了流感', 'I have flu.'],
            ['have measles', '得了麻疹', 'She has measles.'],
            ['have mumps', '得了腮腺炎', 'He has mumps.'],
          ],
        },
      },
    ],
    rules: [
      'have 表示"拥有"：I have a car.',
      'have + 疾病名词 表示"得了...病"：I have a headache.',
      'have got = have（英式英语更常用）',
      '第三人称单数用 has / has got',
      '疑问句：Have you got...? = Do you have...?',
      "否定句：I haven't got... = I don't have...",
    ],
    examples: [
      { english: 'I have a headache.', chinese: '我头痛。', grammarPoint: 'have + 疾病' },
      {
        english: 'Have you got a headache?',
        chinese: '你头痛吗？',
        grammarPoint: 'Have you got...?',
      },
      { english: "I haven't got a headache.", chinese: '我不头痛。', grammarPoint: "haven't got" },
      { english: 'She has a cold.', chinese: '她感冒了。', grammarPoint: '第三人称单数 has' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ a terrible headache.',
        options: ['have', 'has', 'having', 'am have'],
        answer: 0,
        explanation: '主语I用have。',
        hint: '第一人称',
      },
      {
        type: 'choice',
        question: 'She _____ a cold.',
        options: ['have', 'has', 'having', 'is have'],
        answer: 1,
        explanation: 'She是第三人称单数，用has。',
        hint: '第三人称单数',
      },
      {
        type: 'fill',
        question: '_____ you _____ a temperature?',
        fillAnswer: 'Have...got',
        explanation: '询问是否生病用 Have you got...? ',
        hint: 'Have you got...?',
      },
      {
        type: 'choice',
        question: 'He _____ _____ got a toothache.',
        options: ['has not', 'have not', 'is not', 'does not'],
        answer: 0,
        explanation: "He是第三人称单数，否定用has not (hasn't) got。",
        hint: '第三人称否定',
      },
    ],
    tips: [
      'have got 在英式英语中更常见，美式英语常用 do you have',
      'have a cold / have a headache 中的 have 不能用进行时',
      '-ache（痛）后缀词：headache, toothache, stomachache, earache',
      'have 除了表示拥有，还可以表示吃饭：have breakfast / have lunch',
    ],
    relatedLessons: [59, 62],
    difficulty: 'medium',
    keywords: ['have', 'have got', '疾病', 'headache', 'cold'],
  },

  // ==================== 第62课：have 的用法练习 ====================
  62: {
    title: '复习：have 的用法练习',
    subtitle: 'Have you got...?',
    explanation: '本课复习 have 和 have got 的用法，重点练习表达疾病和身体不适的句型。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'have / have got 句型对比',
          headers: ['句型', 'have 形式', 'have got 形式'],
          rows: [
            ['肯定句', 'I have a headache.', "I've got a headache."],
            ['否定句', "I don't have a headache.", "I haven't got a headache."],
            ['疑问句', 'Do you have a headache?', 'Have you got a headache?'],
          ],
        },
      },
    ],
    rules: [
      'have = have got，意思相同',
      '第三人称：has = has got',
      "否定：don't have = haven't got",
    ],
    examples: [
      { english: "I've got flu.", chinese: '我得了流感。', grammarPoint: 'have got' },
      { english: "She hasn't got a headache.", chinese: '她不头痛。', grammarPoint: "hasn't got" },
      { english: 'Do you have measles?', chinese: '你得了麻疹吗？', grammarPoint: 'Do you have' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ _____ got a stomachache.',
        options: ['have not', 'has not', 'am not', 'do not'],
        answer: 0,
        explanation: "主语I用haven't got。",
        hint: '第一人称',
      },
      {
        type: 'fill',
        question: '_____ she _____ a temperature?',
        fillAnswer: 'Has...got',
        explanation: 'she是三单，用Has...got提问。',
        hint: '三单疑问',
      },
      {
        type: 'choice',
        question: 'The children _____ _____ got colds.',
        options: ['has not', 'have not', 'is not', 'does not'],
        answer: 1,
        explanation: "children是复数，用have not (haven't) got。",
        hint: '复数',
      },
      {
        type: 'fill',
        question: 'I _____ a bad cold.',
        fillAnswer: 'have',
        explanation: '主语I用have。',
        hint: '第一人称',
      },
    ],
    tips: [
      '练习用英语描述常见的身体不适',
      'a cold / flu / measles / mumps 前面的冠词用法不同',
      'a headache / a cold / a toothache 有 a；flu / measles / mumps 没有 a',
    ],
    relatedLessons: [61],
    difficulty: 'medium',
    keywords: ['have', 'have got', '练习', '疾病'],
  },

  // ==================== 第63课：must 和 mustn't ====================
  63: {
    title: "must 和 mustn't",
    subtitle: "You mustn't get up.",
    explanation:
      'must 是情态动词，表示"必须"。mustn\'t (must not) 表示"禁止/不许"，而不是"不必"。must 后面跟动词原形，没有人称变化。注意区分 mustn\'t（禁止）和 don\'t have to（不必）。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: "must vs mustn't vs don't have to",
          items: [
            {
              label: 'must',
              example: 'You must take this medicine.',
              explanation: '必须（义务/命令）',
            },
            {
              label: "mustn't",
              example: "You mustn't get up.",
              explanation: '禁止/不许（强烈否定）',
            },
            {
              label: "don't have to",
              example: "You don't have to get up.",
              explanation: '不必/不需要（没有义务）',
            },
          ],
        },
      },
      {
        type: 'formula',
        content: {
          title: 'must 句型公式',
          formula: '主语 + must + 动词原形 + 其他',
          examples: ['You must stay in bed.', 'He must not get up.', 'Must I go now?'],
        },
      },
    ],
    rules: [
      'must 表示"必须"，是情态动词，后接动词原形',
      'must 没有人称变化（第三人称不加 -s）',
      'mustn\'t = must not，表示"禁止/不许"',
      "must 的否定回答用 needn't 或 don't have to（不必）",
      "区别：mustn't（禁止）≠ don't have to（不必）",
    ],
    examples: [
      {
        english: 'You must take this medicine.',
        chinese: '你必须吃药。',
        grammarPoint: 'must 表必须',
      },
      { english: "You mustn't get up.", chinese: '你不许起床。', grammarPoint: "mustn't 表禁止" },
      {
        english: 'Must I call the doctor?',
        chinese: '我必须叫医生吗？',
        grammarPoint: 'Must 疑问句',
      },
      {
        english: "No, you needn't. / No, you don't have to.",
        chinese: '不，你不必。',
        grammarPoint: 'must的否定回答',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'You _____ take this medicine three times a day.',
        options: ['must', "mustn't", "don't have to", "needn't"],
        answer: 0,
        explanation: '每天必须吃三次药，表示义务用must。',
        hint: '表示必须',
      },
      {
        type: 'choice',
        question: "You _____ _____ smoke here. It's dangerous.",
        options: ['must not', "don't have to", "needn't", 'not must'],
        answer: 0,
        explanation: "这里危险，禁止吸烟。mustn't表示禁止。",
        hint: '表示禁止',
      },
      {
        type: 'fill',
        question: '_____ I finish this today?',
        fillAnswer: 'Must',
        explanation: '用Must构成疑问句，问是否必须。',
        hint: '必须吗？',
      },
      {
        type: 'choice',
        question: 'No, you _____. You can do it tomorrow.',
        options: ["mustn't", "needn't", "can't", "shouldn't"],
        answer: 1,
        explanation:
          "不必今天做，明天也可以。must的否定回答用needn't（不必）。mustn't是禁止，意思不同。",
        hint: '不必 ≠ 禁止',
      },
    ],
    tips: [
      'mustn\'t 是"禁止"，语气非常强烈',
      'don\'t have to / needn\'t 是"不必"，表示没有义务',
      "Must I...? 的否定回答用 needn't 或 don't have to",
      'must 只有现在时形式，过去时用 had to',
    ],
    relatedLessons: [61, 64],
    difficulty: 'medium',
    keywords: ['must', "mustn't", "needn't", '禁止', '必须'],
  },

  // ==================== 第64课：must 和 mustn't 练习 ====================
  64: {
    title: "复习：must 和 mustn't 练习",
    subtitle: 'Must I...?',
    explanation:
      "本课复习 must 和 mustn't 的用法，重点练习 must 和 don't have to / needn't 的区别。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'must 否定回答的正确选择',
          headers: ['问句', '正确否定回答', '含义'],
          rows: [
            ['Must I go now?', "No, you needn't. / No, you don't have to.", '不必'],
            [
              'Must I go now?',
              "No, you mustn't. ✗ （错误用法）",
              "mustn't 是禁止，不能用来回答 must 的疑问",
            ],
          ],
        },
      },
    ],
    rules: [
      "Must I...? 的否定回答不能用 mustn't",
      "正确否定回答：No, you needn't. / No, you don't have to.",
      "mustn't 只用于直接表示禁止，不用于回答",
    ],
    examples: [
      {
        english: 'Must I clean the room?',
        chinese: '我必须打扫房间吗？',
        grammarPoint: 'Must I...?',
      },
      { english: 'Yes, you must.', chinese: '是的，你必须。', grammarPoint: '肯定回答' },
      { english: "No, you needn't.", chinese: '不，你不必。', grammarPoint: '否定回答' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Students _____ wear uniforms at school.',
        options: ['must', "mustn't", "needn't", "don't have to"],
        answer: 0,
        explanation: '学生必须穿校服，表示义务用must。',
        hint: '必须穿校服',
      },
      {
        type: 'fill',
        question: 'You _____ _____ play with matches.',
        fillAnswer: "mustn't",
        explanation: "不许玩火柴，表示禁止用mustn't。",
        hint: '禁止',
      },
      {
        type: 'choice',
        question: 'Must I come early tomorrow? No, you _____.',
        options: ["mustn't", "needn't", "can't", "don't"],
        answer: 1,
        explanation: "Must的否定回答用needn't（不必）。不能用mustn't（禁止）。",
        hint: '不必',
      },
      {
        type: 'fill',
        question: 'You _____ drive fast in the city.',
        fillAnswer: "mustn't",
        explanation: "在城市里不许开快车，用mustn't表示禁止。",
        hint: '禁止开快车',
      },
    ],
    tips: [
      "Must I...? → Yes, you must. / No, you needn't.",
      "mustn't ≠ needn't：mustn't = 禁止，needn't = 不必",
      "Don't have to = needn't = 不必（两者意思相同）",
    ],
    relatedLessons: [63],
    difficulty: 'medium',
    keywords: ['must', "mustn't", "needn't", '练习'],
  },

  // ==================== 第65课：时间表达（一） ====================
  65: {
    title: '时间表达（一）',
    subtitle: "What's the time? It's...",
    explanation:
      "学习用英语询问和表达时间。What's the time? / What time is it? 用于问时间。时间表达有整点、半点、一刻钟、分钟等多种方式。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: '时间表达方式',
          headers: ['类型', '读法', '写法', '例句'],
          rows: [
            ['整点', "It's seven o'clock.", '7:00', "It's seven o'clock."],
            ['半点', 'half past seven', '7:30', "It's half past seven."],
            ['一刻钟（过）', 'a quarter past seven', '7:15', "It's a quarter past seven."],
            ['一刻钟（差）', 'a quarter to eight', '7:45', "It's a quarter to eight."],
            ['分钟（过）', 'ten past seven', '7:10', "It's ten past seven."],
            ['分钟（差）', 'ten to eight', '7:50', "It's ten to eight."],
          ],
        },
      },
    ],
    rules: [
      "What's the time? = What time is it? （几点了？）",
      "整点：It's ... o'clock.（7:00 = It's seven o'clock.）",
      '半点：half past ...（7:30 = half past seven）',
      '一刻钟：a quarter past / to ...（7:15 = a quarter past seven）',
      '30分钟以内用 past：ten past seven = 7:10',
      '超过30分钟用 to：ten to eight = 7:50（差10分8点）',
    ],
    examples: [
      { english: "What's the time?", chinese: '几点了？', grammarPoint: '询问时间' },
      { english: "It's seven o'clock.", chinese: '七点了。', grammarPoint: '整点' },
      { english: "It's half past nine.", chinese: '九点半。', grammarPoint: '半点' },
      {
        english: "It's a quarter to eleven.",
        chinese: '差一刻十一点（10:45）。',
        grammarPoint: '差一刻',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '7:30 用英语怎么说？',
        options: ['half past seven', 'seven half', 'half seven', 'seven thirty past'],
        answer: 0,
        explanation: '7:30 = half past seven。',
        hint: '半点用 half past',
      },
      {
        type: 'choice',
        question: '9:15 = _____',
        options: ['a quarter past nine', 'a quarter to nine', 'fifteen past nine', 'A和C都对'],
        answer: 3,
        explanation: '9:15 可以说 a quarter past nine 或 fifteen past nine。',
        hint: '一刻钟',
      },
      {
        type: 'fill',
        question: '6:45 = a quarter _____ seven',
        fillAnswer: 'to',
        explanation: '6:45 = 差一刻7点 = a quarter to seven。超过30分用to。',
        hint: '差几分用 to',
      },
      {
        type: 'choice',
        question: '10:10 = _____',
        options: ['ten past ten', 'ten to ten', 'a quarter past ten', 'ten ten'],
        answer: 0,
        explanation: '10:10 = ten past ten。不超过30分用past。',
        hint: '用 past',
      },
    ],
    tips: [
      "整点加 o'clock，其他时间不加",
      '1-30分钟用 past（过几点）：ten past seven = 7:10',
      '31-59分钟用 to（差几分到几点）：ten to eight = 7:50',
      '15分钟 = a quarter（一刻钟），30分钟 = half（半）',
    ],
    relatedLessons: [63, 66],
    difficulty: 'medium',
    keywords: ['时间', "What's the time", "o'clock", 'past', 'to', 'quarter', 'half'],
  },

  // ==================== 第66课：时间表达（一）练习 ====================
  66: {
    title: '复习：时间表达（一）练习',
    subtitle: "What's the time?",
    explanation: '本课通过大量练习巩固英语时间表达方式，包括整点、半点、一刻钟和分钟的表达。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '时间表达速查',
          headers: ['时间', 'past（过）', 'to（差）'],
          rows: [
            ['整点', "seven o'clock (7:00)", '—'],
            ['半点', 'half past seven (7:30)', '—'],
            ['15分', 'a quarter past seven (7:15)', 'a quarter to eight (7:45)'],
            ['5分', 'five past seven (7:05)', 'five to eight (7:55)'],
            ['20分', 'twenty past seven (7:20)', 'twenty to eight (7:40)'],
          ],
        },
      },
    ],
    rules: [
      '01-30分钟用 past：表示过了多少分',
      '31-59分钟用 to：表示差多少分到下一个整点',
      'a quarter = 15分钟，half = 30分钟',
    ],
    examples: [
      { english: "It's twenty past three.", chinese: '3:20。', grammarPoint: 'past' },
      { english: "It's twenty to four.", chinese: '3:40（差20分4点）。', grammarPoint: 'to' },
      { english: "It's five past twelve.", chinese: '12:05。', grammarPoint: 'past' },
    ],
    exercises: [
      {
        type: 'choice',
        question: '3:40 用英语怎么说？',
        options: ['forty past three', 'twenty to four', 'twenty past four', 'forty to three'],
        answer: 1,
        explanation: '3:40超过30分，用to：twenty to four。',
        hint: '超过30分用to',
      },
      {
        type: 'fill',
        question: '8:30 = _____ _____ eight',
        fillAnswer: 'half past',
        explanation: '8:30 = half past eight。',
        hint: '半点',
      },
      {
        type: 'choice',
        question: '11:05 = _____',
        options: ['five past eleven', 'five to eleven', 'eleven five', "o'clock eleven"],
        answer: 0,
        explanation: '11:05 = five past eleven。',
        hint: '用past',
      },
      {
        type: 'fill',
        question: '2:45 = a quarter _____ three',
        fillAnswer: 'to',
        explanation: '2:45 = 差一刻3点 = a quarter to three。',
        hint: '差一刻',
      },
    ],
    tips: [
      '多练习，看到钟表就用英语说出来',
      '英国人更常用 past/to，美国人有时直接说数字：seven thirty',
      'a quarter 和 half 是固定的，不能用 fifteen 或 thirty 替代（虽然意思对）',
    ],
    relatedLessons: [65],
    difficulty: 'medium',
    keywords: ['时间', 'past', 'to', '练习'],
  },

  // ==================== 第67课：一般过去时（was/were） ====================
  67: {
    title: '一般过去时（was/were）',
    subtitle: 'I was... He was... They were...',
    explanation:
      '一般过去时表示过去发生的动作或存在的状态。be动词的过去式为：I/he/she/it → was，you/we/they → were。一般过去时常与 yesterday, last week, ago 等时间状语连用。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'be动词过去式',
          headers: ['主语', '现在时', '过去时', '缩写'],
          rows: [
            ['I', 'am', 'was', "I was → I wasn't"],
            ['He/She/It', 'is', 'was', "He was → He wasn't"],
            ['You/We/They', 'are', 'were', "They were → They weren't"],
          ],
        },
      },
    ],
    rules: [
      'I / he / she /it + was',
      'you / we / they + were',
      "否定：was not (wasn't) / were not (weren't)",
      '疑问句：Was + 主语...? / Were + 主语...?',
      '常与 yesterday, last week, ... ago, in 2020 等连用',
    ],
    examples: [
      {
        english: 'I was at school yesterday.',
        chinese: '昨天我在学校。',
        grammarPoint: 'was 过去时',
      },
      { english: 'He was a teacher.', chinese: '他（过去）是老师。', grammarPoint: 'was 三单' },
      {
        english: 'They were at home last night.',
        chinese: '他们昨晚在家。',
        grammarPoint: 'were 复数',
      },
      { english: 'Was she at the party?', chinese: '她在派对上吗？', grammarPoint: 'Was 疑问句' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ at home yesterday.',
        options: ['am', 'was', 'were', 'is'],
        answer: 1,
        explanation: '主语I，过去时用was。',
        hint: 'I 的过去式',
      },
      {
        type: 'choice',
        question: 'They _____ at the cinema last night.',
        options: ['was', 'were', 'is', 'are'],
        answer: 1,
        explanation: '主语They，过去时用were。',
        hint: '复数过去式',
      },
      {
        type: 'fill',
        question: '_____ he at school yesterday?',
        fillAnswer: 'Was',
        explanation: 'he用was，疑问句将Was提前。',
        hint: '三单过去时疑问',
      },
      {
        type: 'choice',
        question: 'We _____ _____ at home last Sunday.',
        options: ['was not', 'were not', 'are not', 'is not'],
        answer: 1,
        explanation: "We过去时否定用were not (weren't)。",
        hint: '复数否定',
      },
    ],
    tips: [
      '记住 was/were 的搭配口诀：I 用 was，you/we/they 用 were',
      "否定回答：Was he...? → No, he wasn't.",
      '过去时的时间状语：yesterday, last week, last year, ... ago, in 2020',
      'was 和 were 用于描述过去的状态（是/在）',
    ],
    relatedLessons: [65, 68],
    difficulty: 'medium',
    keywords: ['一般过去时', 'was', 'were', 'yesterday', 'last'],
  },

  // ==================== 第68课：一般过去时（was/were）练习 ====================
  68: {
    title: '复习：一般过去时（was/were）练习',
    subtitle: 'Was / Were 练习',
    explanation: '本课通过大量练习巩固 was 和 were 的用法，包括肯定句、否定句和疑问句。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'was/were 句型汇总',
          headers: ['句型', '结构', '例句'],
          rows: [
            ['肯定句', '主语 + was/were + ...', 'I was at home.'],
            ['否定句', "主语 + wasn't/weren't + ...", "I wasn't at home."],
            ['疑问句', 'Was/Were + 主语 + ...?', 'Were you at home?'],
            ['简略回答', "Yes, I was. / No, I wasn't.", 'Yes, I was.'],
          ],
        },
      },
    ],
    rules: [
      'was 用于 I / he / she / it',
      'were 用于 you / we / they',
      "疑问句和否定句注意 wasn't / weren't 的使用",
    ],
    examples: [
      { english: 'Was it cold yesterday?', chinese: '昨天冷吗？', grammarPoint: 'Was 疑问' },
      {
        english: 'Yes, it was. It was very cold.',
        chinese: '是的，很冷。',
        grammarPoint: '肯定回答',
      },
      {
        english: "No, it wasn't. It was warm.",
        chinese: '不冷，很暖和。',
        grammarPoint: '否定回答',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ you at the station yesterday?',
        options: ['Was', 'Were', 'Are', 'Is'],
        answer: 1,
        explanation: '主语you用were。',
        hint: 'you 用什么？',
      },
      {
        type: 'fill',
        question: 'No, I _____. I was at home.',
        fillAnswer: "wasn't",
        explanation: "Were you...? 的否定回答用 wasn't。",
        hint: '否定回答',
      },
      {
        type: 'choice',
        question: 'The weather _____ very nice last week.',
        options: ['is', 'was', 'were', 'are'],
        answer: 1,
        explanation: 'The weather = it，过去时用was。',
        hint: '天气 = it',
      },
      {
        type: 'fill',
        question: 'The students _____ in the classroom.',
        fillAnswer: 'were',
        explanation: 'The students是复数，过去时用were。',
        hint: '复数过去式',
      },
    ],
    tips: [
      '记住时间状语标志词：yesterday, last..., ...ago, in + 过去年份',
      'Was it...? 和 Were they...? 是常考的疑问句形式',
      '注意：am/is 的过去式都是 was',
    ],
    relatedLessons: [67],
    difficulty: 'medium',
    keywords: ['was', 'were', '练习', '过去时'],
  },

  // ==================== 第69课：一般过去时（规则动词） ====================
  69: {
    title: '一般过去时（规则动词）',
    subtitle: 'I worked. He played.',
    explanation:
      '一般过去时表示过去发生的动作。规则动词的过去式通过加 -ed 构成。不同的动词有不同的加 -ed 方式。不规则动词则需要单独记忆。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '规则动词过去式变化规则',
          headers: ['规则', '方法', '原形 → 过去式'],
          rows: [
            ['一般情况', '加 -ed', 'work → worked, play → played'],
            ['以e结尾', '加 -d', 'live → lived, arrive → arrived'],
            ['辅音+y结尾', '变y为i加 -ed', 'study → studied, carry → carried'],
            ['元音+y结尾', '直接加 -ed', 'enjoy → enjoyed, stay → stayed'],
            ['重读闭音节', '双写末尾辅音+ed', 'stop → stopped, plan → planned'],
          ],
        },
      },
      {
        type: 'formula',
        content: {
          title: '过去式否定和疑问',
          formula: "主语 + did not (didn't) + 动词原形 / Did + 主语 + 动词原形?",
          examples: ["I didn't go to school yesterday.", 'Did you go to school yesterday?'],
        },
      },
    ],
    rules: [
      '规则动词过去式：加 -ed（worked, played）',
      '以e结尾加 -d（lived, arrived）',
      '辅音+y结尾变y为i加 -ed（studied）',
      '重读闭音节双写辅音字母加 -ed（stopped）',
      "否定句：didn't + 动词原形（注意动词恢复原形）",
      '疑问句：Did + 主语 + 动词原形?',
    ],
    examples: [
      { english: 'I worked yesterday.', chinese: '我昨天工作了。', grammarPoint: '加 -ed' },
      {
        english: 'He played football last Sunday.',
        chinese: '他上周日踢了足球。',
        grammarPoint: '加 -ed',
      },
      {
        english: "She didn't go to school yesterday.",
        chinese: '她昨天没去上学。',
        grammarPoint: "didn't + 原形",
      },
      {
        english: 'Did you enjoy the film?',
        chinese: '你喜欢那部电影吗？',
        grammarPoint: 'Did + 原形',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ a letter last night.',
        options: ['write', 'wrote', 'writed', 'writing'],
        answer: 1,
        explanation: 'write是不规则动词，过去式为wrote。',
        hint: '不规则动词',
      },
      {
        type: 'choice',
        question: 'She _____ to school early yesterday.',
        options: ['go', 'goes', 'went', 'going'],
        answer: 2,
        explanation: 'go是不规则动词，过去式为went。',
        hint: 'go的过去式',
      },
      {
        type: 'fill',
        question: 'He _____ (watch) TV last night.',
        fillAnswer: 'watched',
        explanation: 'watch以ch结尾，加-ed变成watched。',
        hint: '加 -ed',
      },
      {
        type: 'choice',
        question: 'They _____ _____ to the park yesterday.',
        options: ["don't go", "didn't go", "didn't went", "doesn't go"],
        answer: 1,
        explanation: "过去时否定用didn't + 动词原形go。注意不是didn't went。",
        hint: "didn't + 原形",
      },
    ],
    tips: [
      '-ed 的发音：清辅音后读 /t/（worked），浊辅音后读 /d/（played），t/d 后读 /id/（wanted）',
      "didn't 后面的动词必须用原形",
      'Did he go? 不是 Did he went?',
      '规则动词和不规则动词都需要记忆',
    ],
    relatedLessons: [67, 70],
    difficulty: 'medium',
    keywords: ['一般过去时', '规则动词', '-ed', 'did', "didn't"],
  },

  // ==================== 第70课：一般过去时（规则动词）练习 ====================
  70: {
    title: '复习：一般过去时（规则动词）练习',
    subtitle: '过去式练习',
    explanation:
      "本课通过大量练习巩固规则动词过去式的构成和用法，包括 -ed 的拼写规则和 did/didn't 的使用。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: '规则动词过去式速查',
          headers: ['原形', '过去式', '规则'],
          rows: [
            ['walk', 'walked', '加 -ed'],
            ['live', 'lived', '加 -d'],
            ['study', 'studied', '变y为i加-ed'],
            ['stop', 'stopped', '双写+ed'],
            ['enjoy', 'enjoyed', '加 -ed'],
            ['arrive', 'arrived', '加 -d'],
          ],
        },
      },
    ],
    rules: ['规则动词过去式加 -ed', "否定和疑问用 did/didn't，动词恢复原形", '注意 -ed 的不同发音'],
    examples: [
      {
        english: 'She cleaned the room yesterday.',
        chinese: '她昨天打扫了房间。',
        grammarPoint: '加 -d',
      },
      {
        english: 'We studied English last night.',
        chinese: '我们昨晚学了英语。',
        grammarPoint: '变y为i加-ed',
      },
      {
        english: "He didn't finish his homework.",
        chinese: '他没有完成作业。',
        grammarPoint: "didn't + 原形",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ (walk) to school yesterday.',
        options: ['walk', 'walked', 'walked', 'walking'],
        answer: 1,
        explanation: 'walk加-ed变成walked。',
        hint: '加 -ed',
      },
      {
        type: 'fill',
        question: 'She _____ (study) hard last term.',
        fillAnswer: 'studied',
        explanation: 'study以辅音+y结尾，变y为i加-ed。',
        hint: '变y为i',
      },
      {
        type: 'choice',
        question: '_____ you _____ the film last night?',
        options: ['Did...enjoy', 'Did...enjoyed', 'Do...enjoy', 'Were...enjoy'],
        answer: 0,
        explanation: '过去时疑问用Did + 主语 + 动词原形。',
        hint: 'Did + 原形',
      },
      {
        type: 'fill',
        question: 'He _____ (stop) the car at the traffic lights.',
        fillAnswer: 'stopped',
        explanation: 'stop是重读闭音节，双写p加-ed。',
        hint: '双写+ed',
      },
    ],
    tips: [
      '练习将规则动词变成过去式：加-ed、加-d、变y为i加-ed、双写加-ed',
      '做题时先判断是过去时还是现在时',
      '过去时否定和疑问用 did，动词不再加 -ed',
    ],
    relatedLessons: [69],
    difficulty: 'medium',
    keywords: ['规则动词', '过去式', '-ed', '练习'],
  },

  // ==================== 第71课：一般过去时（不规则动词） ====================
  71: {
    title: '一般过去时（不规则动词）',
    subtitle: 'I had... He went... She saw...',
    explanation:
      '不规则动词的过去式不遵循加 -ed 的规则，需要单独记忆。常见的不规则动词如 go→went, see→saw, have→had, come→came, take→took 等。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '常见不规则动词表',
          headers: ['原形', '过去式', '中文'],
          rows: [
            ['go', 'went', '去'],
            ['see', 'saw', '看见'],
            ['have', 'had', '有/吃'],
            ['come', 'came', '来'],
            ['take', 'took', '拿/带'],
            ['give', 'gave', '给'],
            ['get', 'got', '得到'],
            ['make', 'made', '做/制作'],
            ['eat', 'ate', '吃'],
            ['drink', 'drank', '喝'],
            ['write', 'wrote', '写'],
            ['read', 'read', '读'],
            ['say', 'said', '说'],
            ['tell', 'told', '告诉'],
            ['find', 'found', '找到'],
            ['put', 'put', '放'],
            ['buy', 'bought', '买'],
            ['think', 'thought', '想/认为'],
          ],
        },
      },
    ],
    rules: [
      '不规则动词的过去式需要逐个记忆',
      "不规则动词的否定和疑问也用 did/didn't",
      "didn't + 动词原形（不是过去式形式）",
      'read 的过去式拼写不变，但发音变为 /red/',
    ],
    examples: [
      {
        english: 'I had a good time yesterday.',
        chinese: '我昨天玩得很开心。',
        grammarPoint: 'have → had',
      },
      {
        english: 'He went to the park last Sunday.',
        chinese: '他上周日去了公园。',
        grammarPoint: 'go → went',
      },
      {
        english: 'She saw a beautiful bird.',
        chinese: '她看到了一只漂亮的鸟。',
        grammarPoint: 'see → saw',
      },
      {
        english: "He didn't come to school yesterday.",
        chinese: '他昨天没来上学。',
        grammarPoint: "didn't + 原形",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'She _____ a new dress yesterday.',
        options: ['buyed', 'bought', 'buying', 'buys'],
        answer: 1,
        explanation: 'buy的过去式是bought（不规则）。',
        hint: 'buy → bought',
      },
      {
        type: 'choice',
        question: 'We _____ to London last summer.',
        options: ['go', 'goes', 'went', 'going'],
        answer: 2,
        explanation: 'go的过去式是went。',
        hint: 'go → went',
      },
      {
        type: 'fill',
        question: 'He _____ (take) a taxi to the airport.',
        fillAnswer: 'took',
        explanation: 'take的过去式是took。',
        hint: 'take → took',
      },
      {
        type: 'choice',
        question: 'They _____ _____ the movie last night.',
        options: ["didn't saw", "didn't see", "don't see", "doesn't see"],
        answer: 1,
        explanation: "过去时否定用didn't + 动词原形see。不能用didn't saw。",
        hint: "didn't + 原形",
      },
    ],
    tips: [
      '不规则动词没有固定规律，最好的方法是多读多记',
      'NCE1课文中出现的不规则动词都是最基础的，必须牢记',
      '常见口诀：go-went, see-saw, come-came, take-took, give-gave, get-got',
      '注意 read 的过去式：拼写不变，发音变为 /red/',
    ],
    relatedLessons: [69, 72],
    difficulty: 'medium',
    keywords: ['不规则动词', '过去式', 'go-went', 'see-saw', 'have-had'],
  },

  // ==================== 第72课：一般过去时（不规则动词）练习 ====================
  72: {
    title: '复习：一般过去时（不规则动词）练习',
    subtitle: '不规则动词过去式练习',
    explanation: '本课通过大量练习巩固不规则动词的过去式，强化记忆常见的不规则动词变化形式。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '不规则动词过去式分类记忆',
          headers: ['变化类型', '原形 → 过去式', '更多例子'],
          rows: [
            ['i → a', 'drink → drank, swim → swam, sing → sang', 'ring → rang, begin → began'],
            ['ow/aw', 'know → knew, grow → grew, throw → threw', 'draw → drew, show → showed'],
            ['eep → ept', 'keep → kept, sleep → slept, sweep → swept', 'feel → felt'],
            ['不变', 'put → put, cut → cut, shut → shut', 'let → let, set → set'],
          ],
        },
      },
    ],
    rules: [
      '不规则动词需要逐个记忆过去式',
      "否定和疑问用 did/didn't + 动词原形",
      "不要说 didn't went / didn't saw 等错误形式",
    ],
    examples: [
      {
        english: 'I went to the supermarket yesterday.',
        chinese: '我昨天去了超市。',
        grammarPoint: 'go → went',
      },
      {
        english: 'She made a cake for her mother.',
        chinese: '她给妈妈做了一个蛋糕。',
        grammarPoint: 'make → made',
      },
      {
        english: "He didn't eat breakfast this morning.",
        chinese: '他今天早上没吃早餐。',
        grammarPoint: "didn't + eat",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ my friend at the station.',
        options: ['meeted', 'met', 'meet', 'meeting'],
        answer: 1,
        explanation: 'meet的过去式是met。',
        hint: 'meet → met',
      },
      {
        type: 'fill',
        question: 'She _____ (write) a letter to her grandmother.',
        fillAnswer: 'wrote',
        explanation: 'write的过去式是wrote。',
        hint: 'write → wrote',
      },
      {
        type: 'choice',
        question: 'He _____ a glass of water.',
        options: ['drinked', 'drank', 'drink', 'drunk'],
        answer: 1,
        explanation: 'drink的过去式是drank。',
        hint: 'drink → drank',
      },
      {
        type: 'fill',
        question: 'We _____ _____ (not go) to school yesterday.',
        fillAnswer: "didn't go",
        explanation: "过去时否定用didn't + 动词原形go。",
        hint: "didn't + 原形",
      },
    ],
    tips: [
      '不规则动词是英语学习的基础，越早记住越好',
      '可以通过编故事或口诀帮助记忆：go went, see saw, come came, give gave',
      '常见的易错点：buy→bought（不是buyed），teach→taught（不是teached）',
      "过去时否定句：didn't 后面永远跟动词原形",
    ],
    relatedLessons: [71],
    difficulty: 'medium',
    keywords: ['不规则动词', '过去式', '练习', '记忆'],
  },

  // ==================== 第73课：一般过去时(否定和疑问) ====================
  73: {
    title: '一般过去时(否定和疑问)',
    subtitle: "I didn't go. Did you go?",
    explanation:
      '一般过去时的否定句用"didn\'t + 动词原形"，一般疑问句用"Did + 主语 + 动词原形"。注意：使用didn\'t或did后，后面的动词必须恢复原形，不能再用过去式。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '一般过去时的否定句和疑问句',
          headers: ['句型', '结构', '例句'],
          rows: [
            ['否定句', "主语 + didn't + 动词原形", "I didn't go to school."],
            ['一般疑问句', 'Did + 主语 + 动词原形...?', 'Did you go to school?'],
            ['肯定回答', 'Yes, 主语 + did.', 'Yes, I did.'],
            ['否定回答', "No, 主语 + didn't.", "No, I didn't."],
          ],
        },
      },
    ],
    rules: [
      "否定句：主语 + didn't + 动词原形（didn't后动词必须用原形）",
      '一般疑问句：Did + 主语 + 动词原形...?',
      '肯定回答：Yes, 主语 + did.',
      "否定回答：No, 主语 + didn't.",
      "did/didn't已经表示过去，动词不需要再加-ed",
    ],
    examples: [
      {
        english: "I didn't go to the party last night.",
        chinese: '我昨晚没去参加聚会。',
        grammarPoint: "didn't + 动词原形",
      },
      {
        english: 'Did you see him yesterday?',
        chinese: '你昨天见到他了吗？',
        grammarPoint: 'Did + 主语 + 动词原形',
      },
      {
        english: "She didn't buy that dress.",
        chinese: '她没有买那条裙子。',
        grammarPoint: "didn't + 动词原形",
      },
      {
        english: 'Did they arrive on time?',
        chinese: '他们准时到达了吗？',
        grammarPoint: 'Did + 主语 + 动词原形',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ go to school yesterday.',
        options: ['not', "didn't", "don't", "wasn't"],
        answer: 1,
        explanation: "一般过去时否定用didn't + 动词原形。",
        hint: '过去时否定',
      },
      {
        type: 'choice',
        question: '_____ you _____ the film last night?',
        options: ['Did; enjoyed', 'Did; enjoy', 'Do; enjoy', 'Were; enjoy'],
        answer: 1,
        explanation: '一般疑问句用Did + 主语 + 动词原形。',
        hint: 'Did后用原形',
      },
      {
        type: 'fill',
        question: 'She _____ (not go) to work yesterday.',
        fillAnswer: "didn't go",
        explanation: "一般过去时否定：didn't + 动词原形go。",
        hint: "didn't + 原形",
      },
      {
        type: 'fill',
        question: '_____ he _____ (play) football yesterday?',
        fillAnswer: 'Did ... play',
        explanation: '一般疑问句：Did + 主语 + 动词原形。',
        hint: 'Did + 原形',
      },
    ],
    tips: [
      "didn't后面的动词必须用原形，不能用过去式",
      'did已经表示过去时态，不要再用动词的过去式',
      "回答一般过去时的一般疑问句，用Yes/No + 主语 + did/didn't",
    ],
    relatedLessons: [71, 74],
    difficulty: 'medium',
    keywords: ["didn't", 'did', '一般过去时', '否定句', '疑问句'],
  },

  // ==================== 第74课：一般过去时(否定和疑问)练习 ====================
  74: {
    title: '复习：一般过去时(否定和疑问)练习',
    subtitle: '通过练习巩固过去时的否定和疑问句型',
    explanation:
      "本课为第73课的复习课，通过大量的练习来巩固一般过去时的否定句和疑问句用法。重点掌握didn't和Did的使用，以及动词原形的还原。",
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '肯定句 vs 否定句 vs 疑问句',
          items: [
            { label: '肯定句', example: 'I went to school.', explanation: '动词用过去式went' },
            { label: '否定句', example: "I didn't go to school.", explanation: "didn't + 原形go" },
            {
              label: '疑问句',
              example: 'Did you go to school?',
              explanation: 'Did + 主语 + 原形go',
            },
          ],
        },
      },
    ],
    rules: [
      '肯定句：主语 + 动词过去式',
      "否定句：主语 + didn't + 动词原形",
      '疑问句：Did + 主语 + 动词原形?',
    ],
    examples: [
      {
        english: "He didn't phone me this morning.",
        chinese: '他今天早上没给我打电话。',
        grammarPoint: "didn't + 原形",
      },
      {
        english: 'Did you miss the bus?',
        chinese: '你错过公交车了吗？',
        grammarPoint: 'Did + 原形',
      },
      {
        english: "We didn't have lunch at home.",
        chinese: '我们没在家吃午饭。',
        grammarPoint: "didn't + 原形",
      },
      {
        english: 'Did she call her mother?',
        chinese: '她给她妈妈打电话了吗？',
        grammarPoint: 'Did + 原形',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'They _____ (not watch) TV last night.',
        options: ["didn't watched", "didn't watch", "don't watch", "wasn't watch"],
        answer: 1,
        explanation: "didn't + 动词原形watch。",
        hint: "didn't + 原形",
      },
      {
        type: 'fill',
        question: '_____ you _____ (have) breakfast this morning?',
        fillAnswer: 'Did ... have',
        explanation: '一般疑问句：Did + 主语 + 动词原形have。',
        hint: 'Did + 原形',
      },
      {
        type: 'choice',
        question: 'No, I _____.',
        options: ["don't", "didn't", "wasn't", "doesn't"],
        answer: 1,
        explanation: "否定回答用didn't。",
        hint: '否定回答',
      },
      {
        type: 'fill',
        question: 'He _____ (not speak) to her yesterday.',
        fillAnswer: "didn't speak",
        explanation: "一般过去时否定：didn't + 动词原形speak。",
        hint: "didn't + 原形",
      },
    ],
    tips: [
      '做题时先判断时态是过去时，再选择对应的否定或疑问形式',
      "记住：did/didn't后面永远跟动词原形",
      '不规则动词的原形和过去式不同，注意区分',
    ],
    relatedLessons: [73, 75],
    difficulty: 'medium',
    keywords: ['一般过去时', '否定句', '疑问句', '练习'],
  },

  // ==================== 第75课：一般过去时(不规则动词更多) ====================
  75: {
    title: '一般过去时(不规则动词更多)',
    subtitle: 'He drank some coffee.',
    explanation:
      '本课学习更多不规则动词的过去式。不规则动词没有固定的变换规则，需要逐个记忆。常见不规则动词如：drink→drank, know→knew, take→took, get→got等。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '更多不规则动词过去式',
          headers: ['原形', '过去式', '含义'],
          rows: [
            ['drink', 'drank', '喝'],
            ['know', 'knew', '知道'],
            ['take', 'took', '拿、带'],
            ['get', 'got', '得到、变得'],
            ['run', 'ran', '跑'],
            ['come', 'came', '来'],
            ['give', 'gave', '给'],
            ['swim', 'swam', '游泳'],
            ['begin', 'began', '开始'],
            ['ring', 'rang', '响铃'],
          ],
        },
      },
    ],
    rules: [
      '不规则动词的过去式需要逐个记忆',
      'i→a型：drink→drank, swim→swam, begin→began, ring→rang',
      'i→a→u型：sing→sang→sung',
      '其他变化：know→knew, take→took, get→got, come→came, give→gave',
    ],
    examples: [
      {
        english: 'He drank some coffee this morning.',
        chinese: '他今天早上喝了一些咖啡。',
        grammarPoint: 'drink→drank',
      },
      { english: 'I knew the answer.', chinese: '我知道答案。', grammarPoint: 'know→knew' },
      {
        english: 'She took a taxi to the station.',
        chinese: '她打车去了车站。',
        grammarPoint: 'take→took',
      },
      {
        english: 'They got home late last night.',
        chinese: '他们昨晚很晚才到家。',
        grammarPoint: 'get→got',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He _____ a glass of water.',
        options: ['drink', 'drank', 'drunk', 'drinked'],
        answer: 1,
        explanation: 'drink的过去式是drank。',
        hint: '不规则动词',
      },
      {
        type: 'fill',
        question: 'I _____ (take) the book from the shelf.',
        fillAnswer: 'took',
        explanation: 'take的过去式是took。',
        hint: 'take→took',
      },
      {
        type: 'choice',
        question: 'She _____ the answer to the question.',
        options: ['knowed', 'knew', 'know', 'known'],
        answer: 1,
        explanation: 'know的过去式是knew。',
        hint: 'know→knew',
      },
      {
        type: 'fill',
        question: 'We _____ (swim) in the river yesterday.',
        fillAnswer: 'swam',
        explanation: 'swim的过去式是swam。',
        hint: 'swim→swam',
      },
    ],
    tips: [
      '不规则动词没有统一的变化规则，必须牢记',
      '可以按照变化模式分组记忆，如i→a型：drink→drank, swim→swam',
      '常见的不规则动词大约有200个，核心的约100个',
      '注意不要把不规则动词加-ed变成过去式（如不能说drinked）',
    ],
    relatedLessons: [73, 76],
    difficulty: 'medium',
    keywords: ['不规则动词', '过去式', 'drank', 'knew', 'took'],
  },

  // ==================== 第76课：一般过去时(不规则动词更多)练习 ====================
  76: {
    title: '复习：一般过去时(不规则动词)练习',
    subtitle: '通过练习巩固不规则动词的过去式',
    explanation:
      '本课为第75课的复习课，通过练习巩固更多不规则动词过去式的用法，包括其否定句和疑问句形式。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '不规则动词过去式练习表',
          headers: ['原形', '过去式', '否定形式', '疑问形式'],
          rows: [
            ['drink', 'drank', "didn't drink", 'Did ... drink?'],
            ['know', 'knew', "didn't know", 'Did ... know?'],
            ['take', 'took', "didn't take", 'Did ... take?'],
            ['get', 'got', "didn't get", 'Did ... get?'],
            ['run', 'ran', "didn't run", 'Did ... run?'],
            ['come', 'came', "didn't come", 'Did ... come?'],
          ],
        },
      },
    ],
    rules: [
      "不规则动词的否定句：didn't + 原形",
      '不规则动词的疑问句：Did + 主语 + 原形?',
      '注意：否定和疑问中用原形，不用过去式',
    ],
    examples: [
      {
        english: "She didn't drink any water.",
        chinese: '她没有喝任何水。',
        grammarPoint: "didn't + 原形drink",
      },
      {
        english: 'Did you take my pen?',
        chinese: '你拿了我的钢笔吗？',
        grammarPoint: 'Did + 原形take',
      },
      {
        english: "He didn't know the truth.",
        chinese: '他不知道真相。',
        grammarPoint: "didn't + 原形know",
      },
      {
        english: 'Did they come to the party?',
        chinese: '他们来参加聚会了吗？',
        grammarPoint: 'Did + 原形come',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'She _____ (drink) tea yesterday.',
        options: ['drinked', 'drank', 'drunk', 'drinks'],
        answer: 1,
        explanation: 'drink的过去式是drank。',
        hint: '不规则变化',
      },
      {
        type: 'fill',
        question: 'Did she _____ (run) this morning?',
        fillAnswer: 'run',
        explanation: 'Did后面用动词原形run。',
        hint: 'Did后用原形',
      },
      {
        type: 'choice',
        question: 'They _____ (not give) me a gift.',
        options: ["didn't gave", "didn't give", "don't give", 'gave not'],
        answer: 1,
        explanation: "didn't + 动词原形give。",
        hint: "didn't后用原形",
      },
      {
        type: 'fill',
        question: 'He _____ (come) to school late yesterday.',
        fillAnswer: 'came',
        explanation: 'come的过去式是came。',
        hint: 'come→came',
      },
    ],
    tips: [
      '多写多练，通过反复运用来记住不规则动词',
      '不规则动词过去式的否定和疑问一定要用原形',
      '可以把不规则动词做成卡片，每天复习',
    ],
    relatedLessons: [75, 77],
    difficulty: 'medium',
    keywords: ['不规则动词', '过去式', '否定句', '疑问句'],
  },

  // ==================== 第77课：一般过去时综合练习 ====================
  77: {
    title: '一般过去时综合练习',
    subtitle: '时态综合运用',
    explanation:
      '本课对一般过去时进行全面综合练习，包括规则动词和不规则动词的过去式、否定句、疑问句的综合运用。要求能在实际语境中正确使用一般过去时。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '一般过去时句型总结',
          formula:
            "肯定：主语 + 动词过去式 / 否定：主语 + didn't + 原形 / 疑问：Did + 主语 + 原形?",
          examples: [
            "I walked to school. → I didn't walk to school. → Did you walk to school?",
            "She ate breakfast. → She didn't eat breakfast. → Did she eat breakfast?",
          ],
        },
      },
    ],
    rules: [
      '规则动词：原形 + ed（walk→walked）',
      '不规则动词：需要特殊记忆（eat→ate, go→went）',
      "否定句：didn't + 动词原形",
      '疑问句：Did + 主语 + 动词原形?',
      '时间状语：yesterday, last week, ago, this morning等',
    ],
    examples: [
      {
        english: 'I walked to school yesterday.',
        chinese: '我昨天走路去上学。',
        grammarPoint: '规则动词过去式',
      },
      {
        english: 'She ate an apple for lunch.',
        chinese: '她午饭吃了一个苹果。',
        grammarPoint: '不规则动词过去式',
      },
      {
        english: "We didn't go to the park.",
        chinese: '我们没有去公园。',
        grammarPoint: "didn't + 原形",
      },
      {
        english: 'Did he finish his homework?',
        chinese: '他完成作业了吗？',
        grammarPoint: 'Did + 原形',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Last summer, my family _____ to Beijing.',
        options: ['travel', 'travels', 'travelled', 'travelling'],
        answer: 2,
        explanation: 'Last summer表示过去时间，用过去式travelled。',
        hint: '过去时间状语',
      },
      {
        type: 'fill',
        question: 'I _____ (see) a good film yesterday.',
        fillAnswer: 'saw',
        explanation: 'see的过去式是saw。',
        hint: 'see→saw',
      },
      {
        type: 'choice',
        question: '_____ they _____ (finish) the work last week?',
        options: ['Did; finished', 'Did; finish', 'Do; finish', 'Were; finish'],
        answer: 1,
        explanation: '一般疑问句：Did + 主语 + 动词原形。',
        hint: 'Did后用原形',
      },
      {
        type: 'fill',
        question: 'She _____ (not buy) any clothes last month.',
        fillAnswer: "didn't buy",
        explanation: "一般过去时否定：didn't + 动词原形buy。",
        hint: "didn't + 原形",
      },
    ],
    tips: [
      '做综合练习时，先判断时态，再判断是肯定、否定还是疑问',
      '注意时间标志词：yesterday, last week, ago, in 2020等',
      '不规则动词要多积累，多练习',
    ],
    relatedLessons: [75, 78],
    difficulty: 'medium',
    keywords: ['一般过去时', '综合练习', '规则动词', '不规则动词'],
  },

  // ==================== 第78课：一般过去时综合练习 ====================
  78: {
    title: '复习：一般过去时综合练习',
    subtitle: '巩固一般过去时各种句型',
    explanation:
      '本课继续对一般过去时进行综合复习，包含更多情景对话和实际运用练习，帮助学生在真实语境中灵活运用一般过去时。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '一般过去时 vs 一般现在时',
          items: [
            {
              label: '一般现在时',
              example: 'I go to school every day.',
              explanation: '表示经常性动作',
            },
            {
              label: '一般过去时',
              example: 'I went to school yesterday.',
              explanation: '表示过去某时的动作',
            },
            {
              label: '过去否定',
              example: "I didn't go to school yesterday.",
              explanation: "didn't + 原形",
            },
            {
              label: '过去疑问',
              example: 'Did you go to school yesterday?',
              explanation: 'Did + 主语 + 原形',
            },
          ],
        },
      },
    ],
    rules: [
      '一般现在时表示经常性、习惯性的动作',
      '一般过去时表示过去某个时间发生的动作',
      '根据时间状语判断时态',
    ],
    examples: [
      {
        english: 'He went to the supermarket and bought some food.',
        chinese: '他去了超市，买了一些食物。',
        grammarPoint: '过去式went和bought',
      },
      {
        english: "I didn't hear the phone ring.",
        chinese: '我没听到电话响。',
        grammarPoint: "didn't + 原形",
      },
      {
        english: 'What did you do last weekend?',
        chinese: '你上周末做了什么？',
        grammarPoint: '特殊疑问句',
      },
      {
        english: 'Did anyone call while I was out?',
        chinese: '我不在的时候有人打电话来吗？',
        grammarPoint: 'Did + 主语 + 原形',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'What _____ you _____ last night?',
        options: ['do; do', 'did; do', 'did; did', 'do; did'],
        answer: 1,
        explanation: '特殊疑问句：What did + 主语 + 动词原形?。',
        hint: '特殊疑问句',
      },
      {
        type: 'fill',
        question: 'He _____ (buy) a new car last month.',
        fillAnswer: 'bought',
        explanation: 'buy的过去式是bought。',
        hint: 'buy→bought',
      },
      {
        type: 'choice',
        question: 'I _____ (not understand) the question.',
        options: [
          "didn't understood",
          "didn't understand",
          "don't understand",
          "wasn't understand",
        ],
        answer: 1,
        explanation: "didn't + 动词原形understand。",
        hint: "didn't后用原形",
      },
      {
        type: 'fill',
        question: 'Where _____ she _____ (go) yesterday?',
        fillAnswer: 'Did ... go',
        explanation: '特殊疑问句中的一般疑问句部分：Did + 主语 + 原形。',
        hint: 'Where did she go?',
      },
    ],
    tips: [
      '时态判断的关键在于时间状语',
      'yesterday, last..., ...ago 通常用一般过去时',
      'every day, usually, always 通常用一般现在时',
    ],
    relatedLessons: [77, 79],
    difficulty: 'medium',
    keywords: ['一般过去时', '时态对比', '时间状语'],
  },

  // ==================== 第79课：need和want的用法 ====================
  79: {
    title: 'need和want的用法',
    subtitle: 'I need/want to buy some...',
    explanation:
      'need表示"需要"，want表示"想要"。两者都可以接不定式（to + 动词原形）构成need to do和want to do。need还可以用作情态动词（主要用于否定句和疑问句）。本课重点学习need和want作为实义动词的用法。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'need和want的用法对比',
          headers: ['动词', '结构', '含义', '例句'],
          rows: [
            ['want', 'want + to do', '想要做某事', 'I want to buy a book.'],
            ['need', 'need + to do', '需要做某事', 'I need to buy some food.'],
            ['want', 'want + 名词', '想要某物', 'I want some water.'],
            ['need', 'need + 名词', '需要某物', 'I need some water.'],
          ],
        },
      },
    ],
    rules: [
      'want to do sth. = 想要做某事',
      'need to do sth. = 需要做某事',
      'want + 名词 = 想要某物',
      'need + 名词 = 需要某物',
      "否定：don't want to / don't need to",
    ],
    examples: [
      {
        english: 'I want to buy some bread.',
        chinese: '我想买一些面包。',
        grammarPoint: 'want to do',
      },
      {
        english: 'She needs to see a doctor.',
        chinese: '她需要去看医生。',
        grammarPoint: 'need to do',
      },
      { english: 'Do you need any help?', chinese: '你需要帮助吗？', grammarPoint: 'need + 名词' },
      {
        english: "I don't want to go out today.",
        chinese: '我今天不想出去。',
        grammarPoint: "don't want to do",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ to go to the supermarket.',
        options: ['want', 'wants', 'wanting', 'wanted'],
        answer: 0,
        explanation: '主语I用want，want to do表示想要做某事。',
        hint: 'want to do',
      },
      {
        type: 'fill',
        question: 'She _____ (need) to buy some milk.',
        fillAnswer: 'needs',
        explanation: '主语She是第三人称单数，need加s。',
        hint: '第三人称单数',
      },
      {
        type: 'choice',
        question: '_____ you _____ any help?',
        options: ['Do; need', 'Does; need', 'Are; need', 'Do; needing'],
        answer: 0,
        explanation: '主语you用Do，need用原形。',
        hint: '疑问句',
      },
      {
        type: 'fill',
        question: "I don't _____ (want) to eat anything.",
        fillAnswer: 'want',
        explanation: "don't后面用动词原形want。",
        hint: "don't + 原形",
      },
    ],
    tips: [
      'want to do = 想做（主观愿望），need to do = 需要做（客观必要）',
      '主语是第三人称单数时，want→wants，need→needs',
      "否定句：don't/doesn't want to / don't/doesn't need to",
      '疑问句：Do/Does + 主语 + want/need to ...?',
    ],
    relatedLessons: [77, 80],
    difficulty: 'easy',
    keywords: ['need', 'want', 'to do', '需要', '想要'],
  },

  // ==================== 第80课：need和want练习 ====================
  80: {
    title: '复习：need和want练习',
    subtitle: '通过练习巩固need和want的用法',
    explanation:
      '本课为第79课的复习课，通过多种练习形式巩固need和want在各种句型中的用法，包括肯定句、否定句和疑问句。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'need/want句型公式',
          formula:
            "肯定：主语 + want/need + to do / 否定：主语 + don't/doesn't + want/need + to do / 疑问：Do/Does + 主语 + want/need + to do?",
          examples: [
            "He wants to go. → He doesn't want to go. → Does he want to go?",
            "She needs to study. → She doesn't need to study. → Does she need to study?",
          ],
        },
      },
    ],
    rules: [
      '主语是第三人称单数时，动词加s/es',
      "否定句用don't/doesn't + 动词原形",
      '疑问句用Do/Does + 主语 + 动词原形',
    ],
    examples: [
      {
        english: 'He wants to buy a new phone.',
        chinese: '他想买一部新手机。',
        grammarPoint: '第三人称单数+wants',
      },
      {
        english: 'Does she need to go now?',
        chinese: '她需要现在走吗？',
        grammarPoint: 'Does + she + need',
      },
      {
        english: "They don't want to wait.",
        chinese: '他们不想等。',
        grammarPoint: "don't want to do",
      },
      {
        english: "He doesn't need to come.",
        chinese: '他不需要来。',
        grammarPoint: "doesn't need to do",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'She _____ to buy some fruit.',
        options: ['want', 'wants', 'wanting', 'to want'],
        answer: 1,
        explanation: '主语She是第三人称单数，用wants。',
        hint: '第三人称单数',
      },
      {
        type: 'fill',
        question: '_____ they _____ (need) any help?',
        fillAnswer: 'Do ... need',
        explanation: '主语they用Do，need用原形。',
        hint: '复数主语用Do',
      },
      {
        type: 'choice',
        question: 'He _____ (not want) to eat out.',
        options: ["don't want", "doesn't want", 'not want', "isn't want"],
        answer: 1,
        explanation: "主语He是第三人称单数，否定用doesn't want。",
        hint: '第三人称否定',
      },
      {
        type: 'fill',
        question: 'We want _____ (go) to the park.',
        fillAnswer: 'to go',
        explanation: 'want后面接to + 动词原形（不定式）。',
        hint: 'want to do',
      },
    ],
    tips: [
      'want和need都是实义动词，变疑问句和否定句要借助do/does',
      '第三人称单数（he/she/it）用wants/needs',
      'want/need后面跟动词时，用to + 动词原形',
    ],
    relatedLessons: [79, 81],
    difficulty: 'easy',
    keywords: ['need', 'want', '练习', '第三人称单数'],
  },

  // ==================== 第81课：一般过去时(更多动词) ====================
  81: {
    title: '一般过去时(更多动词)',
    subtitle: 'had lunch, had a bath',
    explanation:
      '本课学习更多动词在过去时中的运用，特别是have的过去式had在不同搭配中的用法。have在过去时中变成had，可以表示"吃、喝、进行"等多种含义。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'had的常见搭配',
          headers: ['搭配', '含义', '例句'],
          rows: [
            ['have lunch', '吃午饭', 'I had lunch at noon.'],
            ['have breakfast', '吃早饭', 'She had breakfast at 7.'],
            ['have dinner', '吃晚饭', 'We had dinner together.'],
            ['have a bath', '洗澡', 'He had a bath before bed.'],
            ['have a rest', '休息', 'I had a rest after lunch.'],
            ['have a good time', '玩得开心', 'They had a good time.'],
            ['have a look', '看一看', 'I had a look at the book.'],
          ],
        },
      },
    ],
    rules: [
      'have在过去时中变为had',
      'have + 名词 = 进行某个活动',
      'had lunch = 吃了午饭',
      'had a bath = 洗了澡',
      'had a good time = 玩得开心',
    ],
    examples: [
      {
        english: 'I had lunch with my friend.',
        chinese: '我和朋友一起吃了午饭。',
        grammarPoint: 'had lunch',
      },
      {
        english: 'She had a bath before she went to bed.',
        chinese: '她睡觉前洗了个澡。',
        grammarPoint: 'had a bath',
      },
      {
        english: 'We had a good time at the party.',
        chinese: '我们在聚会上玩得很开心。',
        grammarPoint: 'had a good time',
      },
      {
        english: 'He had a rest after work.',
        chinese: '他下班后休息了一下。',
        grammarPoint: 'had a rest',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: "I _____ lunch at 12 o'clock yesterday.",
        options: ['have', 'has', 'had', 'having'],
        answer: 2,
        explanation: 'yesterday表示过去，have的过去式是had。',
        hint: '过去时用had',
      },
      {
        type: 'fill',
        question: 'She _____ (have) a bath last night.',
        fillAnswer: 'had',
        explanation: 'have的过去式是had。',
        hint: 'have→had',
      },
      {
        type: 'choice',
        question: 'We _____ a good time at the cinema.',
        options: ['have', 'has', 'had', 'having'],
        answer: 2,
        explanation: '表示过去的经历，用had。',
        hint: '过去时',
      },
      {
        type: 'fill',
        question: 'He _____ (have) breakfast at 7 this morning.',
        fillAnswer: 'had',
        explanation: 'this morning表示过去时间，用had。',
        hint: '过去时间',
      },
    ],
    tips: [
      'have是一个万能动词，和不同名词搭配有不同含义',
      'have lunch/breakfast/dinner = 吃饭',
      'have a bath/rest/look = 进行某个活动',
      '过去式都是had，不随人称变化',
    ],
    relatedLessons: [79, 82],
    difficulty: 'easy',
    keywords: ['had', 'have lunch', 'have a bath', '过去式'],
  },

  // ==================== 第82课：一般过去时(更多动词)练习 ====================
  82: {
    title: '复习：一般过去时(更多动词)练习',
    subtitle: '通过练习巩固had的搭配用法',
    explanation:
      '本课为第81课的复习课，通过练习巩固have/had在各种搭配中的用法，以及一般过去时在日常表达中的运用。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'have的各种含义对比',
          items: [
            { label: 'have lunch', example: 'I had lunch.', explanation: '吃午饭' },
            { label: 'have a bath', example: 'She had a bath.', explanation: '洗澡' },
            { label: 'have a rest', example: 'He had a rest.', explanation: '休息一下' },
            { label: 'have a look', example: 'I had a look.', explanation: '看一看' },
            {
              label: 'have a good time',
              example: 'They had a good time.',
              explanation: '玩得开心',
            },
          ],
        },
      },
    ],
    rules: ['had是have的过去式，所有人称通用', "否定：didn't have", '疑问：Did ... have ...?'],
    examples: [
      {
        english: "I didn't have breakfast this morning.",
        chinese: '我今天早上没吃早饭。',
        grammarPoint: "didn't have",
      },
      {
        english: 'Did you have a good holiday?',
        chinese: '你假期过得好吗？',
        grammarPoint: 'Did ... have',
      },
      {
        english: 'She had a headache yesterday.',
        chinese: '她昨天头疼。',
        grammarPoint: 'had + 身体不适',
      },
      {
        english: "We didn't have enough time.",
        chinese: '我们没有足够的时间。',
        grammarPoint: "didn't have",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ you _____ a good time last night?',
        options: ['Did; have', 'Did; had', 'Do; have', 'Were; have'],
        answer: 0,
        explanation: 'Did + 主语 + 动词原形have。',
        hint: 'Did后用原形',
      },
      {
        type: 'fill',
        question: 'They _____ (have) dinner at a restaurant.',
        fillAnswer: 'had',
        explanation: 'have的过去式是had。',
        hint: 'have→had',
      },
      {
        type: 'choice',
        question: 'She _____ (not have) lunch yesterday.',
        options: ["didn't had", "didn't have", "doesn't have", "hadn't"],
        answer: 1,
        explanation: "didn't + 动词原形have。",
        hint: "didn't后用原形",
      },
      {
        type: 'fill',
        question: 'What _____ he _____ (have) for breakfast?',
        fillAnswer: 'Did ... have',
        explanation: 'Did + 主语 + 动词原形have。',
        hint: 'Did + 原形',
      },
    ],
    tips: [
      'have的各种搭配要作为一个整体来记忆',
      '否定句和疑问句中have是原形，不加s也不用had',
      'have还可以表示"拥有"：I had a car. (我曾有一辆车)',
    ],
    relatedLessons: [81, 83],
    difficulty: 'easy',
    keywords: ['had', 'have', '一般过去时', '搭配'],
  },

  // ==================== 第83课：现在完成时(一) ====================
  83: {
    title: '现在完成时(一)',
    subtitle: 'I have already/just/never...',
    explanation:
      '现在完成时由"have/has + 过去分词"构成，表示过去发生的动作对现在造成的影响或结果。常用的时间副词有already（已经）、just（刚刚）、never（从未）、yet（还、已经）。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '现在完成时的构成和常用副词',
          headers: ['构成', '结构', '例句'],
          rows: [
            ['肯定句', '主语 + have/has + 过去分词', 'I have finished my homework.'],
            ['否定句', "主语 + haven't/hasn't + 过去分词", "I haven't finished yet."],
            ['疑问句', 'Have/Has + 主语 + 过去分词...?', 'Have you finished?'],
          ],
        },
      },
      {
        type: 'table',
        content: {
          title: '常用时间副词',
          headers: ['副词', '含义', '位置', '例句'],
          rows: [
            ['already', '已经', '句中（肯定句）', 'I have already eaten.'],
            ['just', '刚刚', '句中', 'He has just left.'],
            ['never', '从未', '句中', 'I have never been there.'],
            [
              'yet',
              '还/已经',
              '句末（否定/疑问）',
              "I haven't finished yet. / Have you finished yet?",
            ],
          ],
        },
      },
    ],
    rules: [
      '现在完成时 = have/has + 过去分词',
      'already（已经）：用于肯定句，放在have/has之后',
      'just（刚刚）：用于肯定句，放在have/has之后',
      'never（从未）：用于否定含义，放在have/has之后',
      'yet（还/已经）：用于否定句和疑问句，放在句末',
    ],
    examples: [
      {
        english: 'I have already finished my homework.',
        chinese: '我已经完成了作业。',
        grammarPoint: 'have + already + 过去分词',
      },
      {
        english: 'He has just arrived.',
        chinese: '他刚刚到达。',
        grammarPoint: 'has + just + 过去分词',
      },
      {
        english: 'I have never been to Paris.',
        chinese: '我从未去过巴黎。',
        grammarPoint: 'have + never + 过去分词',
      },
      {
        english: 'Have you eaten yet?',
        chinese: '你吃了吗？',
        grammarPoint: 'Have + 主语 + 过去分词 + yet?',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ already _____ my homework.',
        options: ['have; finish', 'has; finished', 'have; finished', 'had; finished'],
        answer: 2,
        explanation: '主语I用have + 过去分词finished。',
        hint: 'have + 过去分词',
      },
      {
        type: 'fill',
        question: 'She _____ (never be) to London.',
        fillAnswer: 'has never been',
        explanation: '主语She用has，never放在has之后。',
        hint: 'has + never + 过去分词',
      },
      {
        type: 'choice',
        question: 'He has _____ arrived. He is here now.',
        options: ['yet', 'already', 'never', 'ever'],
        answer: 1,
        explanation: '肯定句中表示"已经"用already。',
        hint: '肯定句用already',
      },
      {
        type: 'fill',
        question: 'I _____ (not see) that film _____ (yet/already).',
        fillAnswer: "haven't ... yet",
        explanation: "否定句中用haven't + 过去分词，yet放在句末。",
        hint: '否定句+yet',
      },
    ],
    tips: [
      '现在完成时强调的是"对现在的影响"，不是过去的动作本身',
      'already用于肯定句，yet用于否定句和疑问句',
      'just表示"刚刚"，放在have/has后面',
      'never表示"从未"，含有否定意义',
    ],
    relatedLessons: [81, 84],
    difficulty: 'medium',
    keywords: ['现在完成时', 'have', 'already', 'just', 'never', 'yet'],
  },

  // ==================== 第84课：现在完成时(一)练习 ====================
  84: {
    title: '复习：现在完成时(一)练习',
    subtitle: '通过练习巩固现在完成时的基本用法',
    explanation:
      '本课为第83课的复习课，通过大量练习巩固现在完成时的基本结构和already/just/never/yet的用法。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'already vs yet 对比',
          items: [
            {
              label: 'already（肯定句）',
              example: 'I have already done it.',
              explanation: '表示"已经"，用于肯定句',
            },
            {
              label: 'yet（否定句）',
              example: "I haven't done it yet.",
              explanation: '表示"还（没）"，用于否定句末',
            },
            {
              label: 'yet（疑问句）',
              example: 'Have you done it yet?',
              explanation: '表示"已经"，用于疑问句末',
            },
          ],
        },
      },
    ],
    rules: [
      'already用于肯定句，位置在have/has后、过去分词前',
      'yet用于否定句和疑问句，放在句末',
      'never表示否定含义，放在have/has后',
    ],
    examples: [
      {
        english: 'I have just had a cup of tea.',
        chinese: '我刚刚喝了一杯茶。',
        grammarPoint: 'just',
      },
      {
        english: "She hasn't finished her work yet.",
        chinese: '她还没有完成工作。',
        grammarPoint: "hasn't + yet",
      },
      {
        english: 'Have you ever been to Japan?',
        chinese: '你去过日本吗？',
        grammarPoint: 'Have ... ever + 过去分词',
      },
      {
        english: 'They have already left.',
        chinese: '他们已经离开了。',
        grammarPoint: 'have + already',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He _____ (not finish) his lunch _____.',
        options: ["hasn't; already", "hasn't; yet", "haven't; yet", "didn't; yet"],
        answer: 1,
        explanation: "第三人称单数用hasn't，否定句末用yet。",
        hint: "hasn't + yet",
      },
      {
        type: 'fill',
        question: 'I _____ just _____ (see) Tom.',
        fillAnswer: 'have ... seen',
        explanation: '现在完成时：have + just + 过去分词seen。',
        hint: 'have + just + 过去分词',
      },
      {
        type: 'choice',
        question: 'She has _____ been to America. She went there last year.',
        options: ['never', 'ever', 'already', 'yet'],
        answer: 2,
        explanation: '她去过美国（已经），用already。',
        hint: '肯定句表示已经',
      },
      {
        type: 'fill',
        question: '_____ you _____ (eat) _____ (yet/already)?',
        fillAnswer: 'Have ... eaten ... yet',
        explanation: '疑问句用Have + 主语 + 过去分词，句末用yet。',
        hint: '疑问句+yet',
      },
    ],
    tips: [
      '选择already还是yet，关键看是肯定句还是否定/疑问句',
      'just在英式英语中常与现在完成时连用',
      '注意have/has的选择：I/you/we/they用have，he/she/it用has',
    ],
    relatedLessons: [83, 85],
    difficulty: 'medium',
    keywords: ['现在完成时', 'already', 'yet', 'just', '练习'],
  },

  // ==================== 第85课：现在完成时(二) ====================
  85: {
    title: '现在完成时(二)',
    subtitle: 'Have you ever been to...? I have been to...',
    explanation:
      '本课学习用现在完成时表示"曾经去过某地"。have been to表示"曾经去过（已回来）"，have gone to表示"已经去了（人不在这里）"。同时学习ever（曾经）的用法。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'have been to vs have gone to',
          items: [
            {
              label: 'have been to',
              example: 'I have been to Beijing.',
              explanation: '我去过北京（已回来）',
            },
            {
              label: 'have gone to',
              example: 'He has gone to Beijing.',
              explanation: '他去北京了（人不在这里）',
            },
            {
              label: 'ever',
              example: 'Have you ever been to China?',
              explanation: '你曾经去过中国吗？',
            },
          ],
        },
      },
    ],
    rules: [
      'have been to + 地点 = 曾经去过某地（已回来）',
      'have gone to + 地点 = 已经去了某地（人不在这里）',
      'ever（曾经）：用于疑问句，放在have/has后',
      'Have you ever been to...? = 你去过...吗？',
    ],
    examples: [
      {
        english: 'I have been to Paris twice.',
        chinese: '我去过巴黎两次。',
        grammarPoint: 'have been to',
      },
      {
        english: 'Have you ever been to London?',
        chinese: '你去过伦敦吗？',
        grammarPoint: 'Have ... ever been to',
      },
      {
        english: 'He has gone to Shanghai.',
        chinese: '他去上海了。（人不在这里）',
        grammarPoint: 'has gone to',
      },
      {
        english: 'She has never been to Japan.',
        chinese: '她从未去过日本。',
        grammarPoint: 'has never been to',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ _____ to New York twice.',
        options: ['have; gone', 'have; been', 'has; been', 'had; been'],
        answer: 1,
        explanation: 'have been to表示"曾经去过"（已回来）。',
        hint: '去过已回来',
      },
      {
        type: 'fill',
        question: 'He _____ _____ _____ (go) to the library. He is not here.',
        fillAnswer: 'has gone to',
        explanation: '人不在这里，用has gone to。',
        hint: '人不在这里',
      },
      {
        type: 'choice',
        question: '_____ you ever _____ to Australia?',
        options: ['Have; go', 'Did; been', 'Have; been', 'Did; go'],
        answer: 2,
        explanation: 'Have you ever been to...? 你去过...吗？',
        hint: 'ever + been',
      },
      {
        type: 'fill',
        question: 'She _____ (never be) to the Great Wall.',
        fillAnswer: 'has never been',
        explanation: '主语She用has，never been to表示从未去过。',
        hint: 'has never been',
      },
    ],
    tips: [
      'have been to = 去过（人已回来）',
      'have gone to = 去了（人不在这里，去了别处）',
      'ever用于疑问句：Have you ever been to...?',
      'never用于否定句：I have never been to...',
    ],
    relatedLessons: [83, 86],
    difficulty: 'medium',
    keywords: ['have been to', 'have gone to', 'ever', '现在完成时'],
  },

  // ==================== 第86课：现在完成时(二)练习 ====================
  86: {
    title: '复习：现在完成时(二)练习',
    subtitle: '通过练习巩固been to和gone to的区别',
    explanation:
      '本课为第85课的复习课，重点练习have been to和have gone to的区别，以及ever和never的用法。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'been to / gone to 判断公式',
          formula: '人在这里问去向 → have gone to / 人不在（已回来） → have been to',
          examples: [
            'Where is Tom? → He has gone to the shop. (人不在这)',
            'Have you been to Paris? → Yes, I have. (去过，已回来)',
          ],
        },
      },
    ],
    rules: [
      '问"去过"用have been to（人已回来）',
      '问"去了哪里"用have gone to（人不在此）',
      'ever用于疑问句，never用于否定含义',
    ],
    examples: [
      {
        english: 'Where is your father? He has gone to work.',
        chinese: '你爸爸在哪？他去上班了。',
        grammarPoint: 'has gone to',
      },
      {
        english: 'I have been to the Great Wall three times.',
        chinese: '我去过长城三次。',
        grammarPoint: 'have been to',
      },
      {
        english: 'Have you ever tried Chinese food?',
        chinese: '你尝过中国菜吗？',
        grammarPoint: 'Have ... ever + 过去分词',
      },
      {
        english: 'She has never seen snow.',
        chinese: '她从未见过雪。',
        grammarPoint: 'has never + 过去分词',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Where is Mary? She _____ _____ to the bank.',
        options: ['has; been', 'has; gone', 'have; been', 'have; gone'],
        answer: 1,
        explanation: 'Mary人不在这里，用has gone to。',
        hint: '人不在这里',
      },
      {
        type: 'fill',
        question: 'I _____ (be) to Italy three times.',
        fillAnswer: 'have been',
        explanation: '我去过意大利（已回来），用have been。',
        hint: '去过已回来',
      },
      {
        type: 'choice',
        question: 'Have you _____ visited the British Museum?',
        options: ['never', 'ever', 'already', 'yet'],
        answer: 1,
        explanation: '疑问句中表示"曾经"用ever。',
        hint: '疑问句用ever',
      },
      {
        type: 'fill',
        question: 'He _____ (never see) such a beautiful sunset.',
        fillAnswer: 'has never seen',
        explanation: '主语He用has，never seen表示从未见过。',
        hint: 'has never + 过去分词',
      },
    ],
    tips: [
      '做题时判断说话人"在不在现场"是区分been和gone的关键',
      'ever用在疑问句，never用在陈述句中表示否定',
      'never本身是否定词，句子不需要再加not',
    ],
    relatedLessons: [85, 87],
    difficulty: 'medium',
    keywords: ['been to', 'gone to', 'ever', 'never', '练习'],
  },

  // ==================== 第87课：现在完成时(三) ====================
  87: {
    title: '现在完成时(三)',
    subtitle: 'How long have you...? I have...for/since...',
    explanation:
      '本课学习用现在完成时表示持续性动作或状态。for + 一段时间，since + 时间点，用来表示动作从过去持续到现在。How long用来提问持续时间。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'for和since的用法',
          headers: ['介词', '后接内容', '例句'],
          rows: [
            ['for', '一段时间', 'I have lived here for 5 years.'],
            ['for', '一段时间', 'She has waited for 2 hours.'],
            ['since', '过去的时间点', 'I have lived here since 2020.'],
            ['since', '过去的时间点', 'He has worked here since Monday.'],
          ],
        },
      },
    ],
    rules: [
      'for + 一段时间（for two years, for three hours）',
      'since + 过去的时间点（since 2020, since Monday, since last year）',
      'How long have you...? = 你...多久了？',
      '现在完成时表示从过去持续到现在的动作或状态',
    ],
    examples: [
      {
        english: 'I have lived in Beijing for ten years.',
        chinese: '我在北京住了十年了。',
        grammarPoint: 'for + 一段时间',
      },
      {
        english: 'She has worked here since 2018.',
        chinese: '她从2018年开始在这里工作。',
        grammarPoint: 'since + 时间点',
      },
      {
        english: 'How long have you studied English?',
        chinese: '你学英语多久了？',
        grammarPoint: 'How long + 现在完成时',
      },
      {
        english: 'He has been ill for three days.',
        chinese: '他病了三天了。',
        grammarPoint: 'for + 一段时间',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I have known her _____ 2015.',
        options: ['for', 'since', 'from', 'in'],
        answer: 1,
        explanation: '2015是时间点，用since。',
        hint: '时间点用since',
      },
      {
        type: 'fill',
        question: 'She has lived here _____ ten years.',
        fillAnswer: 'for',
        explanation: 'ten years是一段时间，用for。',
        hint: '一段时间用for',
      },
      {
        type: 'choice',
        question: '_____ long have you waited?',
        options: ['What', 'How', 'When', 'Where'],
        answer: 1,
        explanation: 'How long用来提问持续时间。',
        hint: '提问时间长度',
      },
      {
        type: 'fill',
        question: 'He _____ (work) here _____ last year.',
        fillAnswer: 'has worked ... since',
        explanation: '主语He用has worked，last year是时间点用since。',
        hint: 'has + 过去分词 + since',
      },
    ],
    tips: [
      'for + 时间段：for two hours, for three days, for a long time',
      'since + 时间点：since Monday, since 2020, since last week',
      'How long用来提问"多久"',
      '现在完成时表持续时，动词要用延续性动词（如live, work, study）',
    ],
    relatedLessons: [85, 88],
    difficulty: 'medium',
    keywords: ['for', 'since', 'How long', '现在完成时', '持续'],
  },

  // ==================== 第88课：现在完成时(三)练习 ====================
  88: {
    title: '复习：现在完成时(三)练习',
    subtitle: '通过练习巩固for和since的用法',
    explanation:
      '本课为第87课的复习课，通过大量练习巩固for和since在现在完成时中的用法，以及How long的提问方式。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'for vs since 速记',
          items: [
            {
              label: 'for + 时间段',
              example: 'for 3 years / for 2 hours / for a long time',
              explanation: '后接一段时间',
            },
            {
              label: 'since + 时间点',
              example: 'since 2020 / since Monday / since last year',
              explanation: '后接一个具体的过去时间点',
            },
            {
              label: 'How long',
              example: 'How long have you lived here?',
              explanation: '提问持续多长时间',
            },
          ],
        },
      },
    ],
    rules: [
      'for后面接一段时间，since后面接一个时间点',
      '时间段有数字 → for（for two days）',
      '时间点有具体日期/时间 → since（since Monday）',
    ],
    examples: [
      {
        english: 'They have been friends for many years.',
        chinese: '他们做了很多年朋友了。',
        grammarPoint: 'for + 时间段',
      },
      {
        english: "I haven't seen him since last month.",
        chinese: '我从上个月起就没见过他。',
        grammarPoint: 'since + 时间点',
      },
      {
        english: 'How long has she worked here?',
        chinese: '她在这里工作多久了？',
        grammarPoint: 'How long + 现在完成时',
      },
      {
        english: 'We have studied English for three years.',
        chinese: '我们学英语学了三年了。',
        grammarPoint: 'for + 时间段',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He has been a teacher _____ 10 years.',
        options: ['since', 'for', 'from', 'in'],
        answer: 1,
        explanation: '10 years是一段时间，用for。',
        hint: '时间段用for',
      },
      {
        type: 'fill',
        question: 'I have known him _____ (自从) 2019.',
        fillAnswer: 'since',
        explanation: '2019是时间点，用since。',
        hint: '时间点用since',
      },
      {
        type: 'choice',
        question: '_____ long _____ you lived in Shanghai?',
        options: ['How; do', 'What; have', 'How; have', 'What; do'],
        answer: 2,
        explanation: 'How long have + 主语 + 过去分词。',
        hint: 'How long + 现在完成时',
      },
      {
        type: 'fill',
        question: 'She _____ (wait) for two hours.',
        fillAnswer: 'has waited',
        explanation: '主语She用has waited，two hours前用for。',
        hint: 'has + 过去分词 + for',
      },
    ],
    tips: [
      '记忆技巧：for = 一段时间，since = 时间点',
      'How long是询问持续时间的固定搭配',
      '现在完成时表持续时，动词必须是延续性动词',
    ],
    relatedLessons: [87, 89],
    difficulty: 'medium',
    keywords: ['for', 'since', 'How long', '现在完成时', '练习'],
  },

  // ==================== 第89课：现在完成时(四) ====================
  89: {
    title: '现在完成时(四)',
    subtitle: 'for和since的区别',
    explanation:
      '本课进一步深入学习for和since的区别，以及一些常见的非延续性动词变为延续性动词的表达方式。非延续性动词（如buy, die, arrive）不能直接与for/since连用，需要转换为延续性表达。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '非延续性动词 → 延续性表达',
          headers: ['非延续性表达', '延续性表达', '含义'],
          rows: [
            ['buy → have bought', 'have had', '买 → 拥有'],
            ['die → has died', 'has been dead', '死 → 已经去世'],
            ['arrive → has arrived', 'has been here', '到达 → 在这里'],
            ['leave → has left', 'has been away', '离开 → 已经离开'],
            ['join → has joined', 'has been a member', '加入 → 成为成员'],
            ['begin → has begun', 'has been on', '开始 → 正在进行'],
            ['borrow → has borrowed', 'has kept', '借 → 保管'],
          ],
        },
      },
    ],
    rules: [
      'for + 时间段，since + 时间点',
      '非延续性动词不能直接与for/since连用',
      '需要把非延续性动词转换为延续性表达',
      '常见转换：buy→have, die→be dead, arrive→be here, leave→be away',
    ],
    examples: [
      {
        english: 'I have had this book for two weeks.',
        chinese: '这本书我买了两周了。',
        grammarPoint: 'have had（不能说have bought for）',
      },
      {
        english: 'He has been dead for three years.',
        chinese: '他去世三年了。',
        grammarPoint: 'has been dead（不能说has died for）',
      },
      {
        english: 'She has been away since Monday.',
        chinese: '她从周一起就不在了。',
        grammarPoint: 'has been away（不能说has left since）',
      },
      {
        english: 'The film has been on for 30 minutes.',
        chinese: '电影已经开始30分钟了。',
        grammarPoint: 'has been on（不能说has begun for）',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He has _____ the book for a week.',
        options: ['bought', 'borrowed', 'had', 'got'],
        answer: 2,
        explanation: '表示"拥有"一段时间用have had。',
        hint: '延续性动词',
      },
      {
        type: 'fill',
        question: 'She _____ (die) three years ago. → She _____ _____ _____ for three years.',
        fillAnswer: 'has been dead',
        explanation: 'die是非延续性动词，改用has been dead。',
        hint: '延续性表达',
      },
      {
        type: 'choice',
        question: 'The meeting has _____ for two hours.',
        options: ['begun', 'started', 'been on', 'been begun'],
        answer: 2,
        explanation: 'begin是非延续性动词，改用has been on。',
        hint: '延续性表达',
      },
      {
        type: 'fill',
        question: 'He has _____ (leave) since yesterday. → He has _____ _____ since yesterday.',
        fillAnswer: 'been away',
        explanation: 'leave是非延续性动词，改用has been away。',
        hint: 'be away',
      },
    ],
    tips: [
      '非延续性动词（瞬间动词）不能与for/since连用',
      '常见非延续性动词：buy, die, arrive, leave, join, begin, borrow',
      '转换方法：把动作变成状态（buy→have, die→be dead）',
      '如果句中有for/since，一定要检查动词是否是延续性动词',
    ],
    relatedLessons: [87, 90],
    difficulty: 'hard',
    keywords: ['for', 'since', '延续性动词', '非延续性动词', '现在完成时'],
  },

  // ==================== 第90课：现在完成时(四)练习 ====================
  90: {
    title: '复习：现在完成时(四)练习',
    subtitle: '通过练习巩固延续性动词和非延续性动词的转换',
    explanation:
      '本课为第89课的复习课，通过练习巩固非延续性动词到延续性表达的转换，以及for和since的综合运用。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '延续性转换速查表',
          headers: ['原句（非延续）', '改写（延续）', 'for/since例句'],
          rows: [
            ['I bought this car.', 'I have had this car.', 'I have had this car for 3 years.'],
            ['He came here.', 'He has been here.', 'He has been here since Monday.'],
            [
              'She joined the club.',
              'She has been a member.',
              'She has been a member for 2 years.',
            ],
            ['The rain started.', 'The rain has been on.', 'The rain has been on for an hour.'],
          ],
        },
      },
    ],
    rules: [
      '与for/since连用时必须使用延续性动词',
      '非延续性动词需要转换为对应的延续性表达',
      '注意区分动作和状态',
    ],
    examples: [
      {
        english: 'He has kept the book for two months.',
        chinese: '这本书他借了两个月了。',
        grammarPoint: 'keep（延续性）替代borrow',
      },
      {
        english: 'I have been a teacher since 2015.',
        chinese: '我从2015年起就是老师了。',
        grammarPoint: 'be a teacher（延续性）替代become a teacher',
      },
      {
        english: 'She has been at home for two hours.',
        chinese: '她在家待了两个小时了。',
        grammarPoint: 'be at home（延续性）替代arrive home',
      },
      {
        english: 'They have been married for 20 years.',
        chinese: '他们结婚20年了。',
        grammarPoint: 'be married（延续性）替代get married',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I have _____ this car since 2020.',
        options: ['bought', 'had', 'got', 'bought'],
        answer: 1,
        explanation: 'since 2020要求延续性动词，用have had。',
        hint: '延续性动词',
      },
      {
        type: 'fill',
        question: 'He _____ (join) the army in 2018. → He _____ _____ _____ the army since 2018.',
        fillAnswer: 'has been in',
        explanation: 'join是非延续性动词，改用has been in。',
        hint: 'be in',
      },
      {
        type: 'choice',
        question: 'The old man has _____ for ten years.',
        options: ['died', 'been died', 'been dead', 'dead'],
        answer: 2,
        explanation: 'die是非延续性动词，改用has been dead。',
        hint: 'be dead',
      },
      {
        type: 'fill',
        question: 'She _____ (come) here two hours ago. → She _____ _____ here for two hours.',
        fillAnswer: 'has been',
        explanation: 'come是非延续性动词，改用has been here。',
        hint: 'be here',
      },
    ],
    tips: [
      '记住高频转换：buy→have, die→be dead, arrive→be here, leave→be away',
      '做题时看到for/since，首先要判断动词是否延续',
      '如果动词不延续，就找对应的延续性表达来替换',
    ],
    relatedLessons: [89, 91],
    difficulty: 'hard',
    keywords: ['延续性动词', '非延续性动词', 'for', 'since', '转换'],
  },

  // ==================== 第91课：一般将来时(will) ====================
  91: {
    title: '一般将来时(will)',
    subtitle: 'I will/shall go tomorrow.',
    explanation:
      "一般将来时表示将来要发生的动作或存在的状态。will + 动词原形可以用于所有人称，shall + 动词原形主要用于第一人称（I/we）。否定形式：will not (won't)。疑问形式：Will + 主语 + 动词原形?",
    visualRules: [
      {
        type: 'table',
        content: {
          title: '一般将来时(will)句型',
          headers: ['句型', '结构', '例句'],
          rows: [
            ['肯定句', '主语 + will + 动词原形', 'I will go tomorrow.'],
            ['否定句', "主语 + won't + 动词原形", "I won't go tomorrow."],
            ['疑问句', 'Will + 主语 + 动词原形?', 'Will you go tomorrow?'],
            ['肯定回答', 'Yes, 主语 + will.', 'Yes, I will.'],
            ['否定回答', "No, 主语 + won't.", "No, I won't."],
          ],
        },
      },
    ],
    rules: [
      'will + 动词原形（所有人称通用）',
      'shall + 动词原形（主要用于第一人称I/we）',
      "否定：will not = won't",
      '疑问：Will + 主语 + 动词原形?',
      '时间标志词：tomorrow, next week, in the future等',
    ],
    examples: [
      {
        english: 'I will come to see you tomorrow.',
        chinese: '我明天来看你。',
        grammarPoint: 'will + 动词原形',
      },
      {
        english: 'It will rain tomorrow.',
        chinese: '明天会下雨。',
        grammarPoint: 'will + 动词原形',
      },
      {
        english: "She won't be late.",
        chinese: '她不会迟到的。',
        grammarPoint: "won't + 动词原形",
      },
      {
        english: 'Will you go with me?',
        chinese: '你愿意和我一起去吗？',
        grammarPoint: 'Will + 主语 + 动词原形',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ go to the park tomorrow.',
        options: ['will', 'am', 'shall', 'A和C都对'],
        answer: 3,
        explanation: 'will和shall都可以用于第一人称表示将来。',
        hint: 'I + will/shall',
      },
      {
        type: 'fill',
        question: 'She _____ (not come) to the party tonight.',
        fillAnswer: "won't come",
        explanation: "否定用won't + 动词原形come。",
        hint: "won't + 原形",
      },
      {
        type: 'choice',
        question: '_____ you help me with this?',
        options: ['Will', 'Are', 'Do', 'Shall'],
        answer: 0,
        explanation: 'Will you...? 请求对方帮助用Will。',
        hint: '请求帮助',
      },
      {
        type: 'fill',
        question: 'They _____ (not go) to school tomorrow.',
        fillAnswer: "won't go",
        explanation: "否定用won't + 动词原形go。",
        hint: "won't + 原形",
      },
    ],
    tips: [
      'will所有人称通用，不需要变化',
      'shall主要用于第一人称，will更常用',
      "won't是will not的缩写",
      '一般将来时常与tomorrow, next week等时间状语连用',
    ],
    relatedLessons: [89, 92],
    difficulty: 'easy',
    keywords: ['will', 'shall', "won't", '一般将来时', 'tomorrow'],
  },

  // ==================== 第92课：一般将来时(will)练习 ====================
  92: {
    title: '复习：一般将来时(will)练习',
    subtitle: '通过练习巩固will的用法',
    explanation:
      '本课为第91课的复习课，通过练习巩固will/shall构成的一般将来时的肯定句、否定句和疑问句。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '一般将来时(will)句型公式',
          formula:
            "肯定：主语 + will + 原形 / 否定：主语 + won't + 原形 / 疑问：Will + 主语 + 原形?",
          examples: [
            "He will come. → He won't come. → Will he come?",
            "They will help. → They won't help. → Will they help?",
          ],
        },
      },
    ],
    rules: [
      'will + 动词原形（所有人称通用）',
      "否定：won't + 动词原形",
      '疑问：Will + 主语 + 动词原形?',
    ],
    examples: [
      {
        english: 'The train will arrive at 8.',
        chinese: '火车将在8点到达。',
        grammarPoint: 'will + 原形',
      },
      {
        english: "I won't forget your birthday.",
        chinese: '我不会忘记你的生日。',
        grammarPoint: "won't + 原形",
      },
      {
        english: 'Will it be sunny tomorrow?',
        chinese: '明天会是晴天吗？',
        grammarPoint: 'Will + 主语 + 原形',
      },
      {
        english: 'We shall go there together.',
        chinese: '我们将一起去那里。',
        grammarPoint: 'shall + 原形',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'It _____ (be) cold tomorrow.',
        options: ['is', 'will be', 'was', 'are'],
        answer: 1,
        explanation: 'tomorrow表示将来，用will be。',
        hint: '将来时',
      },
      {
        type: 'fill',
        question: '_____ she _____ (come) to the meeting?',
        fillAnswer: 'Will ... come',
        explanation: 'Will + 主语 + 动词原形come。',
        hint: 'Will + 原形',
      },
      {
        type: 'choice',
        question: 'They _____ finish the work next week.',
        options: ["won't", "willn't", "don't", "aren't"],
        answer: 0,
        explanation: "否定用won't。",
        hint: "won't",
      },
      {
        type: 'fill',
        question: 'I _____ (help) you with your homework.',
        fillAnswer: 'will help',
        explanation: '表示意愿用will + 动词原形help。',
        hint: 'will + 原形',
      },
    ],
    tips: [
      'will后面永远跟动词原形',
      'will可以表示"预测、意愿、临时决定"',
      "否定形式won't发音为/wont/",
    ],
    relatedLessons: [91, 93],
    difficulty: 'easy',
    keywords: ['will', '一般将来时', '练习'],
  },

  // ==================== 第93课：一般将来时(be going to) ====================
  93: {
    title: '一般将来时(be going to)',
    subtitle: "I'm going to do...",
    explanation:
      'be going to + 动词原形表示"打算做某事"或"根据迹象预测即将发生的事"。be动词根据主语变化（am/is/are）。与will的区别：be going to强调计划或有迹象的预测，will强调临时决定或单纯的将来。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'be going to句型',
          headers: ['句型', '结构', '例句'],
          rows: [
            ['肯定句', '主语 + am/is/are + going to + 原形', "I'm going to visit my friend."],
            ['否定句', '主语 + am/is/are + not + going to + 原形', "I'm not going to go."],
            ['疑问句', 'Am/Is/Are + 主语 + going to + 原形?', 'Are you going to study?'],
          ],
        },
      },
      {
        type: 'comparison',
        content: {
          title: 'will vs be going to',
          items: [
            {
              label: 'will（临时决定）',
              example: "It's cold. I'll close the window.",
              explanation: '看到冷了才决定关窗',
            },
            {
              label: 'be going to（已有计划）',
              example: "I'm going to travel next month.",
              explanation: '早就计划好的旅行',
            },
            {
              label: 'be going to（有迹象预测）',
              example: "Look! It's going to rain.",
              explanation: '看到乌云，预测要下雨',
            },
          ],
        },
      },
    ],
    rules: [
      'be going to + 动词原形 = 打算做某事',
      'be going to + 动词原形 = 根据迹象预测',
      'be动词根据主语变化：I am, He/She is, We/You/They are',
      '否定：be + not + going to + 原形',
      '疑问：Be + 主语 + going to + 原形?',
    ],
    examples: [
      {
        english: "I'm going to buy a new car.",
        chinese: '我打算买一辆新车。',
        grammarPoint: 'be going to（计划）',
      },
      {
        english: "Look at the clouds. It's going to rain.",
        chinese: '看那些云。要下雨了。',
        grammarPoint: 'be going to（有迹象预测）',
      },
      {
        english: "She isn't going to come tonight.",
        chinese: '她今晚不打算来。',
        grammarPoint: "isn't going to",
      },
      {
        english: 'Are you going to take the exam?',
        chinese: '你打算参加考试吗？',
        grammarPoint: 'Are + 主语 + going to',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I _____ going to visit Paris next year.',
        options: ['am', 'is', 'are', 'will'],
        answer: 0,
        explanation: '主语I用am going to。',
        hint: 'I + am going to',
      },
      {
        type: 'fill',
        question: 'She _____ (be) going to study medicine.',
        fillAnswer: 'is',
        explanation: '主语She用is going to。',
        hint: 'She + is',
      },
      {
        type: 'choice',
        question: '_____ you going to help us?',
        options: ['Do', 'Will', 'Are', 'Is'],
        answer: 2,
        explanation: 'Are you going to...? 你打算...吗？',
        hint: 'Are + you',
      },
      {
        type: 'fill',
        question: 'They _____ (not be) going to move house.',
        fillAnswer: "aren't",
        explanation: "主语They的否定用aren't going to。",
        hint: "aren't going to",
      },
    ],
    tips: [
      'be going to = 有计划/打算',
      "be going to也可以表示有迹象的预测（Look! It's going to rain.）",
      "be going to的缩写：I'm going to, He's going to, They're going to",
      '注意be going to后面跟动词原形，不是ing形式',
    ],
    relatedLessons: [91, 94],
    difficulty: 'medium',
    keywords: ['be going to', '一般将来时', '计划', '预测'],
  },

  // ==================== 第94课：一般将来时(be going to)练习 ====================
  94: {
    title: '复习：一般将来时(be going to)练习',
    subtitle: '通过练习巩固be going to的用法',
    explanation:
      '本课为第93课的复习课，通过练习巩固be going to的用法，以及will和be going to的区别。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'will vs be going to 使用场景',
          items: [
            {
              label: '临时决定',
              example: "I'm hungry. I'll eat out.",
              explanation: '刚做出的决定用will',
            },
            {
              label: '事先计划',
              example: "I'm going to eat out tonight.",
              explanation: '早已计划好的用be going to',
            },
            {
              label: '有迹象预测',
              example: "Look! He's going to fall!",
              explanation: '根据迹象判断用be going to',
            },
            {
              label: '无迹象预测',
              example: 'I think it will rain tomorrow.',
              explanation: '个人判断用will',
            },
          ],
        },
      },
    ],
    rules: [
      '临时决定用will',
      '事先计划用be going to',
      '有迹象的预测用be going to',
      '单纯的将来预测用will',
    ],
    examples: [
      {
        english: "We're going to have a party this weekend.",
        chinese: '我们这周末打算开个派对。',
        grammarPoint: 'be going to（计划）',
      },
      {
        english: "He's going to be 20 next month.",
        chinese: '他下个月就20岁了。',
        grammarPoint: 'be going to（将来）',
      },
      {
        english: "The phone is ringing. I'll answer it.",
        chinese: '电话响了。我去接。',
        grammarPoint: 'will（临时决定）',
      },
      {
        english: 'Are they going to sell their house?',
        chinese: '他们打算卖房子吗？',
        grammarPoint: 'be going to疑问句',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Look at those dark clouds! It _____ rain.',
        options: ['is going to', 'will', 'is', 'was going to'],
        answer: 0,
        explanation: '看到乌云是有迹象的预测，用be going to。',
        hint: '有迹象预测',
      },
      {
        type: 'fill',
        question: 'We _____ (be not) going to attend the meeting.',
        fillAnswer: "aren't",
        explanation: "主语We否定用aren't going to。",
        hint: "aren't going to",
      },
      {
        type: 'choice',
        question: 'Someone is at the door. I _____ open it.',
        options: ['am going to', 'will', 'am', 'going to'],
        answer: 1,
        explanation: '临时决定用will。',
        hint: '临时决定',
      },
      {
        type: 'fill',
        question: '_____ he going to _____ (take) a holiday?',
        fillAnswer: 'Is ... take',
        explanation: 'Is he going to + 动词原形take。',
        hint: 'Is he going to',
      },
    ],
    tips: [
      '区分will和be going to的关键：是否有计划、是否有迹象',
      '口语中两者有时可以互换，但考试中要注意区分',
      'be going to中的going不是"去"的意思，而是表示将来',
    ],
    relatedLessons: [93, 95],
    difficulty: 'medium',
    keywords: ['be going to', 'will', '区别', '练习'],
  },

  // ==================== 第95课：had better的用法 ====================
  95: {
    title: 'had better的用法',
    subtitle: "You'd better hurry up!",
    explanation:
      'had better表示"最好"，用于提出建议或忠告，含有"如果不这样做可能会有不好的结果"的意味。缩写形式：\'d better。否定形式：had better not + 动词原形。注意：虽然有had，但had better不是过去时，而是表示现在或将来。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'had better的句型',
          headers: ['句型', '结构', '例句'],
          rows: [
            ['肯定句', '主语 + had better + 动词原形', "You'd better go now."],
            ['否定句', '主语 + had better not + 动词原形', "You'd better not go."],
            ['疑问句', 'Had + 主语 + better + 动词原形?', 'Had I better go now?'],
          ],
        },
      },
    ],
    rules: [
      'had better + 动词原形 = 最好做某事',
      'had better not + 动词原形 = 最好不做某事',
      "'d better = had better的缩写",
      'had better虽然有had，但不是过去时',
      'had better比should语气更强，暗示"否则会有不好后果"',
    ],
    examples: [
      {
        english: "You'd better hurry up, or you'll miss the bus.",
        chinese: '你最好快点，否则会错过公交车。',
        grammarPoint: "'d better + 原形",
      },
      {
        english: "You'd better not stay up late.",
        chinese: '你最好不要熬夜。',
        grammarPoint: "'d better not + 原形",
      },
      {
        english: "He'd better see a doctor.",
        chinese: '他最好去看医生。',
        grammarPoint: "'d better + 原形",
      },
      {
        english: "We'd better leave now.",
        chinese: '我们现在最好离开。',
        grammarPoint: "'d better + 原形",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'You _____ better study hard.',
        options: ['have', 'has', 'had', 'having'],
        answer: 2,
        explanation: 'had better是固定搭配。',
        hint: 'had better',
      },
      {
        type: 'fill',
        question: "You'd better _____ (not eat) too much sugar.",
        fillAnswer: 'not eat',
        explanation: 'had better not + 动词原形。',
        hint: 'better not + 原形',
      },
      {
        type: 'choice',
        question: "It's raining. You'd better _____ an umbrella.",
        options: ['take', 'to take', 'taking', 'took'],
        answer: 0,
        explanation: 'had better + 动词原形take。',
        hint: 'better + 原形',
      },
      {
        type: 'fill',
        question: "He'd better _____ (hurry) up.",
        fillAnswer: 'hurry',
        explanation: 'had better + 动词原形hurry。',
        hint: 'better + 原形',
      },
    ],
    tips: [
      'had better不是过去时！它是固定搭配，表示现在或将来的建议',
      "'d better = had better，不要误解为would better",
      '否定形式：had better not（not放在better后面）',
      "语气比should更强，暗示'否则会有不良后果'",
    ],
    relatedLessons: [93, 96],
    difficulty: 'medium',
    keywords: ['had better', "'d better", '最好', '建议'],
  },

  // ==================== 第96课：had better练习 ====================
  96: {
    title: '复习：had better练习',
    subtitle: '通过练习巩固had better的用法',
    explanation:
      '本课为第95课的复习课，通过练习巩固had better的肯定句、否定句用法，以及与should的对比。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'had better vs should',
          items: [
            {
              label: 'had better',
              example: "You'd better go now.",
              explanation: '最好（语气较强，暗示后果）',
            },
            {
              label: 'should',
              example: 'You should go now.',
              explanation: '应该（语气较温和的建议）',
            },
            {
              label: 'had better not',
              example: "You'd better not be late.",
              explanation: '最好不要（有警告意味）',
            },
            {
              label: "shouldn't",
              example: "You shouldn't be late.",
              explanation: '不应该（一般性建议）',
            },
          ],
        },
      },
    ],
    rules: [
      'had better语气比should强',
      "had better暗示'否则可能有不好的结果'",
      'should是一般性的建议',
      'had better的否定是had better not',
    ],
    examples: [
      {
        english: "You'd better wear a coat. It's very cold.",
        chinese: '你最好穿件外套。天很冷。',
        grammarPoint: "'d better",
      },
      {
        english: "You'd better not tell anyone.",
        chinese: '你最好不要告诉任何人。',
        grammarPoint: "'d better not",
      },
      {
        english: "We'd better book the tickets in advance.",
        chinese: '我们最好提前订票。',
        grammarPoint: "'d better",
      },
      {
        english: "You'd better not drive so fast.",
        chinese: '你最好不要开这么快。',
        grammarPoint: "'d better not",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'You _____ better not swim in this river.',
        options: ['have', 'has', 'had', 'are'],
        answer: 2,
        explanation: 'had better not是固定搭配。',
        hint: 'had better not',
      },
      {
        type: 'fill',
        question: "You'd better _____ (take) a taxi.",
        fillAnswer: 'take',
        explanation: 'had better + 动词原形take。',
        hint: 'better + 原形',
      },
      {
        type: 'choice',
        question: "He'd better _____ late again.",
        options: ['not be', 'not to be', "don't be", "isn't"],
        answer: 0,
        explanation: 'had better not + 动词原形be。',
        hint: 'better not + 原形',
      },
      {
        type: 'fill',
        question: "You'd better _____ (not tell) him the truth.",
        fillAnswer: 'not tell',
        explanation: 'had better not + 动词原形tell。',
        hint: 'better not + 原形',
      },
    ],
    tips: [
      '记住：had better = 最好（现在/将来）',
      'had better not = 最好不要',
      '虽然有had，但和过去没有关系',
      "口语中常缩写为'd better",
    ],
    relatedLessons: [95, 97],
    difficulty: 'medium',
    keywords: ['had better', 'should', '区别', '练习'],
  },

  // ==================== 第97课：名词性物主代词 ====================
  97: {
    title: '名词性物主代词',
    subtitle: 'mine, yours, his, hers, ours, theirs',
    explanation:
      '名词性物主代词相当于"形容词性物主代词 + 名词"，可以独立使用，后面不需要再跟名词。如：This book is mine. = This is my book. 形容词性物主代词（my, your等）后面必须跟名词，名词性物主代词（mine, yours等）可以单独使用。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '形容词性物主代词 vs 名词性物主代词',
          headers: ['人称', '形容词性', '名词性', '例句'],
          rows: [
            ['I', 'my', 'mine', 'This is my book. = This book is mine.'],
            ['you', 'your', 'yours', 'Is this your pen? = Is this pen yours?'],
            ['he', 'his', 'his', 'This is his car. = This car is his.'],
            ['she', 'her', 'hers', 'This is her bag. = This bag is hers.'],
            ['we', 'our', 'ours', 'This is our classroom. = This classroom is ours.'],
            ['they', 'their', 'theirs', 'This is their house. = This house is theirs.'],
          ],
        },
      },
    ],
    rules: [
      '名词性物主代词 = 形容词性物主代词 + 名词',
      '形容词性物主代词后面必须跟名词（my book）',
      '名词性物主代词可以独立使用（mine）',
      'his既是形容词性也是名词性物主代词',
      '名词性物主代词常用于：...is mine/yours/his/hers等',
    ],
    examples: [
      {
        english: 'This is my book. That is yours.',
        chinese: '这是我的书。那是你的。',
        grammarPoint: 'my vs yours',
      },
      {
        english: "Whose coat is this? It's hers.",
        chinese: '这是谁的外套？是她的。',
        grammarPoint: 'hers',
      },
      {
        english: 'Ours is bigger than theirs.',
        chinese: '我们的比他们的大。',
        grammarPoint: 'Ours vs theirs',
      },
      {
        english: 'His car is red. Mine is blue.',
        chinese: '他的车是红色的。我的是蓝色的。',
        grammarPoint: 'His vs Mine',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'This pen is _____. (I)',
        options: ['my', 'mine', 'me', 'I'],
        answer: 1,
        explanation: '独立使用名词性物主代词mine。',
        hint: '名词性物主代词',
      },
      {
        type: 'fill',
        question: 'That bag is _____. (she)',
        fillAnswer: 'hers',
        explanation: 'she的名词性物主代词是hers。',
        hint: 'she→hers',
      },
      {
        type: 'choice',
        question: '_____ classroom is bigger than _____.',
        options: ['Our; their', 'Ours; theirs', 'Our; theirs', 'Ours; their'],
        answer: 2,
        explanation: 'classroom前用形容词性our，独立使用用名词性theirs。',
        hint: '形容词性+名词 vs 名词性独立',
      },
      {
        type: 'fill',
        question: 'Is this book _____ (you)?',
        fillAnswer: 'yours',
        explanation: '独立使用名词性物主代词yours。',
        hint: 'yours',
      },
    ],
    tips: [
      '名词性物主代词 = "谁的（东西）"',
      '形容词性后面跟名词，名词性后面不跟名词',
      'his有两种用法：This is his book. / This book is his.',
      'its没有名词性物主代词的形式变化，its本身就是',
    ],
    relatedLessons: [95, 98],
    difficulty: 'medium',
    keywords: ['名词性物主代词', 'mine', 'yours', 'hers', 'theirs'],
  },

  // ==================== 第98课：名词性物主代词练习 ====================
  98: {
    title: '复习：名词性物主代词练习',
    subtitle: '通过练习巩固名词性物主代词的用法',
    explanation: '本课为第97课的复习课，通过练习巩固名词性物主代词和形容词性物主代词的区别和用法。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '形容词性 vs 名词性物主代词',
          items: [
            {
              label: '形容词性（后跟名词）',
              example: 'my book, your pen, her bag',
              explanation: '后面必须跟名词',
            },
            {
              label: '名词性（独立使用）',
              example: 'mine, yours, hers',
              explanation: '后面不跟名词，独立使用',
            },
            {
              label: '转换',
              example: 'my book = mine',
              explanation: '形容词性物主代词 + 名词 = 名词性物主代词',
            },
          ],
        },
      },
    ],
    rules: [
      '名词性物主代词可以作主语、宾语、表语',
      'This is mine.（表语）',
      'Mine is better.（主语）',
      'Give it to mine. ✗ → Give it to me. ✓（注意不要混淆）',
    ],
    examples: [
      {
        english: 'This is not my umbrella. Mine is black.',
        chinese: '这不是我的雨伞。我的是黑色的。',
        grammarPoint: 'Mine作主语',
      },
      {
        english: 'Your hands are dirty. Clean yours.',
        chinese: '你的手脏了。洗洗你的。',
        grammarPoint: 'yours作宾语',
      },
      {
        english: 'Is this seat yours?',
        chinese: '这个座位是你的吗？',
        grammarPoint: 'yours作表语',
      },
      {
        english: 'Their house is big, but ours is small.',
        chinese: '他们的房子大，但我们的小。',
        grammarPoint: 'ours作主语',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'This is not my book. _____ is on the desk.',
        options: ['My', 'Mine', 'Me', 'I'],
        answer: 1,
        explanation: '独立使用名词性物主代词Mine。',
        hint: '独立使用',
      },
      {
        type: 'fill',
        question: 'Her bike is red. What about _____ (you)?',
        fillAnswer: 'yours',
        explanation: '独立使用名词性物主代词yours。',
        hint: 'yours',
      },
      {
        type: 'choice',
        question: '_____ dog is bigger than _____.',
        options: ['Their; our', 'Theirs; ours', 'Their; ours', 'Theirs; our'],
        answer: 2,
        explanation: 'dog前用形容词性their，独立使用用名词性ours。',
        hint: '形容词性+名词',
      },
      {
        type: 'fill',
        question: 'These are not our seats. _____ (we) are over there.',
        fillAnswer: 'Ours',
        explanation: '独立使用名词性物主代词Ours。',
        hint: 'Ours',
      },
    ],
    tips: [
      '做题时看后面有没有名词：有名词→形容词性，没有→名词性',
      'his的形式不变：This is his. / This is his book.',
      '名词性物主代词可以避免重复：my book → mine',
    ],
    relatedLessons: [97, 99],
    difficulty: 'medium',
    keywords: ['名词性物主代词', '形容词性物主代词', '区别'],
  },

  // ==================== 第99课：间接引语(一) ====================
  99: {
    title: '间接引语(一)',
    subtitle: 'He says (that) he...',
    explanation:
      '间接引语是把别人说的话转述出来。当主句动词是says（一般现在时）时，从句的时态不变。引导词that可以省略。人称需要根据实际情况变化。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '直接引语 → 间接引语（says）',
          headers: ['直接引语', '间接引语', '变化'],
          rows: [
            ['He says, "I am tired."', 'He says (that) he is tired.', '人称变化：I→he'],
            [
              'She says, "I like coffee."',
              'She says (that) she likes coffee.',
              '人称变化+动词变化',
            ],
            ['They say, "We are happy."', 'They say (that) they are happy.', '人称变化：we→they'],
            ['He says, "I can swim."', 'He says (that) he can swim.', '人称变化，can不变'],
          ],
        },
      },
    ],
    rules: [
      '主句是says时，从句时态不变',
      '人称要根据说话人变化（I→he/she等）',
      'that可以省略',
      '指示词变化：this→that, these→those, here→there, now→then',
    ],
    examples: [
      {
        english: 'He says (that) he is a student.',
        chinese: '他说他是一名学生。',
        grammarPoint: 'says + 时态不变',
      },
      {
        english: 'She says (that) she likes this book.',
        chinese: '她说她喜欢这本书。',
        grammarPoint: 'says + 人称变化',
      },
      {
        english: 'Tom says (that) he is busy now.',
        chinese: '汤姆说他现在很忙。',
        grammarPoint: 'says + 时态不变',
      },
      {
        english: 'They say (that) they will come tomorrow.',
        chinese: '他们说明天会来。',
        grammarPoint: 'says + 时态不变',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He says (that) _____ a teacher.',
        options: ['I am', 'he is', 'she is', 'they are'],
        answer: 1,
        explanation: 'He says，人称从I变为he。',
        hint: '人称变化',
      },
      {
        type: 'fill',
        question: 'She says, "I like music." → She says (that) _____ _____ music.',
        fillAnswer: 'she likes',
        explanation: '人称I→she，动词like加s。',
        hint: '人称+动词变化',
      },
      {
        type: 'choice',
        question: 'They say, "We are happy." → They say (that) _____ are happy.',
        options: ['we', 'they', 'you', 'I'],
        answer: 1,
        explanation: '人称we变为they。',
        hint: 'we→they',
      },
      {
        type: 'fill',
        question: 'Tom says, "I can help." → Tom says (that) _____ _____ help.',
        fillAnswer: 'he can',
        explanation: '人称I→he，情态动词can不变。',
        hint: '人称变化',
      },
    ],
    tips: [
      'says（现在时）引出间接引语时，从句时态不变',
      '关键是正确变换人称',
      'that可以省略，但初学者建议加上',
      '注意第三人称单数时动词的变化（like→likes）',
    ],
    relatedLessons: [97, 100],
    difficulty: 'medium',
    keywords: ['间接引语', 'says', 'that', '人称变化'],
  },

  // ==================== 第100课：间接引语(一)练习 ====================
  100: {
    title: '复习：间接引语(一)练习',
    subtitle: '通过练习巩固says引导的间接引语',
    explanation: '本课为第99课的复习课，通过大量练习巩固says引导的间接引语中人称和动词的变化。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '间接引语（says）转换公式',
          formula: 'He says, "I am..." → He says (that) he is...',
          examples: [
            'She says, "I like it." → She says (that) she likes it.',
            'They say, "We know." → They say (that) they know.',
          ],
        },
      },
    ],
    rules: ['says引导时从句时态不变', '人称要跟随主句主语变化', '动词形式要配合新的人称'],
    examples: [
      {
        english: 'He says, "I want to go." → He says (that) he wants to go.',
        chinese: '他说他想去。',
        grammarPoint: 'I→he, want→wants',
      },
      {
        english: 'She says, "I don\'t like it." → She says (that) she doesn\'t like it.',
        chinese: '她说她不喜欢。',
        grammarPoint: 'I→she, 变否定',
      },
      {
        english: 'He says, "I am reading." → He says (that) he is reading.',
        chinese: '他说他在看书。',
        grammarPoint: 'I→he, am→is',
      },
      {
        english: 'Mary says, "I have finished." → Mary says (that) she has finished.',
        chinese: '玛丽说她已经完成了。',
        grammarPoint: 'I→she, have→has',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He says, "I like apples." → He says _____ _____ apples.',
        options: ['he like', 'he likes', 'I like', 'I likes'],
        answer: 1,
        explanation: 'I→he，like→likes。',
        hint: '人称+动词变化',
      },
      {
        type: 'fill',
        question: 'She says, "I am tired." → She says (that) _____ _____ tired.',
        fillAnswer: 'she is',
        explanation: 'I→she, am→is。',
        hint: 'I→she, am→is',
      },
      {
        type: 'choice',
        question: 'They say, "We have no time." → They say (that) _____ have no time.',
        options: ['we', 'they', 'you', 'I'],
        answer: 1,
        explanation: '人称we变为they。',
        hint: 'we→they',
      },
      {
        type: 'fill',
        question: 'Tom says, "I can do it." → Tom says (that) _____ _____ do it.',
        fillAnswer: 'he can',
        explanation: 'I→he，can不变。',
        hint: 'I→he',
      },
    ],
    tips: [
      '转述时注意人称一致：谁说的话，人称就要变成谁',
      'says后面从句的时态和原话保持一致',
      '注意第三人称单数主语后的动词要加s',
    ],
    relatedLessons: [99, 101],
    difficulty: 'medium',
    keywords: ['间接引语', 'says', '人称变化', '练习'],
  },

  // ==================== 第101课：间接引语(二) ====================
  101: {
    title: '间接引语(二)',
    subtitle: 'He said (that) he...',
    explanation:
      '当主句动词是said（一般过去时）时，从句的时态需要"后退一步"：一般现在时→一般过去时，现在进行时→过去进行时，一般过去时→过去完成时，can→could，will→would。人称和指示词也要相应变化。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'said引导的间接引语时态变化',
          headers: ['直接引语时态', '间接引语时态', '例句'],
          rows: [
            ['一般现在时', '一般过去时', '"I am happy." → He said he was happy.'],
            ['现在进行时', '过去进行时', '"I am reading." → He said he was reading.'],
            ['一般过去时', '过去完成时', '"I went." → He said he had gone.'],
            ['can', 'could', '"I can swim." → He said he could swim.'],
            ['will', 'would', '"I will go." → He said he would go.'],
          ],
        },
      },
    ],
    rules: [
      'said引导时，从句时态后退一步',
      '一般现在时 → 一般过去时',
      '现在进行时 → 过去进行时',
      'can → could, will → would',
      '人称、指示词、时间词也要变化（this→that, today→that day, tomorrow→the next day）',
    ],
    examples: [
      { english: 'He said (that) he was tired.', chinese: '他说他很累。', grammarPoint: 'am→was' },
      {
        english: 'She said (that) she would come.',
        chinese: '她说她会来。',
        grammarPoint: 'will→would',
      },
      {
        english: 'Tom said (that) he could help.',
        chinese: '汤姆说他能帮忙。',
        grammarPoint: 'can→could',
      },
      {
        english: 'They said (that) they were busy.',
        chinese: '他们说他们很忙。',
        grammarPoint: 'are→were',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He said, "I am happy." → He said _____ _____ happy.',
        options: ['he is', 'he was', 'I am', 'I was'],
        answer: 1,
        explanation: 'said引导，I→he, am→was。',
        hint: '人称+时态变化',
      },
      {
        type: 'fill',
        question: 'She said, "I will help." → She said (that) she _____ help.',
        fillAnswer: 'would',
        explanation: 'said引导，will→would。',
        hint: 'will→would',
      },
      {
        type: 'choice',
        question: '"I can do it," he said. → He said he _____ do it.',
        options: ['can', 'could', 'will', 'would'],
        answer: 1,
        explanation: 'said引导，can→could。',
        hint: 'can→could',
      },
      {
        type: 'fill',
        question: '"I am eating," she said. → She said (that) she _____ _____ eating.',
        fillAnswer: 'was',
        explanation: 'said引导，am eating→was eating。',
        hint: '现在进行→过去进行',
      },
    ],
    tips: [
      'says → 从句时态不变，said → 从句时态后退',
      '时态后退规则：现在→过去，过去→过去完成',
      'can→could, will→would, may→might',
      '人称和时间词也要变化',
    ],
    relatedLessons: [99, 102],
    difficulty: 'hard',
    keywords: ['间接引语', 'said', '时态后退', 'could', 'would'],
  },

  // ==================== 第102课：间接引语(二)练习 ====================
  102: {
    title: '复习：间接引语(二)练习',
    subtitle: '通过练习巩固said引导的间接引语',
    explanation:
      '本课为第101课的复习课，通过大量练习巩固said引导的间接引语中的时态变化、人称变化和指示词变化。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'says vs said 对比',
          headers: ['引导词', '从句时态', '例句'],
          rows: [
            ['says（现在时）', '不变', 'He says he is tired.'],
            ['said（过去时）', '后退一步', 'He said he was tired.'],
            ['says（现在时）', '不变', 'She says she can help.'],
            ['said（过去时）', '后退一步', 'She said she could help.'],
          ],
        },
      },
    ],
    rules: ['says → 从句时态不变', 'said → 从句时态后退一步', '人称和指示词根据情况变化'],
    examples: [
      {
        english: '"I don\'t like it," she said. → She said (that) she didn\'t like it.',
        chinese: '她说她不喜欢。',
        grammarPoint: 'said + 时态后退',
      },
      {
        english: '"We have finished," they said. → They said (that) they had finished.',
        chinese: '他们说他们已经完成了。',
        grammarPoint: 'have→had',
      },
      {
        english: '"I may come," he said. → He said (that) he might come.',
        chinese: '他说他可能会来。',
        grammarPoint: 'may→might',
      },
      {
        english: '"I am going to leave," she said. → She said (that) she was going to leave.',
        chinese: '她说她打算离开。',
        grammarPoint: 'am→was',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '"I have seen it," he said. → He said he _____ seen it.',
        options: ['has', 'had', 'have', 'was'],
        answer: 1,
        explanation: 'said引导，have→had。',
        hint: 'have→had',
      },
      {
        type: 'fill',
        question: '"I don\'t know," she said. → She said (that) she _____ know.',
        fillAnswer: "didn't",
        explanation: "said引导，don't→didn't。",
        hint: '时态后退',
      },
      {
        type: 'choice',
        question: '"We are going to travel," they said. → They said they _____ going to travel.',
        options: ['are', 'were', 'is', 'was'],
        answer: 1,
        explanation: 'said引导，are→were。',
        hint: 'are→were',
      },
      {
        type: 'fill',
        question: '"I may be late," Tom said. → Tom said (that) he _____ be late.',
        fillAnswer: 'might',
        explanation: 'said引导，may→might。',
        hint: 'may→might',
      },
    ],
    tips: [
      '时态后退是间接引语的核心规则',
      '过去完成时（had done）不再后退',
      'could, would, might, should保持不变',
      '做题先判断says还是said，再决定时态',
    ],
    relatedLessons: [101, 103],
    difficulty: 'hard',
    keywords: ['间接引语', 'said', '时态后退', '练习'],
  },

  // ==================== 第103课：too和enough的用法 ====================
  103: {
    title: 'too和enough的用法',
    subtitle: 'too hot, not cold enough',
    explanation:
      'too表示"太...（以至于不能...）"，放在形容词/副词前面，表示超出正常范围。enough表示"足够..."，放在形容词/副词后面，表示达到所需程度。注意：too在形容词前，enough在形容词后。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'too和enough的位置和用法',
          headers: ['词', '位置', '含义', '例句'],
          rows: [
            ['too', '形容词/副词前', '太...', "It's too hot."],
            ['enough', '形容词/副词后', '足够', "It's warm enough."],
            ['enough', '名词前', '足够', 'enough money / enough time'],
            ['too...to', 'too + adj + to do', '太...以至于不能', "It's too heavy to carry."],
          ],
        },
      },
    ],
    rules: [
      'too + 形容词/副词 = 太...',
      '形容词/副词 + enough = 足够',
      'enough + 名词 = 足够的...',
      'too + 形容词 + to + 动词原形 = 太...以至于不能...',
      'not + 形容词 + enough + to + 动词原形 = 不够...所以不能...',
    ],
    examples: [
      {
        english: "It's too hot to go outside.",
        chinese: '天太热了，不能出去。',
        grammarPoint: 'too...to...',
      },
      {
        english: 'He is old enough to go to school.',
        chinese: '他年龄够大，可以上学了。',
        grammarPoint: 'adj + enough to do',
      },
      {
        english: 'This box is too heavy for me to carry.',
        chinese: '这个箱子对我来说太重了，搬不动。',
        grammarPoint: 'too...for...to...',
      },
      {
        english: "She isn't tall enough to reach the shelf.",
        chinese: '她不够高，够不到架子。',
        grammarPoint: 'not + adj + enough to do',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: "It's _____ cold _____ go swimming.",
        options: ['too; to', 'enough; to', 'too; enough', 'very; to'],
        answer: 0,
        explanation: 'too + 形容词 + to + 动词原形。',
        hint: 'too...to...',
      },
      {
        type: 'fill',
        question: 'He is not old _____ to drive a car.',
        fillAnswer: 'enough',
        explanation: '形容词后用enough。',
        hint: 'adj + enough',
      },
      {
        type: 'choice',
        question: 'Do we have _____ time?',
        options: ['too', 'enough', 'very', 'much enough'],
        answer: 1,
        explanation: '名词前用enough修饰。',
        hint: 'enough + 名词',
      },
      {
        type: 'fill',
        question: 'This book is _____ easy for me. I want a harder one.',
        fillAnswer: 'too',
        explanation: '太简单了，用too。',
        hint: '太...',
      },
    ],
    tips: [
      'too在形容词前：too hot, too cold, too expensive',
      'enough在形容词后：old enough, big enough',
      '但enough在名词前：enough money, enough time',
      'too...to...和not...enough to...意思相近，可以互相转换',
    ],
    relatedLessons: [101, 104],
    difficulty: 'medium',
    keywords: ['too', 'enough', 'too...to', 'enough to'],
  },

  // ==================== 第104课：too和enough练习 ====================
  104: {
    title: '复习：too和enough练习',
    subtitle: '通过练习巩固too和enough的用法',
    explanation:
      '本课为第103课的复习课，通过大量练习巩固too和enough的位置、含义以及too...to和enough to的用法。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'too...to... vs enough to...',
          items: [
            {
              label: 'too...to...',
              example: 'He is too young to go to school.',
              explanation: '太小了不能上学',
            },
            {
              label: 'enough to...',
              example: 'He is old enough to go to school.',
              explanation: '年龄够大可以上学',
            },
            {
              label: 'not...enough to...',
              example: "He isn't old enough to go to school.",
              explanation: '年龄不够大不能上学',
            },
          ],
        },
      },
    ],
    rules: [
      'too...to... = 太...以至于不能...',
      '...enough to... = 足够...能够...',
      'not...enough to... = 不够...不能...',
      'too...to...和not...enough to...含义相同',
    ],
    examples: [
      {
        english: 'The water is too hot to drink.',
        chinese: '水太烫了，不能喝。',
        grammarPoint: 'too...to...',
      },
      {
        english: 'She is clever enough to solve the problem.',
        chinese: '她足够聪明，能解决这个问题。',
        grammarPoint: 'enough to...',
      },
      {
        english: 'He is too short to play basketball.',
        chinese: '他太矮了，不能打篮球。',
        grammarPoint: 'too...to...',
      },
      {
        english: "She isn't old enough to see that film.",
        chinese: '她不够大，不能看那部电影。',
        grammarPoint: 'not...enough to...',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He runs _____ fast _____ catch the bus.',
        options: ['too; to', 'enough; to', 'too; that', 'very; to'],
        answer: 0,
        explanation: 'too + 形容词 + to + 动词原形。',
        hint: 'too...to...',
      },
      {
        type: 'fill',
        question: 'Is the coffee cool _____ to drink?',
        fillAnswer: 'enough',
        explanation: '形容词后用enough。',
        hint: 'adj + enough',
      },
      {
        type: 'choice',
        question: 'The box is light _____ for the child _____ carry.',
        options: ['too; to', 'enough; to', 'too; enough', 'enough; too'],
        answer: 1,
        explanation: 'enough for sb to do sth。',
        hint: 'enough for...to...',
      },
      {
        type: 'fill',
        question: 'It is _____ expensive for me _____ buy.',
        fillAnswer: 'too ... to',
        explanation: 'too + adj + for sb + to do。',
        hint: 'too...for...to...',
      },
    ],
    tips: [
      'too含有否定意义（太...以至于不能）',
      'enough含有肯定意义（足够...能够）',
      'enough修饰名词时放在名词前（enough food）',
      'enough修饰形容词时放在形容词后（big enough）',
    ],
    relatedLessons: [103, 105],
    difficulty: 'medium',
    keywords: ['too', 'enough', 'too...to', 'enough to', '练习'],
  },

  // ==================== 第105课：直接引语和间接引语转换 ====================
  105: {
    title: '直接引语和间接引语转换',
    subtitle: '"I am ill." → He said (that) he was ill.',
    explanation:
      '本课综合练习直接引语和间接引语之间的转换。转换时需要注意：1. 引导词（says/said）的选择；2. 人称的变化；3. 时态的变化（said时后退）；4. 指示词、时间词、地点词的变化。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '直接引语→间接引语完整变化表',
          headers: ['变化项', '直接引语', '间接引语'],
          rows: [
            ['人称', 'I / we / you', 'he/she / they / I'],
            ['时态（said）', '一般现在时', '一般过去时'],
            ['时态（said）', '现在进行时', '过去进行时'],
            ['时态（said）', '一般过去时', '过去完成时'],
            ['指示词', 'this / these', 'that / those'],
            ['时间', 'now / today / tomorrow', 'then / that day / the next day'],
            ['地点', 'here', 'there'],
          ],
        },
      },
    ],
    rules: [
      '人称：根据说话人和转述人变化',
      '时态：said引导时后退一步，says引导时不变',
      '指示词：this→that, these→those',
      '时间词：now→then, today→that day, tomorrow→the next day',
      '地点词：here→there',
      '情态动词：can→could, will→would, may→might',
    ],
    examples: [
      {
        english: '"I am ill." → He said (that) he was ill.',
        chinese: '"我病了。" → 他说他病了。',
        grammarPoint: 'I→he, am→was',
      },
      {
        english: '"I will come tomorrow." → He said he would come the next day.',
        chinese: '"我明天来。" → 他说他第二天来。',
        grammarPoint: 'will→would, tomorrow→the next day',
      },
      {
        english: '"This is my book." → She said that was her book.',
        chinese: '"这是我的书。" → 她说那是她的书。',
        grammarPoint: 'this→that, my→her',
      },
      {
        english: '"I was here yesterday." → He said he had been there the day before.',
        chinese: '"我昨天在这里。" → 他说他前一天在那里。',
        grammarPoint: 'was→had been, here→there, yesterday→the day before',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '"I am reading," she said. → She said she _____ reading.',
        options: ['is', 'was', 'am', 'has been'],
        answer: 1,
        explanation: 'said引导，am→was。',
        hint: 'am→was',
      },
      {
        type: 'fill',
        question: '"I have finished," he said. → He said he _____ finished.',
        fillAnswer: 'had',
        explanation: 'said引导，have→had。',
        hint: 'have→had',
      },
      {
        type: 'choice',
        question: '"I like this," she said. → She said she liked _____.',
        options: ['this', 'that', 'these', 'it that'],
        answer: 1,
        explanation: 'said引导，this→that。',
        hint: 'this→that',
      },
      {
        type: 'fill',
        question: '"I will go tomorrow," he said. → He said he _____ go _____ _____.',
        fillAnswer: 'would ... the next day',
        explanation: 'said引导，will→would，tomorrow→the next day。',
        hint: 'will→would, tomorrow→the next day',
      },
    ],
    tips: [
      '先判断says还是said → 决定是否需要时态变化',
      '再变换人称 → 根据实际转述关系',
      '最后变换指示词、时间词、地点词',
      '记住时间词变化：yesterday→the day before, tomorrow→the next day',
    ],
    relatedLessons: [103, 106],
    difficulty: 'hard',
    keywords: ['直接引语', '间接引语', '转换', '时态变化', '人称变化'],
  },

  // ==================== 第106课：直接引语和间接引语转换练习 ====================
  106: {
    title: '复习：直接引语和间接引语转换练习',
    subtitle: '综合练习引语转换',
    explanation:
      '本课为第105课的复习课，通过综合练习巩固直接引语和间接引语之间的互相转换，涵盖各种时态和句型。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '引语转换要点对比',
          items: [
            {
              label: 'says引导',
              example: 'He says, "I am happy."',
              explanation: '从句时态不变 → He says he is happy.',
            },
            {
              label: 'said引导',
              example: 'He said, "I am happy."',
              explanation: '从句时态后退 → He said he was happy.',
            },
            {
              label: '人称变化',
              example: '"I like it."',
              explanation: '根据说话人变化：He said he liked it.',
            },
            {
              label: '时间变化',
              example: '"I\'ll go tomorrow."',
              explanation: 'He said he would go the next day.',
            },
          ],
        },
      },
    ],
    rules: [
      'says → 时态不变，said → 时态后退',
      '人称根据实际转述关系变化',
      '时间、地点、指示词也要变化',
    ],
    examples: [
      {
        english: '"I can\'t come today," she said. → She said she couldn\'t come that day.',
        chinese: '"我今天不能来。" → 她说她那天不能来。',
        grammarPoint: "can't→couldn't, today→that day",
      },
      {
        english: '"I was born here," he said. → He said he had been born there.',
        chinese: '"我出生在这里。" → 他说他出生在那里。',
        grammarPoint: 'was→had been, here→there',
      },
      {
        english: '"These are mine," she said. → She said those were hers.',
        chinese: '"这些是我的。" → 她说那些是她的。',
        grammarPoint: 'these→those, mine→hers',
      },
      {
        english: '"I may help," he says. → He says he may help.',
        chinese: '"我也许会帮忙。" → 他说他也许会帮忙。',
        grammarPoint: 'says + 时态不变',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '"I don\'t like this," she said. → She said she _____ like _____.',
        options: ["don't; this", "didn't; this", "doesn't; that", "didn't; that"],
        answer: 3,
        explanation: "said引导，don't→didn't, this→that。",
        hint: '时态后退+指示词变化',
      },
      {
        type: 'fill',
        question: '"We are going now," they said. → They said they _____ going _____.',
        fillAnswer: 'were ... then',
        explanation: 'said引导，are→were, now→then。',
        hint: 'are→were, now→then',
      },
      {
        type: 'choice',
        question: 'He says, "I have seen it." → He says he _____ seen it.',
        options: ['has', 'had', 'have', 'was'],
        answer: 0,
        explanation: 'says引导，时态不变，用has。',
        hint: 'says时态不变',
      },
      {
        type: 'fill',
        question: '"I was here yesterday," she said. → She said she _____ been there _____.',
        fillAnswer: 'had ... the day before',
        explanation: 'said引导，was→had been, here→there, yesterday→the day before。',
        hint: 'was→had been',
      },
    ],
    tips: [
      '先判断says/said，确定是否需要时态变化',
      '注意this/that, here/there, now/then的变化',
      '过去完成时（had done）不再继续后退',
      '做题时逐步检查：人称→时态→指示词→时间词→地点词',
    ],
    relatedLessons: [105, 107],
    difficulty: 'hard',
    keywords: ['直接引语', '间接引语', '转换', '综合练习'],
  },

  // ==================== 第107课：would的用法 ====================
  107: {
    title: 'would的用法',
    subtitle: "Would you like...? I'd like...",
    explanation:
      'would是will的过去式，但在日常用语中有多种特殊用法。Would you like...?用于礼貌地询问"你想要...吗？" I\'d like = I would like表示"我想要"。would还可以表示过去常常做某事。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'would的常见用法',
          headers: ['用法', '结构', '含义', '例句'],
          rows: [
            [
              '礼貌询问',
              'Would you like + 名词/to do?',
              '你想要...吗？',
              'Would you like some tea?',
            ],
            ['表达意愿', "I'd/He'd like + 名词/to do", '我想...', "I'd like a cup of coffee."],
            ['过去常常', '主语 + would + 动词原形', '过去常常', 'He would walk to school.'],
            ['虚拟语气', 'If + 主语 + would...', '如果...愿意...', 'If you would help me...'],
          ],
        },
      },
    ],
    rules: [
      'Would you like...? = 你想要...吗？（比Do you want...?更礼貌）',
      "I'd like = I would like = 我想要",
      "He'd like = He would like = 他想要",
      'would like + 名词 = 想要某物',
      'would like + to do = 想要做某事',
    ],
    examples: [
      {
        english: 'Would you like some coffee?',
        chinese: '你想要一些咖啡吗？',
        grammarPoint: 'Would you like...?',
      },
      {
        english: "I'd like to have a glass of water.",
        chinese: '我想要一杯水。',
        grammarPoint: "I'd like to do",
      },
      {
        english: "She'd like to go shopping.",
        chinese: '她想去购物。',
        grammarPoint: "She'd like to do",
      },
      {
        english: 'Would you like to sit down?',
        chinese: '你想坐下吗？',
        grammarPoint: 'Would you like to do?',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ you like some tea?',
        options: ['Do', 'Would', 'Will', 'Are'],
        answer: 1,
        explanation: 'Would you like...? 礼貌询问。',
        hint: '礼貌询问',
      },
      {
        type: 'fill',
        question: "I'd _____ (like) to order a pizza.",
        fillAnswer: 'like',
        explanation: "I'd like = I would like。",
        hint: "I'd like",
      },
      {
        type: 'choice',
        question: "She'd like _____ (go) to the cinema.",
        options: ['go', 'to go', 'going', 'goes'],
        answer: 1,
        explanation: 'would like + to + 动词原形。',
        hint: 'would like to do',
      },
      {
        type: 'fill',
        question: '_____ he like some water?',
        fillAnswer: 'Would',
        explanation: 'Would he like...? 礼貌询问他想要什么。',
        hint: 'Would + 主语',
      },
    ],
    tips: [
      'Would you like...? 比Do you want...?更礼貌',
      "I'd like = I would like（不要写成I'd liking）",
      'would like后面可以跟名词（would like tea）或不定式（would like to drink）',
      '回答Would you like...?用 Yes, please. / No, thank you.',
    ],
    relatedLessons: [105, 108],
    difficulty: 'easy',
    keywords: ['would', "I'd like", 'Would you like', '想要', '礼貌'],
  },

  // ==================== 第108课：would的用法练习 ====================
  108: {
    title: '复习：would的用法练习',
    subtitle: '通过练习巩固would的用法',
    explanation:
      "本课为第107课的复习课，通过练习巩固would like的各种用法，包括Would you like...?和I'd like...的用法。",
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'Would you like...? vs Do you want...?',
          items: [
            {
              label: 'Would you like...?',
              example: 'Would you like some coffee?',
              explanation: '更礼貌、更正式的询问',
            },
            {
              label: 'Do you want...?',
              example: 'Do you want some coffee?',
              explanation: '较直接、较随意的询问',
            },
            {
              label: "I'd like...",
              example: "I'd like a hamburger.",
              explanation: '礼貌地表达想要',
            },
            { label: 'I want...', example: 'I want a hamburger.', explanation: '直接地表达想要' },
          ],
        },
      },
    ],
    rules: [
      'Would you like = 你想要（礼貌）',
      "I'd like = I would like = 我想要（礼貌）",
      '回答：Yes, please. / No, thank you.',
      'would like + to do = 想要做某事',
    ],
    examples: [
      {
        english: 'Would you like to come to my party?',
        chinese: '你想来参加我的聚会吗？',
        grammarPoint: 'Would you like to do?',
      },
      {
        english: "I'd like to book a room.",
        chinese: '我想预订一个房间。',
        grammarPoint: "I'd like to do",
      },
      {
        english: 'Would he like something to eat?',
        chinese: '他想要吃点什么吗？',
        grammarPoint: 'Would he like...?',
      },
      {
        english: "We'd like to see the menu.",
        chinese: '我们想看看菜单。',
        grammarPoint: "We'd like to do",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ you like to have dinner with us?',
        options: ['Do', 'Would', 'Are', 'Will'],
        answer: 1,
        explanation: 'Would you like to...? 礼貌邀请。',
        hint: '礼貌邀请',
      },
      {
        type: 'fill',
        question: "I'd like _____ (have) some water.",
        fillAnswer: 'to have',
        explanation: 'would like + to + 动词原形have。',
        hint: 'would like to do',
      },
      {
        type: 'choice',
        question: 'Yes, _____.',
        options: ['I would', 'I like', 'please', "I'd like"],
        answer: 2,
        explanation: '回答Would you like...?用Yes, please.。',
        hint: 'Yes, please',
      },
      {
        type: 'fill',
        question: '_____ they like some coffee?',
        fillAnswer: 'Would',
        explanation: 'Would they like...? 询问他们想要什么。',
        hint: 'Would + 主语',
      },
    ],
    tips: [
      'Would you like后面可以跟名词或不定式',
      'Would you like some tea?（名词）',
      'Would you like to drink some tea?（不定式）',
      '不要混淆would like和like：would like = 想要，like = 喜欢',
    ],
    relatedLessons: [107, 97],
    difficulty: 'easy',
    keywords: ['would', 'Would you like', "I'd like", '练习'],
  },

  // ==================== 第109课：形容词比较级(一) ====================
  109: {
    title: '形容词比较级(一)',
    subtitle: 'bigger, cheaper, more expensive',
    explanation:
      '形容词比较级用于两者之间的比较。单音节形容词通常在词尾加-er，多音节形容词在前面加more。比较级常与than搭配使用，表示"比……更……"。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '形容词比较级的构成规则',
          headers: ['规则', '原级', '比较级', '例句'],
          rows: [
            ['一般单音节加-er', 'tall', 'taller', 'He is taller than me.'],
            ['以e结尾加-r', 'large', 'larger', 'This room is larger.'],
            ['重读闭音节双写末字母加-er', 'big', 'bigger', 'This box is bigger.'],
            ['辅音+y结尾，变y为i加-er', 'easy', 'easier', 'This lesson is easier.'],
            ['多音节前加more', 'expensive', 'more expensive', 'This car is more expensive.'],
          ],
        },
      },
    ],
    rules: [
      '单音节形容词加-er构成比较级',
      '以e结尾的形容词只加-r',
      '重读闭音节结尾的形容词双写末字母再加-er',
      '辅音字母+y结尾的形容词，变y为i再加-er',
      '多音节形容词在前面加more',
      '比较级后常接than表示比较对象',
    ],
    examples: [
      {
        english: 'This book is bigger than that one.',
        chinese: '这本书比那本大。',
        grammarPoint: 'big → bigger',
      },
      {
        english: 'This shirt is cheaper than that one.',
        chinese: '这件衬衫比那件便宜。',
        grammarPoint: 'cheap → cheaper',
      },
      {
        english: 'This car is more expensive than that one.',
        chinese: '这辆车比那辆贵。',
        grammarPoint: 'expensive → more expensive',
      },
      {
        english: 'She is taller than her sister.',
        chinese: '她比她姐姐高。',
        grammarPoint: 'tall → taller',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'This box is _____ than that one.',
        options: ['big', 'bigger', 'biggest', 'more big'],
        answer: 1,
        explanation: 'big是重读闭音节，双写g加-er，变为bigger。',
        hint: '重读闭音节双写',
      },
      {
        type: 'choice',
        question: 'This car is _____ expensive than that one.',
        options: ['much', 'more', 'most', 'very'],
        answer: 1,
        explanation: 'expensive是多音节形容词，比较级用more。',
        hint: '多音节用more',
      },
      {
        type: 'fill',
        question: 'She is _____ (tall) than her sister.',
        fillAnswer: 'taller',
        explanation: 'tall是单音节形容词，比较级加-er。',
        hint: '单音节加-er',
      },
      {
        type: 'fill',
        question: 'This question is _____ (easy) than that one.',
        fillAnswer: 'easier',
        explanation: 'easy以辅音+y结尾，变y为i加-er。',
        hint: '变y为i',
      },
    ],
    tips: [
      '记住口诀：比较级有变化，一般词尾加-er；词尾若有哑音e，直接加-r就可以',
      '重读闭音节要双写末字母：big→bigger, hot→hotter, thin→thinner',
      '多音节形容词和部分双音节形容词用more：more beautiful, more careful',
      '比较级前可以用much, a lot, a little, even等修饰',
    ],
    relatedLessons: [110, 111],
    difficulty: 'medium',
    keywords: ['比较级', 'than', '-er', 'more'],
  },

  // ==================== 第110课：形容词比较级(一)练习 ====================
  110: {
    title: '复习：形容词比较级(一)练习',
    subtitle: '比较级的综合练习',
    explanation:
      '通过练习巩固形容词比较级的构成规则和用法，包括单音节词加-er、双写末字母、变y为i、多音节词加more等。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '比较级基本句型',
          formula: 'A + be动词 + 形容词比较级 + than + B',
          examples: ['He is taller than me.', 'This book is more interesting than that one.'],
        },
      },
    ],
    rules: [
      '单音节加-er：tall→taller, short→shorter',
      '以e结尾加-r：nice→nicer, large→larger',
      '重读闭音节双写：big→bigger, hot→hotter',
      '辅音+y变i加-er：easy→easier, happy→happier',
      '多音节加more：beautiful→more beautiful',
    ],
    examples: [
      {
        english: 'My room is bigger than yours.',
        chinese: '我的房间比你的大。',
        grammarPoint: 'big→bigger',
      },
      {
        english: 'Winter is colder than autumn.',
        chinese: '冬天比秋天冷。',
        grammarPoint: 'cold→colder',
      },
      {
        english: 'This film is more interesting than that one.',
        chinese: '这部电影比那部更有趣。',
        grammarPoint: 'more interesting',
      },
      {
        english: 'She is happier than before.',
        chinese: '她比以前更快乐。',
        grammarPoint: 'happy→happier',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'This cake is _____ (sweet) than that one.',
        options: ['sweet', 'sweeter', 'sweetest', 'more sweet'],
        answer: 1,
        explanation: 'sweet是单音节形容词，比较级加-er。',
        hint: '单音节加-er',
      },
      {
        type: 'choice',
        question: 'The weather today is _____ (bad) than yesterday.',
        options: ['bad', 'badder', 'worse', 'more bad'],
        answer: 2,
        explanation: 'bad的比较级是不规则变化worse。',
        hint: '不规则变化',
      },
      {
        type: 'fill',
        question: 'This problem is _____ (difficult) than that one.',
        fillAnswer: 'more difficult',
        explanation: 'difficult是多音节形容词，比较级用more。',
        hint: '多音节用more',
      },
      {
        type: 'fill',
        question: 'He is _____ (old) than his brother.',
        fillAnswer: 'older',
        explanation: 'old是单音节形容词，比较级加-er。',
        hint: '单音节加-er',
      },
      {
        type: 'choice',
        question: 'My bag is _____ (heavy) than yours.',
        options: ['heavy', 'heavier', 'heaviest', 'more heavy'],
        answer: 1,
        explanation: 'heavy以辅音+y结尾，变y为i加-er。',
        hint: '变y为i',
      },
    ],
    tips: [
      '不规则比较级需要特殊记忆：good→better, bad→worse, many/much→more, little→less, far→farther/further',
      '比较级前可以用much, a little, even, far等副词加强程度',
      '注意区分-er和more的使用场景',
    ],
    relatedLessons: [109, 111],
    difficulty: 'medium',
    keywords: ['比较级', '练习', 'than'],
  },

  // ==================== 第111课：形容词最高级(一) ====================
  111: {
    title: '形容词最高级(一)',
    subtitle: 'the biggest, the cheapest, the most expensive',
    explanation:
      '形容词最高级用于三者或三者以上的比较，表示"最……"。单音节形容词在词尾加-est，多音节形容词在前面加most。最高级前通常要加the。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '形容词最高级的构成规则',
          headers: ['规则', '原级', '最高级', '例句'],
          rows: [
            ['一般单音节加-est', 'tall', 'the tallest', 'He is the tallest.'],
            ['以e结尾加-st', 'large', 'the largest', 'This is the largest room.'],
            ['重读闭音节双写加-est', 'big', 'the biggest', 'This is the biggest box.'],
            ['辅音+y变i加-est', 'easy', 'the easiest', 'This is the easiest lesson.'],
            ['多音节加most', 'expensive', 'the most expensive', 'This is the most expensive car.'],
          ],
        },
      },
    ],
    rules: [
      '单音节形容词加-est构成最高级',
      '以e结尾的形容词只加-st',
      '重读闭音节双写末字母再加-est',
      '辅音字母+y结尾变y为i再加-est',
      '多音节形容词加most',
      '最高级前必须加the',
      '最高级常与in/of短语搭配使用',
    ],
    examples: [
      {
        english: 'Tom is the tallest in the class.',
        chinese: '汤姆是班上最高的。',
        grammarPoint: 'the tallest',
      },
      {
        english: 'This is the cheapest hotel in the city.',
        chinese: '这是城里最便宜的酒店。',
        grammarPoint: 'the cheapest',
      },
      {
        english: 'That is the most expensive car in the shop.',
        chinese: '那是商店里最贵的车。',
        grammarPoint: 'the most expensive',
      },
      {
        english: 'She is the best student of all.',
        chinese: '她是所有学生中最好的。',
        grammarPoint: 'the best（不规则）',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He is _____ boy in the class.',
        options: ['tall', 'taller', 'the tallest', 'tallest'],
        answer: 2,
        explanation: '最高级前要加the，in the class表示范围。',
        hint: '最高级前加the',
      },
      {
        type: 'choice',
        question: 'This is _____ building in the city.',
        options: ['the high', 'the higher', 'the highest', 'the most high'],
        answer: 2,
        explanation: 'high是单音节，最高级加-est，前加the。',
        hint: '单音节加-est',
      },
      {
        type: 'fill',
        question: 'This is _____ (beautiful) flower in the garden.',
        fillAnswer: 'the most beautiful',
        explanation: 'beautiful是多音节，最高级用the most。',
        hint: '多音节用most',
      },
      {
        type: 'fill',
        question: 'She is _____ (old) of the three sisters.',
        fillAnswer: 'the oldest',
        explanation: 'old是单音节，最高级加-est。',
        hint: '单音节加-est',
      },
    ],
    tips: [
      '最高级前一定不要忘记加the',
      'in + 地点/范围，of + 同类比较对象',
      '不规则最高级：good→the best, bad→the worst, many/much→the most, little→the least',
      'one of the + 最高级 + 复数名词：He is one of the tallest boys.',
    ],
    relatedLessons: [109, 112],
    difficulty: 'medium',
    keywords: ['最高级', 'the', '-est', 'most'],
  },

  // ==================== 第112课：形容词最高级(一)练习 ====================
  112: {
    title: '复习：形容词最高级(一)练习',
    subtitle: '最高级的综合练习',
    explanation: '通过练习巩固形容词最高级的构成规则和用法，包括the + 最高级 + in/of结构。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '最高级基本句型',
          formula: '主语 + be动词 + the + 形容词最高级 + in/of...',
          examples: ['He is the tallest in the class.', 'She is the best of all.'],
        },
      },
    ],
    rules: [
      '单音节加-est：tall→the tallest',
      '以e结尾加-st：nice→the nicest',
      '重读闭音节双写：big→the biggest',
      '辅音+y变i加-est：happy→the happiest',
      '多音节加most：beautiful→the most beautiful',
    ],
    examples: [
      {
        english: 'The Nile is the longest river in the world.',
        chinese: '尼罗河是世界上最长的河流。',
        grammarPoint: 'the longest',
      },
      {
        english: 'This is the best meal I have ever had.',
        chinese: '这是我吃过的最好的一餐。',
        grammarPoint: 'the best',
      },
      {
        english: 'She is the most intelligent student in our school.',
        chinese: '她是我们学校最聪明的学生。',
        grammarPoint: 'the most intelligent',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Summer is _____ (hot) season of the year.',
        options: ['hot', 'hotter', 'the hottest', 'the most hot'],
        answer: 2,
        explanation: 'hot是重读闭音节，最高级双写t加-est，前加the。',
        hint: '重读闭音节双写',
      },
      {
        type: 'choice',
        question: 'English is one of _____ (important) subjects.',
        options: ['important', 'more important', 'the most important', 'importanter'],
        answer: 2,
        explanation: 'important是多音节，最高级用the most。',
        hint: 'one of the + 最高级',
      },
      {
        type: 'fill',
        question: 'He is _____ (good) player on the team.',
        fillAnswer: 'the best',
        explanation: 'good的最高级是不规则变化the best。',
        hint: '不规则变化',
      },
      {
        type: 'fill',
        question: 'This is _____ (easy) question in the exam.',
        fillAnswer: 'the easiest',
        explanation: 'easy以辅音+y结尾，变y为i加-est。',
        hint: '变y为i',
      },
      {
        type: 'choice',
        question: 'It was _____ (bad) day of my life.',
        options: ['bad', 'worse', 'the worst', 'the baddest'],
        answer: 2,
        explanation: 'bad的最高级是不规则变化the worst。',
        hint: '不规则变化',
      },
    ],
    tips: [
      'one of the + 最高级 + 复数名词 是常见考点',
      '最高级可用于"第几最……"：the second largest city',
      'in后面接地点/集体，of后面接同类事物',
    ],
    relatedLessons: [111, 113],
    difficulty: 'medium',
    keywords: ['最高级', 'the', 'in', 'of', 'one of'],
  },

  // ==================== 第113课：some/any/no/none的用法 ====================
  113: {
    title: 'some/any/no/none的用法',
    subtitle: "I have some. I don't have any. None!",
    explanation:
      'some通常用于肯定句，any用于否定句和疑问句，no用于否定句中修饰名词，none单独使用表示"没有一个"。这四个词在英语中使用频率极高，掌握它们的用法非常重要。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'some/any/no/none对比',
          items: [
            {
              label: 'some（一些）',
              example: 'I have some apples.',
              explanation: '用于肯定句，表示"有一些"',
            },
            {
              label: 'any（任何）',
              example: "I don't have any apples.",
              explanation: '用于否定句和疑问句',
            },
            {
              label: 'no（没有）',
              example: 'I have no apples.',
              explanation: '用于肯定句型中表示否定含义',
            },
            { label: 'none（没有一个）', example: 'None!', explanation: '单独使用，不修饰名词' },
          ],
        },
      },
    ],
    rules: [
      'some用于肯定句，表示"一些"',
      'any用于否定句（not...any）和疑问句',
      'no = not any，用于肯定句型表达否定含义',
      'none单独使用，后面不接名词，表示"一个也没有"',
      'some在表示请求或建议的疑问句中也可使用',
    ],
    examples: [
      { english: 'I have some money.', chinese: '我有一些钱。', grammarPoint: 'some用于肯定句' },
      { english: "I don't have any money.", chinese: '我没有钱。', grammarPoint: 'any用于否定句' },
      { english: 'Do you have any money?', chinese: '你有钱吗？', grammarPoint: 'any用于疑问句' },
      { english: 'I have no money.', chinese: '我没有钱。', grammarPoint: 'no = not any' },
      { english: 'None!', chinese: '一个也没有！', grammarPoint: 'none单独使用' },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'I have _____ friends in this city.',
        options: ['some', 'any', 'no', 'none'],
        answer: 0,
        explanation: '肯定句中表示"有一些"用some。',
        hint: '肯定句',
      },
      {
        type: 'choice',
        question: "I don't have _____ brothers.",
        options: ['some', 'any', 'no', 'none'],
        answer: 1,
        explanation: '否定句中用any。',
        hint: '否定句',
      },
      {
        type: 'choice',
        question: 'There are _____ students in the classroom.',
        options: ['some', 'any', 'no', 'none'],
        answer: 2,
        explanation: 'no修饰名词students，表示"没有学生"。',
        hint: 'no + 名词',
      },
      {
        type: 'fill',
        question: 'How many apples are left? _____.',
        fillAnswer: 'None',
        explanation: 'none单独使用，表示"一个也没有"。',
        hint: '单独回答',
      },
    ],
    tips: [
      'some在疑问句中也可以用：Would you like some tea?（表示请求）',
      'any在肯定句中表示"任何一个"：You can take any book.',
      'none后面不接名词，no后面必须接名词',
      "no = not any：I have no money. = I don't have any money.",
    ],
    relatedLessons: [114, 115],
    difficulty: 'medium',
    keywords: ['some', 'any', 'no', 'none'],
  },

  // ==================== 第114课：some/any/no/none练习 ====================
  114: {
    title: '复习：some/any/no/none练习',
    subtitle: 'some/any/no/none综合练习',
    explanation:
      '通过各种句型练习some/any/no/none的正确使用，掌握它们在肯定句、否定句、疑问句中的用法。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'some/any/no/none用法总结',
          headers: ['句型', '使用词', '例句'],
          rows: [
            ['肯定句', 'some', 'I have some books.'],
            ['否定句', 'any（not...any）', "I don't have any books."],
            ['疑问句', 'any', 'Do you have any books?'],
            ['否定句型', 'no (= not any)', 'I have no books.'],
            ['独立使用', 'none', 'How many? None.'],
          ],
        },
      },
    ],
    rules: [
      '肯定句用some',
      '否定句和疑问句用any',
      'no = not any，可替换使用',
      'none单独使用，不修饰名词',
    ],
    examples: [
      {
        english: 'Would you like some coffee?',
        chinese: '你想来点咖啡吗？',
        grammarPoint: 'some用于请求的疑问句',
      },
      {
        english: "I don't have any free time.",
        chinese: '我没有空闲时间。',
        grammarPoint: 'not...any',
      },
      {
        english: 'There is no milk in the fridge.',
        chinese: '冰箱里没有牛奶了。',
        grammarPoint: 'no + 名词',
      },
      {
        english: 'How many students passed? None.',
        chinese: '多少学生通过了？一个也没有。',
        grammarPoint: 'none独立使用',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Would you like _____ water?',
        options: ['some', 'any', 'no', 'none'],
        answer: 0,
        explanation: '表示请求的疑问句中用some。',
        hint: '请求句用some',
      },
      {
        type: 'choice',
        question: 'I have _____ idea about it.',
        options: ['some', 'any', 'no', 'none'],
        answer: 2,
        explanation: 'no修饰名词idea，表示"没有想法"。',
        hint: 'no + 名词',
      },
      {
        type: 'fill',
        question: 'Do you have _____ questions?',
        fillAnswer: 'any',
        explanation: '疑问句中用any。',
        hint: '疑问句',
      },
      {
        type: 'fill',
        question: 'How much money do you have? _____.',
        fillAnswer: 'None',
        explanation: 'none独立使用，表示"一点也没有"。',
        hint: '独立回答',
      },
    ],
    tips: [
      'Would you like...? / Could you...? 等礼貌请求中用some',
      'any在肯定句中表示"任何一个"：Any student can answer this question.',
      '注意区分no（修饰名词）和none（独立使用）',
    ],
    relatedLessons: [113, 115],
    difficulty: 'medium',
    keywords: ['some', 'any', 'no', 'none', '练习'],
  },

  // ==================== 第115课：不定代词 ====================
  115: {
    title: '不定代词',
    subtitle: 'everybody, somebody, anybody, nobody',
    explanation:
      '不定代词是指不明确指代某个特定人或事物的代词。由some-、any-、no-、every-与-body、-thing、-one组合而成。some-系列通常用于肯定句，any-系列用于否定句和疑问句，no-系列本身含有否定意义。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '不定代词分类',
          headers: ['', '人（-body/-one）', '物（-thing）', '地点（-where）'],
          rows: [
            ['some-', 'somebody/someone', 'something', 'somewhere'],
            ['any-', 'anybody/anyone', 'anything', 'anywhere'],
            ['no-', 'nobody/noone', 'nothing', 'nowhere'],
            ['every-', 'everybody/everyone', 'everything', 'everywhere'],
          ],
        },
      },
    ],
    rules: [
      'some-系列（somebody, something等）用于肯定句',
      'any-系列（anybody, anything等）用于否定句和疑问句',
      'no-系列（nobody, nothing等）本身含否定意义，句中不再用not',
      'every-系列（everybody, everything等）用于肯定句，表示"每一个"',
      '不定代词作主语时，谓语动词用单数形式',
      '形容词修饰不定代词要后置：something important',
    ],
    examples: [
      {
        english: 'Everybody is here.',
        chinese: '每个人都在这里。',
        grammarPoint: 'everybody + 单数动词',
      },
      {
        english: 'Somebody is knocking at the door.',
        chinese: '有人在敲门。',
        grammarPoint: 'somebody用于肯定句',
      },
      {
        english: 'Is there anything wrong?',
        chinese: '有什么问题吗？',
        grammarPoint: 'anything用于疑问句',
      },
      {
        english: 'Nobody knows the answer.',
        chinese: '没有人知道答案。',
        grammarPoint: 'nobody本身含否定',
      },
      {
        english: 'I have something important to tell you.',
        chinese: '我有重要的事要告诉你。',
        grammarPoint: '形容词后置',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ is waiting for you outside.',
        options: ['Somebody', 'Anybody', 'Nobody', 'Everybody'],
        answer: 0,
        explanation: '肯定句中表示"某人"用somebody。',
        hint: '肯定句',
      },
      {
        type: 'choice',
        question: "I don't know _____ in this city.",
        options: ['somebody', 'anybody', 'everybody', 'nobody'],
        answer: 1,
        explanation: '否定句中用anybody。',
        hint: '否定句',
      },
      {
        type: 'choice',
        question: '_____ likes ice cream.',
        options: ['Somebody', 'Anybody', 'Nobody', 'Everybody'],
        answer: 3,
        explanation: '表示"每个人"用everybody。',
        hint: '每个人',
      },
      {
        type: 'fill',
        question: 'There is _____ wrong with the computer.',
        fillAnswer: 'something',
        explanation: '肯定句中表示"某物"用something。',
        hint: '某物有问题',
      },
      {
        type: 'fill',
        question: '_____ knows the answer. (没有人)',
        fillAnswer: 'Nobody',
        explanation: 'nobody表示"没有人"，本身含否定。',
        hint: '没有人',
      },
    ],
    tips: [
      'everybody/everyone虽表示复数概念，但谓语动词用单数：Everyone is here.',
      'nobody/nothing本身含否定，句中不能再加not',
      'something的形容词要后置：something interesting（有趣的事情）',
      'anybody在肯定句中表示"任何人"：Anybody can do it.',
    ],
    relatedLessons: [113, 116],
    difficulty: 'medium',
    keywords: ['不定代词', 'somebody', 'nobody', 'everybody', 'nothing'],
  },

  // ==================== 第116课：不定代词练习 ====================
  116: {
    title: '复习：不定代词练习',
    subtitle: '不定代词综合练习',
    explanation:
      '通过各种句型练习不定代词的正确使用，注意some-、any-、no-、every-系列在不同句型中的选择。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '不定代词选择规则',
          formula: '肯定句 → some-/every-；否定句/疑问句 → any-；否定含义 → no-',
          examples: [
            'I saw somebody.（肯定）',
            "I didn't see anybody.（否定）",
            'I saw nobody.（否定含义）',
          ],
        },
      },
    ],
    rules: [
      '肯定句用some-系列或every-系列',
      '否定句用any-系列（配合not）',
      'no-系列本身含否定',
      '不定代词后接单数动词',
      '形容词修饰不定代词要后置',
    ],
    examples: [
      {
        english: 'Did you see anybody?',
        chinese: '你看到什么人了吗？',
        grammarPoint: 'anybody用于疑问句',
      },
      {
        english: "I didn't hear anything.",
        chinese: '我什么也没听到。',
        grammarPoint: 'not...anything',
      },
      { english: 'Nothing happened.', chinese: '什么也没发生。', grammarPoint: 'nothing含否定' },
      {
        english: 'Everything is ready.',
        chinese: '一切都准备好了。',
        grammarPoint: 'everything单数动词',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: "I didn't eat _____ this morning.",
        options: ['something', 'anything', 'everything', 'nothing'],
        answer: 1,
        explanation: '否定句中用anything。',
        hint: '否定句用any-',
      },
      {
        type: 'choice',
        question: '_____ is possible if you work hard.',
        options: ['Something', 'Anything', 'Everything', 'Nothing'],
        answer: 1,
        explanation: '肯定句中any-表示"任何"，"任何事情都是可能的"。',
        hint: '任何事',
      },
      {
        type: 'fill',
        question: '_____ in the class passed the exam. (每个人)',
        fillAnswer: 'Everybody',
        explanation: 'everybody表示"每个人"。',
        hint: '每个人',
      },
      {
        type: 'fill',
        question: 'I looked for my key everywhere, but I found _____. (什么也没有)',
        fillAnswer: 'nothing',
        explanation: 'nothing表示"什么也没有"。',
        hint: '什么也没有',
      },
      {
        type: 'choice',
        question: 'There is _____ interesting on TV tonight.',
        options: ['something', 'anything', 'nothing', 'everything'],
        answer: 2,
        explanation: 'nothing表示"没有什么有趣的"，含否定意义。',
        hint: '没什么',
      },
    ],
    tips: [
      'everybody和everyone意思相同，可互换使用',
      "注意：I didn't see nothing. 是双重否定，正确说法是 I didn't see anything. 或 I saw nothing.",
      'anything在肯定句中表示"任何事物"：Anything is possible.',
    ],
    relatedLessons: [115, 117],
    difficulty: 'medium',
    keywords: ['不定代词', 'somebody', 'anybody', 'nothing', 'everything'],
  },

  // ==================== 第117课：when和while引导的时间状语从句 ====================
  117: {
    title: 'when和while引导的时间状语从句',
    subtitle: 'When I was cooking, the phone rang.',
    explanation:
      'when和while都可以引导时间状语从句，表示"当……的时候"。when引导的从句可以用一般过去时，表示一个时间点；while引导的从句通常用进行时，表示一段时间。主句和从句的动作可能同时发生，也可能先后发生。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'when与while的区别',
          items: [
            {
              label: 'when（当……时）',
              example: 'When I arrived, he left.',
              explanation: '从句动作可以是短暂的或持续的，常用一般过去时',
            },
            {
              label: 'while（在……期间）',
              example: 'While I was reading, he was sleeping.',
              explanation: '从句动作是持续的，常用进行时',
            },
          ],
        },
      },
    ],
    rules: [
      'when引导时间状语从句，从句可用一般过去时或过去进行时',
      'while引导时间状语从句，从句常用进行时（表示持续动作）',
      'when强调"在某个时间点"，while强调"在某段时间内"',
      '主句和从句可以都用进行时表示两个同时进行的动作',
      'when从句可以在主句前，也可以在主句后',
    ],
    examples: [
      {
        english: 'When I was cooking, the phone rang.',
        chinese: '当我正在做饭时，电话响了。',
        grammarPoint: 'when + 过去进行时，主句一般过去时',
      },
      {
        english: 'While I was reading, my sister was watching TV.',
        chinese: '当我在看书时，我妹妹在看电视。',
        grammarPoint: 'while + 过去进行时',
      },
      {
        english: 'When he arrived, we were having dinner.',
        chinese: '当他到达时，我们正在吃晚饭。',
        grammarPoint: 'when + 一般过去时',
      },
      {
        english: 'While she was waiting for the bus, she met an old friend.',
        chinese: '她在等公交车时，遇到了一位老朋友。',
        grammarPoint: 'while + 过去进行时',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ I was sleeping, the doorbell rang.',
        options: ['When', 'While', 'Before', 'After'],
        answer: 1,
        explanation: '主句和从句同时发生，从句用进行时，用while。',
        hint: '同时发生用while',
      },
      {
        type: 'choice',
        question: '_____ he came in, I was reading.',
        options: ['When', 'While', 'During', 'As'],
        answer: 0,
        explanation: 'came是短暂动词，用when。',
        hint: '短暂动作用when',
      },
      {
        type: 'fill',
        question: '_____ I was walking in the park, I saw a beautiful bird.',
        fillAnswer: 'While',
        explanation: 'walk是持续动作用进行时，用while引导。',
        hint: '持续动作用while',
      },
      {
        type: 'fill',
        question: '_____ she heard the news, she cried.',
        fillAnswer: 'When',
        explanation: 'hear是短暂动词，用when。',
        hint: '短暂动作用when',
      },
    ],
    tips: [
      'when后可以接短暂动词（一般过去时）或持续动词（过去进行时）',
      'while后通常接持续动词的进行时',
      'while也可以表示"然而"：I like tea, while he likes coffee.',
      '注意区分when和while在时态搭配上的区别',
    ],
    relatedLessons: [118, 119],
    difficulty: 'medium',
    keywords: ['when', 'while', '时间状语从句', '过去进行时'],
  },

  // ==================== 第118课：when和while练习 ====================
  118: {
    title: '复习：when和while练习',
    subtitle: 'when和while时间状语从句综合练习',
    explanation: '通过练习巩固when和while引导时间状语从句的用法，注意两者在时态搭配上的区别。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'when与while的时态搭配',
          headers: ['连词', '从句时态', '主句时态', '例句'],
          rows: [
            ['when', '一般过去时', '过去进行时', 'When he came, I was reading.'],
            ['when', '过去进行时', '一般过去时', 'When I was reading, he came.'],
            ['while', '过去进行时', '过去进行时', 'While I was cooking, she was cleaning.'],
            ['while', '过去进行时', '一般过去时', 'While I was walking, I found a coin.'],
          ],
        },
      },
    ],
    rules: [
      'when + 短暂动词（一般过去时）',
      'while + 持续动词（过去进行时）',
      'while可以连接两个同时进行的长动作',
    ],
    examples: [
      {
        english: 'When the teacher came in, the students stopped talking.',
        chinese: '当老师进来时，学生们停止了说话。',
        grammarPoint: 'when + 短暂动词',
      },
      {
        english: 'While my mother was cooking, I was doing my homework.',
        chinese: '当妈妈在做饭时，我在做作业。',
        grammarPoint: 'while + 两个进行时',
      },
      {
        english: 'When I got to the station, the train had already left.',
        chinese: '当我到达车站时，火车已经开走了。',
        grammarPoint: 'when + 一般过去时',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question:
          '_____ the teacher was writing on the blackboard, the students were taking notes.',
        options: ['When', 'While', 'Before', 'Until'],
        answer: 1,
        explanation: '两个持续动作同时发生，用while。',
        hint: '两个持续动作用while',
      },
      {
        type: 'choice',
        question: '_____ the bell rang, everyone rushed out.',
        options: ['When', 'While', 'During', 'For'],
        answer: 0,
        explanation: 'rang是短暂动词，用when。',
        hint: '短暂动作用when',
      },
      {
        type: 'fill',
        question: '_____ I was having a bath, the phone rang.',
        fillAnswer: 'While',
        explanation: 'have a bath是持续动作，用while。',
        hint: '持续动作用while',
      },
      {
        type: 'fill',
        question: '_____ he saw the snake, he screamed.',
        fillAnswer: 'When',
        explanation: 'see是短暂动词，用when。',
        hint: '短暂动作用when',
      },
    ],
    tips: [
      '判断用when还是while的关键：看从句动词是短暂动词还是持续动词',
      '短暂动词（如come, go, see, hear）→ 用when',
      '持续动词（如read, cook, walk, wait）→ 用while',
      'when和while从句可以在句首，也可以在句末',
    ],
    relatedLessons: [117, 119],
    difficulty: 'medium',
    keywords: ['when', 'while', '练习', '时间状语从句'],
  },

  // ==================== 第119课：after和before引导的时间状语从句 ====================
  119: {
    title: 'after和before引导的时间状语从句',
    subtitle: 'After he had finished..., he...',
    explanation:
      'after引导时间状语从句表示"在……之后"，before引导时间状语从句表示"在……之前"。当主句和从句有先后关系时，先发生的动作用过去完成时，后发生的动作用一般过去时。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: 'after/before时间状语从句时态',
          formula:
            'After + 先发生的动作（过去完成时），后发生的动作（一般过去时）\nBefore + 后发生的动作（一般过去时），先发生的动作（过去完成时）',
          examples: [
            'After he had finished work, he went home.',
            'Before he went home, he had finished work.',
          ],
        },
      },
    ],
    rules: [
      'after引导的从句中，从句动作先于主句动作发生',
      'before引导的从句中，主句动作先于从句动作发生',
      '先发生的动作用过去完成时（had + 过去分词）',
      '后发生的动作用一般过去时',
      '在简单叙述中，有时都用一般过去时也可以',
    ],
    examples: [
      {
        english: 'After he had finished his homework, he went out to play.',
        chinese: '他做完作业后，就出去玩了。',
        grammarPoint: 'after + 过去完成时',
      },
      {
        english: 'Before she left the office, she had typed the letter.',
        chinese: '她离开办公室之前，已经打好了那封信。',
        grammarPoint: 'before + 一般过去时',
      },
      {
        english: 'After I had eaten breakfast, I went to school.',
        chinese: '我吃完早饭后去了学校。',
        grammarPoint: '先吃饭，后上学',
      },
      {
        english: 'Before he arrived, we had already started the meeting.',
        chinese: '在他到达之前，我们已经开始开会了。',
        grammarPoint: '先开始，后到达',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'After he _____ (finish) dinner, he watched TV.',
        options: ['finished', 'had finished', 'has finished', 'finishes'],
        answer: 1,
        explanation: 'after从句中先发生的动作用过去完成时had finished。',
        hint: '先发生的用过去完成时',
      },
      {
        type: 'choice',
        question: 'Before I _____ (go) to bed, I brushed my teeth.',
        options: ['went', 'had gone', 'go', 'have gone'],
        answer: 0,
        explanation: 'before从句中后发生的动作用一般过去时went。',
        hint: 'before从句用一般过去时',
      },
      {
        type: 'fill',
        question: 'After she _____ (leave), I found her purse on the table.',
        fillAnswer: 'had left',
        explanation: 'leave发生在find之前，用过去完成时had left。',
        hint: '先发生的用过去完成时',
      },
      {
        type: 'fill',
        question: 'Before he _____ (come) to China, he had studied Chinese for two years.',
        fillAnswer: 'came',
        explanation: 'before从句用一般过去时，主句用过去完成时。',
        hint: 'before从句用一般过去时',
      },
    ],
    tips: [
      'after从句：从句用过去完成时，主句用一般过去时',
      'before从句：从句用一般过去时，主句用过去完成时',
      '记忆技巧：after先做（完成时）后说（过去时），before先说（过去时）后做（完成时）',
      '口语中有时都用一般过去时：After he finished, he went out.',
    ],
    relatedLessons: [117, 120],
    difficulty: 'hard',
    keywords: ['after', 'before', '过去完成时', '时间状语从句'],
  },

  // ==================== 第120课：after和before练习 ====================
  120: {
    title: '复习：after和before练习',
    subtitle: 'after/before时间状语从句综合练习',
    explanation:
      '通过练习巩固after和before引导时间状语从句时的时态搭配，掌握过去完成时和一般过去时的正确使用。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'after与before时态搭配对比',
          headers: ['连词', '从句时态', '主句时态', '例句'],
          rows: [
            ['after', '过去完成时 (had done)', '一般过去时', 'After he had finished, he left.'],
            ['before', '一般过去时', '过去完成时 (had done)', 'Before he left, he had finished.'],
          ],
        },
      },
    ],
    rules: [
      'after + had + 过去分词，主句 + 一般过去时',
      'before + 一般过去时，主句 + had + 过去分词',
      '关键是确定动作的先后顺序',
    ],
    examples: [
      {
        english: 'After the rain had stopped, we went for a walk.',
        chinese: '雨停之后，我们出去散步了。',
        grammarPoint: 'after + had stopped',
      },
      {
        english: 'Before I moved to Beijing, I had lived in Shanghai.',
        chinese: '在我搬到北京之前，我住在上海。',
        grammarPoint: 'before + moved',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'After she _____ (read) the letter, she tore it up.',
        options: ['read', 'had read', 'has read', 'reads'],
        answer: 1,
        explanation: 'after从句中先发生的动作用过去完成时had read。',
        hint: 'after从句用过去完成时',
      },
      {
        type: 'choice',
        question: 'Before he _____ (buy) the car, he had saved money for two years.',
        options: ['bought', 'had bought', 'buys', 'has bought'],
        answer: 0,
        explanation: 'before从句用一般过去时。',
        hint: 'before从句用一般过去时',
      },
      {
        type: 'fill',
        question: 'After I _____ (lock) the door, I went to bed.',
        fillAnswer: 'had locked',
        explanation: 'lock先于go发生，用过去完成时。',
        hint: '先发生的用过去完成时',
      },
      {
        type: 'fill',
        question: 'Before she _____ (go) abroad, she had taken many English classes.',
        fillAnswer: 'went',
        explanation: 'before从句用一般过去时。',
        hint: 'before从句用一般过去时',
      },
    ],
    tips: [
      '区分after和before的方法：看哪个动作先发生',
      'after = 先做完再做另一件事（从句先发生）',
      'before = 做某事之前已经做了另一件事（主句先发生）',
      '有时候都用一般过去时也是可以接受的',
    ],
    relatedLessons: [119, 121],
    difficulty: 'hard',
    keywords: ['after', 'before', '过去完成时', '练习'],
  },

  // ==================== 第121课：定语从句(一) ====================
  121: {
    title: '定语从句(一)',
    subtitle: 'who/which/that',
    explanation:
      '定语从句是用来修饰名词或代词的从句，相当于一个形容词的作用。关系代词who修饰人，which修饰物，that既可以修饰人也可以修饰物。关系代词在从句中充当主语或宾语。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '关系代词的用法',
          headers: ['关系代词', '修饰对象', '在从句中作', '例句'],
          rows: [
            ['who', '人', '主语/宾语', 'The man who is standing there is my father.'],
            ['which', '物', '主语/宾语', 'The book which is on the table is mine.'],
            ['that', '人/物', '主语/宾语', 'The girl that I met yesterday is a student.'],
          ],
        },
      },
    ],
    rules: [
      'who修饰人，在从句中作主语或宾语',
      'which修饰物，在从句中作主语或宾语',
      'that可以修饰人或物，是最常用的关系代词',
      '关系代词在从句中作宾语时可以省略',
      '定语从句紧跟在被修饰的名词（先行词）之后',
    ],
    examples: [
      {
        english: 'The man who is standing there is my father.',
        chinese: '站在那里的那个人是我父亲。',
        grammarPoint: 'who在从句中作主语',
      },
      {
        english: 'The book which is on the table is very interesting.',
        chinese: '桌子上的那本书非常有趣。',
        grammarPoint: 'which在从句中作主语',
      },
      {
        english: 'The girl that I met yesterday is a nurse.',
        chinese: '我昨天遇到的那个女孩是个护士。',
        grammarPoint: 'that在从句中作宾语',
      },
      {
        english: 'I like the people who live next door.',
        chinese: '我喜欢住在隔壁的那些人。',
        grammarPoint: 'who修饰人',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The woman _____ is talking to my mother is a teacher.',
        options: ['who', 'which', 'what', 'where'],
        answer: 0,
        explanation: '修饰人（woman）用who。',
        hint: '修饰人',
      },
      {
        type: 'choice',
        question: 'The car _____ is parked outside is mine.',
        options: ['who', 'which', 'what', 'where'],
        answer: 1,
        explanation: '修饰物（car）用which。',
        hint: '修饰物',
      },
      {
        type: 'choice',
        question: 'The boy _____ I met yesterday is Tom.',
        options: ['who', 'which', 'that', 'A和C都对'],
        answer: 3,
        explanation: '修饰人既可以用who也可以用that。',
        hint: '修饰人可以用who或that',
      },
      {
        type: 'fill',
        question: 'The dog _____ is running in the garden is very cute.',
        fillAnswer: 'which',
        explanation: '修饰物（dog）用which。',
        hint: '修饰物',
      },
    ],
    tips: [
      'who修饰人，which修饰物，that两者都可以',
      '先行词被最高级、序数词修饰时，只能用that',
      '先行词是all, everything, nothing等不定代词时，只能用that',
      '关系代词作从句的宾语时可以省略：The man (who/that) I met...',
    ],
    relatedLessons: [122, 123],
    difficulty: 'medium',
    keywords: ['定语从句', 'who', 'which', 'that', '关系代词'],
  },

  // ==================== 第122课：定语从句(一)练习 ====================
  122: {
    title: '复习：定语从句(一)练习',
    subtitle: 'who/which/that综合练习',
    explanation:
      '通过练习巩固定语从句中关系代词who、which、that的用法，学会判断先行词是人还是物来选择正确的关系代词。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '定语从句基本结构',
          formula: '先行词（名词）+ 关系代词（who/which/that）+ 从句剩余部分',
          examples: [
            'The man + who + is tall = The man who is tall.',
            'The book + which + is new = The book which is new.',
          ],
        },
      },
    ],
    rules: [
      '先行词是人 → who/that',
      '先行词是物 → which/that',
      'who/which/that在从句中作主语时不能省略',
      'who/which/that在从句中作宾语时可以省略',
    ],
    examples: [
      {
        english: 'The teacher who teaches us English is from America.',
        chinese: '教我们英语的老师来自美国。',
        grammarPoint: 'who在从句中作主语',
      },
      {
        english: 'The flowers which grow in the garden are beautiful.',
        chinese: '花园里长的花很漂亮。',
        grammarPoint: 'which在从句中作主语',
      },
      {
        english: 'This is the book that I bought yesterday.',
        chinese: '这就是我昨天买的那本书。',
        grammarPoint: 'that在从句中作宾语',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The student _____ won the prize is my classmate.',
        options: ['who', 'which', 'what', 'where'],
        answer: 0,
        explanation: '先行词student是人，用who。',
        hint: '先行词是人',
      },
      {
        type: 'choice',
        question: 'The house _____ was built last year is very modern.',
        options: ['who', 'which', 'what', 'where'],
        answer: 1,
        explanation: '先行词house是物，用which。',
        hint: '先行词是物',
      },
      {
        type: 'fill',
        question: 'I have a friend _____ can speak five languages.',
        fillAnswer: 'who',
        explanation: '先行词friend是人，用who。',
        hint: '先行词是人',
      },
      {
        type: 'fill',
        question: 'The movie _____ we watched last night was exciting.',
        fillAnswer: 'that',
        explanation: '先行词movie是物，that在从句中作宾语。',
        hint: '先行词是物',
      },
    ],
    tips: [
      '先找到先行词（被修饰的名词），再判断是人还是物',
      '从句缺主语时，关系代词不能省略',
      '从句不缺主语时（关系代词作宾语），可以省略',
      '口语中that比who和which更常用',
    ],
    relatedLessons: [121, 123],
    difficulty: 'medium',
    keywords: ['定语从句', 'who', 'which', 'that', '练习'],
  },

  // ==================== 第123课：定语从句(二) ====================
  123: {
    title: '定语从句(二)',
    subtitle: 'who/whom/which/that的省略',
    explanation:
      '当关系代词在定语从句中作宾语时，可以省略。who、whom、which、that都可以在作宾语时省略。whom是who的宾格形式，用于正式文体中。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '关系代词作主语与作宾语',
          items: [
            {
              label: '作主语（不可省略）',
              example: 'The man who is standing there...',
              explanation: '关系代词在从句中作主语，不能省略',
            },
            {
              label: '作宾语（可省略）',
              example: 'The man (who/whom/that) I met...',
              explanation: '关系代词在从句中作宾语，可以省略',
            },
          ],
        },
      },
    ],
    rules: [
      '关系代词在从句中作主语时，不能省略',
      '关系代词在从句中作宾语时，可以省略',
      'whom是who的宾格，用于正式文体',
      '口语中通常用who代替whom，或直接省略',
      'which和that作宾语时也可以省略',
    ],
    examples: [
      {
        english: 'The man (who/whom/that) I met yesterday is a doctor.',
        chinese: '我昨天遇到的那个人是医生。',
        grammarPoint: '关系代词作宾语可省略',
      },
      {
        english: 'The book (which/that) I bought is very good.',
        chinese: '我买的那本书非常好。',
        grammarPoint: '关系代词作宾语可省略',
      },
      {
        english: 'The girl (who/whom/that) he loves is in London.',
        chinese: '他爱的那个女孩在伦敦。',
        grammarPoint: '关系代词作宾语可省略',
      },
      {
        english: 'The man who helped me is my neighbor.',
        chinese: '帮助我的那个人是我的邻居。',
        grammarPoint: '关系代词作主语不可省略',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The woman _____ I spoke to was very kind.',
        options: ['who', 'whom', 'which', 'A和B都对'],
        answer: 3,
        explanation: '关系代词作spoke to的宾语，who和whom都可以。',
        hint: '作宾语',
      },
      {
        type: 'choice',
        question: 'The letter _____ I received yesterday was from my friend.',
        options: ['who', 'whom', 'which', 'what'],
        answer: 2,
        explanation: '先行词letter是物，用which。',
        hint: '先行词是物',
      },
      {
        type: 'fill',
        question: 'This is the film _____ (可填或不填) I told you about.',
        fillAnswer: 'that',
        explanation: '关系代词作宾语，可填that或留空。',
        hint: '作宾语可省略',
      },
      {
        type: 'choice',
        question: 'The man _____ helped me was very kind. (关系代词作主语)',
        options: ['who/that', 'whom', '可省略', 'which'],
        answer: 0,
        explanation: '关系代词作主语不能省略，修饰人用who/that。',
        hint: '作主语不可省略',
      },
    ],
    tips: [
      '判断关系代词能否省略的方法：看它在从句中作主语还是宾语',
      '从句中已有主语（如I, he, she等），关系代词通常作宾语，可省略',
      '从句中没有其他主语，关系代词就是主语，不能省略',
      '口语中whom很少使用，通常用who代替或直接省略',
    ],
    relatedLessons: [121, 124],
    difficulty: 'medium',
    keywords: ['定语从句', 'whom', '省略', '关系代词作宾语'],
  },

  // ==================== 第124课：定语从句(二)练习 ====================
  124: {
    title: '复习：定语从句(二)练习',
    subtitle: '关系代词省略综合练习',
    explanation: '通过练习巩固关系代词在定语从句中作宾语时可以省略的用法。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '关系代词能否省略判断',
          headers: ['关系代词在从句中的成分', '能否省略', '例句'],
          rows: [
            ['主语', '不能省略', 'The man who is tall...（不可省略who）'],
            ['宾语', '可以省略', 'The man (who) I met...（可省略who）'],
          ],
        },
      },
    ],
    rules: [
      '从句缺少主语 → 关系代词不可省略',
      '从句不缺主语 → 关系代词可省略',
      '判断方法：从句中已有主语则关系代词是宾语',
    ],
    examples: [
      {
        english: 'The book (that/which) he wrote is a bestseller.',
        chinese: '他写的那本书是畅销书。',
        grammarPoint: 'he是主语，that/which是宾语，可省略',
      },
      {
        english: 'The teacher that taught us is retired.',
        chinese: '教我们的老师退休了。',
        grammarPoint: 'that在从句中作主语，不可省略',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The cake _____ she made was delicious.',
        options: ['which', 'who', 'A可省略', '不可省略'],
        answer: 2,
        explanation: 'she是主语，which作宾语，可以省略。',
        hint: '从句已有主语she',
      },
      {
        type: 'choice',
        question: 'The people _____ live next door are friendly.',
        options: ['（可省略）', 'who', 'whom', 'which'],
        answer: 1,
        explanation: '从句缺主语，关系代词不可省略，修饰人用who。',
        hint: '从句缺主语',
      },
      {
        type: 'fill',
        question: 'The food _____ (可填或不填) I cooked was delicious.',
        fillAnswer: 'that',
        explanation: 'I是主语，关系代词作宾语，可填that或留空。',
        hint: '从句已有主语I',
      },
      {
        type: 'fill',
        question: 'The girl _____ is singing is my sister.',
        fillAnswer: 'who',
        explanation: '从句缺主语，关系代词不可省略。',
        hint: '从句缺主语',
      },
    ],
    tips: [
      '快速判断法：如果从句中已经有主语了，关系代词就是宾语，可以省略',
      '注意：that既可以指人也可以指物',
      '在限制性定语从句中，作宾语的who/whom/which/that都可省略',
    ],
    relatedLessons: [123, 125],
    difficulty: 'medium',
    keywords: ['定语从句', '省略', '关系代词', '练习'],
  },

  // ==================== 第125课：have to和must的区别 ====================
  125: {
    title: 'have to和must的区别',
    subtitle: 'I have to go. I must go.',
    explanation:
      'have to和must都表示"必须"，但有区别。must强调主观上的必要性（说话者自己觉得必须），have to强调客观上的必要性（外界条件要求）。must的否定mustn\'t表示"禁止"，而don\'t have to表示"不必"。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'have to与must对比',
          items: [
            {
              label: 'must（主观必要性）',
              example: 'I must study harder.',
              explanation: '表示说话者自己觉得"必须"，来自内心的决定',
            },
            {
              label: 'have to（客观必要性）',
              example: 'I have to wear a uniform at work.',
              explanation: '表示外界条件要求"不得不"，来自外部的规定',
            },
            {
              label: "mustn't（禁止）",
              example: "You mustn't smoke here.",
              explanation: 'must的否定形式表示"禁止、不允许"',
            },
            {
              label: "don't have to（不必）",
              example: "You don't have to come tomorrow.",
              explanation: 'have to的否定形式表示"没有必要"',
            },
          ],
        },
      },
    ],
    rules: [
      'must表示主观必要性（"我觉得必须"）',
      'have to表示客观必要性（"不得不"）',
      'must的否定mustn\'t表示"禁止"',
      'have to的否定don\'t have to表示"不必"',
      'must没有时态变化，have to可以有各种时态',
      '第三人称用has to',
    ],
    examples: [
      {
        english: 'I must go now.',
        chinese: '我现在必须走了。（自己决定）',
        grammarPoint: 'must主观',
      },
      {
        english: 'I have to go now.',
        chinese: '我现在不得不走了。（客观原因）',
        grammarPoint: 'have to客观',
      },
      {
        english: "You mustn't touch that wire.",
        chinese: '你不准碰那根电线。（禁止）',
        grammarPoint: "mustn't禁止",
      },
      {
        english: "You don't have to wait for me.",
        chinese: '你不必等我。（没有义务）',
        grammarPoint: "don't have to不必",
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: "I _____ wear a uniform at school. It's a school rule.",
        options: ['must', 'have to', "mustn't", "don't have to"],
        answer: 1,
        explanation: '学校规定是客观要求，用have to。',
        hint: '客观要求',
      },
      {
        type: 'choice',
        question: 'You _____ smoke in the hospital.',
        options: ['must', 'have to', "mustn't", "don't have to"],
        answer: 2,
        explanation: "医院里禁止吸烟，用mustn't。",
        hint: '禁止',
      },
      {
        type: 'choice',
        question: "You _____ come if you don't want to. It's not necessary.",
        options: ['must', 'have to', "mustn't", "don't have to"],
        answer: 3,
        explanation: "不必要，用don't have to。",
        hint: '不必',
      },
      {
        type: 'fill',
        question: 'She _____ (不得不) get up early every day because she lives far from school.',
        fillAnswer: 'has to',
        explanation: '客观原因（住得远），第三人称用has to。',
        hint: '客观原因，第三人称',
      },
    ],
    tips: [
      'must只有一种形式（不分人称和时态），have to可以有过去式had to等',
      "mustn't ≠ don't have to：mustn't是禁止，don't have to是不必",
      "口语中have to常用缩写：I've got to = I have to",
      '在疑问句中：Must I...? 侧重主观；Do I have to...? 侧重客观',
    ],
    relatedLessons: [126, 127],
    difficulty: 'medium',
    keywords: ['have to', 'must', "mustn't", '不必', '禁止'],
  },

  // ==================== 第126课：have to和must练习 ====================
  126: {
    title: '复习：have to和must练习',
    subtitle: 'have to/must综合练习',
    explanation:
      "通过各种情景练习have to和must的正确使用，区分主观必要性和客观必要性，以及mustn't和don't have to的区别。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'have to/must用法总结',
          headers: ['表达', '含义', '例句'],
          rows: [
            ['must', '必须（主观）', 'I must help him.'],
            ['have to', '不得不（客观）', 'I have to go to work.'],
            ["mustn't", '禁止', "You mustn't cheat."],
            ["don't have to", '不必', "You don't have to worry."],
          ],
        },
      },
    ],
    rules: [
      'must = 主观觉得必须',
      'have to = 客观条件要求',
      "mustn't = 禁止",
      "don't have to = 不必（没有必要）",
    ],
    examples: [
      {
        english: 'I feel I must tell you the truth.',
        chinese: '我觉得我必须告诉你真相。',
        grammarPoint: 'must主观',
      },
      { english: 'We have to pay taxes.', chinese: '我们必须纳税。', grammarPoint: 'have to客观' },
    ],
    exercises: [
      {
        type: 'choice',
        question: "You _____ drive after drinking alcohol. It's against the law.",
        options: ['must', 'have to', "mustn't", "don't have to"],
        answer: 2,
        explanation: "法律禁止酒后驾车，用mustn't。",
        hint: '法律禁止',
      },
      {
        type: 'choice',
        question: 'I _____ go to the dentist tomorrow. I have a toothache.',
        options: ['must', 'have to', "mustn't", "don't have to"],
        answer: 1,
        explanation: '牙疼是客观原因，用have to。',
        hint: '客观原因',
      },
      {
        type: 'fill',
        question: 'You _____ (不必) finish it today. You can do it tomorrow.',
        fillAnswer: "don't have to",
        explanation: "没有义务/不必，用don't have to。",
        hint: '不必',
      },
      {
        type: 'fill',
        question: "He _____ (禁止) play with fire. It's dangerous.",
        fillAnswer: "mustn't",
        explanation: "禁止做某事，用mustn't。",
        hint: '禁止',
      },
    ],
    tips: [
      '情景判断：法律规定/规则 → have to；自己觉得 → must',
      "mustn't和don't have to意思完全不同，不要混淆",
      '过去时用had to：I had to work yesterday.',
      'must可以表示推测：He must be at home.（他一定在家）',
    ],
    relatedLessons: [125, 127],
    difficulty: 'medium',
    keywords: ['have to', 'must', "mustn't", "don't have to", '练习'],
  },

  // ==================== 第127课：情态动词表推测(一) ====================
  127: {
    title: '情态动词表推测(一)',
    subtitle: "She must be... She can't be...",
    explanation:
      '情态动词可以用来表示对现在情况的推测。must be表示"一定是"（肯定推测，把握很大），can\'t be表示"不可能是"（否定推测，把握很大），may/might be表示"可能是"（不确定的推测）。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '情态动词表对现在的推测',
          headers: ['情态动词', '含义', '确定程度', '例句'],
          rows: [
            ['must be', '一定是', '很确定（肯定）', 'She must be at home.'],
            ["can't be", '不可能是', '很确定（否定）', "He can't be a teacher."],
            ['may/might be', '可能是', '不太确定', 'It may/might rain tomorrow.'],
          ],
        },
      },
    ],
    rules: [
      'must be + 名词/形容词/介词短语 表示"一定是"',
      'can\'t be + 名词/形容词/介词短语 表示"不可能是"',
      'may/might be + 名词/形容词/介词短语 表示"可能是"',
      '这些推测都是针对现在的情况',
      "must be的否定形式是can't be，不是mustn't be",
    ],
    examples: [
      {
        english: 'She must be at home. The light is on.',
        chinese: '她一定在家。灯亮着。',
        grammarPoint: 'must be肯定推测',
      },
      {
        english: "He can't be a doctor. He is only 15.",
        chinese: '他不可能是医生。他才15岁。',
        grammarPoint: "can't be否定推测",
      },
      {
        english: 'It may be in your bag.',
        chinese: '可能在你包里。',
        grammarPoint: 'may be不确定推测',
      },
      {
        english: 'He must be very tired after the long trip.',
        chinese: '长途旅行后他一定很累了。',
        grammarPoint: 'must be + 形容词',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: "She _____ be at the office. She doesn't work today.",
        options: ['must', "can't", 'may', 'might'],
        answer: 1,
        explanation: '她今天不上班，所以"不可能"在办公室，用can\'t。',
        hint: '否定推测',
      },
      {
        type: 'choice',
        question: 'He _____ be a student. He is carrying a schoolbag.',
        options: ['must', "can't", 'may not', "needn't"],
        answer: 0,
        explanation: '背着书包，肯定推测"一定是"学生，用must。',
        hint: '肯定推测',
      },
      {
        type: 'fill',
        question: 'She is not at home. She _____ be at the library.',
        fillAnswer: 'may',
        explanation: '不确定的推测，"可能在图书馆"。',
        hint: '不确定推测',
      },
      {
        type: 'fill',
        question: 'He is wearing a police uniform. He _____ be a policeman.',
        fillAnswer: 'must',
        explanation: '穿着警服，肯定推测"一定是"警察。',
        hint: '肯定推测',
      },
    ],
    tips: [
      "must be的否定不是mustn't be，而是can't be",
      "推测程度：must > may/might > can't（否定）",
      '推测的依据通常在上下文中给出',
      '这些情态动词+be表示对现在状态的推测',
    ],
    relatedLessons: [128, 129],
    difficulty: 'medium',
    keywords: ['情态动词', '推测', 'must be', "can't be", 'may be'],
  },

  // ==================== 第128课：情态动词表推测(一)练习 ====================
  128: {
    title: '复习：情态动词表推测(一)练习',
    subtitle: "must be/can't be/may be综合练习",
    explanation: "通过练习巩固情态动词must be、can't be、may/might be对现在情况的推测用法。",
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '推测确定程度对比',
          items: [
            {
              label: 'must be（一定）',
              example: 'He must be a teacher.',
              explanation: '非常肯定的推测',
            },
            {
              label: 'may/might be（可能）',
              example: 'He may be a teacher.',
              explanation: '不太确定的推测',
            },
            {
              label: "can't be（不可能）",
              example: "He can't be a teacher.",
              explanation: '非常否定的推测',
            },
          ],
        },
      },
    ],
    rules: [
      'must be → 非常肯定（正面推测）',
      'may/might be → 不确定',
      "can't be → 非常否定（反面推测）",
    ],
    examples: [
      {
        english: 'Look at that man. He must be a doctor because he is wearing a white coat.',
        chinese: '看那个人。他一定是医生，因为他穿着白大褂。',
        grammarPoint: 'must be + 名词',
      },
      {
        english: "She can't be only 20. She looks much older.",
        chinese: '她不可能只有20岁。她看起来老多了。',
        grammarPoint: "can't be + 数词",
      },
      {
        english: 'Where is my pen? It may be in your pocket.',
        chinese: '我的钢笔在哪？可能在你口袋里。',
        grammarPoint: 'may be + 介词短语',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He is speaking French fluently. He _____ be French.',
        options: ['must', "can't", 'may', "needn't"],
        answer: 0,
        explanation: '法语说得流利，肯定推测"一定是"法国人。',
        hint: '肯定推测',
      },
      {
        type: 'choice',
        question: 'She _____ be his mother. She is too young.',
        options: ['must', "can't", 'may', 'should'],
        answer: 1,
        explanation: '太年轻了，否定推测"不可能是"他妈妈。',
        hint: '否定推测',
      },
      {
        type: 'fill',
        question: "I'm not sure, but he _____ be at school now.",
        fillAnswer: 'may',
        explanation: '不确定的推测，"可能在学校"。',
        hint: '不确定推测',
      },
      {
        type: 'fill',
        question: 'She has won the gold medal. She _____ be very happy.',
        fillAnswer: 'must',
        explanation: '获得金牌，肯定推测"一定很高兴"。',
        hint: '肯定推测',
      },
    ],
    tips: [
      '选择情态动词的关键：根据上下文判断确定程度',
      "有正面证据用must be，有反面证据用can't be",
      '证据不充分时用may/might be',
      "注意must be的否定是can't be",
    ],
    relatedLessons: [127, 129],
    difficulty: 'medium',
    keywords: ['推测', 'must be', "can't be", 'may be', '练习'],
  },

  // ==================== 第129课：情态动词表推测(二) ====================
  129: {
    title: '情态动词表推测(二)',
    subtitle: "He can't have been... He must have been...",
    explanation:
      '情态动词也可以用来表示对过去情况的推测。must have done表示"一定做了"（对过去的肯定推测），can\'t have done表示"不可能做了"（对过去的否定推测），may/might have done表示"可能做了"（对过去的不确定推测）。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '对过去的推测结构',
          formula: '情态动词 + have + 过去分词（对过去的推测）',
          examples: [
            'He must have gone home.',
            "She can't have said that.",
            'They may have left already.',
          ],
        },
      },
    ],
    rules: [
      'must have done 表示"一定做了"（对过去的肯定推测）',
      'can\'t have done 表示"不可能做了"（对过去的否定推测）',
      'may/might have done 表示"可能做了"（对过去的不确定推测）',
      '这些推测都是针对过去已经发生的事情',
      '区别于第127课：第127课是对现在的推测（must be），本课是对过去的推测（must have done）',
    ],
    examples: [
      {
        english: 'He must have gone home. Nobody is in the office.',
        chinese: '他一定已经回家了。办公室里没人。',
        grammarPoint: 'must have done',
      },
      {
        english: "She can't have said that. She is a kind person.",
        chinese: '她不可能说了那样的话。她是个善良的人。',
        grammarPoint: "can't have done",
      },
      {
        english: 'They may have already arrived.',
        chinese: '他们可能已经到了。',
        grammarPoint: 'may have done',
      },
      {
        english: 'He must have missed the bus.',
        chinese: '他一定是错过了公交车。',
        grammarPoint: 'must have missed',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The road is wet. It _____ last night.',
        options: ['must rain', 'must have rained', "can't have rained", 'may rain'],
        answer: 1,
        explanation: '路面湿了，推测昨晚"一定下过雨"，用must have rained。',
        hint: '对过去的肯定推测',
      },
      {
        type: 'choice',
        question: 'He _____ stolen the money. He was not even there.',
        options: ['must have', "can't have", 'may have', 'might have'],
        answer: 1,
        explanation: '他当时不在场，"不可能偷了"钱，用can\'t have。',
        hint: '对过去的否定推测',
      },
      {
        type: 'fill',
        question: 'She looks tired. She _____ _____ _____ (work) all night.',
        fillAnswer: 'must have worked',
        explanation: '看起来很累，推测"一定工作了一整夜"。',
        hint: '对过去的肯定推测',
      },
      {
        type: 'fill',
        question: "He didn't answer the phone. He _____ _____ _____ (go) out.",
        fillAnswer: 'may have gone',
        explanation: '没有接电话，推测"可能出去了"。',
        hint: '对过去的不确定推测',
      },
    ],
    tips: [
      "对现在推测：情态动词 + be（must be, can't be）",
      "对过去推测：情态动词 + have + 过去分词（must have done, can't have done）",
      "must have done的否定也是can't have done，不是mustn't have done",
      "can't have done有时也写作couldn't have done",
    ],
    relatedLessons: [127, 130],
    difficulty: 'hard',
    keywords: ['推测过去', 'must have done', "can't have done", 'may have done'],
  },

  // ==================== 第130课：情态动词表推测(二)练习 ====================
  130: {
    title: '复习：情态动词表推测(二)练习',
    subtitle: '对过去的推测综合练习',
    explanation:
      "通过练习巩固情态动词对过去情况的推测：must have done、can't have done、may/might have done。",
    visualRules: [
      {
        type: 'table',
        content: {
          title: '对现在与对过去的推测对比',
          headers: ['推测对象', '肯定推测', '否定推测', '不确定推测'],
          rows: [
            ['对现在', 'must be', "can't be", 'may/might be'],
            ['对过去', 'must have done', "can't have done", 'may/might have done'],
          ],
        },
      },
    ],
    rules: [
      'must have done → 对过去的肯定推测',
      "can't have done → 对过去的否定推测",
      'may/might have done → 对过去的不确定推测',
    ],
    examples: [
      {
        english: "He can't have finished the work so quickly.",
        chinese: '他不可能这么快就完成了工作。',
        grammarPoint: "can't have finished",
      },
      {
        english: 'She must have been very beautiful when she was young.',
        chinese: '她年轻时一定很漂亮。',
        grammarPoint: 'must have been',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'His eyes are red. He _____ crying.',
        options: ['must be', 'must have been', "can't be", 'may be'],
        answer: 1,
        explanation: '眼睛红了，推测之前"一定哭过"，用must have been。',
        hint: '对过去的肯定推测',
      },
      {
        type: 'choice',
        question: 'She passed the exam easily. She _____ hard.',
        options: ['must study', 'must have studied', "can't study", 'may study'],
        answer: 1,
        explanation: '轻松通过考试，推测"一定努力学习了"。',
        hint: '对过去的肯定推测',
      },
      {
        type: 'fill',
        question: "He didn't know the answer. He _____ _____ _____ (not study) the lesson.",
        fillAnswer: "can't have studied",
        explanation: '不知道答案，推测"不可能学过"这课。',
        hint: '对过去的否定推测',
      },
      {
        type: 'fill',
        question: 'The ground is dry. It _____ _____ _____ (not rain) last night.',
        fillAnswer: "can't have rained",
        explanation: '地面是干的，推测昨晚"不可能下过雨"。',
        hint: '对过去的否定推测',
      },
    ],
    tips: [
      '判断是对现在还是对过去的推测，决定用must be还是must have done',
      '如果句子中有last night, yesterday等过去时间标志，用must have done',
      "can't have done = couldn't have done，两者可以互换",
    ],
    relatedLessons: [129, 131],
    difficulty: 'hard',
    keywords: ['推测过去', 'must have done', "can't have done", '练习'],
  },

  // ==================== 第131课：may和might的用法 ====================
  131: {
    title: 'may和might的用法',
    subtitle: 'He may/might come tomorrow.',
    explanation:
      'may和might都可以表示"可能"和"许可"。may用于一般现在时的可能，might是may的过去式，语气更不确定。在表示许可时，may比can更正式。may not表示"可能不"或"不可以"（禁止）。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: 'may与might对比',
          items: [
            {
              label: 'may（可能/可以）',
              example: 'He may come tomorrow.',
              explanation: '表示可能性较大或正式许可',
            },
            {
              label: 'might（可能，语气更弱）',
              example: 'He might come tomorrow.',
              explanation: '表示可能性较小或更不确定',
            },
          ],
        },
      },
    ],
    rules: [
      'may表示"可能"，might也表示"可能"，但might可能性更小',
      'may表示正式许可：May I come in?',
      'might是may的过去式，在间接引语中使用',
      'may not可以表示"可能不"（推测）或"不可以"（禁止）',
      'might not表示"可能不"',
    ],
    examples: [
      {
        english: 'He may come tomorrow.',
        chinese: '他明天可能会来。',
        grammarPoint: 'may表示可能',
      },
      {
        english: "He might come tomorrow, but I'm not sure.",
        chinese: '他明天可能会来，但我不确定。',
        grammarPoint: 'might表示不确定的可能',
      },
      {
        english: 'May I use your phone?',
        chinese: '我可以用一下你的电话吗？',
        grammarPoint: 'may表示许可',
      },
      {
        english: 'She said she might come.',
        chinese: '她说她可能会来。',
        grammarPoint: 'might用于间接引语',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ I sit here?',
        options: ['May', 'Must', 'Should', 'Would'],
        answer: 0,
        explanation: '请求许可用May I...?（我可以……吗？）',
        hint: '请求许可',
      },
      {
        type: 'choice',
        question: 'It _____ rain later. Take an umbrella.',
        options: ['must', 'may', 'should', 'would'],
        answer: 1,
        explanation: '"可能会下雨"，用may表示不确定的可能。',
        hint: '不确定的可能',
      },
      {
        type: 'fill',
        question: 'She _____ (可能) not come to the party tonight.',
        fillAnswer: 'may',
        explanation: 'may not表示"可能不"。',
        hint: '可能不',
      },
      {
        type: 'fill',
        question: 'He _____ (可能) be late because of the traffic.',
        fillAnswer: 'might',
        explanation: 'might表示不太确定的可能性。',
        hint: '不太确定',
      },
    ],
    tips: [
      'may和might在表示"可能"时可以互换，但might更不确定',
      'May I...? 是正式的请求许可方式',
      '在间接引语中，may变为might（时态后退）',
      'may not = 可能不 / 不可以（需根据上下文判断）',
    ],
    relatedLessons: [127, 132],
    difficulty: 'medium',
    keywords: ['may', 'might', '可能', '许可'],
  },

  // ==================== 第132课：may和might练习 ====================
  132: {
    title: '复习：may和might练习',
    subtitle: 'may/might综合练习',
    explanation: '通过练习巩固may和might表示"可能"和"许可"的用法。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: 'may/might用法总结',
          headers: ['用法', 'may', 'might', '例句'],
          rows: [
            ['表示可能', '可能性较大', '可能性较小', 'It may/might rain.'],
            ['表示许可', '正式请求', '—', 'May I come in?'],
            ['间接引语', '—', '时态后退', 'He said he might come.'],
          ],
        },
      },
    ],
    rules: [
      'may表示许可时较正式',
      'may/might表示可能时，might可能性更小',
      '在间接引语中，may变为might',
    ],
    examples: [
      { english: 'May I help you?', chinese: '我能帮你吗？', grammarPoint: 'may表示许可' },
      {
        english: 'He might be at home now.',
        chinese: '他现在可能在家。',
        grammarPoint: 'might表示可能',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '_____ I ask you a question?',
        options: ['May', 'Must', 'Can', 'A和C都对'],
        answer: 3,
        explanation: 'May I和Can I都可以表示请求许可，May更正式。',
        hint: '请求许可',
      },
      {
        type: 'choice',
        question: "Don't wait for me. I _____ be late tonight.",
        options: ['must', 'may', 'should', 'would'],
        answer: 1,
        explanation: '"可能会迟到"，用may表示可能。',
        hint: '可能',
      },
      {
        type: 'fill',
        question: 'He said he _____ (可能) help us.',
        fillAnswer: 'might',
        explanation: '间接引语中may变为might。',
        hint: '间接引语',
      },
      {
        type: 'fill',
        question: '_____ (可以) I leave early today?',
        fillAnswer: 'May',
        explanation: '正式请求许可用May I。',
        hint: '正式请求',
      },
    ],
    tips: [
      'May I...? 比 Can I...? 更正式',
      'might在日常口语中也可以表示"可能"',
      'might as well = 不妨：You might as well go.',
      'may well = 很可能：He may well be right.',
    ],
    relatedLessons: [131, 133],
    difficulty: 'medium',
    keywords: ['may', 'might', '许可', '可能', '练习'],
  },

  // ==================== 第133课：过去完成时(一) ====================
  133: {
    title: '过去完成时(一)',
    subtitle: 'He said that he had already seen it.',
    explanation:
      '过去完成时表示在过去某个动作或时间之前已经完成的动作，即"过去的过去"。结构为had + 过去分词。常用于间接引语中，当主句是一般过去时时，从句中的过去完成时表示在said之前已发生的动作。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '过去完成时结构',
          formula: '主语 + had + 过去分词',
          examples: [
            'I had finished the work before he came.',
            'She said that she had seen the film.',
          ],
        },
      },
    ],
    rules: [
      '过去完成时：had + 过去分词',
      '表示在过去某个时间之前已经完成的动作',
      '常用于间接引语中：said that + had + 过去分词',
      '常与already, just, yet, before等词连用',
      '过去完成时也叫"过去的过去"',
    ],
    examples: [
      {
        english: 'He said that he had already seen the film.',
        chinese: '他说他已经看过那部电影了。',
        grammarPoint: '间接引语中的过去完成时',
      },
      {
        english: 'When I arrived, he had already left.',
        chinese: '当我到达时，他已经离开了。',
        grammarPoint: '过去的过去',
      },
      {
        english: 'She told me that she had finished her homework.',
        chinese: '她告诉我她已经完成了作业。',
        grammarPoint: 'said/told + that + had done',
      },
      {
        english: 'By the time I got there, the train had gone.',
        chinese: '当我到那儿时，火车已经开走了。',
        grammarPoint: 'by the time + had done',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'He said that he _____ the book before.',
        options: ['read', 'has read', 'had read', 'reads'],
        answer: 2,
        explanation: '间接引语中，said后接过去完成时had read。',
        hint: '间接引语用过去完成时',
      },
      {
        type: 'choice',
        question: 'When I got to the cinema, the film _____.',
        options: ['began', 'has begun', 'had begun', 'begins'],
        answer: 2,
        explanation: '电影在我到达之前已经开始，用过去完成时had begun。',
        hint: '过去的过去',
      },
      {
        type: 'fill',
        question: 'She told me she _____ (see) the accident.',
        fillAnswer: 'had seen',
        explanation: 'told后接过去完成时had seen。',
        hint: '间接引语',
      },
      {
        type: 'fill',
        question: 'By the time we arrived, they _____ (leave) already.',
        fillAnswer: 'had left',
        explanation: '在我们到达之前他们已经离开，用过去完成时。',
        hint: '过去的过去',
      },
    ],
    tips: [
      '过去完成时 = had + 过去分词（所有主语都用had）',
      '在间接引语中，一般过去时通常变为过去完成时',
      '过去完成时常与by the time, before, after, when等连词搭配',
      '如果两个过去动作按顺序发生，有时也可以都用一般过去时',
    ],
    relatedLessons: [134, 135],
    difficulty: 'medium',
    keywords: ['过去完成时', 'had done', '间接引语', '过去的过去'],
  },

  // ==================== 第134课：过去完成时(一)练习 ====================
  134: {
    title: '复习：过去完成时(一)练习',
    subtitle: '过去完成时综合练习',
    explanation: '通过练习巩固过去完成时的用法，特别是间接引语中时态的变化。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '间接引语中的时态变化',
          headers: ['直接引语', '间接引语', '例句'],
          rows: [
            ['一般现在时', '一般过去时', '"I am happy." → He said he was happy.'],
            ['一般过去时', '过去完成时', '"I saw it." → He said he had seen it.'],
            ['现在完成时', '过去完成时', '"I have finished." → He said he had finished.'],
            ['will', 'would', '"I will go." → He said he would go.'],
          ],
        },
      },
    ],
    rules: [
      '直接引语中的过去时 → 间接引语用过去完成时',
      '直接引语中的现在完成时 → 间接引语也用过去完成时',
      'had在所有人称中不变',
    ],
    examples: [
      {
        english: '"I have eaten lunch." → He said he had eaten lunch.',
        chinese: '"我吃过午饭了。" → 他说他已经吃过午饭了。',
        grammarPoint: '现在完成时→过去完成时',
      },
      {
        english: '"I bought a car." → She said she had bought a car.',
        chinese: '"我买了辆车。" → 她说她买了辆车。',
        grammarPoint: '一般过去时→过去完成时',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: '"I have lost my key." → He said he _____ his key.',
        options: ['lost', 'has lost', 'had lost', 'loses'],
        answer: 2,
        explanation: '现在完成时在间接引语中变为过去完成时。',
        hint: '现在完成时→过去完成时',
      },
      {
        type: 'choice',
        question: '"I saw the accident." → She said she _____ the accident.',
        options: ['saw', 'has seen', 'had seen', 'sees'],
        answer: 2,
        explanation: '一般过去时在间接引语中变为过去完成时。',
        hint: '一般过去时→过去完成时',
      },
      {
        type: 'fill',
        question: '"I didn\'t go." → He said he _____ _____ gone.',
        fillAnswer: 'had not',
        explanation: "否定形式：had not (hadn't) + 过去分词。",
        hint: '否定形式',
      },
      {
        type: 'fill',
        question: '"We have never been there." → They said they _____ never _____ there.',
        fillAnswer: 'had, been',
        explanation: '间接引语中have been变为had been。',
        hint: 'have→had',
      },
    ],
    tips: [
      '间接引语时态变化规则：时态后退一步',
      '一般现在时→一般过去时，一般过去时→过去完成时',
      '如果主句动词是said/told等过去时，从句时态需要后退',
      '如果从句内容是客观真理，时态不变：The teacher said the earth is round.',
    ],
    relatedLessons: [133, 135],
    difficulty: 'medium',
    keywords: ['过去完成时', '间接引语', '时态变化', '练习'],
  },

  // ==================== 第135课：过去完成时(二) ====================
  135: {
    title: '过去完成时(二)',
    subtitle: 'After he had finished, he went out.',
    explanation:
      '过去完成时还可以用于after和before引导的时间状语从句中，以及when引导的从句中，表示在过去某个动作之前已经完成的动作。这与第119课的内容相关联。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '过去完成时在时间状语从句中的用法',
          formula:
            'After + 主语 + had + 过去分词, 主语 + 一般过去时\n主语 + had + 过去分词 + before + 主语 + 一般过去时',
          examples: [
            'After he had finished dinner, he watched TV.',
            'He had finished dinner before he watched TV.',
          ],
        },
      },
    ],
    rules: [
      'after + 从句（过去完成时），主句（一般过去时）',
      '主句（过去完成时）+ before + 从句（一般过去时）',
      'when从句中也可以使用过去完成时',
      '过去完成时强调动作的先后顺序',
    ],
    examples: [
      {
        english: 'After he had finished his work, he went home.',
        chinese: '他完成工作后就回家了。',
        grammarPoint: 'after + had finished',
      },
      {
        english: 'He had studied English for five years before he went to England.',
        chinese: '他去英国之前已经学了五年英语。',
        grammarPoint: 'had studied...before...',
      },
      {
        english: 'When I had washed the dishes, I watched TV.',
        chinese: '我洗完碗后就看电视了。',
        grammarPoint: 'when + had washed',
      },
      {
        english: 'She had lived in Paris for ten years before she moved to London.',
        chinese: '她搬到伦敦之前在巴黎住了十年。',
        grammarPoint: 'had lived...before...',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'After she _____ (graduate) from university, she got a job.',
        options: ['graduated', 'had graduated', 'has graduated', 'graduates'],
        answer: 1,
        explanation: 'after从句中先发生的动作用过去完成时had graduated。',
        hint: 'after从句用过去完成时',
      },
      {
        type: 'choice',
        question: 'He _____ (live) in Japan for three years before he came to China.',
        options: ['lived', 'had lived', 'has lived', 'lives'],
        answer: 1,
        explanation: '来中国之前已经住了三年，用过去完成时had lived。',
        hint: '过去的过去',
      },
      {
        type: 'fill',
        question: 'When I _____ (finish) my homework, I went out to play.',
        fillAnswer: 'had finished',
        explanation: '做完作业后才出去玩，先发生的用过去完成时。',
        hint: '先发生用过去完成时',
      },
      {
        type: 'fill',
        question: 'She _____ (already/leave) by the time I arrived.',
        fillAnswer: 'had already left',
        explanation: '在我到达之前她已经离开，用过去完成时。',
        hint: 'by the time用过去完成时',
      },
    ],
    tips: [
      '过去完成时强调"过去的过去"，即在一个过去动作之前已经完成的动作',
      'after + had done（从句先发生） → 主句用一般过去时',
      'had done + before（主句先发生） → before从句用一般过去时',
      'by the time + 一般过去时 → 主句用过去完成时',
    ],
    relatedLessons: [133, 136],
    difficulty: 'hard',
    keywords: ['过去完成时', 'after', 'before', '时间状语从句'],
  },

  // ==================== 第136课：过去完成时(二)练习 ====================
  136: {
    title: '复习：过去完成时(二)练习',
    subtitle: '过去完成时在时间状语从句中的练习',
    explanation: '通过练习巩固过去完成时在after、before、when引导的时间状语从句中的用法。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '过去完成时在时间从句中的搭配',
          headers: ['句型', '先发生的动作', '后发生的动作', '例句'],
          rows: [
            ['After...', '从句（had done）', '主句（过去时）', 'After he had left, I arrived.'],
            ['Before...', '主句（had done）', '从句（过去时）', 'I had left before he arrived.'],
            ['When...', 'had done', '过去时', 'When I had finished, I left.'],
            [
              'By the time...',
              '主句（had done）',
              '从句（过去时）',
              'By the time I arrived, he had left.',
            ],
          ],
        },
      },
    ],
    rules: [
      'After + had done, 一般过去时',
      'had done + before + 一般过去时',
      'By the time + 一般过去时, had done',
    ],
    examples: [
      {
        english: 'By the time the ambulance arrived, the man had died.',
        chinese: '救护车到达时，那个人已经死了。',
        grammarPoint: 'by the time + had done',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The patient _____ (die) before the doctor arrived.',
        options: ['died', 'had died', 'has died', 'dies'],
        answer: 1,
        explanation: '在医生到达之前病人已经死了，用过去完成时。',
        hint: 'before前的动作先发生',
      },
      {
        type: 'choice',
        question: 'After the guests _____ (leave), we cleaned the house.',
        options: ['left', 'had left', 'have left', 'leave'],
        answer: 1,
        explanation: 'after从句先发生用过去完成时had left。',
        hint: 'after从句用过去完成时',
      },
      {
        type: 'fill',
        question: 'By the time I _____ (reach) the station, the train had gone.',
        fillAnswer: 'reached',
        explanation: 'by the time从句用一般过去时。',
        hint: 'by the time从句用一般过去时',
      },
      {
        type: 'fill',
        question: 'He _____ (learn) 3000 words before he took the exam.',
        fillAnswer: 'had learned',
        explanation: '考试之前已经学了3000个词，用过去完成时。',
        hint: '过去的过去',
      },
    ],
    tips: [
      '过去完成时和一般过去时搭配使用的规律：先发生的用had done，后发生的用一般过去时',
      '有时在一个句子中有三个过去的动作，最早发生的用过去完成时',
      '时间状语by the time, by the end of, until等常与过去完成时搭配',
    ],
    relatedLessons: [135, 137],
    difficulty: 'hard',
    keywords: ['过去完成时', 'by the time', '练习', '时间状语从句'],
  },

  // ==================== 第137课：虚拟语气(一) ====================
  137: {
    title: '虚拟语气(一)',
    subtitle: 'If I were you, I would...',
    explanation:
      '虚拟语气用于表示与现在事实相反的假设。if从句用一般过去时（be动词统一用were），主句用would/could/might + 动词原形。这种句子表达的不是真实情况，而是一种假设。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '与现在事实相反的虚拟语气',
          formula: 'If + 主语 + 一般过去时（be用were）, 主语 + would/could/might + 动词原形',
          examples: [
            'If I were you, I would study harder.',
            'If I had a car, I would drive to work.',
          ],
        },
      },
    ],
    rules: [
      'if从句用一般过去时（be动词不论人称一律用were）',
      '主句用would/could/might + 动词原形',
      '表示与现在事实相反的假设',
      '在正式文体中，if从句中的be动词用were',
      '口语中第一、三人称有时也用was',
    ],
    examples: [
      {
        english: 'If I were you, I would accept the offer.',
        chinese: '如果我是你，我会接受这个提议。',
        grammarPoint: '与现在事实相反',
      },
      {
        english: 'If I had more time, I would learn French.',
        chinese: '如果我有更多时间，我会学法语。',
        grammarPoint: '事实：我没有更多时间',
      },
      {
        english: 'If he were here, he would help us.',
        chinese: '如果他在这里，他会帮助我们。',
        grammarPoint: '事实：他不在这里',
      },
      {
        english: "If it weren't raining, we could go for a walk.",
        chinese: '如果没在下雨，我们就能去散步了。',
        grammarPoint: '事实：正在下雨',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'If I _____ you, I would take the job.',
        options: ['am', 'was', 'were', 'be'],
        answer: 2,
        explanation: '虚拟语气中be动词一律用were。',
        hint: '虚拟语气用were',
      },
      {
        type: 'choice',
        question: 'If she _____ (have) more money, she would buy a bigger house.',
        options: ['has', 'had', 'would have', 'having'],
        answer: 1,
        explanation: '虚拟语气if从句用一般过去时had。',
        hint: 'if从句用一般过去时',
      },
      {
        type: 'fill',
        question: 'If I _____ (be) rich, I would travel around the world.',
        fillAnswer: 'were',
        explanation: '虚拟语气中be动词用were。',
        hint: '虚拟语气用were',
      },
      {
        type: 'fill',
        question: 'If he _____ (know) the answer, he would tell you.',
        fillAnswer: 'knew',
        explanation: '虚拟语气if从句用一般过去时knew。',
        hint: 'if从句用一般过去时',
      },
    ],
    tips: [
      '虚拟语气中be动词一律用were（I were, he were, she were...）',
      'If I were you... 是最常用的虚拟语气句型',
      'would可以换成could或might，语气有所不同',
      '注意区分真实条件句和虚拟条件句',
    ],
    relatedLessons: [138, 139],
    difficulty: 'hard',
    keywords: ['虚拟语气', 'If I were', 'would', '与现在相反'],
  },

  // ==================== 第138课：虚拟语气(一)练习 ====================
  138: {
    title: '复习：虚拟语气(一)练习',
    subtitle: '与现在事实相反的虚拟语气练习',
    explanation:
      '通过练习巩固与现在事实相反的虚拟语气，注意if从句用一般过去时（be用were），主句用would/could/might + 动词原形。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '虚拟语气(一)结构',
          headers: ['从句', '主句', '含义'],
          rows: [
            [
              'If + 主语 + 过去时（were）',
              '主语 + would/could/might + 动词原形',
              '与现在事实相反的假设',
            ],
          ],
        },
      },
    ],
    rules: [
      'if从句：一般过去时（be一律用were）',
      '主句：would/could/might + 动词原形',
      '表示与现在事实相反',
    ],
    examples: [
      {
        english: 'If I were the president, I would change the law.',
        chinese: '如果我是总统，我会改变法律。',
        grammarPoint: '与现在事实相反',
      },
      {
        english: 'If we lived near the sea, we could go swimming every day.',
        chinese: '如果我们住在海边，我们就能每天去游泳。',
        grammarPoint: '事实：我们不住在海边',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'If he _____ (speak) Chinese, he would get the job.',
        options: ['speaks', 'spoke', 'would speak', 'speaking'],
        answer: 1,
        explanation: '虚拟语气if从句用一般过去时spoke。',
        hint: 'if从句用一般过去时',
      },
      {
        type: 'choice',
        question: 'If it _____ (be) sunny, we would go to the beach.',
        options: ['is', 'was', 'were', 'would be'],
        answer: 2,
        explanation: '虚拟语气中be动词用were。',
        hint: '虚拟语气用were',
      },
      {
        type: 'fill',
        question: 'If I _____ (have) a garden, I would grow flowers.',
        fillAnswer: 'had',
        explanation: '虚拟语气if从句用一般过去时had。',
        hint: 'if从句用一般过去时',
      },
      {
        type: 'fill',
        question: 'If they _____ (be) here, they would enjoy the party.',
        fillAnswer: 'were',
        explanation: '虚拟语气中be动词用were。',
        hint: '虚拟语气用were',
      },
    ],
    tips: [
      '虚拟语气中be动词在所有人称后都用were',
      '主句中的would可以换成could（能够）或might（也许）',
      'If I were you是最常见的考试考点',
      '虚拟语气和真实条件句的区别：虚拟语气与事实相反',
    ],
    relatedLessons: [137, 139],
    difficulty: 'hard',
    keywords: ['虚拟语气', 'were', 'would', '练习'],
  },

  // ==================== 第139课：虚拟语气(二) ====================
  139: {
    title: '虚拟语气(二)',
    subtitle: 'If I had known, I would have...',
    explanation:
      '虚拟语气用于表示与过去事实相反的假设。if从句用过去完成时（had + 过去分词），主句用would/could/might + have + 过去分词。这种句子表达的是对过去已发生事情的假设，即"如果当时……，就会……"。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '与过去事实相反的虚拟语气',
          formula: 'If + 主语 + had + 过去分词, 主语 + would/could/might + have + 过去分词',
          examples: [
            'If I had known, I would have helped you.',
            'If she had studied harder, she would have passed.',
          ],
        },
      },
    ],
    rules: [
      'if从句用过去完成时（had + 过去分词）',
      '主句用would/could/might + have + 过去分词',
      '表示与过去事实相反的假设',
      '即"如果当时……，就会……"的意思',
    ],
    examples: [
      {
        english: 'If I had known the truth, I would have told you.',
        chinese: '如果我当时知道真相，我就会告诉你了。',
        grammarPoint: '与过去事实相反',
      },
      {
        english: 'If she had studied harder, she would have passed the exam.',
        chinese: '如果她当时更努力学习，她就通过考试了。',
        grammarPoint: '事实：她没有努力学习',
      },
      {
        english: "If we had left earlier, we wouldn't have missed the train.",
        chinese: '如果我们早点出发，就不会错过火车了。',
        grammarPoint: '事实：我们没有早点出发',
      },
      {
        english: "If he had been more careful, the accident wouldn't have happened.",
        chinese: '如果他更小心些，事故就不会发生了。',
        grammarPoint: '事实：他不够小心',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'If I _____ (know) you were coming, I would have prepared dinner.',
        options: ['knew', 'had known', 'have known', 'know'],
        answer: 1,
        explanation: '与过去事实相反，if从句用过去完成时had known。',
        hint: 'if从句用过去完成时',
      },
      {
        type: 'choice',
        question: 'If she _____ (not be) late, she would have caught the bus.',
        options: ["wasn't", "hadn't been", "wouldn't be", "isn't"],
        answer: 1,
        explanation: "与过去事实相反，if从句用hadn't been。",
        hint: "过去否定用hadn't been",
      },
      {
        type: 'fill',
        question: 'If he _____ (take) my advice, he would have succeeded.',
        fillAnswer: 'had taken',
        explanation: '与过去事实相反，if从句用had taken。',
        hint: 'if从句用过去完成时',
      },
      {
        type: 'fill',
        question: 'If we _____ (not miss) the bus, we would have arrived on time.',
        fillAnswer: "hadn't missed",
        explanation: "与过去事实相反，if从句用hadn't missed。",
        hint: "过去否定用hadn't",
      },
    ],
    tips: [
      '与现在相反：if + 过去时 → would + 动词原形',
      '与过去相反：if + had done → would have done',
      '可以混合使用：If I had studied harder, I would be a doctor now.',
      'would可以换成could或might',
    ],
    relatedLessons: [137, 140],
    difficulty: 'hard',
    keywords: ['虚拟语气', '与过去相反', 'had done', 'would have done'],
  },

  // ==================== 第140课：虚拟语气(二)练习 ====================
  140: {
    title: '复习：虚拟语气(二)练习',
    subtitle: '与过去事实相反的虚拟语气练习',
    explanation:
      '通过练习巩固与过去事实相反的虚拟语气：if + had done → would/could/might have done。',
    visualRules: [
      {
        type: 'comparison',
        content: {
          title: '两种虚拟语气对比',
          items: [
            {
              label: '与现在相反',
              example: 'If I were you, I would go.',
              explanation: 'if + 过去时, would + 动词原形',
            },
            {
              label: '与过去相反',
              example: 'If I had known, I would have gone.',
              explanation: 'if + had done, would have done',
            },
          ],
        },
      },
    ],
    rules: [
      '与现在相反：if + 过去时 → would + 动词原形',
      '与过去相反：if + had done → would have done',
      '关键区别：看假设的是现在还是过去',
    ],
    examples: [
      {
        english: 'If I had been there, I would have helped you.',
        chinese: '如果我当时在场，我就帮你了。',
        grammarPoint: '与过去事实相反',
      },
      {
        english: 'If they had invited me, I would have gone to the party.',
        chinese: '如果他们邀请了我，我就会去参加聚会了。',
        grammarPoint: '事实：他们没有邀请我',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'If he _____ (come) earlier, he would have met her.',
        options: ['came', 'had come', 'has come', 'would come'],
        answer: 1,
        explanation: '与过去事实相反，if从句用had come。',
        hint: 'if从句用过去完成时',
      },
      {
        type: 'choice',
        question: 'If I _____ (be) you, I would have accepted the offer.',
        options: ['am', 'was', 'were', 'had been'],
        answer: 3,
        explanation: '与过去事实相反，用had been。',
        hint: '与过去相反用had been',
      },
      {
        type: 'fill',
        question: "If she _____ (not lose) her key, she wouldn't have been late.",
        fillAnswer: "hadn't lost",
        explanation: "与过去事实相反，if从句用hadn't lost。",
        hint: "过去否定用hadn't",
      },
      {
        type: 'fill',
        question: 'If we _____ (book) the tickets earlier, we would have got better seats.',
        fillAnswer: 'had booked',
        explanation: '与过去事实相反，if从句用had booked。',
        hint: 'if从句用过去完成时',
      },
    ],
    tips: [
      '判断是"与现在相反"还是"与过去相反"是做题的关键',
      '与过去相反的标志：would have done出现在主句中',
      '混合虚拟条件句也很常见：If I had studied medicine, I would be a doctor now.',
    ],
    relatedLessons: [139, 141],
    difficulty: 'hard',
    keywords: ['虚拟语气', '与过去相反', 'had done', 'would have done', '练习'],
  },

  // ==================== 第141课：被动语态(一) ====================
  141: {
    title: '被动语态(一)',
    subtitle: 'The book was written by...',
    explanation:
      '被动语态表示主语是动作的承受者。一般过去时的被动语态结构为was/were + 过去分词，常与by短语搭配，表示动作的执行者。当动作的执行者不重要、不明确或不需提及时，常使用被动语态。',
    visualRules: [
      {
        type: 'formula',
        content: {
          title: '一般过去时被动语态',
          formula: '主语 + was/were + 过去分词 (+ by + 动作执行者)',
          examples: ['The book was written by Lu Xun.', 'The windows were broken by the children.'],
        },
      },
    ],
    rules: [
      '被动语态：be + 过去分词',
      '一般过去时被动：was/were + 过去分词',
      '单数主语用was，复数主语用were',
      'by + 动作执行者（可省略）',
      '主动变被动：宾语变主语，动词变was/were + 过去分词',
    ],
    examples: [
      {
        english: 'The book was written by Lu Xun.',
        chinese: '这本书是鲁迅写的。',
        grammarPoint: 'was written',
      },
      {
        english: 'The window was broken by the boy.',
        chinese: '窗户被那个男孩打破了。',
        grammarPoint: 'was broken',
      },
      {
        english: 'The letters were sent yesterday.',
        chinese: '信件昨天被寄出去了。',
        grammarPoint: 'were sent',
      },
      {
        english: 'The house was built in 1990.',
        chinese: '这栋房子是1990年建的。',
        grammarPoint: 'was built',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The cake _____ made by my mother.',
        options: ['is', 'was', 'were', 'are'],
        answer: 1,
        explanation: 'The cake是单数，用was + made。',
        hint: '单数用was',
      },
      {
        type: 'choice',
        question: 'The students _____ taught by Mr. Smith.',
        options: ['was', 'is', 'were', 'are been'],
        answer: 2,
        explanation: 'The students是复数，用were + taught。',
        hint: '复数用were',
      },
      {
        type: 'fill',
        question: 'The letter _____ (write) by Shakespeare.',
        fillAnswer: 'was written',
        explanation: '单数主语用was + written。',
        hint: '单数用was',
      },
      {
        type: 'fill',
        question: 'The trees _____ (plant) last spring.',
        fillAnswer: 'were planted',
        explanation: '复数主语用were + planted。',
        hint: '复数用were',
      },
    ],
    tips: [
      '被动语态的判断：主语是动作的承受者（被……）',
      'by短语通常可以省略（当执行者不重要或不明确时）',
      '所有时态都有被动语态：am/is/are done（现在），was/were done（过去）',
      '主动句变被动句：宾语→主语，动词→be+过去分词，主语→by+宾格',
    ],
    relatedLessons: [142, 143],
    difficulty: 'medium',
    keywords: ['被动语态', 'was/were + 过去分词', 'by'],
  },

  // ==================== 第142课：被动语态(一)练习 ====================
  142: {
    title: '复习：被动语态(一)练习',
    subtitle: '一般过去时被动语态综合练习',
    explanation: '通过练习巩固一般过去时被动语态的构成和用法，注意was和were的使用。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '主动语态与被动语态',
          headers: ['主动语态', '被动语态', '说明'],
          rows: [
            ['Lu Xun wrote the book.', 'The book was written by Lu Xun.', '宾语变主语'],
            [
              'The children broke the window.',
              'The window was broken by the children.',
              '动词变be+过去分词',
            ],
            ['They built the house in 1990.', 'The house was built in 1990.', '主语变by+宾格'],
          ],
        },
      },
    ],
    rules: [
      '主动句：主语 + 动词 + 宾语',
      '被动句：宾语（变主语）+ was/were + 过去分词 + by + 主语（变宾格）',
      'by短语可省略',
    ],
    examples: [
      {
        english: 'Alexander Bell invented the telephone in 1876.',
        chinese: '（主动）贝尔在1876年发明了电话。',
        grammarPoint: '主动语态',
      },
      {
        english: 'The telephone was invented by Alexander Bell in 1876.',
        chinese: '（被动）电话是贝尔在1876年发明的。',
        grammarPoint: '被动语态',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'This song _____ by Elvis Presley.',
        options: ['sang', 'was sang', 'was sung', 'were sung'],
        answer: 2,
        explanation: 'song是单数，sing的过去分词是sung，用was sung。',
        hint: '注意不规则动词',
      },
      {
        type: 'choice',
        question: 'The books _____ to the library yesterday.',
        options: ['was returned', 'were returned', 'are returned', 'returned'],
        answer: 1,
        explanation: 'books是复数，用were returned。',
        hint: '复数用were',
      },
      {
        type: 'fill',
        question: 'The bridge _____ (build) two hundred years ago.',
        fillAnswer: 'was built',
        explanation: 'bridge是单数，用was built。',
        hint: '单数用was',
      },
      {
        type: 'fill',
        question: 'These photos _____ (take) during our trip to Japan.',
        fillAnswer: 'were taken',
        explanation: 'photos是复数，用were taken。',
        hint: '复数用were',
      },
    ],
    tips: [
      '注意不规则过去分词：write→written, break→broken, take→taken, build→built',
      'by + 动作执行者在不重要时可以省略',
      '有些动词没有被动语态：happen, take place等不及物动词',
      '主动句的宾语变被动句的主语',
    ],
    relatedLessons: [141, 143],
    difficulty: 'medium',
    keywords: ['被动语态', 'was/were done', '主动变被动', '练习'],
  },

  // ==================== 第143课：被动语态(二) ====================
  143: {
    title: '被动语态(二)',
    subtitle: 'The work has been finished.',
    explanation:
      '被动语态可以用于各种时态。现在完成时被动语态：has/have been + 过去分词。一般将来时被动语态：will be + 过去分词。情态动词被动语态：can/must/may be + 过去分词。本课综合复习各种被动语态形式。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '各种时态的被动语态',
          headers: ['时态', '结构', '例句'],
          rows: [
            ['一般现在时', 'am/is/are + done', 'English is spoken here.'],
            ['一般过去时', 'was/were + done', 'The book was written in 1990.'],
            ['现在完成时', 'has/have been + done', 'The work has been finished.'],
            ['一般将来时', 'will be + done', 'The meeting will be held tomorrow.'],
            ['情态动词', 'can/must/may be + done', 'It can be done easily.'],
          ],
        },
      },
    ],
    rules: [
      '现在完成时被动：has/have been + 过去分词',
      '一般将来时被动：will be + 过去分词',
      '情态动词被动：情态动词 + be + 过去分词',
      '进行时被动：be + being + 过去分词',
      '被动语态在各种时态中的核心结构：be + 过去分词',
    ],
    examples: [
      {
        english: 'The work has been finished.',
        chinese: '工作已经被完成了。',
        grammarPoint: '现在完成时被动',
      },
      {
        english: 'The road is being repaired.',
        chinese: '这条路正在被修。',
        grammarPoint: '现在进行时被动',
      },
      {
        english: 'The meeting will be held next Monday.',
        chinese: '会议将于下周一举行。',
        grammarPoint: '一般将来时被动',
      },
      {
        english: 'This must be done at once.',
        chinese: '这件事必须马上做。',
        grammarPoint: '情态动词被动',
      },
      {
        english: 'The new school has been built.',
        chinese: '新学校已经建好了。',
        grammarPoint: '现在完成时被动',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'The homework _____ already _____ by the students.',
        options: ['has...finished', 'has...been finished', 'have...been finished', 'is...finished'],
        answer: 1,
        explanation: 'homework是不可数名词（单数），用has been finished。',
        hint: '现在完成时被动',
      },
      {
        type: 'choice',
        question: 'The new hospital _____ next year.',
        options: ['will build', 'will be built', 'is built', 'was built'],
        answer: 1,
        explanation: 'next year表将来，用will be built。',
        hint: '一般将来时被动',
      },
      {
        type: 'fill',
        question: 'English _____ (speak) in many countries around the world.',
        fillAnswer: 'is spoken',
        explanation: '一般现在时被动：is spoken。',
        hint: '一般现在时被动',
      },
      {
        type: 'fill',
        question: 'The problem _____ (solve) by the engineer already.',
        fillAnswer: 'has been solved',
        explanation: '现在完成时被动：has been solved。',
        hint: '现在完成时被动',
      },
    ],
    tips: [
      '所有被动语态的核心：be + 过去分词',
      '不同时态变化的是be动词的形式：is/was/has been/will be等',
      '被动语态常用于正式文体和科技文章',
      '注意：只有及物动词才有被动语态',
    ],
    relatedLessons: [141, 144],
    difficulty: 'hard',
    keywords: ['被动语态', 'has been done', 'will be done', '各种时态'],
  },

  // ==================== 第144课：被动语态(二)练习 + 第一册总复习 ====================
  144: {
    title: '复习：被动语态(二)练习 + 第一册总复习',
    subtitle: '被动语态综合练习 + 全册语法总复习',
    explanation:
      '本课是新概念英语第一册的最后一课，包含被动语态各种时态的综合练习，以及第一册所有语法点的总结复习。掌握这些基础语法，将为第二册的学习打下坚实的基础。',
    visualRules: [
      {
        type: 'table',
        content: {
          title: '第一册重点语法总结',
          headers: ['语法点', '结构', '例句'],
          rows: [
            ['be动词', 'am/is/are/was/were', 'I am a student.'],
            ['一般现在时', '动词原形/三单加s', 'He works hard.'],
            ['现在进行时', 'be + doing', 'She is reading.'],
            ['一般过去时', '动词过去式', 'He went home.'],
            ['现在完成时', 'have/has + 过去分词', 'I have finished.'],
            ['一般将来时', 'will/be going to + 动词原形', 'I will go.'],
            ['比较级/最高级', '-er/-est, more/most', 'He is taller.'],
            ['情态动词', 'can/must/may + 动词原形', 'You must go.'],
            ['被动语态', 'be + 过去分词', 'It was written.'],
            ['虚拟语气', 'if + 过去时/had done', 'If I were you...'],
            ['定语从句', 'who/which/that + 从句', 'The man who came...'],
            ['过去完成时', 'had + 过去分词', 'He had left.'],
          ],
        },
      },
    ],
    rules: [
      '被动语态各种时态：be + 过去分词（be的形式随时态变化）',
      '第一册语法核心：时态（8种）、被动语态、虚拟语气、定语从句',
      '比较级用于两者比较，最高级用于三者以上比较',
      '虚拟语气分与现在相反和与过去相反两种',
      '定语从句的关系代词选择取决于先行词是人还是物',
    ],
    examples: [
      {
        english: 'These letters have been typed.',
        chinese: '这些信已经被打字了。',
        grammarPoint: '现在完成时被动',
      },
      {
        english: 'The thieves have been caught by the police.',
        chinese: '小偷已经被警察抓住了。',
        grammarPoint: '现在完成时被动',
      },
      {
        english: 'The report will be completed by tomorrow.',
        chinese: '报告将在明天之前完成。',
        grammarPoint: '一般将来时被动',
      },
      {
        english: 'If I had known, I would have helped.',
        chinese: '如果我当时知道，我就帮了。',
        grammarPoint: '与过去相反的虚拟语气',
      },
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Many trees _____ every year on Tree Planting Day.',
        options: ['plant', 'planted', 'are planted', 'were planted'],
        answer: 2,
        explanation: 'every year表示一般现在时，trees是复数，用are planted。',
        hint: '一般现在时被动',
      },
      {
        type: 'choice',
        question: 'The thief _____ by the police yesterday.',
        options: ['catches', 'caught', 'was caught', 'has been caught'],
        answer: 2,
        explanation: 'yesterday表过去，用was caught。',
        hint: '一般过去时被动',
      },
      {
        type: 'fill',
        question: 'The meeting _____ (cancel) because of the rain.',
        fillAnswer: 'has been cancelled',
        explanation: '现在完成时被动：has been cancelled。',
        hint: '现在完成时被动',
      },
      {
        type: 'fill',
        question: 'If I _____ (be) you, I would apologize.',
        fillAnswer: 'were',
        explanation: '虚拟语气中be动词用were。',
        hint: '虚拟语气用were',
      },
      {
        type: 'choice',
        question: 'This is the best film _____ I have ever seen.',
        options: ['who', 'which', 'that', 'what'],
        answer: 2,
        explanation: '先行词被最高级best修饰时，只能用that。',
        hint: '最高级修饰用that',
      },
    ],
    tips: [
      '恭喜你完成新概念英语第一册的学习！',
      '建议复习时按语法专题分类：时态、语态、从句、语气等',
      '重点掌握8种时态的被动语态形式',
      '虚拟语气是难点，多练习与现在和过去相反的句型',
      '定语从句是英语写作的基础，多读多练',
    ],
    relatedLessons: [143, 109],
    difficulty: 'hard',
    keywords: ['被动语态', '总复习', '第一册', '综合练习', 'all'],
  },
};
