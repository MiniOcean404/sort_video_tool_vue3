<template>
  <div class="gsap-box">
    <div class="rect"></div>

    <div class="text">
      <div class="text_line">我是文字文字</div>
      <div class="text_line">我是文字文字</div>
      <div class="text_line">我是文字文字</div>
      <div class="text_line">我是文字文字</div>
      <div class="text_line">我是文字文字</div>
      <div class="text_line">我是文字文字</div>
    </div>

    <h1 class="h1">我是文字文字</h1>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap"

onMounted(() => {
  load()
})

function load() {
  let t1 = gsap.timeline({
    scrollTrigger: {
      // 触发滚动的容器
      trigger: ".gsap-box",
      // 辅助查看
      markers: true,
      // 滚动触发容器的结尾
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
      start: "0% 0%",
      end: "bottom+=6400 0%",
      scrub: 0, // 触发器1秒后跟上滚动条, true | 0 将动画的进度直接链接到 ScrollTrigger 的进度 false 只执行一次，不反向执行
      // refreshPriority: 1,
      snap: {
        snapTo: 0.01,
        duration: { min: 0.2, max: 3 },
        delay: 0,
        ease: "power1.inOut",
      },
      //   onEnter: () => {
      //     console.log("滚动到start位置触发")
      //   },
      //   onEnterBack: () => {
      //     console.log("滚动超过end位置，再进入滚动区域触发")
      //   },
      //   onLeave: () => {
      //     console.log("滚出end位置时触发")
      //   },
      //   onLeaveBack: () => {
      //     console.log("滚出end位置，再滚回来超过start位置触发")
      //   },
      //   onToggle: (self) => {
      //     console.log("是否激活:", self.isActive)
      //   },
      //   onUpdate: (self) => {
      //     console.log("进度:", self.progress.toFixed(3), "方向:", self.direction, "速度", self.getVelocity())
      //   },
    },
  })

  t1.addLabel("sync")

  t1.to(
    ".text_line",
    {
      duration: 1,
      stagger: 0.1,
      delay: 0.5,
      yoyo: true,
      reversed: false,
      repeat: -1,
      startAt: { y: 0 },
      keyframes: {
        "0%": { color: "#4c4c4c" },
        "25%": { color: "#4c4c4c" },
        "50%": { color: "#ffffff" },
        "75%": { color: "#4c4c4c" },
        "100%": { color: "#4c4c4c" },
      },

      y: -40,
    },
    "sync",
  )

  t1.rainbow(".h1", { label: "sync" })

  t1.to(
    ".rect",
    {
      duration: 0.5,

      rotation: 360,
      scale: 2,
      x: 300,
      opacity: 1,
      transformOrigin: "50% 50%",
      backgroundColor: "green",
    },
    "sync",
  )
}
</script>

<style lang="scss" scoped>
.gsap-box {
  .rect {
    background-color: red;
    width: 100px;
    height: 100px;
  }
}
</style>
