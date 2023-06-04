import React from 'react'
import './Event.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EventItem({id, contained}) {
const event = useSelector(state => state.events.allEvents[id]);

let formattedDate;
let formattedTime;

if (event) {
    const date = new Date(event?.startDate)
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
    const timeOptions = {
        hour: "numeric",
        minute: "numeric",
    }
    formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
}

  return (
    <li className='event_item-wrapper'>
        <Link to={`/events/${id}`} className='event-link'>
            <article className={`event_item-contents ${contained ? 'contained' : ''}`}>
                <div className='event_item-information'>
                    <div className='event_item-image'></div>
                    <div className='event_item-details'>
                        <h3 className='body green'>{formattedDate} <span> @ </span> {formattedTime} </h3>
                        <h2 className='subheading'>{event?.name}</h2>
                        <small className='body small'>{event?.Group.city}, {event?.Group.state}</small>
                    </div>
                </div>
                <p className='body'>{event?.description}</p>
            </article>
        </Link>
    </li>
  )
}

export default EventItem;
