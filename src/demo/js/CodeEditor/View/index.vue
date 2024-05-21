<template>
  <!-- <CodeEditor :code="code"></CodeEditor> -->
  <CodeRender></CodeRender>
</template>

<script setup lang="ts">
import CodeEditor from "@/demo/js/CodeEditor/Editor/index.vue"
import CodeRender from "@/demo/js/CodeEditor/Render/index.vue"

onMounted(async () => {})

let code = $ref<string>("")
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
}
</style>
