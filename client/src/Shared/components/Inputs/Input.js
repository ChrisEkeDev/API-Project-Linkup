import React from 'react';
import { useState, useEffect } from 'react';
import './Styles.scss';
import { FaRegTimesCircle, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


function Inputs({name, label, placeholder, iconRight, iconLeft, type, error,  errorColor, value, setValue, disabled}) {
  const [passwordHidden, setPasswordHidden] = useState(true);

  const errColor = errorColor || '#fa4c4c';

  return (
    <label
      htmlFor={name}
      className={`input-wrapper`}>
        {iconLeft}
        <input
          id={name}
          name={name}
          defaultValue={value}
          onChange={setValue}
          type={type === 'password' ? passwordHidden ? 'password' : 'text' : type}
          className={`input ${iconLeft ? 'pad-left' : ''}`}
          placeholder={placeholder}
          style={error ? {border: `1px solid ${errColor}`} : null}
          disabled={disabled}
        />
        {label ? <span className='input-label'>{label}</span> : null}
        {
          type === 'password' ?
          passwordHidden ?
          <FaRegEyeSlash onClick={disabled ? null : () => setPasswordHidden(false)} className='password-icon'/> :
          <FaRegEye onClick={disabled ? null : () => setPasswordHidden(true)} className='password-icon'/> :
          null
        }

        {error &&
          <div className='input_error'>
            <FaRegTimesCircle className='input_error__icon'/>
            <small className='input_error__label'>{error}</small>
          </div>
        }


        {iconRight}
    </label>
  )
}

export default Inputs
