import { addFilePathPlugin } from "@/demo/js/CodeEditor/Render/core/esbuild/plugin/file-path"
import { pkgPathPlugin } from "@/demo/js/CodeEditor/Render/core/esbuild/plugin/lib-path"
import esbuild from "esbuild-wasm"
import esbuildWasm from "esbuild-wasm/esbuild.wasm?url"

// 参考项目地址：https://github.dev/hellof2e/quark-playground/tree/main/src
export async function esbuildTransfrom(code: string, code2: string) {
  await esbuild.initialize({ wasmURL: esbuildWasm, worker: true })

  const build = await esbuild.build({
    bundle: true,
    format: "esm",
    // * 新版本的 esbuild-wasm 需要配置 experimentalDecorators 为true，否则装饰器语法不会被降级处理
    tsconfigRaw: `{ "compilerOptions": { "jsx": "react","experimentalDecorators": true } }`,
    // stdin 选项能被用来打包不存在于文件系统上的模块
    stdin: {
      contents: code,
      loader: "tsx",
    },
    // * 配置转译 JSX 语法的构造函数，配置 jsxFactory, 也可以自定义函数
    // * 可以配置 tsconfig.json 就不用配置 jsxFactory
    // jsxFactory: "React.createElement",
    plugins: [pkgPathPlugin, addFilePathPlugin(code2)],
  })

  if (build.outputFiles) {
    return build.outputFiles[0].text
  } else {
    console.error(`esbuild 编译失败：${build.outputFiles}`)
  }
}
