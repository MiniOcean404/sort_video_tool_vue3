import { Files } from "@/demo/js/CodeEditor/Editor/typing/vue"

export interface FileState {
  view: Map
  default: string
  pre: Pre
  current: Current
  files: Files
  filenames: string[]
}

export interface Pre {
  file: string
}

export interface Current {
  file: string
}
