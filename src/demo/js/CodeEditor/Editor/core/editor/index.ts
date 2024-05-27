import { addFormat } from "@/demo/js/CodeEditor/Editor/core/editor/helper/editor/format.ts"
import { registerSnippet } from "@/demo/js/CodeEditor/Editor/core/editor/helper/snippet"
import { setTypescriptMode } from "@/demo/js/CodeEditor/Editor/core/editor/mode/typescript.ts"
import { EXT_MAPPING } from "@/demo/js/CodeEditor/Editor/constant/ext.ts"
import { Path } from "@/demo/js/CodeEditor/Editor/core/file/path.ts"
import * as monaco from "monaco-editor"
import { config } from "@/demo/js/CodeEditor/Editor/core/editor/config.ts"
import { setATA } from "@/demo/js/CodeEditor/Editor/core/editor/helper/typing/typing.ts"
import type { editor } from "monaco-editor"
import { addCommand } from "@/demo/js/CodeEditor/Editor/core/editor/helper/editor/command.ts"
import { CreateEditorOption } from "@/demo/js/CodeEditor/Editor/typing/editor"
import { openFile } from "@/demo/js/CodeEditor/Editor/core/file/editor/open.ts"
import { Files } from "@/demo/js/CodeEditor/Editor/typing/vue"
import { jumpMethod } from "@/demo/js/CodeEditor/Editor/core/editor/helper/editor/jump.ts"
import { loadCustomTheme, setGrammarAnalyze } from "@/demo/js/CodeEditor/Editor/core/editor/theme"

// monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)

export async function createEditor(option: CreateEditorOption) {
  const { dom, files, theme } = option
  initConfig(files)

  // 创建 Monaco Editor 实例
  const editorIns = monaco.editor.create(dom, {
    // value: props.code, // 编辑器初始显示文字
    // language: props.language, // 编辑器语言
    theme, // 官方自带三种主题vs, hc-black, or vs-dark
    model: null, // 组织默认创建的空的 model
    ...config,
  })

  finishEditorHook(editorIns)

  return editorIns
}

function initConfig(files: Files) {
  Object.entries(files).forEach(([path, code]) => {
    const ext = EXT_MAPPING[Path.extname(path)]
    monaco.editor.createModel(code, ext.language, monaco.Uri.file(path))
  })
  setGrammarAnalyze()
  loadCustomTheme()

  addFormat()
  registerSnippet()
  setTypescriptMode()
}

function finishEditorHook(editorIns: editor.IStandaloneCodeEditor) {
  // 打开默认文件
  openFile(editorIns, "/pages/app.tsx")

  const ata = setATA()
  ata(toRaw(editorIns).getValue())

  // addAction(editorIns!)
  addCommand(editorIns)
  jumpMethod(editorIns)
}
