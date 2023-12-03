import React from 'react'
import {TbAlertCircle } from 'react-icons/tb'
import './Styles.scss'

function DateTime({name, label, error, value, setValue, disabled}) {

  return (
    <label htmlFor={name} className={`date_time-input-wrapper date_input`}>
        <input
            id={name}
            name={name}
            defaultValue={value}
            onChange={setValue}
            type='date'
            className='input'
            style={error ? {border: '1px solid #ff1313'} : null}
            disabled={disabled}
        />
        {label ? <span className='input-label'>{label}</span> : null}
        {error &&
          <div className='input_error'>
            <TbAlertCircle className='input_error__icon'/>
            <small className='input_error__label'>{error}</small>
          </div>
        }
    </label>
  )
}

export default DateTime
