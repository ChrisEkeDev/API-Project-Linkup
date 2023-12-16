import Back from '../../components/shared/button/Back';
import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import useSession from './hooks/useSession';
import Button from '../../components/shared/button';
import Modal from '../../components/shared/modal';
import Comments from '../../components/comments';
import { useSelector } from 'react-redux';
import { thunkGetSingleSession } from '../../store/sessions';
import { useParams } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import { thunkGetCheckIns } from '../../store/checkins';
import SessionInformation from './components/SessionInformation';
import SessionCheckIns from './components/SessionCheckIns';
import LoadingData from '../../components/shared/loading';


function SingleSession({session}) {
    const { deleteSession, checkIn, checkOut } = useSession(session);
    const checkInsData = useSelector(state => state.checkIns.sessionCheckIns);
    const checkIns = Object.values(checkInsData)
    const { auth, navigate } = useApp();
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();
    const isCreator = auth?.id == session?.creatorId;
    const isCheckedIn = checkIns.filter(checkin => checkin.playerId === auth.id).length > 0;

    return (
        <main className='page single-session'>
        <header className='header'>
            <Back/>
            <div className='actions'>
                {
                    isCreator ?
                    <>
                        <Button
                            styles=''
                            label="Edit Session"
                            action={() => navigate(`/sessions/${session.id}/update`)}
                        />
                        <Button
                            styles=''
                            label="Delete Session"
                            action={onOpenModal}
                        />
                    </> :
                    <>
                        <Button
                            styles=''
                            label={isCheckedIn ? "Check Out" : "Check In"}
                            action={isCheckedIn ? checkOut : checkIn}
                        />
                    </>
                }
            </div>
        </header>
        <section className='section scroll'>
            <SessionInformation session={session}/>
            <SessionCheckIns checkIns={checkIns}/>
            <Comments/>
        </section>
        <Modal
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
        >
            <h2>Are you sure you want to delete this session?</h2>
            <div className='deleting_session'>
                <SessionInformation session={session}/>
                <SessionCheckIns checkIns={checkIns}/>
            </div>
            <div className='modal_actions'>
                <Button
                    label="Keep Session"
                    styles=""
                    action={onCloseModal}
                />
                <Button
                    label="Delete Session"
                    styles=""
                    action={deleteSession}
                />
            </div>
        </Modal>
    </main>
    )
}


function SingleSessionWrapper() {
    const { id } = useParams();
    const { dispatch } = useApp();
    const [ loading, setLoading ] = useState(true);
    const session = useSelector(state => state.sessions.singleSession);

    useEffect(() => {
        const getSession = async () => {
            try {
                const res = await dispatch(thunkGetSingleSession(id));
                const res2 = await dispatch(thunkGetCheckIns(id))
                if (res.status === 200 && res2.status === 200 && session) {
                    setLoading(false);
                }
            } catch(e) {
                console.log(e)
            }
        }
        getSession();

    }, [dispatch, id])

    if (loading) return <LoadingData/>

    return (
        <SingleSession session={session}/>
    )
}

export default SingleSessionWrapper
