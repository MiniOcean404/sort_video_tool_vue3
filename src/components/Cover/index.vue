<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue"
import TimeIcon from "@/assets/svg/time-icon.svg"
import { toPng } from "html-to-image"

export interface Dom2ImageProp {
  type: string
  title: string
  desc: string
  minute: number
  seconds: number
  titleBorderSize?: string
  scale?: number
  side?: boolean
  boxWidth?: string
}

const props = withDefaults(defineProps<Dom2ImageProp>(), {
  type: "web",
  title: "封面制作",
  desc: "剪映 v 1.3.0 版本",
  minute: 1,
  seconds: 30,
  titleBorderSize: "15px",
  scale: 2,
  side: false,
  boxWidth: "960px",
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
        <div class="layout-box">
          <div>
            <div class="logo-box">
              <img class="logo" src="@/assets/svg/logo.svg" alt="" />
              <span class="type">{{ props.type }}</span>
            </div>

            <span class="title" data-storke="封面制作">{{ props.title }}</span>

            <span class="desc">{{ props.desc }}</span>
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
  width: v-bind("props.boxWidth");

  .show-area {
    margin: 0 29%;
    height: 100%;
    position: relative;

    .dyn-container {
      position: absolute;
      inset: 0;
      container-type: inline-size;
    }
  }

  .layout-box {
    height: 100%;
    padding: 12.5cqw;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

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
        line-height: 130%;
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
      line-height: 100%;
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
      line-height: 130%;
      letter-spacing: -0.21cqw;
    }

    .time-box {
      display: flex;
      align-self: center;
      align-items: center;

      color: #101011;
      font-feature-settings: "cv05" on;
      font-size: 5cqw;
      font-style: normal;
      font-weight: 750;
      line-height: 100%;
      letter-spacing: -0.2cqw;

      padding: 2.5cqw 3.75cqw;
      width: max-content;
      gap: 1.25cqw;

      .icon {
        display: inline-block;
        width: 6.25cqw;
        height: 6.25cqw;
      }
    }
  }
}

.border {
  border: 1px solid black;
}
</style>
