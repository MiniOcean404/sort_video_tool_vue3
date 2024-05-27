import * as monaco from "monaco-editor"

import { convertTheme } from "./transform"

import { loadWASM } from "onigasm"
import { Registry } from "monaco-textmate"
import { wireTmGrammars } from "monaco-editor-textmate"
import onigasmVSCodeWasm from "onigasm/lib/onigasm.wasm?url"

import GITHUB_DARK_DEFAULT from "./theme-json/github-dark-default.json"
import ONE_DARK_PRO_Dark from "./theme-json/one-dark-pro-dark.json"

import typescript from "./grammar-json/TypeScript.tmLanguage.json"
import css from "./grammar-json/css.tmLanguage.json"
import html from "./grammar-json/html.tmLanguage.json"
import javascript from "./grammar-json/JavaScriptReact.tmLanguage.json"

export function loadCustomTheme() {
  monaco.editor.defineTheme("github-dark-theme", convertTheme(GITHUB_DARK_DEFAULT))
  monaco.editor.defineTheme("one-dark-pro-dark", convertTheme(ONE_DARK_PRO_Dark))
}

export function setMonacoEditorTheme(themeName: string) {
  monaco.editor.setTheme(themeName)
}

// 设置语法
export async function setGrammarAnalyze() {
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
    await wireTmGrammars(monaco, registry, grammars)
  }, 500)
}
