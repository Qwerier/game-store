import { createApi} from "@reduxjs/toolkit/query/react";
import { Game } from "../../app/models/Game";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { PlayerMode } from "../../app/models/Mode";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery:  baseQueryWithErrorHandling, /*fetchBaseQuery({baseUrl: 'https://localhost:5200/api'}),*/
    endpoints: (builder) =>({
        fetchGames: builder.query<Game[], void>({
            query: () => ({url: 'games'})
        }),
        fetchGameDetails: builder.query<Game, string>({
            query: (gameId) => ({url: `game/${gameId}`})
        }),
        fetchModes: builder.query<PlayerMode, void>({
            query: () => ({url: 'modes'})
        })
    })
})


export const {useFetchGameDetailsQuery, useFetchGamesQuery} = catalogApi;