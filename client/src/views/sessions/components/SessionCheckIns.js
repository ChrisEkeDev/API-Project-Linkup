import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SessionPlayer from './SessionPlayer'
import { parent_variants } from '../../../constants/animations'

function SessionCheckIns({checkIns}) {
  return (
    <div className='session_players'>
      <span className='section_label xs bold'>{checkIns.length} Players </span>
        <ul className='checkIn_list'>
          <AnimatePresence>
            {
                checkIns.map(checkIn => (
                    <SessionPlayer key={checkIn.id} checkIn={checkIn}/>
                ))
            }
          </AnimatePresence>
        </ul>
    </div>
  )
}

export default SessionCheckIns
