#!/usr/bin/env python3
"""Fix remaining lessons - Part 3: 136, 138, 141"""
fp = r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts'
with open(fp, 'r', encoding='utf-8') as f:
    c = f.read()

# Lesson 136: Fix merged sentences
old_136 = (
    "content: 'I\\'ll leave He said (that) he would What did he tell you?' },\n"
    "          { speaker: '', content: 'tomorrow.' },\n"
    "          { speaker: '', content: 'leave tomorrow.' },\n"
    "          { speaker: '', content: 'He told me (that) he would leave tomorrow.' },\n"
    "          { speaker: '', content: 'What did he say?' },\n"
    "          { speaker: '', content: 'I can\\'t do this He said (that) he couldn\\'t What did he tell you?' },\n"
    "          { speaker: '', content: 'Maths problem.' },\n"
    "          { speaker: '', content: 'do this Maths problem.' },\n"
    "          { speaker: '', content: 'He told me (that) he couldn\\'t do this Maths problem.' },\n"
    "          { speaker: '', content: 'What did she say?' },\n"
    "          { speaker: '', content: 'I may return at She said (that) she might What did she tell you?' },\n"
    "          { speaker: '', content: 'six o\\'clock.' },\n"
    "          { speaker: '', content: 'return at six o\\'clock.' },\n"
    "          { speaker: '', content: 'She told me (that) she might return at six o\\'clock.' },"
)
new_136 = (
    "content: 'I\\'ll leave tomorrow.' },\n"
    "          { speaker: '', content: 'What did he say?' },\n"
    "          { speaker: '', content: 'He said (that) he would leave tomorrow.' },\n"
    "          { speaker: '', content: 'What did he tell you?' },\n"
    "          { speaker: '', content: 'He told me (that) he would leave tomorrow.' },\n"
    "          { speaker: '', content: 'I can\\'t do this Maths problem.' },\n"
    "          { speaker: '', content: 'What did he say?' },\n"
    "          { speaker: '', content: 'He said (that) he couldn\\'t do this Maths problem.' },\n"
    "          { speaker: '', content: 'What did he tell you?' },\n"
    "          { speaker: '', content: 'He told me (that) he couldn\\'t do this Maths problem.' },\n"
    "          { speaker: '', content: 'I may return at six o\\'clock.' },\n"
    "          { speaker: '', content: 'What did she say?' },\n"
    "          { speaker: '', content: 'She said (that) she might return at six o\\'clock.' },\n"
    "          { speaker: '', content: 'What did she tell you?' },\n"
    "          { speaker: '', content: 'She told me (that) she might return at six o\\'clock.' },"
)
if old_136 in c:
    c = c.replace(old_136, new_136)
    print("136 paras ok")
else:
    print("136 paras skip")

old_136t = "translation: ['\u4ed6\u8bf4\u4ec0\u4e48\uff1f', '\u4ed6\u8bf4\u4ed6\u660e\u5929\u4f1a\u6765\u3002', '\u5979\u8bf4\u4ec0\u4e48\uff1f', '\u5979\u8bf4\u5979\u80fd\u5e2e\u6211\u3002', '\u4ed6\u544a\u8bc9\u4f60\u4ec0\u4e48\uff1f', '\u4ed6\u544a\u8bc9\u6211\u4ed6\u53ef\u80fd\u4f1a\u8fdf\u5230\u3002', '', '', '', '', '', '', '', ''],"
new_136t = "translation: ['\u6211\u660e\u5929\u5c31\u8d70\u3002', '\u4ed6\u8bf4\u4ec0\u4e48\uff1f', '\u4ed6\u8bf4\u4ed6\u660e\u5929\u4f1a\u8d70\u3002', '\u4ed6\u544a\u8bc9\u4f60\u4ec0\u4e48\uff1f', '\u4ed6\u544a\u8bc9\u6211\u4ed6\u660e\u5929\u4f1a\u8d70\u3002', '\u6211\u505a\u4e0d\u51fa\u8fd9\u9053\u6570\u5b66\u9898\u3002', '\u4ed6\u8bf4\u4ec0\u4e48\uff1f', '\u4ed6\u8bf4\u4ed6\u505a\u4e0d\u51fa\u8fd9\u9053\u6570\u5b66\u9898\u3002', '\u4ed6\u544a\u8bc9\u4f60\u4ec0\u4e48\uff1f', '\u4ed6\u544a\u8bc9\u6211\u4ed6\u505a\u4e0d\u51fa\u8fd9\u9053\u6570\u5b66\u9898\u3002', '\u6211\u53ef\u80fd\u516d\u70b9\u949f\u56de\u6765\u3002', '\u5979\u8bf4\u4ec0\u4e48\uff1f', '\u5979\u8bf4\u5979\u53ef\u80fd\u516d\u70b9\u949f\u56de\u6765\u3002', '\u5979\u544a\u8bc9\u4f60\u4ec0\u4e48\uff1f', '\u5979\u544a\u8bc9\u6211\u5979\u53ef\u80fd\u516d\u70b9\u949f\u56de\u6765\u3002'],"
if old_136t in c:
    c = c.replace(old_136t, new_136t)
    print("136 trans ok")
