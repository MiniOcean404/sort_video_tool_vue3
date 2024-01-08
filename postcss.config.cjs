const postcssPresetEnv = require("postcss-preset-env")

// 一些常用的插件与作用
// postcss-preset-env：帮你将最新的 CSS 语法转换成大多数浏览器都能理解的语法，自动添加前缀，按需加载 polyfill。 已经包含了 autoprefixer
// autoprefixer：自动添加 CSS3 前缀。
// cssnano：优化和压缩 CSS。
// postcss-import：通过 @import 导入 CSS 文件。
// postcss-custom-properties：使用自定义属性，类似于 Sass 中的变量。
// postcss-nested：允许使用嵌套规则。
// postcss-mixins：类似于 Sass 中的 mixin。
// postcss-css-variables：支持 CSS 变量。
// postcss-normalize：添加浏览器默认样式的规则，以消除浏览器之间的差异。
// postcss-pxtorem：将像素值转换成 rem 值，使得页面更好地适配不同大小的设备。
// postcss-extend：类似于 Sass 中的 @extend。
// postcss-flexbugs-fixes：修复 Flexbox 布局的一些 bug。
//

// package.json中添加,来让 babel postcss 识别浏览器版本;
// "browserslist": {
//   "production": [
//     ">0.2%",
//     "not dead",
//     "not op_mini all"
//   ],
//   "development": [
//     "last 1 chrome version",
//     "last 1 firefox version",
//     "last 1 safari version",
//     "last 1 ie version"
//   ]
// }

module.exports = {
  plugins: [
    postcssPresetEnv({
      // 解决 PDFjs 中的 css4 :is() 选择器的报错
      features: {
        "is-pseudo-class": false,
      },
    }),
  ],
}
