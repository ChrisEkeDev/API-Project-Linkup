import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import LoadingData from '../../components/shared/loading';
import CheckInList from './components/CheckInList';
import CheckInCalendar from './components/CheckInCalendar';
import './styles.scss';
import { page_transitions } from '../../constants/animations';
import { useApp } from '../../context/AppContext';
import Scroll from '../../components/shared/scroll';
import CheckInView from './components/CheckInView';
import { useSelector } from 'react-redux';
import { thunkGetPlayerCheckIns } from '../../store/checkins';

function CheckIns({checkInsData}) {
    const [view, setView] = useState('list');
    const checkIns = Object.values(checkInsData)

    return (
        <motion.main {...page_transitions} className='page page_w_title'>
            <div className='page_container'>
                <header className='page_header'>
                    <h2>Check Ins</h2>
                    <CheckInView {...{view, setView}} />
                </header>
                <Scroll>
                    <AnimatePresence>
                        {
                            view === 'list' ?
                            <CheckInList checkIns={checkIns} /> :
                            <CheckInCalendar checkIns={checkIns} />
                        }
                    </AnimatePresence>
                </Scroll>
            </div>
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
