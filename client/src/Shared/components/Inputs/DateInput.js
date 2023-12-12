import React from 'react'
import {TbAlertCircle, TbCalendar } from 'react-icons/tb';
import { globalStyles } from '../../../constants/styles';
import './styles.scss'

function DateInput({name, label, error, value, setValue, disabled}) {
  const { errorBorder } = globalStyles;

  return (
    <label htmlFor={name} className={`date_time-input-wrapper date_input`}>
        <TbCalendar className='icon'/>
        <input
            id={name}
            name={name}
            defaultValue={value}
            onChange={setValue}
            type='date'
            className='input'
            style={error ? {outline: errorBorder} : null}
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

export default DateInput
