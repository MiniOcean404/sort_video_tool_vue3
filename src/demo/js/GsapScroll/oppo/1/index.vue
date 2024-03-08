<template>
  <section @mousemove="mouseShake" class="shake_box">
    <img class="shake_bg" src="../assets/section-5-bg.jpg" />
    <div class="wrap-main">
      <img src="../assets/section-5-1.png" />
      <img src="../assets/section-5-2.png" />
      <img src="../assets/section-5-3.png" />
      <img src="../assets/section-5-4.png" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import gsap from "gsap"

let shake_bg_el: HTMLDivElement | null
let img1: HTMLDivElement | null
let img2: HTMLDivElement | null
let img3: HTMLDivElement | null
let img4: HTMLDivElement | null

onMounted(() => {
  shake_bg_el = document.querySelector(".shake_bg")
  img1 = document.querySelector(".wrap-main img:nth-child(1)")
  img2 = document.querySelector(".wrap-main img:nth-child(2)")
  img3 = document.querySelector(".wrap-main img:nth-child(3)")
  img4 = document.querySelector(".wrap-main img:nth-child(4)")

  // 添加来回滚动的激活动画
  gsap.to(".shake_box", {
    scrollTrigger: {
      trigger: ".shake_box",
      toggleClass: "active", // 滚动时上下动画
      end: "+30",
      scrub: true, // 表示动画可以重复执行改成false表示只执行一次
    },
  })
})

function mouseShake(e: MouseEvent) {
  if (shake_bg_el && img1 && img2 && img3 && img4) {
    // 鼠标相对页面的位置
    let x = e.pageX
    let y = e.pageY
    // section-2 容器相对视口位置
    let parentX = shake_bg_el.offsetLeft
    let parentY = shake_bg_el.offsetTop
    let isYOut = y < parentY || y > parentY + shake_bg_el.clientHeight
    let isXOut = x < parentX || x > parentX + shake_bg_el.clientWidth
    if (isXOut || isYOut) {
      // console.log("移出去了");
      return
    }
    console.log(x - parentX, y - parentY)
    // 鼠标从左到右 x 偏移 20px => -20px，鼠标位置(x) 0 => 视口宽度(w)，得出公式：20 - (40*(x/w))
    // 鼠标从上到下 y 偏移 2px => -2px, 鼠标位置(y) 0 => 视口高度(h)，得出公式：2 - (4*(y/h))
    let mouseX = x - parentX
    let mouseY = y - parentY
    img1.style.transform = `translate(${20 - 40 * (mouseX / screen.width)}px,${4 - 8 * (mouseY / screen.height)}px)`
    img2.style.transform = `translate(${28 - 56 * (mouseX / screen.width)}px,${6 - 12 * (mouseY / screen.height)}px)`
    img3.style.transform = `translateX(${30 - 60 * (mouseX / screen.width)}px`
    // 鼠标从左到右， -14px => 14px，鼠标位置(x) 0 => 视口宽度(w)，-14 + (28*(x/w))
    // 鼠标从上到下 y 偏移 -2px => 2px, 鼠标位置(y) 0 => 视口高度(h)，得出公式：-2 + (4*(y/h))
    img4.style.transform = `translate(${-30 + 60 * (mouseX / screen.width)}px,${-6 + 12 * (mouseY / screen.height)}px)`
    shake_bg_el.style.transform = `scale(1.2) translate(${-8 + 16 * (mouseX / screen.width)}px,${-2 + 4 * (mouseY / screen.height)}px)`
  }
}
</script>

<style lang="scss" scoped>
.shake_box {
  position: relative;
  overflow: hidden;
  height: 800px;

  .shake_bg {
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.2);
  }

  img {
    position: absolute;
  }

  &.active .wrap-main {
    transform: translate(-50%, -50%);
  }
}

.wrap-main {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  height: 600px;
  width: 950px;
  position: absolute;
  transition: all 1s;

  img {
    position: absolute;
    height: 263px;
  }

  img:nth-child(1) {
    top: 0;
    left: 21px;
    z-index: 4;
  }
  img:nth-child(2) {
    top: 70px;
    left: 140px;
    z-index: 3;
  }

  img:nth-child(3) {
    top: 189px;
    left: 336px;
    z-index: 2;
  }

  img:nth-child(4) {
    top: 350px;
    left: 595px;
    z-index: 1;
  }
}
</style>
