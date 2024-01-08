import { PDFDocumentProxy, BinaryData, PDFPageViewport } from "pdfjs-dist";

export interface GetPDFDocumentProps {
  url?: string;
  baseUrl?: string;
  base64?: string;
  data?: BinaryData | undefined;
  header?: Record<string, string>;
  fontUrl?: string;
}

export interface GetPDFDocumentReturn {
  pageNum: number;
  doc: PDFDocumentProxy;
}

export interface RenderPageProps {
  num: number;
  canvas: HTMLCanvasElement;
  doc: PDFDocumentProxy;
  scale?: number;
}
export interface RenderPageReturn {
  page: PDFPageProxy;
  viewport: PDFPageViewport;
}
export interface getPDFPageRealSizeReturn {
  width: number;
  height: number;
}

interface RenderPageReturn {}
