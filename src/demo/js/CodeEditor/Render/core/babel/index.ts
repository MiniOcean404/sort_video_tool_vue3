import { transform } from "@babel/standalone"
import type { PluginObj } from "@babel/core"

/**
 * 使用 babel 编译代码
 */

export function babelTransfrom(
  filename: string,
  code: string,
  callback?: (libName: string) => string,
): string {
  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        // 方式1：将 import React from "xxx" 中的 xx 转换为 具体代码 blob url
        // 方式2：利用 script 中的 importmap 声明导入包的代码
        const libName = path.node.source.value
        if (libName.endsWith(".js") && callback) {
          const code = callback(libName)
          path.node.source.value = js2JsUrl(libName, code)
        }

        if (libName.endsWith(".css") && callback) {
          const code = callback(libName)
          path.node.source.value = css2JsUrl(libName, code)
        }

        if (libName.endsWith(".json") && callback) {
          const code = callback(libName)
          path.node.source.value = json2JsUrl(code)
        }
      },
    },
  }

  const build = transform(code, {
    presets: ["react", "typescript"],
    filename: filename,
    retainLines: false, // 是否保留行号
    plugins: [transformImportSourcePlugin],
  })

  return build.code || ""
}

// 创建 js 脚本代码，可以直接复制给 path.node.source.value 进行库的导入
function js2JsUrl(filename: string, code: string) {
  code = babelTransfrom(filename, code)
  return URL.createObjectURL(new Blob([code], { type: "application/javascript" }))
}

export const json2JsUrl = (code: string) => {
  const json = `export default ${code}`
  return URL.createObjectURL(new Blob([json], { type: "application/javascript" }))
}

export const css2JsUrl = (filename: string, code: string) => {
  const randomId = new Date().getTime()
  const css = `
    (() => {
        const id = "style_${randomId}_${filename}"

        let stylesheet = document.getElementById(id)
        if (!stylesheet) {
          stylesheet = document.createElement("style")
          stylesheet.setAttribute("id", id)
          document.head.appendChild(stylesheet)
        }

        const styles = document.createTextNode(\`${code}\`)
        stylesheet.innerHTML = ""
        stylesheet.appendChild(styles)
      })()
    `
  return URL.createObjectURL(new Blob([css], { type: "application/javascript" }))
}
