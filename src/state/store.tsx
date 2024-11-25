import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice/themeSlice"
import videoReducer from "./videoSlice/videoSlice"

export const store = configureStore({
    reducer: {themeReducer, videoReducer}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch