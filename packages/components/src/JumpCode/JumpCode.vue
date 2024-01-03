<script setup lang="ts">
import { ElButton, ElInput, ElPopover } from "element-plus"

import type { JumpCodeProps } from "./JumpCode"

const props = withDefaults(defineProps<JumpCodeProps>(), {
  path: "",
})

const isDev = process.env.NODE_ENV === "development"

function open(type: string) {
  let url: string

  if (type === "VsCode") {
    url = `vscode://file/${props.path}:0:0`
  } else if (type === "WebStorm") {
    // 无效
    url = `webstorm://open?file=${props.path}&line=0&column=0`
  } else {
    const githubAddr = "https://github.com/miniocean404-vue/tool_and_demo_vite_vue3"
    const branch = "master"
    const hightLine = "#L$1-L$10"
    url = `${githubAddr}/blob/${branch}/${`src${props.path.split("src").slice(-1)[0]}`}${hightLine}`
  }

  window.open(url, "_blank")
}
</script>

<template>
  <div class="gie-filepath-box-container">
    <el-popover placement="top-start" :width="550" trigger="click">
      <template #reference>
        <el-button type="primary" icon="FolderOpened">本页面的文件路径</el-button>
      </template>

      <div style="text-align: left">
        <p style="margin: 0 0 10px">开发环境可以快速在VsCode或WebStorm中打开文件</p>
        <!-- 地址 -->
        <el-input :model-value="`src${props.path.split('src').slice(-1)[0]}`"></el-input>

        <!-- 按钮 -->
        <el-button type="primary" icon="View" size="default" color="#000000" @click="open('GitHub')">在GitHub中打开</el-button>
        <el-button type="primary" icon="View" color="#26b2f3" :disabled="!isDev" size="default" @click="open('VsCode')">在VsCode中打开</el-button>
        <el-button type="primary" icon="View" color="#00cdd7" :disabled="!isDev" size="default" @click="open('WebStorm')">在WebStorm中打开</el-button>
      </div>
    </el-popover>
  </div>
</template>
