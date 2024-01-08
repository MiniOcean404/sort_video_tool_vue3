import { PDFDocumentProxy, PDFPageProxy, PageViewport } from "pdfjs-dist";
import * as PDFJS from "pdfjs-dist";

import { RenderPageReturn, RenderPageProps, getPDFPageRealSizeReturn } from "../types";

const BASE_SCALE_UPGRADE = 1.5;

export function renderPage({
  num,
  canvas,
  doc,
  scale = window.devicePixelRatio * BASE_SCALE_UPGRADE,
}: RenderPageProps): Promise<RenderPageReturn> {
  return new Promise(async (res) => {
    const page = await doc.getPage(num);
    const index = page.pageNumber || (await doc.getPageIndex(page.ref!)) + 1;

    const viewport = page.getViewport({ scale });
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderTask = page.render({
      viewport,
      canvasContext: ctx!,
    });

    await renderTask.promise;

    res({ page, viewport });
  });
}

export async function renderCopyText(page: PDFPageProxy, textLayer: HTMLDivElement, viewport: PageViewport) {
  const textContent = await page.getTextContent();

  // const fontFace = page.commonObjs.get(textContent.items[0].fontName)

  // document.getSelection() 获的选择的文本
  PDFJS.renderTextLayer({
    textContentSource: textContent,
    container: textLayer,
    viewport: viewport.clone({ dontFlip: true }),
    textDivs: [],
  });
}

export async function renderAnnotations(page: PDFPageProxy) {
  const annotations = await page.getAnnotations();

  if (annotations.length === 0) return;
}

export async function getPDFPageRealSize(doc: PDFDocumentProxy): Promise<getPDFPageRealSizeReturn> {
  const page = await doc.getPage(1);
  return {
    width: page.view[2],
    height: page.view[3],
  };
}

export function highlightText(page: PDFPageProxy, text: String) {
  page.getTextContent().then(function (textContent) {
    var textLayer = document.getElementById("textLayer");
    var textDivs = PDFJS.getTextDivs(textLayer, textContent);

    // 遍历查找关键字并进行高亮显示
    for (var i = 0; i < textDivs.length; i++) {
      var textDiv = textDivs[i];
      var textContent = textDiv.textContent;

      // annotationLayer
      if (textContent.indexOf(text) !== -1) {
        var textRect = textDiv.getBoundingClientRect();
        var highlightDiv = document.createElement("div");
        highlightDiv.style.position = "absolute";
        highlightDiv.style.left = textRect.left + "px";
        highlightDiv.style.top = textRect.top + "px";
        highlightDiv.style.width = textRect.width + "px";
        highlightDiv.style.height = textRect.height + "px";
        highlightDiv.style.backgroundColor = "yellow";
        textLayer!.appendChild(highlightDiv);
      }
    }
  });
}
