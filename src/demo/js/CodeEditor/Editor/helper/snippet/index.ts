import * as monaco from "monaco-editor"
import js from "./js"

function registerSnippet() {
  class SinppetProvider implements monaco.languages.CompletionItemProvider {
    triggerCharacters?: string[] | undefined
    provideCompletionItems(
      model: monaco.editor.ITextModel,
      position: monaco.Position,
      context: monaco.languages.CompletionContext,
      token: monaco.CancellationToken,
    ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
      const suggestions = Object.keys(js).map((key) => ({
        label: key,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: js[key],
        detail: js[key],
        // range: new monaco.Range()
      }))

      return {
        incomplete: true,
        // @ts-ignore
        suggestions: [...suggestions],
      }
    }
  }

  monaco.languages.registerCompletionItemProvider("javascript", new SinppetProvider())
}
