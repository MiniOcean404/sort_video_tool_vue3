import { ImageDateWithBinary } from "@/demo/HiddenImage"

// 获取原始展示的画布像素数据，并将 2 进制最低位变为 0
export function convert_binary_end_zero(data: ImageDateWithBinary) {
  // 将数字化为非奇数
  function evenNum(num: number) {
    num = num > 254 ? num - 1 : num
    num = num % 2 == 1 ? num - 1 : num

    return num
  }

  // 将画布 2 进制最低位变为 0
  if (data.imageDate?.data) {
    data.binary = Array.from(data.imageDate?.data).map((color, index, arr) => {
      const to = evenNum(color)
      arr[index] = to
      return to.toString(2).padStart(8, "0").split("")
    })
  }
}

// 将隐写的资源图片数据存到目标图片的二进制最低位中
export function drawHiddenData(hiddenData: ImageDateWithBinary, targetData: ImageDateWithBinary, width: number, height: number): string {
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
