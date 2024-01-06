<script setup lang="ts">
import { formartFileSize } from "@/utils/formart"
import { createLink, addEventListener, removeEventListener } from "./p2p"
import { initChannel, lessBufferedAmount } from "./channel"

let p2p: RTCPeerConnection
let dataChannel: RTCDataChannel // 创建文件通道

const userId = ref(Math.random().toString(36).substring(2))
const roomId = ref(104)

const fileRef = ref<HTMLInputElement>() // 文件选择器

let sendFileInfo = ref<{ name: string; size: number }>({ name: "", size: 0 }) // 文件信息
let offsetBytesSend = ref(0) // 当前发送的chunk

let receiveFileInfo = ref<{ name: string; size: number }>({ name: "", size: 0 }) // 文件信息
let offsetBytesReceived = ref(0) // 已接收的字节数

const receiveFileData: BlobPart[] = [] // 文件数据

const sendPercentage = computed(() => {
  if (offsetBytesSend.value === 0 && sendFileInfo.value.size === 0) return 0
  return (offsetBytesSend.value / sendFileInfo.value.size) * 100
})

onMounted(() => {
  p2p = createLink()
  dataChannel = initChannel(p2p, { onMessage: handleReceiveFile })
})

function handleFileChnage(e: Event) {
  const target = e.target as HTMLInputElement

  if (target.files?.length) {
    const file = target.files![0]
    sendFileInfo.value = { name: file.name, size: file.size }
  }
}

// 发送文件
async function handleSendFile() {
  const file = fileRef.value?.files?.[0]
  if (!file) return ElMessage.warning("请选择文件")

  // 发送文件信息
  dataChannel.send(JSON.stringify(sendFileInfo.value))

  // 使用 RTCDataChannel.send 发送消息的最大大小
  const maxMessageSize = p2p.sctp?.maxMessageSize

  if (!maxMessageSize) return

  while (offsetBytesSend.value < file.size) {
    await lessBufferedAmount()

    const slice = file.slice(offsetBytesSend.value, offsetBytesSend.value + maxMessageSize)
    const buffer = await slice.arrayBuffer()

    // 可以发送数据了
    dataChannel.send(buffer)
    offsetBytesSend.value += buffer.byteLength
  }
}

// 接收对方发送的文件
function handleReceiveFile(ev: MessageEvent) {
  const data: string | ArrayBuffer = ev.data

  if (typeof data === "string") return (receiveFileInfo.value = JSON.parse(data))

  receiveFileData.push(data)
  offsetBytesReceived.value += data.byteLength

  // 接收完成
  if (offsetBytesReceived.value === receiveFileInfo.value.size) {
    offsetBytesReceived.value = 0
    ElMessage.success("文件接收完成，请点击下载")
  }
}

// 下载文件
function downloadFile(data: BlobPart[], fileName: string) {
  const blob = new Blob(data, { type: "application/octet-stream" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}
</script>
<template>
  <GieJumpCode :path="'__filePath__'" />

  <div>
    <div>
      <!-- 发送的文件 -->
      <div>
        <div>
          <input ref="fileRef" type="file" name="" @change="handleFileChnage" />
          <el-button type="primary" size="small" @click="handleSendFile">发送</el-button>
        </div>

        <div>
          <span>上传的文件：</span>

          <span>文件 {{ sendFileInfo.name }}</span>
          <span>{{ formartFileSize(sendFileInfo.size || 0) }}</span>
        </div>

        <el-progress :width="50" type="circle" :percentage="sendPercentage" status="success" />
      </div>

      <!-- 接收的文件 -->
      <div>
        <span>接收的文件</span>
        <div>
          <span>{{ receiveFileInfo.name }} {{ formartFileSize(receiveFileInfo.size || 0) }}</span>
          <el-button type="primary" size="small" @click="downloadFile(receiveFileData, receiveFileInfo.name)">下载</el-button>
        </div>
      </div>
    </div>
    <div>
      <span>用户名：</span>
      <el-input v-model="userId" style="width: 100px; margin-right: 20px" placeholder="用户名" clearable></el-input>
      <span>房间号：</span>
      <el-input v-model="roomId" style="width: 100px; margin-right: 20px" placeholder="房间号" clearable></el-input>

      <el-button type="primary" @click="addEventListener(roomId, userId)">加入</el-button>
      <el-button type="danger" @click="removeEventListener(roomId, userId)">离开</el-button>
    </div>
  </div>
</template>
<style lang="scss"></style>
