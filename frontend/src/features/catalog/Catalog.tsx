import { useEffect, useState } from "react";
import { Game } from "../../app/models/Game";
import GameList from "./GameList";

export default function Catalog() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("https://localhost:5200/api/games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <GameList games={games} />
    </>
  );
}
