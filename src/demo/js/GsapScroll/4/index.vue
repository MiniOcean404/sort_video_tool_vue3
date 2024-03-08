<template>
  <div class="find_x3_box">
    <!-- 第一个场景 -->
    <section @mousemove="mouseShake" class="shake_box">
      <img class="shake_bg" src="./assets/section-5-bg.jpg" />
      <div class="wrap-main">
        <img src="./assets/section-5-1.png" />
        <img src="./assets/section-5-2.png" />
        <img src="./assets/section-5-3.png" />
        <img src="./assets/section-5-4.png" />
      </div>
    </section>

    <!-- 第二个场景 -->
    <section id="linear-phone">
      <div class="translucent">
        <div class="comp-inner">
          <div class="title">全面了解色彩影像旗舰</div>
          <div class="detail">
            从捕捉、储存到显示全程 10 亿色²，隔着屏幕都能感受照片里的喜怒哀乐。
            <br />
            色彩唤醒感动，满满创新，等你慢慢揭开。
          </div>
        </div>

        <div class="buttons" style="margin: 50px auto 0">
          <div class="comp-angle-block small">
            <div class="comp-inner">探索更多 Find X3 系列</div>
          </div>
        </div>
        <img class="phone loaded" src="./assets/section-6-phone.png" />
      </div>
    </section>

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
        <img class="new_word-bg" src="./assets/section-6-2.jpg" />
      </div>

      <!-- 背景遮罩 -->
      <div class="bg-mask"></div>
    </section>

    <!-- 第 四、五 个场景 -->
    <section class="part-3-4-box" style="text-align: center">
      <div class="comp-inner" style="padding: 150px 0">
        <div class="title">旗舰四摄，致敬探索，记录此刻</div>
        <div class="detail">
          两颗 10 亿色 5000 万像素旗舰主摄，场面再大，画面也出色。
          <br />
          60 倍显微镜，带你探索微观世界里的奇观。1300 万像素长焦，轻松拉近远方美好。
        </div>
      </div>

      <div class="area-3-4-box">
        <!-- 第三部分 -->
        <div class="phone-camera">
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
            <img class="sec-circle" src="./assets/section-6-3-1-camera-circle-outer.svg" />
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
            <img class="sec-circle" src="./assets/section-6-3-1-camera-circle-outer.svg" />
          </div>
          <img class="sec-bg" src="./assets/section6-3-1-camera.png" />
        </div>

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
          <img class="sec-bg" src="./assets/section6-3-2-hvga.png" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 原地址：http://nice.zuo11.com/3-find-x3-mars/section-5-6.html
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

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

  // section-6 第二个盖住第三个，核心是，第二个 margin-top: -100vh;
  // fix 在 .gb-mask 结束遮罩 onLeave 钩子中 gsap.to 使用 pin 时，动画回放后再次执行 pin 位置异常问题
  // 参考：https://codepen.io/GreenSock/pen/YzXdbQo

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

<style scoped lang="scss">
/*第一 */
.find_x3_box {
  --clip: 100%;

  background: #0e0e0e;
  color: white;
  overflow-x: hidden;

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

  /*第二*/
  #linear-phone {
    margin-top: 80px;

    padding: 90px;
    text-align: center;

    .phone {
      margin: 80px auto 0;
      width: 380px;
      height: 380px;
    }
  }

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
  }

  .part-3-4-box {
    height: calc(100vh + 1600px);

    .area-3-4-box {
      position: relative;
      pointer-events: none;

      /**第三 */
      .phone-camera {
        position: absolute;
        top: 0;
        bottom: 0;
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
