import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { thunkDeleteSession, thunkGetSingleSession } from '../Store/sessions';
import { useDispatch } from 'react-redux';
import Button from "../Shared/components/Button"
import useGetSession from './hooks/useGetSession';
import DataLoading from '../App/Loading/DataLoading';
import { TbArrowLeft, TbCheck, TbEdit, TbTrash } from 'react-icons/tb';
import { useApp } from '../App/Context/AppContext';
import { sessionsAlerts } from '../Shared/constants/alertData';
import Players from '../Players';
import Modal from '../App/Modals';
import { thunkAddCheckIn } from '../Store/checkins';
import Comments from '../Comments';
import Back from '../Shared/components/Button/Back';
import SessionCreator from './SessionCreator';
import SessionDetails from './SessionDetails';
import PageWrapper from '../Shared/components/Layout/PageWrapper';
import SectionHeader from '../Shared/components/Layout/SectionHeader';
import PageSection from '../Shared/components/Layout/PageSection';

function SessionPage() {
    const { id } = useParams();
    const  { handleAlerts, navigate, setLoading } = useApp();
    const [ data, loading ] = useGetSession(id);
    const [ deleteSessionModal, setDeleteSessionModal ] = useState(false);
    const [ checkInModal, setCheckInModal ] = useState(false);
    const player = useSelector(state => state.auth.player)
    const session = useSelector(state => state.sessions.singleSession);
    const isCreator = player?.id == session?.creatorId;
    const { deleteSessionSuccess, deleteSessionError, checkInSuccess, checkInError } = sessionsAlerts;
    const dispatch = useDispatch();




    const deleteSession = async () => {
        setLoading(true)
        try {
            const response = await dispatch(thunkDeleteSession(session));
            if (response.status === 200) {
                handleAlerts(deleteSessionSuccess)
                navigate("/")
            } else {
                throw new Error();
            }
        } catch(error) {
            handleAlerts(deleteSessionError);
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    const checkIn = async () => {
        setLoading(true);
        try {
            const response = await dispatch(thunkAddCheckIn(session.id));
            if (response.status === 201) {
                handleAlerts(checkInSuccess)
                navigate("/")
            } else {
                throw new Error();
            }
        } catch (error) {
            handleAlerts(checkInError);
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


    if (loading) return <DataLoading/>
    if (data === false || !session ) return <div>Not Found</div>

    return (
        <PageWrapper>
            {
                deleteSessionModal &&
                <Modal
                    title="Delete Session"
                    message="Are you sure you want to delete this sessions?"
                    confirm={() => deleteSession()}
                    decline={() => setDeleteSessionModal(false)}
                />
             }
            {
                checkInModal &&
                <Modal
                    title="Check In"
                    message="Let everyone know youll be there and encourage others to check in too."
                    confirm={() => checkIn()}
                    decline={() => setCheckInModal(false)}
                />
            }
            <PageSection>
            <SectionHeader>
                <Back/>
                <div className='page--actions'>
                    {
                    isCreator ?
                    <>
                        <Button
                            styles='primary page--button'
                            label="Edit Session"
                            icon={TbEdit}
                            action={() => navigate(`/sessions/${session.id}/update`)}
                        />
                        <Button
                            styles='secondary page--button'
                            icon={TbTrash}
                            label="Delete Session"
                            action={() => setDeleteSessionModal(true)}
                        />
                      </> :
                      <>
                        <Button
                            styles='primary page--button'
                            label="Check In"
                            icon={TbCheck}
                            action={() => setCheckInModal(true)}
                        />
                      </>
                    }
                </div>
            </SectionHeader>
            <div className='section--flex'>
                <SessionCreator />
                <SessionDetails />
            </div>
            </PageSection>
            <Players />
            <Comments />
        </PageWrapper>
    )
}

export default SessionPage
