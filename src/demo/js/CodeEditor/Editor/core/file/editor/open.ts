import { editor } from "monaco-editor"
import * as monaco from "monaco-editor"
import fileState from "@/demo/js/CodeEditor/Editor/core/file/store/state.ts"

export function openFile(editorIns: editor.IStandaloneCodeEditor, path: string) {
  const model = monaco.editor.getModels().find((model) => model.uri.path === path)

  if (path !== fileState.pre.file) {
    // 储存上一个path的编辑器的状态
    fileState.view.set(fileState.pre.file, editorIns.saveViewState())
  }

  const editorState = fileState.view.get(path)

  if (editorState) {
    // 恢复编辑器的状态
    editorIns.restoreViewState(editorState)
    fileState.pre.file = path
  } else if (model) {
    editorIns.setModel(model)
  }

  fileState.current.file = path

  // 聚焦编辑器
  editorIns.focus()
}
