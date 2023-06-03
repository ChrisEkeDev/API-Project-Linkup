import React from 'react';
import EventItem from './EventItem';
import './Event.css';

function Events() {

  return (
    <ul className='events-wrapper' role='list'>
        {/* {events.map(event => {
            return (
                <EventItem key={event}/>
            )
        })} */}
    </ul>
  )
}

export default Events
