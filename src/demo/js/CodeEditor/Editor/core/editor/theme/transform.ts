import type {
  VscodeSettings,
  VscodeTheme,
  VscodeTokenColor,
} from "@/demo/js/CodeEditor/Editor/typing/theme"
import type { editor } from "monaco-editor"

export function convertTheme(
  theme: string | VscodeTheme,
  addDefaultToken = true,
  defaultColor = "#03ffa7",
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

  theme.tokenColors.forEach((color) => {
    if (typeof color.scope == "string") {
      const split = color.scope.split(",")

      if (split.length > 1) {
        color.scope = split

        return monacoThemeRule.push(...getArrayScopeTokenColor(color.scope, color.settings))
      }

      monacoThemeRule.push({ ...color.settings, token: color.scope })
      return
    }

    monacoThemeRule.push(...getArrayScopeTokenColor(color.scope, color.settings))
  })

  if (addDefaultToken) {
    monacoThemeRule.push({
      token: "",
      foreground: theme.colors["editor.foreground"] || defaultColor,
    })
  }

  return returnTheme
}

function getArrayScopeTokenColor(scope: string[], settings: VscodeSettings) {
  return scope.map<editor.ITokenThemeRule>((scope) => {
    return {
      ...settings,
      token: scope,
    }
  })
}
