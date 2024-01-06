import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles.scss';
import * as ROUTES from '../../constants/routes';
import { TbSettings, TbSearch, TbPlayBasketball, TbCalendar  } from 'react-icons/tb';
import ProfileImage from '../shared/profileImage';
import { useApp } from '../../context/AppContext';

function NavBar() {
    const { auth } = useApp();
  return (
    <nav>
        <ul className='app_nav'>
            <li title="Search Sessions" className='app_link'>
                <NavLink to={ROUTES.SESSIONS} activeClassName="active_link">
                    <TbSearch className='nav_icon'/>
                </NavLink>
            </li>
            <li title="Check Ins" className='app_link'>
                <NavLink to={ROUTES.CHECKINS} activeClassName="active_link">
                    <TbCalendar className='nav_icon' />
                </NavLink>
            </li>
            <li title="Settings" className='app_link'>
                <NavLink to={ROUTES.SETTINGS} activeClassName="active_link">
                    <TbSettings className='nav_icon' />
                </NavLink>
            </li>
            <li title="My Profile" className='app_link'>
                <NavLink to={ROUTES.PROFILE} activeClassName="active_link">
                    <ProfileImage
                        player={auth}
                        size={2.5}
                    />
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar
