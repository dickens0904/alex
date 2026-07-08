#!/usr/bin/env python3
"""Fix remaining lessons in completeLessons.ts - Part 1: Lessons 119-124"""
import sys

fp = r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts'
with open(fp, 'r', encoding='utf-8') as f:
    c = f.read()

# Lesson 119: Fix merged torch sentence
c = c.replace(
    "It was very dark, so they turned on a torch Suddenly, they heard a voice behind them.",
    "It was very dark, so they turned on a torch."
)
# Fix split quote lines - merge them
c = c.replace(
    "content: '\\'What\\'s up?' },\n          { speaker: '', content: 'What\\'s up?\\' someone called.' },",
    "content: '\\'What\\'s up? What\\'s up?\\' someone called.' },"
)
# Add Suddenly line before the merged quote
c = c.replace(
    "content: 'It was very dark, so they turned on a torch.' },\n          { speaker: '', content: '\\'What\\'s up? What\\'s up?\\' someone called.' },",
    "content: 'It was very dark, so they turned on a torch.' },\n          { speaker: '', content: 'Suddenly, they heard a voice behind them.' },\n          { speaker: '', content: '\\'What\\'s up? What\\'s up?\\' someone called.' },"
)

# Lesson 119 translation
old_t = "translation: ['\u4f60\u559c\u6b22\u6545\u4e8b\u5417\uff1f', '\u6211\u60f3\u7ed9\u4f60\u8bb2\u4e00\u4e2a\u771f\u5b9e\u7684\u6545\u4e8b\u3002', '\u8fd9\u662f\u4e00\u5e74\u524d\u53d1\u751f\u5728\u6211\u4e00\u4e2a\u670b\u53cb\u8eab\u4e0a\u7684\u4e8b\u3002', '\u5f53\u6211\u7684\u670b\u53cb\u6cbf\u7740\u4e3b\u5e72\u9053\u5f00\u8f66\u65f6\uff0c\u4e00\u4e2a\u5c0f\u5077\u8bd5\u56fe\u5077\u4ed6\u7684\u8f66\u3002', '\u5c0f\u5077\u4e0a\u4e86\u8f66\u5f00\u8d70\u4e86\u3002', '\u4f46\u4ed6\u6ca1\u5f00\u591a\u8fdc\u3002', '\u8f66\u5f88\u5feb\u5c31\u505c\u4e86\u3002', '\u5c0f\u5077\u65e0\u6cd5\u518d\u6b21\u542f\u52a8\u5b83\u3002', '\u6211\u670b\u53cb\u628a\u94a5\u5319\u7559\u5728\u4e86\u8f66\u91cc\u3002', '\u4f46\u4ed6\u4e5f\u628a\u4ed6\u7684\u72d7\u7559\u5728\u4e86\u8f66\u91cc\uff01', '\u72d7\u5750\u5728\u540e\u5ea7\u4e0a\u3002', '\u5c0f\u5077\u4e0d\u5f97\u4e0d\u4e0b\u8f66\u3002', '', '', ''],"
new_t = "translation: ['\u6211\u60f3\u7ed9\u4f60\u8bb2\u4e00\u4e2a\u771f\u5b9e\u7684\u6545\u4e8b\u3002', '\u8fd9\u662f\u4e00\u5e74\u524d\u53d1\u751f\u5728\u6211\u4e00\u4e2a\u670b\u53cb\u8eab\u4e0a\u7684\u4e8b\u3002', '\u5f53\u6211\u7684\u670b\u53cb\u4e54\u6cbb\u6b63\u5728\u5e8a\u4e0a\u770b\u4e66\u65f6\uff0c\u4e24\u4e2a\u5c0f\u5077\u722c\u8fdb\u4e86\u4ed6\u7684\u53a8\u623f\u3002', '\u4ed6\u4eec\u8fdb\u5165\u623f\u5b50\u540e\uff0c\u8d70\u8fdb\u4e86\u9910\u5385\u3002', '\u5929\u5f88\u9ed1\uff0c\u4e8e\u662f\u4ed6\u4eec\u6253\u5f00\u4e86\u624b\u7535\u7b52\u3002', '\u7a81\u7136\uff0c\u4ed6\u4eec\u542c\u5230\u8eab\u540e\u4f20\u6765\u4e00\u4e2a\u58f0\u97f3\u3002', '\u201c\u600e\u4e48\u4e86\uff1f\u600e\u4e48\u4e86\uff1f\u201d\u6709\u4eba\u558a\u9053\u3002', '\u5c0f\u5077\u6254\u4e0b\u624b\u7535\u7b52\uff0c\u98de\u5feb\u5730\u9003\u8d70\u4e86\u3002', '\u4e54\u6cbb\u542c\u5230\u58f0\u97f3\uff0c\u8d76\u7d27\u4e0b\u4e86\u697c\u3002', '\u4ed6\u6253\u5f00\u706f\uff0c\u4f46\u6ca1\u770b\u5230\u4efb\u4f55\u4eba\u3002', '\u5c0f\u5077\u5df2\u7ecf\u8d70\u4e86\u3002', '\u4f46\u4e54\u6cbb\u7684\u9e66\u9e49\u4ea8\u5229\u8fd8\u5728\u90a3\u91cc\u3002', '\u201c\u600e\u4e48\u4e86\uff0c\u4e54\u6cbb\uff1f\u201d\u5b83\u53eb\u9053\u3002', '\u201c\u6ca1\u4e8b\uff0c\u4ea8\u5229\uff0c\u201d\u4e54\u6cbb\u7b11\u7740\u8bf4\u3002', '\u201c\u56de\u53bb\u7761\u89c9\u5427\u3002\u201d'],"
if old_t in c:
    c = c.replace(old_t, new_t)
    print("119 trans fixed")

