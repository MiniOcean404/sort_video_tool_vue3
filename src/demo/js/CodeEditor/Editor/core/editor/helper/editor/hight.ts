import type { editor } from "monaco-editor"
import * as monaco from "monaco-editor"

interface ErrorProps {
  editor: editor.IStandaloneCodeEditor
  decorations: string[]
  position: {
    rowStart: number
    columnStart: number
    rowEnd: number
    columnEnd: number
  }
}

function handleErrorMark({
  editor,
  decorations,
  position: { rowStart, columnStart, rowEnd, columnEnd },
}: ErrorProps) {
  return editor.deltaDecorations(
    [...decorations], // oldDecorations 每次清空上次标记的
    [
      {
        range: new monaco.Range(rowStart, columnStart, rowEnd, columnEnd), // rowStart, columnStart, rowEnd, columnEnd
        options: {
          isWholeLine: true,
          className: "myContentClass", // 代码行样式类名
          glyphMarginClassName: "myGlyphMarginClass", // 行数前面小块标记样式类名
        },
      },
    ], // 如果需要清空所有标记，将 newDecorations 设为空数组即可
  )
}
