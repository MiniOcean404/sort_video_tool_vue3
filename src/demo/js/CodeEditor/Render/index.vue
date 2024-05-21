<template>
  <iframe class="iframe" :src="render" frameborder="0"></iframe>
</template>

<script setup lang="ts">
import { CodeRenderProps } from "@/demo/js/CodeEditor/Render/typing/vue"
import html from "./index.html?raw"

// 需要注释 @originjs/vite-plugin-commonjs 否则无法加载
import { transform } from "@babel/standalone"
import type { PluginObj } from "@babel/core"
import { libDep } from "@/demo/js/CodeEditor/Render/constant/lib"

let render = $ref<string>("")
// const emit = defineEmits<EditorEmits>()

const props = withDefaults(defineProps<CodeRenderProps>(), {
  code: `
  import React, { useState, useEffect } from 'react';
  import ReactDOM from 'react-dom/client';

  function App() {
    const [num, setNum] = useState(() => {
      const num1 = 1 + 2;
      const num2 = 2 + 3;
      return num1 + num2
    });

    return (
     <div>
        <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
        <div style={{fontSize:30}}> hello word </div>
      </div>
    );
  }

  export default App;
  `,
})

watchEffect(() => {})

onMounted(async () => {
  initMounted()
})

const mounteCode = `
  import React, { useState, useEffect } from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './app.js';

  // 需要使用它进行挂载
  window.addEventListener('DOMContentLoaded', () => {
      const root = document.getElementById('root')
      ReactDOM.createRoot(root).render(React.createElement(App, null))
  })
`

function initMounted() {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  addImportmapLib(doc)

  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        // 方式1：将 import React from "xxx" 中的 xx 转换为 具体代码 blob url
        // 方式2：利用 script 中的 importmap 声明导入包的代码
        const libName = path.node.source.value
        if (libName === "./app.js") path.node.source.value = reBuildCodeUrl(props.code)
      },
    },
  }

  const build = transform(mounteCode, {
    presets: ["react", "typescript"],
    filename: "index.tsx",
    plugins: [transformImportSourcePlugin],
  })

  addRunCode(doc, build.code || "")
}

function addRunCode(doc: Document, code: string) {
  const runCode = doc.querySelector("#runCode")

  if (runCode) {
    runCode.innerHTML = code || ""
    render = createRenderBlobUrl(doc.documentElement.outerHTML)
  }
}

function addImportmapLib(doc: Document) {
  const lib = doc.querySelector("#lib")
  const libJson = { imports: libDep }
  if (lib) lib.textContent = JSON.stringify(libJson)
}

function createRenderBlobUrl(html: string) {
  return URL.createObjectURL(new Blob([html], { type: "text/html" }))
}

// 创建 js 脚本代码，可以直接复制给 path.node.source.value 进行库的导入
function reBuildCodeUrl(code: string) {
  const app = transform(code, {
    presets: ["react", "typescript"],
    filename: "index.tsx",
  })

  return URL.createObjectURL(new Blob([app.code || ""], { type: "application/javascript" }))
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
