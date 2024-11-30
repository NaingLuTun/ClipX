
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { setCurrentVideo } from '../state/videoSlice/videoSlice'




const MainVideo = () => {
  const currentVideo = useSelector((state: RootState) => state.videoReducer.currentVideo)
  const videosUrl = useSelector((state: RootState) => state.videoReducer.videosUrl)

  const theme = useSelector((state: RootState) => state.themeReducer.mode)

  const dispatch = useDispatch<AppDispatch>()

  const handleVideoEnd = () => {
    if (currentVideo && videosUrl.length > 0) {
      const currentIndex = videosUrl.indexOf(currentVideo)
      const nextIndex = currentIndex + 1 
      if (nextIndex < videosUrl.length) {
        dispatch(setCurrentVideo(videosUrl[nextIndex]))
      } else {
        dispatch(setCurrentVideo(videosUrl[0]))
      }
    }
  }

  return (
    <div className={`${theme === "dark"? "darkMainVideoContainer" : ""} mainVideoContainer` }>
        {currentVideo ?   
          <ReactPlayer 
          url={currentVideo}
          controls
          playing={videosUrl.indexOf(currentVideo) === 0 || videosUrl.indexOf(currentVideo) === -1? false : true}
          width="100%"
          height="100%"
          onEnded={handleVideoEnd}
          
        />
        : <p className='addVideosText'>Add Videos to Queue</p>}
        
    </div>
  )
}

export default MainVideo