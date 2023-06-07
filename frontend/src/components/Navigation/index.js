import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/linkup-logo.svg';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavigationMenu from '../NavigationMenu';
import './Navigation.css';


function Navigation({setAuthForm}) {
    const user = useSelector(state => state.session.user)
    const history = useHistory();

    const navigate = (route) => {
        history.push(route)
    }

  return (
    <>
    <nav id='nav-wrapper'>
        <div className='nav-contents'>
            <div onClick={() => navigate('/')} className='logo-wrapper'>
              <img className='logo' src={logo}/>
              <h1 className='logo-text'>linkup</h1>
            </div>
            {user ?
            <div className='nav_user-contents'>
                <Link className='new_group-link' to='/create-group'>Start a new group</Link>
                <NavigationMenu user={user} />
            </div>
             :
            <div className='actions'>
                <span onClick={() => setAuthForm('login')} className='link'>Log in</span>
                <span onClick={() => setAuthForm('signup')} className='link'>Sign up</span>
            </div>
            }

        </div>
    </nav>
    </>
  )
}

export default Navigation
