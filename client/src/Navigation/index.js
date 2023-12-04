import './Styles.scss';
import { useApp } from '../App/Context/AppContext';
import Search from '../Search';
import ThemeHandler from './ThemeHandler';
import LocationServicesHandler from './LocationServicesHandler';
import Menu from './MenuModal';
import MainMenu from './MainMenu';


function Navigation() {
  const { theme } = useApp();

  return (
    <nav className={`navigation_wrapper ${theme}-theme`}>
        <Search/>
        <div className='navigation_section'>
          {/* <LocationServicesHandler/>
          <ThemeHandler/> */}
          <Menu>
            <MainMenu/>
          </Menu>
        </div>
    </nav>
  )
}

export default Navigation
