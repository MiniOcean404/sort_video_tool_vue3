<script setup lang="ts">
import pinyin from 'pinyin'

const words = ref('中心')

const res = pinyin(words.value,{
  // 开启多音字支持
  heteronym: true,
  // 将字符串的值当成一个词看，而不是单独的字而导致的多音字
  segment: true
})

console.log(res)
</script>

<template>
<!--  拼音标签  -->
<ruby v-for="(word,index) in words">
  {{ word }}
  <!--  rp 当浏览器不兼容时候就不显示  -->
  <rp>(</rp>
  <rt>{{res[index][0]}}</rt>
  <rp>)</rp>
</ruby>
</template>

<style scoped lang="scss">

</style>
