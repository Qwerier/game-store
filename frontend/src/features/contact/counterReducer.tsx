import { createSlice } from "@reduxjs/toolkit"

export type CounterState ={
    data: number,
    name: string
}

const initialState : CounterState = {
    data: 42,
    name: 'Angus'
}

// even though Redux prohibits state mutation, Immer library allows you to write
// mutable code interpreted as immutable.
export const counterSlice = createSlice({
    name: 'counterSlice',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data += action.payload
        },
        decrement: (state, action) => {
            state.data -= action.payload
        }
    }
})

export const {increment, decrement} = counterSlice.actions;
