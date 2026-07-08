"""
新概念英语课文插图生成器
- 读取背景图（AI生成的场景图）
- 叠加半透明文字条 + 英文课文
- 输出最终 PNG
"""
import json
import sys
import os
from PIL import Image, ImageDraw, ImageFont

def find_font(size=36):
    """查找可用字体，优先使用系统英文字体"""
    font_paths = [
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibri.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/tahoma.ttf",
        "C:/Windows/Fonts/verdana.ttf",
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            return ImageFont.truetype(fp, size)
    return ImageFont.load_default()

def find_chinese_font(size=28):
    """查找中文字体"""
    font_paths = [
        "C:/Windows/Fonts/msyh.ttc",
        "C:/Windows/Fonts/simhei.ttf",
        "C:/Windows/Fonts/simsun.ttc",
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            return ImageFont.truetype(fp, size)
    return ImageFont.load_default()

def create_lesson_illustration(bg_path, output_path, title, paragraphs, translations=None):
    """
    在背景图上叠加课文文字，生成最终插图
    
    Args:
        bg_path: 背景图路径
        output_path: 输出路径
        title: 课文标题
        paragraphs: [(speaker, text), ...] 段落列表
        translations: [str, ...] 中文翻译（可选）
    """
    # 打开背景图
    img = Image.open(bg_path).convert('RGBA')
    w, h = img.size
    
    # 创建叠加层
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # 字体
    title_font = find_font(48)
    text_font = find_font(36)
    speaker_font = find_font(32)
    chinese_font = find_chinese_font(28)
    
    # ---- 标题区域（顶部） ----
    title_text = title
    title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
    title_w = title_bbox[2] - title_bbox[0]
    title_x = (w - title_w) // 2
    
    # 标题背景条
    draw.rounded_rectangle(
        [40, 20, w - 40, 80],
        radius=12,
        fill=(0, 0, 0, 180)
    )
    draw.text((title_x, 28), title_text, fill=(255, 255, 100, 255), font=title_font)
    
    # ---- 课文文字区域（底部） ----
    # 计算文字总高度
    line_height = 52
    total_lines = len(paragraphs)
    if translations:
        total_lines += len(translations)
    
    text_block_height = total_lines * line_height + 40
    text_start_y = h - text_block_height - 20
    
    # 半透明背景
    draw.rounded_rectangle(
        [30, text_start_y - 10, w - 30, h - 20],
        radius=16,
        fill=(0, 0, 0, 200)
    )
    
    # 绘制课文
    y = text_start_y + 10
    for i, (speaker, content) in enumerate(paragraphs):
        if speaker:
            line = f"{speaker}: {content}"
        else:
            line = content
        
        # 每行单独测量宽度，居中或左对齐
        line_bbox = draw.textbbox((0, 0), line, font=text_font)
        line_w = line_bbox[2] - line_bbox[0]
        
        # 如果文字太长，缩小字体
        if line_w > w - 100:
            smaller_font = find_font(28)
            draw.text((50, y), line, fill=(255, 255, 255, 255), font=smaller_font)
        else:
            draw.text((50, y), line, fill=(255, 255, 255, 255), font=text_font)
        
        y += line_height
        
        # 如果有翻译，显示在下方（小字灰色）
        if translations and i < len(translations):
            trans = translations[i]
            draw.text((70, y - 8), trans, fill=(200, 200, 200, 200), font=chinese_font)
            y += 36
    
    # 合成
    result = Image.alpha_composite(img, overlay)
    result = result.convert('RGB')
    result.save(output_path, 'PNG', quality=95)
    print(f"Saved: {output_path}")
    return output_path


def create_lesson_illustration_simple(bg_path, output_path, title, english_lines):
    """
    简化版：只叠加英文文字，不带翻译
    
    Args:
        bg_path: 背景图路径
        output_path: 输出路径  
        title: 课文标题
        english_lines: [str, ...] 英文句子列表
    """
    img = Image.open(bg_path).convert('RGBA')
    w, h = img.size
    
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    title_font = find_font(48)
    text_font = find_font(34)
    
    # 标题
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_w = title_bbox[2] - title_bbox[0]
    title_x = (w - title_w) // 2
    
    draw.rounded_rectangle(
        [40, 20, w - 40, 85],
        radius=12,
        fill=(0, 0, 0, 180)
    )
    draw.text((title_x, 28), title, fill=(255, 255, 100, 255), font=title_font)
    
    # 文字区域
    line_height = 50
    text_block_height = len(english_lines) * line_height + 40
    text_start_y = h - text_block_height - 20
    
    draw.rounded_rectangle(
        [30, text_start_y - 10, w - 30, h - 20],
        radius=16,
        fill=(0, 0, 0, 200)
    )
    
    y = text_start_y + 10
    for line in english_lines:
        draw.text((50, y), line, fill=(255, 255, 255, 255), font=text_font)
        y += line_height
    
    result = Image.alpha_composite(img, overlay)
    result = result.convert('RGB')
    result.save(output_path, 'PNG', quality=95)
    print(f"Saved: {output_path}")
    return output_path


if __name__ == '__main__':
    # 示例用法
    if len(sys.argv) < 2:
        print("Usage: python overlay_lesson_text.py <config.json>")
        sys.exit(1)
    
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        config = json.load(f)
    
    create_lesson_illustration_simple(
        bg_path=config['bg_path'],
        output_path=config['output_path'],
        title=config['title'],
        english_lines=config['english_lines'],
    )
