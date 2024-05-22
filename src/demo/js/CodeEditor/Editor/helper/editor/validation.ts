import * as monaco from "monaco-editor"

// 添加编辑器校验
function addValidation() {
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  })
}
