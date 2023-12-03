import React from 'react';
import './Styles.scss';
import logo from '../../App/assets/linkup-logo.svg';

function DataLoading({fixed}) {
  return (
    <div className={`data_loading-container`}>
        <img className='loading-logo' src={logo}/>
    </div>
  )
}

export default DataLoading
