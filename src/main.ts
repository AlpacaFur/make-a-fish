import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { _, orange, white } from "./symbols"
import { makeBody, makeFins } from "./bigFishAssemble"

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

function buildFish() {
  const fishGroup = new THREE.Group()
  fishGroup.add(makeBody())

  const rearFinParent = new THREE.Group()
  makeFins(fishGroup, rearFinParent, "glitter", orange, white)

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
