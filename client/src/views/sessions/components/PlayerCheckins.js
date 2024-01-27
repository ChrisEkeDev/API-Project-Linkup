import React, { useRef, useState } from 'react'
import { getSessionCheckIns } from '../../../store/sessions';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import SessionPlayer from './SessionPlayer'
import ClickDragScroll from '../../../components/shared/clickDragScroll';

function PlayerCheckIns() {
  const { id } = useParams();
  const {
    data: checkIns,
    error: checkInsErr,
    isLoading: checkInsLoading
  } = useQuery(['session-checkIns', id], () => getSessionCheckIns(id))

  if (checkInsLoading) return <div>Loading..</div>
  if (checkInsErr) return <div>Error</div>

  return (
    <ClickDragScroll title={`${checkIns.length} Player${checkIns.length !== 1  ? 's' : ''} checked in`}>
      {
        checkIns.map((checkIn) => {
          return <SessionPlayer key={checkIn.id} checkIn={checkIn}/>
        })
      }
    </ClickDragScroll>
  )
}

export default PlayerCheckIns
