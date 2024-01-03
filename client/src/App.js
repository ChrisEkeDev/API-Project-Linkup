import React, { useEffect } from 'react';
import { thunkSearchSessions } from './store/sessions';
import { useDispatch } from 'react-redux';
import useAuth from './hooks/useAuth';
import AuthRouter from './routers/AuthRouter';

function App() {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const getSessions = async () => {
        try {
            const res = await dispatch(thunkSearchSessions());
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
