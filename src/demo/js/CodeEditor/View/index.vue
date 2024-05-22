<template>
  <CodeEditor @code="updateCode"></CodeEditor>
  <CodeRender :code="code"></CodeRender>
</template>

<script setup lang="ts">
import CodeEditor from "@/demo/js/CodeEditor/Editor/index.vue"
import CodeRender from "@/demo/js/CodeEditor/Render/index.vue"

let code = $ref<string>("")

onMounted(async () => {})

function updateCode(code: string) {
  code = code
}
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
}
</style>
