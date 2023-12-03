import { createApp } from "vue";
import "./css/base/base.scss";
import App from "./App.vue";
import router from "@/router";

// 创建vue实例
const app = createApp(App);

app.use(router);
app.mount("#app");
