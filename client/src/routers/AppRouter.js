import React from 'react'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as view from '../views';

function AppRouter() {
  return (
    <Switch>
        <Route
            exact
            path={ROUTES.SIGN_IN}
            component={view.SignIn}
        />
        <Route
            exact
            path={ROUTES.SIGN_UP}
            component={view.SignUp}
        />
        <Route
            path={ROUTES.HOME}
            component={view.Home}
        />
        <Route
            component={view.PageNotFound}
        />
    </Switch>
  )
}

export default AppRouter
