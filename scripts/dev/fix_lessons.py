#!/usr/bin/env python3
"""Fix data quality issues in completeLessons.ts for lessons 109-144."""

import re

FILE_PATH = r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

original_length = len(content)

# ============================================================
# Lesson 110: Fix merged sentences, fragments, and translations
# ============================================================
old_110_paras = """          { speaker: '', content: 'I\\'ve got more than you have.' },
          { speaker: '', content: 'Have you got any chocolate?' },
          { speaker: '', content: 'I\\'ve got the most.' },
          { speaker: '', content: 'I haven\\'t got much.' },
          { speaker: '', content: 'I\\'ve got less than you have.' },
          { speaker: '', content: 'Have you got any chocolate?' },
          { speaker: '', content: 'I\\'ve got the least.' },
          { speaker: '', content: 'I\\'ve got very little.' },
          { speaker: '', content: 'Have you made any mistakes?' },
          { speaker: '', content: 'I\\'ve made more than you I\\'ve made the most.' },
          { speaker: '', content: 'I haven\\'t made many.' },
          { speaker: '', content: 'have.' },
          { speaker: '', content: 'Have you made any mistakes?' },
          { speaker: '', content: 'I\\'ve made fewer than you I\\'ve made the fewest.' },
          { speaker: '', content: 'I\\'ve made very few.' },
          { speaker: '', content: 'have.' },
          { speaker: '', content: 'You must see my new car.' },
          { speaker: '', content: 'This one\\'s better.' },
          { speaker: '', content: 'This one\\'s the best It\\'s very good.' },
          { speaker: '', content: 'I\\'ve ever seen.' },
          { speaker: '', content: 'You mustn\\'t go to that restaurant.' },
          { speaker: '', content: 'This one\\'s worse.' },
          { speaker: '', content: 'This one\\'s the worst It\\'s very bad.' },
          { speaker: '', content: 'I\\'ve ever seen.' },"""

new_110_paras = """          { speaker: '', content: 'I\\'ve got more than you have.' },
          { speaker: '', content: 'Have you got any chocolate?' },
          { speaker: '', content: 'I\\'ve got the most.' },
          { speaker: '', content: 'I haven\\'t got much.' },
          { speaker: '', content: 'I\\'ve got less than you have.' },
          { speaker: '', content: 'Have you got any chocolate?' },
          { speaker: '', content: 'I\\'ve got the least.' },
          { speaker: '', content: 'I\\'ve got very little.' },
          { speaker: '', content: 'Have you made any mistakes?' },
          { speaker: '', content: 'I\\'ve made more than you have.' },
          { speaker: '', content: 'I\\'ve made the most.' },
          { speaker: '', content: 'I haven\\'t made many.' },
          { speaker: '', content: 'Have you made any mistakes?' },
          { speaker: '', content: 'I\\'ve made fewer than you have.' },
          { speaker: '', content: 'I\\'ve made the fewest.' },
          { speaker: '', content: 'I\\'ve made very few.' },
          { speaker: '', content: 'You must see my new car.' },
          { speaker: '', content: 'This one\\'s better.' },
          { speaker: '', content: 'This one\\'s the best.' },
          { speaker: '', content: 'It\\'s very good.' },
          { speaker: '', content: 'I\\'ve ever seen.' },
          { speaker: '', content: 'You mustn\\'t go to that restaurant.' },
          { speaker: '', content: 'This one\\'s worse.' },
          { speaker: '', content: 'This one\\'s the worst.' },
          { speaker: '', content: 'It\\'s very bad.' },
          { speaker: '', content: 'I\\'ve ever seen.' },"""

old_110_trans = "        translation: ['你能帮我吗？', '当然可以。', '你想要一些咖啡吗？', '好的，谢谢。', '我该给他打电话吗？', '是的，我觉得你应该打。', '我可以进来吗？', '请进。', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],"
new_110_trans = "        translation: ['我比你多。', '你有巧克力吗？', '我最多。', '我没有多少。', '我比你少。', '你有巧克力吗？', '我最少。', '我很少。', '你犯了什么错误吗？', '我犯的比你多。', '我犯的最多。', '我没犯多少。', '你犯了什么错误吗？', '我犯的比你少。', '我犯的最少。', '我很少犯错。', '你一定要看看我的新车。', '这辆更好。', '这辆最好。', '它非常好。', '我见过最好的。', '你千万别去那家餐厅。', '这家更差。', '这家最差。', '它非常差。', '我见过最差的。'],"""

assert old_110_paras in content, "Lesson 110 paragraphs not found!"
assert old_110_trans in content, "Lesson 110 translation not found!"
content = content.replace(old_110_paras, new_110_paras)
content = content.replace(old_110_trans, new_110_trans)
print("✓ Lesson 110 fixed")

# ============================================================
# Lesson 112: Fix OCR chaos
# ============================================================
old_112_paras = """          { speaker: '', content: 'As...as 像......一样 short blunt tall old sweet sharp Not as ...' },
          { speaker: '', content: 'as 不像...' },
          { speaker: '', content: 'clean fat light smart new expensive TEST NO.3 12N102 EXEFXRGXGHXC S2U3X2 BDBGIFNJQSWC B2D1EF2 DCDECOFCBAD This test is This test is This is the most difficult difficult.' },
          { speaker: '', content: 'more difficult.' },
          { speaker: '', content: 'test I have ever done!' },
          { speaker: '', content: 'This book is This book is This is the least interesting interesting.' },
          { speaker: '', content: 'less interesting.' },
          { speaker: '', content: 'book I have ever read!' },"""

