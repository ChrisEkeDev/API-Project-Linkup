import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkRestoreUser } from './store/session';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoadingProvider from './context/LoadingProvider';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';

function App() {
  const [ authForm, setAuthForm ] = useState('')
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
      dispatch(thunkRestoreUser())
      .catch(() => console.log('No Session'))
  }, [dispatch])

  useEffect(() => {
    if (authForm) {
    document.body.style.overflow = 'hidden';
    }
    return () => document.body.style.overflow = 'unset';
}, [authForm])

  return (
    <div id='app-wrapper'>
      <LoadingProvider>
        {
          authForm === 'login' ?
          <Form>
              <Login close={() => setAuthForm('')}/>
          </Form> :
          authForm === 'signup' ?
          <Form>
              <Signup close={() => setAuthForm('')}/>
          </Form> :
          null
        }
        <Navigation setAuthForm={setAuthForm}/>
        <Switch>
            <Route exact path='/'>
              <Landing setAuthForm={setAuthForm}/>
            </Route>
            <Route path='/dashboard'>
              <Dashboard/>
            </Route>
        </Switch>
      </LoadingProvider>
    </div>
  );
}

export default App;
