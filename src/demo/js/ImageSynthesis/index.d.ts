export interface PrimaryColorInfo {
  color: {
    R: number
    G: number
    B: number
    A: number
  }
  count: number
}

export interface PixelBlockInfo extends Pick<PrimaryColorInfo, "color"> {
  position: {
    x: number
    y: number
  }
}

export interface PixelImageInfo extends Pick<PrimaryColorInfo, "color"> {
  url: string
}

export interface BlockImageInfo extends Pick<PixelBlockInfo, "position"> {
  url: string
}

export interface MinSubImage extends BlockImageInfo {
  sub: number
}
