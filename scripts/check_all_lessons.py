"""
检查 completeLessons.ts 中所有课文对话数据的正确性
"""
import re

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取所有 lessons
lessons = []
# 按 lesson id 分割
lesson_blocks = re.split(r'//\s*Lesson\s+(\d+):', content)

for i in range(1, len(lesson_blocks), 2):
    lesson_num = int(lesson_blocks[i])
    lesson_content = lesson_blocks[i+1]
    
    # 提取 title
    title_match = re.search(r"title:\s*'([^']+)'", lesson_content)
    title = title_match.group(1) if title_match else "Unknown"
    
    # 提取 paragraphs
    paragraphs = []
    para_pattern = re.findall(r"\{\s*speaker:\s*'(\w+)',\s*content:\s*'([^']+)'", lesson_content)
    for speaker, text in para_pattern:
        paragraphs.append({'speaker': speaker, 'text': text})
    
    lessons.append({
        'id': lesson_num,
        'title': title,
        'paragraphs': paragraphs,
        'para_count': len(paragraphs)
    })

# 输出统计和检查
print(f"总计: {len(lessons)} 课\n")
print("=" * 70)

issues = []
for lesson in lessons:
    lid = lesson['id']
    title = lesson['title']
    paras = lesson['paragraphs']
    count = lesson['para_count']
    
    # 检查1: 对话是否为空
    if count == 0:
        issues.append(f"Lesson {lid}: 无对话数据！")
        print(f"❌ Lesson {lid}: {title} — 无对话!")
        continue
    
    # 检查2: 是否有交替说话（A/B交替）
    speakers = [p['speaker'] for p in paras]
    consecutive = 0
    for i in range(1, len(speakers)):
        if speakers[i] == speakers[i-1]:
            consecutive += 1
    
    # 检查3: 对话行数是否合理（NCE Book 1 通常5-15句）
    status = "✅" if count >= 3 else "⚠️"
    
    # 检查4: 最后一句是否合理（通常感谢/告别/总结性语句）
    last_line = paras[-1]['text']
    
    print(f"{status} Lesson {lid}: {title}")
    print(f"   句数: {count}, 说话人: {'→'.join(speakers)}")
    print(f"   首句: [{paras[0]['speaker']}] {paras[0]['text']}")
    print(f"   末句: [{paras[-1]['speaker']}] {last_line}")
    if consecutive > 0:
        print(f"   ⚠️ 同一角色连续说话 {consecutive} 次")
    print()

# 汇总问题
print("=" * 70)
if issues:
    print(f"发现 {len(issues)} 个问题:")
    for issue in issues:
        print(f"  ❌ {issue}")
else:
    print("✅ 所有课文对话数据结构完整")

# 统计对话行数分布
counts = [l['para_count'] for l in lessons]
print(f"\n对话行数统计:")
print(f"  最少: {min(counts)} 句")
print(f"  最多: {max(counts)} 句")
print(f"  平均: {sum(counts)/len(counts):.1f} 句")

# 列出行数异常的课（少于4句或超过20句）
print(f"\n行数异常的课:")
for l in lessons:
    if l['para_count'] < 4 or l['para_count'] > 20:
        print(f"  Lesson {l['id']}: {l['para_count']} 句 — {l['title']}")
