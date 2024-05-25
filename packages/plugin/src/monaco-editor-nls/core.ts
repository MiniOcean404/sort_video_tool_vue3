import fs from "fs"
import path from "path"
import { Plugin } from "vite"
import MagicString from "magic-string"
import { Plugin as EsbuildPlugin } from "esbuild"

import { getLocalizeCode, getReplaceMethodCode } from "./utils/replace"
import { goMonacoEditorFileRegexp, goNLSRegexp, isNls } from "./utils/regexp"
import { Languages, type Options } from "@/monaco-editor-nls/typing"

/**
 * 在 vit e中 dev 模式下会使用 esbuild 对 node_modules 进行预编译，导致找不到映射表中的 filepath，
 * 需要在预编译之前进行替换
 * @param options 替换语言包
 * @returns
 */
export function esbuildPluginMonacoEditorNls(
  options: Options = { locale: Languages.en_gb },
): EsbuildPlugin {
  const I18N_JSON = getLocalize(options.locale, options.localeData)

  return {
    name: "esbuild-plugin-monaco-editor-nls",
    setup(build) {
      build.onLoad({ filter: goNLSRegexp }, async () => {
        return {
          contents: getLocalizeCode(I18N_JSON),
          loader: "js",
        }
      })

      // 替换调用方法接口参数，替换成相应语言包语言
      build.onLoad({ filter: goMonacoEditorFileRegexp }, async ({ path }) => {
        let contents = fs.readFileSync(path, "utf8")
        const replace = getReplaceMethodCode(path, contents, I18N_JSON)

        if (replace) {
          return {
            contents: replace,
            loader: "js",
          }
        }
      })
    },
  }
}

/**
 * 使用了monaco-editor-nls 的语言映射包，把原始localize(data, message)的方法，替换成了localize(path, data, defaultMessage)
 * vite build 模式下，使用rollup处理
 * @param options 替换语言包
 * @returns
 */
export function vitePluginMonacoEditorNls(options: Options = { locale: Languages.en_gb }): Plugin {
  const I18N_JSON = getLocalize(options.locale, options.localeData)

  return {
    name: "vite-plugin-monaco-editor-nls",
    enforce: "pre",
    load(path) {
      if (isNls(path)) return getLocalizeCode(I18N_JSON)
    },
    transform(code, path) {
      const replace = getReplaceMethodCode(path, code, I18N_JSON)

      if (replace) {
        return {
          code: replace,
          /** 使用magic-string 生成 source map */
          map: new MagicString(replace).generateMap({
            includeContent: true,
            hires: true,
            source: path,
          }),
        }
      }
    },
  }
}

/**
 * 获取语言包
 * @param locale 语言
 * @param localeData
 * @returns
 */
function getLocalize(locale: Languages, localeData: Record<string, any> | undefined = undefined) {
  if (localeData) return JSON.stringify(localeData)
  const locale_data_path = path.join(__dirname, `../../locale/${locale}.i18n.json`)
  return fs.readFileSync(locale_data_path) as unknown as string
}
