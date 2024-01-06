import io, { Socket } from "socket.io-client"

let peerConnection: RTCPeerConnection
let socket: Socket

let offerSdp: string

export function createLink() {
  peerConnection = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.voipbuster.com" }] })

  return peerConnection
}

// 连接并加入房间
export function addEventListener(roomId: number, userId: string) {
  if (!roomId) return ElMessage.error("请输入房间号")

  socket = io("https://signaling.fedtop.com")

  // 连接成功时触发
  socket.on("connect", () => {
    handleConnect(roomId, userId)
  })

  // 断开连接时触发
  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      // 断线是由服务器发起的，重新连接。
      socket.connect()
    }
    ElMessage.warning("您已断开连接")
  })

  // 服务端发送报错信息
  socket.on("error", (data) => {
    ElMessage.error(data)
  })

  // 当有用户加入房间时触发
  socket.on("welcome", (data) => {
    ElMessage.success(data.userId === userId ? "🦄成功加入房间" : `🦄${data.userId}加入房间`)
  })

  // 当有用户离开房间时触发
  socket.on("leave", (data) => {
    ElMessage.warning(data.userId === userId ? "🦄成功离开房间" : `🦄${data.userId}离开房间`)
  })

  // 当有用户发送消息时触发
  socket.on("message", () => {})

  // 创建offer,发送给远端
  socket.on("createOffer", () => {
    // 发送 offer
    if (offerSdp) {
      socket.emit("offer", {
        userId,
        roomId,
        sdp: offerSdp,
      })
      return
    }
    createOffer(roomId, userId)
  })

  // 收到offer,创建answer
  socket.on("offer", (data) => {
    createAnswer(data.sdp, roomId, userId)
  })

  // 收到answer,设置远端sdp
  socket.on("answer", (data) => {
    addAnswer(data.sdp)
  })
}

// 连接成功
function handleConnect(roomId: number, userId: string) {
  socket.emit("join", { userId, roomId })
}

// 创建 offer
async function createOffer(roomId: number, userId: string) {
  // 当一个新的 offer ICE 候选人被创建时触发事件
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      offerSdp = JSON.stringify(peerConnection.localDescription)
      // 发送 offer
      if (offerSdp) {
        socket.emit("offer", {
          userId,
          roomId,
          sdp: offerSdp,
        })
      }
    }
  }
  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)
}

// 创建 answer
async function createAnswer(val: string, roomId: number, userId: string) {
  const offer = JSON.parse(val)
  peerConnection.onicecandidate = async (event) => {
    // 当一个新的 answer ICE candidate 被创建时
    if (event.candidate) {
      socket.emit("answer", {
        userId,
        roomId: roomId,
        sdp: JSON.stringify(peerConnection.localDescription),
      })
    }
  }

  await peerConnection.setRemoteDescription(offer)
  const answer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answer)
}

// 添加 answer
async function addAnswer(answerSdp: string) {
  const answer = JSON.parse(answerSdp)
  if (!peerConnection.currentRemoteDescription) {
    peerConnection.setRemoteDescription(answer)
  }
}

// answer 端可根据 offer 端的 ondatachannel 事件拿到 RTCDataChannel
// 最简单直接的就是，直接开启双向通信，不需要等待 offer 端的 ondatachannel 事件
// peerConnection.ondatachannel = (event) => {
//   // 成功拿到 RTCDataChannel
//   const localDataChannel = event.channel
//   // 监听文件通道状态
//   localDataChannel.onmessage = (event) => {
//     console.log('🚀🚀🚀 / localDataChannel', event)
//   }
// }

// 离开房间
export function removeEventListener(roomId: number, userId: string) {
  // 关闭对等连接
  peerConnection.close()
  // 发送离开的消息
  socket.emit("leave", { userId, roomId })
  // 关闭socket连接
  socket.disconnect()
}
