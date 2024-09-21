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
  stripey: {
    body: {
      side: [
        P, S, P, S, P, S, 
        P, S, P, S, P, S, 
        P, S, P, S, P, O, 
        P, S, P, S, P, S, 
        P, S, P, S, P, S, 
        S, P, S, P, S, P, 
      ],
      top: [
        P, S, P, S, P, S, 
        P, S, P, S, P, S,
      ],
      right: [
        S, S, 
        S, S, 
        S, S, 
        S, S, 
        S, S, 
        P, P,
      ],
      bottom: [
        S, S, S, S, S, P, 
        S, S, S, S, S, P,
      ],
      left: [
        S, S, 
        S, S, 
        S, S, 
        S, S, 
        S, S, 
        S, S,
      ]
    },
    fins: {
      top: {
        alpha: [
          _, _, _, _, _, _,
          _, W, _, W, _, _, 
          W, W, W, W, W, _, 
        ],
        texture: [
          _, _, _, _, _, _, 
          _, P, _, P, _, _, 
          P, S, S, S, P, _, 
        ]
      },
      side: {
        alpha: [
          W, W, 
          _, W
        ],
        texture: [
          S, S, 
          _, P
        ],
      },
      rear: {
        alpha: [
          _, _, _, _, W, 
          _, W, _, W, W, 
          _, _, W, W, W, 
          _, _, W, W, W, 
          _, W, _, W, W, 
          _, _, _, _, W,
        ],
        texture: [
          _, _, _, _, P, 
          _, P, _, P, P, 
          _, _, P, P, S, 
          _, _, P, S, S, 
          _, P, _, P, P, 
          _, _, _, _, P,
        ]
      },
      bottom: {
        alpha: [
          _, W, W, W, W, _, 
          _, _, _, _, _, _, 
          _, _, _, _, _, _, 
        ],
        texture: [
          _, P, P, P, P, _,
          _, _, _, _, _, _,
          _, _, _, _, _, _,
        ]
      },
    },
  },
  flopper: {
    body: {
      side: [
        S, S, S, S, S, S, 
        S, S, S, S, S, S, 
        P, S, S, S, S, S, 
        P, P, S, S, O, S, 
        S, S, S, S, S, P, 
        S, S, S, S, P, P, 
      ],
      top: [
        S, S, P, S, P, P, 
        S, P, S, P, P, P,
      ],
      right: [
        S, S, 
        S, S, 
        S, S, 
        S, S, 
        S, S, 
        P, P,
      ],
      bottom: [
        S, S, S, S, S, P, 
        S, S, S, S, S, P,
      ],
      left: [
        S, S, 
        P, P, 
        P, P, 
        P, P, 
        P, P, 
        S, S,
      ]
    },
    fins: {
      top: {
        alpha: [
          _, _, _, _, _, _,
          _, W, _, _, _, _, 
          W, W, W, W, W, _, 
        ],
        texture: [
          _, _, _, _, _, _, 
          _, S, _, _, _, _, 
          P, P, P, P, P, _, 
        ]
      },
      side: {
        alpha: [
          W, W, 
          _, W
        ],
        texture: [
          S, P, 
          _, P
        ],
      },
      rear: {
        alpha: [
          _, _, _, _, _, 
          _, W, W, _, W, 
          _, _, W, W, W, 
          _, _, W, W, W, 
          _, W, W, _, W, 
          _, _, _, _, _,
        ],
        texture: [
          _, _, _, _, _, 
          _, P, P, _, P, 
          _, _, P, S, P, 
          _, _, P, S, P, 
          _, P, P, _, P, 
          _, _, _, _, _,
        ]
      },
      bottom: {
        alpha: [
          _, _, W, W, W, _, 
          _, W, W, _, _, _, 
          _, _, _, _, _, _, 
        ],
        texture: [
          _, _, S, S, P, _, 
          _, P, P, _, _, _, 
          _, _, _, _, _, _, 
        ]
      },
    },
  },
  blockfish: {
    body: {
      side: [
        S, S, S, S, S, S, 
        S, S, S, S, S, O, 
        S, P, P, P, S, S, 
        P, P, P, P, P, S, 
        P, P, P, P, P, P, 
        P, P, P, P, P, P, 
      ],
      top: [
        S, S, P, S, P, P, 
        S, P, S, P, P, P,
      ],
      right: [
        S, S, 
        S, S, 
        S, S, 
        S, S, 
        S, S, 
        P, P,
      ],
      bottom: [
        S, S, S, S, S, P, 
        S, S, S, S, S, P,
      ],
      left: [
        S, S, 
        P, P, 
        P, P, 
        P, P, 
        P, P, 
        S, S,
      ]
    },
    fins: {
      top: {
        alpha: [
          _, _, _, _, _, _,
          _, W, _, _, _, _, 
          _, W, W, W, W, _, 
        ],
        texture: [
          _, _, _, _, _, _, 
          _, S, _, _, _, _, 
          _, P, P, S, P, _, 
        ]
      },
      side: {
        alpha: [
          W, W, 
          W, W
        ],
        texture: [
          P, S, 
          P, P
        ],
      },
      rear: {
        alpha: [
          _, W, W, _, _, 
          _, W, W, W, _, 
          _, _, W, W, W, 
          _, _, W, W, W, 
          _, W, W, _, _, 
          _, _, _, _, _,
        ],
        texture: [
          _, P, P, _, _, 
          _, P, P, P, _, 
          _, _, P, S, S, 
          _, _, P, P, P, 
          _, P, P, _, _, 
          _, _, _, _, _,
        ]
      },
      bottom: {
        alpha: [
          _, _, W, W, W, _, 
          _, _, _, W, _, _, 
          _, _, _, _, _, _, 
        ],
        texture: [
          _, _, S, S, S, _, 
          _, _, _, P, _, _, 
          _, _, _, _, _, _, 
        ]
      },
    },
  },
  betty: {
    body: {
      side: [
        S, P, S, S, S, S, 
        P, S, S, S, S, S, 
        S, P, P, S, S, P, 
        S, P, P, O, P, P, 
        P, S, P, S, S, S, 
        P, S, S, S, S, S, 
      ],
      top: [
        S, P, S, S, S, S, 
        S, P, S, S, S, S,
      ],
      right: [
        S, S, 
        S, S, 
        P, P, 
        P, P, 
        S, S, 
        S, S,
      ],
      bottom: [
        S, P, S, S, S, S, 
        S, P, S, S, S, S,
      ],
      left: [
        S, S, 
        P, P, 
        S, S, 
        S, S, 
        P, P, 
        S, S,
      ]
    },
    fins: {
      top: {
        alpha: [
          _, _, _, _, _, _,
          _, W, W, _, _, _, 
          _, W, W, W, W, _, 
        ],
        texture: [
          _, _, _, _, _, _, 
          _, P, P, _, _, _, 
          _, S, S, P, P, _, 
        ]
      },
      side: {
        alpha: [
          W, W, 
          W, W
        ],
        texture: [
          P, S, 
          P, P
        ],
      },
      rear: {
        alpha: [
          _, W, W, _, _, 
          _, _, W, W, W, 
          _, _, _, W, W, 
          _, _, _, W, W, 
          _, _, W, W, W, 
          _, W, W, _, _,
        ],
        texture: [
          _, P, P, _, _, 
          _, _, P, P, P, 
          _, _, _, S, S, 
          _, _, _, S, S, 
          _, _, P, P, P, 
          _, P, P, _, _,
        ]
      },
      bottom: {
        alpha: [
          _, W, W, W, W, _, 
          _, W, W, W, _, _, 
          _, _, _, _, _, _, 
        ],
        texture: [
          _, P, S, S, S, _, 
          _, P, P, P, _, _, 
          _, _, _, _, _, _, 
        ]
      },
    },
  },
  clayfish: {
    body: {
      side: [
        S, S, S, S, S, S, 
        P, S, S, P, S, S, 
        P, S, S, P, P, S, 
        S, P, S, S, O, P, 
        S, S, P, S, S, P, 
        P, S, S, S, S, P, 
      ],
      top: [
        S, S, S, S, S, P, 
        S, S, S, S, S, P,
      ],
      right: [
        P, P, 
        P, P, 
        S, S, 
        P, P, 
        S, S, 
        S, S,
      ],
      bottom: [
        P, P, S, S, S, S, 
        P, P, S, S, S, S,
      ],
      left: [
        S, S, 
        S, S, 
        S, S, 
        S, S, 
        P, P, 
        P, P,
      ]
    },
    fins: {
      top: {
        alpha: [
          _, _, W, _, _, _,
          W, W, _, W, _, _, 
          _, W, W, W, W, _, 
        ],
        texture: [
          _, _, P, _, _, _,
          P, S, _, P, _, _, 
          _, P, S, S, P, _, 
        ]
      },
      side: {
        alpha: [
          W, W, 
          _, W
        ],
        texture: [
          S, S, 
          _, S
        ],
      },
      rear: {
        alpha: [
          _, W, W, _, _,
          _, _, W, W, _,
          _, _, _, W, W,
          _, _, _, W, W,
          _, _, W, W, _,
          _, W, W, _, _,
        ],
        texture: [
          _, P, P, _, _,
          _, _, P, P, _,
          _, _, _, S, S,
          _, _, _, S, S,
          _, _, P, P, _,
          _, P, P, _, _,
        ]
      },
      bottom: {
        alpha: [
          _, _, W, W, W, _, 
          _, _, _, W, _, _, 
          _, _, W, _, _, _, 
        ],
        texture: [
          _, _, S, S, P, _, 
          _, _, _, P, _, _, 
          _, _, P, _, _, _, 
        ]
      },
    },
  },
} as const satisfies BigFishMap

export const bigFishTypes = Object.keys(bigFishMap) as BigFish[]

export type BigFish = keyof typeof bigFishMap
