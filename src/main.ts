import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import "./style.css"

const empty: FourPartColor = [0x00, 0x00, 0x00, 0x00]
const white: FourPartColor = [0xff, 0xff, 0xff, 0xff]
const black: FourPartColor = [0x00, 0x00, 0x00, 0xff]
const orange: FourPartColor = [0xff, 0x66, 0x00, 0xff]

const _ = "B"
const B = "B"
const O = "B"
const W = "W"
const P = "P"
const S = "S"

type Symbols = "B" | "W" | "P" | "S"

// prettier-ignore
const ditherTexture = [
  0xea, 0xcf, 0xb0, 0xbe, 0xc0, 0xb5, 
  0xa4, 0x8e, 0x99, 0xac, 0xb1, 0xa4, 
  0x8d, 0x88, 0x91, 0x8d, 0x85, 0x85, 
  0x96, 0x9a, 0x91, 0x8e, 0x8c, 0x87, 
  0xa1, 0x93, 0x83, 0x93, 0x83, 0x82, 
  0x94, 0x8a, 0x7a, 0x91, 0x84, 0x8d,
]

type AlphaAndTexture = {
  alpha: Symbols[]
  texture: Symbols[]
}

type BigFishMap = {
  [key: string]: {
    body: {
      side: Symbols[]
      top: Symbols[]
      right: Symbols[]
      bottom: Symbols[]
      left: Symbols[]
    }
    fins: {
      top: AlphaAndTexture
      side: AlphaAndTexture
      rear: AlphaAndTexture
      bottom: AlphaAndTexture
    }
  }
}

function hydrateSymbols(
  symbols: Symbols[],
  primary: FourPartColor,
  secondary: FourPartColor
): FourPartColor[] {
  return symbols.map((symbol) => {
    switch (symbol) {
      case "B":
        return black
      case "W":
        return white
      case "P":
        return primary
      case "S":
        return secondary
    }
  })
}

// prettier-ignore
const bigFishMap = {
  glitter: {
    body: {
      side: [
        S, S, S, S, S, S, 
        P, P, S, S, S, S, 
        P, S, P, S, S, S, 
        S, P, S, P, O, S, 
        P, S, S, S, P, S, 
        P, P, S, P, S, S, 
      ],
      top: [],
      right: [],
      bottom: [],
      left: [],
    },
    fins: {
      top: {
        alpha: [],
        texture: [],
      },
      side: {
        alpha: [],
        texture: [],
      },
      rear: {
        alpha: [],
        texture: [],
      },
      bottom: {
        alpha: [],
        texture: [],
      },
    },
  },
} as const satisfies BigFishMap

type BigFish = keyof typeof bigFishMap

function sampleDitherAtCoord(x: number, y: number) {
  return ditherTexture[x + y * 6]
}

function mixColor(channelValue: number, value: number) {
  return channelValue - (255 - value - 25)
}

type FourPartColor = [number, number, number, number]

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

