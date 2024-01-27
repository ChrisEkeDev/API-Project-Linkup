import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles.scss';
import * as ROUTES from '../../constants/routes';
import IconButton from '../shared/button/IconButton'
import ProfileImage from '../shared/profileImage';
import { useApp } from '../../context/AppContext';
import { RiBasketballFill } from "react-icons/ri";
import { TbSearch,TbUsersGroup , TbSettings, TbCalendarDue, TbBallBasketball, TbLogin2, TbLogout   } from "react-icons/tb";
import { signOut } from '../../store/auth';
import { useQuery, useMutation, useQueryClient } from 'react-query';

function NavBar() {
    const client = useQueryClient();
    const { auth, navigate } = useApp();

    const handleSuccess = (data) => {
        client.setQueryData(['auth'], data)
        client.invalidateQueries(['auth'], { exact: true })
        navigate('/sign-in')
    }

    const handleErrors = () => {
        // handleAlerts
    }

    const {
        mutate: handleSignOut,
        isLoading: signOutLoading
    } = useMutation({
        mutationFn: signOut,
        onError: handleErrors,
        onSuccess: handleSuccess,
    })

    return (
        <nav>
            <div className='app_nav'>
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
                        <div title="My Profile" className='app_link'>
                            <NavLink to={ROUTES.PROFILE} className="nav_link" activeClassName="active_link">
                                <ProfileImage
                                    player={auth}
                                    size={3}
                                />
                            </NavLink>
                        </div>
                        <div title="My Settings" className='app_link'>
                            <NavLink to={ROUTES.PROFILE} className="nav_link" activeClassName="active_link">
                                <TbSettings className='nav_icon'/>
                            </NavLink>
                        </div>
                        <div title="Sign Out" className='app_link'>
                            <div onClick={handleSignOut} className="nav_link" activeClassName="active_link">
                                <TbLogout className='nav_icon'/>
                            </div>
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
            </div>
        </nav>
    )
}

export default NavBar
