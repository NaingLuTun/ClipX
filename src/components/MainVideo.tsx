
import ReactPlayer from 'react-player'

const MainVideo = () => {
  return (
    <div className="mainVideoContainer">
        <ReactPlayer 
          url="https://www.youtube.com/watch?v=NFEwN1N3vvA"
          controls
          width="100%"
          height="100%"
        />
    </div>
  )
}

export default MainVideo