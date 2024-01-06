<template>
  <div class="bg">
    <p>CSS Relative Color</p>
  </div>
</template>

<style scoped lang="scss">
@property --color {
  // syntax 可接收的值：
  // color、
  // length 0px、
  // angle 0deg、
  // number 0
  syntax: "<color>";
  inherits: false;
  initial-value: #000;
}

p {
  height: 0;
  background: var(--color);
  // 目前还没有浏览器支持
  // color: color-contrast(var(--color) vs red, blue); /** 基于背景色，自动选择对比度更高的颜色 **/

  color: rgb(from var(--color) calc(1 - r) calc(1 - g) calc(1 - b));
  animation: color-change 3s linear 0s infinite alternate forwards running;
}

@keyframes color-change {
  0% {
    height: 0;
    --color: blue;
  }

  100% {
    height: 300px;
    --color: red;
  }
}
</style>
