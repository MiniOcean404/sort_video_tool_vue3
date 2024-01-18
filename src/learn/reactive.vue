<template>
  <div></div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue"

// 直接结构会失去响应式
const state = reactive({ count: 0 })
// 使用 toRefs 解构，后的属性为 ref() 的响应式变量
let { count } = toRefs(state)
count.value++ // state.count 值改变为 1

// 直接赋值对象会失去响应式
let state1 = reactive({ count: 0 })
// state = { count: 1 }，state 不会失去响应
state1 = Object.assign(state, { count: 1 })
</script>
