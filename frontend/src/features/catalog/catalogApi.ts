import { createApi} from "@reduxjs/toolkit/query/react";
import { Game } from "../../app/models/Game";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { PlayerMode } from "../../app/models/Mode";
import { GameParams } from "../../app/models/GameParams";
import { PaginationMetadata } from "../../app/models/Pagination";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery:  baseQueryWithErrorHandling, /*fetchBaseQuery({baseUrl: 'https://localhost:5200/api'}),*/
    endpoints: (builder) =>
        ({
            fetchGames: builder.query<{items: Game[], pagination: PaginationMetadata}, GameParams>({
                query: (gameParams) =>{ 
                    return{
                        url: 'games',
                        params: gameParams
                    }
                },
                transformResponse: (items: Game[], meta) => {
                    const paginationHeader = meta?.response?.headers.get('Pagination');
                    const pagination = paginationHeader? JSON.parse(paginationHeader) : null;

                    return {items, pagination};
                }
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