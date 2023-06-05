import React from 'react'
import { useEffect } from "react";
import './Alerts.css';
import { FaTimes, FaExclamation } from 'react-icons/fa';


function AlertItem({removeAlerts, alert}) {

useEffect(() => {
    setTimeout(() => removeAlerts(alert), 5000)
}, [alert]);

  return (
    <div className='alert-wrapper'>
      <div className='alert-label'>
        <FaExclamation className='alert-icon'/>
        <p className='body'>{alert.message}</p>
      </div>
      <FaTimes className='alert-close' onClick={() => removeAlerts(alert)}/>
    </div>
  )
}

export default AlertItem
