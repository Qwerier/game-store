import { Game } from "../../app/models/Game";
import GameCard from "./GameCard";

type Props = {
  games: Game[];
};

// represents the whole collection of Game objects
export default function GameList({ games }: Props) {
  return (
    <div>
      <ul>
        {games.map((game, index) => (
            <GameCard id={index} game={game} />
        ))}
      </ul>
    </div>
  );
}
