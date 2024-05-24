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
          // const url = URL.createObjectURL(
          //   new Blob([contents || ""], { type: "application/javascript" }),
          // )

          return {
            contents: code,
            loader: "tsx",
          }
        },
      )
    },
  }

  return filePathPlugin
}
