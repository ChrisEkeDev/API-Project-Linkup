import React from 'react';
import './Loading.css';
import logo from '../../assets/linkup-logo.svg';

function DataLoading({fixed}) {
  return (
    <div className={`data_loading-container ${fixed ? 'fixed-height' : ''}`}>
        <img className='loading-logo' src={logo}/>
    </div>
  )
}

export default DataLoading
