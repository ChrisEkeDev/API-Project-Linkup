import React, { useEffect }  from 'react';
import EventItem from './EventItem';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllEvents } from '../../store/events';
import './Event.css';

function Events() {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.allEvents);
  const normalizedEvents = Object.values(events)

  useEffect(() => {
    dispatch(thunkGetAllEvents())
}, [dispatch])

  return (
    <ul className='events-wrapper'>
        {normalizedEvents.map(event => {
            return (
                <EventItem key={event.id} id={event.id}/>
            )
        })}
    </ul>
  )
}

export default Events
