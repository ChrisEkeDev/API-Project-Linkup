import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkRestoreUser } from './store/session';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoadingProvider from './context/LoadingProvider';
import './index.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
      dispatch(thunkRestoreUser())
  }, [dispatch])

  return (
    <div id='app-wrapper'>
      <LoadingProvider>
        <Navigation/>
        <Switch>

        </Switch>
      </LoadingProvider>
    </div>
  );
}

export default App;
