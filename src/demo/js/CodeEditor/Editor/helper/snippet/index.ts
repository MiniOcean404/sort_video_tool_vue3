import * as monaco from "monaco-editor"
import js from "./js"

function registerSnippet() {
  class SinppetProvider implements monaco.languages.CompletionItemProvider {
    // 触发字符
    triggerCharacters?: string[] | undefined = ["."]

    provideCompletionItems(
      model: monaco.editor.ITextModel,
      position: monaco.Position,
      context: monaco.languages.CompletionContext,
      token: monaco.CancellationToken,
    ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: model.getWordUntilPosition(position).startColumn,
        endColumn: model.getWordUntilPosition(position).endColumn,
      }

      const suggestions = Object.keys(js).map((key) => ({
        label: key, // 显示的提示内容
        kind: monaco.languages.CompletionItemKind.Function, // 用来显示提示内容后的不同的图标
        insertText: js[key], // 选择后粘贴到编辑器中的文字
        detail: js[key], // 提示内容后的说明
        range,
      }))

      return {
        incomplete: true,
        suggestions: [...suggestions],
      }
    }
  }

  monaco.languages.registerCompletionItemProvider("javascript", new SinppetProvider())
}
