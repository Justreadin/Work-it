import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./toastSlice";
import authSlice from "./authStore";
import gigSlice from "./gigSlice";


const store = configureStore({
    reducer:{
        toast: toastSlice.reducer,
        auth: authSlice.reducer,
        gig: gigSlice.reducer
    }
})

export default store

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

