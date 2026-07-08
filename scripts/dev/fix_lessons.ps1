# Fix script for lessons 73-108
$file = "I:\新概念英语练习王\src\data\lessons\completeLessons.ts"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# === Lesson 73: Fix Mrs.断行 + STOP/Srop OCR ===
# Merge "Last week Mrs." + "Mills went to London."
$content = $content.Replace(
    "{ speaker: '', content: 'Last week Mrs.' }`n          { speaker: '', content: 'Mills went to London.' }",
    "{ speaker: '', content: 'Last week Mrs. Mills went to London.' }"
)
# Remove STOP from content
$content = $content.Replace(
    "{ speaker: '', content: 'STOP ''I can ask him the way,'' she said to herself.' }",
    "{ speaker: '', content: '''I can ask him the way,'' she said to herself.' }"
)
# Remove Srop from content
$content = $content.Replace(
    "{ speaker: '', content: 'Srop He was a tourist.' }",
    "{ speaker: '', content: 'He was a tourist.' }"
)
# Remove STOP from content
$content = $content.Replace(
    "{ speaker: '', content: 'STOP He opened the book and found a phrase.' }",
    "{ speaker: '', content: 'He opened the book and found a phrase.' }"
)

# Fix Lesson 73 translation (now 14 paragraphs)
$content = $content.Replace(
    "translation: ['上周米尔斯夫人去了伦敦。', '她不太熟悉伦敦，所以迷路了。', '突然，她在公共汽车站附近看到一个男人。', '她走向他说：`"对不起，请问你能告诉我去国王街的路吗？`"', '那个男人愉快地微笑着。', '他不懂英语！他说德语。', '他是个游客。', '然后他把手伸进口袋，拿出一本常用语手册。', '他打开书找到了那个短语。', '他慢慢地读出那个短语。', '`"很抱歉，`"他说，`"我不会说英语。`"', '', '', '', '']",
    "translation: ['上周米尔斯夫人去了伦敦。', '她不太熟悉伦敦，所以迷路了。', '突然，她在公共汽车站附近看到一个男人。', '`"我可以问问路，`"她自言自语。', '`"打扰一下，`"她说。', '`"请问你能告诉我去国王街的路吗？`"那个男人愉快地微笑着。', '他不懂英语！', '他说德语。', '他是个游客。', '然后他把手伸进口袋，拿出一本常用语手册。', '他打开书找到了那个短语。', '他慢慢地读出那个短语。', '`"很抱歉，`"他说。', '`"我不会说英语。`"']"
)

Write-Host "Lesson 73 fixes applied"

# === Lesson 74: Fix jumbled paragraphs ===
$old74 = @"
        paragraphs: [
          { speaker: '', content: 'He shaved hurriedly He took a cake this morning and and ate it quickly.' },
          { speaker: '', content: 'cut himself badly.' },
          { speaker: '', content: 'I gave him a glass of water I met her in the street and he drank it thirstily.' },
          { speaker: '', content: 'the day before yesterday and she greeted me warmiy.' },
          { speaker: '', content: 'The bus went slowly They worked very hard yesterday afternoon this morning.' },
          { speaker: '', content: 'and we arrived home late.' },
          { speaker: '', content: 'We enjoyed ourselves He swam very well this afternoon.' },
          { speaker: '', content: 'very much last night.' },
        ],
        translation: ['他做了什么？', '他快速穿过马路。', '她做了什么？', '她工作很努力。', '他们做了什么？', '他们愉快地玩游戏。', '', ''],
