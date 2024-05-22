import * as monaco from "monaco-editor"
import typescriprt from "typescript"
import { setupTypeAcquisition } from "@typescript/ata"

// 添加 ts 声明：https://mp.weixin.qq.com/s/MAKK2LqOp251ccuMi3ST7A

export function setATA() {
  // 添加类型声明文件
  const ata = createATA(async (code, path) => {
    // var library = "declare class Test11111111111111111 { descriptionfirst:string; } "
    const res = await fetch("https://esm.sh/v128/@types/react@~18.2/index.d.ts")
    const test = await res.text()

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      test,
      monaco.Uri.file("node_modules/@types/react/package.json").toString(),
    )

    // monaco.languages.typescript.typescriptDefaults.addExtraLib(
    //   code,
    //   monaco.Uri.file(path).toString(),
    // )
    // monaco.languages.typescript.typescriptDefaults.getExtraLibs()
  })

  console.log(monaco.languages.typescript.typescriptDefaults)

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

const test = `

import * as CSS from "https://esm.sh/v128/csstype@3.1.2/index.d.ts";
import * as PropTypes from "https://esm.sh/v128/@types/prop-types@15.7.11/index.d.ts";
import { Interaction as SchedulerInteraction } from "https://esm.sh/v128/@types/scheduler@0.16.8/tracing.d.ts";



declare const UNDEFINED_VOID_ONLY: unique symbol;
// Destructors are only allowed to return void.
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
type VoidOrUndefinedOnly = void | { [UNDEFINED_VOID_ONLY]: never };

// eslint-disable-next-line @definitelytyped/export-just-namespace
// export = React;
// export as namespace React;
`
