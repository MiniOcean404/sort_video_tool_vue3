import { withInstall } from "../utils/install"

import Input from "./Input.vue"

export const GieInput = withInstall(Input)

// 给 makeInstaller 使用
export default GieInput

// 给 components.ts 使用
export * from "./Input.vue"
export * from "./Input.d"
