import type { editor } from "monaco-editor"

function addCode(editorIns: editor.IStandaloneCodeEditor, code: string) {
  editorIns?.onMouseMove((e) => {
    /* 当前鼠标位置 */
    const position = e.target.position

    if (position) {
      /* 设置 instance 光标位置 */
      editorIns.setPosition({ ...position })

      /* 设置 instance 聚焦 */
      editorIns.focus()
    }
  })

  editorIns?.onMouseUp((e) => {
    /* 当前鼠标位置 */
    const position = e.target.position
    const range = e.target.range

    if (position && range) {
      /* range */

      /* 插入代码 */
      editorIns?.executeEdits("who", [
        {
          /* 位置 */
          range,
          /* 代码内容 */
          text: code,
        },
      ])

      /* 设置 instance 光标位置 */
      editorIns?.setPosition({ ...position })

      /* 设置 instance 聚焦 */
      editorIns?.focus()
    }
  })
}

// 获取单词
function getCodeWord(editorIns: editor.IStandaloneCodeEditor) {
  editorIns.onMouseDown((event) => {
    const position = event.target.position
    if (position) {
      // Ctrl + 鼠标点击
      if (event.event.ctrlKey) {
        const wordPostion = editorIns?.getModel()?.getWordAtPosition(event.target.position)

        if (wordPostion) {
          console.log(wordPostion.word)
        }
      }
    }
  })
}
