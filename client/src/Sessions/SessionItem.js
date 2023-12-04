import React from 'react'
import { useApp } from '../App/Context/AppContext';
import { format, parse, parseISO, parseJSON } from 'date-fns';
import SessionsList from './SessionsList';
import SessionCreator from './SessionCreator';

function SessionItem({session}) {
  const { navigate } = useApp();
  const parsedDate = parseISO(session?.startDate)
  const dayOfWeek = format(parsedDate, 'EEEE');
  const displayDate = format(parsedDate, 'P').slice(0, -5);;
  const displayTime = format(parsedDate, "p")
  console.log(session)

  if (!session) return <li>loading</li>

  return (
    <li onClick={() => navigate(`/sessions/${session.id}`)} className='sessions__session_item--wrapper'>
      <div className='sessions__creator--wrapper'>
            <div className='sessions__creator--contents'>
                <div className='players__item--wrapper'>
                    <div
                        className='players__item--image'
                        style={{backgroundImage: `url(${session.creator?.profileImage})`}}/>
                </div>
                <div className='sessions__creator--text'>
                    <p>Created By</p>
                    <h5>{session.creator?.name}</h5>
                </div>
            </div>
        </div>
        <div className='sessions__session_item--contents'>
          <div className='sessions__session_item--header'>
            <div className='detail-grid'>
                <small>What</small>
                <p>{session.name}</p>
            </div>
            <div className='detail-grid'>
                <small>Where</small>
                <p>{session.Court?.address}</p>
            </div>
            <div className='detail-grid'>
                <small>When</small>
                <p>{displayDate} @ {displayTime}</p>
            </div>
          </div>
          <div className='sessions__session_item--player_count' >
            <span className='count'>{session.CheckIns?.length} Players</span>
          </div>
            {/* <div className='sessions__session_item--details'>
              <div className='sessions__session_item--date'>
                <span>{dayOfWeek}</span>
                <span>{displayDate}</span>
              </div>
              <span className='sessions__session_item--at'>@</span>
              <span className='sessions__session_item--time'>{displayTime}</span>
            </div> */}
        </div>
    </li>
  )
}

export default SessionItem
