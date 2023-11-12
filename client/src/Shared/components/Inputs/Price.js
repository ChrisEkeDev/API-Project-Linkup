import React from 'react';
import { useState, useEffect } from 'react';
import './Inputs.css';
import { FaRegTimesCircle, FaDollarSign } from 'react-icons/fa';


function Price({name, label, placeholder, error, value, setValue, disabled}) {

  return (
    <label htmlFor={name} className={`price_input-wrapper ${label ? 'input-with-label' : 'input-without-label'}`}>
        <FaDollarSign className='price_input-icon'/>
        <input
          id={name}
          name={name}
          defaultValue={value}
          onChange={setValue}
          className={`input price_input pad-left`}
          placeholder={placeholder}
          style={error ? {border: '1px solid #ff1313'} : null}
          disabled={disabled}
        />
        {label ? <span className='body input-label'>{label}</span> : null}
        {error &&
          <div className='input-error'>
            <FaRegTimesCircle className='input-error__icon'/>
            <small className='input-error__label'>{error}</small>
          </div>
        }
    </label>
  )
}

export default Price
