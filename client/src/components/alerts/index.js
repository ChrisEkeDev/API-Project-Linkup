import React from 'react'
import './styles.scss';
import AlertItem from './components/AlertItem';
import { AnimatePresence } from 'framer-motion';

function Alerts(props) {
    const { removeAlerts, alerts } = props;
    return (
        <div className='alerts'>
            <AnimatePresence>
            {
                alerts.map(alert => (
                    <AlertItem
                        key={alert.id}
                        alert={alert}
                        removeAlerts={removeAlerts}
                    />
                ))
            }
            </AnimatePresence>
        </div>
    )
}

export default Alerts
