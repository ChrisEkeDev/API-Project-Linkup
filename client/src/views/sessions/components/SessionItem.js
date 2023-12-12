import React from 'react'
import { useApp } from '../../../context/AppContext';
import { format, parseISO } from 'date-fns';
import '../styles.scss';

function SessionItem({session}) {
  const { navigate } = useApp();
  const parsedDate = parseISO(session?.startDate);
  const hasImage = session?.creator.profileImage !== null;
  const backgroundImage = hasImage ? { backgroundImage: `url(${session?.creator.profileImage})`} : null;
  const dayOfWeek = format(parsedDate, 'EEEE');
  const displayDate = format(parsedDate, 'P').slice(0, -5);;
  const displayTime = format(parsedDate, "p")

  if (!session) return <li>loading</li>

  return (
    <li onClick={() => navigate(`/sessions/${session.id}`)} className='session_item'>
      <div className='creator'>
        <div className='image' style={backgroundImage} />
        <span>{session.creator.name}</span>
      </div>
      <div className='details'>
        <h2>{session.name}</h2>
      </div>
    </li>
  )
}

export default SessionItem
