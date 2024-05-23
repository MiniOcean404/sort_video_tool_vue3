import * as fflate from "fflate"

export function encode(str: string): string {
  const buf = fflate.strToU8(str)
  const compressedString = fflate.strFromU8(fflate.compressSync(buf, { level: 9, mem: 8 }), true)
  return btoa(compressedString)
}

export function decode(str: string): string {
  const deBase64 = atob(str)
  const decompressed = fflate.decompressSync(fflate.strToU8(deBase64, true))
  const origText = fflate.strFromU8(decompressed)
  return origText
}
