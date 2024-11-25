import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoSliceState {
    videos: Array<string>
}

const initialState:VideoSliceState = {videos: []}

const videoSlice = createSlice({
    name: "videoSlice",
    initialState,
    reducers: {
        addVideos: (state, action:PayloadAction<string>) => {
            state.videos.push(action.payload)
        },

        deleteVideos: (state, action:PayloadAction<number>) => {
            state.videos = state.videos.filter((_, i) => i !== action.payload)
        }
    }
})

export const {addVideos, deleteVideos} = videoSlice.actions

export default videoSlice.reducer