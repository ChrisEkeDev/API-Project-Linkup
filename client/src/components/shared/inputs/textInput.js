import React from 'react';
import { useState } from 'react';
import './styles.scss';
import { globalStyles } from '../../../constants/styles';
import { PiWarningCircleBold, PiEyeBold, PiEyeSlashBold  } from 'react-icons/pi'


function Input(props) {
    const [passwordHidden, setPasswordHidden] = useState(true);
    const {
        name,
        label,
        placeholder,
        iconRight,
        iconLeft,
        type,
        error,
        value,
        setValue,
        disabled,
        min,
        max
    } = props;
    const { errorBorder, errorColor } = globalStyles || '1px solid #a02828';

  return (
    <label
        htmlFor={name}
        className='input'>
        {iconLeft}
            <input
                id={name}
                name={name}
                defaultValue={value}
                onChange={setValue}
                min={type === 'number' ? min : null}
                max={type === 'number' ? max : null}
                type={type === 'password' ? passwordHidden ? 'password' : 'text' : type}
                placeholder={placeholder}
                style={error ? {color: errorColor } : null}
                disabled={disabled}
            />
            {label ? <span className='label'>{label}</span> : null}
            {
                type === 'password' ?
                passwordHidden ?
                    <PiEyeSlashBold onClick={disabled ? null : () => setPasswordHidden(false)} className='icon'/> :
                    <PiEyeBold onClick={disabled ? null : () => setPasswordHidden(true)} className='icon'/> :
                null
            }

            {error &&
                <div className='error'>
                    <PiWarningCircleBold className='input_error__icon'/>
                    <span className='input_error__label'>{error}</span>
                </div>
            }
        {iconRight}
    </label>
  )
}

export default Input