import type { DownloadProps } from "@/demo/FFmpeg"

export function download({ fileData, fileName = "", ext = "mp4" }: DownloadProps) {
  // 将输出视频文件保存到本地
  const url = URL.createObjectURL(new Blob([fileData.buffer]))
  const a = document.createElement("a")
  a.href = url
  a.download = `${fileName}.${ext}`
  a.click()
}
