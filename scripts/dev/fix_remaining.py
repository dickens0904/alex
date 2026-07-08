#!/usr/bin/env python3
"""Fix remaining lessons 119-141 in completeLessons.ts."""

fp = r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts'
with open(fp, 'r', encoding='utf-8') as f:
    c = f.read()

orig = len(c)

# ============================================================
# Lesson 119: Fix merged torch sentence
# ============================================================
c = c.replace(
    "It was very dark, so they turned on a torch Suddenly, they heard a voice behind them.",
    "It was very dark, so they turned on a torch."
)

# Now fix the split quote lines and add Suddenly line
# Find the torch line and the following lines
torch_marker = "content: 'It was very dark, so they turned on a torch.' },"
if torch_marker in c:
    # Find the position
    idx = c.index(torch_marker)
    # Find the next line after torch
    nl = c.index('\n', idx)
    # The next line should be the "'What's up?" line
    next_line_start = nl + 1
    next_nl = c.index('\n', next_line_start)
    next_line = c[next_line_start:next_nl]
    
    if "What" in next_line and "up?" in next_line:
        # Replace the old "'What's up?" line with Suddenly + merged quote line
        old_next = c[next_line_start:next_nl]
        new_next = (
            "          { speaker: '', content: 'Suddenly, they heard a voice behind them.' },\n"
            "          { speaker: '', content: '\\'What\\'s up? What\\'s up?\\' someone called.' },"
        )
        c = c[:next_line_start] + new_next + c[next_nl:]
        print("  - Lesson 119: added Suddenly line and merged quote")
    
    # Now remove the old split "What's up?' someone called." line
    c = c.replace(
        "          { speaker: '', content: 'What\\'s up?\\' someone called.' },\n",
        ""
    )

# Fix lesson 119 translation
old_119_t = "        translation: ['\u4f60\u559c\u6b22\u6545\u4e8b\u5417\uff1f', '\u6211\u60f3\u7ed9\u4f60\u8bb2\u4e00\u4e2a\u771f\u5b9e\u7684\u6545\u4e8b\u3002', '\u8fd9\u662f\u4e00\u5e74\u524d\u53d1\u751f\u5728\u6211\u4e00\u4e2a\u670b\u53cb\u8eab\u4e0a\u7684\u4e8b\u3002', '\u5f53\u6211\u7684\u670b\u53cb\u6cbf\u7740\u4e3b\u5e72\u9053\u5f00\u8f66\u65f6\uff0c\u4e00\u4e2a\u5c0f\u5077\u8bd5\u56fe\u5077\u4ed6\u7684\u8f66\u3002', '\u5c0f\u5077\u4e0a\u4e86\u8f66\u5f00\u8d70\u4e86\u3002', '\u4f46\u4ed6\u6ca1\u5f00\u591a\u8fdc\u3002', '\u8f66\u5f88\u5feb\u5c31\u505c\u4e86\u3002', '\u5c0f\u5077\u65e0\u6cd5\u518d\u6b21\u542f\u52a8\u5b83\u3002', '\u6211\u670b\u53cb\u628a\u94a5\u5319\u7559\u5728\u4e86\u8f66\u91cc\u3002', '\u4f46\u4ed6\u4e5f\u628a\u4ed6\u7684\u72d7\u7559\u5728\u4e86\u8f66\u91cc\uff01', '\u72d7\u5750\u5728\u540e\u5ea7\u4e0a\u3002', '\u5c0f\u5077\u4e0d\u5f97\u4e0d\u4e0b\u8f66\u3002', '', '', ''],"
new_119_t = "        translation: ['\u6211\u60f3\u7ed9\u4f60\u8bb2\u4e00\u4e2a\u771f\u5b9e\u7684\u6545\u4e8b\u3002', '\u8fd9\u662f\u4e00\u5e74\u524d\u53d1\u751f\u5728\u6211\u4e00\u4e2a\u670b\u53cb\u8eab\u4e0a\u7684\u4e8b\u3002', '\u5f53\u6211\u7684\u670b\u53cb\u4e54\u6cbb\u6b63\u5728\u5e8a\u4e0a\u770b\u4e66\u65f6\uff0c\u4e24\u4e2a\u5c0f\u5077\u722c\u8fdb\u4e86\u4ed6\u7684\u53a8\u623f\u3002', '\u4ed6\u4eec\u8fdb\u5165\u623f\u5b50\u540e\uff0c\u8d70\u8fdb\u4e86\u9910\u5385\u3002', '\u5929\u5f88\u9ed1\uff0c\u4e8e\u662f\u4ed6\u4eec\u6253\u5f00\u4e86\u624b\u7535\u7b52\u3002', '\u7a81\u7136\uff0c\u4ed6\u4eec\u542c\u5230\u8eab\u540e\u4f20\u6765\u4e00\u4e2a\u58f0\u97f3\u3002', '\u201c\u600e\u4e48\u4e86\uff1f\u600e\u4e48\u4e86\uff1f\u201d\u6709\u4eba\u558a\u9053\u3002', '\u5c0f\u5077\u6254\u4e0b\u624b\u7535\u7b52\uff0c\u98de\u5feb\u5730\u9003\u8d70\u4e86\u3002', '\u4e54\u6cbb\u542c\u5230\u58f0\u97f3\uff0c\u8d76\u7d27\u4e0b\u4e86\u697c\u3002', '\u4ed6\u6253\u5f00\u706f\uff0c\u4f46\u6ca1\u770b\u5230\u4efb\u4f55\u4eba\u3002', '\u5c0f\u5077\u5df2\u7ecf\u8d70\u4e86\u3002', '\u4f46\u4e54\u6cbb\u7684\u9e66\u9e49\u4ea8\u5229\u8fd8\u5728\u90a3\u91cc\u3002', '\u201c\u600e\u4e48\u4e86\uff0c\u4e54\u6cbb\uff1f\u201d\u5b83\u53eb\u9053\u3002', '\u201c\u6ca1\u4e8b\uff0c\u4ea8\u5229\uff0c\u201d\u4e54\u6cbb\u7b11\u7740\u8bf4\u3002', '\u201c\u56de\u53bb\u7761\u89c9\u5427\u3002\u201d'],"
if old_119_t in c:
    c = c.replace(old_119_t, new_119_t)
    print("  - Lesson 119: fixed translation")
