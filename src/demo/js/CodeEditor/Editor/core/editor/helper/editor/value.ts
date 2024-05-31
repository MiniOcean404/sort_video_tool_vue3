import type { editor } from "monaco-editor"
import * as monaco from "monaco-editor"

// 外界想要直接修改文件的值，可以直接通过 model.setValue 进行修改，但是这样直接操作，就会丢失编辑器 undo 的堆栈，想要保留 undo，可以通过 model.pushEditOperations
export function setEditCode(editorIns: editor.IStandaloneCodeEditor, value: string) {
  editorIns?.setValue(value)
}

export function getEditCode(editorIns: editor.IStandaloneCodeEditor, value: string) {
  editorIns?.setValue(value)
}

export function pushEditOperations(path: string, code: string) {
  let model = monaco.editor.getModels().find((model) => model.uri.path === path)

  if (model && model.getValue() !== code) {
    // 通过该方法，可以实现undo堆栈的保留
    model.pushEditOperations(
      [],
      [
        {
          range: model.getFullModelRange(),
          text: code,
        },
      ],
      () => [],
    )
  }
}

// setValue 设置的值并不能“回退”
// https://github.com/microsoft/monaco-editor/issues/3358
export function CtrlZ(editorIns: editor.IStandaloneCodeEditor, value: string) {
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
