import { Loader } from "esbuild-wasm"

interface ExtMapping {
  [ext: string]: {
    loader: Loader
    language: string
  }
}
