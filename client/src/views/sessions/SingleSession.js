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
    const isCreator = auth?.id === session?.creator.id;

    if (sessionLoading) return <LoadingData />

    return (
        <motion.main {...base_animations} className='page sessions'>
            <motion.header variants={child_variants} className='header'>
                <div className="flex">
                    <Back />
                    {
                        session?.private ?
                        <TbLock title='Private' className='team_privacy_icon'/> :
                        <TbLockOpen title='Public' className='team_privacy_icon'/>
                    }
                    <p className="lg bold">{session?.name}</p>
                </div>
                <div className='actions'>
                    <CountDown endTime={session.startDate} expires={session.endDate} />
                    {
                        auth && (
                            isCreator ?
                            <Button
                                styles='secondary'
                                label="Edit Session"
                                icon={TbEditCircle}
                                action={() => navigate(`/sessions/${session.id}/update`)}
                            /> :
                            <Button
                                styles={
                                    checkIn ?
                                    checkIn === 'pending'
                                    ? 'secondary'
                                    : 'secondary'
                                    : 'primary'
                                }
                                icon={
                                    checkInLoading || checkOutLoading ?
                                    CgSpinner :
                                    checkIn ?
                                    checkIn === 'pending' ?
                                    CgSpinner :
                                    TbUserMinus :
                                    TbUserPlus
                                  }
                                label={
                                    checkInLoading ?
                                    'Checking In...' :
                                    checkOutLoading ?
                                    'Checking Out...' :
                                    checkIn ?
                                    checkIn === 'pending' ?
                                    'Awaiting Approval' :
                                    'Leave Session':
                                    'Join Session'
                                }
                                action={checkIn ? onCheckOut : onCheckIn }
                                loading={checkIn === 'pending' || checkInLoading || checkOutLoading }
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
                    <SessionDetails session={session} /> :
                    tabView === 'feed' ?
                    <SessionFeed session={session} /> :
                    <SessionCheckins status={checkIn} isCreator={isCreator} />
                }
            </motion.section>
    </motion.main>
    )
}

export default SingleSession
