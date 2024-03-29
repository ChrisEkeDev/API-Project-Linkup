import React from 'react';
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
            exact
            path={ROUTES.LOCATION_SERVICES}
            component={view.LocationServices}
        />
        <Route
            exact
            path={ROUTES.APP_ROUTER}
            component={view.AppRouter}
        />
        {/* <Route
            component={view.PageNotFound}
        /> */}
    </Switch>
  )
}

export default AppRouter
