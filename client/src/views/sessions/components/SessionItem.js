import React from 'react'
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../../components/shared/profileImage';
import { format, parseISO } from 'date-fns';
import '../styles.scss';
import { TbArrowRight } from 'react-icons/tb';

function SessionItem({session}) {
  const { navigate } = useApp();
  const parsedDate = parseISO(session?.startDate);
  const dayOfWeek = format(parsedDate, 'EEEE');
  const displayDate = format(parsedDate, 'P').slice(0, -5);
  const displayTime = format(parsedDate, "p");

  if (!session) return <li>loading</li>

  return (
    <li onClick={() => navigate(`/sessions/${session.id}`)} className='session_item'>
      <div className='creator'>
        <ProfileImage
          player={session.creator}
        />
        <div className='details'>
          <small>Created By</small>
          <p>{session.creator.name}</p>
        </div>
      </div>
      <div className='player_count'>
        <h2 className='count'>{session.CheckIns.length}</h2>
        <small>Players</small>
      </div>
      <div className='details'>
        <p className='grey'>{session.name}</p>
        <p className='gold'>{dayOfWeek}, {displayDate} @ {displayTime}</p>
        <p>{session.Court.address}</p>
      </div>
      <TbArrowRight className='session_arrow'/>
    </li>
  )
}

export default SessionItem
