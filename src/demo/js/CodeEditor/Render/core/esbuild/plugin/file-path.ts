import { pkgPathPlugin } from "@/demo/js/CodeEditor/Render/core/esbuild/plugin/lib-path"
import esbuild from "esbuild-wasm"

export function addFilePathPlugin(code: string): esbuild.Plugin {
  const filePathPlugin: esbuild.Plugin = {
    name: "file-path-plugin",
    setup(build) {
      const NAMESPACE = "file-path"

      // * 先过滤文件后缀
      build.onResolve(
        {
          filter: /\.[jt]sx?(?:$|\?)/,
        },
        ({ path }) => {
          console.log("file", path)

          const extReg = /[jt]sx?/gims

          if (extReg.test(path)) {
            // const buildCode = esbuildTransfrom(path,)

            return {
              path,
              namespace: NAMESPACE,
            }
          }
        },
      )

      // * 将过滤的文件内容转换成 ESM
      build.onLoad(
        {
          filter: /.*/,
          namespace: NAMESPACE,
        },
        async ({ path }) => {
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
            plugins: [pkgPathPlugin],
          })

          // * 转换成ESM
          let contents = build.outputFiles && build.outputFiles[0].text
          // 如果有需要的话，可以通过判断path中是否包含?inline查询参数
          // 来决定是否需要修改contents字符串的内容（改成向文档插入内联style的脚本）
          // 这里留给读者来实现
          return {
            contents,
            loader: "tsx",
          }
        },
      )
    },
  }

  return filePathPlugin
}
