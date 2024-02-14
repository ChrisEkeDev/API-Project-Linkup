import React, {  useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import LoadingData from '../../components/shared/loading';
import CheckInList from './components/CheckInList';
import CheckInCalendar from './components/CheckInCalendar';
import Scroll from '../../components/shared/scroll'
import CheckInView from './components/CheckInView'
import './styles.scss';
import { page_transitions } from '../../constants/animations';
import { getMyCheckIns } from '../../store/auth';
import { useQuery } from 'react-query';

function CheckIns() {
    const [ view, setView ] = useState('calendar');
    const { data: checkIns, error: checkInsErr, isLoading: checkInsLoading} = useQuery('my-check-ins', getMyCheckIns);
    if (checkInsLoading) return <LoadingData/>
    if (checkInsErr) return <div>Error getting your sessions</div>
    const checkInsData = checkIns.data

    return (
        <motion.main {...page_transitions} className='page checkins'>
            <header className='page_header'>
                <h2>My CheckIns</h2>
                <CheckInView {...{ view, setView }} />
            </header>
            <Scroll>
                <AnimatePresence>
                    {
                        view === "calendar" ?
                        <CheckInCalendar checkIns={checkInsData} /> :
                        <CheckInList checkIns={checkInsData}/>
                    }
                </AnimatePresence>
            </Scroll>
        </motion.main>
    )
}


export default CheckIns
