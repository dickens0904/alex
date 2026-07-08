import { Lesson } from '../../types/lesson';

// 常用词汇库
const commonVocabulary = {
  greetings: [
    { word: 'hello', phonetic: '/həˈləʊ/', meaning: '你好', examples: ['Hello!', 'Hello, how are you?'] },
    { word: 'hi', phonetic: '/haɪ/', meaning: '嗨', examples: ['Hi!', 'Hi, Tom!'] },
    { word: 'goodbye', phonetic: '/ˌɡʊdˈbaɪ/', meaning: '再见', examples: ['Goodbye!', 'See you tomorrow.'] },
    { word: 'good', phonetic: '/ɡʊd/', meaning: '好的', examples: ['Good morning.', 'Good idea.'] },
    { word: 'morning', phonetic: '/ˈmɔːnɪŋ/', meaning: '早晨', examples: ['Good morning.', 'In the morning.'] },
    { word: 'afternoon', phonetic: '/ˌɑːftəˈnuːn/', meaning: '下午', examples: ['Good afternoon.', 'In the afternoon.'] },
    { word: 'evening', phonetic: '/ˈiːvnɪŋ/', meaning: '晚上', examples: ['Good evening.', 'In the evening.'] },
    { word: 'night', phonetic: '/naɪt/', meaning: '夜晚', examples: ['Good night.', 'At night.'] },
  ],
  personal: [
    { word: 'name', phonetic: '/neɪm/', meaning: '名字', examples: ['What is your name?', 'My name is Tom.'] },
    { word: 'I', phonetic: '/aɪ/', meaning: '我', examples: ['I am a student.', 'I like English.'] },
    { word: 'you', phonetic: '/juː/', meaning: '你', examples: ['You are my friend.', 'How are you?'] },
    { word: 'he', phonetic: '/hiː/', meaning: '他', examples: ['He is tall.', 'He likes reading.'] },
    { word: 'she', phonetic: '/ʃiː/', meaning: '她', examples: ['She is beautiful.', 'She is a teacher.'] },
    { word: 'it', phonetic: '/ɪt/', meaning: '它', examples: ['It is a cat.', 'It is nice.'] },
    { word: 'we', phonetic: '/wiː/', meaning: '我们', examples: ['We are friends.', 'We like music.'] },
    { word: 'they', phonetic: '/ðeɪ/', meaning: '他们', examples: ['They are students.', 'They live here.'] },
    { word: 'my', phonetic: '/maɪ/', meaning: '我的', examples: ['This is my book.', 'My name is Lily.'] },
    { word: 'your', phonetic: '/jɔː/', meaning: '你的', examples: ['Is this your pen?', 'Your bag is nice.'] },
    { word: 'his', phonetic: '/hɪz/', meaning: '他的', examples: ['This is his book.', 'His name is John.'] },
    { word: 'her', phonetic: '/hɜː/', meaning: '她的', examples: ['This is her bag.', 'Her dress is beautiful.'] },
    { word: 'our', phonetic: '/ˈaʊə/', meaning: '我们的', examples: ['This is our classroom.', 'Our teacher is nice.'] },
    { word: 'their', phonetic: '/ðeə/', meaning: '他们的', examples: ['This is their house.', 'Their car is red.'] },
  ],
  numbers: [
    { word: 'one', phonetic: '/wʌn/', meaning: '一', examples: ['I have one book.', 'One apple.'] },
    { word: 'two', phonetic: '/tuː/', meaning: '二', examples: ['Two books.', 'I have two pens.'] },
    { word: 'three', phonetic: '/θriː/', meaning: '三', examples: ['Three students.', 'Three apples.'] },
    { word: 'four', phonetic: '/fɔː/', meaning: '四', examples: ['Four chairs.', 'Four books.'] },
    { word: 'five', phonetic: '/faɪv/', meaning: '五', examples: ['Five fingers.', 'Five stars.'] },
    { word: 'six', phonetic: '/sɪks/', meaning: '六', examples: ['Six pencils.', 'Six days.'] },
    { word: 'seven', phonetic: '/ˈsevn/', meaning: '七', examples: ['Seven days.', 'Seven colors.'] },
    { word: 'eight', phonetic: '/eɪt/', meaning: '八', examples: ['Eight hours.', 'Eight students.'] },
    { word: 'nine', phonetic: '/naɪn/', meaning: '九', examples: ['Nine cats.', 'Nine books.'] },
    { word: 'ten', phonetic: '/ten/', meaning: '十', examples: ['Ten apples.', 'Ten fingers.'] },
    { word: 'eleven', phonetic: '/ɪˈlevn/', meaning: '十一', examples: ['Eleven boys.', 'Eleven girls.'] },
    { word: 'twelve', phonetic: '/twelv/', meaning: '十二', examples: ['Twelve months.', 'Twelve chairs.'] },
    { word: 'thirteen', phonetic: '/θɜːˈtiːn/', meaning: '十三', examples: ['Thirteen years.', 'Thirteen students.'] },
    { word: 'fourteen', phonetic: '/fɔːˈtiːn/', meaning: '十四', examples: ['Fourteen days.', 'Fourteen books.'] },
    { word: 'fifteen', phonetic: '/fɪfˈtiːn/', meaning: '十五', examples: ['Fifteen apples.', 'Fifteen minutes.'] },
    { word: 'sixteen', phonetic: '/sɪksˈtiːn/', meaning: '十六', examples: ['Sixteen candles.', 'Sixteen years.'] },
    { word: 'seventeen', phonetic: '/ˌsevnˈtiːn/', meaning: '十七', examples: ['Seventeen girls.', 'Seventeen boys.'] },
    { word: 'eighteen', phonetic: '/eɪˈtiːn/', meaning: '十八', examples: ['Eighteen years old.', 'Eighteen books.'] },
    { word: 'nineteen', phonetic: '/ˌnaɪnˈtiːn/', meaning: '十九', examples: ['Nineteen students.', 'Nineteen days.'] },
    { word: 'twenty', phonetic: '/ˈtwenti/', meaning: '二十', examples: ['Twenty years.', 'Twenty books.'] },
  ],
  family: [
    { word: 'family', phonetic: '/ˈfæməli/', meaning: '家庭', examples: ['This is my family.', 'I love my family.'] },
    { word: 'father', phonetic: '/ˈfɑːðə/', meaning: '父亲', examples: ['My father is a doctor.', 'This is my father.'] },
    { word: 'mother', phonetic: '/ˈmʌðə/', meaning: '母亲', examples: ['My mother is a teacher.', 'This is my mother.'] },
    { word: 'brother', phonetic: '/ˈbrʌðə/', meaning: '兄弟', examples: ['I have a brother.', 'This is my brother.'] },
    { word: 'sister', phonetic: '/ˈsɪstə/', meaning: '姐妹', examples: ['I have a sister.', 'This is my sister.'] },
    { word: 'parent', phonetic: '/ˈpeərənt/', meaning: '父母', examples: ['My parents are kind.', 'I love my parents.'] },
    { word: 'child', phonetic: '/tʃaɪld/', meaning: '孩子', examples: ['I have one child.', 'He is a happy child.'] },
    { word: 'children', phonetic: '/ˈtʃɪldrən/', meaning: '孩子们', examples: ['The children are playing.', 'I love children.'] },
    { word: 'grandfather', phonetic: '/ˈɡrændfɑːðə/', meaning: '祖父', examples: ['My grandfather is old.', 'This is my grandfather.'] },
    { word: 'grandmother', phonetic: '/ˈɡrændmʌðə/', meaning: '祖母', examples: ['My grandmother is kind.', 'This is my grandmother.'] },
  ],
  school: [
    { word: 'school', phonetic: '/skuːl/', meaning: '学校', examples: ['I go to school.', 'My school is big.'] },
    { word: 'teacher', phonetic: '/ˈtiːtʃə/', meaning: '老师', examples: ['My teacher is nice.', 'The teacher is teaching.'] },
    { word: 'student', phonetic: '/ˈstjuːdnt/', meaning: '学生', examples: ['I am a student.', 'The students are studying.'] },
    { word: 'class', phonetic: '/klɑːs/', meaning: '班级', examples: ['I am in Class One.', 'Our class is nice.'] },
    { word: 'classroom', phonetic: '/ˈklɑːsruːm/', meaning: '教室', examples: ['This is our classroom.', 'The classroom is clean.'] },
    { word: 'book', phonetic: '/bʊk/', meaning: '书', examples: ['I have a book.', 'This is my book.'] },
    { word: 'pen', phonetic: '/pen/', meaning: '钢笔', examples: ['I have a pen.', 'This is my pen.'] },
    { word: 'pencil', phonetic: '/ˈpensl/', meaning: '铅笔', examples: ['I have a pencil.', 'This is my pencil.'] },
    { word: 'desk', phonetic: '/desk/', meaning: '书桌', examples: ['This is my desk.', 'The desk is clean.'] },
    { word: 'chair', phonetic: '/tʃeə/', meaning: '椅子', examples: ['This is a chair.', 'Sit on the chair.'] },
    { word: 'blackboard', phonetic: '/ˈblækbɔːd/', meaning: '黑板', examples: ['Look at the blackboard.', 'The blackboard is clean.'] },
    { word: 'study', phonetic: '/ˈstʌdi/', meaning: '学习', examples: ['I study English.', 'Study hard.'] },
    { word: 'learn', phonetic: '/lɜːn/', meaning: '学习', examples: ['I learn English.', 'Learn new words.'] },
    { word: 'read', phonetic: '/riːd/', meaning: '阅读', examples: ['I read books.', 'Read the text.'] },
    { word: 'write', phonetic: '/raɪt/', meaning: '写', examples: ['I write a letter.', 'Write your name.'] },
    { word: 'speak', phonetic: '/spiːk/', meaning: '说', examples: ['I speak English.', 'Speak loudly.'] },
    { word: 'listen', phonetic: '/ˈlɪsn/', meaning: '听', examples: ['Listen to the teacher.', 'Listen carefully.'] },
  ],
  food: [
    { word: 'food', phonetic: '/fuːd/', meaning: '食物', examples: ['I like food.', 'This food is delicious.'] },
    { word: 'eat', phonetic: '/iːt/', meaning: '吃', examples: ['I eat breakfast.', 'Eat your food.'] },
    { word: 'drink', phonetic: '/drɪŋk/', meaning: '喝', examples: ['I drink water.', 'Drink some milk.'] },
    { word: 'breakfast', phonetic: '/ˈbrekfəst/', meaning: '早餐', examples: ['I eat breakfast.', 'Good breakfast.'] },
    { word: 'lunch', phonetic: '/lʌntʃ/', meaning: '午餐', examples: ['I eat lunch.', 'Lunch time.'] },
    { word: 'dinner', phonetic: '/ˈdɪnə/', meaning: '晚餐', examples: ['I eat dinner.', 'Dinner is ready.'] },
    { word: 'apple', phonetic: '/ˈæpl/', meaning: '苹果', examples: ['I eat an apple.', 'This apple is red.'] },
    { word: 'banana', phonetic: '/bəˈnænə/', meaning: '香蕉', examples: ['I like bananas.', 'This banana is yellow.'] },
    { word: 'orange', phonetic: '/ˈɒrɪndʒ/', meaning: '橙子', examples: ['I eat an orange.', 'Orange juice.'] },
    { word: 'pear', phonetic: '/peə/', meaning: '梨', examples: ['I eat a pear.', 'This pear is sweet.'] },
    { word: 'grape', phonetic: '/ɡreɪp/', meaning: '葡萄', examples: ['I like grapes.', 'Green grapes.'] },
    { word: 'water', phonetic: '/ˈwɔːtə/', meaning: '水', examples: ['I drink water.', 'Drink more water.'] },
    { word: 'milk', phonetic: '/mɪlk/', meaning: '牛奶', examples: ['I drink milk.', 'Milk is good.'] },
    { word: 'rice', phonetic: '/raɪs/', meaning: '米饭', examples: ['I eat rice.', 'Rice is delicious.'] },
    { word: 'bread', phonetic: '/bred/', meaning: '面包', examples: ['I eat bread.', 'Bread and butter.'] },
    { word: 'egg', phonetic: '/eɡ/', meaning: '鸡蛋', examples: ['I eat an egg.', 'Fried egg.'] },
    { word: 'meat', phonetic: '/miːt/', meaning: '肉', examples: ['I eat meat.', 'Meat is tasty.'] },
    { word: 'fish', phonetic: '/fɪʃ/', meaning: '鱼', examples: ['I eat fish.', 'Fish is healthy.'] },
    { word: 'vegetable', phonetic: '/ˈvedʒtəbl/', meaning: '蔬菜', examples: ['I eat vegetables.', 'Eat more vegetables.'] },
    { word: 'fruit', phonetic: '/fruːt/', meaning: '水果', examples: ['I eat fruit.', 'Fruit is sweet.'] },
  ],
  animals: [
    { word: 'animal', phonetic: '/ˈænɪml/', meaning: '动物', examples: ['I like animals.', 'Animals are cute.'] },
    { word: 'cat', phonetic: '/kæt/', meaning: '猫', examples: ['I have a cat.', 'The cat is cute.'] },
    { word: 'dog', phonetic: '/dɒɡ/', meaning: '狗', examples: ['I have a dog.', 'The dog is big.'] },
    { word: 'bird', phonetic: '/bɜːd/', meaning: '鸟', examples: ['The bird can fly.', 'A beautiful bird.'] },
    { word: 'fish', phonetic: '/fɪʃ/', meaning: '鱼', examples: ['The fish can swim.', 'Fish live in water.'] },
    { word: 'rabbit', phonetic: '/ˈræbɪt/', meaning: '兔子', examples: ['The rabbit is white.', 'A cute rabbit.'] },
    { word: 'mouse', phonetic: '/maʊs/', meaning: '老鼠', examples: ['The mouse is small.', 'A little mouse.'] },
    { word: 'elephant', phonetic: '/ˈelɪfənt/', meaning: '大象', examples: ['The elephant is big.', 'An elephant has a long nose.'] },
    { word: 'tiger', phonetic: '/ˈtaɪɡə/', meaning: '老虎', examples: ['The tiger is strong.', 'A tiger is dangerous.'] },
    { word: 'lion', phonetic: '/ˈlaɪən/', meaning: '狮子', examples: ['The lion is the king.', 'A lion is strong.'] },
    { word: 'monkey', phonetic: '/ˈmʌŋki/', meaning: '猴子', examples: ['The monkey is clever.', 'Monkeys like bananas.'] },
    { word: 'bear', phonetic: '/beə/', meaning: '熊', examples: ['The bear is big.', 'A brown bear.'] },
    { word: 'snake', phonetic: '/sneɪk/', meaning: '蛇', examples: ['The snake is long.', 'A green snake.'] },
    { word: 'frog', phonetic: '/frɒɡ/', meaning: '青蛙', examples: ['The frog can jump.', 'A green frog.'] },
    { word: 'butterfly', phonetic: '/ˈbʌtəflaɪ/', meaning: '蝴蝶', examples: ['The butterfly is beautiful.', 'A colorful butterfly.'] },
  ],
  colors: [
    { word: 'color', phonetic: '/ˈkʌlə/', meaning: '颜色', examples: ['What color is it?', 'I like this color.'] },
    { word: 'red', phonetic: '/red/', meaning: '红色', examples: ['Red is my favorite color.', 'A red apple.'] },
    { word: 'blue', phonetic: '/bluː/', meaning: '蓝色', examples: ['The sky is blue.', 'A blue car.'] },
    { word: 'green', phonetic: '/ɡriːn/', meaning: '绿色', examples: ['The grass is green.', 'A green tree.'] },
    { word: 'yellow', phonetic: '/ˈjeləʊ/', meaning: '黄色', examples: ['The sun is yellow.', 'A yellow banana.'] },
    { word: 'orange', phonetic: '/ˈɒrɪndʒ/', meaning: '橙色', examples: ['An orange is orange.', 'Orange juice.'] },
    { word: 'purple', phonetic: '/ˈpɜːpl/', meaning: '紫色', examples: ['Purple is beautiful.', 'A purple flower.'] },
    { word: 'pink', phonetic: '/pɪŋk/', meaning: '粉色', examples: ['Pink is lovely.', 'A pink dress.'] },
    { word: 'black', phonetic: '/blæk/', meaning: '黑色', examples: ['Black is cool.', 'A black cat.'] },
    { word: 'white', phonetic: '/waɪt/', meaning: '白色', examples: ['White is clean.', 'A white shirt.'] },
    { word: 'gray', phonetic: '/ɡreɪ/', meaning: '灰色', examples: ['Gray is neutral.', 'A gray sky.'] },
    { word: 'brown', phonetic: '/braʊn/', meaning: '棕色', examples: ['Brown is warm.', 'A brown bear.'] },
  ],
  time: [
    { word: 'time', phonetic: '/taɪm/', meaning: '时间', examples: ['What time is it?', 'Time is money.'] },
    { word: 'clock', phonetic: '/klɒk/', meaning: '时钟', examples: ['Look at the clock.', 'The clock is on the wall.'] },
    { word: 'watch', phonetic: '/wɒtʃ/', meaning: '手表', examples: ['I have a watch.', 'Look at my watch.'] },
    { word: 'hour', phonetic: '/ˈaʊə/', meaning: '小时', examples: ['One hour.', 'I study for two hours.'] },
    { word: 'minute', phonetic: '/ˈmɪnɪt/', meaning: '分钟', examples: ['One minute.', 'Wait a minute.'] },
    { word: 'second', phonetic: '/ˈsekənd/', meaning: '秒', examples: ['One second.', 'Just a second.'] },
    { word: 'day', phonetic: '/deɪ/', meaning: '天', examples: ['One day.', 'Every day.'] },
    { word: 'week', phonetic: '/wiːk/', meaning: '周', examples: ['One week.', 'Every week.'] },
    { word: 'month', phonetic: '/mʌnθ/', meaning: '月', examples: ['One month.', 'Every month.'] },
    { word: 'year', phonetic: '/jɪə/', meaning: '年', examples: ['One year.', 'Every year.'] },
    { word: 'today', phonetic: '/təˈdeɪ/', meaning: '今天', examples: ['Today is sunny.', 'Today is Monday.'] },
    { word: 'tomorrow', phonetic: '/təˈmɒrəʊ/', meaning: '明天', examples: ['Tomorrow is Tuesday.', 'See you tomorrow.'] },
    { word: 'yesterday', phonetic: '/ˈjestədeɪ/', meaning: '昨天', examples: ['Yesterday was Monday.', 'I saw him yesterday.'] },
    { word: 'now', phonetic: '/naʊ/', meaning: '现在', examples: ['Now is the time.', 'I am busy now.'] },
    { word: 'soon', phonetic: '/suːn/', meaning: '很快', examples: ['I will come soon.', 'See you soon.'] },
  ],
  weather: [
    { word: 'weather', phonetic: '/ˈweðə/', meaning: '天气', examples: ['What is the weather like?', 'The weather is nice.'] },
    { word: 'sunny', phonetic: '/ˈsʌni/', meaning: '晴朗的', examples: ['Today is sunny.', 'A sunny day.'] },
    { word: 'rainy', phonetic: '/ˈreɪni/', meaning: '下雨的', examples: ['Today is rainy.', 'A rainy day.'] },
    { word: 'cloudy', phonetic: '/ˈklaʊdi/', meaning: '多云的', examples: ['Today is cloudy.', 'A cloudy day.'] },
    { word: 'windy', phonetic: '/ˈwɪndi/', meaning: '有风的', examples: ['Today is windy.', 'A windy day.'] },
    { word: 'snowy', phonetic: '/ˈsnəʊi/', meaning: '下雪的', examples: ['Today is snowy.', 'A snowy day.'] },
    { word: 'hot', phonetic: '/hɒt/', meaning: '热的', examples: ['It is hot today.', 'Hot summer.'] },
    { word: 'cold', phonetic: '/kəʊld/', meaning: '冷的', examples: ['It is cold today.', 'Cold winter.'] },
    { word: 'warm', phonetic: '/wɔːm/', meaning: '温暖的', examples: ['It is warm today.', 'A warm day.'] },
    { word: 'cool', phonetic: '/kuːl/', meaning: '凉爽的', examples: ['It is cool today.', 'A cool day.'] },
    { word: 'sun', phonetic: '/sʌn/', meaning: '太阳', examples: ['The sun is bright.', 'The sun rises in the east.'] },
    { word: 'rain', phonetic: '/reɪn/', meaning: '雨', examples: ['It is raining.', 'Rain is falling.'] },
    { word: 'snow', phonetic: '/snəʊ/', meaning: '雪', examples: ['It is snowing.', 'Snow is white.'] },
    { word: 'wind', phonetic: '/wɪnd/', meaning: '风', examples: ['The wind is blowing.', 'Strong wind.'] },
    { word: 'cloud', phonetic: '/klaʊd/', meaning: '云', examples: ['The clouds are white.', 'Black clouds.'] },
  ],
  actions: [
    { word: 'go', phonetic: '/ɡəʊ/', meaning: '去', examples: ['I go to school.', 'Let us go.'] },
    { word: 'come', phonetic: '/kʌm/', meaning: '来', examples: ['Come here.', 'Come to my house.'] },
    { word: 'walk', phonetic: '/wɔːk/', meaning: '走', examples: ['I walk to school.', 'Walk slowly.'] },
    { word: 'run', phonetic: '/rʌn/', meaning: '跑', examples: ['I run every day.', 'Run fast.'] },
    { word: 'jump', phonetic: '/dʒʌmp/', meaning: '跳', examples: ['I can jump.', 'Jump high.'] },
    { word: 'swim', phonetic: '/swɪm/', meaning: '游泳', examples: ['I can swim.', 'Swim in the pool.'] },
    { word: 'fly', phonetic: '/flaɪ/', meaning: '飞', examples: ['Birds can fly.', 'Fly a kite.'] },
    { word: 'eat', phonetic: '/iːt/', meaning: '吃', examples: ['I eat breakfast.', 'Eat slowly.'] },
    { word: 'drink', phonetic: '/drɪŋk/', meaning: '喝', examples: ['I drink water.', 'Drink carefully.'] },
    { word: 'sleep', phonetic: '/sliːp/', meaning: '睡觉', examples: ['I sleep at night.', 'Sleep well.'] },
    { word: 'wake', phonetic: '/weɪk/', meaning: '醒来', examples: ['I wake up early.', 'Wake up!'] },
    { word: 'read', phonetic: '/riːd/', meaning: '阅读', examples: ['I read books.', 'Read carefully.'] },
    { word: 'write', phonetic: '/raɪt/', meaning: '写', examples: ['I write a letter.', 'Write neatly.'] },
    { word: 'speak', phonetic: '/spiːk/', meaning: '说', examples: ['I speak English.', 'Speak clearly.'] },
    { word: 'listen', phonetic: '/ˈlɪsn/', meaning: '听', examples: ['I listen to music.', 'Listen carefully.'] },
    { word: 'look', phonetic: '/lʊk/', meaning: '看', examples: ['Look at me.', 'Look carefully.'] },
    { word: 'see', phonetic: '/siː/', meaning: '看见', examples: ['I see a bird.', 'See you later.'] },
    { word: 'watch', phonetic: '/wɒtʃ/', meaning: '观看', examples: ['I watch TV.', 'Watch the movie.'] },
    { word: 'play', phonetic: '/pleɪ/', meaning: '玩', examples: ['I play games.', 'Play with friends.'] },
    { word: 'work', phonetic: '/wɜːk/', meaning: '工作', examples: ['I work hard.', 'Work is important.'] },
  ],
};

