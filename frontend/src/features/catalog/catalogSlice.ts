import { createSlice } from "@reduxjs/toolkit";
import { GameParams } from "../../app/models/GameParams";

const initialState: GameParams = {
    pageNumber: 1,
    pageSize: 10,
    genres: [],
    publishers: [],
    searchTerm: '',
    orderBy: 'name'
};

export const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState,
    reducers:{
        setPageNumber(state, action){
            state.pageNumber = action.payload
        },
        setPageSize(state, action){
            state.pageNumber = action.payload
        },
        setGenres(state, action){
            state.genres = action.payload
            state.pageNumber = 1
        },
        setPublishers(state, action){
            state.publishers = action.payload
            state.pageNumber = 1
        },
        setOrderBy(state, action){
            state.orderBy = action.payload
            state.pageNumber = 1
        },
        setSearchTerm(state, action){
            state.searchTerm = action.payload
            state.pageNumber = 1
        },
        reset(){
            return initialState;
        }
    }
});

export const {setGenres, setPublishers, setSearchTerm, setOrderBy, setPageNumber, setPageSize, reset} 
    = catalogSlice.actions