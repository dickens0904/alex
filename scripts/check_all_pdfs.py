import pdfplumber
import os

base = r'I:\新概念英语练习王'
pdfs = [
    '新概念英语第一册名师精讲笔记.pdf',
    '新概念英语第一册自学导读.pdf',
    '新概念英语第一册练习详解.pdf',
    '新概念英语第一册同步互动习题集.pdf',
    '新概念英语 第一册教师用书.pdf',
]

for fname in pdfs:
    path = os.path.join(base, fname)
    if os.path.exists(path):
        try:
            with pdfplumber.open(path) as pdf:
                total_chars = 0
                for page in pdf.pages[:5]:
                    text = page.extract_text()
                    if text:
                        total_chars += len(text)
                print(f"{fname}: {len(pdf.pages)} pages, {total_chars} chars in first 5 pages")
        except Exception as e:
            print(f"{fname}: ERROR - {e}")
