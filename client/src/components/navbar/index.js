import React from 'react'
import './styles.scss';
import NavMenu from './components/NavMenu';
import NavSearch from './components/NavSearch';

function NavigationBar() {
  return (
    <nav className='nav'>
        <NavSearch/>
        <NavMenu/>
    </nav>
  )
}

export default NavigationBar
