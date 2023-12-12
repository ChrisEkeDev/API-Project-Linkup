import React, { useState } from 'react';
import OutsideClicker from '../Shared/hooks/useOutsideClick';
import ProfilePicture from './ProfilePicture';

function Menu({children}) {
    const [menu, setMenu] = useState(false);
    return (
        <div className='navigation_menu_wrapper'>
            <div onClick={() => setMenu(true)} className='navigation_menu_menu'>
                <ProfilePicture menu={menu} />
            </div>
            {menu ?
                <OutsideClicker cb={() => setMenu(false)}>
                {children}
                </OutsideClicker>
                :
                null
            }
        </div>
  )
}

export default Menu
