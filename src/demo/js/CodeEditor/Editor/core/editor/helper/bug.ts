import type { editor } from "monaco-editor"

// setValue 设置的值并不能“回退”
// https://github.com/microsoft/monaco-editor/issues/3358
function CtrlZ(editorIns: editor.IStandaloneCodeEditor, value: string) {
  const range = editorIns.getModel()?.getFullModelRange()

  if (range) {
    editorIns.pushUndoStop()

    editorIns.executeEdits("name-of-edit", [
      {
        range, // full range
        text: value, // target value here
      },
    ])

    editorIns.pushUndoStop()
  }
}
