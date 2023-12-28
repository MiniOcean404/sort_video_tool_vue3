<template>
  <el-upload ref="uploadRef" :on-change="handleExceed" :auto-upload="false" multiple :show-file-list="false" accept="image/*">
    <template #trigger>
      <el-button type="primary">选择图片</el-button>
    </template>
  </el-upload>

  <el-button type="primary" @click="handleDraw">开始绘制</el-button>

  <div class="box">
    <canvas id="canvas" width="800" height="400"></canvas>
  </div>
</template>

<script setup lang="ts">
import { fabric } from "fabric"
import type { UploadInstance, UploadProps } from "element-plus"
import { onMounted, ref } from "vue"
import { PixelBlockInfos } from "@/demo/ImageSynthesis"

const uploadRef = ref<UploadInstance>()
const urls = ref<string[]>([])
const fCanvas = ref<fabric.Canvas>()

onMounted(() => {
  initCanvas()
})

const handleExceed: UploadProps["onChange"] = (file) => {
  uploadRef.value!.clearFiles()

  if (file.raw) {
    urls.value.push(URL.createObjectURL(file.raw))
  }
}

//初始化画布
function initCanvas() {
  const canvas = new fabric.Canvas("canvas", {
    interactive: false,
    selection: false,
    hoverCursor: "pointer",
  })

  fCanvas.value = canvas
}

function handleDraw() {
  urls.value.forEach((url) => {
    drawImage(url)
  })
}

// 绘制图片
function drawImage(url: string) {
  fabric.Image.fromURL(url, (img) => {
    if (img.height && img.width && fCanvas.value?.width && fCanvas.value.height) {
      let scale = fCanvas.value.width > fCanvas.value.height ? fCanvas.value.width / img.width : fCanvas.value.height / img.height

      img.set({
        // top: fCanvas.value.width > fCanvas.value.height ? -fCanvas.value.height / 2 : 0,
        // left: fCanvas.value.width > fCanvas.value.height ? 0 : fCanvas.value.width / 2,
        // originX: "center", // 图片以 x 轴的那个位置和 canvas 左上角对齐
        // originY: "center", // 图片以 y 轴的那个位置和 canvas 左上角对齐
        scaleX: scale, // 横向缩放
        scaleY: scale, // 纵向缩放
        selectable: false, //可交互
      })

      // 图片添加到画布的回调函数
      img.on("added", () => {
        setTimeout(() => {
          getCanvasData()
        }, 500)
      })

      fCanvas.value.add(img) //将图片添加到画布
      drawLine() //绘制网格线条
    }
  })
}

// 栅格线
function drawLine() {
  const canvas = fCanvas.value
  if (!canvas || !canvas.width || !canvas.height) return

  const lineGap = 4
  for (let i = 0; i <= canvas.width / lineGap; i++) {
    // 竖线
    canvas.add(
      new fabric.Line([i * lineGap, 0, i * lineGap, canvas.height], {
        left: i * lineGap,
        stroke: "gray",
        selectable: false, //是否可被选中
      }),
    )
  }

  // 横线
  for (let i = 0; i <= canvas.height / lineGap; i++) {
    canvas.add(
      new fabric.Line([0, i * lineGap, canvas.width, i * lineGap], {
        top: i * lineGap,
        stroke: "gray",
        selectable: false, //是否可被选中
      }),
    )
  }
}

//获取画布像素数据
function getCanvasData() {
  const canvas = fCanvas.value
  const ctx = canvas?.getContext()
  const blocks: PixelBlockInfos = []

  if (!canvas || !canvas.width || !canvas.height || !ctx) return

  for (let y = 0; y < canvas.height / 8; y++) {
    for (let x = 0; x < canvas.width / 8; x++) {
      // 每 8*8 像素的一块区域一组
      let block_8_8 = ctx.getImageData(x * 8, y * 8, 8, 8).data

      // 将获取到数据每 4 个一组,每组都是一个像素
      blocks[y * (canvas.width / 8) + x] = { position: [x, y], color: [] }

      // 设置每个像素块的 RGBA
      for (let i = 0; i < block_8_8.length; i += 4) {
        blocks[y * 100 + x].color.push([block_8_8[i], block_8_8[i + 1], block_8_8[i + 2], block_8_8[i + 3]])
      }
    }
  }

  // console.log(getMainColor(blocks))
  getMainColor(blocks)
}

// 获取每个格子的主色调
function getMainColor(blocks: PixelBlockInfos) {
  console.log(blocks)

  const blockMainColors = []

  blocks.forEach((block) => {
    let colorList: any[] = []

    block.color.forEach((rgba) => {
      const key = rgba.toString()

      if (key in colorList) {
        ++colorList[key]
      } else {
        colorList[key] = 1
      }
    })

    console.log(colorList)

    let arr = []
    for (let prop in colorList) {
      arr.push({
        // 如果只获取rgb,则为`rgb(${prop})`
        color: prop.split(","),
        // color: `rgba(${prop})`,
        count: colorList[prop],
      })
    }

    // 数组排序
    arr.sort((a, b) => {
      return b.count - a.count
    })

    arr[0].position = block.position
    blockMainColors.push(arr[0])
  })
}

// 获取每张资源图的主色调
function getMostColor(imgUrl) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas")
      //设置canvas的宽高都为20,越小越快,但是越小越不精确
      canvas.width = 20
      canvas.height = 20
      const img = new Image() // 创建img元素
      img.src = imgUrl // 设置图片源地址
      img.onload = () => {
        const ctx = canvas.getContext("2d")
        const scaleH = canvas.height / img.height
        img.height = canvas.height
        img.width = img.width * scaleH
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          console.log(img.width, img.height)
          // 获取像素数据
          let pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
          let colorList = []
          let color = []
          let colorKey = ""
          let colorArr = []
          // 分组循环
          for (let i = 0; i < pixelData.length; i += 4) {
            color[0] = pixelData[i]
            color[1] = pixelData[i + 1]
            color[2] = pixelData[i + 2]
            color[3] = pixelData[i + 3]
            colorKey = color.join(",")
            if (colorKey in colorList) {
              ++colorList[colorKey]
            } else {
              colorList[colorKey] = 1
            }
          }
          for (let prop in colorList) {
            colorArr.push({
              color: prop.split(","),
              count: colorList[prop],
            })
          }
          // 对所有颜色数组排序,取第一个为主色调
          colorArr.sort((a, b) => {
            return b.count - a.count
          })
          colorArr[0].url = imgUrl
          console.log(`%c rgba(${colorArr[0].color.join(",")})`, `background: rgba(${colorArr[0].color.join(",")})`)
          resolve(colorArr[0])
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}
</script>

<style scoped lang="scss"></style>
