import React, { useState, useEffect } from 'react';
import Back from '../../components/shared/button/Back';
import { useParams } from 'react-router-dom';
import { thunkGetSingleSession } from '../../store/sessions';
import useUpdateSession from './hooks/useUpdateSession';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import { TbCalendar, TbClock, TbGauge, TbMapPin, TbCalendarCheck } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { useApp } from '../../context/AppContext';
import LoadingData from '../../components/shared/loading';

function UpdateSession({session}) {
    const  {
        sessionData,
        errors,
        handleInput,
        updateSession,
    } = useUpdateSession(session);

  return (
        <main className='page new_session'>
            <header className='header'>
                <Back route={`/sessions/${session.id}`}/>
            </header>
            <form className='session_form'>
                <header className='form_header'>
                    <h2>Update Session</h2>
                </header>
                <Input
                    label="Name"
                    placeholder='Hoops at the Parks'
                    value={sessionData?.name}
                    setValue={handleInput}
                    name='name'
                    error={errors?.name}
                    disabled={false}
                />
                <div className='form_verification'>
                    <TbMapPin className="icon"/>
                    <div className='details'>
                        <p className='xs bold'>Address</p>
                        <p className='sm'>{session.Court.address}</p>
                    </div>
                </div>
                <div className='form_flex'>
                <Input
                    label="Date"
                    name="date"
                    type="date"
                    iconRight={<TbCalendar className='input_icon'/>}
                    value={sessionData?.date}
                    setValue={handleInput}
                    error={errors?.date}
                    disabled={false}
                />
                <Input
                    label="Time"
                    name="time"
                    type="time"
                    iconRight={<TbClock className='input_icon'/>}
                    value={sessionData?.time}
                    setValue={handleInput}
                    error={errors?.time}
                    disabled={false}
                />
                <Input
                    label="Duration (hours)"
                    name="duration"
                    type="number"
                    min={1}
                    max={6}
                    iconRight={<TbGauge className='input_icon'/>}
                    value={sessionData?.duration}
                    setValue={handleInput}
                    error={errors?.duration}
                    disabled={false}
                />
                </div>
                <footer className='form_actions'>
                    <Button
                        label="Update Session"
                        styles="primary"
                        icon={TbCalendarCheck}
                        action={updateSession}
                    />
                </footer>
            </form>
        </main>
  )
}




function UpdateSessionWrapper() {
    const { id } = useParams();
    const { dispatch } = useApp();
    const [ loading, setLoading ] = useState(true);
    const session = useSelector(state => state.sessions.singleSession);
    useEffect(() => {
        const getSession = async () => {
            try {
                const res = await dispatch(thunkGetSingleSession(id));
                if (res.status === 200 && res.status === 200 && session) {
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
        <UpdateSession session={session}/>
    )
}

export default UpdateSessionWrapper
