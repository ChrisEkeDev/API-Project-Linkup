import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as view from '../views';

function SessionsRouter() {
    const location = useLocation()

    return (
        <AnimatePresence mode='wait'>
            <Switch location={location} key={location.pathname}>
                <Route
                    exact
                    path={ROUTES.SESSIONS}
                    component={view.Sessions}
                />
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
            </Switch>
        </AnimatePresence>
    )
}

export default SessionsRouter
