import { getAssetsPath } from "@/utils"
import fs from "fs"
import { Languages } from "@/monaco-editor-nls"

/**
 * 获取语言包
 * @param locale 语言
 * @param localeData
 * @returns
 */
export function getLocalize(
  locale: Languages,
  localeData: Record<string, any> | undefined = undefined,
) {
  if (localeData) return JSON.stringify(localeData)
  const locale_data_path = getAssetsPath(`locale/${locale}.i18n.json`)
  const file = fs.readFileSync(locale_data_path, "utf-8")
  return JSON.stringify(JSON.parse(file)["contents"])
}
