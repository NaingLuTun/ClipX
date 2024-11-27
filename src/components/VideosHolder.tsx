

import { useSelector, useDispatch } from 'react-redux'

import { addVideos, deleteVideos } from '../state/videoSlice/videoSlice'
import { AppDispatch, RootState } from '../state/store'
import React, { useState } from 'react'

const VideosHolder = () => {

    const [url, setUrl] = useState<string>("")
    const [isValid, setIsValid] = useState(false)

    const videos = useSelector((state: RootState) => state.videoReducer.videos)

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
      dispatch(addVideos(url))
    }


  return (
    <div className='videosHolder'>
      <div className='videoAdder'>
        <input type="text" placeholder='Paste Youtube link here' className='addToQueueInput' onChange={handleInputChange}/>
        <button disabled={isValid == false} className='addToQueueBtn' onClick={handleAddToQueue}>Add to Queue</button>
      </div>
      
      <div>
        {videos.map((url, index) => (
          <div key={index}>{url}</div>
        ))}
      </div>

    </div>
  )
}

export default VideosHolder