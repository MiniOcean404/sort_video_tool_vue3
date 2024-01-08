import { createImage, getPixelPrimaryColor } from "@/demo/js/ImageSynthesis/utils.ts"
import { BlockImageInfo, MinSubImage, PixelBlockInfo, PixelImageInfo } from "./index"
import { diff } from "color-diff"

export function getBlockData(image: ImageData, width: number, height: number, GrilleSize: number) {
  const canvas = new OffscreenCanvas(width, height)

  // willReadFrequently(经常阅读) 可以使 getImageData 计算更快
  const ctx = canvas.getContext("2d", { willReadFrequently: true })

  if (!ctx) return

  ctx.putImageData(image, 0, 0)

  const blocks: PixelBlockInfo[] = []

  for (let y = 0; y < canvas.height / GrilleSize; y++) {
    for (let x = 0; x < canvas.width / GrilleSize; x++) {
      const source_x = x * GrilleSize
      const source_y = y * GrilleSize

      // 每 8*8 像素的一块区域一组
      let block_8_8 = ctx.getImageData(source_x, source_y, GrilleSize, GrilleSize).data

      const primary = getPixelPrimaryColor(block_8_8)

      // 将获取到数据每 4 个一组,每组都是一个像素
      blocks[y * (canvas.width / GrilleSize) + x] = { position: { x, y }, ...primary }
    }
  }

  return blocks
}

// 获取每张资源图的主色调
export async function getImageDate(url: string, scale: number = 1): Promise<PixelImageInfo> {
  const canvas = new OffscreenCanvas(0, 0)
  const ctx = canvas.getContext("2d")
  let res: PixelImageInfo

  await createImage(url, (img) => {
    // 越小越快,但是越小越不精确
    canvas.width = img.width * scale
    canvas.height = img.height * scale

    if (ctx) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // 获取像素数据
      let pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

      const primary = getPixelPrimaryColor(pixelData)

      res = {
        ...primary,
        url,
      }
    }
  })

  // @ts-ignore
  return res
}

// 获取图片和每个块的最小色差的图
export function getMinDiff(images: PixelImageInfo[], blocks: PixelBlockInfo[]) {
  const urls: BlockImageInfo[] = []

  const init: MinSubImage = { url: "", sub: Infinity, position: { x: 0, y: 0 } }

  blocks.forEach((block) => {
    // 对比较过的图片进行排序
    const min = images.reduce<MinSubImage>((memo, image) => {
      // @ts-ignore
      const sub = diff(block.color, image.color)
      return sub < memo.sub ? { url: image.url, sub, position: block.position } : memo
    }, init)

    // 取第 0 个图片信息
    urls.push({
      url: min.url,
      position: min.position,
    })
  })

  return urls
}

export function test() {}
