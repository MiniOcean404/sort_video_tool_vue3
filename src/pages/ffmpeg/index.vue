<script setup lang="ts">
import FFmpeg from "@/components/FFmpeg/index.vue"
import video from "@/assets/video/cn-banner1.85c964f.webm"
</script>

<template>
  <FFmpeg :video-url="video" :width="305" :height="305"></FFmpeg>
</template>

<style scope lang="scss"></style>
