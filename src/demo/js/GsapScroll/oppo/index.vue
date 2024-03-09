<template>
  <div class="find_x3_box">
    <FirstScreen></FirstScreen>
    <TwoScreen></TwoScreen>
    <ThreeScreen></ThreeScreen>

    <!-- 第 四、五 个场景 -->
    <section class="part-3-4-box">
      <div class="area-3-4-box">
        <FoureScreen></FoureScreen>
        <FiveScreen></FiveScreen>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 原地址：http://nice.zuo11.com/3-find-x3-mars/section-5-6.html

import FirstScreen from "./1/index.vue"
import TwoScreen from "./2/index.vue"
import ThreeScreen from "./3/index.vue"
import FoureScreen from "./4/index.vue"
import FiveScreen from "./5/index.vue"

onMounted(() => {
  // section-6 第二个盖住第三个，核心是，第二个 margin-top: -100vh;
  // fix 在 .gb-mask 结束遮罩 onLeave 钩子中 gsap.to 使用 pin 时，动画回放后再次执行 pin 位置异常问题
  // 参考：https://codepen.io/GreenSock/pen/YzXdbQo
})
</script>

<style lang="scss">
/*第一 */
.find_x3_box {
  --clip: 100%;

  background: #0e0e0e;
  color: white;
  overflow-x: hidden;

  .part-3-4-box {
    text-align: center;
    height: calc(100vh + 1600px);

    .area-3-4-box {
      position: relative;
      pointer-events: none;

      .text-view {
        position: absolute;
        right: 1074px;
        top: 106px;

        p {
          clip-path: inset(0 100% 0 0);
          transition: clip-path 0.7s; /* 0.7 秒完成 */
          text-align: left;
        }

        p:nth-child(2) {
          transition: clip-path 1.5s;
        }

        p:nth-child(3) {
          transition: clip-path 2s;
        }

        .spots {
          display: flex;
          flex-wrap: wrap;
          width: 357px;
          padding-top: 30px;

          .item {
            text-align: left;
            width: 49%;
            margin-top: 25px;
          }
        }
      }
    }
  }
}
</style>
