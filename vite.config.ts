import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"
import fs from "fs"
import path from "path"

// unplugin-vue-components插 件的作用是自动注册Vue组件。它会根据我们在代码中使用的组件标签自动注册相应的组件。这样，我们就不需要在每个页面或组件中手动注册它们了。
import Components from "unplugin-vue-components/vite"
// unplugin-auto-import 插件的作用是自动导入第三方库或组件。它会根据我们在代码中使用的标识符自动检测并导入相应的库或组件。这样，我们就不需要手动导入它们了。
import AutoImport from "unplugin-auto-import/vite"

import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

import viteCompression from "vite-plugin-compression"
import vueJsx from "@vitejs/plugin-vue-jsx"
import Inspect from "vite-plugin-inspect"

import { GieResolver } from "@giegie/resolver"
// 自定义插件
import { ProxyServer, RmoveConsole, filePathInject } from "@giegie/vite-plugin"

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const isDev = config.mode === "development"
  const _ = config.command

  return {
    base: "./", // 开发或生产环境服务的公共基础路径
    plugins: [
      vue(),
      viteCompression(),
      // 开启 jsx 支持
      vueJsx(),
      // 生成 svg 雪碧图
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[name]",
      }),
      // 各种各样的 Icon 组件集合
      Icons({
        autoInstall: true,
        compiler: "vue3",
        defaultStyle: "font-size: 16px;",
        scale: 1,
        defaultClass: "",
      }),
      Components({
        dts: "src/typings/components.d.ts",
        // 指定自动导入的组件位置，默认是 src/components
        dirs: ["src/components"],
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        resolvers: [
          GieResolver(),
          ElementPlusResolver(), // 自动注册组件
          IconsResolver({
            // 自动导入必须遵循名称格式 {prefix：默认为i}-{collection：图标集合的名称}-{icon：图标名称}
            prefix: "i",
            extension: "vue",
          }),
        ],
      }),
      AutoImport({
        dts: "src/typings/auto-imports.d.ts",
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        // 全局引入插件
        imports: ["vue", "vue-router"],
        resolvers: [
          GieResolver(),
          ElementPlusResolver(), // 自动导入图标组件,只有进入使用界面的时候才会添加到声明文件中
          IconsResolver({
            // 启用 @iconify-json 中的 element-plus 的图标库
            enabledCollections: ["ep"],
            extension: "vue",
          }),
        ],
        exclude: isDev ? [/vision\/vision_wasm_internal\.js/] : null,
        // 自动导入 vue api 后，在 vue 文件使用中，会报一个 eslint 报错问题
        eslintrc: {
          enabled: false, // Default `false`,解决报错要改成 true
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      // 检查Vite插件的中间状态。对于调试和创作插件很有用。
      Inspect(),
      // isDev && RmoveConsole(),
      // isDev && filePathInject(),
      // isDev && ProxyServer(),
    ],
    resolve: {
      //设置别名
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    build: {
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      target: ["es2015", "edge88", "firefox78", "chrome58", "safari14"], // 指定要支持的浏览器原生版本
      emptyOutDir: true, // 构建时清空目录
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: isDev, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
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
      rollupOptions: {
        output: {
          assetFileNames: `assets/[ext]/[name][extname]`,
          chunkFileNames: `js/chunks/[name].[hash].js`,
          entryFileNames: `js/[name].js`,
        },
      },
    },
    server: {
      port: 3000, //启动端口
      hmr: {
        host: "127.0.0.1",
        port: 3000,
      },
      open: false,
      https: {
        key: fs.readFileSync(`${__dirname}/public/pem/mkcert-key.pem`),
        cert: fs.readFileSync(`${__dirname}/public/pem/mkcert.pem`),
      },
      headers: {
        // 如果需要用到ffmpeg合并视频，需要将 COEP 和 COOP 打开，来确保 ShareArrayBuffer 能够正常使用
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
      },
      proxy: {
        "/api": {
          target: loadEnv(config.mode, process.cwd()).VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (pathStr) => pathStr.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      modules: {
        scopeBehaviour: "local",
      },
      preprocessorOptions: {
        // 给含有中文的scss文件添加 @charset:UTF-8;
        charset: false,
        scss: {
          /* .scss全局预定义变量，引入多个文件 以;(分号分割)*/
          additionalData: `@use "@/css/device/device.mixin.scss" as *;`,
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
    // 热更新时，清空控制台
    clearScreen: true,
  }
})