else:
    print("136 trans skip")

# Lesson 138: Fix OCR "BOOK" marker
old_138 = (
    "content: 'BOOK If you break this window, If you don\\'t hurry, you\\'ll have to pay for it!' },\n"
    "          { speaker: '', content: 'we\\'ll miss the train.' },\n"
    "          { speaker: '', content: 'If he falls, If it rains tomorrow, he\\'ll hurt himself.' },\n"
    "          { speaker: '', content: 'If you feel better, If he sells that car, you can get up.' },\n"
    "          { speaker: '', content: 'he can buy a new one.' },"
)
new_138 = (
    "content: 'If you break this window, you\\'ll have to pay for it!' },\n"
    "          { speaker: '', content: 'If you don\\'t hurry, we\\'ll miss the train.' },\n"
    "          { speaker: '', content: 'If he falls, he\\'ll hurt himself.' },\n"
    "          { speaker: '', content: 'If it rains tomorrow, we\\'ll have to stay at home.' },\n"
    "          { speaker: '', content: 'If you feel better, you can get up.' },\n"
    "          { speaker: '', content: 'If he sells that car, he can buy a new one.' },"
)
if old_138 in c:
    c = c.replace(old_138, new_138)
    print("138 paras ok")
else:
    print("138 paras skip")

old_138t = "translation: ['\u5982\u679c\u4f60\u6709\u65f6\u95f4\u4f60\u4f1a\u505a\u4ec0\u4e48\uff1f', '\u5982\u679c\u6211\u6709\u65f6\u95f4\uff0c\u6211\u5c31\u53bb\u770b\u7535\u5f71\u3002', '\u5982\u679c\u5979\u6765\u4f1a\u53d1\u751f\u4ec0\u4e48\uff1f', '\u5982\u679c\u5979\u6765\uff0c\u6211\u4eec\u5c31\u4e00\u8d77\u5403\u665a\u996d\u3002', '\u5982\u679c\u4e0b\u96e8\u4f60\u4f1a\u505a\u4ec0\u4e48\uff1f'],"
new_138t = "translation: ['\u5982\u679c\u4f60\u6253\u7834\u8fd9\u6247\u7a97\u6237\uff0c\u4f60\u5f97\u8d54\u507f\uff01', '\u5982\u679c\u4f60\u4e0d\u5feb\u70b9\uff0c\u6211\u4eec\u4f1a\u8d76\u4e0d\u4e0a\u706b\u8f66\u7684\u3002', '\u5982\u679c\u4ed6\u6454\u5012\u4e86\uff0c\u4ed6\u4f1a\u4f24\u5230\u81ea\u5df1\u7684\u3002', '\u5982\u679c\u660e\u5929\u4e0b\u96e8\uff0c\u6211\u4eec\u5c31\u5f97\u5f85\u5728\u5bb6\u91cc\u4e86\u3002', '\u5982\u679c\u4f60\u611f\u89c9\u597d\u4e9b\u4e86\uff0c\u4f60\u53ef\u4ee5\u8d77\u5e8a\u3002', '\u5982\u679c\u4ed6\u5356\u6389\u90a3\u8f86\u8f66\uff0c\u4ed6\u53ef\u4ee5\u4e70\u4e00\u8f86\u65b0\u7684\u3002'],"
if old_138t in c:
    c = c.replace(old_138t, new_138t)
    print("138 trans ok")
else:
    print("138 trans skip")

# Lesson 141: Fix merged sentences
c = c.replace(
    "{ speaker: '', content: 'Last week, my four-year-old daughter, Sally.' },\n          { speaker: '', content: 'was invited to a children\\'s party.' },",
    "{ speaker: '', content: 'Last week, my four-year-old daughter, Sally, was invited to a children\\'s party.' },"
)
c = c.replace(
    "After the train had left the station, She then began to make up her face.",
    "After the train had left the station, the lady opened her handbag and took out her powder compact."
)
# Add "She then began" as a new line and ensure no duplicates
c = c.replace(
    "content: 'After the train had left the station, the lady opened her handbag and took out her powder compact.' },\n          { speaker: '', content: '\"Why are you doing that?",
    "content: 'After the train had left the station, the lady opened her handbag and took out her powder compact.' },\n          { speaker: '', content: 'She then began to make up her face.' },\n          { speaker: '', content: '\"Why are you doing that?"
)

