import React from 'react';
import EventItem from './EventItem';
import './Event.css';

function Events({events}) {
  const normalizedEvents = Object.values(events)
  return (
    <ul className='events-wrapper' role='list'>
        {normalizedEvents.map(event => {
            return (
                <EventItem key={event.id} id={event.id}/>
            )
        })}
    </ul>
  )
}

export default Events
