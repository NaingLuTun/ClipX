

import './styles/App.css'

import Header from './components/Header'
import { useSelector } from 'react-redux'
import { RootState } from './state/store'
import ReactPlayer from 'react-player'
import MainVideo from './components/MainVideo'
import VideosHolder from './components/VideosHolder'


function App() {
  const theme = useSelector((state: RootState) => state.themeReducer.mode)


  return (
    <div className='mainContainer'>
      <Header />

      <div className={`bodyContainer ${theme === "dark" ? "darkThemeBody":""}`}>
        <MainVideo />
        <VideosHolder />
      </div>
    </div>
  )
}

export default App
