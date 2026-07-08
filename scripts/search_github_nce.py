"""Search GitHub for New Concept English resources."""
import urllib.request
import json

def search_github(query):
    url = f"https://api.github.com/search/repositories?q={query}&sort=stars&per_page=10"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/vnd.github.v3+json'
    })
    resp = urllib.request.urlopen(req, timeout=15)
    data = json.loads(resp.read())
    return data.get('items', [])

def search_code(query):
    url = f"https://api.github.com/search/code?q={query}&per_page=5"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/vnd.github.v3+json'
    })
    resp = urllib.request.urlopen(req, timeout=15)
    data = json.loads(resp.read())
    return data.get('items', [])

if __name__ == "__main__":
    # Search for NCE repos with images
    queries = [
        "new+concept+english+lesson+image",
        "新概念英语+课文+图片",
        "new+concept+english+book1+illustration",
    ]
    
    seen = set()
    for q in queries:
        print(f"\n=== Searching repos: {q} ===")
        try:
            repos = search_github(q)
            for r in repos:
                if r['full_name'] not in seen:
                    seen.add(r['full_name'])
                    print(f"  {r['full_name']} (Stars: {r['stargazers_count']})")
                    print(f"    {r['html_url']}")
                    desc = r.get('description') or ''
                    print(f"    {desc[:100]}")
        except Exception as e:
            print(f"  Error: {e}")
    
    # Also search for code containing NCE image references
    print("\n=== Searching code for NCE images ===")
    try:
        items = search_code("新概念英语+lesson+extension:jpg+OR+extension:png")
        for item in items[:5]:
            print(f"  {item['repository']['full_name']}: {item['path']}")
            print(f"    {item['html_url']}")
    except Exception as e:
        print(f"  Error: {e}")
