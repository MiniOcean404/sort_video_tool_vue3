<script setup lang="ts">
import { ref, onMounted } from "vue"
import TimeIcon from "@/assets/image/time-icon.png"
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
          <div class="logo">
            <img src="" alt="" />
          </div>

          <div class="title" data-storke="封面制作">
            <span class="font">{{ props.title }}</span>
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
  width: 1920px;

  .show-area {
    margin: 0 29%;
    height: 100%;
    position: relative;

    .dyn-container {
      position: absolute;
      inset: 0;
      container-type: inline-size;

      display: flex;
      justify-content: center;
      align-items: center;

      .center {
        .logo {
        }

        .title {
          position: relative;
          font-size: 20cqw;

          .font {
            position: relative;
            z-index: 1;
          }

          &::before {
            content: attr(data-storke);
            position: absolute;
            z-index: 0;
            -webkit-text-stroke: v-bind("props.titleBorderSize") #000;
            text-stroke: v-bind("props.titleBorderSize") #000;
          }
        }

        .time-box {
          font-size: 4cqw;
          margin: 7.5cqw auto 0;
          padding: 2.5cqw 5cqw;

          background-color: #000;
          width: max-content;
          border-radius: 1000px;

          display: flex;
          align-items: center;
          gap: 5cqw;

          .icon {
            display: inline-block;
            width: 4cqw;
            height: 4cqw;
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
