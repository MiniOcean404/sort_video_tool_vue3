<template>
  <div class="page-container">
    <!-- 给自己本地的视频播放设置静音，防止产生回音 -->
    <div class="video-container">
      <div class="video-box">
        <video id="local" autoplay playsinline muted></video>
        <div class="video-title">我</div>
      </div>
      <div class="video-box">
        <video id="remote" autoplay playsinline></video>
        <div class="video-title">远程视频</div>
      </div>
    </div>

    <div class="operation">
      <!-- 操作1-->
      <div class="step">
        <div class="user">用户 1 的操作区域</div>
        <p class="desc">
          点击 Create Offer，生成 SDP offer，把下面生成的offer 复制给用户 2
          <el-button id="create-offer" type="primary" @click="createOffer">创建 Offer</el-button>
        </p>

        <p>SDP offer:</p>
        <el-input v-model="localOfferSdp">
          <template #append>
            <el-button type="success" @click="copyToClipboard(localOfferSdp)">点击复制</el-button>
          </template>
        </el-input>
      </div>

      <!-- 操作2 -->
      <div class="step">
        <div class="user">用户 2 的操作区域</div>
        <p>用户 2 将 用户 1 刚才生成的 SDP offer 粘贴到下方，点击 "创建应答 "来生成 SDP 应答，然后将 SDP Answer 复制给用户 1。</p>

        <el-input v-model="localOfferSdpPaste">
          <template #append>
            <el-button type="success" size="default" @click="createAnswer">创建 Answer</el-button>
          </template>
        </el-input>

        <p>SDP Answer:</p>
        <el-input v-model="remoteAnswerSdp">
          <template #append>
            <el-button type="success" size="default" @click="copyToClipboard(remoteAnswerSdp)">点击复制</el-button>
          </template>
        </el-input>
      </div>

      <!-- 操作3 -->
      <div class="step">
        <div class="user">用户 1 的操作区域</div>

        <p>将用户 2 创建的 Answer 粘贴到下方，然后点击 Add Answer。</p>

        <p>SDP Answer:</p>
        <el-input v-model="remoteAnswerSdpPaste">
          <template #append>
            <el-button type="success" size="default" @click="addAnswer">Add Answer</el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
// 为了让 WebRTC 的相关 api 在各个浏览器中都能够正常的运行，强烈推荐使用 adapter.js,adapter.js 是一个垫片，用于将应用程序与 WebRTC 中的规范更改和前缀差异隔离开来。
// 如今，前缀差异大多消失了，但浏览器之间的行为差异仍然存在。 而且，WebRTC 仍在快速发展，因此 adapter.js 是非常有用的。
import "webrtc-adapter"

// Signal Server(信令服务)：用来将 SDP 流媒体服务信息进行交换的

const pc = new RTCPeerConnection({
  // 公网中使用的 STUN/TURN 服务器进行穿透或者中继信息的传递
  iceServers: [
    // 目前我在用的，免费 STUN 会话穿透 服务器
    // {
    //   urls: "stun:stun.voipbuster.com",
    // },
    // 谷歌的好像都失效了，不过你们可以试试
    // {
    //   urls: "stun:stun.l.google.com:19301",
    //   // urls: 'stun:stun.l.google.com:19302',
    //   // urls: 'stun:stun.l.google.com:19303',
    //   // ...
    // },
    // TURN 中继穿透 服务器,这个对服务器压力太大了，目前没找到免费的，后续我在自己的服务器上弄一个
    // {
    //   urls: "turn:turn.xxxx.org",
    //   username: "webrtc",
    //   credential: "turnserver",
    // },
    // {
    //   urls: "turn:turn.ap-southeast-1.aliyuncs.com:443?transport=tcp",
    //   username: "test",
    //   credential: "test",
    // },
  ],
})

