

import { useSelector, useDispatch } from 'react-redux'

import { addUrl, addVideosAsync, deleteVideos, setCurrentVideo, clearQueue } from '../state/videoSlice/videoSlice'
import { AppDispatch, RootState } from '../state/store'
import React, { useEffect, useState } from 'react'

import "../styles/App.css"
import lightModeDeleteIcon from "../assets/delete-icon/light-mode-delete-icon.svg"
import darkModeDeleteIcon from "../assets/delete-icon/dark-mode-delete-icon.svg"
import playIcon from "../assets/play-icon/play-svgrepo-com.svg"

const VideosHolder = () => {

    const [url, setUrl] = useState<string>("")
    const [isValid, setIsValid] = useState(false)

    const videos = useSelector((state: RootState) => state.videoReducer.videos)
    const videoUrls = useSelector((state: RootState) => state.videoReducer.videoUrls)
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
      if(isValid === false) {
        return
      }
      dispatch(addUrl(url))
      dispatch(addVideosAsync(url))

      if(currentVideo === null) {
        dispatch(setCurrentVideo(url))
      }
      setUrl("")
      setIsValid(false)
    }

    useEffect(() => {
      const storedVideos = localStorage.getItem("videos");
      const storedVideoUrls = localStorage.getItem("videoUrls");
  
      if (storedVideos && storedVideoUrls) {
        const parsedVideos = JSON.parse(storedVideos);
        const parsedVideoUrls = JSON.parse(storedVideoUrls);
        parsedVideos.map((video: string) => dispatch(addVideosAsync(video))); // Update with your action logic
        parsedVideoUrls.map((url: string) => dispatch(addUrl(url)));
      }
    }, [])

    useEffect(() => {
      localStorage.setItem("videos", JSON.stringify(videos));
      localStorage.setItem("videoUrls", JSON.stringify(videoUrls));
    }, [videos, videoUrls])


  return (
    <div className='videosHolder'>
      <div className='videoAdder'>

        <div className='inputHolder'>
          <input value={url} type="text" placeholder='Paste Youtube link here' className='addToQueueInput' onChange={handleInputChange}/>
          {isValid === false && url.length>0 ? <p className='invalidText'>Invalid Youtube Link</p> : null}
        </div>
        
        <button className='addToQueueBtn' onClick={handleAddToQueue}>Add to Queue</button>
        <button onClick={() => dispatch(clearQueue())} className='clearQueueBtn'>Clear Queue</button>

        
      </div>
      
      <div className={`${theme === "dark"? "darkVideosListContainer": ""} videosListContainer`}> 
        {videos.length > 0? 
        videos.map((video, index) => (
          <div key={video.snippet.title + index} className={`${theme === "dark"? "darkIndividiualVideosContainer" : ""} individualVideoContainer`} >
            <div className='thumbnailAndTitleContainer' 
            onClick={() => dispatch(setCurrentVideo(videoUrls[index]))} 
            onMouseEnter={() => setThumbnailHoveredIndex(index)}
            onMouseLeave={() => setThumbnailHoveredIndex(null)}>
              <div className="thumbnailContainer">
                <img src={playIcon} alt="play" className={`playIcon ${thumbnailHoveredIndex === index ? "showPlayIcon" : ""}`}/>
                <img src={video.snippet.thumbnails.high.url} alt="thumbnail" className="thumbnail" /> 
              </div>
              
              
              <p className={`videoTitle ${theme === "dark"? "darkModeVideoTitle" : ""}`}>{
                video.snippet.title}
              </p>

            </div>
            
            <div className={`deleteBtnContainer ${theme === "dark"? "darkModeDeleteBtnContainer" : ""}`} onClick={() => dispatch(deleteVideos(index))} >
              <img src={theme === "dark"? darkModeDeleteIcon : lightModeDeleteIcon} alt="delete" className='deleteIcon' />
            </div>
          </div>
        ))
        :
        <p className='queueListText'>Queue List</p>
      
        }

        
      </div>

    </div>
  )
}

export default VideosHolder