import { nanoid } from "nanoid"
import { QueueImageInfo, configState } from "./config"
import { Dimension } from "./core/ImageBase"
import { Mimes } from "./utils/mimes"
import { createCompressTask, createPreviewTask } from "@/components/ImageCompress2/worker"

export async function createImageList(files: Array<File>) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    const info: QueueImageInfo = {
      key: nanoid(),
      name: file.name,
      blob: file,
      width: 0,
      height: 0,
      src: URL.createObjectURL(file),
    }

    // 由于 createImageBitmap 不支持SVG blob 我们应该通过图像获取SVG的尺寸
    if (file.type === Mimes.svg) {
      const { width, height } = await new Promise<Dimension>((resolve) => {
        const img = new Image()
        img.src = info.src
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height,
          })
        }
      })
      info.width = width
      info.height = height
    }

    configState.imageInfos.set(info.key, info)
  }

  // 开始执行任务
  for (const [_, item] of configState.imageInfos) {
    createPreviewTask(item)
    createCompressTask(item)
  }
}
