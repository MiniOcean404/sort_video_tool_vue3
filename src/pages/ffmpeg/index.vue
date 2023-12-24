<script setup lang="ts">
import FFmpeg from "@/demo/FFmpeg/index.vue"
import video from "@/assets/video/davinci_web_all.webm"
</script>

<template>
  <FFmpeg :video-url="video" :width="305" :height="305"></FFmpeg>
</template>

<style scope lang="scss"></style>
