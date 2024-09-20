import THREE from "three"
import { FourPartColor } from "./symbols"

export function dataToFinCanvasMaterial(
  ...args: Parameters<typeof dataToCanvasMaterial>
) {
  const mat = dataToCanvasMaterial(...args)
  mat.side = THREE.DoubleSide
  return mat
}

function flipPixels(data: FourPartColor[], width: number) {
  let newArrRows = []
  for (let row = 0; row < data.length / width; row += 1) {
    newArrRows.push(data.slice(row * width, row * width + width).reverse())
  }
  return newArrRows.flat()
}

export function dataToCanvasMaterial(
  texture: FourPartColor[],
  alpha: FourPartColor[] | false,
  width: number,
  height: number,
  mirror = false
) {
  const ditheredTexture = ditherIt(texture, width)
  const mainTex = dataToCanvasTexture(ditheredTexture, width, height, mirror)

  const material = new THREE.MeshPhongMaterial({ map: mainTex })
  material.transparent = true
  if (alpha) {
    const alphaTex = dataToCanvasTexture(alpha, width, height, mirror)
    material.alphaMap = alphaTex
  }

  return material
}

function dataToCanvasTexture(
  data: FourPartColor[],
  width: number,
  height: number,
  mirror: boolean
) {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext("2d")!

  const imageData = mirror
    ? makeImageData(data, width, height)
    : makeImageData(flipPixels(data, width), width, height)
  context.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.magFilter = THREE.NearestFilter

  return texture
}

// prettier-ignore
const ditherTexture = [
  0xea, 0xcf, 0xb0, 0xbe, 0xc0, 0xb5, 
  0xa4, 0x8e, 0x99, 0xac, 0xb1, 0xa4, 
  0x8d, 0x88, 0x91, 0x8d, 0x85, 0x85, 
  0x96, 0x9a, 0x91, 0x8e, 0x8c, 0x87, 
  0xa1, 0x93, 0x83, 0x93, 0x83, 0x82, 
  0x94, 0x8a, 0x7a, 0x91, 0x84, 0x8d,
]

function sampleDitherAtCoord(x: number, y: number) {
  return ditherTexture[x + y * 6]
}

function mixColor(channelValue: number, value: number) {
  return channelValue - (255 - value - 25)
}

function ditherIt(data: FourPartColor[], width: number): FourPartColor[] {
  return data.map((fourPartColor, index): FourPartColor => {
    const x = index % width
    const y = Math.floor(index / width)
    const value = sampleDitherAtCoord(x, y)

    const mixedChannels = fourPartColor
      .slice(0, 3)
      .map((channel) => mixColor(channel, value)) as [number, number, number]

    return [...mixedChannels, fourPartColor[3]]
  })
}

function makeImageData(
  rawData: FourPartColor[],
  width: number,
  height: number
) {
  const array = new Uint8ClampedArray(rawData.flat())
  return new ImageData(array, width, height)
}