// 创建本地/远程 SDP 描述, 用于描述本地/远程的媒体流
// localOfferSdpPaste 与 localOfferSdp
// remoteAnswerSdpPaste 与 remoteAnswerSdp
// 是同一个数据，只是操作时候展示问题，所以分开了
const localOfferSdp = ref("")
const localOfferSdpPaste = ref("")

const remoteAnswerSdp = ref("")
const remoteAnswerSdpPaste = ref("")

onMounted(async () => {
  await initLocal()
  await initRemote()
})

async function initLocal() {
  // 获取本地端视频标签
  const localVideo = document.getElementById("local") as HTMLVideoElement

  // 采集本地媒体流
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })
  // 设置本地视频流
  localVideo.srcObject = localStream

  // 不推荐使用：已经过时的方法 [addStream API](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addStream)
  // pc.addStream(localStream);

  // 添加本地媒体流的轨道都添加到 RTCPeerConnection 中
  // track 是本地的音频视频信息
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream)
  })
}

async function initRemote() {
  // 获取远程端视频标签
  const remoteVideo = document.getElementById("remote") as HTMLVideoElement

  // 监听远程通道流，方法一：
  pc.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0]
  }

  // 方法二：你也可以使用 addStream API，来更加详细的控制流的添加
  // const remoteStream: MediaStream = new MediaStream()
  // pc.ontrack = (event) => {
  //   event.streams[0].getTracks().forEach((track) => {
  //     remoteStream.addTrack(track)
  //   })
  //   // 设置远程视频流
  //   remoteVideo.srcObject = remoteStream
  // }
}

const createOffer = async () => {
  // 创建 offer SDP 描述
  const offer = await pc.createOffer()

  // 设置本地描述
  await pc.setLocalDescription(offer)

  // await pc.setLocalDescription()
  // 到这里，我们本地的 offer 就创建好了，一般在这里通过信令服务器发送 localOfferSdp 给远端

  // 监听 RTCPeerConnection 的 onicecandidate(ICE候选) 事件，当 ICE 服务器返回一个新的候选地址时，就会触发该事件
  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      localOfferSdp.value = JSON.stringify(pc.localDescription)
    }
  }
}

// 创建 answer
const createAnswer = async () => {
  // 解析字符串
  const offer = JSON.parse(localOfferSdpPaste.value)
  pc.onicecandidate = async (event) => {
    // 当创建新的 ICE 候回应时触发的事件
    if (event.candidate) {
      remoteAnswerSdp.value = JSON.stringify(pc.localDescription)
    }
  }

  // 这里的 answer 与 remoteAnswerSdp 是一样的
  await pc.setRemoteDescription(offer)
  const answer = await pc.createAnswer()
  await pc.setLocalDescription(answer)
}

// 添加 answer(应答)
const addAnswer = async () => {
  const answer = JSON.parse(remoteAnswerSdpPaste.value)
  if (!pc.currentRemoteDescription) {
    pc.setRemoteDescription(answer)
  }
}

function copyToClipboard(val: string) {
  navigator.clipboard.writeText(val)
}
</script>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  user-select: text;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .video-container {
    max-width: 500px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    gap: 1em;
    width: 100%;
    padding: 10px;

    .video-box {
      position: relative;

      .video-title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgb(0 0 0 / 50%);
        color: #fff;
        text-align: center;
        padding: 5px 0;
      }
    }

    video {
      width: 100%;
      height: 100%;
      border: 4px solid #048ff2;
      background-color: #516fa3;
      border-radius: 30px;
    }
  }

  .operation {
    width: 520px;

    .step {
      padding: 30px;
      background-color: #516fa3;
      margin: 10px 0;
      color: white;
      border-radius: 20px;

      .user {
        width: 200px;
        text-align: center;

        // font-size: 18px;
        padding: 10px;
        font-weight: bold;
        background: #36495d;
        border-radius: 20px;
      }

      .desc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        gap: 20px;
      }
    }
  }
}
</style>
