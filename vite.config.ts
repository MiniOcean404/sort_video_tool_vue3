import { defineConfig, loadEnv, normalizePath, searchForWorkspaceRoot } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"
import fs from "fs"
import path from "path"

import vueJsx from "@vitejs/plugin-vue-jsx"

// unplugin-vue-components插 件的作用是自动注册Vue组件。它会根据我们在代码中使用的组件标签自动注册相应的组件。这样，我们就不需要在每个页面或组件中手动注册它们了。
import Components from "unplugin-vue-components/vite"
// unplugin-auto-import 插件的作用是自动导入第三方库或组件。它会根据我们在代码中使用的标识符自动检测并导入相应的库或组件。这样，我们就不需要手动导入它们了。
import AutoImport from "unplugin-auto-import/vite"

import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { viteCommonjs } from "@originjs/vite-plugin-commonjs"
import envInject from "vite-plugin-env-compatible"
import copy from "rollup-plugin-copy"

import viteCompression from "vite-plugin-compression"
import viteImagemin from "vite-plugin-imagemin"
import { Plugin as importToCDN } from "vite-plugin-cdn-import"
import Inspect from "vite-plugin-inspect"
import ViteRestart from "vite-plugin-restart"
import { CodeInspectorPlugin } from "code-inspector-plugin"

import { visualizer } from "rollup-plugin-visualizer"

import { GieResolver } from "@giegie/resolver"
// 自定义插件
import { ProxyServer, RmoveConsole, filePathInject } from "@giegie/vite-plugin"

