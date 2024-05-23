import * as monaco from "monaco-editor"
import type { editor } from "monaco-editor"

export function setTypescriptMode(
  editorIns: editor.IStandaloneCodeEditor,
  code: string,
  filename: string = "idnex.tsx",
) {
  const compilerOptions = monaco.languages.typescript.javascriptDefaults.getCompilerOptions()

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })

  monaco.languages.typescript.typescriptDefaults.setWorkerOptions({
    customWorkerPath: ".",
  })

  // 设置 tsconfig.json, 支持 react
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...compilerOptions,
    // 这里设置 jsx 为 preserve，也就是输入 <div> 输出 <div>，保留原样
    // 如果设置为 react 会输出 React.createElement("div")。
    jsx: monaco.languages.typescript.JsxEmit.Preserve,
    jsxFactory: "React.createElement",
    jsxFragmentFactory: "React.Fragment",

    // 再就是 esModuleInterop，这个也是 ts 常用配置。
    // 默认 fs 要这么引入，因为它是 commonjs 的包，没有 default 属性：
    // import * as fs from 'fs';
    // 设置 esModuleInterop 会在编译的时候自动加上 default 属性。就可以这样引入了：
    // import fs from 'fs';
    esModuleInterop: true,
    target: monaco.languages.typescript.ScriptTarget.ESNext, // 指定 esm 版本
    module: monaco.languages.typescript.ModuleKind.ESNext, // 指定模块系统
    resolveJsonModule: true,
    useDefineForClassFields: true,
    allowNonTsExtensions: true,
    allowSyntheticDefaultImports: true,
    baseUrl: ".",
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    noEmit: true, // 不生成输出文件
    skipLibCheck: true,
  })

  const model = monaco.editor.createModel(code, "typescript", monaco.Uri.parse(filename))
  editorIns.setModel(model)
}
