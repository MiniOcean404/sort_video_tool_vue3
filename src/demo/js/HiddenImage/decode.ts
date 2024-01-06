import { ImageDateWithBinary } from "@/demo/HiddenImage"
import { chunkArray } from "@/demo/HiddenImage/utils"

// 解析图片
export function decodeImage(decodeData: ImageDateWithBinary, width: number, height: number) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = width
  canvas.height = height

  let decryptImageData: string[][] = []

  if (decodeData.binary) {
    const rgbGroup = chunkArray(decodeData.binary, 8)

    rgbGroup.map((rgb) => {
      rgb = rgb.map((binary) => binary[binary.length - 1])
      if (decryptImageData.length < width * height * 4) decryptImageData.push([...rgb])
    })

    // 将二进制数据转化为 10 进制
    let data = Uint8ClampedArray.from(decryptImageData, (binary) => parseInt(binary.join(""), 10))

    // putImageData 的第一个参数 data 的长度必须为两个边的乘积的4的倍数 否则就会报错
    const putData = new ImageData(data, width, height)

    ctx?.putImageData(putData, 0, 0)
    document.body.appendChild(canvas)
  }
}
