import * as monaco from "monaco-editor"
import jsSnippet from "./js"

export function registerSnippet() {
  class SnippetProvider implements monaco.languages.CompletionItemProvider {
    // 触发字符
    triggerCharacters?: string[] | undefined = ["."]

    provideCompletionItems(
      model: monaco.editor.ITextModel,
      position: monaco.Position,
      // context: monaco.languages.CompletionContext,
      // token: monaco.CancellationToken,
    ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: model.getWordUntilPosition(position).startColumn,
        endColumn: model.getWordUntilPosition(position).endColumn,
      }

      const suggestions = Object.keys(jsSnippet).map((key) => {
        return {
          label: key, // 显示的提示内容
          kind: monaco.languages.CompletionItemKind.Function, // 用来显示提示内容后的不同的图标
          insertText: jsSnippet[key].insert, // 选择后粘贴到编辑器中的文字
          detail: jsSnippet[key].detail, // 提示内容后的说明,及文档描述标题
          documentation: jsSnippet[key].documentation || "", // 文档详细描述
          range,
        }
      })

      return {
        incomplete: true,
        suggestions: [...suggestions],
      }
    }
  }

  monaco.languages.registerCompletionItemProvider("javascript", new SnippetProvider())
  monaco.languages.registerCompletionItemProvider("typescript", new SnippetProvider())
}
