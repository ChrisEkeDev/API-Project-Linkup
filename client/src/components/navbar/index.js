import React from 'react'
import { NavLink } from 'react-router-dom';
import './styles.scss';
import * as ROUTES from '../../constants/routes';
import SignOutModal from './components/SignOutModal';
import IconButton from '../shared/button/IconButton'
import ProfileImage from '../shared/profileImage';
import { useApp } from '../../context/AppContext';
import useAuth from '../../views/auth/hooks/useAuth';
import { RiBasketballFill } from "react-icons/ri";
import Modal from '../shared/modal'
import useModal from '../../hooks/useModal'
import { TbSearch,TbUsersGroup , TbSettings, TbCalendarDue, TbBallBasketball, TbLogin2, TbLogout   } from "react-icons/tb";

function NavBar() {
    const { onSignOut } = useAuth()
    const { onOpenModal, onCloseModal, isModalOpen } = useModal();
    const { auth, navigate } = useApp();

    return (
        <>
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
                            <NavLink to={ROUTES.SETTINGS} className="nav_link" activeClassName="active_link">
                                <TbSettings className='nav_icon'/>
                            </NavLink>
                        </div>
                        <div title="Sign Out" className='app_link'>
                            <div onClick={onOpenModal} className="nav_link" activeClassName="active_link">
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
        <Modal
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
        >
            <SignOutModal
                signOut={onSignOut}
                close={onCloseModal}
            />
        </Modal>
        </>
    )
}

export default NavBar
