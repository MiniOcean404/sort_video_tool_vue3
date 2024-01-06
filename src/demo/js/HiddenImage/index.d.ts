// export type ImageDateWithBinary = (ImageData & { binary?: any[] }) | undefined
export interface ImageDateWithBinary {
  imageDate: ImageData
  binary: any[]
  // canvas: HTMLCanvasElement
  // ctx: CanvasRenderingContext2D
}
