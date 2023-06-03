import React from 'react'
import GroupItem from './GroupItem';
import './Group.css';

function Groups({groups}) {
  const groupArray = Object.values(groups);

  return (
    <ul className='groups-wrapper' role='list'>
        {groupArray.map(group => {
            return (
                <GroupItem key={group.id} group={group}/>
            )
        })}
    </ul>
  )
}

export default Groups
