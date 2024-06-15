<template>
  <div>
    <input type="file" @change="onchange" />
  </div>
</template>

<script setup lang="ts">
// 源码：https://github.com/joye61/pic-smaller
import { configState } from "@/components/ImageCompress2/config"
import { createImageList } from "@/components/ImageCompress2/create"
import { removeWorkerHandler, useWorkerHandler } from "@/components/ImageCompress2/worker"

onMounted(() => {
  useWorkerHandler()

  // 设置输出格式
  configState.option.format.target = "webp"
})

onUnmounted(() => {
  removeWorkerHandler()
})

function onchange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  createImageList([...target.files])
}
</script>

<style lang="scss" scoped></style>