// 用 normalizePath 解决 window 下的路径问题
// const variablePath = normalizePath(path.resolve("./src/css/device/device.mixin.scss"))

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const isDev = config.mode === "development"
  const isProd = config.mode === "production"

  const isServe = config.command === "serve"
  const isBuild = config.command === "build"

  const env = loadEnv(config.mode, process.cwd())

  return {
    base: "./", // 开发或生产环境服务的公共基础路径
    publicDir: fileURLToPath(new URL("./public", import.meta.url)),
    cacheDir: "node_modules/.vite", // 存储缓存文件的目录
    logLevel: "info", // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
    clearScreen: true, // 热更新时，清空控制台
    envDir: "./",
    envPrefix: ["VITE_"], // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
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
        exclude: isServe ? [/vision\/vision_wasm_internal\.js/] : null,
        // 自动导入 vue api 后，在 vue 文件使用中，会报一个 eslint 报错问题
        eslintrc: {
          enabled: false, // Default `false`,解决报错要改成 true
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      // 在 esm 中支持 commonjs
      viteCommonjs(),
      // vite将 env 暴露给import.meta.env.PREFIX_XXX，但不会像 vue-cli 或 create-react-app 那样加载到 process.env
      envInject({}),
      CodeInspectorPlugin({ bundler: "vite" }),
      // 修改文件自动重启服务
      ViteRestart({
        restart: [".env.*", "vite.config.[jt]s"],
      }),
      importToCDN({
        // 需要 CDN 加速的模块
        modules: [
          {
            name: "lodash",
            var: "_",
            path: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js`,
          },
        ],
      }),
      // copy({ targets: [{ src: "./node_modules/pdfjs-dist/cmaps/", dest: "./public/" }] }),
      viteCompression({
        disable: isServe,
        algorithm: "gzip",
        threshold: 10240, // 如果体积大于阈值，则进行压缩，单位为b
        verbose: true, // 是否在控制台中输出压缩结果
        ext: ".gz", // 生成的压缩包的后缀
        deleteOriginFile: true, // 源文件压缩后是否删除
        filter: (file) => false, // 指定不压缩的资源
      }),
      viteImagemin({
        gifsicle: {
          // gif图片压缩
          optimizationLevel: 3, // 选择1到3之间的优化级别
          interlaced: false, // 隔行扫描gif进行渐进式渲染
          // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
        },
        optipng: {
          // png
          optimizationLevel: 7, // 选择0到7之间的优化级别
        },
        mozjpeg: {
          // jpeg
          quality: 65, // 压缩质量，范围从0(最差)到100(最佳)。
        },
        pngquant: {
          // png
          quality: [0.65, 0.8], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
          speed: 4, // 压缩速度，1(强力)到11(最快)
        },
        // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
        webp: {
          quality: 75,
        },
        svgo: {
          // svg压缩
          plugins: [
            {
              name: "removeViewBox",
            },
            {
              name: "removeEmptyAttrs",
              active: false,
            },
          ],
        },
      }),

      // 构建产物分析
      isProd &&
        env.VITE_APP_ANALY &&
        visualizer({
          gzipSize: true,
          brotliSize: true,
          emitFile: false,
          filename: "stats.html", // 分析图生成的文件名
          open: true, // 打包完成后自动打开浏览器，显示产物体积报告
        }),

      // 检查Vite插件的中间状态。对于调试和创作插件很有用。
      Inspect(),
      isServe && RmoveConsole(),
      isServe && filePathInject(),
      isServe && ProxyServer(),
    ],
    resolve: {
      // !未知
      // dedupe: [], // 未知 强制 Vite 始终将列出的依赖项解析为同一副本
      // conditions: [], // 未知 解决程序包中 情景导出 时的其他允许条件
      // mainFields: [], // 未知 解析包入口点尝试的字段列表
      //设置别名
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },

    server: {
      open: false,
      host: "127.0.0.1", // 指定服务器应该监听哪个 IP 地址
      strictPort: false, // 若端口已被占用则会直接退出
      port: 3000, //启动端口
      cors: true, // 配置 CORS 跨域
      middlewareMode: false, // 以中间件模式创建 Vite 服务器
      hmr: {
        host: "127.0.0.1",
        port: 3000,
      },
      https: {
        key: fs.readFileSync(`${__dirname}/config/https/pem/mkcert-key.pem`),
        cert: fs.readFileSync(`${__dirname}/config/https/pem/mkcert.pem`),
      },
      headers: {
        // 如果需要用到ffmpeg合并视频，需要将 COEP 和 COOP 打开，来确保 ShareArrayBuffer 能够正常使用
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
      },
      proxy: {
        "/api": {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (pathStr) => pathStr.replace(/^\/api/, ""),
        },
      },
      // fs: {
      //   strict: true, // 限制为工作区 root 路径以外的文件的访问
      //   allow: [], // 限制哪些文件可以通过 /@fs/ 路径提供服务
      //   deny: [".env", ".env.*", "*.{pem,crt}"], // 用于限制 Vite 开发服务器提供敏感文件的黑名单
      // },
      origin: "http://127.0.0.1:8080", // 用于定义开发调试阶段生成资源的 origin
    },
    // minify 指定为 esbuild 时可用
    esbuild: {
      // 最常见的用例是自定义 JSX
      jsxFactory: "h",
      jsxFragment: "Fragment",
      // 生产环境时移除console
      drop: ["console", "debugger"],
    },
    build: {
      target: ["es2015", "edge88", "firefox78", "chrome58", "safari14"], // 指定要支持的浏览器原生版本
      // cssTarget: "", // 允许用户为 CSS 的压缩设置一个不同的浏览器 target 与 build.target 一致
      outDir: "dist",
      assetsDir: "assets",
      cssCodeSplit: true, // 启用 CSS 代码拆分
      emptyOutDir: true, // 构建时清空目录
      chunkSizeWarningLimit: 500,
      assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
      modulePreload: { polyfill: true }, // 是否自动注入 module preload 的 polyfill
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      sourcemap: isServe, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
      manifest: false, // 当设置为 true，构建后将会生成 manifest.json 文件

      // ssrManifest: false, // 构建不生成 SSR 的 manifest 文件
      // ssr: undefined, // 生成面向 SSR 的构建
      // write: true, // 启用将构建后的文件写入磁盘
      // brotliSize: true, // 启用 brotli 压缩大小报告
      // watch: null, // 设置为 {} 则会启用 rollup 的监听器

      // 可配置 terser 或 esbuild
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
          // 在不配置 manualchunks 的情况下，rollup会将每个模块文件打包成一个单独的 js 文件，不会对 chunk 进行合并，
          // 这会导致 chunk 数量太多，有些文件只有 几 kb（触发同域名网络请求最大数量限制）
          manualChunks: (id: string) => {
            if (id.includes("/node_modules/lodash-es/")) return "lodash"
            if (id.includes("/node_modules/ua-parser-js/")) return "ua-parser-js"
            if (id.includes("/node_modules/jszip/")) return "jszip"
            if (id.includes("/node_modules/element-plus/")) return "element-plus"
            if (id.includes("/node_modules/")) return "vendor"
          },
          // rollup 在3.3之后的版本提供了一个实验性质的配置项 output.experimentalMinChunkSize，来合并小 chunk
          // 如果 chunk 小于这个值则会尝试跟其他 chunk 合并，它只对纯函数有作用，如果是 console.log 就会失效
          experimentalMinChunkSize: 5 * 1024, // 单位b
        },
        // Rollup 还提供了 treeshake.manualPureFunctions 参数来让开发者指定哪些函数是纯函数，所以可以这样配置
        // 在开发 JS 模块的时候要尽量避免模块副作用
        treeshake: {
          preset: "recommended",
          manualPureFunctions: ["console.log"],
        },
      },
    },
    optimizeDeps: {
      // !未知
      entries: ["/index.html"],
      // 是否开启强制依赖预构建。node_modules 中的依赖模块构建过一次就会缓存在 node_modules/.vite/deps 文件夹下，下一次会直接使用缓存的文件。
      // 而有时候我们想要修改依赖模块的代码，做一些测试或者打个补丁，这时候就要用到强制依赖预构建。
      // 除了这个方法，我们还可以通过删除 .vite 文件夹或运行 npx vite --force 来强制进行依赖预构建。
      force: false, // 强制进行依赖预构建
      exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util", "@jsquash/avif", "@jsquash/jpeg", "@jsquash/jxl", "@jsquash/png", "@jsquash/webp"],
    },
    assetsInclude: ["**/*.gltf"], // 指定额外的 picomatch 模式 作为静态资源处理
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
    json: {
      namedExports: true, // 是否支持从 .json 文件中进行按名导入
      stringify: false, //  开启此项，导入的 JSON 会被转换为 export default JSON.parse("...") 会禁用按名导入
    },
    preview: {
      port: 5000, // 指定开发服务器端口
      strictPort: false, // 若端口已被占用则会直接退出
      https: {}, // 启用 TLS + HTTP/2
      open: true, // 启动时自动在浏览器中打开应用程序
      proxy: {
        // 配置自定义代理规则
        "/api": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      cors: true, // 配置 CORS
    },
    // ssr: {
    //   external: [], // 列出的是要为 SSR 强制外部化的依赖,
    //   noExternal: "", // 列出的是防止被 SSR 外部化依赖项
    //   target: "node", // SSR 服务器的构建目标
    // },
  }
})
