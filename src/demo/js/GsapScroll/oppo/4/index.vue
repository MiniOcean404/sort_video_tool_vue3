<template>
  <div class="desc-text">
    <div class="title">旗舰四摄，致敬探索，记录此刻</div>
    <div class="detail">
      两颗 10 亿色 5000 万像素旗舰主摄，场面再大，画面也出色。
      <br />
      60 倍显微镜，带你探索微观世界里的奇观。1300 万像素长焦，轻松拉近远方美好。
    </div>
  </div>

  <!-- 第三部分 -->
  <div class="phone-camera">
    <div class="toggle-btn">
      <div class="active" @click="super_wide_angle_click">超广角</div>
      <div @click="microscope_click">显微镜</div>
    </div>

    <div class="example-camera-box">
      <div class="camera1 phone-camera-desc">
        <div class="common_text_style text-view">
          <p style="font-size: 36px; line-height: 52px; padding-bottom: 20px">超广角</p>
          <div>
            <p>5000 万像素超广角</p>
            <p>Sony IMX766 传感器</p>
            <p>1/1.56" 感光面积</p>
          </div>
        </div>
        <div class="camera-circle"></div>

        <div class="sec-line"></div>
        <img class="sec_circle_common sec-circle" src="../assets/section-6-3-1-camera-circle-outer.svg" />
      </div>

      <div class="camera2" style="opacity: 0">
        <div class="common_text_style text-view">
          <p style="font-size: 36px; line-height: 52px; padding-bottom: 20px">显微镜</p>
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
        <div class="camera-circle"></div>

        <div class="sec-line"></div>
        <img class="sec_circle_common sec-circle" src="../assets/section-6-3-1-camera-circle-outer.svg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {})

function super_wide_angle_click(e: MouseEvent) {
  const target = e.target as HTMLDivElement

  // 切换 active
  document.querySelectorAll(".toggle-btn div").forEach((item) => item.classList.remove("active"))
  target.classList.toggle("active")

  // 切换文案区域
  document.querySelector(".phone-camera-desc").style.opacity = "1"
  document.querySelector(".phone-camera-desc").classList.add("active")
  document.querySelector(".camera2").style.opacity = "0"
  document.querySelector(".camera2").classList.remove("active")
}

function microscope_click(e: MouseEvent) {
  const target = e.target as HTMLDivElement

  // 切换 active
  document.querySelectorAll(".toggle-btn div").forEach((item) => item.classList.remove("active"))
  target.classList.toggle("active")

  // 切换文案区域
  document.querySelector(".phone-camera-desc").style.opacity = "0"
  document.querySelector(".phone-camera-desc").classList.remove("active")
  document.querySelector(".camera2").style.opacity = "1"
  document.querySelector(".camera2").classList.add("active")
}
</script>

<style lang="scss" scoped>
.phone-camera {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @include media-device("phone") {
    background-size: 300px;
  }

  .example-camera-box {
    position: absolute;
    right: 0;
    background-image: url(../assets/section6-3-1-camera.png);
    background-repeat: no-repeat;
    background-size: 888px;
    width: 888px;
    height: 905px;

    .sec_circle_common {
      position: absolute;
      z-index: 1;

      width: 216px;
      transition: all 1s;
    }

    /* 加上 active 后，圆圈旋转 180° */
    .camera1 {
      position: absolute;
      top: 0px;
      width: inherit;
      height: inherit;

      &.active {
        .sec-circle {
          transform: rotate(180deg);
        }

        .text-view p {
          clip-path: inset(0 0 0 0);
        }
      }

      // 摄像头圈圈
      .sec-circle {
        right: 420px;
        top: 85px;
      }

      .text-view {
        right: 867px;
        top: 65px;
      }

      .sec-line {
        right: 635px;
      }
    }

    .camera2 {
      &.active {
        .sec-circle {
          transform: scale(0.92) rotate(180deg);
        }

        .text-view p {
          clip-path: inset(0 0 0 0);
        }
      }

      .sec-circle {
        right: 600px;
        top: 210px;
        transform: scale(0.92);
      }

      .camera-circle .line {
        top: 358px;
        right: 779px;
        transform-origin: 94px 0;
      }

      .sec-line {
        width: 315px;
        right: 806px;
        top: 310px;
      }

      .text-view {
        right: 820px;
        top: 200px;
      }
    }

    .camera-circle .line {
      position: absolute;
      height: 1px;
      width: 7px;
      top: 213px;
      right: 590px;
      background: #fff;
      transform-origin: 102px 0;
    }

    .sec-line {
      width: 533px;
      height: 1px;
      background: rgba(255, 255, 255, 0.5);
      -webkit-transform-origin: 100% 0;
      transform-origin: 100% 0;

      position: absolute;
      top: 180px;
    }
  }

  .common_text_style {
    width: 300px;

    p {
      clip-path: inset(0 100% 0 0);
      transition: clip-path 0.7s; /* 0.7 秒完成 */
      text-align: left;
      margin: 1em 0;

      &:nth-child(2) {
        transition: clip-path 1.5s;
      }

      &:nth-child(3) {
        transition: clip-path 2s;
      }
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

  .toggle-btn {
    position: absolute;
    right: 1200px;
    font-size: 20px;

    div {
      padding: 10px 20px;
      margin-bottom: 10px;
      cursor: pointer;

      &.active {
        border: 1px solid #666;
        border-radius: 5px;
      }
    }
  }
}
</style>
