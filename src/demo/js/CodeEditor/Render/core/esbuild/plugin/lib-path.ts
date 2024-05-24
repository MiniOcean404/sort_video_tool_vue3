import esbuild from "esbuild-wasm"

export const pkgPathPlugin: esbuild.Plugin = {
  name: "pkg-path-plugin",
  setup(build) {
    build.onResolve(
      {
        // * 通过filter参数可以过滤出符合条件的模块引用
        // * 这里过滤出对裸模块标识符的引用
        filter: /^(?:[^.:])*$/,
      },
      ({ path }) => {
        console.log("lib", path)

        // * 重写引用
        return {
          // * 标记引用模块为外部资源，这样 esbuild 就不会尝试去读取这个模块的内容
          external: true,
          // * 重写引用路径为CDN下载地址，默认使用三方依赖的@latest版本
          // path: `https://esm.sh/${path}`,
        }
      },
    )
  },
}
