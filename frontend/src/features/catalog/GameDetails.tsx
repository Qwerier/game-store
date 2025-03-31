import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Game } from "../../app/models/Game";

export default function GameDetails() {
  const {id} = useParams();
  const [game, setGame] = useState<Game | null>(null); // could be a non existing product

  useEffect(()=>{
    fetch(`https://localhost:5200/api/games/${id}`)
      .then(response => response.json())
      .then(data => setGame(data))
      .catch(err => console.log(err))
  }, [id]);
  return (
    <div>{game?.name}</div>
  )
}