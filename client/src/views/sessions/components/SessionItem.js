import React from 'react'
import { motion } from 'framer-motion';
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../../components/shared/profileImage';
import { child_variants } from '../../../constants/animations';
import { format, parseISO } from 'date-fns';
import '../styles.scss';

function SessionItem({session}) {
  const { navigate, setCurrentLocation } = useApp();
  const parsedDate = parseISO(session?.startDate);
  const formattedTime = format(parsedDate, 'MM/dd @ h:mm a');

  if (!session) return <li>loading</li>

  const handleNavigate = () => {
    setCurrentLocation({lat: session.Court.lat, lng: session.Court.lng})
    navigate(`/sessions/${session.id}`)
  }

  return (
    <motion.li variants={child_variants} onClick={handleNavigate} className='session_item'>
      <div className='float_left'>
        <ProfileImage
          player={session.creator}
        />
        <div className='session_details'>
          <p className='sm'>{session.name} by <span className='bold'>{session.creator.name}</span></p>
          <p className='sm bold'>{session.Court.address}</p>
          <p className='sm bold'></p>
          <p className='md bold accent'>{formattedTime}</p>
        </div>
        </div>
      <div className='player_count'>
        <h2 className='count accent'>{session.checkInCount}</h2>
        <small>Players</small>
      </div>
    </motion.li>
  )
}

export default SessionItem
