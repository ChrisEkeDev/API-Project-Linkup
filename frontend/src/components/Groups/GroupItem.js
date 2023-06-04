import React from 'react';
import './Group.css';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function GroupItem({id}) {
    const groupItem = useSelector(state => state.groups.allGroups[id])
    const events = useSelector(state => state.events.allEvents);
    const normalizedEvents = Object.values(events);
    const groupEvents = normalizedEvents.filter(event => event.groupId === id);

  return (
    <li className='group_item-wrapper'>
        <Link to={`/groups/${id}`} className='group-link'>
            <article className='group_item-contents'>
                <div className='group_item-image'></div>
                <div className='group_item-information'>
                    <h2 className='subheading'>{groupItem?.name}</h2>
                    <small className='small'>{groupItem?.city}, {groupItem?.state}</small>
                    <p className='body'>{groupItem?.about}</p>
                    <div className='group_item-details'>
                        <small className='small'>{groupEvents.length} {groupEvents.length === 1 ? 'event' : 'events'}<span> &#8729; </span>{groupItem?.private ? 'Private' : 'Public'}</small>
                    </div>
                </div>
            </article>
        </Link>
    </li>
  )
}

export default GroupItem
