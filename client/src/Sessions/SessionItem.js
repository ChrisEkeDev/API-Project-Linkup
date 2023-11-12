import React from 'react'

function SessionItem({session}) {
  return (
    <li className='session_item_wrapper'>
        <div className='session_item_contents'>
            <div className='session_item_header'>
                <h5>{session.name}</h5>
                <p>{session.address}</p>
            </div>
                {/* <p>{session.startDate}</p>
                <p>{session.endDate}</p>
                <p>{session.CheckIns.length}</p> */}
        </div>
    </li>
  )
}

export default SessionItem
