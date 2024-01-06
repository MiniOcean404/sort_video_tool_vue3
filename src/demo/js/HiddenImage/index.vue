<template>
  <div>
    <button @click="encode">开始加密</button>
    <button @click="decode">开始解密</button>
  </div>
</template>
<script setup lang="ts">
import { write_hidden_to_origin } from "@/demo/HiddenImage/encode"
import icon from "@/assets/image/time-icon.png"
import bg from "@/assets/image/bg.jpg"
import encodeImg from "@/assets/image/encode.png"
import { get_image_info } from "@/demo/HiddenImage/utils"
import { decodeImage } from "@/demo/HiddenImage/decode"
// import { fabric } from "fabric"

async function encode() {
  const targetData = await get_image_info(bg)
  let hiddenData = await get_image_info(icon)

  if (targetData && hiddenData) {
    const scale = Math.round((targetData.binary.length / 8 / hiddenData.binary.length) * 100) / 100
    // 获取缩放后的图片
    hiddenData = await get_image_info(icon, scale)
    hiddenData && write_hidden_to_origin(hiddenData, targetData, targetData.imageDate.width, targetData.imageDate.height)
  }
}

async function decode() {
  const decodeDate = await get_image_info(encodeImg)
  // 解密时需要知道原始图片的尺寸
  decodeDate && decodeImage(decodeDate, 273, 273)
}
</script>
<style lang="scss" scoped></style>
