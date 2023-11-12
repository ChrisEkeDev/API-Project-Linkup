import React, { useState } from 'react';
import { TbMenu, TbX } from 'react-icons/tb';
import OutsideClicker from '../Shared/hooks/useOutsideClick';
import ProfilePicture from './ProfilePicture';

function Menu({children, title}) {
    const [menu, setMenu] = useState(false);
    return (
        <div className='navigation_menu_wrapper'>
            <div onClick={() => setMenu(true)} className='navigation_menu_menu'>
                {/* { menu ? <TbX/> : <TbMenu/> } */}
                <ProfilePicture menu={menu} />
            </div>
            {menu ?
                <OutsideClicker cb={() => setMenu(false)}>
                <small>{title}</small>
                {children}
                </OutsideClicker>
                :
                null
            }
        </div>
  )
}

export default Menu
