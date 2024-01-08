import { defineConfig } from "vite"
import type { UserConfig } from "vite"
import { builtinModules } from "module"
import dts from "vite-plugin-dts"
import copyPlugin from "rollup-plugin-copy"

export default defineConfig(() => {
  return {
    build: {
      minify: false,
      rollupOptions: {
        // 解决打包 node 时候 import 无法导入
        external: [...builtinModules, /^node:/],
        // 输出配置
        output: [
          {
            // 打包成 es module
            format: "es",
            // 重命名
            entryFileNames: "[name].js",
            // 打包目录和开发目录对应
            preserveModules: true,
            // 输出目录
            dir: "dist/es",
            // 指定保留模块结构的根目录
            preserveModulesRoot: "src",
          },
          {
            // 打包成 commonjs
            format: "cjs",
            // 重命名
            entryFileNames: "[name].cjs",
            // 打包目录和开发目录对应
            preserveModules: true,
            // 输出目录
            dir: "dist/lib",
            // 指定保留模块结构的根目录
            preserveModulesRoot: "src",
          },
          {
            // 打包成 umd
            format: "umd",
            // 重命名
            entryFileNames: "[name].js",
            // 打包目录和开发目录对应
            preserveModules: false,
            // 输出目录
            dir: "dist/umd",
            name: "vitePlugin",
          },
        ],
        plugins: [
          copyPlugin({
            targets: [{ src: "./src/proxy-serve/mock", dest: "./dist" }],
          }),
        ],
      },
      lib: {
        // 指定入口文件
        entry: "./src/index.ts",
        // 暴露的全局变量
        name: "GIE_VITE_PLUGIN",
      },
    },
    plugins: [
      dts({
        // 输出目录
        outDir: ["types"],
        // 将动态引入转换为静态（例如：`import('vue').DefineComponent` 转换为 `import { DefineComponent } from 'vue'`）
        staticImport: true,
        // 将所有的类型合并到一个文件中
        rollupTypes: true,
        tsconfigPath: "./tsconfig.json",
      }),
    ],
  } satisfies UserConfig
})
