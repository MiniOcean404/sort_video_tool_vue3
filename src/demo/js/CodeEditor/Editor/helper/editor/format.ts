import * as monaco from "monaco-editor"
import type { editor } from "monaco-editor"

import prettier from "prettier/standalone"
import * as prettierPluginEstree from "prettier/plugins/estree"

interface ModelToPaser {
  [key: string]: { mode: string; plugin: any }
}

const modelToPaser: ModelToPaser = {
  html: {
    mode: "html",
    plugin: await import("prettier/parser-html"),
  },
  css: {
    mode: "css",
    plugin: await import("prettier/parser-postcss"),
  },
  less: {
    mode: "less",
    plugin: await import("prettier/parser-postcss"),
  },
  sass: {
    mode: "scss",
    plugin: await import("prettier/parser-postcss"),
  },
  typescript: {
    mode: "typescript",
    plugin: await import("prettier/parser-typescript"),
  },
  javascript: {
    mode: "babel",
    plugin: await import("prettier/parser-babel"),
  },
}

export function addFormat() {
  // @ts-ignore
  monaco.languages.css.cssDefaults.modeConfiguration.documentFormattingEdits = false

  class FormatProvider implements monaco.languages.DocumentFormattingEditProvider {
    displayName?: string | undefined = "prettier"

    async provideDocumentFormattingEdits(
      model: monaco.editor.ITextModel,
      options: monaco.languages.FormattingOptions,
      token: monaco.CancellationToken,
    ): Promise<monaco.languages.TextEdit[]> {
      const text = await spliceSemiAndDoubleQoute(
        model.getValue(),
        modelToPaser[model.getLanguageId()].mode,
        modelToPaser[model.getLanguageId()].plugin,
      )

      return [
        {
          text,
          range: model.getFullModelRange(),
        },
      ]
    }
  }

  ;["html", "css", "less", "sass", "typescript", "javascript"].forEach((language) => {
    monaco.languages.registerDocumentFormattingEditProvider(language, new FormatProvider())
  })
}

// 覆盖快捷键
// Demo: https://microsoft.github.io/monaco-editor/playground.html?source=v0.37.1#example-interacting-with-the-editor-adding-a-keybinding-to-an-existing-command
function setupKeybindings(editorIns: editor.IStandaloneCodeEditor) {
  monaco.editor.addKeybindingRule({
    keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
    command: "editor.action.formatDocument",
  })
}

// 格式化逻辑
function spliceSemiAndDoubleQoute(code: string, mode: string, plugin: any) {
  return prettier.format(code, {
    parser: mode,
    //不保留行尾分号去掉，开发规范统一
    semi: true,
    //字符串用单引号包,裹，开发规范统一
    singleQuote: true,
    // 代码每行宇符数
    printWidth: 130,
    //jsx中'＞'保持在一行
    bracketSameLine: true,
    //对象空格
    bracketSpacing: true,
    //行尾逗号
    trailingComma: "none",
    // (x) => {}
    arrowParens: "avoid",
    plugins: [prettierPluginEstree, plugin],
  })
}
