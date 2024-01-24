import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useLoading from "../hooks/useLoading";
import useLocationServices from "../hooks/useLocationServices";
import { thunkRestoreAuth, thunkSignOutPlayer, thunkGetSettings } from "../store/auth";
import useAppClock from "../hooks/useAppClock";
import useAlerts from "../hooks/useAlerts";
import LoadingData from "../components/shared/loading";
import Alerts from "../components/alerts";
import { thunkSearchSessions, thunkGetMySessions } from '../store/sessions';
import { thunkGetMyCheckIns } from '../store/checkins';
import { thunkSearchTeams, thunkGetMyTeams } from '../store/teams';
import { thunkGetMyMemberships } from "../store/memberships";
import { thunkGetMyLikes } from "../store/chats";


const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
  const [ authLoading, setAuthLoading ] = useState(true)
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
              const p1 = await dispatch(thunkGetMySessions());
              const p2 = await dispatch(thunkGetMyTeams());
              const p3 = await dispatch(thunkGetMyCheckIns())
              const p4 = await dispatch(thunkGetMyMemberships())
              const p5 = await dispatch(thunkGetMyLikes())
              const p6 = await dispatch(thunkGetSettings())
            }
        } catch(e) {
            console.log(e)
        } finally {
          const p1 = await dispatch(thunkSearchSessions());
          const p2 = await dispatch(thunkSearchTeams());
          Promise.all([p1, p2]).then((values) => {
            setAuthLoading(false)
          })
        }
    }
    checkAuth();

  }, [])


  return (
      <AppContext.Provider
        value={{
          authLoading,
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
          {loading ? <LoadingData /> : null}
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
