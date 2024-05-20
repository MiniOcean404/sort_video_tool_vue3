import type { editor } from "monaco-editor"

// 设置获取光标
export function getCursorPostion(editorIns: editor.IStandaloneCodeEditor) {
  editorIns.getPosition()
}

export function setCursorPostion(
  editorIns: editor.IStandaloneCodeEditor,
  line: number,
  column: number,
) {
  editorIns.setPosition({ column, lineNumber: line })
}

// 获取选中内容
export function getSelectionCode(editorIns: editor.IStandaloneCodeEditor) {
  const selection = editorIns.getSelection()

  if (selection) {
    const { startLineNumber, endLineNumber, startColumn, endColumn } = selection

    const model = editorIns.getModel()

    return model?.getValueInRange({
      startLineNumber,
      startColumn,
      endLineNumber,
      endColumn,
    })
  }
}

export function getLineCode(editorIns: editor.IStandaloneCodeEditor, offset: number) {
  const model = editorIns.getModel()
  /* 获取光标位置 */
  const position = model?.getPositionAt(offset)

  if (position) {
    /* 获取代码 */
    const code = model?.getLineContent(position.lineNumber)
    return code
  }
}
