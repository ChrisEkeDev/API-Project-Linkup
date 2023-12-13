import React from 'react'
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../../components/shared/profileImage';
import { format, parseISO } from 'date-fns';
import '../styles.scss';

function SessionItem({session}) {
  const { navigate } = useApp();
  const parsedDate = parseISO(session?.startDate);
  const dayOfWeek = format(parsedDate, 'EEEE');
  const displayDate = format(parsedDate, 'P').slice(0, -5);
  const displayTime = format(parsedDate, "p");

  if (!session) return <li>loading</li>

  return (
    <li onClick={() => navigate(`/sessions/${session.id}`)} className='session_item'>
      <div className='details'>
        <p>{session.name}</p>
        <p className='time'>{dayOfWeek}, {displayDate} @ {displayTime}</p>
        <small>20 Players checked in</small>
      </div>
      <div className='creator'>
        <ProfileImage
          player={session.creator}
        />
        <div className='details'>
          <small>Created By</small>
          <p>{session.creator.name}</p>
        </div>
      </div>
    </li>
  )
}

export default SessionItem
