<template>
  <div class="editorBox">
    <div ref="editorDom" class="monaco-editor-box"></div>
  </div>
</template>

<script setup lang="ts">
// https://juejin.cn/post/7329353489678680103?searchId=20240520110630F79B0643745C503D34B7
// 各个功能：https://zhuanlan.zhihu.com/p/590230766
import * as monaco from "monaco-editor"
import type { editor } from "monaco-editor"
import "./helper/loader"

//设置语言包
// import { setLocaleData } from "monaco-editor-nls"
// import zh_CN from "monaco-editor-nls/locale/zh-hans"

import { config } from "./config"
import { addCommand } from "@/demo/js/CodeEditor/Editor/helper/editor/command"
import { setTs } from "@/demo/js/CodeEditor/Editor/helper/editor/typing"
import { CodeEditProps, EditorEmits } from "@/demo/js/CodeEditor/Editor/typing/vue"

// monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)

const props = withDefaults(defineProps<CodeEditProps>(), {
  code: `
  // import ahooks from "ahooks"
  // import lodash from "lodash"
  import dayjs from "dayjs"
    function App() {
      return <div>
            "啊啊啊啊啊"
          </div>
  }
  `,
  language: "typescript",
  theme: "vs-dark",
})

let editorIns = $shallowRef<editor.IStandaloneCodeEditor | undefined>()
let editorDom = $ref<HTMLDivElement | null>(null)
const emit = defineEmits<EditorEmits>()

onMounted(async () => {
  initEditor()
  // addAction(editorIns!)
  addCommand(editorIns!)
})

onUnmounted(() => {
  editorIns?.dispose()
})

function initEditor() {
  // 创建 Monaco Editor 实例
  editorIns = monaco.editor.create(editorDom!, {
    value: props.code, // 编辑器初始显示文字
    language: props.language,
    theme: props.theme, // 官方自带三种主题vs, hc-black, or vs-dark
    ...config,
  })

  // 监听编辑器内容变化
  editorIns?.onDidChangeModelContent(() => {
    const code = toRaw(editorIns)?.getValue()

    if (code) {
      // ata(code)
      // 触发父组件更新代码内容
      emit("update:code", code)
    }
  })

  const ata = setTs()
  ata(toRaw(editorIns)?.getValue())
}
</script>

<style lang="scss" scoped>
.editorBox {
  width: inherit;
  height: 100%;

  .monaco-editor-box {
    width: 100%;
    height: 50vh;
    overflow: hidden;
  }
}
</style>
