import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';

function useAlerts() {
    const[ alerts, setAlerts] = useState([])

    const handleAlerts = (res) => {
        let newState = [ ...alerts ];
        const alert = {
            id: uuidv4(),
            status: res.status,
            message: res.message
        }
        if (alerts.length === 5) {
            newState.shift();
        }
        newState = [...newState, alert ];
        setAlerts(newState);
    }

    const removeAlerts = (id) => {
        let newState = [...alerts];
        newState = newState.filter(alert => alert.id !== id);
        setAlerts(newState)
    }


    return { alerts, handleAlerts, removeAlerts }
}

export default useAlerts
