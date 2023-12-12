import React from 'react'
import NavPlayer from './NavPlayer'
import { Link } from 'react-router-dom'
import { navMenuLinks } from '../../../constants/constants';
import useNavMenu from '../hooks/useNavMenu';
import { useApp } from '../../../context/AppContext';
import { PLAYER_AUTHORIZED, PLAYER_NOT_AUTHORIZED } from '../../../constants/constants';
import { TbLogout } from 'react-icons/tb';

const NavLink = (props) => {
    const { link } = props;

    return (
        <li key={link.path}>
            <Link className='nav-link' to={link.path}>
                <span className='label'>{link.name}</span>
                <span className='icon'>{link.icon}</span>
            </Link>
        </li>

    )
}

function NavMenu() {
    const { auth } = useApp();
    const showLinks = auth ? PLAYER_AUTHORIZED : PLAYER_NOT_AUTHORIZED;
    const {
        menuRef,
        menuOpen,
        onMenuOpen,
        onMenuClose,
        signOut,
    } = useNavMenu();

    return (
        <div
            className='nav-menu'
            ref={menuRef}
        >
            <NavPlayer
                menuOpen={menuOpen}
                toggleMenu={menuOpen ? onMenuClose : onMenuOpen}
            />
            {
                menuOpen ?
                <ul className='nav-links'>
                    {
                        Object.values(navMenuLinks[showLinks]).map(link => (
                            <NavLink link={link} />
                        ))
                    }
                    {
                        auth ?
                        <li onClick={signOut} key={`/sign-out`}>
                            <div className='nav-link'>
                                <span className='label'>Sign Out</span>
                                <span className='icon'>
                                    <TbLogout/>
                                </span>
                            </div>
                        </li> :
                        null
                    }
                </ul>
                :
                null
            }
        </div>
    )
}

export default NavMenu
