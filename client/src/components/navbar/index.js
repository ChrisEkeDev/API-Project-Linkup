import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles.scss';
import * as ROUTES from '../../constants/routes';
import { PiGearBold, PiCalendarBold, PiMagnifyingGlassBold, PiUserCircleBold } from 'react-icons/pi';
import ProfileImage from '../shared/profileImage';
import { useApp } from '../../context/AppContext';

function NavBar() {
    const { auth } = useApp();
    return (
        <nav>
            <ul className='app_nav'>
                <li title="Search Sessions" className='app_link'>
                    <NavLink to={ROUTES.SESSIONS} className="nav_link" activeClassName="active_link">
                        <PiMagnifyingGlassBold className='nav_icon'/>
                    </NavLink>
                </li>
                <li title="Check Ins" className='app_link'>
                    <NavLink to={ROUTES.CHECKINS} className="nav_link" activeClassName="active_link">
                        <PiCalendarBold className='nav_icon' />
                    </NavLink>
                </li>
                <li title="My Profile" className='app_link'>
                    <NavLink to={ROUTES.PROFILE} className="nav_link" activeClassName="active_link">
                        <PiUserCircleBold className='nav_icon' />
                        {/* <ProfileImage
                            player={auth}
                            size={2.5}
                        /> */}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
