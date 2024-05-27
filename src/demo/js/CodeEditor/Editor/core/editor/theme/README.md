## 主题设置文章

编辑器主题文章：https://segmentfault.com/a/1190000040746839#item-4-2

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
