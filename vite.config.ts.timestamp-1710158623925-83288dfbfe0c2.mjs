// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/vite@5.0.10_@types+node@20.10.5_sass@1.69.5_terser@5.26.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/@vitejs+plugin-vue@4.5.2_vite@5.0.10_vue@3.3.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
import fs from "fs";
import path from "path";
import vueJsx from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.10_vue@3.3.13/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Components from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.3.13/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/unplugin-auto-import@0.17.2_@vueuse+core@10.7.0/node_modules/unplugin-auto-import/dist/vite.js";
import Icons from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/unplugin-icons@0.18.1/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/unplugin-icons@0.18.1/node_modules/unplugin-icons/dist/resolver.js";
import { createSvgIconsPlugin } from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.0.10/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { ElementPlusResolver } from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.3.13/node_modules/unplugin-vue-components/dist/resolvers.js";
import { viteCommonjs } from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/@originjs+vite-plugin-commonjs@1.0.3/node_modules/@originjs/vite-plugin-commonjs/lib/index.js";
import envInject from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/vite-plugin-env-compatible@2.0.1/node_modules/vite-plugin-env-compatible/dist/index.mjs";
import viteCompression from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.0.10/node_modules/vite-plugin-compression/dist/index.mjs";
import viteImagemin from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/vite-plugin-imagemin@0.6.1_vite@5.0.10/node_modules/vite-plugin-imagemin/dist/index.mjs";
import { Plugin as importToCDN } from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/vite-plugin-cdn-import@0.3.5/node_modules/vite-plugin-cdn-import/dist/index.js";
import Inspect from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/vite-plugin-inspect@0.8.1_vite@5.0.10/node_modules/vite-plugin-inspect/dist/index.mjs";
import ViteRestart from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/vite-plugin-restart@0.4.0_vite@5.0.10/node_modules/vite-plugin-restart/dist/index.js";
import { visualizer } from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { GieResolver } from "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/packages/resolver/index.js";
var __vite_injected_original_dirname = "D:\\soft-dev\\code\\script\\tool_and_demo_vite_vue3";
var __vite_injected_original_import_meta_url = "file:///D:/soft-dev/code/script/tool_and_demo_vite_vue3/vite.config.ts";
var vite_config_default = defineConfig((config) => {
  const isDev = config.mode === "development";
  const isProd = config.mode === "production";
  const isServe = config.command === "serve";
  const isBuild = config.command === "build";
  const env = loadEnv(config.mode, process.cwd());
  return {
    base: "./",
    // 开发或生产环境服务的公共基础路径
    publicDir: fileURLToPath(new URL("./public", __vite_injected_original_import_meta_url)),
    cacheDir: "node_modules/.vite",
    // 存储缓存文件的目录
    logLevel: "info",
    // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
    clearScreen: true,
    // 热更新时，清空控制台
    envDir: "./",
    envPrefix: ["VITE_"],
    // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      }),
      // 开启 jsx 支持
      vueJsx(),
      // 生成 svg 雪碧图
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[name]"
      }),
      // 各种各样的 Icon 组件集合
      Icons({
        autoInstall: true,
        compiler: "vue3",
        defaultStyle: "font-size: 16px;",
        scale: 1,
        defaultClass: ""
      }),
      Components({
        dts: "src/typings/components.d.ts",
        // 指定自动导入的组件位置，默认是 src/components
        dirs: ["src/components"],
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        resolvers: [
          GieResolver(),
          ElementPlusResolver(),
          // 自动注册组件
          IconsResolver({
            // 自动导入必须遵循名称格式 {prefix：默认为i}-{collection：图标集合的名称}-{icon：图标名称}
            prefix: "i",
            extension: "vue"
          })
        ]
      }),
      AutoImport({
        dts: "src/typings/auto-imports.d.ts",
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        // 全局引入插件
        imports: ["vue", "vue-router"],
        resolvers: [
          GieResolver(),
          ElementPlusResolver(),
          // 自动导入图标组件,只有进入使用界面的时候才会添加到声明文件中
          IconsResolver({
            // 启用 @iconify-json 中的 element-plus 的图标库
            enabledCollections: ["ep"],
            extension: "vue"
          })
        ],
        exclude: isServe ? [/vision\/vision_wasm_internal\.js/] : null,
        // 自动导入 vue api 后，在 vue 文件使用中，会报一个 eslint 报错问题
        eslintrc: {
          enabled: false,
          // Default `false`,解决报错要改成 true
          filepath: "./.eslintrc-auto-import.json",
          // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true
          // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      // 在 esm 中支持 commonjs
      viteCommonjs(),
      // vite将 env 暴露给import.meta.env.PREFIX_XXX，但不会像 vue-cli 或 create-react-app 那样加载到 process.env
      envInject({}),
      // CodeInspectorPlugin({ bundler: "vite" }),
      // 修改文件自动重启服务
      ViteRestart({
        restart: [".env.*", "vite.config.[jt]s"]
      }),
      importToCDN({
        // 需要 CDN 加速的模块
        modules: [
          {
            name: "lodash",
            var: "_",
            path: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js`
          }
        ]
      }),
      // copy({ targets: [{ src: "./node_modules/pdfjs-dist/cmaps/", dest: "./public/" }] }),
      viteCompression({
        disable: isServe,
        algorithm: "gzip",
        threshold: 10240,
        // 如果体积大于阈值，则进行压缩，单位为b
        verbose: true,
        // 是否在控制台中输出压缩结果
        ext: ".gz",
        // 生成的压缩包的后缀
        deleteOriginFile: true,
        // 源文件压缩后是否删除
        filter: (file) => false
        // 指定不压缩的资源
      }),
      viteImagemin({
        gifsicle: {
          // gif图片压缩
          optimizationLevel: 3,
          // 选择1到3之间的优化级别
          interlaced: false
          // 隔行扫描gif进行渐进式渲染
          // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
        },
        optipng: {
          // png
          optimizationLevel: 7
          // 选择0到7之间的优化级别
        },
        mozjpeg: {
          // jpeg
          quality: 65
          // 压缩质量，范围从0(最差)到100(最佳)。
        },
        pngquant: {
          // png
          quality: [0.65, 0.8],
          // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
          speed: 4
          // 压缩速度，1(强力)到11(最快)
        },
        // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
        webp: {
          quality: 75
        },
        svgo: {
          // svg压缩
          plugins: [
            {
              name: "removeViewBox"
            },
            {
              name: "removeEmptyAttrs",
              active: false
            }
          ]
        }
      }),
      // 构建产物分析
      isProd && env.VITE_APP_ANALY && visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: "stats.html",
        // 分析图生成的文件名
        open: true
        // 打包完成后自动打开浏览器，显示产物体积报告
      }),
      // 检查Vite插件的中间状态。对于调试和创作插件很有用。
      Inspect()
      // isServe && RmoveConsole(),
      // isServe && filePathInject(),
      // isServe && ProxyServer(),
    ],
    resolve: {
      // !未知
      // dedupe: [], // 未知 强制 Vite 始终将列出的依赖项解析为同一副本
      // conditions: [], // 未知 解决程序包中 情景导出 时的其他允许条件
      // mainFields: [], // 未知 解析包入口点尝试的字段列表
      //设置别名
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    server: {
      open: false,
      host: "127.0.0.1",
      // 指定服务器应该监听哪个 IP 地址
      strictPort: false,
      // 若端口已被占用则会直接退出
      port: 3e3,
      //启动端口
      cors: true,
      // 配置 CORS 跨域
      middlewareMode: false,
      // 以中间件模式创建 Vite 服务器
      hmr: {
        host: "127.0.0.1",
        port: 3e3
      },
      https: {
        key: fs.readFileSync(`${__vite_injected_original_dirname}/config/https/pem/mkcert-key.pem`),
        cert: fs.readFileSync(`${__vite_injected_original_dirname}/config/https/pem/mkcert.pem`)
      },
      headers: {
        // 如果需要用到 ffmpeg 合并视频，需要将 COEP 和 COOP 打开，来确保 ShareArrayBuffer 能够正常使用
        // 但是这会影响跨域资源视频、图片的使用
        // "Cross-Origin-Embedder-Policy": "require-corp",
        // "Cross-Origin-Opener-Policy": "same-origin",
      },
      proxy: {
        "/api": {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (pathStr) => pathStr.replace(/^\/api/, "")
        }
      }
      // fs: {
      //   strict: true, // 限制为工作区 root 路径以外的文件的访问
      //   allow: [], // 限制哪些文件可以通过 /@fs/ 路径提供服务
      //   deny: [".env", ".env.*", "*.{pem,crt}"], // 用于限制 Vite 开发服务器提供敏感文件的黑名单
      // },
      // origin: "http://127.0.0.1:8080", // 用于定义开发调试阶段 导入资源的文件地址 包括 @ 导入的 origin
    },
    // minify 指定为 esbuild 时可用
    esbuild: {
      // 最常见的用例是自定义 JSX
      jsxFactory: "h",
      jsxFragment: "Fragment",
      // 生产环境时移除console
      drop: ["console", "debugger"]
    },
    build: {
      target: ["es2015", "edge88", "firefox78", "chrome58", "safari14"],
      // 指定要支持的浏览器原生版本
      // cssTarget: "", // 允许用户为 CSS 的压缩设置一个不同的浏览器 target 与 build.target 一致
      outDir: "dist",
      assetsDir: "assets",
      cssCodeSplit: true,
      // 启用 CSS 代码拆分
      emptyOutDir: true,
      // 构建时清空目录
      chunkSizeWarningLimit: 500,
      assetsInlineLimit: 4096,
      // 图片转 base64 编码的阈值
      modulePreload: { polyfill: true },
      // 是否自动注入 module preload 的 polyfill
      reportCompressedSize: false,
      // 启用/禁用 gzip 压缩大小报告
      sourcemap: isServe,
      // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
      manifest: false,
      // 当设置为 true，构建后将会生成 manifest.json 文件
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
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          assetFileNames: `assets/[ext]/[name][extname]`,
          chunkFileNames: `js/chunks/[name].[hash].js`,
          entryFileNames: `js/[name].js`,
          // 在不配置 manualchunks 的情况下，rollup会将每个模块文件打包成一个单独的 js 文件，不会对 chunk 进行合并，
          // 这会导致 chunk 数量太多，有些文件只有 几 kb（触发同域名网络请求最大数量限制）
          manualChunks: (id) => {
            if (id.includes("/node_modules/lodash-es/"))
              return "lodash";
            if (id.includes("/node_modules/ua-parser-js/"))
              return "ua-parser-js";
            if (id.includes("/node_modules/jszip/"))
              return "jszip";
            if (id.includes("/node_modules/element-plus/"))
              return "element-plus";
            if (id.includes("/node_modules/"))
              return "vendor";
          },
          // rollup 在3.3之后的版本提供了一个实验性质的配置项 output.experimentalMinChunkSize，来合并小 chunk
          // 如果 chunk 小于这个值则会尝试跟其他 chunk 合并，它只对纯函数有作用，如果是 console.log 就会失效
          experimentalMinChunkSize: 5 * 1024
          // 单位b
        },
        // Rollup 还提供了 treeshake.manualPureFunctions 参数来让开发者指定哪些函数是纯函数，所以可以这样配置
        // 在开发 JS 模块的时候要尽量避免模块副作用
        treeshake: {
          preset: "recommended",
          manualPureFunctions: ["console.log"]
        }
      }
    },
    optimizeDeps: {
      // !未知
      entries: ["/index.html"],
      // 是否开启强制依赖预构建。node_modules 中的依赖模块构建过一次就会缓存在 node_modules/.vite/deps 文件夹下，下一次会直接使用缓存的文件。
      // 而有时候我们想要修改依赖模块的代码，做一些测试或者打个补丁，这时候就要用到强制依赖预构建。
      // 除了这个方法，我们还可以通过删除 .vite 文件夹或运行 npx vite --force 来强制进行依赖预构建。
      force: false,
      // 强制进行依赖预构建
      exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util", "@jsquash/avif", "@jsquash/jpeg", "@jsquash/jxl", "@jsquash/png", "@jsquash/webp"]
    },
    assetsInclude: ["**/*.gltf"],
    // 指定额外的 picomatch 模式 作为静态资源处理
    css: {
      modules: {
        scopeBehaviour: "local"
      },
      preprocessorOptions: {
        // 给含有中文的scss文件添加 @charset:UTF-8;
        charset: false,
        scss: {
          /* .scss全局预定义变量，引入多个文件 以;(分号分割)*/
          additionalData: `@use "@/css/device/device.mixin.scss" as *;`
        }
      },
      // 可以查看 CSS 的源码
      devSourcemap: true
    },
    json: {
      namedExports: true,
      // 是否支持从 .json 文件中进行按名导入
      stringify: false
      //  开启此项，导入的 JSON 会被转换为 export default JSON.parse("...") 会禁用按名导入
    },
    preview: {
      port: 5e3,
      // 指定开发服务器端口
      strictPort: false,
      // 若端口已被占用则会直接退出
      https: {},
      // 启用 TLS + HTTP/2
      open: true,
      // 启动时自动在浏览器中打开应用程序
      proxy: {
        // 配置自定义代理规则
        "/api": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      },
      cors: true
      // 配置 CORS
    }
    // ssr: {
    //   external: [], // 列出的是要为 SSR 强制外部化的依赖,
    //   noExternal: "", // 列出的是防止被 SSR 外部化依赖项
    //   target: "node", // SSR 服务器的构建目标
    // },
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxzb2Z0LWRldlxcXFxjb2RlXFxcXHNjcmlwdFxcXFx0b29sX2FuZF9kZW1vX3ZpdGVfdnVlM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcc29mdC1kZXZcXFxcY29kZVxcXFxzY3JpcHRcXFxcdG9vbF9hbmRfZGVtb192aXRlX3Z1ZTNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3NvZnQtZGV2L2NvZGUvc2NyaXB0L3Rvb2xfYW5kX2RlbW9fdml0ZV92dWUzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBub3JtYWxpemVQYXRoLCBzZWFyY2hGb3JXb3Jrc3BhY2VSb290IH0gZnJvbSBcInZpdGVcIlxyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIlxyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tIFwibm9kZTp1cmxcIlxyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxyXG5cclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiXHJcblxyXG4vLyB1bnBsdWdpbi12dWUtY29tcG9uZW50c1x1NjNEMiBcdTRFRjZcdTc2ODRcdTRGNUNcdTc1MjhcdTY2MkZcdTgxRUFcdTUyQThcdTZDRThcdTUxOENWdWVcdTdFQzRcdTRFRjZcdTMwMDJcdTVCODNcdTRGMUFcdTY4MzlcdTYzNkVcdTYyMTFcdTRFRUNcdTU3MjhcdTRFRTNcdTc4MDFcdTRFMkRcdTRGN0ZcdTc1MjhcdTc2ODRcdTdFQzRcdTRFRjZcdTY4MDdcdTdCN0VcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTc2RjhcdTVFOTRcdTc2ODRcdTdFQzRcdTRFRjZcdTMwMDJcdThGRDlcdTY4MzdcdUZGMENcdTYyMTFcdTRFRUNcdTVDMzFcdTRFMERcdTk3MDBcdTg5ODFcdTU3MjhcdTZCQ0ZcdTRFMkFcdTk4NzVcdTk3NjJcdTYyMTZcdTdFQzRcdTRFRjZcdTRFMkRcdTYyNEJcdTUyQThcdTZDRThcdTUxOENcdTVCODNcdTRFRUNcdTRFODZcdTMwMDJcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIlxyXG4vLyB1bnBsdWdpbi1hdXRvLWltcG9ydCBcdTYzRDJcdTRFRjZcdTc2ODRcdTRGNUNcdTc1MjhcdTY2MkZcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTdCMkNcdTRFMDlcdTY1QjlcdTVFOTNcdTYyMTZcdTdFQzRcdTRFRjZcdTMwMDJcdTVCODNcdTRGMUFcdTY4MzlcdTYzNkVcdTYyMTFcdTRFRUNcdTU3MjhcdTRFRTNcdTc4MDFcdTRFMkRcdTRGN0ZcdTc1MjhcdTc2ODRcdTY4MDdcdThCQzZcdTdCMjZcdTgxRUFcdTUyQThcdTY4QzBcdTZENEJcdTVFNzZcdTVCRkNcdTUxNjVcdTc2RjhcdTVFOTRcdTc2ODRcdTVFOTNcdTYyMTZcdTdFQzRcdTRFRjZcdTMwMDJcdThGRDlcdTY4MzdcdUZGMENcdTYyMTFcdTRFRUNcdTVDMzFcdTRFMERcdTk3MDBcdTg5ODFcdTYyNEJcdTUyQThcdTVCRkNcdTUxNjVcdTVCODNcdTRFRUNcdTRFODZcdTMwMDJcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIlxyXG5cclxuaW1wb3J0IEljb25zIGZyb20gXCJ1bnBsdWdpbi1pY29ucy92aXRlXCJcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSBcInVucGx1Z2luLWljb25zL3Jlc29sdmVyXCJcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCJcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIlxyXG5pbXBvcnQgeyB2aXRlQ29tbW9uanMgfSBmcm9tIFwiQG9yaWdpbmpzL3ZpdGUtcGx1Z2luLWNvbW1vbmpzXCJcclxuaW1wb3J0IGVudkluamVjdCBmcm9tIFwidml0ZS1wbHVnaW4tZW52LWNvbXBhdGlibGVcIlxyXG5pbXBvcnQgY29weSBmcm9tIFwicm9sbHVwLXBsdWdpbi1jb3B5XCJcclxuXHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCJcclxuaW1wb3J0IHZpdGVJbWFnZW1pbiBmcm9tIFwidml0ZS1wbHVnaW4taW1hZ2VtaW5cIlxyXG5pbXBvcnQgeyBQbHVnaW4gYXMgaW1wb3J0VG9DRE4gfSBmcm9tIFwidml0ZS1wbHVnaW4tY2RuLWltcG9ydFwiXHJcbmltcG9ydCBJbnNwZWN0IGZyb20gXCJ2aXRlLXBsdWdpbi1pbnNwZWN0XCJcclxuaW1wb3J0IFZpdGVSZXN0YXJ0IGZyb20gXCJ2aXRlLXBsdWdpbi1yZXN0YXJ0XCJcclxuaW1wb3J0IHsgQ29kZUluc3BlY3RvclBsdWdpbiB9IGZyb20gXCJjb2RlLWluc3BlY3Rvci1wbHVnaW5cIlxyXG5cclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIlxyXG5cclxuaW1wb3J0IHsgR2llUmVzb2x2ZXIgfSBmcm9tIFwiQGdpZWdpZS9yZXNvbHZlclwiXHJcbi8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NjNEMlx1NEVGNlxyXG5pbXBvcnQgeyBQcm94eVNlcnZlciwgUm1vdmVDb25zb2xlLCBmaWxlUGF0aEluamVjdCB9IGZyb20gXCJAZ2llZ2llL3ZpdGUtcGx1Z2luXCJcclxuXHJcbi8vIFx1NzUyOCBub3JtYWxpemVQYXRoIFx1ODlFM1x1NTFCMyB3aW5kb3cgXHU0RTBCXHU3Njg0XHU4REVGXHU1Rjg0XHU5NUVFXHU5ODk4XHJcbi8vIGNvbnN0IHZhcmlhYmxlUGF0aCA9IG5vcm1hbGl6ZVBhdGgocGF0aC5yZXNvbHZlKFwiLi9zcmMvY3NzL2RldmljZS9kZXZpY2UubWl4aW4uc2Nzc1wiKSlcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoY29uZmlnKSA9PiB7XHJcbiAgY29uc3QgaXNEZXYgPSBjb25maWcubW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiXHJcbiAgY29uc3QgaXNQcm9kID0gY29uZmlnLm1vZGUgPT09IFwicHJvZHVjdGlvblwiXHJcblxyXG4gIGNvbnN0IGlzU2VydmUgPSBjb25maWcuY29tbWFuZCA9PT0gXCJzZXJ2ZVwiXHJcbiAgY29uc3QgaXNCdWlsZCA9IGNvbmZpZy5jb21tYW5kID09PSBcImJ1aWxkXCJcclxuXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihjb25maWcubW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJhc2U6IFwiLi9cIiwgLy8gXHU1RjAwXHU1M0QxXHU2MjE2XHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU2NzBEXHU1MkExXHU3Njg0XHU1MTZDXHU1MTcxXHU1N0ZBXHU3ODQwXHU4REVGXHU1Rjg0XHJcbiAgICBwdWJsaWNEaXI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vcHVibGljXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgY2FjaGVEaXI6IFwibm9kZV9tb2R1bGVzLy52aXRlXCIsIC8vIFx1NUI1OFx1NTBBOFx1N0YxM1x1NUI1OFx1NjU4N1x1NEVGNlx1NzY4NFx1NzZFRVx1NUY1NVxyXG4gICAgbG9nTGV2ZWw6IFwiaW5mb1wiLCAvLyBcdThDMDNcdTY1NzRcdTYzQTdcdTUyMzZcdTUzRjBcdThGOTNcdTUxRkFcdTc2ODRcdTdFQTdcdTUyMkIgJ2luZm8nIHwgJ3dhcm4nIHwgJ2Vycm9yJyB8ICdzaWxlbnQnXHJcbiAgICBjbGVhclNjcmVlbjogdHJ1ZSwgLy8gXHU3MEVEXHU2NkY0XHU2NUIwXHU2NUY2XHVGRjBDXHU2RTA1XHU3QTdBXHU2M0E3XHU1MjM2XHU1M0YwXHJcbiAgICBlbnZEaXI6IFwiLi9cIixcclxuICAgIGVudlByZWZpeDogW1wiVklURV9cIl0sIC8vIFx1NEVFNSBlbnZQcmVmaXggXHU1RjAwXHU1OTM0XHU3Njg0XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU0RjFBXHU5MDFBXHU4RkM3IGltcG9ydC5tZXRhLmVudiBcdTY2QjRcdTk3MzJcdTU3MjhcdTRGNjBcdTc2ODRcdTVCQTJcdTYyMzdcdTdBRUZcdTZFOTBcdTc4MDFcdTRFMkRcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKHtcclxuICAgICAgICBzY3JpcHQ6IHtcclxuICAgICAgICAgIGRlZmluZU1vZGVsOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLyBcdTVGMDBcdTU0MkYganN4IFx1NjUyRlx1NjMwMVxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgLy8gXHU3NTFGXHU2MjEwIHN2ZyBcdTk2RUFcdTc4QTdcdTU2RkVcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwic3JjL2Fzc2V0cy9zdmdcIildLFxyXG4gICAgICAgIHN5bWJvbElkOiBcImljb24tW25hbWVdXCIsXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLyBcdTU0MDRcdTc5Q0RcdTU0MDRcdTY4MzdcdTc2ODQgSWNvbiBcdTdFQzRcdTRFRjZcdTk2QzZcdTU0MDhcclxuICAgICAgSWNvbnMoe1xyXG4gICAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLFxyXG4gICAgICAgIGNvbXBpbGVyOiBcInZ1ZTNcIixcclxuICAgICAgICBkZWZhdWx0U3R5bGU6IFwiZm9udC1zaXplOiAxNnB4O1wiLFxyXG4gICAgICAgIHNjYWxlOiAxLFxyXG4gICAgICAgIGRlZmF1bHRDbGFzczogXCJcIixcclxuICAgICAgfSksXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIGR0czogXCJzcmMvdHlwaW5ncy9jb21wb25lbnRzLmQudHNcIixcclxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTc2ODRcdTdFQzRcdTRFRjZcdTRGNERcdTdGNkVcdUZGMENcdTlFRDhcdThCQTRcdTY2MkYgc3JjL2NvbXBvbmVudHNcclxuICAgICAgICBkaXJzOiBbXCJzcmMvY29tcG9uZW50c1wiXSxcclxuICAgICAgICBpbmNsdWRlOiBbL1xcLlt0al1zeD8kLywgL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlL10sXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICBHaWVSZXNvbHZlcigpLFxyXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLCAvLyBcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTdFQzRcdTRFRjZcclxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTVGQzVcdTk4N0JcdTkwNzVcdTVGQUFcdTU0MERcdTc5RjBcdTY4M0NcdTVGMEYge3ByZWZpeFx1RkYxQVx1OUVEOFx1OEJBNFx1NEUzQWl9LXtjb2xsZWN0aW9uXHVGRjFBXHU1NkZFXHU2ODA3XHU5NkM2XHU1NDA4XHU3Njg0XHU1NDBEXHU3OUYwfS17aWNvblx1RkYxQVx1NTZGRVx1NjgwN1x1NTQwRFx1NzlGMH1cclxuICAgICAgICAgICAgcHJlZml4OiBcImlcIixcclxuICAgICAgICAgICAgZXh0ZW5zaW9uOiBcInZ1ZVwiLFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgXSxcclxuICAgICAgfSksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIGR0czogXCJzcmMvdHlwaW5ncy9hdXRvLWltcG9ydHMuZC50c1wiLFxyXG4gICAgICAgIGluY2x1ZGU6IFsvXFwuW3RqXXN4PyQvLCAvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvXSxcclxuICAgICAgICAvLyBcdTUxNjhcdTVDNDBcdTVGMTVcdTUxNjVcdTYzRDJcdTRFRjZcclxuICAgICAgICBpbXBvcnRzOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCJdLFxyXG4gICAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgICAgR2llUmVzb2x2ZXIoKSxcclxuICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2LFx1NTNFQVx1NjcwOVx1OEZEQlx1NTE2NVx1NEY3Rlx1NzUyOFx1NzU0Q1x1OTc2Mlx1NzY4NFx1NjVGNlx1NTAxOVx1NjI0RFx1NEYxQVx1NkRGQlx1NTJBMFx1NTIzMFx1NThGMFx1NjYwRVx1NjU4N1x1NEVGNlx1NEUyRFxyXG4gICAgICAgICAgSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgICAgICAgIC8vIFx1NTQyRlx1NzUyOCBAaWNvbmlmeS1qc29uIFx1NEUyRFx1NzY4NCBlbGVtZW50LXBsdXMgXHU3Njg0XHU1NkZFXHU2ODA3XHU1RTkzXHJcbiAgICAgICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogW1wiZXBcIl0sXHJcbiAgICAgICAgICAgIGV4dGVuc2lvbjogXCJ2dWVcIixcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZXhjbHVkZTogaXNTZXJ2ZSA/IFsvdmlzaW9uXFwvdmlzaW9uX3dhc21faW50ZXJuYWxcXC5qcy9dIDogbnVsbCxcclxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgdnVlIGFwaSBcdTU0MEVcdUZGMENcdTU3MjggdnVlIFx1NjU4N1x1NEVGNlx1NEY3Rlx1NzUyOFx1NEUyRFx1RkYwQ1x1NEYxQVx1NjJBNVx1NEUwMFx1NEUyQSBlc2xpbnQgXHU2MkE1XHU5NTE5XHU5NUVFXHU5ODk4XHJcbiAgICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCAvLyBEZWZhdWx0IGBmYWxzZWAsXHU4OUUzXHU1MUIzXHU2MkE1XHU5NTE5XHU4OTgxXHU2NTM5XHU2MjEwIHRydWVcclxuICAgICAgICAgIGZpbGVwYXRoOiBcIi4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25cIiwgLy8gRGVmYXVsdCBgLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbmBcclxuICAgICAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWUsIC8vIERlZmF1bHQgYHRydWVgLCAodHJ1ZSB8IGZhbHNlIHwgJ3JlYWRvbmx5JyB8ICdyZWFkYWJsZScgfCAnd3JpdGFibGUnIHwgJ3dyaXRlYWJsZScpXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICAgIC8vIFx1NTcyOCBlc20gXHU0RTJEXHU2NTJGXHU2MzAxIGNvbW1vbmpzXHJcbiAgICAgIHZpdGVDb21tb25qcygpLFxyXG4gICAgICAvLyB2aXRlXHU1QzA2IGVudiBcdTY2QjRcdTk3MzJcdTdFRDlpbXBvcnQubWV0YS5lbnYuUFJFRklYX1hYWFx1RkYwQ1x1NEY0Nlx1NEUwRFx1NEYxQVx1NTBDRiB2dWUtY2xpIFx1NjIxNiBjcmVhdGUtcmVhY3QtYXBwIFx1OTBBM1x1NjgzN1x1NTJBMFx1OEY3RFx1NTIzMCBwcm9jZXNzLmVudlxyXG4gICAgICBlbnZJbmplY3Qoe30pLFxyXG4gICAgICAvLyBDb2RlSW5zcGVjdG9yUGx1Z2luKHsgYnVuZGxlcjogXCJ2aXRlXCIgfSksXHJcbiAgICAgIC8vIFx1NEZFRVx1NjUzOVx1NjU4N1x1NEVGNlx1ODFFQVx1NTJBOFx1OTFDRFx1NTQyRlx1NjcwRFx1NTJBMVxyXG4gICAgICBWaXRlUmVzdGFydCh7XHJcbiAgICAgICAgcmVzdGFydDogW1wiLmVudi4qXCIsIFwidml0ZS5jb25maWcuW2p0XXNcIl0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBpbXBvcnRUb0NETih7XHJcbiAgICAgICAgLy8gXHU5NzAwXHU4OTgxIENETiBcdTUyQTBcdTkwMUZcdTc2ODRcdTZBMjFcdTU3NTdcclxuICAgICAgICBtb2R1bGVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwibG9kYXNoXCIsXHJcbiAgICAgICAgICAgIHZhcjogXCJfXCIsXHJcbiAgICAgICAgICAgIHBhdGg6IGBodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2xvZGFzaEA0LjE3LjIxL2xvZGFzaC5taW4uanNgLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KSxcclxuICAgICAgLy8gY29weSh7IHRhcmdldHM6IFt7IHNyYzogXCIuL25vZGVfbW9kdWxlcy9wZGZqcy1kaXN0L2NtYXBzL1wiLCBkZXN0OiBcIi4vcHVibGljL1wiIH1dIH0pLFxyXG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICAgIGRpc2FibGU6IGlzU2VydmUsXHJcbiAgICAgICAgYWxnb3JpdGhtOiBcImd6aXBcIixcclxuICAgICAgICB0aHJlc2hvbGQ6IDEwMjQwLCAvLyBcdTU5ODJcdTY3OUNcdTRGNTNcdTc5RUZcdTU5MjdcdTRFOEVcdTk2MDhcdTUwM0NcdUZGMENcdTUyMTlcdThGREJcdTg4NENcdTUzOEJcdTdGMjlcdUZGMENcdTUzNTVcdTRGNERcdTRFM0FiXHJcbiAgICAgICAgdmVyYm9zZTogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU1NzI4XHU2M0E3XHU1MjM2XHU1M0YwXHU0RTJEXHU4RjkzXHU1MUZBXHU1MzhCXHU3RjI5XHU3RUQzXHU2NzlDXHJcbiAgICAgICAgZXh0OiBcIi5nelwiLCAvLyBcdTc1MUZcdTYyMTBcdTc2ODRcdTUzOEJcdTdGMjlcdTUzMDVcdTc2ODRcdTU0MEVcdTdGMDBcclxuICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiB0cnVlLCAvLyBcdTZFOTBcdTY1ODdcdTRFRjZcdTUzOEJcdTdGMjlcdTU0MEVcdTY2MkZcdTU0MjZcdTUyMjBcdTk2NjRcclxuICAgICAgICBmaWx0ZXI6IChmaWxlKSA9PiBmYWxzZSwgLy8gXHU2MzA3XHU1QjlBXHU0RTBEXHU1MzhCXHU3RjI5XHU3Njg0XHU4RDQ0XHU2RTkwXHJcbiAgICAgIH0pLFxyXG4gICAgICB2aXRlSW1hZ2VtaW4oe1xyXG4gICAgICAgIGdpZnNpY2xlOiB7XHJcbiAgICAgICAgICAvLyBnaWZcdTU2RkVcdTcyNDdcdTUzOEJcdTdGMjlcclxuICAgICAgICAgIG9wdGltaXphdGlvbkxldmVsOiAzLCAvLyBcdTkwMDlcdTYyRTkxXHU1MjMwM1x1NEU0Qlx1OTVGNFx1NzY4NFx1NEYxOFx1NTMxNlx1N0VBN1x1NTIyQlxyXG4gICAgICAgICAgaW50ZXJsYWNlZDogZmFsc2UsIC8vIFx1OTY5NFx1ODg0Q1x1NjI2Qlx1NjNDRmdpZlx1OEZEQlx1ODg0Q1x1NkUxMFx1OEZEQlx1NUYwRlx1NkUzMlx1NjdEM1xyXG4gICAgICAgICAgLy8gY29sb3JzOiAyIC8vIFx1NUMwNlx1NkJDRlx1NEUyQVx1OEY5M1x1NTFGQUdJRlx1NEUyRFx1NEUwRFx1NTQwQ1x1OTg5Q1x1ODI3Mlx1NzY4NFx1NjU3MFx1OTFDRlx1NTFDRlx1NUMxMVx1NTIzMG51bVx1NjIxNlx1NjZGNFx1NUMxMVx1MzAwMlx1NjU3MFx1NUI1N1x1NUZDNVx1OTg3Qlx1NEVDQlx1NEU4RTJcdTU0OEMyNTZcdTRFNEJcdTk1RjRcdTMwMDJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wdGlwbmc6IHtcclxuICAgICAgICAgIC8vIHBuZ1xyXG4gICAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsIC8vIFx1OTAwOVx1NjJFOTBcdTUyMzA3XHU0RTRCXHU5NUY0XHU3Njg0XHU0RjE4XHU1MzE2XHU3RUE3XHU1MjJCXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3pqcGVnOiB7XHJcbiAgICAgICAgICAvLyBqcGVnXHJcbiAgICAgICAgICBxdWFsaXR5OiA2NSwgLy8gXHU1MzhCXHU3RjI5XHU4RDI4XHU5MUNGXHVGRjBDXHU4MzAzXHU1NkY0XHU0RUNFMChcdTY3MDBcdTVERUUpXHU1MjMwMTAwKFx1NjcwMFx1NEY3MylcdTMwMDJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBuZ3F1YW50OiB7XHJcbiAgICAgICAgICAvLyBwbmdcclxuICAgICAgICAgIHF1YWxpdHk6IFswLjY1LCAwLjhdLCAvLyBNaW5cdTU0OENtYXhcdTY2MkZcdTRFQ0JcdTRFOEUwKFx1NjcwMFx1NURFRSlcdTUyMzAxKFx1NjcwMFx1NEY3MylcdTRFNEJcdTk1RjRcdTc2ODRcdTY1NzBcdTVCNTdcdUZGMENcdTdDN0JcdTRGM0NcdTRFOEVKUEVHXHUzMDAyXHU4RkJFXHU1MjMwXHU2MjE2XHU4RDg1XHU4RkM3XHU2NzAwXHU5QUQ4XHU4RDI4XHU5MUNGXHU2MjQwXHU5NzAwXHU3Njg0XHU2NzAwXHU1QzExXHU5MUNGXHU3Njg0XHU5ODlDXHU4MjcyXHUzMDAyXHU1OTgyXHU2NzlDXHU4RjZDXHU2MzYyXHU1QkZDXHU4MUY0XHU4RDI4XHU5MUNGXHU0RjRFXHU0RThFXHU2NzAwXHU0RjRFXHU4RDI4XHU5MUNGXHVGRjBDXHU1NkZFXHU1MENGXHU1QzA2XHU0RTBEXHU0RjFBXHU4OEFCXHU0RkREXHU1QjU4XHUzMDAyXHJcbiAgICAgICAgICBzcGVlZDogNCwgLy8gXHU1MzhCXHU3RjI5XHU5MDFGXHU1RUE2XHVGRjBDMShcdTVGM0FcdTUyOUIpXHU1MjMwMTEoXHU2NzAwXHU1RkVCKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gXHU1RjAwXHU1NDJGIHdlYnBcdUZGMENcdTRGMUFcdTYyOEEganBnIFx1NTQ4QyBwbmcgXHU1NkZFXHU3MjQ3XHU1MzhCXHU3RjI5XHU0RTNBIHdlYnAgXHU2ODNDXHU1RjBGXHJcbiAgICAgICAgd2VicDoge1xyXG4gICAgICAgICAgcXVhbGl0eTogNzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdmdvOiB7XHJcbiAgICAgICAgICAvLyBzdmdcdTUzOEJcdTdGMjlcclxuICAgICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6IFwicmVtb3ZlVmlld0JveFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbmFtZTogXCJyZW1vdmVFbXB0eUF0dHJzXCIsXHJcbiAgICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcblxyXG4gICAgICAvLyBcdTY3ODRcdTVFRkFcdTRFQTdcdTcyNjlcdTUyMDZcdTY3OTBcclxuICAgICAgaXNQcm9kICYmXHJcbiAgICAgICAgZW52LlZJVEVfQVBQX0FOQUxZICYmXHJcbiAgICAgICAgdmlzdWFsaXplcih7XHJcbiAgICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcclxuICAgICAgICAgIGJyb3RsaVNpemU6IHRydWUsXHJcbiAgICAgICAgICBlbWl0RmlsZTogZmFsc2UsXHJcbiAgICAgICAgICBmaWxlbmFtZTogXCJzdGF0cy5odG1sXCIsIC8vIFx1NTIwNlx1Njc5MFx1NTZGRVx1NzUxRlx1NjIxMFx1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRFxyXG4gICAgICAgICAgb3BlbjogdHJ1ZSwgLy8gXHU2MjUzXHU1MzA1XHU1QjhDXHU2MjEwXHU1NDBFXHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XHVGRjBDXHU2NjNFXHU3OTNBXHU0RUE3XHU3MjY5XHU0RjUzXHU3OUVGXHU2MkE1XHU1NDRBXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAvLyBcdTY4QzBcdTY3RTVWaXRlXHU2M0QyXHU0RUY2XHU3Njg0XHU0RTJEXHU5NUY0XHU3MkI2XHU2MDAxXHUzMDAyXHU1QkY5XHU0RThFXHU4QzAzXHU4QkQ1XHU1NDhDXHU1MjFCXHU0RjVDXHU2M0QyXHU0RUY2XHU1Rjg4XHU2NzA5XHU3NTI4XHUzMDAyXHJcbiAgICAgIEluc3BlY3QoKSxcclxuICAgICAgLy8gaXNTZXJ2ZSAmJiBSbW92ZUNvbnNvbGUoKSxcclxuICAgICAgLy8gaXNTZXJ2ZSAmJiBmaWxlUGF0aEluamVjdCgpLFxyXG4gICAgICAvLyBpc1NlcnZlICYmIFByb3h5U2VydmVyKCksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAvLyAhXHU2NzJBXHU3N0U1XHJcbiAgICAgIC8vIGRlZHVwZTogW10sIC8vIFx1NjcyQVx1NzdFNSBcdTVGM0FcdTUyMzYgVml0ZSBcdTU5Q0JcdTdFQzhcdTVDMDZcdTUyMTdcdTUxRkFcdTc2ODRcdTRGOURcdThENTZcdTk4NzlcdTg5RTNcdTY3OTBcdTRFM0FcdTU0MENcdTRFMDBcdTUyNkZcdTY3MkNcclxuICAgICAgLy8gY29uZGl0aW9uczogW10sIC8vIFx1NjcyQVx1NzdFNSBcdTg5RTNcdTUxQjNcdTdBMEJcdTVFOEZcdTUzMDVcdTRFMkQgXHU2MEM1XHU2NjZGXHU1QkZDXHU1MUZBIFx1NjVGNlx1NzY4NFx1NTE3Nlx1NEVENlx1NTE0MVx1OEJCOFx1Njc2MVx1NEVGNlxyXG4gICAgICAvLyBtYWluRmllbGRzOiBbXSwgLy8gXHU2NzJBXHU3N0U1IFx1ODlFM1x1Njc5MFx1NTMwNVx1NTE2NVx1NTNFM1x1NzBCOVx1NUMxRFx1OEJENVx1NzY4NFx1NUI1N1x1NkJCNVx1NTIxN1x1ODg2OFxyXG4gICAgICAvL1x1OEJCRVx1N0Y2RVx1NTIyQlx1NTQwRFxyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgfSxcclxuICAgICAgZXh0ZW5zaW9uczogW1wiLm1qc1wiLCBcIi5qc1wiLCBcIi5tdHNcIiwgXCIudHNcIiwgXCIuanN4XCIsIFwiLnRzeFwiLCBcIi5qc29uXCIsIFwiLnZ1ZVwiXSxcclxuICAgIH0sXHJcblxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICBob3N0OiBcIjEyNy4wLjAuMVwiLCAvLyBcdTYzMDdcdTVCOUFcdTY3MERcdTUyQTFcdTU2NjhcdTVFOTRcdThCRTVcdTc2RDFcdTU0MkNcdTU0RUFcdTRFMkEgSVAgXHU1NzMwXHU1NzQwXHJcbiAgICAgIHN0cmljdFBvcnQ6IGZhbHNlLCAvLyBcdTgyRTVcdTdBRUZcdTUzRTNcdTVERjJcdTg4QUJcdTUzNjBcdTc1MjhcdTUyMTlcdTRGMUFcdTc2RjRcdTYzQTVcdTkwMDBcdTUxRkFcclxuICAgICAgcG9ydDogMzAwMCwgLy9cdTU0MkZcdTUyQThcdTdBRUZcdTUzRTNcclxuICAgICAgY29yczogdHJ1ZSwgLy8gXHU5MTREXHU3RjZFIENPUlMgXHU4REU4XHU1N0RGXHJcbiAgICAgIG1pZGRsZXdhcmVNb2RlOiBmYWxzZSwgLy8gXHU0RUU1XHU0RTJEXHU5NUY0XHU0RUY2XHU2QTIxXHU1RjBGXHU1MjFCXHU1RUZBIFZpdGUgXHU2NzBEXHU1MkExXHU1NjY4XHJcbiAgICAgIGhtcjoge1xyXG4gICAgICAgIGhvc3Q6IFwiMTI3LjAuMC4xXCIsXHJcbiAgICAgICAgcG9ydDogMzAwMCxcclxuICAgICAgfSxcclxuICAgICAgaHR0cHM6IHtcclxuICAgICAgICBrZXk6IGZzLnJlYWRGaWxlU3luYyhgJHtfX2Rpcm5hbWV9L2NvbmZpZy9odHRwcy9wZW0vbWtjZXJ0LWtleS5wZW1gKSxcclxuICAgICAgICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMoYCR7X19kaXJuYW1lfS9jb25maWcvaHR0cHMvcGVtL21rY2VydC5wZW1gKSxcclxuICAgICAgfSxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1OTcwMFx1ODk4MVx1NzUyOFx1NTIzMCBmZm1wZWcgXHU1NDA4XHU1RTc2XHU4OUM2XHU5ODkxXHVGRjBDXHU5NzAwXHU4OTgxXHU1QzA2IENPRVAgXHU1NDhDIENPT1AgXHU2MjUzXHU1RjAwXHVGRjBDXHU2NzY1XHU3ODZFXHU0RkREIFNoYXJlQXJyYXlCdWZmZXIgXHU4MEZEXHU1OTFGXHU2QjYzXHU1RTM4XHU0RjdGXHU3NTI4XHJcbiAgICAgICAgLy8gXHU0RjQ2XHU2NjJGXHU4RkQ5XHU0RjFBXHU1RjcxXHU1NENEXHU4REU4XHU1N0RGXHU4RDQ0XHU2RTkwXHU4OUM2XHU5ODkxXHUzMDAxXHU1NkZFXHU3MjQ3XHU3Njg0XHU0RjdGXHU3NTI4XHJcbiAgICAgICAgLy8gXCJDcm9zcy1PcmlnaW4tRW1iZWRkZXItUG9saWN5XCI6IFwicmVxdWlyZS1jb3JwXCIsXHJcbiAgICAgICAgLy8gXCJDcm9zcy1PcmlnaW4tT3BlbmVyLVBvbGljeVwiOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgXCIvYXBpXCI6IHtcclxuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQVBQX0JBU0VfQVBJLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGhTdHIpID0+IHBhdGhTdHIucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIGZzOiB7XHJcbiAgICAgIC8vICAgc3RyaWN0OiB0cnVlLCAvLyBcdTk2NTBcdTUyMzZcdTRFM0FcdTVERTVcdTRGNUNcdTUzM0Egcm9vdCBcdThERUZcdTVGODRcdTRFRTVcdTU5MTZcdTc2ODRcdTY1ODdcdTRFRjZcdTc2ODRcdThCQkZcdTk1RUVcclxuICAgICAgLy8gICBhbGxvdzogW10sIC8vIFx1OTY1MFx1NTIzNlx1NTRFQVx1NEU5Qlx1NjU4N1x1NEVGNlx1NTNFRlx1NEVFNVx1OTAxQVx1OEZDNyAvQGZzLyBcdThERUZcdTVGODRcdTYzRDBcdTRGOUJcdTY3MERcdTUyQTFcclxuICAgICAgLy8gICBkZW55OiBbXCIuZW52XCIsIFwiLmVudi4qXCIsIFwiKi57cGVtLGNydH1cIl0sIC8vIFx1NzUyOFx1NEU4RVx1OTY1MFx1NTIzNiBWaXRlIFx1NUYwMFx1NTNEMVx1NjcwRFx1NTJBMVx1NTY2OFx1NjNEMFx1NEY5Qlx1NjU0Rlx1NjExRlx1NjU4N1x1NEVGNlx1NzY4NFx1OUVEMVx1NTQwRFx1NTM1NVxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyBvcmlnaW46IFwiaHR0cDovLzEyNy4wLjAuMTo4MDgwXCIsIC8vIFx1NzUyOFx1NEU4RVx1NUI5QVx1NEU0OVx1NUYwMFx1NTNEMVx1OEMwM1x1OEJENVx1OTYzNlx1NkJCNSBcdTVCRkNcdTUxNjVcdThENDRcdTZFOTBcdTc2ODRcdTY1ODdcdTRFRjZcdTU3MzBcdTU3NDAgXHU1MzA1XHU2MkVDIEAgXHU1QkZDXHU1MTY1XHU3Njg0IG9yaWdpblxyXG4gICAgfSxcclxuICAgIC8vIG1pbmlmeSBcdTYzMDdcdTVCOUFcdTRFM0EgZXNidWlsZCBcdTY1RjZcdTUzRUZcdTc1MjhcclxuICAgIGVzYnVpbGQ6IHtcclxuICAgICAgLy8gXHU2NzAwXHU1RTM4XHU4OUMxXHU3Njg0XHU3NTI4XHU0RjhCXHU2NjJGXHU4MUVBXHU1QjlBXHU0RTQ5IEpTWFxyXG4gICAgICBqc3hGYWN0b3J5OiBcImhcIixcclxuICAgICAganN4RnJhZ21lbnQ6IFwiRnJhZ21lbnRcIixcclxuICAgICAgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU2NUY2XHU3OUZCXHU5NjY0Y29uc29sZVxyXG4gICAgICBkcm9wOiBbXCJjb25zb2xlXCIsIFwiZGVidWdnZXJcIl0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgdGFyZ2V0OiBbXCJlczIwMTVcIiwgXCJlZGdlODhcIiwgXCJmaXJlZm94NzhcIiwgXCJjaHJvbWU1OFwiLCBcInNhZmFyaTE0XCJdLCAvLyBcdTYzMDdcdTVCOUFcdTg5ODFcdTY1MkZcdTYzMDFcdTc2ODRcdTZENEZcdTg5QzhcdTU2NjhcdTUzOUZcdTc1MUZcdTcyNDhcdTY3MkNcclxuICAgICAgLy8gY3NzVGFyZ2V0OiBcIlwiLCAvLyBcdTUxNDFcdThCQjhcdTc1MjhcdTYyMzdcdTRFM0EgQ1NTIFx1NzY4NFx1NTM4Qlx1N0YyOVx1OEJCRVx1N0Y2RVx1NEUwMFx1NEUyQVx1NEUwRFx1NTQwQ1x1NzY4NFx1NkQ0Rlx1ODlDOFx1NTY2OCB0YXJnZXQgXHU0RTBFIGJ1aWxkLnRhcmdldCBcdTRFMDBcdTgxRjRcclxuICAgICAgb3V0RGlyOiBcImRpc3RcIixcclxuICAgICAgYXNzZXRzRGlyOiBcImFzc2V0c1wiLFxyXG4gICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsIC8vIFx1NTQyRlx1NzUyOCBDU1MgXHU0RUUzXHU3ODAxXHU2MkM2XHU1MjA2XHJcbiAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLCAvLyBcdTY3ODRcdTVFRkFcdTY1RjZcdTZFMDVcdTdBN0FcdTc2RUVcdTVGNTVcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsXHJcbiAgICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LCAvLyBcdTU2RkVcdTcyNDdcdThGNkMgYmFzZTY0IFx1N0YxNlx1NzgwMVx1NzY4NFx1OTYwOFx1NTAzQ1xyXG4gICAgICBtb2R1bGVQcmVsb2FkOiB7IHBvbHlmaWxsOiB0cnVlIH0sIC8vIFx1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NkNFOFx1NTE2NSBtb2R1bGUgcHJlbG9hZCBcdTc2ODQgcG9seWZpbGxcclxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLCAvLyBcdTU0MkZcdTc1MjgvXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBXHJcbiAgICAgIHNvdXJjZW1hcDogaXNTZXJ2ZSwgLy8gXHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwIHNvdXJjZSBtYXAgXHU2NTg3XHU0RUY2XHUzMDAyXHU1OTgyXHU2NzlDXHU0RTNBIHRydWVcdUZGMENcdTVDMDZcdTRGMUFcdTUyMUJcdTVFRkFcdTRFMDBcdTRFMkFcdTcyRUNcdTdBQ0JcdTc2ODQgc291cmNlIG1hcCBcdTY1ODdcdTRFRjZcdTMwMDJcclxuICAgICAgbWFuaWZlc3Q6IGZhbHNlLCAvLyBcdTVGNTNcdThCQkVcdTdGNkVcdTRFM0EgdHJ1ZVx1RkYwQ1x1Njc4NFx1NUVGQVx1NTQwRVx1NUMwNlx1NEYxQVx1NzUxRlx1NjIxMCBtYW5pZmVzdC5qc29uIFx1NjU4N1x1NEVGNlxyXG5cclxuICAgICAgLy8gc3NyTWFuaWZlc3Q6IGZhbHNlLCAvLyBcdTY3ODRcdTVFRkFcdTRFMERcdTc1MUZcdTYyMTAgU1NSIFx1NzY4NCBtYW5pZmVzdCBcdTY1ODdcdTRFRjZcclxuICAgICAgLy8gc3NyOiB1bmRlZmluZWQsIC8vIFx1NzUxRlx1NjIxMFx1OTc2Mlx1NTQxMSBTU1IgXHU3Njg0XHU2Nzg0XHU1RUZBXHJcbiAgICAgIC8vIHdyaXRlOiB0cnVlLCAvLyBcdTU0MkZcdTc1MjhcdTVDMDZcdTY3ODRcdTVFRkFcdTU0MEVcdTc2ODRcdTY1ODdcdTRFRjZcdTUxOTlcdTUxNjVcdTc4QzFcdTc2RDhcclxuICAgICAgLy8gYnJvdGxpU2l6ZTogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4IGJyb3RsaSBcdTUzOEJcdTdGMjlcdTU5MjdcdTVDMEZcdTYyQTVcdTU0NEFcclxuICAgICAgLy8gd2F0Y2g6IG51bGwsIC8vIFx1OEJCRVx1N0Y2RVx1NEUzQSB7fSBcdTUyMTlcdTRGMUFcdTU0MkZcdTc1Mjggcm9sbHVwIFx1NzY4NFx1NzZEMVx1NTQyQ1x1NTY2OFxyXG5cclxuICAgICAgLy8gXHU1M0VGXHU5MTREXHU3RjZFIHRlcnNlciBcdTYyMTYgZXNidWlsZFxyXG4gICAgICBtaW5pZnk6IFwidGVyc2VyXCIsXHJcbiAgICAgIC8vIFx1NEVFM1x1NzgwMVx1NTM4Qlx1N0YyOVx1OTE0RFx1N0Y2RVxyXG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgICAgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU3OUZCXHU5NjY0IGNvbnNvbGVcclxuICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bZXh0XS9bbmFtZV1bZXh0bmFtZV1gLFxyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGBqcy9jaHVua3MvW25hbWVdLltoYXNoXS5qc2AsXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogYGpzL1tuYW1lXS5qc2AsXHJcbiAgICAgICAgICAvLyBcdTU3MjhcdTRFMERcdTkxNERcdTdGNkUgbWFudWFsY2h1bmtzIFx1NzY4NFx1NjBDNVx1NTFCNVx1NEUwQlx1RkYwQ3JvbGx1cFx1NEYxQVx1NUMwNlx1NkJDRlx1NEUyQVx1NkEyMVx1NTc1N1x1NjU4N1x1NEVGNlx1NjI1M1x1NTMwNVx1NjIxMFx1NEUwMFx1NEUyQVx1NTM1NVx1NzJFQ1x1NzY4NCBqcyBcdTY1ODdcdTRFRjZcdUZGMENcdTRFMERcdTRGMUFcdTVCRjkgY2h1bmsgXHU4RkRCXHU4ODRDXHU1NDA4XHU1RTc2XHVGRjBDXHJcbiAgICAgICAgICAvLyBcdThGRDlcdTRGMUFcdTVCRkNcdTgxRjQgY2h1bmsgXHU2NTcwXHU5MUNGXHU1OTJBXHU1OTFBXHVGRjBDXHU2NzA5XHU0RTlCXHU2NTg3XHU0RUY2XHU1M0VBXHU2NzA5IFx1NTFFMCBrYlx1RkYwOFx1ODlFNlx1NTNEMVx1NTQwQ1x1NTdERlx1NTQwRFx1N0Y1MVx1N0VEQ1x1OEJGN1x1NkM0Mlx1NjcwMFx1NTkyN1x1NjU3MFx1OTFDRlx1OTY1MFx1NTIzNlx1RkYwOVxyXG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9cIikpIHJldHVybiBcImxvZGFzaFwiXHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIi9ub2RlX21vZHVsZXMvdWEtcGFyc2VyLWpzL1wiKSkgcmV0dXJuIFwidWEtcGFyc2VyLWpzXCJcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL25vZGVfbW9kdWxlcy9qc3ppcC9cIikpIHJldHVybiBcImpzemlwXCJcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL25vZGVfbW9kdWxlcy9lbGVtZW50LXBsdXMvXCIpKSByZXR1cm4gXCJlbGVtZW50LXBsdXNcIlxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvbm9kZV9tb2R1bGVzL1wiKSkgcmV0dXJuIFwidmVuZG9yXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyByb2xsdXAgXHU1NzI4My4zXHU0RTRCXHU1NDBFXHU3Njg0XHU3MjQ4XHU2NzJDXHU2M0QwXHU0RjlCXHU0RTg2XHU0RTAwXHU0RTJBXHU1QjlFXHU5QThDXHU2MDI3XHU4RDI4XHU3Njg0XHU5MTREXHU3RjZFXHU5ODc5IG91dHB1dC5leHBlcmltZW50YWxNaW5DaHVua1NpemVcdUZGMENcdTY3NjVcdTU0MDhcdTVFNzZcdTVDMEYgY2h1bmtcclxuICAgICAgICAgIC8vIFx1NTk4Mlx1Njc5QyBjaHVuayBcdTVDMEZcdTRFOEVcdThGRDlcdTRFMkFcdTUwM0NcdTUyMTlcdTRGMUFcdTVDMURcdThCRDVcdThEREZcdTUxNzZcdTRFRDYgY2h1bmsgXHU1NDA4XHU1RTc2XHVGRjBDXHU1QjgzXHU1M0VBXHU1QkY5XHU3RUFGXHU1MUZEXHU2NTcwXHU2NzA5XHU0RjVDXHU3NTI4XHVGRjBDXHU1OTgyXHU2NzlDXHU2NjJGIGNvbnNvbGUubG9nIFx1NUMzMVx1NEYxQVx1NTkzMVx1NjU0OFxyXG4gICAgICAgICAgZXhwZXJpbWVudGFsTWluQ2h1bmtTaXplOiA1ICogMTAyNCwgLy8gXHU1MzU1XHU0RjREYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gUm9sbHVwIFx1OEZEOFx1NjNEMFx1NEY5Qlx1NEU4NiB0cmVlc2hha2UubWFudWFsUHVyZUZ1bmN0aW9ucyBcdTUzQzJcdTY1NzBcdTY3NjVcdThCQTlcdTVGMDBcdTUzRDFcdTgwMDVcdTYzMDdcdTVCOUFcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTY2MkZcdTdFQUZcdTUxRkRcdTY1NzBcdUZGMENcdTYyNDBcdTRFRTVcdTUzRUZcdTRFRTVcdThGRDlcdTY4MzdcdTkxNERcdTdGNkVcclxuICAgICAgICAvLyBcdTU3MjhcdTVGMDBcdTUzRDEgSlMgXHU2QTIxXHU1NzU3XHU3Njg0XHU2NUY2XHU1MDE5XHU4OTgxXHU1QzNEXHU5MUNGXHU5MDdGXHU1MTREXHU2QTIxXHU1NzU3XHU1MjZGXHU0RjVDXHU3NTI4XHJcbiAgICAgICAgdHJlZXNoYWtlOiB7XHJcbiAgICAgICAgICBwcmVzZXQ6IFwicmVjb21tZW5kZWRcIixcclxuICAgICAgICAgIG1hbnVhbFB1cmVGdW5jdGlvbnM6IFtcImNvbnNvbGUubG9nXCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIC8vICFcdTY3MkFcdTc3RTVcclxuICAgICAgZW50cmllczogW1wiL2luZGV4Lmh0bWxcIl0sXHJcbiAgICAgIC8vIFx1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRlx1NUYzQVx1NTIzNlx1NEY5RFx1OEQ1Nlx1OTg4NFx1Njc4NFx1NUVGQVx1MzAwMm5vZGVfbW9kdWxlcyBcdTRFMkRcdTc2ODRcdTRGOURcdThENTZcdTZBMjFcdTU3NTdcdTY3ODRcdTVFRkFcdThGQzdcdTRFMDBcdTZCMjFcdTVDMzFcdTRGMUFcdTdGMTNcdTVCNThcdTU3Mjggbm9kZV9tb2R1bGVzLy52aXRlL2RlcHMgXHU2NTg3XHU0RUY2XHU1OTM5XHU0RTBCXHVGRjBDXHU0RTBCXHU0RTAwXHU2QjIxXHU0RjFBXHU3NkY0XHU2M0E1XHU0RjdGXHU3NTI4XHU3RjEzXHU1QjU4XHU3Njg0XHU2NTg3XHU0RUY2XHUzMDAyXHJcbiAgICAgIC8vIFx1ODAwQ1x1NjcwOVx1NjVGNlx1NTAxOVx1NjIxMVx1NEVFQ1x1NjBGM1x1ODk4MVx1NEZFRVx1NjUzOVx1NEY5RFx1OEQ1Nlx1NkEyMVx1NTc1N1x1NzY4NFx1NEVFM1x1NzgwMVx1RkYwQ1x1NTA1QVx1NEUwMFx1NEU5Qlx1NkQ0Qlx1OEJENVx1NjIxNlx1ODAwNVx1NjI1M1x1NEUyQVx1ODg2NVx1NEUwMVx1RkYwQ1x1OEZEOVx1NjVGNlx1NTAxOVx1NUMzMVx1ODk4MVx1NzUyOFx1NTIzMFx1NUYzQVx1NTIzNlx1NEY5RFx1OEQ1Nlx1OTg4NFx1Njc4NFx1NUVGQVx1MzAwMlxyXG4gICAgICAvLyBcdTk2NjRcdTRFODZcdThGRDlcdTRFMkFcdTY1QjlcdTZDRDVcdUZGMENcdTYyMTFcdTRFRUNcdThGRDhcdTUzRUZcdTRFRTVcdTkwMUFcdThGQzdcdTUyMjBcdTk2NjQgLnZpdGUgXHU2NTg3XHU0RUY2XHU1OTM5XHU2MjE2XHU4RkQwXHU4ODRDIG5weCB2aXRlIC0tZm9yY2UgXHU2NzY1XHU1RjNBXHU1MjM2XHU4RkRCXHU4ODRDXHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXHUzMDAyXHJcbiAgICAgIGZvcmNlOiBmYWxzZSwgLy8gXHU1RjNBXHU1MjM2XHU4RkRCXHU4ODRDXHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXHJcbiAgICAgIGV4Y2x1ZGU6IFtcIkBmZm1wZWcvZmZtcGVnXCIsIFwiQGZmbXBlZy91dGlsXCIsIFwiQGpzcXVhc2gvYXZpZlwiLCBcIkBqc3F1YXNoL2pwZWdcIiwgXCJAanNxdWFzaC9qeGxcIiwgXCJAanNxdWFzaC9wbmdcIiwgXCJAanNxdWFzaC93ZWJwXCJdLFxyXG4gICAgfSxcclxuICAgIGFzc2V0c0luY2x1ZGU6IFtcIioqLyouZ2x0ZlwiXSwgLy8gXHU2MzA3XHU1QjlBXHU5ODlEXHU1OTE2XHU3Njg0IHBpY29tYXRjaCBcdTZBMjFcdTVGMEYgXHU0RjVDXHU0RTNBXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU1OTA0XHU3NDA2XHJcbiAgICBjc3M6IHtcclxuICAgICAgbW9kdWxlczoge1xyXG4gICAgICAgIHNjb3BlQmVoYXZpb3VyOiBcImxvY2FsXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICAvLyBcdTdFRDlcdTU0MkJcdTY3MDlcdTRFMkRcdTY1ODdcdTc2ODRzY3NzXHU2NTg3XHU0RUY2XHU2REZCXHU1MkEwIEBjaGFyc2V0OlVURi04O1xyXG4gICAgICAgIGNoYXJzZXQ6IGZhbHNlLFxyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIC8qIC5zY3NzXHU1MTY4XHU1QzQwXHU5ODg0XHU1QjlBXHU0RTQ5XHU1M0Q4XHU5MUNGXHVGRjBDXHU1RjE1XHU1MTY1XHU1OTFBXHU0RTJBXHU2NTg3XHU0RUY2IFx1NEVFNTsoXHU1MjA2XHU1M0Y3XHU1MjA2XHU1MjcyKSovXHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL2Nzcy9kZXZpY2UvZGV2aWNlLm1peGluLnNjc3NcIiBhcyAqO2AsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgLy8gXHU1M0VGXHU0RUU1XHU2N0U1XHU3NzBCIENTUyBcdTc2ODRcdTZFOTBcdTc4MDFcclxuICAgICAgZGV2U291cmNlbWFwOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGpzb246IHtcclxuICAgICAgbmFtZWRFeHBvcnRzOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTY1MkZcdTYzMDFcdTRFQ0UgLmpzb24gXHU2NTg3XHU0RUY2XHU0RTJEXHU4RkRCXHU4ODRDXHU2MzA5XHU1NDBEXHU1QkZDXHU1MTY1XHJcbiAgICAgIHN0cmluZ2lmeTogZmFsc2UsIC8vICBcdTVGMDBcdTU0MkZcdTZCNjRcdTk4NzlcdUZGMENcdTVCRkNcdTUxNjVcdTc2ODQgSlNPTiBcdTRGMUFcdTg4QUJcdThGNkNcdTYzNjJcdTRFM0EgZXhwb3J0IGRlZmF1bHQgSlNPTi5wYXJzZShcIi4uLlwiKSBcdTRGMUFcdTc5ODFcdTc1MjhcdTYzMDlcdTU0MERcdTVCRkNcdTUxNjVcclxuICAgIH0sXHJcbiAgICBwcmV2aWV3OiB7XHJcbiAgICAgIHBvcnQ6IDUwMDAsIC8vIFx1NjMwN1x1NUI5QVx1NUYwMFx1NTNEMVx1NjcwRFx1NTJBMVx1NTY2OFx1N0FFRlx1NTNFM1xyXG4gICAgICBzdHJpY3RQb3J0OiBmYWxzZSwgLy8gXHU4MkU1XHU3QUVGXHU1M0UzXHU1REYyXHU4OEFCXHU1MzYwXHU3NTI4XHU1MjE5XHU0RjFBXHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBXHJcbiAgICAgIGh0dHBzOiB7fSwgLy8gXHU1NDJGXHU3NTI4IFRMUyArIEhUVFAvMlxyXG4gICAgICBvcGVuOiB0cnVlLCAvLyBcdTU0MkZcdTUyQThcdTY1RjZcdTgxRUFcdTUyQThcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTRFMkRcdTYyNTNcdTVGMDBcdTVFOTRcdTc1MjhcdTdBMEJcdTVFOEZcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAvLyBcdTkxNERcdTdGNkVcdTgxRUFcdTVCOUFcdTRFNDlcdTRFRTNcdTc0MDZcdTg5QzRcdTUyMTlcclxuICAgICAgICBcIi9hcGlcIjoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tXCIsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIiksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgY29yczogdHJ1ZSwgLy8gXHU5MTREXHU3RjZFIENPUlNcclxuICAgIH0sXHJcbiAgICAvLyBzc3I6IHtcclxuICAgIC8vICAgZXh0ZXJuYWw6IFtdLCAvLyBcdTUyMTdcdTUxRkFcdTc2ODRcdTY2MkZcdTg5ODFcdTRFM0EgU1NSIFx1NUYzQVx1NTIzNlx1NTkxNlx1OTBFOFx1NTMxNlx1NzY4NFx1NEY5RFx1OEQ1NixcclxuICAgIC8vICAgbm9FeHRlcm5hbDogXCJcIiwgLy8gXHU1MjE3XHU1MUZBXHU3Njg0XHU2NjJGXHU5NjMyXHU2QjYyXHU4OEFCIFNTUiBcdTU5MTZcdTkwRThcdTUzMTZcdTRGOURcdThENTZcdTk4NzlcclxuICAgIC8vICAgdGFyZ2V0OiBcIm5vZGVcIiwgLy8gU1NSIFx1NjcwRFx1NTJBMVx1NTY2OFx1NzY4NFx1Njc4NFx1NUVGQVx1NzZFRVx1NjgwN1xyXG4gICAgLy8gfSxcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVUsU0FBUyxjQUFjLGVBQXNEO0FBQ3RaLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWUsV0FBVztBQUNuQyxPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFFakIsT0FBTyxZQUFZO0FBR25CLE9BQU8sZ0JBQWdCO0FBRXZCLE9BQU8sZ0JBQWdCO0FBRXZCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLDJCQUEyQjtBQUNwQyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGVBQWU7QUFHdEIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxVQUFVLG1CQUFtQjtBQUN0QyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxpQkFBaUI7QUFHeEIsU0FBUyxrQkFBa0I7QUFFM0IsU0FBUyxtQkFBbUI7QUE5QjVCLElBQU0sbUNBQW1DO0FBQXNLLElBQU0sMkNBQTJDO0FBc0NoUSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxXQUFXO0FBQ3RDLFFBQU0sUUFBUSxPQUFPLFNBQVM7QUFDOUIsUUFBTSxTQUFTLE9BQU8sU0FBUztBQUUvQixRQUFNLFVBQVUsT0FBTyxZQUFZO0FBQ25DLFFBQU0sVUFBVSxPQUFPLFlBQVk7QUFFbkMsUUFBTSxNQUFNLFFBQVEsT0FBTyxNQUFNLFFBQVEsSUFBSSxD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QTBCO0FBQUcscUJBQU87QUFDcEQsZ0JBQUksR0FBRyxTQUFTLDZCQUE2QjtBQUFHLHFCQUFPO0FBQ3ZELGdCQUFJLEdBQUcsU0FBUyxzQkFBc0I7QUFBRyxxQkFBTztBQUNoRCxnQkFBSSxHQUFHLFNBQVMsNkJBQTZCO0FBQUcscUJBQU87QUFDdkQsZ0JBQUksR0FBRyxTQUFTLGdCQUFnQjtBQUFHLHFCQUFPO0FBQUEsVUFDNUM7QUFBQTtBQUFBO0FBQUEsVUFHQSwwQkFBMEIsSUFBSTtBQUFBO0FBQUEsUUFDaEM7QUFBQTtBQUFBO0FBQUEsUUFHQSxXQUFXO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixxQkFBcUIsQ0FBQyxhQUFhO0FBQUEsUUFDckM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYztBQUFBO0FBQUEsTUFFWixTQUFTLENBQUMsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSXZCLE9BQU87QUFBQTtBQUFBLE1BQ1AsU0FBUyxDQUFDLGtCQUFrQixnQkFBZ0IsaUJBQWlCLGlCQUFpQixnQkFBZ0IsZ0JBQWdCLGVBQWU7QUFBQSxJQUMvSDtBQUFBLElBQ0EsZUFBZSxDQUFDLFdBQVc7QUFBQTtBQUFBLElBQzNCLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsTUFDQSxxQkFBcUI7QUFBQTtBQUFBLFFBRW5CLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQTtBQUFBLFVBRUosZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUE7QUFBQSxNQUVBLGNBQWM7QUFBQSxJQUNoQjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osY0FBYztBQUFBO0FBQUEsTUFDZCxXQUFXO0FBQUE7QUFBQSxJQUNiO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUE7QUFBQSxNQUNOLFlBQVk7QUFBQTtBQUFBLE1BQ1osT0FBTyxDQUFDO0FBQUE7QUFBQSxNQUNSLE1BQU07QUFBQTtBQUFBLE1BQ04sT0FBTztBQUFBO0FBQUEsUUFFTCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQU07QUFBQTtBQUFBLElBQ1I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
