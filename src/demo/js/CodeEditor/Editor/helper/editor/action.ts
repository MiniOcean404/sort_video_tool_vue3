import type { editor } from "monaco-editor"

// 查看 monaco 支持哪些 actions
export function getAllAction(editorIns: editor.IStandaloneCodeEditor) {
  return editorIns.getSupportedActions()
}

export function addAction(editorIns: editor.IStandaloneCodeEditor) {
  // 用于控制切换该菜单键的显示
  const isShow = editorIns.createContextKey<boolean>("shouldFormatRunnerAction", false)

  editorIns.addAction({
    // id
    id: "format",
    // 该菜单键显示文本
    label: "格式化",
    // 控制该菜单键显示
    precondition: "shouldFormatRunnerAction",
    // 该菜单键位置
    contextMenuGroupId: "navigation",
    contextMenuOrder: 1.5,
    // 点击该菜单键后运行
    run: (event) => {
      alert(event.getPosition())
      // 光标位置
      console.log("格式化 Action:", event.getPosition())
    },
  })

  isShow.set(true)
}
