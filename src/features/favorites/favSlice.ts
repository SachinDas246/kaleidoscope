import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MovieSummary } from "../../types/movieTypes"

type InitialState ={
    movies:MovieSummary[]
}

const initialState:InitialState  = {
    movies:[]
}

const favSlice = createSlice({
    name:'favourite',
    initialState:initialState,
    reducers:{
        addToFav:(state,action:PayloadAction<MovieSummary>) => {
            state.movies.push(action.payload)
        },
        removeFromFav:(state,action:PayloadAction<string>) => {
            state.movies = state.movies.filter((movie)=>(movie.imdbID != action.payload))
        }
    }
})

export default favSlice.reducer;
export const {addToFav, removeFromFav} = favSlice.actions;