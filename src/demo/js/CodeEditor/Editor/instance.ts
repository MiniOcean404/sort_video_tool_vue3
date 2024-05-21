// src\hooks\useMonacoEditor.ts
// import { ref } from "vue"
// import loader, { Monaco } from "@monaco-editor/loader"

// const monacoRef = ref<Monaco | null>(null)
// const monacoLoader = loader.init()

// function initMonaco() {
//   return new Promise<void>((resolve, reject) => {
//     if (monacoRef.value) return resolve()

//     monacoLoader
//       .then((monacoInstance) => {
//         monacoRef.value = monacoInstance
//       })
//       .catch((error) => {
//         if (error?.type !== "cancelation") {
//           console.error("Monaco initialization error:", error)
//           reject()
//         }
//       })
//   })
// }

// export function useMonacoEditor() {
//   return {
//     initMonaco,
//     monacoRef,
//   }
// }
