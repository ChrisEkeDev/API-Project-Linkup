import React from 'react';
import './Styles.scss';

function Button({type, label, icon: Icon, styles, action, disabled}) {
  return (
    <div className='button--wrapper'>
      <button
        onClick={action}
        className={`button ${type} ${styles} ${disabled ? 'button--disabled' : ''}`} disabled={disabled}>
          <span className='button--contents'>
            <span>{label}</span>
            { Icon && <Icon className='button--icon'/> }
          </span>
      </button>
    </div>
  )
}

export default Button
