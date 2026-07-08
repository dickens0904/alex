import json

with open(r'I:\新概念英语练习王\scripts\extracted\question_bank.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Show sample data for a few lessons
for lid in [1, 14, 25, 50, 100]:
    lesson = data.get(str(lid), data.get(lid))
    if lesson:
        print(f"\n{'='*60}")
        print(f"Lesson {lid}:")
        print(f"  QA pairs: {len(lesson.get('qa', []))}")
        print(f"  Notes: {len(lesson.get('notes', []))}")
        print(f"  Exercise answers: {bool(lesson.get('exercise_answers'))}")
        
        if lesson.get('qa'):
            print(f"  Sample QA:")
            for qa in lesson['qa'][:3]:
                print(f"    Q: {qa['question'][:60]}")
                print(f"    A: {qa['answer'][:60]}")
        
        if lesson.get('notes'):
            print(f"  Sample note: {lesson['notes'][0][:100]}...")
        
        if lesson.get('exercise_answers'):
            parts = lesson['exercise_answers']
            print(f"  Exercise parts: {list(parts.keys())}")
            for k, v in list(parts.items())[:2]:
                print(f"    Part {k}: {v[:100]}...")
