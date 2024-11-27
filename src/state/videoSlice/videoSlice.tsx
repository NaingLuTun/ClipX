import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoSliceState {
    videos: Array<YoutubeAPISnippet>
}

interface YoutubeAPISnippet {
    "snippet": {
        "title": string,
        "description": string,
        "thumbnails": {
            "default": {
                "url": string
            },
            "medium": {
                "url": string
            },
            "high": {
                "url": string
            },
        }
    }
}

interface YoutubeAPIItem {
    "items": [YoutubeAPISnippet]
}

const apiKey= "AIzaSyB9flZMBsVPHLswQrWQmbrUnP6ya15HyWA"

const initialState:VideoSliceState = {videos: []}

const videoSlice = createSlice({
    name: "videoSlice",
    initialState,
    reducers: {
        deleteVideos: (state, action:PayloadAction<number>) => {
            state.videos = state.videos.filter((_, i) => i !== action.payload)
        }
    },

    extraReducers(builder) {
        builder.addCase(addVideosAsync.pending, () => {
            console.log("Fetching data")
        }).addCase(addVideosAsync.fulfilled, 
        (state, action: PayloadAction<YoutubeAPISnippet | undefined>) => {
            if(action.payload) {
                state.videos.push(action.payload)
            } else {
                console.error("No valid video data to add")
            }
            
        })
    },
})

export const addVideosAsync = createAsyncThunk(
    "videoSlice/addVideosAsync",

    async (videoId: string) => {
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        try {
            const response = await fetch(apiUrl)

            if (!response.ok) {
            throw new Error("Failed to fetch video data");
            }
            const data: YoutubeAPIItem = await response.json()

            const snippet = data.items[0]?.snippet

            if (!snippet) {
            throw new Error("Invalid video data");
            }

            return data.items[0]
        }
        catch(error) {
            console.log("Error fetching data", error)
            return undefined
        }
    }
)

export const {deleteVideos} = videoSlice.actions

export default videoSlice.reducer