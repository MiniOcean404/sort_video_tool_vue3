import path from "path"

export function getAssetsPath(filePath: string) {
  return path.resolve(__dirname, "../../assets", filePath)
}
