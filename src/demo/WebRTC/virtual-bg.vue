<template>
  <canvas id="backgroundImg" width="480" height="300"></canvas>
  <video id="real-video" width="480" height="300" autoplay muted></video>
  <video id="virtual-video" width="480" height="300" autoplay muted></video>

  <input id="color" type="color" :value="colorDefault" @change="handleColorChange" />

  <div class="test"></div>
</template>

<script setup lang="ts">
import bg from "@/assets/image/bg.jpg"
import green_screen from "@/assets/video/green_screen.mp4"

import { onMounted, ref } from "vue"
import { diff } from "color-diff"
import chroma from "chroma-js"

let realVideoCanvas: OffscreenCanvas
let realVideoCtx: OffscreenCanvasRenderingContext2D
let realVideoImageData: ImageData
let realVideo: HTMLVideoElement

let virtualVideoCanvas: HTMLCanvasElement
let virtualVideoCtx: CanvasRenderingContext2D
let virtualVideo: HTMLVideoElement

const allowance = ref<number>(30)
const backgroundColor = ref<{ R: number; G: number; B: number; A: number }>({ R: 113, G: 219, B: 78, A: 255 })
const colorDefault = ref("")

const WIDTH = 480 // 视频宽度
const HEIGHT = 300 // 视频高度

onMounted(async () => {
  setColorDefault()

  getBackgroundImageData()

  // const stream = await getLocalStream({ video: { width: WIDTH, height: HEIGHT } })
  playRealVideo(undefined, green_screen)

  drawVideoToCanvas(realVideo)
})

function setColorDefault() {
  colorDefault.value = chroma.rgb(backgroundColor.value.R, backgroundColor.value.G, backgroundColor.value.B).hex()
}

function handleColorChange(e: Event) {
  const target = e.target as HTMLInputElement
  const rgb = chroma.hex(target.value).rgb()

  backgroundColor.value = {
    R: rgb[0],
    G: rgb[1],
    B: rgb[2],
    A: 255,
  }
}

// 虚拟背景的 canvas中的图片数据
let backgroundImageData: ImageData
// 获取背景图像数据
function getBackgroundImageData() {
  const backgroundCanvas = document.querySelector("#backgroundImg") as HTMLCanvasElement
  const backgroundCtx = backgroundCanvas.getContext("2d")!
  const img = new Image()
  img.src = bg
  img.onload = () => {
    backgroundCtx.drawImage(img, 0, 0, backgroundCanvas.width, backgroundCanvas.height)
    backgroundImageData = backgroundCtx.getImageData(0, 0, backgroundCanvas.width, backgroundCanvas.height)
  }
}

// 将摄像头的流获取
async function getLocalStream(options: MediaStreamConstraints) {
  const stream = await navigator.mediaDevices.getUserMedia(options)
  return stream
}

// 播放原始视频流
function playRealVideo(stream?: MediaStream, url?: string) {
  realVideo = document.querySelector("#real-video") as HTMLVideoElement

  if (stream) {
    realVideo.srcObject = stream
  }

  if (url) {
    realVideo.src = url
  }
}

// 将视频写到 canvas 中
function drawVideoToCanvas(realVideo: HTMLVideoElement) {
  realVideoCanvas = new OffscreenCanvas(WIDTH, HEIGHT)
  // willReadFrequently(经常阅读) 可以使 getImageData 计算更快
  realVideoCtx = realVideoCanvas.getContext("2d", { willReadFrequently: true })!

  virtualVideoCanvas = document.createElement("canvas") as HTMLCanvasElement
  virtualVideoCtx = virtualVideoCanvas.getContext("2d")!

  realVideoCanvas.width = virtualVideoCanvas.width = WIDTH
  realVideoCanvas.height = virtualVideoCanvas.height = HEIGHT

  // 准备从 VirtualVideoCanvas 中获取视频流并在 virtualVideo 中播放
  getStreamFromVirtualVideoCanvas()

  // 每隔 100ms 将真实的视频写到 canvas 中，并获取视频的图像数据
  setInterval(() => {
    realVideoCtx.drawImage(realVideo, 0, 0, WIDTH, HEIGHT)
    // 获取 realVideoCanvas 中的图像数据
    realVideoImageData = realVideoCtx.getImageData(0, 0, WIDTH, HEIGHT)

    // 处理真实视频的图像数据，将其写到虚拟视频的 canvas 中
    processFrameDrawToVirtualVideo()
  }, 2000)
}

// 从 VirtualVideoCanvas 中获取 canvas 视频流并在 virtualVideo 中播放
function getStreamFromVirtualVideoCanvas() {
  virtualVideo = document.querySelector("#virtual-video") as HTMLVideoElement
  const stream = virtualVideoCanvas.captureStream(30)
  virtualVideo.srcObject = stream
}

// 处理真实视频的图像数据，将其写到虚拟视频的 canvas 中
function processFrameDrawToVirtualVideo() {
  // 逐像素计算与要处理的目标颜色的差值，如果差值小于阈值，则将该像素设置为背景图片中的对应像素
  for (let i = 0; i < realVideoImageData.data.length / 4; i++) {
    const group = i * 4

    // 绿幕视频 rgb
    const R = realVideoImageData.data[group]
    const G = realVideoImageData.data[group + 1]
    const B = realVideoImageData.data[group + 2]
    const A = realVideoImageData.data[group + 3]

    // 背景图片 rgb
    const bgR = backgroundImageData.data[group]
    const bgG = backgroundImageData.data[group + 1]
    const bgB = backgroundImageData.data[group + 2]
    const bgA = backgroundImageData.data[group + 3]

    // 计算与背景色的差值
    // @ts-ignore
    const diff_value = diff({ R, G, B, A }, { ...backgroundColor.value })

    // 当差值小于设定的阈值，则将该像素设置为背景图片中的对应像素
    if (diff_value < allowance.value!) {
      realVideoImageData.data[group] = bgR
      realVideoImageData.data[group + 1] = bgG
      realVideoImageData.data[group + 2] = bgB
      realVideoImageData.data[group + 3] = bgA
    }
  }

  // 将处理后的图像数据写到虚拟视频的 canvas 中
  virtualVideoCtx.putImageData(realVideoImageData, 0, 0)
}
</script>

<style lang="scss" scoped></style>
