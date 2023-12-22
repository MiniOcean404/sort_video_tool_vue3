<script setup lang="ts">
// Demo: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/main/apps/vue-vite-app/src/components/FFmpegDemo.vue
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile, toBlobURL } from "@ffmpeg/util"
import { onMounted, ref } from "vue"
import ffmpegCore from "@ffmpeg/core?url"
import ffmpegCoreWasm from "@ffmpeg/core/wasm?url"
import ffmpegWorker from "@ffmpeg/core-mt?url"
import { FileData } from "node_modules/@ffmpeg/ffmpeg/dist/esm/types"

document.title = "FFmpeg 工具"

const canvasRef = ref<HTMLCanvasElement | null>(null)

const ffmpeg = new FFmpeg()

onMounted(() => {
  init()
})

async function init() {
  ffmpeg.on("log", ({ type, message }) => {
    // console.log("ffmpeg:", "\n\t类型:", type, "\n\t消息:", message)
  })

  ffmpeg.on("progress", ({ progress, time }) => console.log(progress, time))

  await ffmpeg.load({
    coreURL: await toBlobURL(ffmpegCore, "text/javascript"),
    wasmURL: await toBlobURL(ffmpegCoreWasm, "application/wasm"),
    workerURL: await toBlobURL(ffmpegWorker, "text/javascript"),
  })

  ffmpeg.createDir("/video")
  ffmpeg.createDir("/image")

  // await ffmpeg.writeFile("input.webm", await fetchFile("https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm"))

  // await ffmpeg.exec(["-hide_banner", "-i", "/video/test.webm", "-f", "null", "-"])

  // const list = await ffmpeg.listDir("/video")
  // console.log(list)
}

function play(e: Event) {
  const video = e.target as HTMLVideoElement
  const canvas = canvasRef.value
  const ctx = canvas && canvas.getContext("2d")

  let index = 0

  async function draw() {
    if (ctx && video && !video.paused && !video.ended) {
      ctx.drawImage(video, 0, 0, 640, 360)

      index++
      // 写入输入文件
      await ffmpeg.writeFile(`/image/input${index}.png`, await fetchFile(canvas.toDataURL("image/png", 1)))
    }

    window.requestAnimationFrame(draw)
  }

  draw()
}

async function pause() {
  // 运行 ffmpeg 命令来将图片合并为视频
  await ffmpeg.exec(["-framerate", "144", "-i", "/image/input%d.png", "/video/output.mp4"])
  // 读取输出文件
  const data: FileData = await ffmpeg.readFile("/video/output.mp4")

  if (data instanceof Uint8Array) download({ fileData: data, fileName: "video", ext: "mp4" })
}

function download({ fileData, fileName = "", ext = "mp4" }: { fileData: Uint8Array; fileName: string; ext?: string }) {
  // 将输出视频文件保存到本地
  const url = URL.createObjectURL(new Blob([fileData.buffer], { type: "video/mp4" }))
  const a = document.createElement("a")
  a.href = url
  a.download = `${fileName}.${ext}`
  a.click()
}
</script>

<template>
  <video id="video" width="640" height="360" controls @play="play" @pause="pause">
    <source src="@/assets/video/cn-banner1.85c964f.webm" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <canvas ref="canvasRef" id="canvas" width="640" height="360"></canvas>
</template>

<style scope lang="scss"></style>
