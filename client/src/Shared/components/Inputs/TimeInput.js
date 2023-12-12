import React from 'react'
import { TbAlertCircle, TbClock } from 'react-icons/tb';
import { globalStyles } from '../../../constants/styles';
import './styles.scss'

function TimeInput({name, label, error, value, setValue, disabled}) {
  const { errorBorder } = globalStyles;

  return (
    <label htmlFor={name} className={`date_time-input-wrapper time_input`}>
        <TbClock className='icon'/>
        <input
            id={name}
            name={name}
            defaultValue={value}
            onChange={setValue}
            type='time'
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

export default TimeInput
