import { Lesson } from '../../types/lesson';

// Lesson 1: Excuse me
const lesson1: Lesson = {
  id: 1,
  title: 'Lesson 1: Excuse me',
  type: 'new',
  grammar: '一般现在时',
  tense: 'Simple Present Tense',
  content: {
    vocabulary: [
      {
        word: 'excuse',
        phonetic: '/ɪkˈskjuːz/',
        meaning: '原谅',
        examples: ['Excuse me.', 'Excuse me, can you help me?'],
      },
      {
        word: 'me',
        phonetic: '/miː/',
        meaning: '我（宾格）',
        examples: ['Tell me.', 'Help me.'],
      },
      {
        word: 'yes',
        phonetic: '/jes/',
        meaning: '是的',
        examples: ['Yes, it is.', 'Yes, I can.'],
      },
      {
        word: 'is',
        phonetic: '/ɪz/',
        meaning: '是（be动词）',
        examples: ['This is a book.', 'It is mine.'],
      },
      {
        word: 'this',
        phonetic: '/ðɪs/',
        meaning: '这',
        examples: ['This is my book.', 'Is this yours?'],
      },
      {
        word: 'your',
        phonetic: '/jɔː/',
        meaning: '你的，你们的',
        examples: ['Is this your book?', 'Your name is Tom.'],
      },
      {
        word: 'handbag',
        phonetic: '/ˈhændbæɡ/',
        meaning: '手提包',
        examples: ['Is this your handbag?', 'A nice handbag.'],
      },
      {
        word: 'pardon',
        phonetic: '/ˈpɑːdn/',
        meaning: '原谅，请再说一遍',
        examples: ['I beg your pardon.', 'Pardon?'],
      },
      {
        word: 'it',
        phonetic: '/ɪt/',
        meaning: '它',
        examples: ['It is a cat.', 'Is it yours?'],
      },
      {
        word: 'thank you',
        phonetic: '/θæŋk juː/',
        meaning: '谢谢你',
        examples: ['Thank you very much.', 'Thank you for your help.'],
      },
      {
        word: 'very much',
        phonetic: '/ˈveri mʌtʃ/',
        meaning: '非常',
        examples: ['Thank you very much.', 'I like it very much.'],
      },
    ],
    sentences: [
      {
        english: 'Excuse me!',
        chinese: '对不起！',
        grammarPoints: ['日常用语', '引起注意'],
      },
      {
        english: 'Yes?',
        chinese: '什么事？',
        grammarPoints: ['日常用语', '询问'],
      },
      {
        english: 'Is this your handbag?',
        chinese: '这是你的手提包吗？',
        grammarPoints: ['一般疑问句', 'be动词'],
      },
      {
        english: 'Pardon?',
        chinese: '请再说一遍。',
        grammarPoints: ['日常用语', '请求重复'],
      },
      {
        english: 'Yes, it is.',
        chinese: '是的，是我的。',
        grammarPoints: ['肯定回答', 'be动词'],
      },
      {
        english: 'Thank you very much.',
        chinese: '非常感谢。',
        grammarPoints: ['日常用语', '表示感谢'],
      },
    ],
    text: {
      title: 'Excuse me.',
      paragraphs: [
        { speaker: 'A', content: 'Excuse me!' },
        { speaker: 'B', content: 'Yes?' },
        { speaker: 'A', content: 'Is this your handbag?' },
        { speaker: 'B', content: 'Pardon?' },
        { speaker: 'A', content: 'Is this your handbag?' },
        { speaker: 'B', content: 'Yes, it is.' },
        { speaker: 'B', content: 'Thank you very much.' },
      ],
      translation: [
        '对不起！',
        '什么事？',
        '这是你的手提包吗？',
        '请再说一遍。',
        '这是你的手提包吗？',
        '是的，是我的。',
        '非常感谢。',
      ],
    },
    exercises: [
      {
        type: 'listening',
        content: {
          question: '听单词，选择正确的中文意思',
          word: 'excuse',
          options: ['原谅', '是的', '这', '它'],
        },
        answer: '原谅',
        score: 10,
      },
      {
        type: 'speaking',
        content: {
          instruction: '跟读句子',
          sentence: 'Excuse me!',
        },
        answer: 'Excuse me!',
        score: 10,
      },
    ],
  },
};

