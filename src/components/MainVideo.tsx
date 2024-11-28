
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'



const MainVideo = () => {
  const currentVideo = useSelector((state: RootState) => state.videoReducer.currentVideo)
  return (
    <div className="mainVideoContainer">
        {currentVideo ? 
          <ReactPlayer 
          url={currentVideo}
          controls
          width="100%"
          height="100%"
        />
        : <div>Add videos</div>}
        
    </div>
  )
}

export default MainVideo