<template>
  <div>
    <button @click="encode">开始加密</button>
    <button @click="decode">开始解密</button>
  </div>
</template>
<script setup lang="ts">
import { convert_binary_end_zero, drawHiddenData } from "@/demo/HiddenImage/encode"
import icon from "@/assets/image/time-icon.png"
import bg from "@/assets/image/bg.jpg"
import encodeImg from "@/assets/image/encode.png"
import { getEncodeInfo } from "@/demo/HiddenImage/utils"
import { decodeImage } from "@/demo/HiddenImage/decode"
// import { fabric } from "fabric"

async function encode() {
  const targetData = await getEncodeInfo(bg)
  let hiddenData = await getEncodeInfo(icon)

  if (targetData && hiddenData) {
    targetData && convert_binary_end_zero(targetData)

    const scale = Math.round((targetData.binary.length / 8 / hiddenData.binary.length) * 100) / 100
    hiddenData = await getEncodeInfo(icon, scale)
    hiddenData && drawHiddenData(hiddenData, targetData, targetData.imageDate.width, targetData.imageDate.height)
  }
}

async function decode() {
  const decodeDate = await getEncodeInfo(encodeImg)
  decodeDate && decodeImage(decodeDate)
}
</script>
<style lang="scss" scoped></style>
