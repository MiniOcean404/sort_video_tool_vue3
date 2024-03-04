<template>
  <div class="rotate-box">
    <div class="phone-select">
      <div class="phone-select-title">神技能爆满</div>

      <!-- 点击选择区域 -->
      <div class="phone-select-right">
        <!-- 选择的款式区域 -->
        <div id="color-text"></div>
        <!-- 款式列表 -->
        <div class="colors" @click="change_phone">
          <label>
            <span id="midnight" class="colors-item"></span>
          </label>
          <label>
            <span id="starlight" class="colors-item"></span>
          </label>
          <label>
            <span id="red" class="colors-item"></span>
          </label>
          <label>
            <span id="blue" class="colors-item"></span>
          </label>
          <label>
            <span id="purple" class="colors-item"></span>
          </label>
          <label>
            <span id="yellow" class="colors-item"></span>
          </label>
          <div class="new-style">新款</div>
        </div>
      </div>
    </div>

    <!-- 手机展示区域 -->
    <div class="iphone-images" data-active="">
      <figure class="midnight"></figure>
      <figure class="starlight"></figure>
      <figure class="red"></figure>
      <figure class="blue"></figure>
      <figure class="purple"></figure>
      <figure class="yellow"></figure>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ColorsMap {
  [key: string]: string
}

const colorsMap: ColorsMap = {
  midnight: "午夜色",
  starlight: "星光色",
  red: "红色",
  blue: "蓝色",
  purple: "紫色",
  yellow: "黄色",
}

onMounted(async () => {
  // 页面加载完成后，逐一显示 iphone 图片
  for (let color in colorsMap) {
    await new Promise((resolve) => setTimeout(resolve, 50))

    let current_phone = document.querySelector(`.iphone-images .${color}`)! as HTMLElement
    current_phone.style.opacity = "1"
  }
  await new Promise((r) => setTimeout(r, 500)) // 停留 0.5s

  let yellow_phone = document.querySelector("#yellow")! as HTMLElement
  yellow_phone.click() // focus 到黄色
})

function change_phone(e: MouseEvent) {
  const target = e.target as HTMLElement
  const id = target.id
  const parent = target.parentNode as HTMLElement

  if (target.nodeName === "SPAN") {
    // 选择手机切换
    document.querySelectorAll(".colors label").forEach((item) => item.classList.remove("active"))
    parent.classList.add("active")
    const text = document.querySelector("#color-text") as HTMLSpanElement
    text.innerText = colorsMap[id]

    // 旋转手机切换
    document.querySelectorAll(".iphone-images figure").forEach((item) => item.classList.remove("active"))

    let curImg = document.querySelector(`.iphone-images .${id}`)!
    curImg.classList.add("active")

    const current_active = document.querySelector(`.iphone-images`)! as HTMLDivElement
    // 给图片的父元素增加自定义属性值
    current_active.dataset.active = id
  }
}
</script>

