import Back from '../../components/shared/button/Back';
import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import useSession from './hooks/useSession';
import Button from '../../components/shared/button';
import Modal from '../../components/shared/modal';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { thunkGetSingleSession } from '../../store/sessions';
import { thunkGetSessionFeed } from '../../store/chats';
import { thunkGetSessionCheckIns } from '../../store/checkins';
import { useParams } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import SessionInformation from './components/SessionInformation';
import SessionDetails from './components/SessionDetails';

import SessionFeed from './components/SessionFeed';
import LoadingData from '../../components/shared/loading';
import { PiLockFill, PiLockOpenBold, PiXBold, PiUserPlusFill , PiUserMinusBold, PiPencilSimpleLineFill, PiTrashBold  } from 'react-icons/pi'
import { base_animations, child_variants, parent_variants } from '../../constants/animations';
import CountDown from '../../components/countdown';


function SingleSession({session}) {
    const [tabView, setTabView ] = useState('details')
    const { deleteSession, checkIn, checkOut } = useSession(session);
    const checkInsData = useSelector(state => state.checkIns.sessionCheckIns);
    const checkIns = Object.values(checkInsData)
    const { auth, navigate } = useApp();
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();
    const isCreator = auth?.id == session?.creatorId;
    const isCheckedIn = checkIns.filter(checkin => checkin.playerId === auth.id).length > 0;

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
                            styles='primary'
                            icon={isCheckedIn ? PiUserMinusBold : PiUserPlusFill  }
                            label={isCheckedIn ? "Check Out" : "Check In"}
                            action={isCheckedIn ? checkOut : checkIn}
                        />
                    }
                </div>
            </motion.header>
            <header className='tab_header'>
                <div className='float_left tabs'>
                    <p className={`tab bold ${tabView === 'details' && 'active-tab'}`} onClick={() => setTabView('details')}>Details</p>
                    <p className={`tab bold ${tabView === 'feed' && 'active-tab'}`} onClick={() => setTabView('feed')}>Live Chat</p>
                </div>
                <div className='float_right'>
                </div>
            </header>
            <motion.section variants={parent_variants} {...base_animations} className='section scroll'>
                {
                    tabView === 'feed' ?
                    <SessionFeed />:
                    <SessionDetails />
                }
            </motion.section>
        <Modal
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
        >
            <div className='modal_container'>
                <h2 className='md modal_title'>Are you sure you want to delete this session?</h2>
                <SessionInformation session={session} />
                <div className='modal_actions'>
                    <Button
                        label="Keep Session"
                        styles="tertiary"
                        icon={PiXBold}
                        action={onCloseModal}
                    />
                    <Button
                        label="Delete Session"
                        styles="warning"
                        icon={PiTrashBold}
                        action={deleteSession}
                    />
                </div>
            </div>
        </Modal>
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
