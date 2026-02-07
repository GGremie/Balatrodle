import { Rarity } from "../enums/rarity.enum"

export type Joker = {
    id: number
    name: string
    price: number
    rarity: Rarity
    type: string
    isScaling: boolean
    hasRNG: boolean
    image?: string
}