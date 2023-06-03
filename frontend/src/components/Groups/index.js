import React from 'react'
import GroupItem from './GroupItem';
import './Group.css';

function Groups({groups}) {
  const normalizedGroups = Object.values(groups);

  return (
    <ul className='groups-wrapper' role='list'>
        {normalizedGroups.map(group => {
            return (
                <GroupItem key={group.id} id={group.id}/>
            )
        })}
    </ul>
  )
}

export default Groups
