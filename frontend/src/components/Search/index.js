import React from 'react';
import { Switch, Route, NavLink, useRouteMatch, useLocation } from 'react-router-dom/';
import './Search.css';
import Groups from '../Groups';
import Events from '../Events';

function Search() {
    const { pathname } = useLocation();
    const { url } = useRouteMatch();

  return (
    <main id='search-wrapper'>
        <div className='search-contents'>
            <header className='search-header'>
                <div className='search-tabs'>
                    <NavLink
                        className='search-tab'
                        activeClassName='active-tab'
                        exact to={`${url}/events`}
                    >
                        Events
                    </NavLink>
                    <NavLink
                        className='search-tab'
                        activeClassName='active-tab'
                        exact to={`${url}/groups`}
                    >
                        Groups
                    </NavLink>
                </div>
                <p className='body small'>{pathname.endsWith('events') ? 'Events' : 'Groups'} in Linkup </p>
            </header>
            <Switch>
                <Route exact path={`${url}/events`}>
                    <Events/>
                </Route>
                <Route exact path={`${url}/groups`}>
                    <Groups/>
                </Route>
            </Switch>
        </div>
    </main>
  )
}

export default Search