"@
$new74 = @"
        paragraphs: [
          { speaker: '', content: 'He shaved hurriedly this morning and cut himself badly.' },
          { speaker: '', content: 'He took a cake and ate it quickly.' },
          { speaker: '', content: 'I gave him a glass of water and he drank it thirstily.' },
          { speaker: '', content: 'I met her in the street the day before yesterday and she greeted me warmly.' },
          { speaker: '', content: 'The bus went slowly yesterday afternoon and we arrived home late.' },
          { speaker: '', content: 'They worked very hard this morning.' },
          { speaker: '', content: 'We enjoyed ourselves very much last night.' },
          { speaker: '', content: 'He swam very well this afternoon.' },
        ],
        translation: ['他今天早上匆匆忙忙地刮胡子，把自己刮伤了。', '他拿了一块蛋糕，很快就吃完了。', '我给了他一杯水，他渴得喝光了。', '前天我在街上遇到了她，她热情地跟我打了招呼。', '昨天下午公共汽车开得很慢，我们很晚才到家。', '他们今天早上工作非常努力。', '我们昨晚玩得很开心。', '他今天下午游泳游得很好。'],
"@
$content = $content.Replace($old74, $new74)
Write-Host "Lesson 74 fixes applied"

# === Lesson 75: Fix speaker embedded in content ===
# Fix "LadY : Do you have any shoes like these?"
$content = $content.Replace(
    "{ speaker: '', content: 'LadY : Do you have any shoes like these?' }",
    "{ speaker: 'LADY', content: 'Do you have any shoes like these?' }"
)
# Fix "LAdY : Size five."
$content = $content.Replace(
    "{ speaker: 'SHOP ASSISTANT', content: 'LAdY : Size five.' }",
    "{ speaker: 'LADY', content: 'Size five.' }"
)
# Fix "LAdY : Black."
$content = $content.Replace(
    "{ speaker: 'SHOP ASSISTANT', content: 'LAdY : Black.' }",
    "{ speaker: 'LADY', content: 'Black.' }"
)
# Fix "LAdY : But my sister bought this pair last month."
$content = $content.Replace(
    "{ speaker: 'SHOP ASSISTANT', content: 'LAdY : But my sister bought this pair last month.' }",
    "{ speaker: 'LADY', content: 'But my sister bought this pair last month.' }"
)
# Fix "LAdY : Can you get a pair for me, please?"
$content = $content.Replace(
    "{ speaker: 'SHOP ASSISTANT', content: 'LAdY : Can you get a pair for me, please?' }",
    "{ speaker: 'LADY', content: 'Can you get a pair for me, please?' }"
)

# Fix Lesson 75 translation (19 paragraphs)
$old75trans = "translation: ['女士：你有像这样的鞋子吗？', '售货员：多大码？', '女士：五码。', '售货员：什么颜色？', '女士：黑色。', '售货员：抱歉，我们没有。', '女士：但我姐姐有这双。', '女士：她上个月买的。', '售货员：是在这里买的吗？', '女士：不，她是在美国买的。', '售货员：我们有像这样的鞋子，但码数更小。', '女士：我能看看吗？', '', '', '', '', '', '', '']"
$new75trans = "translation: ['女士：你有像这样的鞋子吗？', '售货员：什么尺码？', '女士：五码。', '售货员：什么颜色？', '女士：黑色。', '售货员：抱歉。', '售货员：我们没有。', '女士：但我姐姐上个月买了这双。', '售货员：她是在这里买的吗？', '女士：不，她是在美国买的。', '售货员：一个月前我们有一些那样的鞋子，但现在没有了。', '女士：你能帮我找一双吗？', '售货员：恐怕不行。', '售货员：它们在去年和前年很流行。', '售货员：但今年不流行了。', '售货员：现在流行的是这种鞋子。', '女士：它们看起来很不舒服。', '售货员：它们确实很不舒服。', '售货员：但女人总是穿不舒服的鞋子！']"
$content = $content.Replace($old75trans, $new75trans)
Write-Host "Lesson 75 fixes applied"

