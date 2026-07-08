"""
新概念英语练习王 - 题库提取
从教师用书和自学导读PDF中提取练习题、答案、语法讲解
"""
import pdfplumber
import json
import re
import os

OUTPUT_DIR = r'I:\新概念英语练习王\scripts\extracted'
os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_teacher_book():
    """从教师用书中提取教学内容"""
    pdf_path = r'I:\新概念英语练习王\新概念英语 第一册教师用书.pdf'
    lessons = {}
    
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n\n"
    
    # 按Lesson分割
    lesson_blocks = re.split(r'Lesson\s+(\d+)', full_text)
    
    for i in range(1, len(lesson_blocks), 2):
        lid = int(lesson_blocks[i])
        block = lesson_blocks[i+1]
        
        if lid > 144:
            continue
        
        # 提取问答练习
        qa_pairs = []
        # Pattern: T: question S: answer
        qa_matches = re.findall(r'T[：:]\s*(.+?)\nS[：:]\s*(.+?)(?:\n|$)', block)
        for q, a in qa_matches:
            q = q.strip()
            a = a.strip()
            if len(q) > 5 and len(a) > 2:
                qa_pairs.append({'question': q, 'answer': a})
        
        # 提取语法点
        grammar_points = []
        grammar_matches = re.findall(r'(?:语法|Grammar)[：:]\s*(.+?)(?:\n\n|\Z)', block, re.DOTALL)
        for g in grammar_matches:
            grammar_points.append(g.strip()[:500])
        
        if lid not in lessons:
            lessons[lid] = {'id': lid, 'qa': [], 'grammar': [], 'exercises': []}
        
        lessons[lid]['qa'].extend(qa_pairs[:20])  # 限制数量
        lessons[lid]['grammar'].extend(grammar_points)
    
    return lessons

def extract_study_guide():
    """从自学导读中提取课文注释和语法"""
    pdf_path = r'I:\新概念英语练习王\新概念英语第一册自学导读.pdf'
    lessons = {}
    
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n\n"
    
    # 按Lesson分割
    lesson_blocks = re.split(r'Lesson\s+(\d+)', full_text)
    
    for i in range(1, len(lesson_blocks), 2):
        lid = int(lesson_blocks[i])
        block = lesson_blocks[i+1]
        
        if lid > 144:
            continue
        
        # 提取课文详注
        notes = []
        note_matches = re.findall(r'(?:课文详注|Further notes)[：:\s]*(.+?)(?=\n\n(?:语法|词汇|练习|Lesson)|\Z)', block, re.DOTALL)
        for n in note_matches:
            notes.append(n.strip()[:1000])
        
        # 提取词汇学习
        vocab_notes = []
        vocab_matches = re.findall(r'(?:词汇学习|Word study)[：:\s]*(.+?)(?=\n\n(?:课文|语法|练习|Lesson)|\Z)', block, re.DOTALL)
        for v in vocab_matches:
            vocab_notes.append(v.strip()[:1000])
        
        if lid not in lessons:
            lessons[lid] = {'id': lid, 'notes': [], 'vocab_notes': []}
        
        lessons[lid]['notes'].extend(notes)
        lessons[lid]['vocab_notes'].extend(vocab_notes)
    
    return lessons

def extract_exercise_answers():
    """从自学导读中提取练习答案"""
    pdf_path = r'I:\新概念英语练习王\新概念英语第一册自学导读.pdf'
    answers = {}
    
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n\n"
    
    # 找练习答案段落
    answer_blocks = re.findall(r'(?:练习答案|Key to written exercises)\s*Lesson\s+(\d+)\s*\n(.*?)(?=\n\nLesson|\n\n词汇|\n\n课文|\Z)', full_text, re.DOTALL)
    
    for lid_str, block in answer_blocks:
        lid = int(lid_str)
        if lid > 144:
            continue
        
        # 提取A/B/C部分
        parts = {}
        part_matches = re.findall(r'([A-Z])\s*\n(.*?)(?=[A-Z]\s*\n|\Z)', block, re.DOTALL)
        for part_letter, part_content in part_matches:
            parts[part_letter] = part_content.strip()[:2000]
        
        answers[lid] = {'id': lid, 'parts': parts}
    
    return answers

def main():
    print("📖 Extracting from teacher's book...")
    teacher_data = extract_teacher_book()
    print(f"   Found {len(teacher_data)} lessons")
    
    print("📖 Extracting from study guide...")
    guide_data = extract_study_guide()
    print(f"   Found {len(guide_data)} lessons")
    
    print("📖 Extracting exercise answers...")
    answer_data = extract_exercise_answers()
    print(f"   Found {len(answer_data)} lessons with answers")
    
    # 合并数据
    all_lessons = {}
    for lid in range(1, 145):
        all_lessons[lid] = {
            'id': lid,
            'qa': [],
            'grammar': [],
            'notes': [],
            'vocab_notes': [],
            'exercise_answers': {}
        }
        
        if lid in teacher_data:
            all_lessons[lid]['qa'] = teacher_data[lid].get('qa', [])
            all_lessons[lid]['grammar'] = teacher_data[lid].get('grammar', [])
        
        if lid in guide_data:
            all_lessons[lid]['notes'] = guide_data[lid].get('notes', [])
            all_lessons[lid]['vocab_notes'] = guide_data[lid].get('vocab_notes', [])
        
        if lid in answer_data:
            all_lessons[lid]['exercise_answers'] = answer_data[lid].get('parts', {})
    
    # 统计
    total_qa = sum(len(l['qa']) for l in all_lessons.values())
    total_notes = sum(len(l['notes']) for l in all_lessons.values())
    total_answers = sum(1 for l in all_lessons.values() if l['exercise_answers'])
    
    print(f"\n📊 Summary:")
    print(f"   QA pairs: {total_qa}")
    print(f"   Notes: {total_notes}")
    print(f"   Exercise answers: {total_answers} lessons")
    
    # 保存
    output_path = os.path.join(OUTPUT_DIR, 'question_bank.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_lessons, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Saved to {output_path}")

if __name__ == '__main__':
    main()
