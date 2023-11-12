import React from 'react';
import './Styles.scss';

function Modal(props) {
  const { children } = props;
  return (
    <div className='modal_wrapper'>
      <div className='modal_container'>{children}</div>
      {/* <div
      onClick={() => handleCloseModal()}
      style={{backgroundColor: "red", color: "white", height: "2rem",aspectRatio: "1"}}>
        X
      </div> */}
    </div>
  )
}

export default Modal
