import React from 'react';
import './Group.css';
import { Link } from 'react-router-dom'

function GroupItem() {
  return (
    <li className='group_item-wrapper'>
        <Link to='/groups/1' className='group-link'>
            <article className='group_item-contents'>
                <div className='group_item-image' ></div>
                <div className='group_item-information'>
                    <h2 className='subheading'>Group Name</h2>
                    <small className='small'>Location</small>
                    <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className='group_item-details'>
                        <small className='small'>## of events<span> &#8729; </span>Public</small>
                    </div>
                </div>
            </article>
        </Link>
    </li>
  )
}

export default GroupItem
