import React from 'react'
import { useEffect } from "react";
import { useApp } from '../Context/AppContext';
import './Styles.scss';
import { TbX, TbCircleX, TbAlertCircle, TbCircleCheck } from 'react-icons/tb';


function AlertItem({removeAlerts, alert}) {
  const { theme } = useApp();
  const icons = {
    "success": <TbCircleCheck />,
    "warning": <TbAlertCircle />,
    "fail": <TbCircleX />
  }

  // useEffect(() => {
  //     setTimeout(() => removeAlerts(alert.id), 5000)
  // }, [alert]);

  return (
    <div className={`alert-wrapper ${theme}-theme`}  onClick={() => removeAlerts(alert.id)}>
      <div className='alert-contents'>
        <span className={`alert-icon alert_icon--${alert.status}`}>
          {icons[alert.status]}
        </span>
        <span className='alert-message'>
        <p>{alert.message}</p>
        </span>
        <span className='alert-dismiss'>
          <TbX/>
        </span>
      </div>
    </div>
  )
}

export default AlertItem
