<script setup lang="ts">
// Demo: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/main/apps/vue-vite-app/src/components/FFmpegDemo.vue
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile, toBlobURL } from "@ffmpeg/util"
import { onMounted, ref } from "vue"
import ffmpegCore from "@ffmpeg/core?url"
import ffmpegCoreWasm from "@ffmpeg/core/wasm?url"
import ffmpegWorker from "@ffmpeg/core-mt?url"
import type { DownloadProps, DrawProps } from "@/components/FFmpeg"

const props = withDefaults(defineProps(), {
  videoUrl: "",
  width: 300,
  height: 300,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

const ffmpeg = new FFmpeg()

onMounted(async () => {
  ffmpeg.on("log", ({ type, message }) => {
    // console.log("ffmpeg:", "\n\t类型:", type, "\n\t消息:", message)
  })

  ffmpeg.on("progress", ({ progress, time }) => console.log((progress * 100).toFixed(1), time))

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
})

function play(e: Event) {
  if (!canvasRef.value) return

  const video = e.target as HTMLVideoElement
  const ctx = canvasRef.value.getContext("2d")

  if (ctx) draw({ ctx, videoDom: video, canvas: canvasRef.value })
}

let index = 0

async function draw(p: DrawProps) {
  const { videoDom, ctx, canvas } = p

  if (ctx && !videoDom.paused && !videoDom.ended) {
    ctx.drawImage(videoDom, 0, 0, 640, 360)

    index++
    // 写入输入文件
    await ffmpeg.writeFile(`/image/input${index}.png`, await fetchFile(canvas.toDataURL("image/png", 1)))
  }

  window.requestAnimationFrame(draw.bind(null, p))
}

async function pause() {
  // 运行 ffmpeg 命令来将图片合并为视频
  await ffmpeg.exec(["-framerate", "30", "-i", "/image/input%d.png", "/video/output.mp4"])
  // 读取输出文件
  const data = (await ffmpeg.readFile("/video/output.mp4")) as Uint8Array

  download({ fileData: data, fileName: "video", ext: "mp4" })
}

function download({ fileData, fileName = "", ext = "mp4" }: DownloadProps) {
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
    <source :src="props.videoUrl" type="video/webm" />
  </video>

  <canvas ref="canvasRef" id="canvas" width="640" height="360"></canvas>
</template>

<style scope lang="scss"></style>
