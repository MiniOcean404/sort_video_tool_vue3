<template>
  <div id="macbook-box">
    <canvas id="canvas" width="308" height="308"></canvas>
    <canvas id="canvas-max" width="308" height="308"></canvas>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap"
import { nanoid } from "nanoid"

interface Images {
  [key: number]: HTMLImageElement
}

let ctx_pro: null | CanvasRenderingContext2D
let ctx_max: null | CanvasRenderingContext2D

const sources: Images = {}
const sourcesMax: Images = {}

const IMAGE_TOTAL_NUM = 52
const FPS = 2
const DISTANCE_FRAME = 10

onMounted(() => {
  // 参考：滚动条控制播放的canvas逐帧动画
  // https://www.cnblogs.com/acttan/p/16334229.html

  const id = nanoid()

  loadImages()

  const distance = IMAGE_TOTAL_NUM * FPS * DISTANCE_FRAME
  const total_frame = IMAGE_TOTAL_NUM * FPS

  gsap.to("#macbook-box", {
    force3D: true,

    scrollTrigger: {
      id,
      scroller: document.querySelector(".container"),
      trigger: "#macbook-box",
      fastScrollEnd: 2000,
      start: "top 15px",
      end: `+=${distance}`,
      scrub: true,
      //   markers: true,
      pin: true,
      pinType: "fixed", // 固定时候的滚动的类型
      onUpdate: (self) => {
        // 获取当前滚动位置
        const scrollY = self.progress * distance

        // 计算当前是第几帧
        let targetFrame = Math.floor(scrollY / DISTANCE_FRAME)

        // 限制 targetFrame 在合法范围内
        targetFrame = Math.min(total_frame, Math.max(0, targetFrame))

        // 计算当前帧对应的时间
        const targetTime = (targetFrame / total_frame) * IMAGE_TOTAL_NUM

        // 更新视频的当前时间
        if (!isNaN(targetTime) && isFinite(targetTime)) {
          renderCanvas(Math.round(targetTime))
        }
      },
    },
  })
})

async function loadImages() {
  const canvas_pro = document.querySelector("#canvas") as HTMLCanvasElement
  const canvas_max = document.querySelector("#canvas-max") as HTMLCanvasElement

  ctx_pro = canvas_pro.getContext("2d")!
  ctx_max = canvas_max.getContext("2d")!

  for (let i = 0; i <= IMAGE_TOTAL_NUM; i++) {
    let n = i < 10 ? `0${i}` : `${i}`

    const res = await promiseLoadImage([
      new URL(`./images/m2_pro/medium_00${n}.jpg`, import.meta.url).href,
      new URL(`./images/m2_max/medium_00${n}.jpg`, import.meta.url).href,
    ])

    sources[i] = res[0]
    sourcesMax[i] = res[1]

    if (i === 0) renderCanvas(i)
  }
}

async function promiseLoadImage(srcs: string[]) {
  const load_one_image = (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        resolve(img)
      }
      img.onerror = (e) => {
        reject(e)
      }
    })
  }

  const images = srcs.map<Promise<HTMLImageElement>>((src) => load_one_image(src))
  return await Promise.all(images)
}

function renderCanvas(index: number) {
  if (sources[index] && sourcesMax[index] && ctx_pro && ctx_max) {
    const width = ctx_pro.canvas.width
    const height = ctx_pro.canvas.height

    ctx_pro.clearRect(0, 0, width, height)
    ctx_pro.drawImage(sources[index], 0, 0)
    ctx_max.clearRect(0, 0, width, height)
    ctx_max.drawImage(sourcesMax[index], 0, 0)
  }
}
</script>

<style lang="scss" scoped>
#macbook-box {
  left: 0;
  top: 0;
  z-index: -1;
  transform: translate3d(0px, 0px, 0px);
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5%;
  background-image: url("./images/m2_bg__e4dkdscoyaaa_medium.jpeg");
}

#macbook-box canvas {
  margin-bottom: 20px;
}
</style>
