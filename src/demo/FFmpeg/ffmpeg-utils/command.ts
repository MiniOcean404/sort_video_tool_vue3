import FFmpegIns from "./ins.ts"
import { FFmpeg } from "@ffmpeg/ffmpeg"
/**
 * ffmpeg -help查看更多用法
 * ffmpge -help filter=参数：查看参数有哪些子参数
 *
 * -v quiet： 代表静默输出
 * -threads： 开启多少线程
 * -ss: 从第几秒开始
 * -t: 持续多久
 * -acodec copy：指定音频编解码器为复制，即直接复制原始音频流而不进行重新编码。
 * -vn：禁止输出视频流
 * -preset: 设置编码器的预设值，不同的预设值会影响编码速度和压缩率 ultrafast（极快）、superfast（超快）、medium（中等）
 * -vf：video filters，表示使用视频滤镜功能
 * -f：输出文件格式
 */
class FFmpegCommand {
  public ins: FFmpeg = FFmpegIns.ins
  private thread: number = 12

  constructor() {}

  /**
   * 查看文件信息
   * 执行该命令可以直接查看视频的信息，其中就有刚才的提到的视频流（Video: h264）和音频流（Audio: aac）
   * 例如：
   *    Stream #0:0: Video: vp8, yuv420p(tv, bt709, progressive), 1344x768, SAR 1:1 DAR 7:4, 25 fps, 25 tbr, 1k tbn (default)
   *    Stream #0:1: Audio: vorbis, 48000 Hz, stereo, fltp (default)
   */
  async look_file_info(file: string) {
    await this.ins?.exec(["-i", file])
  }

  /**
   * 获取视频时长信息、总帧数信息
   * @example
   * 输出：
   * frame=  710 fps=0.0 q=-0.0 Lsize=N/A time=00:00:23.75 bitrate=N/A speed= 168x
   * video:327kB audio:2046kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: unknown
   * frame 为当前视频文件总帧数
   * time 为视频时长
   * 注意一点，总帧数取决于视频fps，总帧数 = fps * 总时长
   */
  async look_time_frame(file: string) {
    await this.ins?.exec(["-hide_banner", "-i", file, "-f", "null", "-"])
  }

  /**
   * @example
   * ffmpeg -i input_video.mp4-vf scale=1280：720 -c：a copy output_video.mp4
   */
  async change_resolution(fromFile: string, toFile: string, width: number, height: number) {
    await this.ins?.exec([
      "-threads",
      `${this.thread}`,
      "-i",
      `${fromFile}`,
      "-preset",
      "ultrafast",
      "-vf",
      `scale=${width}:${height}`,
      "-c:a",
      "copy",
      `${toFile}`,
    ])
  }

  /**
   * 音视频分离
   * @example
   * @param type video | audio
   * @param videoPath
   * @param audioPath
   * 分离视频：ffmpeg -i fromPath.mp4 -an toPath.mp4
   * 分离音频命令 2： ffmpeg -i filename -map 0:1 -b:a 320k -f mp3 filename.1.mp3
   */
  async split_video_audio(type: string, videoPath: string, audioPath: string) {
    if (type === "video") await this.ins?.exec(["-threads", `${this.thread}`, "-i", videoPath, "-preset", "ultrafast", "-an", audioPath])
    if (type === "audio") await this.ins?.exec(["-threads", `${this.thread}`, "-i", videoPath, "-preset", "ultrafast", "-vn", audioPath])
  }

