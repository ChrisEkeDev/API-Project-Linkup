import Back from '../../components/shared/button/Back';
import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import useCheckIns from './hooks/useCheckIns';
import Button from '../../components/shared/button';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { thunkGetSingleSession } from '../../store/sessions';
import { thunkGetSessionFeed } from '../../store/chats';
import { thunkGetSessionCheckIns } from '../../store/checkins';
import { useParams } from 'react-router-dom';
import SessionCheckins from './components/SessionCheckins';
import SessionDetails from './components/SessionDetails';
import SessionFeed from './components/SessionFeed';
import LoadingData from '../../components/shared/loading';
import { PiLockFill, PiLockOpenBold, PiXBold, PiUserPlusFill , PiUserMinusBold, PiPencilSimpleLineFill, PiTrashBold  } from 'react-icons/pi'
import { base_animations, child_variants, parent_variants } from '../../constants/animations';
import CountDown from '../../components/countdown';
import { CgSpinner } from 'react-icons/cg';


function SingleSession({session}) {
    const myCheckIns = useSelector(state => state.checkIns.myCheckIns);
    const myCheckInsArr = Object.values(myCheckIns)
    const [tabView, setTabView ] = useState('details')
    const { checkIn, checkOut } = useCheckIns();
    const { auth, navigate } = useApp();
    const isCreator = auth?.id == session?.creatorId;
    const isCheckedIn = myCheckInsArr.find(checkin => checkin.sessionId === session.id);

    console.log(isCheckedIn)

    return (
        <motion.main {...base_animations} className='page sessions'>
            <motion.header variants={child_variants} className='header'>
                <div className="flex">
                    <Back />
                    {
                        session.private ?
                        <PiLockFill title='Private' className='team_privacy_icon'/> :
                        <PiLockOpenBold title='Public' className='team_privacy_icon'/>
                    }
                    <p className="lg bold">{session.name}</p>
                </div>
                <div className='actions'>
                    <CountDown endTime={session.startDate} expires={session.endDate} />
                    {
                        isCreator ?
                        <Button
                            styles='secondary'
                            label="Edit Session"
                            icon={PiPencilSimpleLineFill}
                            action={() => navigate(`/sessions/${session.id}/update`)}
                        /> :
                        <Button
                            styles={
                                isCheckedIn ?
                                isCheckedIn?.status === 'pending'
                                ? 'secondary'
                                : 'secondary'
                                : 'primary'
                            }
                            icon={
                                isCheckedIn ?
                                isCheckedIn?.status === 'pending'
                                ? CgSpinner
                                : PiUserMinusBold
                                : PiUserPlusFill
                              }
                            label={isCheckedIn ?
                                isCheckedIn?.status === 'pending'
                                ? 'Awaiting Approval'
                                : 'Leave Session'
                                : 'Join Session'
                            }
                            action={isCheckedIn ? checkOut : checkIn}
                            loading={isCheckedIn?.status === 'pending'}
                        />
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
                    tabView === 'feed' ?
                    <SessionFeed /> :
                    tabView === 'details' ?
                    <SessionDetails /> :
                    <SessionCheckins isCheckedIn={isCheckedIn} isCreator={isCreator} />
                }
            </motion.section>
    </motion.main>
    )
}


function SingleSessionWrapper() {
    const { id } = useParams();
    const { dispatch } = useApp();
    const [ loading, setLoading ] = useState(true);
    const singleSession = useSelector(state => state.sessions.singleSession);
    const sessionCheckIns = useSelector(state => state.checkIns.sessionCheckIns)
    const sessionFeed = useSelector(state => state.chats.sessionFeed)

    useEffect(() => {
        const loadSession = async () => {
            try {
                const singleSessionData = await dispatch(thunkGetSingleSession(id));
                const sessionCheckInData = await dispatch(thunkGetSessionCheckIns(id))
                const sessionFeedData = await dispatch(thunkGetSessionFeed(id))
                if (
                    singleSessionData.status === 200 && singleSession
                    && sessionCheckInData.status === 200 && sessionCheckIns
                    && sessionFeedData.status === 200 && sessionFeed) {
                    setLoading(false);
                }
            } catch(e) {
                console.log(e)
            }
        }
        loadSession();

    }, [dispatch, id])

    if (loading) return <LoadingData/>

    return (
        <SingleSession session={singleSession} checkIns={sessionCheckIns} feed={sessionFeed}/>
    )
}

export default SingleSessionWrapper
