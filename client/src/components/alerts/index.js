import React from 'react'
import './styles.scss';
import AlertItem from './components/AlertItem';

function Alerts(props) {
    const { removeAlerts, alerts } = props;

    return (
        <ul className='alerts'>
            {
                alerts.map(alert => (
                    <AlertItem
                        key={alert.id}
                        alert={alert}
                        removeAlerts={removeAlerts}
                    />
                ))
            }
        </ul>
    )
}

export default Alerts
