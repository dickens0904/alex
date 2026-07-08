// 语法增强内容 - 批次2（主题41-60）
const batch2: Record<
  number,
  {
    explanation: string;
    extraRules: string[];
    extraExamples: { english: string; chinese: string; grammarPoint: string }[];
    extraTips: string[];
  }
> = {
  // ==================== 第41课：可数和不可数名词 ====================
  41: {
    explanation:
      '名词就像水果摊上的水果，有些能一个一个数（可数），有些是一堆一堆的（不可数）。可数名词就是能数清楚的东西，比如book（书）、apple（苹果）、egg（鸡蛋），你可以说one book、two books、three books。不可数名词就是没法一个一个数的东西，比如water（水）、bread（面包）、coffee（咖啡）、rice（米饭）。你不能说"一个水""两个面包"对吧？那怎么表示它们的数量呢？这时候就需要量词出场了！就像中文说"一杯水""一条面包"，英语也有自己的量词搭配：a piece of（一片/一块）、a bar of（一条）、a bottle of（一瓶）、a glass of（一杯）。量词就像"单位"，帮不可数名词也能被数清楚！',
    extraRules: [
      '可数名词有单数和复数形式：book→books, apple→apples, box→boxes',
      '不可数名词没有复数形式，不能加-s：water（不说waters），bread（不说breads）',
      '不可数名词前不能直接用a/an，要用量词：a piece of bread（一片面包），不说a bread',
      '常用量词搭配：a piece of（一片/一块）、a bar of（一条）、a bottle of（一瓶）、a cup of（一杯）、a glass of（一杯）',
      'some和any既可用于可数名词复数，也可用于不可数名词：some apples / some water',
    ],
    extraExamples: [
      {
        english: 'I want a piece of cake.',
        chinese: '我想要一块蛋糕。',
        grammarPoint: 'a piece of + 不可数名词',
      },
      {
        english: 'Give me a bar of chocolate, please.',
        chinese: '请给我一条巧克力。',
        grammarPoint: 'a bar of + 不可数名词',
      },
      {
        english: 'She bought two bottles of water.',
        chinese: '她买了两瓶水。',
        grammarPoint: '数词 + bottles of + 不可数名词',
      },
      {
        english: 'There are three eggs in the box.',
        chinese: '盒子里有三个鸡蛋。',
        grammarPoint: '数词 + 可数名词复数',
      },
      {
        english: 'I would like a glass of orange juice.',
        chinese: '我想要一杯橙汁。',
        grammarPoint: 'a glass of + 不可数名词',
      },
      {
        english: 'We need some bread and some apples.',
        chinese: '我们需要一些面包和一些苹果。',
        grammarPoint: 'some + 不可数名词 / some + 可数名词复数',
      },
    ],
    extraTips: [
      '记忆口诀："可数能数一二三，不可数要量词帮；a piece of一块/片，a bottle of一瓶装"',
      '易错提醒：不能说"a water"或"two rices"，不可数名词前面一定要用量词！要说"a glass of water"或"two bags of rice"',
      '趣味知识：有些名词既是可数又是不可数，意思不同哦！比如chicken做"鸡肉"不可数，做"小鸡"可数（a chicken）',
    ],
  },

  // ==================== 第42课：复习：可数和不可数名词练习 ====================
  42: {
    explanation:
      '今天我们来全面练习可数名词和不可数名词的区分和量词搭配！可数名词就像积木，可以一块一块数清楚，有单数和复数的变化。不可数名词就像沙子或水，没法一个一个数，需要用"量词"这个工具来帮忙。量词搭配是英语中非常重要的一部分，就像中文说"一袋米""一瓶水""一张纸"一样。英语中常用的量词有：a piece of（一片/一块）、a bar of（一条）、a bottle of（一瓶）、a cup of（一杯）、a glass of（一杯）、a bag of（一袋）。记住一个规律：量词后面加of再加不可数名词。如果量词本身是复数，of后面的不可数名词不变，比如"two cups of coffee"（两杯咖啡），coffee不加-s。',
    extraRules: [
      '可数名词用数字直接修饰：three books, five pencils',
      '不可数名词用量词+of修饰：a cup of tea, two pieces of paper',
      '量词变复数时，后面的不可数名词不变：a bottle of milk → two bottles of milk（不是milks）',
      'many修饰可数名词复数，much修饰不可数名词：many students / much water',
      'a lot of / lots of 既可修饰可数复数，也可修饰不可数名词：a lot of books / a lot of water',
    ],
    extraExamples: [
      {
        english: 'I eat a piece of bread every morning.',
        chinese: '我每天早上吃一片面包。',
        grammarPoint: 'a piece of + 不可数名词',
      },
      {
        english: 'There are five cups of tea on the table.',
        chinese: '桌子上有五杯茶。',
        grammarPoint: '数词 + cups of + 不可数名词',
      },
      {
        english: 'How many apples do you want?',
        chinese: '你想要多少个苹果？',
        grammarPoint: 'How many + 可数名词复数',
      },
      {
        english: 'How much milk is there in the fridge?',
        chinese: '冰箱里有多少牛奶？',
        grammarPoint: 'How much + 不可数名词',
      },
      {
        english: 'She gave me two pieces of advice.',
        chinese: '她给了我两条建议。',
        grammarPoint: 'two pieces of + 不可数名词',
      },
      {
        english: 'We have a lot of homework today.',
        chinese: '今天我们有很多作业。',
        grammarPoint: 'a lot of + 不可数名词',
      },
    ],
    extraTips: [
      '口诀复习："可数名词数得清，复数加s要记明；不可数名词量词帮，a cup of茶一杯香"',
      '易错提醒：How many问可数，How much问不可数，别用反了！How many water? ❌ → How much water? ✓',
      '实战练习：看看你的冰箱里有什么，用"There is/are...some...a piece of...a bottle of..."来描述吧！',
    ],
  },

  // ==================== 第43课：情态动词 can ====================
  43: {
    explanation:
      'can就像你的"超能力开关"，表示"能/会"做某事。当你学会了一项新技能，就可以打开这个开关，用can告诉别人你会什么！比如"I can swim"（我会游泳）、"She can play the piano"（她会弹钢琴）、"Birds can fly"（鸟会飞）。can是一个情态动词，它有两个特别的性格：第一，它永远不变形——不管主语是谁（I/you/he/she/they），can都不加-s，不说"cans"；第二，它后面一定要跟动词原形，比如"I can see some coffee"（我能看见一些咖啡），can后面直接跟see，不需要加to或加ing。can就像一个"固定模板"：主语 + can + 动词原形，简单又方便！',
    extraRules: [
      'can表示能力"能/会"：I can dance.（我会跳舞。）He can cook.（他会做饭。）',
      'can后面必须跟动词原形：can swim, can play, can see（不能加-s、-ing或to）',
      'can没有人称变化：I can, you can, he can, she can, they can（都是can，不变！）',
      'can的过去式是could，表示"过去能/会"：I could swim when I was five.（我五岁时就会游泳了。）',
      'can还可以表示"许可/请求"：Can I go out?（我能出去吗？）You can use my pen.（你可以用我的笔。）',
    ],
    extraExamples: [
      {
        english: 'I can see some coffee on the table.',
        chinese: '我能看到桌子上有一些咖啡。',
        grammarPoint: 'I can + 动词原形（能力）',
      },
      {
        english: 'She can speak English very well.',
        chinese: '她英语说得很好。',
        grammarPoint: 'She can + 动词原形',
      },
      {
        english: 'The baby can walk now.',
        chinese: '宝宝现在会走路了。',
        grammarPoint: 'The baby can + 动词原形',
      },
      {
        english: "Fish can swim, but they can't walk.",
        chinese: '鱼会游泳，但它们不会走路。',
        grammarPoint: "can + 动词原形 / can't + 动词原形",
      },
      {
        english: 'My brother can ride a bike.',
        chinese: '我哥哥会骑自行车。',
        grammarPoint: '主语 + can + 动词原形',
      },
      {
        english: 'We can help you.',
        chinese: '我们可以帮你。',
        grammarPoint: 'We can + 动词原形（能力/意愿）',
      },
    ],
    extraTips: [
      '记忆口诀："can是超能力，会什么就说什么；can后原形不能变，所有人称都用can"',
      '易错提醒：can后面不能加s！不能说"He cans swim"，要说"He can swim"',
      '趣味知识：can的过去式could还可以用来礼貌请求哦，比如"Could you help me?"比"Can you help me?"更礼貌！',
    ],
  },

  // ==================== 第44课：复习：情态动词 can 练习 ====================
  44: {
    explanation:
      '今天我们重点练习"Can you...?"的问答模式，这是英语中最常用的问句之一！"Can you...?"用来询问别人"你会……吗？"或"你能……吗？"，回答用"Yes, I can."（是的，我会。）或"No, I can\'t."（不，我不会。）。比如你问同学"Can you play basketball?"（你会打篮球吗？），他可能回答"Yes, I can. I play it every weekend."（会啊，我每个周末都打。）也可以问第三人称"Can she sing?"（她会唱歌吗？），回答是"Yes, she can."或"No, she can\'t."。记住回答时的主语要和问句中的一致，不能问的是"he"，回答变成"I"。Can you...?在生活中无处不在——朋友之间互相了解、老师考察学生、面试时询问技能，全都用得上！',
    extraRules: [
      "Can you...? 你会……吗？肯定回答：Yes, I can. 否定回答：No, I can't.",
      "Can he/she...? 他/她会……吗？肯定回答：Yes, he/she can. 否定回答：No, he/she can't.",
      "Can they...? 他们会……吗？肯定回答：Yes, they can. 否定回答：No, they can't.",
      'What can you do? 你会做什么？（问能力范围）回答：I can...',
      'can的疑问句直接把can提到主语前面：You can swim. → Can you swim?',
    ],
    extraExamples: [
      {
        english: 'Can you ride a bike?',
        chinese: '你会骑自行车吗？',
        grammarPoint: 'Can you + 动词原形？',
      },
      { english: 'Yes, I can.', chinese: '是的，我会。', grammarPoint: '肯定回答：Yes, I can.' },
      {
        english: 'Can she play the piano?',
        chinese: '她会弹钢琴吗？',
        grammarPoint: 'Can + she + 动词原形？',
      },
      {
        english: "No, she can't, but she can play the guitar.",
        chinese: '不，她不会，但是她会弹吉他。',
        grammarPoint: '否定回答 + but转折',
      },
      {
        english: 'What can you do for the party?',
        chinese: '你能为派对做什么？',
        grammarPoint: 'What can you do?',
      },
      {
        english: 'I can sing and I can dance.',
        chinese: '我会唱歌也会跳舞。',
        grammarPoint: 'I can... and I can...',
      },
    ],
    extraTips: [
      '口诀复习："Can you问你会不会，Yes I can来回答；No I can\'t不会说，but后面补一句"',
      '易错提醒：回答时主语要和问句一致！Can Tom swim? → Yes, he can.（不是Yes, Tom can.）',
      '趣味游戏：和同学玩"能力大调查"——互相问"Can you...?"，看看谁的本领最多！',
    ],
  },

  // ==================== 第45课：can 的否定和疑问 ====================
  45: {
    explanation:
      '今天我们要学会can的"变身术"——把肯定句变成否定句和疑问句。否定形式超简单：在can后面直接加not，写成can\'t或cannot，表示"不能/不会"。比如"I can swim"（我会游泳）→"I can\'t swim"（我不会游泳）。疑问形式更简单：把can从主语后面挪到主语前面就行了！比如"You can help me"（你能帮我）→"Can you help me?"（你能帮我吗？）。can就像一颗弹珠，从句子中间弹到句子开头就变成了疑问句，弹的时候顺便把not粘上去就变成了否定句。回答疑问句时，用"Yes, 主语 + can."或"No, 主语 + can\'t."就可以了。这套"变身术"适用于所有人称，因为can本身不变形！',
    extraRules: [
      "否定句：主语 + can't (cannot) + 动词原形（I can't fly. 我不会飞。）",
      "can't = cannot = can not，三种写法都可以，口语中最常用can't",
      '一般疑问句：Can + 主语 + 动词原形？（Can you fly? 你会飞吗？）',
      "肯定回答：Yes, 主语 + can.（Yes, I can.）/ 否定回答：No, 主语 + can't.（No, I can't.）",
      '特殊疑问句：What/Where/How + can + 主语 + 动词原形？（What can I do? 我能做什么？）',
    ],
    extraExamples: [
      {
        english: "I can't reach the top shelf.",
        chinese: '我够不到最高的架子。',
        grammarPoint: "can't + 动词原形（否定）",
      },
      {
        english: 'Can you open the window?',
        chinese: '你能打开窗户吗？',
        grammarPoint: 'Can + you + 动词原形？（疑问）',
      },
      {
        english: "He can't come to the party tonight.",
        chinese: '他今晚不能来参加派对。',
        grammarPoint: "He + can't + 动词原形",
      },
      {
        english: 'What can I do for you?',
        chinese: '我能为你做什么？',
        grammarPoint: 'What + can + I + 动词原形？',
      },
      {
        english: "Animals can't talk, but parrots can.",
        chinese: '动物不会说话，但鹦鹉会。',
        grammarPoint: "can't + 动词原形 / can（省略）",
      },
      {
        english: 'Where can I find a taxi?',
        chinese: '我在哪里能打到出租车？',
        grammarPoint: 'Where + can + I + 动词原形？',
      },
    ],
    extraTips: [
      '记忆口诀："否定can后面加not，can\'t缩写最常用；疑问can跑到句首去，回答yes或no来搞定"',
      '易错提醒：can\'t后面跟动词原形，不要加to！不能说"can\'t to swim"，要说"can\'t swim"',
      "趣味知识：can't的发音是/kænt/，和can的发音/kæn/很接近，所以口语中有时需要根据上下文来区分！",
    ],
  },

  // ==================== 第46课：复习：can 的否定和疑问练习 ====================
  46: {
    explanation:
      '今天我们来做一个can句型的"变形大挑战"！同一句话，可以有三种表达方式：肯定句、否定句和疑问句。比如"He can play football."（他会踢足球。）→"He can\'t play football."（他不会踢足球。）→"Can he play football?"（他会踢足球吗？）。can的变形非常简单，因为它不需要考虑主语是第几人称，也不需要变化形式。肯定变否定：加not（can\'t）；肯定变疑问：把can提到主语前面；否定变疑问：把can提到前面同时去掉not。这三种句式就像"三原色"，掌握了它们，你就能用can表达任何意思了。试着练习快速转换——看到一个句子就能脱口而出它的另外两种形式！',
    extraRules: [
      "肯定→否定：can + 动词原形 → can't + 动词原形（He can sing. → He can't sing.）",
      '肯定→疑问：主语 + can → Can + 主语（She can dance. → Can she dance?）',
      "否定→疑问：主语 + can't → Can + 主语（They can't swim. → Can they swim?）",
      '特殊疑问句：疑问词 + can + 主语 + 动词原形（What can he do? / Where can she go?）',
      "can't的完整形式是cannot（一个词）或can not（两个词），考试中常考cannot",
    ],
    extraExamples: [
      {
        english: 'Tom can ride a horse.',
        chinese: '汤姆会骑马。（肯定句）',
        grammarPoint: '主语 + can + 动词原形',
      },
      {
        english: "Tom can't ride a horse.",
        chinese: '汤姆不会骑马。（否定句）',
        grammarPoint: "主语 + can't + 动词原形",
      },
      {
        english: 'Can Tom ride a horse?',
        chinese: '汤姆会骑马吗？（疑问句）',
        grammarPoint: 'Can + 主语 + 动词原形？',
      },
      {
        english: 'What can the monkey do?',
        chinese: '猴子会做什么？',
        grammarPoint: 'What + can + 主语 + 动词原形？',
      },
      {
        english: 'I cannot believe it!',
        chinese: '我不敢相信！',
        grammarPoint: 'cannot（完整形式）',
      },
      {
        english: 'How can I get to the hospital?',
        chinese: '我怎样才能到达医院？',
        grammarPoint: 'How + can + I + 动词原形？',
      },
    ],
    extraTips: [
      '口诀总结："can的变形真简单，否定not跟后面，疑问can跑最前，回答yes/no说一遍"',
      '易错提醒：回答Can开头的疑问句时，主语要替换！Can your mother cook? → Yes, she can.（不是Yes, my mother can.）',
      '实战挑战：用can写出5个关于你和朋友能力的句子，然后全部变成否定句和疑问句！',
    ],
  },

  // ==================== 第47课：一般现在时（like） ====================
  47: {
    explanation:
      '一般现在时就像你的"日常生活相册"，记录你经常做的事、喜欢的东西和不变的事实。今天我们先从like（喜欢）开始学。当你想告诉别人你喜欢什么，就说"I like..."，比如"I like ice cream"（我喜欢冰淇淋）、"I like playing football"（我喜欢踢足球）。一般现在时用来描述：习惯性动作（I get up at seven every day.）、个人喜好（I like music.）、客观事实（The sun rises in the east.）。它就像一张"默认设置表"——记录的是你一直以来的习惯和喜好，而不是正在做的事情。Do you like...?是询问喜好的常用句型，回答用"Yes, I do."或"No, I don\'t."。',
    extraRules: [
      '一般现在时结构：主语 + 动词原形（I like apples. / We play football every day.）',
      "Do you like...? 你喜欢……吗？肯定回答：Yes, I do. 否定回答：No, I don't.",
      'like后面可以跟名词（I like cats.）或动名词/不定式（I like swimming. / I like to swim.）',
      '一般现在时的标志词：always, usually, often, sometimes, never, every day, every week',
      "否定句用don't：I don't like spicy food.（我不喜欢辣的食物。）",
    ],
    extraExamples: [
      {
        english: 'Do you like coffee?',
        chinese: '你喜欢咖啡吗？',
        grammarPoint: 'Do you like + 名词？',
      },
      {
        english: 'Yes, I do. I like it very much.',
        chinese: '是的，我很喜欢。',
        grammarPoint: 'Yes, I do. 回答',
      },
      {
        english: 'I like playing with my friends.',
        chinese: '我喜欢和朋友们一起玩。',
        grammarPoint: 'like + 动名词',
      },
      {
        english: "We don't like rainy days.",
        chinese: '我们不喜欢下雨天。',
        grammarPoint: "don't like + 名词",
      },
      {
        english: 'I like reading books before bed.',
        chinese: '我喜欢睡前看书。',
        grammarPoint: 'like + 动名词 + 时间状语',
      },
      {
        english: 'Do you like this song?',
        chinese: '你喜欢这首歌吗？',
        grammarPoint: 'Do you like + this + 名词？',
      },
    ],
    extraTips: [
      '记忆口诀："一般现在表习惯，like喜欢天天见；Do you like来提问，Yes I do放心间"',
      '易错提醒：like后面跟动词时，可以加-ing（动名词）或to+动词原形（不定式），两种都可以！',
      '趣味知识：在英语国家，小朋友之间经常问"Who do you like?"（你喜欢谁？），不过这可不是问喜欢谁的歌星哦，而是问你喜欢和谁做朋友！',
    ],
  },

  // ==================== 第48课：复习：一般现在时（like）练习 ====================
  48: {
    explanation:
      '今天我们来全面复习一般现在时中like的句型汇总！like是英语中最常用的动词之一，表示"喜欢"。在一般现在时中，第一人称（I/we）和第二人称（you）以及复数（they）都用动词原形like。我们来回顾三种句式：肯定句"I like..."（我喜欢……），否定句"I don\'t like..."（我不喜欢……），疑问句"Do you like...?"（你喜欢……吗？）。don\'t是do not的缩写，在否定句中放在like前面。疑问句把do提到主语前面，句末加问号。一般现在时描述的是经常性的喜好和习惯，所以它就像你的"口味档案"——记录着你一直以来喜欢和不喜欢的东西。试着用like来写一份"我的喜好清单"吧！',
    extraRules: [
      '肯定句：I/You/We/They + like + 名词/动名词（I like chocolate. / I like swimming.）',
      "否定句：I/You/We/They + don't + like + 名词/动名词（I don't like snakes.）",
      '疑问句：Do + I/you/we/they + like + 名词/动名词?（Do you like snakes?）',
      'like doing 和 like to do 都表示喜欢做某事，意思相近',
      'What do you like? 你喜欢什么？（问喜好范围）',
    ],
    extraExamples: [
      {
        english: 'I like summer because I can go swimming.',
        chinese: '我喜欢夏天，因为可以去游泳。',
        grammarPoint: 'like + 名词 + because...',
      },
      {
        english: 'Do you like your new teacher?',
        chinese: '你喜欢你的新老师吗？',
        grammarPoint: 'Do you like + 名词？',
      },
      {
        english: "We don't like doing homework on Sundays.",
        chinese: '我们不喜欢在周日做作业。',
        grammarPoint: "don't like + doing",
      },
      {
        english: 'What kind of music do you like?',
        chinese: '你喜欢什么类型的音乐？',
        grammarPoint: 'What kind of... do you like?',
      },
      {
        english: "I don't like getting up early.",
        chinese: '我不喜欢早起。',
        grammarPoint: "don't like + getting",
      },
      {
        english: 'Do they like the new classroom?',
        chinese: '他们喜欢新教室吗？',
        grammarPoint: 'Do they like + 名词？',
      },
    ],
    extraTips: [
      '口诀复习："like肯定I like it，否定don\'t加前面；Do you like来提问，Yes I do记心间"',
      '易错提醒：Do you like...?的回答不能说"Yes, I like."，要说"Yes, I do."！',
      '实战练习：做一份"喜好调查表"，问问你的家人和同学"Do you like...?"，记录他们的回答！',
    ],
  },

  // ==================== 第49课：一般现在时（第三人称单数） ====================
  49: {
    explanation:
      '当主语变成he（他）、she（她）、it（它）或者一个具体的人名（Tom、Lucy）时，一般现在时就要"换一套规则"了！这就是"第三人称单数"的魔法规则。动词要加上-s或-es的"小尾巴"：like→likes, play→plays, watch→watches, go→goes。就像给动词穿上了一件"第三人称外套"。否定句和疑问句也不同了：不能用do/don\'t，要用does/doesn\'t。比如"He likes apples"（他喜欢苹果），否定句是"He doesn\'t like apples"（他不喜欢苹果），注意doesn\'t后面的like变回了原形！疑问句是"Does he like apples?"（他喜欢苹果吗？）。记住：does已经自带了第三人称单数信息，所以后面的动词必须"脱掉外套"回到原形！',
    extraRules: [
      '第三人称单数（he/she/it/人名）动词加-s：like→likes, play→plays, read→reads',
      '以s/x/ch/sh/o结尾加-es：watch→watches, go→goes, fix→fixes',
      '辅音字母+y结尾，变y为i加-es：study→studies, carry→carries',
      "否定句用doesn't + 动词原形：He doesn't like fish.（不说doesn't likes）",
      '疑问句用Does + 主语 + 动词原形：Does she play tennis?（不说Does she plays）',
    ],
    extraExamples: [
      {
        english: 'He likes ice cream very much.',
        chinese: '他非常喜欢冰淇淋。',
        grammarPoint: 'He + likes（第三人称单数加-s）',
      },
      {
        english: 'She watches TV every evening.',
        chinese: '她每天晚上看电视。',
        grammarPoint: 'She + watches（加-es）',
      },
      {
        english: "Tom doesn't like vegetables.",
        chinese: '汤姆不喜欢蔬菜。',
        grammarPoint: "doesn't + like（动词原形）",
      },
      {
        english: 'Does your sister go to this school?',
        chinese: '你姐姐在这所学校上学吗？',
        grammarPoint: 'Does + 主语 + 动词原形？',
      },
      {
        english: 'My mother studies English every night.',
        chinese: '我妈妈每天晚上学英语。',
        grammarPoint: 'studies（变y为i加-es）',
      },
      {
        english: "The cat doesn't eat vegetables.",
        chinese: '猫不吃蔬菜。',
        grammarPoint: "doesn't + eat（动词原形）",
      },
    ],
    extraTips: [
      '记忆口诀："三单动词加s，特殊结尾加es；否定疑问用does，does后面原形回"',
      '易错提醒：doesn\'t后面的动词必须回到原形！不能说"He doesn\'t likes"，要说"He doesn\'t like"',
      '趣味知识：为什么叫"第三人称单数"？"第三人称"是指他/她/它（不是你也不是我），"单数"是指一个（不是多个），合起来就是"他/她/它一个人"',
    ],
  },

  // ==================== 第50课：复习：一般现在时（第三人称单数）练习 ====================
  50: {
    explanation:
      "今天我们来全面对比第三人称单数和非第三人称单数的句型差异。这是一个非常重要的语法点，考试经常考！先看肯定句：I like fish.（我喜欢鱼。）→ He likes fish.（他喜欢鱼。）动词从like变成了likes。再看否定句：I don't like fish.（我不喜欢鱼。）→ He doesn't like fish.（他不喜欢鱼。）don't变成了doesn't，但like保持原形。最后看疑问句：Do you like fish?（你喜欢鱼吗？）→ Does he like fish?（他喜欢鱼吗？）do变成了does，like保持原形。核心规律就是：一旦用了does/doesn't，后面的动词就必须回到原形！就像\"能量守恒\"——第三人称的信息已经包含在does里了，动词就不需要再加-s了。",
    extraRules: [
      '肯定句对比：I play football. → He plays football.（动词加-s）',
      "否定句对比：I don't play. → He doesn't play.（doesn't + 原形）",
      '疑问句对比：Do you play? → Does he play?（Does + 主语 + 原形）',
      "does = do的第三人称单数形式，doesn't = does not",
      "有does/doesn't的地方，动词一定回到原形——这是铁律！",
    ],
    extraExamples: [
      {
        english: 'I like apples. He likes bananas.',
        chinese: '我喜欢苹果。他喜欢香蕉。',
        grammarPoint: 'I like vs He likes',
      },
      {
        english: "I don't like rain. She doesn't like snow.",
        chinese: '我不喜欢雨。她不喜欢雪。',
        grammarPoint: "I don't like vs She doesn't like",
      },
      {
        english: 'Do you play football? Does he play basketball?',
        chinese: '你踢足球吗？他打篮球吗？',
        grammarPoint: 'Do you play vs Does he play',
      },
      {
        english: 'My father goes to work by bus.',
        chinese: '我爸爸坐公交车去上班。',
        grammarPoint: 'goes（第三人称单数加-es）',
      },
      {
        english: 'Does the bird fly south in winter?',
        chinese: '鸟冬天飞往南方吗？',
        grammarPoint: 'Does + the bird + fly（原形）',
      },
      {
        english: "She doesn't know the answer.",
        chinese: '她不知道答案。',
        grammarPoint: "doesn't + know（原形）",
      },
    ],
    extraTips: [
      '口诀总结："I用do/don\'t，he/she用does/doesn\'t；有does在场，动词回原形"',
      '易错提醒：最常犯的错误就是"He doesn\'t likes"——likes的s要脱掉！doesn\'t已经是第三人称了，动词不加s',
      '实战练习：描述你的好朋友的日常习惯，用"He/She likes... He/She doesn\'t like... Does he/she like...?"',
    ],
  },

  // ==================== 第51课：一般现在时（疑问和否定） ====================
  51: {
    explanation:
      '今天我们要彻底搞清楚do和does这对"双胞胎"的使用规则！do和does都是"帮助动词变疑问和否定的助手"，但它们各有分工。do负责第一人称（I）、第二人称（you）和复数（we/they），does负责第三人称单数（he/she/it/人名）。比如"Do you like cats?"（你喜欢猫吗？）→"Does he like cats?"（他喜欢猫吗？）。否定句也是同样：don\'t负责I/you/we/they，doesn\'t负责he/she/it。它们就像两个"管家"，各管各的"房间"。记住一个超级重要的规则：一旦does或doesn\'t出现了，后面的动词就必须回到原形！因为does/doesn\'t已经把第三人称的信息"打包"了，动词不需要再加-s。',
    extraRules: [
      'Do + I/you/we/they + 动词原形? → Do you like music?',
      'Does + he/she/it/人名 + 动词原形? → Does Tom like music?',
      "I/You/We/They + don't + 动词原形 → I don't like spiders.",
      "He/She/It/人名 + doesn't + 动词原形 → She doesn't like spiders.",
      'do/does/don\'t/doesn\'t都是"助动词"，帮助构成疑问和否定，后面永远跟动词原形',
    ],
    extraExamples: [
      {
        english: 'Do you like chocolate?',
        chinese: '你喜欢巧克力吗？',
        grammarPoint: 'Do + you + like?',
      },
      {
        english: 'Does your brother play games?',
        chinese: '你弟弟玩游戏吗？',
        grammarPoint: 'Does + 人名 + play?',
      },
      { english: "I don't eat meat.", chinese: '我不吃肉。', grammarPoint: "I + don't + eat" },
      {
        english: "He doesn't go to school on Sundays.",
        chinese: '他周日不去上学。',
        grammarPoint: "He + doesn't + go",
      },
      {
        english: 'Do they have a pet?',
        chinese: '他们有宠物吗？',
        grammarPoint: 'Do + they + have?',
      },
      {
        english: "My sister doesn't like horror movies.",
        chinese: '我姐姐不喜欢恐怖电影。',
        grammarPoint: "人名 + doesn't + like",
      },
    ],
    extraTips: [
      '记忆口诀："do管I和you和复数，does管he和she和it；有助动词在，动词回原形"',
      '易错提醒：Does he likes? ❌ → Does he like? ✓ 有does的地方动词绝对不能加-s！',
      '趣味知识：Does he...?的缩写在口语中很常见，读作"D\'z he like it?"，听起来很自然！',
    ],
  },

  // ==================== 第52课：复习：一般现在时（疑问和否定）练习 ====================
  52: {
    explanation:
      "今天我们来做一般现在时疑问和否定的综合练习，把do、does、don't、doesn't全部练熟！这是一个需要\"肌肉记忆\"的语法点——看到主语就能判断用do还是does。快速判断法：主语是I、you、we、they或复数名词（the boys, my friends）→用do/don't；主语是he、she、it或单数人名（Tom, my mother）→用does/doesn't。做疑问否定转换时有三个步骤：第一步，判断主语；第二步，选择do/does或don't/doesn't；第三步，把动词回到原形。我们还来练习回答疑问句：Do you...? → Yes, I do. / No, I don't. Does he...? → Yes, he does. / No, he doesn't.回答中的助动词要和问句中的一致！",
    extraRules: [
      "快速判断：I/you/we/they/复数名词 → do/don't；he/she/it/单数人名 → does/doesn't",
      '疑问句结构：Do/Does + 主语 + 动词原形 + 其他？',
      "否定句结构：主语 + don't/doesn't + 动词原形 + 其他",
      "回答问句时，助动词保持一致：Do you...? → Yes, I do. Does he...? → No, he doesn't.",
      'what/where/when + do/does + 主语 + 动词原形：What does your father do?（你爸爸做什么工作？）',
    ],
    extraExamples: [
      {
        english: 'Do your parents work on weekends?',
        chinese: '你父母周末工作吗？',
        grammarPoint: 'Do + 复数名词 + 动词原形？',
      },
      {
        english: "No, they don't. They stay at home.",
        chinese: '不，他们不工作。他们待在家。',
        grammarPoint: "No, they don't.",
      },
      {
        english: 'What does your mother cook for dinner?',
        chinese: '你妈妈晚饭做什么？',
        grammarPoint: 'What does + 人名 + cook?',
      },
      {
        english: 'Where does the train go?',
        chinese: '火车去哪里？',
        grammarPoint: 'Where does + 主语 + go?',
      },
      {
        english: "We don't understand this question.",
        chinese: '我们不理解这个问题。',
        grammarPoint: "We + don't + understand",
      },
      {
        english: "My dog doesn't eat chocolate.",
        chinese: '我的狗不吃巧克力。',
        grammarPoint: "My dog + doesn't + eat",
      },
    ],
    extraTips: [
      '口诀总结："看到主语判do/does，原形是铁律记清楚；疑问回答要一致，do对does不糊涂"',
      '易错提醒：What does he does? ❌ → What does he do? ✓ 有does在，后面的do用原形！',
      '实战练习：用一般现在时写出你家每个人喜欢和不喜欢的东西，注意do/does的正确使用！',
    ],
  },

  // ==================== 第53课：一般现在时（频率副词） ====================
  53: {
    explanation:
      '频率副词就像你生活中的"温度计"，用来衡量一件事发生的频率——从"总是"到"从不"，不同的副词代表不同的"温度"。频率从高到低排列：always（总是，100%）→ usually（通常，80%）→ often（经常，60%）→ sometimes（有时，40%）→ seldom（很少，20%）→ never（从不，0%）。它们在句中的位置很讲究：通常放在be动词后面（He is always happy.），或者放在行为动词前面（I usually get up at seven.）。就像交通标志总是在固定的位置，频率副词也总是在"动词前面"这个固定位置。频率副词是描述日常生活的好帮手，有了它们，你的英语描述会更加生动准确！',
    extraRules: [
      '频率副词的位置：放在行为动词前面（I usually walk to school.），be动词后面（She is always late.）',
      '频率从高到低：always(100%) > usually(80%) > often(60%) > sometimes(40%) > seldom(20%) > never(0%)',
      'sometimes位置比较灵活，可以放在句首、句中或句末',
      'always和never是一对反义词：I always do my homework. / I never do my homework.',
      '频率副词是一般现在时的"标志词"，看到它们就知道用一般现在时',
    ],
    extraExamples: [
      {
        english: 'I always brush my teeth before bed.',
        chinese: '我总是在睡前刷牙。',
        grammarPoint: 'always + 动词原形',
      },
      {
        english: 'She usually takes the bus to school.',
        chinese: '她通常坐公交车上学。',
        grammarPoint: 'usually + 动词原形',
      },
      {
        english: 'We often play basketball after school.',
        chinese: '我们放学后经常打篮球。',
        grammarPoint: 'often + 动词原形',
      },
      {
        english: 'He sometimes forgets his keys.',
        chinese: '他有时忘记带钥匙。',
        grammarPoint: 'sometimes + 动词原形（三单加-s）',
      },
      {
        english: 'My grandma is always kind to us.',
        chinese: '我奶奶对我们总是很和蔼。',
        grammarPoint: 'be动词 + always + 形容词',
      },
      {
        english: 'I never eat junk food.',
        chinese: '我从不吃垃圾食品。',
        grammarPoint: 'never + 动词原形',
      },
    ],
    extraTips: [
      '记忆口诀："always总是100，usually通常80分；often经常60分，sometimes有时40分；seldom很少20分，never从不0分！"',
      '易错提醒：频率副词放在be动词之后，但放在行为动词之前！He is always happy. ✓ He always is happy. ❌',
      '趣味知识：never和always是一对"死对头"，never是0%，always是100%，它们永远站在频率的两端！',
    ],
  },

  // ==================== 第54课：复习：一般现在时（频率副词）练习 ====================
  54: {
    explanation:
      '今天我们来全面练习频率副词的用法和位置。频率副词的"座位规则"是最重要的：如果句子里有be动词（am/is/are），频率副词坐在be动词后面（He is often tired.）；如果句子里是行为动词（play/eat/go等），频率副词坐在行为动词前面（I often play football.）。我们可以用频率副词来回答"How often...?"（多久一次？）的提问。比如"How often do you exercise?"（你多久运动一次？）→"I usually exercise three times a week."（我通常一周运动三次。）频率副词让你的回答更加精确，不再是简单的"yes"或"no"，而是告诉别人"经常""有时"还是"从不"。试着用不同的频率副词来描述你的日常生活！',
    extraRules: [
      'How often...? 用来询问频率（多久一次？）：How often do you read?',
      '回答频率：every day（每天）、once/twice a week（一周一/两次）、three times a month（一月三次）',
      '频率副词 + always/usually/often/sometimes/never → 描述习惯频率',
      'never是always的反义词，never = not...ever（从来不）',
      '频率副词还可以放在句首强调：Sometimes I walk to school.（有时我走路去上学。）',
    ],
    extraExamples: [
      {
        english: 'How often do you go to the library?',
        chinese: '你多久去一次图书馆？',
        grammarPoint: 'How often + do + you + 动词原形？',
      },
      {
        english: 'I usually go there twice a week.',
        chinese: '我通常一周去两次。',
        grammarPoint: 'usually + 动词原形 + 频率',
      },
      {
        english: 'My father always gets up at six.',
        chinese: '我爸爸总是六点起床。',
        grammarPoint: 'always + 动词原形（三单）',
      },
      {
        english: 'We sometimes have pizza for dinner.',
        chinese: '我们有时晚饭吃披萨。',
        grammarPoint: 'sometimes + 动词原形',
      },
      {
        english: 'She is never late for school.',
        chinese: '她上学从不迟到。',
        grammarPoint: 'be动词 + never + 形容词',
      },
      {
        english: 'Do you often visit your grandparents?',
        chinese: '你经常看望你的祖父母吗？',
        grammarPoint: 'Do you + often + 动词原形？',
      },
    ],
    extraTips: [
      '口诀复习："be动词后行为前，频率副词坐中间；How often问频率，every day/week来回答"',
      '易错提醒：频率副词放在行为动词前面，但放在be动词后面，这是两套不同的位置规则！',
      '实战练习：做一个"我的日常频率表"，用不同的频率副词描述你每天做的事情！',
    ],
  },

  // ==================== 第55课：一般现在时（习惯性动作） ====================
  55: {
    explanation:
      '一般现在时最重要的用途之一就是描述"习惯性动作"——你每天、每周、经常做的事情。它就像一部"生活纪录片"，忠实记录着你的日常作息和生活习惯。比如"What do they usually do on weekends?"（他们周末通常做什么？）→"They usually go to the park."（他们通常去公园。）当你描述日常生活时，用一般现在时就对了：早上起床（I get up at seven.）、刷牙洗脸（I brush my teeth.）、吃早餐（I have breakfast.）、去上学（I go to school.）。这些都是每天重复发生的习惯动作。一般现在时配合频率副词（always, usually, often, sometimes, never）和时间状语（every day, every morning, on Mondays），能让你的日常描述更加丰富多彩！',
    extraRules: [
      '一般现在时描述习惯性动作：I play the piano every day.（我每天弹钢琴。）',
      '时间状语配合使用：every day（每天）、every morning（每天早上）、on weekends（在周末）',
      'What do you usually do...? 你通常做什么？（问习惯性动作）',
      '描述日常生活用一般现在时：get up → wash face → have breakfast → go to school',
      '注意第三人称单数：He gets up at seven. She goes to school by bus.',
    ],
    extraExamples: [
      {
        english: 'What do they usually do on weekends?',
        chinese: '他们周末通常做什么？',
        grammarPoint: 'What do they usually do?',
      },
      {
        english: 'They usually go to the park and play.',
        chinese: '他们通常去公园玩。',
        grammarPoint: 'usually + 动词原形 + and + 动词原形',
      },
      {
        english: 'I have breakfast at seven every morning.',
        chinese: '我每天早上七点吃早餐。',
        grammarPoint: '主语 + 动词原形 + 时间',
      },
      {
        english: 'My mom always cooks dinner for us.',
        chinese: '我妈妈总是为我们做晚饭。',
        grammarPoint: 'always + 动词原形（三单）',
      },
      {
        english: 'We do our homework after school.',
        chinese: '我们放学后做作业。',
        grammarPoint: '主语 + 动词原形 + 时间状语',
      },
      {
        english: 'He goes to bed at nine every night.',
        chinese: '他每天晚上九点上床睡觉。',
        grammarPoint: 'He + goes（三单） + 时间',
      },
    ],
    extraTips: [
      '记忆口诀："一般现在表习惯，天天重复是关键；every day是信号，频率副词放中间"',
      '易错提醒：描述习惯动作时不要用现在进行时！不能说"I am getting up at seven every day"，要说"I get up at seven every day"',
      '趣味练习：写一份"我的一天"（My Day），从早上起床到晚上睡觉，用一般现在时描述你做的每件事！',
    ],
  },

  // ==================== 第56课：复习：一般现在时（习惯性动作）练习 ====================
  56: {
    explanation:
      '今天我们来综合练习用一般现在时描述习惯性动作。一般现在时就像你的"生活作息表"，帮别人了解你和你家人的日常习惯。我们可以从三个角度来练习：第一，描述自己的日常（I usually get up at seven.）；第二，描述别人的日常（My sister goes to school by bus.）；第三，问别人的日常（What does your father do on weekends?）。注意当描述第三人称（他/她/它）的日常时，动词要加-s或-es，否定句和疑问句要用does/doesn\'t。描述日常生活时，时间状语非常重要：every day, every morning, on weekdays, after school, before bed, at night等。试着把这些时间状语放进句子里，让你的描述更加具体和生动！',
    extraRules: [
      '描述自己的日常：I usually + 动词原形 + 时间状语',
      '描述别人的日常：He/She + 动词三单 + 时间状语',
      '询问日常：What do/does + 主语 + usually do + 时间状语？',
      '常用时间状语：every day, every morning, on weekends, after school, at night, before bed',
      '一天的顺序描述：First... Then... After that... Finally...',
    ],
    extraExamples: [
      {
        english: 'I usually get up at seven and have breakfast at seven thirty.',
        chinese: '我通常七点起床，七点半吃早餐。',
        grammarPoint: 'usually + 动词原形 + and + 动词原形',
      },
      {
        english: 'What does your father do after work?',
        chinese: '你爸爸下班后做什么？',
        grammarPoint: 'What does + 主语 + do?',
      },
      {
        english: 'He usually reads newspapers and watches TV.',
        chinese: '他通常看报纸和看电视。',
        grammarPoint: 'He + usually + reads + and + watches',
      },
      {
        english: 'My sister never eats breakfast.',
        chinese: '我姐姐从不吃早餐。',
        grammarPoint: 'never + eats（三单）',
      },
      {
        english: 'Do you do sports every day?',
        chinese: '你每天运动吗？',
        grammarPoint: 'Do you + do + sports?',
      },
      {
        english: 'On Sundays, we often visit our grandparents.',
        chinese: '周日我们经常看望祖父母。',
        grammarPoint: 'On Sundays + we + often + visit',
      },
    ],
    extraTips: [
      '口诀复习："习惯动作用现在，三单变化不要忘；时间状语来帮忙，every day放句尾或中央"',
      '易错提醒：描述日常习惯时，句中如果有频率副词，第三人称单数的动词仍然要加-s！He always plays... ✓',
      '实战练习：采访一位家人，了解他/她的日常习惯，然后用英语写5句话描述出来！',
    ],
  },

  // ==================== 第57课：一般现在时 vs 现在进行时 ====================
  57: {
    explanation:
      '一般现在时和现在进行时就像"日记"和"直播"的区别！一般现在时是"日记"，记录的是经常发生的、习惯性的动作，比如"I play football every day"（我每天踢足球）。现在进行时是"直播"，描述的是此刻正在发生的动作，比如"I am playing football now"（我现在正在踢足球）。想象一下：你的朋友打电话问你在干嘛，你说"I am doing my homework"（我正在做作业）——这是直播，用现在进行时。然后他又问你平时几点做作业，你说"I usually do my homework at six"（我通常六点做作业）——这是日记，用一般现在时。两个时态的本质区别就是：一般现在时 = 习惯/事实，现在进行时 = 此刻正在做。别搞混了哦！',
    extraRules: [
      '一般现在时：习惯性动作/事实 → I play football every day.（我每天踢足球。）',
      '现在进行时：此刻正在做 → I am playing football now.（我现在正在踢足球。）',
      '一般现在时标志词：every day, always, usually, often, sometimes, never',
      '现在进行时标志词：now, right now, at the moment, Look!, Listen!',
      '一般现在时：主语 + 动词原形（三单加-s）；现在进行时：主语 + am/is/are + 动词-ing',
    ],
    extraExamples: [
      {
        english: 'I read books every day.',
        chinese: '我每天读书。（习惯）',
        grammarPoint: '一般现在时：every day',
      },
      {
        english: 'I am reading a book now.',
        chinese: '我现在正在读书。（此刻）',
        grammarPoint: '现在进行时：now',
      },
      {
        english: 'She usually watches TV in the evening.',
        chinese: '她通常晚上看电视。（习惯）',
        grammarPoint: '一般现在时：usually',
      },
      {
        english: 'Look! She is watching TV.',
        chinese: '看！她正在看电视。（此刻）',
        grammarPoint: '现在进行时：Look!',
      },
      {
        english: 'He plays basketball every weekend.',
        chinese: '他每个周末打篮球。（习惯）',
        grammarPoint: '一般现在时：every weekend',
      },
      {
        english: 'Listen! He is playing the piano.',
        chinese: '听！他正在弹钢琴。（此刻）',
        grammarPoint: '现在进行时：Listen!',
      },
    ],
    extraTips: [
      '记忆口诀："一般现在是日记，习惯事实记心里；现在进行是直播，此刻正在做什么"',
      '易错提醒：always有时也可以用在现在进行时中，表示"总是做某事"（带抱怨语气）：He is always talking!（他总是说个不停！）',
      '趣味知识：英语中有少数动词（如like, know, want, love）表示状态而非动作，一般不用现在进行时，直接用一般现在时！',
    ],
  },

  // ==================== 第58课：复习：一般现在时 vs 现在进行时练习 ====================
  58: {
    explanation:
      '今天我们来做一般现在时和现在进行时的综合对比练习。这两个时态的区分是英语学习中最重要的技能之一，考试必考！关键判断方法：看"时间信号"。如果句中有every day, always, usually, often, sometimes, never, on weekends等词，用一般现在时。如果句中有now, right now, at the moment, Look!, Listen!等词，用现在进行时。如果没有明显信号词，就看语境：是描述"习惯"还是"此刻正在做"？比如"Tom _____ (eat) lunch."如果语境是"Tom每天十二点吃午饭"→一般现在时（eats）；如果语境是"别打扰Tom，他正在吃午饭"→现在进行时（is eating）。做题时，先找信号词，再看语境，最后选择正确的时态！',
    extraRules: [
      '有every day/always/usually/often → 一般现在时',
      '有now/right now/Look!/Listen! → 现在进行时',
      '描述习惯/规律/事实 → 一般现在时',
      '描述正在进行/此刻的动作 → 现在进行时',
      '第三人称单数在一般现在时加-s，在现在进行时用is + doing',
    ],
    extraExamples: [
      {
        english: 'She _____ (drink) water every morning. → She drinks water every morning.',
        chinese: '她每天早上喝水。（一般现在时）',
        grammarPoint: 'every morning → 一般现在时',
      },
      {
        english: 'Look! She _____ (drink) water now. → Look! She is drinking water now.',
        chinese: '看！她正在喝水。（现在进行时）',
        grammarPoint: 'Look! + now → 现在进行时',
      },
      {
        english:
          'My father _____ (read) newspapers every day. → My father reads newspapers every day.',
        chinese: '我爸爸每天看报纸。（一般现在时）',
        grammarPoint: 'every day → 一般现在时',
      },
      {
        english: 'Be quiet! The baby _____ (sleep). → The baby is sleeping.',
        chinese: '安静！宝宝在睡觉。（现在进行时）',
        grammarPoint: '语境提示 → 现在进行时',
      },
      {
        english: 'They usually _____ (go) to school by bus. → They usually go to school by bus.',
        chinese: '他们通常坐公交车上学。（一般现在时）',
        grammarPoint: 'usually → 一般现在时',
      },
      {
        english: "Don't make noise. I _____ (study). → I am studying.",
        chinese: '别制造噪音。我在学习。（现在进行时）',
        grammarPoint: '语境提示 → 现在进行时',
      },
    ],
    extraTips: [
      '口诀总结："日记一般现在时，every day是标记；直播现在进行时，now和Look!要留意"',
      '易错提醒：动词变-ing时要注意规则！make→making（去e），run→running（双写），不要写错！',
      '实战练习：写两组句子对比——先写3个描述习惯的一般现在时句子，再写3个描述此刻动作的现在进行时句子！',
    ],
  },

  // ==================== 第59课：some 和 any ====================
  59: {
    explanation:
      'some和any是一对"分工明确的好兄弟"，它们都表示"一些"，但各自负责不同的场合。some是个"阳光男孩"，专门出现在肯定句中，比如"I have some apples"（我有一些苹果）。any是个"好奇宝宝"，专门出现在否定句和疑问句中，比如"Do you have any apples?"（你有苹果吗？）和"I don\'t have any apples"（我没有苹果）。就像你上学带东西，带了的时候说"I have some books"（肯定），没带的时候说"I don\'t have any books"（否定），问别人有没有时说"Do you have any books?"（疑问）。不过any也有特殊用法：当你想表达"任何一个"时，可以用在肯定句中，比如"You can choose any book"（你可以选任何一本书）。some和any都可以修饰可数名词复数和不可数名词！',
    extraRules: [
      'some用在肯定句中：I have some pens.（我有一些笔。）There is some milk.（有一些牛奶。）',
      "any用在否定句中：I don't have any pens.（我没有笔。）There isn't any milk.（没有牛奶。）",
      'any用在疑问句中：Do you have any pens?（你有笔吗？）Is there any milk?（有牛奶吗？）',
      '特殊情况：请求和建议时疑问句用some（表示希望得到肯定回答）：Would you like some tea?（你要来点茶吗？）',
      'any在肯定句中表示"任何一个"：Any student can answer this question.（任何学生都可以回答这个问题。）',
    ],
    extraExamples: [
      {
        english: 'I have some crayons in my bag.',
        chinese: '我书包里有一些蜡笔。',
        grammarPoint: 'some + 可数名词复数（肯定句）',
      },
      {
        english: "There isn't any juice in the glass.",
        chinese: '杯子里没有果汁了。',
        grammarPoint: 'any + 不可数名词（否定句）',
      },
      {
        english: 'Do you have any homework today?',
        chinese: '你今天有作业吗？',
        grammarPoint: 'any + 不可数名词（疑问句）',
      },
      {
        english: 'Would you like some cake?',
        chinese: '你想要一些蛋糕吗？',
        grammarPoint: 'some（请求/建议用some）',
      },
      {
        english: "She doesn't have any friends in this school.",
        chinese: '她在这所学校没有朋友。',
        grammarPoint: 'any + 可数名词复数（否定句）',
      },
      {
        english: 'We have some free time this afternoon.',
        chinese: '我们今天下午有一些空闲时间。',
        grammarPoint: 'some + 不可数名词（肯定句）',
      },
    ],
    extraTips: [
      '记忆口诀："some在肯定笑嘻嘻，any在否定和疑问里；请求建议用some，语气礼貌又甜蜜"',
      '易错提醒：Would you like some...?是固定用法，虽然是疑问句但用some不用any，因为这是礼貌邀请！',
      '趣味知识：any在肯定句中表示"任何一个"时，语气很强，比如"Any time is OK"（任何时候都行），表示"随便哪个都可以"',
    ],
  },

  // ==================== 第60课：复习：some 和 any 练习 ====================
  60: {
    explanation:
      '今天我们来做some和any的综合练习，把这对好兄弟的用法彻底掌握！some和any的核心规则就三条：肯定句用some，否定句用any，疑问句用any。但有两个例外要注意：第一，表示请求或建议的疑问句用some（Would you like some tea?）；第二，any在肯定句中表示"任何一个"（You can take any seat.）。some和any都可以搭配可数名词复数（some books, any books）和不可数名词（some water, any water）。做题时，先判断句子是肯定、否定还是疑问，然后选择some或any。记住特殊情况：以"Would you like...?"和"Can I have...?"开头的请求句，虽然形式上是疑问句，但习惯上用some！',
    extraRules: [
      '肯定句用some：There are some flowers in the garden.',
      "否定句用any：There aren't any flowers in the garden.",
      '疑问句用any：Are there any flowers in the garden?',
      '请求/建议的疑问句用some：Would you like some water? / Can I have some bread?',
      'some/any + 可数名词复数或不可数名词：some apples / some milk / any books / any water',
    ],
    extraExamples: [
      {
        english: 'There are some children playing in the park.',
        chinese: '公园里有一些孩子在玩。',
        grammarPoint: 'some + 可数名词复数（肯定句）',
      },
      {
        english: 'Is there any sugar in my coffee?',
        chinese: '我的咖啡里有糖吗？',
        grammarPoint: 'any + 不可数名词（疑问句）',
      },
      {
        english: "We don't have any bread for breakfast.",
        chinese: '我们早餐没有面包了。',
        grammarPoint: 'any + 不可数名词（否定句）',
      },
      {
        english: 'Can I have some water, please?',
        chinese: '请给我一些水好吗？',
        grammarPoint: 'some（请求句）',
      },
      {
        english: "There aren't any students in the classroom.",
        chinese: '教室里没有学生。',
        grammarPoint: 'any + 可数名词复数（否定句）',
      },
      {
        english: 'I have some good news for you.',
        chinese: '我有一些好消息要告诉你。',
        grammarPoint: 'some + 不可数名词（肯定句）',
      },
    ],
    extraTips: [
      '口诀总结："肯定some，否定疑问any；请求建议特殊记，some出现在疑问句里"',
      '易错提醒：some用在疑问句中仅限于"请求/建议"场景！一般的疑问句还是用any：Do you have any questions?',
      '实战练习：写一段话描述你的房间，用3个some的肯定句、2个any的否定句和2个any的疑问句！',
    ],
  },
};

export default batch2;
