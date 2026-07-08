import pdfplumber
import re

pdf_path = r'I:\新概念英语练习王\新概念英语第一册学生用书.pdf'

with pdfplumber.open(pdf_path) as pdf:
    print(f"Total pages: {len(pdf.pages)}")
    
    # Search for Lesson 14 content
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text and ("Lesson 14" in text or "colour" in text.lower() or "What colour" in text):
            print(f"\n{'='*60}")
            print(f"Page {i+1}:")
            print(text[:2000])
            print(f"{'='*60}")
