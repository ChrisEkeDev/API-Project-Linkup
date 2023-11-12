import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from '../Loading';
import Alerts from '../Alerts';
import Modal from "../../Shared/components/Modal";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
    const [ alerts, setAlerts ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [ locationServices, setLocationServices ] = useState(false);
    const [ currentLocation, setCurrentLocation ] = useState()
    const [ theme, setTheme ] = useState("dark");
    const [ map, setMap ] = useState({});
    const history = useHistory();
    const navigate = (route) => {
        history.push(route)
    }

  const initializeMap = (ref) => {
    let center;
    if (locationServices) {
      navigator.geolocation.getCurrentPosition(position => {
        center = new window.google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
        setCurrentLocation(center)
      });
    } else {
      center = new window.google.maps.LatLng(
        37.421949,
        -122.084773
      );
      setCurrentLocation(center)
    }
    const mapOptions = {
      mapId: theme === "light" ? "fc1ef067cfa808f9" : "147b32231f3ba7c1",
      center: center,
      zoom: 15,
      disableDefaultUI: true
    };
    const newMap = new window.google.maps.Map(ref.current, mapOptions);
    setMap(newMap);
  };

  const refreshMapTheme = (ref) => {
    const mapOptions = {
      mapId: theme === "light" ? "fc1ef067cfa808f9" : "147b32231f3ba7c1",
      center: currentLocation,
      zoom: 15,
      disableDefaultUI: true
    };
    const newMap = new window.google.maps.Map(ref.current, mapOptions);
    setMap(newMap);
  }

    const handleAlerts = (alert) => {
        const newState = { ...alerts };
        const id = Object.keys(newState).length + 1;
        newState[id] = { id, ...alert };
        setAlerts(newState);
    }

  const removeAlerts = (id) => {
      const newState = {...alerts };
      delete newState[id];
      setAlerts(newState)
  }

  const handleTheme = () => {
    if (theme === "light") setTheme("dark")
    else setTheme("light")
  }

  const handleLocationServices = () => {
    setLocationServices(!locationServices)
  }



    return (
        <AppContext.Provider value={{
          locationServices,
          handleLocationServices,
          setLoading,
          handleAlerts,
          navigate,
          initializeMap,
          refreshMapTheme,
          theme,
          handleTheme
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
