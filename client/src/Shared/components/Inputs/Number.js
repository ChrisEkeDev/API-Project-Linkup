import React from 'react'
import './Inputs.css';
import { FaRegTimesCircle } from 'react-icons/fa';

function Number({name, label, placeholder, error, value, setValue, disabled}) {
  return (
    <label htmlFor={name} className={`number_input-wrapper ${label ? 'input-with-label' : 'input-without-label'}`}>
        <input
            id={name}
            name={name}
            defaultValue={value}
            onChange={setValue}
            type='number'
            min={0}
            className='input number_input'
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

export default Number
