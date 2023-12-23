import { routes } from "@/script/dyn-route"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeResolve(async (to) => {
  if (to.meta.title) document.title = to.meta.title as string
})

export default router
