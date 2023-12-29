import { PrimaryColorInfo } from "./index.d"

export function getPixelPrimaryColor(pixels: Uint8ClampedArray): PrimaryColorInfo {
  const colorsCount: { [key: string]: number } = {}

  for (let i = 0; i < pixels.length / 4; i++) {
    const group = i * 4

    if (pixels[group] !== undefined) {
      const R = pixels[group]
      const G = pixels[group + 1]
      const B = pixels[group + 2]
      const A = pixels[group + 3]

      const color = `${R},${G},${B},${A}`

      if (colorsCount[color]) ++colorsCount[color]
      else colorsCount[color] = 1
    }
  }

  let maxCount = Math.max(...Object.values(colorsCount))
  let maxColor = Object.keys(colorsCount).filter((key) => colorsCount[key] === maxCount)[0]

  // console.log(`主要颜色: %c rgba(${maxColor})`, `background: rgba(${maxColor})`)

  const colorArr = maxColor.split(",")

  const color = {
    R: Number(colorArr[0]),
    G: Number(colorArr[1]),
    B: Number(colorArr[2]),
    A: Number(colorArr[3]),
  }

  return {
    color,
    count: maxCount,
  }
}

export function createImage(url: string, cb?: (image: HTMLImageElement) => any): Promise<HTMLImageElement> {
  return new Promise((res) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      cb && cb(image)
      res(image)
    }
  })
}
