import { Game } from "../../app/models/Game";
import GameCard from "./GameCard";
import '../../app/layout/styles.css'

type Props = {
  games: Game[];
};

// represents the whole collection of Game objects
export default function GameList({ games }: Props) {
  return (
    <div className="center-spacing">
        {games.map(game => (
            <GameCard key={game.id} game={game} />
        ))}
    </div>
  );
}
