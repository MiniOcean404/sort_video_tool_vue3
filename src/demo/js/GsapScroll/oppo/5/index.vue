<template>
  <!-- 第四部分 -->
  <div class="phone-params">
    <div class="text-view">
      <div class="title comp-angle-block-fade-in-left fade-in">10 亿色臻彩屏，</div>
      <div class="title comp-angle-block-fade-in-left fade-in">震撼色彩，流畅奔涌</div>
      <div class="spots">
        <div class="item">
          <div class="name">10.7 亿色</div>
          <div class="info">色彩显示</div>
        </div>
        <div class="item">
          <div class="name">120Hz</div>
          <div class="info">
            智能动态帧率
            <sup>4</sup>
          </div>
        </div>
        <div class="item">
          <div class="name">O1</div>
          <div class="info">
            超感画质引擎
            <sup>5</sup>
          </div>
        </div>
        <div class="item">
          <div class="name">O-Sync</div>
          <div class="info">
            超频响应
            <sup>6</sup>
          </div>
        </div>
      </div>
    </div>
    <img class="sec-bg" src="../assets/section6-3-2-hvga.png" />
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap"

onMounted(() => {
  /* 场景切换 gsap 固定页面 + clip-path */
  gsap.to(".phone-params", {
    // duration: 10,
    // gsap.to 设置 clip-path 属性变更
    // https://greensock.com/forums/topic/32322-clip-path-to-gsap-animation/
    // 变更 css 变量
    "--clip": "0", //clip-path(100% 0 0) => clip-path(0 0 0)
    scale: 1,
    scrollTrigger: {
      trigger: ".area-3-4-box",
      start: "top top",
      end: "+800 top",
      //   markers: true,
      scrub: true,
      pin: true,
      pinType: "fixed",

      onEnterBack() {
        const text = document.querySelector(".phone-params .text-view") as HTMLDivElement
        text.classList.remove("active")
      },
      onLeave() {
        const text = document.querySelector(".phone-params .text-view") as HTMLDivElement
        text.classList.add("active")
      },
    },
  })
})
</script>

<style lang="scss" scoped>
// 第四
.phone-params {
  transform: scale(1.15);
  clip-path: inset(var(--clip) 0 0);
  z-index: 10;

  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100vh;
  min-height: 800px;

  .sec-bg {
    width: 100%;
    height: 100%;
  }

  .text-view {
    right: 900px;
    top: 220px;

    .title {
      font-size: 35px;
      line-height: 54px;
      text-align: left;
    }

    .name {
      font-size: 25px;
      line-height: 36px;
    }

    .info {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
    }

    & > div {
      clip-path: inset(0 50% 0 50%);
      transition: clip-path 0.7s;
    }

    &.active > div {
      clip-path: inset(0 0 0 0);
    }
  }
}
</style>
