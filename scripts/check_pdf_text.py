import pdfplumber

pdf_path = r'I:\新概念英语练习王\新概念英语第一册学生用书.pdf'

with pdfplumber.open(pdf_path) as pdf:
    # Check first few pages for text
    for i in range(min(10, len(pdf.pages))):
        text = pdf.pages[i].extract_text()
        print(f"Page {i+1}: {len(text) if text else 0} chars")
        if text:
            print(text[:200])
            print("---")