<style lang="scss" scoped>
.rotate-box {
  overflow: hidden;
  height: 100%;
  padding-top: 90px;

  // 选择手机
  .phone-select {
    display: flex;
    justify-content: space-between;
    max-width: 980px;
    margin: 0 auto 60px;
    color: #1d1d1f;

    .phone-select-title {
      font-size: 46px;
      line-height: 1; // 让文字直接对其顶部
      font-weight: bold;
    }

    .phone-select-right {
      position: relative;
      z-index: 2; // 防止旋转图片遮挡点击范围
      display: flex;
      margin-right: 10px;
      font-size: 17px;
      font-weight: bold;
    }

    .colors {
      position: relative;
      display: flex;
      margin-left: 10px;

      #midnight {
        background-color: #31353a;
      }
      #starlight {
        background-color: #f0ece8;
      }
      #red {
        background-color: #e11c2a;
      }
      #blue {
        background-color: #c0cfde;
      }
      #purple {
        background-color: #e7d7e9;
      }
      #yellow {
        background-color: #f5e488;
      }

      .colors-item {
        display: inline-flex;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        cursor: pointer;
      }

      & > label {
        margin-left: 0.24em;
        width: 28px;
        height: 28px;
        padding: 2px;
        border: 2px solid transparent;
        border-radius: 50%;
      }

      label.active {
        border: 2px solid #0071e3;
      }

      .new-style {
        display: none;
        position: absolute;
        right: 1px;
        top: 30px;
        font-size: 12px;
        font-weight: normal;
        color: #bf4800;
      }
    }
  }

  // 手机旋转
  .iphone-images {
    position: relative;
    width: 1144px;
    height: 574px;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: 50% 50%;
    transition: transform 1s cubic-bezier(0.65, 0.05, 0.36, 1);

    figure {
      opacity: 0;
      transform-origin: 0 0;
      position: absolute;
      transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .midnight {
      left: 8px;
      top: 233px;
      width: 532px;
      height: 562px;
      background-size: 532px 562px;
      background-repeat: no-repeat;
      background-image: url(./images/hero_midnight.jpg);
      // 解决图片有白色空白，遮挡其他图片的问题
      mask-image: url(./images/midnight_mask.png);
      transform: scale(0.51);

      // 选中时候向上移动
      &.active {
        transform: translate(-2.9681683365%, -1.8547174248%) scale(0.527) !important;
      }
    }
    .starlight {
      left: 111px;
      top: 118px;
      width: 518px;
      height: 582px;
      background-size: 518px 582px;
      background-repeat: no-repeat;
      background-image: url(./images/hero_starlight.jpg);
      mask-image: url(./images/starlight_mask.png);
      transform: scale(0.52);
      &.active {
        transform: translate(-2.2962066015%, -2.6414835308%) scale(0.54) !important;
      }
    }

    .red {
      left: 259px;
      top: 49px;
      width: 450px;
      height: 568px;
      background-size: 450px 568px;
      background-repeat: no-repeat;
      background-image: url(./images/hero_red.jpg);
      mask-image: url(./images/red_mask.png);
      transform: scale(0.54);

      &.active {
        transform: translate(-2.2497566339%, -2.6811555509%) scale(0.54) !important;
      }
    }

    .blue {
      left: 437px;
      top: 22px;
      width: 366px;
      height: 578px;
      background-size: 366px 578px;
      background-repeat: no-repeat;
      background-image: url(./images/hero_blue.jpg);
      mask-image: url(./images/blue_mask.png);
      transform: scale(0.573);
      &.active {
        transform: translate(-0.4871058534%, -3.4659382406%) scale(0.59) !important;
      }
    }
    .purple {
      left: 629px;
      top: 18px;
      width: 336px;
      height: 620px;
      background-size: 336px 620px;
      background-repeat: no-repeat;
      background-image: url(./images/hero_purple.jpg);
      mask-image: url(./images/purple_mask.png);
      transform: scale(0.67);
      &.active {
        transform: translate(-0.4871058534%, -3.4659382406%) scale(0.683) !important;
      }
    }
    .yellow {
      left: 781px;
      top: 68px;
      width: 428px;
      height: 616px;
      background-size: 428px 616px;
      background-repeat: no-repeat;
      background-image: url(./images/hero_yellow.jpg);
      mask-image: url(./images/yellow_mask.png);
      transform: scale(0.86);
      // transform: matrix(0.86, 0, 0, 0.86, 0, 0);
      &.active {
        transform: translate(0.6077686218%, -3.4468271355%) scale(0.88) !important;
      }
    }
  }

  // 旋转手机整体移动 旋转矩阵
  [data-active="yellow"].iphone-images {
    transform: rotate(-24deg) scale(1.142) translate(-661px, -170px);
  }
  [data-active="purple"].iphone-images {
    transform: scale(1.38) translate(-462px, 95px) rotate(-9deg);
  }
  [data-active="blue"].iphone-images {
    transform: scale(1.619) rotate(10deg) translate(-302px, 173px);
  }
  [data-active="red"].iphone-images {
    transform: scale(1.811) rotate(24deg) translate(-120px, 241px);
  }
  [data-active="starlight"].iphone-images {
    transform: matrix(1.50347, 1.10184, -1.10184, 1.50347, -224.817, 414.932);
  }
  [data-active="midnight"].iphone-images {
    transform: matrix(1.24651, 1.43395, -1.43395, 1.24651, -109.06, 498.232);
  }
}
</style>
