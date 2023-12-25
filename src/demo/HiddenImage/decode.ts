import { ImageDateWithBinary } from "@/demo/HiddenImage"

// 解析图片
export function decodeImage(decodeDate: ImageDateWithBinary) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  const width = 273
  const height = 273

  canvas.width = width
  canvas.height = height

  let decryptImageData: string[][] = []

  if (decodeDate.binary) {
    for (let group = 0; group < decodeDate.binary.length / 8; group++) {
      let tempColorData = []
      for (let bit = 0; bit < 8; bit++) {
        tempColorData.push(decodeDate.binary[group * 8 + bit][7])
      }

      if (decryptImageData.length < width * height * 4) {
        decryptImageData.push([...tempColorData])
      }
    }

    // 将二进制数据转化为 10 进制
    let data = Uint8ClampedArray.from(decryptImageData, (z) => parseInt(z.join(""), 2))

    // putImageData 的第一个参数 data 的长度必须为两个边的乘积的4的倍数 否则就会报错
    const putData = new ImageData(data, width, height)

    ctx?.putImageData(putData, 0, 0)
    document.body.appendChild(canvas)
  }
}
