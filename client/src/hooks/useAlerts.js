import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';

function useAlerts() {
    const[ alerts, setAlerts] = useState([])

    const handleAlerts = (res) => {
        let newState = [ ...alerts ];
        let id = uuidv4();
        const alert = {
            id,
            status: res.status,
            message: res.status >= 400 ? res.error : res.message
        }
        if (alerts.length === 5) {
            newState.shift();
        }
        newState = [...newState, alert ];
        setAlerts(newState);
    }

    const removeAlerts = (alert) => {
        let newState = [...alerts];
        newState = newState.filter(a => a.id !== alert.id);
        setAlerts(newState)
    }


    return { alerts, handleAlerts, removeAlerts }
}

export default useAlerts
