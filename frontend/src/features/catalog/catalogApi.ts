import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Game } from "../../app/models/Game";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://localhost:5200/api'}),
    endpoints: (builder) =>({
        fetchGames: builder.query<Game[], void>({
            query: () => ({url: 'games'})
        }),
        fetchGameDetails: builder.query<Game, number>({
            query: (gameId) => ({url: `game/${gameId}`})
        }),
    })
})


export const {useFetchGameDetailsQuery, useFetchGamesQuery} = catalogApi;