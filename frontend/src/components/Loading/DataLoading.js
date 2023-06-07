import React from 'react';
import './Loading.css';
import logo from '../../assets/linkup-logo.svg';

function DataLoading() {
  return (
    <div className='data_loading-container'>
        <img className='loading-logo' src={logo}/>
    </div>
  )
}

export default DataLoading
