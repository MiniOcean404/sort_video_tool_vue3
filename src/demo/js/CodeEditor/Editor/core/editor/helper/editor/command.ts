import type { editor } from "monaco-editor"
import * as monaco from "monaco-editor"

// 数字0：monaco.KeyCode.Digit0
// 字母A：monaco.KeyCode.KeyA
// F1：monaco.KeyCode.F1
// Tab：monaco.KeyCode.Tab
// Delete：monaco.KeyCode.Delete
// Alt：monaco.KeyMod.Alt
// Ctrl：monaco.KeyMod.CtrlCmd
// Shift：monaco.KeyMod.Shift
export function addCommand(editorIns: editor.IStandaloneCodeEditor) {
  /* condition：condition === true 时，按下快捷键才有效 */
  const condition = editorIns.createContextKey<boolean>("condition", false)
  condition.set(true)

  // Ctrl + S -- 格式化代码
  editorIns.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    editorIns?.getAction("editor.action.formatDocument")?.run()
  })

  /* Alt + Delete 清除代码 */
  editorIns.addCommand(
    monaco.KeyMod.Alt | monaco.KeyCode.Delete,
    () => {
      alert("清除代码")
    },
    "condition",
  )

  // Alt + L -- 小写转换
  editorIns.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.KeyL, () => {
    editorIns.trigger("", "editor.action.transformToLowercase", "")
  })

  // Alt + U -- 大写转换
  editorIns.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.KeyU, () => {
    editorIns.trigger("", "editor.action.transformToUppercase", "")
  })

  // Alt + D -- 整行删除
  editorIns.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.KeyD, () => {
    editorIns.trigger("", "editor.action.deleteLines", "")
  })

  // 快捷键Ctrl+` 给单词加上反引号
  editorIns.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Backquote, () => {
    const selection = editorIns.getSelection()

    if (selection) {
      const word = editorIns.getModel()?.getValueInRange(selection) || ""

      editorIns.executeEdits("addBackticks", [
        {
          range: selection,
          text: `\`${word}\``,
          forceMoveMarkers: true,
        },
      ])
    }
  })
}
