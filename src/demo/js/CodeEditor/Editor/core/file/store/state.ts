import { FileState } from "@/demo/js/CodeEditor/Editor/typing/store"

const fileState: FileState = {
  view: new Map(),
  default: "",
  pre: { file: "app.tsx" },
  current: { file: "" },
  files: {},
  filenames: [],
}

export default fileState
