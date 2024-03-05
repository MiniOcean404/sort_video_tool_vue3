<template>
  <div class="container">
    <SwitchPhone></SwitchPhone>
    <!-- <AirPodsImagePlayer></AirPodsImagePlayer> -->

    <section class="wapper">
      <MacbookProChip></MacbookProChip>
      <MacProVideoPlayer></MacProVideoPlayer>

      <GsapBaseDemo></GsapBaseDemo>
    </section>
  </div>
</template>

<script setup lang="ts">
// 文章：https://juejin.cn/post/7195850600504262714?searchId=20240304141146CED8434363DDAD11CC57
// 文章：https://juejin.cn/post/7167273586607161375
// https://github.com/dev-zuo/nice-func
// 参考地址：https://cookthevibe.com/

import SwitchPhone from "./1/index.vue"
import MacProVideoPlayer from "./2/index.vue"
import AirPodsImagePlayer from "./4/index.vue"
import GsapBaseDemo from "./3/index.vue"
import MacbookProChip from "./5/index.vue"

import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
// import ScrollSmoother from "gsap-trial/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause",
  scroller: ".container",
})
onMounted(() => {})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
</style>
