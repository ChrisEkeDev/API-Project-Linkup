import React from 'react';
import Loading from './components/shared/loading';
import { useApp } from './context/AppContext';

import AuthRouter from './routers/AuthRouter';

function App() {
  const { authLoading } = useApp()

  return (
    <div id='app'>
      {
        authLoading ?
        <Loading/> :
        <AuthRouter/>
      }

    </div>
  );
}

export default App;
