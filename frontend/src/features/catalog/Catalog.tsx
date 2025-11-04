import { Grid } from "@mui/material";
import GameList from "./GameList";
import { useFetchGamesQuery } from "./catalogApi";
import Filters from "./Filters";

export default function Catalog() {
  // const [games, setGames] = useState<Game[]>([]);

  // useEffect(() => {
  //   fetch("https://localhost:5200/api/games")
  //     .then((response) => response.json())
  //     .then((data) => setGames(data))
  //     .catch((err) => console.log(err));
  // }, []);

  const {data: games, isLoading} = useFetchGamesQuery();

  if(isLoading || !games) return <div>Loading...</div>

  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Filters/>
      </Grid>
      <Grid size={9}>
        <GameList games={games} />
      </Grid>
    </Grid>

  );
}
