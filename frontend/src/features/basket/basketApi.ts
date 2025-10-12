import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket, Item } from "../../app/models/Basket";
import { Game } from "../../app/models/Game";

export const basketApi = createApi({
    reducerPath: "basketApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Basket'],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket,void>({
            query: () =>  'basket',
            providesTags: ['Basket']
        }),
        addBasketItem: builder.mutation<Basket,{game: Game, quantity: number}>({
            query: ({game, quantity}) => ({
                url: `basket?gameId=${game.id}&quantity=${quantity}`,
                method: 'POST'
            }),
            // contains an opimistic update to speed up the change into navbar when we add items
            onQueryStarted: async ({game, quantity}, {dispatch, queryFulfilled}) => {
                
                const patchResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined , draft =>{
                        if(draft){
                            const existingItem = draft.items.find(i => i.gameId === game.id);
                            if(existingItem) existingItem.quantity += quantity;
                            else draft.items.push(new Item(game, quantity) );
                        }
                    })
                );
                
                try {
                    await queryFulfilled;
                    
                    // dispatch(basketApi.util.invalidateTags(['Basket']));
                } catch (error) {
                    console.log(error);
                    patchResult.undo(); // revert the optimistic update
                }
            }
        }),
        removeBasketItem: builder.mutation<void,{gameId: string, quantity: number}>({
            query: ({gameId, quantity}) => ({
                url: `basket?gameId=${gameId}&quantity=${quantity}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({gameId, quantity}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(basketApi.util.updateQueryData('fetchBasket', undefined , draft =>{
                    if(draft){
                        const index = draft.items.findIndex(i => i.gameId === gameId);
                        if(index >= 0){
                            draft.items[index].quantity -= quantity;
                            
                            if(draft.items[index].quantity <= 0){
                                draft.items.splice(index, 1); // remove item if quantity is 0 or less
                            }
                        }
                    }
                })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                    patchResult.undo(); // revert the optimistic update
                }
            }
        }),
    })
});

export const { useFetchBasketQuery, useAddBasketItemMutation, useRemoveBasketItemMutation } = basketApi;