# === Lesson 81: Fix translation (24 paragraphs) ===
$old81trans = "translation: ['萨姆：嗨，卡罗尔！汤姆在哪里？', '卡罗尔：他在楼上。他在洗澡。', '卡罗尔：汤姆！', '汤姆：什么事？', '卡罗尔：萨姆来了。', '汤姆：我快准备好了。', '萨姆：你好，汤姆。来支烟。', '汤姆：不，谢谢，萨姆。', '汤姆：我在吃早餐。', '萨姆：下楼来，汤姆。晚餐准备好了。', '汤姆：我来了！', '卡罗尔：今晚我们吃烤牛肉和土豆。', '萨姆：听 起来不错！', '', '', '', '', '', '', '', '', '', '', '']"
$new81trans = "translation: ['萨姆：嗨，卡罗尔！', '萨姆：汤姆在哪？', '卡罗尔：他在楼上。', '卡罗尔：他在洗澡。', '卡罗尔：汤姆！', '汤姆：什么事？', '卡罗尔：萨姆来了。', '汤姆：我快准备好了。', '汤姆：你好，萨姆。', '汤姆：来支烟。', '萨姆：不，谢谢，汤姆。', '汤姆：那来杯威士忌吧。', '萨姆：好的。', '萨姆：谢谢。', '汤姆：晚餐准备好了吗，卡罗尔？', '卡罗尔：快准备好了。', '卡罗尔：我们七点可以吃晚饭。', '汤姆：今天我和萨姆一起吃了午饭。', '汤姆：我们去了一家餐馆。', '卡罗尔：你们吃了什么？', '汤姆：我们吃了烤牛肉和土豆。', '卡罗尔：哦！', '汤姆：怎么了，卡罗尔？', '卡罗尔：嗯，今晚你们又要吃烤牛肉和土豆了！']"
$content = $content.Replace($old81trans, $new81trans)
Write-Host "Lesson 81 fixes applied"

# === Lesson 83: Fix translation (24 paragraphs) ===
$old83trans = "translation: ['帕特：你好，萨姆。请进。', '汤姆：嗨，帕特。你们要去哪里？', '帕特：我们要去度假。我们明天出发。', '汤姆：你打包好手提箱了吗？', '帕特：是的，我已经打包好了。', '汤姆：你打包好包了吗？', '帕特：不，我还没打包好。', '帕特：我明天打包。', '汤姆：你买票了吗？', '帕特：是的，我已经买好了。', '汤姆：你们什么时候出发？', '帕特：我 们明天早上出发。', '汤姆：祝你们假期愉快！', '帕特：谢谢。我们总是玩得很开心。', '', '', '', '', '', '', '', '', '', '']"
$new83trans = "translation: ['卡罗尔：你好，萨姆。', '卡罗尔：请进。', '汤姆：嗨，萨姆。', '汤姆：我们正在吃午饭。', '汤姆：你想和我们一起吃午饭吗？', '萨姆：不，谢谢你，汤姆。', '萨姆：我已经吃过午饭了。', '萨姆：我十二点半吃的午饭。', '卡罗尔：那喝杯咖啡吧。', '萨姆：我刚喝了一杯，谢谢你。', '萨姆：我午饭后喝了一杯。', '汤姆：我们去客厅吧，卡罗尔。', '汤姆：我们可以在那里喝咖啡。', '卡罗尔：屋里太乱了，萨姆。', '卡罗尔：这个房间很不整洁。', '卡罗尔：我们正在收拾行李箱。', '卡罗尔：我们明天就要走了。', '卡罗尔：汤姆和我要去度假。', '萨姆：你们真幸运！', '汤姆：你什么时候去度假，萨姆？', '萨姆：我不知道。', '萨姆：我今年已经休过假了。', '卡罗尔：你去哪了？', '萨姆：我待在家里了！']"
$content = $content.Replace($old83trans, $new83trans)
Write-Host "Lesson 83 fixes applied"

