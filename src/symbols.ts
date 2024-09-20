export type FourPartColor = [number, number, number, number]

export const empty: FourPartColor = [0x00, 0x00, 0x00, 0x00]
export const white: FourPartColor = [0xff, 0xff, 0xff, 0xff]
export const black: FourPartColor = [0x00, 0x00, 0x00, 0xff]
export const orange: FourPartColor = [0xff, 0x66, 0x00, 0xff]

export const _ = "B"
export const B = "B"
export const O = "B"
export const W = "W"
export const P = "P"
export const S = "S"

export type Symbols = "B" | "W" | "P" | "S"

export function hydrateSymbols(
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
