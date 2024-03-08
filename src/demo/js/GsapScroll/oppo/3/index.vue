<template>
  <!-- 第三个场景 -->
  <section class="new_word" style="position: relative; margin-top: -620px; height: 100vh; min-height: 500px">
    <!-- 背景遮罩上一层，图片，先隐藏，等 1 结束后，再显示  -->
    <div class="new_word-main" style="opacity: 0; z-index: 2; position: relative">
      <!-- 文本区域-->
      <div
        class="comp-border-text text-block"
        style="position: absolute; text-align: center; z-index: 3; opacity: 1; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)"
      >
        <div class="comp-angle-block inner">
          <div class="comp-inner">
            <div class="title comp-angle-block-fade-in">10 亿色，</div>
            <div class="title comp-angle-block-fade-in">打开手机色彩新世界</div>
            <div class="detail comp-angle-block-fade-in" style="width: 480px">
              搭载全链路 10bit 色彩引擎，重写手机与色彩的定义。
              <br class="g--pt-hidden" />
              影像可捕捉前所未有的丰富细节、存储忠实无损，屏幕呈现细腻惊艳。10 亿色彩在每个环节澎湃奔涌，如此绚丽利器，静候你解锁。
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mask" style="opacity: 1"></div> -->
      <img class="new_word-bg" src="../assets/section-6-2.jpg" />
    </div>

    <!-- 背景遮罩 -->
    <div class="bg-mask"></div>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

onMounted(() => {
  ScrollTrigger.create({
    trigger: ".new_word",
    start: "top top",
    end: "bottom top",
    pin: ".new_word",
    pinType: "fixed",
  })

  gsap.to(".bg-mask", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".new_word",
      start: "top 200px",
      end: "+200 top",
      scrub: true, // 表示动画可以重复执行改成false表示只执行一次
      onEnterBack() {},
      onLeave() {
        gsap.to(".new_word-main", {
          opacity: 1,
          scrollTrigger: {
            trigger: ".new_word",
            start: "top top",
            scrub: true, // 表示动画可以重复执行改成false表示只执行一次
            // markers: true, // 绘制开始位置和结束位置的线条
            // pin: true,
          },
        })
      },
    },
  })
})
</script>

<style lang="scss" scoped>
.new_word {
  pointer-events: none;

  .new_word-bg {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  .bg-mask {
    opacity: 0;
    position: absolute;
    inset: 0;
    background: #000;
    z-index: 1;
  }

  .comp-inner {
    .title {
      font-size: 35px;
      line-height: 46px;
    }
    .detail {
      margin: 25px auto 0;
      font-size: 15px;
      line-height: 23px;
    }
  }
}
</style>
