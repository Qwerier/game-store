import GameList from "./GameList";
import { useFetchGamesQuery } from "./catalogApi";

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
    <>
      <GameList games={games} />
    </>
  );
}
