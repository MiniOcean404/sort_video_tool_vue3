import { createApp } from "vue"
import "./css/base/base.scss"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
import { isMobile } from "@/utils/ua"
import eruda from "eruda"

if (process.env.NODE_ENV === "development" && isMobile()) eruda.init({ defaults: { theme: "Monokai Pro", displaySize: 50 } })

// 创建vue实例
const app = createApp(App)

app.use(router)
app.use(store)

app.mount("#app")
