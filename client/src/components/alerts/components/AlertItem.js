import React, { useEffect } from 'react';
import '../styles.scss';
import { TbAlertCircleFilled, TbCircleCheckFilled } from 'react-icons/tb'

function AlertItem(props) {
    const { removeAlerts, alert } = props;

    // useEffect(() => {
    //     setTimeout(() => removeAlerts(alert.id), 5000)
    // }, [alert, removeAlerts]);

    return (
        <div
            className='alert_item'
            onClick={() => removeAlerts(alert.id)}
        >
            {
                alert.status === "fail" ?
                <TbAlertCircleFilled className='icon'/> :
                <TbCircleCheckFilled className='icon'/>
            }
            <span className='sm bold'>{alert.message}</span>
        </div>
    )
}

export default AlertItem