else:
    print("  - Lesson 119: translation not found")

print("Lesson 119 done")

# ============================================================
# Lesson 120: Fix merged sentences, OCR "PLANES", lowercase starts
# ============================================================
old_120 = (
    "          { speaker: '', content: 'I asked the price of the car, I ran to the platform quickly, but they had already sold it.' },\n"
    "          { speaker: '', content: 'but the train had already left.' },\n"
    "          { speaker: '', content: 'PLANES He gave us our exercise books She went on holiday after he had corrected them.' },\n"
    "          { speaker: '', content: 'after she had taken the examination.' },\n"
    "          { speaker: '', content: 'She had finished the housework We had had dinner before she went out.' },\n"
    "          { speaker: '', content: 'before they arrived.' },"
)
new_120 = (
    "          { speaker: '', content: 'I asked the price of the car.' },\n"
    "          { speaker: '', content: 'I ran to the platform quickly, but they had already sold it.' },\n"
    "          { speaker: '', content: 'He gave us our exercise books after he had corrected them.' },\n"
    "          { speaker: '', content: 'She went on holiday after she had taken the examination.' },\n"
    "          { speaker: '', content: 'She had finished the housework before she went out.' },\n"
    "          { speaker: '', content: 'We had had dinner before they arrived.' },\n"
    "          { speaker: '', content: 'The train had already left.' },"
)
if old_120 in c:
    c = c.replace(old_120, new_120)
    # Fix translation
    old_120_t = "        translation: ['\u4f60\u8fc7\u53bb\u4f4f\u5728\u4f26\u6566\u5417\uff1f', '\u662f\u7684\uff0c\u6211\u8fc7\u53bb\u4f4f\u5728\u90a3\u91cc\u3002', '\u5979\u8fc7\u53bb\u7559\u957f\u53d1\u5417\uff1f', '\u662f\u7684\uff0c\u5979\u8fc7\u53bb\u7559\u957f\u53d1\u3002', '\u6211\u6253\u7535\u8bdd\u65f6\u4f60\u5728\u505a\u4ec0\u4e48\uff1f', '\u6211\u5728\u8bfb\u4e66\u3002'],"
    new_120_t = "        translation: ['\u6211\u8be2\u95ee\u4e86\u90a3\u8f86\u8f66\u7684\u4ef7\u683c\u3002', '\u6211\u8fc5\u901f\u8dd1\u5411\u7ad9\u53f0\uff0c\u4f46\u4ed6\u4eec\u5df2\u7ecf\u5356\u6389\u4e86\u3002', '\u4ed6\u6279\u6539\u5b8c\u540e\u628a\u7ec3\u4e60\u672c\u53d1\u7ed9\u4e86\u6211\u4eec\u3002', '\u5979\u53c2\u52a0\u5b8c\u8003\u8bd5\u540e\u53bb\u5ea6\u5047\u4e86\u3002', '\u5979\u5728\u51fa\u95e8\u524d\u505a\u5b8c\u4e86\u5bb6\u52a1\u3002', '\u6211\u4eec\u5728\u4ed6\u4eec\u5230\u8fbe\u4e4b\u524d\u5df2\u7ecf\u5403\u4e86\u665a\u996d\u3002', '\u706b\u8f66\u5df2\u7ecf\u79bb\u5f00\u4e86\u3002'],"
    c = c.replace(old_120_t, new_120_t)
    print("Lesson 120 fixed")
else:
    print("Lesson 120: pattern not found")

# ============================================================
# Lesson 121: Fix "Yes, 1 have." -> "Yes, I have."
# ============================================================
c = c.replace("content: 'Yes, 1 have.'", "content: 'Yes, I have.'")
print("Lesson 121 fixed")

