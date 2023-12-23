import type { App, Component } from "vue"

// 手动实现动态导入组件
export default {
  install(app: App) {
    // 将icons下的图标组件自动注册
    const comp = import.meta.glob(["@/components/**/*.vue"], { eager: true, import: "default" })

    Object.entries(comp).map(([path, component]) => {
      const name = path.replace(/\/src\/[pages|views|components]+\/(?<path>.*)\/index.vue/gims, "$<path>") || "/"
      app.component(name, component as Component)
    })
  },
}
