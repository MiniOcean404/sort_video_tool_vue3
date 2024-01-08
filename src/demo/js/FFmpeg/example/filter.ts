import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile } from "@ffmpeg/util"
import FFmpegCommand from "@/demo/js/FFmpeg/ffmpeg-utils/command.ts"
import { download } from "@/demo/js/FFmpeg/utils/download.ts"
import video from "@/assets/video/davinci_web_all.webm"
import font from "@/assets/font/MiSans/MiSans VF.ttf"
import image from "@/assets/image/time-icon.png"

export async function filter_cover_watermark(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))

  await FFmpegCommand.filter_cover_watermark("/video/convert.webm", "/video/convert.mp4", 240, 120, 1, 1)

  const data = (await ffmpeg.readFile("/video/convert.mp4")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "mp4" })
}

export async function filter_image_watermark(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))
  await ffmpeg.writeFile("/image/time.png", await fetchFile(image))

  await FFmpegCommand.filter_image_watermark("/video/convert.webm", "/image/time.png", "/video/convert.mp4", 120, 30, 0, 3)

  const data = (await ffmpeg.readFile("/video/convert.mp4")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "mp4" })
}

export async function add_text_filter(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))
  await ffmpeg.writeFile("/font/MiSans VF.ttf", await fetchFile(font))

  await FFmpegCommand.add_text_filter("/video/convert.webm", "/video/convert.mp4", "/font/MiSans VF.ttf", 40, "white", "你好", 100, 30)

  const data = (await ffmpeg.readFile("/video/convert.mp4")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "mp4" })
}
