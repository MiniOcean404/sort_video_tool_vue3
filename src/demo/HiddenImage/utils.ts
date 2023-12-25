import { ImageDateWithBinary } from "@/demo/HiddenImage"

export async function get_image_info(url: string, scale: number = 1): Promise<ImageDateWithBinary | undefined> {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  const image = await createImage(url)

  canvas.width = image.width * scale
  canvas.height = image.height * scale

  ctx?.scale(scale, scale)

  ctx?.drawImage(image, 0, 0, canvas.width, canvas.height)
  const imageDate = ctx?.getImageData(0, 0, canvas.width, canvas.height)

  if (imageDate && ctx) {
    // 存一个二进制的数值表示
    const binary = Array.from(imageDate.data, (color) => {
      if (!imageDate) return
      return color.toString(2).padStart(8, "0").split("")
    })

    return { imageDate, binary }
  }
}

export function createImage(url: string, cb?: (iamge: HTMLImageElement) => any): Promise<HTMLImageElement> {
  return new Promise((res) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      cb && cb(image)
      res(image)
    }
  })
}

export function chunkArray(arr: any[], size: number): any[][] {
  return arr.reduce((memo, item, index) => {
    const chunkIndex = Math.floor(index / size)
    if (!memo[chunkIndex]) memo[chunkIndex] = []
    memo[chunkIndex].push(item)
    return memo
  }, [])
}
