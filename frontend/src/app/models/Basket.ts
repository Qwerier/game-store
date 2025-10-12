import { Game } from "./Game";

export interface Basket {
  basketId: string
  items: Item[]
}

export class Item {
  /**
   *
   */
  constructor(game: Game, quantity: number) {
    this.gameId = game.id;
    this.name = game.name;
    this.pictureUrl = game.pictureUrl;
    this.genre = game.genre;
    this.publisher = game.publisher;
    this.price = game.price;
    this.quantity = quantity;
  }
  gameId: string
  name: string
  pictureUrl: string
  genre: string
  publisher: string
  price: number
  quantity: number
}