// 语法主题列表
const grammarTopics = [
  { topic: 'be动词', description: 'am/is/are的用法' },
  { topic: '一般现在时', description: '经常性、习惯性的动作' },
  { topic: '否定句', description: 'not的用法' },
  { topic: '一般疑问句', description: '用be动词提问' },
  { topic: '特殊疑问句', description: 'who/what/where等' },
  { topic: '物主代词', description: 'my/your/his/her等' },
  { topic: '名词复数', description: '加s/es' },
  { topic: '冠词', description: 'a/an/the的用法' },
  { topic: '指示代词', description: 'this/that/these/those' },
  { topic: '介词', description: 'in/on/at等' },
  { topic: '现在进行时', description: '正在进行的动作' },
  { topic: '一般过去时', description: '过去发生的动作' },
  { topic: '规则动词过去式', description: '加ed' },
  { topic: '不规则动词', description: '特殊变化' },
  { topic: '一般将来时', description: 'will/be going to' },
  { topic: '情态动词', description: 'can/may/must等' },
  { topic: '形容词', description: '描述事物' },
  { topic: '副词', description: '修饰动词' },
  { topic: '比较级', description: '形容词/副词比较' },
  { topic: '最高级', description: '形容词/副词最高级' },
  { topic: '祈使句', description: '命令、请求' },
  { topic: 'there be句型', description: '存在句' },
  { topic: '代词', description: '人称代词、指示代词' },
  { topic: '数词', description: '基数词、序数词' },
];

