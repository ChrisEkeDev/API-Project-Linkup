import Back from '../../components/shared/button/Back';
import { useApp } from '../../context/AppContext';
import useSession from './hooks/useSession';
import Button from '../../components/shared/button';
import Modal from '../../components/shared/modal';
import SessionPlayer from './components/SessionPlayer';
import Comments from '../../components/comments';
import { TbBallBasketball, TbClock, TbMapPin } from 'react-icons/tb';
import ProfileImage from '../../components/shared/profileImage';
import { format, parseISO } from 'date-fns';


function SingleSession() {
    const { session, checkIns } = useSession();
    const { auth, navigate, isModalOpen, onOpenModal, onCloseModal } = useApp();
    const isCreator = auth?.id == session?.creatorId;




    // const deleteSession = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await dispatch(thunkDeleteSession(session));
    //         if (response.status === 200) {
    //             handleAlerts(deleteSessionSuccess)
    //             navigate("/")
    //         } else {
    //             throw new Error();
    //         }
    //     } catch(error) {
    //         handleAlerts(deleteSessionError);
    //         console.error(error)
    //     } finally {
    //         setLoading(false)
    //     }

    // }

    // const checkIn = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await dispatch(thunkAddCheckIn(session.id));
    //         if (response.status === 201) {
    //             handleAlerts(checkInSuccess)
    //             navigate("/")
    //         } else {
    //             throw new Error();
    //         }
    //     } catch (error) {
    //         handleAlerts(checkInError);
    //         console.error(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }


    if (!session) return <div>Not Found</div>

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
                            label="Check In"
                            // action={}
                        />
                    </>
                }
            </div>
        </header>
        <section className='section scroll'>
            <div className='session_creator'>
                <ProfileImage
                    player={session.creator}
                    size={6}
                />
                <div className='details'>
                    <small>Created By</small>
                    <p>{session.creator?.name}</p>
                </div>
            </div>
            <div className='sessions_info'>
                <div className='grid'>
                    <TbBallBasketball className='icon'/>
                    <div className='details'>
                        <small>What</small>
                        <p className='med'>{session.name}</p>
                    </div>
                </div>
                <div className='grid'>
                    <TbMapPin className='icon'/>
                    <div className='details'>
                        <small>Where</small>
                        <p className='time'>{session.Court?.address}</p>
                    </div>
                </div>
                <div className='grid'>
                    <TbClock className='icon'/>
                    <div className='details'>
                        <small>When</small>
                        <p className='time'>
                            {/* {format(parseISO(session?.startDate), 'EEEE')},
                            {format(parseISO(session?.startDate), 'P').slice(0, -5)} @
                            {format(parseISO(session?.startDate), "p") } */}
                        </p>
                    </div>
                </div>
            </div>
            <div className='session_players'>
                <header className='sub_header'>
                    <h2>Players</h2>
                </header>
                <ul className='checkIn_list'>
                    {
                        checkIns.map(checkIn => (
                            <SessionPlayer checkIn={checkIn}/>
                        ))
                    }
                </ul>
            </div>
            <Comments/>
        </section>
        <Modal
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
        >
                <div>1</div>
        </Modal>
    </main>
    )
}

export default SingleSession
