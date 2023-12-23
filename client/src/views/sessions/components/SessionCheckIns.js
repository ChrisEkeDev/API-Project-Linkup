import React from 'react'
import SessionPlayer from './SessionPlayer'

function SessionCheckIns({checkIns}) {
  return (
    <div className='session_players'>
            <span className='section_label xs bold'>{checkIns.length} Players </span>
        <ul className='checkIn_list'>
            {
                checkIns.map(checkIn => (
                    <SessionPlayer checkIn={checkIn}/>
                ))
            }
        </ul>
    </div>
  )
}

export default SessionCheckIns
