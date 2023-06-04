import React from 'react';
import AlertItem from './AlertItem';
import './Alerts.css';

function Alerts({removeAlerts, alerts}) {
  return (
    <div className='alerts-wrapper'>
        <div className='alerts-contents'>
        {alerts?.map((alert, i) => {
            return (
                <AlertItem key={i} removeAlerts={removeAlerts} alert={alert}/>
            )
        })}
        </div>
    </div>
  )
}

export default Alerts
