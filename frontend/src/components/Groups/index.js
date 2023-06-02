import React from 'react'
import GroupItem from './groupItem';
import './Group.css';

function Groups({groups}) {

  return (
    <ul className='groups-wrapper' role='list'>
        {groups.map(group => {
            return (
                <GroupItem key={group} group={group}/>
            )
        })}
    </ul>
  )
}

export default Groups
