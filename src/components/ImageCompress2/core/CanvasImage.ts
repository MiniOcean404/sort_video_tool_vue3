import { ImageBase, type ProcessOutput } from "@/components/ImageCompress2/core/ImageBase"

/**
 * JPEG/JPG/WEBP is compatible
 */
export class CanvasImage extends ImageBase {
  async compress(): Promise<ProcessOutput> {
    const dimension = this.getOutputDimension()
    const blob = await this.createBlob(dimension.width, dimension.height, this.option.jpeg.quality)
    return {
      ...dimension,
      blob,
      src: URL.createObjectURL(blob),
    }
  }
}
