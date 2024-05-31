import { ExtMapping } from "@/demo/js/CodeEditor/Editor/typing/builder"

export const EXT_MAPPING: ExtMapping = {
  ".ts": {
    loader: "ts",
    language: "typescript",
  },
  ".tsx": {
    loader: "tsx",
    language: "typescript",
  },
  ".js": {
    loader: "js",
    language: "typescript",
  },
  ".jsx": {
    loader: "jsx",
    language: "typescript",
  },
  ".css": {
    loader: "local-css",
    language: "css",
  },
}
