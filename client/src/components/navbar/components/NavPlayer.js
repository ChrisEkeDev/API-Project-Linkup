import React from 'react'
import { TbMenu, TbX } from 'react-icons/tb';
import { useApp } from '../../../context/AppContext';

function NavPlayer({toggleMenu, menuOpen}) {
    const { auth } = useApp();
    const hasImage = auth?.profileImage !== null;
    const backgroundImage = hasImage ? { backgroundImage: `url(${auth?.profileImage})`} : null;
    const icon = menuOpen ? <TbX className='icon'/> : <TbMenu  className='icon'/>;

    return (
        <div className='nav-player_data'>
            <span>{auth ? auth.name : 'Menu'}</span>
            <div onClick={toggleMenu} className='nav-player'>
                {
                    auth ?
                    <div className='nav-image' style={backgroundImage}>
                        {icon}
                    </div> :
                    <div className='nav-image'>
                        {icon}
                    </div>
                }
            </div>
        </div>
    )
}

export default NavPlayer
