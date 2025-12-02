import { Game } from "../../app/models/Game";
import GameCard from "./GameCard";
import '../../app/layout/styles.css'
import { Grid } from "@mui/material";

type Props = {
  games: Game[];
};

// represents the whole collection of Game objects
export default function GameList({ games }: Props) {
  return (
    <Grid container spacing={3}>
        {games.map(game => (
          <Grid key={game.id} size={3} display='flex' >
            <GameCard key={game.id} game={game} />
          </Grid>
        ))}
    </Grid>
    // <div className="center-spacing">

    // </div>
  );
}
