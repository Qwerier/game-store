import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterReducer";
import { useDispatch, useSelector } from "react-redux";
import { identitySlice } from "../../features/contact/nameReducer";
import { catalogApi } from "../../features/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../../features/errorTest/errorApi";

export const store = configureStore({
    reducer: {
        [catalogApi.reducerPath]: catalogApi.reducer, // standard logic
        [errorApi.reducerPath]: errorApi.reducer,
        ui: uiSlice.reducer,
        counter: counterSlice.reducer,
        identity: identitySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(catalogApi.middleware, errorApi.middleware)
})

// the following ensure typesafety for TS
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()