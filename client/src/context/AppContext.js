import { createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import useLocationServices from "../hooks/useLocationServices";
import { getAuth } from "../store/auth";
import useAppClock from "../hooks/useAppClock";
import useAlerts from "../hooks/useAlerts";
import LoadingData from "../components/shared/loading";
import Alerts from "../components/alerts";
import { useQuery } from 'react-query';


const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
  const { alerts, handleAlerts, removeAlerts } = useAlerts();
  const { currentTime } = useAppClock();
  const { loading, setLoading } = useLoading();
  const history = useHistory();
  const navigate = (route) => {
      history.push(route)
  }

  const handleAuthError = () => {
    navigate('/sign-in')
  }

  const handleAuthSuccess = (data) => {
    handleAlerts(data)
  }

  const {
    data: authData,
    isLoading: authLoading
  } = useQuery(['auth'], {
    queryFn: getAuth,
    retry: false,
    onSuccess: handleAuthSuccess,
    onError: handleAuthError
  });

  const auth = authData?.data;


  const goBack = (route) => {
    if (route) history.push(route)
    else history.goBack();
  }
  const {
      currentLocation,
      setCurrentLocation
  } = useLocationServices();


  return (
      <AppContext.Provider
        value={{
          authLoading,
          currentTime,
          currentLocation,
          setCurrentLocation,
          handleAlerts,
          navigate,
          setLoading,
          auth,
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
