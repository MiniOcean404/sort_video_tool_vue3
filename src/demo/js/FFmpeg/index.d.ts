import { FFmpeg } from "@ffmpeg/ffmpeg"

export interface DownloadProps {
  fileData: Uint8Array
  fileName: string
  ext?: string
}

export interface DrawProps {
  videoDom: HTMLVideoElement
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  ffmpeg: FFmpeg
}
