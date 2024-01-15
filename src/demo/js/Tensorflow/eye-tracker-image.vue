<script setup lang="ts">
import * as vision from "@mediapipe/tasks-vision"
import { Category } from "@mediapipe/tasks-vision"

import wasmBinaryPath from "@/assets/wasm/vision_wasm_internal.wasm?url"
import wasmLoaderPath from "@/assets/wasm/vision_wasm_internal.js?url"
import modelAssetPath from "@/assets/wasm/vision_face_landmarker.task?url"
import Pic7 from "@/assets/image/eye.jpg"

import { genFileId, UploadInstance, UploadProps, UploadRawFile } from "element-plus"

const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision
let output: HTMLCanvasElement
let outputCtx: CanvasRenderingContext2D
let faceLandmarker: vision.FaceLandmarker
let runningMode: "IMAGE" | "VIDEO" = "IMAGE"

/** ******************************************************************
 演示1：从页面上抓取一堆图片，并在点击时检测它们。
 ******************************************************************* */
const faceLandmarks = ref<Category[]>([])
const img = ref<HTMLImageElement>()

const loading = ref(false)

onMounted(() => {
  output = document.querySelector("#output-canvas") as HTMLCanvasElement
  outputCtx = output.getContext("2d")!
  createFaceLandmarker()
})

async function createFaceLandmarker() {
  loading.value = true
  // Read more `CopyWebpackPlugin`, copy wasm set from "https://cdn.skypack.dev/node_modules" to `/wasm`
  // const FileSetResolver = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm')
  // console.log('🚀🚀🚀 / FileSetResolver:', FileSetResolver)

  faceLandmarker = await FaceLandmarker.createFromOptions(
    {
      wasmBinaryPath,
      wasmLoaderPath,
    },
    {
      baseOptions: {
        modelAssetPath,
        delegate: "GPU",
      },
      outputFaceBlendshapes: true,
      runningMode,
      numFaces: 1,
    },
  )

  await faceLandmarker.setOptions({ runningMode })

  loading.value = false
}

// 当一个图像被点击时，让我们检测它并显示结果
async function handleClick() {
  if (!faceLandmarker) return ElMessage.error("Wait for faceLandmarker to load before clicking!")

  // 获取图像宽高
  const imgWidth = img.value?.width
  const imgHeight = img.value?.height

  if (img) {
    output.setAttribute("width", `${imgWidth}px`)
    output.setAttribute("height", `${imgHeight}px`)
    output.style.width = `${imgWidth}px`
    output.style.height = `${imgHeight}px`
    img.value?.parentNode!.appendChild(output)
  }

  const outputCtx = output.getContext("2d")!
  const drawingUtils = new DrawingUtils(outputCtx)

  if (img.value) {
    // 我们可以多次调用 faceLandmarker.detect，每次使用不同的图像数据。这将返回一个promise
    const faceLandmarkerResult = faceLandmarker.detect(img.value)

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

    faceLandmarks.value = faceLandmarkerResult.faceBlendshapes[0].categories
    // console.log('🚀🚀🚀 / faceLandmarks.value:', faceLandmarkerResult.faceBlendshapes[0].categories)
  }
}

const upload = ref<UploadInstance>()
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const imgSrc = ref(Pic7)
const handleImageChange: UploadProps["onChange"] = (uploadFile) => {
  imgSrc.value = URL.createObjectURL(uploadFile.raw!)
  // 删除之前绘制的所有标记
  outputCtx.clearRect(0, 0, output.width, output.height)
}
</script>
<template>
  <p></p>
  <div v-loading="loading" class="flex justify-between gap-10">
    <div>
      <el-upload
        ref="upload"
        class="upload-demo"
        :show-file-list="false"
        action="#"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :on-change="handleImageChange"
      >
        <template #trigger>
          <el-button type="primary">选择人像图片</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="handleClick">分析图片</el-button>
        <template #tip>
          <div class="el-upload__tip text-red">图片不会上传，只会在本地用作分析。</div>
        </template>
      </el-upload>

      <div class="view-box">
        <img v-if="imgSrc" ref="img" :src="imgSrc" width="600" crossorigin="anonymous" title="Click to get detection!" />
        <canvas id="output-canvas" class="output-canvas"></canvas>
      </div>
    </div>

    <div>
      <div v-for="(item, index) in faceLandmarks" :key="index">
        <p v-if="item.categoryName.includes('eye')" :class="`${item.score > 0.2 ? '' : ''}`">
          <span>{{ item.categoryName }}</span>
          <span>:</span>
          <span>{{ item.score.toFixed(4) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.view-box {
  position: relative;

  .output-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
