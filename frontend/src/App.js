import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkRestoreUser } from './store/session';
import { thunkGetAllEvents } from './store/events';
import { thunkGetAllGroups } from './store/groups';
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
import ManageGroup from './components/ManageGroup';
import UpdateGroupWrapper from './components/UpdateGroupWrapper';
import Event from './components/Events/Event';
import CreateEvent from './components/CreateEvent';
import ManageEvent from './components/ManageEvent';
import UpdateEventWrapper from './components/UpdateEventWrapper';
import SearchResults from './components/SearchResults';
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
      .catch((error) => {
        return
      })
    )
  }

  useEffect(() => {
      restoreSession();
      dispatch(thunkGetAllEvents());
      dispatch(thunkGetAllGroups());
  }, [dispatch])

  useEffect(() => {
    if (authForm) {
    document.body.style.overflow = 'hidden';
    }
    return () => document.body.style.overflow = 'unset';
}, [authForm])

  return (
    <div id='app-wrapper'>
      <div id='top-ref'></div>
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
            <Route path='/search-results'>
              <SearchResults/>
            </Route>
            <Route path='/search'>
              <Search/>
            </Route>
            <Route path='/groups/:groupId'>
              <Group/>
            </Route>
            <Route path='/create-group'>
              <CreateGroup/>
            </Route>
            <Route path='/update-group/:groupId'>
              <UpdateGroupWrapper/>
            </Route>
            <Route path='/manage-group/:groupId'>
              <ManageGroup/>
            </Route>
            <Route path='/events/:eventId'>
              <Event/>
            </Route>
            <Route path='/create-event'>
              <CreateEvent/>
            </Route>
            <Route path='/update-event/:eventId'>
              <UpdateEventWrapper/>
            </Route>
            <Route path='/manage-event/:eventId'>
              <ManageEvent/>
            </Route>
        </Switch>
      </LoadingProvider>
    </div>
  );
}

export default App;
