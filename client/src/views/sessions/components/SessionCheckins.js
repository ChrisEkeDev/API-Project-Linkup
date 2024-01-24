import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CheckInItem from './CheckInItem'
import { useSelector } from 'react-redux';
import Scroll from '../../../components/shared/scroll';
import { statusOrderAttendance } from '../../../constants/constants'

function SessionCheckins({isCheckedIn, isCreator}) {
    const sessionCheckIns = useSelector(state => state.checkIns.sessionCheckIns)
    const sessionCheckInsArr = Object.values(sessionCheckIns);

    const sortedCheckIns = sessionCheckInsArr.sort((a, b) => {
        return statusOrderAttendance[a.status] - statusOrderAttendance[b.status]
    })

    let filteredCheckIns = sortedCheckIns;
    if (!isCreator) {
        filteredCheckIns = sortedCheckIns.filter(x => x.status !== 'pending')
    }


    return (
        <Scroll>
            <motion.ul className='members_list container_border'>
            <span className='section_label xs bold'>{sessionCheckInsArr.length} Player{sessionCheckInsArr.length === 1 ? '' : 's'} checked in</span>
                    <AnimatePresence>
                        {
                            filteredCheckIns.map(checkIn => (
                                <CheckInItem
                                    key={checkIn.id}
                                    isCheckedIn={isCheckedIn}
                                    isCreator={isCreator}
                                    checkIn={checkIn}
                                />
                            ))
                        }
                    </AnimatePresence>
            </motion.ul>
        </Scroll>
    )
}

export default SessionCheckins
