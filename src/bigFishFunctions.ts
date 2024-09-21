import { BigFish, bigFishMap } from "./bigFishData"
import { FourPartColor, hydrateSymbols } from "./symbols"
import {
  dataToCanvasMaterial,
  dataToFinCanvasMaterial,
} from "./texturingFunctions"

export function makeBigFishSide(
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
export function makeTopFin(
  type: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
) {
  const alpha = hydrateSymbols(
    bigFishMap[type].fins.top.alpha,
    primary,
    secondary
  )
  const texture = hydrateSymbols(
    bigFishMap[type].fins.top.texture,
    primary,
    secondary
  )
  return dataToFinCanvasMaterial(texture, alpha, 6, 3, true)
}
export function makeBottomFin(
  type: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
) {
  const alpha = hydrateSymbols(
    bigFishMap[type].fins.bottom.alpha,
    primary,
    secondary
  )
  const texture = hydrateSymbols(
    bigFishMap[type].fins.bottom.texture,
    primary,
    secondary
  )
  return dataToFinCanvasMaterial(texture, alpha, 6, 3, true)
}
export function makeRearFin(
  type: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
) {
  const alpha = hydrateSymbols(
    bigFishMap[type].fins.rear.alpha,
    primary,
    secondary
  )
  const texture = hydrateSymbols(
    bigFishMap[type].fins.rear.texture,
    primary,
    secondary
  )
  return dataToFinCanvasMaterial(texture, alpha, 5, 6, true)
}
export function makeSideFin(
  type: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
) {
  const alpha = hydrateSymbols(
    bigFishMap[type].fins.side.alpha,
    primary,
    secondary
  )
  const texture = hydrateSymbols(
    bigFishMap[type].fins.side.texture,
    primary,
    secondary
  )
  return dataToFinCanvasMaterial(texture, alpha, 2, 2, true)
}
export function makeTopFace(
  type: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
) {
  return dataToCanvasMaterial(
    hydrateSymbols(bigFishMap[type].body.top, primary, secondary),
    false,
    6,
    2,
    true
  )
}
export function makeBottomFace(
  type: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
) {
  return dataToCanvasMaterial(
    hydrateSymbols(bigFishMap[type].body.bottom, primary, secondary),
    false,
    6,
    2,
    true
  )
}
export function makeLeftFace(
  type: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
) {
  return dataToCanvasMaterial(
    hydrateSymbols(bigFishMap[type].body.left, primary, secondary),
    false,
    2,
    6,
    true
  )
}
export function makeRightFace(
  type: BigFish,
  primary: FourPartColor,
  secondary: FourPartColor
) {
  return dataToCanvasMaterial(
    hydrateSymbols(bigFishMap[type].body.right, primary, secondary),
    false,
    2,
    6,
    true
  )
}
