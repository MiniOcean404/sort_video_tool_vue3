import WorkerC from "./WorkerCompress?worker"
import WorkerP from "./WorkerPreview?worker"

import { configState, type ImageInfo } from "../config"
import { OutputMessageData, type MessageData } from "../utils/convert"
import { Mimes } from "../utils/mimes"
import { AvifImage } from "../core/avif/AvifImage"
import type { ImageInfo } from "@/components/ImageCompress2/core/ImageBase"

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

export function createMessageData(item: ImageInfo): MessageData {
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

export function createCompressTask(item: ImageInfo) {
  workerC?.postMessage(createMessageData(item))
}

export function createPreviewTask(item: ImageInfo) {
  workerP?.postMessage(createMessageData(item))
}

async function message(event: MessageEvent<OutputMessageData>) {
  const value = configState.imageInfos.get(event.data.key)
  if (value) {
    const item = value
    item.width = event.data.width
    item.height = event.data.height
    item.compress = event.data.compress ?? item.compress
    item.preview = event.data.preview ?? item.preview

    // SVG can't convert in worker，so we do converting here
    if (item.blob.type === Mimes.svg && event.data.compress && configState.option.format.target) {
      const target = configState.option.format.target.toLowerCase()
      const canvas = document.createElement("canvas")
      canvas.width = item.width
      canvas.height = item.height
      const context = canvas.getContext("2d")!
      if (["jpg", "jpeg"].includes(target)) {
        context.fillStyle = configState.option.format.transparentFill
        context.fillRect(0, 0, item.width, item.height)
      }
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
    }

    configState.imageInfos.set(item.key, item)
  }
}
