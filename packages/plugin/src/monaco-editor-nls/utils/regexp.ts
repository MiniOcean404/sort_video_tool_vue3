export function isNls(path: string) {
  return /esm[\\\/]vs[\\\/]nls\.js/.test(path)
}

export function isMonacoEditorFile(path: string) {
  return /monaco-editor[\\\/]esm[\\\/]vs.+\.js/.test(path)
}

export const fileRelativePathRegexp = /(?:monaco-editor[\\\/]esm[\\\/])(?<path>.+)(?=\.js)/

export const goNLSRegexp = /esm[\\\/]vs[\\\/]nls\.js/
export const goMonacoEditorFileRegexp = /monaco-editor[\\\/]esm[\\\/]vs.+\.js/