# ============================================================
# Lesson 124: Fix merged sentences, lowercase starts, translations
# ============================================================
old_124 = (
    "          { speaker: '', content: 'behind the counter.' },\n"
    "          { speaker: '', content: 'behind the counter.' },\n"
    "          { speaker: '', content: 'The men repairing the road.' },\n"
    "          { speaker: '', content: 'I served her I served him I saw them yesterday.' },\n"
    "          { speaker: '', content: 'yesterday.' },\n"
    "          { speaker: '', content: 'yesterday.' },\n"
    "          { speaker: '', content: 'He is the man She is the woman They are the men I served yesterday.' },\n"
    "          { speaker: '', content: 'I served yesterday.' },\n"
    "          { speaker: '', content: 'I saw yesterday.' },\n"
    "          { speaker: '', content: 'What\\'s this?' },\n"
    "          { speaker: '', content: 'What are these?' },\n"
    "          { speaker: '', content: 'What\\'s this?' },\n"
    "          { speaker: '', content: 'These are the books This is the book This is the kitten I bought yesterday.' },\n"
    "          { speaker: '', content: 'I bought yesterday.' },\n"
    "          { speaker: '', content: 'I found in the garden.' },"
)
new_124 = (
    "          { speaker: '', content: 'She is the woman behind the counter.' },\n"
    "          { speaker: '', content: 'He is the man behind the counter.' },\n"
    "          { speaker: '', content: 'They are the men repairing the road.' },\n"
    "          { speaker: '', content: 'I served her yesterday.' },\n"
    "          { speaker: '', content: 'I served him yesterday.' },\n"
    "          { speaker: '', content: 'I saw them yesterday.' },\n"
    "          { speaker: '', content: 'He is the man I served yesterday.' },\n"
    "          { speaker: '', content: 'She is the woman I served yesterday.' },\n"
    "          { speaker: '', content: 'They are the men I saw yesterday.' },\n"
    "          { speaker: '', content: 'What\\'s this?' },\n"
    "          { speaker: '', content: 'What are these?' },\n"
    "          { speaker: '', content: 'What\\'s this?' },\n"
    "          { speaker: '', content: 'This is the book I bought yesterday.' },\n"
    "          { speaker: '', content: 'These are the books I bought yesterday.' },\n"
    "          { speaker: '', content: 'This is the kitten I found in the garden.' },"
)
if old_124 in c:
    c = c.replace(old_124, new_124)
    old_124_t = "        translation: ['\u4f60\u53bb\u8fc7\u5df4\u9ece\u5417\uff1f', '\u662f\u7684\uff0c\u6211\u53bb\u8fc7\u4e24\u6b21\u3002', '\u7ea6\u7ff0\u5728\u54ea\u91cc\uff1f', '\u4ed6\u53bb\u4f26\u6566\u4e86\u3002', '\u4f60\u53bb\u8fc7\u65e5\u672c\u5417\uff1f', '\u4e0d\uff0c\u6211\u4ece\u672a\u53bb\u8fc7\u90a3\u91cc\u3002', '\u5979\u53bb\u54ea\u513f\u4e86\uff1f', '\u5979\u53bb\u56fe\u4e66\u9986\u4e86\u3002', '', '', '', '', '', '', ''],"
    new_124_t = "        translation: ['\u5979\u662f\u67dc\u53f0\u540e\u9762\u7684\u90a3\u4f4d\u5973\u58eb\u3002', '\u4ed6\u662f\u67dc\u53f0\u540e\u9762\u7684\u90a3\u4f4d\u7537\u58eb\u3002', '\u4ed6\u4eec\u662f\u6b63\u5728\u4fee\u8def\u7684\u90a3\u4e9b\u4eba\u3002', '\u6211\u6628\u5929\u4e3a\u5979\u670d\u52a1\u4e86\u3002', '\u6211\u6628\u5929\u4e3a\u4ed6\u670d\u52a1\u4e86\u3002', '\u6211\u6628\u5929\u770b\u5230\u4ed6\u4eec\u4e86\u3002', '\u4ed6\u662f\u6211\u6628\u5929\u670d\u52a1\u7684\u90a3\u4f4d\u7537\u58eb\u3002', '\u5979\u662f\u6211\u6628\u5929\u670d\u52a1\u7684\u90a3\u4f4d\u5973\u58eb\u3002', '\u4ed6\u4eec\u662f\u6211\u6628\u5929\u770b\u5230\u7684\u90a3\u4e9b\u4eba\u3002', '\u8fd9\u662f\u4ec0\u4e48\uff1f', '\u8fd9\u4e9b\u662f\u4ec0\u4e48\uff1f', '\u8fd9\u662f\u4ec0\u4e48\uff1f', '\u8fd9\u662f\u6211\u6628\u5929\u4e70\u7684\u90a3\u672c\u4e66\u3002', '\u8fd9\u4e9b\u662f\u6211\u6628\u5929\u4e70\u7684\u90a3\u4e9b\u4e66\u3002', '\u8fd9\u662f\u6211\u5728\u82b1\u56ed\u91cc\u53d1\u73b0\u7684\u90a3\u53ea\u5c0f\u732b\u3002'],"
    c = c.replace(old_124_t, new_124_t)
    print("Lesson 124 fixed")
else:
    print("Lesson 124: pattern not found")

