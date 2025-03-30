import { PlayerMode } from "./Mode"

export type Game = {
    id: string
    name: string
    description: string
    releaseDate: string
    pictureUrl: string
    genre: string
    publisher: string
    developer: string
    price: number
    quantityInStock: number
    playerModeId: number
    playerMode: PlayerMode
  }