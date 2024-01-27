import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CheckInItem from './CheckInItem'
import { getSessionCheckIns } from '../../../store/sessions';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Scroll from '../../../components/shared/scroll';
import { statusOrderAttendance } from '../../../constants/constants'
import LoadingData from '../../../components/shared/loading';

function SessionCheckIns({status, isCreator}) {
    const { id } = useParams();
    const { data: checkIns, error: checkInsErr, isLoading: checkInsLoading } = useQuery(['session-checkIns', id], () => getSessionCheckIns(id))

    if (checkInsLoading) return <LoadingData />
    if (checkInsErr) return <div>Error</div>

    const sortedCheckIns = checkIns.sort((a, b) => {
        return statusOrderAttendance[a.status] - statusOrderAttendance[b.status]
    })

    let filteredCheckIns = sortedCheckIns;
    if (!isCreator) {
        filteredCheckIns = sortedCheckIns.filter(x => x.status !== 'pending')
    }


    return (
        <Scroll>
            <motion.ul className='members_list container_border'>
            <span className='section_label xs bold'>{filteredCheckIns.length} Player{filteredCheckIns.length === 1 ? '' : 's'} checked in</span>
                    <AnimatePresence>
                        {
                            filteredCheckIns.map(checkIn => (
                                <CheckInItem
                                    key={checkIn.id}
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

export default SessionCheckIns