new_112_paras = """          { speaker: '', content: 'This test is difficult.' },
          { speaker: '', content: 'This test is more difficult.' },
          { speaker: '', content: 'This is the most difficult test I have ever done!' },
          { speaker: '', content: 'This book is interesting.' },
          { speaker: '', content: 'This book is less interesting.' },
          { speaker: '', content: 'This is the least interesting book I have ever read!' },"""

old_112_trans = "        translation: ['你想要哪本书？', '我想要最好的那本。', '你喜欢哪辆车？', '我喜欢最便宜的那辆。', '你更喜欢哪件连衣裙？', '我更喜欢最贵的那件。', '你觉得哪部电影最好？', '我觉得这部最好。'],"
new_112_trans = "        translation: ['这个测试难。', '这个测试更难。', '这是我做过的最难的测试！', '这本书有趣。', '这本书不太有趣。', '这是我读过的最无趣的书！'],"

assert old_112_paras in content, "Lesson 112 paragraphs not found!"
assert old_112_trans in content, "Lesson 112 translation not found!"
content = content.replace(old_112_paras, new_112_paras)
content = content.replace(old_112_trans, new_112_trans)
print("✓ Lesson 112 fixed")

# ============================================================
# Lesson 114: Fix merged sentences and translations
# ============================================================
old_114_paras = """          { speaker: '', content: 'I haven\\'t got any.' },
          { speaker: '', content: 'Have you got any I haven\\'t any either.' },
          { speaker: '', content: 'I\\'ve got no chocolate.' },
          { speaker: '', content: 'Neither have I.' },
          { speaker: '', content: 'I\\'ve got none.' },
          { speaker: '', content: 'I haven\\'t got any.' },
          { speaker: '', content: 'Have you got any I haven\\'t any either.' },
          { speaker: '', content: 'I\\'ve got no envelopes.' },
          { speaker: '', content: 'Neither have I.' },
          { speaker: '', content: 'I\\'ve got none.' },
          { speaker: '', content: 'I\\'ve got some.' },
          { speaker: '', content: 'Have you got any So have I.' },
          { speaker: '', content: 'Ccake?' },
          { speaker: '', content: 'I\\'ve got some.' },
          { speaker: '', content: 'Have you got any So have I.' },"""

new_114_paras = """          { speaker: '', content: 'I haven\\'t got any.' },
          { speaker: '', content: 'Have you got any chocolate?' },
          { speaker: '', content: 'I haven\\'t got any either.' },
          { speaker: '', content: 'I\\'ve got no chocolate.' },
          { speaker: '', content: 'Neither have I.' },
          { speaker: '', content: 'I\\'ve got none.' },
          { speaker: '', content: 'I haven\\'t got any.' },
          { speaker: '', content: 'Have you got any envelopes?' },
          { speaker: '', content: 'I haven\\'t got any either.' },
          { speaker: '', content: 'I\\'ve got no envelopes.' },
          { speaker: '', content: 'Neither have I.' },
          { speaker: '', content: 'I\\'ve got none.' },
          { speaker: '', content: 'I\\'ve got some.' },
          { speaker: '', content: 'Have you got any cake?' },
          { speaker: '', content: 'So have I.' },
          { speaker: '', content: 'I\\'ve got some.' },
          { speaker: '', content: 'Have you got any cake?' },
          { speaker: '', content: 'So have I.' },"""

old_114_trans = "        translation: ['我会说英语。', '我也会。', '我不会说法语。', '我也不会。', '我饿了。', '我也饿了。', '我不累。', '我也不累。', '', '', '', '', '', '', ''],"
new_114_trans = "        translation: ['我没有。', '你有巧克力吗？', '我也没有。', '我没有巧克力。', '我也没有。', '我一点也没有。', '我没有。', '你有信封吗？', '我也没有。', '我没有信封。', '我也没有。', '我一点也没有。', '我有一些。', '你有蛋糕吗？', '我也有。', '我有一些。', '你有蛋糕吗？', '我也有。'],"

assert old_114_paras in content, "Lesson 114 paragraphs not found!"
assert old_114_trans in content, "Lesson 114 translation not found!"
content = content.replace(old_114_paras, new_114_paras)
content = content.replace(old_114_trans, new_114_trans)
print("✓ Lesson 114 fixed")

# ============================================================
# Lesson 115: Fix OCR markers, merged sentences, translations
# ============================================================
old_115_paras = """          { speaker: 'JIM', content: 'Thanks, Carol.' },
          { speaker: 'JIM', content: 'May I\\'have a glass of beer please?' },
          { speaker: 'CAROL', content: 'Beer?' },
          { speaker: 'CAROL', content: 'There\\'s none left.' },
          { speaker: 'CAROL', content: 'You can have some lemonade.' },
          { speaker: 'JIM', content: 'Lemonade!' },
          { speaker: 'TOM', content: 'Don\\'t believe her, Jim She\\'s only joking.' },
          { speaker: 'TOM', content: 'Have some beer!' },
          { speaker: 'TOM', content: 'BEER' },"""

