import * as PDFJS from "pdfjs-dist";
import PDFWorker from "pdfjs-dist/build/pdf.worker.min.js?url";
import { createPageContainer, setScaleFactor } from "./utils/create.ts";
import "pdfjs-dist/web/pdf_viewer.css";

import { getPDFDocument } from "./doc.ts";
import { getPDFPageRealSize, renderAnnotations, renderCopyText, renderPage } from "./page.ts";
import "./lib/scss/index.scss";

// pdf.js 从性能考虑，使用了 WebWorker, 在浏览器子线程解析图片等资源，不阻塞页面UI和交互。
PDFJS.GlobalWorkerOptions.workerSrc = PDFWorker;

export async function renderPDF(url: string) {
  const filename = PDFJS.getFilenameFromUrl(decodeURIComponent(url));
  document.title = filename;

  const { doc, pageNum } = await getPDFDocument({ url });
  const { width } = await getPDFPageRealSize(doc);

  for (let num = 1; num <= pageNum; num++) {
    const { canvas, container, textLayer, annotationLayer } = createPageContainer(num);

    const { page, viewport } = await renderPage({ num: num, canvas, doc });
    await renderCopyText(page, textLayer, viewport);
    await renderAnnotations(page);

    const root = document.querySelector(".container");
    if (root) {
      // root.querySelectorAll(".page-box").forEach((item) => item.remove())
      root.appendChild(container);
    }

    // 设置文字复制位置要与实际的缩放大小一直，才能保障位置正确
    setScaleFactor(canvas.clientWidth / width);
  }

  // const names = await extractImage(page);
  // await getPDFImages(page, names);
}
