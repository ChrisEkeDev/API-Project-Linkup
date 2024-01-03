import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useLoading from "../hooks/useLoading";
import LoadingData from "../components/shared/loading";
import useLocationServices from "../hooks/useLocationServices";
// import {v4 as uuidv4} from 'uuid';
import { appOptions } from "../constants/constants";
import useAuth from "../hooks/useAuth";
import useAppClock from "../hooks/useAppClock";


const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
    const [ theme, setTheme ] = useState('light');
    const { currentTime } = useAppClock();
    const {
        currentLocation,
        setCurrentLocation,
        locationServices,
        setLocationServices
    } = useLocationServices();
    const handleTheme = () => {
      if (theme === 'light') setTheme('dark')
      else setTheme('light')
    }

    const { auth, signOut } = useAuth();
    const dispatch = useDispatch();
    const { loading, setLoading } = useLoading();
    // const [ alerts, setAlerts ] = useState([]);
    const history = useHistory();
    const navigate = (route) => {
        history.push(route)
    }
    const goBack = (route) => {
      if (route) history.push(route)
      else history.goBack();
    }
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

    return (
        <AppContext.Provider
          value={{
            theme,
            currentTime,
            currentLocation,
            setCurrentLocation,
            locationServices,
            handleTheme,
            setLocationServices,
            navigate,
            dispatch,
            setLoading,
            auth,
            signOut,
            goBack
          }}
          >
            {loading ? <LoadingData absolute={true}/> : null}
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
