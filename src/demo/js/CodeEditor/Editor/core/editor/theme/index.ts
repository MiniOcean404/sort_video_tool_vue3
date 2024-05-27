import * as monaco from "monaco-editor"
import type { editor } from "monaco-editor"

import { convertTheme } from "./transform"
import GITHUB_DARK_DEFAULT from "./theme-json/github-dark-default.json"
import ONE_DARK_PRO_Dark from "./theme-json/one-dark-pro-dark.json"
import { loadWASM } from "onigasm"
import { Registry } from "monaco-textmate"
import { wireTmGrammars } from "monaco-editor-textmate"
import onigasmVSCodeWasm from "onigasm/lib/onigasm.wasm?url"

import typescript from "./grammar-json/TypeScript.tmLanguage.json"
import css from "./grammar-json/css.tmLanguage.json"
import html from "./grammar-json/html.tmLanguage.json"
import javascript from "./grammar-json/JavaScriptReact.tmLanguage.json"

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

// 设置语法
export async function setGrammarAnalyze(editorIns: editor.IStandaloneCodeEditor) {
  await loadWASM(onigasmVSCodeWasm)

  const map: Record<string, object> = {
    "text.html.basic": html,
    "source.css": css,
    "source.ts": typescript,
    "source.js": javascript,
  }

  // 设置语言及 scopeName
  const grammars = new Map()
  grammars.set("css", "source.css")
  grammars.set("html", "text.html.basic")
  grammars.set("typescript", "source.ts")

  // 创建一个注册表，可以从作用域名称来加载对应的语法文件
  const registry = new Registry({
    getGrammarDefinition: async (scopeName) => {
      return {
        format: "json", // 语法文件格式，有json、plist
        content: map[scopeName],
      }
    },
  })

  // monaco.languages.register({ id: "typescript" })

  // 需要等待 window.MonacoEnvironment.getWorkerUrl 执行完，否则被 monaco-editor 覆盖，因为 monaco-editor 设置的时候是异步的
  // https://juejin.cn/post/7160869798493028359
  setTimeout(async () => {
    await wireTmGrammars(monaco, registry, grammars, editorIns)
  }, 5000)
}
