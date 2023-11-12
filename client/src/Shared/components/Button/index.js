import React from 'react';
import './Styles.scss';

function Button({type, label, icon: Icon, style, action, disabled}) {
  return (
    <div className='button--wrapper'>
      <button
        onClick={action}
        className={`button ${type} ${style} ${disabled ? 'button--disabled' : ''}`} disabled={disabled}>
          <span className='button--contents'>
            { type === 'icon' && <Icon/> }
            <span>{label}</span>
          </span>
      </button>
    </div>
  )
}

export default Button
