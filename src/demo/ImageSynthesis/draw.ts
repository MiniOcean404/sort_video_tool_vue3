import { fabric } from "fabric"
import { createImage } from "html-to-image/es/util"
import { BlockImageInfo } from "./index.d"

// 初始化画布
export async function initCanvas(url: string) {
  const image = await createImage(url)

  return new fabric.Canvas("canvas", {
    interactive: false,
    selection: false,
    hoverCursor: "pointer",
    width: image.width,
    height: image.height,
  })
}

// 绘制主图片
export function drawMainImage(url: string, canvas: fabric.Canvas): Promise<void> {
  return new Promise((resolve) => {
    if (!canvas) return

    fabric.Image.fromURL(url, (img) => {
      img.set({
        // top: canvas.width > canvas.height ? -canvas.height / 2 : 0,
        // left: canvas.width > canvas.height ? 0 : canvas.width / 2,
        // originX: "center", // 图片以 x 轴的那个位置和 canvas 左上角对齐
        // originY: "center", // 图片以 y 轴的那个位置和 canvas 左上角对齐
        // scaleX: 缩放
        selectable: false, //可交互
      })

      // 图片添加到画布的回调函数
      img.on("added", () => {
        setTimeout(() => {
          resolve()
        }, 500)
      })

      canvas.add(img) //将图片添加到画布
    })
  })
}

// 栅格线
export function drawLine(canvas: fabric.Canvas, GrilleSize: number, lineWidth: number = 1) {
  if (!canvas || !canvas.width || !canvas.height) return

  for (let i = 0; i <= canvas.width / GrilleSize; i++) {
    const num = i * GrilleSize

    // 竖线
    canvas.add(
      new fabric.Line([num, 0, num, canvas.height], {
        left: num,
        stroke: "gray",
        strokeWidth: lineWidth,
        selectable: false, //是否可被选中
      }),
    )
  }

  // 横线
  for (let i = 0; i <= canvas.height / GrilleSize; i++) {
    const num = i * GrilleSize

    canvas.add(
      new fabric.Line([0, num, canvas.width, num], {
        top: num,
        stroke: "gray",
        strokeWidth: lineWidth,
        selectable: false, //是否可被选中
      }),
    )
  }
}

// 生成图片
export function generateImg(canvas: fabric.Canvas, urls: BlockImageInfo[], GrilleSize: number) {
  if (!canvas) return

  //便利每一个方块,对其渲染
  urls.forEach((item) => {
    fabric.Image.fromURL(item.url, (img) => {
      if (img.width && img.height) {
        let scale = img.height > img.width ? GrilleSize / img.width : GrilleSize / img.height

        img.set({
          left: item.position.x * GrilleSize,
          top: item.position.y * GrilleSize,
          originX: "center",
          scaleX: scale,
          scaleY: scale,
        })
        canvas.add(img)
      }
    })
  })
}
