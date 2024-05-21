## 文章

https://juejin.cn/post/7362309246556520487?searchId=20240521205712BF29FE9AFEC1E505D2AB

## 核心

可以直接导入代码直接运行

```js
const code =`
    function add(a, b) {
        return a + b;
    }
    export { add };
`;

const url = URL.createObjectURL(new Blob([code], { type: 'application/javascript' }));
const code2 = `import { add } from "${url}";
```

```html
<!-- importmap 可以直接声明包依赖 -->
<script type="importmap">
  {
    "imports": {
      "vue": "https://cdn.skypack.dev/vue@next"
    }
  }
</script>

<script type="module">
  import { createApp } from "vue"
  console.log(createApp())
</script>
```
