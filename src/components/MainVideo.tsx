
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { setCurrentVideo } from '../state/videoSlice/videoSlice'




const MainVideo = () => {
  const currentVideo = useSelector((state: RootState) => state.videoReducer.currentVideo)
  const videosUrl = useSelector((state: RootState) => state.videoReducer.videosUrl)

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
    <div className="mainVideoContainer">
        {currentVideo ? 
          <ReactPlayer 
          url={currentVideo}
          controls
          playing={videosUrl.indexOf(currentVideo) === 0? false : true}
          width="100%"
          height="100%"
          onEnded={handleVideoEnd}
          
        />
        : <div>Add videos</div>}
        
    </div>
  )
}

export default MainVideo