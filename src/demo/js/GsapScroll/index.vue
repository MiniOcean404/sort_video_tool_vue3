<template>
  <div class="container">
    <!-- <OppoFindX3></OppoFindX3> -->

    <!-- <SwitchPhone></SwitchPhone>

    <MacbookProChip></MacbookProChip>
    <MacProVideoPlayer></MacProVideoPlayer> -->

    <GsapBaseDemo></GsapBaseDemo>

    <!-- <Honor></Honor> -->
  </div>
</template>

<script setup lang="ts">
import SwitchPhone from "./SwitchPhone/index.vue"
import MacProVideoPlayer from "./MacProVideoPlayer/index.vue"
import GsapBaseDemo from "./GsapBaseDemo/index.vue"
import OppoFindX3 from "./oppo/index.vue"
import MacbookProChip from "./MacbookProChip/index.vue"
import Honor from "./honor/index.vue"

import { SplitText } from "gsap-trial/SplitText"
import ScrollTrigger from "gsap/ScrollTrigger"

import gsap from "gsap"

// @ts-ignore
gsap.config({ trialWarn: false })
gsap.registerPlugin(ScrollTrigger, SplitText)

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause",
  // scroller: ".container", // 滚动根容器
})

gsap.registerEffect({
  name: "rainbow",
  extendTimeline: true, // extendTimeline设置为true,可以直接在任何GSAP时间线上调用效果
  effect: (target: HTMLDivElement, config: Object) => {
    let split = new SplitText(target, { type: "chars,words,lines" })
    return gsap.from(split.chars, { opacity: 0, y: -100, stagger: 0.05 }, config.label)
  },
})

gsap.registerEffect({
  name: "tech4",
  extendTimeline: true,
  effect: function (targets: HTMLDivElement[], config) {
    let tl = gsap
      .timeline()
      // 整个svg从放大效果回到正常
      .from(targets[0], {
        duration: 0.5,
        scale: 5,
        yPercent: 80,
      })
      // 标题逐渐显示
      .to(targets[1], {
        duration: 0.5,
        opacity: 1,
      })
      // 副标题从下向上滚动
      .fromTo(
        targets[2],
        {
          y: 60,
        },
        {
          y: 0,
          opacity: 1,
        },
      )
    // link链接从下向上滚动
    if (targets[3]) {
      tl.fromTo(
        targets[3],
        {
          y: 60,
        },
        {
          y: 0,
          autoAlpha: 1,
        },
      )
    }
    return tl
  },
})

onMounted(() => {})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  overflow: hidden;
}
</style>
@/demo/js/GsapScroll/utils/global
