import { ImageDateWithBinary } from "@/demo/HiddenImage"

// 将隐写的资源图片数据存到目标图片的二进制最低位中
export function write_hidden_to_origin(hiddenData: ImageDateWithBinary, targetData: ImageDateWithBinary, width: number, height: number): string {
  // 将隐藏的数据的二进制全部放到一个数组里面，并且展开
  let hiddenFlat: any = hiddenData.binary?.flat(1)

  // 将隐藏的数据写入到 二进制的第八位
  targetData.binary?.forEach((item, index) => hiddenFlat[index] && (item[item.length - 1] = hiddenFlat[index]))

  // 将二进制数据转为 10 进制写入 原始图片数据中
  targetData.imageDate?.data.forEach((_, index, arr) => {
    if (!targetData.imageDate || !targetData.binary) return
    arr[index] = parseInt(targetData.binary[index].join(""), 2)
  })

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  targetData.imageDate && ctx?.putImageData(targetData.imageDate, 0, 0)

  const image = new Image()
  image.src = canvas.toDataURL("image/png")
  image.onload = () => {
    document.body.appendChild(image)
  }

  console.log("加密成功")

  return canvas.toDataURL("image/png")
}
