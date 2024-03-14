import React from 'react'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as view from '../views';
import NavBar from '../components/navbar';
import AppMap from '../views/map';
import '../index.css';
import { viewValues } from '../constants/constants';

function AppRouter() {
    return (
        <main className='app_router'>
            <NavBar />
            <section id='router_container'>
                <Switch>
                    <Route
                        exact
                        path={ROUTES.INTRODUCTION}
                        component={view.Introduction}
                    />
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
                    {/* <Route
                        component={view.PageNotFound}
                    /> */}
                </Switch>
            </section>
            <section id='map_container'>
                <AppMap/>
            </section>
        </main>
    )
}

export default AppRouter