new_115_paras = """          { speaker: 'JIM', content: 'Thanks, Carol.' },
          { speaker: 'JIM', content: 'May I have a glass of beer please?' },
          { speaker: 'CAROL', content: 'Beer?' },
          { speaker: 'CAROL', content: 'There\\'s none left.' },
          { speaker: 'CAROL', content: 'You can have some lemonade.' },
          { speaker: 'JIM', content: 'Lemonade!' },
          { speaker: 'TOM', content: 'Don\\'t believe her, Jim.' },
          { speaker: 'TOM', content: 'She\\'s only joking.' },
          { speaker: 'TOM', content: 'Have some beer!' },"""

old_115_trans = "        translation: ['家里没有人吗？', '我再敲一次，海伦。', '一切都很安静。', '我肯定家里没有人。', '但那是不可能的。', '卡罗尔和汤姆邀请我们吃午饭。', '透过窗户看看。', '你能看见什么吗？', '什么也看不见。', '我们试试后门。', '看！大家都在花园里。', '你好，海伦。你好，吉姆。', '大家都想在花园里吃午饭。', '外面这里又好又暖和。', '来喝点什么吧。', '', '', '', '', '', '', '', '', '', '', ''],"
new_115_trans = "        translation: ['家里没有人吗？', '我再敲一次，海伦。', '一切都很安静。', '我肯定家里没有人。', '但那是不可能的。', '卡罗尔和汤姆邀请我们吃午饭。', '透过窗户看看。', '你能看见什么吗？', '什么也看不见。', '我们试试后门。', '看！大家都在花园里。', '你好，海伦。', '你好，吉姆。', '大家都想在花园里吃午饭。', '外面这里又好又暖和。', '来喝点什么吧。', '谢谢，卡罗尔。', '我可以来杯啤酒吗？', '啤酒？', '一点都不剩了。', '你可以喝点柠檬水。', '柠檬水！', '别信她，吉姆。', '她只是在开玩笑。', '来点啤酒吧！'],"

assert old_115_paras in content, "Lesson 115 paragraphs not found!"
assert old_115_trans in content, "Lesson 115 translation not found!"
content = content.replace(old_115_paras, new_115_paras)
content = content.replace(old_115_trans, new_115_trans)
print("✓ Lesson 115 fixed")

# ============================================================
# Lesson 119: Fix OCR "PLANES" marker, merged sentences
# ============================================================
old_119_paras = """          { speaker: '', content: 'While my friend, George, was reading in bed, two thieves climbed into his kitchen.' },
          { speaker: '', content: 'After they had entered the house, they went into the dining room.' },
          { speaker: '', content: 'It was very dark, so they turned on a torch Suddenly, they heard a voice behind them.' },
          { speaker: '', content: '\\''What\\'s up?' },
          { speaker: '', content: 'What\\'s up?\\' someone called.' },
          { speaker: '', content: 'The thieves dropped the torch and ran away as quickly as they could.' },
          { speaker: '', content: 'George heard the noise and came downstairs quickly.' },
          { speaker: '', content: 'He turned on the light, but he couldn\\'t see anyone.' },
          { speaker: '', content: 'The thieves had already gone.' },
          { speaker: '', content: 'But George\\'s parrot, Henry, was still there.' },
          { speaker: '', content: '"What\\'s up, George?\\' he called.' },
          { speaker: '', content: '\\'Nothing, Henry,\\' George said and smiled.' },
          { speaker: '', content: '\\'Go back to sleep.\\'' },"""

new_119_paras = """          { speaker: '', content: 'While my friend, George, was reading in bed, two thieves climbed into his kitchen.' },
          { speaker: '', content: 'After they had entered the house, they went into the dining room.' },
          { speaker: '', content: 'It was very dark, so they turned on a torch.' },
          { speaker: '', content: 'Suddenly, they heard a voice behind them.' },
          { speaker: '', content: '\\'What\\'s up? What\\'s up?\\' someone called.' },
          { speaker: '', content: 'The thieves dropped the torch and ran away as quickly as they could.' },
          { speaker: '', content: 'George heard the noise and came downstairs quickly.' },
          { speaker: '', content: 'He turned on the light, but he couldn\\'t see anyone.' },
          { speaker: '', content: 'The thieves had already gone.' },
          { speaker: '', content: 'But George\\'s parrot, Henry, was still there.' },
          { speaker: '', content: '\\'What\\'s up, George?\\' he called.' },
          { speaker: '', content: '\\'Nothing, Henry,\\' George said and smiled.' },
          { speaker: '', content: '\\'Go back to sleep.\\'' },"""