# ============================================================
# Lesson 128-132: Fix translations
# ============================================================
# Lesson 128
old_128_t = "        translation: ['\u665a\u996d\u524d\u4f60\u505a\u4e86\u4ec0\u4e48\uff1f', '\u6211\u5df2\u7ecf\u5b8c\u6210\u4e86\u4f5c\u4e1a\u3002', '\u4f60\u5230\u8fbe\u65f6\u5979\u505a\u4e86\u4ec0\u4e48\uff1f', '\u5979\u5df2\u7ecf\u79bb\u5f00\u4e86\u3002', '\u4e94\u70b9\u524d\u4ed6\u4eec\u505a\u4e86\u4ec0\u4e48\uff1f', '\u4ed6\u4eec\u5df2\u7ecf\u5b8c\u6210\u4e86\u5de5\u4f5c\u3002', '', '', '', '', '', '', '', '', '', ''],"
new_128_t = "        translation: ['\u4ed6\u4e0d\u53ef\u80fd\u751f\u75c5\u3002', '\u8fd9\u4e0d\u53ef\u80fd\u662f\u6211\u7684\u65b0\u5e3d\u5b50\u3002', '\u4ed6\u4e00\u5b9a\u662f\u7d2f\u4e86\u3002', '\u8fd9\u4e00\u5b9a\u662f\u6211\u7684\u65e7\u5e3d\u5b50\u3002', '\u5979\u4e0d\u53ef\u80fd\u662f\u4e39\u9ea6\u4eba\u3002', '\u4ed6\u4e0d\u53ef\u80fd\u662f\u7259\u533b\u3002', '\u5979\u4e00\u5b9a\u662f\u745e\u5178\u4eba\u3002', '\u4ed6\u4e00\u5b9a\u662f\u533b\u751f\u3002', '\u5979\u4e0d\u53ef\u80fd\u56db\u5341\u5c81\u3002', '\u4e0d\u53ef\u80fd\u662f20\u53f7\u3002', '\u5979\u4e00\u5b9a\u662f\u4e94\u5341\u5c81\u3002', '\u4e00\u5b9a\u662f21\u53f7\u3002', '\u4ed6\u4e0d\u53ef\u80fd\u662f\u6700\u5e74\u8f7b\u7684\u3002', '\u4ed6\u4e0d\u53ef\u80fd\u5728\u770b\u4e66\u3002', '\u4ed6\u4e00\u5b9a\u662f\u6700\u5e74\u957f\u7684\u3002', '\u4ed6\u4e00\u5b9a\u5728\u7761\u89c9\u3002'],"
if old_128_t in c:
    c = c.replace(old_128_t, new_128_t)
    print("Lesson 128 fixed")
else:
    print("Lesson 128: not found")

# Lesson 129
old_129_t = "        translation: ['\u770b\uff0c\u52a0\u91cc\uff01\u90a3\u4e2a\u8b66\u5bdf\u5728\u5411\u4f60\u62db\u624b\u3002', '\u4ed6\u60f3\u8ba9\u4f60\u505c\u4e0b\u6765\u3002', '\u6050\u6015\u6211\u8d85\u901f\u4e86\u3002', '\u6211\u8d85\u8fc7\u4f60\u65f6\u8f66\u901f\u662f\u516b\u5341\u3002', '\u4f60\u6ca1\u770b\u5230\u9650\u901f\u6807\u5fd7\u5417\uff1f', '\u6211\u4e00\u5b9a\u662f\u5728\u505a\u68a6\u3002', '\u6211\u8f66\u901f\u662f\u4e03\u5341\u3002', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],"
new_129_t = "        translation: ['\u4f60\u6253\u7b97\u600e\u4e48\u8ddf\u8b66\u5bdf\u8bf4\uff1f', '\u770b\uff0c\u52a0\u91cc\uff01', '\u90a3\u4e2a\u8b66\u5bdf\u5728\u5411\u4f60\u62db\u624b\u3002', '\u4ed6\u60f3\u8ba9\u4f60\u505c\u4e0b\u6765\u3002', '\u4f60\u4ee5\u4e3a\u4f60\u5728\u54ea\u513f\uff1f', '\u5728\u8d5b\u9053\u4e0a\u5417\uff1f', '\u4f60\u4e00\u5b9a\u662f\u4ee5\u6bcf\u5c0f\u65f6\u4e03\u5341\u82f1\u91cc\u7684\u901f\u5ea6\u5728\u5f00\u8f66\u3002', '\u4e0d\u53ef\u80fd\u3002', '\u6211\u8d85\u8fc7\u4f60\u65f6\u8f66\u901f\u662f\u516b\u5341\u3002', '\u4f60\u6ca1\u770b\u5230\u9650\u901f\u6807\u5fd7\u5417\uff1f', '\u6050\u6015\u6211\u6ca1\u6709\uff0c\u8b66\u5b9b\u3002', '\u6211\u4e00\u5b9a\u662f\u5728\u505a\u68a6\u3002', '\u4ed6\u6ca1\u6709\u5728\u505a\u68a6\uff0c\u8b66\u5b9b\u3002', '\u6211\u4e00\u76f4\u5728\u53eb\u4ed6\u5f00\u6162\u70b9\u3002', '\u6240\u4ee5\u6211\u624d\u6ca1\u770b\u5230\u6807\u5fd7\u3002', '\u8ba9\u6211\u770b\u770b\u4f60\u7684\u9a7e\u7167\u3002', '\u8fd9\u6b21\u6211\u4e0d\u7f5a\u4f60\u3002', '\u4f46\u4f60\u6700\u597d\u522b\u518d\u72af\u4e86\uff01', '\u8c22\u8c22\u60a8\u3002', '\u6211\u4e00\u5b9a\u4f1a\u66f4\u5c0f\u5fc3\u7684\u3002', '\u6211\u544a\u8bc9\u8fc7\u4f60\u8981\u5f00\u6162\u70b9\uff0c\u52a0\u91cc\u3002', '\u4f60\u603b\u662f\u53eb\u6211\u5f00\u6162\u70b9\uff0c\u4eb2\u7231\u7684\u3002', '\u90a3\u4f60\u4e0b\u6b21\u6700\u597d\u542c\u6211\u7684\uff01'],"
if old_129_t in c:
    c = c.replace(old_129_t, new_129_t)
    print("Lesson 129 fixed")
