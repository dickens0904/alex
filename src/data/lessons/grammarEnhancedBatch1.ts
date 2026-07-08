// 语法增强内容 - 批次1（主题21-40）
const batch1: Record<
  number,
  {
    explanation: string;
    extraRules: string[];
    extraExamples: { english: string; chinese: string; grammarPoint: string }[];
    extraTips: string[];
  }
> = {
  // ==================== 第21课：Which疑问句和Give me句型 ====================
  21: {
    explanation:
      'Which就像是一个"挑选小能手"，它专门在有限的选项中帮你做选择。想象你走进一家糖果店，货架上有草莓味、巧克力味和柠檬味三种口味，你问朋友"你要哪一种？"，这里的"哪一种"就是Which。Which后面要跟一个名词，告诉别人你在挑什么，比如"Which book?"（哪本书？）、"Which color?"（哪个颜色？）。Give me则是一个"礼貌请求小助手"，表示"请给我……"。就像你对妈妈说"请给我一个苹果"，英语就是"Give me an apple"。Give me后面直接跟你要的东西就行了。这两个句型搭配在一起特别好用：你可以先用Which提问选择，再用Give me来获取，比如"Which pencil do you want? Give me the red one, please."',
    extraRules: [
      'Which后面必须跟名词：Which book? Which color? 不能只说Which?',
      'Which后面跟单数名词时表示"哪一个"（Which book do you like?），跟复数名词时表示"哪些"（Which books do you like?）',
      'Give me后面可以直接跟名词：Give me a pen. 也可以用复数：Give me some pens.',
      'one/ones可以替代前面提过的名词，避免重复：I like the red one.（代替pen）/ I like the red ones.（代替pens）',
      'Give me在口语中更礼貌的说法是"Give me..., please."或"Can you give me...?"',
    ],
    extraExamples: [
      {
        english: 'Which book do you want?',
        chinese: '你想要哪本书？',
        grammarPoint: 'Which + 单数名词',
      },
      {
        english: 'Give me the blue one, please.',
        chinese: '请给我蓝色的那个。',
        grammarPoint: 'Give me + the + 形容词 + one',
      },
      {
        english: 'Which toys do you like?',
        chinese: '你喜欢哪些玩具？',
        grammarPoint: 'Which + 复数名词',
      },
      {
        english: 'Give me the big ones.',
        chinese: '给我大的那些。',
        grammarPoint: 'Give me + the + 形容词 + ones',
      },
      {
        english: 'Which cake do you want to eat?',
        chinese: '你想吃哪块蛋糕？',
        grammarPoint: 'Which + 单数名词 + 一般疑问',
      },
      {
        english: 'Give me a piece, please.',
        chinese: '请给我一块。',
        grammarPoint: 'Give me + 数量 + 名词',
      },
    ],
    extraTips: [
      '记忆口诀："Which来挑选，有限选项中；Give me来请求，给我某样东"',
      '易错提醒：Which后面不能省略名词！不能说"Which do you want?"，要说"Which one do you want?"或"Which book do you want?"',
      '趣味知识：Which来源于古英语，和"while"（哪个时候）是亲戚，都表示在选项中做选择哦！',
    ],
  },

  // ==================== 第22课：复习：Which疑问句和Give me句型练习 ====================
  22: {
    explanation:
      '今天我们来综合复习Which疑问句和Give me句型，把这两个"好搭档"练得更熟练！Which用来在几个已知的选项中做选择，记住它后面一定要跟名词，告诉别人你在选什么。Give me用来请求别人给你某样东西，后面直接跟你要的东西。它们还有一个好帮手——one和ones，用来替代前面说过的名词，避免重复。比如你不能说"Give me the red pen"然后又说"Give me the blue pen"，太啰嗦了！你可以说"Give me the blue one"。单数用one，复数用ones，就像一双手分左右手一样分得清清楚楚。试着在生活中多用这两个句型，比如在餐厅点餐时用Which，在家里拿东西时用Give me。',
    extraRules: [
      'Which引导的特殊疑问句结构：Which + 名词 + 一般疑问句？（Which dress do you like?）',
      'Give me + 名词 = 请给我……（Give me a glass of water.）',
      'one替代前面提到的单数名词，ones替代复数名词：I want the small one. / I want the small ones.',
      'Which...do you want? 和 Give me... 是最常用的搭配组合',
      '回答Which的提问时，可以直接说出选项：Which ice cream? → Chocolate, please.',
    ],
    extraExamples: [
      {
        english: 'Which bag is yours?',
        chinese: '哪个包是你的？',
        grammarPoint: 'Which + 名词 + is...',
      },
      {
        english: 'Give me the heavy one.',
        chinese: '给我重的那个。',
        grammarPoint: 'Give me + 形容词 + one',
      },
      {
        english: 'Which shoes do you want to wear?',
        chinese: '你想穿哪双鞋？',
        grammarPoint: 'Which + 复数名词',
      },
      {
        english: 'Give me the new ones.',
        chinese: '给我新的那双。',
        grammarPoint: 'Give me + 形容词 + ones',
      },
      {
        english: 'Which is your desk?',
        chinese: '哪张是你的桌子？',
        grammarPoint: 'Which + is + 名词（省略名词）',
      },
      {
        english: 'Give me that one, please.',
        chinese: '请给我那一个。',
        grammarPoint: 'Give me + that + one',
      },
    ],
    extraTips: [
      '口诀复习："Which选哪个要跟名，Give me给我东西行；单数one复数ones，替换名词最聪明！"',
      '易错提醒：one/ones前面通常要加the或形容词，不能光说"Give me one"（除非是"给我一个"的意思）',
      '实战练习：打开你的书包，用"Which...do you want?"和"Give me..."和同学对话练习吧！',
    ],
  },

  // ==================== 第23课：介词on/under ====================
  23: {
    explanation:
      '介词on和under是一对"上下好兄弟"。on表示"在……上面"，就像一只猫趴在桌子上——猫和桌子有接触，猫在桌子的上方。under表示"在……下面"，就像小狗钻到了桌子底下——小狗在桌子的下方。想象一下你的房间：书在书桌上（The book is on the desk.），拖鞋在床底下（The slippers are under the bed.）。on强调的是"接触"——东西直接放在另一个东西的表面上；under强调的是"正下方"——东西在另一个东西的底下。这两个介词虽然简单，但在描述位置时非常重要，就像导航里的"上"和"下"方向一样不可或缺！',
    extraRules: [
      'on表示"在……上面"，物体之间有接触面：The cup is on the table.（杯子在桌子上。）',
      'under表示"在……下面"，物体在另一个物体的正下方：The cat is under the chair.（猫在椅子下面。）',
      'on的反义词是under，它们是方位的"上下组合"',
      '注意区分on和over：on表示接触，over表示"在……正上方"但不一定接触',
      'under和below也有区别：under表示正下方（垂直），below只是"低于"（不一定正下方）',
    ],
    extraExamples: [
      {
        english: 'The book is on the desk.',
        chinese: '书在桌子上。',
        grammarPoint: 'on + 名词（在…上面）',
      },
      {
        english: 'The dog is under the tree.',
        chinese: '狗在树下面。',
        grammarPoint: 'under + 名词（在…下面）',
      },
      {
        english: 'There is a picture on the wall.',
        chinese: '墙上有一幅画。',
        grammarPoint: 'on the wall（在墙面上）',
      },
      {
        english: 'My shoes are under the bed.',
        chinese: '我的鞋子在床下面。',
        grammarPoint: 'under the bed（在床底下）',
      },
      {
        english: 'The clock is on the wall.',
        chinese: '钟挂在墙上。',
        grammarPoint: 'on the wall（竖直面上也用on）',
      },
      {
        english: 'The ball is under the table.',
        chinese: '球在桌子下面。',
        grammarPoint: 'under + 家具（在…下面）',
      },
    ],
    extraTips: [
      '记忆口诀："on在上，under下，上下位置分得清；on要接触表面贴，under底下藏得严"',
      '易错提醒：on the wall是"在墙面上"（如挂画），in the wall是"在墙里面"（如嵌入的窗户），别搞混！',
      '趣味知识：英语说"on fire"（着火），火是在物体"上面"燃烧的，所以用on，是不是很形象？',
    ],
  },

  // ==================== 第24课：复习：介词on/under练习 ====================
  24: {
    explanation:
      '让我们来巩固on和under这两个方位介词！on就像你把书包"放"在椅子上——书包和椅子是直接接触的，书包在椅子的上面。under就像你的小猫"藏"在桌子底下——小猫在桌子的正下方。描述房间里物品的位置是练习on和under最好的方法。看看你的房间：闹钟在哪里？是不是on the desk（在桌子上）？你的拖鞋在哪里？是不是under the bed（在床底下）？学会了on和under，你就能用英语描述大部分东西的位置了。记住，这两个介词都是用来描述静态位置的，句子通常是"...is on/under..."的结构。',
    extraRules: [
      'on the + 名词 = 在……上面（直接接触表面）：on the floor（在地板上），on the shelf（在架子上）',
      'under the + 名词 = 在……下面（正下方）：under the bridge（在桥下面），under the umbrella（在雨伞下）',
      'on还可以表示穿戴：The hat is on his head.（帽子在他头上。）/ He is wearing a coat.（他穿着外套。）',
      'under有时也有"少于"的意思：Children under ten（十岁以下的孩子们）',
      '询问位置的句型：Where is...? → It is on/under the...',
    ],
    extraExamples: [
      {
        english: 'The bag is on the chair.',
        chinese: '书包在椅子上。',
        grammarPoint: 'on + 家具（在…上面）',
      },
      {
        english: 'The cat is under the bed.',
        chinese: '猫在床下面。',
        grammarPoint: 'under + 家具（在…下面）',
      },
      {
        english: 'Where is the pen? It is on the book.',
        chinese: '钢笔在哪里？它在书上面。',
        grammarPoint: 'Where is + 名词？It is on...',
      },
      {
        english: 'The shoes are under the desk.',
        chinese: '鞋子在桌子下面。',
        grammarPoint: 'under + 家具',
      },
      {
        english: 'There is a lamp on the table.',
        chinese: '桌子上有一盏灯。',
        grammarPoint: 'There is...on + 名词',
      },
      {
        english: 'The football is under the sofa.',
        chinese: '足球在沙发下面。',
        grammarPoint: 'under + 家具',
      },
    ],
    extraTips: [
      '练习方法：在家里玩"寻宝游戏"——让家人把东西放在桌上或桌下，你用英语说出位置！',
      '易错提醒：不要把on和in搞混。on是"在表面"，in是"在里面"：on the box（在盒子上面）vs in the box（在盒子里面）',
      '生活小窍门：妈妈让你找东西时，你可以用英语回答"It\'s on/under the..."，让妈妈刮目相看！',
    ],
  },

  // ==================== 第25课：There is句型 ====================
  25: {
    explanation:
      'There is就像一个"介绍员"，专门用来向别人介绍"某个地方有某个东西"。比如你走进一个新房间，想告诉朋友"桌子上有一本书"，你就可以说"There is a book on the table"。注意，There is后面跟的是单数名词（一个东西），它把"有"这个信息放在句子开头，引起别人的注意。这和中文的语序不太一样——中文说"桌子上有一本书"，地点在前面；而英语说"There is a book on the table"，东西在中间，地点在后面。There is还有个可爱的缩写形式：There\'s，就像给它取了个小名，口语中经常用。There is是英语中出现频率极高的句型，学会它你就打开了描述世界的一扇窗！',
    extraRules: [
      'There is + 单数名词 + 地点：表示"某处有一个……"（There is a clock on the wall.）',
      "缩写形式：There is → There's（There's a cat under the table.）",
      "否定句：There is not + 名词 = There isn't + 名词（There isn't a book on the desk.）",
      "疑问句：Is there + 名词 + 地点？（Is there a pen on the desk?）肯定：Yes, there is. 否定：No, there isn't.",
      '就近原则：There is...or...结构中，be动词与最近的名词保持一致',
    ],
    extraExamples: [
      {
        english: 'There is a cat under the table.',
        chinese: '桌子下面有一只猫。',
        grammarPoint: 'There is + 单数名词 + 介词短语',
      },
      {
        english: "There's a park near my school.",
        chinese: '我学校附近有一个公园。',
        grammarPoint: "There's + 名词 + 介词短语",
      },
      {
        english: 'There is not a pencil in my bag.',
        chinese: '我的书包里没有铅笔。',
        grammarPoint: 'There is not + 名词',
      },
      {
        english: 'Is there a bathroom here?',
        chinese: '这里有洗手间吗？',
        grammarPoint: 'Is there + 名词 + 地点？',
      },
      {
        english: 'Yes, there is.',
        chinese: '是的，有。',
        grammarPoint: '肯定回答：Yes, there is.',
      },
      {
        english: "There isn't a dog in the garden.",
        chinese: '花园里没有狗。',
        grammarPoint: "There isn't + 名词",
      },
    ],
    extraTips: [
      '记忆口诀："There is介绍有东西，地点放在最后边；缩写There\'s更简洁，否定isn\'t加前面"',
      '易错提醒：There is后面只能跟单数名词或不可数名词！如果东西是复数（两个以上），要用There are',
      '趣味知识：There is的There不翻译成"那里"，它只是用来"占位"的虚词，真正表示"有"的是is！',
    ],
  },

  // ==================== 第26课：复习：There is句型练习 ====================
  26: {
    explanation:
      '今天我们来全面练习There is句型的三种形式：肯定句、否定句和疑问句。肯定句"There is + 名词 + 地点"表示"某处有某物"，比如"There is a mirror in the bathroom"（浴室里有一面镜子）。否定句在is后面加not，表示"某处没有某物"，比如"There isn\'t a TV in my bedroom"（我的卧室里没有电视）。疑问句把is提到there前面，用来询问"某处有……吗？"，比如"Is there a supermarket near here?"（这附近有超市吗？）。三种句式就像"变身三连拍"——同一个意思，换三种方式表达！掌握这三种句式，你就能灵活地描述、否认和询问任何地方有什么东西了。',
    extraRules: [
      '肯定句：There is + a/an + 单数名词 + 介词短语.（There is an apple on the plate.）',
      "否定句：There isn't + a/an + 单数名词 + 介词短语.（There isn't an apple on the plate.）",
      '疑问句：Is there + a/an + 单数名词 + 介词短语?（Is there an apple on the plate?）',
      "简短回答：Yes, there is. / No, there isn't.（不能用缩写回答）",
      '不可数名词也用There is：There is some water in the glass.（杯子里有一些水。）',
    ],
    extraExamples: [
      {
        english: 'There is a hospital near my home.',
        chinese: '我家附近有一家医院。',
        grammarPoint: '肯定句：There is + 名词 + 地点',
      },
      {
        english: "There isn't a swimming pool in our school.",
        chinese: '我们学校没有游泳池。',
        grammarPoint: "否定句：There isn't + 名词",
      },
      {
        english: 'Is there a computer in the classroom?',
        chinese: '教室里有电脑吗？',
        grammarPoint: '疑问句：Is there + 名词 + 地点？',
      },
      {
        english: "Yes, there is. There is one on the teacher's desk.",
        chinese: '是的，有。老师桌子上有一台。',
        grammarPoint: '肯定回答 + 补充说明',
      },
      {
        english: "There's some milk in the fridge.",
        chinese: '冰箱里有一些牛奶。',
        grammarPoint: "There's + 不可数名词",
      },
      {
        english: 'Is there any juice in the bottle?',
        chinese: '瓶子里有果汁吗？',
        grammarPoint: 'Is there + any + 不可数名词？',
      },
    ],
    extraTips: [
      '句式转换口诀："肯定is站中间，否定not跟后面，疑问is跑到最前面，回答yes/no来交换"',
      '易错提醒：回答"There is"的疑问句时，不能说"Yes, it is."，必须说"Yes, there is."',
      '实战练习：用There is描述你房间里的东西，试着写出5个肯定句、3个否定句和3个疑问句！',
    ],
  },

  // ==================== 第27课：There are句型 ====================
  27: {
    explanation:
      '如果There is是介绍"一个东西"的介绍员，那There are就是介绍"一群东西"的介绍员。当某个地方有不止一个东西时，我们就用"There are + 复数名词 + 地点"。比如"There are three books on the desk"（桌子上有三本书）。注意名词一定要用复数形式——要么加-s，要么加-es，就像给单词穿上了"复数外套"。There are还有两个好朋友：some和any。some用在肯定句中表示"一些"（There are some flowers in the garden.），any用在否定句和疑问句中（Are there any flowers in the garden? / There aren\'t any flowers in the garden.）。some就像一个乐观的人，总是出现在好消息里；any则更中性，出现在提问和否定中。',
    extraRules: [
      'There are + 复数名词 + 地点：表示"某处有一些……"（There are five apples on the table.）',
      "否定句：There aren't + 复数名词（There aren't any chairs in the room.）",
      '疑问句：Are there + 复数名词 + 地点？（Are there any books on the shelf?）',
      "some用在肯定句中（There are some cookies.），any用在否定句和疑问句中（Are there any cookies? / There aren't any cookies.）",
      '名词复数变化规则：一般加-s（book→books），以s/x/ch/sh结尾加-es（box→boxes），辅音+y结尾变y为i加-es（baby→babies）',
    ],
    extraExamples: [
      {
        english: 'There are many students in the playground.',
        chinese: '操场上有很多学生。',
        grammarPoint: 'There are + 复数名词 + 地点',
      },
      {
        english: "There aren't any pencils in the box.",
        chinese: '盒子里没有铅笔。',
        grammarPoint: "There aren't + any + 复数名词",
      },
      {
        english: 'Are there any shops near here?',
        chinese: '这附近有商店吗？',
        grammarPoint: 'Are there + any + 复数名词？',
      },
      {
        english: 'Yes, there are some shops on this street.',
        chinese: '是的，这条街上有一些商店。',
        grammarPoint: '肯定回答用some',
      },
      {
        english: 'There are some flowers in the garden.',
        chinese: '花园里有一些花。',
        grammarPoint: 'There are + some + 复数名词',
      },
      {
        english: 'There are two cats under the bed.',
        chinese: '床下面有两只猫。',
        grammarPoint: 'There are + 数字 + 复数名词',
      },
    ],
    extraTips: [
      '记忆口诀："There are复数用，some肯定any否和问；名词记得加s，are跟着复数走"',
      '易错提醒：There are后面必须跟复数名词！不能说"There are a book"，要说"There is a book"或"There are some books"',
      '趣味知识：some和any的规则也适用于不可数名词哦，比如"some water"（肯定）和"any water"（否定/疑问）',
    ],
  },

  // ==================== 第28课：复习：There are句型练习 ====================
  28: {
    explanation:
      '今天我们要把There are句型练得滚瓜烂熟！There are专门用来描述"某个地方有一些东西"，记住后面一定要跟复数名词。我们还要重点对比some和any的用法——some出现在肯定句中，表示"有一些"；any出现在否定句和疑问句中，表示"一些"或"任何"。比如"There are some books on the shelf"（书架上有一些书）是肯定句用some；"Are there any books on the shelf?"（书架上有书吗？）是疑问句用any；"There aren\'t any books on the shelf"（书架上没有书）是否定句用any。some和any就像天气预报里的"晴天"和"雨天"——晴天（肯定）用some，雨天（否定）和不确定（疑问）用any。',
    extraRules: [
      'There are + 复数名词：There are some birds in the tree.（树上有一些鸟。）',
      'some vs any：some用在肯定句，any用在否定句和疑问句',
      '数词+名词：There are ten desks in the classroom.（教室里有十张桌子。）',
      'a lot of/many + 复数名词：There are a lot of people in the park.（公园里有很多人。）',
      'How many...are there? 用来提问数量：How many students are there in your class?（你们班有多少学生？）',
    ],
    extraExamples: [
      {
        english: 'There are some chairs in the living room.',
        chinese: '客厅里有一些椅子。',
        grammarPoint: '肯定句用some',
      },
      {
        english: 'Are there any bananas in the kitchen?',
        chinese: '厨房里有香蕉吗？',
        grammarPoint: '疑问句用any',
      },
      {
        english: "There aren't any eggs in the fridge.",
        chinese: '冰箱里没有鸡蛋。',
        grammarPoint: '否定句用any',
      },
      {
        english: 'How many windows are there in the classroom?',
        chinese: '教室里有多少扇窗户？',
        grammarPoint: 'How many + 复数名词 + are there?',
      },
      {
        english: 'There are twenty desks in our classroom.',
        chinese: '我们教室里有二十张桌子。',
        grammarPoint: 'There are + 数字 + 复数名词',
      },
      {
        english: 'There are a lot of fish in the river.',
        chinese: '河里有很多鱼。',
        grammarPoint: 'There are + a lot of + 复数名词',
      },
    ],
    extraTips: [
      'some/any口诀："肯定some笑哈哈，否定any来帮忙，疑问any探头看，三个场合分得清"',
      '易错提醒：fish的复数还是fish（不变），类似的还有sheep→sheep，deer→deer，这些"不变复数"要特别记住！',
      '实战练习：数一数你的文具盒里有多少东西，用"There are...in my pencil box."造句吧！',
    ],
  },

  // ==================== 第29课：祈使句 ====================
  29: {
    explanation:
      '祈使句就像是一个"命令按钮"或"邀请卡"，它直接用动词原形开头，告诉别人做什么事情。比如"Stand up!"（站起来！）、"Open the door."（打开门。）、"Come in, please."（请进。）祈使句最大的特点就是省略了主语you——因为说话的对象就在面前，不需要再说"你"。就像你对着朋友直接说"过来！"，不需要说"你过来！"。祈使句可以用在很多场合：老师对学生说"Sit down, please"（请坐下），妈妈对孩子说"Hurry up"（快点），教练对球员说"Run!"（跑！）。祈使句可以很温柔（加please），也可以很严肃（不加please，语气更强），就像音乐可以轻柔也可以激昂！',
    extraRules: [
      '祈使句结构：动词原形 + 其他（省略主语you）：Open the window.（打开窗户。）',
      "祈使句的否定形式：Don't + 动词原形：Don't open the window.（不要打开窗户。）",
      '为了使语气更礼貌，可以在句首或句末加please：Please sit down. / Sit down, please.',
      "Let's...（让我们……）也是祈使句的一种：Let's go to school.（我们去上学吧。）",
      '祈使句可以用来表达命令（Run!）、请求（Help me, please.）、建议（Try this one.）、警告（Watch out!）等',
    ],
    extraExamples: [
      {
        english: 'Open your books, please.',
        chinese: '请打开你们的书。',
        grammarPoint: '动词原形 + 宾语 + please',
      },
      {
        english: "Don't be late for school.",
        chinese: '上学不要迟到。',
        grammarPoint: "Don't + 动词原形",
      },
      {
        english: "Let's play football together.",
        chinese: '我们一起踢足球吧。',
        grammarPoint: "Let's + 动词原形",
      },
      {
        english: 'Be quiet in the library!',
        chinese: '在图书馆里要安静！',
        grammarPoint: 'Be + 形容词（be动词的祈使句）',
      },
      {
        english: 'Come and sit next to me.',
        chinese: '过来坐在我旁边。',
        grammarPoint: '动词原形 + and + 动词原形',
      },
      {
        english: "Don't touch the fire!",
        chinese: '不要碰火！',
        grammarPoint: "Don't + 动词原形（警告）",
      },
    ],
    extraTips: [
      '记忆口诀："祈使句，很简单，动词原形站最前；主语you，不用说，大家都知道；please加一加，命令变请求！"',
      '易错提醒：祈使句用动词原形，不要加-s或-ing！不能说"Opens the door."要说"Open the door."',
      '趣味知识：世界上很多标语都是祈使句，比如"Keep quiet"（保持安静）、"No smoking"（禁止吸烟的否定祈使句）',
    ],
  },

  // ==================== 第30课：复习：祈使句练习 ====================
  30: {
    explanation:
      '今天我们来全面复习祈使句，并学习一个新朋友——must。祈使句的结构很简单：动词原形开头，省略主语you。它就像遥控器上的"按钮"，一按就执行！否定祈使句在动词原形前面加"Don\'t"。今天重点学习的must表示"必须"，是一个情态动词，后面跟动词原形。比如"You must finish your homework"（你必须完成作业）。must比please加祈使句的语气更强，表示"一定要做"，不能商量。在学校里老师说"You must wear your uniform"（你必须穿校服），这就是规定，不能违反。must的否定形式是mustn\'t，表示"禁止"，语气非常强烈，比如"You mustn\'t run in the hallway"（你禁止在走廊里跑）。',
    extraRules: [
      'must + 动词原形：表示"必须做某事"（You must listen to the teacher.）',
      'mustn\'t + 动词原形：表示"禁止做某事"（You mustn\'t play with fire.）',
      'Must I...? 的一般疑问句：Must I finish it now?（我必须现在完成吗？）',
      'must没有时态变化，无论什么人称都用must',
      'must vs 祈使句：must用于规定/义务，祈使句用于直接命令/请求',
    ],
    extraExamples: [
      {
        english: 'You must do your homework first.',
        chinese: '你必须先做作业。',
        grammarPoint: 'must + 动词原形',
      },
      {
        english: "You mustn't run in the hallway.",
        chinese: '你禁止在走廊里跑。',
        grammarPoint: "mustn't + 动词原形",
      },
      {
        english: 'Students must wear school uniforms.',
        chinese: '学生必须穿校服。',
        grammarPoint: '主语 + must + 动词原形',
      },
      {
        english: 'Must I finish it today?',
        chinese: '我今天必须完成吗？',
        grammarPoint: 'Must + 主语 + 动词原形？',
      },
      {
        english: 'You must be polite to old people.',
        chinese: '你必须对老人有礼貌。',
        grammarPoint: 'must + be + 形容词',
      },
      {
        english: "You mustn't talk in the exam.",
        chinese: '考试时不准交谈。',
        grammarPoint: "mustn't + 动词原形（禁令）",
      },
    ],
    extraTips: [
      '记忆口诀："must必须记心头，后面原形跟着走；mustn\'t是禁止，语气强烈不商量"',
      '易错提醒：must后面直接跟动词原形，不能加to！不能说"must to go"，要说"must go"',
      '趣味知识：在英国，must还有一个特殊用法——表示"肯定的推测"，比如"You must be tired"（你一定累了），等你学深了就知道啦！',
    ],
  },

  // ==================== 第31课：现在进行时 ====================
  31: {
    explanation:
      '现在进行时就像是一个"实时直播镜头"，用来描述此刻正在发生的事情。它的结构是"am/is/are + 动词-ing"，比如"I am reading a book"（我正在读书）。想象你在拍照，快门按下的那一瞬间，照片里的人正在做什么，就用现在进行时来描述。I后面用am，he/she/it后面用is，we/you/they后面用are，然后把动词加上-ing尾巴。动词加-ing有一些小规则：一般直接加（play→playing），以不发音的e结尾去e加（make→making），重读闭音节双写末尾字母加（run→running）。现在进行时是最常用的时态之一，每当你想表达"正在……"的意思时，就用它！',
    extraRules: [
      '现在进行时结构：主语 + am/is/are + 动词-ing',
      '一般动词加-ing：read→reading, play→playing, watch→watching',
      '以不发音的e结尾，去e加-ing：make→making, write→writing, dance→dancing',
      '重读闭音节（辅元辅结构），双写末尾辅音字母加-ing：run→running, swim→swimming, sit→sitting',
      '以ie结尾的动词，变ie为y加-ing：die→dying, lie→lying, tie→tying',
    ],
    extraExamples: [
      {
        english: 'I am doing my homework now.',
        chinese: '我现在正在做作业。',
        grammarPoint: 'I + am + doing',
      },
      {
        english: 'She is watching TV.',
        chinese: '她正在看电视。',
        grammarPoint: 'She + is + watching',
      },
      {
        english: 'They are playing basketball.',
        chinese: '他们正在打篮球。',
        grammarPoint: 'They + are + playing',
      },
      {
        english: 'The baby is sleeping.',
        chinese: '宝宝正在睡觉。',
        grammarPoint: 'The baby + is + sleeping',
      },
      {
        english: 'He is making a model plane.',
        chinese: '他正在做一架模型飞机。',
        grammarPoint: 'is + making（去e加-ing）',
      },
      {
        english: 'We are swimming in the pool.',
        chinese: '我们正在游泳池里游泳。',
        grammarPoint: 'are + swimming（双写m加-ing）',
      },
    ],
    extraTips: [
      '记忆口诀："现在进行直播中，am/is/are加ing；I用am，他用is，复数are要记清"',
      '易错提醒：以e结尾的动词加-ing时，要去掉e！不能说"makeing"，要说"making"',
      '趣味知识：有些动词表示状态，一般不用现在进行时，比如like、know、want等。你不会说"I am liking apples"，只能说"I like apples"',
    ],
  },

  // ==================== 第32课：复习：现在进行时练习 ====================
  32: {
    explanation:
      '今天我们重点练习用"What is he/she doing?"来询问别人正在做什么，以及如何回答。这是现在进行时最常见的问答形式。问句的结构是"What + am/is/are + 主语 + doing?"，回答用"主语 + am/is/are + 动词-ing"。比如"What is your mom doing?"（你妈妈在做什么？）→"She is cooking dinner."（她正在做晚饭。）注意问句中doing是do的-ing形式，回答中的动词要换成具体的动作。这就像是你看着监控画面问"那个人在干什么？"，然后另一个人回答"他在看书"。现在进行时的问答在生活中非常实用，随时随地都能用！',
    extraRules: [
      'What + am/is/are + 主语 + doing? = ……正在做什么？',
      '回答：主语 + am/is/are + 动词-ing.（要具体说明动作）',
      '询问自己：What am I doing?（我在做什么？）——这种问法有时用于自言自语',
      '注意am/is/are要和主语搭配：What is she doing? What are they doing?',
      '现在进行时的标志词：now（现在）、right now（此刻）、at the moment（此刻）、Look!（看！）、Listen!（听！）',
    ],
    extraExamples: [
      {
        english: 'What is he doing?',
        chinese: '他正在做什么？',
        grammarPoint: 'What + is + he + doing?',
      },
      {
        english: 'He is reading a comic book.',
        chinese: '他正在看漫画书。',
        grammarPoint: 'He + is + reading',
      },
      {
        english: 'What are you doing?',
        chinese: '你正在做什么？',
        grammarPoint: 'What + are + you + doing?',
      },
      { english: "I'm drawing a picture.", chinese: '我正在画画。', grammarPoint: "I'm + drawing" },
      {
        english: 'What is the dog doing?',
        chinese: '狗正在做什么？',
        grammarPoint: 'What + is + the dog + doing?',
      },
      {
        english: 'It is eating a bone.',
        chinese: '它正在啃骨头。',
        grammarPoint: 'It + is + eating',
      },
    ],
    extraTips: [
      '口诀复习："What问什么doing，is/are跟着主语走；回答也用进行时，具体动作说清楚"',
      '易错提醒：不要忘记am/is/are！不能说"What he doing?"，要说"What is he doing?"',
      '趣味游戏：和同学玩"猜动作"——一个人做动作，另一个人问"What are you doing?"，做动作的人用英语回答！',
    ],
  },

  // ==================== 第33课：现在进行时（复数） ====================
  33: {
    explanation:
      '当我们想描述一群人在做什么时，就需要用复数主语的现在进行时。结构是"We/They + are + 动词-ing"，比如"We are singing"（我们正在唱歌）和"They are dancing"（他们正在跳舞）。复数主语包括we（我们）、you（你们）、they（他们/她们/它们），以及复数名词如the boys、my friends等，它们都用are。现在进行时的疑问句也很简单：把are提到主语前面就行——"Are they playing?"（他们在玩吗？）→"Yes, they are."或"No, they aren\'t."。当你用What提问时，"What are they doing?"（他们在做什么？）→"They are running."（他们在跑步。）记住，复数主语的"好搭档"永远是are！',
    extraRules: [
      '复数主语的现在进行时：We/You/They + are + 动词-ing',
      '疑问句：Are + 复数主语 + 动词-ing?（Are they playing football?）',
      'What + are + 复数主语 + doing? = ……们正在做什么？',
      "肯定回答：Yes, they are. 否定回答：No, they aren't.",
      '复数名词（如the children, my parents, the cats）也用are：The children are running.',
    ],
    extraExamples: [
      {
        english: 'We are having an English class.',
        chinese: '我们正在上英语课。',
        grammarPoint: 'We + are + having',
      },
      {
        english: 'They are cleaning the classroom.',
        chinese: '他们正在打扫教室。',
        grammarPoint: 'They + are + cleaning',
      },
      {
        english: 'Are the boys playing football?',
        chinese: '男孩们在踢足球吗？',
        grammarPoint: 'Are + 复数名词 + 动词-ing？',
      },
      {
        english: 'What are the girls doing?',
        chinese: '女孩们在做什么？',
        grammarPoint: 'What + are + 复数名词 + doing?',
      },
      {
        english: 'The birds are singing in the tree.',
        chinese: '鸟儿们在树上唱歌。',
        grammarPoint: '复数名词 + are + singing',
      },
      {
        english: 'My parents are cooking in the kitchen.',
        chinese: '我父母正在厨房做饭。',
        grammarPoint: 'My parents + are + cooking',
      },
    ],
    extraTips: [
      '记忆口诀："复数主语配are，are加ing来直播；they are, we are, you are，永远记住这个搭！"',
      '易错提醒：不要把复数主语和is搭配！不能说"They is playing"，要说"They are playing"',
      '趣味知识：英语中"people"（人们）是复数名词，要说"People are dancing"，不能说"People is dancing"哦！',
    ],
  },

  // ==================== 第34课：复习：现在进行时（复数）练习 ====================
  34: {
    explanation:
      '今天我们全面练习复数主语的现在进行时，重点是"What are they doing?"的问答。这个句型在生活中特别实用：看到一群人在公园里，你好奇他们在干什么，就可以问"What are they doing?"，然后回答"They are flying kites."（他们在放风筝。）我们来复习一下单复数对比：单数用is（He is running.），复数用are（They are running.）。现在进行时的三要素是：主语 + am/is/are + 动词-ing。无论主语是单数还是复数，只要把am/is/are选对了，再把动词加上-ing，句子就对了。这就像搭积木，每一块都要放在正确的位置！',
    extraRules: [
      '单复数对比：He/She/It + is + doing vs We/They + are + doing',
      'What are they doing? 用于询问复数主语正在做什么',
      '名词复数做主语时也用are：The students are studying.',
      '现在进行时标志词：Look! Listen! now, at the moment',
      "Let's后面不跟进行时：Let's go.（不是Let's going.）",
    ],
    extraExamples: [
      {
        english: 'What are they doing in the park?',
        chinese: '他们在公园里做什么？',
        grammarPoint: 'What + are + they + doing + 地点？',
      },
      {
        english: 'They are flying kites.',
        chinese: '他们在放风筝。',
        grammarPoint: 'They + are + flying',
      },
      {
        english: 'Look! The children are playing games.',
        chinese: '看！孩子们正在玩游戏。',
        grammarPoint: 'Look! + 复数名词 + are + playing',
      },
      {
        english: 'Listen! The birds are singing.',
        chinese: '听！鸟儿们在唱歌。',
        grammarPoint: 'Listen! + 复数名词 + are + singing',
      },
      {
        english: 'We are all waiting for the bus.',
        chinese: '我们都在等公交车。',
        grammarPoint: 'We + are + all + waiting',
      },
      {
        english: 'The cats are sleeping under the tree.',
        chinese: '猫儿们正在树下睡觉。',
        grammarPoint: '复数名词 + are + sleeping',
      },
    ],
    extraTips: [
      '口诀复习："Look和Listen是信号，看到它们用进行时；单数is复数are，ing跟在后面跑！"',
      '易错提醒：Look和Listen是现在进行时的"信号词"，看到它们就要想到用进行时态！',
      '实战练习：观察公园或校园里的人们，用"They are..."造句描述他们正在做的事情吧！',
    ],
  },

  // ==================== 第35课：方位介词和短语 ====================
  35: {
    explanation:
      '方位介词就像一张"地图指南针"，帮你在英语中精确描述东西在哪里。除了我们学过的on和under，还有一大群方位介词朋友：across表示"穿过"（横着走过去），along表示"沿着"（顺着一条路走），over表示"越过"（从上面翻过去），under表示"在下面"，between表示"在两者之间"。想象你在公园里：你沿着小路走（along the path），穿过小桥（across the bridge），从栏杆上面翻过去（over the fence），走到两棵树之间（between two trees）。每个介词都有自己独特的"运动方式"，就像不同的交通工具带你去不同的地方！',
    extraRules: [
      'across = 穿过（从一边到另一边）：Walk across the street.（过马路。）',
      'along = 沿着（顺着一条线走）：Walk along the river.（沿着河走。）',
      'over = 越过（从上面翻过去）：The cat jumped over the wall.（猫跳过了墙。）',
      'between = 在两者之间：The ball is between the two boxes.（球在两个箱子之间。）',
      'across vs over vs through：across是"横穿"，over是"跨越"，through是"穿过"（从内部穿过）',
    ],
    extraExamples: [
      {
        english: 'Walk across the bridge.',
        chinese: '走过那座桥。',
        grammarPoint: 'across（横穿）',
      },
      {
        english: 'The dog is running along the beach.',
        chinese: '狗沿着沙滩跑。',
        grammarPoint: 'along（沿着）',
      },
      {
        english: 'The plane is flying over the city.',
        chinese: '飞机正在城市上空飞过。',
        grammarPoint: 'over（从上方越过）',
      },
      {
        english: 'The ball is between the two chairs.',
        chinese: '球在两把椅子之间。',
        grammarPoint: 'between（在两者之间）',
      },
      {
        english: 'Walk along the street and turn left.',
        chinese: '沿着街走然后左转。',
        grammarPoint: 'along + 地点',
      },
      {
        english: 'The school is between the park and the hospital.',
        chinese: '学校在公园和医院之间。',
        grammarPoint: 'between A and B',
      },
    ],
    extraTips: [
      '记忆口诀："across横着穿，along顺着走，over翻过去，between在中间"',
      '易错提醒：between是"在两者之间"，如果是三者以上要用among（在多者之间）！',
      '趣味知识：across的词根cross是"十字"的意思，所以across就像走十字路线——从这一边到那一边！',
    ],
  },

  // ==================== 第36课：复习：方位介词和短语练习 ====================
  36: {
    explanation:
      '今天我们来全面复习方位介词，把across、along、over、under、between这些"方向小助手"练得更熟练。方位介词描述的是一种空间关系——东西在哪里，或者东西往哪个方向移动。across强调"横穿"，比如过马路、过桥；along强调"顺着"，比如沿着河走、沿着街道走；over强调"从上方越过"，比如跳过篱笆、飞过屋顶；under强调"在正下方"；between强调"在两者之间"。这些介词可以用来描述静态位置（The ball is between the two boxes.）也可以描述动态运动（Walk along the street.）。试着在脑海中画一幅地图，用这些介词标注各个地点和路线！',
    extraRules: [
      '静态位置：The book is between the two pencils.（书在两支铅笔之间。）',
      '动态运动：Walk across the road.（过马路。）/ Run along the path.（沿着小路跑。）',
      'over的多种含义：翻越（jump over the wall）、在上方（fly over the city）、结束（class is over）',
      'between A and B = 在A和B之间（固定搭配）：between the school and the hospital',
      '询问方向：Where is...? → It is between/over/under/across...',
    ],
    extraExamples: [
      {
        english: 'The cat jumped over the fence.',
        chinese: '猫跳过了篱笆。',
        grammarPoint: 'over（翻越）',
      },
      {
        english: 'We walked along the river yesterday.',
        chinese: '我们昨天沿着河边散步了。',
        grammarPoint: 'along（沿着）',
      },
      {
        english: "Don't walk across the road alone.",
        chinese: '不要独自过马路。',
        grammarPoint: 'across（横穿）',
      },
      {
        english: 'The bookshop is between the bank and the post office.',
        chinese: '书店在银行和邮局之间。',
        grammarPoint: 'between A and B',
      },
      {
        english: 'The tunnel goes through the mountain.',
        chinese: '隧道穿过那座山。',
        grammarPoint: 'through（从内部穿过）',
      },
      {
        english: 'A bird is flying over our heads.',
        chinese: '一只鸟正从我们头顶飞过。',
        grammarPoint: 'over（在上方）',
      },
    ],
    extraTips: [
      '口诀汇总："across横穿到对面，along沿线慢慢走，over从上翻过去，through从中穿过来，between夹在两中间"',
      '易错提醒：across和through容易搞混！across是从表面横穿（过马路），through是从内部穿过（穿过隧道）',
      '实战练习：画一张你学校的地图，用方位介词标注各栋楼之间的位置关系吧！',
    ],
  },

  // ==================== 第37课：be going to 结构 ====================
  37: {
    explanation:
      '"be going to"就像是一个"未来计划表"，用来表达你打算做某事或即将发生的事。它的结构是"am/is/are + going to + 动词原形"。比如"I am going to visit my grandma tomorrow"（我明天打算去看望奶奶）。be going to有两种主要用法：第一，表示"计划和打算"，就像你已经想好了要做的事；第二，表示"根据迹象预测"，比如你看到乌云密布就说"It is going to rain"（快要下雨了）。注意be going to中的going to不表示"去"的意思，它只是构成将来时态的"工具"。be动词要根据主语变化：I用am，he/she/it用is，we/they用are。这个结构在日常对话中用得非常多！',
    extraRules: [
      '肯定句：主语 + am/is/are + going to + 动词原形（I am going to play football.）',
      '否定句：主语 + am/is/are + not + going to + 动词原形（I am not going to go.）',
      '疑问句：Am/Is/Are + 主语 + going to + 动词原形?（Are you going to come?）',
      "简短回答：Yes, I am. / No, I'm not. / Yes, she is. / No, she isn't.",
      'be going to用于计划好的事情或有迹象的预测，will用于临时决定',
    ],
    extraExamples: [
      {
        english: 'I am going to do my homework after school.',
        chinese: '我打算放学后做作业。',
        grammarPoint: 'I + am + going to + 动词原形',
      },
      {
        english: 'She is going to buy a new dress.',
        chinese: '她打算买一条新裙子。',
        grammarPoint: 'She + is + going to + 动词原形',
      },
      {
        english: 'Are they going to have a party?',
        chinese: '他们打算开派对吗？',
        grammarPoint: 'Are + they + going to + 动词原形？',
      },
      {
        english: 'We are going to travel to Beijing.',
        chinese: '我们打算去北京旅行。',
        grammarPoint: 'We + are + going to + 动词原形',
      },
      {
        english: "It's going to rain. Take an umbrella.",
        chinese: '快要下雨了。带把伞。',
        grammarPoint: "It's going to + 动词（预测）",
      },
      {
        english: 'He is not going to play games tonight.',
        chinese: '他今晚不打算玩游戏。',
        grammarPoint: 'is + not + going to + 动词原形',
      },
    ],
    extraTips: [
      '记忆口诀："be going to表将来，打算计划记心上；am/is/are打头阵，going to加原形不要忘"',
      '易错提醒：going to后面必须跟动词原形！不能说"going to playing"，要说"going to play"',
      '趣味知识："be going to"在口语中常被读成"be gonna"，比如"I\'m gonna go"就是"I\'m going to go"的口语版！',
    ],
  },

  // ==================== 第38课：复习：be going to 练习 ====================
  38: {
    explanation:
      '今天我们来全面练习be going to的句型转换，包括肯定句、否定句和疑问句之间的互换。be going to是一个非常实用的将来时结构，可以用来谈论你的计划和打算。句型转换的关键在于be动词的位置：肯定句中be动词在主语后面（I am going to...），否定句在be动词后面加not（I am not going to...），疑问句把be动词提到主语前面（Am I going to...?）。这和be动词的疑问句规则是一样的！记住be going to中的to后面永远跟动词原形。试着用be going to来写一份"周末计划"——你打算做什么、不打算做什么，然后用疑问句问问朋友们的计划！',
    extraRules: [
      '肯定→否定：在be动词后加not（I am going to play. → I am not going to play.）',
      '肯定→疑问：把be动词提到主语前面（She is going to come. → Is she going to come?）',
      "否定→疑问：同样把be动词提前（He isn't going to go. → Is he going to go?）",
      '特殊疑问句：What + be + 主语 + going to + 动词原形?（What are you going to do?）',
      'Where/When/How等也可以引导be going to的特殊疑问句',
    ],
    extraExamples: [
      {
        english: 'What are you going to do this weekend?',
        chinese: '你这个周末打算做什么？',
        grammarPoint: 'What + are + you + going to + do?',
      },
      {
        english: "I'm going to visit my grandparents.",
        chinese: '我打算去看望我的祖父母。',
        grammarPoint: "I'm going to + 动词原形",
      },
      {
        english: 'Where are they going to go?',
        chinese: '他们打算去哪里？',
        grammarPoint: 'Where + are + they + going to + go?',
      },
      {
        english: "We aren't going to have a test tomorrow.",
        chinese: '我们明天没有考试。',
        grammarPoint: "aren't going to + 动词原形",
      },
      {
        english: 'Is she going to play the piano?',
        chinese: '她打算弹钢琴吗？',
        grammarPoint: 'Is + she + going to + 动词原形？',
      },
      {
        english: 'When is he going to finish his homework?',
        chinese: '他打算什么时候完成作业？',
        grammarPoint: 'When + is + he + going to + finish?',
      },
    ],
    extraTips: [
      '句型转换口诀："肯定变否定，not加中间；肯定变疑问，be动词跑前面；回答yes/no，简短最方便！"',
      '易错提醒：What are you going to do? 回答时不要说"I\'m going to doing"，要说"I\'m going to do/play/watch..."',
      '实战练习：写一个周末计划，用3个肯定句、2个否定句、3个疑问句，然后和同学互相问答！',
    ],
  },

  // ==================== 第39课：否定祈使句 ====================
  39: {
    explanation:
      '否定祈使句就像一个"红色警告灯"，告诉别人"不要做某事"！它的结构很简单："Don\'t + 动词原形"。比如"Don\'t run in the hallway"（不要在走廊里跑）、"Don\'t touch the fire"（不要碰火）。如果说肯定祈使句是"绿色通行灯"——鼓励你去做，那么否定祈使句就是"红色禁止灯"——阻止你去做。在生活中，否定祈使句无处不在：妈妈说"Don\'t stay up late"（不要熬夜），老师说"Don\'t talk in class"（不要在课堂上说话），公园的标语写着"Don\'t walk on the grass"（不要踩踏草坪）。Don\'t是do not的缩写，它在否定祈使句中永远站在动词原形前面，像一个忠诚的守卫！',
    extraRules: [
      "否定祈使句结构：Don't + 动词原形 + 其他.（Don't open the window.）",
      "Don't = Do not，口语中常用Don't",
      "否定祈使句也可以加please表示礼貌：Please don't be late.（请不要迟到。）",
      "Let's的否定形式：Let's not + 动词原形（Let's not go there. 我们别去那儿。）",
      'No + 动名词 = 禁止做某事（公共场所常见）：No smoking!（禁止吸烟！）No parking!（禁止停车！）',
    ],
    extraExamples: [
      {
        english: "Don't be late for class.",
        chinese: '上课不要迟到。',
        grammarPoint: "Don't + be + 形容词",
      },
      {
        english: "Don't play with fire.",
        chinese: '不要玩火。',
        grammarPoint: "Don't + 动词原形 + 介词短语",
      },
      {
        english: "Please don't make noise.",
        chinese: '请不要制造噪音。',
        grammarPoint: "Please + don't + 动词原形",
      },
      {
        english: "Don't watch too much TV.",
        chinese: '不要看太多电视。',
        grammarPoint: "Don't + 动词原形 + too much",
      },
      {
        english: "Let's not waste food.",
        chinese: '我们不要浪费食物。',
        grammarPoint: "Let's not + 动词原形",
      },
      {
        english: "Don't forget your homework!",
        chinese: '不要忘了你的作业！',
        grammarPoint: "Don't + 动词原形（提醒）",
      },
    ],
    extraTips: [
      '记忆口诀："否定祈使句，Don\'t打头阵；动词原形跟后面，红色警告要记清！"',
      '易错提醒：Don\'t后面跟动词原形，不能加-s或-ing！不能说"Don\'t runs"或"Don\'t running"',
      '趣味知识：在英语中，"No + 名词"也可以表示禁止，比如"No swimming"（禁止游泳）、"No dogs"（禁止带狗），这是公共标志的常见用法！',
    ],
  },

  // ==================== 第40课：复习：否定祈使句练习 ====================
  40: {
    explanation:
      '今天我们来全面复习否定祈使句，并和肯定祈使句做对比练习。肯定祈使句直接用动词原形开头，表示"请做某事"；否定祈使句在动词原形前面加Don\'t，表示"不要做某事"。一对一对比记忆最有效：Open the door.（开门。）/ Don\'t open the door.（不要开门。）Sit down.（坐下。）/ Don\'t sit down.（不要坐下。）否定祈使句的使用场景包括：提醒别人注意安全（Don\'t touch the wire!）、课堂纪律（Don\'t talk!）、生活建议（Don\'t eat too much candy.）。当你想让否定祈使句更礼貌时，可以加please：Please don\'t do that.（请不要那样做。）掌握肯定和否定祈使句的互换，你就拥有了表达"做"和"不做"的完整能力！',
    extraRules: [
      '肯定祈使句：动词原形 + 其他.（Come here. / Be quiet.）',
      "否定祈使句：Don't + 动词原形 + 其他.（Don't come here. / Don't be noisy.）",
      "be动词的否定祈使句：Don't + be + 形容词.（Don't be afraid. 不要害怕。/ Don't be shy. 不要害羞。）",
      "and连接的祈使句变否定：只在第一个动词前加Don't（Don't come and sit here.）",
      "否定祈使句的语气从温和到强烈：Please don't... → Don't... → Never...（Never do that again!）",
    ],
    extraExamples: [
      {
        english: 'Open your books.',
        chinese: '打开你们的书。（肯定祈使句）',
        grammarPoint: '动词原形 + 宾语',
      },
      {
        english: "Don't open your books.",
        chinese: '不要打开你们的书。（否定祈使句）',
        grammarPoint: "Don't + 动词原形",
      },
      {
        english: "Don't be afraid of the dark.",
        chinese: '不要害怕黑暗。',
        grammarPoint: "Don't + be + 形容词",
      },
      {
        english: "Don't read in the sun.",
        chinese: '不要在阳光下看书。',
        grammarPoint: "Don't + 动词原形 + 介词短语",
      },
      {
        english: "Let's go to school. → Let's not go to school.",
        chinese: '我们去上学吧。→ 我们别去上学了。',
        grammarPoint: "Let's → Let's not",
      },
      {
        english: 'Never give up!',
        chinese: '永不放弃！',
        grammarPoint: 'Never + 动词原形（强烈否定祈使句）',
      },
    ],
    extraTips: [
      '口诀总结："肯定祈使原形开，否定Don\'t站前排；Please加上更礼貌，Never用上语气强！"',
      "易错提醒：Don't be afraid.中的be不能省略！否定祈使句中be动词也要保留",
      "生活中的否定祈使句：注意观察身边的英文标语——Don't litter!（不要乱扔垃圾！）、Don't feed the animals!（不要喂动物！）都是否定祈使句哦！",
    ],
  },
};

export default batch1;
