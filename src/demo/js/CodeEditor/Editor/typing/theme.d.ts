export interface VscodeTheme {
  $schema: string
  type: string
  colors: Record<string, string>
  tokenColors: VscodeTokenColor[]
}

export interface VscodeTokenColor {
  scope: string | string[]
  settings: VscodeSettings
}
