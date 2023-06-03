import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardGroups from './DashboardGroups';
import { thunkGetCurrentGroups } from '../../store/groups';
import './Dashboard.css';

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const groups = useSelector(state => state.groups.currentGroups);
    const normalizedGroups = Object.values(groups);

    useEffect(() => {
      dispatch(thunkGetCurrentGroups());
    }, [dispatch])

    if (!user) return <Redirect to='/' />

  return (
    <main id='dashboard-wrapper'>
        <section className='dashboard-contents'>
            <header className='dashboard-header'>
                <h1 className='display'>Welcome, <span className='caps'>{user?.firstName}</span> 👋</h1>
            </header>
            <DashboardGroups user={user} groups={normalizedGroups}/>
            <div className='dashboard-main'>
              <aside className='dashboard-aside'>
                <h2 className='subheading'>Calendar</h2>
              </aside>
              <section className='dashboard-events'>
                <h2 className='subheading'>Events</h2>
              </section>
            </div>
        </section>
    </main>
  )
}

export default Dashboard
