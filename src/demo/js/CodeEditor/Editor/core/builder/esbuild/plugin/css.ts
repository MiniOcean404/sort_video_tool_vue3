import esbuild from "esbuild-wasm"
import { Path } from "@/demo/js/CodeEditor/Editor/core/file/path.ts"

export function cssInsetPlugin(fileTree: Record<string, string>) {
  const map = new Map(Object.entries(fileTree))

  const plugin: esbuild.Plugin = {
    name: "insert-css-plugin",
    setup(build) {
      const NAMESPACE = "insert-css"
      build.onResolve({ filter: /\.css(?:$|\?)/ }, (args) => {
        if (args.kind === "import-statement") {
          const dirname = Path.dirname(args.importer)
          const path = Path.join(dirname, args.path)

          return { path, namespace: NAMESPACE }
        }
      })
      // * 转换文件内容
      build.onLoad(
        {
          filter: /.*/,
          namespace: NAMESPACE,
        },
        (args) => {
          let code = map.get(args.path)!
          let contents = `export default ${JSON.stringify(code)};\n`

          // 如果有需要的话，可以通过判断path中是否包含?inline查询参数
          // 来决定是否需要修改contents字符串的内容（改成向文档插入内联style的脚本）
          // 这里留给读者来实现
          return {
            contents,
            loader: "js",
          }
        },
      )
    },
  }

  return plugin
}
