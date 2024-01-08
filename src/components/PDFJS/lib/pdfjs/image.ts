import { PDFPageProxy } from "pdfjs-dist";
import * as PDFJS from "pdfjs-dist";

export async function extractImage(page: PDFPageProxy) {
  // 获取操作列表
  const ops = await page.getOperatorList();

  // 提取图片
  const imgNames = ops.fnArray.reduce(
    (memo, curr, i) => {
      if ([PDFJS.OPS.paintImageXObject].includes(curr)) {
        const name = ops.argsArray[i][0];
        memo.push(name);
      }
      return memo;
    },
    [""],
  );

  for (const name of imgNames) {
    page.objs.get(name, (image: any) => {
      console.log("image: ", image);
      const bmp = image.bitmap;
    });
  }

  return imgNames;
}

export async function getPDFImages(page: PDFPageProxy, imgNames: string[]) {
  // ...接上一步，拿到了每页 PDF 的 image.bitmap 对象
  for (const imageName of imgNames) {
    page.objs.get(imageName, (image: any) => {
      (async function () {
        const bmp: ImageBitmap = image.bitmap;

        // OffscreenCanvas
        const resizeScale = 1 / 4; // 这个可以控制转换后的图片大小
        const width = bmp.width * resizeScale;
        const height = bmp.height * resizeScale;
        const canvas = new OffscreenCanvas(width, height);
        // 获取 canvas bitmaprenderer 上下文
        const ctx = canvas.getContext("bitmaprenderer");
        // 把 ImageBitmap 渲染到 OffscreenCanvas
        ctx!.transferFromImageBitmap(bmp);

        // 把 canvas 画布转化为 Blob 对象
        // https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/convertToBlob
        const blob = await canvas.convertToBlob();

        // 最后使用 Blob 作为 URL.createObjectURL 的参数，渲染出 img 图片
        // 如果不需要渲染，则可以讲 Blob 数据上传到云存储
        const img = document.body.appendChild(new Image());
        img.width = width;
        img.height = height;
        img.src = URL.createObjectURL(blob);
      })();
    });
  }
}
