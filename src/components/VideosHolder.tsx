

import { useSelector, useDispatch } from 'react-redux'

import { addVideos, deleteVideos } from '../state/videoSlice/videoSlice'
import { AppDispatch, RootState } from '../state/store'

const VideosHolder = () => {

    const videos = useSelector((state: RootState) => state.videoReducer.videos)

    const dispatch = useDispatch<AppDispatch>()

    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/(?:.*(?:v=|\/))(.*?)(?:[^\w\-]|$)/


  return (
    <div>
        {videos.map((video, i) => (
            <div key={i}>
                {video}
                
            </div>
        ))}

        {/* <button onClick={() => dispatch(addVideos())}>Add video</button>  */}

    </div>
  )
}

export default VideosHolder