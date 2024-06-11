import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducer";
import appMiddleware from "./middleware";
export const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...appMiddleware)
})