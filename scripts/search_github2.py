"""Search for NCE images using web fetch."""
import urllib.request
import urllib.parse
import json
import os
import re

def search_and_find():
    # Try fetching known NCE resource pages
    urls_to_try = [
        "https://github.com/search?q=new+concept+english+images&type=repositories",
        "https://github.com/search?q=%E6%96%B0%E6%A6%82%E5%BF%B5%E8%8B%B1%E8%AF%AD+images&type=repositories",
    ]
    
    for url in urls_to_try:
        try:
            req = urllib.request.Request(url, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
            resp = urllib.request.urlopen(req, timeout=15)
            html = resp.read().decode('utf-8', errors='ignore')
            # Find repo links
            repos = re.findall(r'href="/([^"]+)"', html)
            unique_repos = list(set([r for r in repos if '/' in r and not r.startswith(('search/', 'features', 'collections', 'events', 'sponsors', 'settings', 'login', 'signup', 'explore', 'topics', 'trending'))]))[:10]
            print(f"Found repos from {url}:")
            for r in unique_repos:
                print(f"  https://github.com/{r}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    search_and_find()
