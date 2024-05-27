## 主题设置文章

编辑器主题文章：https://segmentfault.com/a/1190000040746839#item-4-2

## 获取 vscode 主题

1. 有两种方法，如果某个主题已经在你的 VSCode 里安装并正在使用的话，那么可以按 F1 或 Command/Control + Shift + P 或鼠标右键点击 Command Palette/命令面板，接着找到并点击 Developer:Generate Color Theme From Current Setting/ 开发人员:使用当前设置生成颜色主题，然后 VSCode 就会生成一份 json 数据，保存即可
2. 如果某个主题没有安装的话，那么可以去 vscode 主题商店搜索该主题，进入主题详情页面后点击右侧的 Download Extension 按钮即可下载该主题，下载完成后找到刚才下载的文件，文件应该是以 .vsix 结尾，直 的接把该后缀改成.zip，然后解压缩，最后打开里面的/extension/themes/文件夹，里面的.json文件即主题文件，打开该文件复制 json 数据即可。

## 设置语法

1. [语法列表](https://github.com/microsoft/vscode/tree/94c9ea46838a9a619aeafb7e8afd1170c967bb55/extensions)中找到对应的语言
2. 在语言文件夹中找到 `grammars` language 就是语言 id，scopeName 就是作用域名称。常见的如下：
   ```json
    "grammars": [
      {
        "language": "css",
        "scopeName": "source.css",
        "path": "./syntaxes/css.tmLanguage.json",
        "tokenTypes": {
          "meta.function.url string.quoted": "other"
        }
      }
    ]
   ```
   常见语法映射
   ```js
   const scopeNameMap = {
     html: "text.html.basic",
     pug: "text.pug",
     css: "source.css",
     less: "source.css.less",
     scss: "source.css.scss",
     typescript: "source.ts",
     javascript: "source.js",
     javascriptreact: "source.js.jsx",
     coffeescript: "source.coffee",
   }
   ```

### 官方语法设置 demo

https://github.com/bolinfest/monaco-tm