old_119_trans = "        translation: ['你喜欢故事吗？', '我想给你讲一个真实的故事。', '这是一年前发生在我一个朋友身上的事。', '当我的朋友沿着主干道开车时，一个小偷试图偷他的车。', '小偷上了车开走了。', '但他没开多远。', '车很快就停了。', '小偷无法再次启动它。', '我朋友把钥匙留在了车里。', '但他也把他的狗留在了车里！', '狗坐在后座上。', '小偷不得不下车。', '', '', ''],"
new_119_trans = "        translation: ['我想给你讲一个真实的故事。', '这是一年前发生在我一个朋友身上的事。', '当我的朋友乔治正在床上看书时，两个小偷爬进了他的厨房。', '他们进入房子后，走进了餐厅。', '天很黑，于是他们打开了手电筒。', '突然，他们听到身后传来一个声音。', '\\'怎么了？怎么了？\\'有人喊道。', '小偷扔下手电筒，飞快地逃走了。', '乔治听到声音，赶紧下了楼。', '他打开灯，但没看到任何人。', '小偷已经走了。', '但乔治的鹦鹉亨利还在那里。', '\\'怎么了，乔治？\\'它叫道。', '\\'没事，亨利，\\'乔治笑着说。', '\\'回去睡觉吧。\\''],"

assert old_119_paras in content, "Lesson 119 paragraphs not found!"
assert old_119_trans in content, "Lesson 119 translation not found!"
content = content.replace(old_119_paras, new_119_paras)
content = content.replace(old_119_trans, new_119_trans)
print("✓ Lesson 119 fixed")

# ============================================================
# Lesson 120: Fix merged sentences, OCR "PLANES", lowercase starts
# ============================================================
old_120_paras = """          { speaker: '', content: 'I asked the price of the car, I ran to the platform quickly, but they had already sold it.' },
          { speaker: '', content: 'but the train had already left.' },
          { speaker: '', content: 'PLANES He gave us our exercise books She went on holiday after he had corrected them.' },
          { speaker: '', content: 'after she had taken the examination.' },
          { speaker: '', content: 'She had finished the housework We had had dinner before she went out.' },
          { speaker: '', content: 'before they arrived.' },"""

new_120_paras = """          { speaker: '', content: 'I asked the price of the car.' },
          { speaker: '', content: 'I ran to the platform quickly, but they had already sold it.' },
          { speaker: '', content: 'He gave us our exercise books after he had corrected them.' },
          { speaker: '', content: 'She went on holiday after she had taken the examination.' },
          { speaker: '', content: 'She had finished the housework before she went out.' },
          { speaker: '', content: 'We had had dinner before they arrived.' },
          { speaker: '', content: 'The train had already left.' },"""

old_120_trans = "        translation: ['你过去住在伦敦吗？', '是的，我过去住在那里。', '她过去留长发吗？', '是的，她过去留长发。', '我打电话时你在做什么？', '我在读书。'],"
new_120_trans = "        translation: ['我询问了那辆车的价格。', '我迅速跑向站台，但他们已经卖掉了。', '他批改完后把练习本发给了我们。', '她参加完考试后去度假了。', '她在出门前做完了家务。', '我们在他们到达之前已经吃了晚饭。', '火车已经离开了。'],"

assert old_120_paras in content, "Lesson 120 paragraphs not found!"
assert old_120_trans in content, "Lesson 120 translation not found!"
content = content.replace(old_120_paras, new_120_paras)
content = content.replace(old_120_trans, new_120_trans)
print("✓ Lesson 120 fixed")

# ============================================================
# Lesson 121: Fix "Yes, 1 have." → "Yes, I have."
# ============================================================
old_121 = "{ speaker: 'CUSTOMER', content: 'Yes, 1 have.' },"
new_121 = "{ speaker: 'CUSTOMER', content: 'Yes, I have.' },"
assert old_121 in content, "Lesson 121 'Yes, 1 have' not found!"
content = content.replace(old_121, new_121)
print("✓ Lesson 121 fixed")

# ============================================================
# Lesson 124: Fix merged sentences, lowercase starts, translations
# ============================================================
old_124_paras = """          { speaker: '', content: 'behind the counter.' },
          { speaker: '', content: 'behind the counter.' },
          { speaker: '', content: 'The men repairing the road.' },
          { speaker: '', content: 'I served her I served him I saw them yesterday.' },
          { speaker: '', content: 'yesterday.' },
          { speaker: '', content: 'yesterday.' },
          { speaker: '', content: 'He is the man She is the woman They are the men I served yesterday.' },
          { speaker: '', content: 'I served yesterday.' },
          { speaker: '', content: 'I saw yesterday.' },
          { speaker: '', content: 'What\\'s this?' },
          { speaker: '', content: 'What are these?' },
          { speaker: '', content: 'What\\'s this?' },
          { speaker: '', content: 'These are the books This is the book This is the kitten I bought yesterday.' },
          { speaker: '', content: 'I bought yesterday.' },
          { speaker: '', content: 'I found in the garden.' },"""

new_124_paras = """          { speaker: '', content: 'She is the woman behind the counter.' },
          { speaker: '', content: 'He is the man behind the counter.' },
          { speaker: '', content: 'They are the men repairing the road.' },
          { speaker: '', content: 'I served her yesterday.' },
          { speaker: '', content: 'I served him yesterday.' },
          { speaker: '', content: 'I saw them yesterday.' },
          { speaker: '', content: 'He is the man I served yesterday.' },
          { speaker: '', content: 'She is the woman I served yesterday.' },
          { speaker: '', content: 'They are the men I saw yesterday.' },
          { speaker: '', content: 'What\\'s this?' },
          { speaker: '', content: 'What are these?' },
          { speaker: '', content: 'What\\'s this?' },
          { speaker: '', content: 'This is the book I bought yesterday.' },
          { speaker: '', content: 'These are the books I bought yesterday.' },
          { speaker: '', content: 'This is the kitten I found in the garden.' },"""

