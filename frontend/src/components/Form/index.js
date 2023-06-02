import React from 'react';
import './Form.css';
import { FaTimes } from 'react-icons/fa';

function Form(props) {
    const { children } = props;
  return (
    <div id='form-wrapper'>
        {children}
    </div>
  )
}

export default Form
