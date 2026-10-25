#!/usr/bin/env python3
"""
批量生成新概念英语课文插图（Agnes API）
流程：解析 completeLessons.ts 每课对话 -> 文本模型写场景提示词 -> 图像模型出图
     -> 缩放到 800x600 -> 覆盖 src/assets/images/lessons/lesson-N.png（旧图自动备份）
特性：全局限速（API 限 RPM=10，脚本按 9 RPM 滑动窗口限速）、失败重试、断点续跑
用法：$env:AGNES_API_KEY='<key>'; python scripts/generate_illustrations.py [课号1 课号2 ...]
"""
import io
import json
import os
import re
import shutil
import sys
import threading
import time
from collections import deque
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from PIL import Image

ROOT = r"I:\新概念英语练习王"
LESSONS_TS = os.path.join(ROOT, "src", "data", "lessons", "completeLessons.ts")
OUT_DIR = os.path.join(ROOT, "src", "assets", "images", "lessons")
BACKUP_DIR = os.path.join(ROOT, "illustrations-backup")
DIST_DIR = os.path.join(ROOT, "dist", "renderer", "assets", "images", "lessons")
STATE_FILE = os.path.join(ROOT, "illustrations-progress", "done.json")
BASE_URL = "https://api.agnes-ai.cn/v1"
TEXT_MODEL = "agnes-2.5-flash"
IMAGE_MODEL = "agnes-image-2.5-flash"
SIZE = "1024x768"
TARGET = (800, 600)
WORKERS = 3
RPM_LIMIT = 9          # API 限 10 RPM，留 1 次余量
RPM_WINDOW = 60.0      # 滑动窗口秒数

STYLE_PREFIX = (
    "Children's picture book illustration, flat vector style, soft warm colors, "
    "friendly smiling characters, simple clean background with soft rounded shapes, "
    "gentle lighting, centered composition, "
)
STYLE_SUFFIX = ", no text, no letters, no words, no signs, no labels, no writing anywhere, no watermark"

_RATE_LOCK = threading.Lock()
_REQ_TIMES = deque()


def rate_limit():
    """全局滑动窗口限速：所有 API 请求（文本+图像）共用 9 RPM 配额"""
    while True:
        with _RATE_LOCK:
            now = time.time()
            while _REQ_TIMES and now - _REQ_TIMES[0] > RPM_WINDOW:
                _REQ_TIMES.popleft()
            if len(_REQ_TIMES) < RPM_LIMIT:
                _REQ_TIMES.append(now)
                return
            wait = RPM_WINDOW - (now - _REQ_TIMES[0]) + 0.1
        time.sleep(min(wait, 5))


def api_key() -> str:
    return os.environ["AGNES_API_KEY"]


def parse_lessons():
    src = open(LESSONS_TS, encoding="utf-8").read()
    # 每课对象以 "{ id: N," 开始；title 不一定紧跟 id（有的课 illustration 在中间），
    # 引号类型取决于内容是否含撇号（如 "What's your job?"）
    title_re = re.compile(r"title:\s*(?:'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\")")
    content_re = re.compile(r"content:\s*(?:'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\")")

    def pick(m):
        v = m.group(1) if m.group(1) is not None else m.group(2)
        return v.replace("\\'", "'")

    starts = list(re.finditer(r"\{\s*id:\s*(\d+),", src))
    lessons = []
    for i, m in enumerate(starts):
        lid = int(m.group(1))
        seg = src[m.end(): starts[i + 1].start() if i + 1 < len(starts) else len(src)]
        tm = title_re.search(seg)
        if not tm:
            continue
        pm = re.search(r"paragraphs:\s*\[(.*?)\],\s*\n\s*translation", seg, re.S)
        dialogue = [pick(cm) for cm in content_re.finditer(pm.group(1))] if pm else []
        lessons.append({"id": lid, "title": pick(tm), "dialogue": dialogue[:8]})
    return lessons


def load_state():
    if os.path.exists(STATE_FILE):
        return set(json.load(open(STATE_FILE, encoding="utf-8")))
    return set()


def save_state(done: set):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    json.dump(sorted(done), open(STATE_FILE, "w", encoding="utf-8"))


