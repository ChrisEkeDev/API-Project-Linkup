import React from 'react';
import Loading from './components/shared/loading';
import { useApp } from './context/AppContext';

import AuthRouter from './routers/AuthRouter';

function App() {
  const { authLoading, settings } = useApp()
  const settingsData = settings?.data;
  const { theme } = settingsData;

  return (
    <div id='app' className={`app-${theme}`}>
      {
        authLoading ?
        <Loading/> :
        <AuthRouter/>
      }

    </div>
  );
}

export default App;