# Lesson 120
c = c.replace(
    "I asked the price of the car, I ran to the platform quickly, but they had already sold it.",
    "I asked the price of the car."
)
c = c.replace(
    "content: 'but the train had already left.' },",
    "content: 'I ran to the platform quickly, but they had already sold it.' },\n          { speaker: '', content: 'but the train had already left.' },"
)
c = c.replace("PLANES ", "")
c = c.replace(
    "He gave us our exercise books She went on holiday",
    "He gave us our exercise books"
)
c = c.replace(
    "after he had corrected them.' },\n          { speaker: '', content: 'after she had taken the examination.' },",
    "after he had corrected them.' },\n          { speaker: '', content: 'She went on holiday after she had taken the examination.' },"
)
c = c.replace(
    "She had finished the housework We had had dinner before she went out.",
    "She had finished the housework before she went out."
)
c = c.replace(
    "content: 'before they arrived.' },",
    "content: 'We had had dinner before they arrived.' },\n          { speaker: '', content: 'The train had already left.' },"
)

# Lesson 120 translation
old_120t = "translation: ['\u4f60\u8fc7\u53bb\u4f4f\u5728\u4f26\u6566\u5417\uff1f', '\u662f\u7684\uff0c\u6211\u8fc7\u53bb\u4f4f\u5728\u90a3\u91cc\u3002', '\u5979\u8fc7\u53bb\u7559\u957f\u53d1\u5417\uff1f', '\u662f\u7684\uff0c\u5979\u8fc7\u53bb\u7559\u957f\u53d1\u3002', '\u6211\u6253\u7535\u8bdd\u65f6\u4f60\u5728\u505a\u4ec0\u4e48\uff1f', '\u6211\u5728\u8bfb\u4e66\u3002'],"
new_120t = "translation: ['\u6211\u8be2\u95ee\u4e86\u90a3\u8f86\u8f66\u7684\u4ef7\u683c\u3002', '\u6211\u8fc5\u901f\u8dd1\u5411\u7ad9\u53f0\uff0c\u4f46\u4ed6\u4eec\u5df2\u7ecf\u5356\u6389\u4e86\u3002', '\u4ed6\u6279\u6539\u5b8c\u540e\u628a\u7ec3\u4e60\u672c\u53d1\u7ed9\u4e86\u6211\u4eec\u3002', '\u5979\u53c2\u52a0\u5b8c\u8003\u8bd5\u540e\u53bb\u5ea6\u5047\u4e86\u3002', '\u5979\u5728\u51fa\u95e8\u524d\u505a\u5b8c\u4e86\u5bb6\u52a1\u3002', '\u6211\u4eec\u5728\u4ed6\u4eec\u5230\u8fbe\u4e4b\u524d\u5df2\u7ecf\u5403\u4e86\u665a\u996d\u3002', '\u706b\u8f66\u5df2\u7ecf\u79bb\u5f00\u4e86\u3002'],"
if old_120t in c:
    c = c.replace(old_120t, new_120t)
    print("120 trans fixed")

# Lesson 121
c = c.replace("content: 'Yes, 1 have.'", "content: 'Yes, I have.'")

