<template>
  <div class="main" @dragenter="dragenterEvent" @dragover="dragoverEvent" @dragleave="dragleaveEvent" @drop="dropEvent">
    <!-- 头部 -->
    <div class="header">
      <div>名称</div>
      <div>状态</div>
      <div>原始大小</div>
      <div>压缩后大小</div>
      <div>压缩率</div>
      <div class="cell-down">操作</div>
    </div>

    <!-- 内容区 -->
    <div class="middle-con">
      <div v-if="imgs.length === 0" class="drop-tip">拖 放 图 片</div>
      <div v-else class="image-items">
        <ul>
          <li class="image-list" v-for="(item, index) in imgs" :key="index">
            <div>{{ item.name || "--" }}</div>
            <div :class="{ sucess: item.status === '完成' }">
              {{ item.status || "--" }}
            </div>
            <div>{{ item.before || "--" }}</div>
            <div>{{ item.after || "--" }}</div>
            <div>{{ item.rate || "--" }}</div>
            <div class="cell-down">
              <p @click="handleSaveFile(item)">
                {{ item.status === "完成" ? "保存" : "--" }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="action-btn-add-tip">🔔 拖放图片文件到上方区域</div>

      <div class="action-right">
        <div>
          <span>质量</span>

          <select class="action-quality-sel" v-model="quality" @change="getSelected" name="quality">
            <option :value="70">100</option>
            <option selected :value="80">80</option>
            <option :value="70">70</option>
            <option :value="60">60</option>
            <option :value="50">50</option>
            <option :value="40">40</option>
            <option :value="30">30</option>
            <option :value="20">20</option>
            <option :value="10">10</option>
          </select>

          <span>%</span>
        </div>
        <div class="action-btn" @click="pickDirsHandle">选择文件夹</div>
        <div class="action-btn" @click="handleClearList">清除列表</div>
        <div class="action-btn" @click="handleDownloadAll">一键打包</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 源地址：https://github.com/mxismean/image-tiny-tauri?tab=readme-ov-file
// wasm 使用的是：libimagequant 是 png24 压缩成 png8 的库，压缩效果很好。libpng 是读取 png 以及生成 png 的库。libjpeg 是读取以及压缩 jpg 的库。gifsicle 是读取以及压缩 gif 的库。
// 编译地址：https://github.com/skyfish-qc/pngtiny

import JSZip from "jszip"
// @ts-ignore
import imageTiny from "@mxsir/image-tiny"
import { reactive } from "vue"
import { formartFileSize } from "@/utils/formart"
import dayjs from "dayjs"
import { downloadUrl, pickDirs } from "@/utils/file"

const quality = ref(80)

interface ImgsInfo {
  name: string
  path?: string
  before: string
  after?: string
  file: File
  status?: string
  rate?: string
  url?: string
  compress: boolean
}

let imgs = reactive<ImgsInfo[]>([])

function dragenterEvent(event: Event) {
  event.preventDefault()

  console.log("entry:事件在可拖动的元素或者被选择的文本进入一个有效的放置目标时触发")
}
async function dragoverEvent(event: Event) {
  event.preventDefault()

  console.log("over:事件在可拖动的元素或者被选择的文本被[拖进]一个有效的放置目标时（每几百毫秒）触发。")
}
function dragleaveEvent(event: Event) {
  event.preventDefault()

  console.log("leave:事件在拖动的元素或选中的文本离开一个有效的放置目标时被触发")
}

// 开始压缩
async function dropEvent(event: DragEvent) {
  event.preventDefault()
  console.log("drop:事件在元素或文本选择被[放置]到有效的放置目标上时触发")
  console.log(2)

  const files = event.dataTransfer!.files

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)

    if (file && file.type.includes("image")) {
      imgs.push({
        name: file.name,
        path: file.name,
        before: formartFileSize(file!.size),
        status: "压缩中...",
        file: file,
        compress: false,
      })
    }
  }

  imgs.map(async (img) => {
    const file = img.file

    let tinyFile = await imageTiny(file, quality.value)

    img.status = "完成"
    img.after = formartFileSize(tinyFile.size)
    img.rate = ((((file.size - tinyFile.size) * 100) / file.size) | 0) + "%"
    img.file = tinyFile
    img.compress = true
  })
}