def post_with_retry(url, payload, max_try=4):
    for attempt in range(1, max_try + 1):
        try:
            rate_limit()
            r = requests.post(
                url,
                headers={"Authorization": f"Bearer {api_key()}", "Content-Type": "application/json"},
                json=payload,
                timeout=300,
            )
            if r.status_code == 429:
                wait = 30 * attempt
                print(f"    429 限速，等待 {wait}s", flush=True)
                time.sleep(wait)
                continue
            if r.status_code >= 400:
                raise RuntimeError(f"HTTP {r.status_code}: {r.text[:200]}")
            return r.json()
        except (requests.RequestException, RuntimeError) as e:
            if attempt == max_try:
                raise
            print(f"    重试 {attempt}/{max_try - 1}: {str(e)[:120]}", flush=True)
            time.sleep(10 * attempt)


def scene_prompt(lesson) -> str:
    dialogue = " / ".join(lesson["dialogue"]) or lesson["title"]
    user = (
        f"Lesson title: {lesson['title']}\nDialogue: {dialogue}\n\n"
        "Write ONE short English prompt (max 60 words) for a children's picture book illustration "
        "showing ONE concrete scene matching this New Concept English lesson: who is doing what, "
        "where, key props, mood. Everyday life scene, 1-3 people. "
        "Output ONLY the plain scene description. No style words, no quotes, "
        "no mention of text or signs."
    )
    data = post_with_retry(
        f"{BASE_URL}/chat/completions",
        {"model": TEXT_MODEL, "messages": [{"role": "user", "content": user}],
         "temperature": 0.7, "max_tokens": 250},
    )
    text = data["choices"][0]["message"]["content"].strip().strip('"')
    text = re.sub(r"^\s*\d+[.)]\s*", "", text).splitlines()[0][:600]
    return text or f"everyday scene about {lesson['title']}"


def backup_old(lid: int):
    src = os.path.join(OUT_DIR, f"lesson-{lid}.png")
    if os.path.exists(src):
        os.makedirs(BACKUP_DIR, exist_ok=True)
        dst = os.path.join(BACKUP_DIR, f"lesson-{lid}.png")
        if not os.path.exists(dst):
            shutil.copy2(src, dst)


def generate_one(lesson) -> dict:
    lid = lesson["id"]
    scene = scene_prompt(lesson)
    data = post_with_retry(
        f"{BASE_URL}/images/generations",
        {"model": IMAGE_MODEL, "prompt": STYLE_PREFIX + scene + STYLE_SUFFIX, "size": SIZE},
    )
    url = data["data"][0]["url"]
    raw = requests.get(url, timeout=180).content
    img = Image.open(io.BytesIO(raw)).convert("RGB").resize(TARGET, Image.LANCZOS)
    img = img.quantize(colors=256, method=Image.MEDIANCUT)
    backup_old(lid)
    out = os.path.join(OUT_DIR, f"lesson-{lid}.png")
    img.save(out, "PNG", optimize=True)
    if os.path.isdir(DIST_DIR):
        shutil.copy2(out, os.path.join(DIST_DIR, f"lesson-{lid}.png"))
    return {"id": lid, "scene": scene, "kb": round(os.path.getsize(out) / 1024)}


def main():
    only = {int(a) for a in sys.argv[1:]} if len(sys.argv) > 1 else None
    lessons = parse_lessons()
    if only:
        lessons = [l for l in lessons if l["id"] in only]
    done = load_state()
    todo = [l for l in lessons if l["id"] not in done]
    print(f"共 {len(lessons)} 课，已完成 {len(done & {l['id'] for l in lessons})}，待生成 {len(todo)}，"
          f"限速 {RPM_LIMIT} RPM（约 {len(todo) * 2 / RPM_LIMIT:.0f} 分钟）", flush=True)

    ok, fail = 0, []
    with ThreadPoolExecutor(WORKERS) as pool:
        futs = {pool.submit(generate_one, l): l for l in todo}
        for fut in as_completed(futs):
            l = futs[fut]
            try:
                res = fut.result()
                done.add(l["id"])
                save_state(done)
                ok += 1
                print(f"[{ok + len(fail)}/{len(todo)}] 第{res['id']}课 OK {res['kb']}KB | {res['scene'][:80]}", flush=True)
            except Exception as e:
                fail.append(l["id"])
                print(f"[FAIL] 第{l['id']}课: {str(e)[:160]}", flush=True)

    print(f"\n完成 {ok}/{len(todo)}，失败: {fail if fail else '无'}", flush=True)
    sys.exit(1 if fail else 0)


if __name__ == "__main__":
    main()
