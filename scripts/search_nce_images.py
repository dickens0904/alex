"""Search for New Concept English lesson illustrations online."""
import urllib.request
import urllib.parse
import json
import os
import re

SAVE_DIR = r"I:\新概念英语练习王\src\assets\images\lessons"

def search_baidu_images(keyword, count=5):
    """Search Baidu Images for NCE illustrations."""
    url = f"https://image.baidu.com/search/acjson?tn=resultjson_com&word={urllib.parse.quote(keyword)}&pn=0&rn={count}"
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        resp = urllib.request.urlopen(req, timeout=15)
        data = json.loads(resp.read().decode('utf-8', errors='ignore'))
        results = []
        if 'data' in data:
            for item in data['data']:
                if 'thumbURL' in item:
                    results.append({
                        'url': item.get('thumbURL') or item.get('middleURL', ''),
                        'title': item.get('fromPageTitle', ''),
                        'width': item.get('width', 0),
                        'height': item.get('height', 0),
                    })
        return results
    except Exception as e:
        print(f"  Search error: {e}")
        return []

def download_image(url, filepath):
    """Download image from URL."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        resp = urllib.request.urlopen(req, timeout=30)
        data = resp.read()
        with open(filepath, 'wb') as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"  Download error: {e}")
        return False

if __name__ == "__main__":
    # Search for NCE Book 1 illustrations
    keywords = [
        "新概念英语第一册课文插图",
        "New Concept English Book 1 illustration",
        "新概念英语1 课文图片 场景",
    ]
    
    for kw in keywords:
        print(f"\nSearching: {kw}")
        results = search_baidu_images(kw, count=5)
        for i, r in enumerate(results):
            print(f"  [{i+1}] {r['title'][:60]}")
            print(f"      {r['url'][:120]}")
            print(f"      Size: {r['width']}x{r['height']}")
    
    # Try downloading a test image
    print("\n\nTesting download of first result...")
    results = search_baidu_images("新概念英语第一册 Excuse me 插图", count=3)
    if results:
        url = results[0]['url']
        test_path = os.path.join(SAVE_DIR, "test_nce_search.jpg")
        print(f"  Downloading: {url[:100]}")
        if download_image(url, test_path):
            size = os.path.getsize(test_path)
            print(f"  Saved: {test_path} ({size} bytes)")
