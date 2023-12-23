import { createApp } from "vue"
import "./css/base/base.scss"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"

// 创建vue实例
const app = createApp(App)

app.use(router)
app.use(store)

app.mount("#app")
