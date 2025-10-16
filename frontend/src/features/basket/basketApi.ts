import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket, Item } from "../../app/models/Basket";
import { Game } from "../../app/models/Game";

function isBasketItem(arg: Game | Item) : arg is Item {
    return (arg as Item).quantity !== undefined;
}

export const basketApi = createApi({
    reducerPath: "basketApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Basket'],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket,void>({
            query: () =>  'basket',
            providesTags: ['Basket']
        }),
        addBasketItem: builder.mutation<Basket,{game: Game | Item, quantity: number}>({
            query: ({game, quantity}) => {
                const gameId = isBasketItem(game) ? game.gameId : game.id;

                return{                
                    url: `basket?gameId=${gameId}&quantity=${quantity}`,
                    method: 'POST'
                }

            },
            // contains an opimistic update to speed up the change in basket
            onQueryStarted: async ({game, quantity}, {dispatch, queryFulfilled}) => {
                let isFirstTime: boolean = false;

                const patchResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined , draft =>{
                        if(!draft.basketId) isFirstTime = true;
                        if(draft){
                            const gameId = isBasketItem(game) ? game.gameId : game.id;

                            const existingItem = draft.items.find(i => i.gameId === gameId);
                            if(existingItem) existingItem.quantity += quantity;
                            else draft.items.push( isBasketItem(game)? game : {...game, gameId: game.id, quantity} );
                            // above replaced a constructor call with spread as Redux allows simple object serialization no funcs allowed
                        }   
                    })
                );
                
                try {
                    await queryFulfilled;
                    if(isFirstTime) dispatch(basketApi.util.invalidateTags(['Basket']));
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