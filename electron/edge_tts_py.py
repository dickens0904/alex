"""Edge TTS 合成包装（供 Electron 主进程子进程调用）

使用 Python edge-tts >= 7.3.1（2026-10 微软 Akamai 反爬升级后，
npm msedge-tts 2.1.0 的旧握手参数全部 403/200，7.3.1 的 GEC v2 令牌可用）。

用法：
  python edge_tts_py.py --voice en-US-AriaNeural --rate "+0%" --pitch "+0Hz" --out out.mp3 --text "..."
  文本也可经 stdin 传入（避免超长命令行）：--text-file - 时从 stdin 读。
"""
import argparse
import asyncio
import sys

import edge_tts


async def synth(voice: str, text: str, rate: str, pitch: str, out: str) -> None:
    communicate = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
    await communicate.save(out)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", required=True)
    ap.add_argument("--rate", default="+0%")
    ap.add_argument("--pitch", default="+0Hz")
    ap.add_argument("--out", required=True)
    ap.add_argument("--text", default="")
    ap.add_argument("--text-file", default="")
    args = ap.parse_args()

    text = args.text
    if args.text_file:
        if args.text_file == '-':
            text = sys.stdin.read()  # "-" = 从 stdin 读（主进程 spawn 管道）
        else:
            with open(args.text_file, "r", encoding="utf-8") as f:
                text = f.read()
    if not text.strip():
        print("EMPTY_TEXT", file=sys.stderr)
        return 3

    try:
        asyncio.run(synth(args.voice, text, args.rate, args.pitch, args.out))
    except Exception as exc:  # noqa: BLE001
        print(f"SYNTH_ERROR: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
