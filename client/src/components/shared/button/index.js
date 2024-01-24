import React from 'react';
import './styles.scss';
import { TbArrowRight } from "react-icons/tb";

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
      <button
        onClick={action}
        className={`button ${type} ${styles} ${disabled ? 'button--disabled' : ''}`} disabled={disabled}>
          <span className={`button--contents ${!Icon && 'centered'}`}>
            { Icon && <Icon className={`button--icon ${loading ? 'button--loading' : ''}`}/> }
            <span>{label}</span>
          </span>
          <TbArrowRight className="arrow"/>
      </button>
  )
}

export default Button
