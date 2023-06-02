import React from 'react';
import logo from '../../assets/linkup-logo.svg';
import './Loading.css';

function Loading() {
  return (
    <div className='loading-wrapper'>
      <img className='loading-logo' src={logo}/>
    </div>
  )
}

export default Loading
