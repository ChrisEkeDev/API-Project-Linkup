import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as view from '../views';
import { TbSettings, TbSearch, TbUserCircle  } from 'react-icons/tb';

function AppRouter() {
  return (
    <div className='app_router'>
        <ul className='app_nav'>
            <li className='app_link'>
                <NavLink to="/sessions">
                    <TbSearch />
                </NavLink>
            </li>
            <li className='app_link'>
                <NavLink to="/settings">
                    <TbSettings />
                </NavLink>
            </li>
            <li className='app_link'>
                <NavLink to="/profile">
                    <TbUserCircle  />
                </NavLink>
            </li>
        </ul>
        <Switch>
            <Route
                exact
                path={ROUTES.SESSIONS_ROUTER}
                component={view.SessionsRouter}
            />
            {/* <Route
                exact
                path={ROUTES.SIGN_UP}
                component={view.SignUp}
            /> */}
            {/* <Route
                path={ROUTES.HOME}
                component={view.Home}
            />
            <Route
                component={view.PageNotFound}
            /> */}
        </Switch>
    </div>
  )
}

export default AppRouter
