import React from 'react'
import { useApp } from '../App/Context/AppContext';
import { useDispatch } from 'react-redux';
import { TbArrowLeft, TbCheck, TbExclamationCircle, TbLocation } from 'react-icons/tb';
import Input from '../Shared/components/Inputs/Input'
import Button from '../Shared/components/Button';
import DateInput from '../Shared/components/Inputs/DateInput';
import { thunkCreateNewSession } from '../Store/sessions';
import TimeInput from '../Shared/components/Inputs/TimeInput';
import DurationInput from '../Shared/components/Inputs/DurationInput';
import { sessionsAlerts } from "../Shared/constants/alertData";
import useSessionValidation from './hooks/useSessionValidation';


function CreateNewSession() {
    const dispatch = useDispatch();
    const { navigate, setLoading, handleAlerts } = useApp();
    const { createSessionError, createSessionSuccess } = sessionsAlerts;

    const  [
        sessionData,
        errors,
        handleSessionInput,
        geocodeAddress,
        status,
    ] = useSessionValidation();

    const createNewSession = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const data = await dispatch(thunkCreateNewSession(sessionData));
            handleAlerts(createSessionSuccess);
            navigate(`/sessions/${data.data.id}`)
        } catch (error) {
            handleAlerts(createSessionError);
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <section className='sessions__single_page--wrapper'>
            <header className='sessions__single_page--header'>
                <div className='sessions__single_page--header-back'>
                <span onClick={() => navigate('/')} className='sessions__single_page--back'>
                    <TbArrowLeft />
                </span>
                <span>Back to results</span>
                </div>
            </header>
            <form className='sessions__single_page--contents'>
                <div>
                    <header className='sessions__single_page--section'>
                        <h1>New Session</h1>
                        <p>Create a new session to go live</p>
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
                                disabled={false}
                            />
                            <Button
                                label={
                                    status === "loading" ? "Loading"
                                    : status === "success" ? "Address Verified"
                                    : "Verify Address"
                                }
                                type='secondary'
                                style={`sessions__single_page--input_button ${status !== "success" ? "button--unverified" : null}`}
                                icon={
                                    status === "loading" ? TbLocation :
                                    status === "success" ? TbCheck :
                                    TbExclamationCircle
                                }
                                action={geocodeAddress}
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
                                label="Create Session"
                                style="session_single_page--button"
                                disabled={Object.keys(errors).length}
                                action={createNewSession}
                            />
                        </div>
                    </div>
                </div>
            </form>

    </section>
  )
}

export default CreateNewSession
