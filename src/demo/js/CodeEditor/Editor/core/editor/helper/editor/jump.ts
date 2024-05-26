// import type { editor } from "monaco-editor"

// function codeJump(editorIns: editor.IStandaloneCodeEditor) {
//   // 覆盖原点击变量跳转方法
//   editorIns._codeEditorService.doOpenEditor = function (editor, input) {
//     const path = input.resource.path
//     setSelectedFileName(path)
//     customDoOpenEditor(editor, input)
//   }

//   const customDoOpenEditor = (editor, input) => {
//     const selection = input.options ? input.options.selection : null
//     if (selection) {
//       if (typeof selection.endLineNumber === "number" && typeof selection.endColumn === "number") {
//         editor.setSelection(selection)
//         editor.revealRangeInCenter(selection, 1 /* Immediate */)
//       } else {
//         const pos = {
//           lineNumber: selection.startLineNumber,
//           column: selection.startColumn,
//         }
//         editor.setPosition(pos)
//         editor.revealPositionInCenter(pos, 1 /* Immediate */)
//       }
//     }
//   }
// }
