import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkLogOut } from '../../store/session';
import { useAlerts } from '../../context/AlertsProvider';
import Button from '../Buttons/Button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

function NavigationMenu({user}) {
    const [menu, setMenu] = useState(false);
    const dispatch = useDispatch();
    const { handleAlerts } = useAlerts();
    const history = useHistory();

    const navigate = (route) => {
        history.push(route)
    }

    const submitLogOut = async (e) => {
        e.preventDefault();
        navigate('/')
        return (
            dispatch(thunkLogOut())
            .then((alert) => {
                setMenu(false);
                handleAlerts(alert);
            })
            .catch((alert) => {
                handleAlerts(alert);
            })
        )
    }


  return (
    <div className='navigation_menu-wrapper'>
        <div onClick={() => navigate('/dashboard')} className='user-image bg-image' style={{backgroundImage: `url(${user?.profileImage})` }}>
            {user.profileImage ? null :
            `${user?.firstName.charAt(0)}
            ${user?.lastName.charAt(0)}`}
        </div>
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
                    style='small-btn'
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
