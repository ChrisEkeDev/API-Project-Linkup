import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useLoading from "../hooks/useLoading";
import LoadingData from "../components/shared/loading";
import useSessions from "../hooks/useSessions";
// import Loading from '../App/Loading';
// import Alerts from '../App/Alerts';
// import {v4 as uuidv4} from 'uuid';
import { appOptions } from "../constants/constants";
import useAuth from "../hooks/useAuth";


const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
    const { auth } = useAuth();
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
            navigate,
            dispatch,
            setLoading,
            auth,
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
