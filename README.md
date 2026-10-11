# 暮色伴侶動物安養所 · Twilight Companion Sanctuary (1998)

一款浏览器中运行的恐怖叙事小游戏。你扮演一家动物安养所的工作人员，在档案、监控录像与内部终端之间拼凑真相，同时面对逐渐失控的收容对象。

界面支持日语（默认）与中文，右上角可以即时切换。

## 运行方式

项目是纯静态的 HTML/CSS/JS，没有构建步骤。

直接双击打开 `index.html` 即可。如果某些功能（如音频加载）在 `file://` 下受限，可以用任意静态服务器运行，例如：

```bash
python -m http.server 8000
```

然后访问 `http://127.0.0.1:8000/`。

页面会从 Google Fonts 加载字体，需要能够访问该服务。

## 目录结构

```
index.html              入口页面
css/                    样式（main / components / horror）
js/
  i18n.js               中日双语文本
  main.js               主控制器与档案数据库
  audio-engine.js       音频引擎
  corruption.js         「污染度」系统与 jump scare 触发
  cctv-system.js        监控录像界面
  feeding-game.js       喂食小游戏
  intranet-terminal.js  内部终端（含指令系统）
  chat-bot.js           聊天机器人
  spectrum.js           频谱分析与隐藏频率
assets/                 图片、立绘与音效
```

`assets/sounds/` 中的音效由根目录的生成脚本产生，可以按需重新生成。

## 辅助脚本

这些脚本是开发时使用的小工具，游戏运行时不需要。请在项目根目录下用 Node.js 执行：

| 脚本 | 作用 |
|---|---|
| `generate_organic_sounds.js` | 程序化生成环境音与生物音效 WAV |
| `build_12_realistic_pet_sounds.js` | 生成 12 只宠物的叫声 WAV |
| `remove_background_png.js` | 去除 `fatcat.png` 的背景，生成透明版本 |
| `check_jpgs.js` | 检查 jump scare 图片文件头是否正确 |
| `test_fatcat.js` | 解析并输出 `fatcat.png` 的基本信息 |

## 游戏机制概览

- **档案库**：每位收容对象都有编号档案，档案中包含逐步解锁的机密记录。
- **污染度**：随着探索推进而上升。数值达到阈值时会触发额外事件与 jump scare。
- **监控录像**：通过 CCTV 界面观察安养所的不同区域。
- **内部终端**：可以输入指令访问隐藏内容，部分账号需要通过游戏内线索获得。
- **隐藏内容**：包括界面上的隐藏入口、频谱中的特定频率以及若干彩蛋。
