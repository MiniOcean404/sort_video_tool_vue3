import type { editor } from "monaco-editor"
import * as monaco from "monaco-editor"

function addCoplitSuggest() {
  const insetFragment = `cument.addEventListener('`

  monaco.languages.registerInlineCompletionsProvider("javascript", {
    provideInlineCompletions: async function (model, position, context, token) {
      return Promise.resolve({
        items: [
          {
            insertText: insetFragment,
            // 从这一行的第三个字符开始，显示类似 coplit 建议
            range: new monaco.Range(
              position.lineNumber,
              3,
              position.lineNumber,
              insetFragment.length,
            ),
          },
        ],
      })
    },
    freeInlineCompletions(arg) {},
  })
}
