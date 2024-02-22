import React from 'react';
import Loading from './components/shared/loading';
import { useApp } from './context/AppContext';

import AuthRouter from './routers/AuthRouter';

function App() {
  const { authLoading, theme, settingsLoading } = useApp()

  if (authLoading || settingsLoading ) return <Loading/>

  return (
    <div id='app' className={`app-${theme}`}>
      <AuthRouter/>
    </div>
  );
}

export default App;
