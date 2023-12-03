import React from 'react'
import { useApp } from '../App/Context/AppContext';
import { format, parse, parseISO, parseJSON } from 'date-fns';
import SessionsList from './SessionsList';

function SessionItem({session}) {
  const { navigate } = useApp();
  const parsedDate = parseISO(session?.startDate)
  const dayOfWeek = format(parsedDate, 'EEEE');
  const displayDate = format(parsedDate, 'P').slice(0, -5);;
  const displayTime = format(parsedDate, "p")

  if (!session) return <li>loading</li>

  return (
    <li onClick={() => navigate(`/sessions/${session.id}`)} className='sessions__session_item--wrapper'>
        <div className='sessions__session_item--contents'>
            <div className='sessions__session_item--header'>
                <p>{session.name}</p>
                <p>{session.address}</p>
            </div>
            <div>
              {session.CheckIns?.length}
            </div>
            <div className='sessions__session_item--details'>
              <div className='sessions__session_item--date'>
                <span>{dayOfWeek}</span>
                <span>{displayDate}</span>
              </div>
              <span className='sessions__session_item--at'>@</span>
              <span className='sessions__session_item--time'>{displayTime}</span>
            </div>
        </div>
    </li>
  )
}

export default SessionItem
