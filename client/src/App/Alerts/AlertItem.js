import React from 'react'
import { useEffect } from "react";
import './Styles.scss';
import { TbX, TbExclamationMark, TbCheck } from 'react-icons/tb';


function AlertItem({removeAlerts, alert}) {

useEffect(() => {
    setTimeout(() => removeAlerts(alert.id), 5000)
}, [alert]);

  return (
    <div className='alert-wrapper'>
      <div className='alert-contents'>
        <span className={`alert-status alert-status--${alert.status}`}>
          {alert.status === 'fail'
            ? <TbExclamationMark/>
            : <TbCheck/>
          }
        </span>
        <div className='alert-message'>
          <h5>{alert.title}</h5>
          <p>{alert.message}</p>
        </div>
        <span className='alert-dismiss' onClick={() => removeAlerts(alert.id)}>
          <small>Click to Dismiss</small>
        </span>
      </div>
    </div>
  )
}

export default AlertItem
