import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import PageNotFound from '../PageNotFound';
import Dashboard from '../Dashboard';

function Routes() {
  return (
    <Switch>
      <Route exact path='/sign-in'>
        <SignIn />
      </Route>
      <Route exact path='/sign-up'>
        <SignUp />
      </Route>
      <Route exact path='/'>
        <Dashboard />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  )
}

export default Routes
