

import { useSelector, useDispatch } from 'react-redux'

import { addUrl, addVideosAsync, deleteVideos, setCurrentVideo } from '../state/videoSlice/videoSlice'
import { AppDispatch, RootState } from '../state/store'
import React, { useState } from 'react'

import "../styles/App.css"
import lightModeDeleteIcon from "../assets/delete-icon/light-mode-delete-icon.svg"
import darkModeDeleteIcon from "../assets/delete-icon/dark-mode-delete-icon.svg"
import playIcon from "../assets/play-icon/play-svgrepo-com.svg"

const VideosHolder = () => {

    const [url, setUrl] = useState<string>("")
    const [isValid, setIsValid] = useState(false)

    const videos = useSelector((state: RootState) => state.videoReducer.videos)
    const videosUrl = useSelector((state: RootState) => state.videoReducer.videosUrl)
    const currentVideo = useSelector((state: RootState) => state.videoReducer.currentVideo)

    const theme = useSelector((state: RootState) => state.themeReducer.mode)

    const dispatch = useDispatch<AppDispatch>()

    const [thumbnailHoveredIndex, setThumbnailHoveredIndex] = useState<number | null>(null)

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
      if(currentVideo === null) {
        dispatch(setCurrentVideo(url))
      }
      setUrl("")

      
    }

    const handleConsoleLog = () => {
      console.log(videosUrl)
    }


  return (
    <div className='videosHolder'>
      <div className='videoAdder'>
        <input value={url} type="text" placeholder='Paste Youtube link here' className='addToQueueInput' onChange={handleInputChange}/>
        <button disabled={isValid == false} className='addToQueueBtn' onClick={handleAddToQueue}>Add to Queue</button>
        <button onClick={handleConsoleLog} className='addToQueueBtn'>console log</button>
      </div>
      
      <div className={`${theme === "dark"? "darkVideosListContainer": ""} videosListContainer`}> 
        {videos.map((video, index) => (
          <div key={video.snippet.title + index} className={`${theme === "dark"? "darkIndividiualVideosContainer" : ""} individualVideoContainer`} >

            <div className="thumbnailContainer"
             onMouseEnter={() => setThumbnailHoveredIndex(index)}
             onMouseLeave={() => setThumbnailHoveredIndex(null)}
             >
              <img src={playIcon} alt="play" className={`playIcon ${thumbnailHoveredIndex === index ? "showPlayIcon" : ""}`}/>
              <img src={video.snippet.thumbnails.high.url} alt="thumbnail" className="thumbnail" onClick={() => dispatch(setCurrentVideo(videosUrl[index]))}/> 
            </div>
             
            
            <p 
            className={`videoTitle ${theme === "dark"? "darkModeVideoTitle" : ""}`} onClick={() => dispatch(setCurrentVideo(videosUrl[index]))}
            onMouseEnter={() => setThumbnailHoveredIndex(index)}
            onMouseLeave={() => setThumbnailHoveredIndex(null)}
            >{
              video.snippet.title}
            </p>

            <div className={`deleteBtnContainer ${theme === "dark"? "darkModeDeleteBtnContainer" : ""}`} onClick={() => dispatch(deleteVideos(index))} >
              <img src={theme === "dark"? darkModeDeleteIcon : lightModeDeleteIcon} alt="delete" className='deleteIcon' />
            </div>
          </div>
        ))}
        
      </div>

    </div>
  )
}

export default VideosHolder