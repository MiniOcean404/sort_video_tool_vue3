<template>
  <div class="phone-camera-box">
    <div class="desc-text">
      <div class="title">旗舰四摄，致敬探索，记录此刻</div>
      <div class="detail">
        两颗 10 亿色 5000 万像素旗舰主摄，场面再大，画面也出色。
        <br />
        60 倍显微镜，带你探索微观世界里的奇观。1300 万像素长焦，轻松拉近远方美好。
      </div>
    </div>

    <!-- 第三部分 -->
    <!-- <div class="phone-camera">
      <div class="camera-toggle-btn">
        <div class="active" @click="super_wide_angle_click">超广角</div>
        <div @click="microscope_click">显微镜</div>
      </div>

      <div class="s63-a-sec phone-camera-desc">
        <div class="text-view">
          <p style="font-size: 36px; line-height: 52px; padding-bottom: 20px">超广角</p>
          <div class="sec-line"></div>
          <div>
            <p>5000 万像素超广角</p>
            <p>Sony IMX766 传感器</p>
            <p>1/1.56" 感光面积</p>
          </div>
        </div>
        <div class="sec-circle-scale"></div>
        <img class="sec-circle" src="../assets/section-6-3-1-camera-circle-outer.svg" />
      </div>
      <div class="s63-a-sec s63-a-sec2" style="opacity: 0">
        <div class="text-view">
          <p style="font-size: 36px; line-height: 52px; padding-bottom: 20px">显微镜</p>
          <div class="sec-line"></div>
          <div>
            <p>300 万像素显微镜</p>
            <p>f/3.0 光圈</p>
            <p>
              60 倍放大
              <sup>
                3
                <sup></sup>
              </sup>
            </p>
          </div>
        </div>
        <div class="sec-circle-scale"></div>
        <img class="sec-circle" src="../assets/section-6-3-1-camera-circle-outer.svg" />
      </div>
      <img class="sec-bg" src="../assets/section6-3-1-camera.png" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap"

onMounted(() => {
  gsap.to(".part-3-4-box", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".part-3-4-box",
      start: "top 100px",
      end: "+800 top",
      scrub: true,
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

  // 生成摄像头周围刻度 dom
  // type 第几个摄像头，默认为 1
  function generateLineDom(type: string) {
    let len = 240
    let fragment = document.createDocumentFragment()

    for (let i = 0; i < len; i++) {
      let el = document.createElement("div")
      //   console.log("el", el, el.classList);
      el.classList.add(`id-${i}`)
      el.classList.add(`line`)
      // 0 => 239
      // 1.5deg  => 360deg
      // -102
      el.style.transform = `translateX(-102px) rotate(${(i + 1) * 1.5}deg)`
      fragment.appendChild(el)
    }
    let parentEl = document.querySelector(`.s63-a-sec${type} .sec-circle-scale`) as HTMLDivElement

    parentEl.append(fragment)
  }
})

function super_wide_angle_click(e: MouseEvent) {
  const target = e.target as HTMLDivElement

  // 切换 active
  document.querySelectorAll(".camera-toggle-btn div").forEach((item) => item.classList.remove("active"))
  target.classList.toggle("active")

  // 切换文案区域
  document.querySelector(".phone-camera-desc").style.opacity = "1"
  document.querySelector(".phone-camera-desc").classList.add("active")
  document.querySelector(".s63-a-sec2").style.opacity = "0"
  document.querySelector(".s63-a-sec2").classList.remove("active")
}

function microscope_click(e: MouseEvent) {
  const target = e.target as HTMLDivElement

  // 切换 active
  document.querySelectorAll(".camera-toggle-btn div").forEach((item) => item.classList.remove("active"))
  target.classList.toggle("active")

  // 切换文案区域
  document.querySelector(".phone-camera-desc").style.opacity = "0"
  document.querySelector(".phone-camera-desc").classList.remove("active")
  document.querySelector(".s63-a-sec2").style.opacity = "1"
  document.querySelector(".s63-a-sec2").classList.add("active")
}
</script>

<style lang="scss" scoped>
.phone-camera-box {
  position: absolute;
  top: 0;
  bottom: 0;

  .desc-text {
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

  /**第三 */
  .phone-camera {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 100vh;
    min-height: 800px;

    .sec-circle {
      position: absolute;
      z-index: 1;
      right: 489px;
      top: 106px;
      width: 216px;
      transition: all 1s;
    }
    .s63-a-sec2 .sec-circle {
      right: 686px;
      top: 249px;
      transform: scale(0.92);
    }

    .s63-a-sec.s63-a-sec2.active .sec-circle {
      right: 686px;
      top: 249px;
      transform: scale(0.92) rotate(180deg);
    }

    /* 加上 active 后，圆圈旋转 180° */
    .s63-a-sec.active .sec-circle {
      transform: rotate(180deg);
    }

    /* active 后，文字显示，*/
    .s63-a-sec.active .text-view p {
      clip-path: inset(0 0 0 0);
    }

    .text-view {
      p {
        margin: 1em 0;
      }
    }

    .sec-bg {
      width: 999px;
      height: 888px;
    }
    .sec-circle-scale .line {
      position: absolute;
      height: 1px;
      width: 7px;
      top: 213px;
      right: 590px;
      background: #fff;
      transform-origin: 102px 0;
    }
    .s63-a-sec2 .sec-circle-scale .line {
      top: 358px;
      right: 779px;
      transform-origin: 94px 0;
    }
    .sec-line {
      width: 533px;
      height: 1px;
      background: rgba(255, 255, 255, 0.5);
      -webkit-transform-origin: 100% 0;
      transform-origin: 100% 0;
      position: absolute;
      right: -367px;
      top: 110px;
    }
    .s63-a-sec2 .sec-line {
      width: 315px;
      right: -184px;
    }

    .s63-a-sec2 .text-view {
      right: 1075px;
      top: 231px;
    }

    .camera-toggle-btn {
      position: absolute;
      right: 1200px;
      font-size: 20px;
    }
    .camera-toggle-btn div {
      padding: 10px 20px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .camera-toggle-btn div.active {
      border: 1px solid #666;
      border-radius: 5px;
    }
  }
}
</style>
