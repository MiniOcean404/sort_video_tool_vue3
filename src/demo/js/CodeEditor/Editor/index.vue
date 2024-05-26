<template>
  <div class="toggle-box">
    <div v-for="filename in filenames" class="file" @click="toggleFile(filename)">
      {{ filename }}
    </div>
  </div>

  <div class="editorBox">
    <div ref="editorDom" class="monaco-editor-box"></div>
  </div>

  <iframe
    class="iframe"
    :src="render"
    sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin"
  ></iframe>
</template>

<script setup lang="ts">
// https://juejin.cn/post/7329353489678680103?searchId=20240520110630F79B0643745C503D34B7
// 各个功能：https://zhuanlan.zhihu.com/p/590230766
import type { editor } from "monaco-editor"
import "./core/editor/helper/loader"

import { CodeEditProps, EditorEmits } from "./typing/vue"

import { initRender, updateRenderCode } from "@/demo/js/CodeEditor/Editor/core/render"
import { createEditor } from "@/demo/js/CodeEditor/Editor/core/editor"
import { openFile } from "@/demo/js/CodeEditor/Editor/core/file/editor/open.ts"
import { debounce } from "@/utils/pref.ts"
import { initFileSystem } from "@/demo/js/CodeEditor/Editor/core/file"
import fileState, { updateCurrentCode } from "@/demo/js/CodeEditor/Editor/core/file/store/state.ts"

const props = withDefaults(defineProps<CodeEditProps>(), {
  files: () => ({}),
  theme: "vs-dark",
})

const emit = defineEmits<EditorEmits>()

let editorIns = $shallowRef<editor.IStandaloneCodeEditor | undefined>()
let editorDom = $ref<HTMLDivElement | null>(null)
let render = $ref<string>("")

let filenames = $ref<string[]>([])

onMounted(async () => {
  const { files, filenames: names } = initFileSystem(props.files)
  filenames = names

  editorIns = await createEditor({
    dom: editorDom!,
    files,
    theme: props.theme,
    emit,
  })

  render = await initRender(files)

  // 监听编辑器内容变化
  editorIns.onDidChangeModelContent(
    debounce(async () => {
      const code = toRaw(editorIns)?.getValue()
      if (code) {
        // ata(code)
        updateCurrentCode(code)
        render = await initRender(files)
      }
    }, 500),
  )

  // 编辑器失去焦点
  editorIns.onDidBlurEditorWidget(() => {})
})

onUnmounted(() => {
  editorIns?.dispose()
})

function toggleFile(file: string) {
  openFile(editorIns!, file)
}
</script>

<style lang="scss" scoped>
.toggle-box {
  background-color: #0a0a0a;
  display: flex;
  align-items: center;

  .file {
    color: white;
    width: 150px;
    height: 100%;
    text-align: center;
  }
}

.editorBox {
  width: 70%;
  height: inherit;
  display: inline-block;

  .monaco-editor-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.iframe {
  width: 30%;
  height: 100%;
  padding: 0;
  border: none;
  display: inline-block;
}
</style>