  /**
   * 合并音视频为修改后的视频 或 合并音频为 一个音频
   * 如果是视频文件视频里必须包含音频，否则会报错
   * @example
   * ffmpeg -i /video/convert.webm -i /video/audio.aac -preset ultrafast -filter_complex [0]atrim=1.00:3.00[a0];[a0]adelay=0|0[s0];[1]atrim=0.00:12.00[a1];[a1]adelay=1500|1500[s1];[s0][s1]amix=inputs=2:duration=longest:dropout_transition=0 -f mp4 -strict experimental /video/convert.mp4
   *
   * [0:a]atrim=1.00:3.00[a0];[a0]adelay=0|0[s0];
   *    [0:a]表示第一个文件的音频输入流
   *    atrim=1.00:3.00：表示裁剪从第 1 秒到第 3 秒的音频
   *    [a0]: 将上面的裁剪后的音频输出到 a0 的流中
   *    adelay=0|0[s0]：表示将裁剪后的音频延迟 0 秒
   *    [s0]表示将上面的文件输出到 s0 的流中
   *
   * amix=inputs=2：表示使用两个输入流进行混音，
   *    duration=first：
   *      其中 duration=first 表示输出音频流的持续时间取决于第一个输入流（视频文件的音频），longest 代表使用文件中时间最长的那个。
   *    dropout_transition：
   *      dropout_transition=0 表示在混音时不使用过渡效果。
   */
  async merge_video_audio(fromVideoFile: string, fromAudioFile: string, toFile: string, streams: any[]) {
    const montage_audio = streams.map((stream, index) => {
      return `[${index}:a]atrim=${stream.start}:${stream.end}[a${index}];[a${index}]adelay=${stream.delay}|${stream.delay}[s${index}];`
    })

    const mixs = streams.map((_, index) => {
      return `[s${index}]`
    })

    await this.ins?.exec([
      "-i",
      fromVideoFile,
      "-i",
      fromAudioFile,
      "-preset",
      "ultrafast",
      "-filter_complex",
      `${montage_audio.join("")}${mixs.join("")}amix=inputs=${streams.length}:duration=longest:dropout_transition=0`,
      "-f",
      "mp4",
      "-strict",
      "experimental",
      `${toFile}`,
    ])
  }

  /**
   * 视频抽帧
   */
  async video_get_frame(type: string, fromFile: string, toFile: string, width: number, height: number, fps?: number) {
    // GIF 未尝试
    if (type === "gif") await this.ins?.exec(["-i", fromFile, "-vf", "colorkey=white:0.01:0.0", "-s", `${width}x${height}`, `${toFile}`])
    if (type === "video") await this.ins?.exec(["-i", fromFile, "-vf", `fps=${fps}`, "-s", `${width}x${height}`, `${toFile}`])
  }

  /**
   * 指定开始结束时间抽帧
   */
  async get_time_position_frame(fromFile: string, toFile: string, time: number, width: number, height: number, fps: number) {
    await this.ins?.exec(["-ss", `${time}`, "-i", fromFile, "-ss", `0`, "-t", `${1}`, "-vf", `fps=${fps}`, "-s", `${width}x${height}`, `${toFile}`])
  }

  /**
   * 抽取指帧数位置的 指定几张图片
   */
  async get_frames(fromFile: string, toFile: string, framePosition: number, num: number, width: number, height: number) {
    console.log(["-i", fromFile, "-vf", `select=eq(n\\,${framePosition})`, "-s", `${width}x${height}`, "-vframes", `1`, `${toFile}`].join(" "))
    await this.ins?.exec(["-i", fromFile, "-vf", `select=eq(n\\,${framePosition})`, "-s", `${width}x${height}`, "-vframes", `${num}`, `${toFile}`])
  }

  /**
   * 生成音频 wave
   */
  async get_audio_or_video_wave(audioOrVideoFile: string, toFile: string, width: number, height: number) {
    await this.ins?.exec([
      "-i",
      audioOrVideoFile,
      "-filter_complex",
      `aformat=channel_layouts=mono,compand,showwavespic=s=${width}x${height}:colors=yellow`,
      "-frames:v",
      "1",
      `${toFile}`,
    ])
  }

  /**
   * 图片转化为视频
   * @example ffmpeg -framerate 30 -i "/image/input%d.png", "/video/output.mp4"
   * // 写入多个图片
   * await ffmpeg.writeFile(`/image/input-${index}.png`, await fetchFile(canvas.toDataURL("image/png", 1)))
   * // 转换为视频
   * await ffmpeg.exec(["-framerate", "30", "-i", "/image/input-%d.png", "/video/output.mp4"])
   * // 读取视频数据
   * const data = (await ffmpeg.readFile("/video/output.mp4")) as Uint8Array
   * // 转化为 blob
   * new Blob([fileData.buffer]
   */
  async image2video(fps: number, entry: string, output: string) {
    await this.ins?.exec(["-threads", `${this.thread}`, "-framerate", fps.toString(), "-i", entry, output])
  }

  /**
   * 转换视频格式、提取音频
   * @example
   *   ffmpeg -i test.mp4 test.gif
   *   ffmpeg -i tiktok.mp4 test.mp3
   */
  async convert(filename: string, fromExt: string, toExt: string) {
    await this.ins?.exec(["-threads", `${this.thread}`, "-i", `${filename}.${fromExt}`, `${filename}.${toExt}`])
  }

