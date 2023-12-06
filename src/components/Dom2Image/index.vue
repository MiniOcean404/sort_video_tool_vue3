<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import TimeIcon from "@/assets/image/time-icon.png"
import { toPng } from "html-to-image"

export interface Dom2ImageProp {
  title: string
  minute: number
  seconds: number
}

const props = withDefaults(defineProps<Dom2ImageProp>(), {
  title: "封面制作",
  minute: 1,
  seconds: 0,
})

const config = reactive({
  borderSize: "15px",
  scale: 1.5,
})

const color = ref()
const base64 = ref<string>("")
const cover = ref<HTMLElement>()
const isShowBorder = ref(true)

onMounted(() => {
  color.value = randomColor()
})

const randomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

const start = async () => {
  if (cover.value) {
    isShowBorder.value = false
    base64.value = await toPng(cover.value, { quality: 1, pixelRatio: window.devicePixelRatio * config.scale })
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
  <div class="cover-box" ref="cover">
    <div :class="['show-area', { border: isShowBorder }]">
      <div class="dyn-container">
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

  display: grid;
  grid-template-columns: 29% auto 29%;
  grid-template-areas: "placeholder1 area placeholder2";

  .show-area {
    grid-area: area;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    .dyn-container {
      position: absolute;
      inset: 0;
      container-type: inline-size;

      display: flex;
      justify-content: center;
      align-items: center;

      .center {
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
            -webkit-text-stroke: v-bind("config.borderSize") #000;
            text-stroke: v-bind("config.borderSize") #000;
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
