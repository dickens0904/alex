# 新概念英语练习王 - 课文插图生成方案

## 最终方案

### 技术流程
1. **sn-image-base** 生成与课文内容匹配的单场景插图
2. **Python PIL** 在底部叠加英文课文对白文字
3. 输出覆盖到 `src/assets/images/lessons/lesson-{id}.jpg`

### 关键文件
- `scripts/generate_lesson_image.py` — 批量生成脚本（待创建）
- `scripts/overlay_comic_text.py` — 文字叠加脚本
- `scripts/lessons_text.json` — 全部课文文本配置（待创建）

### 生成参数
- 图片尺寸：2752x1536（2k，16:9）
- 输出：JPG，quality=95
- 每课耗时：~17秒（生成）+ ~2秒（叠加）
- 164课总计：~50分钟
- Book 1（1-36课）：~12分钟

### Prompt 模板
```
Children's storybook illustration, cartoon watercolor style, warm colors, 
child-friendly, showing a specific scene from the story: [场景描述]
```

### 注意事项
- PowerShell 环境下避免内联 Python 代码（f-strings 会被破坏）
- 所有 Python 代码必须写入 .py 文件再执行
- JSON 配置文件必须用 UTF-8 编码保存
- sn-image-base 进程返回 code 1 是正常的（stderr 输出），图片实际已生成
