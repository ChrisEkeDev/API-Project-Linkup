import React from 'react'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as view from '../views';
import NavBar from '../components/navbar';
import { useApp } from '../context/AppContext';
import Loading from '../components/shared/loading';

function AppRouter() {
    const { auth } = useApp();

    if (!auth) return <Loading/>

    return (
        <div className='app_router'>
            <NavBar />
            <Switch>
                <Route
                    exact
                    path={ROUTES.SESSIONS_ROUTER}
                    component={view.SessionsRouter}
                />
                <Route
                    exact
                    path={ROUTES.CHECKINS}
                    component={view.CheckIns}
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
        </div>
    )
}

export default AppRouter
