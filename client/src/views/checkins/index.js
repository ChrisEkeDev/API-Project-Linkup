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
import { thunkGetMyCheckIns } from '../../store/checkins';

function CheckIns() {
    const myCheckIns = useSelector(state => state.checkIns.myCheckIns)
    const myCheckInsArr = Object.values(myCheckIns);
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
                        <CheckInCalendar checkIns={myCheckInsArr} /> :
                        <CheckInList checkIns={myCheckInsArr}/>
                    }
                </AnimatePresence>
            </Scroll>
        </motion.main>
    )
}


function CheckInsWrapper() {
    const { dispatch } = useApp();

    const [ loading, setLoading ] = useState(true)


    useEffect(() => {
        const loadCheckIns = async () => {
            try {
                const myCheckInData = await dispatch(thunkGetMyCheckIns())
                if (myCheckInData.status === 200 && myCheckInData) setLoading(false)
            } catch(e) {
                console.log(e)
            }
        }

        loadCheckIns();
    }, [dispatch])

    if (loading) return <LoadingData/>

    return (
        <CheckIns />
    )
}
export default CheckInsWrapper
