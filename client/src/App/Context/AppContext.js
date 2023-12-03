import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from '../Loading';
import Alerts from '../Alerts';
import {v4 as uuidv4} from 'uuid';
import Modal from "../Modals";
import useModal from "../Modals/useModal";
import { appOptions } from "../../Shared/constants/predefinedValues";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
    const [ alerts, setAlerts ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ theme, setTheme ] = useState(appOptions.theme);
    const [ sortBy, setSortBy] = useState(appOptions.sortBy)
    const [ locationServices, setLocationServices ] = useState(false);
    const [ currentLocation, setCurrentLocation ] = useState({})
    const [ map, setMap ] = useState({});
    const [ modalVisible, openModal, closeModal ] = useModal();
    const history = useHistory();
    const navigate = (route) => {
        history.push(route)
    }

    const goBack = () => {
      history.goBack();
    }

    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const center =  { lat: latitude, lng: longitude };
        setCurrentLocation(center)
      })
    }

  const handleAlerts = (alert) => {
    let newState = [ ...alerts ];
    const id = uuidv4();
    if ( alerts.length === 5) {
      newState.shift();
    }
    newState = [...newState, {id, ...alert} ];
    setAlerts(newState);
  }

  const removeAlerts = (id) => {
      let newState = [...alerts];
      newState = newState.filter(alert => alert.id !== id);
      setAlerts(newState)
  }

  const handleLocationServices = () => {
    setLocationServices(!locationServices)
  }

  useEffect(() => {
    getCurrentLocation();
    console.log(appOptions)
  }, [])

    return (
        <AppContext.Provider value={{
          locationServices,
          handleLocationServices,
          setLoading,
          handleAlerts,
          navigate,
          goBack,
          theme,
          sortBy,
          setSortBy,
          setTheme
          }}
          >
            {loading ? <Loading/> : null}
            {
              Object.keys(alerts).length > 0
              ?
              <Alerts
                  removeAlerts={removeAlerts}
                  alerts={alerts}
              />
              :
              null
            }
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
