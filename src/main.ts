import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import "./style.css"
import { _, FourPartColor, orange, white } from "./symbols"
import { makeBody } from "./bigFishAssemble"

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

const group = new THREE.Group()
group.add(makeBody())

const rearFinParent = new THREE.Group()
makeFins(group, rearFinParent, "glitter", orange, white)

scene.add(group)

group.rotation.x = Math.PI * 0.15
group.rotation.y = Math.PI * 0.15
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
function makeFins(
  group: THREE.Group<THREE.Object3DEventMap>,
  rearFinParent: THREE.Group<THREE.Object3DEventMap>,
  arg2: string,
  orange: FourPartColor,
  white: FourPartColor
) {
  throw new Error("Function not implemented.")
}
