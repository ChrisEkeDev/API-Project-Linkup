import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as view from '../views';


function SettingsRouter() {
    const location = useLocation()

    return (
        <div className='router_container'>
            <AnimatePresence mode="wait">
                <Switch location={location} key={location.pathname}>
                    <Route
                        exact
                        path={ROUTES.SETTINGS}
                        component={view.Settings}
                    />
                </Switch>
            </AnimatePresence>
        </div>
    )
}

export default SettingsRouter
