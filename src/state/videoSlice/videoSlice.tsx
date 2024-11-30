import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoSliceState {
    videos: Array<YoutubeAPISnippet>,
    videosUrl: string[],
    currentVideo: string | null,
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

const initialState:VideoSliceState = {videos: [], videosUrl: [], currentVideo: null}

const videoSlice = createSlice({
    name: "videoSlice",
    initialState,
    reducers: {
        deleteVideos: (state, action:PayloadAction<number>) => {
            state.videos = state.videos.filter((_, i) => i !== action.payload)
            state.videosUrl = state.videosUrl.filter((_,i) => i !== action.payload)
        },
        addUrl: (state, action:PayloadAction<string>) => {
            state.videosUrl.push(action.payload)
        },
        setCurrentVideo: (state, action:PayloadAction<string>) => {
            state.currentVideo = action.payload
        },
        clearQueue: (state) => {
            state.videos = []
            state.videosUrl = []
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

const extractVideoId = (url: string) => {

    const match = url.match(/(?:\?v=|\/embed\/|\/v\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return match ? match[1] : null
}

export const addVideosAsync = createAsyncThunk(
    "videoSlice/addVideosAsync",

    async (url: string) => {
        
        const videoId = extractVideoId(url)

        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        try {
            const response = await fetch(apiUrl)

            if (!response.ok) {
            throw new Error("Failed to fetch video data");
            }
            
            const data: YoutubeAPIItem = await response.json()
            console.log("API Response:", data)

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

export const {setCurrentVideo, addUrl, deleteVideos, clearQueue} = videoSlice.actions

export default videoSlice.reducer