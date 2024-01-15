<script setup lang="ts">
import * as vision from "@mediapipe/tasks-vision"

import wasmBinaryPath from "@/assets/wasm/vision_wasm_internal.wasm?url"
import wasmLoaderPath from "@/assets/wasm/vision_wasm_internal.js?url"
import modelAssetPath from "@/assets/wasm/vision_face_landmarker.task?url"
import { Category, FaceLandmarkerResult } from "@mediapipe/tasks-vision"

const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision

let output: HTMLCanvasElement
let outputCtx: CanvasRenderingContext2D
let video: HTMLVideoElement

let faceLandmarker: vision.FaceLandmarker
let drawingUtils: vision.DrawingUtils
let runningMode: "IMAGE" | "VIDEO" = "VIDEO"

let faceLandmarkerResult: FaceLandmarkerResult
const faceLandmarks = ref<Category[]>([])

const loading = ref(false)

const videoWidth = 480
const videoHeight = 360
onMounted(async () => {
  video = document.getElementById("webcam") as HTMLVideoElement
  output = document.querySelector("#output-canvas") as HTMLCanvasElement
  outputCtx = output.getContext("2d")!
  drawingUtils = new DrawingUtils(outputCtx)

  await createFaceLandmarker()
  await getUserMedia()

  video.style.width = `${videoWidth}px`
  video.style.height = `${videoHeight}px`
  output.style.width = `${videoWidth}px`
  output.style.height = `${videoHeight}px`
  output.width = videoWidth
  output.height = videoHeight
})

async function createFaceLandmarker() {
  loading.value = true
  // const FileSetResolver = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm')

  faceLandmarker = await FaceLandmarker.createFromOptions(
    { wasmBinaryPath, wasmLoaderPath },
    {
      baseOptions: { modelAssetPath, delegate: "GPU" },
      outputFaceBlendshapes: true, // 输出脸部特征
      runningMode, // 运行模式
      numFaces: 1, // 最多检测人脸数量
    },
  )

  await faceLandmarker.setOptions({ runningMode })

  loading.value = false
}

async function predictWebcam() {
  if (!faceLandmarker) return ElMessage.error("等待 faceLandmarker 加载后再开始检测!")

  outputCtx.clearRect(0, 0, videoWidth, videoHeight)

  faceLandmarkerResult = faceLandmarker.detectForVideo(video, Date.now())
  faceLandmarkerResult.faceLandmarks.forEach((landmarks) => {
    drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "#C0C0C070", lineWidth: 1 })
    drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: "#FF3030" })
    drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, { color: "#FF3030" })
    drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: "#30FF30" })
    drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, { color: "#30FF30" })
    drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#E0E0E0" })
    drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, { color: "#E0E0E0" })
    drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, { color: "#FF3030" })
    drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, { color: "#30FF30" })
  })

  if (faceLandmarkerResult && faceLandmarkerResult.faceLandmarks) {
    console.log(faceLandmarkerResult.faceBlendshapes[0].categories)
  }

  // window.requestAnimationFrame(predictWebcam)
  setTimeout(predictWebcam, 20)
}

async function getUserMedia() {
  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) return ElMessage.error("您的浏览器不支持 getUserMedia()")

  video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true })
  video.addEventListener("loadeddata", predictWebcam)
}
</script>
<template>
  <p></p>
  <div v-loading="loading">
    <div>
      <div class="relative">
        <video id="webcam" width="480px" autoplay playsinline></video>
        <canvas id="output-canvas"></canvas>
      </div>
    </div>

    <!--    <div v-for="(item, index) in faceLandmarks" :key="index">-->
    <!--      <p v-if="item.categoryName.includes('eye')" :class="`my-1 py-2 ${item.score > 0.2 ? 'bg-emerald-400' : ''}`">-->
    <!--        <span>{{ item.categoryName }}</span>-->
    <!--        :-->
    <!--        <span>{{ item.score.toFixed(4) }}</span>-->
    <!--      </p>-->
    <!--    </div>-->
  </div>
</template>
<style lang="scss" scoped>
.output-canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
