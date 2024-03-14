import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as view from '../views';

function TeamsRouter() {
    const location = useLocation();

    return (
        <AnimatePresence mode='wait'>
            <Switch location={location} key={location.pathname}>
                <Route
                    exact
                    path={ROUTES.TEAMS}
                    component={view.Teams}
                />
                <Route
                    exact
                    path={ROUTES.NEW_TEAM}
                    component={view.NewTeam}
                />
                <Route
                    exact
                    path={ROUTES.UPDATE_TEAM}
                    component={view.UpdateTeam}
                />
                <Route
                    exact
                    path={ROUTES.SINGLE_TEAM}
                    component={view.SingleTeam}
                />
            </Switch>
        </AnimatePresence>
    )
}

export default TeamsRouter