# Fix 141 translation
old_141t = "translation: ['\u4e0a\u5468\uff0c\u6211\u56db\u5c81\u7684\u5973\u513f\u8428\u8389\u88ab\u9080\u8bf7\u53c2\u52a0\u4e00\u4e2a\u513f\u7ae5\u805a\u4f1a\u3002', '\u6211\u51b3\u5b9a\u5e26\u5979\u5750\u706b\u8f66\u53bb\u3002', '\u8428\u8389\u975e\u5e38\u5174\u594b\uff0c\u56e0\u4e3a\u5979\u4ee5\u524d\u4ece\u672a\u5750\u8fc7\u706b\u8f66\u3002', '\u5979\u5750\u5728\u7a97\u8fb9\uff0c\u95ee\u5979\u770b\u5230\u7684\u4e00\u5207\u95ee\u9898\u3002', '\u7a81\u7136\uff0c\u4e00\u4f4d\u4e2d\u5e74\u5973\u58eb\u4e0a\u4e86\u706b\u8f66\uff0c\u5750\u5728\u8428\u8389\u5bf9\u9762\u3002', '\u90a3\u4f4d\u5973\u58eb\u7a7f\u7740\u84dd\u8272\u5916\u5957\uff0c\u6234\u7740\u4e00\u9876\u53c8\u5927\u53c8\u6ed1\u7a3d\u7684\u5e3d\u5b50\u3002', '\u706b\u8f66\u79bb\u5f00\u8f66\u7ad9\u540e\uff0c\u90a3\u4f4d\u5973\u58eb\u6253\u5f00\u624b\u63d0\u5305\uff0c\u62ff\u51fa\u7c89\u76d2\u3002', '\u7136\u540e\u5979\u5f00\u59cb\u5316\u5986\u3002', '\u201c\u4f60\u4e3a\u4ec0\u4e48\u8981\u90a3\u6837\u505a\uff1f\u201d\u8428\u8389\u95ee\u3002', '\u201c\u4e3a\u4e86\u8ba9\u81ea\u5df1\u53d8\u6f02\u4eae\uff0c\u201d\u90a3\u4f4d\u5973\u58eb\u56de\u7b54\u3002', '\u5979\u6536\u8d77\u7c89\u76d2\uff0c\u548c\u853c\u5730\u7b11\u4e86\u7b11\u3002', '\u201c\u4f46\u4f60\u8fd8\u662f\u5f88\u4e11\uff0c\u201d\u8428\u8389\u8bf4\u3002', '', '', ''],"
new_141t = "translation: ['\u4e0a\u5468\uff0c\u6211\u56db\u5c81\u7684\u5973\u513f\u8428\u8389\u88ab\u9080\u8bf7\u53c2\u52a0\u4e00\u4e2a\u513f\u7ae5\u805a\u4f1a\u3002', '\u6211\u51b3\u5b9a\u5e26\u5979\u5750\u706b\u8f66\u53bb\u3002', '\u8428\u8389\u975e\u5e38\u5174\u594b\uff0c\u56e0\u4e3a\u5979\u4ee5\u524d\u4ece\u672a\u5750\u8fc7\u706b\u8f66\u3002', '\u5979\u5750\u5728\u7a97\u8fb9\uff0c\u95ee\u5979\u770b\u5230\u7684\u4e00\u5207\u95ee\u9898\u3002', '\u7a81\u7136\uff0c\u4e00\u4f4d\u4e2d\u5e74\u5973\u58eb\u4e0a\u4e86\u706b\u8f66\uff0c\u5750\u5728\u8428\u8389\u5bf9\u9762\u3002', '\u201c\u4f60\u597d\uff0c\u5c0f\u5973\u5b69\uff0c\u201d\u5979\u8bf4\u3002', '\u8428\u8389\u6ca1\u6709\u56de\u7b54\uff0c\u53ea\u662f\u597d\u5947\u5730\u770b\u7740\u5979\u3002', '\u90a3\u4f4d\u5973\u58eb\u7a7f\u7740\u84dd\u8272\u5916\u5957\uff0c\u6234\u7740\u4e00\u9876\u53c8\u5927\u53c8\u6ed1\u7a3d\u7684\u5e3d\u5b50\u3002', '\u706b\u8f66\u79bb\u5f00\u8f66\u7ad9\u540e\uff0c\u90a3\u4f4d\u5973\u58eb\u6253\u5f00\u624b\u63d0\u5305\uff0c\u62ff\u51fa\u7c89\u76d2\u3002', '\u7136\u540e\u5979\u5f00\u59cb\u5316\u5986\u3002', '\u201c\u4f60\u4e3a\u4ec0\u4e48\u8981\u90a3\u6837\u505a\uff1f\u201d\u8428\u8389\u95ee\u3002', '\u201c\u4e3a\u4e86\u8ba9\u81ea\u5df1\u53d8\u6f02\u4eae\uff0c\u201d\u90a3\u4f4d\u5973\u58eb\u56de\u7b54\u3002', '\u5979\u6536\u8d77\u7c89\u76d2\uff0c\u548c\u853c\u5730\u7b11\u4e86\u7b11\u3002', '\u201c\u4f46\u4f60\u8fd8\u662f\u5f88\u4e11\uff0c\u201d\u8428\u8389\u8bf4\u3002', '\u8428\u8389\u89c9\u5f97\u5f88\u597d\u73a9\uff0c\u4f46\u6211\u5f88\u5c34\u5c2c\uff01'],"
if old_141t in c:
    c = c.replace(old_141t, new_141t)
    print("141 trans ok")
else:
    print("141 trans skip")

with open(fp, 'w', encoding='utf-8') as f:
    f.write(c)
print("Part 3 done!")
