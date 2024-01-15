<script lang="ts" setup>
import { PoseDetector } from "@tensorflow-models/pose-detection"
import * as poseDetection from "@tensorflow-models/pose-detection"
import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-backend-webgl"
import "@tensorflow/tfjs-backend-webgpu"

let loading = ref(false)
let input: HTMLVideoElement | HTMLImageElement
let output: HTMLCanvasElement
let outputCtx: CanvasRenderingContext2D
let detector: PoseDetector
let model: poseDetection.SupportedModels.PoseNet
// const model = poseDetection.SupportedModels.MoveNet

onMounted(async () => {
  await tf.setBackend("webgl")
  await initMedia()
  await initModel()
})

async function initMedia() {
  // 获取 canvas 元素
  output = document.getElementById("canvas") as HTMLCanvasElement
  outputCtx = output.getContext("2d")!

  // 获取视频流
  input = document.getElementById("video") as HTMLVideoElement
  input.srcObject = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  })
}

async function initModel() {
  loading.value = true

  model = poseDetection.SupportedModels.PoseNet
  // 加载模型
  // 有三种模型的类型可供选择：”lite”、”full “和 “heavy”。这些改变了检测模型的大小。
  // lite 的检测精度最低，但性能最好，而 "heavy" 的检测精度最好，但更消耗性能，而 "full" 则处于中间位置。我们选择了它 。
  detector = await poseDetection.createDetector(model, { modelType: "full" })

  loading.value = false
  await detectPose()
}

// 开始检测
async function detectPose() {
  // 从干净的图像中获取姿势位置
  const poses = await detector.estimatePoses(input, {
    flipHorizontal: false, // 是否水平翻转
    maxPoses: 1, // 最大检测人数
    scoreThreshold: 0.5, // 置信度
    nmsRadius: 20, // 非极大值抑制
  })

  // 将视频画在 canvas 中
  outputCtx.drawImage(input, 0, 0, output.width, output.height)

  // 将 pose 上的 17 个关键点的坐标信息存入 pointList
  // 因为我们设置最多只检测一个人，所以检测到的结果是一个长度为 1 的数组
  const pointList = poses[0]?.keypoints || []
  // 将这 17 个关键点的坐标信息 画到 canvas 上

  // 画出所有关键点
  // @ts-ignore
  pointList.forEach(({ x, y, score, name }) => score && score > 0.5 && drawPoint(x, y, 5, "#f00000", outputCtx))
  // 获取相邻的关键点信息
  const adjacentPairs = poseDetection.util.getAdjacentPairs(model)

  // 画出所有连线
  adjacentPairs.forEach(([i, j]: any) => {
    const kp1 = pointList[i]
    const kp2 = pointList[j]
    // score 不为空就画线
    const score1 = kp1.score != null ? kp1.score : 1
    const score2 = kp2.score != null ? kp2.score : 1
    if (score1 >= 0.5 && score2 >= 0.5) {
      // 画线段
      drawSegment([kp1.x, kp1.y], [kp2.x, kp2.y], "aqua", 1, outputCtx)
    }
  })
  // requestAnimationFrame(() => detectPose())
  setTimeout(detectPose, 50)
}

// 画点
function drawPoint(x: number, y: number, r: number, color: string, ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
}

// 画线段
function drawSegment([ax, ay]: number[], [bx, by]: number[], color: string, scale: number, ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.moveTo(ax * scale, ay * scale)
  ctx.lineTo(bx * scale, by * scale)
  ctx.lineWidth = 6
  ctx.strokeStyle = color
  ctx.stroke()
}
</script>
<template>
  <div v-loading="loading" class="h-[500px] text-center flex justify-center items-center gap-[20px]">
    <div>
      <span>input</span>
      <video id="video" autoplay playsinline muted width="720" height="540"></video>
    </div>
    <!-- output -->
    <div>
      <span>output</span>
      <canvas id="canvas" width="720" height="540"></canvas>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
