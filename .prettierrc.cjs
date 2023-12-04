module.exports = {
  useTabs: false, // 使用 tab 缩进，默认 false
  tabWidth: 2, // tab 缩进大小,默认为 2
  semi: false, // 使用分号, 默认 true
  printWidth: 160, // 超过最大值换行
  singleQuote: false, // 是否强制单引号
  jsxSingleQuote: true, // 在jsx中使用单引号代替双引号,
  bracketSpacing: true, // 对象大括号内的首尾需要空格 默认 true
  quoteProps: "as-needed", // 指定对象变量中的属性名引号添加方式
  trailingComma: "all", // 末尾需要有逗号
  arrowParens: "always", // 箭头函数参数括号 默认avoid 可选 avoid| always avoid 能省略括号的时候就省略 例如x => x always 总是有括号
  bracketSameLine: false, // 会把多行的 HTML (包括 HTML、JSX、Vue 和 Angular) 元素的 > 放在最后一个属性的末尾，而不是另起一行（自闭合标签不受该选项控制）。 jsxBracketSameLine 废弃
  singleAttributePerLine: false, // 会在 printWidth 范围内业将 HTML、JSX、Vue 和 Angular 中格式化为每个属性单独占一行。
  vueIndentScriptAndStyle: false, // 是否在 vue 的 script style 文件中所有行缩进一个 tab 的距离再进行写代码
  endOfLine: "lf", //结尾是 \n \r \n\r 值：auto || lf
  htmlWhitespaceSensitivity: "ignore", // 根据显示样式决定 html 要不要折行 ignore || css
  proseWrap: "preserve", // 因为使用了一些折行敏感型的渲染器（如 GitHub comment ）而按照markdown文本样式进行折行
  embeddedLanguageFormatting: "auto", // 格式化嵌入的内容

  requirePragma: false, // Prettier 可以限制只对包含特定注释 (pragma) 的文件进行格式化
  insertPragma: false, // 不需要自动在文件开头插入 @prettier

  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  rangeEnd: Infinity,

  eslintIntegration: false, // 不让prettier使用eslint的代码格式进行校验
  stylelintIntegration: false, // 不让prettier使用stylelint的代码格式进行校验
  tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验
}
