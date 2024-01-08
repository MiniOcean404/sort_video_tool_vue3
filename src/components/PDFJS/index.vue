<template>
  <div class="container">
    <div id="viewer" class="pdfViewer"></div>
  </div>
</template>

<script setup lang="ts">
import { renderPDFViewer } from "./lib/web/index"

onMounted(() => {
  renderPDFViewer("https://davincimotor-web-resources.oss-cn-beijing.aliyuncs.com/pdf/%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf")
})
</script>

<style lang="scss" scoped></style>
