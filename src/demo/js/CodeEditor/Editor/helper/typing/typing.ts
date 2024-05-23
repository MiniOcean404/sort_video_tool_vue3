import * as monaco from "monaco-editor"
import typescriprt from "typescript"
import { setupTypeAcquisition } from "@typescript/ata"

// 添加 ts 声明：https://mp.weixin.qq.com/s/MAKK2LqOp251ccuMi3ST7A

export function setLocalLib() {
  const types = import.meta.glob(
    [
      `/node_modules/{react,reacr-dom,color-diff,dayjs}/**/*.{d.ts,json}`,
      `/node_modules/@types/{react,reacr-dom,color-diff,dayjs}/**/*.{d.ts,json}`,
    ],
    { eager: true, as: "raw" },
  )

  Object.keys(types).forEach((path) => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      types[path],
      monaco.Uri.file(path).toString(true),
    )
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      types[path],
      monaco.Uri.file(path).toString(true),
    )
  })

  // monaco.languages.typescript.typescriptDefaults.addExtraLib(
  //   "export interface dayjs {} ",
  //   monaco.Uri.file("/node_modules/@types/math/index.d.ts").toString(true),
  // )
  // monaco.languages.typescript.typescriptDefaults.getExtraLibs()

  console.log(monaco.languages.typescript.typescriptDefaults.getExtraLibs())
}

export async function setATA() {
  // 添加类型声明文件
  const ata = createATA(async (code, path) => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      code,
      monaco.Uri.file(path).toString(true),
    )
  })

  // 获取 ts 类型的代码
  // ata(editor.getValue())
  return ata
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