old_124_trans = "        translation: ['你去过巴黎吗？', '是的，我去过两次。', '约翰在哪里？', '他去伦敦了。', '你去过日本吗？', '不，我从未去过那里。', '她去哪儿了？', '她去图书馆了。', '', '', '', '', '', '', ''],"
new_124_trans = "        translation: ['她是柜台后面的那位女士。', '他是柜台后面的那位男士。', '他们是正在修路的那些人。', '我昨天为她服务了。', '我昨天为他服务了。', '我昨天看到他们了。', '他是我昨天服务的那位男士。', '她是我昨天服务的那位女士。', '他们是我昨天看到的那些人。', '这是什么？', '这些是什么？', '这是什么？', '这是我昨天买的那本书。', '这些是我昨天买的那些书。', '这是我在花园里发现的那只小猫。'],"

assert old_124_paras in content, "Lesson 124 paragraphs not found!"
assert old_124_trans in content, "Lesson 124 translation not found!"
content = content.replace(old_124_paras, new_124_paras)
content = content.replace(old_124_trans, new_124_trans)
print("✓ Lesson 124 fixed")

# ============================================================
# Lesson 128: Fix translations to match content
# ============================================================
old_128_trans = "        translation: ['晚饭前你做了什么？', '我已经完成了作业。', '你到达时她做了什么？', '她已经离开了。', '五点前他们做了什么？', '他们已经完成了工作。', '', '', '', '', '', '', '', '', '', ''],"
new_128_trans = "        translation: ['他不可能生病。', '这不可能是我的新帽子。', '他一定是累了。', '这一定是我的旧帽子。', '她不可能是丹麦人。', '他不可能是牙医。', '她一定是瑞典人。', '他一定是医生。', '她不可能四十岁。', '不可能是20号。', '她一定是五十岁。', '一定是21号。', '他不可能是最年轻的。', '他不可能在看书。', '他一定是最年长的。', '他一定在睡觉。'],"

assert old_128_trans in content, "Lesson 128 translation not found!"
content = content.replace(old_128_trans, new_128_trans)
print("✓ Lesson 128 fixed")

# ============================================================
# Lesson 129: Fix translations, fix first paragraph
# ============================================================
old_129_first = "          { speaker: '', content: 'husband to do next time?' },"
new_129_first = "          { speaker: 'ANN', content: 'What are you going to say to the policeman?' },"
# This first line seems like an OCR fragment. Let me check if it exists.
if old_129_first in content:
    content = content.replace(old_129_first, new_129_first)
    print("  - Lesson 129: fixed first paragraph OCR fragment")
else:
    print("  - Lesson 129: first paragraph already clean or different")

old_129_trans = "        translation: ['看，加里！那个警察在向你招手。', '他想让你停下来。', '恐怕我超速了。', '我超过你时车速是八十。', '你没看到限速标志吗？', '我一定是在做梦。', '我车速是七十。', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],"
new_129_trans = "        translation: ['你打算怎么跟警察说？', '看，加里！', '那个警察在向你招手。', '他想让你停下来。', '你以为你在哪儿？', '在赛道上吗？', '你一定是以每小时七十英里的速度在开车。', '不可能。', '我超过你时车速是八十。', '你没看到限速标志吗？', '恐怕我没有，警官。', '我一定是在做梦。', '他没有在做梦，警官。', '我一直在叫他开慢点。', '所以我才没看到标志。', '让我看看你的驾照。', '这次我不罚你。', '但你最好别再犯了！', '谢谢您。', '我一定会更小心的。', '我告诉过你要开慢点，加里。', '你总是叫我开慢点，亲爱的。', '那你下次最好听我的！'],"

assert old_129_trans in content, "Lesson 129 translation not found!"
content = content.replace(old_129_trans, new_129_trans)
print("✓ Lesson 129 fixed")

# ============================================================
# Lesson 130: Fix translations
# ============================================================
old_130_trans = "        translation: ['他现在在哪里？', '他一定在家。', '她在哪里？', '她不可能在办公室。', '你什么时候离开？', '我明天离开。', '', '', '', '', '', '', '', '', '', ''],"
new_130_trans = "        translation: ['他不可能生过病。', '那不可能是我的新帽子。', '他一定是累了。', '那一定是我的旧帽子。', '她不可能是丹麦人。', '他不可能是牙医。', '她一定是瑞典人。', '他一定是医生。', '她不可能四十岁。', '那不可能是20号。', '她一定是五十岁。', '那一定是21号。', '他不可能是最年轻的。', '他不可能在看书。', '他一定是最年长的。', '他一定在睡觉。'],"

assert old_130_trans in content, "Lesson 130 translation not found!"
content = content.replace(old_130_trans, new_130_trans)
print("✓ Lesson 130 fixed")

