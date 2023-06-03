import React from 'react';
import './Group.css';
import { Link } from 'react-router-dom'

function GroupItem({group}) {
  return (
    <li className='group_item-wrapper'>
        <Link to={`/groups/${group.id}`} className='group-link'>
            <article className='group_item-contents'>
                <div className='group_item-image'></div>
                <div className='group_item-information'>
                    <h2 className='subheading'>{group?.name}</h2>
                    <small className='small'>{group?.city}, {group?.state}</small>
                    <p className='body'>{group?.about}</p>
                    <div className='group_item-details'>
                        <small className='small'>## of events<span> &#8729; </span>{group?.private ? 'Private' : 'Public'}</small>
                    </div>
                </div>
            </article>
        </Link>
    </li>
  )
}

export default GroupItem
