import { useState, createContext, useContext } from 'react';
import Alerts from '../components/Alerts';

const AlertsContext = createContext();

export const useAlerts = () =>  useContext(AlertsContext);

function AlertsProvider({children}) {
    const [alerts, setAlerts] = useState([]);

    const handleAlerts = (alert) => {
        setAlerts([ ...alerts, alert ]);
    }
    const removeAlerts = (selectedAlert) => {
        setAlerts(alerts => alerts.filter(alert => alert.message !== selectedAlert.message))
    }

    return (
        <AlertsContext.Provider value={{handleAlerts}}>
            {alerts.length > 0 ? <Alerts removeAlerts={removeAlerts} alerts={alerts}/> : null}
            {children}
        </AlertsContext.Provider>
    )
}

export default AlertsProvider
