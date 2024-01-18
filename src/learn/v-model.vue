<template>
  <div>{{ value }}</div>
</template>

<script setup lang="ts">
// 定义子组件 v-modal， defineModel 相当于 下方简写
// const emit = defineEmits<{
//   (e: "update:modelValue", v: string): void
// }>()

// const props = withDefaults(defineProps<{ modelValue: string }>(), {
//   modelValue: "",
// })

// const state = computed({
//   get: () => props.modelValue,
//   set: (val) => {
//     emit("update:modelValue", val)
//   },
// })

const value = defineModel<string>()
</script>

<style lang="scss" scoped></style>
