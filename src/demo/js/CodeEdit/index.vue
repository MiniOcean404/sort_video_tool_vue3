<template>
  <div ref="editorDom" class="monaco-editor-container"></div>
</template>

<script setup lang="ts">
// https://juejin.cn/post/7329353489678680103?searchId=20240520110630F79B0643745C503D34B7
import monaco from "monaco-editor"

interface CodeEditProps {
  code: string
  language: string
  theme: string
}

const props = withDefaults(defineProps<CodeEditProps>(), {
  code: "",
  language: "javascript",
  theme: "vs-dark",
})

let editor = $ref<IStandaloneCodeEditor | null>(null)
let editorDom = $ref<HTMLDivElement | null>(null)

onMounted(() => {
  init()
})

function init() {
  // 创建 Monaco Editor 实例
  editor = monaco.editor.create(editorDom!, {
    value: props.code,
    language: props.language,
    theme: props.theme,
  })

  // 监听编辑器内容变化
  editor.onDidChangeModelContent(() => {
    // 触发父组件更新代码内容
    $emit("update:code", editor.getValue())
  })
}
</script>

<style lang="scss" scoped></style>
