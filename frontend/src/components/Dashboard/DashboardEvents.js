import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DashboardEventItem from './DashboardEventItem'
import Button from '../Buttons/Button'

function DashboardEvents({attendance}) {
    const [tab, setTab] = useState('attending');
    const normalizeAttendance = Object.values(attendance);
    const attending = normalizeAttendance.filter(event => event.status === 'attending');
    const waitlist = normalizeAttendance.filter(event => event.status === 'waitlist');
    const history = useHistory();

    const navigate = (route) => {
        history.push(route)
    }

  return (
    <section className='dashboard-events'>
        <h2 className='subheading'>Events</h2>
        <div className='dashboard_groups-tabs'>
            <p onClick={() => setTab('attending')} className={`body dash_tab ${tab === 'attending' ? 'dash_tab--active' : ''}`}>Attending</p>
            <p onClick={() => setTab('waitlist')} className={`body dash_tab ${tab === 'waitlist' ? 'dash_tab--active' : ''}`}>Waitlist</p>
        </div>
        <section className='dashboard_groups-groups'>
            {
                tab === 'attending' ?
                <ul>
                    {Object.values(attendance).length ?
                        attending.map(event => {
                            return (
                                <DashboardEventItem id={event.eventId}/>
                            )
                        })
                    :
                    <div className='dash-no_events'>
                    <p className='body small'>You aren't attending any events yet.</p>
                        <Button
                            type='secondary'
                            style='small-btn'
                            label='Search Events'
                            action={() => navigate('/search/events')}
                        />
                    </div>
                    }
                </ul> :
                <ul>
                    {Object.values(attendance).length ?
                        waitlist.map(event => {
                            return (
                                <DashboardEventItem id={event.eventId}/>
                            )
                        })
                    :
                    <div className='dash-no_events'>
                    <p className='body small'>You aren't on the waiting list for any events yet.</p>
                        <Button
                            type='secondary'
                            style='small-btn'
                            label='Search Events'
                            action={() => navigate('/search/events')}
                        />
                    </div>
                    }
                </ul>
            }
        </section>


    </section>
  )
}

export default DashboardEvents
