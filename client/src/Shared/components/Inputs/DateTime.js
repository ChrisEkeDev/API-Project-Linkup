import React from 'react'
import { FaCalendarAlt, FaRegTimesCircle } from 'react-icons/fa';
import './Inputs.css'

function DateTime({name, label, placeholder, error, timeValue, setTimeValue, dateValue, setDateValue, disabled}) {

  return (
    <label htmlFor={name} className={`date_time-input-wrapper`}>
        <div className='date_time-wrapper'>
            <input
                id={name}
                name={name}
                defaultValue={dateValue}
                onChange={setDateValue}
                type='date'
                className='input date_input'
                placeholder={placeholder}
                style={error ? {border: '1px solid #ff1313'} : null}
                disabled={disabled}
            />
            <input
                id={name}
                name={name}
                defaultValue={timeValue}
                onChange={setTimeValue}
                type='time'
                className='input time_input'
                style={error ? {border: '1px solid #ff1313'} : null}
                disabled={disabled}
            />
        </div>
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

export default DateTime
