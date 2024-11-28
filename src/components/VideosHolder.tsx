

import { useSelector, useDispatch } from 'react-redux'

import { addUrl, addVideosAsync, /* deleteVideos (for later) */ setCurrentVideo } from '../state/videoSlice/videoSlice'
import { AppDispatch, RootState } from '../state/store'
import React, { useState } from 'react'

import "../styles/App.css"

const VideosHolder = () => {

    const [url, setUrl] = useState<string>("")
    const [isValid, setIsValid] = useState(false)

    const videos = useSelector((state: RootState) => state.videoReducer.videos)
    const videosUrl = useSelector((state: RootState) => state.videoReducer.videoUrl)

    const dispatch = useDispatch<AppDispatch>()

    const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUrl = e.target.value
      setUrl(newUrl)
      
      if(youtubeRegex.test(newUrl)) {
        setIsValid(true)
      } else {
        setIsValid(false)
      }
    }



    const handleAddToQueue = () => {
      dispatch(addUrl(url))
      dispatch(addVideosAsync(url))
      setUrl("")
    }


  return (
    <div className='videosHolder'>
      <div className='videoAdder'>
        <input value={url} type="text" placeholder='Paste Youtube link here' className='addToQueueInput' onChange={handleInputChange}/>
        <button disabled={isValid == false} className='addToQueueBtn' onClick={handleAddToQueue}>Add to Queue</button>
      </div>
      
      <div> 
        {videos.map((video, index) => (
          <div key={index} className='individualVideoContainer' onClick={() => dispatch(setCurrentVideo(videosUrl[index]))}>
            <img src={video.snippet.thumbnails.high.url} alt="thumbnail" className="thumbnail"/>  
            {video.snippet.title}
          </div>
        ))}
        
      </div>

    </div>
  )
}

export default VideosHolder