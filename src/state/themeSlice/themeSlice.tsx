import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "themeSlice",
    initialState: {mode: "light"},
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light"? "dark" : "light"
        }
    }
})

export const {toggleTheme} = themeSlice.actions
export default themeSlice.reducer