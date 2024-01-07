import React from 'react'
import './styles.scss';
import AlertItem from './components/AlertItem';
import { AnimatePresence } from 'framer-motion';

function Alerts(props) {
    const { removeAlerts, alerts } = props;
    console.log(alerts)

    return (
        <div className='alerts'>
            <AnimatePresence>
            {
                alerts.length > 0 ?
                alerts.map(alert => (
                    <AlertItem
                        key={alert.id}
                        alert={alert}
                        removeAlerts={removeAlerts}
                    />
                )) :
                null
            }
            </AnimatePresence>
        </div>
    )
}

export default Alerts
