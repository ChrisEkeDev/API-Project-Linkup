import React, { useEffect } from 'react';
import { thunkSearchSessions } from './store/sessions';
import { useApp } from './context/AppContext';

import AuthRouter from './routers/AuthRouter';

function App() {
  const { dispatch } = useApp()

  useEffect(() => {
    const getSessions = async () => {
        try {
            await dispatch(thunkSearchSessions());
        } catch(e) {
            console.log(e)
        }
    }
    getSessions()
  }, [dispatch])

  return (
    <div id='app'>
      <AuthRouter/>
    </div>
  );
}

export default App;
