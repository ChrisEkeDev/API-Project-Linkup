import React, { useEffect } from 'react';
import { useApp } from '../App/Context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { TbArrowLeft, TbCheck, TbExclamationCircle, TbLocation } from 'react-icons/tb';
import Input from '../Shared/components/Inputs/Input'
import Button from '../Shared/components/Button';
import DateInput from '../Shared/components/Inputs/DateInput';
import { thunkGetSingleSession, thunkUpdateSession } from '../Store/sessions';
import TimeInput from '../Shared/components/Inputs/TimeInput';
import DurationInput from '../Shared/components/Inputs/DurationInput';
import { sessionsAlerts } from "../Shared/constants/alertData";
import useEditSessionValidation from './hooks/useEditSessionValidation';
import DataLoading from '../App/Loading/DataLoading';
import { useParams } from 'react-router-dom';

function EditSession({session}) {
    const dispatch = useDispatch();
    const { navigate, setLoading, handleAlerts } = useApp();
    const { updateSessionSuccess, updateSessionError } = sessionsAlerts;
    // console.log(session)
    const  [
        sessionData,
        errors,
        handleSessionInput,
        geocodeAddress,
        status,
    ] = useEditSessionValidation(session.id);

    const updateSession = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const data = await dispatch(thunkUpdateSession(sessionData, session.id));
            handleAlerts(updateSessionSuccess);
            navigate(`/sessions/${data.data.id}`)
        } catch (error) {
            handleAlerts(updateSessionError);
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <section className='sessions__single_page--wrapper'>
        <header className='sessions__single_page--header'>
            <div className='sessions__single_page--header-back'>
            <span onClick={() => navigate(`/sessions/${session.id}`)} className='sessions__single_page--back'>
                <TbArrowLeft />
            </span>
            <span>Back to results</span>
            </div>
            <div>
                {/* <Button
                  style='sessions__results_header--button'
                  type="secondary"
                  label="Cancel"
                /> */}
            </div>
        </header>
        <form className='sessions__single_page--contents'>
            <header className='sessions__single_page--section'>
                <h1>Edit Session</h1>
                <p>Update your session</p>
            </header>
            <div className='sessions__single_page--form'>
                <Input
                    label="Name"
                    placeholder='Hoops at the Parks'
                    value={sessionData?.name}
                    setValue={handleSessionInput}
                    name='name'
                    error={errors?.name}
                    disabled={false}
                />
                <div className='sessions__single_page--input'>
                    <Input
                        label="Full Address"
                        placeholder='123 Fake St, City, ST'
                        value={sessionData?.address}
                        setValue={handleSessionInput}
                        name='address'
                        error={errors?.address}
                        disabled={true}
                    />
                    <Button
                        label="Address Verified"
                        type='secondary'
                        style={`sessions__single_page--input_button ${status !== "success" ? "button--unverified" : null}`}
                        icon={TbCheck}
                        action={geocodeAddress}
                        disabled={true}
                    />
                </div>
                <div className='sessions__single_page--date_time'>
                    <DateInput
                        label="Date"
                        name="date"
                        value={sessionData?.date}
                        setValue={handleSessionInput}
                        error={errors?.date}
                        disabled={false}
                    />
                    <TimeInput
                        label="Time"
                        name="time"
                        value={sessionData?.time}
                        setValue={handleSessionInput}
                        error={errors?.time}
                        disabled={false}
                    />
                    <DurationInput
                        label="Duration (Hours)"
                        name="duration"
                        value={sessionData?.duration}
                        setValue={handleSessionInput}
                        error={errors?.duration}
                        disabled={false}
                    />
                </div>
                <div className='session_single_page--actions'>
                    <Button
                        type="primary"
                        label="Update Session"
                        style="session_single_page--button"
                        disabled={Object.keys(errors).length}
                        action={updateSession}
                    />
                </div>
            </div>
        </form>
    </section>
  )
}


function EditSessionWrapper() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const session = useSelector(state => state.sessions.singleSession);

    useEffect(() => {
        const loadSession = () => {
            dispatch(thunkGetSingleSession(id))
        }
        loadSession()
    }, [])

    if (!session) return <DataLoading />

    return (
        <EditSession session={session}/>
    )
}

export default EditSessionWrapper
