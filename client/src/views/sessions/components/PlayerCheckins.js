import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import SessionPlayer from './SessionPlayer'
import ClickDragScroll from '../../../components/shared/clickDragScroll';

function PlayerCheckins() {
    const sessionCheckIns = useSelector(state => state.checkIns.sessionCheckIns)
    const sessionCheckInsArr = Object.values(sessionCheckIns)

    return (
      <ClickDragScroll title={`${sessionCheckInsArr.length} Player${sessionCheckInsArr.length !== 1  ? 's' : ''} checked in`}>
        {
          sessionCheckInsArr.map((checkIn) => {
            return <SessionPlayer key={checkIn.id} checkIn={checkIn}/>
          })
        }
      </ClickDragScroll>
    )
}

export default PlayerCheckins
