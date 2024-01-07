import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useLoading from "../hooks/useLoading";
import useLocationServices from "../hooks/useLocationServices";
import { thunkRestoreAuth, thunkSignOutPlayer } from "../store/auth";
import useAppClock from "../hooks/useAppClock";
import useAlerts from "../hooks/useAlerts";
import LoadingData from "../components/shared/loading";
import Alerts from "../components/alerts";


const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
  const auth = useSelector(state => state.auth.player)
  const { alerts, handleAlerts, removeAlerts } = useAlerts();
  const [ theme, setTheme ] = useState('light');
  const { currentTime } = useAppClock();
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


  const signOut = async () => {
    try {
        const res = await dispatch(thunkSignOutPlayer())
        handleAlerts(res)
        if (res.status >= 400) {
          throw new Error()
        } else {
          navigate('/sign-in')
        }
    } catch(e) {
        console.log(e)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const res = await dispatch(thunkRestoreAuth())
            handleAlerts(res)
            if (res.status >= 400) {
              navigate('/sign-in')
            } else {
              navigate('/sessions')
            }
        } catch(e) {
            console.log(e)
        }
    }
    if (!auth) {
        checkAuth();
    }
  }, [auth])

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
