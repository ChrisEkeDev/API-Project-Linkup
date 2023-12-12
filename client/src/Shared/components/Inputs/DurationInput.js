import React from 'react'
import './styles.scss';
import { TbAlertCircle } from 'react-icons/tb';
import { globalStyles } from '../../../constants/styles';

function DurationInput({name, label, error, value, setValue, disabled}) {
  const { errorBorder } = globalStyles
  return (
    <label htmlFor={name} className={`input-wrapper number_input`}>
        <input
            id={name}
            name={name}
            defaultValue={value}
            onChange={setValue}
            type='number'
            min={1}
            max={6}
            className='input'
            style={error ? {border: errorBorder} : null}
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

export default DurationInput
