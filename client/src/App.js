import React, { useEffect, useState } from 'react';
import Loading from './components/shared/loading';
import { thunkSearchSessions, thunkGetMySessions } from './store/sessions';
import { thunkGetPlayerCheckIns } from './store/checkins';
import { thunkSearchTeams, thunkGetMyTeams } from './store/teams';
import { useApp } from './context/AppContext';

import AuthRouter from './routers/AuthRouter';
import { thunkGetMyMemberships } from './store/memberships';

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
