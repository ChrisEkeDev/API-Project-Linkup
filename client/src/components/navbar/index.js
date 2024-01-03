import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles.scss';
import * as ROUTES from '../../constants/routes';
import { TbSettings, TbSearch, TbUserCircle, TbLogout  } from 'react-icons/tb';

function NavBar() {
  return (
    <nav>
        <ul className='app_nav'>
            <li title="Search Sessions" className='app_link'>
                <NavLink to={ROUTES.SESSIONS} activeClassName="active_link">
                    <TbSearch />
                </NavLink>
            </li>
            <li title="Settings" className='app_link'>
                <NavLink to={ROUTES.SETTINGS} activeClassName="active_link">
                    <TbSettings />
                </NavLink>
            </li>
            <li title="My Profile" className='app_link'>
                <NavLink to={ROUTES.PROFILE} activeClassName="active_link">
                    <TbUserCircle  />
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar
