import { useEffect, useState } from "react";
import { Game } from "../../app/models/Game"


export default function Catalog() {
  
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
        fetch("https://localhost:5200/api/games")
        .then(response => response.json())
        .then(data => setGames(data))
        .catch(err => console.log(err))
  }, []);
  
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