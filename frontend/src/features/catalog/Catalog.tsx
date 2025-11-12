import { Grid, Typography } from "@mui/material";
import GameList from "./GameList";
import { useFetchFiltersQuery, useFetchGamesQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
  // const [games, setGames] = useState<Game[]>([]);

  // useEffect(() => {
  //   fetch("https://localhost:5200/api/games")
  //     .then((response) => response.json())
  //     .then((data) => setGames(data))
  //     .catch((err) => console.log(err));
  // }, []);
  const gameParams = useAppSelector((state) => state.catalog);
  const { data, isLoading } = useFetchGamesQuery(gameParams);
  const { data: filtersData, isLoading: loadingFilters } = useFetchFiltersQuery();
  const dispatch = useAppDispatch();

  if (isLoading || loadingFilters) return <div>Loading...</div>;
  if (!data || !filtersData) return <div>Trouble loading</div>;
  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Filters propFilters={filtersData} />
      </Grid>
      <Grid size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <GameList games={data.items} />
            <AppPagination
              metadata={data.pagination}
              // page is auto-provided as it's inferred from mouse clicks
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <Typography variant="h5">No results for this filter</Typography>
        )}
      </Grid>
    </Grid>
  );
}
