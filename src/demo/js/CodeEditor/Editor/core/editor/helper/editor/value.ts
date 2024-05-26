import type { editor } from "monaco-editor"

function setEditCode(editorIns: editor.IStandaloneCodeEditor, value: string) {
  editorIns?.setValue(value)
}

function getEditCode(editorIns: editor.IStandaloneCodeEditor, value: string) {
  editorIns?.setValue(value)
}
