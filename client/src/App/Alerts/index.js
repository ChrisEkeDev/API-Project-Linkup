import React from 'react';
import AlertItem from './AlertItem';
import './Styles.scss';

function Alerts({removeAlerts, alerts}) {
  const alertsArray = Object.values(alerts);
  return (
    <div className='alerts-wrapper'>
        <div className='alerts-contents'>
        {alertsArray?.map((alert) => {
            return (
                <AlertItem key={alert.id} removeAlerts={removeAlerts} alert={alert}/>
            )
        })}
        </div>
    </div>
  )
}

export default Alerts