# ============================================================
# Lesson 131: Fix translations
# ============================================================
old_131_trans = "        translation: ['今年你打算去哪里度假，罗伊？', '我们可能出国。', '我不确定。', '我妻子想去埃及。', '我们拿不定主意。', '我们可能坐船旅行。', '别那么肯定！', '我们可能哪里都不去。', '', '', '', '', '', '', '', '', '', ''],"
new_131_trans = "        translation: ['今年你打算去哪里度假，罗伊？', '我们可能出国。', '我不确定。', '我妻子想去埃及。', '我也想去那里。', '我们拿不定主意。', '你会坐船还是坐飞机去？', '我们可能坐船去。', '那样更便宜，不是吗？', '可能更便宜，但要花很长时间。', '我相信你们会玩得很开心的。', '别那么肯定。', '我们可能哪里都不去。', '我妻子总是太担心了。', '谁来照顾狗？', '谁来照顾房子？', '谁来照顾花园？', '我们每年都有这个问题。', '最后，我们只好待在家里照顾一切！'],"

assert old_131_trans in content, "Lesson 131 translation not found!"
content = content.replace(old_131_trans, new_131_trans)
print("✓ Lesson 131 fixed")

# ============================================================
# Lesson 132: Fix translations
# ============================================================
old_132_trans = "        translation: ['他什么时候来？', '他明天可能来。', '她在哪里？', '她可能在家。', '他们什么时候到达？', '他们下周会到达。', '', '', '', '', '', '', '', '', '', ''],"
new_132_trans = "        translation: ['他可能在他的房间里。', '他可能去看电影了。', '我不确定。', '我不确定。', '他为什么迟到了？', '他在做什么？', '他可能很忙。', '他可能在看书。', '我不确定。', '我不确定。', '他为什么迟到了？', '他在做什么？', '他可能一直很忙。', '他可能一直在看书。', '我不确定。', '我不确定。'],"

assert old_132_trans in content, "Lesson 132 translation not found!"
content = content.replace(old_132_trans, new_132_trans)
print("✓ Lesson 132 fixed")

# ============================================================
# Lesson 133: Fix OCR markers, word spacing, translations
# ============================================================
old_133_paras = """          { speaker: 'MISS MARSH', content: 'Yes, I have.' },
          { speaker: 'REPORTER', content: 'Are you going to make another?' },
          { speaker: 'MISS MARSH', content: 'No, I\\'m not.' },
          { speaker: 'MISS MARSH', content: 'I\\'m going to retire.' },
          { speaker: 'MISS MARSH', content: 'I feel very tired.' },
          { speaker: 'MISS MARSH', content: 'I don\\'t wanttomakeanotherfilm for a long time.' },
          { speaker: 'KATE', content: 'Let\\'s buy a newspaper, Liz.' },
          { speaker: 'KATE', content: 'Listen to this!' },
          { speaker: 'KATE', content: '\\u201cKaren Marsh: Sensational News!' },
          { speaker: 'KATE', content: 'AREN MARSH By our reporter, Alan Jones.' },
          { speaker: 'KATE', content: 'NEWS Karen Marsh arrived at London Airport today.' },
          { speaker: 'KATE', content: 'She was wearing a blue dress and a mink coat.' },
          { speaker: 'KATE', content: 'She told me she had just made a new film.' },
          { speaker: 'KATE', content: 'She said she was not going to make another.' },
          { speaker: 'KATE', content: 'She said she was going to retire.' },
          { speaker: 'KATE', content: 'She told reporters she felt very tired and didn\\'t want to make another film for a long time.\\'' },
          { speaker: 'LIZ', content: 'I wonder why!' },"""

new_133_paras = """          { speaker: 'REPORTER', content: 'Have you just made a new film, Miss Marsh?' },
          { speaker: 'MISS MARSH', content: 'Yes, I have.' },
          { speaker: 'REPORTER', content: 'Are you going to make another?' },
          { speaker: 'MISS MARSH', content: 'No, I\\'m not.' },
          { speaker: 'MISS MARSH', content: 'I\\'m going to retire.' },
          { speaker: 'MISS MARSH', content: 'I feel very tired.' },
          { speaker: 'MISS MARSH', content: 'I don\\'t want to make another film for a long time.' },
          { speaker: 'KATE', content: 'Let\\'s buy a newspaper, Liz.' },
          { speaker: 'KATE', content: 'Listen to this!' },
          { speaker: 'KATE', content: '\\u201cKaren Marsh: Sensational News!' },
          { speaker: 'KATE', content: 'Karen Marsh arrived at London Airport today.' },
          { speaker: 'KATE', content: 'She was wearing a blue dress and a mink coat.' },
          { speaker: 'KATE', content: 'She told me she had just made a new film.' },
          { speaker: 'KATE', content: 'She said she was not going to make another.' },
          { speaker: 'KATE', content: 'She said she was going to retire.' },
          { speaker: 'KATE', content: 'She told reporters she felt very tired and didn\\'t want to make another film for a long time.\\'' },
          { speaker: 'LIZ', content: 'I wonder why!' },"""

old_133_trans = "        translation: ['您刚拍完一部新电影吗，马什小姐？', '是的，我拍完了。', '您打算再拍一部吗？', '不，我不打算了。我打算退休。', '我觉得很累。', '我不能再拍电影了。', '她说她觉得很累。', '她说她不打算再拍电影了。', '', '', '', '', '', '', '', '', ''],"
new_133_trans = "        translation: ['您刚拍完一部新电影吗，马什小姐？', '是的，我拍完了。', '您打算再拍一部吗？', '不，我不打算了。', '我打算退休。', '我觉得很累。', '我很长时间不想再拍电影了。', '丽兹，我们买份报纸吧。', '听听这个！', '\\u201c凯伦·马什：轰动新闻！', '凯伦·马什今天抵达伦敦机场。', '她穿着蓝色连衣裙和貂皮大衣。', '她告诉我她刚拍完一部新电影。', '她说她不打算再拍了。', '她说她打算退休。', '她告诉记者她觉得很累，很长时间不想再拍电影了。\\'', '我想知道为什么！'],"

