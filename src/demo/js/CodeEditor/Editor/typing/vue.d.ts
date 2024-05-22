export interface CodeEditProps {
  code: string
  language: string
  theme: string
}

export interface EditorEmits {
  (e: "updateCode", value: string | undefined): void
}
