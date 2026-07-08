"""
查看 Lesson 14 和 Lesson 31 的完整数据结构
"""
import re

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for lid in [14, 31]:
    # Find the lesson block
    pattern = rf'//\s*Lesson\s+{lid}[:\s]'
    match = re.search(pattern, content)
    if match:
        start = match.start()
        next_lesson = re.search(rf'//\s*Lesson\s+{lid+1}[:\s]', content[start+10:])
        if next_lesson:
            end = start + 10 + next_lesson.start()
        else:
            end = min(start + 5000, len(content))
        block = content[start:end]
        print(f"\n{'='*60}")
        print(f"Lesson {lid} 完整数据:")
        print(block)
        print(f"\n{'='*60}")