// Lesson 2: Good morning
const lesson2: Lesson = {
  id: 2,
  title: 'Lesson 2: Good morning',
  type: 'new',
  grammar: '问候语',
  content: {
    vocabulary: [
      {
        word: 'good',
        phonetic: '/ɡʊd/',
        meaning: '好的',
        examples: ['Good morning.', 'Good afternoon.'],
      },
      {
        word: 'morning',
        phonetic: '/ˈmɔːnɪŋ/',
        meaning: '早晨，上午',
        examples: ['Good morning.', 'In the morning.'],
      },
      {
        word: 'Mr.',
        phonetic: '/ˈmɪstə/',
        meaning: '先生',
        examples: ['Mr. Black.', 'Good morning, Mr. Black.'],
      },
      {
        word: 'here',
        phonetic: '/hɪə/',
        meaning: '这里',
        examples: ['My book is here.', 'Here it is.'],
      },
      {
        word: 'my',
        phonetic: '/maɪ/',
        meaning: '我的',
        examples: ['This is my book.', 'My name is Tom.'],
      },
      {
        word: 'number',
        phonetic: '/ˈnʌmbə/',
        meaning: '号码',
        examples: ['My number is 5.', 'What is your number?'],
      },
      {
        word: 'please',
        phonetic: '/pliːz/',
        meaning: '请',
        examples: ['Please sit down.', 'Come in, please.'],
      },
    ],
    sentences: [
      {
        english: 'Good morning.',
        chinese: '早上好。',
        grammarPoints: ['问候语'],
      },
      {
        english: 'Good morning, Mr. Black.',
        chinese: '早上好，布莱克先生。',
        grammarPoints: ['问候语', '称呼'],
      },
      {
        english: 'This is my ticket.',
        chinese: '这是我的票。',
        grammarPoints: ['介绍', '物主代词'],
      },
      {
        english: 'Here it is.',
        chinese: '给你。',
        grammarPoints: ['日常用语'],
      },
    ],
    text: {
      title: 'Good morning.',
      paragraphs: [
        { speaker: 'A', content: 'Good morning.' },
        { speaker: 'B', content: 'Good morning, Mr. Black.' },
        { speaker: 'A', content: 'This is my ticket.' },
        { speaker: 'B', content: 'Thank you. Here it is.' },
      ],
      translation: ['早上好。', '早上好，布莱克先生。', '这是我的票。', '谢谢。给你。'],
    },
    exercises: [],
  },
};

// Lesson 3: Sorry, sir
const lesson3: Lesson = {
  id: 3,
  title: 'Lesson 3: Sorry, sir',
  type: 'new',
  grammar: '道歉和请求',
  content: {
    vocabulary: [
      {
        word: 'sorry',
        phonetic: '/ˈsɒri/',
        meaning: '对不起的',
        examples: ['I am sorry.', 'Sorry, sir.'],
      },
      {
        word: 'sir',
        phonetic: '/sɜː/',
        meaning: '先生',
        examples: ['Sorry, sir.', 'Yes, sir.'],
      },
      {
        word: 'not',
        phonetic: '/nɒt/',
        meaning: '不',
        examples: ['This is not my ticket.', 'It is not mine.'],
      },
    ],
    sentences: [
      {
        english: 'Sorry, sir.',
        chinese: '对不起，先生。',
        grammarPoints: ['道歉'],
      },
      {
        english: 'This is not my ticket.',
        chinese: '这不是我的票。',
        grammarPoints: ['否定句', 'be动词否定'],
      },
    ],
    text: {
      title: 'Sorry, sir.',
      paragraphs: [
        { speaker: 'A', content: 'My coat and my umbrella please.' },
        { speaker: 'B', content: 'Here is your ticket.' },
        { speaker: 'A', content: 'Thank you.' },
        { speaker: 'B', content: 'Sorry, sir. This is not your ticket.' },
      ],
      translation: ['请把我的大衣和伞拿给我。', '这是您的票。', '谢谢。', '对不起，先生。这不是您的票。'],
    },
    exercises: [],
  },
};

// 导出所有课程数据
export const sampleLessons: Lesson[] = [lesson1, lesson2, lesson3];

// 生成剩余课程（简化版）
for (let i = 4; i <= 10; i++) {
  sampleLessons.push({
    id: i,
    title: `Lesson ${i}`,
    type: i % 2 === 0 ? 'review' : 'new',
    grammar: i % 2 === 0 ? '复习课' : '新语法',
    content: {
      vocabulary: [
        {
          word: `word${i}`,
          phonetic: `/wɜːd${i}/`,
          meaning: `单词${i}`,
          examples: [`Example ${i}`],
        },
      ],
      sentences: [
        {
          english: `Sentence ${i}.`,
          chinese: `句子${i}。`,
          grammarPoints: ['语法点'],
        },
      ],
      text: {
        title: `Lesson ${i} Title`,
        paragraphs: [{ content: `This is lesson ${i}.` }],
        translation: [`这是第${i}课。`],
      },
      exercises: [],
    },
  });
}

export default sampleLessons;
