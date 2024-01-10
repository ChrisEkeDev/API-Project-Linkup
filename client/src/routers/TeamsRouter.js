import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useApp } from '../context/AppContext';
import * as view from '../views';
import { thunkGetMyTeams } from '../store/teams';

function TeamsRouter() {
    const location = useLocation();
    const { dispatch } = useApp();

    useEffect(() => {
        try {
            dispatch(thunkGetMyTeams())
        } catch(e) {
            console.error(e)
        }
    }, [])

    return (
        <div className='router_container'>
            <AnimatePresence mode='wait'>
                <Switch location={location} key={location.pathname}>
                    <Route
                        exact
                        path={ROUTES.TEAMS}
                        component={view.Teams}
                    />
                    {/* <Route
                        exact
                        path={ROUTES.SINGLE_TEAM}
                        component={view.SingleTeam}
                    />
                    <Route
                        exact
                        path={ROUTES.CREATE_TEAM}
                        component={view.NewTeam}
                    />
                    <Route
                        exact
                        path={ROUTES.UPDATE_TEAM}
                        component={view.UpdateTeam}
                    /> */}
                </Switch>
            </AnimatePresence>
        </div>
    )
}

export default TeamsRouter
