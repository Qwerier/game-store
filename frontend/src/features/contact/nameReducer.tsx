import { createSlice } from "@reduxjs/toolkit"

type Identity = {
    name: string
}

const initialState : Identity = {
    name: 'Rowan'
}

export const identitySlice = createSlice({
    name: 'identity',
    initialState: initialState,
    reducers: {
        concat: (state, action) => {
            state.name += action.payload
        },
        decat: (state) => {
            state.name = state.name.substring(0, state.name.length-1)
        },
        replace: (state, action) => {
            state.name = state.name.replace(action.payload.char, action.payload.replacement) 
        }
    }
})

export const {concat, decat, replace} = identitySlice.actions;
