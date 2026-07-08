import { GrammarExercise } from '../../types/lesson';

// 补充练习题映射：lessonId -> 额外的练习题数组
const grammarExtraExercises: Record<number, GrammarExercise[]> = {
  // 第1课：be动词肯定式 (I am, You are, He is)
  1: [
    {
      type: 'match',
      question: '将人称代词与对应的be动词配对',
      matchPairs: [
        { left: 'I', right: 'am' },
        { left: 'You', right: 'are' },
        { left: 'He', right: 'is' },
        { left: 'She', right: 'is' },
      ],
      explanation: '第一人称单数用am，第二人称用are，第三人称单数用is。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['I', 'am', 'a', 'student'],
      hint: '句子以I开头',
      explanation: 'I am a student.（我是一名学生。）I 后面用 am。',
    },
    {
      type: 'choice',
      question: '选择正确的be动词填空：She ___ a teacher.',
      options: ['am', 'is', 'are', 'be'],
      answer: 1,
      explanation: 'She 是第三人称单数，所以用 is。',
    },
    {
      type: 'fill',
      question: '用am、is或are填空：They ___ students.',
      fillAnswer: 'are',
      explanation: 'They 是复数人称代词，后面用 are。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['He', 'is', 'a', 'doctor'],
      hint: '句子以He开头',
      explanation: 'He is a doctor.（他是一名医生。）He 后面用 is。',
    },
  ],

  // 第2课：be动词一般疑问句 (Is this...? Are you...?)
  2: [
    {
      type: 'match',
      question: '将问句与答句配对',
      matchPairs: [
        { left: 'Is this your pen?', right: 'Yes, it is.' },
        { left: 'Are you a student?', right: 'Yes, I am.' },
        { left: 'Is he a teacher?', right: "No, he isn't." },
        { left: 'Is she Chinese?', right: "No, she isn't." },
      ],
      explanation: '一般疑问句用Yes或No来回答，注意主语和be动词的搭配。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的疑问句',
      correctOrder: ['Is', 'this', 'your', 'handbag'],
      hint: '疑问句以Is开头',
      explanation: 'Is this your handbag?（这是你的手提包吗？）一般疑问句将is提前。',
    },
    {
      type: 'choice',
      question: '选择正确的回答：Is this your book? — ___',
      options: ['Yes, it is.', 'Yes, it are.', 'Yes, this is.', 'Yes, I am.'],
      answer: 0,
      explanation: '回答一般疑问句时，用 Yes/No + 主语 + be动词。this 在回答中用 it 代替。',
    },
    {
      type: 'fill',
      question: '填入正确的be动词：___ this your coat?',
      fillAnswer: 'Is',
      explanation: 'this 是第三人称单数，一般疑问句把 Is 提到句首。',
    },
  ],

  // 第3课：be动词否定式 (I am not, He is not)
  3: [
    {
      type: 'match',
      question: '将肯定句与对应的否定句配对',
      matchPairs: [
        { left: 'I am a student.', right: 'I am not a student.' },
        { left: 'He is Italian.', right: 'He is not Italian.' },
        { left: 'It is my umbrella.', right: 'It is not my umbrella.' },
        { left: 'You are late.', right: 'You are not late.' },
      ],
      explanation: "否定句在be动词后面加 not，缩写形式：isn't, aren't。",
    },
    {
      type: 'order',
      question: '将单词排列成正确的否定句',
      correctOrder: ['I', 'am', 'not', 'a', 'teacher'],
      hint: '否定句在am后面加not',
      explanation: 'I am not a teacher.（我不是老师。）在am后面加not构成否定。',
    },
    {
      type: 'choice',
      question: '选择正确的否定句：He is French.',
      options: [
        'He is not French.',
        'He not is French.',
        'He am not French.',
        'He are not French.',
      ],
      answer: 0,
      explanation: "否定句在 is 后面加 not：He is not French. 也可以说 He isn't French.",
    },
    {
      type: 'fill',
      question: '将句子改为否定句：She is a nurse. → She ___ a nurse.',
      fillAnswer: 'is not',
      explanation: "在 is 后面加 not 构成否定句，也可以说 isn't。",
    },
    {
      type: 'order',
      question: '将单词排列成正确的否定句',
      correctOrder: ['It', 'is', 'not', 'my', 'ticket'],
      hint: '否定句在is后面加not',
      explanation: "It is not my ticket.（这不是我的票。）也可以说 It isn't my ticket.",
    },
  ],

  // 第4课：名词单复数 (a pen -> pens)
  4: [
    {
      type: 'match',
      question: '将名词的单数形式与复数形式配对',
      matchPairs: [
        { left: 'dress', right: 'dresses' },
        { left: 'coat', right: 'coats' },
        { left: 'shirt', right: 'shirts' },
        { left: 'watch', right: 'watches' },
      ],
      explanation: '一般名词加-s变复数；以-s, -sh, -ch, -x结尾的加-es。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['My', 'shirts', 'are', 'white'],
      hint: '句子以My开头，描述颜色',
      explanation: 'My shirts are white.（我的衬衫是白色的。）shirts是复数，用are。',
    },
    {
      type: 'choice',
      question: '选出正确的复数形式：book → ___',
      options: ['books', 'bookes', 'bookies', 'booken'],
      answer: 0,
      explanation: '以辅音字母加k结尾的名词，直接加-s变为复数。',
    },
    {
      type: 'fill',
      question: '写出名词的复数形式：a dress → two ___',
      fillAnswer: 'dresses',
      explanation: '以-s结尾的名词，加-es变为复数。dress → dresses。',
    },
    {
      type: 'choice',
      question: '下面哪个名词的复数形式是不规则变化？',
      options: ['shirt', 'coat', 'watch', 'dress'],
      answer: 2,
      explanation:
        'watch 以-ch 结尾，需要加 -es 变为 watches，属于特殊变化规则。其他三个词中，dress 也加-es，但 watch 的变化更需要注意。',
    },
  ],

  // 第5课：特殊疑问句What (What's your name?)
  5: [
    {
      type: 'match',
      question: '将疑问词与对应的问题类型配对',
      matchPairs: [
        { left: 'What', right: '问事物/东西' },
        { left: 'How', right: '问方式/状况' },
        { left: 'Who', right: '问人' },
        { left: 'Where', right: '问地点' },
      ],
      explanation:
        '不同的疑问词用于提问不同类型的信息：What问什么，How问怎样，Who问谁，Where问哪里。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['What', 'is', 'your', 'name'],
      hint: '问名字用What',
      explanation: "What is your name?（你叫什么名字？）What's 是 What is 的缩写。",
    },
    {
      type: 'choice',
      question: "选择正确的回答：What's your name? — ___",
      options: ['My name is Tom.', 'I am fine.', 'Yes, I am.', 'I am a student.'],
      answer: 0,
      explanation: "What's your name? 是问名字，应该回答 My name is...",
    },
    {
      type: 'fill',
      question: '用What或How填空：___ is your name?',
      fillAnswer: 'What',
      explanation: "问名字用 What's your name?（你叫什么名字？）",
    },
  ],

  // 第6课：特殊疑问句What/What colour (What colour is it?)
  6: [
    {
      type: 'match',
      question: '将颜色单词与中文意思配对',
      matchPairs: [
        { left: 'red', right: '红色' },
        { left: 'blue', right: '蓝色' },
        { left: 'green', right: '绿色' },
        { left: 'yellow', right: '黄色' },
      ],
      explanation: '这是几种常见的英语颜色单词：red红，blue蓝，green绿，yellow黄。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['What', 'colour', 'is', 'your', 'car'],
      hint: '问颜色用What colour',
      explanation: 'What colour is your car?（你的车是什么颜色的？）',
    },
    {
      type: 'choice',
      question: '选择正确答案：What colour is the sky? — It is ___.',
      options: ['blue', 'book', 'big', 'boy'],
      answer: 0,
      explanation: '天空是蓝色的，所以回答 It is blue.（它是蓝色的。）',
    },
    {
      type: 'fill',
      question: '根据提示回答：What colour is your pen?（绿色）→ It is ___.',
      fillAnswer: 'green',
      explanation: '绿色的英文是 green。回答：It is green.',
    },
    {
      type: 'transform',
      question: '将句子改为特殊疑问句：It is red.（对颜色提问）',
      answer: 'What colour is it?',
      explanation: '对颜色提问用 What colour，然后将 is 提前：What colour is it?',
    },
  ],

  // 第7课：国籍与语言 (Are you French?)
  7: [
    {
      type: 'match',
      question: '将国家与对应的国籍/语言配对',
      matchPairs: [
        { left: 'France', right: 'French' },
        { left: 'Germany', right: 'German' },
        { left: 'Japan', right: 'Japanese' },
        { left: 'China', right: 'Chinese' },
      ],
      explanation:
        'France法国→French法语/法国的，Germany德国→German德语/德国的，Japan日本→Japanese日语/日本的，China中国→Chinese中文/中国的。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['Are', 'you', 'French'],
      hint: '疑问句以Are开头',
      explanation: 'Are you French?（你是法国人吗？）',
    },
    {
      type: 'choice',
      question: 'He is from Germany. He is ___.',
      options: ['German', 'France', 'Japanese', 'Korea'],
      answer: 0,
      explanation: '来自德国（Germany）的人是德国人（German）。',
    },
    {
      type: 'fill',
      question: 'She is from Japan. She is ___.',
      fillAnswer: 'Japanese',
      explanation: '来自日本（Japan）的人是日本人（Japanese）。',
    },
  ],

  // 第8课：人称代词与物主代词 (my, your, his, her)
  8: [
    {
      type: 'match',
      question: '将人称代词与对应的物主代词配对',
      matchPairs: [
        { left: 'I', right: 'my' },
        { left: 'you', right: 'your' },
        { left: 'he', right: 'his' },
        { left: 'she', right: 'her' },
      ],
      explanation: 'I→my（我的），you→your（你的），he→his（他的），she→her（她的）。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['This', 'is', 'my', 'shirt'],
      hint: '句子以This开头',
      explanation: 'This is my shirt.（这是我的衬衫。）my 是"我的"。',
    },
    {
      type: 'choice',
      question: 'This is Mary. ___ dress is new.',
      options: ['His', 'Her', 'My', 'Your'],
      answer: 1,
      explanation: 'Mary 是女性名字，用 her 表示"她的"。',
    },
    {
      type: 'fill',
      question: 'Tom is a boy. ___ car is black.',
      fillAnswer: 'His',
      explanation: 'Tom 是男孩，用 His 表示"他的"。',
    },
    {
      type: 'transform',
      question: "用 her 替换划线部分：This is <Mary>'s umbrella.",
      answer: 'This is her umbrella.',
      explanation: 'Mary 是女性，用 her 替代名词所有格。',
    },
  ],

  // 第9课：How与形容词 (How are you today?)
  9: [
    {
      type: 'match',
      question: '将形容词与反义词配对',
      matchPairs: [
        { left: 'fine', right: 'bad' },
        { left: 'fat', right: 'thin' },
        { left: 'tall', right: 'short' },
        { left: 'hot', right: 'cold' },
      ],
      explanation: 'fine好的↔bad坏的，fat胖的↔thin瘦的，tall高的↔short矮的，hot热的↔cold冷的。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['How', 'are', 'you', 'today'],
      hint: '问候别人用How',
      explanation: 'How are you today?（你今天怎么样？）',
    },
    {
      type: 'choice',
      question: 'How are you today? — I am ___.',
      options: ['fine', 'five', 'name', 'student'],
      answer: 0,
      explanation: 'How are you? 是问身体/状态如何，回答用 fine（好的）。',
    },
    {
      type: 'fill',
      question: '根据中文提示填空：他今天很好。He is ___ today.',
      fillAnswer: 'fine',
      explanation: 'fine 意思是"好的、健康的"。He is fine today.',
    },
  ],

  // 第10课：Look at与形容词 (Look at that man. He is fat.)
  10: [
    {
      type: 'match',
      question: '将形容词与中文意思配对',
      matchPairs: [
        { left: 'fat', right: '胖的' },
        { left: 'thin', right: '瘦的' },
        { left: 'tall', right: '高的' },
        { left: 'short', right: '矮的' },
      ],
      explanation: 'fat胖的，thin瘦的，tall高的，short矮的。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['Look', 'at', 'that', 'man'],
      hint: '句子以Look at开头',
      explanation: 'Look at that man.（看那个男人。）Look at 表示"看……"。',
    },
    {
      type: 'choice',
      question: 'The man is very tall. He is ___.',
      options: ['short', 'thin', 'fat', 'tall'],
      answer: 3,
      explanation: 'very tall 表示"非常高"，所以选 tall。',
    },
    {
      type: 'fill',
      question: 'She is very ___. She is not fat.（瘦的）',
      fillAnswer: 'thin',
      explanation: 'thin 是"瘦的"，是 fat（胖的）的反义词。',
    },
  ],

  // 第11课：Whose疑问句 (Whose shirt is that?)
  11: [
    {
      type: 'match',
      question: '将物品与对应的回答配对',
      matchPairs: [
        { left: 'Whose pen is this?', right: "It's my pen." },
        { left: 'Whose book is that?', right: "It's his book." },
        { left: 'Whose dress is this?', right: "It's her dress." },
        { left: 'Whose car is that?', right: "It's our car." },
      ],
      explanation: 'Whose 意思是"谁的"，用来询问物品的所有者。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['Whose', 'shirt', 'is', 'that'],
      hint: '疑问句以Whose开头',
      explanation: 'Whose shirt is that?（那是谁的衬衫？）',
    },
    {
      type: 'choice',
      question: "___ pencil is this? — It is Tim's.",
      options: ['Whose', 'What', 'How', 'Where'],
      answer: 0,
      explanation: '询问物品属于谁，用 Whose（谁的）。',
    },
    {
      type: 'fill',
      question: "This is Lucy's bag.（对Lucy's提问）___ bag is this?",
      fillAnswer: 'Whose',
      explanation: '对所有格提问用 Whose。Whose bag is this?（这是谁的包？）',
    },
    {
      type: 'transform',
      question: "对划线部分提问：This is <Tom's> pen.",
      answer: 'Whose pen is this?',
      explanation: '对所有格提问用 Whose，然后改变句子结构：Whose pen is this?',
    },
  ],

  // 第12课：名词性物主代词 (It's my shirt. -> It's mine.)
  12: [
    {
      type: 'match',
      question: '将形容词性物主代词与名词性物主代词配对',
      matchPairs: [
        { left: 'my', right: 'mine' },
        { left: 'your', right: 'yours' },
        { left: 'his', right: 'his' },
        { left: 'her', right: 'hers' },
      ],
      explanation:
        'my→mine（我的），your→yours（你的），his→his（他的），her→hers（她的）。名词性物主代词可单独使用。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['This', 'is', 'my', 'book.', 'That', 'is', 'yours'],
      hint: '先说"这是我的书"，再说"那是你的"',
      explanation: 'This is my book. That is yours.（这是我的书。那是你的。）',
    },
    {
      type: 'choice',
      question: 'This is not my pen. It is ___.',
      options: ['him', 'his', 'he', 'her'],
      answer: 1,
      explanation: '这里需要名词性物主代词，his 可以独立使用，表示"他的（钢笔）"。',
    },
    {
      type: 'fill',
      question: 'This is her dress. = This dress is ___.',
      fillAnswer: 'hers',
      explanation: 'her 的名词性物主代词是 hers，可以单独使用。',
    },
    {
      type: 'transform',
      question: '将句子改写：This is my book.（用mine改写）',
      answer: 'This book is mine.',
      explanation:
        'my 是形容词性物主代词，mine 是名词性物主代词。This is my book. → This book is mine.',
    },
  ],

  // 第13课：What colour疑问句 (What colour's your new dress?)
  13: [
    {
      type: 'match',
      question: '将物品描述与对应的颜色配对',
      matchPairs: [
        { left: 'a banana', right: 'yellow' },
        { left: 'the sky', right: 'blue' },
        { left: 'grass', right: 'green' },
        { left: 'snow', right: 'white' },
      ],
      explanation: '香蕉是yellow黄色的，天空是blue蓝色的，草地是green绿色的，雪是white白色的。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['What', 'colour', 'is', 'your', 'new', 'dress'],
      hint: '问颜色用What colour',
      explanation: 'What colour is your new dress?（你的新裙子是什么颜色的？）',
    },
    {
      type: 'choice',
      question: 'What colour is the apple? — It is ___.',
      options: ['red', 'read', 'ride', 'road'],
      answer: 0,
      explanation: '苹果通常是红色的，red 意思是"红色"。',
    },
    {
      type: 'fill',
      question: 'The orange is ___.（橙色的）',
      fillAnswer: 'orange',
      explanation: 'orange 既是"橙子"，也是"橙色的"。',
    },
  ],

  // 第14课：祈使句 (Come and see it.)
  14: [
    {
      type: 'match',
      question: '将祈使句与中文意思配对',
      matchPairs: [
        { left: 'Come in!', right: '请进来！' },
        { left: 'Sit down!', right: '请坐下！' },
        { left: 'Stand up!', right: '请起立！' },
        { left: 'Open the door!', right: '请开门！' },
      ],
      explanation: '祈使句以动词原形开头，用于表达命令、请求或建议。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['Come', 'and', 'see', 'it'],
      hint: '祈使句以动词开头',
      explanation: 'Come and see it.（来看看它。）Come and... 表示"来……"。',
    },
    {
      type: 'choice',
      question: '选出正确的祈使句：',
      options: [
        'Open the window, please.',
        'Opening the window, please.',
        'Opens the window, please.',
        'To open the window, please.',
      ],
      answer: 0,
      explanation: '祈使句用动词原形开头。open 是原形，表示请求。',
    },
    {
      type: 'fill',
      question: '___ down, please.（请坐下）',
      fillAnswer: 'Sit',
      explanation: 'Sit down.（坐下。）祈使句以动词原形开头。',
    },
  ],

  // 第15课：国籍复数 (Are you Danish?)
  15: [
    {
      type: 'match',
      question: '将国家与对应的国籍形容词配对',
      matchPairs: [
        { left: 'Denmark', right: 'Danish' },
        { left: 'England', right: 'English' },
        { left: 'Sweden', right: 'Swedish' },
        { left: 'America', right: 'American' },
      ],
      explanation:
        'Denmark丹麦→Danish丹麦的，England英格兰→English英国的，Sweden瑞典→Swedish瑞典的，America美国→American美国的。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['Are', 'you', 'Danish'],
      hint: '问国籍用Are you...',
      explanation: 'Are you Danish?（你是丹麦人吗？）',
    },
    {
      type: 'choice',
      question: 'They are from England. They are ___.',
      options: ['English', 'Danish', 'French', 'German'],
      answer: 0,
      explanation: '来自英格兰（England）的人是英国人（English）。',
    },
    {
      type: 'fill',
      question: 'We are from America. We are ___.',
      fillAnswer: 'American',
      explanation: '来自美国（America）的人是美国人（American）。',
    },
    {
      type: 'transform',
      question: '将句子变为复数：He is Danish.',
      answer: 'They are Danish.',
      explanation: 'He is Danish. → They are Danish. 人称变为复数they，is变为are。',
    },
  ],

  // 第16课：职业与国籍 (What are their jobs?)
  16: [
    {
      type: 'match',
      question: '将职业单词与中文意思配对',
      matchPairs: [
        { left: 'policeman', right: '警察' },
        { left: 'nurse', right: '护士' },
        { left: 'mechanic', right: '机械师' },
        { left: 'hairdresser', right: '理发师' },
      ],
      explanation: 'policeman警察，nurse护士，mechanic机械师，hairdresser理发师。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['What', 'are', 'your', 'jobs'],
      hint: '问职业用What... jobs',
      explanation: 'What are your jobs?（你们是做什么工作的？）jobs 是复数形式。',
    },
    {
      type: 'choice',
      question: 'She works in a hospital. She is a ___.',
      options: ['nurse', 'mechanic', 'teacher', 'policeman'],
      answer: 0,
      explanation: '在医院工作的人，通常是护士（nurse）。',
    },
    {
      type: 'fill',
      question: 'He repairs cars. He is a ___.',
      fillAnswer: 'mechanic',
      explanation: '修理汽车的人是机械师（mechanic）。',
    },
  ],

  // 第17课：Come and meet... (介绍某人)
  17: [
    {
      type: 'match',
      question: '将句子与对应的场景配对',
      matchPairs: [
        { left: 'Come and meet our employees.', right: '介绍员工' },
        { left: 'This is my friend.', right: '介绍朋友' },
        { left: 'How do you do?', right: '初次见面' },
        { left: 'Nice to meet you.', right: '很高兴认识你' },
      ],
      explanation: '不同的社交场合使用不同的表达方式。Come and meet... 用于介绍某人。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['Come', 'and', 'meet', 'our', 'teacher'],
      hint: '介绍某人用Come and meet',
      explanation: 'Come and meet our teacher.（来见见我们的老师。）',
    },
    {
      type: 'choice',
      question: '当你想把朋友介绍给别人时，你可以说：',
      options: [
        'Come and meet my friend.',
        'Go and meet my friend.',
        'Look at my friend.',
        'This my friend.',
      ],
      answer: 0,
      explanation: '介绍某人用 Come and meet...（来见见……）。',
    },
    {
      type: 'fill',
      question: 'A: Come and meet my sister. B: How do you ___?',
      fillAnswer: 'do',
      explanation: '初次见面用 How do you do?（你好！）这是正式的问候方式。',
    },
  ],

  // 第18课：形容词复习 (They are hard-working.)
  18: [
    {
      type: 'match',
      question: '将形容词与反义词配对',
      matchPairs: [
        { left: 'hard-working', right: 'lazy' },
        { left: 'clean', right: 'dirty' },
        { left: 'busy', right: 'free' },
        { left: 'hot', right: 'cold' },
      ],
      explanation:
        'hard-working勤劳的↔lazy懒惰的，clean干净的↔dirty脏的，busy忙的↔free空闲的，hot热的↔cold冷的。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['They', 'are', 'very', 'hard-working'],
      hint: '描述人的特征用形容词',
      explanation: 'They are very hard-working.（他们非常勤劳。）',
    },
    {
      type: 'choice',
      question: 'The office is very ___. It is not dirty.',
      options: ['clean', 'busy', 'lazy', 'cold'],
      answer: 0,
      explanation: 'not dirty（不脏）= clean（干净的）。',
    },
    {
      type: 'fill',
      question: 'He does nothing every day. He is ___.',
      fillAnswer: 'lazy',
      explanation: '每天什么都不做说明很懒，lazy 意思是"懒惰的"。',
    },
    {
      type: 'transform',
      question: '将句子变为否定句：She is busy.',
      answer: 'She is not busy.',
      explanation: "在 is 后面加 not 构成否定：She is not busy. 也可以说 She isn't busy.",
    },
  ],

  // 第19课：There is句型 (There is a refrigerator.)
  19: [
    {
      type: 'match',
      question: '将There is句子与中文意思配对',
      matchPairs: [
        { left: 'There is a book on the desk.', right: '桌子上有一本书。' },
        { left: 'There is a cat under the table.', right: '桌子下面有一只猫。' },
        { left: 'There is a clock on the wall.', right: '墙上有一个钟。' },
        { left: 'There is a cup on the table.', right: '桌上有一个杯子。' },
      ],
      explanation: 'There is + 单数名词 + 地点，表示"某处有某物"。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['There', 'is', 'a', 'refrigerator', 'in', 'the', 'kitchen'],
      hint: '句子以There is开头',
      explanation: 'There is a refrigerator in the kitchen.（厨房里有一个冰箱。）',
    },
    {
      type: 'choice',
      question: '___ a pencil on the desk.',
      options: ['There is', 'There are', 'It is', 'It has'],
      answer: 0,
      explanation:
        'a pencil 是单数，用 There is。There is a pencil on the desk.（桌上有一支铅笔。）',
    },
    {
      type: 'fill',
      question: 'There ___ a picture on the wall.',
      fillAnswer: 'is',
      explanation: 'a picture 是单数名词，所以用 There is。',
    },
    {
      type: 'transform',
      question: '将句子改为否定句：There is a book on the desk.',
      answer: 'There is not a book on the desk.',
      explanation:
        "在 is 后加 not 构成否定：There is not a book on the desk. 也可以说 There isn't a book on the desk.",
    },
  ],

  // 第20课：There are句型与复数 (There are some books.)
  20: [
    {
      type: 'match',
      question: '将There be句型与对应的情况配对',
      matchPairs: [
        { left: 'There is a book.', right: '单数' },
        { left: 'There are some books.', right: '复数' },
        { left: 'There is some water.', right: '不可数名词' },
        { left: 'There are five pens.', right: '数量词+复数' },
      ],
      explanation: 'There is 后接单数名词或不可数名词；There are 后接复数名词。',
    },
    {
      type: 'order',
      question: '将单词排列成正确的句子',
      correctOrder: ['There', 'are', 'some', 'books', 'on', 'the', 'shelf'],
      hint: '复数名词用There are',
      explanation: 'There are some books on the shelf.（书架上有一些书。）',
    },
    {
      type: 'choice',
      question: '___ some apples in the basket.',
      options: ['There is', 'There are', 'It is', 'They are'],
      answer: 1,
      explanation: 'some apples 是复数，用 There are。',
    },
    {
      type: 'fill',
      question: 'There ___ some milk in the glass.（不可数名词用is/are）',
      fillAnswer: 'is',
      explanation: 'milk（牛奶）是不可数名词，用 There is。',
    },
    {
      type: 'transform',
      question: '将句子变为疑问句：There are some chairs in the room.',
      answer: 'Are there any chairs in the room?',
      explanation:
        'There are 变疑问句把 Are 提前，some 变为 any：Are there any chairs in the room?',
    },
    {
      type: 'choice',
      question: '选择正确答案：There ___ a lot of people at the party.',
      options: ['is', 'are', 'am', 'be'],
      answer: 1,
      explanation: 'a lot of people（很多人）是复数概念，用 There are。',
    },
  ],
};

export default grammarExtraExercises;
