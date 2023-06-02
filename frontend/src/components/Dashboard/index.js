import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Dashboard.css';

function Dashboard() {
    const user = useSelector(state => state.session.user)

    if (!user) return <Redirect to='/' />

  return (
    <main id='dashboard-wrapper'>
        <section className='dashboard-contents'>
            <header className='dashboard-header'>
                <h1 className='display'>Welcome, {user?.firstName} 👋</h1>
            </header>
        </section>
    </main>
  )
}

export default Dashboard
