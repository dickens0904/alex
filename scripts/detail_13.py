import json

with open(r'I:\新概念英语练习王\scripts\batch_data.json', 'r', encoding='utf-8') as f:
    batch_data = json.load(f)

# Find lesson 13
for item in batch_data:
    if item['lesson'] == 13:
        print("="*60)
        print(f"Lesson 13: {item['title']}")
        print(f"代码: {item['existing_count']}行 | PDF: {item['pdf_count']}行")
        print("="*60)
        
        print("\n--- 代码中的对话 ---")
        for i, line in enumerate(item['existing']):
            print(f"  {i+1}. {line}")
        
        print("\n--- PDF中的对话（OCR提取） ---")
        for i, line in enumerate(item['pdf']):
            print(f"  {i+1}. {line}")
        
        print("\n--- 差异分析 ---")
        # Check what's in PDF but not in code
        existing_set = set(line.lower().strip() for line in item['existing'])
        pdf_set = set(line.lower().strip() for line in item['pdf'])
        
        only_in_pdf = []
        for line in item['pdf']:
            if line.lower().strip() not in existing_set:
                only_in_pdf.append(line)
        
        only_in_code = []
        for line in item['existing']:
            if line.lower().strip() not in pdf_set:
                only_in_code.append(line)
        
        if only_in_pdf:
            print("  PDF中有但代码中没有:")
            for line in only_in_pdf:
                print(f"    + {line}")
        
        if only_in_code:
            print("  代码中有但PDF中没有:")
            for line in only_in_code:
                print(f"    - {line}")
        
        break
