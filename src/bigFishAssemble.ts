import { BigFish } from "./bigFishData"
import {
  makeBigFishSide,
  makeBottomFin,
  makeLeftFace,
  makeRearFin,
  makeSideFin,
  makeTopFace,
  makeTopFin,
} from "./bigFishFunctions"
import { FourPartColor } from "./symbols"

import * as THREE from "three"

export function makeBody(
  fishType: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(6, 6, 2)
  return new THREE.Mesh(geometry, [
    makeLeftFace(fishType, primary, secondary),
    makeLeftFace(fishType, primary, secondary),
    makeTopFace(fishType, primary, secondary),
    makeTopFace(fishType, primary, secondary),
    makeBigFishSide(fishType, primary, secondary, true),
    makeBigFishSide(fishType, primary, secondary, false),
  ])
}

export function makeFins(
  group: THREE.Group,
  rearFinParent: THREE.Group,
  fishType: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
) {
  const topBottomPlane = new THREE.PlaneGeometry(6, 3)
  const topFin = new THREE.Mesh(
    topBottomPlane,
    makeTopFin(fishType, primary, secondary)
  )
  topFin.position.y = 4.5
  const bottomFin = new THREE.Mesh(
    topBottomPlane,
    makeBottomFin(fishType, primary, secondary)
  )
  bottomFin.position.y = -4.5

  const sideFinPlane = new THREE.PlaneGeometry(2, 2)
  const sideFinClose = new THREE.Mesh(
    sideFinPlane,
    makeSideFin(fishType, primary, secondary)
  )
  sideFinClose.position.z = 1 + Math.sqrt(1 / 2)
  sideFinClose.position.x = -Math.sqrt(1 / 2)
  sideFinClose.position.y = -2
  sideFinClose.rotation.y = Math.PI * 0.25
  const sideFinFar = new THREE.Mesh(
    sideFinPlane,
    makeSideFin(fishType, primary, secondary)
  )
  sideFinFar.position.z = -1 + -Math.sqrt(1 / 2)
  sideFinFar.position.x = -Math.sqrt(1 / 2)
  sideFinFar.position.y = -2
  sideFinFar.rotation.y = -Math.PI * 0.25

  const rearPlane = new THREE.PlaneGeometry(5, 6)
  const rearFin = new THREE.Mesh(
    rearPlane,
    makeRearFin(fishType, primary, secondary)
  )
  rearFin.position.x = -2.5
  rearFinParent.add(rearFin)
  rearFinParent.position.x = -3

  group.add(topFin)
  group.add(bottomFin)
  group.add(rearFinParent)
  group.add(sideFinClose)
  group.add(sideFinFar)
}
