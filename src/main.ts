import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { _, FourPartColor } from "./symbols"
import { makeBody, makeFins } from "./bigFishAssemble"
import { BigFish, bigFishTypes } from "./bigFishData"

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
const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.enableZoom = false
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

{
  const skyColor = 0xffffff
  const groundColor = 0x000000
  const intensity = 3.0
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
  light.position.x -= 5
  light.position.y += 3
  light.position.z += 5

  scene.add(light)
}

const colors = [
  "#D2D7D8",
  "#D06828",
  "#9D379B",
  "#4286C1",
  "#E9B540",
  "#71A936",
  "#C96C90",
  "#34373B",
  "#7E7E75",
  "#367687",
  "#5D2098",
  "#292B8B",
  "#5C3C20",
  "#4D5B29",
  "#822620",
  "#010205",
]
  .map((color) => color.slice(1))
  .map((color) => [
    parseInt(color.slice(0, 2), 16),
    parseInt(color.slice(2, 4), 16),
    parseInt(color.slice(4, 6), 16),
    0xff,
  ]) as FourPartColor[]

function buildFish() {
  const primary = colors[Math.floor(Math.random() * colors.length)]
  const secondary = colors[Math.floor(Math.random() * colors.length)]
  const type: BigFish =
    bigFishTypes[Math.floor(Math.random() * bigFishTypes.length)]

  const fishGroup = new THREE.Group()
  fishGroup.add(makeBody(type, primary, secondary))

  const rearFinParent = new THREE.Group()
  makeFins(fishGroup, rearFinParent, type, primary, secondary)

  scene.add(fishGroup)

  fishGroup.rotation.x = Math.PI * 0.15
  fishGroup.rotation.y = Math.PI * 0.15

  return { fishGroup, rearFinParent }
}

camera.position.z = 20

function makeAFish() {
  const { fishGroup, rearFinParent } = buildFish()

  function animate(time: number) {
    renderer.render(scene, camera)
    // group.rotation.x += 0.001;
    // group.rotation.z += 0.001;
    // group.rotation.y += 0.001;

    const oscillatingValue = Math.sin((time * 4) / 1000)

    fishGroup.position.x = 2
    fishGroup.rotation.y = -oscillatingValue / 8
    rearFinParent.rotation.y = oscillatingValue / 4
  }
  renderer.setAnimationLoop(animate)
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

function checkTime() {
  const now = new Date()

  const isElevenEleven =
    (now.getHours() == 11 || now.getHours() == 23) && now.getMinutes() == 11

  if (isElevenEleven) {
    document.getElementById("top-text")!.textContent = `11:11`
    document.getElementById("bottom-text")!.textContent = "make a fish!"
    makeAFish()
  } else {
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(
      2,
      "0"
    )}`

    document.getElementById("top-text")!.textContent = `it's ${time}`
    document.getElementById("bottom-text")!.textContent = "come back later"
  }
}

checkTime()