# Lesson 124
old_124 = (
    "content: 'behind the counter.' },\n"
    "          { speaker: '', content: 'behind the counter.' },\n"
    "          { speaker: '', content: 'The men repairing the road.' },\n"
    "          { speaker: '', content: 'I served her I served him I saw them yesterday.' },\n"
    "          { speaker: '', content: 'yesterday.' },\n"
    "          { speaker: '', content: 'yesterday.' },\n"
    "          { speaker: '', content: 'He is the man She is the woman They are the men I served yesterday.' },\n"
    "          { speaker: '', content: 'I served yesterday.' },\n"
    "          { speaker: '', content: 'I saw yesterday.' },"
)
new_124 = (
    "content: 'She is the woman behind the counter.' },\n"
    "          { speaker: '', content: 'He is the man behind the counter.' },\n"
    "          { speaker: '', content: 'They are the men repairing the road.' },\n"
    "          { speaker: '', content: 'I served her yesterday.' },\n"
    "          { speaker: '', content: 'I served him yesterday.' },\n"
    "          { speaker: '', content: 'I saw them yesterday.' },\n"
    "          { speaker: '', content: 'He is the man I served yesterday.' },\n"
    "          { speaker: '', content: 'She is the woman I served yesterday.' },\n"
    "          { speaker: '', content: 'They are the men I saw yesterday.' },"
)
if old_124 in c:
    c = c.replace(old_124, new_124)
    print("124 paras fixed")

# Fix 124 duplicate
c = c.replace(
    "content: 'These are the books This is the book This is the kitten I bought yesterday.' },\n          { speaker: '', content: 'I bought yesterday.' },\n          { speaker: '', content: 'I found in the garden.' },",
    "content: 'This is the book I bought yesterday.' },\n          { speaker: '', content: 'These are the books I bought yesterday.' },\n          { speaker: '', content: 'This is the kitten I found in the garden.' },"
)

# 124 translation
old_124t = "translation: ['\u4f60\u53bb\u8fc7\u5df4\u9ece\u5417\uff1f', '\u662f\u7684\uff0c\u6211\u53bb\u8fc7\u4e24\u6b21\u3002', '\u7ea6\u7ff0\u5728\u54ea\u91cc\uff1f', '\u4ed6\u53bb\u4f26\u6566\u4e86\u3002', '\u4f60\u53bb\u8fc7\u65e5\u672c\u5417\uff1f', '\u4e0d\uff0c\u6211\u4ece\u672a\u53bb\u8fc7\u90a3\u91cc\u3002', '\u5979\u53bb\u54ea\u513f\u4e86\uff1f', '\u5979\u53bb\u56fe\u4e66\u9986\u4e86\u3002', '', '', '', '', '', '', ''],"
new_124t = "translation: ['\u5979\u662f\u67dc\u53f0\u540e\u9762\u7684\u90a3\u4f4d\u5973\u58eb\u3002', '\u4ed6\u662f\u67dc\u53f0\u540e\u9762\u7684\u90a3\u4f4d\u7537\u58eb\u3002', '\u4ed6\u4eec\u662f\u6b63\u5728\u4fee\u8def\u7684\u90a3\u4e9b\u4eba\u3002', '\u6211\u6628\u5929\u4e3a\u5979\u670d\u52a1\u4e86\u3002', '\u6211\u6628\u5929\u4e3a\u4ed6\u670d\u52a1\u4e86\u3002', '\u6211\u6628\u5929\u770b\u5230\u4ed6\u4eec\u4e86\u3002', '\u4ed6\u662f\u6211\u6628\u5929\u670d\u52a1\u7684\u90a3\u4f4d\u7537\u58eb\u3002', '\u5979\u662f\u6211\u6628\u5929\u670d\u52a1\u7684\u90a3\u4f4d\u5973\u58eb\u3002', '\u4ed6\u4eec\u662f\u6211\u6628\u5929\u770b\u5230\u7684\u90a3\u4e9b\u4eba\u3002', '\u8fd9\u662f\u4ec0\u4e48\uff1f', '\u8fd9\u4e9b\u662f\u4ec0\u4e48\uff1f', '\u8fd9\u662f\u4ec0\u4e48\uff1f', '\u8fd9\u662f\u6211\u6628\u5929\u4e70\u7684\u90a3\u672c\u4e66\u3002', '\u8fd9\u4e9b\u662f\u6211\u6628\u5929\u4e70\u7684\u90a3\u4e9b\u4e66\u3002', '\u8fd9\u662f\u6211\u5728\u82b1\u56ed\u91cc\u53d1\u73b0\u7684\u90a3\u53ea\u5c0f\u732b\u3002'],"
if old_124t in c:
    c = c.replace(old_124t, new_124t)
    print("124 trans fixed")

with open(fp, 'w', encoding='utf-8') as f:
    f.write(c)
print("Part 1 done!")
