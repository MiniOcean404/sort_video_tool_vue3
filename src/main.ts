import { createApp } from "vue"
import "./css/base/base.scss"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
import VConsole from "vconsole"
import { isMobile } from "@/utils/ua"

if (process.env.NODE_ENV === "development" && isMobile()) new VConsole({ theme: "dark" })

// 创建vue实例
const app = createApp(App)

app.use(router)
app.use(store)

app.mount("#app")
