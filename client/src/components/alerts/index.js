import React from 'react'
import './styles.scss';
import AlertItem from './components/AlertItem';
import { AnimatePresence, motion } from 'framer-motion';
import { base_animations, slide_small_variants } from '../../constants/animations';

function Alerts(props) {
    const { removeAlerts, alerts } = props;
    return (
        <motion.div
            variants={slide_small_variants}
            {...base_animations}
            className='alerts'>
            <AnimatePresence >
            {
                alerts.length > 0 &&
                alerts.map(alert => (
                    <AlertItem
                        key={alert.id}
                        alert={alert}
                        removeAlerts={removeAlerts}
                    />
                ))
            }
            </AnimatePresence>
        </motion.div>
    )
}

export default Alerts
