
import lightThemeIcon from "../assets/theme-icons/sun-2-svgrepo-com.svg"
import darkThemeIcon from "../assets/theme-icons/moon-svgrepo-com.svg"

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import { toggleTheme } from '../state/themeSlice/themeSlice'

const Header = () => {

    const theme = useSelector<RootState>((state) => state.themeReducer.mode)
    const dispatch = useDispatch<AppDispatch>()

  return (
    <header className={`${theme === "dark" ? "darkThemeHeader": ""} `}>
        <p>ClipX</p>
        <div onClick={() => dispatch(toggleTheme())} className='themeIconBtn'>
            {theme === "dark" ? <img src={lightThemeIcon} alt="switch to light mode" className="themeIcon" />: <img src={darkThemeIcon} alt="switch to dark mode" className="themeIcon"></img>}
        </div>
    </header>
  )
}

export default Header