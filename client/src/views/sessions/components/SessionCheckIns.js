import React from 'react'
import SessionPlayer from './SessionPlayer'

function SessionCheckIns({checkIns}) {
  return (
    <div className='session_players'>
        <header className='sub_header'>
            <h2>Players ({checkIns.length})</h2>
        </header>
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
