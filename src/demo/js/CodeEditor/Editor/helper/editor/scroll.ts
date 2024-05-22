import type { editor } from "monaco-editor"

// 滚动指定行
async function scrollLine(editorIns: editor.IStandaloneCodeEditor, line: number, column: number) {
  editorIns.revealPositionInCenter({ lineNumber: line, column: column })
}

// 滚动距离顶部的高度
async function scrollTop(editorIns: editor.IStandaloneCodeEditor, line: number, top: number) {
  editorIns.setScrollTop(top)
}
