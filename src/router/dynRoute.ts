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

  return Object.entries(configs).map(([path, meta]) => {
    const compPath = path.replace("config.ts", "index.vue")

    path = path.replace("/src/pages", "").replace("/config.ts", "") || "/"
    const name = path.split("/").join("-") || "index"

    return {
      path,
      name,
      meta,
      component: comp[compPath],
    }
  })
}
