import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoSliceState {
    videos: Array<YoutubeAPISnippet>,
    videoUrls: string[],
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

const getLocalStorageData = (key: string, fallback: []) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  }

const apiKey= "AIzaSyB9flZMBsVPHLswQrWQmbrUnP6ya15HyWA"

const videoUrlsFromStorage: string[] = getLocalStorageData('videoUrls', [])

const initialState:VideoSliceState = {
    videos: getLocalStorageData("videos", []),
    videoUrls: getLocalStorageData("vidoeUrls", []), 
    currentVideo: videoUrlsFromStorage.length > 0? videoUrlsFromStorage[0] : null
}

const videoSlice = createSlice({
    name: "videoSlice",
    initialState,
    reducers: {
        deleteVideos: (state, action:PayloadAction<number>) => {
            state.videos = state.videos.filter((_, i) => i !== action.payload)
            state.videoUrls = state.videoUrls.filter((_,i) => i !== action.payload)
            const storedUrls = localStorage.getItem("videoUrls")
            const storedVideosInfo = localStorage.getItem("videosInfo")

            if(storedUrls) {
                const retrievedUrls: string[] = JSON.parse(storedUrls)
                const updatedUrls = retrievedUrls.filter((_,i) => i !== action.payload)

                localStorage.setItem("videosUrls", JSON.stringify(updatedUrls))
            }

            if(storedVideosInfo) {
                const retrievedVideos: string[] = JSON.parse(storedVideosInfo)
                const updatedVideos = retrievedVideos.filter((_,i) => i !== action.payload)

                localStorage.setItem("videosInfo", JSON.stringify(updatedVideos))
            }

        },
        addUrl: (state, action:PayloadAction<string>) => {
            state.videoUrls.push(action.payload)
            
        },
        setCurrentVideo: (state, action:PayloadAction<string>) => {
            state.currentVideo = action.payload
        },
        clearQueue: (state) => {
            state.videos = []
            state.videoUrls = []
            localStorage.clear()
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