<script setup lang="ts">
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import * as poseDetection from "@tensorflow-models/pose-detection"
import "@tensorflow/tfjs-backend-webgl"

import bgImage from "@/assets/image/bg.jpg"
import { PoseDetector } from "@tensorflow-models/pose-detection/dist/pose_detector"
import { PoseNet } from "@tensorflow-models/posenet/dist/posenet_model"

const model = poseDetection.SupportedModels.BlazePose
// const model = poseDetection.SupportedModels.MoveNet

const detectorConfig = {
  runtime: "tfjs",
  modelType: "full",
}
let loading = ref(false)
let video: HTMLVideoElement
let canvas: HTMLCanvasElement
let poseNet: PoseNet

onMounted(async () => {
  await tf.setBackend("webgl")
  await init()
})

// 打开摄像头
async function init() {
  loading.value = true
  await poseDetection.createDetector(model, detectorConfig)

  video = document.getElementById("local-video") as HTMLVideoElement

  video.srcObject = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: "user" },
  })

  canvas = document.getElementById("canvas") as HTMLCanvasElement
  poseNet = await posenet.load()

  loading.value = false
}

async function identify() {
  const ctx = canvas.getContext("2d")!

  // 识别图像中的姿势(单姿态)
  const poses = await poseNet.estimatePoses(video, { flipHorizontal: false, decodingMethod: "single-person" })
  console.log("🚀🚀🚀 / detector", poseNet)
  console.log("🚀🚀🚀 / pose", poses)
  const pose = await poseNet.estimateSinglePose(video, { flipHorizontal: false })

  // 将 pose 上的 17 个关键点的坐标信息存入 pointList
  const pointList = pose.keypoints
  // eslint-disable-next-line no-console
  // console.log('🚀🚀🚀 /  pointList ', pointList)
  // 将这 17 个关键点的坐标信息 画到 canvas 上
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  // 画出 17 个关键点
  pointList.forEach(({ position }) => {
    ctx.beginPath()
    ctx.arc(position.x, position.y, 4, 0, 2 * Math.PI)
    ctx.fillStyle = "#f00000"
    ctx.fill()
  })
  // 画出 17 个关键点之间的连线
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(pose.keypoints, 0.3)
  // console.log('🚀🚀🚀 / adjacentKeyPoints', adjacentKeyPoints)
  adjacentKeyPoints.forEach((point) => {
    drawSegment(toTuple(point[0].position), toTuple(point[1].position), "aqua", 1, ctx)
  })

  // requestAnimationFrame(identify)
  setTimeout(identify, 500)
}

// 转成元组
function toTuple({ y, x }: { y: number; x: number }) {
  return [y, x]
}
// 画线段
function drawSegment([ay, ax]: number[], [by, bx]: number[], color: string, scale: number, ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.moveTo(ax * scale, ay * scale)
  ctx.lineTo(bx * scale, by * scale)
  ctx.lineWidth = 4
  ctx.strokeStyle = color
  ctx.stroke()
}
</script>
<template>
  <div v-loading="loading" class="page-container">
    <el-button type="primary" size="default" @click="identify">识别</el-button>
    <div>
      <video id="local-video" width="360" height="270" autoplay muted></video>

      <canvas id="local-canvas" width="360" height="270"></canvas>
      <canvas id="canvas" width="360" height="270"></canvas>

      <img id="img" :src="bgImage" width="400" alt="" />

      <video id="video" playsinline style="transform: scaleX(-1); visibility: hidden; width: auto; height: auto"></video>
      <canvas id="output"></canvas>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#img,
#local-video,
#canvas {
  width: 360px;
  height: 270px;
  object-fit: fill;
}
</style>
