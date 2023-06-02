import React, { useState, useEffect } from 'react'
import logo from '../../assets/linkup-logo.svg';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavigationMenu from '../NavigationMenu';
import Form from '../Form';
import './Navigation.css';
import Login from '../Login';


function Navigation() {
    const user = useSelector(state => state.session.user)
    const [ auth, setAuth ] = useState('');
    const history = useHistory();

    const navigate = (route) => {
        history.push(route)
    }

    useEffect(() => {
        if (auth) {
        document.body.style.overflow = 'hidden';
        }
        return () => document.body.style.overflow = 'unset';
    }, [auth])

  return (
    <>
    <nav id='nav-wrapper'>
        <div className='nav-contents'>
            <div onClick={() => navigate('/')} className='logo-wrapper'>
              <img className='logo' src={logo}/>
              <h1 className='logo-text'>Linkup</h1>
            </div>
            {user ?
            <NavigationMenu user={user} /> :
            <div className='actions'>
                <span onClick={() => setAuth('login')} className='link'>Log in</span>
                <span onClick={() => setAuth('signin')} className='link'>Sign up</span>
            </div>
            }

        </div>
    </nav>
    {
        auth === 'login' ?
        <Form>
            <Login close={() => setAuth('')}/>
        </Form> :
      null
    }
    </>
  )
}

export default Navigation
