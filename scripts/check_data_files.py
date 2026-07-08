"""
检查所有数据文件中缺失的课程
"""
import re

files = {
    'completeLessons': r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts',
    'allLessons': r'I:\新概念英语练习王\src\data\lessons\allLessons.ts',
    'realLessons': r'I:\新概念英语练习王\src\data\lessons\realLessons.ts',
    'sampleLessons': r'I:\新概念英语练习王\src\data\lessons\sampleLessons.ts',
}

for name, path in files.items():
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        ids = re.findall(r'id:\s*(\d+)', content)
        ids = sorted(set(int(x) for x in ids))
        
        titles = re.findall(r"title:\s*'([^']+)'", content)
        
        print(f"\n{'='*60}")
        print(f"FILE: {name} ({len(ids)} lessons)")
        print(f"   Range: {ids[0] if ids else 'N/A'} - {ids[-1] if ids else 'N/A'}")
        
        missing_lessons = [14, 17, 29, 31, 67, 105, 139]
        for lid in missing_lessons:
            if lid in ids:
                idx = ids.index(lid)
                title = titles[idx] if idx < len(titles) else "Unknown"
                lesson_pos = content.find(f'id: {lid},')
                if lesson_pos > 0:
                    block_end = content.find(f'id: {lid+1},', lesson_pos)
                    if block_end < 0:
                        block_end = min(lesson_pos + 5000, len(content))
                    block = content[lesson_pos:block_end]
                    has_paragraphs = 'paragraphs:' in block or 'speaker:' in block
                    has_sentences = 'sentences:' in block
                    print(f"   OK Lesson {lid}: {title} | paragraphs={has_paragraphs} | sentences={has_sentences}")
            else:
                print(f"   MISSING Lesson {lid}: not in this file")
    except Exception as e:
        print(f"\nERROR {name}: {e}")

# Now let's look at the actual content of the missing lessons in completeLessons
print(f"\n{'='*60}")
print("DETAILED CHECK OF MISSING LESSONS IN completeLessons.ts")
print("="*60)

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for lid in [14, 17, 29, 31, 67, 105, 139]:
    # Find the lesson block
    pattern = rf'//\s*Lesson\s+{lid}[:\s]'
    match = re.search(pattern, content)
    if match:
        start = match.start()
        # Find next lesson
        next_lesson = re.search(rf'//\s*Lesson\s+{lid+1}[:\s]', content[start+10:])
        if next_lesson:
            end = start + 10 + next_lesson.start()
        else:
            end = min(start + 3000, len(content))
        block = content[start:end]
        print(f"\n--- Lesson {lid} ---")
        print(block[:1500])
        print("..." if len(block) > 1500 else "")
    else:
        print(f"\n--- Lesson {lid}: NOT FOUND ---")
