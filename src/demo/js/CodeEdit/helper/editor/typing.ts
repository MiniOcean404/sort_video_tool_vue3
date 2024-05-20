import * as monaco from "monaco-editor"
import type { editor } from "monaco-editor"
import { setupTypeAcquisition } from "@typescript/ata"
import typescriprt from "typescript"

// 添加 ts 声明：https://mp.weixin.qq.com/s/MAKK2LqOp251ccuMi3ST7A
function addTsTyping(editor: editor.IStandaloneCodeEditor) {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    // 这里设置 jsx 为 preserve，也就是输入 <div> 输出 <div>，保留原样
    // 如果设置为 react 会输出 React.createElement("div")。
    jsx: monaco.languages.typescript.JsxEmit.Preserve,
    // 再就是 esModuleInterop，这个也是 ts 常用配置。
    // 默认 fs 要这么引入，因为它是 commonjs 的包，没有 default 属性：
    // import * as fs from 'fs';
    // 设置 esModuleInterop 会在编译的时候自动加上 default 属性。就可以这样引入了：
    // import fs from 'fs';
    esModuleInterop: true,
  })
}

export function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: "my-ata",
    typescript: typescriprt,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        console.log("自动下载的类型包", path)
        onDownloadFile(code, path)
      },
    },
  })

  return ata
}

function setTs(editor: editor.IStandaloneCodeEditor) {
  // 设置 tsconfig.json, 支持 react
  addTsTyping(editor)

  // 添加类型声明文件
  const ata = createATA((code, path) => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}}`)
  })

  // 获取 ts 类型的代码
  ata(editor.getValue())
}
