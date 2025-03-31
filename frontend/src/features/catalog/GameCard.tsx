import { Game } from "../../app/models/Game";

type Props = {
  game: Game;
  id: number;
};

// represents a single Game object
export default function GameCard({ game, id }: Props) {
  return (
    <li key={id}>
      {game.id} - {game.playerModeId} - {game.playerMode.playerMode}
    </li>
  );
}
