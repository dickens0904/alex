import sys
import os
import argparse

sys.path.insert(0, os.path.join(os.path.expanduser('~'), '.qclaw', 'skills', 'sn-image-base', 'scripts'))

from sn_agent_runner import build_parser

parser = build_parser()
args = parser.parse_args([
    'sn-image-generate',
    '--prompt', 'test',
    '--save-path', r'I:\新概念英语练习王\src\assets\images\lessons\lesson-1.jpg'
])

print(f"save_path: {args.save_path}")
print(f"type: {type(args.save_path)}")
print(f"exists: {os.path.exists(os.path.dirname(args.save_path))}")
