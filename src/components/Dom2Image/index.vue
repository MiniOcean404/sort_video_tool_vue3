<script setup lang="ts">
import { ref, reactive } from "vue"
import TimeIcon from "@/assets/image/time-icon.png"
import html2canvas from "html2canvas"

export interface Dom2ImageProp {
  title: string
  minute: number
  seconds: number
}

const props = defineProps<Dom2ImageProp>()

const config = reactive({
  borderSize: "15px",
})

const color = ref(randomColor())
const base64 = ref<string>("")
const cover = ref<HTMLElement>()

function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

async function start() {
  if (cover.value) {
    const canvas = await html2canvas(cover.value, { scale: window.devicePixelRatio * 2 })

    base64.value = canvas.toDataURL("image/png", 1)
  }
}

const download = (filename: string, url: string) => {
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
}

// 原理是将画布放大 N 倍后，将图片缩小 N 倍，这样就可以得到高清的图片了
const imageToPngBase64 = (image: HTMLImageElement, scale: number) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  scale = window.devicePixelRatio * scale

  canvas.width = image.width * scale
  canvas.height = image.height * scale

  ctx?.scale(scale, scale)
  ctx && ctx.drawImage(image, 0, 0, image.width, image.height)

  return canvas.toDataURL("image/png")
}
</script>

<template>
  <div class="cover-box" ref="cover">
    <div class="center">
      <div class="title" data-storke="封面制作">
        <span class="font">{{ props.title }}</span>
      </div>

      <div class="time-box">
        <img class="icon" :src="TimeIcon" alt="" />
        <span>{{ props.minute }}分{{ props.seconds }}秒</span>
      </div>
    </div>
  </div>

  <div class="" @click="start">开始截图</div>
  <!-- <div @click="to">开始转换</div> -->

  <img :src="base64" alt="" />
</template>

<style scope lang="scss">
// v-bind: https://blog.csdn.net/weixin_52235488/article/details/126290046

.cover-box {
  color: #fff;
  font-weight: 900;

  aspect-ratio: 16/9;
  height: 540px;
  background-color: v-bind(color);
  font-family: MiSans VF;

  display: flex;
  justify-content: center;
  align-items: center;

  .center {
    .title {
      position: relative;
      font-size: 80px;

      .font {
        position: relative;
        z-index: 1;
      }

      &::before {
        content: attr(data-storke);
        position: absolute;
        z-index: 0;
        -webkit-text-stroke: v-bind("config.borderSize") #000;
        text-stroke: v-bind("config.borderSize") #000;
      }
    }

    .time-box {
      margin: 30px auto 0;
      padding: 5px 10px;
      background-color: #000;
      width: max-content;
      border-radius: 1000px;

      display: flex;
      align-items: center;

      .icon {
        margin-right: 10px;
        display: inline-block;
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
