import { withInstall } from "../utils/install"

import JumpCode from "./JumpCode.vue"

export const GieJumpCode = withInstall(JumpCode)

// 给 makeInstaller 使用
export default GieJumpCode

// 给 components.ts 使用
export * from "./JumpCode.vue"
export type * from "./JumpCode"
