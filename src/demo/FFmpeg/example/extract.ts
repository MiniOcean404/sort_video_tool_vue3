import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile } from "@ffmpeg/util"

import FFmpegCommand from "@/demo/FFmpeg/ffmpeg-utils/command.ts"
import tool from "@/demo/FFmpeg/ffmpeg-utils/tool.ts"
import { download } from "@/demo/FFmpeg/utils/download.ts"

export async function extract(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile("https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm"))

  await FFmpegCommand.extract("/video/convert.webm", "/video/convert.mp3", 0, 1)

  tool.logDir("/video")

  const data = (await ffmpeg.readFile("/video/convert.mp4")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "mp4" })
}
