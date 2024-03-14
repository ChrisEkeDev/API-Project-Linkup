import React, { useRef, useState } from 'react'
import { getSessionCheckIns } from '../../../store/sessions';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import SessionPlayer from './SessionPlayer';
import SectionContainer from '../../../components/shared/layout/SectionContainer';
import SeeMore from '../../../components/shared/button/SeeMore';

function PlayerCheckIns({handleTab}) {
  const { id } = useParams();
  const {
    data: checkIns,
    error: checkInsErr,
    isLoading: checkInsLoading
  } = useQuery(['session-checkIns', id], () => getSessionCheckIns(id))

  if (checkInsLoading) return <div>Loading..</div>
  if (checkInsErr) return <div>Error</div>

  const checkInsData = checkIns.data;

  let filteredCheckIns = checkInsData.filter(x => x.status !== 'pending')

  return (
    <SectionContainer title={`${filteredCheckIns.length} Player${filteredCheckIns.length !== 1  ? 's' : ''} checked in`}>
      <div className='player_list'>
        {
          filteredCheckIns.slice(0, 5).map((checkIn) => {
            return <SessionPlayer key={checkIn.id} checkIn={checkIn}/>
          })
        }
        {
          filteredCheckIns.length > 5 &&
          <SeeMore action={() => handleTab('attendees')} label={`${filteredCheckIns.length - 5} more`} />
        }
      </div>
    </SectionContainer>
  )
}

export default PlayerCheckIns
