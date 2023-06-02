import React from 'react'
import './Event.css';
import { Link } from 'react-router-dom'

function EventItem({contained}) {
  return (
    <li className='event_item-wrapper'>
        <Link to='/events/1' className='event-link'>
            <article className={`event_item-contents ${contained ? 'contained' : ''}`}>
                <div className='event_item-information'>
                    <div className='event_item-image'></div>
                    <div className='event_item-details'>
                        <h3 className='body green'>YYYY-MM-DD <span> &#8729; </span> Time</h3>
                        <h2 className='subheading'>Event name - show all information</h2>
                        <small className='body small'>Location</small>
                    </div>
                </div>
                <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </article>
        </Link>
    </li>
  )
}

export default EventItem;
