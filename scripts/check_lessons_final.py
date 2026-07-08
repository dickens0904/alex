"""
重新检查问题课文的对话内容
"""
import re

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lessons = re.split(r'//\s*Lesson\s+(\d+):', content)

# Build lesson data
lesson_data = {}
for i in range(1, len(lessons), 2):
    lid = int(lessons[i])
    block = lessons[i+1]
    
    # Extract title
    title_match = re.search(r"title:\s*'([^']+)'", block)
    title = title_match.group(1) if title_match else "Unknown"
    
    # Extract paragraphs
    paras = re.findall(r"speaker:\s*'([^']+)',\s*content:\s*'([^']+)'", block)
    
    lesson_data[lid] = {
        'title': title,
        'paragraphs': [{'speaker': s, 'content': c} for s, c in paras]
    }

# Check the "problematic" lessons
problem_lessons = [14, 17, 29, 31, 67, 105, 139]

for lid in problem_lessons:
    if lid in lesson_data:
        data = lesson_data[lid]
        print(f"\n{'='*60}")
        print(f"Lesson {lid}: {data['title']}")
        print(f"对话行数: {len(data['paragraphs'])}")
        for p in data['paragraphs']:
            print(f"  [{p['speaker']}] {p['content']}")
    else:
        print(f"\nLesson {lid}: NOT FOUND!")

# Also check for lessons with only 1 line
print(f"\n{'='*60}")
print("只有1句对话的课:")
for lid, data in lesson_data.items():
    if len(data['paragraphs']) <= 2:
        print(f"  Lesson {lid} ({len(data['paragraphs'])}句): {data['title']}")
        for p in data['paragraphs']:
            print(f"    [{p['speaker']}] {p['content']}")
