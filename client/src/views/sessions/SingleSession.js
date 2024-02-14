import Back from '../../components/shared/button/Back';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/shared/button';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { getSession, getSessionCheckInStatus } from '../../store/sessions';
import { useParams } from 'react-router-dom';
import SessionCheckins from './components/SessionCheckins';
import SessionDetails from './components/SessionDetails';
import SessionFeed from './components/SessionFeed';
import LoadingData from '../../components/shared/loading';
import { base_animations, child_variants, parent_variants } from '../../constants/animations';
import CountDown from '../../components/countdown';
import { CgSpinner } from 'react-icons/cg';
import { TbUserMinus, TbUserPlus, TbEditCircle, TbLock, TbLockOpen } from 'react-icons/tb';
import useCheckIn from './hooks/useCheckIn';


function SingleSession() {
    const { id } = useParams();
    const [tabView, setTabView ] = useState('details')
    const { auth, navigate } = useApp();
    const { data: session, error: sessionErr, isLoading: sessionLoading } = useQuery(['session', id], () => getSession(id));
    const { data: checkIn, isLoading: checkInStatusLoading } = useQuery(['check-in-status'], () => getSessionCheckInStatus(id))
    const { onCheckIn, onCheckOut, checkInLoading, checkOutLoading } = useCheckIn()

    if (sessionLoading) return <LoadingData />

    const sessionData = session?.data;
    const checkInData = checkIn?.data;
    const isCreator = auth?.id === sessionData?.creator.id;

    return (
        <motion.main {...base_animations} className='page sessions'>
            <motion.header variants={child_variants} className='header'>
                <div className="flex">
                    <Back />
                    {
                        sessionData?.private ?
                        <TbLock title='Private' className='team_privacy_icon'/> :
                        <TbLockOpen title='Public' className='team_privacy_icon'/>
                    }
                    <p className="lg bold">{sessionData?.name}</p>
                </div>
                <div className='actions'>
                    <CountDown endTime={sessionData.startDate} expires={sessionData.endDate} />
                    {
                        auth && (
                            isCreator ?
                            <Button
                                styles='secondary'
                                label="Edit Session"
                                icon={TbEditCircle}
                                action={() => navigate(`/sessions/${sessionData.id}/update`)}
                            /> :
                            <Button
                                styles={
                                    checkInData ?
                                    checkInData === 'pending'
                                    ? 'secondary'
                                    : 'secondary'
                                    : 'primary'
                                }
                                icon={
                                    checkInLoading || checkOutLoading ?
                                    CgSpinner :
                                    checkInData ?
                                    checkInData === 'pending' ?
                                    CgSpinner :
                                    TbUserMinus :
                                    TbUserPlus
                                  }
                                label={
                                    checkInLoading ?
                                    'Checking In...' :
                                    checkOutLoading ?
                                    'Checking Out...' :
                                    checkInData ?
                                    checkInData === 'pending' ?
                                    'Awaiting Approval' :
                                    'Leave Session':
                                    'Join Session'
                                }
                                action={checkInData ? onCheckOut : onCheckIn }
                                loading={checkInData === 'pending' || checkInLoading || checkOutLoading }
                            />
                        )
                    }
                </div>
            </motion.header>
            <header className='tab_header'>
                <div className='float_left tabs'>
                    <p className={`tab bold ${tabView === 'details' && 'active-tab'}`} onClick={() => setTabView('details')}>Details</p>
                    <p className={`tab bold ${tabView === 'feed' && 'active-tab'}`} onClick={() => setTabView('feed')}>Live Chat</p>
                    <p className={`tab bold ${tabView === 'attendees' && 'active-tab'}`} onClick={() => setTabView('attendees')}>Attendees</p>
                </div>
                <div className='float_right'>
                </div>
            </header>
            <motion.section variants={parent_variants} {...base_animations} className='section scroll'>
                {
                    tabView === 'details' ?
                    <SessionDetails session={sessionData} /> :
                    tabView === 'feed' ?
                    <SessionFeed session={sessionData} /> :
                    <SessionCheckins status={checkInData} isCreator={isCreator} />
                }
            </motion.section>
    </motion.main>
    )
}

export default SingleSession
