import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import LoadingData from '../../components/shared/loading';
import CheckInList from './components/CheckInList';
import CheckInCalendar from './components/CheckInCalendar';
import Scroll from '../../components/shared/scroll'
import CheckInView from './components/CheckInView'
import './styles.scss';
import { page_transitions } from '../../constants/animations';
import { useApp } from '../../context/AppContext';
import { useSelector } from 'react-redux';
import { thunkGetPlayerCheckIns } from '../../store/checkins';

function CheckIns({checkInsData}) {
    const checkIns = Object.values(checkInsData);
    const [ view, setView ] = useState('calendar');

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
                        <CheckInCalendar checkIns={checkIns} /> :
                        <CheckInList checkIns={checkIns}/>
                    }
                </AnimatePresence>
            </Scroll>
        </motion.main>
    )
}


function CheckInsWrapper() {
    const { dispatch } = useApp();
    const checkIns = useSelector(state => state.checkIns.playerCheckIns)
    const [ loading, setLoading ] = useState(true)


    useEffect(() => {
        const loadCheckIns = async () => {
            try {
                const checkInData = await dispatch(thunkGetPlayerCheckIns())
                if (checkInData.status === 200) setLoading(false)
            } catch(e) {
                console.log(e)
            }
        }

        loadCheckIns();
    }, [dispatch])

    if (loading) return <LoadingData/>

    return (
        <CheckIns checkInsData={checkIns} />
    )
}
export default CheckInsWrapper
