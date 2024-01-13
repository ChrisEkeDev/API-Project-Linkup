import React from 'react';
import './styles.scss';

function Button(props) {
  const {
    type,
    label,
    icon: Icon,
    styles,
    action,
    disabled,
    loading
  } = props;
  return (
    <div className='button--wrapper'>
      <button
        onClick={action}
        className={`button ${type} ${styles} ${disabled ? 'button--disabled' : ''}`} disabled={disabled}>
          <span className={`button--contents ${!Icon && 'centered'}`}>
            { Icon && <Icon className={`button--icon ${loading ? 'button--loading' : ''}`}/> }
            <span>{label}</span>
          </span>
      </button>
    </div>
  )
}

export default Button
