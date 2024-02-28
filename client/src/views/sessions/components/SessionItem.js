import React from 'react'
import { motion } from 'framer-motion';
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../../components/shared/profileImage';
import { child_variants } from '../../../constants/animations';
import { format, parseISO } from 'date-fns';
import useMap from '../../map/hooks/useMap';
import '../styles.scss';

function SessionItem({session}) {
  const { theme } = useApp();
  const { handleMapFocus } = useMap();
  const parsedDate = parseISO(session?.startDate);
  const formattedTime = format(parsedDate, 'MM/dd @ p');

  const handleNavigate = () => {
    handleMapFocus(session)
  }

  return (
    <motion.li variants={child_variants} onClick={handleNavigate} className={`session_item session_item-${theme}`}>
      <div className='float_left'>
        <ProfileImage
          player={session.creator}
        />
        <div>
          <p className='sm bold'>{session.name} <span className='reg'> | {session.creator.name}</span></p>
          <p className='sm'>{session.address}</p>
          <p className='md bold accent'>{formattedTime}</p>
        </div>
      </div>
      <div className='player_count'>
        <h2 className='count accent'>{session.checkIns}</h2>
        <small>Players</small>
      </div>
    </motion.li>
  )
}

export default SessionItem
