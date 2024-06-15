<template>
  <div>
    <input type="file" @change="onchange" />
  </div>
</template>

<script setup lang="ts">
// 源码：https://github.com/joye61/pic-smaller
import {
  createImageList,
  removeWorkerHandler,
  useWorkerHandler,
} from "@/components/ImageCompress2/engines/transform"

onMounted(() => {
  useWorkerHandler()
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
