import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardGroups from './DashboardGroups';
import { thunkGetCurrentGroups } from '../../store/groups';
import { thunkGetAttendance } from '../../store/events';
import { thunkGetMyMemberships } from '../../store/memberships';
import './Dashboard.css';
import DashboardEvents from './DashboardEvents';

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const myMemberships = useSelector(state => state.memberships.myMemberships)
    const attendance = useSelector(state => state.events.attendance);

    useEffect(() => {
      dispatch(thunkGetAttendance());
      dispatch(thunkGetMyMemberships())
    }, [dispatch])

    if (!user) return <Redirect to='/' />

  return (
    <main id='dashboard-wrapper'>
        <section className='dashboard-contents'>
            <header className='dashboard-header'>
                <h1 className='display'>Welcome, <span className='caps'>{user?.firstName}</span> 👋</h1>
            </header>
            <section className='dashboard-main'>
            <section className='dashboard-section'>
              <DashboardGroups myMemberships={myMemberships}/>
              <DashboardEvents attendance={attendance}/>
            </section>
            <aside className='dashboard-aside'>
                <h2 className='subheading'>Calendar</h2>
              </aside>
            </section>
        </section>
    </main>
  )
}

export default Dashboard
