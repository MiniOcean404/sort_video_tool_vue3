import type { Plugin } from "vite"
import fg from "fast-glob"

interface preLoadImageOptions {
  // 图片路径
  dir: string
  attrs: {
    // prefetch 优先级比较低，页面空闲时候才会加载,并且缓存到 http 请求中的 cache 中,下次还要发起请求，获取的是请求的缓存
    // preload 优先级比较高, 存在内存里，非 http 缓存，下次用不会发起请求
    rel: "preload" | "prefetch"
  }
}

export function filePathInject(options: preLoadImageOptions): Plugin {
  const { dir, attrs = {} } = options

  // 返回的是插件主体
  return {
    // 指定插件名称,用于在控制台输出
    name: "vite-plugin-pre-load-image",
    // 替换插件指定内容
    transformIndexHtml(html, ctx) {
      // 获取 vite 配置中的 public 的目录地址下的文件
      const files = fg.sync(dir, { cwd: ctx.server?.config.publicDir })
      // 拼接 vite 插件配置中的 base 基准目录地址
      const images = files.map((file) => ctx.server?.config.base + file)

      return images.map((href) => {
        return {
          tag: "link",
          attrs: {
            rel: "prefetch", // prefetch
            as: "image",
            href,
            ...attrs,
          },
        }
      })
    },
  }
}
