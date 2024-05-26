import { CodeEditProps, EditorEmits } from "@/demo/js/CodeEditor/Editor/typing/vue"

interface CreateEditorOption extends CodeEditProps {
  dom: HTMLDivElement
  emit?: EditorEmits
}
