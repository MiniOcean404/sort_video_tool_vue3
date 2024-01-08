import { fetchFile } from "@ffmpeg/util"
import FFmpegCommand from "@/demo/js/FFmpeg/ffmpeg-utils/command.ts"
import { download } from "@/demo/js/FFmpeg/utils/download"
import { FFmpeg } from "@ffmpeg/ffmpeg"

export async function convert(ffmpeg: FFmpeg) {
  await ffmpeg.writeFile("/video/convert.webm", await fetchFile("https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm"))

  await FFmpegCommand.convert("/video/convert", "webm", "mp4")
  const data = (await ffmpeg.readFile("/video/convert.mp4")) as Uint8Array
  download({ fileData: data, fileName: "video", ext: "mp4" })
}
