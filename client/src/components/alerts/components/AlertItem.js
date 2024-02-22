import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../../context/AppContext';
import { slide_small_variants, base_animations } from '../../../constants/animations'
import '../styles.scss';
import { TbAlertCircleFilled, TbCircleCheckFilled } from 'react-icons/tb'

function AlertItem(props) {
    const { removeAlerts, alert } = props;
    const { theme } = useApp()
    const isError = alert.status >= 400;

    // useEffect(() => {
    //     setTimeout(() => removeAlerts(alert), 5000)
    // }, [alert]);

    return (
        <motion.div
            variants={slide_small_variants} {...base_animations}
            className={`alert_item alert_item-${theme} ${isError ? 'alert-fail' : 'alert-success'}`}
            onClick={() => removeAlerts(alert)}
        >
            {
                isError ?
                <TbAlertCircleFilled className='icon'/> :
                <TbCircleCheckFilled className='icon'/>
            }
            <span className='sm bold'>{alert.message}</span>
        </motion.div>
    )
}

export default AlertItem
