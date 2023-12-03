<script setup lang="ts">
import {ref,reactive} from 'vue'
import html2canvas from 'html2canvas'
import TimeIcon from '@/assets/image/time-icon.png'

const props = defineProps({
    bgColor: {
      type: String,
      default: '#000000'
    },
    bgWidth: {
      type: [Number, String],
      default: '100%'
    },
    bgHeight: {
      type: [Number, String],
      default: '100%'
    },
    color: {
      type: String,
      default: 'rgba(255,255,255,.6)'
    }
})

const config =  reactive({
  borderSize: '15px',
})

const color = ref(randomColor())
const showUrl = ref('')
const cover = ref<HTMLElement>()


function start (){
  if(cover.value) {
    html2canvas(cover.value, {
      scale: window.devicePixelRatio
    }).then(canvas => {
      showUrl.value = canvas.toDataURL('image/png')
    })
  }
}

function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}
</script>

<template>
  <div class="cover-box" ref="cover">
    <div class="center">
      <div class="title" data-storke="封面制作"><span class="font">封面制作</span></div>

      <div class="time-box">
        <img class="icon" :src="TimeIcon" alt="" />
        <span>&nbsp;&nbsp;</span>
        <span>1分30秒</span>
      </div>
    </div>
  </div>

  <div class="" @click="start">开始截图</div>

  <div>
    <img :src="showUrl" alt="" />
  </div>
</template>

<style scope lang="scss">
// v-bind: https://blog.csdn.net/weixin_52235488/article/details/126290046

.cover-box{
  color: #fff;
  font-weight: 900;

  aspect-ratio: 16/9;
  background-color: v-bind(color);
  font-family: MiSans VF;

  display: flex;
  justify-content: center;
  align-items: center;

  .center{
   .title{
    position: relative;
      font-size: 80px;

      .font{
        position: relative;
        z-index: 1;
      }

      &::before {
        content: attr(data-storke);
        position: absolute;
        z-index: 0;
        -webkit-text-stroke: v-bind('config.borderSize') #000;
        text-stroke: v-bind('config.borderSize') #000;
      }
    }

  .time-box{
    margin: 30px auto 0;
    padding: 5px 10px;
    width: max-content;
    background-color:#000;
    border-radius: 1000px;

    display: flex;
    justify-content: center;
    align-items: center;

    .icon{
      display: inline-block;
      width: 16px;
      height: 16px;
    }
  }
  }
}
</style>
