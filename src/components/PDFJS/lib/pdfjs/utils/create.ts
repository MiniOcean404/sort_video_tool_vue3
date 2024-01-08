export function createPageContainer(num: number) {
  const container = document.createElement("div")
  const canvas = document.createElement("canvas")
  const textLayer = document.createElement("div")
  const annotationLayer = document.createElement("div")

  // 设置 user-select:text; 使得可以选中文字
  container.setAttribute("id", `page-${num}`)
  container.setAttribute("class", "page-box")

  // 必须设置 textLayer 才能应用 pdf_viewer.css 中的样式
  textLayer.setAttribute("class", "textLayer")

  annotationLayer.setAttribute("class", "annotationLayer")

  container.appendChild(textLayer)
  container.appendChild(annotationLayer)
  container.appendChild(canvas)

  return { canvas, container, textLayer, annotationLayer }
}

export function setScaleFactor(scale: number) {
  document.documentElement.setAttribute("style", `--scale-factor:${scale};`)
}
