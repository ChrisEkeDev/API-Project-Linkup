import Back from '../../components/shared/button/Back';
import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import useSession from './hooks/useSession';
import Button from '../../components/shared/button';
import Modal from '../../components/shared/modal';
import Comments from '../../components/comments';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { thunkGetSingleSession } from '../../store/sessions';
import { useParams } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import { thunkGetSessionCheckIns } from '../../store/checkins';
import SessionInformation from './components/SessionInformation';
import SessionCheckIns from './components/SessionCheckIns';
import LoadingData from '../../components/shared/loading';
import Scroll from '../../components/shared/scroll';
import { TbEditCircle, TbUserCheck , TbTrashFilled, TbUserX, TbX  } from 'react-icons/tb'
import { base_animations, base_variants, child_variants, page_transitions, parent_variants } from '../../constants/animations';
import { format } from 'date-fns';
import CountDown from '../../components/countdown';


function SingleSession({session}) {
    const { deleteSession, checkIn, checkOut } = useSession(session);
    const checkInsData = useSelector(state => state.checkIns.sessionCheckIns);
    const checkIns = Object.values(checkInsData)
    const { auth, navigate, currentTime } = useApp();
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();
    const isCreator = auth?.id == session?.creatorId;
    const isCheckedIn = checkIns.filter(checkin => checkin.playerId === auth.id).length > 0;

    return (
        <motion.main {...base_animations} className='page single_session'>
            <motion.header variants={child_variants} className='header'>
                <Back route={`/sessions`}/>
                <div className='actions'>
                    <CountDown endTime={session.startDate} expires={session.endDate} />
                    {
                        isCreator ?
                        <>
                            <Button
                                styles='secondary'
                                label="Edit Session"
                                icon={TbEditCircle}
                                action={() => navigate(`/sessions/${session.id}/update`)}
                            />
                            <Button
                                styles='tertiary'
                                icon={TbTrashFilled}
                                label="Delete Session"
                                action={onOpenModal}
                            />
                        </> :
                        <>
                            <Button
                                styles='primary'
                                icon={isCheckedIn ? TbUserX : TbUserCheck }
                                label={isCheckedIn ? "Check Out" : "Check In"}
                                action={isCheckedIn ? checkOut : checkIn}
                            />
                        </>
                    }
                </div>
            </motion.header>
            <Scroll>
                <motion.section variants={parent_variants} {...base_animations} className='section scroll'>
                    <motion.div variants={child_variants}>
                        <SessionInformation session={session}/>
                    </motion.div>
                    <motion.div variants={child_variants}>
                        <SessionCheckIns checkIns={checkIns}/>
                    </motion.div>
                    <motion.div variants={child_variants}>
                        <Comments/>
                    </motion.div>
                </motion.section>
            </Scroll>

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
                        icon={TbX}
                        action={onCloseModal}
                    />
                    <Button
                        label="Delete Session"
                        styles="warning"
                        icon={TbTrashFilled}
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
    const session = useSelector(state => state.sessions.singleSession);

    useEffect(() => {
        const loadSession = async () => {
            try {
                const sessionData = await dispatch(thunkGetSingleSession(id));
                const checkInData = await dispatch(thunkGetSessionCheckIns(id))
                if (sessionData.status === 200 && checkInData.status === 200 && session) {
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
        <SingleSession session={session}/>
    )
}

export default SingleSessionWrapper
