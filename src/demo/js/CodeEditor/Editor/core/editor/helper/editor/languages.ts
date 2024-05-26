import * as monaco from "monaco-editor"
import type { editor } from "monaco-editor"

function customLanguageLanguages() {
  // https://juejin.cn/post/7273309090657419320?searchId=20240520201050E65F0FDBD81EB378E63B
  // 现在这个语言除了有个名字，还空空如也。所以，接下来，我们就要开始给 myJavascript 语言加上我们的语法高亮功能。该功能主要是通过 setMonarchTokensProvider 的函数实现
  monaco.languages.register({ id: "js" })

  monaco.languages.setMonarchTokensProvider("js", {
    // monaco-editor/esm/vs/basic-languages/sql/sql.js
    tokenizer: {
      root: [
        [/\d+/, { token: "keyword" }], // 数字
        [/[a-z]+/, { token: "string" }], // 小写字符串
      ],
    },
    comments: {
      lineComment: "--",
      blockComment: ["/*", "*/"],
    },
  })

  //   monaco.editor.defineTheme("js-dark", {
  //    monaco-editor/esm/editor/standalone/common/theme.js
  //   })
}

function registerLanguageAction(editorIns: editor.IStandaloneCodeEditor) {
  class FlinkActionProvider implements monaco.languages.CodeActionProvider {
    provideCodeActions(
      model: editor.ITextModel,
      range: monaco.Range,
      context: monaco.languages.CodeActionContext,
      token: monaco.CancellationToken,
    ): monaco.languages.ProviderResult<monaco.languages.CodeActionList> {
      const commentLineAction: monaco.languages.CodeAction = {
        title: "切换行注释",
        command: {
          id: "editor.action.commentLine",
          title: "切换行注释",
        },
      }
      const actions = [commentLineAction]
      return { actions, dispose: () => {} }
    }
  }

  // 定义注释、取消注释命令
  monaco.languages.registerCodeActionProvider("flink", new FlinkActionProvider())

  // 添加快捷键触发刚设定的命令
  // 注释 Ctrl + /
  editorIns.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Slash, () => {
    editorIns.trigger("flink", "editor.action.flinkActionProvider.destination", null)
  })
}
