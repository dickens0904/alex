"""
对比两种对话格式：text.paragraphs vs sentences
"""
import re

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lessons = re.split(r'//\s*Lesson\s+(\d+):', content)

stats = {'has_paragraphs': [], 'has_sentences_only': [], 'neither': []}

for i in range(1, len(lessons), 2):
    lid = int(lessons[i])
    block = lessons[i+1]
    
    has_paragraphs = bool(re.search(r'speaker:\s*\'', block))
    has_sentences = bool(re.search(r'english:\s*\'', block))
    
    if has_paragraphs:
        stats['has_paragraphs'].append(lid)
    elif has_sentences:
        stats['has_sentences_only'].append(lid)
    else:
        stats['neither'].append(lid)

print(f"有 text.paragraphs (speaker/content): {len(stats['has_paragraphs'])} 课")
print(f"  课号: {stats['has_paragraphs']}")
print(f"\n只有 sentences (english/chinese): {len(stats['has_sentences_only'])} 课")
print(f"  课号: {stats['has_sentences_only']}")
print(f"\n都没有: {len(stats['neither'])} 课")
print(f"  课号: {stats['neither']}")

# Check a few sentences-only lessons to see the structure
print("\n" + "="*60)
print("sentences 格式示例 (Lesson 14):")
lesson14_start = content.find("// Lesson 14:")
if lesson14_start > 0:
    block = content[lesson14_start:lesson14_start+3000]
    # Find sentences
    sentences = re.findall(r"\{ english: '([^']+)', chinese: '([^']+)'", block)
    for eng, chi in sentences:
        print(f"  {eng} → {chi}")

print("\n" + "="*60)
print("text.paragraphs 格式示例 (Lesson 1):")
lesson1_start = content.find("// Lesson 1:")
if lesson1_start > 0:
    block = content[lesson1_start:lesson1_start+3000]
    paras = re.findall(r"speaker: '([^']+)', content: '([^']+)'", block)
    for speaker, text in paras:
        print(f"  [{speaker}] {text}")
