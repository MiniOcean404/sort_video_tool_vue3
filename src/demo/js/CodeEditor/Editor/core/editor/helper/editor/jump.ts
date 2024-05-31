import type { editor } from "monaco-editor"
import * as monaco from "monaco-editor"

// https://juejin.cn/post/7085224136980561927?share_token=4b55e7de-af00-4e3f-a993-18f4a4592620#heading-4
export function jumpMethod(editorIns: editor.IStandaloneCodeEditor) {
  // @ts-ignore
  const editorService = editorIns._codeEditorService
  const openEditorBase = editorService.openCodeEditor.bind(editorService)

  // @ts-ignore
  editorService.openCodeEditor = async (input, source) => {
    const result = await openEditorBase(input, source)

    if (result === null) {
      // const fullPath = input.resource.path

      console.log("定义来自:", input)
      console.log("对应的模型:", monaco.editor.getModel(input.resource))

      const selection = input.options.selection

      // 跳转到对应的model
      source.setModel(monaco.editor.getModel(input.resource))
      // 此处还可以自行添加文件选中态等处理

      // 设置选中区以及聚焦的行数
      source.setSelection(selection)

      // 跳转 ctrl + click 方式
      // 1. source.revealLine(selection.startLineNumber)
      // 2. source.revealRangeInCenter(selection)

      // 3.
      // source.revealPositionInCenter({
      //   lineNumber: selection.startLineNumber,
      //   column: selection.startColumn,
      // })

      // 4.
      // source.revealPositionNearTop({
      //   lineNumber: selection.startLineNumber,
      //   column: selection.startColumn,
      // })

      source.revealRangeAtTop(selection)
    }
    return result // always return the base result
  }
}
