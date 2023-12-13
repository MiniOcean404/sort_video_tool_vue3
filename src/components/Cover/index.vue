<script setup lang="ts">
import { ref, onMounted } from "vue"
import TimeIcon from "@/assets/image/time-icon-transparent.png"
import { toPng } from "html-to-image"

export interface Dom2ImageProp {
  title: string
  minute: number
  seconds: number
  titleBorderSize?: string
  scale?: number
  side?: boolean
}

const props = withDefaults(defineProps<Dom2ImageProp>(), {
  title: "封面制作",
  minute: 1,
  seconds: 0,
  titleBorderSize: "15px",
  scale: 1.5,
  side: false,
})

const color = ref()
const base64 = ref<string>("")
const coverDom = ref<HTMLElement>()
const isShowBorder = ref(true)

onMounted(() => {
  color.value = randomColor()
})

const randomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

const start = async () => {
  if (coverDom.value) {
    isShowBorder.value = false
    base64.value = await toPng(coverDom.value, { quality: 1, pixelRatio: window.devicePixelRatio * props.scale })
    isShowBorder.value = true
  }
}

const download = (filename: string, url: string) => {
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
}
</script>

<template>
  <div class="cover-box" ref="coverDom">
    <div :class="['show-area', { border: isShowBorder, overflow: 'hidden' }]">
      <div class="dyn-container">
        <div class="center">
          <div>
            <div class="logo-box">
              <img class="logo" src="@/assets/image/logo.png" alt="" />
              <span class="type">web</span>
            </div>

            <span class="title" data-storke="封面制作">{{ props.title }}</span>

            <span class="desc">剪映 v 1.3.0 版本</span>
          </div>

          <div class="time-box">
            <img class="icon" :src="TimeIcon" alt="" />
            <span>{{ props.minute }}分{{ props.seconds }}秒</span>
          </div>
        </div>
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
  font-family: MiSans VF;
  color: #fff;
  font-weight: 900;
  background-color: v-bind(color);

  aspect-ratio: 16/9;
  width: 960px;

  .show-area {
    margin: 0 29%;
    height: 100%;
    position: relative;

    .dyn-container {
      position: absolute;
      inset: 0;
      container-type: inline-size;

      .center {
        height: 100%;
        padding: 12.5cqw;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;

        .logo-box {
          width: max-content;
          padding: 3.5cqw 4cqw;
          border-radius: 3cqw;
          border: 0.75cqw solid rgba(0, 0, 0, 0.9);

          display: flex;
          gap: 2cqw;

          .logo {
            width: 6.25cqw;
            height: 6.25cqw;
          }

          .type {
            color: rgba(0, 0, 0, 0.9);
            font-feature-settings: "cv05" on;
            font-size: 5cqw;
            font-style: normal;
            font-weight: 750;
            line-height: 130%; /* 26px */
            letter-spacing: 0.2cqw;
            text-transform: uppercase;
          }
        }

        .title {
          display: inline-block;
          margin-top: 8cqw;

          position: relative;
          font-size: 20cqw;

          color: #101011;
          font-feature-settings: "cv05" on;
          font-size: 16.25cqw;
          font-style: normal;
          font-weight: 750;
          line-height: 100%; /* 65px */
          letter-spacing: -0.65cqw;
        }

        .desc {
          display: inline-block;
          margin-top: 4cqw;

          color: #101011;
          font-feature-settings: "cv05" on;
          font-family: Inter;
          font-size: 7cqw;
          font-style: normal;
          font-weight: 450;
          line-height: 130%; /* 36.4px */
          letter-spacing: -0.21cqw;
        }

        .time-box {
          color: #101011;
          font-feature-settings: "cv05" on;
          font-size: 5cqw;
          font-style: normal;
          font-weight: 750;
          line-height: 100%; /* 20px */
          letter-spacing: -0.2cqw;

          padding: 2.5cqw 5cqw;

          width: max-content;

          display: flex;
          align-items: center;
          gap: 2.5cqw;

          .icon {
            display: inline-block;
            width: 6.25cqw;
            height: 6.25cqw;
          }
        }
      }
    }
  }
}

.border {
  border: 1px solid black;
}
</style>
