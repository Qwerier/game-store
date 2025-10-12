import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket } from "../../app/models/Basket";

export const basketApi = createApi({
    reducerPath: "basketApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Basket'],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket,void>({
            query: () =>  'basket',
            providesTags: ['Basket']
        }),
        addBasketItem: builder.mutation<Basket,{gameId: string, quantity: number}>({
            query: ({gameId, quantity}) => ({
                url: `basket?gameId=${gameId}&quantity=${quantity}`,
                method: 'POST'
            }),
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled;
                    dispatch(basketApi.util.invalidateTags(['Basket']));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        removeBasketItem: builder.mutation<void,{gameId: string, quantity: number}>({
            query: ({gameId, quantity}) => ({
                url: `basket?gameId=${gameId}&quantity=${quantity}`,
                method: 'DELETE'
            })
        }),
    })
});

export const { useFetchBasketQuery, useAddBasketItemMutation, useRemoveBasketItemMutation } = basketApi;