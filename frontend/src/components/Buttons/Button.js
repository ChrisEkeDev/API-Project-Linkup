import React from 'react';
import './Button.css';

function Button({type, label, icon, style, action, disabled}) {
  return (
    <button onClick={action} className={`btn ${type} ${style} ${disabled ? 'btn-disabled' : ''}`} disabled={disabled}>
        <span>{type === 'icon' ? icon : label}</span>
    </button>
  )
}

export default Button
