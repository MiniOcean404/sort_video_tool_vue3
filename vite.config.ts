import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"

// unplugin-vue-components插件的作用是自动注册Vue组件。它会根据我们在代码中使用的组件标签自动注册相应的组件。这样，我们就不需要在每个页面或组件中手动注册它们了。
import Components from "unplugin-vue-components/vite"
// unplugin-auto-import插件的作用是自动导入第三方库或组件。它会根据我们在代码中使用的标识符自动检测并导入相应的库或组件。这样，我们就不需要手动导入它们了。
import AutoImport from "unplugin-auto-import/vite"
import { GieResolver } from "@giegie/resolver"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// 自定义插件
import { ProxyServer } from "@giegie/vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // 开发或生产环境服务的公共基础路径
  plugins: [
    vue(),
    Components({
      resolvers: [GieResolver(), ElementPlusResolver()],
    }),
    AutoImport({
      resolvers: [GieResolver(), ElementPlusResolver()],
    }),
    // ProxyServer(),
  ],
  resolve: {
    //设置别名
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    sourcemap: true, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
    assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
    minify: "terser",
    // 代码压缩配置
    terserOptions: {
      // 生产环境移除 console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3000, //启动端口
    hmr: {
      host: "127.0.0.1",
      port: 3000,
    },
    headers: {
      // 如果需要用到ffmpeg合并视频，需要将 COEP 和 COOP 打开，来确保 ShareArrayBuffer 能够正常使用
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  css: {
    modules: {
      scopeBehaviour: "local",
    },
    preprocessorOptions: {
      scss: {
        /* .scss全局预定义变量，引入多个文件 以;(分号分割)*/
        // additionalData: `@import "./src/assets/css/global.scss";`,
      },
    },
    // 可以查看 CSS 的源码
    devSourcemap: true,
  },
  optimizeDeps: {
    // 是否开启强制依赖预构建。node_modules 中的依赖模块构建过一次就会缓存在 node_modules/.vite/deps 文件夹下，下一次会直接使用缓存的文件。
    // 而有时候我们想要修改依赖模块的代码，做一些测试或者打个补丁，这时候就要用到强制依赖预构建。
    // 除了这个方法，我们还可以通过删除 .vite 文件夹或运行 npx vite --force 来强制进行依赖预构建。
    force: false, // 强制进行依赖预构建
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
})
