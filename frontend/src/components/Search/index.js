import React, { useEffect } from 'react';
import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom/';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllGroups } from '../../store/groups';
import './Search.css';
import Groups from '../Groups';
import Events from '../Events';

function Search() {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const groups = useSelector(state => state.groups.allGroups)

    useEffect(() => {
        dispatch(thunkGetAllGroups())
    }, [dispatch])


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
                <p className='body'>Search for '*' </p>
            </header>
            <Switch>
                <Route exact path={`${url}/events`}>
                    {/* <Events/> */}
                </Route>
                <Route exact path={`${url}/groups`}>
                    <Groups groups={groups}/>
                </Route>
            </Switch>
        </div>
    </main>
  )
}

export default Search
