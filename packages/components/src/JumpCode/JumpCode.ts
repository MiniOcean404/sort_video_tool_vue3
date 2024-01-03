import JumpCode from "./JumpCode.vue"

/**
 * 定义props类型
 */
export interface JumpCodeProps {
  path: string
}

/**
 * 定义instance类型
 */
export type JumpCodeInstance = InstanceType<typeof JumpCode>
