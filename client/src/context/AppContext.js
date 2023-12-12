import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../App/Loading';
import Alerts from '../App/Alerts';
import {v4 as uuidv4} from 'uuid';
import Modal from "../App/Modals";
import useModal from "../App/Modals/useModal";
import { appOptions } from "../constants/constants";
import useAuth from "../hooks/useAuth";
import useSessions from "../hooks/useSessions";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
    const { auth } = useAuth();
    const { sessions } = useSessions();
    const dispatch = useDispatch();
    // const [ alerts, setAlerts ] = useState([]);
    const [ sortBy, setSortBy] = useState(appOptions.sortBy)
    // const [ locationServices, setLocationServices ] = useState(false);
    // const [ currentLocation, setCurrentLocation ] = useState({})
    // const [ map, setMap ] = useState({});
    // const [ modalVisible, openModal, closeModal ] = useModal();
    const history = useHistory();
    const navigate = (route) => {
        history.push(route)
    }

    const goBack = () => {
      history.goBack();
    }

    // const getCurrentLocation = () => {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     const { latitude, longitude } = position.coords;
    //     const center =  { lat: latitude, lng: longitude };
    //     setCurrentLocation(center)
    //   })
    // }

  // const handleAlerts = (alert) => {
  //   let newState = [ ...alerts ];
  //   const id = uuidv4();
  //   if ( alerts.length === 5) {
  //     newState.shift();
  //   }
  //   newState = [...newState, {id, ...alert} ];
  //   setAlerts(newState);
  // }

  // const removeAlerts = (id) => {
  //     let newState = [...alerts];
  //     newState = newState.filter(alert => alert.id !== id);
  //     setAlerts(newState)
  // }

  // useEffect(() => {
  //   getCurrentLocation();
  // }, [])

    return (
        <AppContext.Provider
          value={{
            navigate,
            dispatch,
            auth,
            sessions,
            sortBy,
            setSortBy,
            goBack
          }}
          >
            {/* {loading ? <Loading/> : null} */}
            {/* {
              Object.keys(alerts).length > 0
              ?
              <Alerts
                  removeAlerts={removeAlerts}
                  alerts={alerts}
              />
              :
              null
            } */}
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