else:
    print("Lesson 129: not found")

# Fix lesson 129 first paragraph
c = c.replace(
    "{ speaker: '', content: 'husband to do next time?' }",
    "{ speaker: 'ANN', content: 'What are you going to say to the policeman?' }"
)

# Lesson 130
old_130_t = "        translation: ['\u4ed6\u73b0\u5728\u5728\u54ea\u91cc\uff1f', '\u4ed6\u4e00\u5b9a\u5728\u5bb6\u3002', '\u5979\u5728\u54ea\u91cc\uff1f', '\u5979\u4e0d\u53ef\u80fd\u5728\u529e\u516c\u5ba4\u3002', '\u4f60\u4ec0\u4e48\u65f6\u5019\u79bb\u5f00\uff1f', '\u6211\u660e\u5929\u79bb\u5f00\u3002', '', '', '', '', '', '', '', '', '', ''],"
new_130_t = "        translation: ['\u4ed6\u4e0d\u53ef\u80fd\u751f\u8fc7\u75c5\u3002', '\u90a3\u4e0d\u53ef\u80fd\u662f\u6211\u7684\u65b0\u5e3d\u5b50\u3002', '\u4ed6\u4e00\u5b9a\u662f\u7d2f\u4e86\u3002', '\u90a3\u4e00\u5b9a\u662f\u6211\u7684\u65e7\u5e3d\u5b50\u3002', '\u5979\u4e0d\u53ef\u80fd\u662f\u4e39\u9ea6\u4eba\u3002', '\u4ed6\u4e0d\u53ef\u80fd\u662f\u7259\u533b\u3002', '\u5979\u4e00\u5b9a\u662f\u745e\u5178\u4eba\u3002', '\u4ed6\u4e00\u5b9a\u662f\u533b\u751f\u3002', '\u5979\u4e0d\u53ef\u80fd\u56db\u5341\u5c81\u3002', '\u90a3\u4e0d\u53ef\u80fd\u662f20\u53f7\u3002', '\u5979\u4e00\u5b9a\u662f\u4e94\u5341\u5c81\u3002', '\u90a3\u4e00\u5b9a\u662f21\u53f7\u3002', '\u4ed6\u4e0d\u53ef\u80fd\u662f\u6700\u5e74\u8f7b\u7684\u3002', '\u4ed6\u4e0d\u53ef\u80fd\u5728\u770b\u4e66\u3002', '\u4ed6\u4e00\u5b9a\u662f\u6700\u5e74\u957f\u7684\u3002', '\u4ed6\u4e00\u5b9a\u5728\u7761\u89c9\u3002'],"
if old_130_t in c:
    c = c.replace(old_130_t, new_130_t)
    print("Lesson 130 fixed")
else:
    print("Lesson 130: not found")

# Lesson 131
old_131_t = "        translation: ['\u4eca\u5e74\u4f60\u6253\u7b97\u53bb\u54ea\u91cc\u5ea6\u5047\uff0c\u7f57\u4f0a\uff1f', '\u6211\u4eec\u53ef\u80fd\u51fa\u56fd\u3002', '\u6211\u4e0d\u786e\u5b9a\u3002', '\u6211\u59bb\u5b50\u60f3\u53bb\u57c3\u53ca\u3002', '\u6211\u4eec\u62ff\u4e0d\u5b9a\u4e3b\u610f\u3002', '\u6211\u4eec\u53ef\u80fd\u5750\u8239\u65c5\u884c\u3002', '\u522b\u90a3\u4e48\u80af\u5b9a\uff01', '\u6211\u4eec\u53ef\u80fd\u54ea\u91cc\u90fd\u4e0d\u53bb\u3002', '', '', '', '', '', '', '', '', '', ''],"
new_131_t = "        translation: ['\u4eca\u5e74\u4f60\u6253\u7b97\u53bb\u54ea\u91cc\u5ea6\u5047\uff0c\u7f57\u4f0a\uff1f', '\u6211\u4eec\u53ef\u80fd\u51fa\u56fd\u3002', '\u6211\u4e0d\u786e\u5b9a\u3002', '\u6211\u59bb\u5b50\u60f3\u53bb\u57c3\u53ca\u3002', '\u6211\u4e5f\u60f3\u53bb\u90a3\u91cc\u3002', '\u6211\u4eec\u62ff\u4e0d\u5b9a\u4e3b\u610f\u3002', '\u4f60\u4f1a\u5750\u8239\u8fd8\u662f\u5750\u98de\u673a\u53bb\uff1f', '\u6211\u4eec\u53ef\u80fd\u5750\u8239\u53bb\u3002', '\u90a3\u6837\u66f4\u4fbf\u5b9c\uff0c\u4e0d\u662f\u5417\uff1f', '\u53ef\u80fd\u66f4\u4fbf\u5b9c\uff0c\u4f46\u8981\u82b1\u5f88\u957f\u65f6\u95f4\u3002', '\u6211\u76f8\u4fe1\u4f60\u4eec\u4f1a\u73a9\u5f97\u5f88\u5f00\u5fc3\u7684\u3002', '\u522b\u90a3\u4e48\u80af\u5b9a\u3002', '\u6211\u4eec\u53ef\u80fd\u54ea\u91cc\u90fd\u4e0d\u53bb\u3002', '\u6211\u59bb\u5b50\u603b\u662f\u592a\u62c5\u5fc3\u4e86\u3002', '\u8c01\u6765\u7167\u987e\u72d7\uff1f', '\u8c01\u6765\u7167\u987e\u623f\u5b50\uff1f', '\u8c01\u6765\u7167\u987e\u82b1\u56ed\uff1f', '\u6211\u4eec\u6bcf\u5e74\u90fd\u6709\u8fd9\u4e2a\u95ee\u9898\u3002', '\u6700\u540e\uff0c\u6211\u4eec\u53ea\u597d\u5f85\u5728\u5bb6\u91cc\u7167\u987e\u4e00\u5207\uff01'],"
if old_131_t in c:
    c = c.replace(old_131_t, new_131_t)
    print("Lesson 131 fixed")
