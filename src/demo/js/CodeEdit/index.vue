<template>
  <div ref="editorDom" class="monaco-editor-box"></div>
</template>

<script setup lang="ts">
// https://juejin.cn/post/7329353489678680103?searchId=20240520110630F79B0643745C503D34B7
// 各个功能：https://zhuanlan.zhihu.com/p/590230766
import * as monaco from "monaco-editor"
// import * as monaco from "monaco-editor/esm/vs/editor/editor.main"

import type { editor } from "monaco-editor"

//设置语言包
// import { setLocaleData } from "monaco-editor-nls"
// import zh_CN from "monaco-editor-nls/locale/zh-hans"

import { config } from "./config"
import { addCommand } from "@/demo/js/CodeEdit/helper/editor/command"

// 解决 js编辑 报错提示 EditorSimpleWorker.loadForeignModule 问题
// https://juejin.cn/post/7273126566460948541#heading-4
self.MonacoEnvironment = {
  getWorker(_, label) {
    const getWorkerModule = (url: string, label: string) => {
      // @ts-ignore
      const sciprt = MonacoEnvironment?.getWorkerUrl(url, label)
      return new Worker(sciprt || "", {
        name: label,
        type: "module",
      })
    }

    switch (label) {
      case "json":
        return getWorkerModule("/monaco-editor/esm/vs/language/json/json.worker?worker", label)
      case "css":
      case "scss":
      case "less":
        return getWorkerModule("/monaco-editor/esm/vs/language/css/css.worker?worker", label)
      case "html":
      case "handlebars":
      case "razor":
        return getWorkerModule("/monaco-editor/esm/vs/language/html/html.worker?worker", label)
      case "typescript":
      case "javascript":
        return getWorkerModule("/monaco-editor/esm/vs/language/typescript/ts.worker?worker", label)
      default:
        return getWorkerModule("/monaco-editor/esm/vs/editor/editor.worker?worker", label)
    }
  },
}

// monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)

interface CodeEditProps {
  code: string
  language: string
  theme: string
}

interface EditorEmits {
  (e: "update:code", value: string | undefined): void
}

const props = withDefaults(defineProps<CodeEditProps>(), {
  code: ``,
  language: "javascript",
  theme: "vs-dark",
})

let editorIns = $shallowRef<editor.IStandaloneCodeEditor | undefined>()
let editorDom = $ref<HTMLDivElement | null>(null)
const emit = defineEmits<EditorEmits>()

onMounted(async () => {
  init()
  // addAction(editorIns!)
  addCommand(editorIns!)
})

onUnmounted(() => {
  editorIns?.dispose()
})

function init() {
  // 创建 Monaco Editor 实例
  editorIns = monaco.editor.create(editorDom!, {
    value: props.code, // 编辑器初始显示文字
    language: props.language,
    theme: props.theme, // 官方自带三种主题vs, hc-black, or vs-dark
    ...config,
  })

  // 监听编辑器内容变化
  editorIns?.onDidChangeModelContent(() => {
    // 触发父组件更新代码内容
    emit("update:code", toRaw(editorIns)?.getValue())
  })
}
</script>

<style lang="scss" scoped>
.monaco-editor-box {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
