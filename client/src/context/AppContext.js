import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useLoading from "../hooks/useLoading";
import useLocationServices from "../hooks/useLocationServices";
import useAuth from "../hooks/useAuth";
import useAppClock from "../hooks/useAppClock";
import useAlerts from "../hooks/useAlerts";
import LoadingData from "../components/shared/loading";
import Alerts from "../components/alerts";


const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
  const { alerts, handleAlerts, removeAlerts } = useAlerts();
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
  const history = useHistory();
  const navigate = (route) => {
      history.push(route)
  }
  const goBack = (route) => {
    if (route) history.push(route)
    else history.goBack();
  }

  return (
      <AppContext.Provider
        value={{
          theme,
          currentTime,
          currentLocation,
          setCurrentLocation,
          locationServices,
          handleAlerts,
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
