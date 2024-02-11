import React from 'react'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as view from '../views';
import NavBar from '../components/navbar';

function AppRouter() {
    return (
        <div className='app_router'>
            <NavBar />
            <Switch>
                <Route
                    exact
                    path={ROUTES.SEARCH}
                    component={view.Search}
                />
                <Route
                    exact
                    path={ROUTES.CHECKINS}
                    component={view.CheckIns}
                />
                <Route
                    exact
                    path={ROUTES.SESSIONS_ROUTER}
                    component={view.SessionsRouter}
                />
                <Route
                    exact
                    path={ROUTES.TEAMS_ROUTER}
                    component={view.TeamsRouter}
                />
                <Route
                    exact
                    path={ROUTES.PROFILE_ROUTER}
                    component={view.ProfileRouter}
                />
                <Route
                    exact
                    path={ROUTES.SETTINGS_ROUTER}
                    component={view.SettingsRouter}
                />
                {/* <Route
                    component={view.PageNotFound}
                /> */}
            </Switch>
        </div>
    )
}

export default AppRouter
