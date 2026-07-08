import fitz
import sys

pdf_path = r'I:\新概念英语练习王\新概念英语（第一册） (路易·亚历山大).pdf'
doc = fitz.open(pdf_path)
print(f'Total pages: {len(doc)}')

for i in range(5):
    page = doc[i]
    text = page.get_text()
    print(f'--- Page {i+1} (len={len(text)}) ---')
    if text.strip():
        print(text[:500])
    else:
        print('[EMPTY - scanned image]')
        # Check if page has images
        images = page.get_images()
        print(f'  Images on page: {len(images)}')
        if images:
            img = images[0]
            print(f'  First image: {img[2]}x{img[3]}')

doc.close()
