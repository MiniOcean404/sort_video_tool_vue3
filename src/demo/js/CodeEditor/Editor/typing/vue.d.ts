export interface CodeEditProps {
  code: string
  language: string
  theme: string
}

export interface EditorEmits {
  (e: "update:code", value: string | undefined): void
}
