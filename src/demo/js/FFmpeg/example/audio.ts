import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile } from "@ffmpeg/util"
import FFmpegCommand from "@/demo/js/FFmpeg/ffmpeg-utils/command.ts"
import { download } from "@/demo/js/FFmpeg/utils/download.ts"
import video from "@/assets/video/davinci_web_all.webm"

export async function get_audio_or_video_wave(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))

  await FFmpegCommand.get_audio_or_video_wave("/video/convert.webm", "/video/pic-%d.jpg", 300, 32)

  const data = (await ffmpeg.readFile("/video/pic-1.jpg")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "jpg" })
}
