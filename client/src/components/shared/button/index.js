import React from 'react';
import './styles.scss';
import { TbArrowRight } from "react-icons/tb";
import { useApp } from '../../../context/AppContext';

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
  const { theme } = useApp();

  return (
      <button
        onClick={action}
        className={`button ${type} ${styles}-${theme} ${disabled ? 'button--disabled' : ''}`} disabled={disabled}>
          <span className={`button--contents ${!Icon && 'centered'}`}>
            { Icon && <Icon className={`button--icon ${loading ? 'button--loading' : ''}`}/> }
            <span>{label}</span>
          </span>
          <TbArrowRight className="arrow"/>
      </button>
  )
}

export default Button
