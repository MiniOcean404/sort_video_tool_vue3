<template>
  <div>
    <video id="video" :src="davinci_web_all" controls width="700" @play="start" @ended="end"></video>

    <video :src="video_url" controls></video>
  </div>
</template>

<script setup lang="ts">
// 解决 MediaRecorder 录制的 webm 没有时间的问题
//
import davinci_web_all from "@/assets/video/davinci_web_all.webm"
import { setWebmDuration } from "@/demo/js/WebmDuration"

let mediaRecorder: MediaRecorder

let video_url = ref("")

onMounted(async () => {
  // 获取 video 元素
  const videoElement = document.querySelector("video")

  if (videoElement) {
    // 创建 MediaStream 对象，用于作为 MediaRecorder 的输入流
    const mediaStream = videoElement.captureStream(60)

    // 创建 MediaRecorder 对象并指定输入流和视频格式
    mediaRecorder = new MediaRecorder(mediaStream, { mimeType: "video/webm" })
  }
})

function start() {
  let chunks: Blob[] = []

  // 监听 dataavailable 事件，将每个数据块保存到数组中
  mediaRecorder.ondataavailable = function (event) {
    if (event.data.size > 0) chunks.push(event.data)
  }

  // 监听 stop 事件，当录制结束时将数据块拼接成 Blob 对象
  mediaRecorder.onstop = async function () {
    const videoBlob = new Blob(chunks, { type: "video/webm" })

    const newArrauBuffer = setWebmDuration(await videoBlob.arrayBuffer(), 15 * 1000)
    const newBlob = new Blob([newArrauBuffer])

    video_url.value = URL.createObjectURL(newBlob)

    // 在这里你可以使用 videoBlob 做进一步操作，比如上传到服务器或者展示在页面上
  }

  // 开始录制
  mediaRecorder.start()
}

function end() {
  mediaRecorder.stop()
}
</script>

<style scoped></style>
