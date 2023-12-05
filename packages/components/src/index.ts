import { makeInstaller } from "./utils/install"
import installs from "./install"

export * from "./components"

// makeInstaller 实际上也是一个vue插件，他将组件插件循环进行安装
export default makeInstaller([...installs])
