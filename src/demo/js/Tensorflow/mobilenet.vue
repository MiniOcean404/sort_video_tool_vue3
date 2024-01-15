<script setup lang="ts">
import * as mobilenet from "@tensorflow-models/mobilenet"
// 👇解决识别后No backend found in registry.的问题
import "@tensorflow/tfjs-backend-webgl"

import bgImage from "@/assets/image/bg.jpg"

const loading = ref(false)
let infoList = ref<
  Array<{
    className: string
    probability: number
  }>
>([])

const identify = async () => {
  loading.value = true

  const testImg = document.getElementById("img") as HTMLImageElement
  // 加载模型
  const model = await mobilenet.load()
  // 对图片进行分类
  const predictions = await model.classify(testImg)
  console.log("🚀🚀🚀 / predictions", predictions)

  infoList.value = predictions
  loading.value = false
}
</script>

<template>
  <div v-loading="loading">
    <img id="img" :src="bgImage" height="400" alt="" />
    <el-button type="primary" size="default" @click="identify">识别</el-button>
    <p v-for="(item, index) in infoList" :key="index">图中为: {{ item.className }},概率:{{ item.probability }}</p>
  </div>
</template>
