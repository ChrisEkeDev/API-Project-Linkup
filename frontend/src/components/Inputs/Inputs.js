import React from 'react';
import { useState, useEffect } from 'react';
import './Inputs.css';
import { TbExclamationCircle, TbEye, TbEyeOff } from 'react-icons/tb';


function Inputs({name, label, placeholder, iconRight, iconLeft, type, error, value, setValue, disabled}) {
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <label htmlFor={name} className='input-wrapper'>
        {iconLeft}
        <input
          id={name}
          name={name}
          defaultValue={value}
          onChange={setValue}
          type={type === 'password' ? passwordHidden ? 'password' : 'text' : type}
          className={`input ${iconLeft ? 'pad-left' : ''}`}
          placeholder={placeholder}
          style={error ? {border: '1px solid #ff1313'} : null}
          disabled={disabled}
        />
        {label ? <span className='input-label'>{label}</span> : null}
        {
          type === 'password' ?
          passwordHidden ?
          <TbEyeOff onClick={disabled ? null : () => setPasswordHidden(false)} className='password-icon'/> :
          <TbEye onClick={disabled ? null : () => setPasswordHidden(true)} className='password-icon'/> :
          null
        }

        {error &&
          <div className='input-error'>
            <TbExclamationCircle className='input-error__icon'/>
            <small className='input-error__label'>{error}</small>
          </div>
        }


        {iconRight}
    </label>
  )
}

export default Inputs
