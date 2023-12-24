import { FFmpeg } from "@ffmpeg/ffmpeg"
import FFmpegIns from "./ins.ts"

import { toBlobURL } from "@ffmpeg/util"
import ffmpegCore from "@ffmpeg/core?url"
import ffmpegCoreWasm from "@ffmpeg/core/wasm?url"
import ffmpegWorker from "@ffmpeg/core-mt?url"

class FFmpegTool {
  public ins: FFmpeg = FFmpegIns.ins

  constructor() {}

  public useLog() {
    this.ins?.on("log", ({ message }) => console.log("ffmpeg:", "\t", message))
    this.ins?.on("progress", ({ progress, time }) => console.log((progress * 100).toFixed(1), time))
  }

  public async load() {
    await this.ins?.load({
      coreURL: await toBlobURL(ffmpegCore, "text/javascript"),
      wasmURL: await toBlobURL(ffmpegCoreWasm, "application/wasm"),
      workerURL: await toBlobURL(ffmpegWorker, "text/javascript"),
    })
  }

  async showDir(path: string) {
    const list = await this.ins.listDir(path)
    console.log(list)
  }
}

export default new FFmpegTool()
