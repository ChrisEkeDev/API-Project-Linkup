import React, { useEffect, useState }  from 'react';
import EventItem from './EventItem';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllEvents } from '../../store/events';
import DataLoading from '../Loading/DataLoading';
import './Event.css';

function Events() {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.allEvents);
  const normalizedEvents = Object.values(events);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    dispatch(thunkGetAllEvents())
    .then(() => setIsLoading(false));
}, [dispatch])

  if (isLoading) return <DataLoading></DataLoading>


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
