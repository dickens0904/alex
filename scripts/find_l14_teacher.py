import pdfplumber

pdf_path = r'I:\新概念英语练习王\新概念英语 第一册教师用书.pdf'

with pdfplumber.open(pdf_path) as pdf:
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text and ("Lesson 14" in text or "What colour" in text):
            print(f"\n{'='*60}")
            print(f"Page {i+1}:")
            print(text[:3000])
            print(f"{'='*60}")
