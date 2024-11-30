
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { setCurrentVideo } from '../state/videoSlice/videoSlice'




const MainVideo = () => {
  const currentVideo = useSelector((state: RootState) => state.videoReducer.currentVideo)
  const videoUrls = useSelector((state: RootState) => state.videoReducer.videoUrls)

  const theme = useSelector((state: RootState) => state.themeReducer.mode)

  const dispatch = useDispatch<AppDispatch>()

  const handleVideoEnd = () => {
    if (currentVideo && videoUrls.length > 0) {
      const currentIndex = videoUrls.indexOf(currentVideo)
      const nextIndex = currentIndex + 1 
      if (nextIndex < videoUrls.length) {
        dispatch(setCurrentVideo(videoUrls[nextIndex]))
      } else {
        dispatch(setCurrentVideo(videoUrls[0]))
      }
    }
  }

  return (
    <div className={`${theme === "dark"? "darkMainVideoContainer" : ""} mainVideoContainer` }>
        {currentVideo ?   
          <ReactPlayer 
          url={currentVideo}
          controls
          playing={videoUrls.indexOf(currentVideo) === 0 || videoUrls.indexOf(currentVideo) === -1? false : true}
          width="100%"
          height="100%"
          onEnded={handleVideoEnd}
          
        />
        : <p className='addVideosText'>Add Videos to Queue</p>}
        
    </div>
  )
}

export default MainVideo