<template>
  <div class="airpods-box">
    <canvas id="hero-lightpass" class="airpods" />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const html = document.documentElement
  const canvas = document.getElementById("hero-lightpass")! as HTMLCanvasElement
  const context = canvas.getContext("2d")
  const frameCount = 148
  const currentFrame = (index: number) => {
    console.log(index, index.toString(), index.toString().padStart(4, "0"))
    // 1 '1' '0001'
    // 13 '13' '0013'
    // 148 '148' '0148'
    return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
      .toString()
      .padStart(4, "0")}.jpg`
  }

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image()
      img.src = currentFrame(i)
    }
  }

  const img = new Image()
  img.src = currentFrame(1)
  canvas.width = 1158
  canvas.height = 770
  img.onload = function () {
    context?.drawImage(img, 0, 0)
  }

  const updateImage = (index: number) => {
    img.src = currentFrame(index)
    context?.drawImage(img, 0, 0)
  }

  window.addEventListener("scroll", () => {
    const scrollTop = html.scrollTop
    const maxScrollTop = html.scrollHeight - window.innerHeight // 总共可以滚动的距离
    const scrollFraction = scrollTop / maxScrollTop // 当前滚动距离 / 总滚动距离
    // 当前图片帧 index = 滚动比例 * 总图片帧数
    const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount))

    requestAnimationFrame(() => updateImage(frameIndex + 1))
  })

  preloadImages()
})
</script>

<style lang="scss" scoped>
.airpods-box {
  .airpods {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100vw;
    max-height: 100vh;
  }
}
</style>
