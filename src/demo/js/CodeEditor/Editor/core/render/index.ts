// 需要注释 @originjs/vite-plugin-commonjs 否则无法加载
import { libDep } from "@/demo/js/CodeEditor/Editor/constant/lib.ts"
import { esbuildTransfrom } from "@/demo/js/CodeEditor/Editor/core/builder/esbuild"
import html from "./index.html?raw"
import { FileTree } from "@/demo/js/CodeEditor/Editor/typing/vue"
import fileState from "@/demo/js/CodeEditor/Editor/core/file/state.ts"

export async function initRender(fileTree: FileTree, updateCode?: string) {
  fileTree["/mounted.tsx"] = `
      import React, { useState, useEffect } from 'react';
      import ReactDOM from 'react-dom/client';
      import App from './pages/app.tsx';
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
    `

  fileTree[fileState.current.file] = updateCode || ""

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  addImportMapLib(doc)

  const code = await esbuildTransfrom(fileTree)
  return addRunCode(doc, code || "")
}

export function addRunCode(doc: Document, code: string) {
  const runCode = doc.querySelector("#runCode")

  if (runCode) {
    runCode.innerHTML = code || ""
    return createRenderBlobUrl(doc.documentElement.outerHTML)
  }

  return ""
}

export function addImportMapLib(doc: Document) {
  const lib = doc.querySelector("#lib")
  const libJson = { imports: libDep }
  if (lib) lib.textContent = JSON.stringify(libJson)
}

export function createRenderBlobUrl(html: string) {
  return URL.createObjectURL(new Blob([html], { type: "text/html" }))
}
