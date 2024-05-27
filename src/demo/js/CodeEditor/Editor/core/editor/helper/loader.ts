// import * as monaco from "monaco-editor/esm/vs/editor/editor.main"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { setGrammarAnalyze } from "@/demo/js/CodeEditor/Editor/core/editor/theme"

// 解决 monaco-editor webworker 加载错误问题，重写他的方法
// https://juejin.cn/post/7273126566460948541#heading-4
self.MonacoEnvironment = {
  getWorker(_, label) {
    switch (label) {
      case "json":
        return new jsonWorker()
      case "css":
      case "scss":
      case "less":
        return new cssWorker()
      case "html":
      case "handlebars":
      case "razor":
        return new htmlWorker()
      case "typescript":
      case "javascript":
        return new tsWorker()
      default:
        return new editorWorker()
    }
  },
}
