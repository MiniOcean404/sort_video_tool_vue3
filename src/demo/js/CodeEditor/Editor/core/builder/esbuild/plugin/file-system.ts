import esbuild from "esbuild-wasm"
import { Path } from "@/demo/js/CodeEditor/Editor/core/file/path.ts"
import { EXT_MAPPING } from "@/demo/js/CodeEditor/Editor/constant/ext.ts"

export function fileSystemPlugin(fileTree: Record<string, string>): esbuild.Plugin {
  const map = new Map(Object.entries(fileTree))

  return {
    name: "file-path-plugin",
    setup(build) {
      const NAMESPACE = "FILE_RESOLVE_SYSTEM"

      // * 先过滤文件后缀
      build.onResolve(
        {
          filter: /.[jt]sx?(?:$|\?)$/,
        },
        (args) => {
          const { path } = args
          console.log("file", path)

          if (args.kind === "entry-point") return { path: "/" + args.path, namespace: NAMESPACE }

          if (args.kind === "import-statement") {
            const dirname = Path.dirname(args.importer)
            const path = Path.join(dirname, args.path)

            return { path, namespace: NAMESPACE }
          }

          throw Error("无法解析")
        },
      )

      // * 将过滤的文件内容转换成 ESM
      build.onLoad(
        {
          filter: /.*/,
          namespace: NAMESPACE,
        },
        (args) => {
          if (!map.has(args.path)) throw Error("无法加载")

          const ext = Path.extname(args.path) as keyof typeof EXT_MAPPING
          let contents = map.get(args.path)!
          let loader = EXT_MAPPING[ext].loader || "default"

          // 如果有需要的话，可以通过判断path中是否包含?inline查询参数
          // 来决定是否需要修改contents字符串的内容（改成向文档插入内联style的脚本）
          // 这里留给读者来实现
          // if (ext === ".css") contents = `export default ${JSON.stringify(contents)};\n`
          // if (ext === ".css")
          return {
            contents,
            loader,
          }
        },
      )
    },
  }
}
