import { _, O, P, S, Symbols, W } from "./symbols"

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

// prettier-ignore
export const bigFishMap = {
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
      top: [
        S, P, S, S, S, S, 
        P, P, S, S, S, S,
      ],
      right: [
        S, P, 
        S, S, 
        S, S, 
        P, P, 
        S, S, 
        S, S,
      ],
      bottom: [
        S, P, S, S, S, S, 
        P, P, S, S, S, S,
      ],
      left: [
        S, P, 
        S, S, 
        S, S, 
        P, P, 
        S, S, 
        S, S,
      ]
    },
    fins: {
      top: {
        alpha: [
          W, W, _, _, _, _,
          W, W, W, _, _, _, 
          _, W, W, W, _, _, 
        ],
        texture: [
          P, P, _, _, _, _, 
          P, P, P, _, _, _, 
          _, S, S, P, _, _, 
        ]
      },
      side: {
        alpha: [
          W, W, 
          _, W
        ],
        texture: [
          S, P, 
          P, S
        ],
      },
      rear: {
        alpha: [
          _, _, _, _, _, 
          W, W, W, W, _, 
          W, W, W, W, W, 
          W, W, W, W, W, 
          _, W, W, W, _, 
          _, _, _, _, _,
        ],
        texture: [
          P, P, P, P, P,
          P, P, P, P, P, 
          P, P, P, P, P, 
          P, P, P, P, P, 
          P, P, P, P, P, 
          P, P, P, P, P,
        ]
      },
      bottom: {
        alpha: [
          _, W, W, W, W, _, 
          W, W, W, _, _, _, 
          W, _, _, _, _, _, 
        ],
        texture: [
          P, P, S, P, S, _,
          P, P, P, P, _, _,
          P, S, S, P, _, _,
        ]
      },
    },
  },
} as const satisfies BigFishMap

export type BigFish = keyof typeof bigFishMap
