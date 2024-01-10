import React, { useEffect, useState } from 'react';
import Loading from './components/shared/loading';
import { thunkSearchSessions, thunkGetMySessions } from './store/sessions';
import { thunkGetPlayerCheckIns } from './store/checkins';
import { thunkSearchTeams, thunkGetMyTeams } from './store/teams';
import { useApp } from './context/AppContext';

import AuthRouter from './routers/AuthRouter';

function App() {
  const { dispatch } = useApp()
  const [ dataLoaded, setDataLoaded ] = useState(false)

  useEffect(() => {
    const loadAppData = async () => {
        try {
            const p1 = await dispatch(thunkSearchSessions());
            const p2 = await dispatch(thunkGetMySessions());
            const p3 = await dispatch(thunkSearchTeams());
            const p4 = await dispatch(thunkGetMyTeams());
            const p5 = await dispatch(thunkGetPlayerCheckIns())
            Promise.all([p1, p2, p3 ,p4, p5]).then((values) => {
              setDataLoaded(true)
            })
        } catch(e) {
            console.log(e)
        }
    }
    loadAppData()
  }, [dispatch])


  return (
    <div id='app'>
      {
        !dataLoaded ?
        <Loading/> :
        <AuthRouter/>
      }

    </div>
  );
}

export default App;
