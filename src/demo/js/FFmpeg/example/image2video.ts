import type { DrawProps } from "@/demo/js/FFmpeg"
import { fetchFile } from "@ffmpeg/util"
import FFmpegCommand from "@/demo/js/FFmpeg/ffmpeg-utils/command.ts"
import { download } from "@/demo/js/FFmpeg/utils/download.ts"
import { FFmpeg } from "@ffmpeg/ffmpeg"

export async function play(e: Event, canvasRef: HTMLCanvasElement | null, ffmpeg: FFmpeg) {
  if (canvasRef === null) return

  const video = e.target as HTMLVideoElement
  const ctx = canvasRef.getContext("2d")

  if (ctx) await draw({ ctx, videoDom: video, canvas: canvasRef, ffmpeg })
}

export async function pause(ffmpeg: FFmpeg) {
  // 运行 ffmpeg 命令来将图片合并为视频
  await FFmpegCommand.image2video(30, "/image/input%d.png", "/video/output.mp4")

  // 读取输出文件
  const data = (await ffmpeg.readFile("/video/output.mp4")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "mp4" })
}

let index = 0

async function draw(p: DrawProps) {
  const { videoDom, ctx, canvas, ffmpeg } = p

  if (ctx && !videoDom.paused && !videoDom.ended) {
    ctx.drawImage(videoDom, 0, 0, 640, 360)

    index++
    // 写入输入文件
    await ffmpeg.writeFile(`/image/input${index}.png`, await fetchFile(canvas.toDataURL("image/png", 1)))
  }

  window.requestAnimationFrame(draw.bind(null, p))
}
