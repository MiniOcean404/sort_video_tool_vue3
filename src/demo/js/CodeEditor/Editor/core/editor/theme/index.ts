import * as monaco from "monaco-editor"

import { convertTheme } from "./transform"
import GITHUB_DARK_DEFAULT from "./json/github-dark-default.json"
import ONE_DARK_PRO_Dark from "./json/one-dark-pro-dark.json"

// ## 获取 vscode 主题
// 1. 有两种方法，如果某个主题已经在你的 VSCode 里安装并正在使用的话，那么可以按 F1 或  Command/Control + Shift + P 或鼠标右键点击 Command Palette/命令面板，
//    接着找到并点击 Developer:Generate Color Theme From Current Setting/ 开发人员:使用当前设置生成颜色主题，然后 VSCode 就会生成一份 json 数据，
//    保存即可
// 2. 如果某个主题没有安装的话，那么可以去 vscode 主题商店搜索该主题，进入主题详情页面后点击右侧的 Download Extension 按钮即可下载该主题，下载完成后找到刚才下载的文件，文件应该是以 .vsix 结尾的，直接把该后缀改成.zip，
//    然后解压缩，最后打开里面的/extension/themes/文件夹，里面的.json文件即主题文件，打开该文件复制json数据即可。

export function loadCustomTheme() {
  monaco.editor.defineTheme("github-dark-theme", convertTheme(GITHUB_DARK_DEFAULT))
  monaco.editor.defineTheme("one-dark-pro-dark", convertTheme(ONE_DARK_PRO_Dark))
}

export function setMonacoEditorTheme(themeName: string) {
  monaco.editor.setTheme(themeName)
}