assert old_133_paras in content, "Lesson 133 paragraphs not found!"
assert old_133_trans in content, "Lesson 133 translation not found!"
content = content.replace(old_133_paras, new_133_paras)
content = content.replace(old_133_trans, new_133_trans)
print("✓ Lesson 133 fixed")

# ============================================================
# Lesson 136: Fix merged sentences, translations
# ============================================================
old_136_paras = """          { speaker: '', content: 'I\\'ll leave He said (that) he would What did he tell you?' },
          { speaker: '', content: 'tomorrow.' },
          { speaker: '', content: 'leave tomorrow.' },
          { speaker: '', content: 'He told me (that) he would leave tomorrow.' },
          { speaker: '', content: 'What did he say?' },
          { speaker: '', content: 'I can\\'t do this He said (that) he couldn\\'t What did he tell you?' },
          { speaker: '', content: 'Maths problem.' },
          { speaker: '', content: 'do this Maths problem.' },
          { speaker: '', content: 'He told me (that) he couldn\\'t do this Maths problem.' },
          { speaker: '', content: 'What did she say?' },
          { speaker: '', content: 'I may return at She said (that) she might What did she tell you?' },
          { speaker: '', content: 'six o\\'clock.' },
          { speaker: '', content: 'return at six o\\'clock.' },
          { speaker: '', content: 'She told me (that) she might return at six o\\'clock.' },"""

new_136_paras = """          { speaker: '', content: 'I\\'ll leave tomorrow.' },
          { speaker: '', content: 'What did he say?' },
          { speaker: '', content: 'He said (that) he would leave tomorrow.' },
          { speaker: '', content: 'What did he tell you?' },
          { speaker: '', content: 'He told me (that) he would leave tomorrow.' },
          { speaker: '', content: 'I can\\'t do this Maths problem.' },
          { speaker: '', content: 'What did he say?' },
          { speaker: '', content: 'He said (that) he couldn\\'t do this Maths problem.' },
          { speaker: '', content: 'What did he tell you?' },
          { speaker: '', content: 'He told me (that) he couldn\\'t do this Maths problem.' },
          { speaker: '', content: 'I may return at six o\\'clock.' },
          { speaker: '', content: 'What did she say?' },
          { speaker: '', content: 'She said (that) she might return at six o\\'clock.' },
          { speaker: '', content: 'What did she tell you?' },
          { speaker: '', content: 'She told me (that) she might return at six o\\'clock.' },"""

old_136_trans = "        translation: ['他说什么？', '他说他明天会来。', '她说什么？', '她说她能帮我。', '他告诉你什么？', '他告诉我他可能会迟到。', '', '', '', '', '', '', '', ''],"
new_136_trans = "        translation: ['我明天就走。', '他说什么？', '他说他明天会走。', '他告诉你什么？', '他告诉我他明天会走。', '我做不出这道数学题。', '他说什么？', '他说他做不出这道数学题。', '他告诉你什么？', '他告诉我他做不出这道数学题。', '我可能六点钟回来。', '她说什么？', '她说她可能六点钟回来。', '她告诉你什么？', '她告诉我她可能六点钟回来。'],"

assert old_136_paras in content, "Lesson 136 paragraphs not found!"
assert old_136_trans in content, "Lesson 136 translation not found!"
content = content.replace(old_136_paras, new_136_paras)
content = content.replace(old_136_trans, new_136_trans)
print("✓ Lesson 136 fixed")

# ============================================================
# Lesson 138: Fix OCR "BOOK" marker, merged sentences
# ============================================================
old_138_paras = """          { speaker: '', content: 'BOOK If you break this window, If you don\\'t hurry, you\\'ll have to pay for it!' },
          { speaker: '', content: 'we\\'ll miss the train.' },
          { speaker: '', content: 'If he falls, If it rains tomorrow, he\\'ll hurt himself.' },
          { speaker: '', content: 'If you feel better, If he sells that car, you can get up.' },
          { speaker: '', content: 'he can buy a new one.' },"""

new_138_paras = """          { speaker: '', content: 'If you break this window, you\\'ll have to pay for it!' },
          { speaker: '', content: 'If you don\\'t hurry, we\\'ll miss the train.' },
          { speaker: '', content: 'If he falls, he\\'ll hurt himself.' },
          { speaker: '', content: 'If it rains tomorrow, we\\'ll have to stay at home.' },
          { speaker: '', content: 'If you feel better, you can get up.' },
          { speaker: '', content: 'If he sells that car, he can buy a new one.' },"""

old_138_trans = "        translation: ['如果你有时间你会做什么？', '如果我有时间，我就去看电影。', '如果她来会发生什么？', '如果她来，我们就一起吃晚饭。', '如果下雨你会做什么？'],"
new_138_trans = "        translation: ['如果你打破这扇窗户，你得赔偿！', '如果你不快点，我们会赶不上火车的。', '如果他摔倒了，他会伤到自己的。', '如果明天下雨，我们就得待在家里了。', '如果你感觉好些了，你可以起床。', '如果他卖掉那辆车，他可以买一辆新的。'],"

