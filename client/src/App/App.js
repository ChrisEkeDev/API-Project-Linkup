import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sessionAlerts } from '../Shared/constants/alertData';
import { useApp } from './Context/AppContext';
import Routes from './Routes';
import './index.css';
import { thunkRestorePlayerSession } from '../Store/auth';

function App() {
  const { handleAlerts, setLoading } = useApp();
  const { sessionRestored, noSessionFound } = sessionAlerts;
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true)
      try {
        dispatch(thunkRestorePlayerSession())
        handleAlerts(sessionRestored);
      } catch(error) {
        handleAlerts(noSessionFound);
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
      restoreSession();
  }, [dispatch])


  return (
    <div id='app-wrapper'>
      <div id='top-ref'></div>
      <Routes/>
    </div>
  );
}

export default App;
