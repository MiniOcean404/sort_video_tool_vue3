import { createApp } from "vue"
import "./css/base/base.scss"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
import VConsole from "vconsole"

if (process.env.NODE_ENV === "development") new VConsole()

// 创建vue实例
const app = createApp(App)

app.use(router)
app.use(store)

app.mount("#app")
