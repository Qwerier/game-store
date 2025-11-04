import { createApi} from "@reduxjs/toolkit/query/react";
import { Game } from "../../app/models/Game";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { PlayerMode } from "../../app/models/Mode";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery:  baseQueryWithErrorHandling, /*fetchBaseQuery({baseUrl: 'https://localhost:5200/api'}),*/
    endpoints: (builder) =>
        ({
            fetchGames: builder.query<Game[], void>({
                query: () => ({url: 'games'})
            }),
            fetchGameDetails: builder.query<Game, string>({
                query: (gameId) => ({url: `games/${gameId}`})
            }),
            fetchModes: builder.query<PlayerMode, void>({
                query: () => ({url: 'modes'})
            }),
            fetchFilters: builder.query<{genres: string[], publishers: string[]}, void>({
                query: () => ({url:'games/filters'})
            })
    })
})


export const {useFetchGameDetailsQuery, useFetchGamesQuery, useFetchFiltersQuery} = catalogApi;