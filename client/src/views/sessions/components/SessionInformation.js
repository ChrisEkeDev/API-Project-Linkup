import React from 'react'
import ProfileImage from '../../../components/shared/profileImage'
import { format, parseISO } from 'date-fns';

function SessionInformation({session}) {
    const parsedDate = parseISO(session?.startDate);
    const formattedTime = format(parsedDate, 'MM/dd @ h:mm a');
  return (
    <div className='session_information'>
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
            <h2 className='count accent'>{session.CheckIns.length}</h2>
            <small>Players</small>
        </div>
    </div>
  )
}

export default SessionInformation
