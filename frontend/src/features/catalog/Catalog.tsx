import { Game } from "../../app/models/Game"

export type Props = {
    games: Game[]
}

export default function Catalog({games}: Props) {
  return (
    <>
    <ul>
    {
      games.map((game,index) => (
        <li key={index}>{game.id} - {game.playerModeId} - {game.playerMode.playerMode}</li>
      ))
    }
  </ul>
  </>
  )
}