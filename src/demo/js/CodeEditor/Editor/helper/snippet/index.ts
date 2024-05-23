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
        label: key,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: js[key],
        detail: js[key],
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