# === Lesson 90: Fix translation (16 paragraphs) ===
$old90trans = "translation: ['你认识他多久了？', '我认识他十年了。', '你在这里工作多久了？', '我从2010年就在这工作。', '', '', '', '', '', '', '', '', '', '', '', '']"
$new90trans = "translation: ['是的。', '我有。', '是的，我有。', '你什么时候读的它？', '你什么时候做的？', '我去年读的。', '我半小时前做的。', '他已经走了吗？', '她已经跟他说了吗？', '是的，他已经走了。', '是的，她已经说了。', '他什么时候走的？', '她什么时候跟他说的？', '他一小时前走的。', '她昨天跟他说的。', '学习这些动词：do-did-done, cut-cut-cut, eat-ate-eaten, put-put-put, come-came-come, go-went-gone, read-read-read, give-gave-given, rise-rose-risen, set-set-set, swim-swam-swum, see-saw-seen, shut-shut-shut, take-took-taken, speak-spoke-spoken。']"
$content = $content.Replace($old90trans, $new90trans)
Write-Host "Lesson 90 fixes applied"

# === Lesson 93: Fix word concatenation + translation ===
$content = $content.Replace(
    "{ speaker: '', content: 'Hewill flytoNewYorknextmonth.' }",
    "{ speaker: '', content: 'He will fly to New York next month.' }"
)

$old93trans = "translation: ['奈杰尔：下午好。我想这房子是要出售的。', '伊恩：是的。', '奈杰尔：我可以看看吗？', '伊恩：当然可以。请进。', '奈杰尔：你在这里住了多久？', '伊恩：我在这住了二十年。', '奈杰尔：二十年！那是很长的时间。', '伊恩：是的，我从1976年就住在这里。', '奈杰尔：那你为什么要卖掉它？', '伊恩：因为我刚退休。我想在乡下买一所小房子。', '奈杰 尔：这房子多少钱？', '伊恩：68,500英镑。那是很多钱！']"
$new93trans = "translation: ['奈杰尔是我们的新邻居。', '他是个飞行员。', '他曾在英国皇家空军服役。', '他下个月将飞往纽约。', '再下个月他将飞往东京。', '现在他在马德里。', '他一周前飞去了西班牙。', '他下下周将回到伦敦。', '他只有四十一岁，却已经去过世界上几乎每个国家。', '奈杰尔是个非常幸运的人。', '但他的妻子就没那么幸运了。', '她通常待在家里！']"
$content = $content.Replace($old93trans, $new93trans)
Write-Host "Lesson 93 fixes applied"

# === Lesson 97: Fix OCR artifacts + translation ===
# Fix "D.N.HALL 83BRIDGE" OCR artifact
$content = $content.Replace(
    "{ speaker: 'MR. HALL', content: 'David Hall.' },
          { speaker: 'MR. HALL', content: '83, Bridge Street.' },
          { speaker: 'MR. HALL', content: 'D.N.HALL 83BRIDGE' },
          { speaker: 'ATTENDANT', content: 'That\'s right.' },
          { speaker: 'ATTENDANT', content: 'STREET.' },
          { speaker: 'ATTENDANT', content: 'D.' },
          { speaker: 'ATTENDANT', content: 'N.' },
          { speaker: 'ATTENDANT', content: 'Hall.' },
          { speaker: 'ATTENDANT', content: '83, Bridge Street.' }",
    "{ speaker: 'MR. HALL', content: 'David Hall.' },
          { speaker: 'MR. HALL', content: '83, Bridge Street.' },
          { speaker: 'ATTENDANT', content: 'D. N. Hall.' },
          { speaker: 'ATTENDANT', content: '83, Bridge Street.' }"
)
# Fix "1Q7" OCR artifact
$content = $content.Replace(
    "{ speaker: 'MR. HALL', content: '1Q7' }",
    "{ speaker: 'MR. HALL', content: 'This case doesn\'t belong to me!' }"
)
# But wait, "This case doesn't belong to me!" already exists above. The "1Q7" is likely the key left in the case.
# Actually looking at the original NCE lesson, the ending is:
# MR. HALL: This case doesn't belong to me! You've given me the wrong case!
# But in the current data, those lines are already there before "1Q7".
# The "1Q7" is just OCR noise. Let me remove it entirely.

