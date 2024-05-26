export interface LibDep {
  [key: string]: string
}

interface FileTree {
  [key: string]: string
}

export interface CodeEditProps {
  fileTree: FileTree
  theme: string
}

export interface EditorEmits {
  (e: "updateCode", value: string | undefined): void
}
