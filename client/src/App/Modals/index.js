import React from 'react';
import './Styles.scss';
import Button from '../../Shared/components/Button';

function Modal(props) {
  const { title, message, icon, confirm, decline } = props;

  return (
    <div className='modal_wrapper'>
      <div className='modal_container'>
        <div className={`modal_contents`}>
          <div className='modal_image'>
              {icon}
          </div>
          <h2 className='modal_title'>{title}</h2>
          <p className='modal_body'>{message}</p>
          <div className='modal_actions'>
              <Button
                  action={confirm}
                  label="Confirm"
                  type="primary modal_button"
              />
              <Button
                  action={decline}
                  label="Decline"
                  // style="modal_button"
                  type="secondary modal_button"
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
