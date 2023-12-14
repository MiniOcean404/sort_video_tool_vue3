import { routes } from "@/router/dynRoute"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
