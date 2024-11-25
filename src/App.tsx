

import './styles/App.css'

import Header from './components/Header'
import { useSelector } from 'react-redux'
import { RootState } from './state/store'
import ReactPlayer from 'react-player'


/* api key = AIzaSyB9flZMBsVPHLswQrWQmbrUnP6ya15HyWA */

function App() {
  const theme = useSelector((state: RootState) => state.themeReducer.mode)


  return (
    <>
      <Header />

      <div className={`body ${theme === "dark" ? "darkThemeBody":""}`}>
        <div className="videoContainer">
          <ReactPlayer 
          url="https://www.youtube.com/watch?v=1-ucEQ5sa1Q"
          controls
          width="100%"
          height="100%"
          />
        </div>
      </div>
    </>
  )
}

export default App
