import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles.scss';
import * as ROUTES from '../../constants/routes';
import IconButton from '../shared/button/IconButton'
import ProfileImage from '../shared/profileImage';
import { useApp } from '../../context/AppContext';
import { RiBasketballFill } from "react-icons/ri";
import { TbSearch,TbUsersGroup , TbCalendarDue, TbBallBasketball, TbSun, TbMoon   } from "react-icons/tb";

function NavBar() {
    const { auth, navigate, theme, onToggleTheme } = useApp();

    return (
            <nav className={`app_nav app_nav-${theme}`}>
                <div className='app_nav_top'>
                    <div title="Search" className='app_link'>
                        <NavLink to={ROUTES.SEARCH} className="nav_link" activeClassName="active_link">
                            <TbSearch className='nav_icon'/>
                        </NavLink>
                    </div>
                    {
                        auth ?
                        <>
                        <div title="Check Ins" className='app_link'>
                            <NavLink to={ROUTES.CHECKINS} className="nav_link" activeClassName="active_link">
                                <TbCalendarDue className='nav_icon' />
                            </NavLink>
                        </div>
                        <div title="My Sessions" className='app_link'>
                            <NavLink to={ROUTES.SESSIONS} className="nav_link" activeClassName="active_link">
                                <TbBallBasketball  className='nav_icon' />
                            </NavLink>
                        </div>
                        <div title="My Teams" className='app_link'>
                            <NavLink to={ROUTES.TEAMS} className="nav_link" activeClassName="active_link">
                                <TbUsersGroup className='nav_icon' />
                            </NavLink>
                        </div>
                         </> :
                         null
                    }
                </div>
                <div className='app_nav_bottom'>
                    { auth ?
                        <>
                        <div title='Change Theme' className='app_link'>
                            <div onClick={onToggleTheme} className="nav_link">
                                {
                                    theme === 'light' ?
                                    <TbSun className='nav_icon'/> :
                                    <TbMoon className='nav_icon'/>
                                }
                            </div>
                        </div>
                        <div title="My Profile" className='app_link'>
                            <NavLink to={ROUTES.PROFILE} className="nav_link" activeClassName="active_link">
                                <ProfileImage
                                    player={auth}
                                    size={3}
                                />
                            </NavLink>
                        </div>
                        </> :
                        <IconButton
                            label="Sign In/Sign Up"
                            icon={RiBasketballFill}
                            styles="auth_icon"
                            action={() => navigate('/sign-in')}
                        />
                    }
                </div>
            </nav>
    )
}

export default NavBar
