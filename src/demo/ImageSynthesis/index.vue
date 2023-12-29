<template>
  <div v-loading="loading">
    <el-upload ref="uploadRef" :on-change="handleFile" :auto-upload="false" :limit="1" :show-file-list="false" accept="image/*">
      <template #trigger>
        <el-button type="primary">选择主图</el-button>
      </template>
    </el-upload>

    <el-upload ref="uploadRef" :on-change="handleFiles" multiple :auto-upload="false" :show-file-list="false" accept="image/*">
      <template #trigger>
        <el-button type="primary">选择千图</el-button>
      </template>
    </el-upload>

    <el-button type="primary" @click="handleDraw">开始绘制</el-button>

    <div class="box">
      <canvas id="canvas" width="800" height="400"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadInstance, UploadProps } from "element-plus"
import { ref } from "vue"
import { fabric } from "fabric"

import { drawLine, drawMainImage, generateImg, initCanvas } from "@/demo/ImageSynthesis/draw.ts"
import { getImageDate, getMinDiff } from "@/demo/ImageSynthesis/binary.ts"

import type { PixelBlockInfo, PixelImageInfo } from "@/demo/ImageSynthesis/index"

const uploadRef = ref<UploadInstance>()
const loading = ref(false)

const images: PixelImageInfo[] = []
let blocks: PixelBlockInfo[] | undefined = []
let canvas: fabric.Canvas

const GrilleSize = 8

const handleFile: UploadProps["onChange"] = async (file) => {
  uploadRef.value!.clearFiles()

  if (file.raw) {
    const url = URL.createObjectURL(file.raw)

    canvas = await initCanvas(url)
    const imageData = await drawMainImage(url, canvas)
    // 绘制网格线条
    drawLine(canvas, GrilleSize, 1)

    const worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    })

    worker.onmessage = (event) => {
      blocks = event.data
      console.log("🚀 ~ file: index.vue:59 ~ consthandleFile:UploadProps= ~ blocks:", "格栅计算完成")
    }

    worker.postMessage({ imageData, width: canvas.width || 0, height: canvas.height || 0, GrilleSize })
  }
}

const handleFiles: UploadProps["onChange"] = async (file) => {
  loading.value = true

  uploadRef.value!.clearFiles()
  if (file.raw) {
    const res = await getImageDate(URL.createObjectURL(file.raw), 0.2)
    images.push(res)
    loading.value = false
    console.log("🚀 ~ file: index.vue:73 ~ consthandleFiles:UploadProps", "千图计算完成")
  }
}

// 开始绘制
function handleDraw() {
  if (blocks) {
    const urls = getMinDiff(images, blocks)
    generateImg(canvas, urls, GrilleSize)
  }
}
</script>

<style scoped lang="scss"></style>
