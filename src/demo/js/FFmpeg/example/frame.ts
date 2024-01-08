import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile } from "@ffmpeg/util"
import FFmpegCommand from "@/demo/js/FFmpeg/ffmpeg-utils/command.ts"
import { download } from "@/demo/js/FFmpeg/utils/download.ts"
import video from "@/assets/video/davinci_web_all.webm"

export async function video_get_frame(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))

  await FFmpegCommand.video_get_frame("video", "/video/convert.webm", "/video/pic-%d.jpg", 30, 30, 30)

  const data = (await ffmpeg.readFile("/video/pic-1.jpg")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "jpg" })
}

export async function get_time_position_frame(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))

  await FFmpegCommand.get_time_position_frame("/video/convert.webm", "/video/pic-1.jpg", 0.2, 600, 600, 30)
  const data = (await ffmpeg.readFile("/video/pic-1.jpg")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "jpg" })
}

export async function get_frames(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))

  await FFmpegCommand.get_frames("/video/convert.webm", "/video/pic-%d.jpg", 30, 2, 600, 600)

  const data = (await ffmpeg.readFile("/video/pic-1.jpg")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "jpg" })
}
