import { createCompressTask } from "@/components/ImageCompress2/worker"
import { CompressOption, ProcessOutput } from "./core/ImageBase"

export const DefaultCompressOption: CompressOption = {
  preview: {
    maxSize: 256,
  },
  resize: {
    method: undefined,
    width: undefined,
    height: undefined,
  },
  format: {
    target: undefined,
    transparentFill: "#FFFFFF",
  },
  jpeg: {
    quality: 0.7,
  },
  png: {
    colors: 32,
    dithering: 0,
  },
  gif: {
    colors: 128,
    dithering: false,
  },
  avif: {
    quality: 50,
    speed: 8,
  },
}

export interface ProgressHintInfo {
  loadedNum: number
  totalNum: number
  percent: number
  originSize: number
  outputSize: number
  rate: number
}

export type ImageInfo = {
  key: string
  name: string
  blob: Blob
  src: string
  width: number
  height: number
  preview?: ProcessOutput
  compress?: ProcessOutput
}

export class ConfigState {
  public imageInfos: Map<string, ImageInfo> = new Map()
  public option: CompressOption = DefaultCompressOption
  public tempOption: CompressOption = DefaultCompressOption
  public compareId: number | null = null
  public showOption: boolean = false

  reCompress() {
    this.imageInfos.forEach((info) => {
      URL.revokeObjectURL(info.compress!.src)
      info.compress = undefined
      createCompressTask(info)
    })
  }

  hasTaskRunning() {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    for (const [_, value] of this.imageInfos) {
      if (!value.preview || !value.compress) {
        return true
      }
    }
    return false
  }

  /**
   * 获取进度条信息
   * @returns
   */
  getProgressHintInfo(): ProgressHintInfo {
    const totalNum = this.imageInfos.size
    let loadedNum = 0
    let originSize = 0
    let outputSize = 0
    /* eslint-disable @typescript-eslint/no-unused-vars */
    for (const [_, info] of this.imageInfos) {
      originSize += info.blob.size
      if (info.compress) {
        loadedNum++
        outputSize += info.compress.blob.size
      }
    }
    const percent = Math.ceil((loadedNum * 100) / totalNum)
    const originRate = ((outputSize - originSize) * 100) / originSize
    const rate = Number(Math.abs(originRate).toFixed(2))

    return {
      totalNum,
      loadedNum,
      originSize,
      outputSize,
      percent,
      rate,
    }
  }
}

export const configState = new ConfigState()
