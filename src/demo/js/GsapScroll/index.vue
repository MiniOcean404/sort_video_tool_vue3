<template>
  <!-- 第一屏 -->
  <div class="container">
    <section class="wapper-height">
      <div class="box1"></div>
      <div class="box2"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 文章：https://juejin.cn/post/7195850600504262714?searchId=20240304141146CED8434363DDAD11CC57
// 文章：https://juejin.cn/post/7167273586607161375
// https://github.com/dev-zuo/nice-func

import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  let t1 = gsap.timeline({
    scrollTrigger: {
      // 设置可股滚动的根容器
      scroller: document.querySelector(".container"),
      trigger: ".wapper-height .box1",
      // markers: true, // 辅助查看
      // endTrigger: "",
      pin: true, // 在执行时固定触发器元素
      /*
       * ⚠ start: 表示动画开始执行节点
       * ⚠ end: 表示动画执行结束
       * 参数1: 表示当前这个元素的开始执行动画的起点
       *      【0：就是当前这个元素的顶端位置】
       *      【正数：当前这个元素根据顶端位置进行向下偏移】
       *      【负数：当前这个元素根据顶端位置进行向上偏移】
       *
       * 参数2: 表示当前滚动条的起点执行位置
       *      【0：浏览器最顶端】
       *      【正数：向下偏移】
       *      【负数：向上偏移】
       * 当两个位置重合时，动画开始执行/结束
       * 此处的位置可以使用像素单位，完全可以自定义
       */
      // start: "top center", // trigger 元素的位置，滚动到时候的 参数2 位置时开始动画
      // end: "bottom bottom", // 在滚动 500 px后结束
      start: "0% 20%",
      end: "bottom 0%",
      scrub: 0, // 触发器1秒后跟上滚动条, true | 0 将动画的进度直接链接到 ScrollTrigger 的进度 false 只执行一次，不反向执行
      snap: {
        snapTo: "labels",
        duration: 1,
        delay: 0,
        ease: "power1.inOut",
      },
      onEnter: () => {
        console.log("滚动到start位置触发")
      },
      onEnterBack: () => {
        console.log("滚动超过end位置，再进入滚动区域触发")
      },
      onLeave: () => {
        console.log("滚出end位置时触发")
      },
      onLeaveBack: () => {
        console.log("滚出end位置，再滚回来超过start位置触发")
      },
      onToggle: (self) => {
        console.log("是否激活:", self.isActive)
      },
      onUpdate: (self) => {
        console.log("进度:", self.progress.toFixed(3), "方向:", self.direction, "速度", self.getVelocity())
      },
    },
  })

  t1.to(".wapper-height .box1", {
    rotation: 360,
    scale: 2,
    x: 300,
    opacity: 1,
    transformOrigin: "50% 50%",
    backgroundColor: "green",
    // x: document.documentElement.clientWidth,
    // x(index, target, targets) {
    //   return document.documentElement.clientWidth - target.clientWidth * 2
    // },
    // y: 300,
  })

  let t2 = gsap.timeline({
    scrollTrigger: {
      scroller: document.querySelector(".container"),
      trigger: ".wapper-height .box2",
      // markers: true,
      // endTrigger: "",
      pin: true, // 在执行时固定触发器元素
      start: "0% 60%",
      end: "bottom 0%",
      scrub: 0,
      snap: {
        snapTo: "labels",
        duration: 4,
        delay: 0,
        ease: "power1.inOut",
      },
    },
  })

  t2.to(".wapper-height .box2", {
    rotation: 360,
    scale: 2,
    x: 300,
    opacity: 1,
    transformOrigin: "50% 50%",
    backgroundColor: "green",
    // x: document.documentElement.clientWidth,
    // x(index, target, targets) {
    //   return document.documentElement.clientWidth - target.clientWidth * 2
    // },
    // y: 300,
  })
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  .wapper-height {
    height: 300vh;

    .box1 {
      margin-top: 200px;

      background-color: red;
      width: 100px;
      height: 100px;
    }

    .box2 {
      margin-top: 700px;

      background-color: blue;
      width: 100px;
      height: 100px;
    }
  }
}
</style>
