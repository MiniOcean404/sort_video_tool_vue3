import { PDFDocumentProxy } from "pdfjs-dist";
import { GetPDFDocumentProps, GetPDFDocumentReturn } from "../types";
import * as PDFJS from "pdfjs-dist";

export function getPDFDocument({
  url,
  baseUrl,
  base64,
  data,
  header,
  fontUrl,
}: GetPDFDocumentProps): Promise<GetPDFDocumentReturn> {
  return new Promise(async (res) => {
    if (base64) data = base64;

    // https://unpkg.com/pdfjs-dist@${PDFJS.version}}/cmaps/
    if (!fontUrl) fontUrl = "https://davincimotor-web-resources.oss-cn-beijing.aliyuncs.com/pdf/cmaps/";

    const loadingTask = PDFJS.getDocument({
      url,
      docBaseUrl: baseUrl,
      data,
      httpHeaders: header,
      cMapUrl: fontUrl, // 引入pdf.js字体
      cMapPacked: true,
      fontExtraProperties: true,
    });

    const doc = await loadingTask.promise;

    const pageNum = doc.numPages;
    const id = doc.fingerprints;
    const pageMode = await doc.getPageMode();

    res({
      doc,
      pageNum,
    });
  });
}

// 获取文档大纲，子大纲在元素的 items 中
export async function getOutline(doc: PDFDocumentProxy) {
  const outline = await doc.getOutline();

  // console.log((await doc.getPageIndex(outline[0].dest![0])) + 1)
}

// 获取 PDF 属性包含了标题
export async function getPDFInfo(doc: PDFDocumentProxy) {
  const info = await doc.getMetadata();
}
