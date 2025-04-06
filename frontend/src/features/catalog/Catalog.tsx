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

  const {data, isLoading} = useFetchGamesQuery();

  if(isLoading || !data) return <div>Loading...</div>

  return (
    <>
      <GameList games={data} />
    </>
  );
}