else:
    print("Lesson 131: not found")

# Lesson 132
old_132_t = "        translation: ['\u4ed6\u4ec0\u4e48\u65f6\u5019\u6765\uff1f', '\u4ed6\u660e\u5929\u53ef\u80fd\u6765\u3002', '\u5979\u5728\u54ea\u91cc\uff1f', '\u5979\u53ef\u80fd\u5728\u5bb6\u3002', '\u4ed6\u4eec\u4ec0\u4e48\u65f6\u5019\u5230\u8fbe\uff1f', '\u4ed6\u4eec\u4e0b\u5468\u4f1a\u5230\u8fbe\u3002', '', '', '', '', '', '', '', '', '', ''],"
new_132_t = "        translation: ['\u4ed6\u53ef\u80fd\u5728\u4ed6\u7684\u623f\u95f4\u91cc\u3002', '\u4ed6\u53ef\u80fd\u53bb\u770b\u7535\u5f71\u4e86\u3002', '\u6211\u4e0d\u786e\u5b9a\u3002', '\u6211\u4e0d\u786e\u5b9a\u3002', '\u4ed6\u4e3a\u4ec0\u4e48\u8fdf\u5230\u4e86\uff1f', '\u4ed6\u5728\u505a\u4ec0\u4e48\uff1f', '\u4ed6\u53ef\u80fd\u5f88\u5fd9\u3002', '\u4ed6\u53ef\u80fd\u5728\u770b\u4e66\u3002', '\u6211\u4e0d\u786e\u5b9a\u3002', '\u6211\u4e0d\u786e\u5b9a\u3002', '\u4ed6\u4e3a\u4ec0\u4e48\u8fdf\u5230\u4e86\uff1f', '\u4ed6\u5728\u505a\u4ec0\u4e48\uff1f', '\u4ed6\u53ef\u80fd\u4e00\u76f4\u5f88\u5fd9\u3002', '\u4ed6\u53ef\u80fd\u4e00\u76f4\u5728\u770b\u4e66\u3002', '\u6211\u4e0d\u786e\u5b9a\u3002', '\u6211\u4e0d\u786e\u5b9a\u3002'],"
if old_132_t in c:
    c = c.replace(old_132_t, new_132_t)
    print("Lesson 132 fixed")
else:
    print("Lesson 132: not found")

# ============================================================
# Lesson 133: Fix OCR markers, word spacing, translations
# ============================================================
c = c.replace("wanttomakeanotherfilm", "want to make another film")
c = c.replace("AREN MARSH By our reporter, Alan Jones.", "By our reporter, Alan Jones.")
c = c.replace("NEWS Karen Marsh arrived at London Airport today.", "Karen Marsh arrived at London Airport today.")

# Add missing first dialogue line
old_133_start = "          { speaker: 'MISS MARSH', content: 'Yes, I have.' },\n          { speaker: 'REPORTER', content: 'Are you going to make another?' },"
new_133_start = "          { speaker: 'REPORTER', content: 'Have you just made a new film, Miss Marsh?' },\n          { speaker: 'MISS MARSH', content: 'Yes, I have.' },\n          { speaker: 'REPORTER', content: 'Are you going to make another?' },"
if old_133_start in c:
    c = c.replace(old_133_start, new_133_start)