  /**
   * 裁剪视频或音频，只能是视频到视频，音频到音频
   * @example
   *   ffmpeg -ss 开始时间 -to 结束时间 -i 视频/音频文件名 生成的视频/音频文件名
   *   ffmpeg -ss 5 -to 10 -i tiktok.mp4 test2.mp4
   *   -ss 从第几秒开始
   *   -t 持续多久
   */
  async extract(fromFile: string, toFile: string, start: number, end: number) {
    await this.ins?.exec(["-threads", `${this.thread}`, "-i", `${fromFile}`, "-ss", `${start}`, "-to", `${end}`, `${toFile}`])
  }

  /**
   *  使用滤镜覆盖视频水印
   *  @example
   *  参数-vf：video filters，表示使用视频滤镜功能
   *    ffmpeg -i 视频文件名 -vf delogo=w=水印宽:h=水印高:x=水印x位置:y=水印y位置 新视频文件名 参数-vf
   *    ffmpeg -i tiktok.mp4 -vf delogo=w=240:h=120:x=10:y=10 test3.mp4
   *
   *  threads: 开启多少线程
   */
  async filter_cover_watermark(fromFile: string, toFile: string, width: number, height: number, x: number, y: number) {
    await this.ins?.exec(["-threads", `${this.thread}`, "-i", fromFile, "-vf", `delogo=w=${width}:h=${height}:x=${x}:y=${y}`, `${toFile}`])
  }

  /**
   * 使用滤镜添加图片水印
   * @description
   * -filter_complex "overlay=10:10"：应用复杂滤镜，其中 overlay 是一个用于图像叠加的滤镜。指定了覆盖的位置为坐标 (10,10)。
   * -filter_complex "[0:v][1:v]overlay=10:10:enable='between(t,5,10)'"：应用复杂滤镜，其中 [0:v][1:v] 表示将两个输入流连接起来，overlay=10:10:enable='between(t,5,10)' 表示在时间范围 5 秒到 10 秒之间将叠加图像添加到视频，并设定了叠加的位置。
   */
  async filter_image_watermark(fromFile: string, imagePath: string, toFile: string, x: number, y: number, start: number, end: number) {
    await this.ins?.exec([
      "-i",
      fromFile,
      "-i",
      `${imagePath}`,
      "-preset",
      "ultrafast",
      `-filter_complex`,
      `[0:v][1:v]overlay=${x}:${y}:enable='between(t,${start},${end})'`,
      `${toFile}`,
    ])
  }

  /**
   *  添加文字水印
   *
   *  @description
   *  PS:
   *  1. 必须使用字体文件，输出为 0 kb
   *  2. 如果不想使用字体文件，可以添加 :font=系统字体名称
   *  3. 显示时间码：text=%{pts\:hms}
   *  文本文件：
   *  1. 指定包含要绘制的文本内容的文本文件： textfile=text.txt
   *  2. 允许动态重新加载文本文件：reload=1
   *  边框：
   *  1. 添加一个背景框来突出文本：box=1
   *  2. 设置背景框的颜色为黑色，并降低透明度为50%：boxcolor=black@0.5
   *  3. 设置背景框的边框宽度为5个像素： boxborderw=5：
   *  设置居中
   *  1. 设置文本水平位置居中：x=(w-text_w)/2：
   *  2. 设置文本垂直位置居中: y=(h-text_h)/2：
   * @example
   *  参数
   *    ffmpeg -i 视频文件名 -vf drawtext=x=水印x位置:y=水印y位置:fontsize=水印字体大小:fontcolor=水印字体颜色:text='水印内容':fontfile=xxx 新视频文件名
   *    ffmpeg -i test3.mp4 -vf drawtext=x=30:y=30:fontsize=40:fontcolor=white:text=ffmpeg:fontfile=/font/xx.ttf test7.mp4
   */
  async add_text_filter(fromFile: string, toFile: string, fontPath: string, fontSize: number, fontColor: string, text: string, x: number, y: number) {
    await this.ins?.exec([
      "-threads",
      `${this.thread}`,
      "-i",
      fromFile,
      "-preset",
      "ultrafast",
      "-vf",
      `drawtext=text=x=${x}:y=${y}:fontsize=${fontSize}:fontcolor=${fontColor}:text=${text}:fontfile=${fontPath}`,
      `${toFile}`,
    ])
  }
}

export default new FFmpegCommand()