async function pickDirsHandle() {
  const { files } = await pickDirs()
  await Promise.all(
    files.map(async (f) => {
      const file = await f.handle.getFile(f.handle.name)

      if (file instanceof File) {
        imgs.push({
          name: file.name,
          path: f.path || "",
          file,
          before: formartFileSize(file!.size),
          status: "压缩中...",
          compress: false,
        })
      }
    }),
  )

  imgs.map(async (img) => {
    const file = img.file

    setTimeout(async () => {
      let tinyFile = await imageTiny(file, quality.value)

      img.status = "完成"
      img.after = formartFileSize(tinyFile.size)
      img.rate = ((((file.size - tinyFile.size) * 100) / file.size) | 0) + "%"
      img.file = tinyFile
      img.compress = true
    }, 500)
  })
}

// 设置压缩质量 20-80 %
function getSelected(e: Event) {
  const ele = e.target as HTMLSelectElement
  const val = ele.value
  quality.value = Number(val) || 80
}

// 清除上传列表
function handleClearList() {
  imgs.splice(0, imgs.length)
}

// 保存单个图片
async function handleSaveFile(img: ImgsInfo) {
  ElMessage.success("🦄 保存中")
  downloadUrl(URL.createObjectURL(img.file), img.name)
}

// 开始打包 zip
function handleDownloadAll() {
  if (imgs.length === 0) return

  ElMessage.success("🦄 打包 Zip 中")

  const files = imgs.map((img) => ({ file: img.file, path: img.path }))
  zipFiles(files)
}

function zipFiles(files: { file: File; path?: string }[], fileName: string = `${dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")}.zip`) {
  const zip = new JSZip()

  files.forEach((data) => zip.file(data.path || "", data.file))

  zip.generateAsync({ type: "blob" }).then((blob) => {
    downloadUrl(URL.createObjectURL(blob), fileName)
    ElMessage.success("🦄 打包完毕")
  })
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  -webkit-overflow-scrolling: auto;

  .header {
    background: rgba(62, 75, 90, 0.8);
    color: #fff;
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: space-around;

    & div {
      flex: 1;
      align-items: flex-start;
    }
  }

  .middle-con {
    width: 100%;
    flex: 1;
    overflow-y: scroll;
    background: rgba(88, 106, 128, 0.8);
    scrollbar-color: transparent transparent;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
    }

    .drop-tip {
      width: 100%;
      height: 100%;
      color: #b5bbc0;
      font-size: 60px;

      display: flex;
      align-items: center;
      justify-content: center;

      filter: blur(3px);
    }

    .image-items {
      text-align: left;
      padding: 0;
      overflow: hidden;

      .image-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        width: 100%;
        height: 30px;
        background: rgba(246, 248, 250, 1);
        color: #000000;
        font-size: 12px;
        margin: 2px 0;
        border-radius: 4px;

        & div {
          flex: 1;
        }
      }
    }

    .image-items li:nth-child(even) {
      background: rgb(207, 225, 233);
    }
  }

  .footer {
    width: 100%;
    background: rgba(62, 75, 90, 0.8);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    color: #fff;

    .action-btn-add-tip {
      padding: 0 10px;
    }

    .action-right {
      display: flex;
      align-items: center;

      .action-quality-sel {
        border: 0.5px dotted #fff;
        margin: 0 5px;
        border-radius: 5px;
      }

      .action-btn {
        cursor: pointer;
        margin: 0 5px;
        border-radius: 5px;
        border: 1px solid #fff;
        padding: 2px 5px;

        &:hover {
          color: #80b9ea;
          border: 0.5px solid #80b9ea;
        }
      }
    }
  }
}

.cell-down {
  & p {
    cursor: pointer;
    text-decoration: none;
    color: #5da6e4;
    font-size: 12px;
  }
}
</style>
