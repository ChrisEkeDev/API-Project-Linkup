import React, { useState } from 'react'
import '../Events/Event.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ManageGroupEventItem({id, contained}) {
const event = useSelector(state => state.events.allEvents[id]);

const timeOptions = { hour: "numeric", minute: "numeric" }
const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }


  return (
            <article className={`event_item-contents ${contained ? 'contained' : ''}`}>
                <div className='event_item-information'>
                    <div className='event_item-image bg-image' style={{backgroundImage: `url(${event?.previewImage})` }}></div>
                    <div className='event_item-details'>
                        <h3 className='body green'>
                            {new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(event?.startDate))}
                            <span> @ </span>
                             {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(event?.startDate))}
                        </h3>
                        <h2 className='subheading'>{event?.name}</h2>
                        <small className='body small'>{event?.Group.city}, {event?.Group.state}</small>
                    </div>
                </div>
            </article>
  )
}

export default ManageGroupEventItem;
