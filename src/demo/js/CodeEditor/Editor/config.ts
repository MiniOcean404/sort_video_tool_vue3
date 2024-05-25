import type { editor } from "monaco-editor"

export const config: editor.IStandaloneEditorConstructionOptions = {
  fontSize: 16,
  contextmenu: true, // 启用上下文菜单
  folding: true, // 是否启用代码折叠
  links: true, // 是否点击链接

  // 预览图设置
  minimap: {
    enabled: true, // 是否启用预览图
  },

  // 注释配置
  comments: {
    ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
    insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
  },

  automaticLayout: true, // 启用编辑器将安装 ResizeObserver 来检查其容器 dom 节点大小是否已更改。默认为 false。
  readOnly: false, // 是否为只读模式

  cursorWidth: 1, // <=25 光标宽度
  cursorStyle: "line", // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
  cursorSmoothCaretAnimation: "on", // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
  cursorBlinking: "smooth", // 光标动画样式

  roundedSelection: true, // 使用圆角边框呈现编辑器选区
  formatOnPaste: true, // 在粘贴的时候格式化
  columnSelection: true, // 启用列编辑 按下 shift 键位然后按↑↓键位可以实现列选择 然后实现列编辑
  autoClosingBrackets: "always", // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
  autoClosingDelete: "always", // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
  autoClosingOvertype: "always", // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
  autoClosingQuotes: "always", // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
  copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到 word 中是否保持文字高亮颜色

  useTabStops: false, // 在制表符之后插入和删除空白。
  quickSuggestionsDelay: 10, // 快速建议延迟
  acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
  acceptSuggestionOnEnter: "smart", // 接受输入建议 "on" | "off" | "smart"

  codeLens: true, // 是否显示 codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
  codeLensFontFamily: "", // codeLens 的字体样式
  codeLensFontSize: 13, // codeLens 的字体大小
  colorDecorators: true, // 呈现内联色彩装饰器和颜色选择器

  autoSurround: "never", // 是否应自动环绕选择
  cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
  cursorSurroundingLinesStyle: "all", // "default" | "all" 光标环绕样式

  scrollbar: {
    verticalScrollbarSize: 5, // 竖直滚动条大小
    horizontalScrollbarSize: 5, // 水平滚动条大小
    arrowSize: 11, // 滚动条箭头大小
    alwaysConsumeMouseWheel: true, // 是否总是消耗鼠标滚轮事件
  },

  overviewRulerBorder: true, // 是否应围绕概览标尺绘制边框
  renderLineHighlight: "all", // 高亮行
  scrollBeyondLastLine: false, // 是否到了最后一行之后依然可以滚动一屏，关闭后就不会了
  lineNumbers: "on",
  lineNumbersMinChars: 0,

  autoIndent: "advanced",
  formatOnType: true,

  accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
  accessibilitySupport: "on", // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。

  glyphMargin: true, // 是否显示行数前面的小块标记

  inlineSuggest: {
    enabled: true,
    showToolbar: "onHover",
    mode: "subword",
    suppressSuggestions: false,
  },
}
