<template>
  <div class="find_x3_box">
    <FirstScreen></FirstScreen>
    <TwoScreen></TwoScreen>
    <ThreeScreen></ThreeScreen>

    <FoureScreen></FoureScreen>
    <FiveScreen></FiveScreen>
  </div>
</template>

<script setup lang="ts">
import FirstScreen from "./1/index.vue"
import TwoScreen from "./2/index.vue"
import ThreeScreen from "./3/index.vue"
import FoureScreen from "./4/index.vue"
import FiveScreen from "./5/index.vue"

import gsap from "gsap"

onMounted(() => {
  // section-6 第二个盖住第三个，核心是，第二个 margin-top: -100vh;
  // fix 在 .gb-mask 结束遮罩 onLeave 钩子中 gsap.to 使用 pin 时，动画回放后再次执行 pin 位置异常问题
  // 参考：https://codepen.io/GreenSock/pen/YzXdbQo

  const t1 = gsap.timeline()

  // 添加来回滚动的激活动画
  t1.to(".shake_box", {
    scrollTrigger: {
      trigger: ".shake_box",
      toggleClass: "active", // 滚动时上下动画
      start: "top bottom", // 触发动画的位置
      end: "bottom top",
      scrub: true, // 表示动画可以重复执行改成false表示只执行一次
    },
  })

  t1.to(".linear-phone", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".linear-phone",
      scrub: true,
      // markers: { indent: 0 }, // 绘制开始位置和结束位置的线条
      start: "top top",
      end: "bottom top",
    },
  })

  t1.to(".new_word", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".new_word",
      start: "top top",
      end: "bottom top",
      scrub: true, // 表示动画可以重复执行改成false表示只执行一次
      // markers: { indent: 30 }, // 绘制开始位置和结束位置的线条
      pin: true,
      pinType: "fixed",
    },
  })

  t1.to(".phone-camera", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".phone-camera",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      pinType: "fixed",
      markers: true,
      toggleClass: {
        targets: ".phone-camera-desc",
        className: "active",
      },
      onEnter() {
        generateLineDom("1") // 第一个摄像头刻度
        generateLineDom("2") // 第2个摄像头刻度
      },
    },
  })

  t1.to(".phone-params", {
    clipPath: "inset(0% 0% 0%)", //clip-path(100% 0 0) => clip-path(0 0 0)
    scale: 1,
    scrollTrigger: {
      trigger: ".phone-params",
      start: "top top",
      end: "bottom top",
      markers: { indent: 30 },
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

// 生成摄像头周围刻度 dom
// type 第几个摄像头，默认为 1
function generateLineDom(type: string) {
  let len = 240
  let fragment = document.createDocumentFragment()

  for (let i = 0; i < len; i++) {
    let el = document.createElement("div")
    el.classList.add(`id-${i}`)
    el.classList.add(`line`)
    el.style.transform = `translateX(-102px) rotate(${(i + 1) * 1.5}deg)`
    fragment.appendChild(el)
  }

  let parentEl = document.querySelector(`.camera${type} .sec-circle-scale`) as HTMLDivElement
  parentEl.append(fragment)
}
</script>

<style lang="scss">
/*第一 */
.find_x3_box {
  background: #000;
  color: white;

  .desc-text {
    text-align: center;
    padding: 150px 0;

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
</style>
