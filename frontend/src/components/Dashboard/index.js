import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardGroups from './DashboardGroups';
import { thunkGetCurrentGroups } from '../../store/groups';
import { thunkGetAttendance } from '../../store/events';
import Button from '../Buttons/Button';
import './Dashboard.css';
import DashboardEvents from './DashboardEvents';

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const groups = useSelector(state => state.groups.currentGroups);
    const attendance = useSelector(state => state.events.attendance);
    const normalizedGroups = Object.values(groups);
    const normalizeAttendance = Object.values(attendance)

    console.log(normalizeAttendance)

    useEffect(() => {
      dispatch(thunkGetCurrentGroups());
      dispatch(thunkGetAttendance());
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
                {Object.values(attendance).length ?
                <DashboardEvents events={normalizeAttendance}/> :
                <div className='dash-no_events'>
                <p className='body small'>You aren't attending any events yet.</p>
                  <Button
                      type='secondary'
                      style='small-btn'
                      label='Search Events'
                  />
                </div>
                }

              </section>
            </div>
        </section>
    </main>
  )
}

export default Dashboard
