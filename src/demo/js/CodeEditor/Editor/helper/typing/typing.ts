import * as monaco from "monaco-editor"
import { setupTypeAcquisition } from "@typescript/ata"
import typescriprt from "typescript"

// 添加 ts 声明：https://mp.weixin.qq.com/s/MAKK2LqOp251ccuMi3ST7A

export function setTs() {
  // 设置 tsconfig.json, 支持 react
  addTsTyping()

  // 添加类型声明文件
  // const ata = createATA((code, path) => {
  //   // var library = "declare class Test11111111111111111 { descriptionfirst:string; } "
  //   // monaco.languages.typescript.typescriptDefaults.addExtraLib(
  //   //   library,
  //   //   monaco.Uri.file("/a/b/c/test.d.ts").toString(),
  //   // )

  //   monaco.languages.typescript.typescriptDefaults.addExtraLib(
  //     code,
  //     monaco.Uri.file(path).toString(),
  //   )

  //   // monaco.languages.typescript.typescriptDefaults.getExtraLibs()
  // })

  // 获取 ts 类型的代码
  // ata(editor.getValue())

  // return ata
}

function addTsTyping() {
  const compilerOptions = monaco.languages.typescript.javascriptDefaults.getCompilerOptions()

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...compilerOptions,
    // 这里设置 jsx 为 preserve，也就是输入 <div> 输出 <div>，保留原样
    // 如果设置为 react 会输出 React.createElement("div")。
    jsx: monaco.languages.typescript.JsxEmit.Preserve,
    // 再就是 esModuleInterop，这个也是 ts 常用配置。
    // 默认 fs 要这么引入，因为它是 commonjs 的包，没有 default 属性：
    // import * as fs from 'fs';
    // 设置 esModuleInterop 会在编译的时候自动加上 default 属性。就可以这样引入了：
    // import fs from 'fs';
    esModuleInterop: true,
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    resolveJsonModule: true,
    useDefineForClassFields: true,
    allowNonTsExtensions: true,
    allowSyntheticDefaultImports: true,
    baseUrl: ".",
  })
}

export function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: "my-ata",
    typescript: typescriprt,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        // console.log("自动下载的类型包", `file://${path}}`)
        // console.log(code)

        onDownloadFile(code, path)
      },
      finished: () => {
        console.log(monaco.languages.typescript.typescriptDefaults.getExtraLibs())
      },
    },
  })

  return ata
}
