"""
新概念英语多格漫画插图生成器
- 读取AI生成的多格漫画背景图
- 在每格下方叠加对应的英文句子
- 输出最终 PNG
"""
import json
import sys
import os
from PIL import Image, ImageDraw, ImageFont

def find_font(size=32):
    """查找可用英文字体"""
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


def create_comic_illustration(bg_path, output_path, title, panels):
    """
    在多格漫画背景图上叠加课文文字
    
    Args:
        bg_path: 背景图路径（AI生成的多格漫画）
        output_path: 输出路径
        title: 课文标题
        panels: [{"speaker": "A", "text": "Excuse me!"}, ...] 每格的台词
    """
    img = Image.open(bg_path).convert('RGBA')
    bg_w, bg_h = img.size
    
    # ---- 布局参数 ----
    title_h = 80           # 标题区高度
    text_strip_h = 60      # 每格文字条高度
    margin = 20            # 边距
    panel_gap = 8          # 格间距
    
    # 漫画格布局：2行，上行4格下行3格
    rows = [
        {"count": 4, "panels": panels[0:4]},
        {"count": 3, "panels": panels[4:7] if len(panels) > 4 else []},
    ]
    
    # 每行高度 = 漫画格高度 + 文字条高度
    # 总高度 = 标题 + 上行(格+文字) + 间距 + 下行(格+文字) + 底部边距
    comic_area_h = bg_h  # 漫画区域总高度（原始图）
    
    # 创建最终画布（比原图多出标题和文字条的空间）
    canvas_h = title_h + comic_area_h + len(rows) * text_strip_h + margin * 2
    canvas_w = bg_w
    
    canvas = Image.new('RGBA', (canvas_w, canvas_h), (30, 30, 30, 255))
    draw = ImageDraw.Draw(canvas)
    
    # ---- 标题 ----
    title_font = find_font(44)
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_w = title_bbox[2] - title_bbox[0]
    title_x = (canvas_w - title_w) // 2
    
    # 标题背景条
    draw.rounded_rectangle(
        [margin, margin, canvas_w - margin, margin + title_h - 10],
        radius=12,
        fill=(45, 45, 45, 255)
    )
    draw.text((title_x, margin + 15), title, fill=(255, 220, 80, 255), font=title_font)
    
    # ---- 漫画格 + 文字 ----
    text_font = find_font(30)
    y_offset = margin + title_h
    
    # 计算每行的格子尺寸
    available_w = canvas_w - 2 * margin
    gap_total_w = (4 - 1) * panel_gap  # 最多4格的间距
    
    row_idx = 0
    panel_global_idx = 0
    for row_info in rows:
        count = row_info["count"]
        row_panels = row_info["panels"]
        if not row_panels:
            break
        
        # 该行漫画格的高度（按比例从原图切分）
        # 原图分成2行，上行占约55%，下行占约45%
        if row_idx == 0:
            src_row_h = int(bg_h * 0.55)
            src_y = 0
        else:
            src_row_h = bg_h - int(bg_h * 0.55)
            src_y = int(bg_h * 0.55)
        
        # 目标格高度（保持宽高比）
        panel_w = (available_w - (count - 1) * panel_gap) // count
        panel_h = int(src_row_h * (panel_w / (bg_w // count)))
        
        for i, panel in enumerate(row_panels):
            if panel_global_idx >= len(panels):
                break
            
            # 源区域裁剪
            src_panel_w = bg_w // count
            src_x = i * src_panel_w
            
            # 裁剪并缩放
            cropped = img.crop((src_x, src_y, src_x + src_panel_w, src_y + src_row_h))
            resized = cropped.resize((panel_w, panel_h), Image.LANCZOS)
            
            # 粘贴到画布
            px = margin + i * (panel_w + panel_gap)
            canvas.paste(resized, (px, y_offset))
            
            # 格边框
            draw.rectangle(
                [px, y_offset, px + panel_w, y_offset + panel_h],
                outline=(100, 100, 100, 255), width=2
            )
            
            # ---- 文字条（格下方） ----
            text_y = y_offset + panel_h + 4
            
            # 文字背景条
            draw.rounded_rectangle(
                [px, text_y, px + panel_w, text_y + text_strip_h - 8],
                radius=8,
                fill=(20, 20, 20, 240)
            )
            
            # 文字内容
            speaker = panel.get("speaker", "")
            text = panel.get("text", "")
            if speaker:
                display_text = f"{speaker}: {text}"
            else:
                display_text = text
            
            # 居中显示文字
            txt_bbox = draw.textbbox((0, 0), display_text, font=text_font)
            txt_w = txt_bbox[2] - txt_bbox[0]
            
            # 如果文字太长，缩小字体
            if txt_w > panel_w - 16:
                smaller = find_font(24)
                txt_bbox2 = draw.textbbox((0, 0), display_text, font=smaller)
                txt_w2 = txt_bbox2[2] - txt_bbox2[0]
                if txt_w2 > panel_w - 16:
                    smaller = find_font(20)
                txt_bbox2 = draw.textbbox((0, 0), display_text, font=smaller)
                txt_w2 = txt_bbox2[2] - txt_bbox2[0]
                txt_x = px + (panel_w - txt_w2) // 2
                draw.text((txt_x, text_y + 12), display_text, fill=(255, 255, 255, 255), font=smaller)
            else:
                txt_x = px + (panel_w - txt_w) // 2
                draw.text((txt_x, text_y + 12), display_text, fill=(255, 255, 255, 255), font=text_font)
            
            panel_global_idx += 1
        
        # 更新y偏移
        y_offset += panel_h + text_strip_h + panel_gap
        row_idx += 1
    
    # 裁剪到实际使用高度
    final_h = y_offset + margin
    canvas = canvas.crop((0, 0, canvas_w, final_h))
    
    # 保存
    result = canvas.convert('RGB')
    result.save(output_path, 'PNG', quality=95)
    print(f"Saved: {output_path} ({canvas_w}x{final_h})")
    return output_path


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python overlay_comic_text.py <config.json>")
        sys.exit(1)
    
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        config = json.load(f)
    
    create_comic_illustration(
        bg_path=config['bg_path'],
        output_path=config['output_path'],
        title=config['title'],
        panels=config['panels'],
    )
