import { Files } from "@/demo/js/CodeEditor/Editor/typing/vue"
import fileState from "@/demo/js/CodeEditor/Editor/core/file/store/state.ts"

export function initFileSystem(files: Files) {
  fileState.files = files
  fileState.filenames = Object.keys(files)
  fileState.default = fileState.filenames[0]

  return fileState
}