// 生成课程数据
function generateLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  const vocabKeys = Object.keys(commonVocabulary) as (keyof typeof commonVocabulary)[];
  
  for (let i = 1; i <= 144; i++) {
    const isNewLesson = i % 2 === 1;
    const unitIndex = Math.ceil(i / 2);
    const vocabGroupIndex = (unitIndex - 1) % vocabKeys.length;
    const vocabGroup = commonVocabulary[vocabKeys[vocabGroupIndex]];
    const grammarIndex = Math.min(unitIndex - 1, grammarTopics.length - 1);
    const grammar = grammarTopics[grammarIndex];
    
    // 选择该课的词汇（每课3-5个单词）
    const startIndex = ((unitIndex - 1) * 3) % vocabGroup.length;
    const lessonVocab = vocabGroup.slice(startIndex, Math.min(startIndex + 4, vocabGroup.length));
    
    // 生成课文对话
    const generateDialog = () => {
      if (isNewLesson) {
        return [
          { speaker: 'A', content: `Hello! ${lessonVocab[0]?.word || 'Word'} is my favorite.` },
          { speaker: 'B', content: `Hi! I like ${lessonVocab[1]?.word || 'that'} too.` },
          { speaker: 'A', content: `Is this your ${lessonVocab[2]?.word || 'book'}?` },
          { speaker: 'B', content: `Yes, it is. Thank you!` },
        ];
      } else {
        return [
          { speaker: 'A', content: `Good morning! How are you?` },
          { speaker: 'B', content: `Good morning! I am fine, thank you.` },
          { speaker: 'A', content: `What do you like?` },
          { speaker: 'B', content: `I like ${lessonVocab[0]?.word || 'learning'} English!` },
        ];
      }
    };
    
    const dialog = generateDialog();
    const translation = dialog.map(p => {
      const parts = p.content.split(' ');
      let result = '';
      for (const part of parts) {
        const vocab = vocabGroup.find(v => v.word.toLowerCase() === part.toLowerCase());
        if (vocab) {
          result += vocab.meaning + ' ';
        } else if (part === 'I') {
          result += '我 ';
        } else if (part === 'you') {
          result += '你 ';
        } else if (part === 'is') {
          result += '是 ';
        } else if (part === 'are') {
          result += '是 ';
        } else if (part === 'am') {
          result += '是 ';
        } else if (part === 'my') {
          result += '我的 ';
        } else if (part === 'your') {
          result += '你的 ';
        } else if (part === 'this') {
          result += '这 ';
        } else if (part === 'it') {
          result += '它 ';
        } else if (part === 'Yes') {
          result += '是的 ';
        } else if (part === 'thank') {
          result += '谢谢 ';
        } else if (part === 'Good') {
          result += '好 ';
        } else if (part === 'morning') {
          result += '早晨 ';
        } else if (part === 'Hello') {
          result += '你好 ';
        } else if (part === 'Hi') {
          result += '嗨 ';
        } else if (part === 'How') {
          result += '怎么 ';
        } else if (part === 'fine') {
          result += '好 ';
        } else if (part === 'What') {
          result += '什么 ';
        } else if (part === 'do') {
          result += '做 ';
        } else if (part === 'like') {
          result += '喜欢 ';
        } else if (part === 'too') {
          result += '也 ';
        } else if (part === 'English') {
          result += '英语 ';
        } else {
          result += part + ' ';
        }
      }
      return result.trim();
    });
    
    const lesson: Lesson = {
      id: i,
      title: `Lesson ${i}${isNewLesson ? ': ' + grammar.topic : ''}`,
      type: isNewLesson ? 'new' : 'review',
      grammar: isNewLesson ? grammar.topic : '复习课',
      tense: isNewLesson ? grammar.description : undefined,
      content: {
        vocabulary: lessonVocab,
        sentences: lessonVocab.slice(0, 3).map(vocab => ({
          english: `I like ${vocab.word}.`,
          chinese: `我喜欢${vocab.meaning}。`,
          grammarPoints: isNewLesson ? [grammar.topic] : ['复习'],
        })),
        text: {
          title: isNewLesson ? `Lesson ${i}: ${grammar.topic}` : `Lesson ${i}: Review`,
          paragraphs: dialog,
          translation,
        },
        exercises: [
          {
            type: 'listening',
            content: {
              question: `听单词，选择正确的中文意思: ${lessonVocab[0]?.word}`,
              options: [
                lessonVocab[0]?.meaning || '',
                lessonVocab[1]?.meaning || '',
                lessonVocab[2]?.meaning || '',
                '其他',
              ].filter(Boolean),
            },
            answer: lessonVocab[0]?.meaning || '',
            score: 10,
          },
          {
            type: 'speaking',
            content: {
              instruction: '跟读句子',
              sentence: `I like ${lessonVocab[0]?.word}.`,
            },
            answer: `I like ${lessonVocab[0]?.word}.`,
            score: 10,
          },
          {
            type: 'writing',
            content: {
              instruction: '翻译句子',
              sentence: `I like ${lessonVocab[0]?.word}.`,
            },
            answer: `我喜欢${lessonVocab[0]?.meaning}。`,
            score: 10,
          },
        ],
      },
    };
    
    lessons.push(lesson);
  }
  
  return lessons;
}

export const allLessons: Lesson[] = generateLessons();

export default allLessons;