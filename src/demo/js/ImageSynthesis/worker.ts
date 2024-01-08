import { getBlockData } from "@/demo/js/ImageSynthesis/binary.ts"

self.onmessage = function (event) {
  const { imageData, width, height, GrilleSize } = event.data

  // 发送消息给主线程
  const blocks = getBlockData(imageData, width, height, GrilleSize)

  self.postMessage(blocks)
}
