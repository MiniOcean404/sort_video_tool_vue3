// 创建文件通道
let dataChannel: RTCDataChannel

interface ChannelEvent {
  onMessage: (this: RTCDataChannel, ev: MessageEvent) => any
}

export function initChannel(peerConnection: RTCPeerConnection, { onMessage }: ChannelEvent) {
  dataChannel = peerConnection.createDataChannel("my-channel", {
    // ordered: true, // 保证到达顺序
    maxRetransmits: 50, // 最大重传次数
    negotiated: true, // 双向通信
    id: 0, // 通道id
  })

  // 当属性指示的缓冲传出字节数 bufferedAmount 降至或低于此值时，bufferedamountlow 将触发
  dataChannel.bufferedAmountLowThreshold = 64 * 1024
  dataChannel.binaryType = "arraybuffer"

  // 监听文件通道状态
  // 当文件通道状态发生变化时触发
  dataChannel.onopen = () => ElMessage.success("文件通道已打开")

  // 当文件通道收到消息时触发
  dataChannel.onmessage = onMessage

  // 当发送缓冲区的大小低于其缓冲区阈值时触发此事件。这是一个提示，告诉您可以安全地发送更多数据。
  dataChannel.onbufferedamountlow = (event) => console.warn("🤖🤖🤖 onbufferedamountlow", event)

  // 当文件通道关闭时触发
  dataChannel.onclose = (event) => {
    ElMessage.warning("文件通道已关闭")
    console.warn("🚀🚀🚀 onclose", event)
  }

  // 当文件通道发生错误时触发
  dataChannel.onerror = (event) => {
    ElMessage.error("文件通道发生错误")
    console.error("🚀🚀🚀 onerror", event)
  }

  return dataChannel
}

// 为了避免数据通道的缓存队列过大，导致数据发送延迟或者阻塞。
// 当数据通道的缓存队列大小超过了 65535 字节时，就会暂停发送数据，等待缓存队列降到阈值之下再继续发送数据。这样可以保证数据通道的稳定性和可靠性。
export async function lessBufferedAmount() {
  // bufferedAmount: 当前排队通过数据通道发送的数据的字节数
  if (dataChannel.bufferedAmount > dataChannel.bufferedAmountLowThreshold) {
    // 等待缓存队列降到阈值之下
    await new Promise((resolve) => {
      console.warn(`低于 bufferedAmount 啦: ${dataChannel.bufferedAmount}`)
      dataChannel.onbufferedamountlow = () => resolve(0)
    })
  }
}
