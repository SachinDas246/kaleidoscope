import { configureStore } from "@reduxjs/toolkit";
import favReducer from '../features/favorites/favSlice'

const store = configureStore({
    reducer:{
        favorite:favReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch