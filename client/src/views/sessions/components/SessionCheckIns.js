import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SessionPlayer from './SessionPlayer'
import { parent_variants } from '../../../constants/animations'
import ClickDragScroll from '../../../components/shared/clickDragScroll';

function SessionCheckIns({checkIns}) {

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

export default SessionCheckIns
