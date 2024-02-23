import React from 'react'
import { AnimatePresence } from 'framer-motion'
import CheckInListItem from './CheckInListItem'
import SectionContainer from '../../../components/shared/layout/SectionContainer'
import List from '../../../components/shared/layout/List'

function CheckInList({checkIns}) {
  return (
    <SectionContainer title={`${checkIns.length} Check Ins`}>
        <List>
            <AnimatePresence>
                {
                    checkIns.map(checkIn => (
                        <CheckInListItem key={checkIn.id} checkIn={checkIn}/>
                    ))
                }
            </AnimatePresence>
        </List>
    </SectionContainer>
  )
}

export default CheckInList
