import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkLogOut } from '../../store/session';
import Button from '../Buttons/Button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

function NavigationMenu({user}) {
    const [menu, setMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const submitLogOut = (e) => {
        e.preventDefault();
        return (
            dispatch(thunkLogOut())
            .then(() => {
                setMenu(false);
                history.push('/')
            })
        )
    }


  return (
    <div className='navigation_menu-wrapper'>
        <div className='user-image'></div>
        {menu ?
            <FaChevronUp
                onClick={() => setMenu(false)}
                className='menu-icon'
            /> :
            <FaChevronDown
                onClick={() => setMenu(true)}
                className='menu-icon'
            />
        }
        {menu ?
            <section className='navigation_menu-contents'>
                <div>
                    <p className='body'>Hello, {user?.firstName}</p>
                    <p className='body'>{user?.email}</p>
                </div>
                <Button
                    type='secondary'
                    label='Log out'
                    action={(e) => submitLogOut(e)}
                />
            </section> :
            null
        }

    </div>
  )
}

export default NavigationMenu