assert old_138_paras in content, "Lesson 138 paragraphs not found!"
assert old_138_trans in content, "Lesson 138 translation not found!"
content = content.replace(old_138_paras, new_138_paras)
content = content.replace(old_138_trans, new_138_trans)
print("✓ Lesson 138 fixed")

# ============================================================
# Lesson 141: Fix merged sentence
# ============================================================
old_141_paras = """          { speaker: '', content: 'Last week, my four-year-old daughter, Sally.' },
          { speaker: '', content: 'was invited to a children\\'s party.' },
          { speaker: '', content: 'I decided to take her by train.' },
          { speaker: '', content: 'Sally was very excited because she had never travelled on a train before.' },
          { speaker: '', content: 'She sat near the window and asked questions about everything she saw.' },
          { speaker: '', content: 'Suddenly, a middle-aged lady got on the train and sat opposite Sally.' },
          { speaker: '', content: '\\'Hello, little girl,\\' she said.' },
          { speaker: '', content: 'Sally did not answer, but looked at her curiously.' },
          { speaker: '', content: 'The lady was dressed in a blue coat and a large, funny hat.' },
          { speaker: '', content: 'After the train had left the station, She then began to make up her face.' },
          { speaker: '', content: '"Why are you doing that?\\' Sally asked.' },
          { speaker: '', content: '\\'To make myself beautiful,\\' the lady answered.' },
          { speaker: '', content: 'She put away her compact and smiled kindly.' },
          { speaker: '', content: '\\'But you are still ugly,\\' Sally said.' },
          { speaker: '', content: 'Sally was amused, but I was very embarrassed!' },"""

new_141_paras = """          { speaker: '', content: 'Last week, my four-year-old daughter, Sally, was invited to a children\\'s party.' },
          { speaker: '', content: 'I decided to take her by train.' },
          { speaker: '', content: 'Sally was very excited because she had never travelled on a train before.' },
          { speaker: '', content: 'She sat near the window and asked questions about everything she saw.' },
          { speaker: '', content: 'Suddenly, a middle-aged lady got on the train and sat opposite Sally.' },
          { speaker: '', content: '\\'Hello, little girl,\\' she said.' },
          { speaker: '', content: 'Sally did not answer, but looked at her curiously.' },
          { speaker: '', content: 'The lady was dressed in a blue coat and a large, funny hat.' },
          { speaker: '', content: 'After the train had left the station, the lady opened her handbag and took out her powder compact.' },
          { speaker: '', content: 'She then began to make up her face.' },
          { speaker: '', content: '\\'Why are you doing that?\\' Sally asked.' },
          { speaker: '', content: '\\'To make myself beautiful,\\' the lady answered.' },
          { speaker: '', content: 'She put away her compact and smiled kindly.' },
          { speaker: '', content: '\\'But you are still ugly,\\' Sally said.' },
          { speaker: '', content: 'Sally was amused, but I was very embarrassed!' },"""

old_141_trans = "        translation: ['上周，我四岁的女儿萨莉被邀请参加一个儿童聚会。', '我决定带她坐火车去。', '萨莉非常兴奋，因为她以前从未坐过火车。', '她坐在窗边，问她看到的一切问题。', '突然，一位中年女士上了火车，坐在萨莉对面。', '那位女士穿着蓝色外套，戴着一顶又大又滑稽的帽子。', '火车离开车站后，那位女士打开手提包，拿出粉盒。', '然后她开始化妆。', '\"你为什么要那样做？\"萨莉问。', '\"为了让自己变漂亮，\"那位女士回答。', '她收起粉盒，和蔼地笑了笑。', '\"但你还是很丑，\"萨莉说。', '', '', ''],"
new_141_trans = "        translation: ['上周，我四岁的女儿萨莉被邀请参加一个儿童聚会。', '我决定带她坐火车去。', '萨莉非常兴奋，因为她以前从未坐过火车。', '她坐在窗边，问她看到的一切问题。', '突然，一位中年女士上了火车，坐在萨莉对面。', '\\'你好，小女孩，\\'她说。', '萨莉没有回答，只是好奇地看着她。', '那位女士穿着蓝色外套，戴着一顶又大又滑稽的帽子。', '火车离开车站后，那位女士打开手提包，拿出粉盒。', '然后她开始化妆。', '\\'你为什么要那样做？\\'萨莉问。', '\\'为了让自己变漂亮，\\'那位女士回答。', '她收起粉盒，和蔼地笑了笑。', '\\'但你还是很丑，\\'萨莉说。', '萨莉觉得很好玩，但我很尴尬！'],"

assert old_141_paras in content, "Lesson 141 paragraphs not found!"
assert old_141_trans in content, "Lesson 141 translation not found!"
content = content.replace(old_141_paras, new_141_paras)
content = content.replace(old_141_trans, new_141_trans)
print("✓ Lesson 141 fixed")

# ============================================================
# Write the file back
# ============================================================
with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✓ File written successfully. Size: {original_length} → {len(content)} bytes")
print("All fixes applied!")
