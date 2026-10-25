# 新概念英语练习王

一个为 8 岁儿童设计的《新概念英语第一册》144 课学习桌面应用，涵盖听说读写全方位学习。完全本地运行：语音合成与识别均支持离线使用，无需账号、不采集数据。

**当前版本：v1.1.0**（[下载安装包](https://github.com/dickens0904/alex/releases/latest)，Windows x64）

## 功能特点

- 📚 **完整 144 课**：课文（中英对照+插图）、单词（音标+释义+例句）、语法讲解，全量内置
- � **情景剧场**：每课 SVG 分镜动画逐句演出，支持**跟读模式**——孩子跟读后离线语音评分（≥70 分过关）
- 🎮 **趣味游戏**：单词射击（弹道虚线辅助瞄准）、飞机大战（鼠标/键盘+点击或空格发射）、记忆翻牌，边玩边记单词
- ✏️ **六类练习**：听力 / 口语（离线评分）/ 拼写 / 填空 / 阅读理解 / 语法，共 6800+ 题，答错可重试
- 📝 **语法专项**：按语法范畴分类的题池，完成课程逐步解锁，不超纲
- 🔊 **高质量语音**：Edge TTS 多音色分角色朗读，144 课句子/单词全量本地 MP3 缓存（断网可用）
- � **激励体系**：积分、连击、成就徽章、连续学习天数、进度可视化
- � **儿童友好**：大按钮、卡通界面、护眼计时提醒、一键操作

## 技术栈（实际）

| 层 | 技术 |
|---|---|
| 应用框架 | Electron 28（contextIsolation + preload IPC） |
| 前端 | React 18 + TypeScript + Webpack 5 |
| 数据存储 | better-sqlite3（学习进度）+ localStorage（设置） |
| 语音合成 | msedge-tts（在线）+ 本地 MP3 缓存兜底（`tts-cache/`，约 1.2 万个文件，按需自愈回写） |
| 语音识别 | sherpa-onnx 流式 Zipformer 模型（`models/` 内置，约 48MB）+ @ffmpeg-installer 音频解码（npm 二进制，无系统依赖） |
| 打包 | electron-builder（NSIS 安装包） |
| 测试 | jest（256 个单元测试） |

## 快速开始

### 环境要求

- Node.js 18+（开发机实测 Node 24）
- Windows 10/11（安装包为 Windows x64）

### 直接使用

从 [Releases](https://github.com/dickens0904/alex/releases/latest) 下载 `new-concept-english-practice-setup-1.1.0.exe` 安装即可。

### 开发

```bash
npm install        # 安装依赖（含平台二进制）
npm run dev        # 开发模式（webpack:3000 + Electron 热启）
npm run build      # 生产构建（渲染层 + 主进程 + 资产拷贝）
npm start          # 运行构建产物
npm run lint       # ESLint（提交前须 0 error）
npm test           # jest 单元测试
npm run dist       # 打包 NSIS 安装包到 release/
```

## 项目结构

```
新概念英语练习王/
├── electron/                # 主进程
│   ├── main.ts              # 入口：IPC（TTS/数据库/日志/语音识别）
│   ├── preload.ts           # contextBridge 暴露 electronAPI
│   ├── voskBinding.ts       # Vosk 离线识别 + ffmpeg 解码
│   └── database/            # SQLite 初始化与课程/进度读写
├── src/                     # 渲染进程（React）
│   ├── pages/               # 首页 / 课程列表 / 课程详情 / 进度 / 专项练习
│   ├── components/          # 剧场(theater)、游戏、练习(practice)等组件
│   ├── services/            # tts / speechRecognition / soundEffects / 进度等
│   ├── data/                # 144 课课文数据 + 6800 题练习 + 语法题池
│   └── assets/              # 课程插图 + 课文朗读音频（打包进安装包）
├── tts-cache/               # TTS 本地 MP3 缓存（运行时按需自愈回写）
├── models/                  # Vosk 离线识别模型
├── dist/                    # 构建产物（运行 dist/electron/electron/main.js）
├── scripts/                 # 数据生成/审计脚本 + CDP 验证探针
├── runtime-data/            # 用户进度数据库备份（运行库在系统 AppData）
└── release/                 # electron-builder 打包产物
```

## 数据与语音说明

- **学习进度**：SQLite 库位于系统 `%APPDATA%/new-concept-english-practice/english-practice.db`；`runtime-data/` 内有备份，跨机器迁移时拷回该路径。
- **语音缓存**：句子按 `音色 + 文本哈希` 寻址缓存到 `tts-cache/`；在线合成失败时自动用缓存兜底，成功后回写缓存。
- **离线识别**：口语/跟读评分走 Vosk 流式识别（麦克风录音经 ffmpeg 解码为 16k PCM），识别文本与目标句做词级比对打分。

## 开发者须知

- 改动 TypeScript 后需 `npm run build` 再 `npm start`（运行的是 dist 编译产物）。
- 提交前跑 `npm run lint`（0 error）与 `npm test`。
- 冒烟验证优先用 `scripts/` 下的 CDP 探针（`npx electron . --remote-debugging-port=9222` 后 `node scripts/probe-*.js`），勿用模拟鼠标点击。
- 游戏画布逻辑坐标固定 700px 宽，CSS 必须与之一致（`.game-area` 宽 700px 居中）。
- 更多开发约定与设计文档见 [开发指南.md](./开发指南.md) 与 [开发规划.md](./开发规划.md)。

## 版本历史

- **v1.1.0**（2026-10-25）：情景剧场跟读模式、趣味练习直达入口、游戏操控优化（弹道虚线/点击发射）、41 道选项重复题修复、TTS 稳定性加固、课文译文/词表/插图全面校正
- **v1.0.0**（2026-07-03）：首个发布版本

## 许可证

MIT License
