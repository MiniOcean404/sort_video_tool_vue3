import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile } from "@ffmpeg/util"
import FFmpegCommand from "@/demo/FFmpeg/ffmpeg-utils/command.ts"
import { download } from "@/demo/FFmpeg/utils/download.ts"
import video from "@/assets/video/davinci_web_all.webm"
import audio from "@/assets/audio/davinci_web.aac"

export async function split_video_audio(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))

  await FFmpegCommand.split_video_audio("audio", "/video/convert.webm", "/video/convert.aac")

  const data = (await ffmpeg.readFile("/video/convert.aac")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "aac" })
}

export async function merge_video_audio(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))
  await ffmpeg.writeFile("/video/audio.aac", await fetchFile(audio))

  await FFmpegCommand.merge_video_audio("/video/convert.webm", "/video/audio.aac", "/video/convert.mp4", [
    {
      type: "video",
      start: "1.00",
      end: "3.00",
      delay: 0,
    },
    {
      type: "audio",
      start: "0.00",
      end: "12.00",
      delay: 1500,
    },
  ])

  const data = (await ffmpeg.readFile("/video/convert.mp4")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "mp4" })
}
