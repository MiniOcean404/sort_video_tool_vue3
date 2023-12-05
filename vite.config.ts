import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

// 按需引入组件，不用一次性导入全部，但是还是需要手动导入
import Components from "unplugin-vue-components/vite"
// 自动导入组件
import AutoImport from "unplugin-auto-import/vite"
import { GieResolver } from "@giegie/resolver"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [GieResolver()],
    }),
    AutoImport({
      resolvers: [GieResolver()],
    }),
  ],
  resolve: {
    //设置别名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000, //启动端口
    hmr: {
      host: "127.0.0.1",
      port: 3000,
    },
  },
})
