import { UAParser } from "ua-parser-js"

const { device } = UAParser(navigator.userAgent)

export function isMobile() {
  return device.type === "mobile"
}
