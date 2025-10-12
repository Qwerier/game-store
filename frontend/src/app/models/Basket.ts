export interface Basket {
  basketId: string
  items: Item[]
}

export interface Item {
  gameId: string
  name: string
  pictureUrl: string
  genre: string
  publisher: string
  price: number
  quantity: number
}