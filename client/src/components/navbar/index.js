import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles.scss';
import * as ROUTES from '../../constants/routes';
import { PiGearBold, PiCalendarFill, PiMagnifyingGlassBold, PiUserCircleFill, PiUsersFill, PiBasketballFill } from 'react-icons/pi';
import ProfileImage from '../shared/profileImage';
import { useApp } from '../../context/AppContext';
import { TbSearch,TbUsersGroup , TbSettings, TbCalendarDue, TbBallBasketball   } from "react-icons/tb";

function NavBar() {
    const { auth } = useApp();
    return (
        <nav>
            <ul className='app_nav'>
                <li title="Search" className='app_link'>
                    <NavLink to={ROUTES.SEARCH} className="nav_link" activeClassName="active_link">
                        <TbSearch className='nav_icon'/>
                    </NavLink>
                </li>
                <li title="Check Ins" className='app_link'>
                    <NavLink to={ROUTES.CHECKINS} className="nav_link" activeClassName="active_link">
                        <TbCalendarDue className='nav_icon' />
                    </NavLink>
                </li>
                <li title="My Sessions" className='app_link'>
                    <NavLink to={ROUTES.SESSIONS} className="nav_link" activeClassName="active_link">
                        <TbBallBasketball  className='nav_icon' />
                    </NavLink>
                </li>
                <li title="My Teams" className='app_link'>
                    <NavLink to={ROUTES.TEAMS} className="nav_link" activeClassName="active_link">
                        <TbUsersGroup className='nav_icon' />
                    </NavLink>
                </li>
                <li title="My Profile" className='app_link'>
                    <NavLink to={ROUTES.PROFILE} className="nav_link" activeClassName="active_link">
                        <TbSettings className='nav_icon' />
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