# Actually let me re-check. The current data has:
# { speaker: 'MR. HALL', content: 'This case doesn\'t belong to me!' },
# { speaker: 'MR. HALL', content: 'You\'ve given me the wrong case!' },
# { speaker: 'MR. HALL', content: '1Q7' },
# So "1Q7" is just OCR noise after the last line. Let me remove it.

# Let me redo - remove the "1Q7" line
$content = $content.Replace(
    "{ speaker: 'MR. HALL', content: 'You\'ve given me the wrong case!' },
          { speaker: 'MR. HALL', content: '1Q7' },",
    "{ speaker: 'MR. HALL', content: 'You\'ve given me the wrong case!' },"
)

# Fix Lesson 97 translation (now 22 paragraphs after removing OCR artifacts)
$old97trans = "translation: ['霍尔先生：前几天我把一个手提箱落在去伦敦的火车上了。', ' 服务员：先生，你能描述一下吗？', '霍尔先生：它是一个带拉链的蓝色小箱子。', '霍尔先生：把手上有个标签，上面有我的名字和地址。', '服务员：这个箱子是你的吗？', '霍尔先生：不，那不是我的。', '服务员：这个呢？这个有标签。', '霍尔先生：让我看看。', '服务员：你的名字和地址是什么？', '霍尔先生：`"大卫·霍尔，大桥街83号。`"', '服 务员：对了。D.霍尔，大桥街83号。', '服务员：三英镑五十便士。', '霍尔先生：给你。', '服务员：谢谢。', '服务员：钥匙！', '霍尔先生：什么？', '服务员：钥匙！它锁着呢。', '霍尔先生：天哪！我把钥匙落在箱子里了！', '', '', '', '', '', '', '', '', '']"
$new97trans = "translation: ['霍尔先生：前几天我把一个手提箱落在去伦敦的火车上了。', '服务员：先生，你能描述一下吗？', '霍尔先生：它是一个蓝色的小箱子，带有拉链。', '霍尔先生：把手上有个标签，上面有我的名字和地址。', '服务员：这个箱子是你的吗？', '霍尔先生：不，那不是我的。', '服务员：这个呢？', '服务员：这个有标签。', '霍尔先生：让我看看。', '服务员：你的名字和地址是什么？', '霍尔先生：大卫·霍尔。', '霍尔先生：大桥街83号。', '服务员：D. N. 霍尔。', '服务员：大桥街83号。', '服务员：三英镑五十便士，谢谢。', '霍尔先生：给你。', '服务员：谢谢。', '霍尔先生：嘿！', '服务员：怎么了？', '霍尔先生：这个箱子不是我的！', '霍尔先生：你给我拿错箱子了！']"
$content = $content.Replace($old97trans, $new97trans)
Write-Host "Lesson 97 fixes applied"

# === Lesson 101: Fix translation (21 paragraphs) ===
$old101trans = "translation: ['奶奶：玛丽，请把吉米的明信片读给我听。', '玛丽：`"我刚到苏格兰，住在一家青年旅舍。`"', '奶奶：就这些？他没说多少，是吧？', '玛丽：奶奶，他在明信片上写不了太多。', '玛丽：`"我很快就会写信。希望你们都好。`"', '奶奶：什么？', '玛丽：他说他很快就会写信。', '奶奶：那很好。我希望他很快回家。', '玛丽：他说他很抱歉之前没写信。', '玛丽： 他说他一直很忙。', '奶奶：他是个好孩子。', '玛丽：是的，他是。我很想念他。', '', '', '', '', '', '', '', '', '']"
$new101trans = "translation: ['奶奶：请把吉米的明信片读给我听，彭妮。', '彭妮：`"我刚到苏格兰，住在一家青年旅舍。`"', '奶奶：嗯？', '彭妮：他说他刚到苏格兰。', '彭妮：他说他住在一家青年旅舍。', '彭妮：你知道他是Y.H.A.的会员。', '奶奶：什么？', '彭妮：Y.H.A.，妈妈。', '彭妮：青年旅舍协会。', '奶奶：他还说了什么？', '彭妮：`"我很快就会写信。`"', '彭妮：`"希望你们都好。`"', '奶奶：什么？', '奶奶：大声点，彭妮。', '奶奶：恐怕我听不到你。', '彭妮：他说他很快就会写信。', '彭妮：他希望我们都好。', '彭妮：`"爱你们的，吉米。`"', '奶奶：就这些吗？', '奶奶：他没说多少，是吧？', '彭妮：他在明信片上写不了太多，妈妈。']"
$content = $content.Replace($old101trans, $new101trans)
Write-Host "Lesson 101 fixes applied"

# === Lesson 103: Fix EXAMINATION ROOM OCR + translation ===
$content = $content.Replace(
    "{ speaker: '', content: 'EXAMINATION ROOM' },
          { speaker: 'GARY', content: 'How was the exam, Richard?' }",
    "{ speaker: 'GARY', content: 'How was the exam, Richard?' }"
)

# Fix Lesson 103 translation (now 21 paragraphs)
$old103trans = "translation: ['考试考得怎样，理查德？', '不算太坏。', '我想我的英语和数学及格了。', '题目很容易。', '你呢，加里？', '英语和数学试卷对我来说不够容易。', '我希望我没有不及格。', '我想我的法语试卷不及格。', '题目对我来说太难了。', '法语考试太可怕了，是吗？', '我讨厌它们。', '我肯定我的分数很低。', '哦，振作点！', '也许我们考得不太坏。', '我旁 边的那个人在试卷顶端写上了他的名字。', '然后他坐在那儿看了三个小时！', '他一个字也没写！', '', '', '', '', '']"
$new103trans = "translation: ['考试考得怎样，理查德？', '不算太坏。', '我想我的英语和数学及格了。', '题目很容易。', '你呢，加里？', '英语和数学试卷对我来说不够容易。', '我希望我没有不及格。', '我想我的法语试卷不及格。', '我能回答其中的十六道题。', '它们很容易。', '但我回答不了其余的题。', '它们对我来说太难了。', '法语考试太可怕了，是吗？', '我讨厌它们。', '我肯定我的分数很低。', '哦，振作点！', '也许我们考得不太坏。', '我旁边的那个人在试卷顶端写上了他的名字。', '然后？', '然后他坐在那儿看了三个小时！', '他一个字也没写！']"
$content = $content.Replace($old103trans, $new103trans)
Write-Host "Lesson 103 fixes applied"

# === Lesson 104: Fix OCR garbled text + translation ===
$content = $content.Replace(
    "{ speaker: '', content: 'answer all the questions answer all the guestions difficult clever easy stupid E150 E8.000 buy the car eat the cakes cheap fresh expensive stale hear the stereo climb the wall low low loud high eat the pear eat the orange soft hard sweet sour' }",
    "{ speaker: '', content: 'Can you answer all the questions?' }"
)

$old104trans = "translation: ['这本书对你来说太难了吗？', '是的，对我来说太难了。', '这本书对你来说够容易吗？', '不，对我来说不够容易。', '这辆车对你来说太贵了吗？', '是的，对我来说太贵了。', '这辆车对你来说够便宜吗？']"
$new104trans = "translation: ['我能回答这些问题。', '它们很容易。', '我回答不了这些问题。', '它们太难了。', '这些问题对我来说够容易，我能回答。', '这些问题对我来说太难了，我回答不了。', '你能回答所有的问题吗？']"
$content = $content.Replace($old104trans, $new104trans)
Write-Host "Lesson 104 fixes applied"

# === Lesson 107: Fix speaker embedded + larger.dress ===
$content = $content.Replace(
    "{ speaker: 'LADY', content: 'LadY : I\'m afraid this green dress is too small for me as well.' }",
    "{ speaker: 'LADY', content: 'I\'m afraid this green dress is too small for me as well.' }"
)
$content = $content.Replace(
    "{ speaker: 'LADY', content: 'LadY : Could you show me another blue dress?' }",
    "{ speaker: 'LADY', content: 'Could you show me another blue dress?' }"
)
$content = $content.Replace(
    "a larger.dress",
    "a larger dress"
)

# Fix Lesson 107 translation (17 paragraphs)
$old107trans = "translation: ['夫人，您喜欢这件连衣裙吗？', '我非常喜欢。', '它多少钱？', '它值九十英镑。', '那对我来说太贵了。', '这件怎么样？', '它值七十英镑。', '那还是太贵了。', '这件更便宜。', '它值五十英镑。', '那好多了。', '我买这件。', '', '', '', '', '']"
$new107trans = "translation: ['我非常喜欢这颜色。', '这件裙子很漂亮，但对我来说太小了。', '这件怎么样？', '这件裙子很漂亮。', '它很时髦。', '短裙现在很流行。', '你想试试吗？', '好吧。', '恐怕这件绿色的裙子对我来说也太小了。', '它比那件蓝色的还小。', '我也不喜欢这颜色。', '它一点也不适合我。', '我觉得那件蓝色的裙子更漂亮。', '你能再给我看看另一件蓝色的裙子吗？', '我想要一件那样的裙子，但必须是我的尺码。', '恐怕我没有更大的裙子了。', '这是店里最大的裙子了。']"
$content = $content.Replace($old107trans, $new107trans)
Write-Host "Lesson 107 fixes applied"

# === Lesson 108: Fix merged sentences + lowercase ===
$old108paras = @"
        paragraphs: [
          { speaker: '', content: 'Sophie is tall.' },
          { speaker: '', content: 'Paul is taller Hans is the tallest than Sophie.' },
          { speaker: '', content: 'student in our class.' },
          { speaker: '', content: 'It was hotter It is hot today.' },
          { speaker: '', content: 'The day before yesterday yesterday.' },
          { speaker: '', content: 'was the hottest day in the year.' },
          { speaker: '', content: 'There was a large This year the It is the largest crowd is larger.' },
          { speaker: '', content: 'crowd at the race crowd I have ever seen.' },
          { speaker: '', content: 'last year.' },
          { speaker: '', content: 'The blue suitcase The brown suitcase The green suitcase is is heavy.' },
          { speaker: '', content: 'is heavier than the heaviest of them all.' },
          { speaker: '', content: 'the brown one.' },
        ],
        translation: ['这本书和那本一样好吗？', '不，它不如那本好。', '它比那本更好。', '这辆车和那辆一样贵吗？', '不，它不如那辆贵。', '它比那辆便宜。', '这件连衣裙和那件一样长吗？', '不，它不如那件长。', '它比那件短。', '', '', ''],
"@
$new108paras = @"
        paragraphs: [
          { speaker: '', content: 'Sophie is tall.' },
          { speaker: '', content: 'Paul is taller than Sophie.' },
          { speaker: '', content: 'Hans is the tallest student in our class.' },
          { speaker: '', content: 'It is hot today.' },
          { speaker: '', content: 'It was hotter yesterday.' },
          { speaker: '', content: 'The day before yesterday was the hottest day in the year.' },
          { speaker: '', content: 'There was a large crowd at the race last year.' },
          { speaker: '', content: 'This year the crowd is larger.' },
          { speaker: '', content: 'It is the largest crowd I have ever seen.' },
          { speaker: '', content: 'The blue suitcase is heavy.' },
          { speaker: '', content: 'The brown suitcase is heavier than the blue one.' },
          { speaker: '', content: 'The green suitcase is the heaviest of them all.' },
        ],
        translation: ['索菲很高。', '保罗比索菲高。', '汉斯是我们班最高的学生。', '今天很热。', '昨天更热。', '前天是今年最热的一天。', '去年看比赛的人很多。', '今年人更多。', '这是我见过的最多的人。', '蓝色的手提箱很重。', '棕色的手提箱比蓝色的重。', '绿色的手提箱是所有里面最重的。'],
"@
$content = $content.Replace($old108paras, $new108paras)
Write-Host "Lesson 108 fixes applied"

# Write the file back
[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "All fixes applied and file saved."