function makeBigFishSide(
  type: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor,
  mirror: boolean
) {
  return dataToCanvasMaterial(
    hydrateSymbols(bigFishMap[type].body.side, primary, secondary),
    false,
    6,
    6,
    mirror
  )
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

function dataToCanvasMaterial(
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

function flipPixels(data: FourPartColor[], width: number) {
  let newArrRows = []
  for (let row = 0; row < data.length / width; row += 1) {
    newArrRows.push(data.slice(row * width, row * width + width).reverse())
  }
  return newArrRows.flat()
}

function dataToFinCanvasMaterial(
  ...args: Parameters<typeof dataToCanvasMaterial>
) {
  const mat = dataToCanvasMaterial(...args)
  mat.side = THREE.DoubleSide
  return mat
}

function makeTopFin() {
  const alpha = [
    white,
    white,
    empty,
    empty,
    empty,
    empty,
    white,
    white,
    white,
    empty,
    empty,
    empty,
    empty,
    white,
    white,
    white,
    empty,
    empty,
  ]

  const texture = [
    orange,
    orange,
    black,
    black,
    black,
    black,
    orange,
    orange,
    orange,
    black,
    black,
    black,
    black,
    white,
    white,
    orange,
    black,
    black,
  ]

  return dataToFinCanvasMaterial(texture, alpha, 6, 3, true)
}

function makeBottomFin() {
  const alpha = [
    empty,
    white,
    white,
    white,
    white,
    empty,
    white,
    white,
    white,
    empty,
    empty,
    empty,
    white,
    empty,
    empty,
    empty,
    empty,
    empty,
  ]

  const texture = [
    orange,
    orange,
    white,
    orange,
    white,
    black,
    orange,
    orange,
    orange,
    orange,
    black,
    black,
    orange,
    white,
    white,
    orange,
    black,
    black,
  ]

  return dataToFinCanvasMaterial(texture, alpha, 6, 3, true)
}

function makeRearFin() {
  const alpha = [
    empty,
    empty,
    empty,
    empty,
    empty,
    white,
    white,
    white,
    white,
    empty,
    white,
    white,
    white,
    white,
    white,
    white,
    white,
    white,
    white,
    white,
    empty,
    white,
    white,
    white,
    empty,
    empty,
    empty,
    empty,
    empty,
    empty,
  ]

  const texture = [
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
    orange,
  ]

  return dataToFinCanvasMaterial(texture, alpha, 5, 6, true)
}

function makeSideFin(mirror: boolean) {
  const alpha = [white, white, empty, white]

  const texture = [white, orange, orange, white]

  return dataToFinCanvasMaterial(texture, alpha, 2, 2, !mirror)
}

function makeTopFace() {
  const texture = [
    white,
    orange,
    white,
    white,
    white,
    white,
    orange,
    orange,
    white,
    white,
    white,
    white,
  ]

  return dataToCanvasMaterial(texture, false, 6, 2, true)
}

function makeLeftFace() {
  const texture = [
    white,
    orange,
    white,
    white,
    white,
    white,
    orange,
    orange,
    white,
    white,
    white,
    white,
  ]

  return dataToCanvasMaterial(texture, false, 2, 6, true)
}

const scene = new THREE.Scene()
scene.background = new THREE.Color("dodgerblue")
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio * 1.5)
new OrbitControls(camera, renderer.domElement)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(6, 6, 2)

const theothercube = new THREE.BoxGeometry(1, 1, 1)
const theothermat = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
{
  const skyColor = 0xffffff // light blue
  const groundColor = 0x000000 // brownish orange
  const intensity = 3.0
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
  light.position.x -= 5
  light.position.y += 3
  light.position.z += 5

  scene.add(light)
}

const fishSideNormal = makeBigFishSide("glitter", orange, white, true)
const fishSideMirrored = makeBigFishSide("glitter", orange, white, false)
const topFace = makeTopFace()

const cube = new THREE.Mesh(geometry, [
  makeLeftFace(),
  makeLeftFace(),
  topFace,
  topFace,
  fishSideNormal,
  fishSideMirrored,
])
const cube2 = new THREE.Mesh(theothercube, theothermat)
cube2.position.z += 5
const group = new THREE.Group()

const topBottomPlane = new THREE.PlaneGeometry(6, 3)
const topFin = new THREE.Mesh(topBottomPlane, makeTopFin())
topFin.position.y = 4.5
const bottomFin = new THREE.Mesh(topBottomPlane, makeBottomFin())
bottomFin.position.y = -4.5

const sideFinPlane = new THREE.PlaneGeometry(2, 2)
const sideFinClose = new THREE.Mesh(sideFinPlane, makeSideFin(false))
sideFinClose.position.z = 1 + Math.sqrt(1 / 2)
sideFinClose.position.x = -Math.sqrt(1 / 2)
sideFinClose.position.y = -2
sideFinClose.rotation.y = Math.PI * 0.25
const sideFinFar = new THREE.Mesh(sideFinPlane, makeSideFin(false))
sideFinFar.position.z = -1 + -Math.sqrt(1 / 2)
sideFinFar.position.x = -Math.sqrt(1 / 2)
sideFinFar.position.y = -2
sideFinFar.rotation.y = -Math.PI * 0.25

const rearFinParent = new THREE.Group()
const rearPlane = new THREE.PlaneGeometry(5, 6)
const rearFin = new THREE.Mesh(rearPlane, makeRearFin())
rearFin.position.x = -2.5
rearFinParent.add(rearFin)
rearFinParent.position.x = -3

group.add(topFin)
group.add(bottomFin)
group.add(rearFinParent)
group.add(sideFinClose)
group.add(sideFinFar)
group.add(cube)
// group.add(cube2)

cube2.rotation.x = 0.3
cube2.rotation.y = 0.3
cube2.rotation.z = 0.3
scene.add(group)

group.rotation.x = Math.PI * 0.15
group.rotation.y = Math.PI * 0.15
// group.rotation.z = Math.PI * 0.25

camera.position.z = 15

function animate(time: number) {
  renderer.render(scene, camera)
  // group.rotation.x += 0.001;
  // group.rotation.z += 0.001;
  // group.rotation.y -= 0.01;

  const oscillatingValue = Math.sin((time * 4) / 1000)

  group.rotation.y = -oscillatingValue / 8

  rearFinParent.rotation.y = oscillatingValue / 4
}
renderer.setAnimationLoop(animate)
