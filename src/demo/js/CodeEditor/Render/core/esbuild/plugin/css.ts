// import esbuild from "esbuild-wasm"

// export const insertCssPlugin: esbuild.Plugin = {
//   name: "insert-css-plugin",
//   setup(build) {
//     const NAMESPACE = "custom-css"

//     // * 过滤出所有.css后缀文件并归类至命名空间custom-css
//     build.onResolve({ filter: /\.css(?:$|\?)/ }, (args) => {
//       return {
//         path: args.path,
//         namespace: NAMESPACE,
//       }
//     })
//     // * 转换文件内容
//     build.onLoad(
//       {
//         filter: /.*/,
//         namespace: NAMESPACE,
//       },
//       ({ path }) => {
//         // * 读取文件内容
//         const code = read(cleanPath(path))
//         // * 转换成ESM
//         let contents = `export default ${JSON.stringify(code)};\n`
//         return {
//           contents,
//           loader: "js",
//         }
//       },
//     )
//   },
// }
