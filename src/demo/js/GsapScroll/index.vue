<template>
  <div class="container">
    <OppoFindX3></OppoFindX3>

    <!--
    <SwitchPhone></SwitchPhone>

    <MacbookProChip></MacbookProChip>
    <MacProVideoPlayer></MacProVideoPlayer>
    <GsapBaseDemo></GsapBaseDemo> -->
  </div>
</template>

<script setup lang="ts">
import SwitchPhone from "./demo/1/index.vue"
import MacProVideoPlayer from "./demo/2/index.vue"
import GsapBaseDemo from "./demo/3/index.vue"
import OppoFindX3 from "./oppo/index.vue"
import MacbookProChip from "./demo/5/index.vue"

import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
// import ScrollSmoother from "gsap-trial/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause",
  // scroller: ".container",
})
onMounted(() => {})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  overflow-x: hidden;
}
</style>
./oppo/index.vue
