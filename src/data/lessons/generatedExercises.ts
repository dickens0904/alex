/**
 * 自动生成的练习题数据（优化版）
 * 由 scripts/generate-exercises.js 生成
 *
 * 优化特性：
 * - 难度递进：Level 1-4 随课程递增
 * - 跨课复习：复习课包含前几课词汇
 * - 干扰项扩展：本课单词不够时从前几课补充
 * - 阅读题增加：长课文可生成多道阅读理解
 *
 * 共 144 课, 1711 道练习题
 * 生成时间: 2026-06-10T13:18:35.595Z
 */

import type { Exercise } from '../../types/lesson';

export const exercisesMap: Record<number, Exercise[]> = {
  // Lesson 1: Lesson 1: Excuse me! 对不起！ (Level 1)
  1: [
    {
      type: 'listening',
      content: {
        question: '听录音，"pencil" 的意思是？',
        audioText: 'pencil',
        options: ['大衣', '连衣裙', '书', '铅笔'],
      },
      answer: '铅笔',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"pen" 的意思是？',
        audioText: 'pen',
        options: ['你，你们', '裙子', '你的，你们的', '钢笔'],
      },
      answer: '钢笔',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Excuse me!',
        translation: '对不起！',
      },
      answer: 'Excuse me!',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, it is.',
        translation: '是的，是我的。',
      },
      answer: 'Yes, it is.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/kɑː/',
        meaning: '小汽车',
        example: 'This is my car.',
      },
      answer: 'car',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/dres/',
        meaning: '连衣裙',
        example: 'This is my dress.',
      },
      answer: 'dress',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ it is.',
        translation: '是的，是我的。',
        options: ['Much', 'Yes', 'Your', 'Coat'],
      },
      answer: 'Yes',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______',
        translation: '什么事？',
        options: ['Yes', 'Shirt', 'Pen', 'Me'],
      },
      answer: 'Yes',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, it is." 的正确翻译是？',
        passage: 'Excuse me!',
        options: ['这是您的手提包吗？', '非常感谢。', '什么事？', '是的，是我的。'],
      },
      answer: '是的，是我的。',
      score: 10,
    },
  ],

  // Lesson 2: Lesson 2: Is this your...? 这是你的……吗？ (Level 1)
  2: [
    {
      type: 'listening',
      content: {
        question: '听录音，"book" 的意思是？',
        audioText: 'book',
        options: ['原谅', '手表', '这', '书'],
      },
      answer: '书',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"car" 的意思是？',
        audioText: 'car',
        options: ['小汽车', '是（be动词）', '衬衫', '感谢'],
      },
      answer: '小汽车',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Is this your pencil?',
        translation: '这是你的铅笔吗？',
      },
      answer: 'Is this your pencil?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, it is.',
        translation: '是的，是我的。',
      },
      answer: 'Yes, it is.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/pen/',
        meaning: '钢笔',
        example: 'This is my pen.',
      },
      answer: 'pen',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/skɜːt/',
        meaning: '裙子',
        example: 'This is my skirt.',
      },
      answer: 'skirt',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is this your ______',
        translation: '这是你的钢笔吗？',
        options: ['Pencil', 'Skirt', 'Dress', 'pen'],
      },
      answer: 'pen',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is this your ______',
        translation: '这是你的铅笔吗？',
        options: ['pencil', 'Dress', 'Skirt', 'Car'],
      },
      answer: 'pencil',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, it is not." 的正确翻译是？',
        passage: 'Is this your...?',
        options: ['这是你的钢笔吗？', '不，不是。', '是的，是我的。', '不，不是。'],
      },
      answer: '不，不是。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"yes" 的意思是？',
        audioText: 'yes',
        options: ['是（be动词）', '手提包', '是的', '非常'],
      },
      answer: '是的',
      score: 10,
    },
  ],

  // Lesson 3: Lesson 3: Sorry, sir. 对不起，先生。 (Level 1)
  3: [
    {
      type: 'listening',
      content: {
        question: '听录音，"daughter" 的意思是？',
        audioText: 'daughter',
        options: ['铅笔', '学校', '衣帽存放处', '女儿'],
      },
      answer: '女儿',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"number" 的意思是？',
        audioText: 'number',
        options: ['衬衫', '五', '号码', '你，你们'],
      },
      answer: '号码',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Here is my ticket.',
        translation: '这是我的票。',
      },
      answer: 'Here is my ticket.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Is this your umbrella?',
        translation: '这把伞是您的吗？',
      },
      answer: 'Is this your umbrella?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/maɪ/',
        meaning: '我的',
        example: 'Here is my ticket.',
      },
      answer: 'my',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ʌmˈbrelə/',
        meaning: '伞',
        example: 'My umbrella is black.',
      },
      answer: 'umbrella',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is this your ______',
        translation: '这把伞是您的吗？',
        options: ['School', 'Please', 'Cloakroom', 'umbrella'],
      },
      answer: 'umbrella',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'My coat and my umbrella ______',
        translation: '请把我的大衣和伞拿给我。',
        options: ['School', 'Number', 'please', 'Sorry'],
      },
      answer: 'please',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"This is not my umbrella." 的正确翻译是？',
        passage: 'Sorry, sir.',
        options: ['对不起，先生。', '这把是吗？', '这是我（寄存东西）的牌子。', '这不是我的伞。'],
      },
      answer: '这不是我的伞。',
      score: 10,
    },
  ],

  // Lesson 4: Lesson 4: Is this your...? 这是你的……吗？ (Level 1)
  4: [
    {
      type: 'listening',
      content: {
        question: '听录音，"teacher" 的意思是？',
        audioText: 'teacher',
        options: ['你的，你们的', '铅笔', '老师', '小汽车'],
      },
      answer: '老师',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"school" 的意思是？',
        audioText: 'school',
        options: ['钢笔', '号码', '学校', '请'],
      },
      answer: '学校',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, it is.',
        translation: '是的，是我的。',
      },
      answer: 'Yes, it is.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Is this your school?',
        translation: '这是你的学校吗？',
      },
      answer: 'Is this your school?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/suːt/',
        meaning: '一套衣服',
        example: 'This is my suit.',
      },
      answer: 'suit',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈtiːtʃə/',
        meaning: '老师',
        example: 'My teacher is nice.',
      },
      answer: 'teacher',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is this your ______',
        translation: '这是你的衣服吗？',
        options: ['Son', 'School', 'Daughter', 'suit'],
      },
      answer: 'suit',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is this your ______',
        translation: '这是你的学校吗？',
        options: ['Teacher', 'school', 'Daughter', 'Suit'],
      },
      answer: 'school',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, it is." 的正确翻译是？',
        passage: 'Is this your...?',
        options: ['这是你的学校吗？', '不，不是。', '是的，是我的。', '这是你的衣服吗？'],
      },
      answer: '是的，是我的。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"excuse" 的意思是？',
        audioText: 'excuse',
        options: ['小汽车', '原谅', '我（宾格）', '它'],
      },
      answer: '原谅',
      score: 10,
    },
  ],

  // Lesson 5: Lesson 5: Nice to meet you. 很高兴见到你。 (Level 1)
  5: [
    {
      type: 'listening',
      content: {
        question: '听录音，"Korean" 的意思是？',
        audioText: 'Korean',
        options: ['先生', '票', '韩国的', '也'],
      },
      answer: '韩国的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"new" 的意思是？',
        audioText: 'new',
        options: ['你的，你们的', '美国的', '号码', '新的'],
      },
      answer: '新的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'This is Miss Sophie Dupont.',
        translation: '这位是索菲娅·杜邦小姐。',
      },
      answer: 'This is Miss Sophie Dupont.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Good morning.',
        translation: '早上好。',
      },
      answer: 'Good morning.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈɪtəli/',
        meaning: '意大利',
        example: 'He comes from Italy.',
      },
      answer: 'italy',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/mɪs/',
        meaning: '小姐',
        example: 'Miss Sophie.',
      },
      answer: 'miss',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Good ______ Mr. Blake.',
        translation: '早上好，布莱克先生。',
        options: ['Sweden', 'Nice', 'French', 'morning'],
      },
      answer: 'morning',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This is ______ Sophie Dupont.',
        translation: '这位是索菲娅·杜邦小姐。',
        options: ['Miss', 'Chinese', 'Sweden', 'Too'],
      },
      answer: 'Miss',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"And this is Xiaohui." 的正确翻译是？',
        passage: 'Nice to meet you.',
        options: ['很高兴见到你。', '早上好。', '这位是索菲娅·杜邦小姐。', '这位是晓惠。'],
      },
      answer: '这位是晓惠。',
      score: 10,
    },
  ],

  // Lesson 6: Lesson 6: What make is it? 它是什么牌子的？ (Level 1)
  6: [
    {
      type: 'listening',
      content: {
        question: '听录音，"Toyota" 的意思是？',
        audioText: 'Toyota',
        options: ['丰田', '学生', '我的', '连衣裙'],
      },
      answer: '丰田',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"Mini" 的意思是？',
        audioText: 'Mini',
        options: ['一套衣服', '手表', '很多', '迷你'],
      },
      answer: '迷你',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, it is.',
        translation: '是的，它是。',
      },
      answer: 'Yes, it is.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "It's a Ford.",
        translation: '它是福特牌的。',
      },
      answer: "It's a Ford.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈmɪni/',
        meaning: '迷你',
        example: 'It is a Mini.',
      },
      answer: 'mini',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɪˈtæliən/',
        meaning: '意大利的',
        example: 'Is it an Italian car?',
      },
      answer: 'italian',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What ______ is it?',
        translation: '它是什么牌子的？',
        options: ['Italian', 'Swedish', 'Peugeot', 'make'],
      },
      answer: 'make',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "It's a ______",
        translation: '它是福特牌的。',
        options: ['Mercedes', 'Swedish', 'Mini', 'Ford'],
      },
      answer: 'Ford',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Is it a Swedish car?" 的正确翻译是？',
        passage: 'What make is it?',
        options: [
          '它是什么牌子的？',
          '它是德国车吗？',
          '它是瑞典的车吗？',
          '不，它不是。它是美国车。',
        ],
      },
      answer: '它是瑞典的车吗？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"student" 的意思是？',
        audioText: 'student',
        options: ['学生', '号码', '铅笔', '法国的'],
      },
      answer: '学生',
      score: 10,
    },
  ],

  // Lesson 7: Lesson 7: Are you a teacher? 你是教师吗？ (Level 1)
  7: [
    {
      type: 'listening',
      content: {
        question: '听录音，"job" 的意思是？',
        audioText: 'job',
        options: ['小姐', '原谅，请再说一遍', '我', '工作'],
      },
      answer: '工作',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"name" 的意思是？',
        audioText: 'name',
        options: ['名字', '美国', '一套衣服', '衣帽存放处'],
      },
      answer: '名字',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Are you French?',
        translation: '你是法国人吗？',
      },
      answer: 'Are you French?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "What's your job?",
        translation: '你是做什么工作的？',
      },
      answer: "What's your job?",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/dʒɒb/',
        meaning: '工作',
        example: 'What is your job?',
      },
      answer: 'job',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/æm/',
        meaning: '是（be动词）',
        example: 'I am a student.',
      },
      answer: 'am',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I am ______',
        translation: '我是意大利人。',
        options: ['Job', 'Keyboard', 'Italian', 'Name'],
      },
      answer: 'Italian',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I am a keyboard ______',
        translation: '我是电脑录入员。',
        options: ['Nationality', 'Are', 'operator', 'Am'],
      },
      answer: 'operator',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I am a keyboard operator." 的正确翻译是？',
        passage: 'Are you a teacher?',
        options: ['你是教师吗？', '我是电脑录入员。', '你也是法国人吗？', '是的，我是。'],
      },
      answer: '我是电脑录入员。',
      score: 10,
    },
  ],

  // Lesson 8: Lesson 8: What's your job? 你是做什么工作的？ (Level 1)
  8: [
    {
      type: 'listening',
      content: {
        question: '听录音，"housewife" 的意思是？',
        audioText: 'housewife',
        options: ['英国的', '票', '家庭主妇', '邮递员'],
      },
      answer: '家庭主妇',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"postman" 的意思是？',
        audioText: 'postman',
        options: ['什么', '我', '先生', '邮递员'],
      },
      answer: '邮递员',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I am an air hostess.',
        translation: '我是空中小姐。',
      },
      answer: 'I am an air hostess.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "What's your job?",
        translation: '你是做什么工作的？',
      },
      answer: "What's your job?",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/nɜːs/',
        meaning: '护士',
        example: 'She is a nurse.',
      },
      answer: 'nurse',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈmɪlkmən/',
        meaning: '送奶工',
        example: 'He is a milkman.',
      },
      answer: 'milkman',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "What's your ______",
        translation: '你是做什么工作的？',
        options: ['job', 'Policeman', 'Housewife', 'Milkman'],
      },
      answer: 'job',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I am a ______',
        translation: '我是警察。',
        options: ['Nurse', 'policeman', 'Milkman', 'Postman'],
      },
      answer: 'policeman',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What\'s your job?" 的正确翻译是？',
        passage: "What's your job?",
        options: ['我是女警察。', '我是警察。', '我是空中小姐。', '你是做什么工作的？'],
      },
      answer: '你是做什么工作的？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"handbag" 的意思是？',
        audioText: 'handbag',
        options: ['手提包', '也', '瑞典', '日本的'],
      },
      answer: '手提包',
      score: 10,
    },
  ],

  // Lesson 9: Lesson 9: How are you today? 你今天好吗？ (Level 1)
  9: [
    {
      type: 'listening',
      content: {
        question: '听录音，"hi" 的意思是？',
        audioText: 'hi',
        options: ['手表', '送奶工', '铅笔', '嗨'],
      },
      answer: '嗨',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"hello" 的意思是？',
        audioText: 'hello',
        options: ['好的', '小汽车', '你好', '（产品的）牌号'],
      },
      answer: '你好',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I am fine, thanks.',
        translation: '很好，谢谢。',
      },
      answer: 'I am fine, thanks.',
      score: 10,
    },
    {
      type: 'speaking',
      content: { instruction: '请大声朗读以下句子', sentence: 'And you?', translation: '你好吗？' },
      answer: 'And you?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wel/',
        meaning: '好',
        example: 'I am very well.',
      },
      answer: 'well',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/θæŋks/',
        meaning: '谢谢',
        example: 'I am fine, thanks.',
      },
      answer: 'thanks',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'How are you ______',
        translation: '你今天好吗？',
        options: ['today', 'Fine', 'See', 'Hi'],
      },
      answer: 'today',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I am fine, ______',
        translation: '很好，谢谢。',
        options: ['Well', 'Today', 'See', 'thanks'],
      },
      answer: 'thanks',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Hello, Helen." 的正确翻译是？',
        passage: 'How are you today?',
        options: ['托尼好吗？', '你好，史蒂文。', '你好，海伦。', '再见，海伦。'],
      },
      answer: '你好，海伦。',
      score: 10,
    },
  ],

  // Lesson 10: Lesson 10: Look at... 看…… (Level 1)
  10: [
    {
      type: 'listening',
      content: {
        question: '听录音，"dirty" 的意思是？',
        audioText: 'dirty',
        options: ['工程师', '瘦的', '好', '脏的'],
      },
      answer: '脏的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"old" 的意思是？',
        audioText: 'old',
        options: ['衣帽存放处', '老的', '德国的', '早晨'],
      },
      answer: '老的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Look at that woman.',
        translation: '看那个女人。',
      },
      answer: 'Look at that woman.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He is fat.',
        translation: '他很胖。',
      },
      answer: 'He is fat.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/θɪn/',
        meaning: '瘦的',
        example: 'She is thin.',
      },
      answer: 'thin',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/əʊld/',
        meaning: '老的',
        example: 'He is old.',
      },
      answer: 'old',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She is ______',
        translation: '她很瘦。',
        options: ['Lazy', 'Young', 'Old', 'thin'],
      },
      answer: 'thin',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He is ______',
        translation: '他很高。',
        options: ['Short', 'Hot', 'Dirty', 'tall'],
      },
      answer: 'tall',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She is short." 的正确翻译是？',
        passage: 'Look at...',
        options: ['看那个男人。', '他很胖。', '她很矮。', '看那个警察。'],
      },
      answer: '她很矮。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"Miss" 的意思是？',
        audioText: 'Miss',
        options: ['儿子', '小姐', '标致', '大衣'],
      },
      answer: '小姐',
      score: 10,
    },
  ],

  // Lesson 11: Lesson 11: Is this your shirt? 这是你的衬衫吗？ (Level 1)
  11: [
    {
      type: 'listening',
      content: {
        question: '听录音，"blue" 的意思是？',
        audioText: 'blue',
        options: ['钢笔', '看见', '五', '蓝色'],
      },
      answer: '蓝色',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"whose" 的意思是？',
        audioText: 'whose',
        options: ['胖的', '是的', '谁的', '非常'],
      },
      answer: '谁的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "Is this shirt Tim's?",
        translation: '这件衬衫是蒂姆的吗？',
      },
      answer: "Is this shirt Tim's?",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Whose shirt is that?',
        translation: '那是谁的衬衫？',
      },
      answer: 'Whose shirt is that?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/pəˈhæps/',
        meaning: '大概',
        example: 'Perhaps it is.',
      },
      answer: 'perhaps',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/huːz/',
        meaning: '谁的',
        example: 'Whose shirt is that?',
      },
      answer: 'whose',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "Tim's shirt is ______",
        translation: '蒂姆的衬衫是白色的。',
        options: ['Perhaps', 'white', 'Whose', 'Blue'],
      },
      answer: 'white',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ shirt is that?',
        translation: '那是谁的衬衫？',
        options: ['Catch', 'Whose', 'White', 'Blue'],
      },
      answer: 'Whose',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, sir." 的正确翻译是？',
        passage: 'Is this your shirt?',
        options: ['给你。接着！', '不，先生。这不是我的衬衫。', '蒂姆！', '是的，先生。'],
      },
      answer: '是的，先生。',
      score: 10,
    },
  ],

  // Lesson 12: Lesson 12: Whose is this...? 这……是谁的？ (Level 1)
  12: [
    {
      type: 'listening',
      content: {
        question: '听录音，"blouse" 的意思是？',
        audioText: 'blouse',
        options: ['谁的', '女衬衫', '女警察', '手表'],
      },
      answer: '女衬衫',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"his" 的意思是？',
        audioText: 'his',
        options: ['福特', '他的', '谁的', '谢谢'],
      },
      answer: '他的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Whose is this car?',
        translation: '这辆小汽车是谁的？',
      },
      answer: 'Whose is this car?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "It's hers.",
        translation: '是她的。',
      },
      answer: "It's hers.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/hɪz/',
        meaning: '他的',
        example: 'This is his book.',
      },
      answer: 'his',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/blaʊz/',
        meaning: '女衬衫',
        example: 'This is her blouse.',
      },
      answer: 'blouse',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Whose is this ______',
        translation: '这件女衬衫是谁的？',
        options: ['Brother', 'blouse', 'Mother', 'Her'],
      },
      answer: 'blouse',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Whose is this ______',
        translation: '这条领带是谁的？',
        options: ['tie', 'His', 'Mother', 'Sister'],
      },
      answer: 'tie',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Whose is this blouse?" 的正确翻译是？',
        passage: 'Whose is this...?',
        options: ['这件女衬衫是谁的？', '这辆小汽车是谁的？', '是他父亲的。', '这条领带是谁的？'],
      },
      answer: '这件女衬衫是谁的？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"tall" 的意思是？',
        audioText: 'tall',
        options: ['梅赛德斯', '是（be动词）', '高的', '好的，愉快的'],
      },
      answer: '高的',
      score: 10,
    },
  ],

  // Lesson 13: Lesson 13: A new dress 一件新连衣裙 (Level 1)
  13: [
    {
      type: 'listening',
      content: {
        question: '听录音，"green" 的意思是？',
        audioText: 'green',
        options: ['绿色', '沃尔沃', '来', '看见'],
      },
      answer: '绿色',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"lovely" 的意思是？',
        audioText: 'lovely',
        options: ['我的', '老的', '丰田', '可爱的'],
      },
      answer: '可爱的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "That's a nice dress.",
        translation: '这件连衣裙真好。',
      },
      answer: "That's a nice dress.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "It's very smart.",
        translation: '真漂亮。',
      },
      answer: "It's very smart.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/hæt/',
        meaning: '帽子',
        example: 'My hat is new, too.',
      },
      answer: 'hat',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɡriːn/',
        meaning: '绿色',
        example: 'It is green.',
      },
      answer: 'green',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "It's very ______",
        translation: '真漂亮。',
        options: ['smart', 'Come', 'Same', 'Colour'],
      },
      answer: 'smart',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'That is a ______ hat!',
        translation: '真是一顶可爱的帽子！',
        options: ['Same', 'Green', 'lovely', 'Hat'],
      },
      answer: 'lovely',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Come upstairs and see it." 的正确翻译是？',
        passage: 'A new dress',
        options: [
          '真是一顶可爱的帽子！',
          '到楼上看看。',
          '是什么颜色的？',
          '一样的颜色，也是绿的。',
        ],
      },
      answer: '到楼上看看。',
      score: 10,
    },
  ],

  // Lesson 14: Lesson 14: What colour's your...? 你的……是什么颜色的？ (Level 1)
  14: [
    {
      type: 'listening',
      content: {
        question: '听录音，"dog" 的意思是？',
        audioText: 'dog',
        options: ['菲亚特', '一套衣服', '福特', '狗'],
      },
      answer: '狗',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"black" 的意思是？',
        audioText: 'black',
        options: ['黑色', '送奶工', '名字', '楼上'],
      },
      answer: '黑色',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "It's black.",
        translation: '是黑色的。',
      },
      answer: "It's black.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "It's white.",
        translation: '是白色的。',
      },
      answer: "It's white.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/dɒɡ/',
        meaning: '狗',
        example: 'My dog is white.',
      },
      answer: 'dog',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/keɪs/',
        meaning: '箱子',
        example: 'This is my case.',
      },
      answer: 'case',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "It's ______",
        translation: '是白色的。',
        options: ['Carpet', 'Yellow', 'Case', 'white'],
      },
      answer: 'white',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "What colour's your ______",
        translation: '你的大衣是什么颜色的？',
        options: ['Dog', 'coat', 'Yellow', 'Black'],
      },
      answer: 'coat',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It\'s black." 的正确翻译是？',
        passage: "What colour's your...?",
        options: ['是黑白相间的。', '是黑色的。', '你的大衣是什么颜色的？', '是白色的。'],
      },
      answer: '是黑色的。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"nurse" 的意思是？',
        audioText: 'nurse',
        options: ['脏的', '护士', '好的', '一套衣服'],
      },
      answer: '护士',
      score: 10,
    },
  ],

  // Lesson 15: Lesson 15: Your passports, please. 请出示你们的护照。 (Level 1)
  15: [
    {
      type: 'listening',
      content: {
        question: '听录音，"Danish" 的意思是？',
        audioText: 'Danish',
        options: ['（产品的）牌号', '丹麦人', '红色', '英国'],
      },
      answer: '丹麦人',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"customs" 的意思是？',
        audioText: 'customs',
        options: ['冷的', '老的', '旅游者', '海关'],
      },
      answer: '海关',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Our cases are brown. Here they are.',
        translation: '我们的箱子是棕色的。在这儿呢。',
      },
      answer: 'Our cases are brown. Here they are.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Are your friends Danish, too?',
        translation: '你们的朋友也是丹麦人吗？',
      },
      answer: 'Are your friends Danish, too?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkʌstəmz/',
        meaning: '海关',
        example: 'Customs officer.',
      },
      answer: 'customs',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈpɑːspɔːt/',
        meaning: '护照',
        example: 'Your passports, please.',
      },
      answer: 'passport',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Are your friends ______ too?',
        translation: '你们的朋友也是丹麦人吗？',
        options: ['Friend', 'Customs', 'Danish', 'Norwegian'],
      },
      answer: 'Danish',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They are ______',
        translation: '他们是挪威人。',
        options: ['Girl', 'Officer', 'Norwegian', 'Danish'],
      },
      answer: 'Norwegian',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, they are." 的正确翻译是？',
        passage: 'Your passports, please.',
        options: [
          '给您。',
          '你们的朋友也是丹麦人吗？',
          '请出示你们的护照。',
          '是的，他们是来旅游的。',
        ],
      },
      answer: '是的，他们是来旅游的。',
      score: 10,
    },
  ],

  // Lesson 16: Lesson 16: Are you...? 你是……吗？ (Level 1)
  16: [
    {
      type: 'listening',
      content: {
        question: '听录音，"these" 的意思是？',
        audioText: 'these',
        options: ['灰色', '那些', '这些', '护士'],
      },
      answer: '这些',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"orange" 的意思是？',
        audioText: 'orange',
        options: ['邮递员', '橙色', '（产品的）牌号', '丹麦人'],
      },
      answer: '橙色',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'No, I am not. I am Norwegian.',
        translation: '不，我不是。我是挪威人。',
      },
      answer: 'No, I am not. I am Norwegian.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'No, they are not. Those are my cases.',
        translation: '不，不是。那些是我的箱子。',
      },
      answer: 'No, they are not. Those are my cases.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/blæk/',
        meaning: '黑色',
        example: 'These boxes are black.',
      },
      answer: 'black',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ðiːz/',
        meaning: '这些',
        example: 'These are your books.',
      },
      answer: 'these',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Are ______ your cases?',
        translation: '这些是你的箱子吗？',
        options: ['these', 'Black', 'Russian', 'Those'],
      },
      answer: 'these',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, they are not. ______ are my cases.',
        translation: '不，不是。那些是我的箱子。',
        options: ['Russian', 'Orange', 'Dutch', 'Those'],
      },
      answer: 'Those',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Are you Swedish?" 的正确翻译是？',
        passage: 'Are you...?',
        options: [
          '是棕色的。',
          '不，我不是。我是挪威人。',
          '你是瑞典人吗？',
          '不，不是。那些是我的箱子。',
        ],
      },
      answer: '你是瑞典人吗？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"her" 的意思是？',
        audioText: 'her',
        options: ['官员', '好', '她的', '抓住'],
      },
      answer: '她的',
      score: 10,
    },
  ],

  // Lesson 17: Lesson 17: How do you do? 你好！ (Level 1)
  17: [
    {
      type: 'listening',
      content: {
        question: '听录音，"hard-working" 的意思是？',
        audioText: 'hard-working',
        options: ['勤奋的', '冷的', '是（be动词）', '操作人员'],
      },
      answer: '勤奋的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"office" 的意思是？',
        audioText: 'office',
        options: ['办公室', '挪威人', '助手', '你好'],
      },
      answer: '办公室',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'How do you do?',
        translation: '你们好！',
      },
      answer: 'How do you do?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What are their jobs?',
        translation: '他们是做什么工作的？',
      },
      answer: 'What are their jobs?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/mæn/',
        meaning: '男人',
        example: 'Who is this young man?',
      },
      answer: 'man',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈɒfɪs/',
        meaning: '办公室',
        example: 'He is our office assistant.',
      },
      answer: 'office',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This is Jim. He is our ______ assistant.',
        translation: '这是吉姆。他是我们的办公室助理。',
        options: ['Man', 'office', 'Employee', 'Hard-working'],
      },
      answer: 'office',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Who is this young ______',
        translation: '这个年轻人是谁？',
        options: ['Office', 'man', 'Employee', 'Hard-working'],
      },
      answer: 'man',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Come and meet our employees, Mr. Richards." 的正确翻译是？',
        passage: 'How do you do?',
        options: [
          '那些姑娘很勤快。他们是做什么工作的？',
          '来见见我们的雇员，理查兹先生。',
          '他们是推销员。他们非常懒。',
          '他们是电脑录入员。',
        ],
      },
      answer: '来见见我们的雇员，理查兹先生。',
      score: 10,
    },
  ],

  // Lesson 18: Lesson 18: What are their jobs? 他们是做什么工作的？ (Level 1)
  18: [
    {
      type: 'listening',
      content: {
        question: '听录音，"they" 的意思是？',
        audioText: 'they',
        options: ['年轻的', '再见', '他们', '颜色'],
      },
      answer: '他们',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"their" 的意思是？',
        audioText: 'their',
        options: ['谁的', '姐姐/妹妹', '他们的', '家庭主妇'],
      },
      answer: '他们的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They are policemen.',
        translation: '他们是警察。',
      },
      answer: 'They are policemen.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What are their jobs?',
        translation: '他们是做什么工作的？',
      },
      answer: 'What are their jobs?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ðeɪ/',
        meaning: '他们',
        example: 'They are policemen.',
      },
      answer: 'they',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ðeə/',
        meaning: '他们的',
        example: 'What are their jobs?',
      },
      answer: 'their',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ are keyboard operators.',
        translation: '他们是电脑录入员。',
        options: ['Black', 'Policewoman', 'Hard-working', 'They'],
      },
      answer: 'They',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ are policemen.',
        translation: '他们是警察。',
        options: ['Blue', 'They', 'Postman', 'Their'],
      },
      answer: 'They',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They are policemen." 的正确翻译是？',
        passage: 'What are their jobs?',
        options: [
          '他们是电脑录入员。',
          '他们是做什么工作的？',
          '他们是做什么工作的？',
          '他们是警察。',
        ],
      },
      answer: '他们是警察。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"see" 的意思是？',
        audioText: 'see',
        options: ['瘦的', '女孩', '看见', '楼上'],
      },
      answer: '看见',
      score: 10,
    },
  ],

  // Lesson 19: Lesson 19: Tired and thirsty 又累又渴 (Level 1)
  19: [
    {
      type: 'listening',
      content: {
        question: '听录音，"tired" 的意思是？',
        audioText: 'tired',
        options: ['护照', '累的', '颜色', '谁的'],
      },
      answer: '累的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"matter" 的意思是？',
        audioText: 'matter',
        options: ['关着的', '矮的', '灰色', '事情'],
      },
      answer: '事情',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Here you are, children.',
        translation: '给你们，孩子们。',
      },
      answer: 'Here you are, children.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, we are! Thank you.',
        translation: '是的，现在好了。谢谢您。',
      },
      answer: 'Yes, we are! Thank you.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈtʃɪldrən/',
        meaning: '孩子们',
        example: "What's the matter, children?",
      },
      answer: 'children',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈəʊpən/',
        meaning: '开着的',
        example: 'The door is open.',
      },
      answer: 'open',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'We are tired and ______ Mum.',
        translation: '我们累了，口也渴，妈妈。',
        options: ['Right', 'thirsty', 'Children', 'Tired'],
      },
      answer: 'thirsty',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "What's the matter, ______",
        translation: '怎么啦，孩子们？',
        options: ['Big', 'children', 'Heavy', 'Small'],
      },
      answer: 'children',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, we are not." 的正确翻译是？',
        passage: 'Tired and thirsty',
        options: ['给你们，孩子们。', '不，还没有。', '我们累了……', '你们现在好些了吗？'],
      },
      answer: '不，还没有。',
      score: 10,
    },
  ],

  // Lesson 20: Lesson 20: Look at them! 看看它们！ (Level 1)
  20: [
    {
      type: 'listening',
      content: {
        question: '听录音，"small" 的意思是？',
        audioText: 'small',
        options: ['姐姐/妹妹', '俄罗斯人', '小的', '灰色'],
      },
      answer: '小的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"shut" 的意思是？',
        audioText: 'shut',
        options: ['箱子', '关着的', '高的', '他们'],
      },
      answer: '关着的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They are nice.',
        translation: '它们真好吃。',
      },
      answer: 'They are nice.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Look at the ice creams.',
        translation: '看那些冰淇淋。',
      },
      answer: 'Look at the ice creams.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ʃʌt/',
        meaning: '关着的',
        example: 'The windows are shut.',
      },
      answer: 'shut',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/bɪɡ/',
        meaning: '大的',
        example: 'They are big.',
      },
      answer: 'big',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Look at ______',
        translation: '看看它们。',
        options: ['Open', 'Shut', 'Big', 'them'],
      },
      answer: 'them',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Look at the ice ______',
        translation: '看那些冰淇淋。',
        options: ['Heavy', 'creams', 'Light', 'Open'],
      },
      answer: 'creams',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They are small." 的正确翻译是？',
        passage: 'Look at them!',
        options: ['它们是关着的。', '看那些鞋子。', '看那些窗户。', '它们很小。'],
      },
      answer: '它们很小。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"Norwegian" 的意思是？',
        audioText: 'Norwegian',
        options: ['挪威人', '办公室', '雇员', '他的'],
      },
      answer: '挪威人',
      score: 10,
    },
  ],

  // Lesson 21: Lesson 21: Which book? 哪一本书？ (Level 1)
  21: [
    {
      type: 'listening',
      content: {
        question: '听录音，"which" 的意思是？',
        audioText: 'which',
        options: ['哪一个', '重的', '地毯', '给'],
      },
      answer: '哪一个',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"one" 的意思是？',
        audioText: 'one',
        options: ['那些', '一个', '这些', '丹麦人'],
      },
      answer: '一个',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Which book?',
        translation: '哪一本？',
      },
      answer: 'Which book?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Give me a book please, Jane.',
        translation: '请拿本书给我，简。',
      },
      answer: 'Give me a book please, Jane.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wʌn/',
        meaning: '一个',
        example: 'This one?',
      },
      answer: 'one',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wɪtʃ/',
        meaning: '哪一个',
        example: 'Which book?',
      },
      answer: 'which',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This ______',
        translation: '是这本吗？',
        options: ['Children', 'Open', 'one', 'Mother'],
      },
      answer: 'one',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, not that ______ The red one.',
        translation: '不，不是那本。是那本红的。',
        options: ['Upstairs', 'one', 'Girl', 'Russian'],
      },
      answer: 'one',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Which book?" 的正确翻译是？',
        passage: 'Which book?',
        options: ['是这本吗？', '不，不是那本。是那本红的。', '请拿本书给我，简。', '哪一本？'],
      },
      answer: '哪一本？',
      score: 10,
    },
  ],

  // Lesson 22: Lesson 22: Give me/him/her/us/them a... Which one? 给我/他/她/我们/他们一……哪一……？ (Level 1)
  22: [
    {
      type: 'listening',
      content: {
        question: '听录音，"fork" 的意思是？',
        audioText: 'fork',
        options: ['丹麦人', '颜色', '叉子', '黑色'],
      },
      answer: '叉子',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"large" 的意思是？',
        audioText: 'large',
        options: ['楼上', '大的', '箱子', '挪威人'],
      },
      answer: '大的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Give her a cup please.',
        translation: '请给她一个茶杯。',
      },
      answer: 'Give her a cup please.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Give us a bottle please.',
        translation: '请给我们一个瓶子。',
      },
      answer: 'Give us a bottle please.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/lɑːdʒ/',
        meaning: '大的',
        example: 'A large box.',
      },
      answer: 'large',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈempti/',
        meaning: '空的',
        example: 'The bottle is empty.',
      },
      answer: 'empty',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Give me a ______ please.',
        translation: '请给我一个盒子。',
        options: ['box', 'Tin', 'Bottle', 'Spoon'],
      },
      answer: 'box',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Give them a ______ please.',
        translation: '请给他们一罐。',
        options: ['tin', 'Empty', 'Blunt', 'Cup'],
      },
      answer: 'tin',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Give him a glass please." 的正确翻译是？',
        passage: 'Give me/him/her/us/them a... Which one?',
        options: [
          '请给他一个玻璃杯。',
          '不，不是那个。是空的那个。',
          '哪一个？这个吗？',
          '请给我一个盒子。',
        ],
      },
      answer: '请给他一个玻璃杯。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"hard-working" 的意思是？',
        audioText: 'hard-working',
        options: ['黄色', '帽子', '父亲', '勤奋的'],
      },
      answer: '勤奋的',
      score: 10,
    },
  ],

  // Lesson 23: Lesson 23: Which glasses? 哪几只杯子？ (Level 1)
  23: [
    {
      type: 'listening',
      content: {
        question: '听录音，"cupboard" 的意思是？',
        audioText: 'cupboard',
        options: ['食橱', '哪一个', '朋友', '楼上'],
      },
      answer: '食橱',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"table" 的意思是？',
        audioText: 'table',
        options: ['桌子', '盒子', '他们的', '杯子'],
      },
      answer: '桌子',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'No, not those. The ones on the shelf.',
        translation: '不，不是那几只。是架子上的那几只。',
      },
      answer: 'No, not those. The ones on the shelf.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Which glasses?',
        translation: '哪几只？',
      },
      answer: 'Which glasses?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/flɔː/',
        meaning: '地板',
        example: 'On the floor.',
      },
      answer: 'floor',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ʃelf/',
        meaning: '架子',
        example: 'The ones on the shelf.',
      },
      answer: 'shelf',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Which ______',
        translation: '哪几只？',
        options: ['Shelf', 'glasses', 'Plate', 'Table'],
      },
      answer: 'glasses',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ you are.',
        translation: '给你。',
        options: ['Desk', 'Floor', 'Here', 'Bed'],
      },
      answer: 'Here',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Thanks." 的正确翻译是？',
        passage: 'Which glasses?',
        options: ['这几只吗？', '请拿给我几只玻璃杯，简。', '这几只吗？', '谢谢。'],
      },
      answer: '谢谢。',
      score: 10,
    },
  ],

  // Lesson 24: Lesson 24: Give me/him/her/us/them some... Which ones? 给我/他/她/我们/他们一些……哪些？ (Level 1)
  24: [
    {
      type: 'listening',
      content: {
        question: '听录音，"cigarette" 的意思是？',
        audioText: 'cigarette',
        options: ['荷兰人', '官员', '灰色', '香烟'],
      },
      answer: '香烟',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"cupboard" 的意思是？',
        audioText: 'cupboard',
        options: ['茶杯', '食橱', '叉子', '哪一个'],
      },
      answer: '食橱',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Give him some bottles please.',
        translation: '请给他一些瓶子。',
      },
      answer: 'Give him some bottles please.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Give her some magazines please.',
        translation: '请给她一些杂志。',
      },
      answer: 'Give her some magazines please.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈteɪbl/',
        meaning: '桌子',
        example: 'The ones on the table.',
      },
      answer: 'table',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkʌbəd/',
        meaning: '食橱',
        example: 'The ones in the cupboard.',
      },
      answer: 'cupboard',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Which ______ These cups?',
        translation: '哪些茶杯？这些茶杯吗？',
        options: ['cups', 'Table', 'Cupboard', 'Newspaper'],
      },
      answer: 'cups',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Give her some magazines ______',
        translation: '请给她一些杂志。',
        options: ['please', 'Bed', 'Television', 'Newspaper'],
      },
      answer: 'please',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Which bottles? These bottles?" 的正确翻译是？',
        passage: 'Give me/him/her/us/them some... Which ones?',
        options: ['哪些茶杯？这些茶杯吗？', '给你。', '请给我几只茶杯。', '哪些瓶子？这些瓶子吗？'],
      },
      answer: '哪些瓶子？这些瓶子吗？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"yellow" 的意思是？',
        audioText: 'yellow',
        options: ['黄色', '盒子', '狗', '挪威人'],
      },
      answer: '黄色',
      score: 10,
    },
  ],

  // Lesson 25: Lesson 25: Mrs. Smith's kitchen 史密斯太太的厨房 (Level 1)
  25: [
    {
      type: 'listening',
      content: {
        question: '听录音，"right" 的意思是？',
        audioText: 'right',
        options: ['重的', '电视机', '勺子', '右边'],
      },
      answer: '右边',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"room" 的意思是？',
        audioText: 'room',
        options: ['瓶子', '房间', '助手', '橙色'],
      },
      answer: '房间',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The cup is clean.',
        translation: '杯子是干净的。',
      },
      answer: 'The cup is clean.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'There is a cup on the table, too.',
        translation: '桌子上还有一只杯子。',
      },
      answer: 'There is a cup on the table, too.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkɪtʃɪn/',
        meaning: '厨房',
        example: "Mrs. Smith's kitchen.",
      },
      answer: 'kitchen',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/raɪt/',
        meaning: '右边',
        example: 'It is on the right.',
      },
      answer: 'right',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "Mrs. Smith's ______ is small.",
        translation: '史密斯太太的厨房很小。',
        options: ['Room', 'kitchen', 'Left', 'Cup'],
      },
      answer: 'kitchen',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The ______ is blue.',
        translation: '电炉是蓝色的。',
        options: ['Electric', 'Kitchen', 'Mrs.', 'cooker'],
      },
      answer: 'cooker',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is on the left." 的正确翻译是？',
        passage: "Mrs. Smith's kitchen",
        options: ['厨房里有一个电炉。', '杯子是干净的。', '它在左边。', '电炉是蓝色的。'],
      },
      answer: '它在左边。',
      score: 10,
    },
  ],

  // Lesson 26: Lesson 26: Where is it? 它在哪里？ (Level 1)
  26: [
    {
      type: 'listening',
      content: {
        question: '听录音，"where" 的意思是？',
        audioText: 'where',
        options: ['哪里', '这些', '电冰箱', '中间'],
      },
      answer: '哪里',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"on" 的意思是？',
        audioText: 'on',
        options: ['给', '桌子', '在……上', '灰色'],
      },
      answer: '在……上',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "It's on the table, too.",
        translation: '它也在桌子上。',
      },
      answer: "It's on the table, too.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Where is the book?',
        translation: '书在哪里？',
      },
      answer: 'Where is the book?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɒn/',
        meaning: '在……上',
        example: 'On the table.',
      },
      answer: 'on',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈʌndə/',
        meaning: '在……下',
        example: 'Under the table.',
      },
      answer: 'under',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ is the pen?',
        translation: '钢笔在哪里？',
        options: ['On', 'Under', 'In', 'Where'],
      },
      answer: 'Where',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "It's on the table, ______",
        translation: '它也在桌子上。',
        options: ['In', 'Where', 'too', 'On'],
      },
      answer: 'too',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It\'s on the table, too." 的正确翻译是？',
        passage: 'Where is it?',
        options: ['书在哪里？', '在椅子下面。', '它也在桌子上。', '钢笔在哪里？'],
      },
      answer: '它也在桌子上。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"one" 的意思是？',
        audioText: 'one',
        options: ['一个', '关着的', '盒子', '钝的'],
      },
      answer: '一个',
      score: 10,
    },
  ],

  // Lesson 27: Lesson 27: Mrs. Smith's living room 史密斯太太的客厅 (Level 1)
  27: [
    {
      type: 'listening',
      content: {
        question: '听录音，"wall" 的意思是？',
        audioText: 'wall',
        options: ['墙', '助手', '门', '叉子'],
      },
      answer: '墙',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"picture" 的意思是？',
        audioText: 'picture',
        options: ['房间', '空的', '满的', '图画'],
      },
      answer: '图画',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'There are some magazines on the television.',
        translation: '电视机上有一些杂志。',
      },
      answer: 'There are some magazines on the television.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The radio is near the door.',
        translation: '收音机靠近门。',
      },
      answer: 'The radio is near the door.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈpɪktʃə/',
        meaning: '图画',
        example: 'Some pictures.',
      },
      answer: 'picture',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈwɪndəʊ/',
        meaning: '窗户',
        example: 'Near the window.',
      },
      answer: 'window',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The radio is ______ the door.',
        translation: '收音机靠近门。',
        options: ['Window', 'near', 'Door', 'Armchair'],
      },
      answer: 'near',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The pictures are on the ______',
        translation: '画在墙上。',
        options: ['wall', 'Door', 'Picture', 'Window'],
      },
      answer: 'wall',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"The pictures are on the wall." 的正确翻译是？',
        passage: "Mrs. Smith's living room",
        options: ['房间里有一台收音机。', '画在墙上。', '扶手椅靠近桌子。', '桌子上有一些报纸。'],
      },
      answer: '画在墙上。',
      score: 10,
    },
  ],

  // Lesson 28: Lesson 28: Where are they? 它们在哪里？ (Level 1)
  28: [
    {
      type: 'listening',
      content: {
        question: '听录音，"boots" 的意思是？',
        audioText: 'boots',
        options: ['一个', '靴子', '尖的', '杯子'],
      },
      answer: '靴子',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"socks" 的意思是？',
        audioText: 'socks',
        options: ['中间', '夫人', '袜子', '给'],
      },
      answer: '袜子',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "They're near the table.",
        translation: '它们在桌子旁边。',
      },
      answer: "They're near the table.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Where are the pictures?',
        translation: '图画在哪里？',
      },
      answer: 'Where are the pictures?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/sɒks/',
        meaning: '袜子',
        example: 'Where are the socks?',
      },
      answer: 'socks',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈtraʊzəz/',
        meaning: '长裤',
        example: 'Where are the trousers?',
      },
      answer: 'trousers',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ are the books?',
        translation: '书在哪里？',
        options: ['Shoes', 'Boots', 'Trousers', 'Where'],
      },
      answer: 'Where',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Where are the ______',
        translation: '扶手椅在哪里？',
        options: ['armchairs', 'Trousers', 'Boots', 'Socks'],
      },
      answer: 'armchairs',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They\'re on the wall." 的正确翻译是？',
        passage: 'Where are they?',
        options: ['它们在收音机上。', '它们在墙上。', '它们在桌子旁边。', '扶手椅在哪里？'],
      },
      answer: '它们在墙上。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"thirsty" 的意思是？',
        audioText: 'thirsty',
        options: ['渴的', '他们', '地板', '扶手椅'],
      },
      answer: '渴的',
      score: 10,
    },
  ],

  // Lesson 29: Lesson 29: Come in, Amy. 进来，艾米。 (Level 1)
  29: [
    {
      type: 'listening',
      content: {
        question: '听录音，"bedroom" 的意思是？',
        audioText: 'bedroom',
        options: ['门', '袜子', '卧室', '茶杯'],
      },
      answer: '卧室',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"untidy" 的意思是？',
        audioText: 'untidy',
        options: ['墙', '乱的', '带电的', '门'],
      },
      answer: '乱的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Come in, Amy.',
        translation: '进来，艾米。',
      },
      answer: 'Come in, Amy.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Then make the bed.',
        translation: '然后整理床铺。',
      },
      answer: 'Then make the bed.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈwɔːdrəʊb/',
        meaning: '大衣柜',
        example: 'In the wardrobe.',
      },
      answer: 'wardrobe',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/pʊt/',
        meaning: '放置',
        example: 'Put these clothes in the wardrobe.',
      },
      answer: 'put',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ the dressing table.',
        translation: '掸掉梳妆台上的灰尘。',
        options: ['Must', 'Shut', 'Dust', 'Sweep'],
      },
      answer: 'Dust',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This ______ is very untidy.',
        translation: '这卧室太不整洁了。',
        options: ['bedroom', 'Must', 'Air', 'Sweep'],
      },
      answer: 'bedroom',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Shut the door, please." 的正确翻译是？',
        passage: 'Come in, Amy.',
        options: [
          '请把门关上。',
          '然后把这些衣服放进衣柜里去。',
          '然后整理床铺。',
          '开窗，给房间通通风。',
        ],
      },
      answer: '请把门关上。',
      score: 10,
    },
  ],

  // Lesson 30: Lesson 30: What must I do? 我应该做什么？ (Level 1)
  30: [
    {
      type: 'listening',
      content: {
        question: '听录音，"empty" 的意思是？',
        audioText: 'empty',
        options: ['削尖', '瓶子', '门', '倒空'],
      },
      answer: '倒空',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"read" 的意思是？',
        audioText: 'read',
        options: ['杂志', '大衣柜', '盒子', '读'],
      },
      answer: '读',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Turn off the light.',
        translation: '关灯。',
      },
      answer: 'Turn off the light.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What must I do?',
        translation: '我应该做什么？',
      },
      answer: 'What must I do?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/riːd/',
        meaning: '读',
        example: 'Read this book.',
      },
      answer: 'read',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈempti/',
        meaning: '倒空',
        example: 'Empty the cup.',
      },
      answer: 'empty',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ the cup.',
        translation: '倒空杯子。',
        options: ['Empty', 'Middle', 'Dust', 'Untidy'],
      },
      answer: 'Empty',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ the pencil.',
        translation: '削尖铅笔。',
        options: ['Sharpen', 'Wardrobe', 'Desk', 'Tin'],
      },
      answer: 'Sharpen',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What must I do?" 的正确翻译是？',
        passage: 'What must I do?',
        options: ['我应该做什么？', '我应该做什么？', '倒空杯子。', '开窗，给房间通通风。'],
      },
      answer: '我应该做什么？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"bedroom" 的意思是？',
        audioText: 'bedroom',
        options: ['瓶子', '袜子', '卧室', '尖的'],
      },
      answer: '卧室',
      score: 10,
    },
  ],

  // Lesson 31: Lesson 31: Sally's first bookcase 莎莉的第一个书橱 (Level 1)
  31: [
    {
      type: 'listening',
      content: {
        question: '听录音，"dog" 的意思是？',
        audioText: 'dog',
        options: ['香烟', '狗', '门', '扫'],
      },
      answer: '狗',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"grass" 的意思是？',
        audioText: 'grass',
        options: ['扶手椅', '哪一个', '草，草地', '关门'],
      },
      answer: '草，草地',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Who is climbing the tree?',
        translation: '谁在爬树？',
      },
      answer: 'Who is climbing the tree?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Is Tim in the garden, too?',
        translation: '蒂姆也在花园里吗？',
      },
      answer: 'Is Tim in the garden, too?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/əˈkrɒs/',
        meaning: '横穿',
        example: 'Running across the grass.',
      },
      answer: 'across',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/kæt/',
        meaning: '猫',
        example: 'The cat is climbing the tree.',
      },
      answer: 'cat',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "She's in the ______ Jack.",
        translation: '她在花园里，杰克。',
        options: ['Grass', 'garden', 'After', 'Climbing'],
      },
      answer: 'garden',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "It's ______ after a cat.",
        translation: '它在追一只猫。',
        options: ['After', 'Sitting', 'running', 'Across'],
      },
      answer: 'running',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What is she doing?" 的正确翻译是？',
        passage: "Sally's first bookcase",
        options: ['它正在草地上跑。', '她正在做什么？', '请再说一遍。', '蒂姆在爬树。'],
      },
      answer: '她正在做什么？',
      score: 10,
    },
  ],

  // Lesson 32: Lesson 32: What's he/she/it doing? 他/她/它正在做什么？ (Level 1)
  32: [
    {
      type: 'listening',
      content: {
        question: '听录音，"climbing" 的意思是？',
        audioText: 'climbing',
        options: ['正在打开', '正在坐', '正在攀爬', '猫'],
      },
      answer: '正在攀爬',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"shaving" 的意思是？',
        audioText: 'shaving',
        options: ['正在刮脸', '衣服', '正在做', '掸掉灰尘'],
      },
      answer: '正在刮脸',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What is she doing?',
        translation: '她正在做什么？',
      },
      answer: 'What is she doing?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What is he doing?',
        translation: '他正在做什么？',
      },
      answer: 'What is he doing?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkliːnɪŋ/',
        meaning: '正在打扫',
        example: 'She is cleaning the teeth.',
      },
      answer: 'cleaning',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈtaɪpɪŋ/',
        meaning: '正在打字',
        example: 'She is typing a letter.',
      },
      answer: 'typing',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He is ______ bread.',
        translation: '他正在吃面包。',
        options: ['Cleaning', 'Typing', 'eating', 'Shaving'],
      },
      answer: 'eating',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He is ______',
        translation: '他正在刮脸。',
        options: ['Making', 'Cleaning', 'shaving', 'Reading'],
      },
      answer: 'shaving',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He is making a bookcase." 的正确翻译是？',
        passage: "What's he/she/it doing?",
        options: ['他正在做一个书橱。', '她正在打一封信。', '他正在刮脸。', '她正在做什么？'],
      },
      answer: '他正在做一个书橱。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"shoes" 的意思是？',
        audioText: 'shoes',
        options: ['墙', '鞋子', '……的', '夫人'],
      },
      answer: '鞋子',
      score: 10,
    },
  ],

  // Lesson 33: Lesson 33: A fine day 晴天 (Level 1)
  33: [
    {
      type: 'listening',
      content: {
        question: '听录音，"family" 的意思是？',
        audioText: 'family',
        options: ['家庭（成员）', '食橱', '开（电器）', '厨房'],
      },
      answer: '家庭（成员）',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"river" 的意思是？',
        audioText: 'river',
        options: ['书橱，书架', '窗户', '夫人', '河'],
      },
      answer: '河',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The ship is going under the bridge.',
        translation: '那艘船正在桥下驶过。',
      },
      answer: 'The ship is going under the bridge.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It is a fine day today.',
        translation: '今天天气好。',
      },
      answer: 'It is a fine day today.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈwɔːkɪŋ/',
        meaning: '正在走路',
        example: 'They are walking over the bridge.',
      },
      answer: 'walking',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/skaɪ/',
        meaning: '天空',
        example: 'In the sky.',
      },
      answer: 'sky',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They are walking ______ the bridge.',
        translation: '他们正在过桥。',
        options: ['Sky', 'Day', 'Cloud', 'over'],
      },
      answer: 'over',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'There are some boats on the ______',
        translation: '河上有几艘船。',
        options: ['Shine', 'river', 'Sky', 'With'],
      },
      answer: 'river',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Sally is looking at a big ship." 的正确翻译是？',
        passage: 'A fine day',
        options: [
          '那艘船正在桥下驶过。',
          '他们正在过桥。',
          '萨莉正在看一艘大船。',
          '蒂姆正在看一架飞机。',
        ],
      },
      answer: '萨莉正在看一艘大船。',
      score: 10,
    },
  ],

  // Lesson 34: Lesson 34: What are the... doing? ……正在做什么？ (Level 1)
  34: [
    {
      type: 'listening',
      content: {
        question: '听录音，"sleeping" 的意思是？',
        audioText: 'sleeping',
        options: ['厨房', '正在睡觉', '船', '扫'],
      },
      answer: '正在睡觉',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"waiting" 的意思是？',
        audioText: 'waiting',
        options: ['在……下', '客厅', '盘子', '正在等'],
      },
      answer: '正在等',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They are talking.',
        translation: '他们正在谈话。',
      },
      answer: 'They are talking.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What are the children doing?',
        translation: '孩子们正在做什么？',
      },
      answer: 'What are the children doing?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈweɪtɪŋ/',
        meaning: '正在等',
        example: 'They are waiting for a bus.',
      },
      answer: 'waiting',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈwɒʃɪŋ/',
        meaning: '正在洗',
        example: 'The women are washing dishes.',
      },
      answer: 'washing',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They are ______',
        translation: '她们正在洗东西。',
        options: ['Painting', 'Crying', 'washing', 'Shaving'],
      },
      answer: 'washing',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They are ______',
        translation: '他们正在睡觉。',
        options: ['Jumping', 'Talking', 'Waiting', 'sleeping'],
      },
      answer: 'sleeping',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What are the women doing?" 的正确翻译是？',
        passage: 'What are the... doing?',
        options: ['女人们正在做什么？', '她们正在洗东西。', '孩子们正在做什么？', '他们正在睡觉。'],
      },
      answer: '女人们正在做什么？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"day" 的意思是？',
        audioText: 'day',
        options: ['在……之后', '书橱，书架', '日子，天', '河'],
      },
      answer: '日子，天',
      score: 10,
    },
  ],

  // Lesson 35: Lesson 35: Our village 我们的村庄 (Level 1)
  35: [
    {
      type: 'listening',
      content: {
        question: '听录音，"another" 的意思是？',
        audioText: 'another',
        options: ['夫人', '穿过', '正在走路', '另一个'],
      },
      answer: '另一个',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"wife" 的意思是？',
        audioText: 'wife',
        options: ['打开', '削尖', '开（电器）', '妻子'],
      },
      answer: '妻子',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'This is the school building.',
        translation: '这是学校大楼。',
      },
      answer: 'This is the school building.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He is swimming across the river.',
        translation: '他正在横渡小河。',
      },
      answer: 'He is swimming across the river.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/bɪˈtwiːn/',
        meaning: '在……之间',
        example: 'Between two hills.',
      },
      answer: 'between',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/əˈlɒŋ/',
        meaning: '沿着',
        example: 'Walking along the banks of the river.',
      },
      answer: 'along',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The ______ is on the right.',
        translation: '公园在右边。',
        options: ['Hill', 'Along', 'park', 'Between'],
      },
      answer: 'park',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This is a ______ of our village.',
        translation: '这是我们村庄的一张照片。',
        options: ['Village', 'Another', 'photograph', 'Through'],
      },
      answer: 'photograph',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"My wife and I are walking along the banks of the river." 的正确翻译是？',
        passage: 'Our village',
        options: [
          '我和妻子正沿河岸走。',
          '这是我们村庄的一张照片。',
          '公园在右边。',
          '他正在横渡小河。',
        ],
      },
      answer: '我和妻子正沿河岸走。',
      score: 10,
    },
  ],

  // Lesson 36: Lesson 36: Where...? ……在哪里？ (Level 1)
  36: [
    {
      type: 'listening',
      content: {
        question: '听录音，"going through" 的意思是？',
        audioText: 'going through',
        options: ['削尖', '关（电器）', '猫', '正在穿过'],
      },
      answer: '正在穿过',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"jumping off" 的意思是？',
        audioText: 'jumping off',
        options: ['正在出来', '正在跑', '正在从……跳下', '正在跳'],
      },
      answer: '正在从……跳下',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Where is the boy jumping?',
        translation: '男孩正在从哪里跳下？',
      },
      answer: 'Where is the boy jumping?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'She is coming out of the shop.',
        translation: '她正从商店里出来。',
      },
      answer: 'She is coming out of the shop.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈwɔːkɪŋ bɪˈtwiːn/',
        meaning: '正在……之间走',
        example: 'They are walking between the buildings.',
      },
      answer: 'walking between',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈsɪtɪŋ ɒn/',
        meaning: '正坐在',
        example: 'He is sitting on the grass.',
      },
      answer: 'sitting on',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Where is the woman ______',
        translation: '那个女人去哪里？',
        options: ['Into', 'going', 'Wall', 'On'],
      },
      answer: 'going',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ is the man going?',
        translation: '那个男人去哪里？',
        options: ['Where', 'Between', 'Along', 'Under'],
      },
      answer: 'Where',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Where is the woman going?" 的正确翻译是？',
        passage: 'Where...?',
        options: ['他正从墙上跳下。', '他们在哪里坐着？', '那个女人去哪里？', '他正走进商店。'],
      },
      answer: '那个女人去哪里？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"socks" 的意思是？',
        audioText: 'socks',
        options: ['正在做饭', '门', '照片', '袜子'],
      },
      answer: '袜子',
      score: 10,
    },
  ],

  // Lesson 37: Lesson 37: Making a bookcase 做书橱 (Level 2)
  37: [
    {
      type: 'listening',
      content: {
        question: '听录音，"work" 的意思是？',
        audioText: 'work',
        options: ['墙', '工作', '扫', '公园'],
      },
      answer: '工作',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"hard" 的意思是？',
        audioText: 'hard',
        options: ['努力地', '轮船', '小山', '在……之间'],
      },
      answer: '努力地',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"homework" 的意思是？',
        audioText: 'homework',
        options: ['关门', '客厅', '作业', '门'],
      },
      answer: '作业',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Thanks, Dan.',
        translation: '谢谢，丹。',
      },
      answer: 'Thanks, Dan.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I'm making a bookcase.",
        translation: '我正在做一个书橱。',
      },
      answer: "I'm making a bookcase.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/hɑːd/',
        meaning: '努力地',
        example: 'Working hard.',
      },
      answer: 'hard',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈhæmə/',
        meaning: '锤子',
        example: 'Give me a hammer.',
      },
      answer: 'hammer',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What colour are you going to ______ it?',
        translation: '你打算把它漆成什么颜色？',
        options: ['Homework', 'Bookcase', 'paint', 'Pink'],
      },
      answer: 'paint',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I'm going to ______ it.",
        translation: '我打算把它漆一下。',
        options: ['Bookcase', 'Pink', 'Homework', 'paint'],
      },
      answer: 'paint',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I\'m going to paint it." 的正确翻译是？',
        passage: 'Making a bookcase',
        options: [
          '我打算把它漆一下。',
          '不，不是那把。是那把大的。',
          '是为我女儿苏珊做的。',
          '谢谢，丹。',
        ],
      },
      answer: '我打算把它漆一下。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Thanks, Dan." 的正确翻译是？',
        passage: 'Making a bookcase',
        options: ['给你。', '你干得真辛苦，乔治。', '谢谢，丹。', '粉红色！'],
      },
      answer: '谢谢，丹。',
      score: 10,
    },
  ],

  // Lesson 38: Lesson 38: What are you going to do? What are you doing now? 你打算做什么？你现在正在做什么？ (Level 2)
  38: [
    {
      type: 'listening',
      content: {
        question: '听录音，"washing" 的意思是？',
        audioText: 'washing',
        options: ['和……在一起', '正在进入', '正在洗', '妻子'],
      },
      answer: '正在洗',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"waiting" 的意思是？',
        audioText: 'waiting',
        options: ['沿着', '村庄', '正在飞', '正在等'],
      },
      answer: '正在等',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"doing" 的意思是？',
        audioText: 'doing',
        options: ['正在画', '照片', '正在做', '太阳'],
      },
      answer: '正在做',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I'm going to shave.",
        translation: '我打算刮脸。',
      },
      answer: "I'm going to shave.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I'm going to wait for a bus.",
        translation: '我打算等公共汽车。',
      },
      answer: "I'm going to wait for a bus.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈwɒʃɪŋ/',
        meaning: '正在洗',
        example: 'He is washing the dishes.',
      },
      answer: 'washing',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈduːɪŋ/',
        meaning: '正在做',
        example: 'What are you doing?',
      },
      answer: 'doing',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What are you ______ now?',
        translation: '你现在在做什么？',
        options: ['Sun', 'Flying', 'Read', 'doing'],
      },
      answer: 'doing',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I'm ______ for a bus.",
        translation: '我正在等公共汽车。',
        options: ['waiting', 'Along', 'Pink', 'Across'],
      },
      answer: 'waiting',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What are you ______ now?',
        translation: '你现在在做什么？',
        options: ['Pink', 'doing', 'Grass', 'Air'],
      },
      answer: 'doing',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I\'m going to shave." 的正确翻译是？',
        passage: 'What are you going to do? / What are you doing now?',
        options: ['我打算刮脸。', '我正在刮脸。', '我打算给书橱上漆。', '你现在在做什么？'],
      },
      answer: '我打算刮脸。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"after" 的意思是？',
        audioText: 'after',
        options: ['横穿', '在……之后', '使……通风', '打开'],
      },
      answer: '在……之后',
      score: 10,
    },
  ],

  // Lesson 39: Lesson 39: Don't drop it! 别摔了！ (Level 2)
  39: [
    {
      type: 'listening',
      content: {
        question: '听录音，"drop" 的意思是？',
        audioText: 'drop',
        options: ['努力地', '掉下来', '衣服', '正在沿着跑'],
      },
      answer: '掉下来',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"flower" 的意思是？',
        audioText: 'flower',
        options: ['花', '横穿', '猫', '轮船'],
      },
      answer: '花',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"front" 的意思是？',
        audioText: 'front',
        options: ['进入', '正在穿过', '前面', '努力地'],
      },
      answer: '前面',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Be careful!',
        translation: '小心点！',
      },
      answer: 'Be careful!',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Give it to me.',
        translation: '把它给我。',
      },
      answer: 'Give it to me.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈflaʊə/',
        meaning: '花',
        example: 'Those lovely flowers.',
      },
      answer: 'flower',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/drɒp/',
        meaning: '掉下来',
        example: "Don't drop it!",
      },
      answer: 'drop',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Be ______',
        translation: '小心点！',
        options: ['careful', 'Flower', 'Vase', 'Drop'],
      },
      answer: 'careful',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is a lovely ______',
        translation: '这是一只漂亮的花瓶。',
        options: ['Flower', 'Drop', 'vase', 'Front'],
      },
      answer: 'vase',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Be careful!" 的正确翻译是？',
        passage: "Don't drop it!",
        options: [
          '小心点！',
          '我打算把它放在这张桌子上，萨姆。',
          '别摔了！',
          '我打算把它放在这儿，放在窗前。',
        ],
      },
      answer: '小心点！',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Don\'t put it there, Penny." 的正确翻译是？',
        passage: "Don't drop it!",
        options: [
          '小心点！',
          '我打算把它放在这张桌子上，萨姆。',
          '我打算把它放在这儿，放在窗前。',
          '不要放在那儿，彭妮。',
        ],
      },
      answer: '不要放在那儿，彭妮。',
      score: 10,
    },
  ],

  // Lesson 40: Lesson 40: What are you going to do? I'm going to... 你打算做什么？我打算…… (Level 2)
  40: [
    {
      type: 'listening',
      content: {
        question: '听录音，"take" 的意思是？',
        audioText: 'take',
        options: ['正在喝', '在……前面', '带给', '给'],
      },
      answer: '带给',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"send" 的意思是？',
        audioText: 'send',
        options: ['正在飞越', '送给', '妻子', '在……之后'],
      },
      answer: '送给',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"give" 的意思是？',
        audioText: 'give',
        options: ['正在横渡', '给', '飞机', '努力地'],
      },
      answer: '给',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I'm going to send it to my sister.",
        translation: '我打算把它寄给我姐姐。',
      },
      answer: "I'm going to send it to my sister.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I'm going to show it to my friend.",
        translation: '我打算把它给我朋友看。',
      },
      answer: "I'm going to show it to my friend.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/teɪk/',
        meaning: '带给',
        example: 'Take it to your mother.',
      },
      answer: 'take',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/send/',
        meaning: '送给',
        example: 'Send it to my sister.',
      },
      answer: 'send',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I'm going to ______ it to my sister.",
        translation: '我打算把它寄给我姐姐。',
        options: ['send', 'Take', 'Show', 'Give'],
      },
      answer: 'send',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I'm going to ______ it to my friend.",
        translation: '我打算把它给我朋友看。',
        options: ['Take', 'show', 'Give', 'Send'],
      },
      answer: 'show',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I'm going to ______ them to my mother.",
        translation: '我打算把它们送给我妈妈。',
        options: ['give', 'Take', 'Show', 'Send'],
      },
      answer: 'give',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What are you going to do with that book?" 的正确翻译是？',
        passage: "What are you going to do? / I'm going to...",
        options: [
          '你打算如何处理那封信？',
          '你打算如何处理那本书？',
          '我打算把它带给我哥哥。',
          '你打算如何处理那些花？',
        ],
      },
      answer: '你打算如何处理那本书？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"homework" 的意思是？',
        audioText: 'homework',
        options: ['作业', '正在喝', '正在关上', '家庭（成员）'],
      },
      answer: '作业',
      score: 10,
    },
  ],

  // Lesson 41: Lesson 41: Penny's bag 彭妮的包 (Level 2)
  41: [
    {
      type: 'listening',
      content: {
        question: '听录音，"piece" 的意思是？',
        audioText: 'piece',
        options: ['盘子，碟子', '一片', '正在出来', '打算'],
      },
      answer: '一片',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"soap" 的意思是？',
        audioText: 'soap',
        options: ['正在洗', '正在做', '正在等', '肥皂'],
      },
      answer: '肥皂',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"tea" 的意思是？',
        audioText: 'tea',
        options: ['正在……之间走', '云', '照片', '茶'],
      },
      answer: '茶',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'A bar of chocolate.',
        translation: '一块巧克力。',
      },
      answer: 'A bar of chocolate.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Here! Put it on this chair.',
        translation: '这里！放在这张椅子上。',
      },
      answer: 'Here! Put it on this chair.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/hɑːf/',
        meaning: '一半',
        example: 'Half a pound.',
      },
      answer: 'half',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tʃiːz/',
        meaning: '奶酪',
        example: 'A piece of cheese.',
      },
      answer: 'cheese',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'A ______ of sugar.',
        translation: '一磅糖。',
        options: ['pound', 'Loaf', 'Sugar', 'Bar'],
      },
      answer: 'pound',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'A quarter of a ______ of tea.',
        translation: '四分之一磅茶叶。',
        options: ['Bar', 'Half', 'pound', 'Chocolate'],
      },
      answer: 'pound',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"A quarter of a pound of tea." 的正确翻译是？',
        passage: "Penny's bag",
        options: [
          '里面是什么东西？',
          '四分之一磅茶叶。',
          '哦，当然不会是给我的！',
          '这里！放在这张椅子上。',
        ],
      },
      answer: '四分之一磅茶叶。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Half a pound of coffee." 的正确翻译是？',
        passage: "Penny's bag",
        options: ['半磅咖啡。', '一磅糖。', '一块肥皂。', '这里！放在这张椅子上。'],
      },
      answer: '半磅咖啡。',
      score: 10,
    },
  ],

  // Lesson 42: Lesson 42: Is there a... in/on that...? 在……中/上有一个……吗？ (Level 2)
  42: [
    {
      type: 'listening',
      content: {
        question: '听录音，"beer" 的意思是？',
        audioText: 'beer',
        options: ['啤酒', '穿过', '苹果', '河岸'],
      },
      answer: '啤酒',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"wine" 的意思是？',
        audioText: 'wine',
        options: ['一块', '蜂蜜', '酒', '掉下来'],
      },
      answer: '酒',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"jam" 的意思是？',
        audioText: 'jam',
        options: ['果酱', '一半', '前面', '船'],
      },
      answer: '果酱',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Is there any milk here?',
        translation: '这里有牛奶吗？',
      },
      answer: 'Is there any milk here?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Is there any butter here?',
        translation: '这里有黄油吗？',
      },
      answer: 'Is there any butter here?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/dʒæm/',
        meaning: '果酱',
        example: 'Is there any jam here?',
      },
      answer: 'jam',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈæpl/',
        meaning: '苹果',
        example: 'Is there an apple on the table?',
      },
      answer: 'apple',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ there is. There is one on the table.',
        translation: '是的，有。桌子上有一个。',
        options: ['Honey', 'Egg', 'Wine', 'Yes'],
      },
      answer: 'Yes',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, there is not. ______ is no milk here.',
        translation: '不，没有。这里没有牛奶。',
        options: ['Honey', 'There', 'Wine', 'Jam'],
      },
      answer: 'There',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is there any ______ here?',
        translation: '这里有牛奶吗？',
        options: ['milk', 'Apple', 'Passport', 'Honey'],
      },
      answer: 'milk',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, there is. There is one on the table." 的正确翻译是？',
        passage: 'Is there a... in/on that...?',
        options: [
          '是的，有。厨房里有一些。',
          '是的，有。桌子上有一个。',
          '这里有黄油吗？',
          '这里有护照吗？',
        ],
      },
      answer: '是的，有。桌子上有一个。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"reading" 的意思是？',
        audioText: 'reading',
        options: ['正在进入', '信', '前面', '正在阅读'],
      },
      answer: '正在阅读',
      score: 10,
    },
  ],

  // Lesson 43: Lesson 43: Hurry up! 快点！ (Level 2)
  43: [
    {
      type: 'listening',
      content: {
        question: '听录音，"now" 的意思是？',
        audioText: 'now',
        options: ['啤酒', '咖啡', '现在', '给……看'],
      },
      answer: '现在',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"teapot" 的意思是？',
        audioText: 'teapot',
        options: ['照耀', '小山', '花', '茶壶'],
      },
      answer: '茶壶',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"boil" 的意思是？',
        audioText: 'boil',
        options: ['送给', '天空', '河', '沸腾，开'],
      },
      answer: '沸腾，开',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Can you find them?',
        translation: '你能找到它们吗？',
      },
      answer: 'Can you find them?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Where is the tea?',
        translation: '茶叶在哪儿？',
      },
      answer: 'Where is the tea?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈtiːpɒt/',
        meaning: '茶壶',
        example: 'The teapot is behind the kettle.',
      },
      answer: 'teapot',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/faɪnd/',
        meaning: '找到',
        example: 'I can not find them.',
      },
      answer: 'find',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is there any water in this ______',
        translation: '这水壶里有水吗？',
        options: ['Teapot', 'Make', 'kettle', 'Behind'],
      },
      answer: 'kettle',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ up, Sam!',
        translation: '快点，萨姆！',
        options: ['Hurry', 'Find', 'Teapot', 'Make'],
      },
      answer: 'Hurry',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, there is." 的正确翻译是？',
        passage: 'Hurry up!',
        options: ['是的，有水。', '是的，我当然会，彭妮。', '你能找到吗？', '水开了！'],
      },
      answer: '是的，有水。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"The water is boiling!" 的正确翻译是？',
        passage: 'Hurry up!',
        options: ['水开了！', '茶叶在哪儿？', '茶杯在哪儿？', '你能找到吗？'],
      },
      answer: '水开了！',
      score: 10,
    },
  ],

  // Lesson 44: Lesson 44: Is there a...? / Are there any...? 有……吗？ (Level 2)
  44: [
    {
      type: 'listening',
      content: {
        question: '听录音，"milk" 的意思是？',
        audioText: 'milk',
        options: ['一半', '牛奶', '粉红色', '巧克力'],
      },
      answer: '牛奶',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"sugar" 的意思是？',
        audioText: 'sugar',
        options: ['酒', '糖', '打算', '花'],
      },
      answer: '糖',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"bread" 的意思是？',
        audioText: 'bread',
        options: ['奶酪', '面包', '在……后面', '沸腾，开'],
      },
      answer: '面包',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, there are some in the cupboard.',
        translation: '是的，碗柜里有一些。',
      },
      answer: 'Yes, there are some in the cupboard.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, there is some in the bottle.',
        translation: '是的，瓶子里有一些。',
      },
      answer: 'Yes, there is some in the bottle.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tʃiːz/',
        meaning: '奶酪',
        example: 'Is there any cheese?',
      },
      answer: 'cheese',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈʃʊɡə/',
        meaning: '糖',
        example: 'Is there any sugar?',
      },
      answer: 'sugar',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is there a teapot ______',
        translation: '这里有茶壶吗？',
        options: ['Sugar', 'here', 'Milk', 'Cheese'],
      },
      answer: 'here',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Are ______ any cups here?',
        translation: '这里有茶杯吗？',
        options: ['Sugar', 'there', 'Coffee', 'Cheese'],
      },
      answer: 'there',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Yes, ______ is some in the bottle.',
        translation: '是的，瓶子里有一些。',
        options: ['Coffee', 'Bread', 'Cheese', 'there'],
      },
      answer: 'there',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Is there any milk here?" 的正确翻译是？',
        passage: 'Is there a...? / Are there any...?',
        options: [
          '是的，碗柜里有一些。',
          '这里有牛奶吗？',
          '是的，桌子上有一个。',
          '这里有茶杯吗？',
        ],
      },
      answer: '这里有牛奶吗？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"into" 的意思是？',
        audioText: 'into',
        options: ['进入', '正在飞越', '正在跳', '工作'],
      },
      answer: '进入',
      score: 10,
    },
  ],

  // Lesson 45: Lesson 45: The boss's letter 老板的信 (Level 2)
  45: [
    {
      type: 'listening',
      content: {
        question: '听录音，"terrible" 的意思是？',
        audioText: 'terrible',
        options: ['打算', '糟糕的', '现在', '蜂蜜'],
      },
      answer: '糟糕的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"door" 的意思是？',
        audioText: 'door',
        options: ['牛奶', '苹果', '门', '下一个'],
      },
      answer: '门',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"ask" 的意思是？',
        audioText: 'ask',
        options: ['作业', '做，制作', '掉下来', '问，请求'],
      },
      answer: '问，请求',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, of course I can.',
        translation: '是的，当然可以。',
      },
      answer: 'Yes, of course I can.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, sir.',
        translation: '好的，先生。',
      },
      answer: 'Yes, sir.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈterəbl/',
        meaning: '糟糕的',
        example: 'The handwriting is terrible.',
      },
      answer: 'terrible',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/bɒs/',
        meaning: '老板',
        example: "The boss's letter.",
      },
      answer: 'boss',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ her please.',
        translation: '请问她吧。',
        options: ['Boss', 'Ask', 'Next', 'Door'],
      },
      answer: 'Ask',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Can she type this ______ for me?',
        translation: '她能为我打这封信吗？',
        options: ['letter', 'Boss', 'Minute', 'Handwriting'],
      },
      answer: 'letter',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Here you are." 的正确翻译是？',
        passage: "The boss's letter",
        options: ['老板的字太糟糕了！', '请你来一下好吗，鲍勃？', '请问她吧。', '给你。'],
      },
      answer: '给你。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, sir?" 的正确翻译是？',
        passage: "The boss's letter",
        options: ['我看不懂！', '什么事，先生？', '是的，当然可以。', '你为什么打不了？'],
      },
      answer: '什么事，先生？',
      score: 10,
    },
  ],

  // Lesson 46: Lesson 46: Can you...? 你能……吗？ (Level 2)
  46: [
    {
      type: 'listening',
      content: {
        question: '听录音，"read" 的意思是？',
        audioText: 'read',
        options: ['读', '正在飞越', '送给', '奶酪'],
      },
      answer: '读',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"type" 的意思是？',
        audioText: 'type',
        options: ['书写', '打字', '问，请求', '举起，抬起'],
      },
      answer: '打字',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"put" 的意思是？',
        audioText: 'put',
        options: ['前面', '给', '放', '问，请求'],
      },
      answer: '放',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'No, I can not.',
        translation: '不，我不能。',
      },
      answer: 'No, I can not.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Can you lift that table?',
        translation: '你能抬起那张桌子吗？',
      },
      answer: 'Can you lift that table?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/pʊt/',
        meaning: '放',
        example: 'Can you put it on the table?',
      },
      answer: 'put',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/riːd/',
        meaning: '读',
        example: 'Can you read this letter?',
      },
      answer: 'read',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Can you ______ this letter?',
        translation: '你能读这封信吗？',
        options: ['Put', 'read', 'Type', 'Lift'],
      },
      answer: 'read',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Can you ______ that table?',
        translation: '你能抬起那张桌子吗？',
        options: ['lift', 'Put', 'Type', 'Read'],
      },
      answer: 'lift',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Can you ______ it on the table?',
        translation: '你能把它放在桌子上吗？',
        options: ['Read', 'Lift', 'put', 'Type'],
      },
      answer: 'put',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, I can." 的正确翻译是？',
        passage: 'Can you...?',
        options: ['是的，我能。', '你能抬起那张桌子吗？', '不，我不能。', '你能把它放在桌子上吗？'],
      },
      answer: '是的，我能。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"sitting on" 的意思是？',
        audioText: 'sitting on',
        options: ['茶', '小心的', '鸡蛋', '正坐在'],
      },
      answer: '正坐在',
      score: 10,
    },
  ],

  // Lesson 47: Lesson 47: A cup of coffee 一杯咖啡 (Level 2)
  47: [
    {
      type: 'listening',
      content: {
        question: '听录音，"like" 的意思是？',
        audioText: 'like',
        options: ['喜欢', '黄油', '成熟的', '正在做'],
      },
      answer: '喜欢',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"jam" 的意思是？',
        audioText: 'jam',
        options: ['果酱', '啤酒', '老板', '带给'],
      },
      answer: '果酱',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"butter" 的意思是？',
        audioText: 'butter',
        options: ['四分之一', '糟糕的', '黄油', '现在'],
      },
      answer: '黄油',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, please.',
        translation: '是的，请放一些。',
      },
      answer: 'Yes, please.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Do you want a cup?',
        translation: '你要一杯吗？',
      },
      answer: 'Do you want a cup?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈæpl/',
        meaning: '苹果',
        example: 'Do you like apples?',
      },
      answer: 'apple',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/laɪk/',
        meaning: '喜欢',
        example: 'Do you like coffee?',
      },
      answer: 'like',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do you ______ coffee, Ann?',
        translation: '你喜欢咖啡吗，安？',
        options: ['Sweet', 'like', 'Honey', 'Pure'],
      },
      answer: 'like',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do you ______ biscuits?',
        translation: '你喜欢饼干吗？',
        options: ['Fresh', 'like', 'Wine', 'Ripe'],
      },
      answer: 'like',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Do you want a cup?" 的正确翻译是？',
        passage: 'A cup of coffee',
        options: ['你要一块吗？', '你要一杯吗？', '我喜欢清咖啡。', '你要放糖吗？'],
      },
      answer: '你要一杯吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, I do." 的正确翻译是？',
        passage: 'A cup of coffee',
        options: ['是的，我喜欢。', '是的，请放一些。', '不要了，谢谢。', '你喜欢饼干吗？'],
      },
      answer: '是的，我喜欢。',
      score: 10,
    },
  ],

  // Lesson 48: Lesson 48: Do you like...? / Do you want...? 你喜欢……吗？/ 你想要……吗？ (Level 2)
  48: [
    {
      type: 'listening',
      content: {
        question: '听录音，"biscuit" 的意思是？',
        audioText: 'biscuit',
        options: ['香蕉', '饼干', '果酱', '糟糕的'],
      },
      answer: '饼干',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"wine" 的意思是？',
        audioText: 'wine',
        options: ['酒', '喜欢', '匆忙，赶快', '牛奶'],
      },
      answer: '酒',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"beer" 的意思是？',
        audioText: 'beer',
        options: ['送给', '一块', '啤酒', '香蕉'],
      },
      answer: '啤酒',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Do you like wine?',
        translation: '你喜欢酒吗？',
      },
      answer: 'Do you like wine?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, I do.',
        translation: '是的，我喜欢。',
      },
      answer: 'Yes, I do.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/bɪə/',
        meaning: '啤酒',
        example: 'Do you like beer?',
      },
      answer: 'beer',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/waɪn/',
        meaning: '酒',
        example: 'Do you like wine?',
      },
      answer: 'wine',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do you want a ______',
        translation: '你要一杯吗？',
        options: ['glass', 'Wine', 'Beer', 'Biscuit'],
      },
      answer: 'glass',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, I do ______',
        translation: '不，我不喜欢。',
        options: ['Beer', 'Biscuit', 'not', 'Wine'],
      },
      answer: 'not',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do you like ______',
        translation: '你喜欢酒吗？',
        options: ['wine', 'Send', 'Letter', 'Washing'],
      },
      answer: 'wine',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, please." 的正确翻译是？',
        passage: 'Do you like...? / Do you want...?',
        options: ['你喜欢酒吗？', '好的，请给我一杯。', '你要一杯吗？', '你喜欢啤酒吗？'],
      },
      answer: '好的，请给我一杯。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"give" 的意思是？',
        audioText: 'give',
        options: ['信', '果酱', '奶酪', '给'],
      },
      answer: '给',
      score: 10,
    },
  ],

  // Lesson 49: Lesson 49: At the butcher's 在肉店 (Level 2)
  49: [
    {
      type: 'listening',
      content: {
        question: '听录音，"butcher" 的意思是？',
        audioText: 'butcher',
        options: ['咖啡', '蜂蜜', '香蕉', '肉店老板'],
      },
      answer: '肉店老板',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"chicken" 的意思是？',
        audioText: 'chicken',
        options: ['信', '丈夫', '鸡', '给'],
      },
      answer: '鸡',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"tell" 的意思是？',
        audioText: 'tell',
        options: ['告诉', '读', '饼干', '护照'],
      },
      answer: '告诉',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'No, thank you.',
        translation: '不，谢谢。',
      },
      answer: 'No, thank you.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, I do.',
        translation: '是的，我要买。',
      },
      answer: 'Yes, I do.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈaɪðə/',
        meaning: '也（用于否定句）',
        example: 'I do not like chicken either.',
      },
      answer: 'either',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/truːθ/',
        meaning: '真话',
        example: 'To tell you the truth.',
      },
      answer: 'truth',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I like lamb, but my ______ does not.',
        translation: '我喜欢羔羊肉，但我丈夫不喜欢。',
        options: ['Chicken', 'Lamb', 'Steak', 'husband'],
      },
      answer: 'husband',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do you want ______ or lamb?',
        translation: '您要牛肉还是要羔羊肉？',
        options: ['Husband', 'Steak', 'beef', 'Chicken'],
      },
      answer: 'beef',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Beef, please." 的正确翻译是？',
        passage: "At the butcher's",
        options: ['来点牛排怎么样？', '这一块很好。', '是的，我要买。', '请给我牛肉。'],
      },
      answer: '请给我牛肉。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They are very nice." 的正确翻译是？',
        passage: "At the butcher's",
        options: ['它们很好。', '请给我那一块。', '不，谢谢。', '我喜欢羔羊肉，但我丈夫不喜欢。'],
      },
      answer: '它们很好。',
      score: 10,
    },
  ],

  // Lesson 50: Lesson 50: He likes... 他喜欢…… (Level 2)
  50: [
    {
      type: 'listening',
      content: {
        question: '听录音，"tomato" 的意思是？',
        audioText: 'tomato',
        options: ['啤酒', '喜欢', '送给', '西红柿'],
      },
      answer: '西红柿',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"grape" 的意思是？',
        audioText: 'grape',
        options: ['葡萄', '一块', '生菜', '纯净的'],
      },
      answer: '葡萄',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"lettuce" 的意思是？',
        audioText: 'lettuce',
        options: ['丈夫', '生菜', '读', '一条'],
      },
      answer: '生菜',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, he does. He likes tomatoes.',
        translation: '是的，他喜欢。他喜欢西红柿。',
      },
      answer: 'Yes, he does. He likes tomatoes.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Does he like cabbage?',
        translation: '他喜欢卷心菜吗？',
      },
      answer: 'Does he like cabbage?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/peə/',
        meaning: '梨',
        example: 'He likes pears.',
      },
      answer: 'pear',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/piː/',
        meaning: '豌豆',
        example: 'He likes peas.',
      },
      answer: 'pea',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Does he like ______',
        translation: '他喜欢卷心菜吗？',
        options: ['Grape', 'cabbage', 'Potato', 'Pea'],
      },
      answer: 'cabbage',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Does he ______ tomatoes?',
        translation: '他喜欢西红柿吗？',
        options: ['like', 'Lettuce', 'Cabbage', 'Pea'],
      },
      answer: 'like',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, he does not. He does not like ______',
        translation: '不，他不喜欢。他不喜欢卷心菜。',
        options: ['Pear', 'Peach', 'cabbage', 'Bean'],
      },
      answer: 'cabbage',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, he does not. He does not like cabbage." 的正确翻译是？',
        passage: 'He likes...',
        options: [
          '他喜欢西红柿吗？',
          '是的，他喜欢。他喜欢生菜。',
          '不，他不喜欢。他不喜欢卷心菜。',
          '是的，他喜欢。他喜欢西红柿。',
        ],
      },
      answer: '不，他不喜欢。他不喜欢卷心菜。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"tobacco" 的意思是？',
        audioText: 'tobacco',
        options: ['苹果', '茶', '烟草', '打字'],
      },
      answer: '烟草',
      score: 10,
    },
  ],

  // Lesson 51: Lesson 51: A pleasant climate 宜人的气候 (Level 2)
  51: [
    {
      type: 'listening',
      content: {
        question: '听录音，"climate" 的意思是？',
        audioText: 'climate',
        options: ['气候', '奶酪', '沸腾，开', '国家'],
      },
      answer: '气候',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"autumn" 的意思是？',
        audioText: 'autumn',
        options: ['西方', '肉店老板', '甜的', '秋天'],
      },
      answer: '秋天',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"east" 的意思是？',
        audioText: 'east',
        options: ['鸡蛋', '冬天', '东方', '梨'],
      },
      answer: '东方',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Is it cold or warm in autumn?',
        translation: '秋天是冷还是暖？',
      },
      answer: 'Is it cold or warm in autumn?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It is always warm in September and October.',
        translation: '九月和十月总是很暖和。',
      },
      answer: 'It is always warm in September and October.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈklaɪmət/',
        meaning: '气候',
        example: 'What is the climate like?',
      },
      answer: 'climate',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/iːst/',
        meaning: '东方',
        example: 'In the east.',
      },
      answer: 'east',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What is the ______ like in summer?',
        translation: '夏天的天气怎么样？',
        options: ['Spring', 'Sometimes', 'West', 'weather'],
      },
      answer: 'weather',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is it cold or ______ in autumn?',
        translation: '秋天是冷还是暖？',
        options: ['warm', 'Sometimes', 'Climate', 'Country'],
      },
      answer: 'warm',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is often cold in November and it rains sometimes." 的正确翻译是？',
        passage: 'A pleasant climate',
        options: [
          '十一月经常很冷，有时下雨。',
          '春天的天气怎么样？',
          '十二月、一月和二月总是很冷。',
          '四月和五月总是很温暖，但有时下雨。',
        ],
      },
      answer: '十一月经常很冷，有时下雨。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is very pleasant." 的正确翻译是？',
        passage: 'A pleasant climate',
        options: [
          '秋天是冷还是暖？',
          '气候非常宜人。',
          '十一月经常很冷，有时下雨。',
          '我是希腊人。',
        ],
      },
      answer: '气候非常宜人。',
      score: 10,
    },
  ],

  // Lesson 52: Lesson 52: What nationality are they? 他们是哪国人？ (Level 2)
  52: [
    {
      type: 'listening',
      content: {
        question: '听录音，"Spanish" 的意思是？',
        audioText: 'Spanish',
        options: ['饼干', '当然', '做，制作', '西班牙人'],
      },
      answer: '西班牙人',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"German" 的意思是？',
        audioText: 'German',
        options: ['国家', '喜欢', '鸡', '德国人'],
      },
      answer: '德国人',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"French" 的意思是？',
        audioText: 'French',
        options: ['挪威人', '西方', '肉店老板', '法国人'],
      },
      answer: '法国人',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What nationality are you?',
        translation: '你是哪国人？',
      },
      answer: 'What nationality are you?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I come from America.',
        translation: '我是美国人。',
      },
      answer: 'I come from America.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈdʒɜːmən/',
        meaning: '德国人',
        example: 'He is German.',
      },
      answer: 'german',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈrʌʃn/',
        meaning: '俄国人',
        example: 'He is Russian.',
      },
      answer: 'russian',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I ______ from America.',
        translation: '我是美国人。',
        options: ['Russian', 'German', 'come', 'American'],
      },
      answer: 'come',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What ______ are you?',
        translation: '你是哪国人？',
        options: ['English', 'Russian', 'Swedish', 'nationality'],
      },
      answer: 'nationality',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Where do you ______ from?',
        translation: '你是哪国人？',
        options: ['come', 'American', 'French', 'Swedish'],
      },
      answer: 'come',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What nationality is he?" 的正确翻译是？',
        passage: 'What nationality are they?',
        options: ['他是哪国人？', '我是美国人。', '他是哪国人？', '我是美国人。'],
      },
      answer: '他是哪国人？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"pure" 的意思是？',
        audioText: 'pure',
        options: ['有时', '纯净的', '成熟的', '宜人的'],
      },
      answer: '纯净的',
      score: 10,
    },
  ],

  // Lesson 53: Lesson 53: An interesting climate 有趣的气候 (Level 2)
  53: [
    {
      type: 'listening',
      content: {
        question: '听录音，"Australia" 的意思是？',
        audioText: 'Australia',
        options: ['下一个', '澳大利亚', '选择', '奶酪'],
      },
      answer: '澳大利亚',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"Nigerian" 的意思是？',
        audioText: 'Nigerian',
        options: ['饼干', '面包', '啤酒', '尼日利亚人'],
      },
      answer: '尼日利亚人',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"subject" 的意思是？',
        audioText: 'subject',
        options: ['话题，科目', '澳大利亚人', '西方', '喜欢'],
      },
      answer: '话题，科目',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Where do you come from?',
        translation: '你是哪国人？',
      },
      answer: 'Where do you come from?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What is the climate like in your country?',
        translation: '你们国家的气候怎么样？',
      },
      answer: 'What is the climate like in your country?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/kəˈneɪdiən/',
        meaning: '加拿大人',
        example: 'He is Canadian.',
      },
      answer: 'canadian',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈɪndiə/',
        meaning: '印度',
        example: 'I come from India.',
      },
      answer: 'india',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is our favourite subject of ______',
        translation: '它是我们最喜欢的话题。',
        options: ['Indian', 'Nigeria', 'conversation', 'Interesting'],
      },
      answer: 'conversation',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Our climate is not very good, but it is certainly ______',
        translation: '我们的气候不是很好，但确实很有趣。',
        options: ['Nigeria', 'Subject', 'Conversation', 'interesting'],
      },
      answer: 'interesting',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I like spring and summer." 的正确翻译是？',
        passage: 'An interesting climate',
        options: [
          '白天短，夜晚长。',
          '我不喜欢秋天和冬天。',
          '它是我们最喜欢的话题。',
          '我喜欢春天和夏天。',
        ],
      },
      answer: '我喜欢春天和夏天。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I come from England." 的正确翻译是？',
        passage: 'An interesting climate',
        options: [
          '我不喜欢秋天和冬天。',
          '我是英国人。',
          '你们国家的气候怎么样？',
          '我喜欢春天和夏天。',
        ],
      },
      answer: '我是英国人。',
      score: 10,
    },
  ],

  // Lesson 54: Lesson 54: What country are they from? 他们来自哪个国家？ (Level 2)
  54: [
    {
      type: 'listening',
      content: {
        question: '听录音，"Canada" 的意思是？',
        audioText: 'Canada',
        options: ['果酱', '有趣的', '加拿大', '冬天'],
      },
      answer: '加拿大',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"Poland" 的意思是？',
        audioText: 'Poland',
        options: ['冬天', '桃子', '波兰', '葡萄'],
      },
      answer: '波兰',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"Austria" 的意思是？',
        audioText: 'Austria',
        options: ['奥地利', '澳大利亚人', '秋天', '葡萄'],
      },
      answer: '奥地利',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He comes from Australia.',
        translation: '他来自澳大利亚。',
      },
      answer: 'He comes from Australia.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He comes from Australia.',
        translation: '他是澳大利亚人。',
      },
      answer: 'He comes from Australia.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈdenmɑːk/',
        meaning: '丹麦',
        example: 'He comes from Denmark.',
      },
      answer: 'denmark',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkænədə/',
        meaning: '加拿大',
        example: 'He comes from Canada.',
      },
      answer: 'canada',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He comes from ______',
        translation: '他是澳大利亚人。',
        options: ['Belgium', 'Australia', 'Denmark', 'Thailand'],
      },
      answer: 'Australia',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He comes from ______',
        translation: '他来自澳大利亚。',
        options: ['Australia', 'Finland', 'Denmark', 'Poland'],
      },
      answer: 'Australia',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What country does he ______ from?',
        translation: '他来自哪个国家？',
        options: ['Belgium', 'Australia', 'come', 'Austria'],
      },
      answer: 'come',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What country does he come from?" 的正确翻译是？',
        passage: 'What country are they from?',
        options: ['他是哪国人？', '他来自澳大利亚。', '他来自哪个国家？', '他是澳大利亚人。'],
      },
      answer: '他来自哪个国家？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"Nigeria" 的意思是？',
        audioText: 'Nigeria',
        options: ['糟糕的', '苹果', '澳大利亚人', '尼日利亚'],
      },
      answer: '尼日利亚',
      score: 10,
    },
  ],

  // Lesson 55: Lesson 55: The Sawyer family 索耶一家 (Level 2)
  55: [
    {
      type: 'listening',
      content: {
        question: '听录音，"afternoon" 的意思是？',
        audioText: 'afternoon',
        options: ['加拿大', '下午', '糟糕的', '通常'],
      },
      answer: '下午',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"stay" 的意思是？',
        audioText: 'stay',
        options: ['呆在，停留', '对话', '下雨', '尼日利亚人'],
      },
      answer: '呆在，停留',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"usually" 的意思是？',
        audioText: 'usually',
        options: ['瑞典人', '通常', '奥地利', '北方'],
      },
      answer: '通常',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'In the afternoon, she usually sees her friends.',
        translation: '下午，她通常会见朋友。',
      },
      answer: 'In the afternoon, she usually sees her friends.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Mr Sawyer comes home from work.',
        translation: '索耶先生下班回家。',
      },
      answer: 'Mr Sawyer comes home from work.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/təˈɡeðə/',
        meaning: '一起',
        example: 'They drink tea together.',
      },
      answer: 'together',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/steɪ/',
        meaning: '呆在，停留',
        example: 'They stay at home.',
      },
      answer: 'stay',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She does the ______',
        translation: '她做家务。',
        options: ['Together', 'Evening', 'Home', 'housework'],
      },
      answer: 'housework',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She always eats her ______ at noon.',
        translation: '她总是在中午吃午饭。',
        options: ['Stay', 'Home', 'Live', 'lunch'],
      },
      answer: 'lunch',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They often drink tea together." 的正确翻译是？',
        passage: 'The Sawyer family',
        options: [
          '她总是在中午吃午饭。',
          '他们很早就到家了。',
          '傍晚，孩子们放学回家。',
          '她们经常一起喝茶。',
        ],
      },
      answer: '她们经常一起喝茶。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"The Sawyers live at 87 King Street." 的正确翻译是？',
        passage: 'The Sawyer family',
        options: [
          '晚上，孩子们总是做作业。',
          '她做家务。',
          '下午，她通常会见朋友。',
          '索耶一家住在国王街87号。',
        ],
      },
      answer: '索耶一家住在国王街87号。',
      score: 10,
    },
  ],

  // Lesson 56: Lesson 56: What do they usually do? 他们通常做什么？ (Level 2)
  56: [
    {
      type: 'listening',
      content: {
        question: '听录音，"noon" 的意思是？',
        audioText: 'noon',
        options: ['中午', '南方', '读', '有趣的'],
      },
      answer: '中午',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"morning" 的意思是？',
        audioText: 'morning',
        options: ['印度', '澳大利亚人', '宜人的', '早上'],
      },
      answer: '早上',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"night" 的意思是？',
        audioText: 'night',
        options: ['西方', '法国人', '晚上，夜里', '成熟的'],
      },
      answer: '晚上，夜里',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What does she usually do in the morning?',
        translation: '她早上通常做什么？',
      },
      answer: 'What does she usually do in the morning?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'She usually sees her friends.',
        translation: '她通常见朋友。',
      },
      answer: 'She usually sees her friends.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/nuːn/',
        meaning: '中午',
        example: 'At noon.',
      },
      answer: 'noon',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈmɔːnɪŋ/',
        meaning: '早上',
        example: 'In the morning.',
      },
      answer: 'morning',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What do ______ usually do in the evening?',
        translation: '他们晚上通常做什么？',
        options: ['they', 'Morning', 'Night', 'Noon'],
      },
      answer: 'they',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They ______ watch television.',
        translation: '他们通常看电视。',
        options: ['Night', 'Noon', 'Morning', 'usually'],
      },
      answer: 'usually',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ sees her friends.',
        translation: '她通常见朋友。',
        options: ['Morning', 'Noon', 'Night', 'usually'],
      },
      answer: 'usually',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They usually watch television." 的正确翻译是？',
        passage: 'What do they usually do?',
        options: ['她通常见朋友。', '她下午通常做什么？', '他们通常看电视。', '她通常去上班。'],
      },
      answer: '他们通常看电视。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"sometimes" 的意思是？',
        audioText: 'sometimes',
        options: ['读', '打字', '有时', '尼日利亚'],
      },
      answer: '有时',
      score: 10,
    },
  ],

  // Lesson 57: Lesson 57: An unusual day 不寻常的一天 (Level 2)
  57: [
    {
      type: 'listening',
      content: {
        question: '听录音，"shop" 的意思是？',
        audioText: 'shop',
        options: ['有趣的', '尼日利亚人', '商店', '通常'],
      },
      answer: '商店',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"unusual" 的意思是？',
        audioText: 'unusual',
        options: ['不寻常的', '晚上', '法国人', '东方'],
      },
      answer: '不寻常的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"moment" 的意思是？',
        audioText: 'moment',
        options: ['时刻', '土耳其人', '告诉', '商店'],
      },
      answer: '时刻',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'But he is not reading his newspaper tonight.',
        translation: '但今天晚上他没在看报纸。',
      },
      answer: 'But he is not reading his newspaper tonight.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Mr Sawyer usually reads his newspaper at night.',
        translation: '索耶先生晚上通常看报纸。',
      },
      answer: 'Mr Sawyer usually reads his newspaper at night.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ʃɒp/',
        meaning: '商店',
        example: 'She goes to the shops.',
      },
      answer: 'shop',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ʌnˈjuːʒuəl/',
        meaning: '不寻常的',
        example: 'An unusual day.',
      },
      answer: 'unusual',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'At the ______ they are playing in the garden.',
        translation: '此刻，他们在花园里玩耍。',
        options: ['moment', 'Chicken', 'English', 'Beef'],
      },
      answer: 'moment',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'At the ______ he is reading an interesting book.',
        translation: '此刻，他在读一本有趣的书。',
        options: ['Indian', 'Belgium', 'moment', 'French'],
      },
      answer: 'moment',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is six o\'clock." 的正确翻译是？',
        passage: 'An unusual day',
        options: [
          '下午，索耶夫人通常在客厅喝茶。',
          '现在是六点钟。',
          '此刻，他们在花园里玩耍。',
          '此刻，他在读一本有趣的书。',
        ],
      },
      answer: '现在是六点钟。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is ten o\'clock." 的正确翻译是？',
        passage: 'An unusual day',
        options: [
          '现在是十点钟。',
          '此刻，他们在花园里玩耍。',
          '现在是八点钟。',
          '晚上，孩子们通常做作业，但今天晚上，他们没在做作业。',
        ],
      },
      answer: '现在是十点钟。',
      score: 10,
    },
  ],

  // Lesson 58: Lesson 58: What's the time? 几点了？ (Level 2)
  58: [
    {
      type: 'listening',
      content: {
        question: '听录音，"past" 的意思是？',
        audioText: 'past',
        options: ['家', '泰国', '春天', '过'],
      },
      answer: '过',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"o\'clock" 的意思是？',
        audioText: "o'clock",
        options: ['……点钟', '意大利人', '商店', '土豆'],
      },
      answer: '……点钟',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"to" 的意思是？',
        audioText: 'to',
        options: ['羔羊肉', '晚上，夜里', '也（用于否定句）', '差'],
      },
      answer: '差',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It is half past eight.',
        translation: '八点半。',
      },
      answer: 'It is half past eight.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It is a quarter to nine.',
        translation: '八点四十五（差一刻九点）。',
      },
      answer: 'It is a quarter to nine.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tuː/',
        meaning: '差',
        example: 'Ten to eight.',
      },
      answer: 'to',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/əˈklɒk/',
        meaning: '……点钟',
        example: "It is eight o'clock.",
      },
      answer: "o'clock",
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is a quarter ______ eight.',
        translation: '八点一刻。',
        options: ['Always', 'Pleasant', 'past', 'Steak'],
      },
      answer: 'past',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is ten ______ eight.',
        translation: '八点十分。',
        options: ['past', 'Always', 'Night', 'French'],
      },
      answer: 'past',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is twenty to ______',
        translation: '八点四十（差二十分九点）。',
        options: ['Past', "O'clock", 'To', 'nine'],
      },
      answer: 'nine',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is ten past eight." 的正确翻译是？',
        passage: "What's the time?",
        options: ['八点十分。', '八点半。', '八点了。', '几点了？'],
      },
      answer: '八点十分。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"home" 的意思是？',
        audioText: 'home',
        options: ['家', '加拿大人', '对话', '印度'],
      },
      answer: '家',
      score: 10,
    },
  ],

  // Lesson 59: Lesson 59: Is that all? 就这些吗？ (Level 2)
  59: [
    {
      type: 'listening',
      content: {
        question: '听录音，"size" 的意思是？',
        audioText: 'size',
        options: ['尼日利亚', '尺寸，大小', '澳大利亚人', '尼日利亚人'],
      },
      answer: '尺寸，大小',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"change" 的意思是？',
        audioText: 'change',
        options: ['零钱', '真话', '晚上', '法国人'],
      },
      answer: '零钱',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"envelope" 的意思是？',
        audioText: 'envelope',
        options: ['胶水', '信封', '尼日利亚人', '羔羊肉'],
      },
      answer: '信封',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What else do you want?',
        translation: '您还要什么？',
      },
      answer: 'What else do you want?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The large size, please.',
        translation: '请给我大号的。',
      },
      answer: 'The large size, please.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tʃɔːk/',
        meaning: '粉笔',
        example: 'I want a box of chalk.',
      },
      answer: 'chalk',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/saɪz/',
        meaning: '尺寸，大小',
        example: 'What size?',
      },
      answer: 'size',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'And I want some ______',
        translation: '我还想要一些胶水。',
        options: ['glue', 'Change', 'Envelope', 'Chalk'],
      },
      answer: 'glue',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The large ______ please.',
        translation: '请给我大号的。',
        options: ['Chalk', 'Pad', 'Change', 'size'],
      },
      answer: 'size',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"The large size, please." 的正确翻译是？',
        passage: 'Is that all?',
        options: ['请给我大号的。', '我想要一些信封。', '我还想要一大盒粉笔。', '就这些吗？'],
      },
      answer: '请给我大号的。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Do you want the large size or the small size?" 的正确翻译是？',
        passage: 'Is that all?',
        options: ['我没有小号的便签簿。', '您要大号的还是小号的？', '是的，我们有。', '一瓶胶水。'],
      },
      answer: '您要大号的还是小号的？',
      score: 10,
    },
  ],

  // Lesson 60: Lesson 60: The future 将来 (Level 2)
  60: [
    {
      type: 'listening',
      content: {
        question: '听录音，"future" 的意思是？',
        audioText: 'future',
        options: ['售货员', '将来', '气候', '下午'],
      },
      answer: '将来',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"holiday" 的意思是？',
        audioText: 'holiday',
        options: ['……点钟', '通常', '晚上，夜里', '假期'],
      },
      answer: '假期',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I am going to have a holiday.',
        translation: '我打算去度假。',
      },
      answer: 'I am going to have a holiday.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I am going to have it next month.',
        translation: '我打算下个月去。',
      },
      answer: 'I am going to have it next month.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈhɒlədeɪ/',
        meaning: '假期',
        example: 'I am going to have a holiday.',
      },
      answer: 'holiday',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈfjuːtʃə/',
        meaning: '将来',
        example: 'In the future.',
      },
      answer: 'future',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When are you ______ to have it?',
        translation: '你打算什么时候去？',
        options: ['Usually', 'Australian', 'West', 'going'],
      },
      answer: 'going',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ I am.',
        translation: '是的，我打算去。',
        options: ['Conversation', 'Lettuce', 'Climate', 'Yes'],
      },
      answer: 'Yes',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Are you going to have a ______',
        translation: '你打算去度假吗？',
        options: ['Thailand', 'Winter', 'holiday', 'Size'],
      },
      answer: 'holiday',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I am going to have a holiday." 的正确翻译是？',
        passage: 'The future',
        options: ['是的，我打算去。', '我打算去度假。', '我打算下个月去。', '你打算去度假吗？'],
      },
      answer: '我打算去度假。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"size" 的意思是？',
        audioText: 'size',
        options: ['北方', '德国人', '差', '尺寸，大小'],
      },
      answer: '尺寸，大小',
      score: 10,
    },
  ],

  // Lesson 61: Lesson 61: A bad cold 重感冒 (Level 2)
  61: [
    {
      type: 'listening',
      content: {
        question: '听录音，"medicine" 的意思是？',
        audioText: 'medicine',
        options: ['芬兰', '土耳其人', '家务', '药'],
      },
      answer: '药',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"flu" 的意思是？',
        audioText: 'flu',
        options: ['泰国', '呆在，停留', '流行性感冒', '经常'],
      },
      answer: '流行性感冒',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"toothache" 的意思是？',
        audioText: 'toothache',
        options: ['比利时', '牙痛', '通常', '胃痛'],
      },
      answer: '牙痛',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'That is good news for Jimmy.',
        translation: '这对吉米来说是个好消息。',
      },
      answer: 'That is good news for Jimmy.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Where is Jimmy?',
        translation: '吉米在哪儿？',
      },
      answer: 'Where is Jimmy?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/fluː/',
        meaning: '流行性感冒',
        example: 'I have the flu.',
      },
      answer: 'flu',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/mʌmps/',
        meaning: '流行性腮腺炎',
        example: 'He has mumps.',
      },
      answer: 'mumps',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He has a bad ______ Mr Williams.',
        translation: '他得了重感冒，威廉斯先生。',
        options: ['Stomach', 'Toothache', 'cold', 'Aspirin'],
      },
      answer: 'cold',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What is the ______ with him, doctor?',
        translation: '他怎么了，医生？',
        options: ['Measles', 'Aspirin', 'Headache', 'matter'],
      },
      answer: 'matter',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"We must call the doctor." 的正确翻译是？',
        passage: 'A bad cold',
        options: ['好消息？为什么？', '记得。是09754。', '是的，我们必须请。', '我们必须请医生。'],
      },
      answer: '我们必须请医生。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"That is good news for Jimmy." 的正确翻译是？',
        passage: 'A bad cold',
        options: [
          '是的，我们必须请。',
          '这对吉米来说是个好消息。',
          '他怎么了？',
          '因为他不喜欢上学！',
        ],
      },
      answer: '这对吉米来说是个好消息。',
      score: 10,
    },
  ],

  // Lesson 62: Lesson 62: What's the matter with...? ……怎么了？ (Level 2)
  62: [
    {
      type: 'listening',
      content: {
        question: '听录音，"head" 的意思是？',
        audioText: 'head',
        options: ['头', '麻疹', '荷兰人', '早上'],
      },
      answer: '头',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"ear" 的意思是？',
        audioText: 'ear',
        options: ['巴西人', '零钱', '耳朵', '粉笔'],
      },
      answer: '耳朵',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"tooth" 的意思是？',
        audioText: 'tooth',
        options: ['到达', '牙齿', '晚上，夜里', '麻疹'],
      },
      answer: '牙齿',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What must she do?',
        translation: '她该怎么办？',
      },
      answer: 'What must she do?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He has a headache.',
        translation: '他头痛。',
      },
      answer: 'He has a headache.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tuːθ/',
        meaning: '牙齿',
        example: 'I have a toothache.',
      },
      answer: 'tooth',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɪə/',
        meaning: '耳朵',
        example: 'I have an earache.',
      },
      answer: 'ear',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She must see a ______',
        translation: '她必须看医生。',
        options: ['Stomach', 'Ear', 'Head', 'doctor'],
      },
      answer: 'doctor',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She has an ______',
        translation: '她耳痛。',
        options: ['Stomach', 'Head', 'earache', 'Ear'],
      },
      answer: 'earache',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He has a ______',
        translation: '他头痛。',
        options: ['Stomach', 'Ear', 'headache', 'Head'],
      },
      answer: 'headache',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What is the matter with her?" 的正确翻译是？',
        passage: "What's the matter with...?",
        options: ['他头痛。', '她怎么了？', '她耳痛。', '他怎么了？'],
      },
      answer: '她怎么了？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"English" 的意思是？',
        audioText: 'English',
        options: ['信封', '胶水', '德国人', '英国人'],
      },
      answer: '英国人',
      score: 10,
    },
  ],

  // Lesson 63: Lesson 63: Thank you, doctor 谢谢你，医生 (Level 2)
  63: [
    {
      type: 'listening',
      content: {
        question: '听录音，"rich" 的意思是？',
        audioText: 'rich',
        options: ['晚上', '印度', '富的', '话题，科目'],
      },
      answer: '富的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"food" 的意思是？',
        audioText: 'food',
        options: ['不寻常的', '食物', '一起', '售货员'],
      },
      answer: '食物',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"remain" 的意思是？',
        audioText: 'remain',
        options: ['假期', '午餐', '到达', '保持，停留'],
      },
      answer: '保持，停留',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'No, he does not.',
        translation: '不，他不发烧。',
      },
      answer: 'No, he does not.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'You must keep the room warm.',
        translation: '你必须保持房间温暖。',
      },
      answer: 'You must keep the room warm.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈbetə/',
        meaning: '更好的',
        example: 'He is better.',
      },
      answer: 'better',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/rɪtʃ/',
        meaning: '富的',
        example: 'He is rich.',
      },
      answer: 'rich',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Yes. He must ______ in bed for another two days.',
        translation: '是的。他必须再卧床两天。',
        options: ['remain', 'Yet', 'Better', 'Certainly'],
      },
      answer: 'remain',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'You are ______ now, but you must not get up yet.',
        translation: '你现在好些了，但还不能起床。',
        options: ['Remain', 'Food', 'Rich', 'better'],
      },
      answer: 'better',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Where is Mr Williams this evening?" 的正确翻译是？',
        passage: 'Thank you, doctor',
        options: [
          '上楼来。',
          '他每天可以起来大约两小时，但他必须卧床。',
          '而且他不能吃油腻的食物。',
          '威廉斯先生今晚在哪儿？',
        ],
      },
      answer: '威廉斯先生今晚在哪儿？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He is in bed, doctor." 的正确翻译是？',
        passage: 'Thank you, doctor',
        options: [
          '你看起来很好，吉米。',
          '你必须再卧床两天。',
          '不，他不发烧。',
          '他在床上，医生。',
        ],
      },
      answer: '他在床上，医生。',
      score: 10,
    },
  ],

  // Lesson 64: Lesson 64: Don't...! 不要……！ (Level 2)
  64: [
    {
      type: 'listening',
      content: {
        question: '听录音，"break" 的意思是？',
        audioText: 'break',
        options: ['加拿大', '打破', '体温，发烧', '呆在，停留'],
      },
      answer: '打破',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"take" 的意思是？',
        audioText: 'take',
        options: ['起床', '还（用于否定句）', '吃（药），拿', '住，生活'],
      },
      answer: '吃（药），拿',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Do not eat rich food!',
        translation: '不要吃油腻的食物！',
      },
      answer: 'Do not eat rich food!',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Do not drink milk!',
        translation: '不要喝牛奶！',
      },
      answer: 'Do not drink milk!',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/breɪk/',
        meaning: '打破',
        example: 'Do not break that vase!',
      },
      answer: 'break',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/teɪk/',
        meaning: '吃（药），拿',
        example: 'Do not take aspirin!',
      },
      answer: 'take',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do not eat rich ______',
        translation: '不要吃油腻的食物！',
        options: ['food', 'Tooth', 'Live', "O'clock"],
      },
      answer: 'food',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do not drink ______',
        translation: '不要喝牛奶！',
        options: ['Envelope', 'Housework', "O'clock", 'milk'],
      },
      answer: 'milk',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do not ______ this medicine!',
        translation: '不要吃这个药！',
        options: ['Flu', 'Afternoon', 'take', 'To'],
      },
      answer: 'take',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Why not?" 的正确翻译是？',
        passage: "Don't...!",
        options: ['不要躺在床上！', '为什么不要？', '为什么不要？', '不要吃这个药！'],
      },
      answer: '为什么不要？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"unusual" 的意思是？',
        audioText: 'unusual',
        options: ['不寻常的', '……点钟', '差', '加拿大'],
      },
      answer: '不寻常的',
      score: 10,
    },
  ],

  // Lesson 65: Lesson 65: Not a baby 不是小孩子 (Level 2)
  65: [
    {
      type: 'listening',
      content: {
        question: '听录音，"enjoy" 的意思是？',
        audioText: 'enjoy',
        options: ['享受', '头', '吃（药），拿', '钥匙'],
      },
      answer: '享受',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"baby" 的意思是？',
        audioText: 'baby',
        options: ['……点钟', '通常', '婴儿', '坏的，严重的'],
      },
      answer: '婴儿',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"yourself" 的意思是？',
        audioText: 'yourself',
        options: ['你自己', '牙医', '尺寸，大小', '将来'],
      },
      answer: '你自己',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Dad says I can have it.',
        translation: '爸爸说我可以拿。',
      },
      answer: 'Dad says I can have it.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'But come home early.',
        translation: '但要早点回家。',
      },
      answer: 'But come home early.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɪnˈdʒɔɪ/',
        meaning: '享受',
        example: 'Enjoy yourself!',
      },
      answer: 'enjoy',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/hɪə/',
        meaning: '听见',
        example: 'I can hear you.',
      },
      answer: 'hear',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ yourself!',
        translation: '好好玩！',
        options: ['Yourself', 'Baby', 'Dad', 'Enjoy'],
      },
      answer: 'Enjoy',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Here is the ______',
        translation: '给你钥匙。',
        options: ['Dad', 'Hear', 'key', 'Enjoy'],
      },
      answer: 'key',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, you can not." 的正确翻译是？',
        passage: 'Not a baby',
        options: ['不，你不能。', '我总是很早回家。', '今天你可以拿钥匙。', '给我钥匙。'],
      },
      answer: '不，你不能。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He says I can get home early." 的正确翻译是？',
        passage: 'Not a baby',
        options: [
          '我不是小孩子。',
          '请给我前门的钥匙。',
          '他说我可以早点回家。',
          '我们总是玩得很开心，妈妈。',
        ],
      },
      answer: '他说我可以早点回家。',
      score: 10,
    },
  ],

  // Lesson 66: Lesson 66: What's the time? 几点了？ (Level 2)
  66: [
    {
      type: 'listening',
      content: {
        question: '听录音，"second" 的意思是？',
        audioText: 'second',
        options: ['秒', '小时', '婴儿', '坏的，严重的'],
      },
      answer: '秒',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"hour" 的意思是？',
        audioText: 'hour',
        options: ['小时', '不寻常的', '胃痛', '钥匙'],
      },
      answer: '小时',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"minute" 的意思是？',
        audioText: 'minute',
        options: ['不寻常的', '信封', '分钟', '药'],
      },
      answer: '分钟',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It is a quarter past one.',
        translation: '一点一刻。',
      },
      answer: 'It is a quarter past one.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "It is one o'clock.",
        translation: '一点了。',
      },
      answer: "It is one o'clock.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈaʊə/',
        meaning: '小时',
        example: 'An hour.',
      },
      answer: 'hour',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈmɪnɪt/',
        meaning: '分钟',
        example: 'Wait a minute.',
      },
      answer: 'minute',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is a quarter ______ one.',
        translation: '一点一刻。',
        options: ['Hour', 'Second', 'Minute', 'past'],
      },
      answer: 'past',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What is the ______',
        translation: '几点了？',
        options: ['Hour', 'time', 'Second', 'Minute'],
      },
      answer: 'time',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What is the ______',
        translation: '几点了？',
        options: ['Minute', 'Second', 'time', 'Hour'],
      },
      answer: 'time',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What is the time?" 的正确翻译是？',
        passage: "What's the time?",
        options: ['几点了？', '一点了。', '几点了？', '一点一刻。'],
      },
      answer: '几点了？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"stomach ache" 的意思是？',
        audioText: 'stomach ache',
        options: ['牙医', '时刻', '起床', '胃痛'],
      },
      answer: '胃痛',
      score: 10,
    },
  ],

  // Lesson 67: Lesson 67: The weekend 周末 (Level 2)
  67: [
    {
      type: 'listening',
      content: {
        question: '听录音，"weekend" 的意思是？',
        audioText: 'weekend',
        options: ['麻疹', '周末', '耳朵', '商店'],
      },
      answer: '周末',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"Saturday" 的意思是？',
        audioText: 'Saturday',
        options: ['星期六', '星期二', '打破', '秒'],
      },
      answer: '星期六',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"absent" 的意思是？',
        audioText: 'absent',
        options: ['星期三', '婴儿', '缺席的', '你自己'],
      },
      answer: '缺席的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "Were you at the butcher's?",
        translation: '你在肉店吗？',
      },
      answer: "Were you at the butcher's?",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Very well, thank you.',
        translation: '很好，谢谢。',
      },
      answer: 'Very well, thank you.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈlʌki/',
        meaning: '幸运的',
        example: 'You are lucky.',
      },
      answer: 'lucky',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈsætədeɪ/',
        meaning: '星期六',
        example: 'On Saturday.',
      },
      answer: 'saturday',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "We were at the greengrocer's on ______",
        translation: '星期六我们在蔬菜水果店。',
        options: ['Wednesday', 'Saturday', 'Monday', 'Tuesday'],
      },
      answer: 'Saturday',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'You are ______',
        translation: '你真幸运。',
        options: ['Tuesday', 'Greengrocer', 'lucky', 'Weekend'],
      },
      answer: 'lucky',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"How are you all keeping?" 的正确翻译是？',
        passage: 'The weekend',
        options: ['我要去蔬菜水果店。', '你真幸运。', '她住在乡下。', '你们身体都好吗？'],
      },
      answer: '你们身体都好吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She lives in the country." 的正确翻译是？',
        passage: 'The weekend',
        options: [
          '我们打算在我母亲家过周末。',
          '星期六我们在蔬菜水果店。',
          '你真幸运。',
          '她住在乡下。',
        ],
      },
      answer: '她住在乡下。',
      score: 10,
    },
  ],

  // Lesson 68: Lesson 68: When were you...? 你什么时候……？ (Level 2)
  68: [
    {
      type: 'listening',
      content: {
        question: '听录音，"chemist" 的意思是？',
        audioText: 'chemist',
        options: ['药剂师', '面包师', '星期一', '星期日'],
      },
      answer: '药剂师',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"hairdresser" 的意思是？',
        audioText: 'hairdresser',
        options: ['理发师', '星期三', '牙痛', '富的'],
      },
      answer: '理发师',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"newsagent" 的意思是？',
        audioText: 'newsagent',
        options: ['报刊经销人', '星期四', '听见', '假期'],
      },
      answer: '报刊经销人',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I was there on Monday.',
        translation: '我星期一在那儿。',
      },
      answer: 'I was there on Monday.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "When were you at the stationer's?",
        translation: '你什么时候在文具店？',
      },
      answer: "When were you at the stationer's?",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkemɪst/',
        meaning: '药剂师',
        example: "At the chemist's.",
      },
      answer: 'chemist',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈbeɪkə/',
        meaning: '面包师',
        example: "At the baker's.",
      },
      answer: 'baker',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When were you at the ______',
        translation: '你什么时候在文具店？',
        options: ['Newsagent', 'Stationer', 'Chemist', 'stationers'],
      },
      answer: 'stationers',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I was ______ on Tuesday.',
        translation: '我星期二在那儿。',
        options: ['Chemist', 'Stationer', 'Baker', 'there'],
      },
      answer: 'there',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When were you at the ______',
        translation: '你什么时候在面包店？',
        options: ['bakers', 'Newsagent', 'Baker', 'Chemist'],
      },
      answer: 'bakers',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I was there on Monday." 的正确翻译是？',
        passage: 'When were you...?',
        options: [
          '我星期一在那儿。',
          '你什么时候在文具店？',
          '你什么时候在面包店？',
          '我星期二在那儿。',
        ],
      },
      answer: '我星期一在那儿。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"writing paper" 的意思是？',
        audioText: 'writing paper',
        options: ['信纸', '保持，停留', '头', '体温，发烧'],
      },
      answer: '信纸',
      score: 10,
    },
  ],

  // Lesson 69: Lesson 69: The car race 汽车比赛 (Level 2)
  69: [
    {
      type: 'listening',
      content: {
        question: '听录音，"winner" 的意思是？',
        audioText: 'winner',
        options: ['乡村', '更好的', '坏的，严重的', '获胜者'],
      },
      answer: '获胜者',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"just" 的意思是？',
        audioText: 'just',
        options: ['正好，恰好', '耳朵', '零钱', '终点'],
      },
      answer: '正好，恰好',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"behind" 的意思是？',
        audioText: 'behind',
        options: ['阿司匹林', '在……后面', '胶水', '星期三'],
      },
      answer: '在……后面',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'There were hundreds of people there.',
        translation: '那里有成百上千的人。',
      },
      answer: 'There were hundreds of people there.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'There were twenty cars in the race.',
        translation: '比赛中有二十辆汽车。',
      },
      answer: 'There were twenty cars in the race.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/bɪˈhaɪnd/',
        meaning: '在……后面',
        example: 'It was just behind him.',
      },
      answer: 'behind',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɪkˈsaɪtɪŋ/',
        meaning: '令人兴奋的',
        example: 'It was an exciting race.',
      },
      answer: 'exciting',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'My wife and I were at the ______',
        translation: '我和妻子在比赛现场。',
        options: ['Winner', 'race', 'Exciting', 'Town'],
      },
      answer: 'race',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'There were twenty cars in the ______',
        translation: '比赛中有二十辆汽车。',
        options: ['Exciting', 'Town', 'race', 'Stand'],
      },
      answer: 'race',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"In 1995, there was a very big race." 的正确翻译是？',
        passage: 'The car race',
        options: [
          '每年在我们镇附近都有汽车比赛。',
          '我们站在左边。',
          '回家的路上，我妻子对我说……',
          '1995年有一场很大的比赛。',
        ],
      },
      answer: '1995年有一场很大的比赛。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"On the way home, my wife said to me..." 的正确翻译是？',
        passage: 'The car race',
        options: [
          '我们的朋友朱莉和杰克也在那儿。',
          '我们站在左边。',
          '回家的路上，我妻子对我说……',
          '这是一场令人兴奋的比赛。',
        ],
      },
      answer: '回家的路上，我妻子对我说……',
      score: 10,
    },
  ],

  // Lesson 70: Lesson 70: When were they there? 他们什么时候在那儿？ (Level 2)
  70: [
    {
      type: 'listening',
      content: {
        question: '听录音，"stationer" 的意思是？',
        audioText: 'stationer',
        options: ['药', '文具店', '头痛', '面包店'],
      },
      answer: '文具店',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"chemist" 的意思是？',
        audioText: 'chemist',
        options: ['当然', '药店', '比赛', '爸爸'],
      },
      answer: '药店',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"baker" 的意思是？',
        audioText: 'baker',
        options: ['胃', '胃痛', '面包店', '秒'],
      },
      answer: '面包店',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They were there on Monday.',
        translation: '他们星期一在那儿。',
      },
      answer: 'They were there on Monday.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "When were they at the stationer's?",
        translation: '他们什么时候在文具店？',
      },
      answer: "When were they at the stationer's?",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈbeɪkə/',
        meaning: '面包店',
        example: "At the baker's.",
      },
      answer: 'baker',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkemɪst/',
        meaning: '药店',
        example: "At the chemist's.",
      },
      answer: 'chemist',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When were they at the ______',
        translation: '他们什么时候在文具店？',
        options: ['Newsagent', 'stationers', 'Baker', 'Chemist'],
      },
      answer: 'stationers',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When were they at the ______',
        translation: '他们什么时候在报刊亭？',
        options: ['newsagents', 'Baker', 'Stationer', 'Newsagent'],
      },
      answer: 'newsagents',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They were there on ______',
        translation: '他们星期一在那儿。',
        options: ['Newsagent', 'Monday', 'Chemist', 'Stationer'],
      },
      answer: 'Monday',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They were there on Monday." 的正确翻译是？',
        passage: 'When were they there?',
        options: [
          '他们星期一在那儿。',
          '他们什么时候在文具店？',
          '他们什么时候在报刊亭？',
          '他们星期二在那儿。',
        ],
      },
      answer: '他们星期一在那儿。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"certainly" 的意思是？',
        audioText: 'certainly',
        options: ['牙痛', '获胜者', '吃（药），拿', '当然'],
      },
      answer: '当然',
      score: 10,
    },
  ],

  // Lesson 71: Lesson 71: He's awful! 他讨厌死了！ (Level 2)
  71: [
    {
      type: 'listening',
      content: {
        question: '听录音，"awful" 的意思是？',
        audioText: 'awful',
        options: ['阿司匹林', '讨厌的，糟糕的', '星期二', '药剂师'],
      },
      answer: '讨厌的，糟糕的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"answer" 的意思是？',
        audioText: 'answer',
        options: ['胃', '耳朵', '年', '接（电话），回答'],
      },
      answer: '接（电话），回答',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"phone" 的意思是？',
        audioText: 'phone',
        options: ['令人兴奋的', '电话', '小时', '头痛'],
      },
      answer: '电话',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It was Ron Marston.',
        translation: '是朗·马斯顿。',
      },
      answer: 'It was Ron Marston.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: '"Did he telephone again last night?" I asked.',
        translation: '"他昨晚又打电话了吗？"我问。',
      },
      answer: '"Did he telephone again last night?" I asked.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈɔːfl/',
        meaning: '讨厌的，糟糕的',
        example: 'He is awful!',
      },
      answer: 'awful',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈɑːnsə/',
        meaning: '接（电话），回答',
        example: 'I did not answer the phone.',
      },
      answer: 'answer',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'My boss answered the ______',
        translation: '我老板接了电话。',
        options: ['telephone', 'Last', 'Phone', 'Time'],
      },
      answer: 'telephone',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Pauline answered the ______',
        translation: '波琳接了电话。',
        options: ['Last', 'telephone', 'Awful', 'Phone'],
      },
      answer: 'telephone',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What did your boss say to him?" 的正确翻译是？',
        passage: "He's awful!",
        options: [
          '你老板对他说了什么？',
          '我老板接了电话。',
          '他昨天上午和下午都往办公室打了电话。',
          '"不，他没有。"她说。',
        ],
      },
      answer: '你老板对他说了什么？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '""Did he telephone again?" I asked." 的正确翻译是？',
        passage: "He's awful!",
        options: [
          '"我说，\'我是波琳的母亲。请不要再给我女儿打电话了！\'"',
          '"他昨晚又打电话了吗？"我问。',
          '"他又打电话了吗？"我问。',
          '朗·马斯顿这个人怎么样，波琳？',
        ],
      },
      answer: '"他又打电话了吗？"我问。',
      score: 10,
    },
  ],

  // Lesson 72: Lesson 72: When did you...? 你什么时候……？ (Level 2)
  72: [
    {
      type: 'listening',
      content: {
        question: '听录音，"last night" 的意思是？',
        audioText: 'last night',
        options: ['昨晚', '报刊经销人', '年', '钥匙'],
      },
      answer: '昨晚',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"yesterday" 的意思是？',
        audioText: 'yesterday',
        options: ['打破', '令人兴奋的', '你自己', '昨天'],
      },
      answer: '昨天',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"the day before yesterday" 的意思是？',
        audioText: 'the day before yesterday',
        options: ['前天', '吃（药），拿', '昨晚', '接（电话），回答'],
      },
      answer: '前天',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'When did you see him?',
        translation: '你什么时候见到他的？',
      },
      answer: 'When did you see him?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I saw him the day before yesterday.',
        translation: '我前天见到他的。',
      },
      answer: 'I saw him the day before yesterday.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈjestədeɪ/',
        meaning: '昨天',
        example: 'I telephoned yesterday.',
      },
      answer: 'yesterday',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/lɑːst naɪt/',
        meaning: '昨晚',
        example: 'I watched TV last night.',
      },
      answer: 'last night',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When did you see ______',
        translation: '你什么时候见到他的？',
        options: ['Hear', 'Exciting', 'Stomach', 'him'],
      },
      answer: 'him',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I saw him the day before ______',
        translation: '我前天见到他的。',
        options: ['Ear', 'Second', 'Hour', 'yesterday'],
      },
      answer: 'yesterday',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ did you telephone him?',
        translation: '你什么时候给他打电话的？',
        options: ['Hairdresser', 'Newsagent', 'When', 'Finish'],
      },
      answer: 'When',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I telephoned him yesterday." 的正确翻译是？',
        passage: 'When did you...?',
        options: [
          '我前天见到他的。',
          '你什么时候给他打电话的？',
          '你什么时候见到他的？',
          '我昨天给他打电话的。',
        ],
      },
      answer: '我昨天给他打电话的。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"take" 的意思是？',
        audioText: 'take',
        options: ['吃（药），拿', '你自己', '享受', '令人兴奋的'],
      },
      answer: '吃（药），拿',
      score: 10,
    },
  ],

  // Lesson 73: Lesson 73: The way to King Street 到国王街怎么走 (Level 3)
  73: [
    {
      type: 'listening',
      content: {
        question: '听录音，"understand" 的意思是？',
        audioText: 'understand',
        options: ['最后的，上一个', '突然地', '爸爸', '懂，明白'],
      },
      answer: '懂，明白',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"speak" 的意思是？',
        audioText: 'speak',
        options: ['星期日', '讲，说', '婴儿', '最后的，上一个'],
      },
      answer: '讲，说',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"smile" 的意思是？',
        audioText: 'smile',
        options: ['电话', '微笑', '懂，明白', '富的'],
      },
      answer: '微笑',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He spoke German.',
        translation: '他说德语。',
      },
      answer: 'He spoke German.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Do you know the way to King Street?',
        translation: '你知道去国王街的路吗？',
      },
      answer: 'Do you know the way to King Street?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I lost my way.',
        translation: '我迷路了。',
      },
      answer: 'I lost my way.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wiːk/',
        meaning: '周',
        example: 'Last week',
      },
      answer: 'week',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈsʌdənli/',
        meaning: '突然地',
        example: 'Suddenly, it rained.',
      },
      answer: 'suddenly',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do you know the way to King ______',
        translation: '你知道去国王街的路吗？',
        options: ['Smile', 'Understand', 'Street', 'Pleasantly'],
      },
      answer: 'Street',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He ______ German.',
        translation: '他说德语。',
        options: ['Understand', 'London', 'Week', 'spoke'],
      },
      answer: 'spoke',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I did not ______',
        translation: '我没听懂。',
        options: ['understand', 'Speak', 'Smile', 'Pleasantly'],
      },
      answer: 'understand',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question:
          '"She went to him and said, "Excuse me. Can you tell me the way to King Street, please?"" 的正确翻译是？',
        passage: 'The way to King Street',
        options: [
          '突然，她在公共汽车站附近看到一个男人。',
          '那个男人愉快地微笑着。',
          '她走向他说："对不起，请问你能告诉我去国王街的路吗？"',
          '她不太熟悉伦敦，所以迷路了。',
        ],
      },
      answer: '她走向他说："对不起，请问你能告诉我去国王街的路吗？"',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Suddenly, she saw a man near a bus stop." 的正确翻译是？',
        passage: 'The way to King Street',
        options: [
          '她不太熟悉伦敦，所以迷路了。',
          '突然，她在公共汽车站附近看到一个男人。',
          '"很抱歉，"他说，"我不会说英语。"',
          '上周米尔斯夫人去了伦敦。',
        ],
      },
      answer: '突然，她在公共汽车站附近看到一个男人。',
      score: 10,
    },
  ],

  // Lesson 74: Lesson 74: What did they do? 他们做了什么？ (Level 3)
  74: [
    {
      type: 'listening',
      content: {
        question: '听录音，"cut" 的意思是？',
        audioText: 'cut',
        options: ['讲，说', '获胜者', '割，切', '前天'],
      },
      answer: '割，切',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"thirstily" 的意思是？',
        audioText: 'thirstily',
        options: ['幸运的', '口渴地', '乡村', '讨厌的，糟糕的'],
      },
      answer: '口渴地',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"hurriedly" 的意思是？',
        audioText: 'hurriedly',
        options: ['伦敦', '令人兴奋的', '匆忙地', '文具商'],
      },
      answer: '匆忙地',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He walked across the road quickly.',
        translation: '他快速穿过马路。',
      },
      answer: 'He walked across the road quickly.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They played games happily.',
        translation: '他们愉快地玩游戏。',
      },
      answer: 'They played games happily.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈhʌridli/',
        meaning: '匆忙地',
        example: 'He left hurriedly.',
      },
      answer: 'hurriedly',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈθɜːstili/',
        meaning: '口渴地',
        example: 'He drank thirstily.',
      },
      answer: 'thirstily',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He walked across the ______ quickly.',
        translation: '他快速穿过马路。',
        options: ['Thirstily', 'Hurriedly', 'Cut', 'road'],
      },
      answer: 'road',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They ______ games happily.',
        translation: '他们愉快地玩游戏。',
        options: ['Hurriedly', 'Thirstily', 'Cut', 'played'],
      },
      answer: 'played',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ did he do?',
        translation: '他做了什么？',
        options: ['Thirstily', 'What', 'Hurriedly', 'Cut'],
      },
      answer: 'What',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She worked very hard." 的正确翻译是？',
        passage: 'What did they do?',
        options: ['她做了什么？', '她工作很努力。', '他快速穿过马路。', '他们愉快地玩游戏。'],
      },
      answer: '她工作很努力。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What did he do?" 的正确翻译是？',
        passage: 'What did they do?',
        options: ['她做了什么？', '他们愉快地玩游戏。', '他做了什么？', '他们做了什么？'],
      },
      answer: '他做了什么？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"bus stop" 的意思是？',
        audioText: 'bus stop',
        options: ['周末', '前天', '公共汽车站', '站立'],
      },
      answer: '公共汽车站',
      score: 10,
    },
  ],

  // Lesson 75: Lesson 75: Uncomfortable shoes 不舒适的鞋子 (Level 3)
  75: [
    {
      type: 'listening',
      content: {
        question: '听录音，"wear" 的意思是？',
        audioText: 'wear',
        options: ['婴儿', '穿，戴', '口渴地', '药剂师'],
      },
      answer: '穿，戴',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"pair" 的意思是？',
        audioText: 'pair',
        options: ['双，对', '口渴地', '面包师', '讨厌的，糟糕的'],
      },
      answer: '双，对',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"fashion" 的意思是？',
        audioText: 'fashion',
        options: ['时尚', '割，切', '周', '面包师'],
      },
      answer: '时尚',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I bought these shoes in London.',
        translation: '我在伦敦买了这双鞋。',
      },
      answer: 'I bought these shoes in London.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They hurt my feet.',
        translation: '它们弄疼了我的脚。',
      },
      answer: 'They hurt my feet.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They are very uncomfortable.',
        translation: '它们很不舒服。',
      },
      answer: 'They are very uncomfortable.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/baɪ/',
        meaning: '买',
        example: 'Buy a car.',
      },
      answer: 'buy',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/weə/',
        meaning: '穿，戴',
        example: 'Wear a hat.',
      },
      answer: 'wear',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ hurt my feet.',
        translation: '它们弄疼了我的脚。',
        options: ['Uncomfortable', 'Pair', 'Wear', 'They'],
      },
      answer: 'They',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They are very ______',
        translation: '它们很不舒服。',
        options: ['uncomfortable', 'Fashion', 'Buy', 'Ago'],
      },
      answer: 'uncomfortable',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I wore ______ last year.',
        translation: '我去年穿过它们。',
        options: ['Uncomfortable', 'them', 'Ago', 'Fashion'],
      },
      answer: 'them',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Black." 的正确翻译是？',
        passage: 'Uncomfortable shoes',
        options: ['女士：黑色。', '女士：但我姐姐有这双。', '女士：五码。', '女士：我能看看吗？'],
      },
      answer: '女士：黑色。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"But my sister has this pair." 的正确翻译是？',
        passage: 'Uncomfortable shoes',
        options: [
          '女士：不，她是在美国买的。',
          '售货员：是在这里买的吗？',
          '女士：黑色。',
          '女士：但我姐姐有这双。',
        ],
      },
      answer: '女士：但我姐姐有这双。',
      score: 10,
    },
  ],

  // Lesson 76: Lesson 76: When did you...? 你什么时候……？ (Level 3)
  76: [
    {
      type: 'listening',
      content: {
        question: '听录音，"telephone" 的意思是？',
        audioText: 'telephone',
        options: ['电话', '幸运的', '昨天', '周末'],
      },
      answer: '电话',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"answer" 的意思是？',
        audioText: 'answer',
        options: ['回答', '时尚', '比赛', '药剂师'],
      },
      answer: '回答',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"meet" 的意思是？',
        audioText: 'meet',
        options: ['昨天', '理发师', '遇见', '报刊经销人'],
      },
      answer: '遇见',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I bought it last month.',
        translation: '我上个月买的。',
      },
      answer: 'I bought it last month.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'When did she meet him?',
        translation: '她什么时候遇见他的？',
      },
      answer: 'When did she meet him?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈɑːnsə/',
        meaning: '回答',
        example: 'Answer the question.',
      },
      answer: 'answer',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/miːt/',
        meaning: '遇见',
        example: 'Meet a friend.',
      },
      answer: 'meet',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I ______ it last month.',
        translation: '我上个月买的。',
        options: ['Answer', 'bought', 'Telephone', 'Meet'],
      },
      answer: 'bought',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She met him two ______ ago.',
        translation: '她两天前遇见他的。',
        options: ['days', 'Meet', 'Telephone', 'Answer'],
      },
      answer: 'days',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When did she ______ him?',
        translation: '她什么时候遇见他的？',
        options: ['meet', 'Thirstily', 'Suddenly', 'Hour'],
      },
      answer: 'meet',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She met him two days ago." 的正确翻译是？',
        passage: 'When did you...?',
        options: [
          '你什么时候买的那辆车？',
          '她什么时候遇见他的？',
          '我上个月买的。',
          '她两天前遇见他的。',
        ],
      },
      answer: '她两天前遇见他的。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I bought it last month." 的正确翻译是？',
        passage: 'When did you...?',
        options: [
          '我上个月买的。',
          '他们一小时前离开的。',
          '她两天前遇见他的。',
          '你什么时候买的那辆车？',
        ],
      },
      answer: '我上个月买的。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"finish" 的意思是？',
        audioText: 'finish',
        options: ['讨厌的，糟糕的', '公共汽车站', '终点', '星期一'],
      },
      answer: '终点',
      score: 10,
    },
  ],

  // Lesson 77: Lesson 77: A terrible toothache 要命的牙痛 (Level 3)
  77: [
    {
      type: 'listening',
      content: {
        question: '听录音，"urgent" 的意思是？',
        audioText: 'urgent',
        options: ['星期二', '割，切', '紧急的', '次'],
      },
      answer: '紧急的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"appointment" 的意思是？',
        audioText: 'appointment',
        options: ['约会，预约', '以前', '割，切', '终点'],
      },
      answer: '约会，预约',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"dentist" 的意思是？',
        audioText: 'dentist',
        options: ['次', '直到……为止', '星期五', '牙医'],
      },
      answer: '牙医',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Can he see me now?',
        translation: '他现在能给我看病吗？',
      },
      answer: 'Can he see me now?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Do you have an appointment?',
        translation: '你有预约吗？',
      },
      answer: 'Do you have an appointment?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It is urgent.',
        translation: '很紧急。',
      },
      answer: 'It is urgent.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tɪl/',
        meaning: '直到……为止',
        example: 'Wait till tomorrow.',
      },
      answer: 'till',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈtuːθeɪk/',
        meaning: '牙痛',
        example: 'I have a toothache.',
      },
      answer: 'toothache',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do you have an ______',
        translation: '你有预约吗？',
        options: ['appointment', 'Toothache', 'Dentist', 'Urgent'],
      },
      answer: 'appointment',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is ______',
        translation: '很紧急。',
        options: ['Till', 'Appointment', 'urgent', 'Dentist'],
      },
      answer: 'urgent',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I can wait ______ this afternoon.',
        translation: '我可以等到今天下午。',
        options: ['Dentist', 'Toothache', 'till', 'Appointment'],
      },
      answer: 'till',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, it is. It is very urgent. I have a terrible toothache." 的正确翻译是？',
        passage: 'A terrible toothache',
        options: [
          '克罗夫特先生：护士，我必须现在就看牙医。',
          '克罗夫特先生：是的，很紧急。我牙痛得厉害。',
          '护士：早上好，克罗夫特先生。',
          '克罗夫特先生：没有。',
        ],
      },
      answer: '克罗夫特先生：是的，很紧急。我牙痛得厉害。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Do you have an appointment?" 的正确翻译是？',
        passage: 'A terrible toothache',
        options: [
          '护士：你有预约吗？',
          '护士：早上好，克罗夫特先生。',
          '克罗夫特先生：护士，我必须现在就看牙医。',
          '克罗夫特先生：你能下午2点来吗？',
        ],
      },
      answer: '护士：你有预约吗？',
      score: 10,
    },
  ],

  // Lesson 78: Lesson 78: When did you...? 你什么时候……？ (Level 3)
  78: [
    {
      type: 'listening',
      content: {
        question: '听录音，"copy" 的意思是？',
        audioText: 'copy',
        options: ['匆忙地', '前天', '面包师', '抄写，复制'],
      },
      answer: '抄写，复制',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"remember" 的意思是？',
        audioText: 'remember',
        options: ['不舒服的', '抄写，复制', '记得', '穿，戴'],
      },
      answer: '记得',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'When did you telephone her?',
        translation: '你什么时候给她打电话的？',
      },
      answer: 'When did you telephone her?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I telephoned her last night.',
        translation: '我昨晚给她打电话的。',
      },
      answer: 'I telephoned her last night.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/rɪˈmembə/',
        meaning: '记得',
        example: 'I remember.',
      },
      answer: 'remember',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkɒpi/',
        meaning: '抄写，复制',
        example: 'Copy the text.',
      },
      answer: 'copy',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I saw him the day before ______',
        translation: '我前天见到他的。',
        options: ['Dentist', 'Copy', 'Newsagent', 'yesterday'],
      },
      answer: 'yesterday',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ did you see him?',
        translation: '你什么时候见到他的？',
        options: ['Awful', 'When', 'Behind', 'Yesterday'],
      },
      answer: 'When',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I telephoned her ______ night.',
        translation: '我昨晚给她打电话的。',
        options: ['last', 'Behind', 'London', 'Just'],
      },
      answer: 'last',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"When did you telephone her?" 的正确翻译是？',
        passage: 'When did you...?',
        options: [
          '你什么时候给她打电话的？',
          '你什么时候见到他的？',
          '我昨晚给她打电话的。',
          '我前天见到他的。',
        ],
      },
      answer: '你什么时候给她打电话的？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"When did you see him?" 的正确翻译是？',
        passage: 'When did you...?',
        options: [
          '你什么时候给她打电话的？',
          '我昨晚给她打电话的。',
          '你什么时候见到他的？',
          '我前天见到他的。',
        ],
      },
      answer: '你什么时候见到他的？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"yesterday" 的意思是？',
        audioText: 'yesterday',
        options: ['昨天', '公共汽车站', '牙痛', '懂，明白'],
      },
      answer: '昨天',
      score: 10,
    },
  ],

  // Lesson 79: Lesson 79: Shopping 购物 (Level 3)
  79: [
    {
      type: 'listening',
      content: {
        question: '听录音，"need" 的意思是？',
        audioText: 'need',
        options: ['需要', '伦敦', '以前', '站立'],
      },
      answer: '需要',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"thing" 的意思是？',
        audioText: 'thing',
        options: ['懂，明白', '事情，东西', '匆忙地', '突然地'],
      },
      answer: '事情，东西',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"hope" 的意思是？',
        audioText: 'hope',
        options: ['文具店', '讲，说', '希望', '年'],
      },
      answer: '希望',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What are you doing?',
        translation: '你在做什么？',
      },
      answer: 'What are you doing?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'We have not got much tea.',
        translation: '我们没有多少茶叶了。',
      },
      answer: 'We have not got much tea.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I must go to the grocer's.",
        translation: '我必须去杂货店。',
      },
      answer: "I must go to the grocer's.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/niːd/',
        meaning: '需要',
        example: 'I need some money.',
      },
      answer: 'need',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈmʌni/',
        meaning: '钱',
        example: 'I have no money.',
      },
      answer: 'money',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I am making a ______ list.',
        translation: '我在写购物清单。',
        options: ['Thing', 'shopping', 'Need', 'Money'],
      },
      answer: 'shopping',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I must go to the ______',
        translation: '我必须去杂货店。',
        options: ['Shopping', 'Hope', 'grocers', 'Need'],
      },
      answer: 'grocers',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ are you doing?',
        translation: '你在做什么？',
        options: ['What', 'Need', 'Hope', 'Money'],
      },
      answer: 'What',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I hope that you have got some money." 的正确翻译是？',
        passage: 'Shopping',
        options: [
          '汤姆：我希望你有钱。',
          '汤姆：嗯，我也没有多少钱！',
          '卡罗尔：汤姆，我在写购物清单。',
          '卡罗尔：我必须去蔬菜水果店。我们的西红柿不多了，但土豆很多。',
        ],
      },
      answer: '汤姆：我希望你有钱。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Have we got any beer or wine?" 的正确翻译是？',
        passage: 'Shopping',
        options: [
          '汤姆：卡罗尔，你在做什么？',
          '汤姆：蔬菜呢？',
          '汤姆：我们有啤酒或葡萄酒吗？',
          '卡罗尔：没有。而且我不打算买！',
        ],
      },
      answer: '汤姆：我们有啤酒或葡萄酒吗？',
      score: 10,
    },
  ],

  // Lesson 80: Lesson 80: Have you got any...? 你有……吗？ (Level 3)
  80: [
    {
      type: 'listening',
      content: {
        question: '听录音，"chemist" 的意思是？',
        audioText: 'chemist',
        options: ['讨厌的，糟糕的', '公共汽车站', '水果', '药剂师，药店'],
      },
      answer: '药剂师，药店',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"fruit" 的意思是？',
        audioText: 'fruit',
        options: ['水果', '讨厌的，糟糕的', '愉快地', '次'],
      },
      answer: '水果',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"groceries" 的意思是？',
        audioText: 'groceries',
        options: ['药剂师，药店', '文具店', '突然地', '食品杂货'],
      },
      answer: '食品杂货',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have you got much money?',
        translation: '你有很多钱吗？',
      },
      answer: 'Have you got much money?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I have not got much money.',
        translation: '我没有很多钱。',
      },
      answer: 'I have not got much money.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈnjuːzeɪdʒənt/',
        meaning: '报刊经销商',
        example: 'Newsagent shop.',
      },
      answer: 'newsagent',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈsteɪʃnəri/',
        meaning: '文具',
        example: 'Stationery shop.',
      },
      answer: 'stationery',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have you got ______ money?',
        translation: '你有很多钱吗？',
        options: ['Stationery', 'much', 'Chemist', 'Fruit'],
      },
      answer: 'much',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have you got any ______',
        translation: '你有奶酪吗？',
        options: ['Fruit', 'cheese', 'Chemist', 'Stationery'],
      },
      answer: 'cheese',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have you got many ______',
        translation: '你有很多书吗？',
        options: ['Groceries', 'Chemist', 'books', 'Newsagent'],
      },
      answer: 'books',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Have you got many books?" 的正确翻译是？',
        passage: 'Have you got any...?',
        options: ['我没有很多书。', '你有很多书吗？', '你有很多钱吗？', '我没有很多钱。'],
      },
      answer: '你有很多书吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I have got a lot of cheese." 的正确翻译是？',
        passage: 'Have you got any...?',
        options: ['你有奶酪吗？', '我有很多奶酪。', '你有很多书吗？', '我没有很多书。'],
      },
      answer: '我有很多奶酪。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"hurriedly" 的意思是？',
        audioText: 'hurriedly',
        options: ['时尚', '匆忙地', '次', '紧急的'],
      },
      answer: '匆忙地',
      score: 10,
    },
  ],

  // Lesson 81: Lesson 81: Roast beef and potatoes 烤牛肉和土豆 (Level 3)
  81: [
    {
      type: 'listening',
      content: {
        question: '听录音，"roast" 的意思是？',
        audioText: 'roast',
        options: ['记得', '紧急的', '周', '烤的'],
      },
      answer: '烤的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"dinner" 的意思是？',
        audioText: 'dinner',
        options: ['割，切', '讲，说', '正餐，晚餐', '口渴地'],
      },
      answer: '正餐，晚餐',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"nearly" 的意思是？',
        audioText: 'nearly',
        options: ['买', '懂，明白', '几乎', '最后的，上一个'],
      },
      answer: '几乎',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I had a good meal.',
        translation: '我吃了一顿美餐。',
      },
      answer: 'I had a good meal.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Is dinner ready?',
        translation: '晚餐准备好了吗？',
      },
      answer: 'Is dinner ready?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It is nearly ready.',
        translation: '快准备好了。',
      },
      answer: 'It is nearly ready.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈrestrɒnt/',
        meaning: '饭店',
        example: 'Go to a restaurant.',
      },
      answer: 'restaurant',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/rəʊst/',
        meaning: '烤的',
        example: 'Roast beef.',
      },
      answer: 'roast',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'We had dinner at a ______',
        translation: '我们在饭店吃了晚餐。',
        options: ['Roast', 'restaurant', 'Dinner', 'Ready'],
      },
      answer: 'restaurant',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is nearly ______',
        translation: '快准备好了。',
        options: ['Roast', 'Dinner', 'ready', 'Nearly'],
      },
      answer: 'ready',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is dinner ______',
        translation: '晚餐准备好了吗？',
        options: ['ready', 'Roast', 'Restaurant', 'Dinner'],
      },
      answer: 'ready',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes?" 的正确翻译是？',
        passage: 'Roast beef and potatoes',
        options: [
          '卡罗尔：萨姆来了。',
          '萨姆：你好，汤姆。来支烟。',
          '萨姆：听起来不错！',
          '汤姆：什么事？',
        ],
      },
      answer: '汤姆：什么事？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I am having breakfast." 的正确翻译是？',
        passage: 'Roast beef and potatoes',
        options: [
          '汤姆：我在吃早餐。',
          '萨姆：嗨，卡罗尔！汤姆在哪里？',
          '卡罗尔：今晚我们吃烤牛肉和土豆。',
          '卡罗尔：他在楼上。他在洗澡。',
        ],
      },
      answer: '汤姆：我在吃早餐。',
      score: 10,
    },
  ],

  // Lesson 82: Lesson 82: Have you had...? 你已经……了吗？ (Level 3)
  82: [
    {
      type: 'listening',
      content: {
        question: '听录音，"lunch" 的意思是？',
        audioText: 'lunch',
        options: ['午餐', '水果', '微笑', '突然地'],
      },
      answer: '午餐',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"breakfast" 的意思是？',
        audioText: 'breakfast',
        options: ['买', '遇见', '准备好的', '早餐'],
      },
      answer: '早餐',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"supper" 的意思是？',
        audioText: 'supper',
        options: ['需要', '晚餐', '药剂师，药店', '记得'],
      },
      answer: '晚餐',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have you had breakfast?',
        translation: '你吃过早餐了吗？',
      },
      answer: 'Have you had breakfast?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have they had lunch?',
        translation: '他们吃过午餐了吗？',
      },
      answer: 'Have they had lunch?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈsʌpə/',
        meaning: '晚餐',
        example: 'Have supper.',
      },
      answer: 'supper',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈbrekfəst/',
        meaning: '早餐',
        example: 'Have breakfast.',
      },
      answer: 'breakfast',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, they have not had ______ yet.',
        translation: '不，他们还没吃午餐。',
        options: ['Uncomfortable', 'Pleasantly', 'Urgent', 'lunch'],
      },
      answer: 'lunch',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have you had ______',
        translation: '你吃过早餐了吗？',
        options: ['breakfast', 'Pleasantly', 'Ago', 'Buy'],
      },
      answer: 'breakfast',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have they had ______',
        translation: '他们吃过午餐了吗？',
        options: ['Thirstily', 'Fashion', 'Breakfast', 'lunch'],
      },
      answer: 'lunch',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Have they had lunch?" 的正确翻译是？',
        passage: 'Have you had...?',
        options: [
          '你吃过早餐了吗？',
          '他们吃过午餐了吗？',
          '不，他们还没吃午餐。',
          '是的，我7点吃的早餐。',
        ],
      },
      answer: '他们吃过午餐了吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, they have not had lunch yet." 的正确翻译是？',
        passage: 'Have you had...?',
        options: [
          '他们吃过午餐了吗？',
          '是的，我7点吃的早餐。',
          '不，他们还没吃午餐。',
          '你吃过早餐了吗？',
        ],
      },
      answer: '不，他们还没吃午餐。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"nearly" 的意思是？',
        audioText: 'nearly',
        options: ['饭店', '穿，戴', '几乎', '双，对'],
      },
      answer: '几乎',
      score: 10,
    },
  ],

  // Lesson 83: Lesson 83: Going on holiday 度假 (Level 3)
  83: [
    {
      type: 'listening',
      content: {
        question: '听录音，"pack" 的意思是？',
        audioText: 'pack',
        options: ['打包，包装', '钱', '双，对', '约会，预约'],
      },
      answer: '打包，包装',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"mess" 的意思是？',
        audioText: 'mess',
        options: ['早餐', '药剂师，药店', '杂乱，混乱', '几乎'],
      },
      answer: '杂乱，混乱',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"leave" 的意思是？',
        audioText: 'leave',
        options: ['记得', '离开', '牙痛', '钱'],
      },
      answer: '离开',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have you packed your bags yet?',
        translation: '你打包好包了吗？',
      },
      answer: 'Have you packed your bags yet?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I have not packed them yet.',
        translation: '我还没打包好。',
      },
      answer: 'I have not packed them yet.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I have already packed my suitcase.',
        translation: '我已经打包好手提箱了。',
      },
      answer: 'I have already packed my suitcase.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈsuːtkeɪs/',
        meaning: '手提箱',
        example: 'Pack the suitcase.',
      },
      answer: 'suitcase',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/liːv/',
        meaning: '离开',
        example: 'Leave tomorrow.',
      },
      answer: 'leave',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What a ______',
        translation: '真乱啊！',
        options: ['Pack', 'Leave', 'mess', 'Holiday'],
      },
      answer: 'mess',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'We are going on ______',
        translation: '我们要去度假了。',
        options: ['Pack', 'Suitcase', 'Leave', 'holiday'],
      },
      answer: 'holiday',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I have already packed my ______',
        translation: '我已经打包好手提箱了。',
        options: ['Holiday', 'Leave', 'Mess', 'suitcase'],
      },
      answer: 'suitcase',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, I have already bought them." 的正确翻译是？',
        passage: 'Going on holiday',
        options: [
          '帕特：是的，我已经买好了。',
          '汤姆：嗨，帕特。你们要去哪里？',
          '帕特：是的，我已经打包好了。',
          '汤姆：你打包好包了吗？',
        ],
      },
      answer: '帕特：是的，我已经买好了。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Have you packed your suitcase yet?" 的正确翻译是？',
        passage: 'Going on holiday',
        options: [
          '汤姆：你买票了吗？',
          '汤姆：你们什么时候出发？',
          '汤姆：你打包好手提箱了吗？',
          '帕特：是的，我已经打包好了。',
        ],
      },
      answer: '汤姆：你打包好手提箱了吗？',
      score: 10,
    },
  ],

  // Lesson 84: Lesson 84: Have you had...? 你已经……了吗？ (Level 3)
  84: [
    {
      type: 'listening',
      content: {
        question: '听录音，"yet" 的意思是？',
        audioText: 'yet',
        options: ['早餐', '时尚', '还，尚', '文具'],
      },
      answer: '还，尚',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"already" 的意思是？',
        audioText: 'already',
        options: ['几乎', '抄写，复制', '已经', '杂乱，混乱'],
      },
      answer: '已经',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"just" 的意思是？',
        audioText: 'just',
        options: ['刚刚', '几乎', '正餐，晚餐', '记得'],
      },
      answer: '刚刚',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, I have just had lunch.',
        translation: '是的，我刚吃过午餐。',
      },
      answer: 'Yes, I have just had lunch.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have you had lunch yet?',
        translation: '你吃过午餐了吗？',
      },
      answer: 'Have you had lunch yet?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɔːlˈredi/',
        meaning: '已经',
        example: 'I have already done it.',
      },
      answer: 'already',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/jet/',
        meaning: '还，尚',
        example: 'Not yet.',
      },
      answer: 'yet',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Yes, I have ______ finished it.',
        translation: '是的，我已经完成了。',
        options: ['Telephone', 'Meet', 'Breakfast', 'already'],
      },
      answer: 'already',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Yes, I have ______ had lunch.',
        translation: '是的，我刚吃过午餐。',
        options: ['Newsagent', 'Uncomfortable', 'Nearly', 'just'],
      },
      answer: 'just',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have you had lunch ______',
        translation: '你吃过午餐了吗？',
        options: ['yet', 'Money', 'Chemist', 'Meet'],
      },
      answer: 'yet',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Have you finished your homework?" 的正确翻译是？',
        passage: 'Have you had...?',
        options: [
          '是的，我刚吃过午餐。',
          '你完成作业了吗？',
          '你吃过午餐了吗？',
          '是的，我已经完成了。',
        ],
      },
      answer: '你完成作业了吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, I have already finished it." 的正确翻译是？',
        passage: 'Have you had...?',
        options: [
          '是的，我刚吃过午餐。',
          '是的，我已经完成了。',
          '你完成作业了吗？',
          '你吃过午餐了吗？',
        ],
      },
      answer: '是的，我已经完成了。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"answer" 的意思是？',
        audioText: 'answer',
        options: ['杂乱，混乱', '双，对', '遇见', '回答'],
      },
      answer: '回答',
      score: 10,
    },
  ],

  // Lesson 85: Lesson 85: Paris in the spring 巴黎之春 (Level 3)
  85: [
    {
      type: 'listening',
      content: {
        question: '听录音，"cinema" 的意思是？',
        audioText: 'cinema',
        options: ['报刊经销商', '电影院', '几乎', '牙医'],
      },
      answer: '电影院',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"spring" 的意思是？',
        audioText: 'spring',
        options: ['希望', '巴黎', '春天', '离开'],
      },
      answer: '春天',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"Paris" 的意思是？',
        audioText: 'Paris',
        options: ['电影', '买', '还，尚', '巴黎'],
      },
      answer: '巴黎',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Paris is a beautiful city.',
        translation: '巴黎是一座美丽的城市。',
      },
      answer: 'Paris is a beautiful city.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, I have. I went there last year.',
        translation: '是的，我去过。我去年去的。',
      },
      answer: 'Yes, I have. I went there last year.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have you ever been to Paris?',
        translation: '你去过巴黎吗？',
      },
      answer: 'Have you ever been to Paris?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈsɪnəmə/',
        meaning: '电影院',
        example: 'Go to the cinema.',
      },
      answer: 'cinema',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/sprɪŋ/',
        meaning: '春天',
        example: 'In spring.',
      },
      answer: 'spring',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have you ever been to ______',
        translation: '你去过巴黎吗？',
        options: ['Spring', 'Paris', 'Film', 'City'],
      },
      answer: 'Paris',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ is a beautiful city.',
        translation: '巴黎是一座美丽的城市。',
        options: ['Beautiful', 'Film', 'Spring', 'Paris'],
      },
      answer: 'Paris',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I went there in the ______',
        translation: '我春天去的。',
        options: ['spring', 'Film', 'Paris', 'Cinema'],
      },
      answer: 'spring',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '""Paris in the spring"." 的正确翻译是？',
        passage: 'Paris in the spring',
        options: [
          '肯：是的，我去过。我四月去的。',
          '肯：《巴黎之春》。',
          '肯：那是春天，但天气很糟糕。',
          '乔治：你刚去电影院了吗？',
        ],
      },
      answer: '肯：《巴黎之春》。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Paris in the spring, eh?" 的正确翻译是？',
        passage: 'Paris in the spring',
        options: [
          '肯：《巴黎之春》。',
          '乔治：巴黎之春，是吗？',
          '乔治：放什么电影？',
          '肯：这是一部美丽的电影。',
        ],
      },
      answer: '乔治：巴黎之春，是吗？',
      score: 10,
    },
  ],

  // Lesson 86: Lesson 86: What have you done? 你做了什么？ (Level 3)
  86: [
    {
      type: 'listening',
      content: {
        question: '听录音，"engineer" 的意思是？',
        audioText: 'engineer',
        options: ['春天', '巴黎', '工程师', '早餐'],
      },
      answer: '工程师',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"retire" 的意思是？',
        audioText: 'retire',
        options: ['退休', '需要', '晚餐', '手提箱'],
      },
      answer: '退休',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Has he retired yet?',
        translation: '他退休了吗？',
      },
      answer: 'Has he retired yet?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I have just finished my work.',
        translation: '我刚完成工作。',
      },
      answer: 'I have just finished my work.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/rɪˈtaɪə/',
        meaning: '退休',
        example: 'He retired last year.',
      },
      answer: 'retire',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˌendʒɪˈnɪə/',
        meaning: '工程师',
        example: 'He is an engineer.',
      },
      answer: 'engineer',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Has he retired ______',
        translation: '他退休了吗？',
        options: ['Cinema', 'Restaurant', 'Dinner', 'yet'],
      },
      answer: 'yet',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Yes, he has already ______',
        translation: '是的，他已经退休了。',
        options: ['Answer', 'retired', 'Toothache', 'Beautiful'],
      },
      answer: 'retired',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I have ______ finished my work.',
        translation: '我刚完成工作。',
        options: ['Shopping', 'Breakfast', 'Already', 'just'],
      },
      answer: 'just',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What have you done?" 的正确翻译是？',
        passage: 'What have you done?',
        options: ['是的，他已经退休了。', '你做了什么？', '我刚完成工作。', '他退休了吗？'],
      },
      answer: '你做了什么？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, he has already retired." 的正确翻译是？',
        passage: 'What have you done?',
        options: ['我刚完成工作。', '你做了什么？', '他退休了吗？', '是的，他已经退休了。'],
      },
      answer: '是的，他已经退休了。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"need" 的意思是？',
        audioText: 'need',
        options: ['晚餐', '需要', '报刊经销商', '正餐，晚餐'],
      },
      answer: '需要',
      score: 10,
    },
  ],

  // Lesson 87: Lesson 87: A car crash 车祸 (Level 3)
  87: [
    {
      type: 'listening',
      content: {
        question: '听录音，"lamp-post" 的意思是？',
        audioText: 'lamp-post',
        options: ['打包，包装', '已经', '直到……为止', '路灯柱'],
      },
      answer: '路灯柱',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"crash" 的意思是？',
        audioText: 'crash',
        options: ['正餐，晚餐', '约会，预约', '碰撞', '几乎'],
      },
      answer: '碰撞',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"try" 的意思是？',
        audioText: 'try',
        options: ['食品杂货', '城市', '美丽的', '努力，尝试'],
      },
      answer: '努力，尝试',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What happened?',
        translation: '发生什么事了？',
      },
      answer: 'What happened?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'How long have you had this car?',
        translation: '这辆车你买了多久了？',
      },
      answer: 'How long have you had this car?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They are trying to repair it.',
        translation: '他们正在努力修理。',
      },
      answer: 'They are trying to repair it.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈɡærɑːʒ/',
        meaning: '车库，汽车修理厂',
        example: 'Put the car in the garage.',
      },
      answer: 'garage',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/traɪ/',
        meaning: '努力，尝试',
        example: 'Try to do something.',
      },
      answer: 'try',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'How long have you had this ______',
        translation: '这辆车你买了多久了？',
        options: ['Garage', 'Try', 'Repair', 'car'],
      },
      answer: 'car',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What ______',
        translation: '发生什么事了？',
        options: ['Repair', 'Garage', 'happened', 'Crash'],
      },
      answer: 'happened',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have you taken it to the ______',
        translation: '你把它送去修理厂了吗？',
        options: ['Try', 'Lamp-post', 'Repair', 'garage'],
      },
      answer: 'garage',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, I have. They are repairing it now." 的正确翻译是？',
        passage: 'A car crash',
        options: [
          '李太太：是的，送去了。他们现在正在修理。',
          '李太太：我买了三年了。',
          '助手：太糟糕了！你什么时候撞的？',
          '助手：什么问题？',
        ],
      },
      answer: '李太太：是的，送去了。他们现在正在修理。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I crashed it into a lamp-post." 的正确翻译是？',
        passage: 'A car crash',
        options: [
          '助手：这辆车你买了多久了？',
          '李太太：昨天。',
          '李太太：我把它撞到路灯柱上了。',
          '助手：太糟糕了！你什么时候撞的？',
        ],
      },
      answer: '李太太：我把它撞到路灯柱上了。',
      score: 10,
    },
  ],

  // Lesson 88: Lesson 88: Have you... yet? 你已经……了吗？ (Level 3)
  88: [
    {
      type: 'listening',
      content: {
        question: '听录音，"move" 的意思是？',
        audioText: 'move',
        options: ['准备好的', '移动，搬家', '假日，假期', '城市'],
      },
      answer: '移动，搬家',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"miss" 的意思是？',
        audioText: 'miss',
        options: ['烤的', '钱', '食品杂货', '想念，错过'],
      },
      answer: '想念，错过',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'How long have you lived here?',
        translation: '你在这里住了多久？',
      },
      answer: 'How long have you lived here?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have you moved to your new house yet?',
        translation: '你已经搬到新房子了吗？',
      },
      answer: 'Have you moved to your new house yet?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/muːv/',
        meaning: '移动，搬家',
        example: 'Move house.',
      },
      answer: 'move',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/mɪs/',
        meaning: '想念，错过',
        example: 'I miss you.',
      },
      answer: 'miss',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, I have not moved ______',
        translation: '不，我还没搬。',
        options: ['yet', 'Restaurant', 'Suitcase', 'Just'],
      },
      answer: 'yet',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have you moved to your new house ______',
        translation: '你已经搬到新房子了吗？',
        options: ['Pack', 'yet', 'Money', 'Suitcase'],
      },
      answer: 'yet',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'How ______ have you lived here?',
        translation: '你在这里住了多久？',
        options: ['Restaurant', 'Spring', 'Engineer', 'long'],
      },
      answer: 'long',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"How long have you lived here?" 的正确翻译是？',
        passage: 'Have you... yet?',
        options: [
          '不，我还没搬。',
          '我在这住了十年。',
          '你在这里住了多久？',
          '你已经搬到新房子了吗？',
        ],
      },
      answer: '你在这里住了多久？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, I have not moved yet." 的正确翻译是？',
        passage: 'Have you... yet?',
        options: [
          '我在这住了十年。',
          '你已经搬到新房子了吗？',
          '你在这里住了多久？',
          '不，我还没搬。',
        ],
      },
      answer: '不，我还没搬。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"chemist" 的意思是？',
        audioText: 'chemist',
        options: ['还，尚', '药剂师，药店', '正餐，晚餐', '烤的'],
      },
      answer: '药剂师，药店',
      score: 10,
    },
  ],

  // Lesson 89: Lesson 89: For sale 待售 (Level 3)
  89: [
    {
      type: 'listening',
      content: {
        question: '听录音，"retire" 的意思是？',
        audioText: 'retire',
        options: ['电影', '退休', '还，尚', '努力，尝试'],
      },
      answer: '退休',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"sale" 的意思是？',
        audioText: 'sale',
        options: ['卖，出售', '正餐，晚餐', '文具', '早餐'],
      },
      answer: '卖，出售',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"penny" 的意思是？',
        audioText: 'penny',
        options: ['钱', '便士', '还，尚', '美丽的'],
      },
      answer: '便士',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'How much does it cost?',
        translation: '多少钱？',
      },
      answer: 'How much does it cost?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It is worth every penny of it.',
        translation: '它值每一分钱。',
      },
      answer: 'It is worth every penny of it.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'How long have you lived here?',
        translation: '你在这里住了多久？',
      },
      answer: 'How long have you lived here?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wɜːθ/',
        meaning: '值……钱',
        example: 'It is worth £100.',
      },
      answer: 'worth',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈpeni/',
        meaning: '便士',
        example: 'Every penny.',
      },
      answer: 'penny',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is this house for ______',
        translation: '这房子出售吗？',
        options: ['Worth', 'sale', 'Cost', 'Penny'],
      },
      answer: 'sale',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'How much does it ______',
        translation: '多少钱？',
        options: ['Penny', 'Retire', 'cost', 'Sale'],
      },
      answer: 'cost',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is worth every ______ of it.',
        translation: '它值每一分钱。',
        options: ['Sale', 'penny', 'Retire', 'Worth'],
      },
      answer: 'penny',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"How much does this house cost?" 的正确翻译是？',
        passage: 'For sale',
        options: [
          '伊恩：这房子多少钱？',
          '伊恩：下午好。我想这房子是要出售的。',
          '琼斯先生：它值每一分钱。',
          '伊恩：嗯，我喜欢这房子，但我还不能决定。',
        ],
      },
      answer: '伊恩：这房子多少钱？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"That is right." 的正确翻译是？',
        passage: 'For sale',
        options: [
          '琼斯先生：是的。',
          '琼斯先生：我妻子必须先看看。',
          '琼斯先生：当然可以。请进。',
          '伊恩：下午好。我想这房子是要出售的。',
        ],
      },
      answer: '琼斯先生：是的。',
      score: 10,
    },
  ],

  // Lesson 90: Lesson 90: How long have you...? 你……多久了？ (Level 3)
  90: [
    {
      type: 'listening',
      content: {
        question: '听录音，"since" 的意思是？',
        audioText: 'since',
        options: ['电影', '车库，汽车修理厂', '自从', '想念，错过'],
      },
      answer: '自从',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"for" 的意思是？',
        audioText: 'for',
        options: ['想念，错过', '达，计', '药剂师，药店', '水果'],
      },
      answer: '达，计',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'How long have you worked here?',
        translation: '你在这里工作多久了？',
      },
      answer: 'How long have you worked here?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I have worked here since 2010.',
        translation: '我从2010年就在这工作。',
      },
      answer: 'I have worked here since 2010.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/fɔː/',
        meaning: '达，计',
        example: 'For two years.',
      },
      answer: 'for',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/sɪns/',
        meaning: '自从',
        example: 'Since 1990.',
      },
      answer: 'since',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'How ______ have you known him?',
        translation: '你认识他多久了？',
        options: ['Try', 'Fruit', 'Repair', 'long'],
      },
      answer: 'long',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I have worked here ______ 2010.',
        translation: '我从2010年就在这工作。',
        options: ['since', 'Fruit', 'Mess', 'Newsagent'],
      },
      answer: 'since',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'How long have you ______ here?',
        translation: '你在这里工作多久了？',
        options: ['worked', 'Yet', 'Lunch', 'Engineer'],
      },
      answer: 'worked',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I have worked here since 2010." 的正确翻译是？',
        passage: 'How long have you...?',
        options: [
          '我认识他十年了。',
          '我从2010年就在这工作。',
          '你在这里工作多久了？',
          '你认识他多久了？',
        ],
      },
      answer: '我从2010年就在这工作。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I have known him for ten years." 的正确翻译是？',
        passage: 'How long have you...?',
        options: [
          '我从2010年就在这工作。',
          '你在这里工作多久了？',
          '你认识他多久了？',
          '我认识他十年了。',
        ],
      },
      answer: '我认识他十年了。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"just" 的意思是？',
        audioText: 'just',
        options: ['便士', '刚刚', '电影院', '假日，假期'],
      },
      answer: '刚刚',
      score: 10,
    },
  ],

  // Lesson 91: Lesson 91: Poor Ian 可怜的伊恩 (Level 3)
  91: [
    {
      type: 'listening',
      content: {
        question: '听录音，"person" 的意思是？',
        audioText: 'person',
        options: ['车库，汽车修理厂', '人', '美丽的', '离开'],
      },
      answer: '人',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"people" 的意思是？',
        audioText: 'people',
        options: ['自从', '人们', '准备好的', '美丽的'],
      },
      answer: '人们',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"neighbour" 的意思是？',
        audioText: 'neighbour',
        options: ['便士', '邻居', '午餐', '达，计'],
      },
      answer: '邻居',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'When will he move?',
        translation: '他什么时候搬？',
      },
      answer: 'When will he move?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He will move to London tomorrow.',
        translation: '他明天要搬到伦敦。',
      },
      answer: 'He will move to London tomorrow.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'We will all miss him.',
        translation: '我们都会想念他。',
      },
      answer: 'We will all miss him.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈneɪbə/',
        meaning: '邻居',
        example: 'My neighbour.',
      },
      answer: 'neighbour',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈpɜːsn/',
        meaning: '人',
        example: 'A nice person.',
      },
      answer: 'person',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When will he ______',
        translation: '他什么时候搬？',
        options: ['move', 'Miss', 'People', 'Person'],
      },
      answer: 'move',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'We will all ______ him.',
        translation: '我们都会想念他。',
        options: ['Move', 'Still', 'Person', 'miss'],
      },
      answer: 'miss',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He will ______ to London tomorrow.',
        translation: '他明天要搬到伦敦。',
        options: ['Neighbour', 'Miss', 'People', 'move'],
      },
      answer: 'move',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, he did not want to leave, but his wife did!" 的正确翻译是？',
        passage: 'Poor Ian',
        options: [
          '凯瑟琳：伊恩已经卖掉房子了吗？',
          '凯瑟琳：他是一个很好的人。',
          '珍妮：不，明天下午。我会想念他的。',
          '珍妮：是的，他不想离开，但他妻子想！',
        ],
      },
      answer: '珍妮：是的，他不想离开，但他妻子想！',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Will you see Ian today, Jenny?" 的正确翻译是？',
        passage: 'Poor Ian',
        options: [
          '凯瑟琳：可怜的伊恩！他不想离开这房子。',
          '凯瑟琳：珍妮，你今天会见到伊恩吗？',
          '凯瑟琳：他已经搬到新房子了吗？',
          '珍妮：我们都会想念他。',
        ],
      },
      answer: '凯瑟琳：珍妮，你今天会见到伊恩吗？',
      score: 10,
    },
  ],

  // Lesson 92: Lesson 92: When will...? 什么时候将……？ (Level 3)
  92: [
    {
      type: 'listening',
      content: {
        question: '听录音，"tomorrow" 的意思是？',
        audioText: 'tomorrow',
        options: ['车库，汽车修理厂', '杂乱，混乱', '已经', '明天'],
      },
      answer: '明天',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"tonight" 的意思是？',
        audioText: 'tonight',
        options: ['车库，汽车修理厂', '今晚', '晚餐', '明天'],
      },
      answer: '今晚',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'When will they arrive?',
        translation: '他们什么时候到达？',
      },
      answer: 'When will they arrive?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'When will you leave?',
        translation: '你什么时候离开？',
      },
      answer: 'When will you leave?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/təˈnaɪt/',
        meaning: '今晚',
        example: 'See you tonight.',
      },
      answer: 'tonight',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/təˈmɒrəʊ/',
        meaning: '明天',
        example: 'See you tomorrow.',
      },
      answer: 'tomorrow',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When will they ______',
        translation: '他们什么时候到达？',
        options: ['Repair', 'arrive', 'Neighbour', 'For'],
      },
      answer: 'arrive',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I will leave ______',
        translation: '我明天离开。',
        options: ['Yet', 'tomorrow', 'Cost', 'Penny'],
      },
      answer: 'tomorrow',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They will arrive ______',
        translation: '他们今晚到达。',
        options: ['Film', 'Beautiful', 'tonight', 'Breakfast'],
      },
      answer: 'tonight',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They will arrive tonight." 的正确翻译是？',
        passage: 'When will...?',
        options: ['他们今晚到达。', '你什么时候离开？', '我明天离开。', '他们什么时候到达？'],
      },
      answer: '他们今晚到达。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"When will you leave?" 的正确翻译是？',
        passage: 'When will...?',
        options: ['你什么时候离开？', '他们今晚到达。', '我明天离开。', '他们什么时候到达？'],
      },
      answer: '你什么时候离开？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"mess" 的意思是？',
        audioText: 'mess',
        options: ['自从', '路灯柱', '刚刚', '杂乱，混乱'],
      },
      answer: '杂乱，混乱',
      score: 10,
    },
  ],

  // Lesson 93: Lesson 93: Our new neighbour 我们的新邻居 (Level 3)
  93: [
    {
      type: 'listening',
      content: {
        question: '听录音，"actor" 的意思是？',
        audioText: 'actor',
        options: ['花费', '城市', '男演员', '刚刚'],
      },
      answer: '男演员',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"actress" 的意思是？',
        audioText: 'actress',
        options: ['路灯柱', '女演员', '假日，假期', '修理'],
      },
      answer: '女演员',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"choice" 的意思是？',
        audioText: 'choice',
        options: ['今晚', '已经', '选择', '女演员'],
      },
      answer: '选择',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He will be here soon.',
        translation: '他很快就到。',
      },
      answer: 'He will be here soon.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He will arrive tomorrow morning.',
        translation: '他明天早上到。',
      },
      answer: 'He will arrive tomorrow morning.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He is an actor.',
        translation: '他是个演员。',
      },
      answer: 'He is an actor.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈæktrəs/',
        meaning: '女演员',
        example: 'She is an actress.',
      },
      answer: 'actress',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tʃɔɪs/',
        meaning: '选择',
        example: 'Make a choice.',
      },
      answer: 'choice',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He will arrive tomorrow ______',
        translation: '他明天早上到。',
        options: ['Choice', 'Actress', 'Actor', 'morning'],
      },
      answer: 'morning',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He will be here ______',
        translation: '他很快就到。',
        options: ['Actor', 'Choice', 'soon', 'Actress'],
      },
      answer: 'soon',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ will he arrive?',
        translation: '他什么时候到？',
        options: ['When', 'Actor', 'Choice', 'Actress'],
      },
      answer: 'When',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is worth every penny of it." 的正确翻译是？',
        passage: 'Our new neighbour',
        options: [
          '奈杰尔：那你为什么要卖掉它？',
          '奈杰尔：嗯，我喜欢这房子，但我还不能决定。',
          '奈杰尔：它值每一分钱。',
          '伊恩：是的，我从1976年就住在这里。',
        ],
      },
      answer: '奈杰尔：它值每一分钱。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Good afternoon. I believe that this house is for sale." 的正确翻译是？',
        passage: 'Our new neighbour',
        options: [
          '奈杰尔：这房子多少钱？',
          '奈杰尔：你在这里住了多久？',
          '伊恩：女人总是有最后决定权！',
          '奈杰尔：下午好。我想这房子是要出售的。',
        ],
      },
      answer: '奈杰尔：下午好。我想这房子是要出售的。',
      score: 10,
    },
  ],

  // Lesson 94: Lesson 94: When did you/will you...? 你（将）什么时候……？ (Level 3)
  94: [
    {
      type: 'listening',
      content: {
        question: '听录音，"next" 的意思是？',
        audioText: 'next',
        options: ['移动，搬家', '邻居', '下一个', '还，尚'],
      },
      answer: '下一个',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"last" 的意思是？',
        audioText: 'last',
        options: ['碰撞', '花费', '上一个', '人们'],
      },
      answer: '上一个',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I went to London last year.',
        translation: '我去年去的伦敦。',
      },
      answer: 'I went to London last year.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I will go to Paris next year.',
        translation: '我明年去巴黎。',
      },
      answer: 'I will go to Paris next year.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/nekst/',
        meaning: '下一个',
        example: 'Next week.',
      },
      answer: 'next',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/lɑːst/',
        meaning: '上一个',
        example: 'Last week.',
      },
      answer: 'last',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I will go to Paris ______ year.',
        translation: '我明年去巴黎。',
        options: ['next', 'Lamp-post', 'City', 'Film'],
      },
      answer: 'next',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'When will you go to ______',
        translation: '你什么时候去巴黎？',
        options: ['Last', 'Still', 'Actor', 'Paris'],
      },
      answer: 'Paris',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ did you go to London?',
        translation: '你什么时候去的伦敦？',
        options: ['Spring', 'When', 'Crash', 'Next'],
      },
      answer: 'When',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"When will you go to Paris?" 的正确翻译是？',
        passage: 'When did you/will you...?',
        options: [
          '我去年去的伦敦。',
          '你什么时候去巴黎？',
          '我明年去巴黎。',
          '你什么时候去的伦敦？',
        ],
      },
      answer: '你什么时候去巴黎？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I will go to Paris next year." 的正确翻译是？',
        passage: 'When did you/will you...?',
        options: [
          '我明年去巴黎。',
          '我去年去的伦敦。',
          '你什么时候去的伦敦？',
          '你什么时候去巴黎？',
        ],
      },
      answer: '我明年去巴黎。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"tomorrow" 的意思是？',
        audioText: 'tomorrow',
        options: ['电影', '移动，搬家', '明天', '电影院'],
      },
      answer: '明天',
      score: 10,
    },
  ],

  // Lesson 95: Lesson 95: Tickets, please 请出示车票 (Level 3)
  95: [
    {
      type: 'listening',
      content: {
        question: '听录音，"platform" 的意思是？',
        audioText: 'platform',
        options: ['站台', '还，仍然', '今晚', '人'],
      },
      answer: '站台',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"bar" 的意思是？',
        audioText: 'bar',
        options: ['酒吧', '移动，搬家', '春天', '花费'],
      },
      answer: '酒吧',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"catch" 的意思是？',
        audioText: 'catch',
        options: ['自从', '城市', '赶上', '路灯柱'],
      },
      answer: '赶上',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I want to catch the 10:35 train to London.',
        translation: '我想赶10点35分去伦敦的火车。',
      },
      answer: 'I want to catch the 10:35 train to London.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Platform 2.',
        translation: '二号站台。',
      },
      answer: 'Platform 2.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Tickets, please!',
        translation: '请出示车票！',
      },
      answer: 'Tickets, please!',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/kætʃ/',
        meaning: '赶上',
        example: 'Catch the train.',
      },
      answer: 'catch',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/mɪs/',
        meaning: '错过',
        example: 'Miss the train.',
      },
      answer: 'miss',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ 2.',
        translation: '二号站台。',
        options: ['Ticket', 'Miss', 'Platform', 'Bar'],
      },
      answer: 'Platform',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I want to ______ the 10:35 train to London.',
        translation: '我想赶10点35分去伦敦的火车。',
        options: ['catch', 'Miss', 'Ticket', 'Bar'],
      },
      answer: 'catch',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Which ______',
        translation: '哪个站台？',
        options: ['Catch', 'platform', 'Ticket', 'Miss'],
      },
      answer: 'platform',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Which platform?" 的正确翻译是？',
        passage: 'Tickets, please',
        options: [
          '肯：我们不想错过火车。',
          '服务员：哪个站台？',
          '乔治：请给我两张去伦敦的往返票。',
          '乔治：我们最好不要喝太多。',
        ],
      },
      answer: '服务员：哪个站台？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"There is a bar next door to the station." 的正确翻译是？',
        passage: 'Tickets, please',
        options: [
          '肯：下一班火车什么时候开？',
          '肯：车站隔壁有个酒吧。',
          '服务员：下一班火车是8点35分。',
          '乔治：我们得等一个半小时！',
        ],
      },
      answer: '肯：车站隔壁有个酒吧。',
      score: 10,
    },
  ],

  // Lesson 96: Lesson 96: What time is it? 现在几点？ (Level 3)
  96: [
    {
      type: 'listening',
      content: {
        question: '听录音，"exact" 的意思是？',
        audioText: 'exact',
        options: ['还，仍然', '达，计', '明天', '确切的'],
      },
      answer: '确切的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"sharp" 的意思是？',
        audioText: 'sharp',
        options: ['男演员', '整点', '修理', '赶上'],
      },
      answer: '整点',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It is half past seven.',
        translation: '七点半。',
      },
      answer: 'It is half past seven.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What time is it?',
        translation: '现在几点？',
      },
      answer: 'What time is it?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɪɡˈzækt/',
        meaning: '确切的',
        example: 'The exact time.',
      },
      answer: 'exact',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ʃɑːp/',
        meaning: '整点',
        example: "At 8 o'clock sharp.",
      },
      answer: 'sharp',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is half past ______',
        translation: '七点半。',
        options: ['Actress', 'Tomorrow', 'Worth', 'seven'],
      },
      answer: 'seven',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ time is it?',
        translation: '现在几点？',
        options: ['People', 'Miss', 'What', 'Move'],
      },
      answer: 'What',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is ten past ______',
        translation: '三点十分。',
        options: ['Bar', 'Sale', 'Choice', 'three'],
      },
      answer: 'three',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is a quarter to six." 的正确翻译是？',
        passage: 'What time is it?',
        options: ['六点差一刻。', '现在几点？', '现在几点？', '三点十分。'],
      },
      answer: '六点差一刻。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What time is it?" 的正确翻译是？',
        passage: 'What time is it?',
        options: ['现在几点？', '现在几点？', '六点差一刻。', '三点十分。'],
      },
      answer: '现在几点？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"neighbour" 的意思是？',
        audioText: 'neighbour',
        options: ['男演员', '至少', '邻居', '人们'],
      },
      answer: '邻居',
      score: 10,
    },
  ],

  // Lesson 97: Lesson 97: A small blue case 一只蓝色的小箱子 (Level 3)
  97: [
    {
      type: 'listening',
      content: {
        question: '听录音，"describe" 的意思是？',
        audioText: 'describe',
        options: ['便士', '描述', '路灯柱', '标签'],
      },
      answer: '描述',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"zip" 的意思是？',
        audioText: 'zip',
        options: ['下一个', '拉链', '退休', '修理'],
      },
      answer: '拉链',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"handle" 的意思是？',
        audioText: 'handle',
        options: ['把手', '车库，汽车修理厂', '花费', '选择'],
      },
      answer: '把手',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It has got a zip.',
        translation: '它有拉链。',
      },
      answer: 'It has got a zip.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Can you describe it?',
        translation: '你能描述一下吗？',
      },
      answer: 'Can you describe it?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I left a case on the train.',
        translation: '我把一个箱子落在火车上了。',
      },
      answer: 'I left a case on the train.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈhændl/',
        meaning: '把手',
        example: 'The handle is broken.',
      },
      answer: 'handle',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/dɪˈskraɪb/',
        meaning: '描述',
        example: 'Describe it.',
      },
      answer: 'describe',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What is the name and address on the ______',
        translation: '标签上的名字和地址是什么？',
        options: ['Case', 'Address', 'Handle', 'label'],
      },
      answer: 'label',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Can you ______ it?',
        translation: '你能描述一下吗？',
        options: ['Address', 'describe', 'Case', 'Label'],
      },
      answer: 'describe',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It has got a ______',
        translation: '它有拉链。',
        options: ['Handle', 'Case', 'zip', 'Describe'],
      },
      answer: 'zip',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Oh dear! I have left the key in the case!" 的正确翻译是？',
        passage: 'A small blue case',
        options: [
          '霍尔先生：天哪！我把钥匙落在箱子里了！',
          '服务员：三英镑五十便士。',
          '霍尔先生：给你。',
          '服务员：谢谢。',
        ],
      },
      answer: '霍尔先生：天哪！我把钥匙落在箱子里了！',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Is this case yours?" 的正确翻译是？',
        passage: 'A small blue case',
        options: [
          '服务员：这个箱子是你的吗？',
          '服务员：你的名字和地址是什么？',
          '霍尔先生：它是一个带拉链的蓝色小箱子。',
          '霍尔先生："大卫·霍尔，大桥街83号。"',
        ],
      },
      answer: '服务员：这个箱子是你的吗？',
      score: 10,
    },
  ],

  // Lesson 98: Lesson 98: Whose is it? 它是谁的？ (Level 3)
  98: [
    {
      type: 'listening',
      content: {
        question: '听录音，"yours" 的意思是？',
        audioText: 'yours',
        options: ['达，计', '明天', '你的', '地址'],
      },
      answer: '你的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"belong" 的意思是？',
        audioText: 'belong',
        options: ['属于', '你的', '至少', '赶上'],
      },
      answer: '属于',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"mine" 的意思是？',
        audioText: 'mine',
        options: ['箱子', '把手', '地址', '我的'],
      },
      answer: '我的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'No, it is not mine. It is hers.',
        translation: '不，不是我的。是她的。',
      },
      answer: 'No, it is not mine. It is hers.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Whose is this case?',
        translation: '这个箱子是谁的？',
      },
      answer: 'Whose is this case?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/jɔːz/',
        meaning: '你的',
        example: 'Is this yours?',
      },
      answer: 'yours',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/maɪn/',
        meaning: '我的',
        example: 'It is mine.',
      },
      answer: 'mine',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It is ______',
        translation: '是我的。',
        options: ['Zip', 'For', 'mine', 'Label'],
      },
      answer: 'mine',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, it is not ______ It is hers.',
        translation: '不，不是我的。是她的。',
        options: ['Actress', 'Neighbour', 'Last', 'mine'],
      },
      answer: 'mine',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is this ______',
        translation: '这是你的吗？',
        options: ['Platform', 'Mine', 'yours', 'Tomorrow'],
      },
      answer: 'yours',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is mine." 的正确翻译是？',
        passage: 'Whose is it?',
        options: ['是我的。', '这个箱子是谁的？', '这是你的吗？', '不，不是我的。是她的。'],
      },
      answer: '是我的。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, it is not mine. It is hers." 的正确翻译是？',
        passage: 'Whose is it?',
        options: ['不，不是我的。是她的。', '这个箱子是谁的？', '是我的。', '这是你的吗？'],
      },
      answer: '不，不是我的。是她的。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"describe" 的意思是？',
        audioText: 'describe',
        options: ['花费', '描述', '自从', '站台'],
      },
      answer: '描述',
      score: 10,
    },
  ],

  // Lesson 99: Lesson 99: Ow! 哎哟！ (Level 3)
  99: [
    {
      type: 'listening',
      content: {
        question: '听录音，"downstairs" 的意思是？',
        audioText: 'downstairs',
        options: ['女演员', '便士', '下楼', '上一个'],
      },
      answer: '下楼',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"slip" 的意思是？',
        audioText: 'slip',
        options: ['女演员', '拉链', '滑倒', '想念，怀念'],
      },
      answer: '滑倒',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"back" 的意思是？',
        audioText: 'back',
        options: ['哎哟', '背', '达，计', '属于'],
      },
      answer: '背',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Try and stand up.',
        translation: '试着站起来。',
      },
      answer: 'Try and stand up.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have you hurt yourself?',
        translation: '你伤着自己了吗？',
      },
      answer: 'Have you hurt yourself?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I think that I have hurt my back.',
        translation: '我想我伤着背了。',
      },
      answer: 'I think that I have hurt my back.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/aʊ/',
        meaning: '哎哟',
        example: 'Ow! That hurts!',
      },
      answer: 'ow',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/hɜːt/',
        meaning: '伤害，弄伤',
        example: 'Hurt my back.',
      },
      answer: 'hurt',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I think that I have ______ my back.',
        translation: '我想我伤着背了。',
        options: ['Slip', 'Back', 'Downstairs', 'hurt'],
      },
      answer: 'hurt',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I slipped and fell ______',
        translation: '我滑倒了，从楼梯上摔下来。',
        options: ['downstairs', 'Back', 'Fall', 'Help'],
      },
      answer: 'downstairs',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Let me ______ you.',
        translation: '让我帮你。',
        options: ['Ow', 'Back', 'Slip', 'help'],
      },
      answer: 'help',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Try and stand up." 的正确翻译是？',
        passage: 'Ow!',
        options: [
          '露西：试着站起来。',
          '露西：安迪，怎么了？',
          '露西：你现在好了吗？',
          '露西：我给卡特医生打电话。',
        ],
      },
      answer: '露西：试着站起来。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Have you hurt yourself?" 的正确翻译是？',
        passage: 'Ow!',
        options: [
          '安迪：我滑倒了，从楼梯上摔下来。',
          '安迪：是的，我好了。谢谢，露西。',
          '露西：你伤着自己了吗？',
          '露西：你现在好了吗？',
        ],
      },
      answer: '露西：你伤着自己了吗？',
      score: 10,
    },
  ],

  // Lesson 100: Lesson 100: He says that... 他说…… (Level 3)
  100: [
    {
      type: 'listening',
      content: {
        question: '听录音，"look" 的意思是？',
        audioText: 'look',
        options: ['整点', '看起来', '哎哟', '背'],
      },
      answer: '看起来',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"feel" 的意思是？',
        audioText: 'feel',
        options: ['站台', '人', '票', '感觉'],
      },
      answer: '感觉',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They say that they are hungry.',
        translation: '他们说他们饿了。',
      },
      answer: 'They say that they are hungry.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He says that he feels ill.',
        translation: '他说他感觉不舒服。',
      },
      answer: 'He says that he feels ill.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/fiːl/',
        meaning: '感觉',
        example: 'I feel ill.',
      },
      answer: 'feel',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/lʊk/',
        meaning: '看起来',
        example: 'You look tired.',
      },
      answer: 'look',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I say that I am ______',
        translation: '我说我很高兴。',
        options: ['Look', 'happy', 'Last', 'Since'],
      },
      answer: 'happy',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ that she is tired.',
        translation: '她说她累了。',
        options: ['Fall', 'Tonight', 'says', 'Belong'],
      },
      answer: 'says',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They say that ______ are hungry.',
        translation: '他们说他们饿了。',
        options: ['Actor', 'Platform', 'Move', 'they'],
      },
      answer: 'they',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She says that she is tired." 的正确翻译是？',
        passage: 'He says that...',
        options: ['我说我很高兴。', '他们说他们饿了。', '他说他感觉不舒服。', '她说她累了。'],
      },
      answer: '她说她累了。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I say that I am happy." 的正确翻译是？',
        passage: 'He says that...',
        options: ['他说他感觉不舒服。', '她说她累了。', '我说我很高兴。', '他们说他们饿了。'],
      },
      answer: '我说我很高兴。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"catch" 的意思是？',
        audioText: 'catch',
        options: ['赶上', '选择', '跌落，摔倒', '酒吧'],
      },
      answer: '赶上',
      score: 10,
    },
  ],

  // Lesson 101: Lesson 101: A card from Jimmy 吉米的明信片 (Level 3)
  101: [
    {
      type: 'listening',
      content: {
        question: '听录音，"association" 的意思是？',
        audioText: 'association',
        options: ['赶上', '把手', '滑倒', '协会'],
      },
      answer: '协会',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"Scotland" 的意思是？',
        audioText: 'Scotland',
        options: ['赶上', '拉链', '苏格兰', '我的'],
      },
      answer: '苏格兰',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"card" 的意思是？',
        audioText: 'card',
        options: ['帮助', '把手', '卡片，明信片', '箱子'],
      },
      answer: '卡片，明信片',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "Read Jimmy's card to me.",
        translation: '把吉米的明信片读给我听。',
      },
      answer: "Read Jimmy's card to me.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'A card from Jimmy.',
        translation: '吉米的明信片。',
      },
      answer: 'A card from Jimmy.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He says he will write a letter soon.',
        translation: '他说他很快就会写信。',
      },
      answer: 'He says he will write a letter soon.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈskɒtlənd/',
        meaning: '苏格兰',
        example: 'Go to Scotland.',
      },
      answer: 'scotland',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈhɒstl/',
        meaning: '招待所',
        example: 'Youth hostel.',
      },
      answer: 'hostel',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He says he is in ______',
        translation: '他说他在苏格兰。',
        options: ['Card', 'Association', 'Scotland', 'Youth'],
      },
      answer: 'Scotland',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'A ______ from Jimmy.',
        translation: '吉米的明信片。',
        options: ['Scotland', 'card', 'Association', 'Hostel'],
      },
      answer: 'card',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "Read Jimmy's ______ to me.",
        translation: '把吉米的明信片读给我听。',
        options: ['card', 'Hostel', 'Youth', 'Association'],
      },
      answer: 'card',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question:
          '""I have just arrived in Scotland and I am staying at a Youth Hostel."" 的正确翻译是？',
        passage: 'A card from Jimmy',
        options: [
          '玛丽："我刚到苏格兰，住在一家青年旅舍。"',
          '奶奶：就这些？他没说多少，是吧？',
          '玛丽：他说他很快就会写信。',
          '奶奶：那很好。我希望他很快回家。',
        ],
      },
      answer: '玛丽："我刚到苏格兰，住在一家青年旅舍。"',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '""I will write a letter soon. I hope you are all well."" 的正确翻译是？',
        passage: 'A card from Jimmy',
        options: [
          '奶奶：什么？',
          '奶奶：他是个好孩子。',
          '奶奶：那很好。我希望他很快回家。',
          '玛丽："我很快就会写信。希望你们都好。"',
        ],
      },
      answer: '玛丽："我很快就会写信。希望你们都好。"',
      score: 10,
    },
  ],

  // Lesson 102: Lesson 102: He says he... 他说他…… (Level 3)
  102: [
    {
      type: 'listening',
      content: {
        question: '听录音，"write" 的意思是？',
        audioText: 'write',
        options: ['写', '跌落，摔倒', '选择', '地址'],
      },
      answer: '写',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"soon" 的意思是？',
        audioText: 'soon',
        options: ['上一个', '背', '确切的', '不久'],
      },
      answer: '不久',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He says he feels cold.',
        translation: '他说他觉得冷。',
      },
      answer: 'He says he feels cold.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He says he will come soon.',
        translation: '他说他很快就来。',
      },
      answer: 'He says he will come soon.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/raɪt/',
        meaning: '写',
        example: 'Write a letter.',
      },
      answer: 'write',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/suːn/',
        meaning: '不久',
        example: 'See you soon.',
      },
      answer: 'soon',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He says he will come ______',
        translation: '他说他很快就来。',
        options: ['Bar', 'soon', 'Hostel', 'Choice'],
      },
      answer: 'soon',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They say they are ______ for a bus.',
        translation: '他们说他们在等公共汽车。',
        options: ['Scotland', 'Label', 'Write', 'waiting'],
      },
      answer: 'waiting',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He says he feels ______',
        translation: '他说他觉得冷。',
        options: ['Card', 'Hostel', 'Scotland', 'cold'],
      },
      answer: 'cold',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He says he feels cold." 的正确翻译是？',
        passage: 'He says he...',
        options: ['他说他觉得冷。', '他说他很快就来。', '他们说他们在等公共汽车。', '她说她头痛。'],
      },
      answer: '他说他觉得冷。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She says she has a headache." 的正确翻译是？',
        passage: 'He says he...',
        options: ['他说他觉得冷。', '他们说他们在等公共汽车。', '她说她头痛。', '他说他很快就来。'],
      },
      answer: '她说她头痛。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"sharp" 的意思是？',
        audioText: 'sharp',
        options: ['拉链', '明天', '整点', '描述'],
      },
      answer: '整点',
      score: 10,
    },
  ],

  // Lesson 103: Lesson 103: The French test 法语考试 (Level 3)
  103: [
    {
      type: 'listening',
      content: {
        question: '听录音，"easy" 的意思是？',
        audioText: 'easy',
        options: ['整点', '拉链', '容易的', '错过'],
      },
      answer: '容易的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"pass" 的意思是？',
        audioText: 'pass',
        options: ['振作，欢呼', '我的', '通过，及格', '卡片，明信片'],
      },
      answer: '通过，及格',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"difficult" 的意思是？',
        audioText: 'difficult',
        options: ['看起来', '地址', '你的', '困难的'],
      },
      answer: '困难的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The guy next to me wrote his name at the top of the paper.',
        translation: '我旁边的那个人在试卷顶端写上了他的名字。',
      },
      answer: 'The guy next to me wrote his name at the top of the paper.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Not too bad.',
        translation: '不算太坏。',
      },
      answer: 'Not too bad.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'How about you, Gary?',
        translation: '你呢，加里？',
      },
      answer: 'How about you, Gary?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/rest/',
        meaning: '其余的，其余',
        example: 'The rest of the class.',
      },
      answer: 'rest',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tʃɪə/',
        meaning: '振作，欢呼',
        example: 'Cheer up!',
      },
      answer: 'cheer',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The questions were very ______',
        translation: '题目很容易。',
        options: ['easy', 'Difficult', 'Exam', 'Pass'],
      },
      answer: 'easy',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "The English and Maths papers weren't ______ enough for me.",
        translation: '英语和数学试卷对我来说不够容易。',
        options: ['Difficult', 'Guy', 'easy', 'Pass'],
      },
      answer: 'easy',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The questions were too ______ for me.',
        translation: '题目对我来说太难了。',
        options: ['Guy', 'difficult', 'Exam', 'Rest'],
      },
      answer: 'difficult',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He didn\'t write a word!" 的正确翻译是？',
        passage: 'The French test',
        options: [
          '他一个字也没写！',
          '题目很容易。',
          '也许我们考得不太坏。',
          '英语和数学试卷对我来说不够容易。',
        ],
      },
      answer: '他一个字也没写！',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"The guy next to me wrote his name at the top of the paper." 的正确翻译是？',
        passage: 'The French test',
        options: [
          '我旁边的那个人在试卷顶端写上了他的名字。',
          '你呢，加里？',
          '我想我的英语和数学及格了。',
          '然后他坐在那儿看了三个小时！',
        ],
      },
      answer: '我旁边的那个人在试卷顶端写上了他的名字。',
      score: 10,
    },
  ],

  // Lesson 104: Lesson 104: Too, very, enough 太、非常、足够 (Level 3)
  104: [
    {
      type: 'listening',
      content: {
        question: '听录音，"high" 的意思是？',
        audioText: 'high',
        options: ['上一个', '伤害，弄伤', '高的', '下楼'],
      },
      answer: '高的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"stale" 的意思是？',
        audioText: 'stale',
        options: ['我的', '不新鲜的', '跌落，摔倒', '考试'],
      },
      answer: '不新鲜的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"loud" 的意思是？',
        audioText: 'loud',
        options: ['低的', '大声的', '困难的', '下一个'],
      },
      answer: '大声的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The questions were easy enough for her.',
        translation: '题目对她来说够容易了。',
      },
      answer: 'The questions were easy enough for her.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He is clever enough to answer the question.',
        translation: '他够聪明，能回答这个问题。',
      },
      answer: 'He is clever enough to answer the question.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tʃiːp/',
        meaning: '便宜的',
        example: 'It is cheap.',
      },
      answer: 'cheap',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/laʊd/',
        meaning: '大声的',
        example: 'Loud music.',
      },
      answer: 'loud',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This ______ is very difficult.',
        translation: '这本书很难。',
        options: ['Hard', 'Loud', 'Low', 'book'],
      },
      answer: 'book',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This ______ is easy enough for me.',
        translation: '这本书对我来说够容易了。',
        options: ['Soft', 'Fresh', 'Loud', 'book'],
      },
      answer: 'book',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This ______ is too difficult for me.',
        translation: '这本书对我来说太难了。',
        options: ['Cheap', 'Expensive', 'book', 'Clever'],
      },
      answer: 'book',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Is this car cheap enough for you?" 的正确翻译是？',
        passage: 'Too, very, enough',
        options: [
          '是的，对我来说太难了。',
          '这辆车对你来说太贵了吗？',
          '这辆车对你来说够便宜吗？',
          '是的，对我来说太贵了。',
        ],
      },
      answer: '这辆车对你来说够便宜吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, it is too difficult for me." 的正确翻译是？',
        passage: 'Too, very, enough',
        options: [
          '这本书对你来说够容易吗？',
          '是的，对我来说太难了。',
          '这辆车对你来说够便宜吗？',
          '这辆车对你来说太贵了吗？',
        ],
      },
      answer: '是的，对我来说太难了。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"belong" 的意思是？',
        audioText: 'belong',
        options: ['属于', '招待所', '困难的', '青年'],
      },
      answer: '属于',
      score: 10,
    },
  ],

  // Lesson 105: Lesson 105: Hello, Mr. Jones 你好，琼斯先生 (Level 3)
  105: [
    {
      type: 'listening',
      content: {
        question: '听录音，"carry" 的意思是？',
        audioText: 'carry',
        options: ['家伙，人', '我的', '携带，搬运', '硬的，困难的'],
      },
      answer: '携带，搬运',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"intelligent" 的意思是？',
        audioText: 'intelligent',
        options: ['协会', '把手', '标签', '聪明的'],
      },
      answer: '聪明的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"dictionary" 的意思是？',
        audioText: 'dictionary',
        options: ['振作，欢呼', '属于', '词典', '困难的'],
      },
      answer: '词典',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What is your phone number?',
        translation: '你的电话号码是多少？',
      },
      answer: 'What is your phone number?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Can I speak to Mr. Jones, please?',
        translation: '请问我可以和琼斯先生通话吗？',
      },
      answer: 'Can I speak to Mr. Jones, please?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Can I take a message?',
        translation: '我可以留个口信吗？',
      },
      answer: 'Can I take a message?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/kəˈrekt/',
        meaning: '改正，正确的',
        example: 'Correct the mistake.',
      },
      answer: 'correct',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈdɪkʃənəri/',
        meaning: '词典',
        example: 'Look it up in the dictionary.',
      },
      answer: 'dictionary',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Is that you, Mr. ______',
        translation: '是琼斯先生吗？',
        options: ['Jones', 'Spell', 'Mistake', 'Dictionary'],
      },
      answer: 'Jones',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Yes, ______',
        translation: '是的，请讲。',
        options: ['speaking', 'Dictionary', 'Spell', 'Present'],
      },
      answer: 'speaking',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "It's ______",
        translation: '是524-6372。',
        options: ['Present', '', 'Mistake', 'Dictionary'],
      },
      answer: '',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I want to speak to you about the party." 的正确翻译是？',
        passage: 'Hello, Mr. Jones',
        options: ['是琼斯太太吗？', '真遗憾！', '我想和你谈谈聚会的事。', '你周六能来吗？'],
      },
      answer: '我想和你谈谈聚会的事。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What a pity!" 的正确翻译是？',
        passage: 'Hello, Mr. Jones',
        options: ['我想和你谈谈聚会的事。', '恐怕我不能来。', '真遗憾！', '谈什么？'],
      },
      answer: '真遗憾！',
      score: 10,
    },
  ],

  // Lesson 106: Lesson 106: 电话用语复习 (Level 3)
  106: [
    {
      type: 'listening',
      content: {
        question: '听录音，"phone" 的意思是？',
        audioText: 'phone',
        options: ['描述', '失败，不及格', '家伙，人', '电话'],
      },
      answer: '电话',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"message" 的意思是？',
        audioText: 'message',
        options: ['恐怕，害怕', '把手', '消息，口信', '哎哟'],
      },
      answer: '消息，口信',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"afraid" 的意思是？',
        audioText: 'afraid',
        options: ['恐怕，害怕', '滑倒', '帮助', '把手'],
      },
      answer: '恐怕，害怕',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'This is Mrs. Jones.',
        translation: '我是琼斯太太。',
      },
      answer: 'This is Mrs. Jones.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Is that Mr. Smith?',
        translation: '是史密斯先生吗？',
      },
      answer: 'Is that Mr. Smith?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/əˈfreɪd/',
        meaning: '恐怕，害怕',
        example: "I'm afraid not.",
      },
      answer: 'afraid',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/kɔːl/',
        meaning: '打电话',
        example: 'Call me later.',
      },
      answer: 'call',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Can I take a ______',
        translation: '我可以留个口信吗？',
        options: ['message', 'Phone', 'Afraid', 'Call'],
      },
      answer: 'message',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I'm ______ he is out.",
        translation: '恐怕他出去了。',
        options: ['Phone', 'Message', 'Call', 'afraid'],
      },
      answer: 'afraid',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Please tell him to ______ me back.',
        translation: '请告诉他给我回电话。',
        options: ['call', 'Message', 'Phone', 'Afraid'],
      },
      answer: 'call',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Can I leave a message?" 的正确翻译是？',
        passage: 'Telephone English',
        options: [
          '是555-1234。',
          '我可以留个口信吗？',
          '你好，我可以和史密斯先生通话吗？',
          '是的，当然可以。',
        ],
      },
      answer: '我可以留个口信吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I\'ll give him the message." 的正确翻译是？',
        passage: 'Telephone English',
        options: ['我会转告他的。', '恐怕他现在不在。', '我可以留个口信吗？', '你的号码是多少？'],
      },
      answer: '我会转告他的。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"correct" 的意思是？',
        audioText: 'correct',
        options: ['拼写', '下楼', '携带，搬运', '改正，正确的'],
      },
      answer: '改正，正确的',
      score: 10,
    },
  ],

  // Lesson 107: Lesson 107: It's too high 太高了 (Level 3)
  107: [
    {
      type: 'listening',
      content: {
        question: '听录音，"million" 的意思是？',
        audioText: 'million',
        options: ['背', '型号，模型', '百万', '昂贵的'],
      },
      answer: '百万',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"model" 的意思是？',
        audioText: 'model',
        options: ['大声的', '恐怕，害怕', '型号，模型', '拉链'],
      },
      answer: '型号，模型',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"instalment" 的意思是？',
        audioText: 'instalment',
        options: ['分期付款', '电话', '其余的，其余', '跌落，摔倒'],
      },
      answer: '分期付款',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'And then fourteen pounds a month for three years.',
        translation: '然后三年内每月付十四英镑。',
      },
      answer: 'And then fourteen pounds a month for three years.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "But it's better.",
        translation: '但它更好。',
      },
      answer: "But it's better.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'You can pay a deposit of thirty pounds.',
        translation: '你可以先付三十英镑的押金。',
      },
      answer: 'You can pay a deposit of thirty pounds.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/praɪs/',
        meaning: '价格',
        example: 'What is the price?',
      },
      answer: 'price',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/dɪˈpɒzɪt/',
        meaning: '押金，存款',
        example: 'Pay a deposit.',
      },
      answer: 'deposit',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "The other model's more ______",
        translation: '另一个型号更贵。',
        options: ['Million', 'Afford', 'expensive', 'Instalment'],
      },
      answer: 'expensive',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Of ______',
        translation: '当然可以。',
        options: ['Instalment', 'Model', 'Afford', 'course'],
      },
      answer: 'course',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Can we buy it on ______',
        translation: '我们可以分期付款购买吗？',
        options: ['Afford', 'Instalment', 'instalments', 'Price'],
      },
      answer: 'instalments',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It costs fifty pounds." 的正确翻译是？',
        passage: "It's too high",
        options: ['那对我来说太贵了。', '那还是太贵了。', '它值五十英镑。', '这件更便宜。'],
      },
      answer: '它值五十英镑。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I\'ll take it." 的正确翻译是？',
        passage: "It's too high",
        options: ['这件更便宜。', '那还是太贵了。', '我非常喜欢。', '我买这件。'],
      },
      answer: '我买这件。',
      score: 10,
    },
  ],

  // Lesson 108: Lesson 108: 形容词比较级复习 (Level 3)
  108: [
    {
      type: 'listening',
      content: {
        question: '听录音，"better" 的意思是？',
        audioText: 'better',
        options: ['更好的', '聪明的', '错误', '伤害，弄伤'],
      },
      answer: '更好的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"shorter" 的意思是？',
        audioText: 'shorter',
        options: ['跌落，摔倒', '更短的', '失败，不及格', '不久'],
      },
      answer: '更短的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"bigger" 的意思是？',
        audioText: 'bigger',
        options: ['型号，模型', '软的', '更大的', '属于'],
      },
      answer: '更大的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'This car is worse than that one.',
        translation: '这辆车比那辆差。',
      },
      answer: 'This car is worse than that one.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'This one is as good as that one.',
        translation: '这个和那个一样好。',
      },
      answer: 'This one is as good as that one.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈʃɔːtə/',
        meaning: '更短的',
        example: 'This is shorter.',
      },
      answer: 'shorter',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈbetə/',
        meaning: '更好的',
        example: 'This is better.',
      },
      answer: 'better',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This dress is ______ than that one.',
        translation: '这件连衣裙比那件便宜。',
        options: ['Longer', 'cheaper', 'Bigger', 'Smaller'],
      },
      answer: 'cheaper',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This car is ______ than that one.',
        translation: '这辆车比那辆差。',
        options: ['worse', 'Smaller', 'Longer', 'Bigger'],
      },
      answer: 'worse',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This book is ______ than that one.',
        translation: '这本书比那本好。',
        options: ['Worse', 'Bigger', 'better', 'Smaller'],
      },
      answer: 'better',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is shorter than that one." 的正确翻译是？',
        passage: 'Comparative adjectives',
        options: [
          '它比那件短。',
          '不，它不如那辆贵。',
          '不，它不如那本好。',
          '这件连衣裙和那件一样长吗？',
        ],
      },
      answer: '它比那件短。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It is cheaper than that one." 的正确翻译是？',
        passage: 'Comparative adjectives',
        options: ['不，它不如那辆贵。', '不，它不如那本好。', '它比那本更好。', '它比那辆便宜。'],
      },
      answer: '它比那辆便宜。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"easy" 的意思是？',
        audioText: 'easy',
        options: ['属于', '押金，存款', '容易的', '试卷，纸'],
      },
      answer: '容易的',
      score: 10,
    },
  ],

  // Lesson 109: Lesson 109: A good idea 好主意 (Level 3)
  109: [
    {
      type: 'listening',
      content: {
        question: '听录音，"advice" 的意思是？',
        audioText: 'advice',
        options: ['招待所', '建议', '容易的', '家伙，人'],
      },
      answer: '建议',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"pity" 的意思是？',
        audioText: 'pity',
        options: ['百万', '软的', '遗憾', '不久'],
      },
      answer: '遗憾',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"instead" 的意思是？',
        audioText: 'instead',
        options: ['更坏的', '分期付款', '代替', '跌落，摔倒'],
      },
      answer: '代替',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I don't like sugar in my coffee.",
        translation: '我不喜欢咖啡里放糖。',
      },
      answer: "I don't like sugar in my coffee.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I'd like a cigarette, too.",
        translation: '我也想来支香烟。',
      },
      answer: "I'd like a cigarette, too.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'No, thank you.',
        translation: '不用了，谢谢。',
      },
      answer: 'No, thank you.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ədˈvaɪs/',
        meaning: '建议',
        example: 'Give advice.',
      },
      answer: 'advice',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈpɪti/',
        meaning: '遗憾',
        example: 'What a pity!',
      },
      answer: 'pity',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, ______ you.',
        translation: '不用了，谢谢。',
        options: ['thank', 'Advice', 'Instead', 'Idea'],
      },
      answer: 'thank',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Yes, ______',
        translation: '好的，谢谢。',
        options: ['please', 'Pity', 'Idea', 'Instead'],
      },
      answer: 'please',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Two ______',
        translation: '两茶匙？',
        options: ['Advice', 'Instead', 'Idea', 'teaspoonfuls'],
      },
      answer: 'teaspoonfuls',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It\'s ready." 的正确翻译是？',
        passage: 'A good idea',
        options: ['好主意，鲍勃。', '好了。', '好的，谢谢。', '我来煮点咖啡好吗，简？'],
      },
      answer: '好了。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, please." 的正确翻译是？',
        passage: 'A good idea',
        options: ['好的，谢谢。', '我来煮点咖啡好吗，简？', '不用了，谢谢。', '你要牛奶吗？'],
      },
      answer: '好的，谢谢。',
      score: 10,
    },
  ],

  // Lesson 110: Lesson 110: 情态动词复习 (Level 3)
  110: [
    {
      type: 'listening',
      content: {
        question: '听录音，"would" 的意思是？',
        audioText: 'would',
        options: ['看起来', '困难的', '愿意', '更好的'],
      },
      answer: '愿意',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"should" 的意思是？',
        audioText: 'should',
        options: ['更好的', '一些（可数）', '试卷，纸', '应该'],
      },
      answer: '应该',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"could" 的意思是？',
        audioText: 'could',
        options: ['能，可以', '聪明的', '可以，可能', '招待所'],
      },
      answer: '能，可以',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Could you open the door, please?',
        translation: '你能开门吗？',
      },
      answer: 'Could you open the door, please?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Certainly.',
        translation: '当然可以。',
      },
      answer: 'Certainly.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/meɪ/',
        meaning: '可以，可能',
        example: 'May I come in?',
      },
      answer: 'may',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/maɪt/',
        meaning: '可能',
        example: 'It might rain.',
      },
      answer: 'might',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ I use your phone?',
        translation: '我可以用你的电话吗？',
        options: ['May', 'Would', 'Could', 'Should'],
      },
      answer: 'May',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ you like some tea?',
        translation: '你想要一些茶吗？',
        options: ['Would', 'Could', 'May', 'Should'],
      },
      answer: 'Would',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ you open the door, please?',
        translation: '你能开门吗？',
        options: ['Would', 'Might', 'Could', 'May'],
      },
      answer: 'Could',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, please." 的正确翻译是？',
        passage: 'Modal verbs',
        options: ['我可以进来吗？', '你能帮我吗？', '好的，谢谢。', '我该给他打电话吗？'],
      },
      answer: '好的，谢谢。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Would you like some coffee?" 的正确翻译是？',
        passage: 'Modal verbs',
        options: ['请进。', '是的，我觉得你应该打。', '我该给他打电话吗？', '你想要一些咖啡吗？'],
      },
      answer: '你想要一些咖啡吗？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"model" 的意思是？',
        audioText: 'model',
        options: ['型号，模型', '苏格兰', '失败，不及格', '分期付款'],
      },
      answer: '型号，模型',
      score: 10,
    },
  ],

  // Lesson 111: Lesson 111: The most expensive model 最贵的型号 (Level 3)
  111: [
    {
      type: 'listening',
      content: {
        question: '听录音，"afford" 的意思是？',
        audioText: 'afford',
        options: ['青年', '负担得起', '更大的', '一些（不可数）'],
      },
      answer: '负担得起',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"instalment" 的意思是？',
        audioText: 'instalment',
        options: ['分期付款', '携带，搬运', '试卷，纸', '更大的'],
      },
      answer: '分期付款',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"deposit" 的意思是？',
        audioText: 'deposit',
        options: ['押金', '不新鲜的', '愿意', '比较'],
      },
      answer: '押金',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It costs five hundred pounds.',
        translation: '它值五百英镑。',
      },
      answer: 'It costs five hundred pounds.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'This is the cheapest model in the shop.',
        translation: '这是店里最便宜的型号。',
      },
      answer: 'This is the cheapest model in the shop.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Of course.',
        translation: '当然可以。',
      },
      answer: 'Of course.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈmɒdl/',
        meaning: '型号',
        example: 'This model.',
      },
      answer: 'model',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/əˈfɔːd/',
        meaning: '负担得起',
        example: "I can't afford it.",
      },
      answer: 'afford',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I can't ______ all that money.",
        translation: '我付不起那么多钱。',
        options: ['afford', 'Millionaire', 'Price', 'Instalment'],
      },
      answer: 'afford',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'You can pay a ______ of thirty pounds.',
        translation: '你可以先付三十英镑的押金。',
        options: ['deposit', 'Price', 'Millionaire', 'Instalment'],
      },
      answer: 'deposit',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Have you got a cheaper ______',
        translation: '你们有更便宜的型号吗？',
        options: ['Instalment', 'model', 'Price', 'Afford'],
      },
      answer: 'model',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Of course." 的正确翻译是？',
        passage: 'The most expensive model',
        options: ['它和那个贵的一样好吗？', '这个型号便宜一些。', '当然可以。', '它多少钱？'],
      },
      answer: '当然可以。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It\'s the most expensive model in the shop." 的正确翻译是？',
        passage: 'The most expensive model',
        options: [
          '这个型号便宜一些。',
          '那对我来说太贵了。',
          '我非常喜欢那个。',
          '这是店里最贵的型号。',
        ],
      },
      answer: '这是店里最贵的型号。',
      score: 10,
    },
  ],

  // Lesson 112: Lesson 112: 形容词最高级复习 (Level 3)
  112: [
    {
      type: 'listening',
      content: {
        question: '听录音，"cheapest" 的意思是？',
        audioText: 'cheapest',
        options: ['便宜的', '足够的', '可能', '最便宜的'],
      },
      answer: '最便宜的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"worst" 的意思是？',
        audioText: 'worst',
        options: ['错误', '最低的', '电话', '最坏的'],
      },
      answer: '最坏的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"best" 的意思是？',
        audioText: 'best',
        options: ['最低的', '最好的', '百万', '比较'],
      },
      answer: '最好的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'This is the cheapest car in the shop.',
        translation: '这是店里最便宜的车。',
      },
      answer: 'This is the cheapest car in the shop.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'This is the worst film I have ever seen.',
        translation: '这是我看过的最差的电影。',
      },
      answer: 'This is the worst film I have ever seen.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈləʊɪst/',
        meaning: '最低的',
        example: 'The lowest price.',
      },
      answer: 'lowest',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈtʃiːpɪst/',
        meaning: '最便宜的',
        example: 'The cheapest one.',
      },
      answer: 'cheapest',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This is the ______ price in the market.',
        translation: '这是市场上最低的价格。',
        options: ['lowest', 'Worst', 'Cheapest', 'Best'],
      },
      answer: 'lowest',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This is the ______ car in the shop.',
        translation: '这是店里最便宜的车。',
        options: ['cheapest', 'Lowest', 'Worst', 'Best'],
      },
      answer: 'cheapest',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'This is the ______ book in the shop.',
        translation: '这是店里最好的书。',
        options: ['Lowest', 'Cheapest', 'Highest', 'best'],
      },
      answer: 'best',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Which book do you want?" 的正确翻译是？',
        passage: 'Superlative adjectives',
        options: [
          '我想要最好的那本。',
          '我觉得这部最好。',
          '你想要哪本书？',
          '你更喜欢哪件连衣裙？',
        ],
      },
      answer: '你想要哪本书？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Which car do you like?" 的正确翻译是？',
        passage: 'Superlative adjectives',
        options: [
          '你喜欢哪辆车？',
          '你觉得哪部电影最好？',
          '我更喜欢最贵的那件。',
          '你想要哪本书？',
        ],
      },
      answer: '你喜欢哪辆车？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"cheaper" 的意思是？',
        audioText: 'cheaper',
        options: ['软的', '更小的', '比较', '更便宜的'],
      },
      answer: '更便宜的',
      score: 10,
    },
  ],

  // Lesson 113: Lesson 113: Small change 零钱 (Level 3)
  113: [
    {
      type: 'listening',
      content: {
        question: '听录音，"note" 的意思是？',
        audioText: 'note',
        options: ['时刻', '愚蠢的', '纸币', '携带，搬运'],
      },
      answer: '纸币',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"penny" 的意思是？',
        audioText: 'penny',
        options: ['百万富翁', '硬的，困难的', '便士', '时刻'],
      },
      answer: '便士',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"coin" 的意思是？',
        audioText: 'coin',
        options: ['也不', '硬币', '打电话', '高的'],
      },
      answer: '硬币',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I'm afraid I can't.",
        translation: '恐怕我不能。',
      },
      answer: "I'm afraid I can't.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I haven't got any either.",
        translation: '我也没有。',
      },
      answer: "I haven't got any either.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Can you change this ten-pound note?',
        translation: '你能换开这张十英镑的纸币吗？',
      },
      answer: 'Can you change this ten-pound note?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈpeni/',
        meaning: '便士',
        example: 'One penny.',
      },
      answer: 'penny',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/səʊ/',
        meaning: '也',
        example: 'So do I.',
      },
      answer: 'so',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ can I.',
        translation: '我也不能。',
        options: ['Neither', 'So', 'Note', 'Penny'],
      },
      answer: 'Neither',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Can you ______ this ten-pound note?',
        translation: '你能换开这张十英镑的纸币吗？',
        options: ['So', 'Penny', 'change', 'Except'],
      },
      answer: 'change',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"That will be ten pence, please." 的正确翻译是？',
        passage: 'Small change',
        options: ['请付十便士。', '我也不能。', '我也是。', '请买票！'],
      },
      answer: '请付十便士。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I\'m sorry, I haven\'t got any small change." 的正确翻译是？',
        passage: 'Small change',
        options: ['我也是。', '对不起，我没有零钱。', '我口袋里什么都没有。', '请买票！'],
      },
      answer: '对不起，我没有零钱。',
      score: 10,
    },
  ],

  // Lesson 114: Lesson 114: So 和 Neither 复习 (Level 3)
  114: [
    {
      type: 'listening',
      content: {
        question: '听录音，"either" 的意思是？',
        audioText: 'either',
        options: ['硬的，困难的', '也不', '应该', '型号，模型'],
      },
      answer: '也不',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"also" 的意思是？',
        audioText: 'also',
        options: ['不新鲜的', '也', '建议', '最高的'],
      },
      answer: '也',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"too" 的意思是？',
        audioText: 'too',
        options: ['也', '车费', '可以，可能', '一些（不可数）'],
      },
      answer: '也',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I am not tired.',
        translation: '我不累。',
      },
      answer: 'I am not tired.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I don't like tea.",
        translation: '我不喜欢茶。',
      },
      answer: "I don't like tea.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tuː/',
        meaning: '也',
        example: 'I do too.',
      },
      answer: 'too',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈaɪðə/',
        meaning: '也不',
        example: "I don't either.",
      },
      answer: 'either',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I can ______ English.',
        translation: '我会说英语。',
        options: ['Too', 'speak', 'Either', 'Also'],
      },
      answer: 'speak',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I can\'t speak French." 的正确翻译是？',
        passage: 'So and neither',
        options: ['我也会。', '我饿了。', '我不累。', '我不会说法语。'],
      },
      answer: '我不会说法语。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"So can I." 的正确翻译是？',
        passage: 'So and neither',
        options: ['我也会。', '我也不会。', '我不会说法语。', '我会说英语。'],
      },
      answer: '我也会。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"penny" 的意思是？',
        audioText: 'penny',
        options: ['便士', '百万', '建议', '大声的'],
      },
      answer: '便士',
      score: 10,
    },
  ],

  // Lesson 115: Lesson 115: Knock, knock! 敲敲门！ (Level 3)
  115: [
    {
      type: 'listening',
      content: {
        question: '听录音，"quiet" 的意思是？',
        audioText: 'quiet',
        options: ['安静的', '最高的', '敲', '建议'],
      },
      answer: '安静的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"knock" 的意思是？',
        audioText: 'knock',
        options: ['改正，正确的', '词典', '敲', '最坏的'],
      },
      answer: '敲',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"impossible" 的意思是？',
        audioText: 'impossible',
        options: ['不可能的', '打电话', '更小的', '最好的'],
      },
      answer: '不可能的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Come and have something to drink.',
        translation: '来喝点什么吧。',
      },
      answer: 'Come and have something to drink.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Look through the window.',
        translation: '透过窗户看看。',
      },
      answer: 'Look through the window.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "It's nice and warm out here.",
        translation: '外面这里又好又暖和。',
      },
      answer: "It's nice and warm out here.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/nɒb/',
        meaning: '门把手',
        example: 'Turn the knob.',
      },
      answer: 'knob',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/nɒk/',
        meaning: '敲',
        example: 'Knock on the door.',
      },
      answer: 'knock',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "Everything's very ______",
        translation: '一切都很安静。',
        options: ['Joke', 'Impossible', 'Knock', 'quiet'],
      },
      answer: 'quiet',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I'll ______ again, Helen.",
        translation: '我再敲一次，海伦。',
        options: ['Impossible', 'knock', 'Joke', 'Invite'],
      },
      answer: 'knock',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "But that's ______",
        translation: '但那是不可能的。',
        options: ['Joke', 'Invite', 'impossible', 'Quiet'],
      },
      answer: 'impossible',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Can you see anything?" 的正确翻译是？',
        passage: 'Knock, knock!',
        options: [
          '透过窗户看看。',
          '大家都想在花园里吃午饭。',
          '你能看见什么吗？',
          '卡罗尔和汤姆邀请我们吃午饭。',
        ],
      },
      answer: '你能看见什么吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It\'s nice and warm out here." 的正确翻译是？',
        passage: 'Knock, knock!',
        options: ['来喝点什么吧。', '但那是不可能的。', '外面这里又好又暖和。', '什么也看不见。'],
      },
      answer: '外面这里又好又暖和。',
      score: 10,
    },
  ],

  // Lesson 116: Lesson 116: 现在完成时复习 (Level 3)
  116: [
    {
      type: 'listening',
      content: {
        question: '听录音，"ever" 的意思是？',
        audioText: 'ever',
        options: ['恐怕，害怕', '曾经', '价格', '最好的'],
      },
      answer: '曾经',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"have" 的意思是？',
        audioText: 'have',
        options: ['更长的', '有（助动词）', '最便宜的', '刚刚'],
      },
      answer: '有（助动词）',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"never" 的意思是？',
        audioText: 'never',
        options: ['分期付款', '从未', '曾经', '售票员'],
      },
      answer: '从未',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have you finished yet?',
        translation: '你完成了吗？',
      },
      answer: 'Have you finished yet?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Have you ever been to Paris?',
        translation: '你去过巴黎吗？',
      },
      answer: 'Have you ever been to Paris?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɔːlˈredi/',
        meaning: '已经',
        example: 'I have already done.',
      },
      answer: 'already',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈnevə/',
        meaning: '从未',
        example: 'I have never been.',
      },
      answer: 'never',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ you ever been to Paris?',
        translation: '你去过巴黎吗？',
        options: ['Yet', 'Ever', 'Has', 'Have'],
      },
      answer: 'Have',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I ______ already done it.',
        translation: '我已经做了。',
        options: ['have', 'Ever', 'Never', 'Yet'],
      },
      answer: 'have',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, I ______ never been there.',
        translation: '不，我从未去过那里。',
        options: ['Never', 'have', 'Yet', 'Has'],
      },
      answer: 'have',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Yes, he has already gone." 的正确翻译是？',
        passage: 'Present perfect tense',
        options: ['是的，他已经去了。', '他们到了吗？', '他去伦敦了吗？', '不，我从未去过那里。'],
      },
      answer: '是的，他已经去了。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Have you ever been to Paris?" 的正确翻译是？',
        passage: 'Present perfect tense',
        options: ['不，他们还没到。', '是的，他已经去了。', '你去过巴黎吗？', '你完成作业了吗？'],
      },
      answer: '你去过巴黎吗？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"worst" 的意思是？',
        audioText: 'worst',
        options: ['最坏的', '代替', '最好的', '型号，模型'],
      },
      answer: '最坏的',
      score: 10,
    },
  ],

  // Lesson 117: Lesson 117: Tommy's breakfast 汤米的早餐 (Level 3)
  117: [
    {
      type: 'listening',
      content: {
        question: '听录音，"toilet" 的意思是？',
        audioText: 'toilet',
        options: ['餐厅', '透过……看', '厕所', '最坏的'],
      },
      answer: '厕所',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"coin" 的意思是？',
        audioText: 'coin',
        options: ['故事', '更小的', '纸币', '硬币'],
      },
      answer: '硬币',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"mouth" 的意思是？',
        audioText: 'mouth',
        options: ['嘴', '百万', '不可能的', '更好的'],
      },
      answer: '嘴',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He put them both into his mouth.',
        translation: '他把它们都放进了嘴里。',
      },
      answer: 'He put them both into his mouth.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Later that morning, when I was washing the clothes...',
        translation: '那天早上晚些时候，当我在洗衣服时……',
      },
      answer: 'Later that morning, when I was washing the clothes...',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'When my husband was going into the dining room this morning...',
        translation: '当我丈夫今天早上走进餐厅时……',
      },
      answer: 'When my husband was going into the dining room this morning...',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/kɔɪn/',
        meaning: '硬币',
        example: 'A gold coin.',
      },
      answer: 'coin',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈtɔɪlɪt/',
        meaning: '厕所',
        example: 'Go to the toilet.',
      },
      answer: 'toilet',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '...our little boy, Tommy, ______ two small coins on the floor.',
        translation: '……我们的小男孩，汤米，在地上发现了两枚小硬币。',
        options: ['Toilet', 'Later', 'found', 'Coin'],
      },
      answer: 'found',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '...I found two coins in ______ trousers pocket.',
        translation: '……我在汤米的裤子口袋里发现了两枚硬币。',
        options: ['Tommys', 'Coin', 'Story', 'Swallow'],
      },
      answer: 'Tommys',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'We both ______ to get the coins, but it was too late.',
        translation: '我们都试图拿到硬币，但太晚了。',
        options: ['tried', 'Toilet', 'Mouth', 'Story'],
      },
      answer: 'tried',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"We looked for them, but we could not find them all." 的正确翻译是？',
        passage: "Tommy's breakfast",
        options: [
          '我们都试图拿到硬币，但太晚了。',
          '当我丈夫今天早上走进餐厅时，他把一些硬币掉在了地上。',
          '我们找它们，但没能全部找到。',
          '汤米已经把它们吞下去了！',
        ],
      },
      answer: '我们找它们，但没能全部找到。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question:
          '"Later that morning, when I was washing the clothes, I found two coins in Tommy\'s trousers pocket." 的正确翻译是？',
        passage: "Tommy's breakfast",
        options: [
          '汤米已经把它们吞下去了！',
          '那天早上晚些时候，当我在洗衣服时，我在汤米的裤子口袋里发现了两枚硬币。',
          '我们都试图拿到硬币，但太晚了。',
          '当我丈夫今天早上走进餐厅时，他把一些硬币掉在了地上。',
        ],
      },
      answer: '那天早上晚些时候，当我在洗衣服时，我在汤米的裤子口袋里发现了两枚硬币。',
      score: 10,
    },
  ],

  // Lesson 118: Lesson 118: 过去进行时复习 (Level 3)
  118: [
    {
      type: 'listening',
      content: {
        question: '听录音，"was" 的意思是？',
        audioText: 'was',
        options: ['邀请', '最好的', '是（过去式）', '押金'],
      },
      answer: '是（过去式）',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"while" 的意思是？',
        audioText: 'while',
        options: ['最好的', '当……时候', '是（过去式）', '可以，可能'],
      },
      answer: '当……时候',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"were" 的意思是？',
        audioText: 'were',
        options: ['是（过去式）', '代替', '除……之外', '售票员'],
      },
      answer: '是（过去式）',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'While I was walking, I saw an old friend.',
        translation: '我走路时看见了一位老朋友。',
      },
      answer: 'While I was walking, I saw an old friend.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They were playing football when it started to rain.',
        translation: '他们踢足球时开始下雨了。',
      },
      answer: 'They were playing football when it started to rain.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/waɪl/',
        meaning: '当……时候',
        example: 'While I was reading.',
      },
      answer: 'while',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wen/',
        meaning: '当……时候',
        example: 'When I came.',
      },
      answer: 'when',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ cooking while he was reading.',
        translation: '她在做饭时他在读书。',
        options: ['While', 'was', 'When', 'Were'],
      },
      answer: 'was',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ I was walking, I saw an old friend.',
        translation: '我走路时看见了一位老朋友。',
        options: ['Were', 'Was', 'While', 'When'],
      },
      answer: 'While',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They were playing football ______ it started to rain.',
        translation: '他们踢足球时开始下雨了。',
        options: ['when', 'Was', 'Were', 'While'],
      },
      answer: 'when',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What were you doing while she was reading?" 的正确翻译是？',
        passage: 'Past continuous tense',
        options: [
          '她在读书时你在做什么？',
          '昨晚八点你在做什么？',
          '我在看电视。',
          '他们在踢足球。',
        ],
      },
      answer: '她在读书时你在做什么？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What were they doing when it started to rain?" 的正确翻译是？',
        passage: 'Past continuous tense',
        options: [
          '我在看电视。',
          '开始下雨时他们在做什么？',
          '你到达时她在做什么？',
          '她在做晚饭。',
        ],
      },
      answer: '开始下雨时他们在做什么？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"already" 的意思是？',
        audioText: 'already',
        options: ['更大的', '更长的', '一些（可数）', '已经'],
      },
      answer: '已经',
      score: 10,
    },
  ],

  // Lesson 119: Lesson 119: A true story 一个真实的故事 (Level 3)
  119: [
    {
      type: 'listening',
      content: {
        question: '听录音，"torch" 的意思是？',
        audioText: 'torch',
        options: ['可以，可能', '纸币', '邀请', '手电筒'],
      },
      answer: '手电筒',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"parrot" 的意思是？',
        audioText: 'parrot',
        options: ['百万富翁', '吞下', '声音', '鹦鹉'],
      },
      answer: '鹦鹉',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"happen" 的意思是？',
        audioText: 'happen',
        options: ['发生', '硬币', '便士', '后来'],
      },
      answer: '发生',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Do you like stories?',
        translation: '你喜欢故事吗？',
      },
      answer: 'Do you like stories?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: '...a thief tried to steal his car.',
        translation: '……一个小偷试图偷他的车。',
      },
      answer: '...a thief tried to steal his car.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The thief could not start it again.',
        translation: '小偷无法再次启动它。',
      },
      answer: 'The thief could not start it again.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/θiːf/',
        meaning: '小偷',
        example: 'A thief stole it.',
      },
      answer: 'thief',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/tɔːtʃ/',
        meaning: '手电筒',
        example: 'Shine a torch.',
      },
      answer: 'torch',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I want to tell you a true ______',
        translation: '我想给你讲一个真实的故事。',
        options: ['Happen', 'Dark', 'Thief', 'story'],
      },
      answer: 'story',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The ______ could not start it again.',
        translation: '小偷无法再次启动它。',
        options: ['Voice', 'Happen', 'Parrot', 'thief'],
      },
      answer: 'thief',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The ______ had to get out of the car.',
        translation: '小偷不得不下车。',
        options: ['Dark', 'thief', 'Happen', 'Voice'],
      },
      answer: 'thief',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It happened to a friend of mine a year ago." 的正确翻译是？',
        passage: 'A true story',
        options: [
          '狗坐在后座上。',
          '小偷无法再次启动它。',
          '车很快就停了。',
          '这是一年前发生在我一个朋友身上的事。',
        ],
      },
      answer: '这是一年前发生在我一个朋友身上的事。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"My friend had left the keys in the car." 的正确翻译是？',
        passage: 'A true story',
        options: [
          '但他没开多远。',
          '小偷无法再次启动它。',
          '车很快就停了。',
          '我朋友把钥匙留在了车里。',
        ],
      },
      answer: '我朋友把钥匙留在了车里。',
      score: 10,
    },
  ],

  // Lesson 120: Lesson 120: 过去进行时复习 (Level 3)
  120: [
    {
      type: 'listening',
      content: {
        question: '听录音，"fly" 的意思是？',
        audioText: 'fly',
        options: ['型号', '飞', '可以，可能', '后来'],
      },
      answer: '飞',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"ride" 的意思是？',
        audioText: 'ride',
        options: ['过去常常', '骑', '门把手', '进入'],
      },
      answer: '骑',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"walk" 的意思是？',
        audioText: 'walk',
        options: ['当……时候', '走', '分期付款', '敲'],
      },
      answer: '走',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I used to live in London.',
        translation: '我过去住在伦敦。',
      },
      answer: 'I used to live in London.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "He used to smoke, but he doesn't now.",
        translation: '他过去抽烟，但现在不抽了。',
      },
      answer: "He used to smoke, but he doesn't now.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/raɪd/',
        meaning: '骑',
        example: 'Ride a bike.',
      },
      answer: 'ride',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/flaɪ/',
        meaning: '飞',
        example: 'Fly a plane.',
      },
      answer: 'fly',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I was ______ a book.',
        translation: '我在读书。',
        options: ['Fly', 'Walk', 'Drive', 'reading'],
      },
      answer: 'reading',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'While I was ______ the phone rang.',
        translation: '我在做饭时，电话响了。',
        options: ['Drive', 'Fly', 'cooking', 'Ride'],
      },
      answer: 'cooking',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What were you doing ______ I called?',
        translation: '我打电话时你在做什么？',
        options: ['when', 'Drive', 'Ride', 'Walk'],
      },
      answer: 'when',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What were you doing when I called?" 的正确翻译是？',
        passage: 'Past continuous review',
        options: [
          '我在读书。',
          '你过去住在伦敦吗？',
          '我打电话时你在做什么？',
          '是的，我过去住在那里。',
        ],
      },
      answer: '我打电话时你在做什么？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Did she use to have long hair?" 的正确翻译是？',
        passage: 'Past continuous review',
        options: [
          '你过去住在伦敦吗？',
          '她过去留长发吗？',
          '我打电话时你在做什么？',
          '你到达时他在做什么？',
        ],
      },
      answer: '她过去留长发吗？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"knock" 的意思是？',
        audioText: 'knock',
        options: ['餐厅', '后来', '敲', '笑话'],
      },
      answer: '敲',
      score: 10,
    },
  ],

  // Lesson 121: Lesson 121: The man in the hat 戴帽子的男人 (Level 4)
  121: [
    {
      type: 'listening',
      content: {
        question: '听录音，"forget" 的意思是？',
        audioText: 'forget',
        options: ['押金', '忘记', '认出', '骑'],
      },
      answer: '忘记',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"recognize" 的意思是？',
        audioText: 'recognize',
        options: ['最高的', '纸币', '认出', '后来'],
      },
      answer: '认出',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"customer" 的意思是？',
        audioText: 'customer',
        options: ['车费', '顾客', '百万富翁', '手电筒'],
      },
      answer: '顾客',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Which books did you buy?',
        translation: '您买了哪些书？',
      },
      answer: 'Which books did you buy?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The lady who is standing behind the counter.',
        translation: '站在柜台后面的那位女士。',
      },
      answer: 'The lady who is standing behind the counter.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Who served you, sir?',
        translation: '先生，谁为您服务的？',
      },
      answer: 'Who served you, sir?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈmænɪdʒə/',
        meaning: '经理',
        example: 'The manager said.',
      },
      answer: 'manager',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/sɜːv/',
        meaning: '服务',
        example: 'He served me.',
      },
      answer: 'serve',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkʌstəmə/',
        meaning: '顾客',
        example: 'A customer came in.',
      },
      answer: 'customer',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The lady who is standing behind the ______',
        translation: '站在柜台后面的那位女士。',
        options: ['Serve', 'counter', 'Forget', 'Customer'],
      },
      answer: 'counter',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The books which are on the ______',
        translation: '柜台上的那些书。',
        options: ['Customer', 'Serve', 'Recognize', 'counter'],
      },
      answer: 'counter',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Did you ______ this gentleman half an hour ago?',
        translation: '半小时前您为这位先生服务过吗？',
        options: ['Counter', 'Manager', 'Forget', 'serve'],
      },
      answer: 'serve',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He says he\'s the man who bought these books." 的正确翻译是？',
        passage: 'The man in the hat',
        options: [
          '站在柜台后面的那位女士。',
          '是的，就是那个人。',
          '他说他就是买这些书的那个人。',
          '先生，谁为您服务的？',
        ],
      },
      answer: '他说他就是买这些书的那个人。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Is this the man that you served?" 的正确翻译是？',
        passage: 'The man in the hat',
        options: [
          '站在柜台后面的那位女士。',
          '这就是您服务的那个人吗？',
          '但我忘记带走它们了。',
          '是的，就是那个人。',
        ],
      },
      answer: '这就是您服务的那个人吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Who served you, sir?" 的正确翻译是？',
        passage: 'The man in the hat',
        options: [
          '先生，谁为您服务的？',
          '半小时前我在这里买了两本昂贵的词典。',
          '我服务的那个人戴着一顶帽子。',
          '我不记得了。',
        ],
      },
      answer: '先生，谁为您服务的？',
      score: 10,
    },
  ],

  // Lesson 122: Lesson 122: Who whom and that 关系从句复习 (Level 4)
  122: [
    {
      type: 'listening',
      content: {
        question: '听录音，"who" 的意思是？',
        audioText: 'who',
        options: ['最低的', '门把手', '从未', '谁（主格）'],
      },
      answer: '谁（主格）',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"which" 的意思是？',
        audioText: 'which',
        options: ['哪个', '厕所', '最便宜的', '售票员'],
      },
      answer: '哪个',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"that" 的意思是？',
        audioText: 'that',
        options: ['那个', '嘴', '不可能的', '餐厅'],
      },
      answer: '那个',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"whom" 的意思是？',
        audioText: 'whom',
        options: ['哪个', '最高的', '当……时候', '谁（宾格）'],
      },
      answer: '谁（宾格）',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The man who is standing there is my brother.',
        translation: '站在那里的那个人是我哥哥。',
      },
      answer: 'The man who is standing there is my brother.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The man that is wearing a hat is my uncle.',
        translation: '戴着帽子的那个人是我叔叔。',
      },
      answer: 'The man that is wearing a hat is my uncle.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ðæt/',
        meaning: '那个',
        example: 'The man that is tall.',
      },
      answer: 'that',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/huːm/',
        meaning: '谁（宾格）',
        example: 'The man whom I saw.',
      },
      answer: 'whom',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The man ______ is standing there is my brother.',
        translation: '站在那里的那个人是我哥哥。',
        options: ['That', 'Which', 'who', 'Whom'],
      },
      answer: 'who',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The man ______ I saw is a doctor.',
        translation: '我看到的那个人是个医生。',
        options: ['whom', 'Which', 'Who', 'That'],
      },
      answer: 'whom',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The book ______ is on the table is mine.',
        translation: '桌子上的那本书是我的。',
        options: ['Who', 'That', 'which', 'Whom'],
      },
      answer: 'which',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Which book did you buy?" 的正确翻译是？',
        passage: 'Who, whom and that',
        options: [
          '我买了柜台上那本书。',
          '你买了哪本书？',
          '他就是我跟你说过的那个人。',
          '站在那里的那个人是谁？',
        ],
      },
      answer: '你买了哪本书？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He is the man whom I told you about." 的正确翻译是？',
        passage: 'Who, whom and that',
        options: [
          '我买了柜台上那本书。',
          '他就是我跟你说过的那个人。',
          '你买了哪本书？',
          '站在那里的那个人是谁？',
        ],
      },
      answer: '他就是我跟你说过的那个人。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"later" 的意思是？',
        audioText: 'later',
        options: ['吞下', '门把手', '后来', '发生'],
      },
      answer: '后来',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"coin" 的意思是？',
        audioText: 'coin',
        options: ['最贵的', '安静的', '硬币', '餐厅'],
      },
      answer: '硬币',
      score: 10,
    },
  ],

  // Lesson 123: Lesson 123: A trip to Australia 澳大利亚之旅 (Level 4)
  123: [
    {
      type: 'listening',
      content: {
        question: '听录音，"abroad" 的意思是？',
        audioText: 'abroad',
        options: ['国外', '相册', '小偷', '门把手'],
      },
      answer: '国外',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"album" 的意思是？',
        audioText: 'album',
        options: ['发生', '相册', '走', '澳大利亚'],
      },
      answer: '相册',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"photo" 的意思是？',
        audioText: 'photo',
        options: ['照片', '骑', '柜台', '厕所'],
      },
      answer: '照片',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What a beautiful ship!',
        translation: '多漂亮的船啊！',
      },
      answer: 'What a beautiful ship!',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "Who's this?",
        translation: '这是谁？',
      },
      answer: "Who's this?",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Let me see it, Bill.',
        translation: '让我看看，比尔。',
      },
      answer: 'Let me see it, Bill.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈfəʊtəʊ/',
        meaning: '照片',
        example: 'Take a photo.',
      },
      answer: 'photo',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈælbəm/',
        meaning: '相册',
        example: 'Photo album.',
      },
      answer: 'album',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈdjʊərɪŋ/',
        meaning: '在……期间',
        example: 'During the holiday.',
      },
      answer: 'during',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ this?',
        translation: '这是谁？',
        options: ['Whos', 'Abroad', 'Photo', 'Trip'],
      },
      answer: 'Whos',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "That's the man I told you ______",
        translation: '那就是我跟你说过的那个人。',
        options: ['Australia', 'about', 'Abroad', 'Album'],
      },
      answer: 'about',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ the ship we travelled on.',
        translation: '那是我们乘坐的船。',
        options: ['Album', 'Travel', 'Thats', 'During'],
      },
      answer: 'Thats',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What a beautiful ship!" 的正确翻译是？',
        passage: 'A trip to Australia',
        options: [
          '看，鲍勃。这是我在澳大利亚旅行时拍的照片。',
          '这是一张好照片。这些人是谁？',
          '多漂亮的船啊！',
          '那就是我跟你说过的那个人。',
        ],
      },
      answer: '多漂亮的船啊！',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They\'re people I met during the trip." 的正确翻译是？',
        passage: 'A trip to Australia',
        options: [
          '这是谁？',
          '多漂亮的船啊！',
          '看，鲍勃。这是我在澳大利亚旅行时拍的照片。',
          '他们是我在旅行中遇到的人。',
        ],
      },
      answer: '他们是我在旅行中遇到的人。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"That\'s the ship we travelled on." 的正确翻译是？',
        passage: 'A trip to Australia',
        options: ['那是我们乘坐的船。', '这是谁？', '让我看看，比尔。', '多漂亮的船啊！'],
      },
      answer: '那是我们乘坐的船。',
      score: 10,
    },
  ],

  // Lesson 124: Lesson 124: 现在完成时复习 (Level 4)
  124: [
    {
      type: 'listening',
      content: {
        question: '听录音，"gone" 的意思是？',
        audioText: 'gone',
        options: ['国外', '手电筒', '去了', '后来'],
      },
      answer: '去了',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"been" 的意思是？',
        audioText: 'been',
        options: ['经理', '去过', '刚刚', '已经'],
      },
      answer: '去过',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Where has she gone?',
        translation: '她去哪儿了？',
      },
      answer: 'Where has she gone?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'No, I have never been there.',
        translation: '不，我从未去过那里。',
      },
      answer: 'No, I have never been there.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɡɒn/',
        meaning: '去了',
        example: 'He has gone to London.',
      },
      answer: 'gone',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/biːn/',
        meaning: '去过',
        example: 'I have been there.',
      },
      answer: 'been',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She has ______ to the library.',
        translation: '她去图书馆了。',
        options: ['Quiet', 'Yet', 'Ride', 'gone'],
      },
      answer: 'gone',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'No, I have never ______ there.',
        translation: '不，我从未去过那里。',
        options: ['Forget', 'Parrot', 'Thief', 'been'],
      },
      answer: 'been',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Where has she ______',
        translation: '她去哪儿了？',
        options: ['Swallow', 'gone', 'Have', 'Serve'],
      },
      answer: 'gone',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She has gone to the library." 的正确翻译是？',
        passage: 'Present perfect review',
        options: ['她去图书馆了。', '她去哪儿了？', '你去过日本吗？', '不，我从未去过那里。'],
      },
      answer: '她去图书馆了。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, I have never been there." 的正确翻译是？',
        passage: 'Present perfect review',
        options: ['他去伦敦了。', '约翰在哪里？', '不，我从未去过那里。', '她去哪儿了？'],
      },
      answer: '不，我从未去过那里。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"too" 的意思是？',
        audioText: 'too',
        options: ['不可能的', '后来', '也', '哪个'],
      },
      answer: '也',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"happen" 的意思是？',
        audioText: 'happen',
        options: ['发生', '厕所', '顾客', '谁（主格）'],
      },
      answer: '发生',
      score: 10,
    },
  ],

  // Lesson 125: Lesson 125: Tea for two 两人喝茶 (Level 4)
  125: [
    {
      type: 'listening',
      content: {
        question: '听录音，"terrible" 的意思是？',
        audioText: 'terrible',
        options: ['鹦鹉', '餐厅', '小偷', '可怕的，糟糕的'],
      },
      answer: '可怕的，糟糕的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"dry" 的意思是？',
        audioText: 'dry',
        options: ['笑话', '是（过去式）', '干燥的', '可怕的，糟糕的'],
      },
      answer: '干燥的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"mean" 的意思是？',
        audioText: 'mean',
        options: ['故事', '忘记', '意思是', '经理'],
      },
      answer: '意思是',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Do you want some?',
        translation: '你想要一些吗？',
      },
      answer: 'Do you want some?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I'll have some later.",
        translation: '我稍后再喝。',
      },
      answer: "I'll have some later.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'What will you be doing this time tomorrow?',
        translation: '明天这个时候你会在做什么？',
      },
      answer: 'What will you be doing this time tomorrow?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈwɔːtə/',
        meaning: '水',
        example: 'Boil some water.',
      },
      answer: 'water',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈterəbl/',
        meaning: '可怕的，糟糕的',
        example: 'Terrible weather.',
      },
      answer: 'terrible',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈnjuːsəns/',
        meaning: '讨厌的人或事',
        example: 'What a nuisance!',
      },
      answer: 'nuisance',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ be working.',
        translation: '我会在工作。',
        options: ['Ill', 'Dry', 'Water', 'Terrible'],
      },
      answer: 'Ill',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Do you want ______',
        translation: '你想要一些吗？',
        options: ['Water', 'some', 'Dry', 'Terrible'],
      },
      answer: 'some',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "Susan, I'm making some ______",
        translation: '苏珊，我在泡茶。',
        options: ['Water', 'Nuisance', 'Mean', 'tea'],
      },
      answer: 'tea',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, thank you, Kate." 的正确翻译是？',
        passage: 'Tea for two',
        options: ['苏珊，我在泡茶。', '不用了，谢谢你，凯特。', '我会在工作。', '我稍后再喝。'],
      },
      answer: '不用了，谢谢你，凯特。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"That\'s a good idea." 的正确翻译是？',
        passage: 'Tea for two',
        options: [
          '好主意。',
          '苏珊，我在泡茶。',
          '明天这个时候你会在做什么？',
          '不用了，谢谢你，凯特。',
        ],
      },
      answer: '好主意。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Susan, I\'m making some tea." 的正确翻译是？',
        passage: 'Tea for two',
        options: ['真讨厌！', '你想要一些吗？', '明天这个时候你会在做什么？', '苏珊，我在泡茶。'],
      },
      answer: '苏珊，我在泡茶。',
      score: 10,
    },
  ],

  // Lesson 126: Lesson 126: 将来进行时复习 (Level 4)
  126: [
    {
      type: 'listening',
      content: {
        question: '听录音，"will be" 的意思是？',
        audioText: 'will be',
        options: ['顾客', '将会', '谁（主格）', '发生'],
      },
      answer: '将会',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"shall be" 的意思是？',
        audioText: 'shall be',
        options: ['曾经', '餐厅', '照片', '将会'],
      },
      answer: '将会',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I will be travelling to London.',
        translation: '我会在去伦敦的路上。',
      },
      answer: 'I will be travelling to London.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I will be working this time tomorrow.',
        translation: '明天这个时候我会在工作。',
      },
      answer: 'I will be working this time tomorrow.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wɪl biː/',
        meaning: '将会',
        example: 'I will be doing.',
      },
      answer: 'will be',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ʃæl biː/',
        meaning: '将会',
        example: 'I shall be doing.',
      },
      answer: 'shall be',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "She will be ______ at 10 o'clock tonight.",
        translation: '今晚十点她会在睡觉。',
        options: ['sleeping', 'Which', 'Mouth', 'Later'],
      },
      answer: 'sleeping',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'What will you be ______ next week?',
        translation: '下周你会做什么？',
        options: ['doing', 'That', 'Ride', 'Recognize'],
      },
      answer: 'doing',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I will be travelling to ______',
        translation: '我会在去伦敦的路上。',
        options: ['Mean', 'Photo', 'Been', 'London'],
      },
      answer: 'London',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What will she be doing at 10 o\'clock?" 的正确翻译是？',
        passage: 'Future continuous',
        options: [
          '我会在工作。',
          '明天这个时候你会在做什么？',
          '他们会在吃晚饭。',
          '十点时她会在做什么？',
        ],
      },
      answer: '十点时她会在做什么？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She will be sleeping." 的正确翻译是？',
        passage: 'Future continuous',
        options: [
          '你到达时他们会在做什么？',
          '我会在工作。',
          '她会在睡觉。',
          '明天这个时候你会在做什么？',
        ],
      },
      answer: '她会在睡觉。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"forget" 的意思是？',
        audioText: 'forget',
        options: ['忘记', '骑', '飞', '故事'],
      },
      answer: '忘记',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"voice" 的意思是？',
        audioText: 'voice',
        options: ['谁（宾格）', '声音', '澳大利亚', '嘴'],
      },
      answer: '声音',
      score: 10,
    },
  ],

  // Lesson 127: Lesson 127: A famous actress 一位著名的女演员 (Level 4)
  127: [
    {
      type: 'listening',
      content: {
        question: '听录音，"read" 的意思是？',
        audioText: 'read',
        options: ['阅读', '小偷', '照片', '去了'],
      },
      answer: '阅读',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"actress" 的意思是？',
        audioText: 'actress',
        options: ['黑暗的', '鹦鹉', '女演员', '著名的'],
      },
      answer: '女演员',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"famous" 的意思是？',
        audioText: 'famous',
        options: ['故事', '干燥的', '是（过去式）', '著名的'],
      },
      answer: '著名的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'She was a famous actress when I was still at school.',
        translation: '当我还是学生时，她就是一位著名的女演员。',
      },
      answer: 'She was a famous actress when I was still at school.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Can you recognize that woman, Liz?',
        translation: '你能认出那个女人吗，莉兹？',
      },
      answer: 'Can you recognize that woman, Liz?',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I read in the newspaper that she is thirty-five.',
        translation: '我在报纸上读到她三十五岁了。',
      },
      answer: 'I read in the newspaper that she is thirty-five.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈfeɪməs/',
        meaning: '著名的',
        example: 'A famous actress.',
      },
      answer: 'famous',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈæktə/',
        meaning: '男演员',
        example: 'He is an actor.',
      },
      answer: 'actor',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/riːd/',
        meaning: '阅读',
        example: 'Read a newspaper.',
      },
      answer: 'read',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It must be Karen Marsh, the ______',
        translation: '那一定是卡伦·马什，那个女演员。',
        options: ['Famous', 'Actor', 'Newspaper', 'actress'],
      },
      answer: 'actress',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She was a ______ actress when I was still at school.',
        translation: '当我还是学生时，她就是一位著名的女演员。',
        options: ['famous', 'Newspaper', 'Read', 'Actress'],
      },
      answer: 'famous',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I read in the ______ that she is thirty-five.',
        translation: '我在报纸上读到她三十五岁了。',
        options: ['Actor', 'newspaper', 'Famous', 'Read'],
      },
      answer: 'newspaper',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Can you recognize that woman, Liz?" 的正确翻译是？',
        passage: 'A famous actress',
        options: [
          '我想我能，凯特。',
          '我也这么想。',
          '那是很久以前的事了，是吗？',
          '你能认出那个女人吗，莉兹？',
        ],
      },
      answer: '你能认出那个女人吗，莉兹？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She was a famous actress when I was still at school." 的正确翻译是？',
        passage: 'A famous actress',
        options: [
          '我在报纸上读到她三十五岁了。',
          '当我还是学生时，她就是一位著名的女演员。',
          '那一定是卡伦·马什，那个女演员。',
          '你能认出那个女人吗，莉兹？',
        ],
      },
      answer: '当我还是学生时，她就是一位著名的女演员。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"It must be Karen Marsh, the actress." 的正确翻译是？',
        passage: 'A famous actress',
        options: [
          '那是很久以前的事了，是吗？',
          '我想我能，凯特。',
          '我也这么想。',
          '那一定是卡伦·马什，那个女演员。',
        ],
      },
      answer: '那一定是卡伦·马什，那个女演员。',
      score: 10,
    },
  ],

  // Lesson 128: Lesson 128: 过去完成时复习 (Level 4)
  128: [
    {
      type: 'listening',
      content: {
        question: '听录音，"by" 的意思是？',
        audioText: 'by',
        options: ['著名的', '去了', '谁（宾格）', '在……之前'],
      },
      answer: '在……之前',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"had" 的意思是？',
        audioText: 'had',
        options: ['谁（主格）', '过去常常', '已经（过去完成时）', '鹦鹉'],
      },
      answer: '已经（过去完成时）',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"before" 的意思是？',
        audioText: 'before',
        options: ['将会', '小偷', '在……之前', '去过'],
      },
      answer: '在……之前',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'They had never seen snow before.',
        translation: '他们以前从未见过雪。',
      },
      answer: 'They had never seen snow before.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'She had already left when I arrived.',
        translation: '我到达时她已经离开了。',
      },
      answer: 'She had already left when I arrived.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/hæd/',
        meaning: '已经（过去完成时）',
        example: 'I had done.',
      },
      answer: 'had',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/baɪ/',
        meaning: '在……之前',
        example: 'By the time...',
      },
      answer: 'by',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'By the time I got there, he ______ gone.',
        translation: '我到那里时，他已经走了。',
        options: ['Counter', 'had', 'Trip', 'Thief'],
      },
      answer: 'had',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I ______ finished my homework before dinner.',
        translation: '晚饭前我已经完成了作业。',
        options: ['Actress', 'Serve', 'had', 'Mean'],
      },
      answer: 'had',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They ______ never seen snow before.',
        translation: '他们以前从未见过雪。',
        options: ['had', 'Was', 'Who', 'Serve'],
      },
      answer: 'had',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What had she done when you arrived?" 的正确翻译是？',
        passage: 'Past perfect tense',
        options: [
          '她已经离开了。',
          '晚饭前你做了什么？',
          '他们已经完成了工作。',
          '你到达时她做了什么？',
        ],
      },
      answer: '你到达时她做了什么？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I had finished my homework." 的正确翻译是？',
        passage: 'Past perfect tense',
        options: [
          '五点前他们做了什么？',
          '我已经完成了作业。',
          '晚饭前你做了什么？',
          '你到达时她做了什么？',
        ],
      },
      answer: '我已经完成了作业。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"who" 的意思是？',
        audioText: 'who',
        options: ['进入', '谁（主格）', '声音', '去过'],
      },
      answer: '谁（主格）',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"were" 的意思是？',
        audioText: 'were',
        options: ['是（过去式）', '小偷', '故事', '谁（宾格）'],
      },
      answer: '是（过去式）',
      score: 10,
    },
  ],

  // Lesson 129: Lesson 129: Seventy miles an hour 每小时七十英里 (Level 4)
  129: [
    {
      type: 'listening',
      content: {
        question: '听录音，"mile" 的意思是？',
        audioText: 'mile',
        options: ['英里', '干燥的', '柜台', '超过'],
      },
      answer: '英里',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"dream" 的意思是？',
        audioText: 'dream',
        options: ['梦', '走', '速度限制', '可怕的，糟糕的'],
      },
      answer: '梦',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"overtake" 的意思是？',
        audioText: 'overtake',
        options: ['在……期间', '超过', '可怕的，糟糕的', '女演员'],
      },
      answer: '超过',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "Didn't you see the speed limit?",
        translation: '你没看到限速标志吗？',
      },
      answer: "Didn't you see the speed limit?",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I must have been dreaming.',
        translation: '我一定是在做梦。',
      },
      answer: 'I must have been dreaming.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I was doing seventy.',
        translation: '我车速是七十。',
      },
      answer: 'I was doing seventy.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/maɪl/',
        meaning: '英里',
        example: '70 miles an hour.',
      },
      answer: 'mile',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˌəʊvəˈteɪk/',
        meaning: '超过',
        example: 'Overtake the car.',
      },
      answer: 'overtake',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/driːm/',
        meaning: '梦',
        example: 'Have a dream.',
      },
      answer: 'dream',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ you see the speed limit?',
        translation: '你没看到限速标志吗？',
        options: ['Overtake', 'Dream', 'Didnt', 'Charge'],
      },
      answer: 'Didnt',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I was ______ eighty when I overtook you.',
        translation: '我超过你时车速是八十。',
        options: ['doing', 'Dream', 'Charge', 'Overtake'],
      },
      answer: 'doing',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I'm afraid I've been ______",
        translation: '恐怕我超速了。',
        options: ['Dream', 'Mile', 'Charge', 'speeding'],
      },
      answer: 'speeding',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I must have been dreaming." 的正确翻译是？',
        passage: 'Seventy miles an hour',
        options: ['我一定是在做梦。', '他想让你停下来。', '恐怕我超速了。', '我车速是七十。'],
      },
      answer: '我一定是在做梦。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Didn\'t you see the speed limit?" 的正确翻译是？',
        passage: 'Seventy miles an hour',
        options: ['他想让你停下来。', '你没看到限速标志吗？', '恐怕我超速了。', '我车速是七十。'],
      },
      answer: '你没看到限速标志吗？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I\'m afraid I\'ve been speeding." 的正确翻译是？',
        passage: 'Seventy miles an hour',
        options: [
          '看，加里！那个警察在向你招手。',
          '你没看到限速标志吗？',
          '我超过你时车速是八十。',
          '恐怕我超速了。',
        ],
      },
      answer: '恐怕我超速了。',
      score: 10,
    },
  ],

  // Lesson 130: Lesson 130: 现在时表将来复习 (Level 4)
  130: [
    {
      type: 'listening',
      content: {
        question: '听录音，"must be" 的意思是？',
        audioText: 'must be',
        options: ['去了', '报纸', '一定是', '旅行'],
      },
      answer: '一定是',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"can\'t be" 的意思是？',
        audioText: "can't be",
        options: ['哪个', '不可能是', '服务', '一定是'],
      },
      answer: '不可能是',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"must have" 的意思是？',
        audioText: 'must have',
        options: ['去了', '一定已经', '讨厌的人或事', '照片'],
      },
      answer: '一定已经',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "She can't be in the office.",
        translation: '她不可能在办公室。',
      },
      answer: "She can't be in the office.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He must be at home now.',
        translation: '他现在一定在家。',
      },
      answer: 'He must be at home now.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/kɑːnt biː/',
        meaning: '不可能是',
        example: "He can't be there.",
      },
      answer: "can't be",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/mʌst hæv/',
        meaning: '一定已经',
        example: 'He must have done it.',
      },
      answer: 'must have',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He ______ have finished the work.',
        translation: '他一定已经完成了工作。',
        options: ['Actor', 'Fly', 'Travel', 'must'],
      },
      answer: 'must',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He must be at home ______',
        translation: '他现在一定在家。',
        options: ['now', 'Read', 'Been', 'Serve'],
      },
      answer: 'now',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I am ______ tomorrow.',
        translation: '我明天离开。',
        options: ['That', 'leaving', 'Gone', 'Manager'],
      },
      answer: 'leaving',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He must be at home." 的正确翻译是？',
        passage: 'Present for future',
        options: ['他一定在家。', '他现在在哪里？', '她在哪里？', '我明天离开。'],
      },
      answer: '他一定在家。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She can\'t be in the office." 的正确翻译是？',
        passage: 'Present for future',
        options: ['我明天离开。', '他现在在哪里？', '她不可能在办公室。', '她在哪里？'],
      },
      answer: '她不可能在办公室。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"fly" 的意思是？',
        audioText: 'fly',
        options: ['走', '超过', '飞', '可怕的，糟糕的'],
      },
      answer: '飞',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"mean" 的意思是？',
        audioText: 'mean',
        options: ['过去常常', '照片', '走', '意思是'],
      },
      answer: '意思是',
      score: 10,
    },
  ],

  // Lesson 131: Lesson 131: Don't be so sure! 别那么肯定！ (Level 4)
  131: [
    {
      type: 'listening',
      content: {
        question: '听录音，"abroad" 的意思是？',
        audioText: 'abroad',
        options: ['取决于', '国外', '在……之前', '忘记'],
      },
      answer: '国外',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"stay" 的意思是？',
        audioText: 'stay',
        options: ['假期', '停留', '去了', '水'],
      },
      answer: '停留',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"lucky" 的意思是？',
        audioText: 'lucky',
        options: ['幸运的', '在……之前', '女演员', '阅读'],
      },
      answer: '幸运的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'We may travel by sea.',
        translation: '我们可能坐船旅行。',
      },
      answer: 'We may travel by sea.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'We may go abroad.',
        translation: '我们可能出国。',
      },
      answer: 'We may go abroad.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Where are you going to spend your holidays this year, Roy?',
        translation: '今年你打算去哪里度假，罗伊？',
      },
      answer: 'Where are you going to spend your holidays this year, Roy?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/əˈbrɔːd/',
        meaning: '国外',
        example: 'Go abroad.',
      },
      answer: 'abroad',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/dɪˈpend/',
        meaning: '取决于',
        example: 'It depends.',
      },
      answer: 'depend',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈlʌki/',
        meaning: '幸运的',
        example: 'You are lucky.',
      },
      answer: 'lucky',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ be so sure!',
        translation: '别那么肯定！',
        options: ['Depend', 'Dont', 'Lucky', 'Abroad'],
      },
      answer: 'Dont',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Where are you going to spend your holidays this year, ______',
        translation: '今年你打算去哪里度假，罗伊？',
        options: ['Abroad', 'Roy', 'Depend', 'Lucky'],
      },
      answer: 'Roy',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'We may go ______',
        translation: '我们可能出国。',
        options: ['Stay', 'Lucky', 'Depend', 'abroad'],
      },
      answer: 'abroad',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I\'m not sure." 的正确翻译是？',
        passage: "Don't be so sure!",
        options: ['我不确定。', '我妻子想去埃及。', '我们可能坐船旅行。', '我们可能出国。'],
      },
      answer: '我不确定。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Don\'t be so sure!" 的正确翻译是？',
        passage: "Don't be so sure!",
        options: [
          '今年你打算去哪里度假，罗伊？',
          '我妻子想去埃及。',
          '别那么肯定！',
          '我们可能出国。',
        ],
      },
      answer: '别那么肯定！',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"My wife wants to go to Egypt." 的正确翻译是？',
        passage: "Don't be so sure!",
        options: [
          '我们可能坐船旅行。',
          '我妻子想去埃及。',
          '今年你打算去哪里度假，罗伊？',
          '我不确定。',
        ],
      },
      answer: '我妻子想去埃及。',
      score: 10,
    },
  ],

  // Lesson 132: Lesson 132: 将来时复习 (Level 4)
  132: [
    {
      type: 'listening',
      content: {
        question: '听录音，"might" 的意思是？',
        audioText: 'might',
        options: ['照片', '可能', '谁（宾格）', '男演员'],
      },
      answer: '可能',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"may" 的意思是？',
        audioText: 'may',
        options: ['国外', '可能', '哪个', '将会'],
      },
      answer: '可能',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"will" 的意思是？',
        audioText: 'will',
        options: ['可怕的，糟糕的', '英里', '将', '梦'],
      },
      answer: '将',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He may come tomorrow.',
        translation: '他明天可能来。',
      },
      answer: 'He may come tomorrow.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'She might be at home.',
        translation: '她可能在家。',
      },
      answer: 'She might be at home.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/maɪt/',
        meaning: '可能',
        example: 'He might come.',
      },
      answer: 'might',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/meɪ/',
        meaning: '可能',
        example: 'He may come.',
      },
      answer: 'may',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They ______ arrive next week.',
        translation: '他们下周会到达。',
        options: ['Before', 'Travel', 'Overtake', 'will'],
      },
      answer: 'will',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He ______ come tomorrow.',
        translation: '他明天可能来。',
        options: ['Which', 'By', 'Water', 'may'],
      },
      answer: 'may',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ be at home.',
        translation: '她可能在家。',
        options: ['might', 'Lucky', 'Actor', 'Been'],
      },
      answer: 'might',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Where is she?" 的正确翻译是？',
        passage: 'Future tense review',
        options: ['他什么时候来？', '他们什么时候到达？', '他们下周会到达。', '她在哪里？'],
      },
      answer: '她在哪里？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"When will they arrive?" 的正确翻译是？',
        passage: 'Future tense review',
        options: ['他明天可能来。', '她可能在家。', '她在哪里？', '他们什么时候到达？'],
      },
      answer: '他们什么时候到达？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"gone" 的意思是？',
        audioText: 'gone',
        options: ['去了', '报纸', '旅行', '谁（宾格）'],
      },
      answer: '去了',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"depend" 的意思是？',
        audioText: 'depend',
        options: ['停留', '国外', '取决于', '去过'],
      },
      answer: '取决于',
      score: 10,
    },
  ],

  // Lesson 133: Lesson 133: Sensational news! 轰动的新闻！ (Level 4)
  133: [
    {
      type: 'listening',
      content: {
        question: '听录音，"reporter" 的意思是？',
        audioText: 'reporter',
        options: ['记者', '澳大利亚', '讨厌的人或事', '相册'],
      },
      answer: '记者',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"retire" 的意思是？',
        audioText: 'retire',
        options: ['照片', '退休', '男演员', '不可能是'],
      },
      answer: '退休',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"sensational" 的意思是？',
        audioText: 'sensational',
        options: ['停留', '国外', '英里', '轰动的'],
      },
      answer: '轰动的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I can't make any more films.",
        translation: '我不能再拍电影了。',
      },
      answer: "I can't make any more films.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'She said she felt very tired.',
        translation: '她说她觉得很累。',
      },
      answer: 'She said she felt very tired.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Are you going to make another?',
        translation: '您打算再拍一部吗？',
      },
      answer: 'Are you going to make another?',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/senˈseɪʃənl/',
        meaning: '轰动的',
        example: 'Sensational news!',
      },
      answer: 'sensational',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈɪntəvjuː/',
        meaning: '采访',
        example: 'Give an interview.',
      },
      answer: 'interview',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/rɪˈtaɪə/',
        meaning: '退休',
        example: 'She is going to retire.',
      },
      answer: 'retire',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ she was not going to make any more films.',
        translation: '她说她不打算再拍电影了。',
        options: ['Retire', 'said', 'Sensational', 'Interview'],
      },
      answer: 'said',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Yes, I ______',
        translation: '是的，我拍完了。',
        options: ['have', 'Retire', 'Interview', 'Sensational'],
      },
      answer: 'have',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I ______ very tired.',
        translation: '我觉得很累。',
        options: ['Sensational', 'Interview', 'Retire', 'feel'],
      },
      answer: 'feel',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"No, I\'m not. I\'m going to retire." 的正确翻译是？',
        passage: 'Sensational news!',
        options: [
          '不，我不打算了。我打算退休。',
          '我不能再拍电影了。',
          '我觉得很累。',
          '她说她觉得很累。',
        ],
      },
      answer: '不，我不打算了。我打算退休。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Have you just made a new film, Miss Marsh?" 的正确翻译是？',
        passage: 'Sensational news!',
        options: [
          '我觉得很累。',
          '您打算再拍一部吗？',
          '您刚拍完一部新电影吗，马什小姐？',
          '她说她不打算再拍电影了。',
        ],
      },
      answer: '您刚拍完一部新电影吗，马什小姐？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I feel very tired." 的正确翻译是？',
        passage: 'Sensational news!',
        options: [
          '您刚拍完一部新电影吗，马什小姐？',
          '是的，我拍完了。',
          '您打算再拍一部吗？',
          '我觉得很累。',
        ],
      },
      answer: '我觉得很累。',
      score: 10,
    },
  ],

  // Lesson 134: Lesson 134: 间接引语复习 (Level 4)
  134: [
    {
      type: 'listening',
      content: {
        question: '听录音，"said" 的意思是？',
        audioText: 'said',
        options: ['告诉（过去式）', '说（过去式）', '水', '一定是'],
      },
      answer: '说（过去式）',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"asked" 的意思是？',
        audioText: 'asked',
        options: ['问（过去式）', '一定已经', '取决于', '停留'],
      },
      answer: '问（过去式）',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"told" 的意思是？',
        audioText: 'told',
        options: ['女演员', '告诉（过去式）', '问（过去式）', '国外'],
      },
      answer: '告诉（过去式）',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He told me he could help.',
        translation: '他告诉我他能帮忙。',
      },
      answer: 'He told me he could help.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'She told me she would come.',
        translation: '她告诉我她会来。',
      },
      answer: 'She told me she would come.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɑːskt/',
        meaning: '问（过去式）',
        example: 'He asked if...',
      },
      answer: 'asked',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/təʊld/',
        meaning: '告诉（过去式）',
        example: 'He told me that...',
      },
      answer: 'told',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He ______ me he could help.',
        translation: '他告诉我他能帮忙。',
        options: ['Retire', 'told', 'Water', 'By'],
      },
      answer: 'told',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ me she would come.',
        translation: '她告诉我她会来。',
        options: ['Asked', 'told', 'Nuisance', 'Actor'],
      },
      answer: 'told',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ where I was going.',
        translation: '她问我要去哪里。',
        options: ['Mile', 'Had', 'Abroad', 'asked'],
      },
      answer: 'asked',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What did he ask?" 的正确翻译是？',
        passage: 'Reported speech',
        options: ['她告诉我她会来。', '她告诉你什么？', '他问我是否很忙。', '他问什么？'],
      },
      answer: '他问什么？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He asked if I was busy." 的正确翻译是？',
        passage: 'Reported speech',
        options: ['他问什么？', '他问我是否很忙。', '他说他累了。', '她告诉你什么？'],
      },
      answer: '他问我是否很忙。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"mean" 的意思是？',
        audioText: 'mean',
        options: ['水', '已经（过去完成时）', '意思是', '去了'],
      },
      answer: '意思是',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"been" 的意思是？',
        audioText: 'been',
        options: ['意思是', '报纸', '去过', '轰动的'],
      },
      answer: '去过',
      score: 10,
    },
  ],

  // Lesson 135: Lesson 135: The latest report 最新报道 (Level 4)
  135: [
    {
      type: 'listening',
      content: {
        question: '听录音，"latest" 的意思是？',
        audioText: 'latest',
        options: ['假期', '停留', '讨厌的人或事', '最新的'],
      },
      answer: '最新的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"introduce" 的意思是？',
        audioText: 'introduce',
        options: ['梦', '幸运的', '问（过去式）', '介绍'],
      },
      answer: '介绍',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"husband" 的意思是？',
        audioText: 'husband',
        options: ['轰动的', '丈夫', '超过', '取决于'],
      },
      answer: '丈夫',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "But I'll have to ask my future husband.",
        translation: '但我得问问我的未婚夫。',
      },
      answer: "But I'll have to ask my future husband.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'She said she would have to ask her future husband.',
        translation: '她说她得问问她的未婚夫。',
      },
      answer: 'She said she would have to ask her future husband.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "I can't make up my mind.",
        translation: '我拿不定主意。',
      },
      answer: "I can't make up my mind.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈleɪtɪst/',
        meaning: '最新的',
        example: 'The latest news.',
      },
      answer: 'latest',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈhʌzbənd/',
        meaning: '丈夫',
        example: 'Her husband.',
      },
      answer: 'husband',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈfjuːtʃə/',
        meaning: '未来',
        example: 'In the future.',
      },
      answer: 'future',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Are you really going to ______ Miss Marsh?',
        translation: '您真的要退休吗，马什小姐？',
        options: ['Future', 'retire', 'Introduce', 'Latest'],
      },
      answer: 'retire',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "She said she couldn't make up her ______",
        translation: '她说她拿不定主意。',
        options: ['Introduce', 'mind', 'Future', 'Latest'],
      },
      answer: 'mind',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She said she would have to ask her future ______',
        translation: '她说她得问问她的未婚夫。',
        options: ['Introduce', 'Latest', 'Future', 'husband'],
      },
      answer: 'husband',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"She said she would have to ask her future husband." 的正确翻译是？',
        passage: 'The latest report',
        options: [
          '她说她得问问她的未婚夫。',
          '可能。',
          '对我来说这是一个艰难的决定。',
          '您真的要退休吗，马什小姐？',
        ],
      },
      answer: '她说她得问问她的未婚夫。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Are you really going to retire, Miss Marsh?" 的正确翻译是？',
        passage: 'The latest report',
        options: [
          '她说她得问问她的未婚夫。',
          '她说了什么？',
          '您真的要退休吗，马什小姐？',
          '可能。',
        ],
      },
      answer: '您真的要退休吗，马什小姐？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I can\'t make up my mind." 的正确翻译是？',
        passage: 'The latest report',
        options: ['我拿不定主意。', '她说了什么？', '但我得问问我的未婚夫。', '可能。'],
      },
      answer: '我拿不定主意。',
      score: 10,
    },
  ],

  // Lesson 136: Lesson 136: 间接引语复习 (Level 4)
  136: [
    {
      type: 'listening',
      content: {
        question: '听录音，"may" 的意思是？',
        audioText: 'may',
        options: ['丈夫', '采访', '英里', '可能'],
      },
      answer: '可能',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"will" 的意思是？',
        audioText: 'will',
        options: ['指控', '国外', '一定已经', '将'],
      },
      answer: '将',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"can" 的意思是？',
        audioText: 'can',
        options: ['记者', '梦', '国外', '能'],
      },
      answer: '能',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'She said she could help me.',
        translation: '她说她能帮我。',
      },
      answer: 'She said she could help me.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He said he would come tomorrow.',
        translation: '他说他明天会来。',
      },
      answer: 'He said he would come tomorrow.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/kæn/',
        meaning: '能',
        example: 'He said he could...',
      },
      answer: 'can',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/meɪ/',
        meaning: '可能',
        example: 'He said he might...',
      },
      answer: 'may',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He said he ______ come tomorrow.',
        translation: '他说他明天会来。',
        options: ['Can', 'May', 'Will', 'would'],
      },
      answer: 'would',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He said he ______ be late.',
        translation: '他说他可能会迟到。',
        options: ['Can', 'Will', 'May', 'might'],
      },
      answer: 'might',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ she could help me.',
        translation: '她说她能帮我。',
        options: ['said', 'Can', 'May', 'Will'],
      },
      answer: 'said',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He told me he might be late." 的正确翻译是？',
        passage: 'Reported speech review',
        options: ['他说他明天会来。', '他告诉我他可能会迟到。', '他告诉你什么？', '她说她能帮我。'],
      },
      answer: '他告诉我他可能会迟到。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What did he say?" 的正确翻译是？',
        passage: 'Reported speech review',
        options: ['他告诉你什么？', '他说他明天会来。', '他说什么？', '她说她能帮我。'],
      },
      answer: '他说什么？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"introduce" 的意思是？',
        audioText: 'introduce',
        options: ['介绍', '阅读', '著名的', '取决于'],
      },
      answer: '介绍',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"actor" 的意思是？',
        audioText: 'actor',
        options: ['不可能是', '著名的', '采访', '男演员'],
      },
      answer: '男演员',
      score: 10,
    },
  ],

  // Lesson 137: Lesson 137: A pleasant dream 美好的梦 (Level 4)
  137: [
    {
      type: 'listening',
      content: {
        question: '听录音，"football" 的意思是？',
        audioText: 'football',
        options: ['足球', '能', '愉快的', '采访'],
      },
      answer: '足球',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"world" 的意思是？',
        audioText: 'world',
        options: ['未来', '超过', '世界', '退休'],
      },
      answer: '世界',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"pool" 的意思是？',
        audioText: 'pool',
        options: ['采访', '游泳池', '超过', '著名的'],
      },
      answer: '游泳池',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "If we spend all the money, we'll be poor again.",
        translation: '如果我们花光了所有的钱，我们又会变穷。',
      },
      answer: "If we spend all the money, we'll be poor again.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'It\'s a pleasant dream, but everything depends on "if".',
        translation: '这是一个美好的梦，但一切都取决于"如果"。',
      },
      answer: 'It\'s a pleasant dream, but everything depends on "if".',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "If we win a lot of money, we'll travel round the world.",
        translation: '如果我们赢了很多钱，我们就环游世界。',
      },
      answer: "If we win a lot of money, we'll travel round the world.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wɪn/',
        meaning: '赢',
        example: 'Win the match.',
      },
      answer: 'win',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wɜːld/',
        meaning: '世界',
        example: 'The world.',
      },
      answer: 'world',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈplezənt/',
        meaning: '愉快的',
        example: 'A pleasant dream.',
      },
      answer: 'pleasant',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'It\'s a ______ dream, but everything depends on "if".',
        translation: '这是一个美好的梦，但一切都取决于"如果"。',
        options: ['pleasant', 'Pool', 'Win', 'Football'],
      },
      answer: 'pleasant',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "If I ______ the football pool, I'll buy a big house.",
        translation: '如果我赢了足球彩票，我就买一座大房子。',
        options: ['World', 'Pool', 'win', 'Pleasant'],
      },
      answer: 'win',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "If we win a lot of money, we'll travel round the ______",
        translation: '如果我们赢了很多钱，我们就环游世界。',
        options: ['Win', 'world', 'Pleasant', 'Football'],
      },
      answer: 'world',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I want to see the world." 的正确翻译是？',
        passage: 'A pleasant dream',
        options: [
          '我想去看看世界。',
          '我不想要貂皮大衣！',
          '你在做足球彩票吗，布莱恩？',
          '如果你赢了很多钱，你会做什么？',
        ],
      },
      answer: '我想去看看世界。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question:
          '"All right. If we win a lot of money, we\'ll travel round the world." 的正确翻译是？',
        passage: 'A pleasant dream',
        options: [
          '我不想要貂皮大衣！',
          '如果你赢了很多钱，你会做什么？',
          '我想去看看世界。',
          '好吧。如果我们赢了很多钱，我们就环游世界。',
        ],
      },
      answer: '好吧。如果我们赢了很多钱，我们就环游世界。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I\'m sure we\'ll win something this week." 的正确翻译是？',
        passage: 'A pleasant dream',
        options: [
          '你总是这么说，但我们从来没赢过！',
          '你在做足球彩票吗，布莱恩？',
          '我肯定这周我们会赢点什么。',
          '是的，我快做完了，朱莉。',
        ],
      },
      answer: '我肯定这周我们会赢点什么。',
      score: 10,
    },
  ],

  // Lesson 138: Lesson 138: 条件句复习 (Level 4)
  138: [
    {
      type: 'listening',
      content: {
        question: '听录音，"unless" 的意思是？',
        audioText: 'unless',
        options: ['在……之前', '轰动的', '梦', '除非'],
      },
      answer: '除非',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"if" 的意思是？',
        audioText: 'if',
        options: ['如果', '假期', '丈夫', '国外'],
      },
      answer: '如果',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'If you study hard, you will pass the exam.',
        translation: '如果你努力学习，你会通过考试。',
      },
      answer: 'If you study hard, you will pass the exam.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'If I have time, I will go.',
        translation: '如果我有时间，我就去。',
      },
      answer: 'If I have time, I will go.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɪf/',
        meaning: '如果',
        example: 'If I go...',
      },
      answer: 'if',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ənˈles/',
        meaning: '除非',
        example: 'Unless you go...',
      },
      answer: 'unless',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'If it rains, I will stay at ______',
        translation: '如果下雨，我就待在家里。',
        options: ['Latest', 'Sensational', 'home', 'Future'],
      },
      answer: 'home',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'If you ______ hard, you will pass the exam.',
        translation: '如果你努力学习，你会通过考试。',
        options: ['study', 'Holiday', 'Had', 'Interview'],
      },
      answer: 'study',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'If I have ______ I will go.',
        translation: '如果我有时间，我就去。',
        options: ['Dream', 'Depend', 'Pool', 'time'],
      },
      answer: 'time',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"If it rains, I will stay at home." 的正确翻译是？',
        passage: 'Conditional sentences',
        options: [
          '如果下雨，我就待在家里。',
          '如果我有时间，我就去看电影。',
          '如果下雨你会做什么？',
          '如果你有时间你会做什么？',
        ],
      },
      answer: '如果下雨，我就待在家里。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What will you do if you have time?" 的正确翻译是？',
        passage: 'Conditional sentences',
        options: [
          '如果下雨你会做什么？',
          '如果她来会发生什么？',
          '如果她来，我们就一起吃晚饭。',
          '如果你有时间你会做什么？',
        ],
      },
      answer: '如果你有时间你会做什么？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"world" 的意思是？',
        audioText: 'world',
        options: ['世界', '告诉（过去式）', '愉快的', '指控'],
      },
      answer: '世界',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"mile" 的意思是？',
        audioText: 'mile',
        options: ['梦', '速度限制', '英里', '游泳池'],
      },
      answer: '英里',
      score: 10,
    },
  ],

  // Lesson 139: Lesson 139: Is that you, John? 是你吗，约翰？ (Level 4)
  139: [
    {
      type: 'listening',
      content: {
        question: '听录音，"company" 的意思是？',
        audioText: 'company',
        options: ['公司', '额外的', '幸运的', '告诉（过去式）'],
      },
      answer: '公司',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"extra" 的意思是？',
        audioText: 'extra',
        options: ['退休', '指控', '游泳池', '额外的'],
      },
      answer: '额外的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"engineering" 的意思是？',
        audioText: 'engineering',
        options: ['未来', '工程', '幸运的', '额外的'],
      },
      answer: '工程',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "Hasn't Mary told you?",
        translation: '玛丽没告诉你吗？',
      },
      answer: "Hasn't Mary told you?",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "Tell Mary we'll be late for dinner this evening.",
        translation: '告诉玛丽我们今晚晚饭会迟到。',
      },
      answer: "Tell Mary we'll be late for dinner this evening.",
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Yes, speaking.',
        translation: '是的，请讲。',
      },
      answer: 'Yes, speaking.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˌendʒɪˈnɪərɪŋ/',
        meaning: '工程',
        example: 'Engineering company.',
      },
      answer: 'engineering',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkʌmpəni/',
        meaning: '公司',
        example: 'Work for a company.',
      },
      answer: 'company',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈekstrə/',
        meaning: '额外的',
        example: 'Extra work.',
      },
      answer: 'extra',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: "I'm ______ I don't understand.",
        translation: '恐怕我不明白。',
        options: ['Overseas', 'afraid', 'Engineering', 'Extra'],
      },
      answer: 'afraid',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'But I have to do some ______ work at the office.',
        translation: '但我得在办公室做一些额外的工作。',
        options: ['Engineering', 'Company', 'Overseas', 'extra'],
      },
      answer: 'extra',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Yes, ______',
        translation: '是的，请讲。',
        options: ['speaking', 'Engineering', 'Company', 'Extra'],
      },
      answer: 'speaking',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Is that you, John?" 的正确翻译是？',
        passage: 'Is that you, John?',
        options: [
          '她邀请我和夏洛特今晚吃晚饭。',
          '是你吗，约翰？',
          '玛丽没告诉你吗？',
          '但我得在办公室做一些额外的工作。',
        ],
      },
      answer: '是你吗，约翰？',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"But I have to do some extra work at the office." 的正确翻译是？',
        passage: 'Is that you, John?',
        options: [
          '是你吗，约翰？',
          '告诉玛丽我们今晚晚饭会迟到。',
          '玛丽没告诉你吗？',
          '但我得在办公室做一些额外的工作。',
        ],
      },
      answer: '但我得在办公室做一些额外的工作。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Hasn\'t Mary told you?" 的正确翻译是？',
        passage: 'Is that you, John?',
        options: [
          '玛丽没告诉你吗？',
          '恐怕我不明白。',
          '我说我六点钟会到你家。',
          '她邀请我和夏洛特今晚吃晚饭。',
        ],
      },
      answer: '玛丽没告诉你吗？',
      score: 10,
    },
  ],

  // Lesson 140: Lesson 140: 间接疑问句复习 (Level 4)
  140: [
    {
      type: 'listening',
      content: {
        question: '听录音，"wondered" 的意思是？',
        audioText: 'wondered',
        options: ['未来', '游泳池', '停留', '想知道'],
      },
      answer: '想知道',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"asked" 的意思是？',
        audioText: 'asked',
        options: ['国外', '能', '问', '幸运的'],
      },
      answer: '问',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He asked me what I was doing.',
        translation: '他问我在做什么。',
      },
      answer: 'He asked me what I was doing.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'He asked me if I was busy.',
        translation: '他问我是否很忙。',
      },
      answer: 'He asked me if I was busy.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈwʌndəd/',
        meaning: '想知道',
        example: 'I wondered if...',
      },
      answer: 'wondered',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɑːskt/',
        meaning: '问',
        example: 'He asked me...',
      },
      answer: 'asked',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ me where I was going.',
        translation: '她问我要去哪里。',
        options: ['Pleasant', 'asked', 'Wondered', 'World'],
      },
      answer: 'asked',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'She ______ me when I would come.',
        translation: '她问我什么时候来。',
        options: ['asked', 'If', 'Told', 'May'],
      },
      answer: 'asked',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'He ______ me if I was busy.',
        translation: '他问我是否很忙。',
        options: ['asked', 'World', 'Win', 'Will'],
      },
      answer: 'asked',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"He asked me if I was busy." 的正确翻译是？',
        passage: 'Reported questions',
        options: ['他想知道什么？', '他问我是否很忙。', '他问我在做什么。', '她问我要去哪里。'],
      },
      answer: '他问我是否很忙。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"What did he want to know?" 的正确翻译是？',
        passage: 'Reported questions',
        options: ['她问你什么？', '他问我在做什么。', '他想知道什么？', '他问我是否很忙。'],
      },
      answer: '他想知道什么？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"can\'t be" 的意思是？',
        audioText: "can't be",
        options: ['工程', '不可能是', '将', '能'],
      },
      answer: '不可能是',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"must be" 的意思是？',
        audioText: 'must be',
        options: ['一定是', '足球', '一定已经', '额外的'],
      },
      answer: '一定是',
      score: 10,
    },
  ],

  // Lesson 141: Lesson 141: Sally's first train ride 萨莉第一次乘火车 (Level 4)
  141: [
    {
      type: 'listening',
      content: {
        question: '听录音，"curiously" 的意思是？',
        audioText: 'curiously',
        options: ['能', '介绍', '好奇地', '海外的'],
      },
      answer: '好奇地',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"middle-aged" 的意思是？',
        audioText: 'middle-aged',
        options: ['中年的', '如果', '能', '工程'],
      },
      answer: '中年的',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"excited" 的意思是？',
        audioText: 'excited',
        options: ['记者', '赢', '除非', '兴奋的'],
      },
      answer: '兴奋的',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: '"But you are still ugly," Sally said.',
        translation: '"但你还是很丑，"萨莉说。',
      },
      answer: '"But you are still ugly," Sally said.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I decided to take her by train.',
        translation: '我决定带她坐火车去。',
      },
      answer: 'I decided to take her by train.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: "Last week, my four-year-old daughter, Sally, was invited to a children's party.",
        translation: '上周，我四岁的女儿萨莉被邀请参加一个儿童聚会。',
      },
      answer: "Last week, my four-year-old daughter, Sally, was invited to a children's party.",
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɪkˈsaɪtɪd/',
        meaning: '兴奋的',
        example: "I'm excited.",
      },
      answer: 'excited',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈmɪdl eɪdʒd/',
        meaning: '中年的',
        example: 'A middle-aged woman.',
      },
      answer: 'middle-aged',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈkjʊəriəsli/',
        meaning: '好奇地',
        example: 'Look curiously.',
      },
      answer: 'curiously',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ are you doing that?" Sally asked.',
        translation: '"你为什么要那样做？"萨莉问。',
        options: ['Curiously', 'Why', 'Opposite', 'Excited'],
      },
      answer: 'Why',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The lady was ______ in a blue coat and a large, funny hat.',
        translation: '那位女士穿着蓝色外套，戴着一顶又大又滑稽的帽子。',
        options: ['Opposite', 'Curiously', 'dressed', 'Middle-aged'],
      },
      answer: 'dressed',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Sally was very ______ because she had never travelled on a train before.',
        translation: '萨莉非常兴奋，因为她以前从未坐过火车。',
        options: ['Opposite', 'Curiously', 'Middle-aged', 'excited'],
      },
      answer: 'excited',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question:
          '"After the train had left the station, the lady opened her handbag and took out her powder compact." 的正确翻译是？',
        passage: "Sally's first train ride",
        options: [
          '然后她开始化妆。',
          '火车离开车站后，那位女士打开手提包，拿出粉盒。',
          '突然，一位中年女士上了火车，坐在萨莉对面。',
          '上周，我四岁的女儿萨莉被邀请参加一个儿童聚会。',
        ],
      },
      answer: '火车离开车站后，那位女士打开手提包，拿出粉盒。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I decided to take her by train." 的正确翻译是？',
        passage: "Sally's first train ride",
        options: [
          '火车离开车站后，那位女士打开手提包，拿出粉盒。',
          '然后她开始化妆。',
          '我决定带她坐火车去。',
          '"你为什么要那样做？"萨莉问。',
        ],
      },
      answer: '我决定带她坐火车去。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"The lady was dressed in a blue coat and a large, funny hat." 的正确翻译是？',
        passage: "Sally's first train ride",
        options: [
          '那位女士穿着蓝色外套，戴着一顶又大又滑稽的帽子。',
          '"你为什么要那样做？"萨莉问。',
          '萨莉非常兴奋，因为她以前从未坐过火车。',
          '然后她开始化妆。',
        ],
      },
      answer: '那位女士穿着蓝色外套，戴着一顶又大又滑稽的帽子。',
      score: 10,
    },
  ],

  // Lesson 142: Lesson 142: 被动语态复习 (Level 4)
  142: [
    {
      type: 'listening',
      content: {
        question: '听录音，"was done" 的意思是？',
        audioText: 'was done',
        options: ['被做了', '采访', '工程', '公司'],
      },
      answer: '被做了',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"is done" 的意思是？',
        audioText: 'is done',
        options: ['可能', '被做', '轰动的', '工程'],
      },
      answer: '被做',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"has been done" 的意思是？',
        audioText: 'has been done',
        options: ['拿出', '将', '已经被做', '除非'],
      },
      answer: '已经被做',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The work is done by him.',
        translation: '工作是由他完成的。',
      },
      answer: 'The work is done by him.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The book was written by her.',
        translation: '这本书是她写的。',
      },
      answer: 'The book was written by her.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ɪz dʌn/',
        meaning: '被做',
        example: 'It is done.',
      },
      answer: 'is done',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/hæz biːn dʌn/',
        meaning: '已经被做',
        example: 'It has been done.',
      },
      answer: 'has been done',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The book was written by ______',
        translation: '这本书是她写的。',
        options: ['her', 'Opposite', 'Pleasant', 'Company'],
      },
      answer: 'her',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The cake is ______ made.',
        translation: '蛋糕正在被制作。',
        options: ['Middle-aged', 'being', 'Will', 'Told'],
      },
      answer: 'being',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'The house has been ______',
        translation: '房子已经建好了。',
        options: ['Latest', 'built', 'Husband', 'May'],
      },
      answer: 'built',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"The letter was sent yesterday." 的正确翻译是？',
        passage: 'Passive voice',
        options: ['谁写了这本书？', '信是什么时候寄出的？', '信是昨天寄出的。', '谁完成了工作？'],
      },
      answer: '信是昨天寄出的。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Who did the work?" 的正确翻译是？',
        passage: 'Passive voice',
        options: ['谁完成了工作？', '谁写了这本书？', '信是昨天寄出的。', '这本书是她写的。'],
      },
      answer: '谁完成了工作？',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"interview" 的意思是？',
        audioText: 'interview',
        options: ['工程', '未来', '中年的', '采访'],
      },
      answer: '采访',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"retire" 的意思是？',
        audioText: 'retire',
        options: ['想知道', '退休', '对面', '海外的'],
      },
      answer: '退休',
      score: 10,
    },
  ],

  // Lesson 143: Lesson 143: A walk through the woods 林中漫步 (Level 4)
  143: [
    {
      type: 'listening',
      content: {
        question: '听录音，"woods" 的意思是？',
        audioText: 'woods',
        options: ['树林', '上车', '说（过去式）', '对面'],
      },
      answer: '树林',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"surround" 的意思是？',
        audioText: 'surround',
        options: ['上车', '被做', '可能', '包围'],
      },
      answer: '包围',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"litter" 的意思是？',
        audioText: 'litter',
        options: ['垃圾', '上车', '海外的', '可能'],
      },
      answer: '垃圾',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'Last week, I bought a new sign.',
        translation: '上周，我买了一个新牌子。',
      },
      answer: 'Last week, I bought a new sign.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'I have been a regular visitor for the last twenty years.',
        translation: '过去二十年来，我一直是这里的常客。',
      },
      answer: 'I have been a regular visitor for the last twenty years.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'On Sundays, hundreds of people come from the city to see our town.',
        translation: '周日，成百上千的人从城市来参观我们的城镇。',
      },
      answer: 'On Sundays, hundreds of people come from the city to see our town.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈrʌbɪʃ/',
        meaning: '垃圾',
        example: 'Throw rubbish.',
      },
      answer: 'rubbish',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈprɒsɪkjuːt/',
        meaning: '起诉',
        example: 'Prosecute offenders.',
      },
      answer: 'prosecute',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/səˈraʊnd/',
        meaning: '包围',
        example: 'Surrounded by trees.',
      },
      answer: 'surround',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'I live in a very old town which is surrounded by beautiful ______',
        translation: '我住在一个很古老的城镇，周围环绕着美丽的树林。',
        options: ['Surround', 'woods', 'Prosecute', 'Litter'],
      },
      answer: 'woods',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ baskets have been placed under the trees.',
        translation: '树下已经放置了垃圾筐。',
        options: ['Rubbish', 'Surround', 'Litter', 'Prosecute'],
      },
      answer: 'Litter',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'They have left ______ everywhere.',
        translation: '他们到处乱扔垃圾。',
        options: ['Litter', 'Woods', 'Prosecute', 'rubbish'],
      },
      answer: 'rubbish',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"These visitors have been a nuisance." 的正确翻译是？',
        passage: 'A walk through the woods',
        options: [
          '上周，我买了一个新牌子。',
          '这些游客一直是个麻烦。',
          '上面写着："任何在树林里乱扔垃圾的人将被起诉！"',
          '但人们仍然到处乱扔垃圾。',
        ],
      },
      answer: '这些游客一直是个麻烦。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"They have left rubbish everywhere." 的正确翻译是？',
        passage: 'A walk through the woods',
        options: [
          '周日，成百上千的人从城市来参观我们的城镇。',
          '他们到处乱扔垃圾。',
          '上周，我买了一个新牌子。',
          '但人们仍然到处乱扔垃圾。',
        ],
      },
      answer: '他们到处乱扔垃圾。',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"I have been a regular visitor for the last twenty years." 的正确翻译是？',
        passage: 'A walk through the woods',
        options: [
          '这些游客一直是个麻烦。',
          '过去二十年来，我一直是这里的常客。',
          '他们到处乱扔垃圾。',
          '这是一个著名的风景区。',
        ],
      },
      answer: '过去二十年来，我一直是这里的常客。',
      score: 10,
    },
  ],

  // Lesson 144: Lesson 144: 被动语态复习 (Level 4)
  144: [
    {
      type: 'listening',
      content: {
        question: '听录音，"place" 的意思是？',
        audioText: 'place',
        options: ['世界', '放置', '可能', '被做'],
      },
      answer: '放置',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"litter" 的意思是？',
        audioText: 'litter',
        options: ['垃圾', '告诉（过去式）', '愉快的', '想知道'],
      },
      answer: '垃圾',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '听录音，"woods" 的意思是？',
        audioText: 'woods',
        options: ['海外的', '树林', '能', '足球'],
      },
      answer: '树林',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'The sign was bought last week.',
        translation: '那个牌子是上周买的。',
      },
      answer: 'The sign was bought last week.',
      score: 10,
    },
    {
      type: 'speaking',
      content: {
        instruction: '请大声朗读以下句子',
        sentence: 'People still throw their rubbish everywhere.',
        translation: '人们仍然到处乱扔垃圾。',
      },
      answer: 'People still throw their rubbish everywhere.',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/ˈlɪtə/',
        meaning: '垃圾',
        example: 'Do not throw litter.',
      },
      answer: 'litter',
      score: 10,
    },
    {
      type: 'spelling',
      content: {
        instruction: '根据提示拼写单词',
        hint: '/wʊdz/',
        meaning: '树林',
        example: 'Walk through the woods.',
      },
      answer: 'woods',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ baskets have been placed under the trees.',
        translation: '垃圾筐已经被放置在树下了。',
        options: ['Litter', 'Will', 'Can', 'Middle-aged'],
      },
      answer: 'Litter',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: 'Anyone who leaves ______ will be prosecuted.',
        translation: '任何乱扔垃圾的人将被起诉。',
        options: ['Husband', 'Future', 'Surround', 'litter'],
      },
      answer: 'litter',
      score: 10,
    },
    {
      type: 'writing',
      content: {
        question: '选择正确的单词填入空白处：',
        sentence: '______ still throw their rubbish everywhere.',
        translation: '人们仍然到处乱扔垃圾。',
        options: ['Place', 'Litter', 'People', 'Woods'],
      },
      answer: 'People',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"Anyone who leaves litter will be prosecuted!" 的正确翻译是？',
        passage: 'Passive voice review',
        options: [
          '那个牌子是上周买的。',
          '但人们仍然到处乱扔垃圾。',
          '垃圾筐已经被放置在树下了。',
          '任何乱扔垃圾的人将被起诉！',
        ],
      },
      answer: '任何乱扔垃圾的人将被起诉！',
      score: 10,
    },
    {
      type: 'reading',
      content: {
        question: '"The sign was bought last week." 的正确翻译是？',
        passage: 'Passive voice review',
        options: [
          '垃圾筐已经被放置在树下了。',
          '但人们仍然到处乱扔垃圾。',
          '那个牌子是上周买的。',
          '任何乱扔垃圾的人将被起诉！',
        ],
      },
      answer: '那个牌子是上周买的。',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"future" 的意思是？',
        audioText: 'future',
        options: ['包围', '未来', '中年的', '介绍'],
      },
      answer: '未来',
      score: 10,
    },
    {
      type: 'listening',
      content: {
        question: '【复习】听录音，"pleasant" 的意思是？',
        audioText: 'pleasant',
        options: ['愉快的', '介绍', '已经被做', '垃圾'],
      },
      answer: '愉快的',
      score: 10,
    },
  ],
};
