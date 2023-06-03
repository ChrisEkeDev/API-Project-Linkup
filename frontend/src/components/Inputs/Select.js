import React from 'react'
import './Inputs.css';
import { FaRegTimesCircle } from 'react-icons/fa';

function Select({name, label, placeholder, error, value, setValue, disabled, values}) {
  return (
    <label style={error ? {border: '1px solid #ff1313'} : null} htmlFor={name} className={`select-wrapper ${label ? 'input-with-label' : 'select-without-label'}`}>
    <div className='select_box-wrapper'>
        <select
            id={name}
            name={name}
            defaultValue={value}
            onChange={setValue}
            disabled={disabled}
            className='select'
        >
            <option disabled className='default-value' value='none'>{placeholder}</option>
            {values.map(value => {
                return (
                    <option value={value}>{value}</option>
                )
            })}
        </select>
    </div>
    {label ? <span className='body input-label'>{label}</span> : null}
    {/* <FaAngleDown className='select-arrow'/> */}
    {error &&
          <div className='input-error'>
            <FaRegTimesCircle className='input-error__icon'/>
            <small className='input-error__label'>{error}</small>
          </div>
        }
    </label>
  )
}

export default Select
