<script setup lang="ts">
// Demo: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/main/apps/vue-vite-app/src/components/FFmpegDemo.vue
import { onMounted, ref } from "vue"

import FFmpegTool from "@/demo/js/FFmpeg/ffmpeg-utils/tool.ts"
import { pause, play } from "@/demo/js/FFmpeg/example/image2video.ts"
import { fetchFile } from "@ffmpeg/util"
import video from "@/assets/video/davinci_web_all.webm"

interface FFmpegProps {
  videoUrl: string
  width: number
  height: number
}

const props = withDefaults(defineProps<FFmpegProps>(), {
  videoUrl: "",
  width: 300,
  height: 300,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

const ffmpeg = FFmpegTool.ins

onMounted(async () => {
  FFmpegTool.useLog()
  await FFmpegTool.load()

  await ffmpeg.createDir("/video")
  await ffmpeg.createDir("/image")
  await ffmpeg.createDir("/font")
  await ffmpeg.createDir("/audio")

  await ffmpeg.writeFile("/video/convert.webm", await fetchFile(video))
  await ffmpeg.exec(["-hide_banner", "-i", "/video/convert.webm", "-f", "null", "-"])
})
</script>

<template>
  <video id="video" width="640" height="360" controls @play="play($event, canvasRef, ffmpeg)" @pause="pause(ffmpeg)">
    <source :src="props.videoUrl" type="video/webm" />
  </video>

  <canvas ref="canvasRef" id="canvas" width="640" height="360"></canvas>
</template>

<style scoped lang="scss"></style>
