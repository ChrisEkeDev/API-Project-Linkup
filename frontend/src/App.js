import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkRestoreUser } from './store/session';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoadingProvider from './context/LoadingProvider';
import { useAlerts } from './context/AlertsProvider';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Modal from './components/Modal';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import Group from './components/Groups/Group';
import CreateGroup from './components/CreateGroup';
import UpdateGroup from './components/UpdateGroup';
import Event from './components/Events/Event';
import './index.css';

function App() {
  const [ authForm, setAuthForm ] = useState('')
  const { handleAlerts } = useAlerts();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  const restoreSession = () => {
    return (
      dispatch(thunkRestoreUser())
      .then((alert) => {
        handleAlerts(alert);
      })
      .catch((alert) => {
        handleAlerts(alert);
      })
    )
  }

  useEffect(() => {
      restoreSession();
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
          <Modal>
              <Login close={() => setAuthForm('')}/>
          </Modal> :
          authForm === 'signup' ?
          <Modal>
              <Signup close={() => setAuthForm('')}/>
          </Modal> :
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
            <Route path='/search'>
              <Search/>
            </Route>
            <Route path='/groups/:groupId'>
              <Group/>
            </Route>
            <Route path='/group/new'>
              <CreateGroup/>
            </Route>
            <Route path='/update-group/:groupId'>
              <UpdateGroup/>
            </Route>
            <Route path='/events/:eventId'>
              <Event/>
            </Route>
        </Switch>
      </LoadingProvider>
    </div>
  );
}

export default App;
