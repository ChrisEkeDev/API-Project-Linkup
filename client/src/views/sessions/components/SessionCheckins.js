import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CheckInItem from './CheckInItem'
import { getSessionCheckIns } from '../../../store/sessions';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Scroll from '../../../components/shared/scroll';
import { statusOrderAttendance } from '../../../constants/constants'
import LoadingData from '../../../components/shared/loading';
import SectionContainer from '../../../components/shared/layout/SectionContainer';

function SessionCheckIns({status, isCreator}) {
    const { id } = useParams();
    const { data: checkIns, error: checkInsErr, isLoading: checkInsLoading } = useQuery(['session-checkIns', id], () => getSessionCheckIns(id))

    if (checkInsLoading) return <LoadingData />
    if (checkInsErr) return <div>Error</div>

    const checkInsData = checkIns.data
    const sortedCheckIns = checkInsData.sort((a, b) => {
        return statusOrderAttendance[a.status] - statusOrderAttendance[b.status]
    })

    let filteredCheckIns = sortedCheckIns;
    if (!isCreator) {
        filteredCheckIns = sortedCheckIns.filter(x => x.status !== 'pending')
    }


    return (
        <Scroll>
            <SectionContainer title={`${filteredCheckIns.length} Player${filteredCheckIns.length === 1 ? '' : 's'} checked in`}>
                <ul>
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
                </ul>
            </SectionContainer>
        </Scroll>
    )
}

export default SessionCheckIns
