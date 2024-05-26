import type { editor } from "monaco-editor"
import * as monaco from "monaco-editor"

export function Api(editorIns: editor.IStandaloneCodeEditor) {
  // 设置编辑器主题
  monaco.editor.setTheme("")
  // 更新编辑器的选项，可以用于动态改变编辑器的配置
  editorIns?.updateOptions({})
  // 重新布局，如果在创建实例时设置了自动布局 automaticLayout: true 则不需要用此方法
  editorIns?.layout()

  // 展开收起代码块
  editorIns?.getAction("editor.foldAll")?.run()
  editorIns?.getAction("editor.unfoldAll")?.run()
}
