import type { VscodeTheme, VscodeTokenColor } from "@/demo/js/CodeEditor/Editor/typing/theme"
import type { editor } from "monaco-editor"

export function convertTheme(
  theme: string | VscodeTheme,
  addDefaultToken = true,
  defaultColor = "#ffffff",
) {
  if (typeof theme === "string") {
    theme = JSON.parse(
      theme.replace(/(\/\/").+?[\n\r\t]/g, "").replace(/,[\n\r\t]*\}/, "}"),
    ) as VscodeTheme
  }

  const monacoThemeRule: editor.ITokenThemeRule[] = []

  const returnTheme: editor.IStandaloneThemeData = {
    inherit: false,
    base: "vs-dark",
    colors: theme.colors,
    rules: monacoThemeRule,
    encodedTokensColors: [],
  }

  theme.tokenColors.map((color) => {
    if (typeof color.scope == "string") {
      const split = color.scope.split(",")

      if (split.length > 1) {
        color.scope = split
        monacoThemeRule.concat(evalAsArray(color))
        return
      }

      monacoThemeRule.push({ ...color.settings, token: color.scope })
      return
    }
    monacoThemeRule.concat(evalAsArray(color))
  })

  if (addDefaultToken) {
    monacoThemeRule.push({
      token: "",
      foreground: theme.colors["editor.foreground"] || defaultColor,
    })
  }

  return returnTheme
}

function evalAsArray(color: VscodeTokenColor) {
  const rules: editor.ITokenThemeRule[] = []

  if (Array.isArray(color.scope)) {
    color.scope.forEach((scope) => rules.push({ ...color.settings, token: scope }))
  }

  return rules
}
