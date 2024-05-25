import type { Plugin } from "vite"
import * as glob from "glob"
import fs from "fs"
import vm from "vm"
import url from "url"
import { getAssetsPath } from "@/utils/file"

const context = {
  // 代码运行上下文
  url,
  handler: () => console.warn("servers 模块导入异常"),
}
vm.createContext(context)
const mock = getAssetsPath("")

export function ProxyServer(): Plugin {
  return {
    name: "vite:proxy-server",
    // 在解析 Vite 配置后调用。
    configResolved(config) {},
    // 是用于配置开发服务器的钩子
    configureServer(server) {
      // 添加响应头 COOP、COEP 支持wasm数据隔离
      server.middlewares.use((_, res, next) => {
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
        next()
      })

      // 将 mock 下文件注册到接口
      const files = glob.sync("mock/**/*.js", { cwd: mock, absolute: true })

      files.map((filePath: string) => {
        let urlPath = (filePath.match(/(?<=mock).*(?=\.js)/) || [])[0]

        urlPath = urlPath?.replace(/[\\/]+/g, "/")

        // 把全局变量 context 挂载到 vm 上下文中的文件里
        vm.runInContext(fs.readFileSync(filePath, "utf-8"), context)

        console.log("****注册接口: " + urlPath, "****")
        server.middlewares.use(urlPath || "", context.handler)
      })
    },
  }
}
