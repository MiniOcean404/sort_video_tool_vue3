<script setup lang="ts">
// Demo: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/main/apps/vue-vite-app/src/components/FFmpegDemo.vue
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile, toBlobURL } from "@ffmpeg/util"
import { onMounted, ref } from "vue"
import type { LogEvent } from "@ffmpeg/ffmpeg/dist/esm/types"

const canvasRef = ref<any>(null)

onMounted(() => {
  init()
})

const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.5/dist/esm"

const ffmpeg = ref(new FFmpeg())

async function init() {
  ffmpeg.value.on("log", ({ type, message }: LogEvent) => {
    console.log(type, message)
  })

  await ffmpeg.value.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
  })
}

function play(e) {
  const video = e.target
  const canvas = canvasRef.value
  const ctx = canvas && canvas.getContext("2d")

  ;(async function loop() {
    if (!video.paused && !video.ended) {
      ctx.drawImage(video, 0, 0, 640, 360)

      await ffmpeg.value.writeFile("text.txt", "hello world")

      //   new Uint8Array(await blob.arrayBuffer())
      // 写入输入文件
      canvas.toBlob(async (blob) => {
        const res = await ffmpeg.value.writeFile(`input${Math.random()}.png`, await fetchFile(blob))
        console.log(res)
      })

      setTimeout(loop, 1000 / 30) // 每秒绘制 30 帧
    }
  })()
}

async function pause() {
  try {
    // 运行 ffmpeg 命令来将图片合并为视频
    await ffmpeg.value.exec(["-framerate", "30", "-i", "input%d.png", "output.mp4"])

    // 读取输出文件
    const data = await ffmpeg.value.readFile("output.mp4")
    console.log(data)
  } catch (error) {
    console.log(error)
  }

  // 将输出视频文件保存到本地
  //   const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
  //   const a = document.createElement("a")
  //   a.href = url
  //   a.download = "output.mp4"
  //   a.click()
}
</script>

<template>
  <video id="video" width="640" height="360" controls @play="play" @pause="pause">
    <source src="/cn-banner1.85c964f.webm" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <canvas ref="canvasRef" id="canvas" width="640" height="360"></canvas>
</template>

<style scope lang="scss"></style>
