import { RouteMeta, RouteRecordRaw } from "vue-router"

export const routes: Array<RouteRecordRaw> = getRoutes()

function getRoutes() {
  const comp = import.meta.glob("/src/(pages|view)/**/index.vue")

  const configs = import.meta.glob<RouteMeta>([`/src/(pages|view)/**/config.[tj]s`], {
    // 获取导出的模块
    eager: true,
    // 直接获取 default 结果
    import: "default",
  })

  return Object.entries(comp).map(([path, component]) => {
    const meta = configs[path.replace("index.vue", "config.ts")]
    path = path.replace(/\/src\/[pages|views]+(?<path>.*)\/index.vue/gims, "$<path>") || "/"
    const name = path.split("/").join("-")

    return {
      path,
      name,
      meta,
      component,
    }
  })
}
