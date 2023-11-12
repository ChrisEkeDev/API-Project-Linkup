import './Styles.scss';
import { useApp } from '../App/Context/AppContext';
import ProfilePicture from './ProfilePicture';
import Search from '../Search';
import ThemeHandler from './ThemeHandler';
import LocationServicesHandler from './LocationServicesHandler';
import Menu from './MenuModal';
import MainMenu from './MainMenu';


function Navigation() {
  const { theme } = useApp();

  return (
    <nav className={`navigation_wrapper ${theme}-theme`}>
      <div className='navigation_contents'>
        <Search/>
        <div className='navigation_section'>
          <LocationServicesHandler/>
          <ThemeHandler/>
          <Menu>
            <MainMenu/>
          </Menu>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
