<template>
  <iframe
    class="iframe"
    :src="render"
    sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin"
  ></iframe>
</template>

<script setup lang="ts">
import { CodeRenderProps } from "@/demo/js/CodeEditor/Render/typing/vue"
import html from "./index.html?raw"

// 需要注释 @originjs/vite-plugin-commonjs 否则无法加载
import { libDep } from "@/demo/js/CodeEditor/Render/constant/lib"
import { babelTransfrom } from "@/demo/js/CodeEditor/Render/core/babel/index"
import { esbuildTransfrom } from "@/demo/js/CodeEditor/Render/core/esbuild"

let render = $ref<string>("")
// const emit = defineEmits<EditorEmits>()

const props = withDefaults(defineProps<CodeRenderProps>(), {
  code: ``,
})

watch(props, () => {
  if (props.code) {
    initMounted()
  }
})

async function initMounted() {
  const fileTree = {
    "/mounted.tsx": `

    import React, { useState, useEffect } from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './pages/app.jsx';
    import rootCSS from './pages/app.css';

    // 需要使用它进行挂载
    window.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('root')
        ReactDOM.createRoot(root).render(React.createElement(App, null))
        insertCSSDom(rootCSS)
    })


    function insertCSSDom(css) {
      let stylesheet = document.getElementById("style")
      if (!stylesheet) {
        stylesheet = document.createElement("style")
        stylesheet.setAttribute("id", "style")
        document.head.appendChild(stylesheet)
      }
      const styles = document.createTextNode(css)
      stylesheet.innerHTML = ""
      stylesheet.appendChild(styles)
    }

    `,
    "/pages/app.jsx": props.code,
    "/pages/app.css": `
      .num {
        color: red;
      }
    `,
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  addImportmapLib(doc)

  const code = await esbuildTransfrom(fileTree)

  // const code = babelTransfrom("index.tsx", mounteCode, (filename) => props.code)
  addRunCode(doc, code || "")
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
</script>

<style lang="scss" scoped>
.iframe {
  width: 30%;
  height: 100%;
  padding: 0;
  border: none;
  display: inline-block;
}
</style>
