export interface LibDep {
  [key: string]: string
}

interface Files {
  [key: string]: string
}

export interface CodeEditProps {
  files: Files
  theme: string
}

export interface EditorEmits {
  (e: "updateCode", value: string | undefined): void
}
