<template>
  <div class="video-player-box">
    <video @loadedmetadata="load" class="macpro_video" :src="link" style="width: 100%" muted></video>
    <!-- <video
      @loadedmetadata="load"
      class="macpro_video"
      src="http://nice.zuo11.com/5-airpods-pro-play-video-on-scroll/airpods-pro.webm"
      style="width: 100%"
      muted
    ></video> -->
    <!-- <video
      @loadedmetadata="load"
      class="macpro_video"
      src="http://nice.zuo11.com/5-airpods-pro-play-video-on-scroll/demo-1-devstories/devstories.webm"
      style="width: 100%"
      muted
    ></video> -->
  </div>
</template>

<script setup lang="ts">
// 文章：https://juejin.cn/post/7213362704782164026?searchId=2024030517522550B5731BE62CA8900C86

// 视频播放不刘畅使用 ffmpeg -i original.mp4 -c:v libx264 -x264-params keyint=1 original_I.mp4 设置视频的最大关键帧距离为 1，播放就流畅了
// keyint 是两个 keyframe 之间的最大距离，minkeyint 是两个 keyframe 之间的最小距离

// 什么是视频关键帧距?
// 关键帧距离值会告诉编码器有关重新评估视频图像，以及将完整帧或关键帧录制到文件中的频率。如果画面包含大量场景变换或迅速移动的动作或动画，那么减少关键帧距离将会提高图像的整体品质。一个较小的关键帧距离对应于一个较大的输出文件。

import { gsap } from "gsap"
// import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.vue"

const link = ref("")

onMounted(async () => {
  const res = await fetch("https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4", {})

  link.value = URL.createObjectURL(await res.blob())
})

// 加载完后才能加载别的 gsap
function load() {
  let videoEl = document.querySelector(".macpro_video") as HTMLVideoElement
  const pixelsPerFrame = 50 // 每滚动20像素切换一帧视频

  const duration = videoEl.duration // 视频总时长
  const frameCount = duration * 1 // 视频的总帧数
  const distance = frameCount * pixelsPerFrame // 计算总的滚动距离

  gsap.timeline({
    scrollTrigger: {
      trigger: ".video-player-box",
      // markers: true,
      // endTrigger: "",
      pin: true, // 在执行时固定触发器元素
      pinType: "fixed", // 固定时候的滚动的类型
      start: "top top",
      end: `+=${distance}`,
      scrub: 0,
      onUpdate: (self) => {
        console.log(videoEl.buffered.end(0))

        // 获取当前滚动位置
        const scrollY = self.progress * distance

        // 计算当前是第几帧
        let targetFrame = Math.floor(scrollY / pixelsPerFrame)

        // 限制 targetFrame 在合法范围内
        targetFrame = Math.min(frameCount, Math.max(0, targetFrame))

        // 计算当前帧对应的时间
        const targetTime = (targetFrame / frameCount) * duration

        // 更新视频的当前时间
        if (!isNaN(targetTime) && isFinite(targetTime)) videoEl.currentTime = targetTime
      },
    },
  })

  // t1.fromTo(
  //   videoEl,
  //   {
  //     currentTime: 0,
  //   },
  //   {
  //     currentTime: videoEl.duration || 1,
  //   },
  // )
}
</script>

<style lang="scss" scoped>
.video-player-box {
  // height: 300vh;
  z-index: -1;
}
</style>
