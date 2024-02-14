import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { slide_small_variants, base_animations } from '../../../constants/animations'
import '../styles.scss';
import { TbAlertCircleFilled, TbCircleCheckFilled } from 'react-icons/tb'

function AlertItem(props) {
    const { removeAlerts, alert } = props;

    // useEffect(() => {
    //     setTimeout(() => removeAlerts(alert), 5000)
    // }, [alert]);

    return (
        <motion.div
            variants={slide_small_variants} {...base_animations}
            className='alert_item'
            onClick={() => removeAlerts(alert)}
        >
            {
                alert.status >= 400 ?
                <TbAlertCircleFilled className='icon'/> :
                <TbCircleCheckFilled className='icon'/>
            }
            <span className='sm bold'>{alert.message}</span>
        </motion.div>
    )
}

export default AlertItem
