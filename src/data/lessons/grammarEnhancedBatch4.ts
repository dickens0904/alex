const batch4: Record<
  number,
  {
    explanation: string;
    extraRules: string[];
    extraExamples: { english: string; chinese: string; grammarPoint: string }[];
    extraTips: string[];
  }
> = {
  // ==================== 主题81: 一般过去时(更多动词) ====================
  81: {
    explanation:
      '今天我们继续认识更多动词的过去式！英语中有两大家族：规则动词和不规则动词。规则动词像听话的学生，直接加-ed就能变成过去式，比如walk→walked、help→helped。不规则动词则像有个性的艺术家，每个都有自己独特的"变身术"：teach→taught、bring→brought、think→thought、buy→bought、catch→caught。记住这些"明星动词"非常重要，因为它们在日常对话中出现频率特别高。比如你想说"我昨天买了一本书"就要用bought而不是buyed；"老师教了我们一首歌"要用taught而不是teached。把这些不规则动词当成你的"词汇好伙伴"，多读多用，很快就能和它们成为好朋友！',
    extraRules: [
      '常见不规则动词：buy→bought（买）, teach→taught（教）, think→thought（想）, bring→brought（带来）, catch→caught（抓住）',
      '更多不规则动词：fight→fought（打架/战斗）, seek→sought（寻找）, build→built（建造）, lend→lent（借出）, spend→spent（花费）',
      "不规则动词过去式的否定和疑问都用didn't/did + 动词原形",
      '过去时间标志词：yesterday, last night/week, ... ago, just now, in 2024, this morning',
      '区分规则和不规则：加-ed后读起来别扭的通常就是不规则动词，如buyed❌ → bought✓',
    ],
    extraExamples: [
      {
        english: 'I bought a birthday present for my friend.',
        chinese: '我给朋友买了一份生日礼物。',
        grammarPoint: 'buy→bought 不规则动词过去式',
      },
      {
        english: 'My teacher taught us how to draw a cat.',
        chinese: '老师教了我们怎么画猫。',
        grammarPoint: 'teach→taught 不规则动词过去式',
      },
      {
        english: 'She thought the story was very funny.',
        chinese: '她觉得那个故事很有趣。',
        grammarPoint: 'think→thought 不规则动词过去式',
      },
      {
        english: 'He brought his dog to school yesterday.',
        chinese: '他昨天把狗带到了学校。',
        grammarPoint: 'bring→brought 不规则动词过去式',
      },
      {
        english: 'We spent the whole afternoon in the library.',
        chinese: '我们整个下午都在图书馆。',
        grammarPoint: 'spend→spent 不规则动词过去式',
      },
      {
        english: 'The cat caught a mouse in the garden.',
        chinese: '那只猫在花园里抓到了一只老鼠。',
        grammarPoint: 'catch→caught 不规则动词过去式',
      },
    ],
    extraTips: [
      '记忆窍门：把发音相似的不规则动词放在一起背——buy-bought, bring-brought, think-thought, teach-taught，它们的过去式都是-ought或-aught结尾！',
      '每天花5分钟用"过电影"的方式回忆：今天我做了什么？用过去时说出来—I woke up, brushed my teeth, ate breakfast, went to school...',
      '做题时如果不确定是规则还是不规则，先试着加-ed读一下，如果听起来奇怪（如goed, buyed），那多半就是不规则动词！',
    ],
  },

  // ==================== 主题82: 复习：一般过去时(更多动词)练习 ====================
  82: {
    explanation:
      '今天我们来全面复习一般过去时的各种动词变化！一般过去时就像一本"回忆录"，帮我们讲述过去发生的故事。规则动词的变化像穿制服一样整齐——直接加-ed（worked, played, watched），以e结尾加-d（liked, lived），辅音+y变ied（studied, carried），重读闭音节双写加-ed（stopped, planned）。不规则动词则需要一个个记住：go→went, see→saw, eat→ate, buy→bought, teach→taught, think→thought, bring→brought, catch→caught, make→made, have→had。不管用哪种过去式，否定句和疑问句都要用didn\'t/did加上动词原形。这是铁律：一个句子里只留一个"过去标志"，did已经代表过去了，动词就要回到原形！',
    extraRules: [
      '规则动词四种变化：加-ed、加-d、变y为i加-ed、双写末字母加-ed',
      '不规则动词需记忆：go→went, see→saw, eat→ate, buy→bought, teach→taught, make→made',
      "否定句：主语 + didn't + 动词原形，如：She didn't go.",
      '疑问句：Did + 主语 + 动词原形？如：Did you see it?',
      'be动词过去式：I/he/she/it → was，you/we/they → were',
    ],
    extraExamples: [
      {
        english: 'I caught the ball and threw it back.',
        chinese: '我接住了球，然后把它扔了回去。',
        grammarPoint: 'catch→caught, throw→threw 不规则动词',
      },
      {
        english: 'She built a sandcastle at the beach.',
        chinese: '她在沙滩上堆了一座沙堡。',
        grammarPoint: 'build→built 不规则动词过去式',
      },
      {
        english: 'Did you lend your pen to Tom?',
        chinese: '你把笔借给汤姆了吗？',
        grammarPoint: 'Did + 主语 + 动词原形 疑问句',
      },
      {
        english: 'The children fought over the toy.',
        chinese: '孩子们为那个玩具争吵了。',
        grammarPoint: 'fight→fought 不规则动词过去式',
      },
      {
        english: "We didn't spend much money at the shop.",
        chinese: '我们在商店没花多少钱。',
        grammarPoint: "didn't + spend 否定句",
      },
      {
        english: 'My dad taught me how to ride a bike.',
        chinese: '我爸爸教了我怎么骑自行车。',
        grammarPoint: 'teach→taught 不规则动词过去式',
      },
    ],
    extraTips: [
      '把不规则动词编成顺口溜：teach-taught教得好，buy-bought买的妙，think-thought想到它，bring-brought带到了！',
      "做选择题的秘诀：看到yesterday, last week, ago就用过去时；看到didn't或Did就用动词原形。",
      '每天写三句"昨天日记"来练习：Yesterday I... 连续写一周，过去时就成你的"老朋友"了！',
    ],
  },

  // ==================== 主题83: 现在完成时(一) ====================
  83: {
    explanation:
      '今天我们来认识一个全新的时态——现在完成时！它的"配方"是have/has + 过去分词。过去分词是什么呢？规则动词的过去分词和过去式一样，都是加-ed，比如play→played→played。不规则动词的过去分词则需要单独记忆，比如go→went→gone, eat→ate→eaten, see→saw→seen, do→did→done。现在完成时表示"已经完成的动作对现在有影响"。想象一下：你对妈妈说"I have finished my homework."（我已经做完作业了。）言下之意是——我现在可以去玩了！再比如"He has lost his key."（他把钥匙弄丢了。）结果就是他现在进不了门。这种"做了某事，所以现在怎么样了"的感觉，就是现在完成时的灵魂！he/she/it用has，其他人称用have。',
    extraRules: [
      '肯定句：主语 + have/has + 过去分词，如：I have cleaned my room.',
      "否定句：主语 + haven't/hasn't + 过去分词，如：She hasn't finished yet.",
      '疑问句：Have/Has + 主语 + 过去分词？如：Have you eaten lunch?',
      '常见不规则过去分词：go→gone, do→done, see→seen, eat→eaten, write→written, take→taken',
      '现在完成时不能和明确的过去时间连用，如不能说I have finished yesterday.',
    ],
    extraExamples: [
      {
        english: 'I have already done my homework.',
        chinese: '我已经做完作业了。',
        grammarPoint: 'have + done 现在完成时',
      },
      {
        english: 'She has visited the zoo three times.',
        chinese: '她已经去过动物园三次了。',
        grammarPoint: 'has + visited 第三人称单数',
      },
      {
        english: 'Have you finished your lunch?',
        chinese: '你吃完午饭了吗？',
        grammarPoint: 'Have + 主语 + 过去分词 疑问句',
      },
      {
        english: "We haven't seen that movie yet.",
        chinese: '我们还没看过那部电影。',
        grammarPoint: "haven't + seen 否定句",
      },
      {
        english: 'He has lost his pencil box.',
        chinese: '他把铅笔盒弄丢了。（所以现在没有铅笔盒用）',
        grammarPoint: 'has + lost 表示对现在的影响',
      },
      {
        english: 'They have just arrived at the park.',
        chinese: '他们刚到公园。',
        grammarPoint: 'have + arrived 与just搭配',
      },
    ],
    extraTips: [
      '区分现在完成时和一般过去时的秘诀：现在完成时强调"对现在的影响"，一般过去时只说过去的事。I lost my key.（陈述事实）vs I have lost my key.（所以现在进不了家门！）',
      '记住最常用的不规则过去分词：done, gone, been, seen, written, eaten, taken, given, made。每天读一遍，三天就能记住！',
      'have还是has？口诀："三单用has，其余用have"——he/she/it用has，I/you/we/they用have。',
    ],
  },

  // ==================== 主题84: 复习：现在完成时(一)练习 ====================
  84: {
    explanation:
      '我们来复习现在完成时的基础知识！现在完成时的公式是have/has + 过去分词，表示"已经完成的动作对现在有影响"。比如"I have lost my pen."（我把笔弄丢了。）——结果是现在没笔用。"She has eaten all the cookies."（她把饼干全吃完了。）——结果是现在没饼干吃了。注意过去分词的写法：规则动词加-ed（played, cleaned, watched），不规则动词要特别记忆（gone, done, seen, eaten, written）。he/she/it用has，其他用have。否定句：haven\'t/hasn\'t + 过去分词。疑问句：Have/Has + 主语 + 过去分词？现在完成时有一个大忌：不能和yesterday, last week, ago等明确的过去时间连用，这些时间词只能搭配一般过去时！',
    extraRules: [
      '肯定句：I/You/We/They have + 过去分词；He/She/It has + 过去分词',
      "否定句：主语 + haven't/hasn't + 过去分词，如：I haven't read this book.",
      "疑问句及简略回答：Has she gone? Yes, she has. / No, she hasn't.",
      '区分过去式和过去分词：有些相同（cut-cut-cut），有些不同（go-went-gone, eat-ate-eaten）',
      '现在完成时不能和明确的过去时间连用：不能说I have gone yesterday.',
    ],
    extraExamples: [
      {
        english: 'Tom has broken his toy plane.',
        chinese: '汤姆把他的玩具飞机弄坏了。',
        grammarPoint: 'has + broken 现在完成时',
      },
      {
        english: 'Have you ever been to the Great Wall?',
        chinese: '你去过长城吗？',
        grammarPoint: 'Have + 主语 + been 疑问句',
      },
      {
        english: 'I have read this book three times.',
        chinese: '这本书我已经读了三遍了。',
        grammarPoint: 'have + read 表示经历',
      },
      {
        english: "She hasn't written her name yet.",
        chinese: '她还没写她的名字。',
        grammarPoint: "hasn't + written 否定句",
      },
      {
        english: 'We have just finished the math test.',
        chinese: '我们刚结束了数学考试。',
        grammarPoint: 'have + finished 与just搭配',
      },
      {
        english: 'My father has gone to the office.',
        chinese: '我爸爸去办公室了。（人不在这儿）',
        grammarPoint: 'has gone to 表示去了还没回',
      },
    ],
    extraTips: [
      '遇到has/have填空题，先看主语：he/she/it选has，I/you/we/they选have。',
      '做选择题时，如果看到already, yet, just, ever, never这些词，大概率是现在完成时的"信号"。',
      '把容易混淆的动词整理成表格，列出三栏：原形、过去式、过去分词，对比记忆效果最好！',
    ],
  },

  // ==================== 主题85: 现在完成时(二) ====================
  85: {
    explanation:
      '今天我们来认识现在完成时的五个"好搭档"副词！already（已经）和just（刚刚）喜欢待在肯定句里，放在have/has后面、过去分词前面。yet（还/尚未）喜欢待在否定句和疑问句的句末。ever（曾经）专门出现在疑问句里，问"你有没有经历过"。never（从未）虽然待在肯定句里，但表达的是否定含义。比如："I have already eaten."（我已经吃了。）"She has just left."（她刚刚离开。）"I haven\'t finished yet."（我还没完成。）"Have you ever flown a kite?"（你放过风筝吗？）"I have never seen a whale."（我从没见过鲸鱼。）这五个副词就像五种调味料，让现在完成时的句子味道更丰富！',
    extraRules: [
      'already（已经）：用于肯定句，放在have/has之后、过去分词之前，也可放句末加强语气',
      'yet（还/尚未）：用于否定句和疑问句，总是放在句末',
      'just（刚刚）：用于肯定句，放在have/has之后、过去分词之前',
      'ever（曾经）：用于疑问句，如Have you ever been to...?',
      'never（从未）：用于肯定句形式但表否定含义，放在have/has之后',
    ],
    extraExamples: [
      {
        english: 'I have already finished reading the book.',
        chinese: '我已经读完那本书了。',
        grammarPoint: 'already用于肯定句',
      },
      {
        english: 'Have you cleaned your room yet?',
        chinese: '你打扫房间了吗？',
        grammarPoint: 'yet用于疑问句',
      },
      {
        english: "She hasn't come back from school yet.",
        chinese: '她还没从学校回来。',
        grammarPoint: 'yet用于否定句',
      },
      {
        english: 'He has just gone out to play.',
        chinese: '他刚刚出去玩了。',
        grammarPoint: 'just表示刚刚发生',
      },
      {
        english: 'Have you ever tried Chinese noodles?',
        chinese: '你吃过中国面条吗？',
        grammarPoint: 'ever用于疑问句询问经历',
      },
      {
        english: 'I have never been late for class.',
        chinese: '我上课从没迟到过。',
        grammarPoint: 'never表示从未',
      },
    ],
    extraTips: [
      '记口诀："already肯定中间站，yet否定末尾看，just刚到have后面，ever疑问找答案，never否定反着看。"',
      'already也可以放在句末：I have finished already.（我已经完成了嘛！）比放中间语气更强烈。',
      '做题速判法：看到yet就想否定句或疑问句，看到already和just就想肯定句，又快又准！',
    ],
  },

  // ==================== 主题86: 复习：现在完成时(二)练习 ====================
  86: {
    explanation:
      '我们来复习现在完成时和副词的搭配！这五个副词各有"地盘"：already和just住在肯定句里，位置在have/has后面、过去分词前面；yet住在否定句和疑问句的末尾；ever专门出现在疑问句中问"有没有经历过"；never住在肯定句中但表示"从来没有"。做题时的判断方法：先看句子是肯定、否定还是疑问，再选合适的副词。比如"Have you ___ been to the zoo?"应该填ever（你去过动物园吗？）；"I haven\'t done it ___."应该填yet（我还没做。）；"She has ___ left."可以填already或just（她已经/刚刚离开了。）。掌握这五个副词的用法，你的现在完成时就算"毕业"了一大半！',
    extraRules: [
      'already用于肯定句，位置：have/has之后、过去分词之前，也可放句末',
      "yet用于否定句（haven't...yet）和疑问句（Have you...yet?），放句末",
      'just用于肯定句，位置同already，强调"刚刚发生"',
      'ever常用于Have you ever...?句型，询问人生经历',
      'never用于肯定句形式表否定含义，位置同already和just',
    ],
    extraExamples: [
      {
        english: 'Have you ever seen a shooting star?',
        chinese: '你见过流星吗？',
        grammarPoint: 'ever用于疑问句询问经历',
      },
      {
        english: 'I have already drunk two cups of water.',
        chinese: '我已经喝了两杯水了。',
        grammarPoint: 'already用于肯定句',
      },
      {
        english: "He hasn't replied to my message yet.",
        chinese: '他还没回复我的消息。',
        grammarPoint: 'yet用于否定句',
      },
      {
        english: 'We have just had a music lesson.',
        chinese: '我们刚上完一节音乐课。',
        grammarPoint: 'just表示刚刚',
      },
      {
        english: 'She has never traveled by plane.',
        chinese: '她从没坐过飞机。',
        grammarPoint: 'never表示从未',
      },
      {
        english: 'Have you done your homework yet?',
        chinese: '你做作业了吗？',
        grammarPoint: 'yet用于疑问句',
      },
    ],
    extraTips: [
      '做完题目大声读出来，如果听起来别扭，副词可能放错了位置。英语语感就是这样练出来的！',
      '试着用五个副词各造一个关于自己的句子：I have already read 10 books. I have never been to Hainan. I have just had lunch.',
      '特别注意：never和already都放在肯定句中，但意思完全相反——never = 从未，already = 已经。',
    ],
  },

  // ==================== 主题87: 现在完成时(三) ====================
  87: {
    explanation:
      '今天我们学习现在完成时和for、since这对"时间搭档"！当我们想说"做某事持续了多久"时，就需要它们帮忙。for后面跟一段时间，比如for two years（两年了）、for three hours（三个小时）；since后面跟一个时间点，比如since 2020（自从2020年以来）、since last Monday（从上周一开始）。打个比方：for就像丈量你跑了多远——"我跑了三公里"；since就像标记你从哪里出发——"我从学校出发"。两者都表示从过去一直持续到现在的动作或状态。比如"I have lived here for five years."（我在这里住了五年了。）"She has studied English since 2022."（她从2022年起就学英语了。）提问持续时间用"How long...?"',
    extraRules: [
      'for + 一段时间：for two days, for a week, for three months, for many years',
      'since + 过去的时间点：since Monday, since 2020, since last year, since I was ten',
      'for和since都和现在完成时连用，表示从过去持续到现在的动作或状态',
      '与for/since连用的动词通常是延续性动词：live, work, study, know, have, like等',
      '提问用How long：How long have you studied English? — For three years.',
    ],
    extraExamples: [
      {
        english: 'I have studied at this school for three years.',
        chinese: '我在这所学校学习三年了。',
        grammarPoint: 'for + 一段时间',
      },
      {
        english: 'She has lived in Shanghai since 2020.',
        chinese: '她从2020年起就住在上海了。',
        grammarPoint: 'since + 过去时间点',
      },
      {
        english: 'How long have you known Tom?',
        chinese: '你认识汤姆多久了？',
        grammarPoint: 'How long 提问持续时间',
      },
      {
        english: 'We have been friends since we were five.',
        chinese: '我们从五岁起就是朋友了。',
        grammarPoint: 'since + 从句',
      },
      {
        english: 'He has had this toy for two months.',
        chinese: '他拥有这个玩具两个月了。',
        grammarPoint: 'have代替buy表延续',
      },
      {
        english: 'My mom has worked at the hospital for ten years.',
        chinese: '我妈妈在医院工作十年了。',
        grammarPoint: 'for + 一段时间',
      },
    ],
    extraTips: [
      '快速判断for和since：后面跟数字+时间单位（three days, two years）→用for；后面跟具体时间点或从句（2020, last week, I was young）→用since。',
      '短暂性动词不能直接和for/since搭配！要变成延续性动词：buy→have, borrow→keep, join→be in, die→be dead。如不能说He has died for two years.',
      '用How long...?提问时间段是考试高频考点。造句练习：How long have you lived here? For three years.',
    ],
  },

  // ==================== 主题88: 复习：现在完成时(三)练习 ====================
  88: {
    explanation:
      '我们来复习for和since的用法！for后面跟一段时间（for three days, for a long time），since后面跟一个时间点（since Monday, since 2020）。它们都和现在完成时搭配，表示从过去持续到现在的动作或状态。做题关键：看后面跟的是"时间段"还是"时间点"。还有一个重要考点——短暂性动词要变成延续性动词才能和for/since搭配。比如"我买这本书三天了"不能说I have bought this book for three days. 而要说I have had this book for three days. 因为buy是一瞬间的动作——你付钱的那一刻就完成了，但have才能持续表示"拥有"。就像拍照只需一秒钟，但你可以拥有这张照片很长时间！',
    extraRules: [
      'for + 时间段：for two hours, for a week, for five years, for a long time',
      "since + 时间点：since 9 o'clock, since yesterday, since last year, since I came here",
      '短暂性动词变延续性动词：buy→have, borrow→keep, come→be here, go→be away, begin→be on, die→be dead, join→be in',
      'How long引导的问句常与现在完成时和for/since搭配',
      '现在完成时 + for/since 表示的动作一直持续到现在或刚刚停止',
    ],
    extraExamples: [
      {
        english: 'I have kept this book for two weeks.',
        chinese: '这本书我借了两周了。',
        grammarPoint: 'keep代替borrow',
      },
      {
        english: 'She has been a teacher since she graduated.',
        chinese: '她毕业后就一直当老师。',
        grammarPoint: 'since + 从句',
      },
      {
        english: 'How long have you had this computer?',
        chinese: '这台电脑你用了多久了？',
        grammarPoint: 'How long + 现在完成时',
      },
      {
        english: 'The movie has been on for twenty minutes.',
        chinese: '电影已经放映二十分钟了。',
        grammarPoint: 'be on代替begin',
      },
      {
        english: 'He has been away from home since last Monday.',
        chinese: '他从上周一就离开家了。',
        grammarPoint: 'be away代替go',
      },
      {
        english: 'My grandma has been dead for five years.',
        chinese: '我奶奶去世五年了。',
        grammarPoint: 'be dead代替die',
      },
    ],
    extraTips: [
      '做题口诀：后面跟数字+时间用for，后面跟时间点或句子用since。简单又实用！',
      '短暂性动词转延续性动词是考试重灾区！最常考的几对：buy→have, borrow→keep, join→be in, die→be dead。抄在笔记本上反复看！',
      '练习用How long...?提问：How long have you lived here? 然后用for或since回答，造五个不同的句子。',
    ],
  },

  // ==================== 主题89: 现在完成时(四) ====================
  89: {
    explanation:
      '今天我们来做现在完成时的大总结，还要学习have been to和have gone to这对容易混淆的"双胞胎"！have been to表示"曾经去过某地"，人已经回来了——比如"I have been to Beijing."（我去过北京。）说这话的时候你人在这里。have gone to表示"去了某地"，人还没回来——比如"He has gone to Beijing."（他去北京了。）说这话的时候他不在这里。打个比方：been to就像你去过游乐园——快乐的回忆已经带回家了；gone to就像你正在去游乐园的路上——快乐还没开始呢！注意：have gone to不能用在I身上（I have gone to...是病句），因为如果你在说话，说明人在这里，不可能"去了还没回来"。',
    extraRules: [
      'have/has been to + 地点：表示"去过某地"（已经回来了）。如：I have been to Paris.',
      'have/has gone to + 地点：表示"去了某地"（还没回来）。如：He has gone to Paris.',
      'have/has been in + 地点：表示"在某地待了一段时间"。如：I have been in Beijing for three years.',
      '现在完成时四大用法：①已完成（对现在有影响）②经历（ever/never）③持续（for/since）④刚刚完成（just）',
      '现在完成时不能和明确的过去时间连用（如yesterday, last week），这些时间词搭配一般过去时',
    ],
    extraExamples: [
      {
        english: 'I have been to the Summer Palace twice.',
        chinese: '我去过颐和园两次了。',
        grammarPoint: 'been to 表示去过（已回来）',
      },
      {
        english: 'Where is Tom? He has gone to the library.',
        chinese: '汤姆在哪？他去图书馆了。',
        grammarPoint: 'gone to 表示去了（未回来）',
      },
      {
        english: 'She has been in London since last month.',
        chinese: '她从上个月起就在伦敦了。',
        grammarPoint: 'been in 表示待在某地',
      },
      {
        english: 'Have you ever been to a water park?',
        chinese: '你去过水上乐园吗？',
        grammarPoint: 'been to + ever 询问经历',
      },
      {
        english: 'My parents have gone to the supermarket.',
        chinese: '我父母去超市了。（不在家）',
        grammarPoint: 'gone to 表示去了未回',
      },
      {
        english: 'We have known each other since 2021.',
        chinese: '我们从2021年就认识了。',
        grammarPoint: 'since + 时间点 持续至今',
      },
    ],
    extraTips: [
      '做been to / gone to选择题时，看主语在不在说话现场：在场用been to（去过，回来了），不在场用gone to（去了，还没回来）。',
      '考试最常见的陷阱：I have gone to...是错误用法！因为你既然在说话，人就在这里，不可能"去了还没回来"。',
      '做现在完成时综合题时，按顺序检查：①看时间词→②确定用现在完成时→③选have/has→④写过去分词。',
    ],
  },

  // ==================== 主题90: 复习：现在完成时(四)练习 ====================
  90: {
    explanation:
      '现在完成时我们已经学了四节课了，今天做一次全面大复习！结构是have/has + 过去分词。四大用法：①已经完成并对现在有影响（I have lost my key.所以我现在进不了门）②人生经历（I have been to Beijing.我去过北京）③持续的动作（I have lived here for five years.我在这里住了五年）④刚刚完成（I have just finished.我刚完成）。搭配副词：already（已经）、yet（还/尚未）、just（刚刚）、ever（曾经）、never（从未）。for表时间段，since表时间点。been to表去过回来了，gone to表去了还没回来，been in表待在某地一段时间。做题时根据上下文和时间标志词判断时态。现在完成时是非常重要的时态，一定要掌握好！',
    extraRules: [
      '现在完成时四大用法：已完成、经历、持续、刚刚完成',
      '短暂性动词不能直接与for/since搭配，需变为延续性动词',
      'have been to（去过，已回）vs have gone to（去了，未回）vs have been in（待在某地）',
      '现在完成时vs一般过去时：现在完成时强调对现在的影响或持续到现在；一般过去时只陈述过去事实',
      '时间标志词：already/yet/just/ever/never/so far → 现在完成时；yesterday/last.../...ago → 一般过去时',
    ],
    extraExamples: [
      {
        english: 'I have already told you the answer twice.',
        chinese: '我已经告诉过你答案两次了。',
        grammarPoint: 'already + 现在完成时',
      },
      {
        english: "She hasn't finished her science project yet.",
        chinese: '她还没完成她的科学项目。',
        grammarPoint: "hasn't + yet 否定句",
      },
      {
        english: 'He has been to Canada twice.',
        chinese: '他去过加拿大两次。',
        grammarPoint: 'been to 表经历',
      },
      {
        english: 'We have studied English since 2021.',
        chinese: '我们从2021年起就学英语了。',
        grammarPoint: 'since + 时间点',
      },
      {
        english: 'The train has just left the station.',
        chinese: '火车刚刚离开车站。',
        grammarPoint: 'just 表刚刚',
      },
      {
        english: 'How long have you known your best friend?',
        chinese: '你认识你最好的朋友多久了？',
        grammarPoint: 'How long + 现在完成时',
      },
    ],
    extraTips: [
      '做综合选择题时，先看时间词判断时态，再看句意选正确结构。不要凭感觉猜，要有依据地选答案！',
      '把现在完成时画成思维导图：中间写"现在完成时"，四个方向分别是"四大用法"、"搭配副词"、"for/since"、"been to/gone to"。',
      '试着用现在完成时写一段自我介绍：I have lived in this city for ten years. I have been to many places. I have never been abroad.',
    ],
  },

  // ==================== 主题91: 一般将来时(will) ====================
  91: {
    explanation:
      '今天我们来学习怎样用英语说"将来"的事！一般将来时的第一种形式是will + 动词原形。will是一个很"随和"的助动词——没有人称变化，不管主语是谁都用will。它表示"将要做某事"，如"I will go to the park tomorrow."（我明天要去公园。）否定形式是won\'t（will not的缩写），疑问句把will提前："Will you come?"（你来吗？）will还有一种很酷的用法——表示临时决定。比如有人敲门，你说"I\'ll open the door."（我去开门。）这是你刚刚决定的，不是提前计划好的。will就像一个"时间望远镜"，让我们能看到未来的画面！',
    extraRules: [
      '肯定句：主语 + will + 动词原形。如：I will help you. She will come tomorrow.',
      "否定句：主语 + won't (will not) + 动词原形。如：I won't be late.",
      '疑问句：Will + 主语 + 动词原形？如：Will it rain tomorrow?',
      "简略回答：Yes, I will. / No, I won't. Yes, she will. / No, she won't.",
      'will没有人称变化，所有人称都用will。常与tomorrow, next week, next year, in the future等时间词搭配',
    ],
    extraExamples: [
      {
        english: 'I will visit my grandparents next weekend.',
        chinese: '我下周末要去看望爷爷奶奶。',
        grammarPoint: 'will + 动词原形 表将来',
      },
      {
        english: 'She will be thirteen years old next month.',
        chinese: '她下个月就十三岁了。',
        grammarPoint: 'will + be 表将来状态',
      },
      {
        english: 'It will be sunny tomorrow.',
        chinese: '明天会是晴天。',
        grammarPoint: 'will 表预测',
      },
      {
        english: "We won't have school next Friday.",
        chinese: '我们下周五不上课。',
        grammarPoint: "won't 否定句",
      },
      {
        english: 'Will you come to my birthday party?',
        chinese: '你会来我的生日派对吗？',
        grammarPoint: 'Will 疑问句',
      },
      {
        english: 'I think he will love this gift.',
        chinese: '我觉得他会喜欢这个礼物的。',
        grammarPoint: 'will 表预测/看法',
      },
    ],
    extraTips: [
      "will的缩写要记牢：I will → I'll, he will → he'll, she will → she'll, we will → we'll, they will → they'll。否定：will not → won't。",
      'will后面永远跟动词原形！不能说I will goes或She will to go. 只能说I will go. She will go.',
      'will常见搭配时间词：tomorrow（明天）, next week/month/year, in the future（将来）, someday（有一天）, soon（很快）。',
    ],
  },

  // ==================== 主题92: 复习：一般将来时(will)练习 ====================
  92: {
    explanation:
      '我们来复习一般将来时will的用法！will + 动词原形，表示将要发生的事。它没有人称变化——不管主语是谁，全都用will，这是它最"随和"的地方！否定句用won\'t，疑问句把will提到主语前面。will的四种用法：①预测未来（It will snow tomorrow.明天会下雪。）②临时决定（I\'ll answer the phone.我去接电话。）③承诺（I will help you.我会帮助你的。）④希望/信念（I hope you will come.我希望你能来。）要注意will后面一定跟动词原形，不能加-s，也不能加to。做选择题时，看到tomorrow, next week这些将来时间词，基本就可以选will了。回答"Will you...?"时，肯定"Yes, I will."否定"No, I won\'t."',
    extraRules: [
      'will + 动词原形，所有人称通用，无变化',
      "否定形式won't + 动词原形：I won't forget. He won't come.",
      '疑问句Will + 主语 + 动词原形：Will they play football?',
      "简略回答：Yes, I will. / No, I won't. Yes, she will. / No, she won't.",
      "will常见搭配：I think..., I hope..., I believe..., I'm sure...后面常用will",
    ],
    extraExamples: [
      {
        english: 'My father will take me to the museum tomorrow.',
        chinese: '我爸爸明天会带我去博物馆。',
        grammarPoint: 'will + take 将来时肯定句',
      },
      {
        english: 'The summer holiday will start next month.',
        chinese: '暑假下个月就开始了。',
        grammarPoint: 'will + start 表将来',
      },
      {
        english: "I'm sure she will win the game.",
        chinese: '我肯定她会赢得比赛。',
        grammarPoint: "I'm sure + will 表预测",
      },
      {
        english: "They won't move to a new house.",
        chinese: '他们不会搬到新房子去。',
        grammarPoint: "won't 否定句",
      },
      {
        english: 'Will it be cold this Saturday?',
        chinese: '这周六会冷吗？',
        grammarPoint: 'Will 疑问句',
      },
      {
        english: 'I believe he will become a great scientist.',
        chinese: '我相信他会成为一名伟大的科学家。',
        grammarPoint: 'I believe + will 表信念',
      },
    ],
    extraTips: [
      '做填空题时，如果主语后面空了，紧接着是动词原形或将来时间词，那很可能要填will。',
      "will的缩写在口语中很常见：I'll, you'll, he'll, she'll, we'll, they'll, won't。多练习缩写形式！",
      "试着用will来预测天气和描述计划：I think it will rain tomorrow. I'll bring my umbrella just in case.",
    ],
  },

  // ==================== 主题93: 一般将来时(be going to) ====================
  93: {
    explanation:
      '今天我们来学一般将来时的第二种形式——be going to！结构是am/is/are + going to + 动词原形。be going to表示"计划/打算做某事"，强调你已经提前想好了。比如"I am going to visit my uncle this Sunday."（我这个星期天打算去看叔叔。）这说明你早就计划好了。be going to还有一种用法——根据眼前的迹象预测即将发生的事。比如"Look at the dark clouds. It is going to rain."（看那些乌云，要下雨了！）乌云就是"迹象"。be going to中的be要根据主语变化：I→am, he/she/it→is, you/we/they→are。否定形式：am not/isn\'t/aren\'t + going to + 动词原形。口语中going to经常被读成gonna，但考试中必须写完整的going to！',
    extraRules: [
      '肯定句：主语 + am/is/are + going to + 动词原形。如：I am going to read a book.',
      "否定句：主语 + am not/isn't/aren't + going to + 动词原形。如：She isn't going to come.",
      '疑问句：Am/Is/Are + 主语 + going to + 动词原形？如：Are you going to play?',
      'be going to表示"计划、打算"，强调事先已经决定好的事',
      'be going to也可根据现在迹象预测即将发生的事：Look! The baby is going to cry!',
    ],
    extraExamples: [
      {
        english: 'I am going to learn to swim this summer.',
        chinese: '我今年暑假打算学游泳。',
        grammarPoint: 'be going to 表计划',
      },
      {
        english: 'She is going to buy a new schoolbag.',
        chinese: '她打算买一个新书包。',
        grammarPoint: 'is going to 表打算',
      },
      {
        english: 'We are going to have a picnic this Saturday.',
        chinese: '我们这周六打算去野餐。',
        grammarPoint: 'are going to 表计划',
      },
      {
        english: 'Look at the dark clouds! It is going to rain.',
        chinese: '看那些乌云！要下雨了。',
        grammarPoint: 'be going to 根据迹象预测',
      },
      {
        english: "He isn't going to play games tonight.",
        chinese: '他今晚不打算玩游戏。',
        grammarPoint: "isn't going to 否定句",
      },
      {
        english: 'Are you going to join the art club?',
        chinese: '你打算加入美术社团吗？',
        grammarPoint: 'Are...going to 疑问句',
      },
    ],
    extraTips: [
      "区分will和be going to：will常表示临时决定或对未来的单纯预测，be going to强调提前计划好的打算。门口有人敲门—I'll open the door.（临时决定）vs 我已经买了机票—I'm going to fly to Beijing.（早已计划）",
      "be going to在口语中经常读成gonna，如I'm gonna go. = I'm going to go. 但考试中要写完整的going to！",
      '看到be going to的题目，第一步判断be动词用哪个形式：I→am, he/she/it→is, you/we/they→are。',
    ],
  },

  // ==================== 主题94: 复习：一般将来时(be going to)练习 ====================
  94: {
    explanation:
      '我们来复习be going to的用法！be going to表示"打算/计划做某事"，结构是am/is/are + going to + 动词原形。做题时要记住三步：①选对be动词（am/is/are）②写going to ③动词用原形。be going to还可以表示根据现在看到的迹象预测即将发生的事。和will的区别是：be going to更强调"提前计划好的"，will更偏向"临时决定"或"单纯的预测"。比如你已经制定了寒假计划—I\'m going to learn to paint.（我打算学画画。）但如果是突然想到的主意—I\'ll call him right now.（我现在就给他打电话。）回答"Are you going to...?"时，肯定"Yes, I am."否定"No, I\'m not."',
    extraRules: [
      'am going to：主语为I。如：I am going to clean my room.',
      'is going to：主语为he/she/it/单数名词。如：Tom is going to help me.',
      'are going to：主语为you/we/they/复数名词。如：They are going to play soccer.',
      "否定句：am not/isn't/aren't going to + 动词原形",
      "疑问句及回答：Is she going to...? Yes, she is. / No, she isn't.",
    ],
    extraExamples: [
      {
        english: "I am going to make a card for Mom's birthday.",
        chinese: '我打算给妈妈的生日做一张卡片。',
        grammarPoint: 'am going to 表计划',
      },
      {
        english: 'Tom is going to practice the piano after school.',
        chinese: '汤姆打算放学后练钢琴。',
        grammarPoint: 'is going to 第三人称',
      },
      {
        english: 'Are you going to watch the football game tonight?',
        chinese: '你今晚打算看足球赛吗？',
        grammarPoint: 'Are...going to 疑问句',
      },
      {
        english: 'Look! The cat is going to jump onto the table!',
        chinese: '看！那只猫要跳到桌子上了！',
        grammarPoint: '根据迹象预测',
      },
      {
        english: "We aren't going to travel during the holiday.",
        chinese: '我们假期不打算去旅游。',
        grammarPoint: "aren't going to 否定句",
      },
      {
        english: 'My sister is going to start high school in September.',
        chinese: '我姐姐九月份就要上高中了。',
        grammarPoint: 'is going to 表计划',
      },
    ],
    extraTips: [
      '考试中be going to的考点主要是：①选对am/is/are ②不要漏掉going或to ③后面动词必须用原形。',
      "口语练习：用be going to描述你的周末计划—I'm going to... 连说五个句子，练习流利度！",
      "做句型转换题时，肯定→否定：She is going to go. → She isn't going to go. 肯定→疑问：Is she going to go?",
    ],
  },

  // ==================== 主题95: had better的用法 ====================
  95: {
    explanation:
      '今天我们来学一个很实用的表达——had better！它的意思是"最好做某事"，用来给建议或发出警告。虽然里面有had，但它不是过去时哦，它说的是现在或将来的事！结构是had better + 动词原形，缩写是\'d better。比如"You\'d better finish your homework before dinner."（你最好在晚饭前做完作业。）这就像妈妈温柔地提醒你，语气认真但关心你。否定形式是had better not + 动词原形，比如"You\'d better not stay up too late."（你最好不要熬夜太晚。）had better的语气比should更强一些，暗含"如果不这样做可能会有不好的后果"的意思。就像天气预报说"你最好带伞"——如果不带，可能会被淋湿！',
    extraRules: [
      "肯定句：主语 + had better + 动词原形。如：You'd better go now.（你最好现在就走。）",
      "否定句：主语 + had better not + 动词原形。如：You'd better not be late.（你最好不要迟到。）",
      "缩写形式：I'd better, You'd better, He'd better, She'd better, We'd better, They'd better",
      'had better虽有had，但不表示过去时，它说的是现在或将来的事',
      'had better的语气比should更强，暗含"如果不这样做可能会有不好后果"的警告意味',
    ],
    extraExamples: [
      {
        english: "You'd better wear a coat. It's freezing outside.",
        chinese: '你最好穿件外套。外面冷极了。',
        grammarPoint: 'had better 表建议',
      },
      {
        english: "We'd better hurry, or we'll miss the bus.",
        chinese: '我们最好快点，否则就赶不上公交车了。',
        grammarPoint: 'had better 表紧急建议',
      },
      {
        english: "You'd better not play with fire.",
        chinese: '你最好不要玩火。',
        grammarPoint: 'had better not 表否定建议',
      },
      {
        english: "She'd better take her medicine on time.",
        chinese: '她最好按时吃药。',
        grammarPoint: 'had better 表建议/警告',
      },
      {
        english: "I'd better go home now. My mom will worry.",
        chinese: '我最好现在回家。我妈妈会担心的。',
        grammarPoint: "I'd better 表自我决定",
      },
      {
        english: "You'd better not tell him the secret.",
        chinese: '你最好不要告诉他这个秘密。',
        grammarPoint: 'had better not 否定建议',
      },
    ],
    extraTips: [
      "had better的缩写'd better在口语中非常常用。You'd better = You had better。考试时两种写法都可以。",
      "had better后面永远跟动词原形！不能说You'd better to go或You'd better going. 只能说You'd better go.",
      'had better虽然是"建议"，但语气比较强硬。对长辈或老师说话时不太适合用，可以说I think you should...更委婉。',
    ],
  },

  // ==================== 主题96: 复习：had better练习 ====================
  96: {
    explanation:
      '我们来复习had better的用法！had better + 动词原形，意思是"最好做某事"，用来给出比较强烈的建议或警告。缩写形式是\'d better。否定形式是had better not + 动词原形。做题时要注意三个易错点：①had better虽有had，但不是过去时！它说的是现在或将来的事。②后面跟动词原形，不加to，不加-ing。③否定形式直接在better后面加not。had better还经常和or（否则）搭配，构成"你最好……否则……"的句型，比如"You\'d better study hard, or you\'ll fail the exam."（你最好努力学习，否则考试会不及格。）这个句型在考试中经常出现，要特别注意！',
    extraRules: [
      "had better + 动词原形：建议或警告做某事。You'd better listen carefully.",
      "had better not + 动词原形：建议不要做某事。You'd better not eat too much candy.",
      "had better常与or搭配：You'd better..., or...（你最好……否则……）",
      "所有人称都可以用had better，缩写为'd better：I'd, you'd, he'd, she'd, we'd, they'd better",
      "疑问句形式：Hadn't + 主语 + better + 动词原形？如：Hadn't you better go now?",
    ],
    extraExamples: [
      {
        english: "You'd better do your homework before dinner.",
        chinese: '你最好在晚饭前做作业。',
        grammarPoint: 'had better 表建议',
      },
      {
        english: "We'd better leave now, or we'll be late.",
        chinese: '我们最好现在出发，否则会迟到的。',
        grammarPoint: 'had better...or 搭配',
      },
      {
        english: "He'd better not forget his lunch box.",
        chinese: '他最好别忘了带午餐盒。',
        grammarPoint: 'had better not 否定建议',
      },
      {
        english: "You'd better apologize to her.",
        chinese: '你最好向她道歉。',
        grammarPoint: 'had better 表较强烈的建议',
      },
      {
        english: "They'd better not swim in the river alone.",
        chinese: '他们最好不要独自在河里游泳。',
        grammarPoint: 'had better not 表安全警告',
      },
      {
        english: "I'd better check my bag before I leave.",
        chinese: '我最好在走之前检查一下书包。',
        grammarPoint: "I'd better 表自省建议",
      },
    ],
    extraTips: [
      '做改错题时检查三个地方：①had有没有误用成has/have ②better后面有没有多余的to ③否定时not是否放在了正确位置（better not）。',
      "had better + or是考试常见句型：You'd better hurry. → 否定句：You'd better not hurry. 造句练习：You'd better..., or...",
      "试着用had better给朋友提5个建议：You'd better drink more water. You'd better go to bed early. 用起来才记得牢！",
    ],
  },

  // ==================== 主题97: 名词性物主代词 ====================
  97: {
    explanation:
      '今天我们来认识名词性物主代词！先回忆一下形容词性物主代词：my, your, his, her, our, their，它们后面要跟名词，比如my book（我的书）。名词性物主代词是：mine, yours, his, hers, ours, theirs，它们后面不需要跟名词，因为它们本身就包含了"……的东西"的意思。比如"This book is mine."（这本书是我的。）名词性物主代词就像一个"省略高手"，代替了"形容词性物主代词+名词"的组合。"This is my cup." = "This cup is mine." 是不是更简洁？注意一个特殊情况：his既是形容词性也是名词性，形式完全一样！记住口诀："有名用形（形容词性），无名用名（名词性）"——后面有名词用my/your/his/her，后面没有名词就用mine/yours/his/hers。',
    extraRules: [
      '名词性物主代词：mine, yours, his, hers, ours, theirs',
      '名词性物主代词 = 形容词性物主代词 + 名词。如：mine = my + 名词, yours = your + 名词',
      '名词性物主代词可以做主语：Mine is red.（我的是红色的。）也可以做表语：This is mine.（这是我的。）',
      'his既是形容词性物主代词（his book）也是名词性物主代词（The book is his.），形式完全相同',
      '名词性物主代词前不能加冠词a/an/the，后面也不再跟名词',
    ],
    extraExamples: [
      {
        english: 'This pencil is mine. Where is yours?',
        chinese: '这支铅笔是我的。你的在哪里？',
        grammarPoint: 'mine和yours做表语',
      },
      {
        english: 'Her bag is blue, and hers is red.',
        chinese: '她的书包是蓝色的，而她的是红色的。',
        grammarPoint: 'her形容词性 vs hers名词性',
      },
      {
        english: 'Our classroom is big. Theirs is small.',
        chinese: '我们的教室很大。他们的小。',
        grammarPoint: 'ours和theirs做主语',
      },
      {
        english: 'Is this book his?',
        chinese: '这本书是他的吗？',
        grammarPoint: 'his做名词性物主代词',
      },
      {
        english: 'My bike is new. His is old.',
        chinese: '我的自行车是新的。他的是旧的。',
        grammarPoint: 'my形容词性 vs his名词性',
      },
      {
        english: "This is not your eraser. It's hers.",
        chinese: '这不是你的橡皮。是她的。',
        grammarPoint: 'hers代替her eraser',
      },
    ],
    extraTips: [
      '快速判断用哪种物主代词：后面有名词→用形容词性（my, your, his, her...）；后面没有名词→用名词性（mine, yours, his, hers...）。',
      '记忆口诀："有名用形，无名用名"——有名词用形容词性物主代词，没有名词用名词性物主代词。简单好记！',
      '特别注意his两种形式一样，不要搞混。另外your和yours读音相似但用法不同：your + 名词 vs yours单独用。',
    ],
  },

  // ==================== 主题98: 复习：名词性物主代词练习 ====================
  98: {
    explanation:
      '我们来复习名词性物主代词！名词性物主代词包括mine, yours, his, hers, ours, theirs，它们可以独立使用，后面不需要跟名词。和形容词性物主代词（my, your, his, her, our, their）的核心区别是：形容词性后面必须跟名词（my book），名词性不需要（The book is mine.）。做题时关键看后面有没有名词——有名词就选形容词性，没有名词就选名词性。名词性物主代词常用在句子末尾表示"……是谁的"，也常用在比较句中代替重复的名词。比如"Her dress is beautiful, but mine is more beautiful."（她的裙子很漂亮，但我的更漂亮。）这里的mine代替了my dress，避免了重复，句子更简洁。',
    extraRules: [
      '形容词性物主代词（限定词）：my, your, his, her, its, our, their + 名词',
      '名词性物主代词（代词）：mine, yours, his, hers, its, ours, theirs，独立使用，不加名词',
      '互相替换：my book = mine, your pen = yours, her cat = hers, our teacher = ours',
      '名词性物主代词做主语时，谓语动词的单复数取决于它所代替的名词：Mine is... Ours are...',
      '双重所有格：a friend of mine（我的一个朋友），of + 名词性物主代词表示"……中的一个"',
    ],
    extraExamples: [
      {
        english: 'This is my ruler. That ruler is yours.',
        chinese: '这是我的尺子。那把尺子是你的。',
        grammarPoint: 'my + 名词 vs yours 独立使用',
      },
      {
        english: 'Their house is near the school. Ours is far away.',
        chinese: '他们的房子在学校附近。我们的很远。',
        grammarPoint: 'their + 名词 vs ours 做主语',
      },
      {
        english: 'Is this jacket yours or his?',
        chinese: '这件夹克是你的还是他的？',
        grammarPoint: 'yours和his做表语',
      },
      {
        english: 'Her handwriting is good, but mine is better.',
        chinese: '她的字写得好，但我的更好。',
        grammarPoint: 'mine代替my handwriting',
      },
      {
        english: 'The red one is mine. The blue one is hers.',
        chinese: '红色的是我的。蓝色的是她的。',
        grammarPoint: 'mine和hers做表语',
      },
      {
        english: 'A friend of mine gave me this book.',
        chinese: '我的一个朋友给了我这本书。',
        grammarPoint: '双重所有格 a friend of mine',
      },
    ],
    extraTips: [
      '考试高频考点：看句中有没有名词来选填物主代词。有名词（___ book）→填形容词性（my/your/his/her）；没有名词（The book is ___）→填名词性（mine/yours/his/hers）。',
      '做配对题时记住对应关系：my↔mine, your↔yours, his↔his, her↔hers, our↔ours, their↔theirs。特别注意his两边都一样！',
      '练习用名词性物主代词说话：指着物品说This is mine. That is yours. This is hers. 口语练习帮你建立语感。',
    ],
  },

  // ==================== 主题99: 间接引语(一) ====================
  99: {
    explanation:
      '今天我们来学习间接引语！什么是间接引语呢？就是把别人说的话"转述"给别人听。比如你的好朋友Tom说："I am happy." 你告诉另一个同学时就要说：He said he was happy. 看到区别了吗？直接引语用引号引用原话，间接引语不用引号，而且人称和时态都要变化。变化规则：①人称要变——I→he/she, my→his/her。②时态要"后退"一步——一般现在时→一般过去时（I am→he was），can→could，will→would。③指示词变——this→that, here→there, now→then。就像玩"传话游戏"一样，把话传下去时内容要跟着调整，这样才能让听的人明白是谁说的、什么时候说的。',
    extraRules: [
      '人称变化：I→he/she, my→his/her, you→he/she/we/they（根据语境），we→they',
      '时态后退：一般现在时→一般过去时；can→could；will→would；am/is→was；are→were',
      '直接引语变间接引语时，引号去掉，加上said (that)...或told sb (that)...',
      '如果直接引语是客观真理或自然规律，间接引语时态不变。如：The teacher said the earth goes around the sun.',
      '指示词变化：this→that, these→those, here→there, now→then',
    ],
    extraExamples: [
      {
        english: 'Tom said, "I like apples."',
        chinese: '汤姆说："我喜欢苹果。"',
        grammarPoint: '直接引语',
      },
      {
        english: 'Tom said that he liked apples.',
        chinese: '汤姆说他喜欢苹果。',
        grammarPoint: '间接引语：I→he, like→liked',
      },
      {
        english: 'She said, "I am reading a book."',
        chinese: '她说："我正在看书。"',
        grammarPoint: '直接引语 现在进行时',
      },
      {
        english: 'She said that she was reading a book.',
        chinese: '她说她正在看书。',
        grammarPoint: '间接引语：am→was',
      },
      {
        english: 'He said, "I can swim."',
        chinese: '他说："我会游泳。"',
        grammarPoint: '直接引语 含情态动词',
      },
      {
        english: 'He said that he could swim.',
        chinese: '他说他会游泳。',
        grammarPoint: '间接引语：can→could',
      },
    ],
    extraTips: [
      '转述时第一步改人称，第二步改时态。可以先在直接引语上标出需要改的地方，再写出间接引语，这样不容易出错。',
      'said后面可以加that（He said that...），也可以省略（He said...）。但told后面要加人（He told me that...），不能说He told that...',
      '做题时特别注意：如果引号里的句子说的是客观事实（如The sun rises in the east.），时态不用变！',
    ],
  },

  // ==================== 主题100: 复习：间接引语(一)练习 ====================
  100: {
    explanation:
      '我们来复习间接引语！间接引语就是转述别人的话。把直接引语变成间接引语时要记住三个变化：①人称变——把第一人称和第二人称变成第三人称（I→he/she, you→he/she/me/us）。②时态变——把时态往后退一步，一般现在时变一般过去时（am/is→was），can变could，will变would。③指示词变——this变that，here变there，now变then。引号要去掉，加上said (that)...或told sb (that)...。做题分三步走：第一步，去掉引号，写上said that；第二步，改人称；第三步，改时态。还有一个特殊规则：如果转述的是客观真理（比如"地球绕着太阳转"），时态不需要变化！练习多了就会越来越快，就像玩传话游戏越玩越熟练一样！',
    extraRules: [
      'said + that + 从句：He said (that) he was tired. told + 人 + that + 从句：He told me (that) he was tired.',
      '人称变化三步走：一看"谁说的"确定第三人称he/she，二看"对谁说的"确定转述对象，三替换所有格',
      '时态变化：一般现在时→一般过去时，am/is→was，are→were，can→could，will→would',
      '特殊情况：said to sb → told sb。如He said to me, "I\'m fine." → He told me that he was fine.',
      '客观真理不变时态：She said the sun rises in the east.（她说太阳从东方升起。）',
    ],
    extraExamples: [
      {
        english: 'Mary said, "I will help you."',
        chinese: '玛丽说："我会帮助你。"',
        grammarPoint: '直接引语',
      },
      {
        english: 'Mary said that she would help me.',
        chinese: '玛丽说她会帮助我。',
        grammarPoint: 'I→she, will→would, you→me',
      },
      {
        english: 'He said to me, "I am busy."',
        chinese: '他对我说："我很忙。"',
        grammarPoint: 'said to sb 直接引语',
      },
      {
        english: 'He told me that he was busy.',
        chinese: '他告诉我他很忙。',
        grammarPoint: 'said to me → told me, am→was',
      },
      {
        english: 'The teacher said, "Light travels faster than sound."',
        chinese: '老师说："光比声音传播得快。"',
        grammarPoint: '直接引语 客观真理',
      },
      {
        english: 'The teacher said that light travels faster than sound.',
        chinese: '老师说光比声音传播得快。',
        grammarPoint: '客观真理不变时态',
      },
    ],
    extraTips: [
      '做间接引语转换题，建议在草稿纸上按"人称→时态→指示词"的顺序一步步修改，不要着急一步到位。',
      '特别注意said to和told的互换：said to me = told me, said to her = told her。told后面一定要接人！',
      '做选择题时，如果四个选项中有两个时态不一样（如likes和liked），那考点很可能就是时态变化，选过去式的那个。',
    ],
  },
};

export default batch4;
