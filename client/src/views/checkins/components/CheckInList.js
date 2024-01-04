import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CheckInListItem from './CheckInListItem'

function CheckInList({checkIns}) {
  return (
    <motion.section className='check_ins_list_wrapper'>
        <span className='section_label xs bold'>{checkIns.length} Check Ins</span>
        <ul className='check_ins_list'>
            <AnimatePresence>
                {
                    checkIns.map(checkIn => (
                        <CheckInListItem key={checkIn.id} checkIn={checkIn}/>
                    ))
                }
            </AnimatePresence>
        </ul>
    </motion.section>
  )
}

export default CheckInList
