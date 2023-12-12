import React from 'react'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as view from '../views';

function SessionsRouter() {
  return (
    <Switch>
        <Route
            exact
            path={ROUTES.NEW_SESSION}
            component={view.NewSession}
        />
        <Route
            exact
            path={ROUTES.UPDATE_SESSION}
            component={view.UpdateSession}
        />
        <Route
            exact
            path={ROUTES.SINGLE_SESSION}
            component={view.SingleSession}
        />
        <Route
            exact
            path={ROUTES.SESSIONS}
            component={view.Sessions}
        />
    </Switch>
  )
}

export default SessionsRouter
