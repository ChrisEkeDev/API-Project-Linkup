import React, {  useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import LoadingData from '../../components/shared/loading';
import CheckInList from './components/CheckInList';
import CheckInCalendar from './components/CheckInCalendar';
import Scroll from '../../components/shared/scroll'
import CheckInView from './components/CheckInView'
import './styles.scss';
import { getMyCheckIns } from '../../store/auth';
import { useQuery } from 'react-query';
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';

function CheckIns() {
    const [ view, setView ] = useState('calendar');
    const { data: checkIns, error: checkInsErr, isLoading: checkInsLoading} = useQuery('my-check-ins', getMyCheckIns);
    if (checkInsLoading) return <LoadingData/>
    if (checkInsErr) return <div>Error getting your sessions</div>
    const checkInsData = checkIns.data

    return (
        <PageContainer>
            <PageHeader>
                <div className='float_full'>
                    <h2>My CheckIns</h2>
                    <CheckInView {...{ view, setView }} />
                </div>
            </PageHeader>
            <Scroll>
                <AnimatePresence>
                    {
                        view === "calendar" ?
                        <CheckInCalendar checkIns={checkInsData} /> :
                        <CheckInList checkIns={checkInsData}/>
                    }
                </AnimatePresence>
            </Scroll>
        </PageContainer>
    )
}


export default CheckIns
