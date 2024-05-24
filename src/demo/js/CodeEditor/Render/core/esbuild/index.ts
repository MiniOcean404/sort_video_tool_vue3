import { fileSystemPlugin } from "@/demo/js/CodeEditor/Render/core/esbuild/plugin/file-system"
import { pkgPathPlugin } from "@/demo/js/CodeEditor/Render/core/esbuild/plugin/lib-path"
import esbuild, { type BuildOptions } from "esbuild-wasm"
import esbuildWasm from "esbuild-wasm/esbuild.wasm?url"

await esbuild.initialize({ wasmURL: esbuildWasm, worker: true })

// 参考项目地址：https://github.dev/hellof2e/quark-playground/tree/main/src
export async function esbuildTransfrom(fileTree: Record<string, string>, code2: string) {
  const build = await esbuild.build<BuildOptions>({
    entryPoints: ["mounted.tsx"],
    bundle: true,
    format: "esm",
    // * 新版本的 esbuild-wasm 需要配置 experimentalDecorators 为true，否则装饰器语法不会被降级处理
    tsconfigRaw: `{ "compilerOptions": { "jsx": "react","experimentalDecorators": true } }`,

    treeShaking: true,
    // * 配置转译 JSX 语法的构造函数，配置 jsxFactory, 也可以自定义函数
    // * 可以配置 tsconfig.json 就不用配置 jsxFactory
    // jsxFactory: "React.createElement",
    plugins: [fileSystemPlugin(fileTree), pkgPathPlugin],
    write: false,

    // stdin 选项能被用来打包不存在于文件系统上的模块，也可以用 plugins 来解析
    // stdin: {
    //   contents: "code",
    //   resolveDir: "./src",
    //   sourcefile: "index.tsx",
    //   loader: "tsx",
    // },
  })

  if (build.outputFiles) {
    console.log(build.outputFiles[0].text)

    return build.outputFiles[0].text
  } else {
    console.error(`esbuild 编译失败：${build.outputFiles}`)
  }
}