# Fix translation
old_133_t = "        translation: ['\u60a8\u521a\u62cd\u5b8c\u4e00\u90e8\u65b0\u7535\u5f71\u5417\uff0c\u9a6c\u4ec0\u5c0f\u59d0\uff1f', '\u662f\u7684\uff0c\u6211\u62cd\u5b8c\u4e86\u3002', '\u60a8\u6253\u7b97\u518d\u62cd\u4e00\u90e8\u5417\uff1f', '\u4e0d\uff0c\u6211\u4e0d\u6253\u7b97\u4e86\u3002\u6211\u6253\u7b97\u9000\u4f11\u3002', '\u6211\u89c9\u5f97\u5f88\u7d2f\u3002', '\u6211\u4e0d\u80fd\u518d\u62cd\u7535\u5f71\u4e86\u3002', '\u5979\u8bf4\u5979\u89c9\u5f97\u5f88\u7d2f\u3002', '\u5979\u8bf4\u5979\u4e0d\u6253\u7b97\u518d\u62cd\u7535\u5f71\u4e86\u3002', '', '', '', '', '', '', '', '', ''],"
new_133_t = "        translation: ['\u60a8\u521a\u62cd\u5b8c\u4e00\u90e8\u65b0\u7535\u5f71\u5417\uff0c\u9a6c\u4ec0\u5c0f\u59d0\uff1f', '\u662f\u7684\uff0c\u6211\u62cd\u5b8c\u4e86\u3002', '\u60a8\u6253\u7b97\u518d\u62cd\u4e00\u90e8\u5417\uff1f', '\u4e0d\uff0c\u6211\u4e0d\u6253\u7b97\u4e86\u3002', '\u6211\u6253\u7b97\u9000\u4f11\u3002', '\u6211\u89c9\u5f97\u5f88\u7d2f\u3002', '\u6211\u5f88\u957f\u65f6\u95f4\u4e0d\u60f3\u518d\u62cd\u7535\u5f71\u4e86\u3002', '\u4e3d\u5179\uff0c\u6211\u4eec\u4e70\u4efd\u62a5\u7eb8\u5427\u3002', '\u542c\u542c\u8fd9\u4e2a\uff01', '\u201c\u51ef\u4f26\u00b7\u9a6c\u4ec0\uff1a\u8f70\u52a8\u65b0\u95fb\uff01', '\u51ef\u4f26\u00b7\u9a6c\u4ec0\u4eca\u5929\u62b5\u8fbe\u4f26\u6566\u673a\u573a\u3002', '\u5979\u7a7f\u7740\u84dd\u8272\u8fde\u8863\u88d9\u548c\u8c82\u76ae\u5927\u8863\u3002', '\u5979\u544a\u8bc9\u6211\u5979\u521a\u62cd\u5b8c\u4e00\u90e8\u65b0\u7535\u5f71\u3002', '\u5979\u8bf4\u5979\u4e0d\u6253\u7b97\u518d\u62cd\u4e86\u3002', '\u5979\u8bf4\u5979\u6253\u7b97\u9000\u4f11\u3002', '\u5979\u544a\u8bc9\u8bb0\u8005\u5979\u89c9\u5f97\u5f88\u7d2f\uff0c\u5f88\u957f\u65f6\u95f4\u4e0d\u60f3\u518d\u62cd\u7535\u5f71\u4e86\u3002\u201d', '\u6211\u60f3\u77e5\u9053\u4e3a\u4ec0\u4e48\uff01'],"
if old_133_t in c:
    c = c.replace(old_133_t, new_133_t)
    print("Lesson 133 fixed")
else:
    print("Lesson 133: not found")

