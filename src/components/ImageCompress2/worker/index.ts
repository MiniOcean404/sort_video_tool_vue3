import WorkerC from "./WorkerCompress?worker"
import WorkerP from "./WorkerPreview?worker"

import { configState, type QueueImageInfo } from "../config"
import { OutputMessageData, type MessageData } from "../utils/convert"
import { Mimes } from "../utils/mimes"
import { AvifImage } from "../core/avif/AvifImage"

let workerC: Worker | null = null
let workerP: Worker | null = null

export function useWorkerHandler() {
  workerC = new WorkerC()
  workerP = new WorkerP()
  workerC.addEventListener("message", message)
  workerP.addEventListener("message", message)
}

export function removeWorkerHandler() {
  workerC!.removeEventListener("message", message)
  workerP!.removeEventListener("message", message)
  workerC!.terminate()
  workerP!.terminate()
  workerC = null
  workerP = null
}

async function message(event: MessageEvent<OutputMessageData>) {
  let item = configState.imageInfos.get(event.data.key)
  if (item) {
    item.width = event.data.width
    item.height = event.data.height
    item.compress = event.data.compress ?? item.compress
    item.preview = event.data.preview ?? item.preview

    if (item.blob.type === Mimes.svg && event.data.compress && configState.option.format.target) {
      item = await svgConvert(item)
    }

    console.log(item)
    configState.imageInfos.set(item.key, item)
  }
}

// SVG 不能在 worker 中转换，所以我们在这里进行转换
async function svgConvert(item: QueueImageInfo) {
  if (configState.option.format.target) {
    // 目标格式
    const target = configState.option.format.target.toLowerCase()

    // jpeg 背景透明填充
    const canvas = document.createElement("canvas")
    canvas.width = item.width
    canvas.height = item.height
    const context = canvas.getContext("2d")!
    if (["jpg", "jpeg"].includes(target)) {
      context.fillStyle = configState.option.format.transparentFill
      context.fillRect(0, 0, item.width, item.height)
    }

    // 绘画 svg 到 canvas
    const svg = await new Promise<HTMLImageElement>((resolve) => {
      const img = new Image()
      img.src = item.compress!.src
      img.onload = () => resolve(img)
    })
    context.drawImage(svg, 0, 0, item.width, item.height, 0, 0, item.width, item.height)

    // Convert svg to target type
    let blob: Blob
    if (target === "avif") {
      blob = await AvifImage.encode(
        context,
        item.width,
        item.height,
        configState.option.avif.quality,
        configState.option.avif.speed,
      )
    } else {
      blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (result) => {
            resolve(result!)
          },
          Mimes[target],
          1,
        )
      })
    }
    item.compress!.blob = blob
    item.compress!.src = URL.createObjectURL(blob)

    return item
  }

  return item
}

export function createCompressTask(item: QueueImageInfo) {
  workerC?.postMessage(createMessageData(item))
}

export function createPreviewTask(item: QueueImageInfo) {
  workerP?.postMessage(createMessageData(item))
}

export function createMessageData(item: QueueImageInfo): MessageData {
  return {
    info: {
      key: item.key,
      name: item.name,
      blob: item.blob,
      width: item.width,
      height: item.height,
    },
    option: configState.option,
  }
}
