// 零宽字符主要有以下六种:

// 零宽度空格符 (zero-width space)               U+200B : 用于较长单词的换行分隔
// 零宽度非断空格符 (zero width no-break space)  U+FEFF : 用于阻止特定位置的换行分隔
// 零宽度连字符 (zero-width joiner)              U+200D : 用于阿拉伯文与印度语系等文字中，使不会发生连字的字符间产生连字效果
// 零宽度断字符 (zero-width non-joiner)          U+200C : 用于阿拉伯文，德文，印度语系等文字中，阻止会发生连字的字符间的连字效果
// 左至右符 (left-to-right mark)                 U+200E : 用于在混合文字方向的多种语言文本中，规定排版文字书写方向为左至右
// 右至左符 (right-to-left mark)                 U+200F : 用于在混合文字方向的多种语言文本中，规定排版文字书写方向为右至左

// 字符串转零宽字符串
function encodeStr(show = "正文", hidden = "隐藏的文字") {
  const hiddenStr = hidden
    .split("")
    // 将每个字符转换为 Unicode-16 编码，然后转为二进制
    .map((char) => char.codePointAt(0).toString(2))
    // 将每个二进制文字编码用空格分开
    .join(" ")
    // 将二进制数拆分成单个数字、空格
    .split("")
    .map((binaryNum) => {
      if (binaryNum === "1") {
        // 零宽空格符 = U+200b = 码点转为字符串的样子 "​" = 16进制码点 &#8203 = HTML &ZeroWidthSpace;
        return String.fromCodePoint(8203);
      } else if (binaryNum === "0") {
        // 零宽空格符 = U+200c = 码点转为字符串的样子 "‌" = 16进制码点 &#8204
        return String.fromCharCode(8204);
      } else {
        // 零宽空格符 = U+200d = 码点转为字符串的样子 "‍" = 16进制码点 &#8205
        return String.fromCharCode(8205); //空格
      }
    })

    // 零宽空格符 = U+200e = 码点转为字符串的样子 "‎" = 16进制码点 &#8206
    .join(String.fromCharCode(8206));

  // 随机位置插入
  let showSplit = show.split("");
  const randomPosition = parseInt(Math.random() * (showSplit.length + 1));
  showSplit.splice(randomPosition, 0, hiddenStr);

  // 加密后的文本
  return showSplit.join("");
}

// 零宽字符转字符串
function decodeStr(encryptText) {
  if (!encryptText) return "";

  // 将零宽字符替换为空
  let originText = encryptText.replace(/[\u200b-\u200f\uFEFF\u202a-\u202e]/g, "");
  // 将非零宽字符替换为空
  let hiddenText = encryptText.replace(/[^\u200b-\u200f\uFEFF\u202a-\u202e]/g, "");

  hiddenText = hiddenText
    .split(String.fromCharCode(8206))
    .map((char) => {
      if (char === String.fromCodePoint(8203)) {
        return "1";
      } else if (char === String.fromCharCode(8204)) {
        return "0";
      } else {
        return " ";
      }
    })
    .join("")
    // 转数组
    .split(" ")
    // 根据指定的 Unicode 编码中的序号值来返回一个字符串。
    .map((binaryNum) => String.fromCharCode(parseInt(binaryNum, 2)))
    .join("");

  return {
    origin: originText,
    hidden: hiddenText,
  };
}

const encode = encodeStr("我是正文", "我是隐藏 😀");
const decode = decodeStr(encode);

console.log(encode, 1);
console.log(decode);