# ============================================================
# Lesson 136: Fix merged sentences, translations
# ============================================================
old_136 = (
    "          { speaker: '', content: 'I\\'ll leave He said (that) he would What did he tell you?' },\n"
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
    "          { speaker: '', content: 'I\\'ll leave tomorrow.' },\n"
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
old_136_t = "        translation: ['\u4ed6\u8bf4\u4ec0\u4e48\uff1f', '\u4ed6\u8bf4\u4ed6\u660e\u5929\u4f1a\u6765\u3002', '\u5979\u8bf4\u4ec0\u4e48\uff1f', '\u5979\u8bf4\u5979\u80fd\u5e2e\u6211\u3002', '\u4ed6\u544a\u8bc9\u4f60\u4ec0\u4e48\uff1f', '\u4ed6\u544a\u8bc9\u6211\u4ed6\u53ef\u80fd\u4f1a\u8fdf\u5230\u3002', '', '', '', '', '', '', '', ''],"
new_136_t = "        translation: ['\u6211\u660e\u5929\u5c31\u8d70\u3002', '\u4ed6\u8bf4\u4ec0\u4e48\uff1f', '\u4ed6\u8bf4\u4ed6\u660e\u5929\u4f1a\u8d70\u3002', '\u4ed6\u544a\u8bc9\u4f60\u4ec0\u4e48\uff1f', '\u4ed6\u544a\u8bc9\u6211\u4ed6\u660e\u5929\u4f1a\u8d70\u3002', '\u6211\u505a\u4e0d\u51fa\u8fd9\u9053\u6570\u5b66\u9898\u3002', '\u4ed6\u8bf4\u4ec0\u4e48\uff1f', '\u4ed6\u8bf4\u4ed6\u505a\u4e0d\u51fa\u8fd9\u9053\u6570\u5b66\u9898\u3002', '\u4ed6\u544a\u8bc9\u4f60\u4ec0\u4e48\uff1f', '\u4ed6\u544a\u8bc9\u6211\u4ed6\u505a\u4e0d\u51fa\u8fd9\u9053\u6570\u5b66\u9898\u3002', '\u6211\u53ef\u80fd\u516d\u70b9\u949f\u56de\u6765\u3002', '\u5979\u8bf4\u4ec0\u4e48\uff1f', '\u5979\u8bf4\u5979\u53ef\u80fd\u516d\u70b9\u949f\u56de\u6765\u3002', '\u5979\u544a\u8bc9\u4f60\u4ec0\u4e48\uff1f', '\u5979\u544a\u8bc9\u6211\u5979\u53ef\u80fd\u516d\u70b9\u949f\u56de\u6765\u3002'],"
if old_136 in c:
    c = c.replace(old_136, new_136)
    c = c.replace(old_136_t, new_136_t)
    print("Lesson 136 fixed")
else:
    print("Lesson 136: not found")

# ============================================================
# Lesson 138: Fix OCR "BOOK" marker, merged sentences
# ============================================================
old_138 = (
    "          { speaker: '', content: 'BOOK If you break this window, If you don\\'t hurry, you\\'ll have to pay for it!' },\n"
    "          { speaker: '', content: 'we\\'ll miss the train.' },\n"
    "          { speaker: '', content: 'If he falls, If it rains tomorrow, he\\'ll hurt himself.' },\n"
    "          { speaker: '', content: 'If you feel better, If he sells that car, you can get up.' },\n"
    "          { speaker: '', content: 'he can buy a new one.' },"
)
new_138 = (
    "          { speaker: '', content: 'If you break this window, you\\'ll have to pay for it!' },\n"
    "          { speaker: '', content: 'If you don\\'t hurry, we\\'ll miss the train.' },\n"
    "          { speaker: '', content: 'If he falls, he\\'ll hurt himself.' },\n"
    "          { speaker: '', content: 'If it rains tomorrow, we\\'ll have to stay at home.' },\n"
    "          { speaker: '', content: 'If you feel better, you can get up.' },\n"
    "          { speaker: '', content: 'If he sells that car, he can buy a new one.' },"
)
old_138_t = "        translation: ['\u5982\u679c\u4f60\u6709\u65f6\u95f4\u4f60\u4f1a\u505a\u4ec0\u4e48\uff1f', '\u5982\u679c\u6211\u6709\u65f6\u95f4\uff0c\u6211\u5c31\u53bb\u770b\u7535\u5f71\u3002', '\u5982\u679c\u5979\u6765\u4f1a\u53d1\u751f\u4ec0\u4e48\uff1f', '\u5982\u679c\u5979\u6765\uff0c\u6211\u4eec\u5c31\u4e00\u8d77\u5403\u665a\u996d\u3002', '\u5982\u679c\u4e0b\u96e8\u4f60\u4f1a\u505a\u4ec0\u4e48\uff1f'],"
new_138_t = "        translation: ['\u5982\u679c\u4f60\u6253\u7834\u8fd9\u6247\u7a97\u6237\uff0c\u4f60\u5f97\u8d54\u507f\uff01', '\u5982\u679c\u4f60\u4e0d\u5feb\u70b9\uff0c\u6211\u4eec\u4f1a\u8d76\u4e0d\u4e0a\u706b\u8f66\u7684\u3002', '\u5982\u679c\u4ed6\u6454\u5012\u4e86\uff0c\u4ed6\u4f1a\u4f24\u5230\u81ea\u5df1\u7684\u3002', '\u5982\u679c\u660e\u5929\u4e0b\u96e8\uff0c\u6211\u4eec\u5c31\u5f97\u5f85\u5728\u5bb6\u91cc\u4e86\u3002', '\u5982\u679c\u4f60\u611f\u89c9\u597d\u4e9b\u4e86\uff0c\u4f60\u53ef\u4ee5\u8d77\u5e8a\u3002', '\u5982\u679c\u4ed6\u5356\u6389\u90a3\u8f86\u8f66\uff0c\u4ed6\u53ef\u4ee5\u4e70\u4e00\u8f86\u65b0\u7684\u3002'],"
if old_138 in c:
    c = c.replace(old_138, new_138)
    c = c.replace(old_138_t, new_138_t)
    print("Lesson 138 fixed")
else:
    print("Lesson 138: not found")

# ============================================================
# Lesson 141: Fix merged sentence and translation
# ============================================================
# Fix "Last week, my four-year-old daughter, Sally." + "was invited..." -> merge
c = c.replace(
    "{ speaker: '', content: 'Last week, my four-year-old daughter, Sally.' },\n          { speaker: '', content: 'was invited to a children\\'s party.' },",
    "{ speaker: '', content: 'Last week, my four-year-old daughter, Sally, was invited to a children\\'s party.' },"
)

# Fix "After the train had left the station, She then began to make up her face."
c = c.replace(
    "After the train had left the station, She then began to make up her face.",
    "After the train had left the station, the lady opened her handbag and took out her powder compact."
)
# Add "She then began to make up her face." as a new line after the above
c = c.replace(
    "content: 'After the train had left the station, the lady opened her handbag and took out her powder compact.' },",
    "content: 'After the train had left the station, the lady opened her handbag and took out her powder compact.' },\n          { speaker: '', content: 'She then began to make up her face.' },"
)
# Remove the old duplicate "She then began" line if it exists
c = c.replace(
    "          { speaker: '', content: 'She then began to make up her face.' },\n          { speaker: '', content: 'She then began to make up her face.' },",
    "          { speaker: '', content: 'She then began to make up her face.' },"
)

# Fix 141 translation
old_141_t = "        translation: ['\u4e0a\u5468\uff0c\u6211\u56db\u5c81\u7684\u5973\u513f\u8428\u8389\u88ab\u9080\u8bf7\u53c2\u52a0\u4e00\u4e2a\u513f\u7ae5\u805a\u4f1a\u3002', '\u6211\u51b3\u5b9a\u5e26\u5979\u5750\u706b\u8f66\u53bb\u3002', '\u8428\u8389\u975e\u5e