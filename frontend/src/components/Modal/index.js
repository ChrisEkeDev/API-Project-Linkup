import React from 'react';
import './Modal.css';

function Modal(props) {
    const { children } = props;
  return (
    <div id='modal-wrapper'>
        {children}
    </div>
  )
}

export default Modal
