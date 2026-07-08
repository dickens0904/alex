import pdfplumber

# Try the other PDF
pdf_path = r'I:\新概念英语练习王\新概念英语（第一册） (路易·亚历山大).pdf'

with pdfplumber.open(pdf_path) as pdf:
    print(f"Total pages: {len(pdf.pages)}")
    # Check first few pages
    for i in range(min(10, len(pdf.pages))):
        text = pdf.pages[i].extract_text()
        print(f"Page {i+1}: {len(text) if text else 0} chars")
        if text and len(text) > 10:
            print(text[:300])
            print("---")
