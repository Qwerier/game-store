import { createApi} from "@reduxjs/toolkit/query/react";
import { Game } from "../../app/models/Game";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

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
    })
})


export const {useFetchGameDetailsQuery, useFetchGamesQuery} = catalogApi;