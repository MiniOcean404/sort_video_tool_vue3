<template>
  <!-- 添加一个 autoplay 属性，这样就可以在摄像头获取到媒体流后自动播放了。 -->
  <!-- playsinline: 指明视频将内联（inline）播放，即在元素的播放区域内。 -->
  <!-- muted：静音 -->
  <video ref="video" id="localVideo" autoplay playsinline muted width="800"></video>

  <div>
    <el-button type="primary" @click="takePhoto">开始拍照</el-button>

    <el-select v-model="deviceId" placeholder="选择输出设备" size="large" @change="handleDeviceChange">
      <el-option v-for="item in videoDevices" :key="item.deviceId" :label="item.label" :value="item.deviceId" />
    </el-select>

    <el-select v-model="direction" placeholder="切换方向" size="large" @change="switchCamera">
      <el-option v-for="item in directions" :key="item.id" :label="item.label" :value="item.id" />
    </el-select>
  </div>

  <div>
    <img class="take" v-for="(item, index) in imgList" :key="index" :src="item" alt="" width="100" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue"

const video = ref<HTMLVideoElement>()
const imgList = ref<string[]>([])

const deviceId = ref("")
const direction = ref("")

const directions = ref([
  { label: "前置摄像头", id: "user" },
  { label: "后置摄像头", id: "environment" },
  { label: "左边摄像头", id: "left" },
  { label: "右边摄像头", id: "right" },
])

let videoDevices: { deviceId: string; label: string }[] = []

onMounted(() => {
  getDevices()
  getLocalStream()
})

// 获取所有视频输入设备
async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  console.log("🚀🚀🚀 / 设备", devices)
  videoDevices = devices.filter((device) => device.kind === "videoinput")

  console.log(videoDevices)
}

// 获取本地音视频流
async function getLocalStream() {
  console.log("🚀🚀🚀 / 支持项", navigator.mediaDevices.getSupportedConstraints())

  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: window.innerWidth * window.devicePixelRatio * 3,
      height: window.innerHeight * window.devicePixelRatio * 3,
    },
  })

  // 将媒体流设置到 video 标签上播放
  playLocalStream(stream)
}

// 播放本地视频流
function playLocalStream(stream: MediaStream) {
  const videoEl = document.getElementById("localVideo") as HTMLVideoElement
  videoEl.srcObject = stream
}

// 拍照
function takePhoto() {
  if (!video.value) return

  const videoEl = video.value
  const canvas = document.createElement("canvas")
  canvas.width = videoEl.videoWidth
  canvas.height = videoEl.videoHeight
  const ctx = canvas.getContext("2d")!
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
  imgList.value.push(canvas.toDataURL("image/png"))
  console.log("🚀🚀🚀 / imgList", imgList)

  // 添加滤镜
  const filterList = [
    "blur(5px)", // 模糊
    "brightness(0.5)", // 亮度
    "contrast(200%)", // 对比度
    "grayscale(100%)", // 灰度
    "hue-rotate(90deg)", // 色相旋转
    "invert(100%)", // 反色
    "opacity(90%)", // 透明度
    "saturate(200%)", // 饱和度
    "saturate(20%)", // 饱和度
    "sepia(100%)", // 褐色
    "drop-shadow(4px 4px 8px blue)", // 阴影
  ]

  for (let i = 0; i < filterList.length; i++) {
    ctx.filter = filterList[i]
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
    imgList.value.push(canvas.toDataURL("image/png"))
  }
}

// 切换设备
async function handleDeviceChange(deviceId: string) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: window.innerWidth * window.devicePixelRatio * 3,
      height: window.innerHeight * window.devicePixelRatio * 3,
      deviceId: { exact: deviceId },
    },
  })

  // 将媒体流设置到 video 标签上播放
  playLocalStream(stream)
}

// 切换前后摄像头
function switchCamera(exact: string) {
  let constraints = {
    video: true,
    audio: true,
  }

  // @ts-ignore
  constraints.video = {
    // 当需要强制使用前置摄像头时，可以使用 exact 关键字
    // facingMode 有 4 个值，分别是 user、environment 和 left、right，分别对应前后摄像头和左右摄像头。
    facingMode: { exact },
  }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("切换成功")
      playLocalStream(stream)
    })
    .catch((err) => {
      // 强制切换前后摄像头时，当摄像头不支持时，会报一个 OverconstrainedError［无法满足要求的错误］
      console.log("你的设备不支持切换前后摄像头")
    })
}
</script>
<style lang="scss" scoped>
.take {
  display: inline-block;
}
</style>
