<template>
  <video ref="video" id="localVideo" autoplay playsinline muted width="800"></video>

  <el-button type="primary" @click="shareScreen">开始分享</el-button>
  <el-button type="primary" @click="startRecord">开始录制</el-button>
  <el-button type="primary" @click="stopRecord">停止录制</el-button>
</template>
<script setup lang="ts">
import { nanoid } from "nanoid"

let localStream: MediaStream
let mediaRecorder: MediaRecorder

// 获取屏幕共享的媒体流
async function shareScreen() {
  localStream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: {
      width: window.innerWidth * window.devicePixelRatio * 3,
      height: window.innerHeight * window.devicePixelRatio * 3,
    },
  })
  // 播放本地视频流
  playStream(localStream)
  recordStream()
}

// 在视频标签中播放视频流
function playStream(stream: MediaStream) {
  const video = document.querySelector("#localVideo") as HTMLVideoElement
  video.srcObject = stream
}

function recordStream() {
  const kbps = 1024
  const Mbps = kbps * kbps
  const options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: 'video/webm; codecs="vp8,opus"',
  }

  mediaRecorder = new MediaRecorder(localStream, options)

  mediaRecorder.ondataavailable = (e) => {
    // 将录制的数据合并成一个 Blob 对象
    // const blob = new Blob([e.data], { type: e.data.type })

    // 🌸重点是这个地方，我们不要把获取到的 e.data.type设置成 blob 的 type，而是直接改成 mp4
    const blob = new Blob([e.data], { type: "video/mp4" })
    downloadBlob(blob)
  }

  mediaRecorder.onstart = (e: Event) => console.log("开始录制")

  // 停止录制
  mediaRecorder.onstop = (e: Event) => console.log("停止录制")
}

// 录制媒体流
function startRecord() {
  mediaRecorder.start()
}

function stopRecord() {
  mediaRecorder.stop()
}

// 下载 Blob
function downloadBlob(blob: Blob) {
  // 将 Blob 对象转换成一个 URL 地址
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
  a.href = url

  // 设置 a 标签的 download 属性为文件名
  a.download = `${nanoid()}.${blob.type.split("/")[1]}`
  // 模拟点击 a 标签
  a.click()
  // 释放 URL 地址
  URL.revokeObjectURL(url)
}

// 由于 MediaRecorder api 的对 mimeType 参数的支持是有限的。所以我们需要通过 MediaRecorder.isTypeSupported 来判断当前浏览器是否支持我们需要的 mimeType。

// chrome 中 MediaRecorder 支持的 mimeType 如下：
// "video/webm"
// "video/webm;codecs=vp8"
// "video/webm;codecs=vp9"
// "video/webm;codecs=h264"
// "video/x-matroska;codecs=avc1"

// 获取支持的媒体类型
// 可以看到这么多排列组合后，筛选出的支持的 mimeType 也就只有"video/webm"和 "video/x-matroska" 两种。
// 也可以通过这个网址来查看当前浏览器所支持的 mimeType 的情况： https://cconcolato.github.io/media-mime-support/
function getSupportedMimeTypes() {
  const media = "video"
  // 常用的视频格式
  const types = ["webm", "mp4", "ogg", "mov", "avi", "wmv", "flv", "mkv", "ts", "x-matroska"]
  // 常用的视频编码
  const codecs = ["vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", "h265", "h264"]
  // 支持的媒体类型
  const supported: string[] = []
  const isSupported = MediaRecorder.isTypeSupported
  // 遍历判断所有的媒体类型
  types.forEach((type: string) => {
    const mimeType = `${media}/${type}`
    codecs.forEach((codec: string) =>
      [`${mimeType};codecs=${codec}`, `${mimeType};codecs=${codec.toUpperCase()}`].forEach((variation) => {
        if (isSupported(variation)) supported.push(variation)
      }),
    )
    if (isSupported(mimeType)) supported.push(mimeType)
  })
  return supported
}
</script>
<style lang="scss" scoped></style>
